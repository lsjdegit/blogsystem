package com.zt.service.impl;

import com.zt.entity.Message;
import com.zt.entity.User;
import com.zt.entity.Uurelevance;
import com.zt.mapper.MessageMapper;
import com.zt.mapper.UurelevanceMapper;
import com.zt.service.UurelevanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class UurelevanceServiceImpl implements UurelevanceService {
    @Autowired
    private UurelevanceMapper uurelevanceMapper;
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public int addcare(Uurelevance uurelevance) {
        Message message = new Message();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        message.setMtime(sdf.format(new Date()));
        message.setMtypeid(3);
        message.setYuid(uurelevance.getFansid());
        message.setUid(uurelevance.getUid());
        int isre = messageMapper.reMessage(message);
        if(isre == 0 && message.getYuid() != message.getUid()){
            messageMapper.addMessage(message);
        }
        return uurelevanceMapper.addcare(uurelevance);
    }

    @Override
    public int delcare(Uurelevance uurelevance) {
        return uurelevanceMapper.delcare(uurelevance);
    }

    @Override
    public List<Uurelevance> uufanslist(Integer uid) {
        return uurelevanceMapper.uufanslist(uid);
    }

    @Override
    public List<Uurelevance> uucarelist(Integer fansid) {
        return uurelevanceMapper.uucarelist(fansid);
    }


}
