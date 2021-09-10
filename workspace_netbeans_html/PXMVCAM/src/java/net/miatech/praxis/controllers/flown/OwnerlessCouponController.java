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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.A1413Filter;
import net.miatech.praxis.logic.flown.OwnerlessCouponLogic;
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

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/OwnerlessCoupon")
public class OwnerlessCouponController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private OwnerlessCouponLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/OwnerlessCoupon/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- OwnerlessCoupon : Controller-------------");
        map.put("success", true);
        List<A1413Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        System.out.println("---> Total : " + lst.get(0).page.TOTROW);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchBeans")
    public @ResponseBody
    String searchBeans(ModelMap map, HttpServletRequest request) {

        A1413Filter bean;
        A1413Filter filter = new A1413Filter();
        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();
        filter.A1413DATE = request.getParameter("A1413DATE");
        filter.A1413CIA = request.getParameter("A1413CIA");
        filter.A1413FORSE = request.getParameter("A1413FORSE");
        filter.A1413CUPON = request.getParameter("A1413CUPON");

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            bean = logic.loadPX235SQP00257(filter, hmAeropuertos);
            map.put("success", true);
            map.put("beanCons", bean);

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanCarr")
    public @ResponseBody
    String searchBeanCarr(ModelMap map, HttpServletRequest request) {

        A1691Filter bean;
        A1691Filter filter = new A1691Filter();
        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();

        filter.DFLIGHT = request.getParameter("DFLIGHT");
        filter.NFLIGHT = request.getParameter("NFLIGHT");
        filter.CDEPART = request.getParameter("CDEPART");
        filter.CARRIVA = request.getParameter("CARRIVA");

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            bean = logic.loadPX095S04A1691(filter, hmAeropuertos);
            map.put("success", true);
            map.put("beanCons", bean);

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validFlight")
    public @ResponseBody
    String validFlight(ModelMap map, HttpServletRequest request) {
        String msj = "";
        logic = new OwnerlessCouponLogic();
        try {

            //Validando que las ciudades de Origen y Destino existan ===========
            A1413Filter bean92 = new A1413Filter();
            bean92.A1413FVLOB = request.getParameter("A1413FVLOB");
            bean92.A1413NVLOB = request.getParameter("A1413NVLOB");
            bean92.A1413FROM = request.getParameter("A1413FROM");
            bean92.A1413TO = request.getParameter("A1413TO");
            bean92.A1413TO = request.getParameter("A1413TO");

            System.out.println("A1413FVLOB - " + bean92.A1413FVLOB);
            System.out.println("A1413NVLOB - " + bean92.A1413NVLOB);
            System.out.println("A1413FROM - " + bean92.A1413FROM);
            System.out.println("A1413TO - " + bean92.A1413TO);
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX235SQP00257VALID(bean92);

        } catch (SQLException e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        map.put("success", true);
        map.put("msj", msj);
        System.out.println(" --- Controller msj : " + msj);
        return new Gson().toJson(map);
    }

    public List<A1413Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new OwnerlessCouponLogic();

        List<A1413Filter> lst = new ArrayList<>(0);
        A1413Filter filter = new A1413Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FECHA_FROM = request.getParameter("dateFrom");
            filter.IN_FECHA_TO = request.getParameter("dateTo");
            filter.IN_TKT = request.getParameter("ticketNumber");
            filter.IN_STCRU = request.getParameter("cmbStatus");
            filter.IN_NVLOB = request.getParameter("txtNVLO");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
            System.out.println(" IN_TKT : " + request.getParameter("ticketNumber"));
            System.out.println(" IN_STCRU : " + request.getParameter("cmbStatus"));
            System.out.println(" IN_NVLOB : " + request.getParameter("txtNVLO"));
            System.out.println("-------------------------------------------------- ");

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

            if (filter.IN_TKT.length() < 13) {
                lst = logic.loadPX235SQP00252(filter);
            } else {
                lst = logic.loadPX235SQP00253(filter);
            }
            if (lst.get(0).page.TOTROW < 0) {
                lst.get(0).page.TOTROW = 0;
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "searchCarrier")
    public @ResponseBody
    String searchCarrier(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A1691Filter> lst = this.getListCarrier(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1691Filter> getListCarrier(HttpServletRequest request, Boolean bExcel) {

        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();

        List<A1691Filter> lst = new ArrayList<>(0);
        A1691Filter filter = new A1691Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());

            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            filter.IN_FECHA_FROM = request.getParameter("dateFrom");
            filter.IN_FECHA_TO = request.getParameter("dateTo");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
            System.out.println("-------------------------------------------------- ");

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

            lst = logic.loadPX235SQP00905(filter, hmAeropuertos);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("OwnerLess Coupon : getXLSX");

        try {

            String option = request.getParameter("option");
            String fileNameDownload = String.format("OwnerLess Coupon - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("OwnerLessCoupon");

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
            Iterator iter;
            Row row, row2, row3;
            Cell CH1_00, CH1_01, CH1_02, CH1_03, CH1_04, CH1_05, CH1_06, CH1_07, CH1_08, CH1_09, CH1_10, CH1_11, CH1_12, CH1_13, CH1_14, CH1_15, CH1_16, CH1_17, CH1_18, CH1_19, CH1_20, CH1_21;
            Cell CH2_00, CH2_01, CH2_02, CH2_03, CH2_04, CH2_05, CH2_06, CH2_07, CH2_08, CH2_09, CH2_10, CH2_11, CH2_12, CH2_13, CH2_14, CH2_15, CH2_16, CH2_17, CH2_18, CH2_19, CH2_20, CH2_21;
            Cell CH3_00, CH3_01, CH3_02, CH3_03, CH3_04, CH3_05, CH3_06, CH3_07, CH3_08, CH3_09, CH3_10, CH3_11, CH3_12, CH3_13, CH3_14, CH3_15, CH3_16, CH3_17, CH3_18, CH3_19, CH3_20, CH3_21;

            switch (option) {
                case "0":
                    List<A1413Filter> listaData = this.getList(request, true);
                    System.out.println("Tamaño de lista devuelta : " + listaData.size());
                    iter = listaData.iterator();
                    // ====== CREANDO TITULOS ======================================

                    row = sheet.createRow(vj);
                    CH1_00 = row.createCell(0);
                    CH1_00.setCellValue("Ticket Number");
                    CH1_01 = row.createCell(1);
                    CH1_01.setCellValue("Flight Date");
                    CH1_02 = row.createCell(2);
                    CH1_02.setCellValue("Flight Number");
                    CH1_03 = row.createCell(3);
                    CH1_03.setCellValue("Transaction Date");
                    CH1_04 = row.createCell(4);
                    CH1_04.setCellValue("Join Date");
                    CH1_05 = row.createCell(5);
                    CH1_05.setCellValue("Orig");
                    CH1_06 = row.createCell(6);
                    CH1_06.setCellValue("Dest");

                    //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);
                    CH1_06.setCellStyle(headerStyle);

                    ++vj;
                    row2 = sheet.createRow(vj);
                    CH2_00 = row2.createCell(0);
                    CH2_01 = row2.createCell(1);
                    CH2_02 = row2.createCell(2);
                    CH2_03 = row2.createCell(3);
                    CH2_04 = row2.createCell(4);
                    CH2_05 = row2.createCell(5);
                    CH2_06 = row2.createCell(6);

                    CH2_00.setCellStyle(headerStyle);
                    CH2_01.setCellStyle(headerStyle);
                    CH2_02.setCellStyle(headerStyle);
                    CH2_03.setCellStyle(headerStyle);
                    CH2_04.setCellStyle(headerStyle);
                    CH2_05.setCellStyle(headerStyle);
                    CH2_06.setCellStyle(headerStyle);

                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        Cell rcell0 = row.createCell(0);
                        Cell rcell1 = row.createCell(1);
                        Cell rcell2 = row.createCell(2);
                        Cell rcell3 = row.createCell(3);
                        Cell rcell4 = row.createCell(4);
                        Cell rcell5 = row.createCell(5);
                        Cell rcell6 = row.createCell(6);

                        rcell0.setCellValue(listaData.get(vi).strTicket);
                        rcell1.setCellValue(listaData.get(vi).strFormatDate);
                        rcell2.setCellValue(listaData.get(vi).A1413NVLOB);
                        rcell3.setCellValue(listaData.get(vi).strFormatDate2);
                        rcell4.setCellValue(listaData.get(vi).strDescripcion);
                        rcell5.setCellValue(listaData.get(vi).A1413FROM);
                        rcell6.setCellValue(listaData.get(vi).A1413TO);

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                        rcell5.setCellStyle(bodyStyle);
                        rcell6.setCellStyle(bodyStyle);

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

                    break;
                case "1":
                    List<A1691Filter> listaData2 = this.getListCarrier(request, true);
                    System.out.println("Tamaño de lista devuelta : " + listaData2.size());
                    iter = listaData2.iterator();
                    // ====== CREANDO TITULOS ======================================

                    row = sheet.createRow(vj);
                    CH1_00 = row.createCell(0);
                    CH1_00.setCellValue("SSIM DATA");
                    CH1_01 = row.createCell(1);
                    CH1_02 = row.createCell(2);
                    CH1_03 = row.createCell(3);
                    CH1_04 = row.createCell(4);
                    CH1_05 = row.createCell(5);
                    CH1_06 = row.createCell(6);
                    CH1_07 = row.createCell(7);
                    CH1_07.setCellValue("Information PAX ODS");
                    CH1_08 = row.createCell(8);
                    CH1_09 = row.createCell(9);
                    CH1_10 = row.createCell(10);
                    CH1_11 = row.createCell(11);
                    CH1_11.setCellValue("ODS Data");
                    CH1_12 = row.createCell(12);
                    CH1_13 = row.createCell(13);
                    CH1_13.setCellValue("Leg");
                    CH1_14 = row.createCell(14);
                    CH1_14.setCellValue("VCR Data");
                    CH1_15 = row.createCell(15);
                    CH1_16 = row.createCell(16);
                    CH1_16.setCellValue("OCR");
                    CH1_17 = row.createCell(17);
                    CH1_17.setCellValue("Manual");
                    CH1_18 = row.createCell(18);
                    CH1_18.setCellValue("Total");
                    CH1_19 = row.createCell(19);
                    CH1_19.setCellValue("Coupons");
                    CH1_20 = row.createCell(20);
                    CH1_20.setCellValue("Physical Manifest");
                    CH1_21 = row.createCell(21);

                    //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
                    sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 15));
                    sheet.addMergedRegion(new CellRangeAddress(0, 2, 18, 18));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 21));

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);
                    CH1_06.setCellStyle(headerStyle);
                    CH1_07.setCellStyle(headerStyle);
                    CH1_08.setCellStyle(headerStyle);
                    CH1_09.setCellStyle(headerStyle);
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

                    ++vj;
                    row2 = sheet.createRow(vj);
                    CH2_00 = row2.createCell(0);
                    CH2_00.setCellValue("Flight");
                    CH2_01 = row2.createCell(1);
                    CH2_02 = row2.createCell(2);
                    CH2_02.setCellValue("Carrier");
                    CH2_03 = row2.createCell(3);
                    CH2_03.setCellValue("Flown Type");
                    CH2_04 = row2.createCell(4);
                    CH2_04.setCellValue("Orig");
                    CH2_05 = row2.createCell(5);
                    CH2_05.setCellValue("Dest");
                    CH2_06 = row2.createCell(6);
                    CH2_06.setCellValue("Received Date");
                    CH2_07 = row2.createCell(7);
                    CH2_07.setCellValue("Senior");
                    CH2_08 = row2.createCell(8);
                    CH2_08.setCellValue("Children");
                    CH2_09 = row2.createCell(9);
                    CH2_09.setCellValue("Infant");
                    CH2_10 = row2.createCell(10);
                    CH2_10.setCellValue("Transit");
                    CH2_11 = row2.createCell(11);
                    CH2_11.setCellValue("Received Date");
                    CH2_12 = row2.createCell(12);
                    CH2_12.setCellValue("Qty");
                    CH2_13 = row2.createCell(13);
                    CH2_14 = row2.createCell(14);
                    CH2_14.setCellValue("Received Data");
                    CH2_15 = row2.createCell(15);
                    CH2_15.setCellValue("Qty");
                    CH2_16 = row2.createCell(16);
                    CH2_16.setCellValue("Qty");
                    CH2_17 = row2.createCell(17);
                    CH2_17.setCellValue("Qty");
                    CH2_18 = row2.createCell(18);
                    CH2_19 = row2.createCell(19);
                    CH2_19.setCellValue("Valued");
                    CH2_20 = row2.createCell(20);
                    CH2_20.setCellValue("Received Date");
                    CH2_21 = row2.createCell(21);
                    CH2_21.setCellValue("Qty");

                    //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                    sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 1));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
                    sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));

                    CH2_00.setCellStyle(headerStyle);
                    CH2_01.setCellStyle(headerStyle);
                    CH2_02.setCellStyle(headerStyle);
                    CH2_03.setCellStyle(headerStyle);
                    CH2_04.setCellStyle(headerStyle);
                    CH2_05.setCellStyle(headerStyle);
                    CH2_06.setCellStyle(headerStyle);
                    CH2_07.setCellStyle(headerStyle);
                    CH2_08.setCellStyle(headerStyle);
                    CH2_09.setCellStyle(headerStyle);
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

                    //---------------------------------------------------------
                    ++vj;
                    row3 = sheet.createRow(vj);
                    CH3_00 = row3.createCell(0);
                    CH3_00.setCellValue("Date");
                    CH3_01 = row3.createCell(1);
                    CH3_01.setCellValue("Number");
                    CH3_02 = row3.createCell(2);
                    CH3_03 = row3.createCell(3);
                    CH3_04 = row3.createCell(4);
                    CH3_05 = row3.createCell(5);
                    CH3_06 = row3.createCell(6);
                    CH3_07 = row3.createCell(7);
                    CH3_08 = row3.createCell(8);
                    CH3_09 = row3.createCell(9);
                    CH3_10 = row3.createCell(10);
                    CH3_11 = row3.createCell(11);
                    CH3_12 = row3.createCell(12);
                    CH3_13 = row3.createCell(13);
                    CH3_14 = row3.createCell(14);
                    CH3_15 = row3.createCell(15);
                    CH3_16 = row3.createCell(16);
                    CH3_17 = row3.createCell(17);
                    CH3_18 = row3.createCell(18);
                    CH3_19 = row3.createCell(19);
                    CH3_20 = row3.createCell(20);
                    CH3_21 = row3.createCell(21);

                    CH3_00.setCellStyle(headerStyle);
                    CH3_01.setCellStyle(headerStyle);
                    CH3_02.setCellStyle(headerStyle);
                    CH3_03.setCellStyle(headerStyle);
                    CH3_04.setCellStyle(headerStyle);
                    CH3_05.setCellStyle(headerStyle);
                    CH3_06.setCellStyle(headerStyle);
                    CH3_07.setCellStyle(headerStyle);
                    CH3_08.setCellStyle(headerStyle);
                    CH3_09.setCellStyle(headerStyle);
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

                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        Cell rcell0 = row.createCell(0);
                        Cell rcell1 = row.createCell(1);
                        Cell rcell2 = row.createCell(2);
                        Cell rcell3 = row.createCell(3);
                        Cell rcell4 = row.createCell(4);
                        Cell rcell5 = row.createCell(5);
                        Cell rcell6 = row.createCell(6);
                        Cell rcell7 = row.createCell(7);
                        Cell rcell8 = row.createCell(8);
                        Cell rcell9 = row.createCell(9);
                        Cell rcell10 = row.createCell(10);
                        Cell rcell11 = row.createCell(11);
                        Cell rcell12 = row.createCell(12);
                        Cell rcell13 = row.createCell(13);
                        Cell rcell14 = row.createCell(14);
                        Cell rcell15 = row.createCell(15);
                        Cell rcell16 = row.createCell(16);
                        Cell rcell17 = row.createCell(17);
                        Cell rcell18 = row.createCell(18);
                        Cell rcell19 = row.createCell(19);
                        Cell rcell20 = row.createCell(20);
                        Cell rcell21 = row.createCell(21);

                        rcell0.setCellValue(listaData2.get(vi).strFormatDate);
                        rcell1.setCellValue(listaData2.get(vi).NFLIGHT);
                        rcell2.setCellValue(listaData2.get(vi).CARRI);
                        rcell3.setCellValue(listaData2.get(vi).strDescFFLOW);
                        rcell4.setCellValue(listaData2.get(vi).CDEPART);
                        rcell5.setCellValue(listaData2.get(vi).CARRIVA);
                        rcell6.setCellValue(listaData2.get(vi).strFormatFSENDSS);
                        rcell7.setCellValue(listaData2.get(vi).QCPAD);
                        rcell8.setCellValue(listaData2.get(vi).QCPCHD);
                        rcell9.setCellValue(listaData2.get(vi).QCPINF);
                        rcell10.setCellValue(listaData2.get(vi).QCPTRA);
                        rcell11.setCellValue(listaData2.get(vi).strFormatFSENDOD);
                        rcell12.setCellValue(listaData2.get(vi).QCPNOD);
                        rcell13.setCellValue(listaData2.get(vi).QCPNLEG);
                        rcell14.setCellValue(listaData2.get(vi).strFormatFSENDVC);
                        rcell15.setCellValue(listaData2.get(vi).QCPNVC);
                        rcell16.setCellValue(listaData2.get(vi).QCPNOCR);
                        rcell17.setCellValue(listaData2.get(vi).QCPNMA);
                        rcell18.setCellValue(listaData2.get(vi).QCPNTOT);
                        rcell19.setCellValue(listaData2.get(vi).QCPNVAL);
                        rcell20.setCellValue(listaData2.get(vi).strFormatDate3);
                        rcell21.setCellValue(listaData2.get(vi).QCPNFI);

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                        rcell5.setCellStyle(bodyStyle);
                        rcell6.setCellStyle(bodyStyle);
                        rcell7.setCellStyle(bodyStyle);
                        rcell8.setCellStyle(bodyStyle);
                        rcell9.setCellStyle(bodyStyle);
                        rcell10.setCellStyle(bodyStyle);
                        rcell11.setCellStyle(bodyStyle);
                        rcell12.setCellStyle(bodyStyle);
                        rcell13.setCellStyle(bodyStyle);
                        rcell14.setCellStyle(bodyStyle);
                        rcell15.setCellStyle(bodyStyle);
                        rcell16.setCellStyle(bodyStyle);
                        rcell17.setCellStyle(bodyStyle);
                        rcell18.setCellStyle(bodyStyle);
                        rcell19.setCellStyle(bodyStyle);
                        rcell20.setCellStyle(bodyStyle);
                        rcell21.setCellStyle(bodyStyle);

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

                    break;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Ownerless Coupon : Mantenimiento");
        A1413Filter filter = new A1413Filter();
        String strOption = "";
        String msj = "";
        try {

            logic = new OwnerlessCouponLogic();
            logic.setSession(this.serverSession.getServerSession());
            strOption = request.getParameter("strOption");

            filter.A1413DATE = request.getParameter("A1413DATE");
            filter.A1413SEC = request.getParameter("A1413SEC");
            filter.A1413DATA = request.getParameter("A1413DATA");
            filter.A1413STATU = request.getParameter("A1413STATU");
            filter.A1413CIA = request.getParameter("A1413CIA");
            filter.A1413FORSE = request.getParameter("A1413FORSE");
            filter.A1413CUPON = request.getParameter("A1413CUPON");
            filter.A1413FROM = request.getParameter("A1413FROM");
            filter.A1413TO = request.getParameter("A1413TO");
            filter.A1413STCRU = request.getParameter("A1413STCRU");
            filter.A1413FVLO = request.getParameter("A1413FVLO");
            filter.A1413TYPE = request.getParameter("A1413TYPE");
            filter.A1413SOURC = request.getParameter("A1413SOURC");
            filter.A1413PNROR = request.getParameter("A1413PNROR");
            filter.A1413PNR = request.getParameter("A1413PNR");
            filter.A1413FFCIA = request.getParameter("A1413FFCIA");
            filter.A1413FFCOD = request.getParameter("A1413FFCOD");
            filter.A1413FVTA = request.getParameter("A1413FVTA");
            filter.A1413NPAX = request.getParameter("A1413NPAX");
            filter.A1413FVLOB = request.getParameter("A1413FVLOB");
            filter.A1413NVLOB = request.getParameter("A1413NVLOB");
            filter.A1413CITYB = request.getParameter("A1413CITYB");
            filter.A1413FCONT = request.getParameter("A1413FCONT");
 

            msj = logic.loadPX235SQP00257ENTRY(filter, strOption);

        } catch (SQLException e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

//    public JavaToFlexResponse insertFavoriteMenu(A2149 filter) {//camviar A1939Filter
//        A2149 objRtn;
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, "BwrAccounting : insertFavoriteMenu");
//        try {
//            LoadFlownLogic logic = new LoadFlownLogic();
//            logic.setSession(serverSession);
//            String result = null;
//            objRtn = logic.insertFavoriteMenu(filter);
//
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//        return resp;
//    }
//
//    public JavaToFlexResponse deleteFavoriteMenu(A2149 filter) {//camviar A1939Filter
//        A2149 objRtn;
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, "BwrAccounting : deleteFavoriteMenu");
//        try {
//            LoadFlownLogic logic = new LoadFlownLogic();
//            logic.setSession(serverSession);
//            String result = null;
//            objRtn = logic.deleteFavoriteMenu(filter);
//
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//        return resp;
//    }
}
