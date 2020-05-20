package com.zt.mapper;

import com.zt.entity.Comment;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CommentMapper {
    /**
     * 根据博客查询评论集合
     * @param bid
     * @return
     */
    @Select("select * from comment where bid=#{bid} ORDER BY cid DESC")
    @Results({
            @Result(id=true,column="cid",property="cid"),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById")),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="parentid",property="parent",one=@One(select="com.zt.mapper.CommentMapper.getCommentByIdParent")),
            @Result(column="cid",property="sons",many=@Many(select="com.zt.mapper.CommentMapper.getCommentsByParent"))
    })
    public List<Comment> getCommentsByBlog(@Param("bid")Integer bid);

    /**
     * 根据博客查询评论集合 无引用
     * @param bid
     * @return
     */
    @Select("select * from comment where bid=#{bid} ORDER BY cid DESC")
    public List<Comment> getCommentsByBlogBlog(@Param("bid")Integer bid);

    /**
     * 根据id获取评论
     * @param cid
     * @return
     */
    @Select("select * from comment where cid=#{cid}")
    @Results({
            @Result(id=true,column="cid",property="cid"),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById")),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="parentid",property="parent",one=@One(select="com.zt.mapper.CommentMapper.getCommentByIdParent")),
            @Result(column="cid",property="sons",many=@Many(select="com.zt.mapper.CommentMapper.getCommentsByParent"))
    })
    public Comment getCommentById(@Param("cid")Integer cid);

    /**
     * 根据id获取评论 添加评论，引用user
     * @param cid
     * @return
     */
    @Select("select * from comment where cid=#{cid}")
    @Results({
            @Result(id=true,column="cid",property="cid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserByIdBlog")),
            @Result(column="parentid",property="parent",one=@One(select="com.zt.mapper.CommentMapper.getCommentByIdParent"))
    })
    public Comment getCommentByIdComm(@Param("cid")Integer cid);

    /**
     * 根据id获取评论 无引用
     * @param cid
     * @return
     */
    @Select("select * from comment where cid=#{cid}")
    public Comment getCommentByIdNo(@Param("cid")Integer cid);

    /**
     * 根据id获取评论 引用user
     * @param cid
     * @return
     */
    @Select("select * from comment where cid=#{cid}")
    @Results({
            @Result(id=true,column="cid",property="cid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserByIdBlog"))
    })
    public Comment getCommentByIdParent(@Param("cid")Integer cid);

    @Select("select * from comment where parentid=#{parentid} ORDER BY cid DESC")
    @Results({
            @Result(id=true,column="cid",property="cid"),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById")),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="parentid",property="parent",one=@One(select="com.zt.mapper.CommentMapper.getCommentByIdParent")),
            @Result(column="cid",property="sons",many=@Many(select="com.zt.mapper.CommentMapper.getCommentsByParent"))
    })
    public List<Comment> getCommentsByParent(@Param("parentid")Integer parentid);

    @Insert("insert into comment(bid,uid,parentid,cocontext,comtime) values(#{bid},#{uid},#{parentid},#{cocontext},#{comtime})")
    @Options(useGeneratedKeys = true,keyProperty = "cid",keyColumn = "cid")
    public int addComment(Comment comment);

    /**
     * 删除评论
     * @param cid
     * @return
     */
    @Delete("delete from comment where cid=#{cid}")
    public int delComment(@Param("cid") Integer cid);

    /**
     * 删除评论相关回复
     * @param cid
     * @return
     */
    @Delete("delete from comment where parentid=#{cid}")
    public int delReComment(@Param("cid") Integer cid);

    /**
     * 删除博客下的评论
     * @param bid
     * @return
     */
    @Delete("delete from comment where bid=#{bid}")
    public int delCommByBlog(@Param("bid") Integer bid);

}
