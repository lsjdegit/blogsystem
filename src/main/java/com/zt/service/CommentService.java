package com.zt.service;

import com.zt.entity.Comment;
import org.apache.ibatis.annotations.Param;

public interface CommentService {

    /**
     * 添加评论
     * @param comment
     * @return
     */
    public Comment addComment(Comment comment);

    public Comment getCommentById(Integer cid);

    /**
     * 删除评论
     * @param cid
     * @return
     */
    public int delComment(Integer cid);
}
