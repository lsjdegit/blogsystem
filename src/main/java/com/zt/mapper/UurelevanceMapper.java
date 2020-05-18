package com.zt.mapper;
import com.zt.entity.Uurelevance;
import org.apache.ibatis.annotations.*;

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
}
