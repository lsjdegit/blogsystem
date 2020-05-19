package com.zt.service;

import com.zt.entity.User;
import com.zt.entity.Uurelevance;

import java.util.List;


public interface UurelevanceService {

    public int addcare(Uurelevance uurelevance);

    public int delcare(Uurelevance uurelevance);

    /**
     * 根据id查粉丝集合
     * @param uid
     * @return
     */
    public List<Uurelevance> uufanslist(Integer uid);

    /**
     * 根据id查关注集合
     * @param fansid
     * @return
     */
    public List<Uurelevance> uucarelist(Integer fansid);

    public List<User> selectAllUser();
}
