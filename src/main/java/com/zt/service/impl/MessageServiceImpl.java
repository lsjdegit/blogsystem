package com.zt.service.impl;

import com.zt.entity.Message;
import com.zt.mapper.MessageMapper;
import com.zt.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public List<Message> selectMessage( Integer uid, Integer mtypeid,Integer first,Integer pageSize) {
        return messageMapper.selectMessage(uid,mtypeid,first,pageSize);
    }

    @Override
    public int unreadCount(Integer uid, Integer mtypeid) {
        return messageMapper.unreadCount(uid,mtypeid);
    }

    @Override
    public int readAllMessage(Integer uid) {
        return messageMapper.readAllMessage(uid);
    }

    @Override
    public int readMessage(Integer mid) {
        return messageMapper.readMessage(mid);
    }

    @Override
    public int delMessage(Integer uid) {
        return messageMapper.delMessage(uid);
    }
}
