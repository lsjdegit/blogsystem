package com.zt.mapper;
import com.zt.entity.VerifyCode;
import java.io.OutputStream;
import java.io.IOException;

/**
 * @author scj
 * @create 2020-05-18 9:29
 */
public interface IVerifyCodeGen {

    /**
     * 生成验证码并返回code，将图片写的os中
     *
     * @param width
     * @param height
     * @param os
     * @return
     * @throws IOException
     */
    String generate(int width, int height, OutputStream os) throws IOException;

    /**
     * 生成验证码对象
     *
     * @param width
     * @param height
     * @return
     * @throws IOException
     */
    VerifyCode generate(int width, int height) throws IOException;

}
