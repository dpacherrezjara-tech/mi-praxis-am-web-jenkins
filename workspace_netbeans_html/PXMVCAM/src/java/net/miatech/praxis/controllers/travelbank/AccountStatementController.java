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
import net.miatech.praxis.logic.travelbank.AccountStatementLogic;
import net.miatech.praxis.travelbank.SQP04825Filter;
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
@RequestMapping("/AccountStatement")
public class AccountStatementController extends BaseController {

    private AccountStatementLogic logic;

    // <editor-fold defaultstate="collapsed" desc="ISSUES">
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04825Filter> listaData;
        SQP04825Filter filter;
        filter = new SQP04825Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_MONEDA = request.getParameter("VP_MONEDA");
            filter.VP_ARCHI = request.getParameter("VP_ARCHI");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new AccountStatementLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04825Filter(filter);

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

    // </editor-fold>
}
