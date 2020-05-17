package com.zt.mapper;

import com.zt.entity.Message;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface MessageMapper {

    @Insert("insert into message(mtypeid,bid,yuid,uid,mtime) values(#{mtypeid},#{bid},#{yuid},#{uid},#{mtime})")
    public int addMessage(Message message);

    /**
     * 根据类型查询用户的信息集合
     * @param mtypeid
     */
    @Select("<script>select * from message where uid=#{uid} and mtypeid=#{mtypeid}" +
            "<if test=\"mtypeid==1\" >"+
            " or mtypeid=4 "+
            "</if>"+
            " ORDER BY mid DESC "+
            "<if test=\"pageSize!=null and pageSize!=0\" >"+
            "LIMIT #{first},#{pageSize}"+
            "</if>"+
            "</script>")
    @Results({
            @Result(id=true,column="mid",property="mid"),
            @Result(column="yuid",property="yuser",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Message> selectMessage(@Param("uid") Integer uid, @Param("mtypeid") Integer mtypeid,@Param("first")Integer first, @Param("pageSize")Integer pageSize);

    /**
     * 查询未读条数
     * @param uid
     * @return
     */
    @Select("select count(1) from message where uid=#{uid} and status=0")
    public int unreadCount(@Param("uid") Integer uid);

    /**
     * 用户一键已读
     * @param uid
     * @return
     */
    @Update("update message set status=1 where uid=#{uid}")
    public int readAllMessage(@Param("uid") Integer uid);

    /**
     * 用户读信息
     * @param mid
     * @return
     */
    @Update("update message set status=1 where mid=#{mid}")
    public int readMessage(@Param("mid") Integer mid);

    /**
     * 清除消息
     * @return
     */
    @Delete("delete from message where uid=#{uid}")
    public int delMessage(@Param("uid") Integer uid);

}
