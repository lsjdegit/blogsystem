package com.zt.service;

import com.zt.entity.Message;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface MessageService {
    /**
     * 根据类型查询用户的信息集合
     * @param uid
     * @param mtypeid
     * @return
     */
    public List<Message> selectMessage( Integer uid, Integer mtypeid,Integer first,Integer pageSize);

    /**
     * 查询未读条数
     * @param uid
     * @param mtypeid
     * @return
     */
    public int unreadCount(@Param("uid") Integer uid,@Param("mtypeid") Integer mtypeid);

    /**
     * 用户一键已读
     * @param uid
     * @return
     */
    public int readAllMessage(@Param("uid") Integer uid);

    /**
     * 用户读信息
     * @param mid
     * @return
     */
    public int readMessage(@Param("mid") Integer mid);

    /**
     * 清除消息
     * @return
     */
    public int delMessage(@Param("uid") Integer uid);
}
