package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.entity.Browse;
import com.zt.mapper.BlogMapper;
import com.zt.mapper.BrowseMapper;
import com.zt.service.BrowseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
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
        List<Browse> browses = browseMapper.getBrowseByUserAll(uid);
        for(int i=0; i<browses.size();i++){
            Blog blog=blogMapper.getBlogByIdBrowse(browses.get(i).getBid());
            browses.get(i).setBlog(blog);
        }
        return browses;
    }

    @Override
    public int delall(Integer uid) {
        return browseMapper.delall(uid);
    }

    @Override
    public int addBrowse(Browse browse) {
        int num = browseMapper.isexist(browse);
        if(num>0){
            browseMapper.delByExist(browse);
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        browse.setBrowsetime(sdf.format(new Date()));
        return browseMapper.addBrowse(browse);
    }
}
