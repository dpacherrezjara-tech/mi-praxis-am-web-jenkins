/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04195Filter;
import net.miatech.praxis.eecta.SQP04196Filter;
import net.miatech.praxis.logic.eecta.CargaRecibosLogic;
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
@RequestMapping("/CargaRecibos")
public class CargaRecibosController extends BaseController {
    private CargaRecibosLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04196Filter> listaData;
        SQP04196Filter filter;
        filter = new SQP04196Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_LOTE = request.getParameter("VP_LOTE");
            filter.VP_STAT = request.getParameter("VP_STAT");
            filter.VP_TRXOR = request.getParameter("VP_TRXOR");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04196Filter(filter);

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
    
    @RequestMapping(value = "/setCargaRecibosBatch", method = RequestMethod.POST)
    public @ResponseBody
    String setCargaRecibosBatch(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        SQP04195Filter filter = new SQP04195Filter();                
        SQP04195Filter objRtn = new SQP04195Filter();
        Integer cont = 0;        
        try {        
            
            logic = new CargaRecibosLogic();
            logic.setSession(this.serverSession.getServerSession());            
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //data for excel
            String A4096NRO;
            String A4096UNDOP;
            String A4096TRXOR;
            String A4096MONTO;
            String A4096MDATX;
            String A4096TIPO;
            String A4096ESTAD;
            String A4096CUENT;
            String A4096NRCLO;
            String A4096DESCR;
            String A4096REFER;
                        
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
                if (cont > 1) {
                    if (sheet.getCell(0) != null) {
                        
                        A4096NRO = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();                        
                        if( A4096NRO == "" ){
                            break;
                        }                         
                        A4096UNDOP = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();                       
                        A4096TRXOR  = sheet.getCell(2)== null ? "" : sheet.getCell(2).toString();
                        if( A4096TRXOR == ""){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 0;
                            break;
                        }  
                        A4096MONTO = sheet.getCell(3)== null ? "0": sheet.getCell(3).toString();
                        if( A4096MONTO == ""){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 1;
                            break;
                        }                         
                        A4096MDATX = sheet.getCell(4)== null ? "" : sheet.getCell(4).toString();
                        if( A4096MDATX == ""){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 2;
                            break;
                        }                        
                        A4096TIPO=  sheet.getCell(5)== null ? "" : sheet.getCell(5).toString(); 
                        A4096ESTAD=  sheet.getCell(6)== null ? "" : sheet.getCell(6).toString(); 
                        A4096CUENT=sheet.getCell(7)== null ? "" : sheet.getCell(7).toString(); 
                        A4096NRCLO=sheet.getCell(8)== null ? "" : sheet.getCell(8).toString(); 
                        A4096DESCR=sheet.getCell(9)== null ? "" : sheet.getCell(9).toString(); 
                        A4096REFER=sheet.getCell(10)== null ? "" : sheet.getCell(10).toString(); 
                        //crear obj json
                        HashMap obj=new HashMap();    
                        obj.put("A4096NRO", A4096NRO );    
                        obj.put("A4096UNDOP", A4096UNDOP );
                        obj.put("A4096TRXOR", A4096TRXOR );
                        obj.put("A4096MONTO",new Double(A4096MONTO)); 
                        obj.put("A4096MDATX",A4096MDATX); 
                        obj.put("A4096TIPO",A4096TIPO);
                        obj.put("A4096ESTAD", A4096ESTAD);
                        obj.put("A4096CUENT", A4096CUENT);
                        obj.put("A4096NRCLO", A4096NRCLO);
                        obj.put("A4096DESCR", A4096DESCR);
                        obj.put("A4096REFER", A4096REFER);
                        String jsonText = JSONValue.toJSONString(obj);                          
                        json_texto += jsonText + ",";                        
                    }
                }
            }                      
            // SI NO HAY ERRORES EN EXCEL ENVIAR A GRABAR            
            if(ERROR_FIELDS == "N"){
                int length = json_texto.length(); 
                json_texto1 +=  json_texto.substring(0,length-1);            
                json_texto1 += "]";
                filter.VP_JSON_TEXT = json_texto1;             
                objRtn = logic.setSQP04195Filter(filter); 
            }else if( ERROR_FIELDS == "S" ){
                objRtn.OU_A4096LOTE = "";
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
            "COLUMNA TRANSACCION ORIG. EN BLANCO ",               //0
            "COLUMNA MONEDA EN BLANCO",   //1            
            "COLUMNA IMPORTE EN BLANCO" //33
        };        
        return MESSAGE_ERROR[INDICE];
    }
    
}
