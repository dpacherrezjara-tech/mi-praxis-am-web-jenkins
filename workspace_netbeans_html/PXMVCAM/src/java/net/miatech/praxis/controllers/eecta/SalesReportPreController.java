/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.ReportVentaUATPPre;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04556Filter;
import net.miatech.praxis.eecta.SQP04557Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.SalesReportPreLogic;
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
@RequestMapping("/SalesReportPre")
public class SalesReportPreController extends BaseController {

    private SalesReportPreLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04556Filter> listaData;
        SQP04556Filter filter;
        filter = new SQP04556Filter();
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

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new SalesReportPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04556Filter(filter);

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

    @RequestMapping(value = "pdf_reportVentaUATP")
    void pdf_reportVentaUATP(HttpServletRequest request, HttpServletResponse response) {

        try {
            logic = new SalesReportPreLogic();
            logic.setSession(this.serverSession.getServerSession());

            SQP04557Filter filter;
            List<SQP04557Filter> listaData;
            filter = new SQP04557Filter();
            //Datos cabecera
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            listaData = logic.getSQP04557Filter(filter);
            String rutaTmp = this.serverSession.getPropertySession().get("RUTA_DOWNLOAD") + "\\";
            ReportVentaUATPPre reportVentaUATPPre = new ReportVentaUATPPre();
            File archivoPDF = reportVentaUATPPre.createReport(listaData, rutaTmp);

            // Generar TXT
            File archivoTXT = new File(rutaTmp + "reporte_venta_uatp.txt");
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(archivoTXT))) {

//                writer.write("REPORTE DE VENTAS N° " + listaData.get(0).rpteCab.A4245NRRPT);
//                writer.newLine();
//                writer.write("FECHA EMISIÓN: " + listaData.get(0).rpteCab.A4245FEECC);
//                writer.newLine();
//                writer.write("PERIODO: " + listaData.get(0).rpteCab.A4245INIPR + " AL " + listaData.get(0).rpteCab.A4245FINPR);
//                writer.newLine();
//
//                writer.write("CLIENTE:");
//                writer.newLine();
//                writer.write(listaData.get(0).tbl_client.A3953RSOCI);
//                writer.newLine();
//                writer.write(listaData.get(0).tbl_client.A3953DIRE1);
//                writer.newLine();
//                writer.write(listaData.get(0).tbl_client.A3953COLON);
//                writer.newLine();
//                writer.write(listaData.get(0).tbl_client.A3953DELEG);
//                writer.newLine();
//                writer.write("C.P." + listaData.get(0).tbl_client.A3953CP);
//                writer.newLine();
                writer.write("uatp;N_Boleto;F_Emision;Nombre_Pasajero;Trx;Ruta;UUID;UUID_Anticipo;Mda;Total");
                writer.newLine();
                
                for (SQP04557Filter item : listaData) {

//                    if (item.rpteDet1.A4260TIPO.equals("01")) {                  
//                        writer.write("UATP:" + item.rpteDet1.A4260CAM01);
//                        writer.newLine();
//                    }
//                    DETALLE 
                    if (item.rpteDet1.A4260TIPO.equals("02")) {
                        String TXT = item.rpteDet1.A4260NTARJ.trim()
                                + ';' + item.rpteDet1.A4260CAM01
                                + ';' + item.rpteDet1.A4260CAM02
                                + ';' + item.rpteDet1.A4260CAM03.trim()
                                + ';' + item.rpteDet1.A4260CAM04
                                + ';' + item.rpteDet1.A4260CAM05.trim()
                                + ';' + item.rpteDet1.A4260CAM06.trim()
                                + ';' + item.rpteDet1.A4260CAM07.trim()
                                + ';' + item.rpteDet1.A4260CAM08
                                + ';' + item.rpteDet1.A4260CAM09.trim();
                        writer.write(TXT);
                        writer.newLine();
                    }
//                    SUBTOTALES POR UATP
//                    if (item.rpteDet1.A4260TIPO.equals("03")) {
//                        writer.write(item.rpteDet1.A4260CAM01 + ' ' + item.rpteDet1.A4260CAM09);
//                        writer.newLine();
//                    }
                }
//                writer.write("GRAN TOTAL:" + formato_numero(listaData.get(0).rpteCab.A4245TOT));
            }

            // Crear ZIP
            String nombreZip = "reporte_venta_uatp.zip";
            File archivoZIP = new File(rutaTmp + nombreZip);
            try (FileOutputStream fos = new FileOutputStream(archivoZIP); ZipOutputStream zipOut = new ZipOutputStream(fos)) {

                // Añadir PDF al ZIP
                try (FileInputStream fisPDF = new FileInputStream(archivoPDF)) {
                    ZipEntry zipEntryPDF = new ZipEntry(archivoPDF.getName());
                    zipOut.putNextEntry(zipEntryPDF);
                    byte[] bytes = new byte[1024];
                    int length;
                    while ((length = fisPDF.read(bytes)) >= 0) {
                        zipOut.write(bytes, 0, length);
                    }
                }

                // Añadir TXT al ZIP
                try (FileInputStream fisTXT = new FileInputStream(archivoTXT)) {
                    ZipEntry zipEntryTXT = new ZipEntry(archivoTXT.getName());
                    zipOut.putNextEntry(zipEntryTXT);
                    byte[] bytes = new byte[1024];
                    int length;
                    while ((length = fisTXT.read(bytes)) >= 0) {
                        zipOut.write(bytes, 0, length);
                    }
                }

                zipOut.closeEntry();
            }

            // Configurar respuesta HTTP para descargar el ZIP
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + nombreZip + "\"");

            try (ServletOutputStream sos = response.getOutputStream(); FileInputStream fis = new FileInputStream(archivoZIP)) {
                byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
                sos.write(bytes);
                sos.flush();
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    public String formato_numero(double Number) {
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(2);
        formato.setMaximumFractionDigits(2);
        String NumberFormated = formato.format(Number);
        return NumberFormated;
    }

//    @RequestMapping(value = "pdf_reportVentaUATP")
//    void pdf_reportVentaUATP(HttpServletRequest request, HttpServletResponse response) {
//
//        try {
//            logic = new SalesReportPreLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            SQP04557Filter filter;
//            List<SQP04557Filter> listaData;
//            filter = new SQP04557Filter();
//            //Datos cabecera    
//            String beanString = request.getParameter("beanString");
//            filter = new Gson().fromJson(beanString, filter.getClass());
//            listaData = logic.getSQP04557Filter(filter);
//            String Rutatmp = this.serverSession.getPropertySession().get("RUTA_DOWNLOAD") + "\\";
//            
//            ReportVentaUATPPre reportVentaUATPPre = new ReportVentaUATPPre();
//            File archivo = reportVentaUATPPre.createReport(listaData, Rutatmp);
//            response.setHeader("Expires", "0");
//            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
//            response.setHeader("Pragma", "public");
//            response.setContentType("application/pdf");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");
//            //response.setContentLength(baos.size());
//            ServletOutputStream sos = null;
//            FileInputStream fis = null;
//            fis = new FileInputStream(new File(archivo.getAbsolutePath()));
//            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
//            sos = response.getOutputStream();
//            sos.write(bytes);
//            sos.flush();
//            sos.close();
//        } catch (Exception e) {
//            throw new SpringException(e);
//            //response.("mensaje", "ERROR AL GENERAR EL PDF");
//        }
//
//    }
}
