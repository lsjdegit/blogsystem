package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.mapper.BlogMapper;
import com.zt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogMapper blogMapper;

    @Override
    public List<Blog> selectBlog(Integer btid,List<Integer> utids, String search, Integer first, Integer pageSize) {

        return blogMapper.selectBlog(btid, utids, search, first, pageSize);
    }

}
