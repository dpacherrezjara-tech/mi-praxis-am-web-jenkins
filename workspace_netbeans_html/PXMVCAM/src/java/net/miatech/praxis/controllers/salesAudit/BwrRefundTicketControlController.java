/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BwrRefundTicketControlLogic;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lremicio
 */
@Controller
@Scope("request")
@RequestMapping("/BwrRefundTicketControl")
public class BwrRefundTicketControlController extends BaseController {
    
    private static final Logger logError = Logger.getLogger("errorLog");
    private BwrRefundTicketControlLogic logic;
    
    @RequestMapping(value = "searchRefundTicketControl")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        A3389Filter filter = new A3389Filter();
        try{
            logic = new BwrRefundTicketControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;
            
            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").toString().trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").toString().trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
            
            if (!bExcel) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }else{
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            
            lst = logic.searchRefundTicketControl(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }
    
    /*
    public JavaToFlexResponse searchRefundTicketControl(A3389Filter filter) {
        JavaToFlexResponse resp = new JavaToFlexResponse();

        List<A3389Filter> listaData;

        serverSession.getCNXIBMDB2().open();
        BwrRefundTicketControlLogic logic = new BwrRefundTicketControlLogic();
        logic.setSession(serverSession);
        try {

            listaData = logic.searchRefundTicketControl(filter);
            resp.vars.put("lst_search", listaData);

        } catch (SQLException e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        return resp;
    }
    */
    
}
