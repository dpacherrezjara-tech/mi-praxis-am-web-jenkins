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
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.travelbank.TransaccionErrorLogic;
import net.miatech.praxis.travelbank.SQP04948Filter;
import net.miatech.praxis.travelbank.SQP04949Filter;
import net.miatech.praxis.travelbank.SQP04984Filter;
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
@RequestMapping("/TransaccionError")
public class TransaccionErrorController extends BaseController {

    private TransaccionErrorLogic logic;

// <editor-fold defaultstate="collapsed" desc="Resumen de errores">    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04948Filter> listaData;
        SQP04948Filter filter;
        filter = new SQP04948Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransaccionErrorLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04948Filter(filter);

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

    @RequestMapping(value = "/searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {
        List<SQP04949Filter> listaData;
        SQP04949Filter filter;
        filter = new SQP04949Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_PRDA = request.getParameter("VP_PRDA");
            filter.VP_SQDIA = request.getParameter("VP_SQDIA");
            filter.VP_CDERR = request.getParameter("VP_CDERR");

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransaccionErrorLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04949Filter(filter);

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
    
    @RequestMapping(value = "setIssueCrud")
    public @ResponseBody
    String setIssueCrud(ModelMap map, HttpServletRequest request) {
        SQP04984Filter filter = new SQP04984Filter();
        SQP04984Filter objRtn;        
        logic = new TransaccionErrorLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP04984Filter(filter);        
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }

}
