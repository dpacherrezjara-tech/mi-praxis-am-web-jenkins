/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.travelbank;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.travelbank.TransaccionBalanceLogic;
import net.miatech.praxis.travelbank.SQP04894Filter;
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
@RequestMapping("/TransaccionBalance")
public class TransaccionBalanceController extends BaseController {

    private TransaccionBalanceLogic logic;
// <editor-fold defaultstate="collapsed" desc="CONSULTA POR TRANSACC ID">
    
    @RequestMapping(value = "/searchTransactionId")
    public @ResponseBody
    String searchTransactionId(ModelMap map, HttpServletRequest request) {
        List<SQP04894Filter> listaData;
        SQP04894Filter filter;
        filter = new SQP04894Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FECHA1 = request.getParameter("VP_FECHA1");
            filter.VP_FECHA2 = request.getParameter("VP_FECHA2");
            filter.VP_ACCNBR = request.getParameter("VP_ACCNBR");
            filter.VP_CREDID = request.getParameter("VP_CREDID");
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransaccionBalanceLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04894Filter(filter);

            map.put("success", true);
//            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("total", listaData.size());
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

}
