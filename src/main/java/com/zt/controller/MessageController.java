package com.zt.controller;

import com.zt.entity.ListPage;
import com.zt.entity.Message;
import com.zt.entity.MessageParameter;
import com.zt.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    private Integer pageSize = 5;

    @RequestMapping("select")
    @ResponseBody
    public ListPage selectMessage(@RequestBody MessageParameter messageParameter){
        if(messageParameter.getUid() == null){
            messageParameter.setMtypeid(0);
        }
        Integer totalSize = messageService.selectMessage(messageParameter.getUid(),messageParameter.getMtypeid(),0,0).size();
        Integer totalPage = totalSize%pageSize==0?totalSize/pageSize:totalSize/pageSize+1;
        System.out.println("totalPage = " + totalPage);
        Integer first = pageSize*(messageParameter.getPageIndex()-1);
        List<Message> messageList = messageService.selectMessage(messageParameter.getUid(),messageParameter.getMtypeid(),first,pageSize);
        ListPage listPage = new ListPage();
        listPage.setList(messageList);
        listPage.setTotalPage(totalPage);
        return listPage;
    }

    @RequestMapping("read")
    @ResponseBody
    public boolean readMessage(@RequestParam Integer mid){
        int num = messageService.readMessage(mid);
        if(num > 0){
            return true;
        }
        return false;
    }

    @RequestMapping("readall")
    @ResponseBody
    public boolean readAllMessage(@RequestParam Integer uid){
        int num = messageService.readAllMessage(uid);
        if(num > 0){
            return true;
        }
        return false;
    }

    @RequestMapping("del")
    @ResponseBody
    public boolean delMessage(@RequestParam Integer uid){
        int num = messageService.delMessage(uid);
        if(num > 0){
            return true;
        }
        return false;
    }

    @RequestMapping("unreadCount")
    @ResponseBody
    public Integer unreadCount(@RequestParam Integer uid){
        Integer num = messageService.unreadCount(uid);
        return num;
    }

}
