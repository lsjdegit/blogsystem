package com.zt.mapper;

import com.zt.entity.Message;
import org.apache.ibatis.annotations.Insert;

public interface MessageMapper {

    @Insert("insert into message(mtypeid,bid,yuid,uid) values(#{mtypeid},#{bid},#{yuid},#{uid})")
    public int addMessage(Message message);

}
