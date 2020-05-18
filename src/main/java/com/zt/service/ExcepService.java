package com.zt.service;

import com.zt.entity.Exceptional;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ExcepService {

    /**
     * 根据bid得到打赏集合
     * @param bid
     * @return
     */
    public List<Exceptional> selectExcep(Integer bid);

    /**
     * 打赏博客
     * @param exceptional
     * @return
     */
    public int addExcep(Exceptional exceptional);

}
