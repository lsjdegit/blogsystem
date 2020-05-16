package com.zt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Praise implements Serializable {
    private Integer praiseid;
    private Integer uid;
    private Integer bid;
    @JsonBackReference(value = "user")
    private User user;

}
