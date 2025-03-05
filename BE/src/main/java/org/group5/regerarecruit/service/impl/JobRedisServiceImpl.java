package org.group5.regerarecruit.service.impl;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.service.JobRedisService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class JobRedisServiceImpl extends BaseRedisServiceImpl implements JobRedisService {
    private final ObjectMapper redisObjectMapper;

    public JobRedisServiceImpl(RedisTemplate<String, Object> redisTemplate, ObjectMapper redisObjectMapper) {
        super(redisTemplate);
        this.redisObjectMapper = redisObjectMapper;
    }

    @Override
    public PageResponse<JobDTO> findByJobSearchId(
            int pageNo, int pageSize, String keyword, String sortBy, String... searchs) throws JsonProcessingException {
        String key = this.getKeyFrom(pageNo, pageSize, keyword, sortBy, searchs);
        String json = (String) this.get(key);
        return json != null ? redisObjectMapper.readValue(json, new TypeReference<PageResponse<JobDTO>>() {}) : null;
    }

    @Override
    public void setJobSearchResultToRedis(
            int pageNo, int pageSize, String keyword, String sortBy, String[] searchs, PageResponse<JobDTO> result)
            throws JsonProcessingException {
        String key = this.getKeyFrom(pageNo, pageSize, keyword, sortBy, searchs);
        String json = redisObjectMapper.writeValueAsString(result);
        this.set(key, json);
    }

    private String getKeyFrom(int pageNo, int pageSize, String keyword, String sortBy, String... searchs) {
        String searchKey = String.join(",", searchs);
        return String.format("jobs:%d%d%s%s%s", pageNo, pageSize, keyword, sortBy, searchKey);
    }
}
