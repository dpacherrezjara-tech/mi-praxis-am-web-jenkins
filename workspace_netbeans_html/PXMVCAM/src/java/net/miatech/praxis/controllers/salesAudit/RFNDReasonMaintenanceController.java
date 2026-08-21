/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A3651Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RFNDReasonMaintenanceLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez 
 */
@Controller
@Scope("request")
@RequestMapping("/RFNDReasonMaintenance")
public class RFNDReasonMaintenanceController extends BaseController {
     private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDReasonMaintenanceLogic logic;
    
    
    @RequestMapping(value = "SearchRFNDReasaons")
    public @ResponseBody
    String SearchRFNDReasaons(ModelMap map, HttpServletRequest request) {
        List<A3651Filter> lst;
        A3651Filter filter = new A3651Filter();
        
        try{
            logic = new RFNDReasonMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());
            
            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;
            
            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CODRAZ = request.getParameter("IN_CODRAZ").toString().trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_COMENT = request.getParameter("IN_COMENT").toString().trim();
            filter.A3651FAMIL = request.getParameter("A3651FAMIL").toString().trim();
            
            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            
            lst = logic.SearchRFNDReasaons(filter);
        }catch (Exception e) {
            throw new SpringException(e);
        }
        
        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "MantRFNDReasaons")
    public @ResponseBody
    String MantRFNDReasaons(ModelMap map, HttpServletRequest request) {
        String result="";
        A3651Filter filter = new A3651Filter();
        
        try{
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            RFNDReasonMaintenanceLogic logic = new RFNDReasonMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(filter);
        
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
         return new Gson().toJson(map);
    }
    
}
