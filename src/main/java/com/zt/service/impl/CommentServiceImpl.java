package com.zt.service.impl;

import com.zt.entity.Blog;
import com.zt.entity.Comment;
import com.zt.entity.Message;
import com.zt.mapper.BlogMapper;
import com.zt.mapper.CommentMapper;
import com.zt.mapper.MessageMapper;
import com.zt.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private BlogMapper blogMapper;
    @Autowired
    private MessageMapper messageMapper;

    @Transactional
    @Override
    public Comment addComment(Comment comment) {
        commentMapper.addComment(comment);
        Message message = new Message();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        message.setMtime(sdf.format(new Date()));
        message.setMtypeid(1);
        message.setBid(comment.getBid());
        message.setYuid(comment.getUid());
        Blog blog = blogMapper.getBlogById(comment.getBid());
        message.setUid(blog.getUser().getUid());
        if(comment.getParentid() != 0){
            message.setMtypeid(4);
            Comment comm = commentMapper.getCommentById(comment.getParentid());
            message.setUid(comm.getUser().getUid());
        }
        if(message.getYuid() != message.getUid()){
            messageMapper.addMessage(message);
        }
        return commentMapper.getCommentById(comment.getCid());
    }

    @Override
    public Comment getCommentById(Integer cid) {
        return commentMapper.getCommentById(cid);
    }

    @Transactional
    @Override
    public int delComment(Integer cid) {
        commentMapper.delReComment(cid);
        int num = commentMapper.delComment(cid);
        return num;
    }
}
