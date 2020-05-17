package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.entity.BlogParameter;
import com.zt.entity.ListPage;
import com.zt.entity.User;
import com.zt.service.UserService;

import com.zt.util.JavaMailUtil;
import com.zt.util.RandomUtil;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author scj
 * @create 2020-05-08 19:31
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    private Integer pageSize = 4;

    /**
     * 验证登录信息
     */
    @RequestMapping("login")
    @ResponseBody
    public User loginUser(User user, HttpSession session){
        user=userService.Login(user);
        session.setAttribute("loginUser",user);
        return user;
    }

    /**
     * 注销
     */
    @RequestMapping("logout")
    @ResponseBody
    public void logoutUser(HttpSession session){
        session.removeAttribute("loginUser");
    }

    /**
     * 用户注册
     */
    @RequestMapping("register")
    public String registerUser(User user){
       int reg= userService.Register(user);
       if(reg>0){
           return "login";
       }else{
           return "register";
       }
    }

    /**
     * 随机三个专家用户
     * @param m
     * @return
     */
    @RequestMapping("expert")
    public String expertUser(Model m){
        List<User> userList = userService.expertUser();
        List<User> eUserList = new ArrayList<>();
        do{
            for (User user : userList) {
                int i = Math.random()>0.5?1:0;
                if(eUserList.size()<3 ){
                    if(i == 1){
                        boolean flag = true;
                        for (User u : eUserList) {
                            if(u.getUid().equals(user.getUid())){
                                flag = false;
                                break;
                            }
                        }
                        if(flag){
                            eUserList.add(user);
                        }
                    }
                }else {
                    break;
                }
            }
        }while (eUserList.size()<3);
        m.addAttribute("eUserList",eUserList);
        return "forward:guser";
    }

    /**
     * 点赞排行榜前三
     * @param m
     * @return
     */
    @RequestMapping("guser")
    public String gUser(Model m){
        List<User> guserList = userService.rankingUser();
        List<Integer> gList = new ArrayList<>();
        for (User user : guserList) {
            List<Blog> blogList = user.getBlogs();
            Integer gnumber = 0;
            for (Blog blog : blogList) {
                gnumber += blog.getGnumber();
            }
            gList.add(gnumber);
        }
        m.addAttribute("guserList",guserList);
        m.addAttribute("gList",gList);
        return "index";
    }

    /**
     * 个人中心数据
     * @param sess
     * @return
     */
    @RequestMapping("pansonalselect")
    @ResponseBody
    public User personalselect(HttpSession sess){
        User kl= (User) sess.getAttribute("loginUser");
        User puser =userService.getUserById(kl.getUid());
//        System.out.println(puser);
//        System.out.println(puser.getFans());
//        System.out.println(puser.getBalance());
//        System.out.println(puser.getCollects());
        return puser;
    }

    /**
     * 修改用户
     * @param user
     * @return
     */
    @RequestMapping("/updateuser")
    @ResponseBody
    public boolean updateUser(@RequestBody User user,HttpSession sess){
        User ui= (User) sess.getAttribute("loginUser");
        user.setUid(ui.getUid());
        int num=userService.updateUser(user);
//        System.out.println(num);
        if(num==0){
            return false;
        }
        return true;
    }

    // 附件上传
    @RequestMapping(value = "/updateuserimg", method = RequestMethod.POST)
    @ResponseBody
    public boolean uploadTest(@RequestParam(required = false, value = "file") MultipartFile file,
                             @RequestParam(required = false, value = "expoid") String expoid, HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        String path = request.getSession().getServletContext().getRealPath("fujianTemplate");
        String fileName = file.getOriginalFilename();
//        System.out.println(fileName);
//        System.out.println(path);
        String newFileName = expoid + "_fujian.doc";
//        System.out.println(newFileName);
        File targetFile = new File(path, newFileName);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        // 保存
        try {
            file.transferTo(targetFile);
            Date d = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateNowStr = sdf.format(d);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return true;
    }

      @RequestMapping(value = "selectall",method = RequestMethod.POST)
      @ResponseBody
      public ListPage selectall(@RequestBody BlogParameter blogParameter){
//          System.out.println(blogParameter.getUname());
          Integer totalSize=userService.selectAll(blogParameter.getUname(),blogParameter.getIsexpert(),0,0).size();
          Integer totalPage = totalSize%pageSize==0?totalSize/pageSize:totalSize/pageSize+1;
          Integer first = pageSize*(blogParameter.getPageIndex()-1);
          List<User> list= userService.selectAll(blogParameter.getUname(),blogParameter.getIsexpert(),first,pageSize);
          ListPage listPage = new ListPage();
          listPage.setList(list);
          listPage.setTotalPage(totalPage);
          return listPage;
      }

    /**
     * 收藏分页
     * @param uid
     * @param pageIndex
     * @return
     */
      @RequestMapping(value = "selectcollect",method = RequestMethod.POST)
      @ResponseBody
      public ListPage selectCollect(@RequestParam Integer uid,Integer pageIndex){
        User us=userService.getUserById(uid);
        List coll=us.getCollects();
        Integer tatal=coll.size()%pageSize==0?coll.size()/pageSize:coll.size()/pageSize+1;
        ListPage clist=new ListPage();
        clist.setList(coll);
        clist.setTotalPage(tatal);
        return clist;
      }

    /**
     * 给用户输入的邮箱发送邮件
     * @param email
     * @param sess
     * @return
     * @throws IOException
     * @throws MessagingException
     */
      @RequestMapping("sendEmail")
      @ResponseBody
        public String getyanzhen( String email,HttpSession sess) throws IOException, MessagingException {
          System.out.println(email);
          JavaMailUtil.receiveMailAccount = email; // 给用户输入的邮箱发送邮件

          // 1、创建参数配置，用于连接邮箱服务器的参数配置
          Properties props = new Properties();
          // 开启debug调试
          //props.setProperty("mail.debug", "true");
          // 发送服务器需要身份验证
          props.setProperty("mail.smtp.auth", "true");
          // 设置右键服务器的主机名
          props.setProperty("mail.host", JavaMailUtil.emailSMTPHost);
          // 发送邮件协议名称
          props.setProperty("mail.transport.protocol", "smtp");

          // 2、根据配置创建会话对象，用于和邮件服务器交互
          Session session = Session.getInstance(props);
          // 设置debug，可以查看详细的发送log
          session.setDebug(true);
          // 3、创建一封邮件
          String code = RandomUtil.getRandom();
          System.out.println("邮箱验证码：" + code);
          String html = RandomUtil.html(code);
          //发送邮件
          MimeMessage message = JavaMailUtil.creatMimeMessage(session, JavaMailUtil.emailAccount,JavaMailUtil.receiveMailAccount, html);
          // 4、根据session获取邮件传输对象
          Transport transport = session.getTransport();
          // 5、使用邮箱账号和密码连接邮箱服务器emailAccount必须与message中的发件人邮箱一致，否则报错
          transport.connect(JavaMailUtil.emailAccount, JavaMailUtil.emailPassword);
          // 6、发送邮件,发送所有收件人地址
          transport.sendMessage(message, message.getAllRecipients());
          // 7、关闭连接
          transport.close();
          sess.setAttribute("code",code);
          return"code";
        }

    /**
     * 验证用户输入的验证码是否与发送的验证码是否一致
     * @param code
     * @param session
     * @return
     */
    @RequestMapping("panduan")
           @ResponseBody
           public boolean panduan(String code,HttpSession session){
             String sessioncode=(String)session.getAttribute("code");
               System.out.println("sessioncode:"+sessioncode);
               System.out.println("code:"+code);
               if (sessioncode.toLowerCase().equals(code.toLowerCase())) {
                  return true;
               }else {
                  return false;
               }
           }


}
