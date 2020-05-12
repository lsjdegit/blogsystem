package com.zt.controller;

import com.zt.entity.Blogtype;
import com.zt.service.BlogTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/blogtype")
public class BlogtypeController {
    @Autowired
    private BlogTypeService blogTypeService;

    @RequestMapping("all")
    public String getBlogType(Model m ) {
        List<Blogtype> blogtypeList = blogTypeService.selectAllBlogType();
        m.addAttribute("blogtypeList",blogtypeList);
        return "forward:../user/expert";
    }
    @RequestMapping("alla")
    @ResponseBody
    public List<Blogtype> getBlogTypea(Model m ) {
        List<Blogtype> blogtypeList = blogTypeService.selectAllBlogType();
        m.addAttribute("blogtypeList",blogtypeList);
        return blogtypeList;
    }

    /**
     *添加博客类型
     */
    @RequestMapping("add")
    @ResponseBody
    public int addBlogTypea(Blogtype bty){
        System.out.println(bty.getTname());
        return blogTypeService.addBlogType(bty);
    }
}
