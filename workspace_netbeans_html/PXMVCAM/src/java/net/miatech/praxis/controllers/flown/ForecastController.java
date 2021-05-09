/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.IMF140Filter;
import net.miatech.beans.IMF141Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ForecastLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
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
@RequestMapping("/Forecast")
public class ForecastController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ForecastLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Forecast/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : Search-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03895(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchItinerary")
    public @ResponseBody
    String searchItinerary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchItinerary-------------");

        map.put("success", true);
        List<IMF141Filter> lst = this.getListItinerary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF141Filter> getListItinerary(HttpServletRequest request, Boolean bExcel) {

        List<IMF141Filter> lst = new ArrayList<>(0);
        IMF141Filter filter = new IMF141Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF141Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03896(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPercentage")
    public @ResponseBody
    String searchPercentage(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : searchPercentage-------------");
        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastPercentage(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastPercentage(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03898(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecast")
    public @ResponseBody
    String searchForecast(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecast-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecast(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecast(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03897(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastZones")
    public @ResponseBody
    String searchForecastZones(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecastZones-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastZones(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastZones(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03936(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchAmountByZones")
    public @ResponseBody
    String searchAmountByZones(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchAmountByZones-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListAmountByZones(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListAmountByZones(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03937(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    //Reportes Excel
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Flown Real  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Date");
            CH1_1.setCellValue("Date");
            CH1_2.setCellValue("PAX");
            CH1_3.setCellValue("Amount");
            CH1_4.setCellValue("Average");
            CH1_5.setCellValue("Amount");
            CH1_6.setCellValue("Average");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH2_0.setCellValue("Cont");
            CH2_1.setCellValue("Flight");
            CH2_2.setCellValue("ML");
            CH2_3.setCellValue("Revenue USD");
            CH2_4.setCellValue("Revenue USD");
            CH2_5.setCellValue("Revenue MXN");
            CH2_6.setCellValue("Revenue MXN");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);

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

                rcell0.setCellValue(listaData.get(vi).FCONT);
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).QTYPAX);
                rcell3.setCellValue(listaData.get(vi).VCPNUSD);
                rcell4.setCellValue(listaData.get(vi).VPROUSD);
                rcell5.setCellValue(listaData.get(vi).VCPNMXN);
                rcell6.setCellValue(listaData.get(vi).VPROMXN);
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

    @RequestMapping(value = "getXLSXItinerary")
    public @ResponseBody
    void getXLSXItinerary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXItinerary");
        String fileNameDownload = String.format("Itinerary  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF141Filter> listaData = this.getListItinerary(request, true);
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

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");

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
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("ASI");
            CH2_2.setCellValue("CAM");
            CH2_3.setCellValue("CAN");
            CH2_4.setCellValue("CAR");
            CH2_5.setCellValue("EUR");
            CH2_6.setCellValue("FRO");
            CH2_7.setCellValue("LOC");
            CH2_8.setCellValue("PLA");
            CH2_9.setCellValue("SUD");
            CH2_10.setCellValue("USA");
            CH2_11.setCellValue("TOTAL");

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

                rcell0.setCellValue(listaData.get(vi).DFLIGHT);
                rcell1.setCellValue(listaData.get(vi).ASI);
                rcell2.setCellValue(listaData.get(vi).CAM);
                rcell3.setCellValue(listaData.get(vi).CAN);
                rcell4.setCellValue(listaData.get(vi).CAR);
                rcell5.setCellValue(listaData.get(vi).EUR);
                rcell6.setCellValue(listaData.get(vi).FRO);
                rcell7.setCellValue(listaData.get(vi).LOC);
                rcell8.setCellValue(listaData.get(vi).PLA);
                rcell9.setCellValue(listaData.get(vi).SUD);
                rcell10.setCellValue(listaData.get(vi).USA);
                rcell11.setCellValue(listaData.get(vi).totZonas);
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

    @RequestMapping(value = "getXLSXForecast")
    public @ResponseBody
    void getXLSXForecast(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecast");
        String fileNameDownload = String.format("Forecast  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListForecast(request, true);
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

            CellStyle style_green = workbook.createCellStyle();
            style_green.setFillForegroundColor(IndexedColors.GREEN.getIndex());
            style_green.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_yellow = workbook.createCellStyle();
            style_yellow.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
            style_yellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_red = workbook.createCellStyle();
            style_red.setFillForegroundColor(IndexedColors.RED.getIndex());
            style_red.setFillPattern(CellStyle.SOLID_FOREGROUND);

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

            CH1_0.setCellValue("");
            CH1_1.setCellValue("Date");
            CH1_2.setCellValue("PAX");
            CH1_3.setCellValue("Amount");
            CH1_4.setCellValue("Average");
            CH1_5.setCellValue("Amount");
            CH1_6.setCellValue("Average");
            CH1_7.setCellValue("Seq");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("%Var vs");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Flight");
            CH2_2.setCellValue("ML");
            CH2_3.setCellValue("Revenue USD");
            CH2_4.setCellValue("Revenue USD");
            CH2_5.setCellValue("Revenue MXN");
            CH2_6.setCellValue("Revenue MXN");
            CH2_7.setCellValue("week Day");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("Average Fare");

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

                rcell0.setCellValue(" ");
                if (listaData.get(vi).TREG.equals("0")) {
                    rcell0.setCellStyle(style_green);
                } else if (listaData.get(vi).TREG.equals("2")) {
                    rcell0.setCellStyle(style_yellow);
                }
                
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).QTYPAX);
                rcell3.setCellValue(listaData.get(vi).VCPNUSD);
                rcell4.setCellValue(listaData.get(vi).VPROUSD);
                rcell5.setCellValue(listaData.get(vi).VCPNMXN);
                rcell6.setCellValue(listaData.get(vi).VPROMXN);
                rcell7.setCellValue(listaData.get(vi).DWEEK);
                rcell8.setCellValue(" ");
                if (listaData.get(vi).VCPNMXN > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN >= 20) {
                        rcell8.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN < 20 && listaData.get(vi).AVRG_VCPNMXN >= -25) {
                        rcell8.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN < -25) {
                        rcell8.setCellStyle(style_yellow);
                    }
                }
                
                rcell9.setCellValue(listaData.get(vi).AVRG_VCPMXN_PORCENTAJE);
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

    @RequestMapping(value = "getXLSXForecastPercentage")
    public @ResponseBody
    void getXLSXForecastPercentage(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecastPercentage");
        String fileNameDownload = String.format("Forecast Percentage  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListForecastPercentage(request, true);
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
            Cell CH1_12 = row1.createCell(12);

            CH1_0.setCellValue("Day");
            CH1_1.setCellValue("Flight");
            CH1_2.setCellValue("ASI");
            CH1_3.setCellValue("CAM");
            CH1_4.setCellValue("CAN");
            CH1_5.setCellValue("CAR");
            CH1_6.setCellValue("EUR");
            CH1_7.setCellValue("FRO");
            CH1_8.setCellValue("LOC");
            CH1_9.setCellValue("PLA");
            CH1_10.setCellValue("SUD");
            CH1_11.setCellValue("USA");
            CH1_12.setCellValue("TOTAL");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));

            ++vj;
             //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);

            CH2_0.setCellValue("Week");
            CH2_1.setCellValue("Date");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);

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
                Cell rcell12 = row1.createCell(12);

                rcell0.setCellValue(listaData.get(vi).DWEEK);
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).percentageASI);
                rcell3.setCellValue(listaData.get(vi).percentageCAM);
                rcell4.setCellValue(listaData.get(vi).percentageCAN);
                rcell5.setCellValue(listaData.get(vi).percentageCAR);
                rcell6.setCellValue(listaData.get(vi).percentageEUR);
                rcell7.setCellValue(listaData.get(vi).percentageFRO);
                rcell8.setCellValue(listaData.get(vi).percentageLOC);
                rcell9.setCellValue(listaData.get(vi).percentagePLA);
                rcell10.setCellValue(listaData.get(vi).percentageSUD);
                rcell11.setCellValue(listaData.get(vi).percentageUSA);
                rcell12.setCellValue(listaData.get(vi).totalRegistros);
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
            sheet.autoSizeColumn(12, true);

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

    @RequestMapping(value = "getXLSXForecastZones")
    public @ResponseBody
    void getXLSXForecastZones(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecastZones");
        String fileNameDownload = String.format("Forecast Zones  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListForecastZones(request, true);
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

            CellStyle style_green = workbook.createCellStyle();
            style_green.setFillForegroundColor(IndexedColors.GREEN.getIndex());
            style_green.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_yellow = workbook.createCellStyle();
            style_yellow.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
            style_yellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_red = workbook.createCellStyle();
            style_red.setFillForegroundColor(IndexedColors.RED.getIndex());
            style_red.setFillPattern(CellStyle.SOLID_FOREGROUND);

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
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);
            Cell CH1_32 = row1.createCell(32);
            Cell CH1_33 = row1.createCell(33);
            Cell CH1_34 = row1.createCell(34);
            Cell CH1_35 = row1.createCell(35);
            Cell CH1_36 = row1.createCell(36);
            Cell CH1_37 = row1.createCell(37);
            Cell CH1_38 = row1.createCell(38);
            Cell CH1_39 = row1.createCell(39);
            Cell CH1_40 = row1.createCell(40);
            Cell CH1_41 = row1.createCell(41);
            Cell CH1_42 = row1.createCell(42);
            Cell CH1_43 = row1.createCell(43);
            Cell CH1_44 = row1.createCell(44);
            Cell CH1_45 = row1.createCell(45);
            Cell CH1_46 = row1.createCell(46);
            Cell CH1_47 = row1.createCell(47);
            Cell CH1_48 = row1.createCell(48);
            Cell CH1_49 = row1.createCell(49);
            Cell CH1_50 = row1.createCell(50);
            Cell CH1_51 = row1.createCell(51);
            Cell CH1_52 = row1.createCell(52);
            Cell CH1_53 = row1.createCell(53);
            Cell CH1_54 = row1.createCell(54);
            Cell CH1_55 = row1.createCell(55);
            Cell CH1_56 = row1.createCell(56);
            Cell CH1_57 = row1.createCell(57);
            Cell CH1_58 = row1.createCell(58);
            Cell CH1_59 = row1.createCell(59);
            Cell CH1_60 = row1.createCell(60);
            Cell CH1_61 = row1.createCell(61);
            Cell CH1_62 = row1.createCell(62);

            CH1_0.setCellValue("");
            CH1_1.setCellValue("Seq");
            CH1_2.setCellValue("Flight");
            //ASI
            CH1_3.setCellValue("ASI");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("%Var vs");
            //CAM
            CH1_9.setCellValue("CAM");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("%Var vs");
            //CAN
            CH1_15.setCellValue("CAN");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("%Var vs");
            //CAR
            CH1_21.setCellValue("CAR");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("%Var vs");
            //EUR
            CH1_27.setCellValue("EUR");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("%Var vs");
            //FRO
            CH1_33.setCellValue("FRO");
            CH1_34.setCellValue("");
            CH1_35.setCellValue("");
            CH1_36.setCellValue("");
            CH1_37.setCellValue("");
            CH1_38.setCellValue("%Var vs");
            //LOC
            CH1_39.setCellValue("LOC");
            CH1_40.setCellValue("");
            CH1_41.setCellValue("");
            CH1_42.setCellValue("");
            CH1_43.setCellValue("");
            CH1_44.setCellValue("%Var vs");
            //PLA
            CH1_45.setCellValue("PLA");
            CH1_46.setCellValue("");
            CH1_47.setCellValue("");
            CH1_48.setCellValue("");
            CH1_49.setCellValue("");
            CH1_50.setCellValue("%Var vs");
            //SUD
            CH1_51.setCellValue("SUD");
            CH1_52.setCellValue("");
            CH1_53.setCellValue("");
            CH1_54.setCellValue("");
            CH1_55.setCellValue("");
            CH1_56.setCellValue("%Var vs");
            //USA
            CH1_57.setCellValue("USA");
            CH1_58.setCellValue("");
            CH1_59.setCellValue("");
            CH1_60.setCellValue("");
            CH1_61.setCellValue("");
            CH1_62.setCellValue("%Var vs");

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
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_32.setCellStyle(headerStyle);
            CH1_33.setCellStyle(headerStyle);
            CH1_34.setCellStyle(headerStyle);
            CH1_35.setCellStyle(headerStyle);
            CH1_36.setCellStyle(headerStyle);
            CH1_37.setCellStyle(headerStyle);
            CH1_38.setCellStyle(headerStyle);
            CH1_39.setCellStyle(headerStyle);
            CH1_40.setCellStyle(headerStyle);
            CH1_41.setCellStyle(headerStyle);
            CH1_42.setCellStyle(headerStyle);
            CH1_43.setCellStyle(headerStyle);
            CH1_44.setCellStyle(headerStyle);
            CH1_45.setCellStyle(headerStyle);
            CH1_46.setCellStyle(headerStyle);
            CH1_47.setCellStyle(headerStyle);
            CH1_48.setCellStyle(headerStyle);
            CH1_49.setCellStyle(headerStyle);
            CH1_50.setCellStyle(headerStyle);
            CH1_51.setCellStyle(headerStyle);
            CH1_52.setCellStyle(headerStyle);
            CH1_53.setCellStyle(headerStyle);
            CH1_54.setCellStyle(headerStyle);
            CH1_55.setCellStyle(headerStyle);
            CH1_56.setCellStyle(headerStyle);
            CH1_57.setCellStyle(headerStyle);
            CH1_58.setCellStyle(headerStyle);
            CH1_59.setCellStyle(headerStyle);
            CH1_60.setCellStyle(headerStyle);
            CH1_61.setCellStyle(headerStyle);
            CH1_62.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 30));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 39, 42));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 45, 48));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 51, 54));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 57, 60));
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
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);
            Cell CH2_31 = row2.createCell(31);
            Cell CH2_32 = row2.createCell(32);
            Cell CH2_33 = row2.createCell(33);
            Cell CH2_34 = row2.createCell(34);
            Cell CH2_35 = row2.createCell(35);
            Cell CH2_36 = row2.createCell(36);
            Cell CH2_37 = row2.createCell(37);
            Cell CH2_38 = row2.createCell(38);
            Cell CH2_39 = row2.createCell(39);
            Cell CH2_40 = row2.createCell(40);
            Cell CH2_41 = row2.createCell(41);
            Cell CH2_42 = row2.createCell(42);
            Cell CH2_43 = row2.createCell(43);
            Cell CH2_44 = row2.createCell(44);
            Cell CH2_45 = row2.createCell(45);
            Cell CH2_46 = row2.createCell(46);
            Cell CH2_47 = row2.createCell(47);
            Cell CH2_48 = row2.createCell(48);
            Cell CH2_49 = row2.createCell(49);
            Cell CH2_50 = row2.createCell(50);
            Cell CH2_51 = row2.createCell(51);
            Cell CH2_52 = row2.createCell(52);
            Cell CH2_53 = row2.createCell(53);
            Cell CH2_54 = row2.createCell(54);
            Cell CH2_55 = row2.createCell(55);
            Cell CH2_56 = row2.createCell(56);
            Cell CH2_57 = row2.createCell(57);
            Cell CH2_58 = row2.createCell(58);
            Cell CH2_59 = row2.createCell(59);
            Cell CH2_60 = row2.createCell(60);
            Cell CH2_61 = row2.createCell(61);
            Cell CH2_62 = row2.createCell(62);

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Week Day");
            CH2_2.setCellValue("Date");
            //ASI
            CH2_3.setCellValue("PAX");
            CH2_4.setCellValue("AVG USD");
            CH2_5.setCellValue("AMOUNT USD");
            CH2_6.setCellValue("AMOUNT MXN");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Average Fare");
            //CAM            
            CH2_9.setCellValue("PAX");
            CH2_10.setCellValue("AVG USD");
            CH2_11.setCellValue("AMOUNT USD");
            CH2_12.setCellValue("AMOUNT MXN");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("Average Fare");
            //CAN
            CH2_15.setCellValue("PAX");
            CH2_16.setCellValue("AVG USD");
            CH2_17.setCellValue("AMOUNT USD");
            CH2_18.setCellValue("AMOUNT MXN");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("Average Fare");
            //CAR
            CH2_21.setCellValue("PAX");
            CH2_22.setCellValue("AVG USD");
            CH2_23.setCellValue("AMOUNT USD");
            CH2_24.setCellValue("AMOUNT MXN");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("Average Fare");
            //EUR
            CH2_27.setCellValue("PAX");
            CH2_28.setCellValue("AVG USD");
            CH2_29.setCellValue("AMOUNT USD");
            CH2_30.setCellValue("AMOUNT MXN");
            CH2_31.setCellValue("");
            CH2_32.setCellValue("Average Fare");
            //FRO
            CH2_33.setCellValue("PAX");
            CH2_34.setCellValue("AVG USD");
            CH2_35.setCellValue("AMOUNT USD");
            CH2_36.setCellValue("AMOUNT MXN");
            CH2_37.setCellValue("");
            CH2_38.setCellValue("Average Fare");
            //LOC
            CH2_39.setCellValue("PAX");
            CH2_40.setCellValue("AVG USD");
            CH2_41.setCellValue("AMOUNT USD");
            CH2_42.setCellValue("AMOUNT MXN");
            CH2_43.setCellValue("");
            CH2_44.setCellValue("Average Fare");
            //EUR
            CH2_45.setCellValue("PAX");
            CH2_46.setCellValue("AVG USD");
            CH2_47.setCellValue("AMOUNT USD");
            CH2_48.setCellValue("AMOUNT MXN");
            CH2_49.setCellValue("");
            CH2_50.setCellValue("Average Fare");
            //SUD
            CH2_51.setCellValue("PAX");
            CH2_52.setCellValue("AVG USD");
            CH2_53.setCellValue("AMOUNT USD");
            CH2_54.setCellValue("AMOUNT MXN");
            CH2_55.setCellValue("");
            CH2_56.setCellValue("Average Fare");
            //USA
            CH2_57.setCellValue("PAX");
            CH2_58.setCellValue("AVG USD");
            CH2_59.setCellValue("AMOUNT USD");
            CH2_60.setCellValue("AMOUNT MXN");
            CH2_61.setCellValue("");
            CH2_62.setCellValue("Average Fare");

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
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_32.setCellStyle(headerStyle);
            CH2_33.setCellStyle(headerStyle);
            CH2_34.setCellStyle(headerStyle);
            CH2_35.setCellStyle(headerStyle);
            CH2_36.setCellStyle(headerStyle);
            CH2_37.setCellStyle(headerStyle);
            CH2_38.setCellStyle(headerStyle);
            CH2_39.setCellStyle(headerStyle);
            CH2_40.setCellStyle(headerStyle);
            CH2_41.setCellStyle(headerStyle);
            CH2_42.setCellStyle(headerStyle);
            CH2_43.setCellStyle(headerStyle);
            CH2_44.setCellStyle(headerStyle);
            CH2_45.setCellStyle(headerStyle);
            CH2_46.setCellStyle(headerStyle);
            CH2_47.setCellStyle(headerStyle);
            CH2_48.setCellStyle(headerStyle);
            CH2_49.setCellStyle(headerStyle);
            CH2_50.setCellStyle(headerStyle);
            CH2_51.setCellStyle(headerStyle);
            CH2_52.setCellStyle(headerStyle);
            CH2_53.setCellStyle(headerStyle);
            CH2_54.setCellStyle(headerStyle);
            CH2_55.setCellStyle(headerStyle);
            CH2_56.setCellStyle(headerStyle);
            CH2_57.setCellStyle(headerStyle);
            CH2_58.setCellStyle(headerStyle);
            CH2_59.setCellStyle(headerStyle);
            CH2_60.setCellStyle(headerStyle);
            CH2_61.setCellStyle(headerStyle);
            CH2_62.setCellStyle(headerStyle);

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
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);
                Cell rcell32 = row1.createCell(32);
                Cell rcell33 = row1.createCell(33);
                Cell rcell34 = row1.createCell(34);
                Cell rcell35 = row1.createCell(35);
                Cell rcell36 = row1.createCell(36);
                Cell rcell37 = row1.createCell(37);
                Cell rcell38 = row1.createCell(38);
                Cell rcell39 = row1.createCell(39);
                Cell rcell40 = row1.createCell(40);
                Cell rcell41 = row1.createCell(41);
                Cell rcell42 = row1.createCell(42);
                Cell rcell43 = row1.createCell(43);
                Cell rcell44 = row1.createCell(44);
                Cell rcell45 = row1.createCell(45);
                Cell rcell46 = row1.createCell(46);
                Cell rcell47 = row1.createCell(47);
                Cell rcell48 = row1.createCell(48);
                Cell rcell49 = row1.createCell(49);
                Cell rcell50 = row1.createCell(50);
                Cell rcell51 = row1.createCell(51);
                Cell rcell52 = row1.createCell(52);
                Cell rcell53 = row1.createCell(53);
                Cell rcell54 = row1.createCell(54);
                Cell rcell55 = row1.createCell(55);
                Cell rcell56 = row1.createCell(56);
                Cell rcell57 = row1.createCell(57);
                Cell rcell58 = row1.createCell(58);
                Cell rcell59 = row1.createCell(59);
                Cell rcell60 = row1.createCell(60);
                Cell rcell61 = row1.createCell(61);
                Cell rcell62 = row1.createCell(62);

                rcell0.setCellValue(" ");
                if (listaData.get(vi).TREG.equals("0")) {
                    rcell0.setCellStyle(style_green);
                } else if (listaData.get(vi).TREG.equals("2")) {
                    rcell0.setCellStyle(style_yellow);
                }

                rcell1.setCellValue(listaData.get(vi).DWEEK);
                rcell2.setCellValue(listaData.get(vi).DFLIGHT);
                //ASI
                rcell3.setCellValue(listaData.get(vi).PAXASI);
                rcell4.setCellValue(listaData.get(vi).VPROUSDASI);
                rcell5.setCellValue(listaData.get(vi).VCPNUSDASI);
                rcell6.setCellValue(listaData.get(vi).VCPNMXNASI);
                rcell7.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNASI > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_ASI >= 20) {
                        rcell7.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_ASI < 20 && listaData.get(vi).AVRG_VCPNMXN_ASI >= -25) {
                        rcell7.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_ASI < -25) {
                        rcell7.setCellStyle(style_yellow);
                    }
                }
                rcell8.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_ASI, 2));
                //CAM
                rcell9.setCellValue(listaData.get(vi).PAXCAM);
                rcell10.setCellValue(listaData.get(vi).VPROUSDCAM);
                rcell11.setCellValue(listaData.get(vi).VCPNUSDCAM);
                rcell12.setCellValue(listaData.get(vi).VCPNMXNCAM);
                rcell13.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNCAM > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_CAM >= 20) {
                        rcell13.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAM < 20 && listaData.get(vi).AVRG_VCPNMXN_CAM >= -25) {
                        rcell13.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAM < -25) {
                        rcell13.setCellStyle(style_yellow);
                    }
                }
                rcell14.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_CAM, 2));
                //CAN
                rcell15.setCellValue(listaData.get(vi).PAXCAN);
                rcell16.setCellValue(listaData.get(vi).VPROUSDCAN);
                rcell17.setCellValue(listaData.get(vi).VCPNUSDCAN);
                rcell18.setCellValue(listaData.get(vi).VCPNMXNCAN);
                rcell19.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNCAN > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_CAN >= 20) {
                        rcell19.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAN < 20 && listaData.get(vi).AVRG_VCPNMXN_CAN >= -25) {
                        rcell19.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAN < -25) {
                        rcell19.setCellStyle(style_yellow);
                    }
                }
                rcell20.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_CAN, 2));
                //CAR
                rcell21.setCellValue(listaData.get(vi).PAXCAR);
                rcell22.setCellValue(listaData.get(vi).VPROUSDCAR);
                rcell23.setCellValue(listaData.get(vi).VCPNUSDCAR);
                rcell24.setCellValue(listaData.get(vi).VCPNMXNCAR);
                rcell25.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNCAR > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_CAR >= 20) {
                        rcell25.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAR < 20 && listaData.get(vi).AVRG_VCPNMXN_CAR >= -25) {
                        rcell25.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAR < -25) {
                        rcell25.setCellStyle(style_yellow);
                    }
                }
                rcell26.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_CAR, 2));
                //EUR
                rcell27.setCellValue(listaData.get(vi).PAXEUR);
                rcell28.setCellValue(listaData.get(vi).VPROUSDEUR);
                rcell29.setCellValue(listaData.get(vi).VCPNUSDEUR);
                rcell30.setCellValue(listaData.get(vi).VCPNMXNEUR);
                rcell31.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNEUR > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_EUR >= 20) {
                        rcell31.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_EUR < 20 && listaData.get(vi).AVRG_VCPNMXN_EUR >= -25) {
                        rcell31.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_EUR < -25) {
                        rcell31.setCellStyle(style_yellow);
                    }
                }
                rcell32.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_EUR, 2));
                //FRO
                rcell33.setCellValue(listaData.get(vi).PAXFRO);
                rcell34.setCellValue(listaData.get(vi).VPROUSDFRO);
                rcell35.setCellValue(listaData.get(vi).VCPNUSDFRO);
                rcell36.setCellValue(listaData.get(vi).VCPNMXNFRO);
                rcell37.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNFRO > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_FRO >= 20) {
                        rcell37.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_FRO < 20 && listaData.get(vi).AVRG_VCPNMXN_FRO >= -25) {
                        rcell37.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_FRO < -25) {
                        rcell37.setCellStyle(style_yellow);
                    }
                }
                rcell38.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_FRO, 2));
                //LOC
                rcell39.setCellValue(listaData.get(vi).PAXLOC);
                rcell40.setCellValue(listaData.get(vi).VPROUSDLOC);
                rcell41.setCellValue(listaData.get(vi).VCPNUSDLOC);
                rcell42.setCellValue(listaData.get(vi).VCPNMXNLOC);
                rcell43.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNLOC > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_LOC >= 20) {
                        rcell43.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_LOC < 20 && listaData.get(vi).AVRG_VCPNMXN_LOC >= -25) {
                        rcell43.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_LOC < -25) {
                        rcell43.setCellStyle(style_yellow);
                    }
                }
                rcell44.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_LOC, 2));
                //PLA
                rcell45.setCellValue(listaData.get(vi).PAXPLA);
                rcell46.setCellValue(listaData.get(vi).VPROUSDPLA);
                rcell47.setCellValue(listaData.get(vi).VCPNUSDPLA);
                rcell48.setCellValue(listaData.get(vi).VCPNMXNPLA);
                rcell49.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNPLA > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_PLA >= 20) {
                        rcell49.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_PLA < 20 && listaData.get(vi).AVRG_VCPNMXN_PLA >= -25) {
                        rcell49.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_PLA < -25) {
                        rcell49.setCellStyle(style_yellow);
                    }
                }
                rcell50.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_PLA, 2));
                //SUD
                rcell51.setCellValue(listaData.get(vi).PAXSUD);
                rcell52.setCellValue(listaData.get(vi).VPROUSDSUD);
                rcell53.setCellValue(listaData.get(vi).VCPNUSDSUD);
                rcell54.setCellValue(listaData.get(vi).VCPNMXNSUD);
                rcell55.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNSUD > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_SUD >= 20) {
                        rcell55.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_SUD < 20 && listaData.get(vi).AVRG_VCPNMXN_SUD >= -25) {
                        rcell55.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_SUD < -25) {
                        rcell55.setCellStyle(style_yellow);
                    }
                }
                rcell56.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_SUD, 2));
                //USA
                rcell57.setCellValue(listaData.get(vi).PAXUSA);
                rcell58.setCellValue(listaData.get(vi).VPROUSDUSA);
                rcell59.setCellValue(listaData.get(vi).VCPNUSDUSA);
                rcell60.setCellValue(listaData.get(vi).VCPNMXNUSA);
                rcell61.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNUSA > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_USA >= 20) {
                        rcell61.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_USA < 20 && listaData.get(vi).AVRG_VCPNMXN_USA >= -25) {
                        rcell61.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_USA < -25) {
                        rcell61.setCellStyle(style_yellow);
                    }
                }
                rcell62.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_USA, 2));
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
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);
            sheet.autoSizeColumn(39, true);
            sheet.autoSizeColumn(40, true);
            sheet.autoSizeColumn(41, true);
            sheet.autoSizeColumn(42, true);
            sheet.autoSizeColumn(43, true);
            sheet.autoSizeColumn(44, true);
            sheet.autoSizeColumn(45, true);
            sheet.autoSizeColumn(46, true);
            sheet.autoSizeColumn(47, true);
            sheet.autoSizeColumn(48, true);
            sheet.autoSizeColumn(49, true);
            sheet.autoSizeColumn(50, true);
            sheet.autoSizeColumn(51, true);
            sheet.autoSizeColumn(52, true);
            sheet.autoSizeColumn(53, true);
            sheet.autoSizeColumn(54, true);
            sheet.autoSizeColumn(55, true);
            sheet.autoSizeColumn(56, true);
            sheet.autoSizeColumn(57, true);
            sheet.autoSizeColumn(58, true);
            sheet.autoSizeColumn(59, true);
            sheet.autoSizeColumn(60, true);
            sheet.autoSizeColumn(61, true);
            sheet.autoSizeColumn(62, true);

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

    @RequestMapping(value = "getXLSXAmountByZones")
    public @ResponseBody
    void getXLSXAmountByZones(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXAmountByZones");
        String fileNameDownload = String.format("Amount By Zones  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListAmountByZones(request, true);
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

            CH1_0.setCellValue("REGION");
            CH1_1.setCellValue("AMOUNT MXN");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);

            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);

                rcell0.setCellValue(listaData.get(vi).ZONA);
                rcell1.setCellValue(listaData.get(vi).VCPNMXN);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);

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
