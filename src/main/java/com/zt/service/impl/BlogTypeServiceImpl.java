package com.zt.service.impl;

import com.zt.entity.Blogtype;
import com.zt.mapper.BlogtypeMapper;
import com.zt.service.BlogTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author scj
 * @create 2020-05-09 15:34
 */
@Service
public class BlogTypeServiceImpl implements BlogTypeService {
    @Autowired
    private BlogtypeMapper blogtypeMapper;

    public List<Blogtype> selectallblogtype() {
        return blogtypeMapper.selectallblogtype();
    }
}
