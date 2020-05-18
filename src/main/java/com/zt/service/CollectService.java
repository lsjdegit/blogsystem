package com.zt.service;

import com.zt.entity.BlogParameter;
import com.zt.entity.Collect;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

import java.util.List;

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


    /**
     * 收藏分页
     * @param
     * @return
     */
    public List<Collect> getCollectsByUserfen(Integer uid,Integer first,Integer pageSize);

    /**
     * 根据id查询所有
     * @param uid
     * @return
     */
    public List<Collect> getCollectsByUser(Integer uid);

}
