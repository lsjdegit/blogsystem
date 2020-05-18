package com.zt.service.impl;

import com.zt.entity.BlogParameter;
import com.zt.entity.Collect;
import com.zt.mapper.CollectMapper;
import com.zt.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<Collect> getCollectsByUserfen(Integer uid, Integer first, Integer pageSize) {
        return collectMapper.getCollectsByUserfen(uid,first,pageSize);
    }

    @Override
    public List<Collect> getCollectsByUser(Integer uid) {
        return collectMapper.getCollectsByUser(uid);
    }
}
