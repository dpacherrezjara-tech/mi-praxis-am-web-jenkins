/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP04482Filter;
import net.miatech.beans.SQP04483Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.sales.VouchersIssuedVersusClaimsLogic;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/VouchersIssuedVersusClaims")
public class VouchersIssuedVersusClaimsController extends BaseController {
    private VouchersIssuedVersusClaimsLogic logic;
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04482Filter> listaData;
        SQP04482Filter filter;
        filter = new SQP04482Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_TicketTV = request.getParameter("VP_TicketTV");           
            filter.VP_TicketTK = request.getParameter("VP_TicketTK");           
            filter.VP_TicketTVIssueDate = request.getParameter("VP_TicketTVIssueDate"); 
            filter.VP_SystemDate = request.getParameter("VP_SystemDate");
            filter.VP_StatusFormateo = request.getParameter("VP_StatusFormateo"); 
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new VouchersIssuedVersusClaimsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04482Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "VouchersIssuedVersusClaimsCrud")
    public @ResponseBody
    String VouchersIssuedVersusClaimsCrud(ModelMap map, HttpServletRequest request) {        
        SQP04483Filter filter = new SQP04483Filter();
        SQP04483Filter objRtn = new SQP04483Filter();                
        try {
            logic = new VouchersIssuedVersusClaimsLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonArray gson_detail = parser.parse(request.getParameter("VP_JSON_LIST_TICKET")).getAsJsonArray();
            filter.VP_JSON_LIST_TICKET = gson_detail.toString(); 
            objRtn = logic.setSQP04483Filter(filter);                                       
            map.put("objRtn", objRtn);
            map.put("success", true);            
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
}
    