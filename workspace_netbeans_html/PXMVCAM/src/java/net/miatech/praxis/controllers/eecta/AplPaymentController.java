/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP03942Filter;
import net.miatech.praxis.eecta.SQP03943Filter;
import net.miatech.praxis.eecta.SQP03951Filter;
import net.miatech.praxis.eecta.SQP03952Filter;
import net.miatech.praxis.eecta.SQP03955Filter;
import net.miatech.praxis.eecta.SQP03956Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.AplPaymentLogic;
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
@RequestMapping("/AplPayment")
public class AplPaymentController extends BaseController {
    private AplPaymentLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03942Filter> listaData;
        SQP03942Filter filter;
        filter = new SQP03942Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            filter.VP_REFPG = request.getParameter("VP_REFPG");
            filter.VP_CTABC = request.getParameter("VP_CTABC");
            filter.VP_STSPG = request.getParameter("VP_STSPG");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03942Filter(filter);

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
    
    @RequestMapping(value = "/search_detalle_boleto"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String search_detalle_boleto(ModelMap map, HttpServletRequest request) {
        List<SQP03951Filter> listaData;
        SQP03951Filter filter;
        filter = new SQP03951Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
                        
            filter.VP_A3958CDCLI = request.getParameter("VP_A3958CDCLI");
            filter.VP_A3958NRRPT = request.getParameter("VP_A3958NRRPT");
                        
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03951Filter(filter);

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
    @RequestMapping(value = "set_ApplyPayment")
    public @ResponseBody
    String set_ApplyPayment(ModelMap map, HttpServletRequest request) {
        SQP03943Filter filter = new SQP03943Filter();
        SQP03943Filter objRtn;
        logic = new AplPaymentLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                       
            objRtn = logic.setSQP03943Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "set_ApplyPayment_boleto")
    public @ResponseBody
    String set_ApplyPayment_boleto(ModelMap map, HttpServletRequest request) {
        SQP03952Filter filter = new SQP03952Filter();
        SQP03952Filter objRtn;
        logic = new AplPaymentLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                      
            JsonParser parser = new JsonParser();
            JsonArray gson_detail = parser.parse(request.getParameter("json_detail")).getAsJsonArray();
            filter.VP_json_detail = gson_detail.toString();            
            objRtn = logic.setSQP03952Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
        
    @RequestMapping(value = "/get_aplpago")
    public @ResponseBody
    String get_aplpago(ModelMap map, HttpServletRequest request) {
        List<SQP03955Filter> listaData;
        SQP03955Filter filter;
        filter = new SQP03955Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 18;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03955Filter(filter);

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
    @RequestMapping(value = "/get_aplpago_detalle"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String get_aplpago_detalle(ModelMap map, HttpServletRequest request) {
        List<SQP03956Filter> listaData;
        SQP03956Filter filter;
        filter = new SQP03956Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_IDPG = request.getParameter("VP_IDPG");                        
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03956Filter(filter);
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
