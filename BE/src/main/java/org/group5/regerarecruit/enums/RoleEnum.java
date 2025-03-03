package org.group5.regerarecruit.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum RoleEnum {
    CANDIDATE("CANDIDATE"),
    COMPANY("COMPANY");
    private String code;
}
