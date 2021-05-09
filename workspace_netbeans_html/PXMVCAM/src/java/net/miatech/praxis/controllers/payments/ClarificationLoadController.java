/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
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
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
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
    
    
    @RequestMapping(value = "/setData"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String setData(ModelMap map, @RequestParam("fileLoad") MultipartFile file ,HttpServletRequest request) {
        
        System.out.println("-------------- ClarificationLoad : setData-------------");
        String mensaje = "", strHora = Functions.getHoraActual();
        
        
        try {
            String strBanco = request.getParameter("banco");
            byte[] bytes = file.getBytes();
            
            logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "ClarificationCsv." + strSesion + ".csv";
            
            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close(); 
            
            mensaje = logic.loadPX413SQP02535(strBanco,strArchivo);
            
            if(mensaje.contains("Successful")){
                //Llamando al PRO10574(ELavon)
                mensaje = logic.loadPX413PRO10570(strBanco,strHora);
            }
            
            map.put("Mensaje", mensaje);
            
//          //Eliminar temporal           
            archivo.delete();
            
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error al cargar el archivo: " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    
    /*
    
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ClarificationLoad : Search-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX419SQP02079(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    
    @RequestMapping(value = "detailByBank")
    public @ResponseBody
    String detailByBank(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            List<A2331Filter> lst = this.getListdetailByBank(request, false);

            map.put("success", true);
            map.put("data", lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListdetailByBank(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter;
        Gson gson = new Gson();
        String beanString;

        try {
            logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX419SQP02104(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
 
        System.out.println("ClarificationLoad : getXLSX");
        String fileNameDownload = String.format("ClarificationLoad   - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getList(request, true);
            
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
             // ====== CREANDO TITULOS ======================================


             // ======  Nivel 1 ==========

            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);

            CH1_0.setCellValue("Reception");
            CH1_1.setCellValue("Sales");
            CH1_2.setCellValue("Clarifications");
            CH1_8.setCellValue("Bank Notice / ChargedBack");


            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 10));
            ++vj;
             //============================================

             // ======  Nivel 2 ==========

            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("MXN");
            CH2_2.setCellValue("Stand By");
            CH2_3.setCellValue("On Process");
            CH2_4.setCellValue("Charged");
            CH2_5.setCellValue("Not Found");
            CH2_6.setCellValue("Total");
            CH2_7.setCellValue("MXN");
            CH2_8.setCellValue("Total");
            CH2_9.setCellValue("Not Found");
            CH2_10.setCellValue("MXN");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
        ++vj;
        while (iter.hasNext()) {
           row1 = sheet.createRow(vj);
           Cell rcell0 = row1.createCell(0);
           Cell rcell1 = row1.createCell(1);
           Cell rcell2 = row1.createCell(2);
           Cell rcell3 = row1.createCell(3);
           Cell rcell4 = row1.createCell(4);
           Cell rcell5 = row1.createCell(5);
           Cell rcell6 = row1.createCell(6);
           Cell rcell7 = row1.createCell(7);
           Cell rcell8 = row1.createCell(8);
           Cell rcell9 = row1.createCell(9);
           Cell rcell10 = row1.createCell(10);

           rcell0.setCellValue(listaData.get(vi).strFormatDate);
           rcell1.setCellValue(listaData.get(vi).dblAMTSALE);
           rcell2.setCellValue(listaData.get(vi).lngQTYCLARS);
           rcell3.setCellValue(listaData.get(vi).lngQTYCLARP);
           rcell4.setCellValue(listaData.get(vi).lngQTYCLARC);
           rcell5.setCellValue(listaData.get(vi).lngQNMATCH);
           rcell6.setCellValue(listaData.get(vi).lngQTYCLAR);
           rcell7.setCellValue(listaData.get(vi).dblAMTCLAR);
           rcell8.setCellValue(listaData.get(vi).lngQTYBANK);
           rcell9.setCellValue(listaData.get(vi).lngQTYBANKN);
           rcell10.setCellValue(listaData.get(vi).dblAMTBANK);
           
           iter.next();
           ++vi;
           ++vj;
        }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);

             //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    
    @RequestMapping(value = "getXLSX_2")
    public @ResponseBody
    void getXLSX_2(HttpServletRequest request, HttpServletResponse response) {
    
        System.out.println("Report : getXLSX_2");
        String fileNameDownload = String.format("ClarificationLoad  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
  
        try {
 
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListdetailByBank(request, true);
 
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
             // ====== CREANDO TITULOS ======================================


             // ======  Nivel 1 ==========

            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);

            CH1_0.setCellValue("Bank");
            CH1_2.setCellValue("Sales");
            CH1_3.setCellValue("Clarifications");
            CH1_9.setCellValue("Bank Notice / ChargedBack");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 11));
            ++vj;
             //============================================

             // ======  Nivel 2 ==========

            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);

            CH2_0.setCellValue("Code");
            CH2_1.setCellValue("Description");
            CH2_2.setCellValue("MXN");
            CH2_3.setCellValue("Stand By");
            CH2_4.setCellValue("On Process");
            CH2_5.setCellValue("Charged");
            CH2_6.setCellValue("Not Found");
            CH2_7.setCellValue("Total");
            CH2_8.setCellValue("MXN");
            CH2_9.setCellValue("Total");
            CH2_10.setCellValue("Not Found");
            CH2_11.setCellValue("MXN");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
             //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).CODEBANK);
                rcell1.setCellValue(listaData.get(vi).strDescripcion);
                rcell2.setCellValue(listaData.get(vi).dblAMTSALE);
                rcell3.setCellValue(listaData.get(vi).lngQTYCLARS);
                rcell4.setCellValue(listaData.get(vi).lngQTYCLARP);
                rcell5.setCellValue(listaData.get(vi).lngQTYCLARC);
                rcell6.setCellValue(listaData.get(vi).lngQNMATCH);
                rcell7.setCellValue(listaData.get(vi).lngQTYCLAR);
                rcell8.setCellValue(listaData.get(vi).dblAMTCLAR);
                rcell9.setCellValue(listaData.get(vi).lngQTYBANK);
                rcell10.setCellValue(listaData.get(vi).lngQTYBANKN);
                rcell11.setCellValue(listaData.get(vi).dblAMTBANK);
                iter.next();
                 ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);

             //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    
    @RequestMapping(value = "getXLSX_3")
    public @ResponseBody
    void getXLSX_3(HttpServletRequest request, HttpServletResponse response) {
    
        System.out.println("Report : getXLSX_3");
        String fileNameDownload = String.format("ClarificationLoad  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
  
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListdetailByBank(request, true);
            
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
             // ====== CREANDO TITULOS ======================================


             // ======  Nivel 1 ==========

            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);

            CH1_0.setCellValue("Bank");
            CH1_2.setCellValue("Sales");
            CH1_3.setCellValue("Clarifications");
            CH1_9.setCellValue("Bank Notice / ChargedBack");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 11));
            ++vj;
             //============================================

             // ======  Nivel 2 ==========

            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);

            CH2_0.setCellValue("Code");
            CH2_1.setCellValue("Description");
            CH2_2.setCellValue("MXN");
            CH2_3.setCellValue("Stand By");
            CH2_4.setCellValue("On Process");
            CH2_5.setCellValue("Charged");
            CH2_6.setCellValue("Not Found");
            CH2_7.setCellValue("Total");
            CH2_8.setCellValue("MXN");
            CH2_9.setCellValue("Total");
            CH2_10.setCellValue("Not Found");
            CH2_11.setCellValue("MXN");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
             //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).SENTDATE);
                rcell1.setCellValue(listaData.get(vi).strDescripcion);
                rcell2.setCellValue(listaData.get(vi).dblAMTSALE);
                rcell3.setCellValue(listaData.get(vi).lngQTYCLARS);
                rcell4.setCellValue(listaData.get(vi).lngQTYCLARP);
                rcell5.setCellValue(listaData.get(vi).lngQTYCLARC);
                rcell6.setCellValue(listaData.get(vi).lngQNMATCH);
                rcell7.setCellValue(listaData.get(vi).lngQTYCLAR);
                rcell8.setCellValue(listaData.get(vi).dblAMTCLAR);
                rcell9.setCellValue(listaData.get(vi).lngQTYBANK);
                rcell10.setCellValue(listaData.get(vi).lngQTYBANKN);
                rcell11.setCellValue(listaData.get(vi).dblAMTBANK);
                iter.next();
                 ++vi;
                ++vj;
            }
                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
                sheet.autoSizeColumn(8, true);
                sheet.autoSizeColumn(9, true);
                sheet.autoSizeColumn(10, true);
                sheet.autoSizeColumn(11, true);

             //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    
    */
}
