/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP05015Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.sales.LoadControlReportLogic;
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
@RequestMapping("/LoadControlReport")
public class LoadControlReportController extends BaseController {
    private LoadControlReportLogic logic;
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP05015Filter> listaData;
        SQP05015Filter filter;
        filter = new SQP05015Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_FPROC1 = request.getParameter("VP_FPROC1");           
            filter.VP_FUEN = request.getParameter("VP_FUEN");           
            filter.VP_PAIS = request.getParameter("VP_PAIS"); 
            
//            filter.VP_Fecha1 = request.getParameter("VP_Fecha1");
//            filter.VP_Fecha2 = request.getParameter("VP_Fecha2");
//            filter.VP_StatusFormateo = request.getParameter("VP_StatusFormateo"); 
            
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new LoadControlReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05015Filter(filter);
            map.put("success", true);
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
