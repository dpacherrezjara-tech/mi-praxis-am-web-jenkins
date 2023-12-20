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
import net.miatech.praxis.eecta.SQP04527Filter;
import net.miatech.praxis.eecta.SQP04587Filter;
import net.miatech.praxis.eecta.SQP04588Filter;
import net.miatech.praxis.eecta.SQP04589Filter;
import net.miatech.praxis.eecta.SQP04666Filter;
import net.miatech.praxis.logic.eecta.CatalogoContratosPreLogic;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/CatalogoContratosPre")
public class CatalogoContratosPreController extends BaseController {

    private CatalogoContratosPreLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04587Filter> listaData;
        SQP04587Filter filter;
        filter = new SQP04587Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FECHA1 = request.getParameter("VP_FECHA1");
            filter.VP_FECHA2 = request.getParameter("VP_FECHA2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_PARAM = request.getParameter("VP_PARAM");

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoContratosPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04587Filter(filter);

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

    @RequestMapping(value = "/searchDet")
    public @ResponseBody
    String searchDet(ModelMap map, HttpServletRequest request) {
        List<SQP04588Filter> listaData;
        SQP04588Filter filter;
        filter = new SQP04588Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_IDANT = Integer.parseInt(request.getParameter("VP_IDANT"));
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoContratosPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04588Filter(filter);

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

    @RequestMapping(value = "/searchUATPCliente")
    public @ResponseBody
    String searchUATPCliente(ModelMap map, HttpServletRequest request) {
        List<SQP04589Filter> listaData;
        SQP04589Filter filter;
        filter = new SQP04589Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoContratosPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04589Filter(filter);

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

    @RequestMapping(value = "setContratosCrud", method = RequestMethod.POST)
    public @ResponseBody
    String setContratosCrud(ModelMap map, HttpServletRequest request) {
        SQP04527Filter objRtn = new SQP04527Filter();
        logic = new CatalogoContratosPreLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP04527Filter filter = new SQP04527Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonArray gson_uatp = parser.parse(request.getParameter("beanuatp")).getAsJsonArray();
            filter.VP_UATPS = gson_uatp.toString();

            objRtn = logic.setSQP04527Filter(filter);
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = ex.toString();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "setPreCompraInvoice", method = RequestMethod.POST)
    public @ResponseBody
    String setPreCompraInvoice(ModelMap map, HttpServletRequest request) {
        SQP04666Filter objRtn = new SQP04666Filter();
        logic = new CatalogoContratosPreLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP04666Filter filter = new SQP04666Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            objRtn = logic.setSQP04666Filter(filter);
            map.put("success", true);
            map.put("objRtn", objRtn);
            
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = ex.toString();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
    

}
