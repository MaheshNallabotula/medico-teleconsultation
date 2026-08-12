package com.medico.app.security.config;

import com.medico.app.entities.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig{

    private final JwtTokenFilter jwtTokenFilter;
    private final CustomLogoutHandler customLogoutHandler;

    public SecurityConfig(JwtTokenFilter jwtTokenFilter, CustomLogoutHandler customLogoutHandler) {
        this.jwtTokenFilter = jwtTokenFilter;
        this.customLogoutHandler = customLogoutHandler;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        RequestMatcher[] requestMatchers = new RequestMatcher[]{
                new AntPathRequestMatcher("/api/auth/**"),
                new AntPathRequestMatcher("/api/home/**"),
                new AntPathRequestMatcher("/api/aux/**"),
                new AntPathRequestMatcher("/api/superAdmin/**"),
                new AntPathRequestMatcher("/api/filesaws/**")
        };
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
               .authorizeHttpRequests(
                       req -> req
                               .requestMatchers(requestMatchers)
                               .permitAll()
                               .requestMatchers("/api/patient/**").hasRole("PATIENT")
                               .requestMatchers("/api/doctor/**").hasRole("DOCTOR")
                               .requestMatchers("/api/admin/**").hasRole("ADMIN")
                               .anyRequest()
                               .authenticated())
               .sessionManagement(
                       sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .logout( l -> l.logoutUrl("/logout")
                        .addLogoutHandler(customLogoutHandler)
                        .logoutSuccessHandler(((request, response, authentication) -> SecurityContextHolder.clearContext())))
               .build();
   }



   @Bean
   public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
   }

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
   }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
