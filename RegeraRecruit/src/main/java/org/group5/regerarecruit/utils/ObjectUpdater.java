package org.group5.regerarecruit.utils;

import java.lang.reflect.Field;

import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.springframework.stereotype.Component;

@Component
public class ObjectUpdater {
    public <T> void updateNonNullFields(T source, T target) {
        if (source == null || target == null) return;

        for (Field field : source.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                throw new AppException(ErrorCode.UNCATEGORIZED);
            }
        }
    }
}
