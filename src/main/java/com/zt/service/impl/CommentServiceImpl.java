package com.zt.service.impl;

import com.zt.entity.Comment;
import com.zt.mapper.CommentMapper;
import com.zt.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;

    @Override
    public Comment addComment(Comment comment) {
        commentMapper.addComment(comment);
        return commentMapper.getCommentById(comment.getCid());
    }

    @Override
    public Comment getCommentById(Integer cid) {
        return commentMapper.getCommentById(cid);
    }
}
