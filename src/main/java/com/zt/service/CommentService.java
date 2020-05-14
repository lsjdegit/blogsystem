package com.zt.service;

import com.zt.entity.Comment;

public interface CommentService {

    /**
     * 添加评论
     * @param comment
     * @return
     */
    public int addComment(Comment comment);
}
