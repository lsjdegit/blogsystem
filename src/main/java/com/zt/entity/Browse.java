package com.zt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Browse implements Serializable {
    private Integer browseid;
    private Integer uid;
    private Integer bid;
    private String browsetime;
    @JsonBackReference(value = "blog")
    private Blog blog;
}
