/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04000Filter;
import net.miatech.praxis.logic.eecta.DetalleSaldoLogic;
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
@RequestMapping("/DetalleSaldo")
public class DetalleSaldoController extends BaseController {
    private DetalleSaldoLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04000Filter> listaData;
        SQP04000Filter filter;
        filter = new SQP04000Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            filter.VP_REFPG = request.getParameter("VP_REFPG");
            filter.VP_CTABC = request.getParameter("VP_CTABC");
            filter.VP_STSPG = request.getParameter("VP_STSPG");
            filter.VP_BOLETO = request.getParameter("VP_BOLETO");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new DetalleSaldoLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04000(filter);

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
    
}
