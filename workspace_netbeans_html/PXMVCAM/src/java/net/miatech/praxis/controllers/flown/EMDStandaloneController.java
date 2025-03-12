
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.EMDStandaloneLogic;
import net.miatech.beans.A1817Filter;
import net.miatech.praxis.flown.A1817;
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
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/EMDStandalone")
public class EMDStandaloneController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private EMDStandaloneLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/EMDStandalone/form_index";
    }
    
    @RequestMapping(value = "searchMain")
    public @ResponseBody
    String searchMain(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDStandalone : SearchMain-------------");
        map.put("success", true);
        List<A1817Filter> lst = this.getListMain(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getListMain(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDStandaloneLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);
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

            lst = logic.loadPX529SQP04931(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchMidle")
    public @ResponseBody
    String searchMidle(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDStandalone : searchMidle-------------");
        map.put("success", true);
        List<A1817Filter> lst = this.getListMidle(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getListMidle(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDStandaloneLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
//            }

            lst = logic.loadPX529SQP04934(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getPaises")
    public @ResponseBody
    String getPaises(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDStandalone : getPaises-------------");

        map.put("success", true);
        List<A1817Filter> lst = this.getListGetPaises(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getListGetPaises(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDStandaloneLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);

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

            lst = logic.loadPX529SQP05094(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDStandalone : Search-------------");
        map.put("success", true);
        List<A1817Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDStandaloneLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);
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

            lst = logic.loadPX529SQP04924(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "validateRFIC")
    public @ResponseBody
    String validateRFIC(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDStandalone : validateRFIC-------------");
        map.put("success", true);
        List<A1817Filter> lst = this.getListValidateRFIC(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getListValidateRFIC(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDStandaloneLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);
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

            lst = logic.loadPX529SQP05095(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "MaintenanceA4479")
    public @ResponseBody
    String MaintenanceA4479(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- EMDS : MaintenanceA4479-------------");
        String option;
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);

            logic = new EMDStandaloneLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX529SQP04925(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    //Excels
    @RequestMapping(value = "getXLSXMain")
    public @ResponseBody
    void getXLSXMain(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Report Summary EMD Standalone - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1817Filter> listaData = this.getListMain(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Information EMD Standalone");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);

            if(listaData.get(0).IN_TIPO.equals("0")){
                CH2_0.setCellValue("Used");
            }else if(listaData.get(0).IN_TIPO.equals("1")){
                CH2_0.setCellValue("Valuation");
            }else if(listaData.get(0).IN_TIPO.equals("2")){
                CH2_0.setCellValue("Accounting");
            }
            
            CH2_1.setCellValue("Total EMDS");
            CH2_2.setCellValue("EMDS Concili.");
            CH2_3.setCellValue("Total");
            CH2_4.setCellValue("Accounted");
            
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            ++vj;
            //============================================
            
            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);

            CH3_0.setCellValue("Date");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("Pending");
            CH3_4.setCellValue("");
            
            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).QTYUSED);
                rcell2.setCellValue(listaData.get(vi).QTYCONCI);
                rcell3.setCellValue(listaData.get(vi).QTYPEND);
                rcell4.setCellValue(listaData.get(vi).QTYPOLIZA);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).TOT_QTYUSED);
            CH1_2_T.setCellValue(listaData.get(0).TOT_QTYCONCI);
            CH1_3_T.setCellValue(listaData.get(0).TOT_QTYPEND);
            CH1_4_T.setCellValue(listaData.get(0).TOT_QTYPOLIZA);
            
            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);

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

    @RequestMapping(value = "getXLSXMidle")
    public @ResponseBody
    void getXLSXMidle(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMidle");
        String fileNameDownload = String.format("Report Summary EMD Standalone - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1817Filter> listaData = this.getListMidle(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Information EMD Standalone");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);

            if(listaData.get(0).IN_TIPO.equals("0")){
                CH2_0.setCellValue("Used");
            }else if(listaData.get(0).IN_TIPO.equals("1")){
                CH2_0.setCellValue("Valuation");
            }else if(listaData.get(0).IN_TIPO.equals("2")){
                CH2_0.setCellValue("Accounting");
            }
            
            CH2_1.setCellValue("Total EMDS");
            CH2_2.setCellValue("EMDS Concili.");
            CH2_3.setCellValue("Total");
            CH2_4.setCellValue("Accounted");
            
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            ++vj;
            //============================================
            
            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);

            CH3_0.setCellValue("Date");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("Pending");
            CH3_4.setCellValue("");
            
            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).QTYUSED);
                rcell2.setCellValue(listaData.get(vi).QTYCONCI);
                rcell3.setCellValue(listaData.get(vi).QTYPEND);
                rcell4.setCellValue(listaData.get(vi).QTYPOLIZA);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).TOT_QTYUSED);
            CH1_2_T.setCellValue(listaData.get(0).TOT_QTYCONCI);
            CH1_3_T.setCellValue(listaData.get(0).TOT_QTYPEND);
            CH1_4_T.setCellValue(listaData.get(0).TOT_QTYPOLIZA);
            
            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
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
 
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report Detail EMD Standalone - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1817Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);

            CH1_0.setCellValue("Transaction Information");
            CH1_9.setCellValue("Sales Information");
            CH1_23.setCellValue("Poliza");
            
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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 24));
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
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);

            if(listaData.get(0).IN_TIPO.equals("0")){
                CH2_0.setCellValue("Used");
            }else if(listaData.get(0).IN_TIPO.equals("1")){
                CH2_0.setCellValue("Valuation");
            }else if(listaData.get(0).IN_TIPO.equals("2")){
                CH2_0.setCellValue("Accounting");
            }
            
            CH2_1.setCellValue("Ticket");
            CH2_2.setCellValue("Seq");
            CH2_3.setCellValue("Roll");
            CH2_4.setCellValue("VCR");
            CH2_5.setCellValue("Status");
            CH2_6.setCellValue("RFIC");
            CH2_7.setCellValue("Reason");
            CH2_8.setCellValue("Free Description");
            CH2_9.setCellValue("Country");
            CH2_10.setCellValue("Agent");
            CH2_11.setCellValue("Sale");
            CH2_12.setCellValue("Orig");
            CH2_13.setCellValue("Dest");
            CH2_14.setCellValue("Fare");
            CH2_15.setCellValue("Pax");
            CH2_16.setCellValue("Carrier");
            CH2_17.setCellValue("Accounting");
            CH2_18.setCellValue("Valuation");
            CH2_19.setCellValue("Curr.");
            CH2_20.setCellValue("Total");
            CH2_21.setCellValue("YQ value");
            CH2_23.setCellValue("Date");
            CH2_24.setCellValue("Id");
            
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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));//USED
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));//REASON
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));//SALE
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));//FARE BASIS
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));//PAX TYPE
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));//ACCOUNTING
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));//VALUATION
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));//TOTAL
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 22));//YQ
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            ++vj;
            //============================================
            
            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);
            Cell CH3_19 = row3.createCell(19);
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);

            CH3_0.setCellValue("Date");
            CH3_4.setCellValue("Date");
            CH3_7.setCellValue("Code");
            CH3_11.setCellValue("Date");
            CH3_14.setCellValue("Basis");
            CH3_15.setCellValue("Type");
            CH3_17.setCellValue("Date");
            CH3_18.setCellValue("Date");
            CH3_20.setCellValue("Value");
            CH3_21.setCellValue("16%");
            CH3_22.setCellValue("0%");
            
            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 22, 22));
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
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).strTicket);
                rcell2.setCellValue(listaData.get(vi).SEQ);
                rcell3.setCellValue(listaData.get(vi).SEQRO);
                rcell4.setCellValue(listaData.get(vi).descDVCR);
                rcell5.setCellValue(listaData.get(vi).descSTVAL);
                rcell6.setCellValue(listaData.get(vi).RFIC);
                rcell7.setCellValue(listaData.get(vi).RECODE);
                rcell8.setCellValue(listaData.get(vi).DESC_RECODE);
                rcell9.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell10.setCellValue(listaData.get(vi).AGENTE);
                rcell11.setCellValue(listaData.get(vi).descFVTA);
                rcell12.setCellValue(listaData.get(vi).ORIG);
                rcell13.setCellValue(listaData.get(vi).DEST);
                rcell14.setCellValue(listaData.get(vi).FBASE);
                rcell15.setCellValue(listaData.get(vi).TPAX);
                rcell16.setCellValue(listaData.get(vi).CARR);
                rcell17.setCellValue(listaData.get(vi).descFCONTS);
                rcell18.setCellValue(listaData.get(vi).descFECVAL);
                rcell19.setCellValue(listaData.get(vi).CURRENCY);
                rcell20.setCellValue(listaData.get(vi).VCPN);
                rcell21.setCellValue(listaData.get(vi).TN16);
                rcell22.setCellValue(listaData.get(vi).TN00);
                rcell23.setCellValue(listaData.get(vi).descFCONT);
                rcell24.setCellValue(listaData.get(vi).IDCON);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);

//            CH1_0_T.setCellValue("");
//            CH1_1_T.setCellValue("");
//            CH1_2_T.setCellValue(listaData.get(0).totQTKTS1);
            
            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            
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
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);

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
}
