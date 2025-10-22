/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dto.UploadSFTPRequest;
import net.miatech.praxis.dto.UploadSFTPResponse;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.filter.SQP05607Filter;
import net.miatech.praxis.flown.filter.SQP05612Filter;
import net.miatech.praxis.flown.filter.SQP05613Filter;
import net.miatech.praxis.logic.flown.SimplifiedUsageFileLogic;
import net.miatech.praxis.service.SFTPUploadService;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/SimplifiedUsageFileControl")
public class SimplifiedUsageFileController extends BaseController {
    
    @Autowired
    private SFTPUploadService sftpUploadService;
    private final SimplifiedUsageFileLogic logic = new SimplifiedUsageFileLogic();

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP05607Filter> listaData;
        SQP05607Filter filter;
        filter = new SQP05607Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_FECHADESDE = request.getParameter("VP_FECHADESDE");
            filter.VP_FECHAHASTA = request.getParameter("VP_FECHAHASTA");
            filter.VP_STAT = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05607Filter(filter);

            map.put("success", true);
            map.put("total", !listaData.isEmpty() ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/detail-error")
    public @ResponseBody
    String detailError(ModelMap map, HttpServletRequest request) {
        List<SQP05612Filter> listaData;
        SQP05612Filter filter;
        filter = new SQP05612Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {

            filter.VP_FECHA = request.getParameter("VP_FECHA");
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 18;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05612Filter(filter);

            map.put("success", true);
            map.put("total", !listaData.isEmpty() ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/detail-cupons")
    public @ResponseBody
    String detailCupons(ModelMap map, HttpServletRequest request) {
        List<SQP05613Filter> listaData;
        SQP05613Filter filter;
        filter = new SQP05613Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_FECHA = request.getParameter("VP_FECHA");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05613Filter(filter);

            map.put("success", true);
            map.put("total", !listaData.isEmpty() ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/detail-cupons-to-txt", method = RequestMethod.GET)
    public @ResponseBody
    void detailCuponsToTxt(HttpServletRequest request, HttpServletResponse response) {
        List<SQP05613Filter> listaData;
        SQP05613Filter filter = new SQP05613Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            // Leer parámetros y preparar paginación (all)
            filter.VP_FECHA = request.getParameter("VP_FECHA");

            // Obtener datos
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05613Filter(filter);

            // Preparar respuesta HTTP para descarga
            String nombreArchivo = "AM_USAGE_" + filter.VP_FECHA + "_" + System.currentTimeMillis() + ".txt";

            response.setContentType("text/plain; charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"");

            // Escribir directamente en el OutputStream
            PrintWriter writer = response.getWriter();
            for (SQP05613Filter item : listaData) {
                if (item.TEXT != null) {
                    writer.println(item.TEXT);
                }
            }
            writer.flush();
            writer.close();

        } catch (Exception ex) {
            // Manejo de errores  
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            throw new SpringException(ex);
        }
    }
    
    /**
     * Endpoint para llamada ASINCRONA a la API de carga SFTP
     * Retorna inmediatamente con un mensaje de confirmación mientras el proceso se ejecuta en background
     * 
     * Ejemplo de uso con parámetros de request:
     * POST /SimplifiedUsageFileControl/upload-sftp-async
     * VP_CCUST=139&VP_FECHA1=20250822&VP_FECHA2=20250822&VP_TOPE=1
     * 
     * @param request HttpServletRequest con los parámetros
     * @return ResponseEntity con mensaje de confirmación
     */
    @RequestMapping(value = "/upload-sftp-async", method = RequestMethod.POST)
    public ResponseEntity<?> uploadSFTPAsync(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Construir objeto de solicitud desde parámetros
            UploadSFTPRequest uploadRequest = new UploadSFTPRequest();
            uploadRequest.setVP_CCUST(request.getParameter("VP_CCUST"));
            uploadRequest.setVP_FECHA1(request.getParameter("VP_FECHA1"));
            uploadRequest.setVP_FECHA2(request.getParameter("VP_FECHA2"));
            
            String topeParam = request.getParameter("VP_TOPE");
            if (topeParam != null && !topeParam.isEmpty()) {
                uploadRequest.setVP_TOPE(Integer.parseInt(topeParam));
            }
            
            // Llamada asíncrona - no espera resultado
           String API_URL = serverSession.getServerSession().getPropertySession().get("API_MI_AUTOSKER").toString();
           sftpUploadService.uploadFileAsync(uploadRequest, API_URL );
            
            // Retorna inmediatamente
            response.put("success", true);
            response.put("message", "Solicitud de carga SFTP iniciada. El proceso continuará en background.");
            response.put("timestamp", System.currentTimeMillis());
            return ResponseUtils.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
    
     /**
     * Endpoint para llamada ASÍNCRONA a la API de carga SFTP con JSON Body
     * Retorna inmediatamente con un mensaje de confirmación mientras el proceso se ejecuta en background
     * 
     * Ejemplo de uso con JSON:
     * POST /SimplifiedUsageFileControl/upload-sftp-async-json
     * Content-Type: application/json
     * {
     *   "VP_CCUST": "139",
     *   "VP_FECHA1": "20250822",
     *   "VP_FECHA2": "20250822",
     *   "VP_TOPE": 1
     * }
     * 
     * @param uploadRequest Objeto con los parámetros de la solicitud
     * @return ResponseEntity con mensaje de confirmación
     */
    @RequestMapping(value = "/upload-sftp-async-json", method = RequestMethod.POST)
    public ResponseEntity<?> uploadSFTPAsyncJSON(@RequestBody UploadSFTPRequest uploadRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Llamada asíncrona - no espera resultado
            String API_URL = serverSession.getServerSession().getPropertySession().get("API_MI_AUTOSKER").toString();
            sftpUploadService.uploadFileAsync(uploadRequest, API_URL);
            
            response.put("success", true);
            response.put("message", "Solicitud de carga SFTP iniciada. El proceso continuará en background.");
            response.put("timestamp", System.currentTimeMillis());
            response.put("request", uploadRequest);
            
            return ResponseUtils.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);  
        }
    }

}
