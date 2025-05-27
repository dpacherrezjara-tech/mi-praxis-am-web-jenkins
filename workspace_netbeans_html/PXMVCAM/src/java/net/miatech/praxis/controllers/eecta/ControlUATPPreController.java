/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP03347Filter;
import net.miatech.praxis.eecta.SQP03348Filter;
import net.miatech.praxis.eecta.SQP04229Filter;
import net.miatech.praxis.eecta.SQP04530Filter;
import net.miatech.praxis.eecta.SQP05188Filter;
import net.miatech.praxis.eecta.SQP05189Filter;
import net.miatech.praxis.eecta.SQP05190Filter;
import net.miatech.praxis.eecta.SQP05191Filter;
import net.miatech.praxis.eecta.SQP05192Filter;
import net.miatech.praxis.eecta.SQP05524Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.ControlUATPPreLogic;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONValue;
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
@RequestMapping("/ControlUATPPre")
public class ControlUATPPreController extends BaseController {

    private ControlUATPPreLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP05188Filter> listaData;
        SQP05188Filter filter;
        filter = new SQP05188Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ControlUATPPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05188Filter(filter);

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

    @RequestMapping(value = "/search_det")
    public @ResponseBody
    String search_det(ModelMap map, HttpServletRequest request) {
        List<SQP05189Filter> listaData;
        SQP05189Filter filter;
        filter = new SQP05189Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.VP_ESTADO = request.getParameter("VP_ESTADO");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ControlUATPPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05189Filter(filter);

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

    @RequestMapping(value = "set_procesar")
    public @ResponseBody
    String set_procesar(ModelMap map, HttpServletRequest request) {

        SQP04530Filter filter = new SQP04530Filter();
        SQP04530Filter objRtn = new SQP04530Filter();
        SQP03348Filter objRtn01;
        try {
            logic = new ControlUATPPreLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP04530Filter(filter);
            map.put("objRtn", objRtn);
            map.put("success", true);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            //throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }

    //obtener UUID desde: amfeapprest.miatech.net/ws/rest/ApiGW   
    @RequestMapping(value = "set_procesarUUID")
    public @ResponseBody
    String set_procesarUUID(ModelMap map, HttpServletRequest request) {

        SQP04530Filter filter = new SQP04530Filter();
        SQP04530Filter objRtn = new SQP04530Filter();
        SQP03348Filter objRtn01;

        try {
            logic = new ControlUATPPreLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP04530Filter(filter);
            //obtener UUID desde: amfeapprest.miatech.net/ws/rest/ApiGW                                                                        
            objRtn01 = this.setSQP03348Filter(filter);
            if (!objRtn01.dbException.SQLCODE.equals('1')) {
                objRtn.dbException.MESSAGE = objRtn01.dbException.MESSAGE;
                objRtn.dbException.SQLCODE = objRtn01.dbException.SQLCODE;
            }
            map.put("objRtn", objRtn);
            map.put("success", true);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }

    SQP03348Filter setSQP03348Filter(SQP04530Filter param) throws SQLException, Exception {

        List<SQP03347Filter> listaData;
        SQP03347Filter filter = new SQP03347Filter();
        SQP03348Filter objRtn = null;
        filter.VP_FDESDE = param.VP_FDATE1;
        filter.VP_FHASTA = param.VP_FDATE2;

        logic = new ControlUATPPreLogic();
        logic.setSession(this.serverSession.getServerSession());
        listaData = logic.getSQP03347Filter(filter);
        String URL = "http://amfeapprest.miatech.net/ws/rest/ApiGW";

        ArrayList<String> list = new ArrayList<String>();//Creating arraylist 

        String json_texto1;
        String json_texto = "";
        json_texto1 = "[";

        for (int i = 0; i < listaData.size(); i++) {
            String p_boleto = listaData.get(i).A4054CIA + listaData.get(i).A4054FORMA + listaData.get(i).A4054SERIE;
            String p_transa = listaData.get(i).A4054TRNCU.trim();
            String p_payload = "['SP_CONSULTA_CFDI',['" + p_boleto + "','" + p_transa + "']]";

            Unirest.setTimeouts(3600000, 3600000);
            Unirest.setTimeouts(0, 0);
            HttpResponse<String> response = Unirest.post(URL)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .field("service", "AME_FE")
                    .field("payload", p_payload)
                    .asString();
//            System.out.println("**RESPONSE >>" + response.getBody());            
            String json = response.getBody();
            //input
            String VL_CCIA = listaData.get(i).A4054CIA;
            String VL_FORMA = listaData.get(i).A4054FORMA;
            String VL_SERIE = listaData.get(i).A4054SERIE;
            String VL_SEQ = listaData.get(i).A4054SEQ;
            String VL_TRNCU = listaData.get(i).A4054TRNCU;
            String VL_GRUPO = listaData.get(i).A4054GRUPO;

            JsonParser parser = new JsonParser();
            JsonArray gson_lin = parser.parse(json).getAsJsonArray();
            HashMap obj = new HashMap();
            obj.put("VP_CCIA", VL_CCIA);
            obj.put("VP_FORMA", VL_FORMA);
            obj.put("VP_SERIE", VL_SERIE);
            obj.put("VP_SEQ", VL_SEQ);
            obj.put("VP_TRNCU", VL_TRNCU);
            obj.put("VP_GRUPO", VL_GRUPO);
            //output
            for (JsonElement row : gson_lin) {
                JsonObject gsonObj = row.getAsJsonObject();
                obj.put("TICKETNUMBER", gsonObj.get("TICKETNUMBER").getAsString());
                obj.put("SERIE", gsonObj.get("SERIE").getAsString());
                obj.put("TYPE_TRANS", gsonObj.get("TYPE_TRANS").getAsString());
                obj.put("UUID", gsonObj.get("UUID").getAsString());
                obj.put("FECHA", gsonObj.get("FECHA").getAsString());
                obj.put("RFC", gsonObj.get("RFC").getAsString());
                obj.put("NAME_RFC", gsonObj.get("NAME_RFC").getAsString());
                obj.put("FPAGO", gsonObj.get("FPAGO").getAsString());
                obj.put("MPAGO", gsonObj.get("MPAGO").getAsString());
            }
            String jsonText = JSONValue.toJSONString(obj);
            list.add(jsonText);
            json_texto += jsonText + ",";
        }
        //grabar A PRAXIS
        SQP03348Filter filter01 = new SQP03348Filter();
        int length = json_texto.length();
        json_texto1 += json_texto.substring(0, length - 1);
        json_texto1 += "]";
        filter01.vp_json = json_texto1;
        objRtn = logic.setSQP03348Filter(filter01);
        return objRtn;

    }

    @RequestMapping(value = "/search_UUID")
    public @ResponseBody
    String search_UUID(ModelMap map, HttpServletRequest request) {
        List<SQP05191Filter> listaData;
        SQP05191Filter filter;
        filter = new SQP05191Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FECHA1 = request.getParameter("VP_FDATE1");
            filter.VP_FECHA2 = request.getParameter("VP_FDATE2");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.VP_STAT = request.getParameter("VP_STAT");

            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_NLOTE = request.getParameter("VP_NLOTE");

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ControlUATPPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05191Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            map.put("err", "");
        } catch (NumberFormatException ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search_err")
    public @ResponseBody
    String search_err(ModelMap map, HttpServletRequest request) {
        List<SQP05192Filter> listaData;
        SQP05192Filter filter;
        filter = new SQP05192Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FECHA1 = request.getParameter("VP_FECHA1");
            filter.VP_FECHA2 = request.getParameter("VP_FECHA2");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.VP_STAT = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ControlUATPPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05192Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            map.put("err", "");
        } catch (NumberFormatException ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "set_procesarFE")
    public @ResponseBody
    String set_procesarFE(ModelMap map, HttpServletRequest request) {
        SQP04229Filter filter = new SQP04229Filter();
        SQP04229Filter objRtn = new SQP04229Filter();
        try {
            logic = new ControlUATPPreLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP04229Filter(filter);
            map.put("objRtn", objRtn);
            map.put("success", true);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/search_fac_cab")
    public @ResponseBody
    String search_fac_cab(ModelMap map, HttpServletRequest request) {
        List<SQP05190Filter> listaData;
        SQP05190Filter filter;
        filter = new SQP05190Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_LOTE = request.getParameter("VP_LOTE");
            filter.VP_STAT = request.getParameter("VP_STAT");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ControlUATPPreLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05190Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            map.put("err", "");
        } catch (NumberFormatException ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    /*API descarga Documento facturas/xml
     */
    @RequestMapping(value = "getPreDonwloadInvoice")
    public @ResponseBody
    void getDonwloadDocumentInvoice(HttpServletRequest request, HttpServletResponse response) {
//        String rutaTemp = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD_DJANGO").toString(); // NO USAR 
        String rutaTemp = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        try {
            String vl_document_path = request.getParameter("document_path");

            String[] arrOfStr = vl_document_path.split("/", 3);
            System.out.println("" + Arrays.toString(arrOfStr));
//            /miatech-aeromexico-factura-files/XML_TIMBRADOS/2023/IND/11/11/F_SALE_1392139323882_88357093-176B-52CF-B1CD-111D8B6BB3CD.pdf
//            [, miatech-aeromexico-factura-files/XML_TIMBRADOS/2023/IND/12/19/F_SALE_1392142671733_DFB73134-E0A7-5B72-BD75-3ABA2EEF1425.pdf]
            String vl_bucket = arrOfStr[1];
            String vl_key = arrOfStr[2];
            Unirest.setTimeouts(3600000, 3600000);
            HashMap bodyData = new HashMap<>();

            //bodyData.put("server_database", serverSession.getServerSession().getPropertySession().get("SERVER_DJANGO").toString());            
            bodyData.put("vp_bucket", vl_bucket); //"miatech-aeromexico-factura-files"                
            bodyData.put("vp_key", vl_key);       //"masivo/miatech-result-file-complemento/2021110510.xml"                
            bodyData.put("vp_path_tmp", rutaTemp);

            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
            //String urlREST = "http://127.0.0.1:5557";
            String urlAPI = "/api/praxis/facturacion_pre_descarga_factura/";
            HttpResponse<JsonNode> responseAPI = Unirest.post(urlREST + urlAPI)
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            String error_code = responseAPI.getBody().getObject().get("RESPONSE").toString();
            String error_msg = responseAPI.getBody().getObject().get("MESSAGE_TEXT").toString();
            String file_path = responseAPI.getBody().getObject().get("FILEPATH").toString();
            String file_name = responseAPI.getBody().getObject().get("FILENAME").toString();

            String fileNameDownload = file_path + "\\" + file_name;
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + file_name + "\"");
            InputStream is = new FileInputStream(fileNameDownload);
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
// ZIP            
//            response.setContentType("application/zip");
//            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + filename + ".zip" + "\"");
//            InputStream is = new FileInputStream(rutaFile + "\\" + filename + ".zip");
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();

            delete_fichero(fileNameDownload);

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    public Boolean delete_fichero(String fileName) {
        //String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String sFichero = fileName; //path + "\\" + fileName + ".pdf";
        File f = new File(sFichero);
        f.delete();
        return true;
    }

    @RequestMapping(value = "setSendMail")
    public @ResponseBody
    String setSendMail(ModelMap map, HttpServletRequest request) {

        SQP05524Filter objRtn = new SQP05524Filter();
        try {
            logic = new ControlUATPPreLogic();
            logic.setSession(this.serverSession.getServerSession());
            SQP05524Filter filter = new SQP05524Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonArray gson_data = parser.parse(request.getParameter("data")).getAsJsonArray();
            filter.VP_DATA = gson_data;
            //filter.VP_EMAILS = request.getParameter("VP_EMAILS");
            
            objRtn = logic.setQP05524Filter(filter);
            map.put("objRtn", objRtn);
            map.put("success", true);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }

}
