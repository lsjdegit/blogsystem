package com.zt.controller;

import com.zt.entity.Praise;
import com.zt.service.PraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/praise")
public class PraiseController {
    @Autowired
    private PraiseService praiseService;

    @RequestMapping("add")
    @ResponseBody
    public boolean addPraise(@RequestParam("yuid")Integer yuid,@RequestParam("bid")Integer bid, @RequestParam("uid")Integer uid){
        Praise praise = new Praise();
        praise.setBid(bid);
        praise.setUid(yuid);
        int num = praiseService.addPraise(praise,uid);
        if(num>0){
            return true;
        }
        return false;
    }

    @RequestMapping("del")
    @ResponseBody
    public boolean delPraise(@RequestBody Praise praise){
        int num = praiseService.delPraise(praise);
        if(num>0){
            return true;
        }
        return false;
    }

}
