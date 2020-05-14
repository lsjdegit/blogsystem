package com.zt.service;

import com.zt.entity.Praise;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.springframework.stereotype.Service;

public interface PraiseService {
    /**
     * 点赞
     * @param praise
     * @return
     */
    public int addPraise(Praise praise,Integer uid);

    /**
     * 取消赞
     * @param praise
     * @return
     */
    public int delPraise(Praise praise);
}
