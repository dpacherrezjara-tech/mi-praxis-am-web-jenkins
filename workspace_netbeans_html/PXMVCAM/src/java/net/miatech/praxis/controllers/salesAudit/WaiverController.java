/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A2252Filter;
import net.miatech.beans.SaleAudit.A2536Filter;
import net.miatech.beans.SaleAudit.A2537Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;
import net.miatech.beans.SaleAudit.SQP00967Filter;
import net.miatech.beans.SaleAudit.SQP00978Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.WaiverLogic;
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
@RequestMapping("/Waiver")
public class WaiverController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private WaiverLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Waiver/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Waiver : Search-------------");
        map.put("success", true);
        List<A2537Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2537Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2537Filter> lst = new ArrayList<>(0);
        A2537Filter filter = new A2537Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new WaiverLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2537Filter.class);
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

            lst = logic.Search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "download")
    public @ResponseBody
    String download(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Contingencies : download-------------");
        map.put("success", true);

        A2537Filter filter = new A2537Filter();
        Gson gson = new Gson();
        String beanString = "";

        beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2537Filter.class);

        byte[] bytes = null;
        try {
            String strArchivo = filter.A2537RUTAA.trim();
            File archivo = new File(strArchivo);
            Path filePath = archivo.toPath();

            if (!Files.exists(filePath)) {
                map.put("mensaje", "The file cannot be found on the server.");
            } else {
                FileInputStream fs = new FileInputStream(archivo);
                bytes = new byte[(int) archivo.length()];
                fs.read(bytes);
                fs.close();
                map.put("bytes", bytes);
                map.put("mensaje", "OK");
            }
        } catch (Exception e) {
            map.put("mensaje", "An error ocurred when trying to  upload the file.");
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchTicketWaiver")
    public @ResponseBody
    String searchTicketWaiver(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Waiver : searchTicketWaiver-------------");
        map.put("success", true);
        try {
            logic = new WaiverLogic();
            logic.setSession(this.serverSession.getServerSession());
            String ccust   = this.serverSession.getServerSession().getUserView().getCustomerInfo().CCUST;
            String tickets = request.getParameter("tickets");
            List<Map<String, String>> lst = logic.lstTicketWaiver(ccust, tickets != null ? tickets : "");
            map.put("data", lst);
            map.put("total", lst.size());
        } catch (Exception e) {
            map.put("success", false);
            logError.error("searchTicketWaiver -> " + e.getMessage(), e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "mantenimientoWaiver")
    public @ResponseBody
    String mantenimientoCharge(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Waiver : mantenimientoWaiver-------------");
        A2537Filter objRtn = new A2537Filter();
        A2537Filter filter = new A2537Filter();
        Gson gson = new Gson();
        String beanString = "";
        map.put("success", true);
        try {
            logic = new WaiverLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2537Filter.class);
            objRtn = logic.mantenimientoWaiver(filter);

            map.put("objRtn", objRtn);
            map.put("MESSAGE", objRtn.dbException.MESSAGE);
            map.put("SQLCODE", objRtn.dbException.SQLCODE);
        } catch (Exception e) {
            map.put("success", false);
            System.out.println("--> " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2537Filter> listaData = this.getList(request, true);
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
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);

            CH1_0.setCellValue("Case");
            CH1_1.setCellValue("Case Type");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Name");
            CH1_4.setCellValue("Close Date");
            CH1_5.setCellValue("Expiry Date");
            CH1_6.setCellValue("PNR");
            CH1_7.setCellValue("Ticket");
            CH1_8.setCellValue("Reservation");
            CH1_9.setCellValue("Itinerary");
            CH1_10.setCellValue("Agency");
            CH1_11.setCellValue("Concept");
            CH1_12.setCellValue("Sub Concept");
            CH1_13.setCellValue("Curr");
            CH1_14.setCellValue("Amount");
            CH1_15.setCellValue("Description");

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

                rcell0.setCellValue(listaData.get(vi).A2537NCASO);
                rcell1.setCellValue(listaData.get(vi).A2537TCASO);
                rcell2.setCellValue(listaData.get(vi).A2537ESTAD);
                rcell3.setCellValue(listaData.get(vi).A2537PCASO);
                rcell4.setCellValue(listaData.get(vi).A2537FCRRE);
                rcell5.setCellValue(listaData.get(vi).A2537FVETO);
                rcell6.setCellValue(listaData.get(vi).A2537PNR);
                rcell7.setCellValue(listaData.get(vi).A2537TKTS);
                rcell8.setCellValue(listaData.get(vi).A2537CODIT);
                rcell9.setCellValue(listaData.get(vi).A2537ITIN);
                rcell10.setCellValue(listaData.get(vi).A2537AGENE);
                rcell11.setCellValue(listaData.get(vi).A2537CCPTO);
                rcell12.setCellValue(listaData.get(vi).A2537SCPTO);
                rcell13.setCellValue(listaData.get(vi).A2537CURRW);
                rcell14.setCellValue(listaData.get(vi).A2537AMOUW);
                rcell15.setCellValue(listaData.get(vi).A2537DESCR);
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
