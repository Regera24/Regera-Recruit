package org.group5.regerarecruit.dto.request.company;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyUpdateRequest {
    String companyName;
    String phone;
    String address;
    String email;
    String detail;
    String description;
    String img;
    String workTime;
    String website;
}
