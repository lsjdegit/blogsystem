package com.zt.service.impl;

import com.zt.entity.Exceptional;
import com.zt.mapper.ExcepMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ExcepServiceImpl implements com.zt.service.ExcepService {
    @Autowired
    private ExcepMapper excepMapper;


    @Override
    public List<Exceptional> selectExcep(Integer bid) {
        return excepMapper.selectExcep(bid);
    }

    @Override
    public int addExcep(Exceptional exceptional) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String etime = sdf.format(new Date());
        exceptional.setEtime(etime);
        return excepMapper.addExcep(exceptional);
    }
}
