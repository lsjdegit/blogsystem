package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.entity.Browse;
import com.zt.mapper.BlogMapper;
import com.zt.mapper.BrowseMapper;
import com.zt.service.BrowseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrowseServiceImpl implements BrowseService {
    @Autowired
    private BrowseMapper browseMapper;
    @Autowired
    private BlogMapper blogMapper;

    @Override
    public List<Browse> getBrowseByUser(Integer uid, Integer first, Integer pageSize) {
        List<Browse> browses = browseMapper.getBrowseByUser(uid,first,pageSize);
        for(int i=0; i<browses.size();i++){
            Blog blog=blogMapper.getBlogById(browses.get(i).getBid());
            browses.get(i).setBlog(blog);
        }
        return browses;
    }

    @Override
    public List<Browse> getBrowseByUserAll(Integer uid) {
        return browseMapper.getBrowseByUserAll(uid);
    }

    @Override
    public int delall(Integer uid) {
        return browseMapper.delall(uid);
    }
}
