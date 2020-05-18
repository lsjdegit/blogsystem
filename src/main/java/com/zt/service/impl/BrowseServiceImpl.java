package com.zt.service.impl;

import com.zt.entity.Browse;
import com.zt.mapper.BrowseMapper;
import com.zt.service.BrowseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrowseServiceImpl implements BrowseService {
    @Autowired
    private BrowseMapper browseMapper;

    @Override
    public List<Browse> getBrowseByUser(Integer uid, Integer first, Integer pageSize) {
        return browseMapper.getBrowseByUser(uid,first,pageSize);
    }

    @Override
    public List<Browse> getBrowseByUserAll(Integer uid) {
        return browseMapper.getBrowseByUserAll(uid);
    }
}
