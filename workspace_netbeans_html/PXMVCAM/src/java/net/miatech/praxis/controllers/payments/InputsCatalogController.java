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
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.InputsCatalogLogic;
import net.miatech.praxis.payment.A2359;
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
@RequestMapping("/InputsCatalog")
public class InputsCatalogController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private InputsCatalogLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/InputsCatalog/form_index";
    }


    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : Search-------------");

        map.put("success", true);
        List<A2358Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2358Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2358Filter> lst = new ArrayList<>(0);
        A2358Filter filter = new A2358Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new InputsCatalogLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2358Filter.class);

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

            lst = logic.loadPX602SQP04601(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Report : getXLSX");
//        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A2358Filter> listaData = this.getList(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//            Cell CH1_7 = row1.createCell(7);
//            Cell CH1_8 = row1.createCell(8);
//            Cell CH1_9 = row1.createCell(9);
//            Cell CH1_10 = row1.createCell(10);
//            Cell CH1_11 = row1.createCell(11);
//            Cell CH1_12 = row1.createCell(12);
//            Cell CH1_13 = row1.createCell(13);
//            Cell CH1_14 = row1.createCell(14);
//
//            CH1_0.setCellValue("Seq");
//            CH1_1.setCellValue("Processing");
//            CH1_2.setCellValue("Files");
//            CH1_7.setCellValue("Control");
//            CH1_12.setCellValue("BSP");
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//            CH1_7.setCellStyle(headerStyle);
//            CH1_8.setCellStyle(headerStyle);
//            CH1_9.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 14));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//            Cell CH2_7 = row2.createCell(7);
//            Cell CH2_8 = row2.createCell(8);
//            Cell CH2_9 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Expected");
//            CH2_3.setCellValue("Received");
//            CH2_4.setCellValue("Loaded");
//            CH2_5.setCellValue("Not Found");
//            CH2_6.setCellValue("Error");
//            CH2_7.setCellValue("Expected");
//            CH2_8.setCellValue("Received");
//            CH2_9.setCellValue("Loaded");
//            CH2_10.setCellValue("Not Found");
//            CH2_11.setCellValue("Error");
//            CH2_12.setCellValue("Received");
//            CH2_13.setCellValue("Loaded");
//            CH2_14.setCellValue("Error");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//            CH2_6.setCellStyle(headerStyle);
//            CH2_7.setCellStyle(headerStyle);
//            CH2_8.setCellStyle(headerStyle);
//            CH2_9.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            ++vj;
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//                Cell rcell6 = row1.createCell(6);
//                Cell rcell7 = row1.createCell(7);
//                Cell rcell8 = row1.createCell(8);
//                Cell rcell9 = row1.createCell(9);
//                Cell rcell10 = row1.createCell(10);
//                Cell rcell11 = row1.createCell(11);
//                Cell rcell12 = row1.createCell(12);
//                Cell rcell13 = row1.createCell(13);
//                Cell rcell14 = row1.createCell(14);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).strFormatDate);
//                rcell2.setCellValue(listaData.get(vi).QEXPT);
//                rcell3.setCellValue(listaData.get(vi).QRECT);
//                rcell4.setCellValue(listaData.get(vi).QRECL);
//                rcell5.setCellValue(listaData.get(vi).QRECN);
//                rcell6.setCellValue(listaData.get(vi).QRECE);
//                rcell7.setCellValue(listaData.get(vi).QEXPB);
//                rcell8.setCellValue(listaData.get(vi).QCONT);
//                rcell9.setCellValue(listaData.get(vi).QCONL);
//                rcell10.setCellValue(listaData.get(vi).QCONN);
//                rcell11.setCellValue(listaData.get(vi).QCONE);
//                rcell12.setCellValue(listaData.get(vi).QBSPT);
//                rcell13.setCellValue(listaData.get(vi).QBSPL);
//                rcell14.setCellValue(listaData.get(vi).QBSPE);
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }

}
