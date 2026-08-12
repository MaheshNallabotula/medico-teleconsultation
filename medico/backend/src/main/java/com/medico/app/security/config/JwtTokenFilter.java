package com.medico.app.security.config;

import com.medico.app.entities.Role;
import com.medico.app.security.services.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtTokenFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmailFromToken(token);
        String role = jwtUtil.extractRoleFromToken(token).substring(5);


        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = null;
            if (role.equals("ADMIN")) {
                userDetailsService.setRole(Role.ADMIN);
                userDetails = this.userDetailsService.loadUserByUsername(email);
            } else if (role.equals("DOCTOR")) {
                userDetailsService.setRole(Role.DOCTOR);
                userDetails = this.userDetailsService.loadUserByUsername(email);
            } else if (role.equals("PATIENT")) {
                userDetailsService.setRole(Role.PATIENT);
                userDetails = this.userDetailsService.loadUserByUsername(email);
            }
            if (userDetails != null && this.jwtUtil.isValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
