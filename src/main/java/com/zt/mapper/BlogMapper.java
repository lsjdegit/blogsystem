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
    public Blog getBlogById(@Param("bid") Integer bid);

    /**
     * 根据用户id查拥有的博客集合
     * @param uid
     * @return
     */
    @Select("select * from blog where uid=#{uid}")
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
            +"WHERE 1=1"
            +"<if test=\"btid!=null and btid!=0\" >"
            +"AND btid=#{btid}"
            +"</if>"
            +"<if test=\"userList!=null and userList.size>0\" >"
            +"AND uid IN"
            +"<foreach item=\"user\" index=\"index\" collection=\"userList\" open=\"(\" separator=\",\" close=\")\" >"
            +"#{user.uid}"
            +"</foreach>"
            +"</if>"
            +"<if test=\"userList!=null and uids.size==0\" >"
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
            @Result(column="bid",property="collects",many=@Many(select="com.zt.mapper.CollectMapper.getCollectByBlog")),
            @Result(column="bid",property="praises",many=@Many(select="com.zt.mapper.PraiseMapper.getPraiseByBlog"))
    })
    public List<Blog> selectBlog(@Param("btid") Integer btid, @Param("userList") List<User> userList, @Param("search")String search, @Param("first")Integer first, @Param("pageSize")Integer pageSize);


}
