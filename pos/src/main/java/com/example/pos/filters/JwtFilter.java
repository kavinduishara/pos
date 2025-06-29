package com.example.pos.filters;

import com.example.pos.config.AllowedEndPointConfig;
import com.example.pos.service.JWTService;
import com.example.pos.service.MyUserDetailsService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    MyUserDetailsService myUserDetailsService;

    @Autowired
    AllowedEndPointConfig allowedEndPointConfig;

    private final AntPathMatcher matcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String username = null;

        boolean isAllowed = Arrays.stream(allowedEndPointConfig.getEndpoints())
                .anyMatch(pattern -> matcher.match(pattern, request.getRequestURI()));

        if (isAllowed) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if ("access_token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token != null) {
            try {
                username = jwtService.extractUserName(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);
                    System.out.println(userDetails.getUsername());

                    if (!request.getRequestURI().equals("/auth/refresh") && !jwtService.isAccessToken(token)) {
                        System.out.println("Refresh tokens are not allowed on this endpoint");
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh tokens are not allowed on this endpoint");
                        return;
                    }

                    if (jwtService.isTokenExpired(token)) {
                        System.out.println("{\"error\": \"Access token expired. Please refresh.\"}");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\": \"Access token expired. Please refresh.\"}");
                        return;
                    }

                    if (jwtService.validateToken(token, userDetails)) {

                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        System.out.println(authenticationToken.isAuthenticated());
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }

            } catch (JwtException e) {
                System.out.println("{\"error\": \"Invalid token\"}");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Invalid token\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

}
