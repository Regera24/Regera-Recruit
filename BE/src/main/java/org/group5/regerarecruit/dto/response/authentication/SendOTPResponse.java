package org.group5.regerarecruit.dto.response.authentication;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendOTPResponse {
    String username;
    String email;
    Boolean isValid;
}
