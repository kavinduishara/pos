package com.example.pos.config;

import com.example.pos.entities.*;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.repository.UserRepo;
import com.example.pos.service.UserShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.security.Principal;
import java.util.*;

@Component
public class RoleBasedAccessConfig {

    @Autowired
    ShopUserRepo shopUserRepo;
    @Autowired
    UserRepo userRepo;

    private final List<String> admin=new ArrayList<>();
    private final List<String> user=new ArrayList<>();
    private final List<String> cache=new ArrayList<>();
    public RoleBasedAccessConfig() {
        addAdminRestrict();
        addUserRestrict();
        addCacheRestrict();
    }


    private void addAdminRestrict(){
        admin.addAll(List.of(
                "admin/**",
                "/admin/getadminusers"
        ));
    }
    private void addUserRestrict(){
        user.addAll(List.of(
                "admin/**",
                "billing/**"
        ));
    }
    private void addCacheRestrict(){
        cache.addAll(List.of(
                "admin/**"
        ));
    }

    private final AntPathMatcher matcher = new AntPathMatcher();

    public Role getRole(Long shopId,String username){
        System.out.println("00000000000000000000");
        if (shopId == null || username == null || shopId==0) {
            return Role.USER;
        }
        User user1=userRepo.findByEmail(username);

        Optional<UserShop> userShop= shopUserRepo.findById(new UserShopPk(
                user1,
                new Shop(shopId)
        ));
        if (userShop.isEmpty()) {
            return Role.USER;
        }
        return userShop.get().getRole();
    }

    public boolean haveAccess(Long shopId, String username, String path) {
        Role role = getRole(shopId, username);
        String normalizedPath = path.startsWith("/") ? path.substring(1) : path;

        System.out.println("Normalized: " + normalizedPath);
        System.out.println("Original: " + path);

        if (role == Role.OWNER) {
            return true;
        } else if (role == Role.ADMIN) {
            System.out.println("admin access check result: " +
                    admin.stream().noneMatch(pattern -> matcher.match(pattern, normalizedPath)));
            System.out.println("admin access check result path: " +
                    admin.stream().noneMatch(pattern -> matcher.match(pattern, path)));
            return admin.stream().noneMatch(pattern -> matcher.match(pattern, normalizedPath));
        } else if (role == Role.USER) {
            return user.stream().noneMatch(pattern -> matcher.match(pattern, normalizedPath));
        } else if (role == Role.CACHE) {
            return cache.stream().noneMatch(pattern -> matcher.match(pattern, normalizedPath));
        }
        return false;
    }

}
