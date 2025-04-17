package com.project.booktour.repositories;

import com.project.booktour.models.Token;
import com.project.booktour.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByUser(User user);

//    Token findByToken(String token);
//
//    Token findByRefreshToken(String token);
}