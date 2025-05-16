package com.project.booktour.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final String userName;
    private final Collection<? extends GrantedAuthority> authorities;
    private final String jwtToken;
    private final String email;
    private final Long roleId;

    public CustomOAuth2User(String userName,
                            Collection<? extends GrantedAuthority> authorities,
                            String jwtToken,
                            String email,
                            Long roleId) {
        this.userName = userName;
        this.authorities = authorities;
        this.jwtToken = jwtToken;
        this.email = email;
        this.roleId = roleId;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Collections.singletonMap("email", email); // Có thể mở rộng nếu cần
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return userName;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public String getEmail() {
        return email;
    }

    public Long getRoleId() {
        return roleId;
    }
}
