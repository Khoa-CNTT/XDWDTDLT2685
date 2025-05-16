package com.project.booktour.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final String userName;
    private final Collection<? extends GrantedAuthority> authorities;
    private final String jwtToken;
    private final String email;

    public CustomOAuth2User(String userName, Collection<? extends GrantedAuthority> authorities, String jwtToken, String email) {
        this.userName = userName;
        this.authorities = authorities;
        this.jwtToken = jwtToken;
        this.email = email;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null; // Không cần attributes cho OAuth2User
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


}