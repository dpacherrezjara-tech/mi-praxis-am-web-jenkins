/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A3676Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ChangeOfStatusFormLogic;
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
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import net.miatech.praxis.utils.PythonWS;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/ChangeOfStatusForm")
public class ChangeOfStatusFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ChangeOfStatusFormLogic logic;

    @Autowired
    private PythonWS pws;

    @RequestMapping(value = "Search")
    public @ResponseBody
    String Search(ModelMap map, HttpServletRequest request) {
        List<A3676Filter> lst;
        A3676Filter filter = new A3676Filter();

        try {
            logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();

            filter.IN_FORMA = request.getParameter("IN_FORMA").toString().trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").toString().trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").toString().trim();
            filter.IN_REFERENCE = request.getParameter("IN_REFERENCE").toString().trim();
            filter.IN_HORAINI = request.getParameter("IN_HORAINI").toString().trim();
            filter.IN_HORAFIN = request.getParameter("IN_HORAFIN").toString().trim();

            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_CURRENCY = request.getParameter("IN_CURRENCY").toString().trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
            filter.IN_STATUSINI = request.getParameter("IN_STATUSINI").toString().trim();
            filter.IN_STATUSFIN = request.getParameter("IN_STATUSFIN").toString().trim();
            filter.IN_ORIGEN = request.getParameter("IN_ORIGEN").toString().trim();
            filter.IN_LOTE = request.getParameter("IN_LOTE").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_TYPE = request.getParameter("IN_TYPE").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.Search(filter);
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
        A3676Filter filter = new A3676Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3676Filter> listaData = logic.Search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ChangeOfStatus");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            //CH_02 = row.createCell(2);
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

            CH_00.setCellValue("Origen");
            CH_01.setCellValue("System Date");
            //CH_02.setCellValue("Type");
            //CH_02.setCellValue("Hour");
            CH_02.setCellValue("Status");
            CH_03.setCellValue("Ticket Praxis ");
            CH_04.setCellValue("CPN Praxis");
            //CH_06.setCellValue("Currrency Praxis");
            //CH_07.setCellValue("Net Praxis");
            CH_05.setCellValue("Ticket Robot ");
            CH_06.setCellValue("CPN Robot");
           // CH_10.setCellValue("Currrency Robot");
            //CH_11.setCellValue("Net Robot");
            CH_07.setCellValue("Lote");
            CH_08.setCellValue("Reference");
            CH_09.setCellValue("Status initial");
            CH_10.setCellValue("Status final");
            //CH_17.setCellValue("Description");
            CH_11.setCellValue("Result");
            CH_12.setCellValue("Type");

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

                CH_00.setCellValue(listaData.get(vi).A3676ORIG);
                CH_01.setCellValue(listaData.get(vi).A3676FREGI);
                //CH_02.setCellValue(listaData.get(vi).A3676HRECE);
                CH_02.setCellValue(listaData.get(vi).A3676STROB);

                CH_03.setCellValue(listaData.get(vi).A3676TIKET);
                CH_04.setCellValue(listaData.get(vi).A3676CUPON);
                //CH_06.setCellValue(listaData.get(vi).A3676CUR);
                //CH_07.setCellValue(listaData.get(vi).A3676MONTO);
                CH_05.setCellValue(listaData.get(vi).A3676TKT);

                CH_06.setCellValue(listaData.get(vi).A3676CPNRB);
                //CH_07.setCellValue(listaData.get(vi).A3676CURRB);
                //CH_11.setCellValue(listaData.get(vi).A3676MONRB);
                CH_07.setCellValue(listaData.get(vi).A3676NARCH);
                CH_08.setCellValue(listaData.get(vi).A3676REFER);
                CH_09.setCellValue(listaData.get(vi).A3676STINI);
                CH_10.setCellValue(listaData.get(vi).A3676STFIN);
                //CH_17.setCellValue(listaData.get(vi).A3676DESCR);
                CH_11.setCellValue(listaData.get(vi).A3676RESUL);
                CH_12.setCellValue(listaData.get(vi).A3676TIDOC);

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

            String fileNameDownload = String.format("ChangeOfStatus - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSXFLOWN")
    public @ResponseBody
    void getXLSXFLOWN(HttpServletRequest request, HttpServletResponse response) {
        A3676Filter filter = new A3676Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3676Filter> listaData = logic.Search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            SXSSFWorkbook workbook = new SXSSFWorkbook(listaData.size());
            Sheet sheet = workbook.createSheet("ChangeOfStatus");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            //CH_02 = row.createCell(2);
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
            // CH_14 = row.createCell(14);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            //CH_16 = row.createCell(16);
            //CH_17 = row.createCell(17);

            CH_00.setCellValue("Origen");
            CH_01.setCellValue("System Date");
            //CH_02.setCellValue("Type");
            // CH_02.setCellValue("Currrency");
            // CH_03.setCellValue("Net");
            CH_02.setCellValue("Ticket Praxis ");
            CH_03.setCellValue("CPN Praxis");
            CH_04.setCellValue("USE Praxis");
            CH_05.setCellValue("Ticket Robot ");
            CH_06.setCellValue("CPN Robot");
            CH_07.setCellValue("USE Robot");
            CH_08.setCellValue("Status initial");
            CH_09.setCellValue("Status final");
            CH_10.setCellValue("Result");
            //CH_14.setCellValue("Result");
            CH_11.setCellValue("Status");
            CH_12.setCellValue("Lote");
            CH_13.setCellValue("Reference");
            CH_14.setCellValue("Hour");
            CH_15.setCellValue("Type");

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
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);

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

                CH_00.setCellValue(listaData.get(vi).A3676ORIG);
                CH_01.setCellValue(listaData.get(vi).A3676FREGI);
                //CH_02.setCellValue(listaData.get(vi).A3676TIDOC);
                //CH_02.setCellValue(listaData.get(vi).A3676CUR);
                //CH_03.setCellValue(listaData.get(vi).A3676MONTO);

                CH_02.setCellValue(listaData.get(vi).A3676TIKET);
                CH_03.setCellValue(listaData.get(vi).A3676CUPON);
                CH_04.setCellValue(listaData.get(vi).A3676USE);
                CH_05.setCellValue(listaData.get(vi).A3676TKT);
                CH_06.setCellValue(listaData.get(vi).A3676CPNRB);

                CH_07.setCellValue(listaData.get(vi).A3676USEB);
                CH_08.setCellValue(listaData.get(vi).A3676STINI);
                CH_09.setCellValue(listaData.get(vi).A3676STFIN);
                CH_10.setCellValue(listaData.get(vi).A3676RESUL);
                //CH_14.setCellValue(listaData.get(vi).A3676DESCR);
                CH_11.setCellValue(listaData.get(vi).A3676STROB);
                CH_12.setCellValue(listaData.get(vi).A3676NARCH);
                CH_13.setCellValue(listaData.get(vi).A3676REFER);
                CH_14.setCellValue(listaData.get(vi).A3676HRECE);
                CH_15.setCellValue(listaData.get(vi).A3676TIDOC);

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

            String fileNameDownload = String.format("ChangeOfStatus - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    /*
    @RequestMapping(value = "/getFileTxt")
    public @ResponseBody
    void getFileTxt(HttpServletRequest request, HttpServletResponse response) {
     */
    @RequestMapping(value = "getFileTxt")
    public ResponseEntity<byte[]> getFileTxt(HttpServletRequest request, final HttpServletResponse response) throws Exception {
        A3676Filter filter = new A3676Filter();
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        String v1_urlREST = "/change-of-status/report";

        try {
            Map<String, Object> queryParams = new HashMap<>();
            queryParams.put("IN_OPTION", filter.IN_OPTION.trim());
            queryParams.put("IN_CIA", filter.IN_CIA.trim());
            queryParams.put("IN_FORMA", filter.IN_FORMA.trim());
            queryParams.put("IN_SERIE", filter.IN_SERIE.trim());
            queryParams.put("IN_SEQ", filter.IN_SEQ.trim());
            queryParams.put("IN_REFERENCE", filter.IN_REFERENCE.trim());
            queryParams.put("IN_HORAINI", filter.IN_HORAINI.trim());
            queryParams.put("IN_HORAFIN", filter.IN_HORAFIN.trim());
            queryParams.put("IN_STATUS", filter.IN_STATUS.trim());
            queryParams.put("IN_CURRENCY", filter.IN_CURRENCY.trim());
            queryParams.put("IN_COUNTRY", filter.IN_COUNTRY.trim());
            queryParams.put("IN_STATUSINI", filter.IN_STATUSINI.trim());
            queryParams.put("IN_STATUSFIN", filter.IN_STATUSFIN.trim());
            queryParams.put("IN_ORIGEN", filter.IN_ORIGEN.trim());
            queryParams.put("IN_LOTE", filter.IN_LOTE.trim());
            queryParams.put("IN_DATEFROM", filter.IN_DATEFROM.trim());
            queryParams.put("IN_DATETO", filter.IN_DATETO.trim());
            queryParams.put("IN_CCUST", "139");

//                     System.out.println(bodyData);
            ResponseEntity<byte[]> res = pws.downloadFilesFromPython(v1_urlREST, queryParams);
//                System.out.println(bodyData);
//                System.out.println(res);

            String resString = new String(res.getBody(), StandardCharsets.UTF_8);

            System.out.println("Datos obtenidos:");
            System.out.println(resString);

            return res;

        } catch (Exception e) {
            System.out.println("Error Message => " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            //throw new SpringException(e);
        }
    }

    /*@RequestMapping(value = "/getFileTxt")
    public @ResponseBody
    void getFileTxt(HttpServletRequest request, HttpServletResponse response) {
        A3676Filter filter = new A3676Filter();
        List<A3676Filter> listaData = new ArrayList<>();
        StringBuilder line = new StringBuilder();
        String fileNameDownload = "ChangeOfStatus - " + Functions.getFechaActual() + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        String delim = "\t";
        String texto = "Origen" + delim
                + "System Date" + delim
                + "Processing date" + delim
                + "Currrency" + delim
                + "Net" + delim
                + "Ticket Praxis" + delim
                + "CPN Praxis" + delim
                + "USE Praxis" + delim
                + "Ticket Robot" + delim
                + "CPN Robot" + delim
                + "USE Robot" + delim
                + "Status initial" + delim
                + "Status final" + delim
                + "Status" + delim
                + "Result" + delim
                + "Description" + delim
                + "Lote" + delim
                + "Reference" + delim
                + "Hour" + delim
                + "\r\n";
        line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.Search(filter);

            String strTexto = "";
            String NCAMPO = "ChangeOfStatus.txt";
            for (int i = 0; i < listaData.size(); i++) {
                strTexto += listaData.get(i).A3676ORIG + delim
                        + listaData.get(i).A3676FREGI + delim
                        + listaData.get(i).A3676FRECE + delim
                        + listaData.get(i).A3676CUR + delim
                        + listaData.get(i).A3676MONTO + delim
                        + listaData.get(i).A3676TIKET + delim
                        + listaData.get(i).A3676CUPON + delim
                        + listaData.get(i).A3676USE + delim
                        + listaData.get(i).A3676TKT + delim
                        + listaData.get(i).A3676CPNRB + delim
                        + listaData.get(i).A3676USEB + delim
                        + listaData.get(i).A3676STINI + delim
                        + listaData.get(i).A3676STFIN + delim
                        + listaData.get(i).A3676RESUL + delim
                        + listaData.get(i).A3676DESCR + delim
                        + listaData.get(i).A3676STROB + delim
                        + listaData.get(i).A3676NARCH + delim
                        + listaData.get(i).A3676REFER + delim
                        + listaData.get(i).A3676HRECE + delim
                        + "\r\n";
            }
            response.setContentType("text/plain");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + NCAMPO + "\"");
            InputStream input = new ByteArrayInputStream(strTexto.getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }*/
    @RequestMapping(value = "SearchControl")
    public @ResponseBody
    String SearchControl(ModelMap map, HttpServletRequest request) {
        A3676Filter filter = new A3676Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3676Filter> lst_search = logic.SearchControl(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
            // map.put("totalPAG", lst_search.size() > 0 ? (lst_search.get(0).A3388TOTALPAG == null ? "" : lst_search.get(0).A3388TOTALPAG) : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSXCAB")
    public @ResponseBody
    void getXLSXCAB(HttpServletRequest request, HttpServletResponse response) {

        try {
            A3676Filter filter = new Gson().fromJson(request.getParameter("beanString"), A3676Filter.class);

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            if ("1".equals(filter.IN_TYPE)) {
                generarExcelControl(filter, logic, response);
            } else {
                generarExcelEjecu(filter, logic, response);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    private void generarExcelControl(A3676Filter filter, ChangeOfStatusFormLogic logic, HttpServletResponse response) throws Exception {

        List<A3676Filter> listaData = logic.SearchControl(filter);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ChangeOfStatusControl");

        CellStyle headerStyle = crearHeaderStyle(workbook);
        CellStyle bodyStyle = crearBodyStyle(workbook);

        int vj = 0;

        // HEADER
        Row row = sheet.createRow(vj);

        String[] headers = {
            "Origen", "System Date", "Lote",
            "Total Send TKT", "Total Send CPN",
            "Total Answer TKT", "Total Answer CPN",
            "Status"
        };

        for (int i = 0; i < headers.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, i, i));
        }

        vj++;

        // DATA
        for (A3676Filter item : listaData) {
            row = sheet.createRow(vj++);

            row.createCell(0).setCellValue(item.A3676ORIG);
            row.createCell(1).setCellValue(item.A3676FREGI);
            row.createCell(2).setCellValue(item.A3676NARCH);
            row.createCell(3).setCellValue(item.A3676TETKT);
            row.createCell(4).setCellValue(item.A3676TECPN);
            row.createCell(5).setCellValue(item.A3676TRTKT);
            row.createCell(6).setCellValue(item.A3676TRCPN);
            row.createCell(7).setCellValue(item.A3676STROB);

            for (int i = 0; i <= 7; i++) {
                row.getCell(i).setCellStyle(bodyStyle);
            }
        }

        descargarExcel(response, workbook, "ChangeOfStatusControl");
    }

    private void generarExcelEjecu(A3676Filter filter, ChangeOfStatusFormLogic logic, HttpServletResponse response) throws Exception {

        List<A3676Filter> listaData = logic.SearchControlEjecu(filter);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ChangeOfStatusEjecu");

        CellStyle headerStyle = crearHeaderStyle(workbook);
        CellStyle bodyStyle = crearBodyStyle(workbook);

        int vj = 0;

        // HEADER (puedes cambiarlo según necesidad)
        Row row = sheet.createRow(vj);

        String[] headers = {
            "System date", "Lote", "Origin",
            "Total Praxis", "Total Robot",
            "Status", "Hour"
        };

        for (int i = 0; i < headers.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        vj++;

        // DATA
        for (A3676Filter item : listaData) {
            row = sheet.createRow(vj++);

            row.createCell(0).setCellValue(item.A3676FREGI);
            row.createCell(1).setCellValue(item.A3676NARCH);
            row.createCell(2).setCellValue(item.A3676ORIG);
            row.createCell(3).setCellValue(item.A3676CNTAM);
            row.createCell(4).setCellValue(item.A3676CNTPR);
            row.createCell(5).setCellValue(item.A3676STROB);
            row.createCell(6).setCellValue(item.A3676HREGI);

            for (int i = 0; i <= 6; i++) {
                row.getCell(i).setCellStyle(bodyStyle);
            }
        }

        descargarExcel(response, workbook, "ChangeOfStatusEjecu");
    }

    private CellStyle crearHeaderStyle(Workbook workbook) {
        XSSFCellStyle style = (XSSFCellStyle) workbook.createCellStyle();

        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.BLACK.getIndex());

        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);

        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);

        style.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        style.setFont(font);

        return style;
    }

    private CellStyle crearBodyStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();

        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setBorderRight(CellStyle.BORDER_THIN);

        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());

        return style;
    }

    private void descargarExcel(HttpServletResponse response, Workbook workbook, String nombre) throws Exception {

        String fileName = nombre + "-" + Functions.getFechaActual() + ".xlsx";

        response.setContentType("application/vnd.openxml");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @RequestMapping(value = "/getXLSXCABDET")
    public @ResponseBody
    void getXLSXCABDET(HttpServletRequest request, HttpServletResponse response) {
        A3676Filter filter = new A3676Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3676Filter> listaData = logic.SearchControl(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ChangeOfStatus");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18;
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

            CH_00.setCellValue("Origen");
            CH_01.setCellValue("System Date");
            CH_02.setCellValue("Processing date");
            //CH_03.setCellValue("Hour");
            //CH_04.setCellValue("Status");
            CH_03.setCellValue("Ticket Praxis ");
            CH_04.setCellValue("CPN Praxis");
            //CH_07.setCellValue("Currrency Praxis");
            //CH_08.setCellValue("Net Praxis");
            CH_05.setCellValue("Ticket Robot ");
            CH_06.setCellValue("CPN Robot");
            //CH_11.setCellValue("Currrency Robot");
            //CH_12.setCellValue("Net Robot");
            CH_07.setCellValue("Lote");
            CH_08.setCellValue("Reference");
            CH_09.setCellValue("Status initial");
            CH_10.setCellValue("Status final");
            CH_11.setCellValue("Description");
            CH_12.setCellValue("Result");

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
                
                CH_00.setCellValue(listaData.get(vi).A3676ORIG);
                CH_01.setCellValue(listaData.get(vi).A3676FREGI);
                CH_02.setCellValue(listaData.get(vi).A3676FRECE);
                CH_03.setCellValue(listaData.get(vi).A3676TIKET);
                CH_04.setCellValue(listaData.get(vi).A3676CUPON);

                CH_05.setCellValue(listaData.get(vi).A3676TIKET);
                CH_06.setCellValue(listaData.get(vi).A3676CUPON);
                CH_07.setCellValue(listaData.get(vi).A3676TKT);
                CH_08.setCellValue(listaData.get(vi).A3676CPNRB);
                CH_09.setCellValue(listaData.get(vi).A3676STINI);

                CH_10.setCellValue(listaData.get(vi).A3676STFIN);
                CH_11.setCellValue(listaData.get(vi).A3676RESUL);
                CH_12.setCellValue(listaData.get(vi).A3676NARCH);
                                

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

            String fileNameDownload = String.format("ChangeOfStatus - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "SearchControlEjecu")
    public @ResponseBody
    String SearchControlEjecu(ModelMap map, HttpServletRequest request) {
        A3676Filter filter = new A3676Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ChangeOfStatusFormLogic logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3676Filter> lst_search = logic.SearchControlEjecu(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
            // map.put("totalPAG", lst_search.size() > 0 ? (lst_search.get(0).A3388TOTALPAG == null ? "" : lst_search.get(0).A3388TOTALPAG) : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchDetaCab")
    public @ResponseBody
    String SearchDetaCab(ModelMap map, HttpServletRequest request) {
        List<A3676Filter> lst;
        A3676Filter filter = new A3676Filter();

        try {
            logic = new ChangeOfStatusFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.Search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

}
