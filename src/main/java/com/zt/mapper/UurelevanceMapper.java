package com.zt.mapper;
import com.zt.entity.Uurelevance;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UurelevanceMapper {

    /**
     * 加关注
     * @param uurelevance
     * @return
     */
    @Insert("INSERT INTO uurelevance(uid,fansid) VALUES(#{uid},#{fansid})")
    public int addcare(Uurelevance uurelevance);


    /**
     * 删关注
     * @param uurelevance
     * @return
     */
    @Delete("DELETE  FROM uurelevance WHERE uid=#{uid} AND fansid=#{fansid}")
    public int delcare(Uurelevance uurelevance);

    /**
     * 根据id查粉丝集合
     * @param uid
     * @return
     */
    @Select("SELECT * FROM uurelevance WHERE uid=#{uid}")
    public List<Uurelevance> uufanslist(Integer uid);

    /**
     * 根据id查关注集合
     * @param fansid
     * @return
     */
    @Select("SELECT * FROM uurelevance WHERE fansid=#{fansid}")
    public List<Uurelevance> uucarelist(Integer fansid);
}
