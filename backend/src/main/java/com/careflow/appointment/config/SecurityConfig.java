package com.careflow.appointment.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.careflow.appointment.security.JwtAuthFilter;

@Configuration
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filter(
            HttpSecurity http,
            JwtAuthFilter jwtAuthFilter
    ) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(cors ->
                cors.configurationSource(corsConfigurationSource())
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            /*
             * IMPORTANT:
             * Spring Security will NOT block API requests.
             * JWT filter will still run and put the logged-in
             * user information into SecurityContext.
             *
             * AppointmentController itself checks
             * PATIENT / DOCTOR permissions.
             */
            .authorizeHttpRequests(auth ->
                auth.anyRequest().permitAll()
            )

            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config =
            new CorsConfiguration();

        config.setAllowedOriginPatterns(
            List.of(
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            )
        );

        config.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"
            )
        );

        config.setAllowedHeaders(
            List.of("*")
        );

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            config
        );

        return source;
    }
}