package com.zt.entity;

import lombok.Data;

/**
 * @author scj
 * @create 2020-05-18 9:24
 */

@Data
public class VerifyCode {

    private String code;

    private byte[] imgBytes;

    private long expireTime;
    }
