package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.entity.User;
import com.zt.mapper.*;
import com.zt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogMapper blogMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PraiseMapper praiseMapper;
    @Autowired
    private CollectMapper collectMapper;
    @Autowired
    private CommentMapper commentMapper;

    @Override
    public List<Blog> selectBlog(Integer btid, Integer uid, String search, Integer first, Integer pageSize) {
        List<User> userList = new ArrayList<>();
        if(uid != 0){
            userList = userMapper.getCareByUser(uid);
        }else{
            userList = null;
        }
        return blogMapper.selectBlog(btid, userList, search, first, pageSize);
    }

    @Override
    public List<Blog> selectBlogst(Integer btid, Integer uid, String search, Integer first, Integer pageSize, String bcreatetime,Integer bstatusid) {
        return blogMapper.selectBlogst(btid, null, search, first, pageSize,bcreatetime,bstatusid);
    }

    @Override
    public Blog getBlogById(Integer bid) {
        return blogMapper.getBlogById(bid);
    }

    @Override
    public int addBlog(Blog blog) {
        return blogMapper.addBlog(blog);
    }

    @Override
    public int updatetg(Blog blog){
        return blogMapper.updatetg(blog);
    }

    @Override
    public List<Blog> selectMyBlog(Integer uid, Integer bstatusid, String search, Integer first, Integer pageSize) {
        return blogMapper.selectMyBlog(uid,bstatusid,search,first,pageSize);
    }

    @Override
    public int delBlog(Integer bid) {
        praiseMapper.delPraiseByBlog(bid);
        collectMapper.delCollectByBlog(bid);
        commentMapper.delCommByBlog(bid);
        return blogMapper.delBlog(bid);
    }

}
