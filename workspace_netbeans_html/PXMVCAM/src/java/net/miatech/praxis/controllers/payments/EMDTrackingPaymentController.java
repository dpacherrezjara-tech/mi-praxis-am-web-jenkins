
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
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.EMDTrackingPaymentLogic;
import net.miatech.praxis.payment.old.A2331Filter;
import net.miatech.praxis.payment.old.A3757Filter;
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
@RequestMapping("/EMDTrackingPayment")
public class EMDTrackingPaymentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private EMDTrackingPaymentLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/EMDTrackingPayment/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDTrackingPayment : Search-------------");
        map.put("success", true);
        List<A3757Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3757Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A3757Filter> lst = new ArrayList<>(0);
        A3757Filter filter = new A3757Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDTrackingPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3757Filter.class);
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

            lst = logic.loadPX529SQP03550(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDTrackingPayment : searchDetail-------------");
        map.put("success", true);
        List<A3757Filter> lst = this.searchDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3757Filter> searchDetail(HttpServletRequest request, Boolean bExcel) {

        List<A3757Filter> lst = new ArrayList<>(0);
        A3757Filter filter = new A3757Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDTrackingPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3757Filter.class);
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

            lst = logic.loadPX529SQP03551(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchTicket")
    public @ResponseBody
    String searchTicket(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDTrackingPayment : searchTicket-------------");
        map.put("success", true);
        List<A3757Filter> lst = this.searchTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3757Filter> searchTicket(HttpServletRequest request, Boolean bExcel) {

        List<A3757Filter> lst = new ArrayList<>(0);
        A3757Filter filter = new A3757Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDTrackingPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3757Filter.class);
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

            lst = logic.loadPX529SQP03552(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchLog")
    public @ResponseBody
    String searchLog(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDTrackingPayment : searchLog-------------");
        map.put("success", true);
        List<A3757Filter> lst = this.searchLog(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3757Filter> searchLog(HttpServletRequest request, Boolean bExcel) {

        List<A3757Filter> lst = new ArrayList<>(0);
        A3757Filter filter = new A3757Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDTrackingPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3757Filter.class);
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

            lst = logic.loadPX529SQP03571(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchTicketLog")
    public @ResponseBody
    String searchTicketLog(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMDTrackingPayment : searchTicketLog-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.searchTicketLog(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> searchTicketLog(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EMDTrackingPaymentLogic();
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

            lst = logic.loadPX529SQP03572(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    //Excels
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report Tracking EMD - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A3757Filter> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Sale");
            CH1_1.setCellValue("Currency");
            CH1_2.setCellValue("Sale");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("EMD");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("New");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("Flown");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("Aclaration");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Chargeback");
            CH1_13.setCellValue("");
            
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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 13));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("Tickets");
            CH2_3.setCellValue("Amount");
            CH2_4.setCellValue("Tickets");
            CH2_5.setCellValue("Amount");
            CH2_6.setCellValue("Tickets");
            CH2_7.setCellValue("Amount");
            CH2_8.setCellValue("Tickets");
            CH2_9.setCellValue("Amount");
            CH2_10.setCellValue("Tickets");
            CH2_11.setCellValue("Amount");
            CH2_12.setCellValue("Tickets");
            CH2_13.setCellValue("Amount");
            
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
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).CURRENCY);
                rcell2.setCellValue(listaData.get(vi).QTKTS1);
                rcell3.setCellValue(listaData.get(vi).AMOUNT1);
                rcell4.setCellValue(listaData.get(vi).QTKTEN);
                rcell5.setCellValue(listaData.get(vi).AMOUNTEN);
                rcell6.setCellValue(listaData.get(vi).QTKTNEW);
                rcell7.setCellValue(listaData.get(vi).AMOUNTNEW);
                rcell8.setCellValue(listaData.get(vi).QTKTFLOW);
                rcell9.setCellValue(listaData.get(vi).AMOUNTFLOW);
                rcell10.setCellValue(listaData.get(vi).QTKTACLA);
                rcell11.setCellValue(listaData.get(vi).AMOUNTCL);
                rcell12.setCellValue(listaData.get(vi).QTKTCHAR);
                rcell13.setCellValue(listaData.get(vi).AMOUNTCH);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue(listaData.get(0).totQTKTS1);
            CH1_3_T.setCellValue(listaData.get(0).totAMOUNT1);
            CH1_4_T.setCellValue(listaData.get(0).totQTKTEN);
            CH1_5_T.setCellValue(listaData.get(0).totAMOUNTEN);
            CH1_6_T.setCellValue(listaData.get(0).totQTKTNEW);
            CH1_7_T.setCellValue(listaData.get(0).totAMOUNTNEW);
            CH1_8_T.setCellValue(listaData.get(0).totQTKTFLOW);
            CH1_9_T.setCellValue(listaData.get(0).totAMOUNTFLOW);
            CH1_10_T.setCellValue(listaData.get(0).totQTKTACLA);
            CH1_11_T.setCellValue(listaData.get(0).totAMOUNTCL);
            CH1_12_T.setCellValue(listaData.get(0).totQTKTCHAR);
            CH1_13_T.setCellValue(listaData.get(0).totAMOUNTCH);
            
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
    
    @RequestMapping(value = "getXLSXDetail")
    public @ResponseBody
    void getXLSXDetail(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetail");
        String fileNameDownload = String.format("Report Tracking EMD Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A3757Filter> listaData = this.searchDetail(request, true);
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

            CH1_0.setCellValue("Sale");
            CH1_1.setCellValue("Currency");
            CH1_2.setCellValue("Sale");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("EMD");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("New");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("Flown");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("Aclaration");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Chargeback");
            CH1_13.setCellValue("");
            
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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 13));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("Tickets");
            CH2_3.setCellValue("Amount");
            CH2_4.setCellValue("Tickets");
            CH2_5.setCellValue("Amount");
            CH2_6.setCellValue("Tickets");
            CH2_7.setCellValue("Amount");
            CH2_8.setCellValue("Tickets");
            CH2_9.setCellValue("Amount");
            CH2_10.setCellValue("Tickets");
            CH2_11.setCellValue("Amount");
            CH2_12.setCellValue("Tickets");
            CH2_13.setCellValue("Amount");
            
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
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
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

                rcell0.setCellValue(listaData.get(vi).strFormatDate2);
                rcell1.setCellValue(listaData.get(vi).CURRENCY);
                rcell2.setCellValue(listaData.get(vi).QTKTS1);
                rcell3.setCellValue(listaData.get(vi).AMOUNT1);
                rcell4.setCellValue(listaData.get(vi).QTKTEN);
                rcell5.setCellValue(listaData.get(vi).AMOUNTEN);
                rcell6.setCellValue(listaData.get(vi).QTKTNEW);
                rcell7.setCellValue(listaData.get(vi).AMOUNTNEW);
                rcell8.setCellValue(listaData.get(vi).QTKTFLOW);
                rcell9.setCellValue(listaData.get(vi).AMOUNTFLOW);
                rcell10.setCellValue(listaData.get(vi).QTKTACLA);
                rcell11.setCellValue(listaData.get(vi).AMOUNTCL);
                rcell12.setCellValue(listaData.get(vi).QTKTCHAR);
                rcell13.setCellValue(listaData.get(vi).AMOUNTCH);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue(listaData.get(0).totQTKTS1);
            CH1_3_T.setCellValue(listaData.get(0).totAMOUNT1);
            CH1_4_T.setCellValue(listaData.get(0).totQTKTEN);
            CH1_5_T.setCellValue(listaData.get(0).totAMOUNTEN);
            CH1_6_T.setCellValue(listaData.get(0).totQTKTNEW);
            CH1_7_T.setCellValue(listaData.get(0).totAMOUNTNEW);
            CH1_8_T.setCellValue(listaData.get(0).totQTKTFLOW);
            CH1_9_T.setCellValue(listaData.get(0).totAMOUNTFLOW);
            CH1_10_T.setCellValue(listaData.get(0).totQTKTACLA);
            CH1_11_T.setCellValue(listaData.get(0).totAMOUNTCL);
            CH1_12_T.setCellValue(listaData.get(0).totQTKTCHAR);
            CH1_13_T.setCellValue(listaData.get(0).totAMOUNTCH);
            
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
    
    @RequestMapping(value = "getXLSXDetailTicket")
    public @ResponseBody
    void getXLSXDetailTicket(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetailTicket");
        String fileNameDownload = String.format("Report Tracking EMD Detail Ticket- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A3757Filter> listaData = this.searchTicket(request, true);
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

            CH1_0.setCellValue("Sale");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("Issued");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            
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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 19));
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

            CH2_0.setCellValue("Ticket");
            CH2_1.setCellValue("Agent");
            CH2_2.setCellValue("Currency");
            CH2_3.setCellValue("Amount");
            CH2_4.setCellValue("Status Cpn");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Doc.");
            CH2_9.setCellValue("Trace");
            CH2_10.setCellValue("Ticket");
            CH2_11.setCellValue("Date");
            CH2_12.setCellValue("Status Cpn");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("Message");
            CH2_17.setCellValue("Bank Information");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            
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
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 19));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("1");
            CH3_5.setCellValue("2");
            CH3_6.setCellValue("3");
            CH3_7.setCellValue("4");
            CH3_8.setCellValue("Type");
            CH3_9.setCellValue("EMD");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("1");
            CH3_13.setCellValue("2");
            CH3_14.setCellValue("3");
            CH3_15.setCellValue("4");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("Date");
            CH3_18.setCellValue("Status");
            CH3_19.setCellValue("Transaction Date");
            
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
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 19, 19));
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

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).AGENTE);
                rcell2.setCellValue(listaData.get(vi).CURRENCY);
                rcell3.setCellValue(listaData.get(vi).VFOP);
                rcell4.setCellValue(listaData.get(vi).STUSO1);
                rcell5.setCellValue(listaData.get(vi).STUSO2);
                rcell6.setCellValue(listaData.get(vi).STUSO3);
                rcell7.setCellValue(listaData.get(vi).STUSO3);
                rcell8.setCellValue(listaData.get(vi).strDesc1);
                rcell9.setCellValue(listaData.get(vi).TRACE);
                rcell10.setCellValue(listaData.get(vi).strDesc);
                rcell11.setCellValue(listaData.get(vi).strFormatDate6);
                rcell12.setCellValue(listaData.get(vi).STUSON);
                rcell13.setCellValue(listaData.get(vi).STUSON2);
                rcell14.setCellValue(listaData.get(vi).STUSON3);
                rcell15.setCellValue(listaData.get(vi).STUSON4);
                rcell16.setCellValue(listaData.get(vi).MSGERR);
                rcell17.setCellValue(listaData.get(vi).strFormatDate5);
                rcell18.setCellValue(listaData.get(vi).desSTVALB);
                rcell19.setCellValue(listaData.get(vi).strFormatDate4);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue(listaData.get(0).totVFOP);
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue("");
            CH1_15_T.setCellValue("");
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue("");
            CH1_19_T.setCellValue("");
            
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
    
    @RequestMapping(value = "getXLSXLog")
    public @ResponseBody
    void getXLSXLog(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXLog");
        String fileNameDownload = String.format("Report Tracking EMD Log - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A3757Filter> listaData = this.searchLog(request, true);
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

            CH1_0.setCellValue("Process");
            CH1_1.setCellValue("Total");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("Bank Notification");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 8));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Qty");
            CH2_2.setCellValue("Amount");
            CH2_3.setCellValue("Aclarations");
            CH2_4.setCellValue("ChargeBack");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("Reverse ChargeBack");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Other");
            
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("Qty");
            CH3_5.setCellValue("USD");
            CH3_6.setCellValue("Qty");
            CH3_7.setCellValue("USD");
            CH3_8.setCellValue(""); 
            
            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).QTY);
                rcell2.setCellValue(listaData.get(vi).SVFOPUSD);
                rcell3.setCellValue(listaData.get(vi).ACLARAC);
                rcell4.setCellValue(listaData.get(vi).CHGBACK);
                rcell5.setCellValue(listaData.get(vi).CHGBACK_AMT);
                rcell6.setCellValue(listaData.get(vi).REVERSE);
                rcell7.setCellValue(listaData.get(vi).REVERSE_AMT);
                rcell8.setCellValue(listaData.get(vi).OTHER);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).totQTY);
            CH1_2_T.setCellValue(listaData.get(0).totSVFOPUSD);
            CH1_3_T.setCellValue(listaData.get(0).totACLARAC);
            CH1_4_T.setCellValue(listaData.get(0).totCHGBACK);
            CH1_5_T.setCellValue(listaData.get(0).totCHGBACK_AMT);
            CH1_6_T.setCellValue(listaData.get(0).totREVERSE);
            CH1_7_T.setCellValue(listaData.get(0).totREVERSE_AMT);
            CH1_8_T.setCellValue(listaData.get(0).totOTHER);
            
            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);

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
    
    @RequestMapping(value = "getXLSXTicketLog")
    public @ResponseBody
    void getXLSXTicketLog(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXTicketLog");
        String fileNameDownload = String.format("Report Tracking EMD Ticket Log - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.searchTicketLog(request, true);
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

            CH1_0.setCellValue("Ticket");
            CH1_1.setCellValue("Sale");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Bank");
            CH1_4.setCellValue("Bank");
            CH1_5.setCellValue("Card");
            CH1_6.setCellValue("Card");
            CH1_7.setCellValue("Auth");
            CH1_8.setCellValue("Curr.");
            CH1_9.setCellValue("Amount");
            CH1_10.setCellValue("Status Cpn");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("Passenger");
            CH1_15.setCellValue("Msj Error");
            
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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Date");
            CH2_4.setCellValue("Code");
            CH2_5.setCellValue("Code");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("1");
            CH2_11.setCellValue("2");
            CH2_12.setCellValue("3");
            CH2_13.setCellValue("4");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            
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
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
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

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).strFormatDate1);
                rcell2.setCellValue(listaData.get(vi).STVAL);
                rcell3.setCellValue(listaData.get(vi).strFormatDate2);
                rcell4.setCellValue(listaData.get(vi).CODEBANK);
                rcell5.setCellValue(listaData.get(vi).SCARCOD);
                rcell6.setCellValue(listaData.get(vi).CARDNBR);
                rcell7.setCellValue(listaData.get(vi).AUTHNBR);
                rcell8.setCellValue(listaData.get(vi).MFOP);
                rcell9.setCellValue(listaData.get(vi).VFOP);
                rcell10.setCellValue(listaData.get(vi).strDescUsoCpn1);
                rcell11.setCellValue(listaData.get(vi).strDescUsoCpn2);
                rcell12.setCellValue(listaData.get(vi).strDescUsoCpn3);
                rcell13.setCellValue(listaData.get(vi).strDescUsoCpn4);
                rcell14.setCellValue(listaData.get(vi).PAX);
                rcell15.setCellValue(listaData.get(vi).MSGERR);
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
            
//            CH1_0_T.setCellValue(listaData.get(0).totSVFOPUSD);
            
            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue("");
            CH1_15_T.setCellValue("");
            
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

