package com.zt.service.impl;

import com.zt.entity.Message;
import com.zt.entity.Praise;
import com.zt.mapper.MessageMapper;
import com.zt.mapper.PraiseMapper;
import com.zt.service.PraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PraiseServiceImpl implements PraiseService {
    @Autowired
    private PraiseMapper praiseMapper;
    @Autowired
    private MessageMapper messageMapper;

    @Transactional
    @Override
    public int addPraise(Praise praise ,Integer uid) {
        praiseMapper.addPraise(praise);
        Message message = new Message();
        message.setMtypeid(2);
        message.setBid(praise.getBid());
        message.setYuid(praise.getUid());
        message.setUid(uid);
        int num = messageMapper.addMessage(message);
        return num;
    }

    @Override
    public int delPraise(Praise praise) {
        return praiseMapper.delPraise(praise);
    }
}
