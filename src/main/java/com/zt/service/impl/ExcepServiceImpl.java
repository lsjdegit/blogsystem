package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.entity.Exceptional;
import com.zt.entity.User;
import com.zt.mapper.BlogMapper;
import com.zt.mapper.ExcepMapper;
import com.zt.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ExcepServiceImpl implements com.zt.service.ExcepService {
    @Autowired
    private ExcepMapper excepMapper;
    @Autowired
    private BlogMapper blogMapper;
    @Autowired
    private UserMapper userMapper;


    @Override
    public List<Exceptional> selectExcep(Integer bid) {
        return excepMapper.selectExcep(bid);
    }

    @Transactional
    @Override
    public int addExcep(Exceptional exceptional) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String etime = sdf.format(new Date());
        exceptional.setEtime(etime);
        //博主加钱
        User user = blogMapper.getBlogById(exceptional.getBid()).getUser();
        Integer balance = user.getBalance();
        user.setBalance(balance + exceptional.getMoney());
        userMapper.updateUserBalance(user);
        //打赏者扣钱
        User user2 = userMapper.getUserById(exceptional.getUid());
        Integer balance2 = user2.getBalance();
        user2.setBalance(balance2 - exceptional.getMoney());
        userMapper.updateUserBalance(user2);
        return excepMapper.addExcep(exceptional);
    }
}
