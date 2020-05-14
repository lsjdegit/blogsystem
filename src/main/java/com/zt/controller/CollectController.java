package com.zt.controller;

import com.zt.entity.Collect;
import com.zt.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/collect")
public class CollectController {
    @Autowired
    private CollectService collectService;

    @RequestMapping("add")
    @ResponseBody
    public boolean addPraise(@RequestBody Collect collect){
        int num = collectService.addCollect(collect);
        if(num>0){
            return true;
        }
        return false;
    }

    @RequestMapping("del")
    @ResponseBody
    public boolean delPraise(@RequestBody Collect collect){
        int num = collectService.delCollect(collect);
        if(num>0){
            return true;
        }
        return false;
    }

}
