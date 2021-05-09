/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.discharges;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A3936;
import net.miatech.beans.SQP03961Filter;
import net.miatech.beans.SQP03962Filter;
import net.miatech.beans.SQP03963Filter;
import net.miatech.beans.SQP03964Filter;
import net.miatech.beans.SQP03965Filter;
import net.miatech.beans.SQP03974Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.discharges.NoShowLogic;
import org.apache.commons.io.IOUtils;
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
@RequestMapping("/NoShow")
public class NoShowController extends BaseController {

    private NoShowLogic logic;

    @RequestMapping(value = "/search_control_recep")
    public @ResponseBody
    String search_control_recep(ModelMap map, HttpServletRequest request) {
        List<SQP03961Filter> listaData;
        SQP03961Filter filter;
        filter = new SQP03961Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_A3933FPROC1 = request.getParameter("VP_A3933FPROC1");
            filter.VP_A3933FPROC2 = request.getParameter("VP_A3933FPROC2");
            filter.VP_A3933STAT = request.getParameter("VP_A3933STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03961(filter);
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

    @RequestMapping(value = "/search_detalle_noshow")
    public @ResponseBody
    String search_detalle_noshow(ModelMap map, HttpServletRequest request) {
        List<SQP03962Filter> listaData;
        SQP03962Filter filter;
        filter = new SQP03962Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3932RPDA = request.getParameter("VP_A3932RPDA");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3932SEQ = request.getParameter("VP_SEQ");
            filter.A3932ESTAD = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03962(filter);
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

    @RequestMapping(value = "/search_err_noshow")
    public @ResponseBody
    String search_err_noshow(ModelMap map, HttpServletRequest request) {
        List<SQP03963Filter> listaData;
        SQP03963Filter filter;
        filter = new SQP03963Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3934FPROC = request.getParameter("VP_A3934FPROC");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3934SEQ = request.getParameter("VP_SEQ");
            filter.A3934STSER = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03963(filter);
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

    @RequestMapping(value = "/search_XML_ticket")
    public @ResponseBody
    String search_XML_ticket(ModelMap map, HttpServletRequest request) {
        List<SQP03964Filter> listaData;
        SQP03964Filter filter;
        filter = new SQP03964Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.FPROC = request.getParameter("VP_FPROC");
            filter.TICKET_NUMBER = request.getParameter("VP_TICKET");
            filter.SEQ = request.getParameter("VP_SEQ");
            filter.OPRESULTCODE = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03964(filter);
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

    @RequestMapping(value = "/search_info_boleto_XML")
    public @ResponseBody
    String search_info_boleto_XML(ModelMap map, HttpServletRequest request) {
        List<SQP03965Filter> listaData;
        List<A3936> listaDataDet = new ArrayList<>(0);
        SQP03965Filter filter;
        A3936 objRtn;
        filter = new SQP03965Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3935CCIA = request.getParameter("VP_A3935CCIA");
            filter.A3935FORMA = request.getParameter("VP_A3935FORMA");
            filter.A3935SERIE = request.getParameter("VP_A3935SERIE");
            filter.A3935SEQ = request.getParameter("VP_A3935SEQ");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03965Filter(filter);
            //detalle cupones
            for (int i = 1; i < listaData.size(); i++) {
                objRtn = new A3936();
                objRtn.A3936CCUST = listaData.get(i).det_cpn.A3936CCUST;
                objRtn.A3936CCIA = listaData.get(i).det_cpn.A3936CCIA;
                objRtn.A3936FORMA = listaData.get(i).det_cpn.A3936FORMA;
                objRtn.A3936SERIE = listaData.get(i).det_cpn.A3936SERIE;
                objRtn.A3936SEQ = listaData.get(i).det_cpn.A3936SEQ;
                objRtn.A3936SEQ = listaData.get(i).det_cpn.A3936SEQ;
                objRtn.A3936CUPON = listaData.get(i).det_cpn.A3936CUPON;
                objRtn.A3936SECPN = listaData.get(i).det_cpn.A3936SECPN;
                objRtn.A3936FLAG = listaData.get(i).det_cpn.A3936FLAG;
                objRtn.A3936NSEQ = listaData.get(i).det_cpn.A3936NSEQ;
                objRtn.A3936CIAI = listaData.get(i).det_cpn.A3936CIAI;
                objRtn.A3936FORMI = listaData.get(i).det_cpn.A3936FORMI;
                objRtn.A3936SERII = listaData.get(i).det_cpn.A3936SERII;
                objRtn.A3936ORIG = listaData.get(i).det_cpn.A3936ORIG;
                objRtn.A3936DEST = listaData.get(i).det_cpn.A3936DEST;
                objRtn.A3936CARN = listaData.get(i).det_cpn.A3936CARN;
                objRtn.A3936CARA = listaData.get(i).det_cpn.A3936CARA;
                objRtn.A3936NVLO = listaData.get(i).det_cpn.A3936NVLO;
                objRtn.A3936FVLO = listaData.get(i).det_cpn.A3936FVLO;
                objRtn.A3936HVLO = listaData.get(i).det_cpn.A3936HVLO;
                objRtn.A3936FVLA = listaData.get(i).det_cpn.A3936FVLA;
                objRtn.A3936CLAS = listaData.get(i).det_cpn.A3936CLAS;
                objRtn.A3936FBUS = listaData.get(i).det_cpn.A3936FBUS;
                objRtn.A3936TDSG = listaData.get(i).det_cpn.A3936TDSG;
                objRtn.A3936BSTA = listaData.get(i).det_cpn.A3936BSTA;
                objRtn.A3936CSTA = listaData.get(i).det_cpn.A3936CSTA;
                listaDataDet.add(objRtn);
            }

            map.put("success", true);
            map.put("total", listaData.size());
            map.put("dataCab", listaData.get(0));
            map.put("dataDet", listaDataDet);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search_log_det")
    public @ResponseBody
    String search_log_det(ModelMap map, HttpServletRequest request) {
        List<SQP03974Filter> listaData;
        SQP03974Filter filter;
        filter = new SQP03974Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3980FFILE = request.getParameter("VP_A3980FFILE");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3980SEQ = request.getParameter("VP_SEQ");
            filter.A3980APLIC = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03974Filter(filter);
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
    
    @RequestMapping(value = "downloadTextLog")
    public @ResponseBody        
    void downloadTextLog(HttpServletRequest request, HttpServletResponse response) {
        List<SQP03974Filter> listaData;
        SQP03974Filter filter;
        filter = new SQP03974Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Date date = new Date();        
        try{
            //Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.A3980FFILE = request.getParameter("VP_A3980FFILE");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3980SEQ = request.getParameter("VP_SEQ");
            filter.A3980APLIC = request.getParameter("VP_STAT");
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            listaData = logic.loadSQP03974Filter(filter);
            
            int len = listaData.size();
            Integer vi = 0;            
            String fileName = "DetalleLog-"+filter.A3980FFILE+"-"+date.getDay()+date.getMinutes()+date.getSeconds();
            File file = new File(rutaFile + "\\" + fileName + ".txt");
            
            if (file.exists())
                file.delete();
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "CCUST|RPDA|FFILE|TICKET|SEQ|CUPON|TICKETI|APLICA|TEXT";
            writer.println("" + cadena );
            
            for (vi = 0; vi < len; vi++) {                
                cadena = "";                                
                cadena += "" + listaData.get(vi).A3980CCUST + "|";
                cadena += "" + listaData.get(vi).A3980RPDA + "|";
                cadena += "" + listaData.get(vi).A3980FFILE + "|";
                cadena += "" + listaData.get(vi).A3980CCIA +listaData.get(vi).A3980FORMA +listaData.get(vi).A3980SERIE + "|";
                cadena += "" + listaData.get(vi).A3980SEQ + "|";
                cadena += "" + listaData.get(vi).A3980CUPON + "|";               
                cadena += "" + listaData.get(vi).A3980TICKI + "|";
                cadena += "" + listaData.get(vi).A3980APLIC + "|";
                cadena += "" + listaData.get(vi).A3980TEXT.trim();                                
                writer.println("" + cadena );
            }
            writer.flush();
            writer.close();
            
            /**
             * Comprimimos archivo generado para su optima descarga
             */
            //if (!zip(filter.fileName))
            
            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            

        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }
        
    } 
}
