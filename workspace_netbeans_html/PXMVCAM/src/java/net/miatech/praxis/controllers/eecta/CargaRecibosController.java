/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04195Filter;
import net.miatech.praxis.eecta.SQP04196Filter;
import net.miatech.praxis.eecta.SQP04197Filter;
import net.miatech.praxis.eecta.SQP04211Filter;
import net.miatech.praxis.eecta.SQP04217Filter;
import net.miatech.praxis.eecta.SQP04218Filter;
import net.miatech.praxis.eecta.SQP04219Filter;
import net.miatech.praxis.eecta.SQP04253Filter;
import net.miatech.praxis.eecta.SQP04254Filter;
import net.miatech.praxis.eecta.SQP04255Filter;
import net.miatech.praxis.eecta.SQP04259Filter;
import net.miatech.praxis.eecta.SQP04260Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.CargaRecibosLogic;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
    
    @RequestMapping(value = "/searchCab")
    public @ResponseBody
    String searchCab(ModelMap map, HttpServletRequest request) {
        List<SQP04217Filter> listaData;
        SQP04217Filter filter;
        filter = new SQP04217Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_IDRCB = request.getParameter("VP_IDRCB");
            filter.VP_STAT = request.getParameter("VP_STAT");
            filter.VP_TRXOR = request.getParameter("VP_TRXOR");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_VPARM = request.getParameter("VP_VPARM").trim();
                        
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04217Filter(filter);

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
        List<SQP04211Filter> listaData;
        SQP04211Filter filter;
        filter = new SQP04211Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_LOTE = request.getParameter("VP_LOTE");
            filter.VP_STAT = request.getParameter("VP_STAT");
            filter.VP_TRXOR = request.getParameter("VP_TRXOR");
            filter.VP_IDRCB = request.getParameter("VP_IDRCB");
                        
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04211Filter(filter);

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
    
    @RequestMapping(value = "/search_det_loadbatch")
    public @ResponseBody
    String search_det_loadbatch(ModelMap map, HttpServletRequest request) {
        List<SQP04196Filter> listaData;
        SQP04196Filter filter;
        filter = new SQP04196Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1"); //no usado
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2"); //no usado
            filter.VP_LOTE = request.getParameter("VP_LOTE");
            filter.VP_STAT = request.getParameter("VP_STAT"); //no usado
            filter.VP_TRXOR = request.getParameter("VP_TRXOR");
            filter.VP_STREF = request.getParameter("VP_STREF");
            filter.VP_CUENT = request.getParameter("VP_CUENT");
            filter.VP_MDATX = request.getParameter("VP_MDATX");
            
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
            String A4096FCREC;
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
                //datos en excel empoieza de la fila 3
                if (cont > 2) {
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
                        A4096TIPO=sheet.getCell(5)== null ? "" : sheet.getCell(5).toString(); 
                        A4096ESTAD= sheet.getCell(6)== null ? "" : sheet.getCell(6).toString(); 
                        A4096CUENT=sheet.getCell(7)== null ? "" : sheet.getCell(7).toString(); 
                        A4096NRCLO=sheet.getCell(8)== null ? "" : sheet.getCell(8).toString(); 
                        A4096FCREC=sheet.getCell(16)== null ? "" : sheet.getCell(16).toString(); 
                        
                        if( A4096FCREC == "" && A4096ESTAD == "N/I"  ){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 3;
                            break;
                        }
                        A4096DESCR=sheet.getCell(17)== null ? "" : sheet.getCell(17).toString();                         
                        A4096REFER=sheet.getCell(18)== null ? "" : sheet.getCell(18).toString(); 
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
                        obj.put("A4096FCREC", A4096FCREC);
                        obj.put("A4096DESCR", A4096DESCR.trim());
                        obj.put("A4096REFER", A4096REFER.trim());
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
            "COLUMNA TRANSACCION ORIG. EN BLANCO ",//0
            "COLUMNA MONEDA EN BLANCO",   //1            
            "COLUMNA IMPORTE EN BLANCO", //2
            "COLUMNA FECHA(DD-MM-YYYY) EN BLANCO" //3
        };        
        return MESSAGE_ERROR[INDICE];
    }
    
    @RequestMapping(value = "setCargaRecibosProcesarRef", method = RequestMethod.POST)
    public @ResponseBody            
    String setCargaRecibosProcesarRef(ModelMap map, HttpServletRequest request) {
        SQP04197Filter objRtn = new SQP04197Filter();        
        logic = new CargaRecibosLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP04197Filter filter = new SQP04197Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            objRtn = logic.setSQP04197Filter(filter);            
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
    public static String fn_decimalFormat(Double doubleValue){
        //boolean isWholeNumber=(doubleValue == Math.round(doubleValue));
        DecimalFormatSymbols formatSymbols = new DecimalFormatSymbols(Locale.US);
        formatSymbols.setDecimalSeparator('.');
        //String pattern= isWholeNumber ? "#.##" : "#.00";    
        String pattern= "#.00";           
        DecimalFormat df = new DecimalFormat(pattern, formatSymbols);
        return df.format(doubleValue);
    }
    @RequestMapping(value = "getDescargaFileIdentPago")
    public @ResponseBody        
    void getDescargaFileIdentPago(HttpServletRequest request, HttpServletResponse response) {
        SQP04211Filter filter = new SQP04211Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Date date = new Date();        
        LocalDateTime myDateObj = LocalDateTime.now();
//        System.out.println("Before formatting: " + myDateObj);
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        String formattedDate = myDateObj.format(myFormatObj);
//        System.out.println("After formatting: " + formattedDate);
        
        try{
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<SQP04211Filter> lst = logic.getSQP04211Filter(filter);
            
            int len = lst.size();
            Integer vi = 0;            
            String vl_fileName = "IDENTIFICAR_PAGOS_"+ formattedDate; // +"_"+date.getHours()+date.getMinutes()+date.getSeconds();
            File file = new File(rutaFile + "\\" + vl_fileName + ".txt");
            
            if (file.exists())
                file.delete();
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
               																		

            cadena = "NO_CONTROL|UNIDAD_OPERATIVA|TRANSACCION_ORIGEN|MONTO_DISPONIBLE|MONEDA_TRX_ORIGEN|TIPO|ESTADO|CUENTA|NUMERO_CLIENTE_ORIGEN|";
            cadena += "TRANSACCION_DESTINO|TIPO_DOCUMENTO|MONEDA|NUMERO CLIENTE DESTINO|MONTO A APLICAR|TIPO DE CAMBIO|VALOR TIPO|FECHA(DD-MM-YYYY)|";
            cadena += "DESCRIPCION|REFERENCIA";
            writer.println("" + cadena );
            int j = 0;            
            for (vi = 0; vi < len; vi++) {                
                cadena = ""; 
                j++;
                //cadena += "" + lst.get(vi).A4096NRO + "|";
                cadena += "" + j + "|";
                cadena += "" + lst.get(vi).A4103UNDOP.trim() + "|";
                cadena += "" + lst.get(vi).A4103NUMRC.trim() + "|";                
                cadena += "" + this.fn_decimalFormat(lst.get(vi).A4103MONTO) + "|";
                cadena += "" + lst.get(vi).A4103MDARC.trim() + "|";
                cadena += "" + lst.get(vi).A4103TIPO.trim() + "|";               
                cadena += "" + lst.get(vi).A4103ESTAD.trim() + "|";
                cadena += "" + lst.get(vi).A4103CUENT.trim() + "|";
                cadena += "" + lst.get(vi).A4103NRCLO.trim() + "||||";
                cadena += "" + lst.get(vi).A4103NRCLO.trim() + "|||||";
                cadena += "" + lst.get(vi).A4103DESRC.trim() + "|";
                cadena += "" + lst.get(vi).A4103REFRC.trim();                            
                writer.println("" + cadena );
            }
            writer.flush();
            writer.close();
            
            /**
             * Comprimimos archivo generado para su optima descarga
             */
//            if (!zip(vl_fileName))            
//            response.setContentType("application/zip");
//            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + vl_fileName + ".zip" + "\"");
//            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".zip");
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();

            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\""+ vl_fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            

        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }
        
    }    
    
    public Boolean zip(String fileName){
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File( path + "\\" + fileName + ".zip");
            
            if (fileZip.exists())
                fileZip.delete();
            
            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".zip");
            
            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }
    
    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException{
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
    
    
    @RequestMapping(value = "/get_apl_recibo")
    public @ResponseBody
    String get_apl_recibo(ModelMap map, HttpServletRequest request) {
        List<SQP04218Filter> listaData;
        SQP04218Filter filter;
        filter = new SQP04218Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_IDRCB = request.getParameter("VP_IDRCB");
            //filter.VP_CDCLI = request.getParameter("VP_CDCLI");
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 18;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04218Filter(filter);

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
    @RequestMapping(value = "/get_apl_recibo_det"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String get_apl_recibo_det(ModelMap map, HttpServletRequest request) {
        List<SQP04219Filter> listaData;
        SQP04219Filter filter;
        filter = new SQP04219Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_IDPG = request.getParameter("VP_IDPG");
            filter.VP_RECIBO = request.getParameter("VP_RECIBO");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;            
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04219Filter(filter);
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
    
    @RequestMapping(value = "setFacturarComplemento", method = RequestMethod.POST)
    public @ResponseBody            
    String setFacturarComplemento(ModelMap map, HttpServletRequest request) {
        SQP04253Filter objRtn = new SQP04253Filter();        
        logic = new CargaRecibosLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP04253Filter filter = new SQP04253Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            objRtn = logic.setSQP04253Filter(filter);            
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
    
    @RequestMapping(value = "/get_complemento_cab"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String get_complemento_cab(ModelMap map, HttpServletRequest request) {
        List<SQP04254Filter> listaData;
        SQP04254Filter filter;
        filter = new SQP04254Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_LOTE = request.getParameter("VP_LOTE");
            filter.VP_NUMRC = request.getParameter("VP_NUMRC");
            filter.VP_ESTAD = request.getParameter("VP_ESTAD");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;            
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04254Filter(filter);
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
    
    @RequestMapping(value = "/get_complemento_det"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String get_complemento_det(ModelMap map, HttpServletRequest request) {
        List<SQP04255Filter> listaData;
        SQP04255Filter filter;
        filter = new SQP04255Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_FPROC = request.getParameter("VP_FPROC");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_NLOTE = request.getParameter("VP_NLOTE");
            filter.VP_SQRCB = Integer.parseInt(request.getParameter("VP_SQRCB"));
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;            
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new CargaRecibosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04255Filter(filter);
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
    
    /*API descarga Documento facturas/xml
     */
    @RequestMapping(value = "getDonwloadDocumentInvoice")
    public @ResponseBody
    void getDonwloadDocumentInvoice(HttpServletRequest request, HttpServletResponse response) {
//        String rutaTemp = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD_DJANGO").toString(); // NO USAR 
        String rutaTemp = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();         
        try {            
            String vl_document_path = request.getParameter("document_path");
            String[] arrOfStr  = vl_document_path.split("/", 2);
            String vl_bucket = arrOfStr[0];
            String vl_key = arrOfStr[1];
            Unirest.setTimeouts(3600000, 3600000);           
            HashMap bodyData = new HashMap<>();            
            //bodyData.put("server_database", serverSession.getServerSession().getPropertySession().get("SERVER_DJANGO").toString());            
            bodyData.put("vp_bucket", vl_bucket); //"miatech-aeromexico-factura-files"                
            bodyData.put("vp_key", vl_key);       //"masivo/miatech-result-file-complemento/2021110510.xml"                
            bodyData.put("vp_path_tmp", rutaTemp );                
            
            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
            //String urlREST = "http://127.0.0.1:5557";
            String urlAPI  = "/api/praxis/praxis_facturacion_eecc_download/";  
            HttpResponse<JsonNode> responseAPI = Unirest.post(urlREST + urlAPI )
                    .header("content-type", "application/json") 
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();
            
            String error_code = responseAPI.getBody().getObject().get("RESPONSE").toString();
            String error_msg = responseAPI.getBody().getObject().get("MESSAGE_TEXT").toString();
            String file_path = responseAPI.getBody().getObject().get("FILEPATH").toString();
            String file_name = responseAPI.getBody().getObject().get("FILENAME").toString();
            
            String fileNameDownload = file_path +"\\"+ file_name;
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + file_name  + "\"");
            InputStream is = new FileInputStream( fileNameDownload );
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
    
    public Boolean delete_fichero( String fileName ) {
        //String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String sFichero = fileName; //path + "\\" + fileName + ".pdf";
        File f = new File(sFichero);
        f.delete();
        return true;
    }
    
    @RequestMapping(value = "setReciboAsignarCliente")
    public @ResponseBody
    String setReciboAsignarCliente(ModelMap map, HttpServletRequest request) {
        SQP04259Filter filter = new SQP04259Filter();
        SQP04259Filter objRtn = new SQP04259Filter();
        logic = new CargaRecibosLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                      
            JsonParser parser = new JsonParser();
            JsonArray gson_detail = parser.parse(request.getParameter("json_detail")).getAsJsonArray();
            filter.VP_JSON = gson_detail.toString();            
            objRtn = logic.setSQP04259Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = ex.toString(); 
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            //throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
    @RequestMapping(value = "setAnulaReciboAsignadoCliente")
    public @ResponseBody
    String setAnulaReciboAsignadoCliente(ModelMap map, HttpServletRequest request) {
        SQP04260Filter filter = new SQP04260Filter();
        SQP04260Filter objRtn = new SQP04260Filter();
        logic = new CargaRecibosLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                      
//            JsonParser parser = new JsonParser();
//            JsonArray gson_detail = parser.parse(request.getParameter("json_detail")).getAsJsonArray();
//            filter.VP_JSON = gson_detail.toString();            
            objRtn = logic.setSQP04260Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = ex.toString(); 
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            //throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
}
