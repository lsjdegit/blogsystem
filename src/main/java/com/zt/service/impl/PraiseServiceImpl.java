package com.zt.service.impl;

import com.zt.entity.Message;
import com.zt.entity.Praise;
import com.zt.mapper.MessageMapper;
import com.zt.mapper.PraiseMapper;
import com.zt.service.PraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PraiseServiceImpl implements PraiseService {
    @Autowired
    private PraiseMapper praiseMapper;
    @Autowired
    private MessageMapper messageMapper;

    @Transactional
    @Override
    public int addPraise(Praise praise ,Integer uid) {
        int num = praiseMapper.addPraise(praise);
        Message message = new Message();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        message.setMtime(sdf.format(new Date()));
        message.setMtypeid(2);
        message.setBid(praise.getBid());
        message.setYuid(praise.getUid());
        message.setUid(uid);
        int isre = messageMapper.reMessage(message);
        if(isre == 0 && message.getYuid() != message.getUid()){
            messageMapper.addMessage(message);
        }
        return num;
    }

    @Override
    public int delPraise(Praise praise) {
        return praiseMapper.delPraise(praise);
    }
}
