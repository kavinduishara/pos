package com.example.pos.config;

import com.example.pos.entities.*;
import com.example.pos.repository.ShopUserRepo;
import com.example.pos.service.UserShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.*;

@Component
public class RoleBasedAccessConfig {

    @Autowired
    ShopUserRepo shopUserRepo;

    private final List<String> admin=new ArrayList<>();
    private final List<String> user=new ArrayList<>();
    private final List<String> cache=new ArrayList<>();

    private void addAdminRestrict(){
        admin.addAll(List.of(

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
        Optional<UserShop> userShop= shopUserRepo.findById(new UserShopPk(
                new User(username),
                new Shop(shopId)
        ));
        if (userShop.isEmpty()) {
            return Role.USER;
        }
        return userShop.get().getRole();
    }

    public boolean haveAccess(Long shopId,String username,String path){
        Role role=getRole(shopId,username);
        if (role==Role.OWNER){
            return true;
        }
        else if(role==Role.ADMIN){
            return admin.stream()
                    .noneMatch(pattern -> matcher.match(pattern, path));
        }
        else if(role==Role.USER){
            return user.stream()
                    .noneMatch(pattern -> matcher.match(pattern, path));
        }
        else if(role==Role.CACHE){
            return cache.stream()
                    .noneMatch(pattern -> matcher.match(pattern, path));
        }
        return false;
    }

}
