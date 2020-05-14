package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.entity.User;
import com.zt.mapper.BlogMapper;
import com.zt.mapper.UserMapper;
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
        List<User> userList = new ArrayList<>();
        return blogMapper.selectBlogst(btid, userList, search, first, pageSize,bcreatetime,bstatusid);
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

}
