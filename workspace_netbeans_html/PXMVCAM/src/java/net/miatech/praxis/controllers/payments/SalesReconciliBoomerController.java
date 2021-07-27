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
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SalesReconciliBoomerLogic;
import net.miatech.praxis.payment.filter.A2324Filter;
import net.miatech.praxis.payment.filter.A2318Filter;
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
@RequestMapping("/SalesReconciliBoomer")
public class SalesReconciliBoomerController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesReconciliBoomerLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SalesReconciliBoomer/form_index";
    }

    @RequestMapping(value = "searchSummary")
    public @ResponseBody
    String searchSummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchSummary-------------");

        map.put("success", true);
        List<A2324Filter> lst = this.getListSummary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2324Filter> getListSummary(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter = new A2324Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
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
            lst = logic.loadPX559SQP04019(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSummaryHeader")
    public @ResponseBody
    String searchSummaryHeader(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchSummaryHeader-------------");

        map.put("success", true);
        List<A2318Filter> lst = this.getListSummaryHeader(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2318Filter> getListSummaryHeader(HttpServletRequest request, Boolean bExcel) {

        List<A2318Filter> lst = new ArrayList<>(0);
        A2318Filter filter = new A2318Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2318Filter.class);
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
            lst = logic.loadPX559SQP03991(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetHeader")
    public @ResponseBody
    String searchDetHeader(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchDetHeader-------------");
        HashMap<String, List<A2318Filter>> hmResultado = new HashMap<String, List<A2318Filter>>();

        map.put("success", true);
        hmResultado = this.getListSummaryDetailHeader(request, false);
        List<A2318Filter> lst = hmResultado.get("DATA");
        List<A2318Filter> lstTotal = hmResultado.get("TOTAL");
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstTotal", lstTotal);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<A2318Filter>> getListSummaryDetailHeader(HttpServletRequest request, Boolean bExcel) {

        HashMap<String, List<A2318Filter>> lst = new HashMap<String, List<A2318Filter>>();
        A2318Filter filter = new A2318Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2318Filter.class);
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
            lst = logic.loadPX559SQP03992(filter);
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetHeaderByPeriod")
    public @ResponseBody
    String searchDetHeaderByPeriod(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchDetHeaderByPeriod-------------");

        map.put("success", true);
        List<A2324Filter> lst = this.getListDetHeaderByPeriod(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2324Filter> getListDetHeaderByPeriod(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter = new A2324Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
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
            lst = logic.loadPX559SQP04120(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : Search-------------");

        map.put("success", true);
        List<A2324Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2324Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter = new A2324Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
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
            lst = logic.loadPX559SQP04021(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDataByRefNbr")
    public @ResponseBody
    String searchDataByRefNbr(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : SearchDataByRefNbr-------------");
        HashMap<String, List<A2324Filter>> hmResultado = new HashMap<String, List<A2324Filter>>();

        map.put("success", true);
        hmResultado = this.getListDataByRefNbr(request, false);
        List<A2324Filter> lst = hmResultado.get("DATA");
        List<A2324Filter> lstSett = hmResultado.get("SETT");
        //List<A2324Filter> lstPnr  = hmResultado.get("PNR");
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstSett", lstSett);
        //map.put("lstPnr", lstPnr);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<A2324Filter>> getListDataByRefNbr(HttpServletRequest request, Boolean bExcel) {

        HashMap<String, List<A2324Filter>> lst = new HashMap<String, List<A2324Filter>>();
        A2324Filter filter = new A2324Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
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
            lst = logic.loadPX559SQP04013(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByPNR")
    public @ResponseBody
    String searchByPNR(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            List<A2324Filter> lst = this.getListByPNR(request, false);

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

    public List<A2324Filter> getListByPNR(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter;
        Gson gson = new Gson();
        String beanString;

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
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
            lst = logic.loadPX559SQP04020(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchPNRInHeader")
    public @ResponseBody
    String searchPNRInHeader(ModelMap map, HttpServletRequest request) {
        SQP00697Filter filter = new SQP00697Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            SalesReconciliBoomerLogic logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<SQP00697Filter> listaData = logic.loadSQP04014(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/loadAccountig")
    public @ResponseBody
    String loadAccountig(ModelMap map, HttpServletRequest request) {
        PX040S01A1716Filter filter = new PX040S01A1716Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<PX040S01A1716Filter> lst_Accounting = logic.loadPXSQP04092(filter);

            map.put("success", true);
            map.put("lst_Accounting", lst_Accounting);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            A2324Filter bean;
            A2324Filter filter;
            Gson gson = new Gson();
            String beanString;

            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);

            bean = logic.loadPX559SQP04121(filter);

            map.put("success", true);
            map.put("data", bean);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String msj = "";
            A2324Filter filter;
            Gson gson = new Gson();
            String beanString;

            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);

            msj = logic.loadPX559SQP04122(filter);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }

    //Excel
    @RequestMapping(value = "getXLSXDetHeaderByPeriod")
    public @ResponseBody
    void getXLSXDetHeaderByPeriod(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetHeaderByPeriod");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2324Filter> listaData = this.getListDetHeaderByPeriod(request, true);
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

            CH1_0.setCellValue("Account");
            CH1_1.setCellValue("Client");
            CH1_2.setCellValue("PNR");
            CH1_3.setCellValue("Document");
            CH1_4.setCellValue("Currency");
            CH1_5.setCellValue("Amount");
            CH1_6.setCellValue("Exchange");
            CH1_7.setCellValue("Value");
            CH1_8.setCellValue("Date");
            CH1_9.setCellValue("Description");
            CH1_10.setCellValue("Reference");

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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Number");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Type");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("Rate");
            CH2_7.setCellValue("Type");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");

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

                rcell0.setCellValue("*8221");
                rcell1.setCellValue("2103");
                rcell2.setCellValue(listaData.get(vi).SPNR);
                rcell3.setCellValue("F");
                rcell4.setCellValue(listaData.get(vi).SCURRENCY);
                rcell5.setCellValue(listaData.get(vi).SVFOP);
                rcell6.setCellValue("");
                rcell7.setCellValue("");
                rcell8.setCellValue("");
                rcell9.setCellValue("");
                rcell10.setCellValue("");
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

}
