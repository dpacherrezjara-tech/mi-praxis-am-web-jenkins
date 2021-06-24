/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
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
import net.miatech.praxis.eecta.SQP04053Filter;
import net.miatech.praxis.eecta.SQP04059Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.AplPaymentLogic;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONValue;
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
            filter.VP_BOLET = request.getParameter("VP_BOLET");
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
            filter.VP_TFILTTRO = request.getParameter("VP_TFILTTRO");
            filter.VP_PARAM1 = request.getParameter("VP_PARAM1");
            
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
            filter.page.PAGROW = -1;            
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
    
    @RequestMapping(value = "/setAplPaymentBatch", method = RequestMethod.POST)
    public @ResponseBody
    String setAplPaymentBatch(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        SQP04059Filter filter = new SQP04059Filter();                
        SQP04059Filter objRtn;
        Integer cont = 0;        
        try {        
            
            logic = new AplPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());
            //DecimalFormat formatter = new DecimalFormat(".##");
            //formatter.setRoundingMode(RoundingMode.HALF_UP);
            //String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //data for excel
            String FPAGO;
            String NBOLE;
            String UUID;
            String IMPORTE;
            String MONEDA;
            String REFPAG;
            //json object
            String json_texto1;
            String json_texto = "";
            json_texto1 = "[";
            
            //filter = new SQP04059Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            while (iterator.hasNext()) {                
                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator();                
                if (cont > 1) {
                    if (sheet.getCell(0) != null) {                                                
                        FPAGO = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();
                        NBOLE = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();
                        UUID  = sheet.getCell(2)== null ? "" : sheet.getCell(2).toString();
                        IMPORTE = sheet.getCell(3)== null ? "0": sheet.getCell(3).toString();
                        MONEDA = sheet.getCell(4)== null ? "" : sheet.getCell(4).toString();
                        REFPAG=  sheet.getCell(5)== null ? "" : sheet.getCell(5).toString(); 
                        //crear obj json
                        HashMap obj=new HashMap();    
                        obj.put("FPAGO", FPAGO );    
                        obj.put("NBOLE", NBOLE );
                        obj.put("UUID", UUID );
                        obj.put("IMPORTE",new Double(IMPORTE)); 
                        obj.put("MONEDA",MONEDA); 
                        obj.put("REFPAG",REFPAG); 
                        String jsonText = JSONValue.toJSONString(obj);                          
                        json_texto += jsonText + ",";                        
                    }
                }
            }         
            int length = json_texto.length(); 
            json_texto1 +=  json_texto.substring(0,length-1);            
            json_texto1 += "]"; 
            
            filter.VP_JSON = json_texto1;             
            objRtn = logic.setSQP04059Filter(filter); 
            
            map.put("success", true);
            map.put("objRtn",  objRtn);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }  
    
    @RequestMapping(value = "/search_det_loadbatch"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String search_det_loadbatch(ModelMap map, HttpServletRequest request) {
        List<SQP04053Filter> listaData;
        SQP04053Filter filter;
        filter = new SQP04053Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_A4021LOTE = request.getParameter("VP_A4021LOTE");
            filter.VP_BOLETO = request.getParameter("VP_BOLETO");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04053Filter(filter);

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
