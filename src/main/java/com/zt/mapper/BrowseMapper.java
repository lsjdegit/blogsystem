package com.zt.mapper;

import com.zt.entity.Browse;
import org.apache.ibatis.annotations.*;



import java.util.List;

public interface BrowseMapper {

    @Select("select * from browse where uid=#{uid} LIMIT #{first},#{pageSize}")
    public List<Browse> getBrowseByUser(@Param("uid") Integer uid, @Param("first")Integer first, @Param("pageSize")Integer pageSize);


    @Select("select * from browse where uid=#{uid}")
    public List<Browse> getBrowseByUserAll(@Param("uid") Integer uid);


    /**
     * 添加浏览记录
     * @param browse
     * @return
     */
    @Insert("INSERT INTO browse(uid,bid,browsetime) VALUES(#{uid},#{bid},#{browsetime})")
    public int addBrowse(Browse browse);

    /**
     * 删除浏览记录
     * @param uid
     * @return
     */
    @Delete("DELETE FROM browse WHERE uid=#{uid}")
    public int delall(Integer uid);
}
