package org.group5.regerarecruit.service;

import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public interface RedisTokenService {
    public boolean existsByTokenId(String key);

    public void setToken(String key, String value, Long expire, TimeUnit timeUnit);
}
