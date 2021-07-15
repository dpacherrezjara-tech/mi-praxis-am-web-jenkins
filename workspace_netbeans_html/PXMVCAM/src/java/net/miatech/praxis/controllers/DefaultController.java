/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers;

import com.google.gson.Gson;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import net.miatech.beans.GeneralResponse;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.praxis.spring.INF021;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.exceptions.SpringException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.praxis.logic.program.UserLogic;
import net.miatech.praxis.persistence.facade.UserFacade;
import net.miatech.praxis.persistence.facadeimpl.UserFacadeImpl;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lzambrano
 */
@Controller
@Scope("request")
public class DefaultController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public @ResponseBody
    String getUser() throws Exception {
        HashMap m = new HashMap();
        m.put("user", serverSession.getServerSession().getUserView().getCustomerInfo());
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index2(ModelMap map, HttpSession session) throws Exception {
        System.out.println("************  INICIO DE LA APLICACION (index2)- METODO GET ****************");
        try {
            map.put("anio_actual", anio_actual());
            if (serverSession.getServerSession() == null) {
                System.out.println("---Return Login----");
                this.InitialSession(session);
                return "login";
            } else {
                System.out.println("---Return Home----");
                map.put("vp_serverDate", Functions.getFechaActual());
                map.put("vp_serverTime", Functions.getHoraActual());
                return "home";
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public String index(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {
        System.out.println("************  INCIO DE LA APLICACION (index)- METODO POST ****************");
        try {
            map.put("anio_actual", anio_actual());
            if (serverSession.getServerSession() == null) {
                this.InitialSession(request.getSession());
                if (request.getParameter("tipoLogin") != null) {
                    if (request.getParameter("tipoLogin").equals("auto")) {
                        System.out.println("---va a autologin----");
                        return this.autoLogin(request, response, map);
                    } else {
                        System.out.println("---Return Login----");
                        return "login";
                    }
                } else {
                    System.out.println("---Return Login----");
                    return "login";
                }

            } else {
                map.put("vp_serverDate", Functions.getFechaActual());
                map.put("vp_serverTime", Functions.getHoraActual());
                this.serverSession.propertySession.put("MTYPE_MENU", request.getParameter("mtype_menu"));
                System.out.println("---Return Home----");
                return "home";
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    public String autoLogin(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {
        System.out.println("DefaultController : autoLogin");
        serverSession.setServerSession(null);
        boolean bValidacion = false;
        String strUser = "";
        String strResponse = "";
        
        
        try {
            App app = new App(serverSession.getPropertySession());
            GeneralResponse resp = new GeneralResponse();
            resp.vars.put("login", false);
            resp.vars.put("customerExists", false);

            if (serverSession.getServerSession() == null) {
                this.InitialSession(request.getSession());
                this.serverSession.propertySession.put("MTYPE_MENU", request.getParameter("mtype_menu"));
                System.out.println("----Auto Login ---- Session null ---- Entro al if");
                INF001 user = new INF001();
                INF020 fileINF020 = new INF020();
                fileINF020.CCUST = "139";
                fileINF020.APLICA = "PX";
                user.USR = request.getParameter("txtAuthName");
                user.TOKEN = request.getParameter("txtAuthPass");

                resp.vars.put("login", true);
                resp.vars.put("user", user); //Cargamos toda la info del usuario.
                resp.vars.put("error_message", "");

                Object[] result = app.autenthicateUser(user);
                bValidacion = Boolean.parseBoolean(result[0].toString());
                strResponse = String.valueOf(result[1]);
                //bValidacion = UserLogic.autentificateUser(user);

                if (bValidacion) {
                    app.assignAuthentication(user);
                    app.defaultValidation(resp, fileINF020);

                    if (app.getServerSession().getACCCNX()) { //Si existe conexión.
                        System.out.println("Obtiene la xonexion y verificara el usuario");
                        request.setAttribute("user", user.USR);
                        request.setAttribute("password", user.TOKEN);
                        PX041S01INF001Filter objUsuario = new PX041S01INF001Filter();
                        objUsuario.VP_USR = user.USR;
                        serverSession.setServerSession(app.getServerSession());
                        UserLogic logic = new UserLogic();
                        logic.setSession(serverSession.getServerSession());
                        List<PX041S01INF001Filter> accessUser = logic.accessUser(objUsuario);
                        request.setAttribute("accessUser", accessUser);
                        //map.put("usr_login", serverSession.getServerSession().getUserView().getUserInfo().USR);
                        //map.put("anio_actual", anio_actual());
                        return "home";
                    } else {

                        return "home";
                    }

                } else {

                    return "home";
                }
            }

//            map.put("anio_actual", anio_actual());
//            if (serverSession.getServerSession() == null) {
//                this.InitialSession(session);
//                return "login";
//            } else {
//                map.put("vp_serverDate", Functions.getFechaActual());
//                map.put("vp_serverTime", Functions.getHoraActual());
//                return "home";
//            }
        } catch (Exception e) {

            throw new SpringException(e);
        }
        return "home";
    }

    @RequestMapping(value = "/Home", method = RequestMethod.POST)
    public String home(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {
        try {
            App app = new App(serverSession.getPropertySession());
            GeneralResponse resp = new GeneralResponse();
            resp.vars.put("login", false);
            resp.vars.put("customerExists", false);

            if (serverSession.getServerSession() == null) {
                INF001 user = new INF001();
                INF020 fileINF020 = new INF020();
                fileINF020.CCUST = "139";
                fileINF020.APLICA = "PX";
                user.USR = request.getParameter("txtAuthName");
                user.TOKEN = request.getParameter("txtAuthPass");

                resp.vars.put("login", true);
                resp.vars.put("user", user); //Cargamos toda la info del usuario.
                resp.vars.put("error_message", "");

                app.assignAuthentication(user);
                app.defaultValidation(resp, fileINF020);

                if (app.getServerSession().getACCCNX()) { //Si existe conexión.
                    request.setAttribute("user", user.USR);
                    request.setAttribute("password", user.TOKEN);
                    serverSession.setServerSession(app.getServerSession());

                    //map.put("usr_login", serverSession.getServerSession().getUserView().getUserInfo().USR);
                    //map.put("anio_actual", anio_actual());
                    return "home";
                } else {
                    return "redirect:" + serverSession.getAppRoot();
                }
            } else {
                return "home";
            }

        } catch (Exception e) {
            return "redirect:" + serverSession.getAppRoot();
            //return "login";
            //throw new SpringException(e);
        }
        //return "home";
    }

    @RequestMapping(value = "/Login", method = RequestMethod.POST)
    public @ResponseBody
    String login(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

        System.out.println("DefaultController : login");
        serverSession.setServerSession(null);
        boolean bValidacion = false;
        String strUser = "";
        String strResponse = "";
        try {
            App app = new App(serverSession.getPropertySession());
            GeneralResponse resp = new GeneralResponse();
            resp.vars.put("login", false);
            resp.vars.put("customerExists", false);

            if (serverSession.getServerSession() == null) {
                System.out.println("Entro al if");
                INF001 user = new INF001();
                INF020 fileINF020 = new INF020();
                fileINF020.CCUST = "139";
                fileINF020.APLICA = "PX";
                user.USR = request.getParameter("txtAuthName");
                user.TOKEN = request.getParameter("txtAuthPass");

                resp.vars.put("login", true);
                resp.vars.put("user", user); //Cargamos toda la info del usuario.
                resp.vars.put("error_message", "");

                Object[] result = app.autenthicateUser(user);
                bValidacion = Boolean.parseBoolean(result[0].toString());
                strResponse = String.valueOf(result[1]);
                //bValidacion = UserLogic.autentificateUser(user);

                if (bValidacion) 
                {
                    if(strResponse.startsWith("Your password will expire"))
                    {
                        strResponse="Your password has expired. Please change it for log in to the system";
                        return strResponse;
                    }
                    else
                    {
                        app.assignAuthentication(user);
                        app.defaultValidation(resp, fileINF020);

                        if (app.getServerSession().getACCCNX()) 
                        { //Si existe conexión.
                            System.out.println("Obtiene la conexion y verificara el usuario");
                            request.setAttribute("user", user.USR);
                            request.setAttribute("password", user.TOKEN);
                            serverSession.setServerSession(app.getServerSession());
                            PX041S01INF001Filter objUsuario = new PX041S01INF001Filter();
                            objUsuario.VP_USR = user.USR;
                            UserLogic logic = new UserLogic();
                            logic.setSession(serverSession.getServerSession());
                            List<PX041S01INF001Filter> accessUser = logic.accessUser(objUsuario);
                            request.setAttribute("accessUser", accessUser);

                            //map.put("usr_login", serverSession.getServerSession().getUserView().getUserInfo().USR);
                            //map.put("anio_actual", anio_actual());
                            return "success";
                        } 
                        else 
                        {
                            if(strResponse.equals("Password is expired."))
                            {                         
                                strResponse+=" Please change your password.";
                                return strResponse;
                            }
                            else
                            {
                                return strResponse;
                            }
                        }
                    }
                } 
                else 
                {
                    return strResponse;
                }
            } else {
                strResponse="Username or Password is incorrect.";
                return strResponse;
                //return "-1";
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            sw.toString();
            log.error("Message: " + (e.getMessage() == null ? "No Message" : e.getMessage()) + " Stacktrace: " + sw.toString());            
            return "Please, refresh the page and try again.";
            //return "Message: " + (e.getMessage() == null ? "No Message" : e.getMessage()) + " Stacktrace: " + sw.toString();
            
        }
    }

    @RequestMapping(value = "/logout")
    public @ResponseBody
    String logout(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

        int ret = 0;
        try {
            serverSession.setServerSession(null);
            //return "home";//"retu:" + serverSession.getAppRoot();
            ret = 1;

        } catch (Exception e) {
            //return "home";
            //return "redirect:" + serverSession.getAppRoot();
        }

        return new Gson().toJson(ret);
    }

    @RequestMapping(value = "/change_password")
    public String ChangePassword(ModelMap map, HttpServletRequest request) throws Exception {
        try {
            map.put("success", 0);
            map.put("anio_actual", anio_actual());
            map.put("msg", "");
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return "login/changepassword";
    }

    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    public @ResponseBody
    String changePassword(ModelMap map, HttpServletRequest request, HttpSession session) throws Exception {

        
        if (serverSession.getServerSession() == null) {
                this.InitialSession(request.getSession());
        }
        
        App app = new App(serverSession.getPropertySession());
        if(app.getServerSession()!=null)
            serverSession.setServerSession(app.getServerSession());
        
        String msg = "";
        try {
            INF001 user = new INF001();
            String USR = request.getParameter("txtAuthName");
            String TOKEN = request.getParameter("txtAuthPass");
            String NEWTOKEN = request.getParameter("txtNewPass");
            
            UserLogic logic = new UserLogic();
            logic.setSession(this.serverSession.getServerSession());
            //logic.SQP02491(USR);
            
            if (app.changePassword(USR, TOKEN, NEWTOKEN)) {
                msg = app.getMsgLogin();
                if ("".equals(msg)) {
                    msg = "Password was changed successfully.";
                }
                return msg;
            } else {
                msg = app.getMsgLogin();
                return msg;
            }

        } catch (Exception e) {
            return "-1";
        }
    }

    public int anio_actual() {
        Date fecha = new Date();
        Calendar calendario = Calendar.getInstance();
        calendario.setTime(fecha);
        int anio = calendario.get(Calendar.YEAR);

        return anio;
    }

    private INF020 getCustomerInfo() throws Exception {
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);
        logic.setSession(serverSession.getServerSession());
        INF020 customerInfo = serverSession.getServerSession().getUserView().getCustomerInfo();

        return customerInfo;
    }

    @RequestMapping(value = "/getCustomerInfo", method = RequestMethod.POST)
    public @ResponseBody
    String getCustomerInfo(HttpServletRequest request, HttpSession session) throws Exception {
        return new Gson().toJson(getCustomerInfo());
    }

    @RequestMapping(value = "/getMenu0", method = RequestMethod.POST)
    public @ResponseBody
    String getMenu0(HttpServletRequest request, HttpSession session) throws Exception {
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);
        INF020 customerInfo = serverSession.getServerSession().getUserView().getCustomerInfo();
        logic.setSession(serverSession.getServerSession());
//        String mtypeMenu = this.serverSession.propertySession.get("MTYPE_MENU") + "";
        String mtypeMenu = customerInfo.MTYPE + "";
        System.out.println("***** -> " + mtypeMenu);

        List<INF021> menuList;
        menuList = logic.getMenuHTML(getCustomerInfo(), "PX", mtypeMenu);

        return new Gson().toJson(menuList);
    }

    @RequestMapping(value = "/getMenu", method = RequestMethod.POST)
    public @ResponseBody
    String getMenu(HttpServletRequest request, HttpSession session) throws Exception {
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);  
        logic.setSession(serverSession.getServerSession());
        String mtypeMenu = this.serverSession.propertySession.get("MTYPE_MENU") + "";
//        String mtypeMenu = customerInfo.MTYPE + "";
        System.out.println("***** -> " + mtypeMenu);

        List<INF021> menuList;
        menuList = logic.getMenuHTML(getCustomerInfo(), "PX", mtypeMenu);

        return new Gson().toJson(menuList);
    }

    @RequestMapping(value = "/validateUserProgramAccess", method = RequestMethod.POST)
    public @ResponseBody
    String validateUserProgramAccess(HttpServletRequest request, HttpSession session) throws Exception {
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);
        logic.setSession(serverSession.getServerSession());

        PX041S01INF001Filter obj = new PX041S01INF001Filter();

        obj.VP_PROGRAM = request.getParameter("nprog");
        obj.VP_USR = getCustomerInfo().USR;

        PX041S01INF001Filter matrix = logic.accessProgram(obj);

        HashMap<String, String> oMap = new HashMap();

        oMap.put("allowed", String.valueOf(matrix.PERMA));

        return new Gson().toJson(oMap);
    }
    
    @RequestMapping(value = "/getAccessUser", method = RequestMethod.POST) 
    public @ResponseBody
    String getAccessUser(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- getAccessUser : Controller-------------");
        map.put("success", true);
        
        PX041S01INF001Filter objUsuario = new PX041S01INF001Filter();
        objUsuario.VP_USR = getCustomerInfo().USR;
        UserLogic logic = new UserLogic();
        logic.setSession(serverSession.getServerSession());
        List<PX041S01INF001Filter> accessUser = logic.accessUser(objUsuario);
        request.setAttribute("accessUser", accessUser);
        
        map.put("data", accessUser);
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "/validaSesion", method = RequestMethod.POST) 
    public @ResponseBody
    String validaSesion(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- validaSesion : Controller-------------");
        
        if(serverSession.getServerSession()==null) 
        {
            map.put("success", false); // SESION EXPIRADA
            map.put("sesion", SESSION_CONTROL);
        }
        else 
            map.put("success", true); // SESION ACTIVA
            
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/logAccessProgram", method = RequestMethod.POST)
    public @ResponseBody
    String logAccessProgram(ModelMap map, HttpServletRequest request) throws Exception {        
        
        if(serverSession.getServerSession()==null) 
        {
            map.put("success", false); // SESION EXPIRADA
            map.put("sesion", SESSION_CONTROL);
        }
        else 
        {
            UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);
            logic.setSession(serverSession.getServerSession());

            PX041S01INF001Filter obj = new PX041S01INF001Filter();

            obj.NPROG = request.getParameter("nprog");
            obj.USR = serverSession.getServerSession().getUserView().getUserInfo().USR;

            logic.logAccessProgram(obj);
            
            map.put("success", true); // SESION ACTIVA
        }   
        return new Gson().toJson(map);
    }
}
