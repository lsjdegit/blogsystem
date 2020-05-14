package com.zt.service.impl;

import com.zt.entity.Collect;
import com.zt.mapper.CollectMapper;
import com.zt.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollectServiceImpl implements CollectService {
    @Autowired
    private CollectMapper collectMapper;


    @Override
    public int addCollect(Collect collect) {
        return collectMapper.addCollect(collect);
    }

    @Override
    public int delCollect(Collect collect) {
        return collectMapper.delCollect(collect);
    }
}
