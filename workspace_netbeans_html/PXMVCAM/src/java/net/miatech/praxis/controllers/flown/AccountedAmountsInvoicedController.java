/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import org.apache.commons.io.IOUtils;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A2559Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.AccountedAmountsInvoicedLogic;
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
@RequestMapping("/AccountedAmountsInvoiced")
public class AccountedAmountsInvoicedController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountedAmountsInvoicedLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/AccountedAmountsInvoiced/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountedAmountsInvoiced : Controller-------------");
        map.put("success", true);
        List<A2559Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A2559Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new AccountedAmountsInvoicedLogic();

        List<A2559Filter> lst = new ArrayList<>(0);
        A2559Filter filter = new A2559Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FINI = request.getParameter("IN_FINI");
            filter.IN_FFIN = request.getParameter("IN_FFIN");
            filter.IN_A2559CCUST = request.getParameter("IN_A2559CCUST");
            filter.IN_A2559MODO = request.getParameter("IN_A2559MODO");
            filter.IN_PARAM = request.getParameter("IN_PARAM");
            filter.IN_FLAG = request.getParameter("IN_FLAG");
            filter.IN_FLOWN_FINI = request.getParameter("IN_FLOWN_FINI");
            filter.IN_FLOWN_FFIN = request.getParameter("IN_FLOWN_FFIN");
            filter.IN_FLIGHT_FINI = request.getParameter("IN_FLIGHT_FINI");
            filter.IN_FLIGHT_FFIN = request.getParameter("IN_FLIGHT_FFIN");
            filter.IN_BILLING_DATEFINI = request.getParameter("IN_BILLING_DATEFINI");
            filter.IN_BILLING_DATEFFIN = request.getParameter("IN_BILLING_DATEFFIN");
            filter.IN_PERIOD = request.getParameter("IN_PERIOD");

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

            lst = logic.searchAccount(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Accounted amounts vs invoiced amounts : getXLSX");
        String fileNameDownload = String.format("Accounted amounts vs invoiced amounts - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2559Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Accounted amounts vs invoiced amounts");

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
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);
            Cell CH1_15 = row.createCell(15);
            Cell CH1_16 = row.createCell(16);
            Cell CH1_17 = row.createCell(17);
            Cell CH1_18 = row.createCell(18);
            Cell CH1_19 = row.createCell(19);
            Cell CH1_20 = row.createCell(20);
            Cell CH1_21 = row.createCell(21);
            Cell CH1_22 = row.createCell(22);
            Cell CH1_23 = row.createCell(23);
            Cell CH1_24 = row.createCell(24);
            Cell CH1_25 = row.createCell(25);
            Cell CH1_26 = row.createCell(26);
            Cell CH1_27 = row.createCell(27);
            Cell CH1_28 = row.createCell(28);

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Cia");
            CH1_02.setCellValue("Form");
            CH1_03.setCellValue("Serial");
            CH1_04.setCellValue("Coupon");
            CH1_05.setCellValue("Valuation Date");
            CH1_06.setCellValue("Flight Date");
            CH1_07.setCellValue("Clearing Date");
            CH1_08.setCellValue("Period");
            CH1_09.setCellValue("Airline Code");
            CH1_10.setCellValue("Accounting Date");
            CH1_11.setCellValue("Invoice Number");
            CH1_12.setCellValue("Accounting Date IXC");
            CH1_13.setCellValue("Source Code");
            CH1_14.setCellValue("Accounted");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("Invoiced");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("Differences");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");

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
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
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
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 28));
            ++vj;
            //          ========================================================

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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("FARE");
            CH2_15.setCellValue("TAX");
            CH2_16.setCellValue("ISC");
            CH2_17.setCellValue("YQ");
            CH2_18.setCellValue("TC");
            CH2_19.setCellValue("FARE");
            CH2_20.setCellValue("TAX");
            CH2_21.setCellValue("ISC");
            CH2_22.setCellValue("YQ");
            CH2_23.setCellValue("TC");
            CH2_24.setCellValue("FARE");
            CH2_25.setCellValue("TAX");
            CH2_26.setCellValue("ISC");
            CH2_27.setCellValue("YQ");
            CH2_28.setCellValue("TC");

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

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 28));

            ++vj;
            //============================================

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
                Cell rcell22 = row.createCell(22);
                Cell rcell23 = row.createCell(23);
                Cell rcell24 = row.createCell(24);
                Cell rcell25 = row.createCell(25);
                Cell rcell26 = row.createCell(26);
                Cell rcell27 = row.createCell(27);
                Cell rcell28 = row.createCell(28);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A2559CIA);
                rcell2.setCellValue(listaData.get(vi).A2559FORMA);
                rcell3.setCellValue(listaData.get(vi).A2559SERIE);
                rcell4.setCellValue(listaData.get(vi).A2559CUPON);
                rcell5.setCellValue(listaData.get(vi).A2559FFILE);
                rcell6.setCellValue(listaData.get(vi).A2559FPRO);
                rcell7.setCellValue(listaData.get(vi).A2559FCLEA);
                rcell8.setCellValue(listaData.get(vi).A2559PERID);
                rcell9.setCellValue(listaData.get(vi).A2559FACT);
                rcell10.setCellValue(listaData.get(vi).A2559FCONT);
                rcell11.setCellValue(listaData.get(vi).A2559FACTU);

                rcell12.setCellValue(listaData.get(vi).A2559FCOIC);
                rcell13.setCellValue(listaData.get(vi).A2559TUSO);

                rcell14.setCellValue(listaData.get(vi).A2559PFARE);
                rcell15.setCellValue(listaData.get(vi).A2559PTAX);
                rcell16.setCellValue(listaData.get(vi).A2559PISC);
                rcell17.setCellValue(listaData.get(vi).A2559YQ);
                rcell18.setCellValue(listaData.get(vi).A2559TCAMB);

                rcell19.setCellValue(listaData.get(vi).A2559FFARE);
                rcell20.setCellValue(listaData.get(vi).A2559FTAX);
                rcell21.setCellValue(listaData.get(vi).A2559FISC);
                rcell22.setCellValue(listaData.get(vi).A2559FYQ);
                rcell23.setCellValue(listaData.get(vi).A2559TCAMF);

                rcell24.setCellValue(listaData.get(vi).A2559DFARE);
                rcell25.setCellValue(listaData.get(vi).A2559DTAX);
                rcell26.setCellValue(listaData.get(vi).A2559DISC);
                rcell27.setCellValue(listaData.get(vi).DFQ);
                rcell28.setCellValue(listaData.get(vi).DCAMB);

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

    @RequestMapping(value = "getTXT")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Accounted amounts vs invoiced amounts : getTXT");
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        try {
            List<A2559Filter> listaData = this.getList(request, true);

            int len = listaData.size();
            Integer vi = 0;
            String fileName = "Accounted amounts vs invoiced amounts - " + Functions.getFechaActual() + ".txt";
            File file = new File(rutaFile + "\\" + fileName + ".txt");

            if (file.exists()) {
                file.delete();
            }

            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "Nbr|Cia|Form|Serial|Coupon|Valuation Date|Flight Date|Clearing Date|Period|Airline Code|Accounting Date|Invoice Number|Accounting Date IXC|Source Code|Status 9|Acc. Fare|Acc. TAX|Acc. ISC|Acc. YQ|Acc. TC|Inv. Fare|Inv. TAX|Inv. ISC|Inv. YQ|Inv. TC|Diff. Fare|Diff. TAX|Diff. ISC|Diff. YQ|Diff. TC";
            writer.println("" + cadena);

            for (vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + listaData.get(vi).RN + "|";
                cadena += "" + listaData.get(vi).A2559CIA + "|";
                cadena += "" + listaData.get(vi).A2559FORMA + "|";
                cadena += "" + listaData.get(vi).A2559SERIE + "|";
                cadena += "" + listaData.get(vi).A2559CUPON + "|";
                cadena += "" + listaData.get(vi).A2559FFILE + "|";
                cadena += "" + listaData.get(vi).A2559FPRO + "|";
                cadena += "" + listaData.get(vi).A2559FCLEA + "|";
                cadena += "" + listaData.get(vi).A2559PERID + "|";
                cadena += "" + listaData.get(vi).A2559FACT + "|";
                cadena += "" + listaData.get(vi).A2559FCONT + "|";
                cadena += "" + listaData.get(vi).A2559FACTU + "|";
                cadena += "" + listaData.get(vi).A2559FCOIC + "|";
                cadena += "" + listaData.get(vi).A2559TUSO + "|";
                cadena += "" + listaData.get(vi).STATUS + "|";
                cadena += "" + listaData.get(vi).A2559PFARE + "|";
                cadena += "" + listaData.get(vi).A2559PTAX + "|";
                cadena += "" + listaData.get(vi).A2559PISC + "|";
                cadena += "" + listaData.get(vi).A2559YQ + "|";
                cadena += "" + listaData.get(vi).A2559TCAMB + "|";
                cadena += "" + listaData.get(vi).A2559FFARE + "|";
                cadena += "" + listaData.get(vi).A2559FTAX + "|";
                cadena += "" + listaData.get(vi).A2559FISC + "|";
                cadena += "" + listaData.get(vi).A2559FYQ + "|";
                cadena += "" + listaData.get(vi).A2559TCAMF + "|";
                cadena += "" + listaData.get(vi).A2559DFARE + "|";
                cadena += "" + listaData.get(vi).A2559DTAX + "|";
                cadena += "" + listaData.get(vi).A2559DISC + "|";
                cadena += "" + listaData.get(vi).DFQ + "|";
                cadena += "" + listaData.get(vi).DCAMB ;
                cadena = cadena.replaceAll("null", "");
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
}
