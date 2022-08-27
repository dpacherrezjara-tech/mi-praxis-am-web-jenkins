/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
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
import org.apache.poi.hssf.usermodel.HSSFSheet;
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
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
        String msjUpload = "";
        
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
                
                    if(banco.equals("BX") && input.equals("C")){
                        byte[] fileDataBX = excelfile.getBytes();
                        msjUpload = uploadBanamexCSV(fileDataBX, banco, input);
                    }else{
                        
                        // ------------------------------------------------------------------------
                        // -------------- CONVERTIR EXCEL a version 97-2003(*xls) -----------------
                        // ------------------------------------------------------------------------
                        msjUpload = uploadPrev(excelfile, banco, input);
                    }
                
                map.put("successUp", true);
                map.put("msjUpload", msjUpload);
            }
            
            
            map.put("success", true);
            map.put("msjResult", msjResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    private String uploadBanamexCSV (byte[] bytes, String banco,String input) throws Exception {
        
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        
        String msj = "", msjError="" ,valueS = "",valueTOT="",filaCompleta="",tmp="";
        int noOfColu = 0;
        BufferedReader br = null;
        List<String> listaExcelString = new ArrayList<String>(0);
        boolean correct = true;
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "BanamexCsv." + strSesion + ".csv";
            
            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close();
         
            
            br = new BufferedReader(new FileReader(strArchivo));
            String line = br.readLine();

            while (null != line) {
                line = br.readLine();
                
                String [] fields = line.split(";");
                noOfColu = fields.length;
                
                valueS = fields[4];     //NUM_CTA
                valueTOT = fields[5];  //NUM_REF

                
                if (valueTOT.toUpperCase().indexOf("TOTAL") > -1){
                    break;
                }
                
                if(valueTOT.toUpperCase().indexOf("TOTAL") == -1 ) {

                    if(valueS.trim().length() != 16 && valueS.trim().length() != 15  ){
                       correct = false;

                       msjError = "Error. Invalid format. TOO LONG CREDIT CARD. Please contact AM.";
                       break;
                    }
                }
                if(msjError.equals("")){
                    /*Validacion 1era Fecha columna A*/
                    tmp = fields[0];
                    msjError = validarFecha(tmp,"A");
                }
                if(msjError.equals("")){
                    /*Validacion 1era Fecha columna H*/
                    tmp = fields[7];
                    msjError = validarFecha(tmp,"H");
                }
                
                if(!msjError.trim().equals("")){
                    msj = msjError;
                    break;
                }
                
                filaCompleta = line.replaceAll(";", ",");
                
                listaExcelString.add(filaCompleta+",");
            }
            
            
            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            if(msj.equals("")){
                msj = upload(listaExcelString, banco, input);
            }
            
            //Eliminar temporal           
            archivo.delete();
            
        } catch (Exception e) {
            e.printStackTrace();
            msj = "Se produjo un error al intentar subir el archivo.";
        }

        return msj;
        
    }
    private String validarFecha(String fecha,String columna){
        String msjError ="";
        
        
        if(fecha.trim().equals("")){
            msjError = "Error. Remittance Date is Empty. Please contact AM. (Column "+columna+  ")";

        }else if(fecha.indexOf("N/A") >= 0){
            msjError = "Error. Remittance Date incorrect format (N/A). Please contact AM. (Column "+columna+  ")";

        }else if(fecha.equals("99/99/9999") || fecha.equals("99-99-9999")){
            msjError = "Error. Invalid Remittance Date. Please contact AM. (Column "+columna+  ")";

        }else if(fecha.length() != 10){
            msjError = "Error. Format Date Invalid. Please contact AM. (Column "+columna+  ")";

        }
        
        return msjError;
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
           
    private String uploadPrev(MultipartFile excelfile, String banco, String input) {
        
        String msj = "";
        
        try {
            String filaCompleta = "";
            List<String> listaExcelString = new ArrayList<String>(0);
            String msjError = "";
            String tmp = "";
            boolean filaTotal = false;
            int i = 0;
            int noOfColumns;

            byte[] fileData = excelfile.getBytes();
            
            if(fileData != null && fileData.length > 0){
                
                String strSesion = UUID.randomUUID().toString();
                String strNomExcel = excelfile.getOriginalFilename();

                String strArchivo = "C:\\Dumps\\" + strNomExcel;
                File archivo = new File(strArchivo);
                FileOutputStream fs = new FileOutputStream(archivo);

                fs.write(fileData);
                fs.flush();
                fs.close();
                
                DataFormatter formatter = new DataFormatter();
                String primeraCelda="";
                boolean escribe = false;

                FileInputStream file = new FileInputStream(archivo);
                // leer archivo excel
                HSSFWorkbook worbook = new HSSFWorkbook(file);
                //obtener la hoja que se va leer
                HSSFSheet sheet = worbook.getSheetAt(0);
                //obtener todas las filas de la hoja excel
                Iterator<Row> rowIterator = sheet.iterator();

                if(banco.equals("**" )){
                    System.out.println("***************");
                }else if(banco.equals("ST")){
                    if(input.equals("N")){
                        //Avisos
                        msjError = "Under Construction";
                    }else{
                        // <editor-fold defaultstate="collapsed" desc="SANTANDEEEER - Aclaraciones()">
                            
                            int rowS = -1;
                            boolean flag = false;
                            int numberCol = 0;
                            
                            while (rowIterator.hasNext()) {
                                Row row = rowIterator.next();
                                rowS++;
                                i++;
                                
                                String valueS = formatter.formatCellValue(row.getCell(0));
                                if(valueS.trim().toUpperCase().equals("FOLIO")  ){
                                   numberCol = row.getLastCellNum();
                                   flag = true;
                                }
                                filaCompleta = "";
                                
                                if(flag){
                                    for (int colS = 0; colS < numberCol; colS++) {
                                        String cellValueS = "";
                                        
                                        if(row.getCell(colS) != null){
                                            msjError = "";
                                            tmp = "";
                                            
                                            if(row.getCell(colS).getCellType() == 0){
                                                tmp = new SimpleDateFormat("dd/MM/yyyy").format(row.getCell(colS).getDateCellValue()) + "";
                                            }else{
                                                tmp = formatter.formatCellValue(row.getCell(colS));
                                            }
                                            

                                            if(colS == 0 && tmp.equals("")){
                                                filaTotal = true;
                                            }
                                            
                                            if(filaTotal == false){
                                                System.out.println("IF");
                                                cellValueS = tmp;
                                            }else {
                                                break;
                                            }
                                            
                                            if(msjError != ""){
                                                break;
                                            }else{
//                                                filaCompleta += tmp + ',';
                                                filaCompleta += cellValueS + ',';
                                            }
                                        } // end cell is null
                                        else{
                                            filaCompleta +=  ',';
                                        }
                                    } // end for colS
                                    
                                    if(!msjError.equals("")){
                                        break;
                                    }else{
                                        listaExcelString.add(filaCompleta);
                                    }
                                    
                                } else {
                                    msjError = "Error.Excel file has an invalid format.";
                                } // end Flag
                            } // end While
                        //</editor-fold>
                    }
                }else if(banco.equals("PP")){                    
                    if(input.equals("N")){
                        //Avisos
                        msjError = "Under Construction";
                    }else{
                        // <editor-fold defaultstate="collapsed" desc="PAYPAL - Aclaraciones()">
                        
                        int rowP = -1;
                        int noOfCol = 0;
                        while (rowIterator.hasNext()) {
                            Row row = rowIterator.next();
                            rowP++;
                            i++;
                            filaCompleta = "";
                            
                            String numberTkt = formatter.formatCellValue(row.getCell(0));     //Número de Ticket
                            String fechVenta = formatter.formatCellValue(row.getCell(1));     //Fecha de Venta
                            String imporVent = formatter.formatCellValue(row.getCell(2));     //Importe de la venta
                            String moneda    = formatter.formatCellValue(row.getCell(3));     //Moneda
                            String numerCaso = formatter.formatCellValue(row.getCell(4));     //Numero de caso
                            
                            if (numberTkt.equals("") && fechVenta.equals("") && imporVent.equals("") && moneda.equals("") && numerCaso.equals("")){
                                break;
                            }
                            
                            if(i == 1){
                                noOfCol = row.getLastCellNum();
                            }
                            for (int colP = 0; colP < noOfCol; colP++) {
                                String cellValueP = "";
                                if(row.getCell(colP) != null){
                                    msjError = "";
                                    tmp = "";
                                    tmp = formatter.formatCellValue(row.getCell(colP));

                                    if(colP == 0 && tmp.equals("")){
                                        filaTotal = true;
                                    }

                                    if(filaTotal == false){
                                        if(rowP > 0 && colP == 1){
                                            //Fecha de Venta (11-Aug-17)
                                            //tmp : Thu Aug 17 00:00:00 GMT-0500 2017
                                            tmp = row.getCell(colP).toString();
                                            tmp = formatter.formatCellValue(row.getCell(colP));
                                            
                                            try {
                                                String [] fields = tmp.split("/");
                                                tmp =   Functions.fillZeros(2, fields[1]) + "-" + 
                                                        getAbreviaturaMes(Functions.fillZeros(2, fields[0])) + "-" +
                                                        Functions.fillZeros(2, fields[2]) ;
                                            } catch (Exception e) {
                                                tmp = "Error";
                                            }
                                            
                                            if(tmp.trim().equals("")){
                                                msjError = "Error. Sales Date is Empty. Please contact AM. (Column B)";

                                            }else if(tmp.indexOf("N/A") >= 0){
                                                msjError = "Error. Sales Date incorrect format (N/A). Please contact AM. (Column B)";

                                            }else if(tmp.equals("99/99/9999") || tmp.equals("99-99-9999")){
                                                msjError = "Error. Invalid Sales Date. Please contact AM. (Column B)";

                                            }else if(tmp.length() == 9){
                                                cellValueP = tmp;

                                            }else{
                                                msjError = "Error. Format Date Invalid. Please contact AM. (Column B)";
//                                                cellValueP = excelFloatToDate(Number(tmp));
//                                                if(cellValueP.equals("Error")){
//                                                    msjError = "Error. Sales Date incorrect format. Please contact AM. (Column B)";
//                                                }
                                            }
                                        }else{
                                            cellValueP = formatter.formatCellValue(row.getCell(colP));
                                        }
                                    }else{
                                        break;
                                    }

                                    if(!msjError.equals("")){
                                        break;
                                    }else{
                                        filaCompleta += cellValueP + ',';
                                    }
                                }
                            } // for noOfCol

                            if(!msjError.equals("")){
                                break;
                            }else{
                                listaExcelString.add(filaCompleta);
                            }
                            
                        } //while
                        
                        //</editor-fold>
                    }
                }else{
                    //==================================================================================
                    //INICIO BANAMEX (Aclaraciones se maneja CSV )===================================================================
                    
                    if(input.equals("N")){                        
                        // <editor-fold defaultstate="collapsed" desc="BANAMEX - Avisos()">
                        
                        int rowAB = -1;
                        int noOfColumn = 0;
                        while (rowIterator.hasNext()) {
                            Row row = rowIterator.next();
                            rowAB++;
                            i++;
                            filaCompleta = "";
                            
                            if(i == 1){
                                noOfColumn = row.getLastCellNum();
                            }
                            
                            for (int colAB = 0; colAB < noOfColumn; colAB++) {
                                String cellValueAB = "";
                                if(row.getCell(colAB) != null){
                                    msjError = "";
                                    tmp = "";
                                    tmp = formatter.formatCellValue(row.getCell(colAB));

                                    if(colAB == 0 && tmp.equals("")){
                                        filaTotal = true;
                                    }

                                    if(filaTotal == false){
                                        if(rowAB > 0 && colAB == 5){
                                            //FECHA DE APLICACIÓN (02/10/2017)... se tiene que convertir a YYYY-MM-DD
                                            if(row.getCell(colAB).getCellType() == 1){
                                                tmp = formatter.formatCellValue(row.getCell(colAB));
                                            }else{
//                                                tmp = new SimpleDateFormat("dd/MM/yyyy").format(row.getCell(colAB).getDateCellValue());
                                                tmp = new SimpleDateFormat("yyyy-MM-dd").format(row.getCell(colAB).getDateCellValue());
                                            }

                                            if(tmp.trim().equals("")){
                                                msjError = "Error. Application Date is Empty. Please contact AM. (Column F)";

                                            }else if(tmp.indexOf("N/A") >= 0){
                                                msjError = "Error. Application Date incorrect format (N/A). Please contact AM. (Column F)";

                                            }else if(tmp.equals("99/99/9999") || tmp.equals("99-99-9999")){
                                                msjError = "Error. Invalid Application Date. Please contact AM. (Column F)";

                                            }else if(tmp.length() == 10){
                                                cellValueAB = tmp;

                                            }else{
                                                msjError = "Error. Format Date Invalid. Please contact AM. (Column F)";
//                                                cellValueAB = excelFloatToDate(Number(tmp));
//                                                if(cellValueAB.equals("Error")){
//                                                    msjError = "Error. Application Date incorrect format. Please contact AM. (Column F)";
//                                                }
                                            }
                                        }else{
                                            cellValueAB = formatter.formatCellValue(row.getCell(colAB));
                                        }
                                    }else{
                                        break;
                                    }

                                    if(!msjError.equals("")){
                                        break;
                                    }else{
                                        filaCompleta += cellValueAB + ',';
                                    }
                                }
                            } // for noOfColumn

                            if(!msjError.equals("")){
                                break;
                            }else{
                                listaExcelString.add(filaCompleta);
                            }
                            
                        } //while
                        
                        
                        //</editor-fold>
                    }else{
                        msjError="BANAMEX ahora entra por csv";
                        // <editor-fold defaultstate="collapsed" desc="BANAMEX - Aclaraciones()">
                        /*BANAMEX ACLARACIONES SE MANEJA MEDIANTE CSV(;) debido a columnas internas que venian en los insumos XLS 
                          miércoles, 22 de junio de 2022 18:01 Elizabeth*/
//                        int rowB = -1;
//                        String valueS = "";
//                        String valueTOT = "";
//                        boolean correct = true;
//                        int noOfColu = 0;
//                        
//                        // se recorre cada fila hasta el final
//                        while (rowIterator.hasNext()) {
//                            Row row = rowIterator.next();
//                            rowB++;
//                            i++;
//                            
//                            if(i == 1){
//                                noOfColu = row.getLastCellNum();
//                            }
//                            
//                            valueS = formatter.formatCellValue(row.getCell(4));     //NUM_CTA
//                            valueTOT = formatter.formatCellValue(row.getCell(5));   //NUM_REF
//                            
//                            if(rowB != 0  && valueTOT.toUpperCase().indexOf("TOTAL") == -1 ) {
//                                        
//                                if(valueS.trim().length() != 16 && valueS.trim().length() != 15  ){
//                                   correct = false;
//
//                                   msjError = "Error. Invalid format. TOO LONG CREDIT CARD. Please contact AM.";
//                                }
//                            }
//                            
//                            filaCompleta = "";
//                            
//                            if (rowB != 0  && valueTOT.toUpperCase().indexOf("TOTAL") > -1){
//                                break;
//                            }
//                            
//                            if(correct){
//                                for (int colB = 0; colB < noOfColu; colB++) {
//                                    String cellValueB = "";
//                                    if(row.getCell(colB) != null){
//                                        msjError = "";
//                                        tmp = "";
//                                        tmp = formatter.formatCellValue(row.getCell(colB));
//
//                                        if(colB == 0 && tmp.equals("")){
//                                            filaTotal = true;
//                                        }
//                                        
//                                        if(filaTotal == false){
//                                            if(rowB > 0 && colB == 0){
//                                                //FECHA_REME (04/10/2017)
//                                                tmp = formatter.formatCellValue(row.getCell(colB));
//
//                                                if(tmp.trim().equals("")){
//                                                    msjError = "Error. Remittance Date is Empty. Please contact AM. (Column A)";
//
//                                                }else if(tmp.indexOf("N/A") >= 0){
//                                                    msjError = "Error. Remittance Date incorrect format (N/A). Please contact AM. (Column A)";
//
//                                                }else if(tmp.equals("99/99/9999") || tmp.equals("99-99-9999")){
//                                                    msjError = "Error. Invalid Remittance Date. Please contact AM. (Column A)";
//
//                                                }else if(tmp.length() == 10){
//                                                    cellValueB = tmp;
//
//                                                }else{
//                                                    msjError = "Error. Format Date Invalid. Please contact AM. (Column A)";
//    //                                                cellValueB = excelFloatToDate(Number(tmp));
////                                                    if(cellValueB.equals("Error")){
////                                                        msjError = "Error. Remittance Date incorrect format. Please contact AM. (Column A)";
////                                                    }
//                                                }
//                                            }else if(rowB > 0 && colB == 7){
//                                                //FECHA_VENT (16/09/2017)
//                                                tmp = formatter.formatCellValue(row.getCell(colB));
//
//                                                if(tmp.trim().equals("")){
//                                                    msjError = "Error. Sales Date is Empty. Please contact AM. (Column H)";
//
//                                                }else if(tmp.indexOf("N/A") >= 0){
//                                                    msjError = "Error. Sales Date incorrect format (N/A). Please contact AM. (Column H)";
//
//                                                }else if(tmp.equals("99/99/9999") || tmp.equals("99-99-9999")){
//                                                    msjError = "Error. Invalid Sales Date. Please contact AM. (Column H)";
//
//                                                }else if(tmp.length() == 10){
//                                                    cellValueB = tmp;
//
//                                                }else{
//                                                    msjError = "Error. Format Date Invalid. Please contact AM. (Column H)";
////                                                    cellValueB = excelFloatToDate(Number(tmp));
////                                                    if(cellValueB.equals("Error")){
////                                                        msjError = "Error. Sales Date incorrect format. Please contact AM. (Column H)";
////                                                    }
//                                                }
//
//                                            } else{
//                                                cellValueB = formatter.formatCellValue(row.getCell(colB));
//                                            }
//                                        }else{
//                                            break;
//                                        }
//                                        
//                                        if(!msjError.equals("")){
//                                            break;
//                                        }else{
//                                            filaCompleta += cellValueB + ',';
//                                        }
//                                    }// Cell is null
//                                } // for noOfColu
//                                
//                                if(!msjError.equals("")){
//                                    break;
//                                }else{
//                                    listaExcelString.add(filaCompleta);
//                                }
//                            } //if correct
//                        } //while
                    } //else Aclaraciones
                    //</editor-fold>
                    
                }//else BANAMEX
                
                //Eliminar temporal           
                archivo.delete();

            } //if filedata
            
            if(!msjError.equals("")){
                msj = msjError;
            }else{
                msj = upload(listaExcelString, banco, input);
            }
        
        } catch (Exception e) {
            e.printStackTrace();
            if(e.getMessage().contains("to be Excel 5.0/7.0 (BIFF5) format")){
                msj = "Error. Convertir excel a version 97-2003(*xls)";
            }else{
                msj = "Hubo un error al cargar Archivo";
            }
        }
        
        return msj;
    }
    
    private String upload(List lstExcel, String strBanco, String strInput) throws Exception {
        
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        String msj = "";
        
        try {
            String strHora = Functions.getHoraActual();
            if (lstExcel != null && lstExcel.size() > 0) {
                
                if(strInput.trim().equals("N")){
                    //AVISOS PREVIOS / CONTRACARGOS
                    ClarificationLoadLogic logic = new ClarificationLoadLogic();
                    logic.setSession(this.serverSession.getServerSession());

                    msj = logic.loadPX413SQP01999(lstExcel, strBanco, strHora);

                    if (msj.trim().equals("SUCCESS")) {
                        //Llamando al PRO10577
                        msj = logic.loadPX413PRO10577(strBanco, strHora);
                    }
                    
                }else{
                    //ACLARACIONES
                
                    ClarificationLoadLogic logic = new ClarificationLoadLogic();
                    logic.setSession(this.serverSession.getServerSession());

                    msj = logic.loadPX413SQP01977(lstExcel, strBanco, strHora);

                    if (msj.trim().equals("SUCCESS")) {
                        //Llamando al PRO10570/71/72/73
                        msj = logic.loadPX413PRO10570(strBanco, strHora);
                    }
                }
                
            } else {
                msj = "Error. Information not found.";
            }
            
            
        } catch (Exception e) {
            e.printStackTrace();
            msj = "Se produjo un error al intentar subir el archivo.";
        }

        return msj;
        
    }
    
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ClarificationLoad : Search-------------");

        map.put("success", true);
        List<A1686Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1686Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1686Filter> lst = new ArrayList<>(0);
        A1686Filter filter = new A1686Filter();
        Gson gson = new Gson();
        String beanString = "";
        String strBanco = "" , buffer = "";
       
        
        strBanco = request.getParameter("banco");
        if (strBanco.trim().equals("AX")) {
            //AMEX
            buffer = "ACLARAMEX";
        } else if (strBanco.trim().equals("ST")) {
            //SANTANDER
            buffer = "ACLARSNTDR";
        } else if (strBanco.trim().equals("PP")) {
            //PAYPAL
            buffer = "ACLARPAYPA";
        } else if (strBanco.trim().equals("EL")) {
            //PAYPAL
            buffer = "ACLAELAVON";    
        } else if (strBanco.trim().equals("US")) {
            //PAYPAL
            buffer = "ACLARAMEXU";        
        } else {
            //BANAMEX
//            buffer = "ACLARBNMX";
            buffer = strBanco;
        }

        try {
            filter.IN_FECHA_FROM = Functions.getFechaActual().substring(0, 6);
            filter.IN_FECHA_TO = Functions.getFechaActual().substring(0, 6);
            filter.IN_FUENTE = buffer;

            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            lst = logic.loadPX264SQP00665(filter, "");
//            resp.vars.put("listaData", lst);
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    private static String getAbreviaturaMes(String strDate) {
//
       if (strDate.equals("01")) {
            return "Jan";
        } else if (strDate.equals("02")) {
            return "Feb";
        } else if (strDate.equals("03")) {
            return "Mar";
        } else if (strDate.equals("04")) {
            return "Apr";
        } else if (strDate.equals("05")) {
            return "May";
        } else if (strDate.equals("06")) {
            return "Jun";
        } else if (strDate.equals("07")) {
            return "Jul";
        } else if (strDate.equals("08")) {
            return "Aug";
        } else if (strDate.equals("09")) {
            return "Sep";
        } else if (strDate.equals("10")) {
            return "Oct";
        } else if (strDate.equals("11")) {
            return "Nov";
        } else if (strDate.equals("12")) {
            return "Dec";
        } else {
            return "Error";
        }
    }
    
//    private static String excelFloatToDate(double floatVal) {
//
//        double seconds = (floatVal - 25569) * 86400.0;
//        Date fec = new Date(seconds*1000);
//        fec.setDate(fec.date + 1);
//        
//        String result = "";
//
//        try{
//            result = formatDate.format(fec);
//        }catch(Exception e){
//            result = "Error";
//        }
//        
//        return result;
//    }
   
    
    
    
}
    

