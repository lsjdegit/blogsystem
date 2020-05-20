package com.zt.mapper;

import com.zt.entity.Exceptional;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ExcepMapper {

    @Select("select * from exceptional where bid=#{bid}")
    @Results({
            @Result(id=true,column="eid",property="eid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserByExcep"))
    })
    public List<Exceptional> selectExcep(@Param("bid") Integer bid);

    @Insert("insert into exceptional(bid,uid,money,etime) values(#{bid},#{uid},#{money},#{etime})")
    public int addExcep(Exceptional exceptional);

    /**
     * 根据bid清除打赏记录
     * @return
     */
    @Delete("delete from exceptional where bid=#{bid}")
    public int delExcepByBlog(@Param("bid") Integer bid);

}
