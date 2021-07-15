/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1686Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ClarificationDashboardLogic;
import net.miatech.praxis.logic.payments.ClarificationLoadLogic;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
 * @author 
 */
@Controller
@Scope("request")
@RequestMapping("/ClarificationLoad")
public class ClarificationLoadController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ClarificationLoadLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ClarificationLoad/form_index";
    }
    
    @RequestMapping(value = "/setData", method = RequestMethod.POST)
    public @ResponseBody
    String setData(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Integer cont = 0;
        String mensaje = "";
        String msjResult = "";
        
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            String banco = request.getParameter("banco");
            String input = request.getParameter("input");
            String filename = excelfile.getOriginalFilename();
            
            
            if(banco.equals("EL") || banco.equals("US") || banco.equals("AX")){

                byte[] fileData2 = excelfile.getBytes();
                msjResult = uploadCSV(fileData2, banco);

            }else if(banco.equals("STB") && input.equals("C")){

                byte[] dataFile = excelfile.getBytes();
                msjResult = uploadFile(dataFile, banco);

            }else{
//                msjResult = upload(excelfile, banco, input);
                msjResult = "Error al cargar Archivo";
            }
            
            
            map.put("success", true);
            map.put("msj", msjResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    private String uploadCSV(byte[] bytes, String strBanco) throws Exception {
        
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        
        String mensaje = "", strHora = Functions.getHoraActual();
        
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "ClarificationCsv." + strSesion + ".csv";
            
            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close();
         
            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            mensaje = logic.loadPX413SQP02535(strBanco,strArchivo);
            
            if(mensaje.contains("Successful")){
                //Llamando al PRO10574(ELavon)
                mensaje = logic.loadPX413PRO10570(strBanco,strHora);
            }
            
            
//            map.put("msj", mensaje);
            
            //Eliminar temporal           
            archivo.delete();
            
        } catch (Exception e) {
            e.printStackTrace();
            mensaje = "Se produjo un error al intentar subir el archivo.";
        }

        return mensaje;
        
    }
    
    private String uploadFile(byte[] bytes, String strBanco) throws Exception {
        
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        
        A1686Filter obj = new A1686Filter();
        List<A1686Filter> lstData = new ArrayList<>();
        String mensaje = "", strHora = Functions.getHoraActual();
        
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "StanderBSPAclaration." + strSesion + ".xlsx";
            
            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close();
            
            
//            String nombreArchivo = "Inventario.xlsx";
//            String rutaArchivo = "C:\\Ficheros-Excel\\" + nombreArchivo;
//            String hoja = "Hoja1";
         
            DataFormatter formatter = new DataFormatter();
            String primeraCelda="";
            boolean escribe = false;
                
            FileInputStream file = new FileInputStream(new File(strArchivo));
            // leer archivo excel
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            //obtener la hoja que se va leer
            XSSFSheet sheet = worbook.getSheetAt(0);
            //obtener todas las filas de la hoja excel
            Iterator<Row> rowIterator = sheet.iterator();

            Row row;
            // se recorre cada fila hasta el final
            while (rowIterator.hasNext()) {
                row = rowIterator.next();
                primeraCelda = formatter.formatCellValue(row.getCell(0));
                
                if(primeraCelda.trim().equals("IATA LINEA AEREA")){
                    escribe = true ;
                }
                    
                if(escribe){
                
                    String cadena = "";
                    for(int i=0 ; i<12 ; i++){

                        String val = formatter.formatCellValue(row.getCell(i));
                        //En la fecha de envio  pongo ceros a dias o a mes
                        if(i==8){
                            val = Functions.getMonthwitZeros(val,"/");
                        }

                        if(i == 11){
                            cadena = cadena+ val  ;
                        }else{
                            cadena = cadena+ val  + "," ;
                        }
                    }

                    System.out.print(cadena);

                    if(cadena.trim().equals(",,,,,,,,,,,")){//linea en blanco
                        escribe = false ;
                    }else{
                        obj = new A1686Filter();
                        obj.strDescripcion = cadena;
                        lstData.add(obj);
                    }
                }
            }
            
            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            mensaje = logic.loadPX413SQP03598(lstData);
            
//            if(mensaje.contains("Successful")){
//                //Llamando al PRO10574(ELavon)
//                mensaje = logic.loadPX413PRO10570(strBanco,strHora);
//            }
            
        } catch (Exception e) {
            e.printStackTrace();
            mensaje = "Se produjo un error al intentar subir el archivo.";
        }

        return mensaje;
        
    }
    
    
    /*
    private String upload(MultipartFile excelfile, String banco, String input) {
        
        String msj = "";
        
        try {
            
            String filaCompleta = "";
            //listaExcelString
            String msjError = "";
            String tmp = "";
            boolean filaTotal = false;
            int noOfRows;
            int noOfColumns;

            byte[] fileData = excelfile.getBytes();

            
            if(fileData != null && fileData.length > 0){

                XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
                Sheet sheet = workbook.getSheetAt(0);

                if(sheet != null){
                    noOfRows = sheet.getLastRowNum();
                    noOfColumns = sheet.getRow(0).getLastCellNum();
                    //CAMBIADO POR ORDEN DE JUGAZ, ARCIVHO DE AX AHORA VIENE EN .CSV antes venia en .XLS
                    if(banco.equals("**")){ //if(banco == "AX" ){
                        //==================================================================================
                        //INICIO AMERICAN EXPRESS ========================================================== 
                        if(input.equals("N")){
                            //Avisos
                            msjError = "Under Construction";
                            
//                            for(var row:int = 0; row < noOfRows; row++){
//                                //var cellObject:Object ={};
//                                filaCompleta = '';
//                                for(var col:int = 0; col < noOfColumns; col++){
//                                        var cell:Cell = new Cell();
//                                        var cellValue:String = new String();
//                                        cell = sheet.getCell(row, col);
//                                        if(cell != null){
//                                                if(row > 0 && col == 5){
//                                                        cellValue = excelFloatToDate(Number(cell.value.toString()));
//                                                }else{
//                                                        cellValue =(cell.value).toString();
//                                                }
//                                                filaCompleta += cellValue + ',';
//                                        }
//                                }// inner for loop ends
//                                listaExcelString.addItem(filaCompleta);
//                            } //for loop ends
                            
                        }else{

                            //Aclaraciones
                            for( int row2 = 0; row2 < noOfRows; row2++){
                                //var cellObject:Object ={};
                                filaCompleta = "";
                                for(int col2 = 0; col2 < noOfColumns; col2++){
                                    Cell cell2 = new Cell();
                                    var cellValue2:String = new String();
                                    cell2 = sheet.getCell(row2, col2);

                                    if(cell2 != null){
                                            msjError = "";
                                            tmp = "";

                                            tmp = (cell2.value).toString();
                                            if(tmp.toUpperCase().indexOf("TOTAL") >= 0){
                                                    filaTotal = true;
                                            }

                                            if(filaTotal == false){

                                                                    if(row2 > 5 && col2 == 3){
                                                                            //Fecha de Transaccion (05/09/2017)
                                                                            tmp = (cell2.value).toString();

                                                                            if(app.trim(tmp) == ""){
                                                                                    msjError = "Error. Transaction Date is Empty. Please contact AM. (Column D)";

                                                                            }else if(tmp.indexOf("N/A") >= 0){
                                                                                    msjError = "Error. Transaction Date incorrect format (N/A). Please contact AM. (Column D)";

                                                                            }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                    msjError = "Error. Invalid Transaction Date. Please contact AM. (Column D)";

                                                                            }else if(tmp.length == 10){
                                                                                    cellValue2 = tmp;

                                                                            }else{
                                                                                    cellValue2 = excelFloatToDate(Number(cell2.value.toString()));
                                                                                    if(cellValue2 == "Error"){
                                                                                            msjError = "Error. Transaction Date incorrect format. Please contact AM. (Column D)";
                                                                                    }
                                                                            }

                                                                    } else if(row2 > 5 && col2 == 5){
                                                                            //Responder a mas tardar: dias restantes (24/10/2017-18)
                                                                            tmp = (cell2.value).toString();

                                                                            if(app.trim(tmp) == ""){
                                                                                    msjError = "Error. Date is empty. Please contact AM. (Column F)";

                                                                            }else if(tmp.indexOf("N/A") >= 0){
                                                                                    msjError = "Error. Invalid format date (N/A). Please contact AM. (Column F)";

                                                                            }else if(tmp.substring(0, 10) == "99/99/9999" || tmp.substring(0, 10) == "99-99-9999"){
                                                                                    msjError = "Error. Invalid Date. Please contact AM. (Column F)";

                                                                            }else if(tmp.length == 13){
                                                                                    cellValue2 = tmp;

                                                                            }else{
                                                                                    cellValue2 = excelFloatToDate(Number(tmp.substring(0, 10)));
                                                                                    if(cellValue2 == "Error"){
                                                                                            msjError = "Error. Invalid format date. Please contact AM. (Column F)";
                                                                                    }
                                                                            }

                                                                    } else if(row2 > 5 && col2 == 8){
                                                                            //Responder a mas tardar el (24/10/2017)
                                                                            tmp = (cell2.value).toString();
                                                                            //Alert.show(tmp + " indexOf : " + tmp.indexOf("N/A"));

                                                                            if(app.trim(tmp) == ""){
                                                                                    msjError = "Error. Date is Empty. Please contact AM. (Column I)";

                                                                            }else if(tmp.indexOf("N/A") >= 0){
                                                                                    msjError = "Error. Invalid format date (N/A). Please contact AM. (Column I)";

                                                                            }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                    msjError = "Error. Invalid Date. Please contact AM. (Column I)";

                                                                            }else if(tmp.length == 10){
                                                                                    cellValue2 = tmp;

                                                                            }else{
                                                                                    cellValue2 = excelFloatToDate(Number(tmp));
                                                                                    if(cellValue2 == "Error"){
                                                                                            msjError = "Error. Invalid format date. Please contact AM. (Column I)";
                                                                                    }
                                                                            }

                                                                    } else{
                                                                            cellValue2 =(cell2.value).toString();
                                                                    }

                                                            } else{
                                                                    cellValue2 =(cell2.value).toString();
                                                            }

                                                            if(msjError != ""){
                                                                    break;
                                                            }else{
                                                                    filaCompleta += cellValue2 + ',';
                                                            }
                                                    }
                                            }

                                            if(msjError != ""){
                                                    break;
                                            }else{
                                                    listaExcelString.addItem(filaCompleta);
                                            }
                                    }
                            }
                            //FIN AMERICAN EXPRESS =============================================================
                            //==================================================================================

                    }else if(banco == "ST"){
                            //==================================================================================
                            //INICIO SANTANDER =================================================================
                            // convertir el excel en la version de 95
                            if(input == "N"){
                                    //Avisos
                                    msjError = "Under Construction";
                            }else{
                                    //Aclaraciones
                                    var flag:Boolean = false;
                                    for(var rowS:int = 0; rowS < noOfRows; rowS++){
                                            var cellSv:Cell = new Cell();
                                        cellSv = sheet.getCell(rowS, 0);
                                        var valueS:String = (cellSv.value).toString();
                                            if(app.trim(valueS).toUpperCase()==='FOLIO'){
                                                    flag = true;
                                            }

                                            filaCompleta = '';

                                            if(flag){

                                                    for(var colS:int = 0; colS < noOfColumns; colS++){

                                                            var cellS:Cell = new Cell();
                                                            var cellValueS:String = new String();
                                                            cellS = sheet.getCell(rowS, colS);

                                                            if(cellS != null){
                                                                    msjError = "";
                                                                    tmp = "";

                                                                    tmp = (cellS.value).toString();

                                                                    if(colS == 0 && tmp == ''){
                                                                            filaTotal = true;
                                                                    }

                                                                    if(filaTotal == false){

                                                                            if(rowS > 0 && colS == 7){
                                                                                    //Fecha de envío de solicitud de Pagaré (31/08/2017)
                                                                                    tmp = (cellS.value).toString();

                                                                                    if(app.trim(tmp) == ""){
                                                                                            msjError = "Error. Sending Date is Empty. Please contact AM. (Column H)";

                                                                                    }else if(tmp.indexOf("N/A") >= 0){
                                                                                            msjError = "Error. Sending Date incorrect format (N/A). Please contact AM. (Column H)";

                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                            msjError = "Error. Invalid Sending Date. Please contact AM. (Column H)";

                                                                                    }else if(tmp.length == 10){
                                                                                            cellValueS = tmp;

                                                                                    }else{
                                                                                            cellValueS = excelFloatToDate(Number(cellS.value.toString()));
                                                                                            if(cellValueS == "Error"){
                                                                                                    msjError = "Error. Sending Date incorrect format. Please contact AM. (Column H)";
                                                                                            }
                                                                                    }

                                                                            } 
//                                                                            else if(rowS > 0 && colS == 9){
//                                                                                    //Fecha de envío del Recordatorio
//                                                                                    tmp = (cellS.value).toString();
//
//                                                                                    if(app.trim(tmp) == ""){
//                                                                                            msjError = "Error. Reminder Date is Empty. Please contact AM. (Column J)";
//
//                                                                                    }else if(tmp.indexOf("N/A") >= 0){
//                                                                                            msjError = "Error. Reminder Date incorrect format (N/A). Please contact AM. (Column J)";
//
//                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
//                                                                                            msjError = "Error. Invalid Reminder Date. Please contact AM. (Column J)";
//
//                                                                                    }else if(tmp.length == 10){
//                                                                                            cellValueS = tmp;
//
//                                                                                    }else{
//                                                                                            cellValueS = excelFloatToDate(Number(cellS.value.toString()));
//                                                                                            if(cellValueS == "Error"){
//                                                                                                    msjError = "Error. Reminder Date incorrect format. Please contact AM. (Column J)";
//                                                                                            }
//                                                                                    }
//
//                                                                            } 
                                                                            
                                                                            else if(rowS > 0 && colS == 16){
                                                                                    //Fecha de la transacción (09/08/2017)
                                                                                    tmp = (cellS.value).toString();

                                                                                    if(app.trim(tmp) == ""){
                                                                                            msjError = "Error. Transaction Date is empty. Please contact AM. (Column Q)";

                                                                                    }else if(tmp.indexOf("N/A") >= 0){
                                                                                            msjError = "Error. Invalid format Transaction Date (N/A). Please contact AM. (Column Q)";

                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                            msjError = "Error. Invalid Transaction Date. Please contact AM. (Column Q)";

                                                                                    }else if(tmp.length == 10){
                                                                                            cellValueS = tmp;

                                                                                    }else{
                                                                                            cellValueS = excelFloatToDate(Number(cellS.value.toString()));
                                                                                            if(cellValueS == "Error"){
                                                                                                    msjError = "Error. Invalid format Transaction Date. Please contact AM. (Column Q)";
                                                                                            }
                                                                                    }

                                                                            } else if(rowS > 0 && colS == 21){
                                                                                    //Fecha de Recepción de la Solicitud de Pagaré (31/08/2017)
                                                                                    tmp = (cellS.value).toString();

                                                                                    if(app.trim(tmp) == ""){
                                                                                            msjError = "Error. Reception Date is Empty. Please contact AM. (Column V)";

                                                                                    }else if(tmp.indexOf("N/A") >= 0){
                                                                                            msjError = "Error. Invalid format Reception Date (N/A). Please contact AM. (Column V)";

                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                            msjError = "Error. Invalid Reception Date. Please contact AM. (Column V)";

                                                                                    }else if(tmp.length == 10){
                                                                                            cellValueS = tmp;

                                                                                    }else{
                                                                                            cellValueS = excelFloatToDate(Number(tmp));
                                                                                            if(cellValueS == "Error"){
                                                                                                    msjError = "Error. Invalid format Reception Date. Please contact AM. (Column V)";
                                                                                            }
                                                                                    }

                                                                            } else if(rowS > 0 && colS == 26){
                                                                                    //Fecha Límite para Atender (11/09/2017)
                                                                                    tmp = (cellS.value).toString();

                                                                                    if(app.trim(tmp) == ""){
                                                                                            msjError = "Error. Attention Date Limit is Empty. Please contact AM. (Column AA)";

                                                                                    }else if(tmp.indexOf("N/A") >= 0){
                                                                                            msjError = "Error. Invalid format Attention Date Limit Date (N/A). Please contact AM. (Column AA)";

                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                            msjError = "Error. Invalid Attention Date Limit Date. Please contact AM. (Column AA)";

                                                                                    }else if(tmp.length == 10){
                                                                                            cellValueS = tmp;

                                                                                    }else{
                                                                                            cellValueS = excelFloatToDate(Number(tmp));
                                                                                            if(cellValueS == "Error"){
                                                                                                    msjError = "Error. Invalid format Attention Date Limit Date. Please contact AM. (Column AA)";
                                                                                            }
                                                                                    }

                                                                            } else{
                                                                                    cellValueS =(cellS.value).toString();
                                                                            }

                                                                    }else{
                                                                            break;
                                                                    }

                                                                    if(msjError != ""){
                                                                            break;
                                                                    }else{
                                                                            filaCompleta += cellValueS + ',';
                                                                    }
                                                            }
                                                    }


                                                if(msjError != ""){
                                                       break;
                                                    }else{
                                                            listaExcelString.addItem(filaCompleta);
                                                    }
                                            }else{
                                                    msjError = "Error.Excel file has an invalid format.";

                                            }																		


                                    }
                            }

                            //FIN SANTANDER ====================================================================
                            //==================================================================================

                    }else if(banco == "PP"){
                            //==================================================================================
                            //INICIO PAYPAL ====================================================================

                            if(input == "N"){
                                    //Avisos
                                    msjError = "Under Construction";
                            }else{
                                    //Aclaraciones
                                    for(var rowP:int = 0; rowP < noOfRows; rowP++){

                                            filaCompleta = '';
                                            for(var colP:int = 0; colP < noOfColumns; colP++){
                                                    var cellP:Cell = new Cell();
                                                    var cellValueP:String = new String();
                                                    cellP = sheet.getCell(rowP, colP);

                                                    if(cellP != null){
                                                            msjError = "";
                                                            tmp = "";

                                                            tmp = (cellP.value).toString();

                                                            if(colP == 0 && tmp == ''){
                                                                    filaTotal = true;
                                                            }

                                                            if(filaTotal == false){

                                                                    if(rowP > 0 && colP == 1){
                                                                            //Fecha de Venta (11-Aug-17)
                                                                            //tmp : Thu Aug 17 00:00:00 GMT-0500 2017
                                                                            tmp = (cellP.value).toString();

                                                                            var fecha:Date = new Date(tmp);
                                                                            tmp = app.stringPad((fecha.getDate() - 1).toString(), '0', 2) + '-'
                                                                                    + app.getAbreviaturaMes(app.stringPad((fecha.getMonth() + 1).toString(), '0', 2)) + '-'
                                                                                    + fecha.getFullYear().toString().substring(2, 4);

                                                                            //Alert.show('fecha : ' + tmp);

                                                                            if(app.trim(tmp) == ""){
                                                                                    msjError = "Error. Sales Date is Empty. Please contact AM. (Column B)";

                                                                            }else if(tmp.indexOf("N/A") >= 0){
                                                                                    msjError = "Error. Sales Date incorrect format (N/A). Please contact AM. (Column B)";

                                                                            }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                    msjError = "Error. Invalid Sales Date. Please contact AM. (Column B)";

                                                                            }else if(tmp.length == 9){
                                                                                    cellValueP = tmp;

                                                                            }else{
                                                                                    cellValueP = excelFloatToDate(Number(cellP.value.toString()));
                                                                                    if(cellValueP == "Error"){
                                                                                            msjError = "Error. Sales Date incorrect format. Please contact AM. (Column B)";
                                                                                    }
                                                                            }

                                                                    } else{
                                                                            cellValueP =(cellP.value).toString();
                                                                    }

                                                            }else{
                                                                    break;
                                                            }

                                                            if(msjError != ""){
                                                                    break;
                                                            }else{
                                                                    filaCompleta += cellValueP + ',';
                                                            }
                                                    }
                                            }

                                            if(msjError != ""){
                                                    break;
                                            }else{
                                                    listaExcelString.addItem(filaCompleta);
                                            }
                                    }
                            }

                            //FIN PAYPAL =======================================================================
                            //==================================================================================

                    }else{

                            //==================================================================================
                            //INICIO BANAMEX ===================================================================

                            if(input == "N"){
                                    //Avisos
                                    for(var rowAB:int = 0; rowAB < noOfRows; rowAB++){

                                            filaCompleta = '';
                                            for(var colAB:int = 0; colAB < noOfColumns; colAB++){
                                                    var cellAB:Cell = new Cell();
                                                    var cellValueAB:String = new String();
                                                    cellAB = sheet.getCell(rowAB, colAB);

                                                    if(cellAB != null){
                                                            msjError = "";
                                                            tmp = "";

                                                            tmp = (cellAB.value).toString();

                                                            if(colAB == 0 && tmp == ''){
                                                                    filaTotal = true;
                                                            }

                                                            if(filaTotal == false){

                                                                    if(rowAB > 0 && colAB == 5){
                                                                            //FECHA DE APLICACIÓN (02/10/2017)
                                                                            tmp = (cellAB.value).toString();

                                                                            if(app.trim(tmp) == ""){
                                                                                    msjError = "Error. Application Date is Empty. Please contact AM. (Column F)";

                                                                            }else if(tmp.indexOf("N/A") >= 0){
                                                                                    msjError = "Error. Application Date incorrect format (N/A). Please contact AM. (Column F)";

                                                                            }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                    msjError = "Error. Invalid Application Date. Please contact AM. (Column F)";

                                                                            }else if(tmp.length == 10){
                                                                                    cellValueAB = tmp;

                                                                            }else{
                                                                                    cellValueAB = excelFloatToDate(Number(cellAB.value.toString()));
                                                                                    if(cellValueAB == "Error"){
                                                                                            msjError = "Error. Application Date incorrect format. Please contact AM. (Column F)";
                                                                                    }
                                                                            }

                                                                    } else{
                                                                            cellValueAB =(cellAB.value).toString();
                                                                    }

                                                            }else{
                                                                    break;
                                                            }

                                                            if(msjError != ""){
                                                                    break;
                                                            }else{
                                                                    filaCompleta += cellValueAB + ',';
                                                            }
                                                    }
                                            }

                                            if(msjError != ""){
                                                    break;
                                            }else{
                                                    listaExcelString.addItem(filaCompleta);
                                            }
                                    }

                            }else{
                                    //Aclaraciones

                                    var correct:Boolean = true;
                                    for(var rowB:int = 0; rowB < noOfRows; rowB++){

                                            var cellSv:Cell = new Cell();
                                        cellSv = sheet.getCell(rowB, 4);
                                        var valueS:String = (cellSv.value).toString();


                                            var cellTot:Cell = new Cell();
                                        cellTot = sheet.getCell(rowB, 5);
                                        var valueTOT:String = (cellTot.value).toString();

                                        if(rowB !== 0  &&valueTOT.toUpperCase().indexOf("TOTAL") ===-1 ) {

                                                if(app.trim(valueS).length !== 16 && app.trim(valueS).length !== 15  ){
                                                   correct = false;

                                                   msjError = "Error. Invalid format. TOO LONG CREDIT CARD. Please contact AM.";
                                                    }
                                        }

                                            filaCompleta = '';

                                        if (rowB !== 0  &&valueTOT.toUpperCase().indexOf("TOTAL") > -1){
                                            break;
                                        }

                                            if(correct){

                                               for(var colB:int = 0; colB < noOfColumns; colB++){
                                                    var cellB:Cell = new Cell();
                                                    var cellValueB:String = new String();
                                                    cellB = sheet.getCell(rowB, colB);

                                                            if(cellB != null){
                                                                    msjError = "";
                                                                    tmp = "";

                                                                    tmp = (cellB.value).toString();


                                                                    if(colB == 0 && tmp == ''){
                                                                            filaTotal = true;
                                                                    }

                                                                    if(filaTotal == false){

                                                                            if(rowB > 0 && colB == 0){
                                                                                    //FECHA_REME (04/10/2017)
                                                                                    tmp = (cellB.value).toString();

                                                                                    if(app.trim(tmp) == ""){
                                                                                            msjError = "Error. Remittance Date is Empty. Please contact AM. (Column A)";

                                                                                    }else if(tmp.indexOf("N/A") >= 0){
                                                                                            msjError = "Error. Remittance Date incorrect format (N/A). Please contact AM. (Column A)";

                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                            msjError = "Error. Invalid Remittance Date. Please contact AM. (Column A)";

                                                                                    }else if(tmp.length == 10){
                                                                                            cellValueB = tmp;

                                                                                    }else{
                                                                                            cellValueB = excelFloatToDate(Number(cellB.value.toString()));
                                                                                            if(cellValueB == "Error"){
                                                                                                    msjError = "Error. Remittance Date incorrect format. Please contact AM. (Column A)";
                                                                                            }
                                                                                    }

                                                                            }else if(rowB > 0 && colB == 7){
                                                                                    //FECHA_VENT (16/09/2017)
                                                                                    tmp = (cellB.value).toString();

                                                                                    if(app.trim(tmp) == ""){
                                                                                            msjError = "Error. Sales Date is Empty. Please contact AM. (Column H)";

                                                                                    }else if(tmp.indexOf("N/A") >= 0){
                                                                                            msjError = "Error. Sales Date incorrect format (N/A). Please contact AM. (Column H)";

                                                                                    }else if(tmp == "99/99/9999" || tmp == "99-99-9999"){
                                                                                            msjError = "Error. Invalid Sales Date. Please contact AM. (Column H)";

                                                                                    }else if(tmp.length == 10){
                                                                                            cellValueB = tmp;

                                                                                    }else{
                                                                                            cellValueB = excelFloatToDate(Number(cellB.value.toString()));
                                                                                            if(cellValueB == "Error"){
                                                                                                    msjError = "Error. Sales Date incorrect format. Please contact AM. (Column H)";
                                                                                            }
                                                                                    }

                                                                            } else{
                                                                                    cellValueB =(cellB.value).toString();
                                                                            }

                                                                    }else{
                                                                            break;
                                                                    }

                                                                    if(msjError != ""){
                                                                            break;
                                                                    }else{
                                                                            filaCompleta += cellValueB + ',';
                                                                    }
                                                            }
                                                    }

                                                    if(msjError != ""){
                                                            break;
                                                    }else{
                                                            listaExcelString.addItem(filaCompleta);
                                                    }

                                            }
                                    }

                            }


                            //Banamex, Santander, Paypal
                            
//                            for(var rowO:int = 0; rowO < noOfRows; rowO++){
//                                    //var cellObject:Object ={};
//                                    filaCompleta = '';
//                                    for(var colO:int = 0; colO < noOfColumns; colO++){
//                                            var cellO:Cell = new Cell();
//                                            var cellValueO:String = new String();
//                                            cellO = sheet.getCell(rowO, colO);
//                                            if(cellO != null){
//                                                    cellValueO =(cellO.value).toString();
//                                                    filaCompleta += cellValueO + ',';
//                                            }
//                                    }// inner for loop ends
//                                    listaExcelString.addItem(filaCompleta);
//                            } //for loop ends
                            

                                //FIN BANAMEX ======================================================================
                                //==================================================================================
                        }


                    } //if sheet
            } //if filedata
        
        } catch (Exception e) {
            
        }
        
        return msj;
    }
    */
    
   
    
    
    
}
    

