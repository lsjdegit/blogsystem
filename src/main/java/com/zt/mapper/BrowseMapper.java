package com.zt.mapper;

import com.zt.entity.Browse;
import org.apache.ibatis.annotations.*;



import java.util.List;

public interface BrowseMapper {

    @Select("select * from browse where uid=#{uid} LIMIT #{first},#{pageSize}")
    public List<Browse> getBrowseByUser(@Param("uid") Integer uid, @Param("first")Integer first, @Param("pageSize")Integer pageSize);


    @Select("select * from browse where uid=#{uid}")
    @Results({
            @Result(id=true,column="borwseid",property="browseid"),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogByIdCollect"))
    })
    public List<Browse> getBrowseByUserAll(@Param("uid") Integer uid);


    /**
     * 添加浏览记录
     * @param browse
     * @return
     */
    @Insert("INSERT INTO browse(uid,bid,browsetime) VALUES(#{uid},#{bid},#{browsetime})")
    public int addBrowse(Browse browse);

    /**
     * 浏览记录是否存在
     * @param browse
     * @return
     */
    @Select("select count(1) from browse where uid=#{uid} and bid=#{bid}")
    public int isexist(Browse browse);

    /**
     * 删除存在的浏览记录
     * @param browse
     * @return
     */
    @Delete("delete from browse where uid=#{uid} and bid=#{bid}")
    public int delByExist(Browse browse);

    /**
     * 删除浏览记录
     * @param uid
     * @return
     */
    @Delete("DELETE FROM browse WHERE uid=#{uid}")
    public int delall(Integer uid);

    /**
     * 根据bid清除浏览记录
     * @return
     */
    @Delete("delete from browse where bid=#{bid}")
    public int delBrowseByBlog(@Param("bid") Integer bid);
}
