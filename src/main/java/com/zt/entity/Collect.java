package com.zt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Collect implements Serializable {
    private Integer collectid;
    private Integer uid;
    private Integer bid;
    @JsonBackReference(value = "user")
    private User user;
    private Blog blog;

}
