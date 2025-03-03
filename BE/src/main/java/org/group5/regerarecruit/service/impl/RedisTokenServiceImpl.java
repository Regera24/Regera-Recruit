package org.group5.regerarecruit.service.impl;

import java.util.concurrent.TimeUnit;

import org.group5.regerarecruit.service.RedisTokenService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisTokenServiceImpl extends BaseRedisServiceImpl implements RedisTokenService {
    public RedisTokenServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        super(redisTemplate);
    }

    @Override
    public boolean existsByTokenId(String key) {
        return this.exists(key);
    }

    @Override
    public void setToken(String key, String value, Long expire, TimeUnit timeUnit) {
        this.set(key, value, expire, timeUnit);
    }

    private String getKeyFrom(int pageNo, int pageSize, String sortBy, String... searchs){
        String searchKey = String.join("-", searchs);
        return searchKey+"dfd";
    }
}
