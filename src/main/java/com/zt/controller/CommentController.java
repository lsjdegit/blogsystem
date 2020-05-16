package com.zt.controller;

import com.zt.entity.Comment;
import com.zt.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/comment")
public class CommentController {
    @Autowired()
    private CommentService commentService;

    @RequestMapping("add")
    @ResponseBody
    public Comment addComment(@RequestBody Comment comment){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String comtime = sdf.format(new Date());
        comment.setComtime(comtime);
        Comment comm = commentService.addComment(comment);
        return comm;
    }

    @RequestMapping("del")
    @ResponseBody
    public boolean delComment(@RequestParam Integer cid){
        int num = commentService.delComment(cid);
        if(num>0){
            return true;
        }
        return false;
    }


}
