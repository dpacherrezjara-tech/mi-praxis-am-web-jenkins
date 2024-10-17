/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04527Filter;
import net.miatech.praxis.eecta.SQP04587Filter;
import net.miatech.praxis.eecta.SQP04588Filter;
import net.miatech.praxis.eecta.SQP04589Filter;
import net.miatech.praxis.eecta.SQP04666Filter;
import net.miatech.praxis.eecta.SQP05212Filter;
import net.miatech.praxis.eecta.SQP05241Filter;
import net.miatech.praxis.eecta.SQP05242Filter;
import net.miatech.praxis.eecta.SQP05245Filter;
import net.miatech.praxis.logic.eecta.CatalogoContratosPreLogic;
import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
    
    //-- Facturacion PRECOMPRA BENEFICIO NC // Para opcion manual
    @RequestMapping(value = "setInvoiceNCBeneficio", method = RequestMethod.POST)
    public @ResponseBody
    String setInvoiceNCBeneficio(ModelMap map, HttpServletRequest request) {
        SQP05212Filter objRtn = new SQP05212Filter();
        logic = new CatalogoContratosPreLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP05212Filter filter = new SQP05212Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP05212Filter(filter);
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
    
    //-- Facturacion PRECOMPRA NC TKT // Para opcion manual
    @RequestMapping(value = "setInvoiceNCTicket", method = RequestMethod.POST)
    public @ResponseBody
    String setInvoiceNCTicket(ModelMap map, HttpServletRequest request) {
        SQP05245Filter objRtn = new SQP05245Filter();
        logic = new CatalogoContratosPreLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP05245Filter filter = new SQP05245Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP05245Filter(filter);
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

    @RequestMapping(value = "/uploadContrato", method = RequestMethod.POST)
    public @ResponseBody
    String uploadLogo(ModelMap map, @RequestParam("logofile") MultipartFile file, HttpServletRequest request) throws IOException {
        SQP05241Filter filter = new SQP05241Filter();
        SQP05241Filter objRtn;
        Boolean vl_success = false;

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            String rutaFile = "\\\\10.0.0.87\\am\\UATP_PRECOMPRA\\CONTRATOS\\N" + filter.VP_A4549IDANT;

            byte[] bytes = file.getBytes();
            String StrfileName = file.getOriginalFilename();
            Path dir = Paths.get(rutaFile);

            filter.VP_A4549PATHF = "\\N" + filter.VP_A4549IDANT; //rutaFile;
            filter.VP_A4549NCONT = StrfileName;
            
            logic = new CatalogoContratosPreLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.setSQP05241Filter(filter);

            if (objRtn.dbException.SQLCODE.equals("1")) {
                File directory = new File(String.valueOf(dir));
                if (!Files.exists(dir)) {
                    directory.mkdir();
                }
                //File dir2 = new File(directory, "N" + filter.VP_A4549IDANT);
                //dir2.mkdir();
                String strArchivo = rutaFile + "\\" + StrfileName;
                File archivo = new File(strArchivo);
                FileOutputStream fs = new FileOutputStream(archivo);
                fs.write(bytes);
                fs.flush();
                fs.close();
                vl_success = true;
            }
            map.put("success", vl_success);
            map.put("objRtn", objRtn);

        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            objRtn = filter;
            objRtn.dbException.MESSAGE = ex.getMessage();
            objRtn.dbException.SQLCODE = "1";
            map.put("objRtn", objRtn);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchAttachFile")
    public @ResponseBody
    String searchAttachFile(ModelMap map, HttpServletRequest request) {
        List<SQP05242Filter> listaData;
        SQP05242Filter filter;
        filter = new SQP05242Filter();
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
            listaData = logic.getSQP05242Filter(filter);

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

    @RequestMapping(value = "/donwloadFile")
    public @ResponseBody
    void getPDF(HttpServletRequest request, HttpServletResponse response) {

        String rutaPX = "\\\\10.0.0.87\\am\\UATP_PRECOMPRA\\CONTRATOS"; 
        String vl_path;
        String vl_archivo;
        
        SQP05242Filter filter;
        filter = new SQP05242Filter();
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        vl_path = filter.path;
        vl_archivo = filter.fileName;        
        //String urlPDF = "\\\\10.0.0.87\\am\\UATP_PRECOMPRA\\CONTRATOS\\N5\\tmp6028036993688383694ReportEdoCta.pdf";
        String urlPDF = rutaPX + vl_path + "\\" + vl_archivo;
        String rutaLocalDestino = "C:\\Dumps\\" + vl_archivo;

        try {
            descargarPDF(urlPDF, rutaLocalDestino);
            System.out.println("Descarga completada.");
            
            String fileNameDownload = vl_archivo;
            File file = new File(String.valueOf(rutaLocalDestino));
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            InputStream is = new FileInputStream(file.getAbsolutePath());
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException e) {
            System.err.println("Error al descargar el PDF: " + e.getMessage());
        }
    }

    public static void descargarPDF(String rutaRedPDF, String rutaLocalDestino) throws IOException {
        try (FileInputStream inputStream = new FileInputStream(rutaRedPDF);
                FileOutputStream outputStream = new FileOutputStream(rutaLocalDestino)) {
            FileChannel sourceChannel = inputStream.getChannel();
            FileChannel destinationChannel = outputStream.getChannel();
            // Copiar datos del canal de origen al canal de destino
            sourceChannel.transferTo(0, sourceChannel.size(), destinationChannel);
        }
    }

}
