/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.eecta.ControlUATPLogic;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/ControlUATP")
public class ControlUATPController extends BaseController {
    private ControlUATPLogic logic;
    
    /*
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP01558Filter> listaData;
        filter = new SQP01558Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_YEAR = request.getParameter("VP_YEAR");
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01558Filter(filter);

            map.put("success", true);
            //map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    */
}
