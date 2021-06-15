/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.ReportEdoCta;
import net.miatech.praxis.classes.ReportEdoCtaDet;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.A3953;
import net.miatech.praxis.eecta.A3958;
import net.miatech.praxis.eecta.A3981;
import net.miatech.praxis.eecta.A3982;
import net.miatech.praxis.eecta.A3990;
import net.miatech.praxis.eecta.SQP03976Filter;
import net.miatech.praxis.eecta.SQP03977Filter;
import net.miatech.praxis.eecta.SQP04001Filter;
import net.miatech.praxis.eecta.SQP04043Filter;
import net.miatech.praxis.eecta.SQP04050Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.EmisionEdoCtaLogic;
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
@RequestMapping("/EmisionEdoCta")
public class EmisionEdoCtaController extends BaseController {
    private EmisionEdoCtaLogic logic;
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03977Filter> listaData;
        SQP03977Filter filter;
        filter = new SQP03977Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NREDO = request.getParameter("VP_NREDO");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03977Filter(filter);

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

    @RequestMapping(value = "pdf_EstadoCuenta")
    void pdf_EstadoCuenta(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            logic = new EmisionEdoCtaLogic();
            logic.setSession(this.serverSession.getServerSession());
            SQP03976Filter filter;
            List<SQP03976Filter> listaData;
            filter = new SQP03976Filter();
            //Datos cabecera    
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            listaData = logic.getSQP03976Filter(filter);
            ReportEdoCta reportEdoCta = new ReportEdoCta();
            File archivo = reportEdoCta.createReport(listaData);
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");
            //response.setContentLength(baos.size());
            ServletOutputStream sos = null;
            FileInputStream fis = null;
            fis = new FileInputStream(new File(archivo.getAbsolutePath()));
            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
            sos = response.getOutputStream();
            sos.write(bytes);
            sos.flush();
            sos.close();
        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }

    }
    
    @RequestMapping(value = "pdf_EstadoCuenta_det")
    void pdf_EstadoCuenta_det(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            logic = new EmisionEdoCtaLogic();
            logic.setSession(this.serverSession.getServerSession());
            SQP04001Filter filter;
            List<SQP04001Filter> listaData;
            filter = new SQP04001Filter();
            //Datos cabecera    
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            listaData = logic.getSQP04001(filter);
            ReportEdoCtaDet reportEdoCtaDet = new ReportEdoCtaDet();
            File archivo = reportEdoCtaDet.createReport(listaData);
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");
            //response.setContentLength(baos.size());
            ServletOutputStream sos = null;
            FileInputStream fis = null;
            fis = new FileInputStream(new File(archivo.getAbsolutePath()));
            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
            sos = response.getOutputStream();
            sos.write(bytes);
            sos.flush();
            sos.close();
        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }

    }
    
    
    @RequestMapping(value = "ConsultaEdoCta")
    public @ResponseBody    
    String ConsultaEdoCta(ModelMap map, HttpServletRequest request) {
        List<SQP04043Filter> listaData;
        SQP04043Filter filter;
        filter = new SQP04043Filter();        
        try {            
            filter.VP_A3981FPERI = request.getParameter("VP_A3981FPERI");
            filter.VP_A3981CDCLI = request.getParameter("VP_A3981CDCLI");
            filter.VP_A3981FEJEC = request.getParameter("VP_A3981FEJEC");                        
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04043Filter(filter);
            
            //datos CLIENTE
            List<A3953> lstRtn01 = new  ArrayList<A3953>(0);            
            A3953 objRtn01;
            objRtn01 = new A3953();
            objRtn01.A3953RSOCI = listaData.get(0).tbl_client.A3953RSOCI;
            objRtn01.A3953DIRE1 = listaData.get(0).tbl_client.A3953DIRE1;
            objRtn01.A3953COLON = listaData.get(0).tbl_client.A3953COLON;
            objRtn01.A3953DELEG = listaData.get(0).tbl_client.A3953DELEG;
            objRtn01.A3953CP = listaData.get(0).tbl_client.A3953CP;
            //objRtn01.A3953LOGO = listaData.get(0).tbl_client.A3953LOGO.trim();
            objRtn01.A3953PLZCR = listaData.get(0).tbl_client.A3953PLZCR;
            objRtn01.A3953TORGN = listaData.get(0).tbl_client.A3953TORGN; 
            lstRtn01.add(objRtn01);
            
            List<A3981> lstRtn02 = new  ArrayList<A3981>(0);            
            A3981 objRtn02;            
            objRtn02 = new A3981();            
            objRtn02.A3981CDCLI = listaData.get(0).rpteCab.A3981CDCLI;
            objRtn02.A3981FEDOC = listaData.get(0).rpteCab.A3981FEDOC;
            objRtn02.A3981INIPR = listaData.get(0).rpteCab.A3981INIPR;
            objRtn02.A3981FINPR = listaData.get(0).rpteCab.A3981FINPR;
            objRtn02.A3981MDLOC = listaData.get(0).rpteCab.A3981MDLOC;
            objRtn02.A3981TOT = listaData.get(0).rpteCab.A3981TOT;
            objRtn02.A3981TOTLT = listaData.get(0).rpteCab.A3981TOTLT;
            lstRtn02.add(objRtn02);                        
            
            //VENTAS
            List<A3982> lstRtn03 = new  ArrayList<A3982>(0);            
            A3982 objRtn03;            
            for (int i = 4; i < listaData.size(); i++) {                
               if( listaData.get(i).rpteDet.A3982TREG.equals("02")){                                   
                objRtn03 = new A3982();
                objRtn03.A3982FECPR = listaData.get(i).rpteDet.A3982FECPR;
                objRtn03.A3982IDPRO = listaData.get(i).rpteDet.A3982IDPRO;
                objRtn03.A3982INIPR = listaData.get(i).rpteDet.A3982INIPR;
                objRtn03.A3982FINPR = listaData.get(i).rpteDet.A3982FINPR;
                objRtn03.A3982REFBC = listaData.get(i).rpteDet.A3982REFBC;
                objRtn03.A3982QTYTX = listaData.get(i).rpteDet.A3982QTYTX;
                objRtn03.A3982MDLOC = listaData.get(i).rpteDet.A3982MDLOC;
                objRtn03.A3982TOT = listaData.get(i).rpteDet.A3982TOT;                                
                lstRtn03.add(objRtn03);                
               }
            }
            //PAGOS
            List<A3982> lstRtn04 = new  ArrayList<A3982>(0);            
            A3982 objRtn04;  
            Double VL_SALDO_ANTEIOR = 0.0;
            for (int i = 4; i < listaData.size(); i++) {            
               if( listaData.get(i).rpteDet.A3982TREG.equals("00")){
                    VL_SALDO_ANTEIOR = VL_SALDO_ANTEIOR + listaData.get(i).rpteDet.A3982TOT;   
               } 
               if( listaData.get(i).rpteDet.A3982TREG.equals("01")){                                   
                objRtn04 = new A3982();
                objRtn04.A3982FECPR = listaData.get(i).rpteDet.A3982FECPR;
                objRtn04.NRRPT = listaData.get(i).rpteDet.NRRPT;
                objRtn04.A3982INIPR = listaData.get(i).rpteDet.A3982INIPR;
                objRtn04.A3982FINPR = listaData.get(i).rpteDet.A3982FINPR;
                objRtn04.A3982REFBC = listaData.get(i).rpteDet.A3982REFBC;
                objRtn04.A3982QTYTX = listaData.get(i).rpteDet.A3982QTYTX;
                objRtn04.A3982MDLOC = listaData.get(i).rpteDet.A3982MDLOC;
                objRtn04.A3982TOT = listaData.get(i).rpteDet.A3982TOT;                                 
                lstRtn04.add(objRtn04);                
               }
            }
//            //antiguedad de saldos
//            List<A3990> lstRtn05 = new  ArrayList<A3990>(0);            
//            A3990 objRtn05;            
//            objRtn05 = new A3990();            
//            objRtn05.A3990TOT = listaData.get(3).tbl_saldos.A3990TOT;
//            objRtn05.A3990TTLS0 = listaData.get(3).tbl_saldos.A3990TTLS0;
//            objRtn05.A3990TTLS1 = listaData.get(3).tbl_saldos.A3990TTLS1;
//            objRtn05.A3990TTLS2 = listaData.get(3).tbl_saldos.A3990TTLS2;
//            objRtn05.A3990TTLS3 = listaData.get(3).tbl_saldos.A3990TTLS3;
//            objRtn05.A3990TTLS4 = listaData.get(3).tbl_saldos.A3990TTLS4;
//            objRtn05.A3990TTLS5 = listaData.get(3).tbl_saldos.A3990TTLS5 + listaData.get(3).tbl_saldos.A3990TTLS6;
//            lstRtn05.add(objRtn05); 
            
            map.put("success", true);
            map.put("total", listaData.size());            
            map.put("SALDO_ANTEIOR", VL_SALDO_ANTEIOR);
            
            map.put("lstRtn01", lstRtn01);
            map.put("lstRtn02", lstRtn02);
            map.put("lstRtn03", lstRtn03);
            map.put("lstRtn04", lstRtn04);
            //map.put("lstRtn05", lstRtn05);
                        
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ConsultaEdoCtaDet")
    public @ResponseBody    
    String ConsultaEdoCtaDet(ModelMap map, HttpServletRequest request) {
        List<SQP04050Filter> listaData;
        SQP04050Filter filter;
        filter = new SQP04050Filter();        
        try {            
            filter.VP_A3981FPERI = request.getParameter("VP_A3981FPERI");
            filter.VP_A3981CDCLI = request.getParameter("VP_A3981CDCLI");
            filter.VP_A3981FEJEC = request.getParameter("VP_A3981FEJEC");                        
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04050Filter(filter);
            
            //datos CLIENTE
            List<A3953> lstRtn01 = new  ArrayList<A3953>(0);            
            A3953 objRtn01;
            objRtn01 = new A3953();
            objRtn01.A3953CDCLI = listaData.get(0).tbl_client.A3953CDCLI;
            objRtn01.A3953RSOCI = listaData.get(0).tbl_client.A3953RSOCI;
            objRtn01.A3953DIRE1 = listaData.get(0).tbl_client.A3953DIRE1;
            objRtn01.A3953COLON = listaData.get(0).tbl_client.A3953COLON;
            objRtn01.A3953DELEG = listaData.get(0).tbl_client.A3953DELEG;
            objRtn01.A3953CP = listaData.get(0).tbl_client.A3953CP;
            //objRtn01.A3953LOGO = listaData.get(0).tbl_client.A3953LOGO.trim();
            objRtn01.A3953PLZCR = listaData.get(0).tbl_client.A3953PLZCR;
            objRtn01.A3953TORGN = listaData.get(0).tbl_client.A3953TORGN; 
            lstRtn01.add(objRtn01);
            
            List<A3981> lstRtn02 = new  ArrayList<A3981>(0);            
            A3981 objRtn02;            
            objRtn02 = new A3981();            
            objRtn02.A3981CDCLI = listaData.get(0).rpteCab.A3981CDCLI;
            objRtn02.A3981FEDOC = listaData.get(0).rpteCab.A3981FEDOC;
            objRtn02.A3981INIPR = listaData.get(0).rpteCab.A3981INIPR;
            objRtn02.A3981FINPR = listaData.get(0).rpteCab.A3981FINPR;
            objRtn02.A3981MDLOC = listaData.get(0).rpteCab.A3981MDLOC;
            objRtn02.A3981TOT = listaData.get(0).rpteCab.A3981TOT;
            objRtn02.A3981TOTLT = listaData.get(0).rpteCab.A3981TOTLT;
            lstRtn02.add(objRtn02);                        
            
            //antiguedad de saldos
            List<A3990> lstRtn03 = new  ArrayList<A3990>(0);            
            A3990 objRtn03;            
            objRtn03 = new A3990();            
            objRtn03.A3990TOT = listaData.get(3).tbl_saldos.A3990TOT;
            objRtn03.A3990TTLS0 = listaData.get(3).tbl_saldos.A3990TTLS0;
            objRtn03.A3990TTLS1 = listaData.get(3).tbl_saldos.A3990TTLS1;
            objRtn03.A3990TTLS2 = listaData.get(3).tbl_saldos.A3990TTLS2;
            objRtn03.A3990TTLS3 = listaData.get(3).tbl_saldos.A3990TTLS3;
            objRtn03.A3990TTLS4 = listaData.get(3).tbl_saldos.A3990TTLS4;
            objRtn03.A3990TTLS5 = listaData.get(3).tbl_saldos.A3990TTLS5 + listaData.get(3).tbl_saldos.A3990TTLS6;
            lstRtn03.add(objRtn03); 
            
             //Detalle saldos
            List<A3958> lstRtn04 = new  ArrayList<A3958>(0);            
            A3958 objRtn04;            
            for (int i = 4; i < listaData.size(); i++) {                                                                  
                objRtn04 = new A3958();                
                objRtn04.A3958CCUST = listaData.get(i).rpteDet.A3958CCUST;
                objRtn04.A3958CIA = listaData.get(i).rpteDet.A3958CIA;
                objRtn04.A3958FORMA = listaData.get(i).rpteDet.A3958FORMA;
                objRtn04.A3958SERIE = listaData.get(i).rpteDet.A3958SERIE;
                objRtn04.A3958SEQ = listaData.get(i).rpteDet.A3958SEQ;                    
                objRtn04.A3958FEVTA = listaData.get(i).rpteDet.A3958FEVTA;
                objRtn04.A3958NRRPT = listaData.get(i).rpteDet.A3958NRRPT;
                objRtn04.A3958PAX = listaData.get(i).rpteDet.A3958PAX; 
                objRtn04.A3958SOLER = listaData.get(i).rpteDet.A3958SOLER; 
                objRtn04.A3958TRNCU = listaData.get(i).rpteDet.A3958TRNCU; 
                objRtn04.A3958RUTA = listaData.get(i).rpteDet.A3958RUTA.trim(); 
                objRtn04.A3958CFDI = listaData.get(i).rpteDet.A3958CFDI.trim();                    
                objRtn04.A3958MDLOC = listaData.get(i).rpteDet.A3958MDLOC;                   
                objRtn04.A3958TOT = listaData.get(i).rpteDet.A3958TOT;
                //objRtn04.CANT_DIA = rs04.getInt("CANT_DIA");                             
                lstRtn04.add(objRtn04);                               
            }
            
            map.put("success", true);
            map.put("total", listaData.size());            
                       
            map.put("lstRtn01", lstRtn01);
            map.put("lstRtn02", lstRtn02);
            map.put("lstRtn03", lstRtn03);
            map.put("lstRtn04", lstRtn04);
            
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
