package com.zt.mapper;

import com.zt.entity.Blog;
import com.zt.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface BlogMapper {

    /**
     * 根据id获得blog
     * @param bid
     * @return
     */
    @Select("select * from blog where bid=#{bid}")
    @Results({
            @Result(id=true,column="bid",property="bid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="collects",many=@Many(select="com.zt.mapper.CollectMapper.getCollectByBlog")),
            @Result(column="bid",property="praises",many=@Many(select="com.zt.mapper.PraiseMapper.getPraiseByBlog")),
            @Result(column="bid",property="comments",many=@Many(select="com.zt.mapper.CommentMapper.getCommentsByBlog"))
    })
    public Blog getBlogById(@Param("bid") Integer bid);

    /**
     * 根据用户id查拥有的博客集合
     * @param uid
     * @return
     */
    @Select("select * from blog where uid=#{uid} ORDER BY bid DESC")
    public List<Blog> getBlogByUser(@Param("uid") Integer uid);

    /**
     * 查询blog
     * @param btid
     * @param userList
     * @param search
     * @param first
     * @param pageSize
     * @return
     */
    @Select("<script>"
            +"SELECT * FROM blog "
            +"WHERE bstatusid=1"
            +"<if test=\"btid!=null and btid!=0\" >"
            +"AND btid=#{btid}"
            +"</if>"
            +"<if test=\"userList!=null and userList.size>0\" >"
            +"AND uid IN"
            +"<foreach item=\"user\" index=\"index\" collection=\"userList\" open=\"(\" separator=\",\" close=\")\" >"
            +"#{user.uid}"
            +"</foreach>"
            +"</if>"
            +"<if test=\"userList!=null and userList.size==0\" >"
            +"AND uid=0"
            +"</if>"
            +"<if test=\"search!=null and search!=''\" >"
            +"AND btitle LIKE '%${search}%'"
            +"</if>"
            +" ORDER BY bid DESC "
            +"<if test=\"pageSize!=null and pageSize!=0\" >"
            +"LIMIT #{first},#{pageSize}"
            +"</if>"
            +"</script>")
    @Results({
            @Result(id=true,column="bid",property="bid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="collects",many=@Many(select="com.zt.mapper.CollectMapper.getCollectByBlog")),
            @Result(column="bid",property="praises",many=@Many(select="com.zt.mapper.PraiseMapper.getPraiseByBlog")),
            @Result(column="bid",property="comments",many=@Many(select="com.zt.mapper.CommentMapper.getCommentsByBlog"))
    })
    public List<Blog> selectBlog(@Param("btid") Integer btid, @Param("userList") List<User> userList, @Param("search")String search, @Param("first")Integer first, @Param("pageSize")Integer pageSize);

    /**
     *
     * @param btid
     * @param userList
     * @param search
     * @param first
     * @param pageSize
     * @param bcreatetime
     * @param bcreatetime
     * @param bstatusid
     * @return
     */
    @Select("<script>"
            +"SELECT * FROM blog"
            +" WHERE bstatusid=#{bstatusid}"
            +"<if test=\"btid!=null and btid!=0\" >"
            +"AND btid=#{btid}"
            +"</if>"
            +"<if test=\"bcreatetime!=null and bcreatetime!=''\" >"
            +"AND bcreatetime LIKE '%${bcreatetime}%'"
            +"</if>"
            +"<if test=\"search!=null and search!=''\" >"
            +"AND btitle LIKE '%${search}%'"
            +"</if>"
            +" ORDER BY bid DESC "
            +"<if test=\"pageSize!=null and pageSize!=0\" >"
            +"LIMIT #{first},#{pageSize}"
            +"</if>"
            +"</script>")
    @Results({
            @Result(id=true,column="bid",property="bid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="collects",many=@Many(select="com.zt.mapper.CollectMapper.getCollectByBlog")),
            @Result(column="bid",property="praises",many=@Many(select="com.zt.mapper.PraiseMapper.getPraiseByBlog")),
            @Result(column="bid",property="comments",many=@Many(select="com.zt.mapper.CommentMapper.getCommentsByBlog"))
    })
    public List<Blog> selectBlogst(@Param("btid") Integer btid, @Param("userList") List<User> userList, @Param("search")String search, @Param("first")Integer first, @Param("pageSize")Integer pageSize,@Param("bcreatetime")String bcreatetime,@Param("bstatusid")Integer bstatusid);

    /**
     * 添加博客
     * @param blog
     * @return
     */
    @Insert("insert into blog(uid,btitle,bcontent,bcreatetime,btid,babstract) values(#{uid},#{btitle},#{bcontent},#{bcreatetime},#{btid},#{babstract})")
    public int addBlog(Blog blog);

    /**
     *申请通过审核的博客

     * @return
     */
    @Update("update blog set bstatusid=#{bstatusid} where bid=#{bid}")
    public int updatetg(Blog blog);

}
