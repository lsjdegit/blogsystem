package com.zt.controller;

import com.zt.entity.BlogParameter;
import com.zt.entity.Collect;
import com.zt.entity.ListPage;
import com.zt.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/collect")
public class CollectController {
    @Autowired
    private CollectService collectService;

    private Integer pageSize=4;

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

    @RequestMapping("selectcollects")
    @ResponseBody
    public ListPage fencollect(@RequestBody BlogParameter blogParameter){
        ListPage coll=new ListPage();
        System.out.println(blogParameter.getPageIndex());
        Integer first = pageSize*(blogParameter.getPageIndex()-1);
        System.out.println(first);
        List co=collectService.getCollectsByUserfen(blogParameter.getUid(),first,pageSize);
        System.out.println(blogParameter.getPageIndex());
        System.out.println(co.size());
        coll.setList(co);
        int tatal=collectService.getCollectsByUser(blogParameter.getUid()).size();
        int tatalpage=tatal%pageSize==0?tatal/pageSize:tatal/pageSize+1;
        coll.setTotalPage(tatalpage);
        return coll;
    }

    @RequestMapping("delcollect")
    @ResponseBody
    public ListPage delcollect(@RequestBody BlogParameter blogParameter){
        System.out.println("要取消的收藏博客"+blogParameter.getBid()+"用户id "+blogParameter.getUid());
        Collect ct = new Collect();
        ct.setBid(blogParameter.getBid());
        ct.setUid(blogParameter.getUid());
        int unm=collectService.delCollect(ct);
        ListPage coll=new ListPage();
        System.out.println(blogParameter.getPageIndex());
        Integer first = pageSize*(blogParameter.getPageIndex()-1);
        System.out.println(first);
        List co=collectService.getCollectsByUserfen(blogParameter.getUid(),first,pageSize);
        if(blogParameter.getPageIndex()==1){
            co=collectService.getCollectsByUserfen(blogParameter.getUid(),first,pageSize);
        }else{
            if(co.size()==0){
                first = pageSize*(blogParameter.getPageIndex()-2);
                co=collectService.getCollectsByUserfen(blogParameter.getUid(),first,pageSize);
            }
        }
        System.out.println(co.size());
        coll.setList(co);
        int tatal=collectService.getCollectsByUser(blogParameter.getUid()).size();
        int tatalpage=tatal%pageSize==0?tatal/pageSize:tatal/pageSize+1;
        coll.setTotalPage(tatalpage);
        return coll;

    }

}
