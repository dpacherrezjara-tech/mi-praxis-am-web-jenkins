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
import net.miatech.praxis.eecta.SQP04163Filter;
import net.miatech.praxis.eecta.SQP04164Filter;
import net.miatech.praxis.eecta.SQP04173Filter;
import net.miatech.praxis.eecta.SQP04256Filter;
import net.miatech.praxis.logic.eecta.RegistroVentaOALLogic;
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
@RequestMapping("/RegistroVentaOAL")
public class RegistroVentaOALController extends BaseController {
    private RegistroVentaOALLogic logic;
        
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04163Filter> listaData;
        SQP04163Filter filter;
        filter = new SQP04163Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_FILTRO = request.getParameter("VP_FILTRO");           
            filter.VP_FECHA01 = request.getParameter("VP_FECHA01");           
            filter.VP_FECHA02 = request.getParameter("VP_FECHA02"); 
            filter.VP_TICKET_NUMBER = request.getParameter("VP_TICKET_NUMBER");
            filter.VP_AIRLINE_CODE = request.getParameter("VP_AIRLINE_CODE");          
            filter.VP_SERVICE_TYPE = request.getParameter("VP_SERVICE_TYPE");           
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new RegistroVentaOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04163Filter(filter);

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
    
    @RequestMapping(value = "set_crud")
    public @ResponseBody
    String set_crud(ModelMap map, HttpServletRequest request) {        
        SQP04164Filter filter = new SQP04164Filter();
        SQP04164Filter objRtn = new SQP04164Filter();                
        try {
            logic = new RegistroVentaOALLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonArray gson_detail = parser.parse(request.getParameter("beanRouting")).getAsJsonArray();
            filter.VP_ROUTING = gson_detail.toString(); 
            objRtn = logic.setSQP04164Filter(filter);                                       
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
    @RequestMapping(value = "/search_routing")
    public @ResponseBody
    String search_routing(ModelMap map, HttpServletRequest request) {
        List<SQP04173Filter> listaData;
        SQP04173Filter filter;
        filter = new SQP04173Filter();
        
        try {
            filter.VP_A4069CIA = request.getParameter("VP_A4069CIA");           
            filter.VP_A4069FORMA = request.getParameter("VP_A4069FORMA");           
            filter.VP_A4069SERIE = request.getParameter("VP_A4069SERIE"); 
            filter.VP_A4069SEQ = request.getParameter("VP_A4069SEQ");
            
            logic = new RegistroVentaOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04173Filter(filter);

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
    
    @RequestMapping(value = "/setCargaVENTAUATPBatch", method = RequestMethod.POST)
    public @ResponseBody
    String setCargaVENTAUATPBatch(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        SQP04256Filter filter = new SQP04256Filter();                
        SQP04256Filter objRtn = new SQP04256Filter();
        Integer cont = 0;        
        try {        
            
            logic = new RegistroVentaOALLogic();
            logic.setSession(this.serverSession.getServerSession());            
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //data for excel
            String MerchantName;
            String MerchantNumber;	
            String AccountName;	
            String AccountNumber;	
            String CardNumber;	
            String DateOfIssue;	
            String TicketNumber;	
            String PassengerName;	
            String FlightDate;	
            String Routing;	
            String Carrier;	
            String FareBasis;	
            String AgentNumber;	
            String Dbcr;	
            String SignedForAmountCurrencyType;
            String SignedForAmount;	
            String PassengerData;
                        
            //json object
            String json_texto1;
            String json_texto = "";
            json_texto1 = "[";
            String ERROR_FIELDS = "N";
            Integer VL_INDICE = 0;
            //filter = new SQP04059Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            while (iterator.hasNext()) {                
                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator(); 
                //datos en excel empoieza de la fila 2
                if (cont > 1) {
                    if (sheet.getCell(0) != null) {                        
                        MerchantName = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();                        
                        if( MerchantName.equals("")){
                            break;
                        }                         
                        MerchantNumber = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();                       
                        AccountName  = sheet.getCell(2)== null ? "" : sheet.getCell(2).toString();                                             
                        AccountNumber = sheet.getCell(3)== null ? "" : sheet.getCell(3).toString();                        
                        CardNumber=  sheet.getCell(4)== null ? "" : sheet.getCell(4).toString(); 
                         if( CardNumber.equals("")){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 0;
                            break;
                        } 
                        DateOfIssue=  sheet.getCell(5)== null ? "" : sheet.getCell(5).toString(); 
                        TicketNumber=sheet.getCell(6)== null ? "" : sheet.getCell(6).toString(); 
                        PassengerName=sheet.getCell(7)== null ? "" : sheet.getCell(7).toString(); 
                        FlightDate=sheet.getCell(8)== null ? "" : sheet.getCell(8).toString(); 
                        Routing=sheet.getCell(9)== null ? "" : sheet.getCell(9).toString(); 
                        Carrier=sheet.getCell(10)== null ? "" : sheet.getCell(10).toString(); 
                        FareBasis=sheet.getCell(11)== null ? "" : sheet.getCell(11).toString(); 
                        AgentNumber=sheet.getCell(12)== null ? "" : sheet.getCell(12).toString(); 
                        Dbcr=sheet.getCell(13)== null ? "" : sheet.getCell(13).toString();                         
                        SignedForAmountCurrencyType=sheet.getCell(14)== null ? "" : sheet.getCell(14).toString(); 
                        SignedForAmount=sheet.getCell(15)== null ? "" : sheet.getCell(15).toString(); 
                        PassengerData=sheet.getCell(16)== null ? "" : sheet.getCell(16).toString(); 
                        
                        //crear obj json
                        HashMap obj=new HashMap();    
                        obj.put("MerchantName", MerchantName.trim());    
                        obj.put("MerchantNumber", MerchantNumber);
                        obj.put("AccountName", AccountName );                        
                        obj.put("AccountNumber",AccountNumber); 
                        obj.put("CardNumber",CardNumber);
                        obj.put("DateOfIssue", DateOfIssue);
                        obj.put("TicketNumber", TicketNumber);
                        obj.put("PassengerName", PassengerName.trim());
                        obj.put("FlightDate", FlightDate.trim());
                        obj.put("Routing", Routing.trim());
                        obj.put("Carrier", Carrier.trim());
                        obj.put("FareBasis", FareBasis.trim());
                        obj.put("AgentNumber", AgentNumber.trim());
                        obj.put("Dbcr", Dbcr.trim());                        
                        obj.put("SignedForAmountCurrencyType", SignedForAmountCurrencyType.trim());
                        obj.put("SignedForAmount",new Double(SignedForAmount)); 
                        obj.put("PassengerData", PassengerData.trim());
                        String jsonText = JSONValue.toJSONString(obj);                          
                        json_texto += jsonText + ",";                        
                    }
                }
            }                      
            // SI NO HAY ERRORES EN EXCEL ENVIAR A GRABAR            
            if(ERROR_FIELDS.equals("N")){
                int length = json_texto.length(); 
                json_texto1 +=  json_texto.substring(0,length-1);            
                json_texto1 += "]";
                filter.VP_JSON_TEXT = json_texto1;             
                objRtn = logic.setSQP04256Filter(filter); 
            }else if( ERROR_FIELDS == "S" ){
                objRtn.OU_A4135IDFIL = "";
                objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                objRtn.dbException.MESSAGE = this.get_errorLoadFile(VL_INDICE);
            }
            map.put("success", true);
            map.put("objRtn",  objRtn);
            
        } catch (SQLException err) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = err.toString();           
            map.put("objRtn",  objRtn);
            map.put("success", true);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception err) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = err.toString();  
            map.put("success", true);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }  
    
    public String get_errorLoadFile ( Integer INDICE  ){
        String[] MESSAGE_ERROR = {
            "COLUMNA CardNumber NO PUEDE SER BLANCO ",//0
            "COLUMNA MONEDA EN BLANCO",   //1            
            "COLUMNA IMPORTE EN BLANCO" //33
        };        
        return MESSAGE_ERROR[INDICE];
    }
}
