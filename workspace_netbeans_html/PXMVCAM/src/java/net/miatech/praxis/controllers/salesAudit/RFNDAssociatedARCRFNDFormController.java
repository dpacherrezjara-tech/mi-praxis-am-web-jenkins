/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A4360Filter;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.SaleAudit.A4362Filter;
import net.miatech.beans.SaleAudit.A4363Filter;
import net.miatech.beans.SaleAudit.A4364Filter;
import net.miatech.beans.SaleAudit.A4365Filter;
import net.miatech.beans.SaleAudit.A4367Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RFNDAssociatedARCRFNDFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RFNDAssociatedARCRFNDForm")
public class RFNDAssociatedARCRFNDFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDAssociatedARCRFNDFormLogic logic;

    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public @ResponseBody
    String getUser() throws Exception {
        HashMap m = new HashMap();
        m.put("user", serverSession.getServerSession().getUserView().getCustomerInfo());
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "SearchRfndCabece")
    public @ResponseBody
    String SearchPendiRefund(ModelMap map, HttpServletRequest request) {
        List<A4361Filter> lst;
        A4361Filter filter = new A4361Filter();

        try {
            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_TICKET = request.getParameter("IN_TICKET").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();
            filter.IN_FLAG = request.getParameter("IN_FLAG").trim();
            filter.IN_STATUS = request.getParameter("IN_STATUSBPO").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_FOLIO = request.getParameter("IN_FOLIO").trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchRfndCabece(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A4361Filter filter = new A4361Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4361Filter> listaData = logic.SearchRfndCabece(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Resumen RFND ARC");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);

            CH_00.setCellValue("Folio");
            CH_01.setCellValue("System date");
            CH_02.setCellValue("Auditor");
            CH_03.setCellValue("Ticket Qty Pend");
            CH_04.setCellValue("Ticket Qty Auto");
            CH_05.setCellValue("Ticket Qty Reje");
            CH_06.setCellValue("Total");
            CH_07.setCellValue("Ticket Amount");
            CH_08.setCellValue("Days");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);

                CH_00.setCellValue(listaData.get(vi).A4361FOLIO);
                CH_01.setCellValue(listaData.get(vi).A4361FREGI);
                CH_02.setCellValue(listaData.get(vi).A4361REGAS);
                CH_03.setCellValue(listaData.get(vi).CANTPE);
                CH_04.setCellValue(listaData.get(vi).CANTOK);
                CH_05.setCellValue(listaData.get(vi).CANTKO);
                CH_06.setCellValue(listaData.get(vi).TOTALCANT);
                CH_07.setCellValue(listaData.get(vi).SUMAOK);

                CH_08.setCellValue(listaData.get(vi).A4361DIAS);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);

                // </editor-fold>
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

            String fileNameDownload = String.format("Resumen RFND ARC - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        A4363Filter filter = new A4363Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4363Filter> lst_search = logic.searchDetail(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX2")
    public @ResponseBody
    void getXLSX2(HttpServletRequest request, HttpServletResponse response) {
        A4363Filter filter = new A4363Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4363Filter> listaData = logic.searchDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Detalle RFND ARC");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);
            CH_18 = row.createCell(18);
            CH_19 = row.createCell(19);

            CH_00.setCellValue("System Date");
            CH_01.setCellValue("Issue Date");
            CH_02.setCellValue("Ticket");
            CH_03.setCellValue("CPN");
            CH_04.setCellValue("Country");
            CH_05.setCellValue("IATA Requested");
            CH_06.setCellValue("IATA Issued");
            CH_07.setCellValue("Transcion");
            CH_08.setCellValue("Tdoc");
            CH_09.setCellValue("Currency");
            CH_10.setCellValue("Fare");
            CH_11.setCellValue("Tax");
            CH_12.setCellValue("Commi.");
            CH_13.setCellValue("Neto RFND");
            CH_14.setCellValue("Neto Praxis");
            CH_15.setCellValue("Neto XML");
            CH_16.setCellValue("Req. Reason");
            CH_17.setCellValue("Status Audit");
            CH_18.setCellValue("Status ");
            CH_19.setCellValue("E-Mail ");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
             sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);
            CH_18.setCellStyle(headerStyle);
            CH_19.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);
                CH_18 = row.createCell(18);
                CH_19 = row.createCell(19);

                CH_00.setCellValue(listaData.get(vi).A4363FREGI);
                CH_01.setCellValue(listaData.get(vi).A4363FEVTA);
                CH_02.setCellValue(listaData.get(vi).A4363TICKET);
                CH_03.setCellValue(listaData.get(vi).A4363XCPN);
                CH_04.setCellValue(listaData.get(vi).A4363SPVTA);
                CH_05.setCellValue(listaData.get(vi).A4361IATA);
                CH_06.setCellValue(listaData.get(vi).A4363SIATA);
                CH_07.setCellValue(listaData.get(vi).A4363STRCU);
                CH_08.setCellValue(listaData.get(vi).A4363STDOC);
                CH_09.setCellValue(listaData.get(vi).A4363MDAPG);
                CH_10.setCellValue(listaData.get(vi).A4363TARID);
                CH_11.setCellValue(listaData.get(vi).A4363TTAXD);
                CH_12.setCellValue(listaData.get(vi).A4363COMID);
                CH_13.setCellValue(listaData.get(vi).A4363TOTAD);
                CH_14.setCellValue(listaData.get(vi).A4363STOTL);
                CH_15.setCellValue(listaData.get(vi).A4363XTOTL);
                CH_16.setCellValue(listaData.get(vi).A4362ERROR);
                CH_17.setCellValue(listaData.get(vi).A4363STATO);
                String vl_A4076FLAG = "";
                switch (listaData.get(vi).A4363FLAG) {
                    case "E":
                        vl_A4076FLAG = "ERROR PROCESS";
                        break;
                    case "A":
                        vl_A4076FLAG = "IN PROCESS";
                        break;
                    case "R":
                        vl_A4076FLAG = "REJECTED";
                        break;
                    case "F":
                        vl_A4076FLAG = "AUTHORISED";
                        break;
                    case "Y":
                        vl_A4076FLAG = "PENDING";
                        break;
                }
                CH_18.setCellValue(vl_A4076FLAG);
                CH_19.setCellValue(listaData.get(vi).A4363EMAIL);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
                CH_18.setCellStyle(bodyStyle);
                CH_19.setCellStyle(bodyStyle);

                // </editor-fold>
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
            //sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);

            String fileNameDownload = String.format("Detalle RFND ARC - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "SearchRFNDetailTCKT")
    public @ResponseBody
    String SearchQueryRFNDetailTCKT(ModelMap map, HttpServletRequest request) {
        A4361Filter lst;
        A4361Filter filter = new A4361Filter();

        HashMap map01, map02, map03, map04, map05, map06, map07;
        ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();

        ArrayList<HashMap<String, String>> lsta_TAXES = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_Card = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_COUPNS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_USOS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_DOCUMENTS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_TAXAUDI = new ArrayList<>();

        try {
            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_CORRL = request.getParameter("IN_CORRL").trim();

            lst = logic.SearchRFNDetailTCKT(filter);
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXES">
            for (int vi = 0; vi < lst.lst_TAXES.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A4364CCUST", lst.lst_TAXES.get(vi).A4364CCUST);
                map01.put("A4364CIA", lst.lst_TAXES.get(vi).A4364CIA);
                map01.put("A4364FORMA", lst.lst_TAXES.get(vi).A4364FORMA);
                map01.put("A4364SERIE", lst.lst_TAXES.get(vi).A4364SERIE);
                map01.put("A4364SEQ", lst.lst_TAXES.get(vi).A4364SEQ);
                map01.put("A4364CORRL", lst.lst_TAXES.get(vi).A4364CORRL);
                map01.put("A4364CDTAX", lst.lst_TAXES.get(vi).A4364CDTAX);
                map01.put("A4364MONED", lst.lst_TAXES.get(vi).A4364MONED);
                map01.put("A4364PAIS", lst.lst_TAXES.get(vi).A4364PAIS);
                map01.put("A4364TPTAX", lst.lst_TAXES.get(vi).A4364TPTAX);
                map01.put("A4364CTRL", lst.lst_TAXES.get(vi).A4364CTRL);
                map01.put("A4364APFC", lst.lst_TAXES.get(vi).A4364APFC);
                map01.put("A4364STAT", lst.lst_TAXES.get(vi).A4364STAT);
                map01.put("A4364ERROR", lst.lst_TAXES.get(vi).A4364ERROR);
                map01.put("A4364PREME", lst.lst_TAXES.get(vi).A4364PREME);
                map01.put("A4364ANIO", lst.lst_TAXES.get(vi).A4364ANIO);
                map01.put("A4364TYPE", lst.lst_TAXES.get(vi).A4364TYPE);
                map01.put("A4364TXAGE", lst.lst_TAXES.get(vi).A4364TXAGE);
                map01.put("A4364TXMIA", lst.lst_TAXES.get(vi).A4364TXMIA);
                map01.put("A4364TXDIF", lst.lst_TAXES.get(vi).A4364TXDIF);
                lsta_TAXES.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXES AUDITOR">
            for (int vi = 0; vi < lst.lst_TAXAUDI.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A4364CCUST", lst.lst_TAXAUDI.get(vi).A4364CCUST);
                map04.put("A4364CIA", lst.lst_TAXAUDI.get(vi).A4364CIA);
                map04.put("A4364FORMA", lst.lst_TAXAUDI.get(vi).A4364FORMA);
                map04.put("A4364SERIE", lst.lst_TAXAUDI.get(vi).A4364SERIE);
                map04.put("A4364SEQ", lst.lst_TAXAUDI.get(vi).A4364SEQ);
                map04.put("A4364CORRL", lst.lst_TAXAUDI.get(vi).A4364CORRL);
                map04.put("A4364CDTAX", lst.lst_TAXAUDI.get(vi).A4364CDTAX);
                map04.put("A4364MONED", lst.lst_TAXAUDI.get(vi).A4364MONED);
                map04.put("A4364PAIS", lst.lst_TAXAUDI.get(vi).A4364PAIS);
                map04.put("A4364TPTAX", lst.lst_TAXAUDI.get(vi).A4364TPTAX);
                map04.put("A4364CTRL", lst.lst_TAXAUDI.get(vi).A4364CTRL);
                map04.put("A4364APFC", lst.lst_TAXAUDI.get(vi).A4364APFC);
                map04.put("A4364STAT", lst.lst_TAXAUDI.get(vi).A4364STAT);
                map04.put("A4364ERROR", lst.lst_TAXAUDI.get(vi).A4364ERROR);
                map04.put("A4364PREME", lst.lst_TAXAUDI.get(vi).A4364PREME);
                map04.put("A4364ANIO", lst.lst_TAXAUDI.get(vi).A4364ANIO);
                map04.put("A4364TYPE", lst.lst_TAXAUDI.get(vi).A4364TYPE);
                map04.put("A4364TXAGE", lst.lst_TAXAUDI.get(vi).A4364TXAGE);
                map04.put("A4364TXMIA", lst.lst_TAXAUDI.get(vi).A4364TXMIA);
                map04.put("A4364TXDIF", lst.lst_TAXAUDI.get(vi).A4364TXDIF);
                lsta_TAXAUDI.add(map04);
            }
            // </editor-fold>            
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_Card">
            for (int vi = 0; vi < lst.lst_Card.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A4365CCUST", lst.lst_Card.get(vi).A4365CCUST);
                map02.put("A4365CIA", lst.lst_Card.get(vi).A4365CIA);
                map02.put("A4365FORMA", lst.lst_Card.get(vi).A4365FORMA);
                map02.put("A4365SERIE", lst.lst_Card.get(vi).A4365SERIE);
                map02.put("A4365SEQ", lst.lst_Card.get(vi).A4365SEQ);
                map02.put("A4365CFOP", lst.lst_Card.get(vi).A4365CFOP);
                map02.put("A4365TYCAR", lst.lst_Card.get(vi).A4365TYCAR);
                map02.put("A4365CUR", lst.lst_Card.get(vi).A4365CUR);
                map02.put("A4365NTARJ", lst.lst_Card.get(vi).A4365NTARJ);
                map02.put("A4365FEXP", lst.lst_Card.get(vi).A4365FEXP);
                map02.put("A4365CAPL", lst.lst_Card.get(vi).A4365CAPL);
                map02.put("A4365PREME", lst.lst_Card.get(vi).A4365PREME);
                map02.put("A4365ANIO", lst.lst_Card.get(vi).A4365ANIO);
                map02.put("A4365CORRL", lst.lst_Card.get(vi).A4365CORRL);
                map02.put("A4365TYPE", lst.lst_Card.get(vi).A4365TYPE);
                map02.put("A4365MONTO", lst.lst_Card.get(vi).A4365MONTO);
                map02.put("A4365MONTE", lst.lst_Card.get(vi).A4365MONTE);
                map02.put("A4365TOTAL", lst.lst_Card.get(vi).A4365TOTAL);

                lsta_Card.add(map02);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_COUPNS">
            for (int vi = 0; vi < lst.LIS_COUPNS.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A4366CCUST", lst.LIS_COUPNS.get(vi).A4366CCUST);
                map03.put("A4366CIA", lst.LIS_COUPNS.get(vi).A4366CIA);
                map03.put("A4366FORMA", lst.LIS_COUPNS.get(vi).A4366FORMA);
                map03.put("A4366SERIE", lst.LIS_COUPNS.get(vi).A4366SERIE);
                map03.put("A4366SEQ", lst.LIS_COUPNS.get(vi).A4366SEQ);
                map03.put("A4366CPN", lst.LIS_COUPNS.get(vi).A4366CPN);
                map03.put("A4366MARKE", lst.LIS_COUPNS.get(vi).A4366MARKE);
                map03.put("A4366NFLGH", lst.LIS_COUPNS.get(vi).A4366NFLGH);
                map03.put("A4366CLAS", lst.LIS_COUPNS.get(vi).A4366CLAS);
                map03.put("A4366FBASI", lst.LIS_COUPNS.get(vi).A4366FBASI);
                map03.put("A4366ORIGE", lst.LIS_COUPNS.get(vi).A4366ORIGE);
                map03.put("A4366FORIG", lst.LIS_COUPNS.get(vi).A4366FORIG);
                map03.put("A4366HORIG", lst.LIS_COUPNS.get(vi).A4366HORIG);
                map03.put("A4366DESTI", lst.LIS_COUPNS.get(vi).A4366DESTI);
                map03.put("A4366FDEST", lst.LIS_COUPNS.get(vi).A4366FDEST);
                map03.put("A4366HDEST", lst.LIS_COUPNS.get(vi).A4366HDEST);
                map03.put("A4366BOOKI", lst.LIS_COUPNS.get(vi).A4366BOOKI);
                map03.put("A4366CURS1", lst.LIS_COUPNS.get(vi).A4366CURS1);
                map03.put("A4366CURS2", lst.LIS_COUPNS.get(vi).A4366CURS2);
                map03.put("A4366CURS3", lst.LIS_COUPNS.get(vi).A4366CURS3);
                map03.put("A4366CURS4", lst.LIS_COUPNS.get(vi).A4366CURS4);
                map03.put("A4366PROVI", lst.LIS_COUPNS.get(vi).A4366PROVI);
                map03.put("A4366BAGAL", lst.LIS_COUPNS.get(vi).A4366BAGAL);
                map03.put("A4366STOP", lst.LIS_COUPNS.get(vi).A4366STOP);
                map03.put("A4366USE1", lst.LIS_COUPNS.get(vi).A4366USE1);
                map03.put("A4366USE2", lst.LIS_COUPNS.get(vi).A4366USE2);
                map03.put("A4366USE3", lst.LIS_COUPNS.get(vi).A4366USE3);
                map03.put("A4366MONTO", lst.LIS_COUPNS.get(vi).A4366MONTO);
                map03.put("A4366FAREC", lst.LIS_COUPNS.get(vi).A4366FAREC);
                map03.put("A4366DESIG", lst.LIS_COUPNS.get(vi).A4366DESIG);
                map03.put("A4366PREME", lst.LIS_COUPNS.get(vi).A4366PREME);
                map03.put("A4366ANIO", lst.LIS_COUPNS.get(vi).A4366ANIO);
                map03.put("A4366CORRL", lst.LIS_COUPNS.get(vi).A4366CORRL);
                map03.put("A4366TYPE", lst.LIS_COUPNS.get(vi).A4366TYPE);
                map03.put("A4366FLAG", lst.LIS_COUPNS.get(vi).A4366FLAG);

                lsta_COUPNS.add(map03);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RAZON">
            for (int vi = 0; vi < lst.lst_RAZON.size(); ++vi) {
                map05 = new HashMap<>();

                map05.put("A4362CCUST", lst.lst_RAZON.get(vi).A4362CCUST);
                map05.put("A4362PREME", lst.lst_RAZON.get(vi).A4362PREME);
                map05.put("A4362CORRL", lst.lst_RAZON.get(vi).A4362CORRL);
                map05.put("A4362TYPE", lst.lst_RAZON.get(vi).A4362TYPE);
                map05.put("A4362BASE", lst.lst_RAZON.get(vi).A4362BASE);
                map05.put("A4362FAMIL", lst.lst_RAZON.get(vi).A4362FAMIL);
                map05.put("A4362CODE", lst.lst_RAZON.get(vi).A4362CODE);
                map05.put("A4362ANIO", lst.lst_RAZON.get(vi).A4362ANIO);
                map05.put("A4362ERROR", lst.lst_RAZON.get(vi).A4362ERROR);
                map05.put("A4362REGIS", lst.lst_RAZON.get(vi).A4362REGIS);
                map05.put("A4362FREGI", lst.lst_RAZON.get(vi).A4362FREGI);
                map05.put("A4362HREGI", lst.lst_RAZON.get(vi).A4362HREGI);
                map05.put("A3659CIA", lst.lst_RAZON.get(vi).A3659CIA);
                map05.put("A3659FORMA", lst.lst_RAZON.get(vi).A3659FORMA);
                map05.put("A3659SERIE", lst.lst_RAZON.get(vi).A3659SERIE);
                map05.put("A3659SEQ", lst.lst_RAZON.get(vi).A3659SEQ);

                lst_RAZON.add(map05);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lsta_USOS">
            for (int vi = 0; vi < lst.lst_USOS.size(); ++vi) {
                map06 = new HashMap<>();

                map06.put("A4367CCUST", lst.lst_USOS.get(vi).A4367CCUST);
                map06.put("A4367PREME", lst.lst_USOS.get(vi).A4367PREME);
                map06.put("A4367ANIO", lst.lst_USOS.get(vi).A4367ANIO);
                map06.put("A4367CIA", lst.lst_USOS.get(vi).A4367CIA);
                map06.put("A4367FORMA", lst.lst_USOS.get(vi).A4367FORMA);
                map06.put("A4367SERIE", lst.lst_USOS.get(vi).A4367SERIE);
                map06.put("A4367SEQ", lst.lst_USOS.get(vi).A4367SEQ);
                map06.put("A4367CORRL", lst.lst_USOS.get(vi).A4367CORRL);
                map06.put("A4367TICKT", lst.lst_USOS.get(vi).A4367TICKT);
                map06.put("A4367CPN", lst.lst_USOS.get(vi).A4367CPN);
                map06.put("A4367FCAMB", lst.lst_USOS.get(vi).A4367FCAMB);
                map06.put("A4367HCAMB", lst.lst_USOS.get(vi).A4367HCAMB);
                map06.put("A4367CODE", lst.lst_USOS.get(vi).A4367CODE);
                map06.put("A4367STINI", lst.lst_USOS.get(vi).A4367STINI);
                map06.put("A4367STFIN", lst.lst_USOS.get(vi).A4367STFIN);
                map06.put("A4367FLAG", lst.lst_USOS.get(vi).A4367FLAG);
                map06.put("A4367REGIS", lst.lst_USOS.get(vi).A4367REGIS);
                map06.put("A4367FREGI", lst.lst_USOS.get(vi).A4367FREGI);
                map06.put("A4367HREGI", lst.lst_USOS.get(vi).A4367HREGI);
                lsta_USOS.add(map06);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTS">
            for (int vi = 0; vi < lst.lst_DOCUMENTS.size(); ++vi) {
                map07 = new HashMap<>();

                map07.put("A4363CCUST", lst.lst_DOCUMENTS.get(vi).A4363CCUST);
                lsta_DOCUMENTS.add(map07);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_RAZON", lst_RAZON);
        map.put("lsta_TAXES", lsta_TAXES);
        map.put("lsta_USOS", lsta_USOS);
        map.put("lsta_Card", lsta_Card);
        map.put("lsta_COUPNS", lsta_COUPNS);
        map.put("lsta_DOCUMENTS", lsta_DOCUMENTS);
        map.put("lsta_TAXAUDI", lsta_TAXAUDI);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaDeleteManual")
    public @ResponseBody
    String ProcesaDeleteManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        A4363Filter filter = new A4363Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaDeleteManual(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchRFNDRazon")
    public @ResponseBody
    String SearchRFNDRazon(ModelMap map, HttpServletRequest request) {
        List<A4360Filter> lst;
        A4360Filter filter = new A4360Filter();

        try {
            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.SearchRFNDRazon(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaManualRFNDARCTCKT")
    public @ResponseBody
    String ProcesaManualRFNDARCTCKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        String result2 = "";
        String razones = "";
        String taxes = "";
        String fop = "";
        int contrazon = 0;
        int contfop = 0;
        int conttax = 0;
        boolean iboolean;
        A4363Filter filter = new A4363Filter();
        ArrayList<A4362Filter> gridDataRazones = new ArrayList<A4362Filter>();
        ArrayList<A4364Filter> gridDataTaxes = new ArrayList<A4364Filter>();
        ArrayList<A4365Filter> gridDataFop = new ArrayList<A4365Filter>();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            if (filter.IN_STATUS.equals("F")) {
                // Obtain Array
                JsonArray gsonTaxes = parser.parse(request.getParameter("beanlstTaxes")).getAsJsonArray();
                JsonArray gsonFop = parser.parse(request.getParameter("beanlstlstFop")).getAsJsonArray();
                //LISTA DE TAXES
                for (JsonElement obj : gsonTaxes) {
                    JsonObject gsonObj = obj.getAsJsonObject();
                    conttax = (conttax + 1);
                    if (conttax == 1) {
                        //taxes = gsonObj.get("A4364PREME").getAsString() + "$" + gsonObj.get("A4364ANIO").getAsString() + "$" + gsonObj.get("A4364CDTAX").getAsString() + "$" + gsonObj.get("A4364CORRL").getAsString() + "$" + gsonObj.get("A4364APFC").getAsString() + "$" + gsonObj.get("A4364MONED").getAsString() + "$" + gsonObj.get("A4364TXMIA").getAsDouble() + "$" + gsonObj.get("A4364TXAGE").getAsDouble();
                        taxes = gsonObj.get("A4364CDTAX").getAsString() + "$" + gsonObj.get("A4364CORRL").getAsString() + "$" + gsonObj.get("A4364APFC").getAsString() + "$" + gsonObj.get("A4364MONED").getAsString() + "$" + gsonObj.get("A4364TXMIA").getAsDouble() + "$" + gsonObj.get("A4364TXAGE").getAsDouble();
                    } else {
                        taxes = taxes + "|" + gsonObj.get("A4364CDTAX").getAsString() + "$" + gsonObj.get("A4364CORRL").getAsString() + "$" + gsonObj.get("A4364APFC").getAsString() + "$" + gsonObj.get("A4364MONED").getAsString() + "$" + gsonObj.get("A4364TXMIA").getAsDouble() + "$" + gsonObj.get("A4364TXAGE").getAsDouble();
                    }

                }

                //LISTA DE FOP 
                for (JsonElement obj : gsonFop) {
                    JsonObject gsonObj = obj.getAsJsonObject();
                    if (gsonObj.get("A4365TYPE").getAsString().equals("AE")) {
                        contfop = (contfop + 1);
                        if (contfop == 0) {
                            fop = gsonObj.get("A4365CORRL").getAsString() + "$" + gsonObj.get("A4365CFOP").getAsString() + "$" + gsonObj.get("A4365TYCAR").getAsString() + "$" + gsonObj.get("A4365NTARJ").getAsString() + "$" + gsonObj.get("A4365FEXP").getAsString() + "$" + gsonObj.get("A4365CAPL").getAsString() + "$" + gsonObj.get("A4365TYPE").getAsString() + "$" + gsonObj.get("A4365TOTAL").getAsDouble();
                        } else {
                            fop = fop + "|" + gsonObj.get("A4365CORRL").getAsString() + "$" + gsonObj.get("A4365CFOP").getAsString() + "$" + gsonObj.get("A4365TYCAR").getAsString() + "$" + gsonObj.get("A4365NTARJ").getAsString() + "$" + gsonObj.get("A4365FEXP").getAsString() + "$" + gsonObj.get("A4365CAPL").getAsString() + "$" + gsonObj.get("A4365TYPE").getAsString() + "$" + gsonObj.get("A4365TOTAL").getAsDouble();
                        }
                    }
                }
            }
            // Obtain Array
            JsonArray gsonRazo = parser.parse(request.getParameter("beanlstRazones")).getAsJsonArray();

            //LISTA DE TKT
            for (JsonElement obj : gsonRazo) {
                JsonObject gsonObj = obj.getAsJsonObject();
                contrazon = (contrazon + 1);
                if (contrazon == 1) {
                    razones = gsonObj.get("A4362CODE").getAsString() + "$" + gsonObj.get("A4362ERROR").getAsString() + "$" + gsonObj.get("A4362TYPE").getAsString() + "$" + gsonObj.get("A4362CORRL").getAsString() + "$" + gsonObj.get("A4362FAMIL").getAsString();
                } else {
                    razones = razones + "|" + gsonObj.get("A4362CODE").getAsString() + "$" + gsonObj.get("A4362ERROR").getAsString() + "$" + gsonObj.get("A4362TYPE").getAsString() + "$" + gsonObj.get("A4362CORRL").getAsString() + "$" + gsonObj.get("A4362FAMIL").getAsString();
                }

            }

            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualRFNDARCTCKT(filter, taxes, razones, fop);
            if (result.equals("Proceso Culminado")) {
                result2 = this.rfndnotifipagina(filter);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String rfndnotifipagina(A4363Filter beanGene) {
        String mensaje = "";
        String flag = "";
        String token = "";
        boolean success = true;
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFNDARC").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("option", "1");
            bodyData.put("preme", beanGene.IN_PREME);
            bodyData.put("anio", beanGene.IN_ANIO);
            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/arc_refund/manual-response")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());

        } catch (SQLException e) {
            mensaje = e.getMessage();
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return mensaje;
    }

    @RequestMapping(value = "ProcesaUpdateUsosCPN")
    public @ResponseBody
    String ProcesaUpdateUsosCPN(ModelMap map, HttpServletRequest request) {
        A4367Filter lst;
        A4367Filter filter = new A4367Filter();
        boolean success = true;
        HashMap map03;
        ArrayList<HashMap<String, String>> lsta_usos = new ArrayList<>();

        try {
            logic = new RFNDAssociatedARCRFNDFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_CORRL = request.getParameter("IN_CORRL").trim();

            success = this.rfndnotifiUpdateCPN(filter);
            if (success) {
                lst = logic.ProcesaUpdateUsosCPN(filter);
                // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_COUPNS">
                for (int vi = 0; vi < lst.lst_USOS.size(); ++vi) {
                    map03 = new HashMap<>();

                    map03.put("A4367CCUST", lst.lst_USOS.get(vi).A4367CCUST);
                    map03.put("A4367PREME", lst.lst_USOS.get(vi).A4367PREME);
                    map03.put("A4367ANIO", lst.lst_USOS.get(vi).A4367ANIO);
                    map03.put("A4367CIA", lst.lst_USOS.get(vi).A4367CIA);
                    map03.put("A4367FORMA", lst.lst_USOS.get(vi).A4367FORMA);
                    map03.put("A4367SERIE", lst.lst_USOS.get(vi).A4367SERIE);
                    map03.put("A4367SEQ", lst.lst_USOS.get(vi).A4367SEQ);
                    map03.put("A4367CORRL", lst.lst_USOS.get(vi).A4367CORRL);
                    map03.put("A4367TICKT", lst.lst_USOS.get(vi).A4367TICKT);
                    map03.put("A4367CPN", lst.lst_USOS.get(vi).A4367CPN);
                    map03.put("A4367FCAMB", lst.lst_USOS.get(vi).A4367FCAMB);
                    map03.put("A4367HCAMB", lst.lst_USOS.get(vi).A4367HCAMB);
                    map03.put("A4367CODE", lst.lst_USOS.get(vi).A4367CODE);
                    map03.put("A4367STINI", lst.lst_USOS.get(vi).A4367STINI);
                    map03.put("A4367STFIN", lst.lst_USOS.get(vi).A4367STFIN);
                    map03.put("A4367FLAG", lst.lst_USOS.get(vi).A4367FLAG);
                    map03.put("A4367REGIS", lst.lst_USOS.get(vi).A4367REGIS);
                    map03.put("A4367FREGI", lst.lst_USOS.get(vi).A4367FREGI);
                    map03.put("A4367HREGI", lst.lst_USOS.get(vi).A4367HREGI);

                    lsta_usos.add(map03);
                }
                // </editor-fold>
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lsta_USOS", lsta_usos);

        return new Gson().toJson(map);
    }

    public boolean rfndnotifiUpdateCPN(A4367Filter beanGene) {
        String mensaje = "";
        String token = "";
        boolean success = true;
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFNDARC").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("ticket", beanGene.IN_CIA + "" + beanGene.IN_FORMA + "" + beanGene.IN_SERIE);
            bodyData.put("correlativo", beanGene.IN_CORRL);
            bodyData.put("prememo", beanGene.IN_PREME);
            bodyData.put("anio", beanGene.IN_ANIO);
            bodyData.put("secuencia", beanGene.IN_SEQ);
            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/arc_refund/sabre-uses")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());

        } catch (SQLException e) {
            mensaje = e.getMessage();
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return success;
    }

}
