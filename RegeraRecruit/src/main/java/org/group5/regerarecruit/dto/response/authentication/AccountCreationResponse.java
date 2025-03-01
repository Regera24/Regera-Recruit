package org.group5.regerarecruit.dto.response.authentication;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountCreationResponse {
    Long accountID;
    String username;
    String email;
    String phoneNumber;
}
