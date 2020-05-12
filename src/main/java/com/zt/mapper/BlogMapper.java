package com.zt.mapper;

import com.zt.entity.Blog;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface BlogMapper {

    @Select("select * from blog where bid=#{bid}")
    @Results({
            @Result(id=true,column="bid",property="bid"),
            @Result(column="bid",property="users",many=@Many(select="com.zt.mapper.UserMapper.getUserByBlog"))
    })
    public Blog getBlogById(@Param("bid") Integer bid);

    /**
     * 根据用户id查拥有的博客集合
     * @param uid
     * @return
     */
    @Select("select * from blog where uid=#{uid}")
    public List<Blog> getBlogByUser(@Param("uid") Integer uid);

    /**
     * 根据用户id查浏览的博客集合
     * @param uid
     * @return
     */
    @Select("select * from blog where uid in(select uid from ubrelevance where uid=#{uid})")
    public List<Blog> getRblogByUser(@Param("uid") Integer uid);

    @Select("<script>"
            +"SELECT * FROM blog "
            +"WHERE 1=1"
            +"<if test=\"btid!=null and btid!=0\" >"
            +"AND btid=#{btid}"
            +"</if>"
            +"<if test=\"uids!=null and uids.size>0\" >"
            +"AND uid IN"
            +"<foreach item=\"uid\" index=\"index\" collection=\"uids\" open=\"(\" separator=\",\" close=\")\" >"
            +"#{uid}"
            +"</foreach>"
            +"</if>"
            +"<if test=\"uids.size==0\" >"
            +"AND uid=0"
            +"</if>"
            +"<if test=\"search!=null and search!=''\" >"
            +"AND btitle LIKE '%${search}%'"
            +"</if>"
            +"<if test=\"pageSize!=null and pageSize!=0\" >"
            +"LIMIT #{first},#{pageSize}"
            +"</if>"
            +"</script>")
    @Results({
            @Result(id=true,column="bid",property="bid"),
            @Result(column="uid",property="blogs",many=@Many(select="com.zt.mapper.BlogMapper.getBlogByUser"))
    })
    public List<Blog> selectBlog(@Param("btid") Integer btid,@Param("uids") List<Integer> utids,@Param("search")String search,@Param("first")Integer first,@Param("pageSize")Integer pageSize);
}
