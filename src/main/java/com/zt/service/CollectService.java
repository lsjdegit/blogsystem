package com.zt.service;

import com.zt.entity.Collect;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;

public interface CollectService {
    /**
     * 收藏
     * @param collect
     * @return
     */
    public int addCollect(Collect collect);

    /**
     * 取消收藏
     * @param collect
     * @return
     */
    public int delCollect(Collect collect);

}
