package com.zt.controller;

import com.zt.entity.Exceptional;
import com.zt.service.ExcepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/excep")
public class ExcepController {
    @Autowired
    private ExcepService excepService;

    @RequestMapping("bybid")
    @ResponseBody
    public List<Exceptional> blogExcep(@RequestParam("bid") Integer bid){
        return excepService.selectExcep(bid);
    }

    @RequestMapping("add")
    @ResponseBody
    public boolean addExcep(@RequestBody Exceptional exceptional){
        int num = excepService.addExcep(exceptional);
        if(num>0){
            return true;
        }
        return false;
    }

}
