package com.zt.service;

import com.zt.entity.Browse;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BrowseService {

    public List<Browse> getBrowseByUser(Integer uid,Integer first,Integer pageSize);

    public List<Browse> getBrowseByUserAll(Integer uid);
}
