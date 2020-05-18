package com.zt.service.impl;

import com.zt.entity.Uurelevance;
import com.zt.mapper.UurelevanceMapper;
import com.zt.service.UurelevanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UurelevanceServiceImpl implements UurelevanceService {
    @Autowired
    private UurelevanceMapper uurelevanceMapper;

    @Override
    public int addcare(Uurelevance uurelevance) {
        return uurelevanceMapper.addcare(uurelevance);
    }

    @Override
    public int delcare(Uurelevance uurelevance) {
        return uurelevanceMapper.delcare(uurelevance);
    }
}