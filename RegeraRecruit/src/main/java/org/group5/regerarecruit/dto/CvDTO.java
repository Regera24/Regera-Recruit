package org.group5.regerarecruit.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CvDTO {
    private Integer id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String exp;
    private String description;
    private String study;
    private String linkProject;
    private String title;
    private String img;
    private String skills;
    private Date createdAt;
    private Date updatedAt;
}
