package com.project.booktour.configurations;

import com.project.booktour.files.JwtTokenFilter;
import com.project.booktour.services.user.IOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;
    private final IOAuth2UserService oAuth2UserService;

    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests
                            // Các endpoint công khai hiện có
                            .requestMatchers(
                                    String.format("%s/users/register", apiPrefix),
                                    String.format("%s/users/login", apiPrefix),
                                    String.format("%s/tours/**", apiPrefix),
                                    "/login/oauth2/code/*",
                                    String.format("%s/auth/success", apiPrefix),
                                    String.format("%s/auth/failure", apiPrefix)
                            ).permitAll()
                            // Thêm các endpoint chatbot vào danh sách công khai
                            .requestMatchers(
                                    String.format("%s/chat", apiPrefix),
                                    String.format("%s/events", apiPrefix),
                                    String.format("%s/receive-message", apiPrefix),
                                    String.format("%s/health/n8n", apiPrefix)
                            ).permitAll()
                            .requestMatchers(GET, String.format("%s/tours/**", apiPrefix)).permitAll()
                            .requestMatchers(POST, String.format("%s/tours/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT, String.format("%s/tours/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/tours/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST, String.format("%s/booking/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(GET, String.format("%s/booking/**", apiPrefix)).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(PUT, String.format("%s/booking/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/booking/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET, String.format("%s/promotion/**", apiPrefix)).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(POST, String.format("%s/promotion/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT, String.format("%s/promotion/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/promotion/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST, String.format("%s/reviews/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(GET, String.format("%s/reviews/**", apiPrefix)).permitAll()
                            .requestMatchers(PUT, String.format("%s/reviews/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/reviews/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET, String.format("%s/history/**", apiPrefix)).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(POST, String.format("%s/history/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT, String.format("%s/history/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/history/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET, String.format("%s/invoice/**", apiPrefix)).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(POST, String.format("%s/invoice/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT, String.format("%s/invoice/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/invoice/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST, String.format("%s/checkout/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(GET, String.format("%s/checkout/**", apiPrefix)).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(PUT, String.format("%s/checkout/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/checkout/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET, String.format("%s/tokens/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST, String.format("%s/tokens/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT, String.format("%s/tokens/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/tokens/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET, String.format("%s/social_accounts/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST, String.format("%s/social_accounts/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT, String.format("%s/social_accounts/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/social_accounts/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(String.format("%s/users/avatars/**", apiPrefix)).permitAll()
                            .anyRequest().authenticated();
                })
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .oidcUserService(new OidcUserService())
                                .userService(oAuth2UserService)
                        )
                        .successHandler((request, response, authentication) -> {
                            response.sendRedirect(String.format("%s/auth/success", apiPrefix));
                        })
                        .failureHandler((request, response, exception) -> {
                            response.sendRedirect(String.format("%s/auth/failure", apiPrefix));
                        })
                )
                // Tắt form login mặc định để tránh redirect đến /login
                .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Thêm n8n Cloud vào danh sách allowed origins
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "https://phongnguyeeen.app.n8n.cloud", "http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}