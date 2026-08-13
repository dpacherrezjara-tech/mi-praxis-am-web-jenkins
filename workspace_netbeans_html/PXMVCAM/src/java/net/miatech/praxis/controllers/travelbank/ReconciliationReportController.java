/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.travelbank;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.travelbank.ReconciliationReportLogic;
import net.miatech.praxis.travelbank.SQP04995Filter;
import net.miatech.praxis.travelbank.SQP04996Filter;
import net.miatech.utils.Functions;
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
@RequestMapping("/ReconciliationReport")
public class ReconciliationReportController extends BaseController {

    private ReconciliationReportLogic logic;

// <editor-fold defaultstate="collapsed" desc="Resumen saldos x cuenta">    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04995Filter> listaData;
        SQP04995Filter filter;
        filter = new SQP04995Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_MONED = request.getParameter("VP_MONED");
            filter.VP_STAT = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ReconciliationReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04995Filter(filter);

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
        List<SQP04996Filter> listaData;
        SQP04996Filter filter;
        filter = new SQP04996Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_MONED = request.getParameter("VP_MONED");
            filter.VP_CRDID = request.getParameter("VP_CRDID");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_SERVC = request.getParameter("VP_SERVC");
            filter.VP_STAT = request.getParameter("VP_STAT");
            filter.VP_LSTA = request.getParameter("VP_LSTA");
            filter.VP_PSTA = request.getParameter("VP_PSTA");

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ReconciliationReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04996Filter(filter);

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

    //Donwload: Detalle SALDOS POR CUENTA
    @RequestMapping(value = "downloadText")
    public @ResponseBody
    void downloadText(HttpServletRequest request, HttpServletResponse response) {
        SQP04995Filter filter = new SQP04995Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Date date = new Date();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ReconciliationReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<SQP04995Filter> lst = logic.getSQP04995Filter(filter);

            int len = lst.size();
            Integer vi = 0;
            String vl_fileName = "Balance_account_number-" + date.getDay() + date.getMinutes() + date.getSeconds();
            File file = new File(rutaFile + "\\" + vl_fileName + ".txt");

            if (file.exists()) {
                file.delete();
            }

            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "Account_number_BT|Currency_BT|Balance|Balance_rev|Balance_pesos";
            writer.println("" + cadena);

            for (vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + lst.get(vi).A4460CUENT.trim() + "|";
                cadena += "" + lst.get(vi).A4460MONED + "|";
                cadena += "" + lst.get(vi).A4460SALDO + "|";
                cadena += "" + lst.get(vi).A4460SALRV + "|";
                cadena += "" + lst.get(vi).A4460SALPE ;                                
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            /**
             * Comprimimos archivo generado para su optima descarga
             */
            if (!zip(vl_fileName)) {
                response.setContentType("application/zip");
            }
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + vl_fileName + ".zip" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }

    }
    
    //Donwload: Detalle SALDOS POR CREDIT ID
    @RequestMapping(value = "downloadText_2")
    public @ResponseBody
    void downloadText_2(HttpServletRequest request, HttpServletResponse response) {
        SQP04996Filter filter = new SQP04996Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Date date = new Date();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ReconciliationReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<SQP04996Filter> lst = logic.getSQP04996Filter(filter);

            int len = lst.size();
            Integer vi = 0;
            String vl_fileName = "Conciliation_creditId_" + date.getDay() + date.getMinutes() + date.getSeconds();
            File file = new File(rutaFile + "\\" + vl_fileName + ".txt");

            if (file.exists()) {
                file.delete();
            }

            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "Processing_date|Account_number_BT|Currency_BT|Credit_id|Seq|Date_of_issue|"
                    + "Date_of_expire|Service_code|Orig_amount_local|Amount_used_local|Remaining_balance_local|"
                    + "Orig_amount_revenue|Amount_used_revenue|Remaining_balance_revenue|"
                    + "Orig_amount_pesos|Amount_used_pesos|Remaining_balance_pesos|"
                    + "Liabilty_account|Liabilty_credit_id|Liabilty_orig_amount|Liabilty_ramaining_balance|Status|"
                    + "Precon_account|Precon_credit_id|Precon_orig_amount|Precon_amt_used|Precon_amt_balance|"
                    + "Precon_orig_amount_rev|Precon_amount_used_rev|Precon_amount_balance_rev|"
                    + "Precon_orig_amount_peso|Precon_amount_used_peso|Precon_amount_balance_peso|Status";
            writer.println("" + cadena);

            for (vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + lst.get(vi).A4467FRPDA + "|";
                cadena += "" + lst.get(vi).A4467CUENT.trim() + "|";
                cadena += "" + lst.get(vi).A4467MONED + "|";
                cadena += "" + lst.get(vi).A4467CRDID + "|";
                cadena += "" + lst.get(vi).A4467CRDSQ + "|";
                cadena += "" + lst.get(vi).A4467FEMIS + "|";               
                cadena += "" + lst.get(vi).A4467EXPDT + "|";
                cadena += "" + lst.get(vi).A4467SERVC + "|";
//                travel bank
                cadena += "" + lst.get(vi).A4467AORIG + "|";
                cadena += "" + lst.get(vi).A4467AUSAD + "|";
                cadena += "" + lst.get(vi).A4467ABALR + "|";
                cadena += "" + lst.get(vi).A4467AORRV + "|";                
                cadena += "" + lst.get(vi).A4467AUSRV + "|";
                cadena += "" + lst.get(vi).A4467ABLRV+ "|";
                cadena += "" + lst.get(vi).A4467AORMX+ "|";
                cadena += "" + lst.get(vi).A4467AUSMX+ "|";
                cadena += "" + lst.get(vi).A4467ABLMX+ "|";
//                liability
                cadena += "" + lst.get(vi).A4467LCUEN.trim()+ "|";
                cadena += "" + lst.get(vi).A4467LCRID+ "|";
                cadena += "" + lst.get(vi).A4467LVORG+ "|";
                cadena += "" + lst.get(vi).A4467LBALR+ "|";
                cadena += "" + lst.get(vi).A4467LSTA+ "|";
//                oracle(sabre)
                cadena += "" + lst.get(vi).A4467PCUEN.trim()+ "|";
                cadena += "" + lst.get(vi).A4467PCRID+ "|";
                cadena += "" + lst.get(vi).A4467PORGA+ "|";
                cadena += "" + lst.get(vi).A4467PUSAD+ "|";
                cadena += "" + lst.get(vi).A4467PBALR+ "|";
                
                cadena += "" + lst.get(vi).A4467PORRV+ "|";
                cadena += "" + lst.get(vi).A4467PUSRV+ "|";
                cadena += "" + lst.get(vi).A4467PBLRV+ "|";
                
                cadena += "" + lst.get(vi).A4467PORMX+ "|";
                cadena += "" + lst.get(vi).A4467PUSMX+ "|";
                cadena += "" + lst.get(vi).A4467PBLMX+ "|";                
                cadena += "" + lst.get(vi).A4467PSTA;
                
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            /**
             * Comprimimos archivo generado para su optima descarga
             */
            if (!zip(vl_fileName)) {
                response.setContentType("application/zip");
            }
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + vl_fileName + ".zip" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }

    }

    public Boolean zip(String fileName) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File(path + "\\" + fileName + ".zip");

            if (fileZip.exists()) {
                fileZip.delete();
            }

            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".zip");

            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }

    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
        zipOutputStream.putNextEntry(zipEntry);
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        byte[] buf = new byte[4096];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.flush();
        zipOutputStream.closeEntry();
        zipOutputStream.close();
        fileOutputStream.close();
    }

}
