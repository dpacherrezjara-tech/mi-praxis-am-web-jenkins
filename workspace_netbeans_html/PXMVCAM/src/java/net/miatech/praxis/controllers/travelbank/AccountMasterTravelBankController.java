package net.miatech.praxis.controllers.travelbank;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.sales.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A4405Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.travelbank.AccountMasterTravelBankLogic;
import net.miatech.utils.Functions;
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
import org.springframework.web.bind.annotation.ResponseBody;

// </editor-fold>

/**
 *
 * @author gsanchez
 */

@Controller
@Scope("request")
@RequestMapping("/AccountMasterTravelBank")
public class AccountMasterTravelBankController extends BaseController {
    
    private AccountMasterTravelBankLogic logic;
    private A4405Filter filter;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A4405Filter> listaData;
        filter = new A4405Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_A4405TITRA = request.getParameter("IN_A4405TITRA").trim();
            filter.IN_A4405TIPO = request.getParameter("IN_A4405TIPO").trim();
            filter.A4405SUBTI = request.getParameter("A4405SUBTI").trim();
            filter.A4405CATEG = request.getParameter("A4405CATEG").trim();
            filter.A4405CTA = request.getParameter("A4405CTA").trim();
            filter.A4405SCTA = request.getParameter("A4405SCTA").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new AccountMasterTravelBankLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.setPX126S02A4405(filter);
            logic = null;
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/Maintance")
    public @ResponseBody
    String Maintance(ModelMap map, HttpServletRequest request) {
        String strOption;
        filter = new A4405Filter();
        
        try {
            strOption = request.getParameter("strOption");
            filter.A4405TITRA = request.getParameter("A4405TITRA");
            filter.A4405TIPO = request.getParameter("A4405TIPO");
            filter.A4405INTNU = request.getParameter("A4405INTNU");
            filter.A4405SUBTI = request.getParameter("A4405SUBTI");
            filter.A4405CATEG = request.getParameter("A4405CATEG");
            filter.A4405CIA = request.getParameter("A4405CIA");
            filter.A4405UNIDA = request.getParameter("A4405UNIDA");
            filter.A4405CECOS = request.getParameter("A4405CECOS");
            filter.A4405UBICA = request.getParameter("A4405UBICA");
            filter.A4405CTA = request.getParameter("A4405CTA");
            filter.A4405SCTA = request.getParameter("A4405SCTA");
            filter.A4405EQUI = request.getParameter("A4405EQUI");
            filter.A4405ICIA = request.getParameter("A4405ICIA");
            filter.A4405CLIE = request.getParameter("A4405CLIE");
            filter.A4405FINI = request.getParameter("A4405FINI");
            filter.A4405FFIN = request.getParameter("A4405FFIN");
            filter.IN_A4405TITRA_OLD = request.getParameter("IN_A4405TITRA_OLD");
            filter.IN_A4405TIPO_OLD = request.getParameter("IN_A4405TIPO_OLD");
            filter.IN_A4405SUBTI_OLD = request.getParameter("IN_A4405SUBTI_OLD");
            filter.IN_A4405CATEG_OLD = request.getParameter("IN_A4405CATEG_OLD");
            
            logic = new AccountMasterTravelBankLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.accountMasterMaintance(filter, strOption);
            logic = null;
            map.put("success", true);
            map.put("intResult", result);
            map.put("strOption", strOption);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A4405Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.IN_A4405TITRA = request.getParameter("IN_A4405TITRA").trim();
            filter.IN_A4405TIPO = request.getParameter("IN_A4405TIPO").trim();
            filter.A4405SUBTI = request.getParameter("A4405SUBTI").trim();
            filter.A4405CATEG = request.getParameter("A4405CATEG").trim();
            filter.A4405CTA = request.getParameter("A4405CTA").trim();
            filter.A4405SCTA = request.getParameter("A4405SCTA").trim();

            logic = new AccountMasterTravelBankLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4405Filter> listaData = logic.loadPX126S02A4405EXCEL(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Account Master Travel Bank");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18;
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

            CH_00.setCellValue("Type");
            CH_01.setCellValue("AccountType");
            CH_02.setCellValue("Account Type");
            CH_03.setCellValue("Sub Type");
            CH_04.setCellValue("Category");
            CH_05.setCellValue("Company");
            CH_06.setCellValue("Unit");
            CH_07.setCellValue("C.Cost");
            CH_08.setCellValue("Location");
            CH_09.setCellValue("Account");
            CH_10.setCellValue("Sub account");
            CH_11.setCellValue("Equipment");
            CH_12.setCellValue("Inter company");
            CH_13.setCellValue("Country Location");
            CH_14.setCellValue("Client");
            CH_15.setCellValue("Effectiveness");

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

                CH_00.setCellValue(listaData.get(vi).A4405TITRA);
                CH_01.setCellValue(listaData.get(vi).A4405TIPO);
                CH_02.setCellValue(listaData.get(vi).A4405TIPODESC);
                CH_03.setCellValue(listaData.get(vi).A4405SUBTI);
                CH_04.setCellValue(listaData.get(vi).A4405CATEG);
                CH_05.setCellValue(listaData.get(vi).A4405CIA);
                CH_06.setCellValue(listaData.get(vi).A4405UNIDA);
                CH_07.setCellValue(listaData.get(vi).A4405CECOS);
                CH_08.setCellValue(listaData.get(vi).A4405UBICA);
                CH_09.setCellValue(listaData.get(vi).A4405CTA);
                CH_10.setCellValue(listaData.get(vi).A4405SCTA);
                CH_11.setCellValue(listaData.get(vi).A4405EQUI);
                CH_12.setCellValue(listaData.get(vi).A4405ICIA);
                CH_13.setCellValue(listaData.get(vi).A4405INTNU);
                CH_14.setCellValue(listaData.get(vi).A4405CLIE);
                CH_15.setCellValue(listaData.get(vi).A4405FINI);
                

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

            //String fileNameDownload = String.format("ADM Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            String fileNameDownload = String.format(
                "Account Master Travel Bank " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );
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
    
   /* @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A4405Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
//        filter.strExcel="TRUE";
        
        // String fileNameDownload = String.format("Account Master Sales - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "Account Master Sales " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_A4405TITRA = request.getParameter("IN_A4405TITRA").trim();
            filter.IN_A4405TIPO = request.getParameter("IN_A4405TIPO").trim();
            filter.A4405SUBTI = request.getParameter("A4405SUBTI").trim();
            filter.A4405CATEG = request.getParameter("A4405CATEG").trim();
            filter.A4405CTA = request.getParameter("A4405CTA").trim();
            filter.A4405SCTA = request.getParameter("A4405SCTA").trim();
                        
            logic = new AccountMasterTravelBankLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A4405Filter> listaData = logic.loadPX126S02A4405EXCEL(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Account Master Sales");
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

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de TÍtulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Type");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("AccountType");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Account Type");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Sub Type");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Category");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Company");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Unit");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("C.Cost");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Location");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Account");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Sub account");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Equipment");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Inter company");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Client");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Effectiveness");

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
//            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);
                Cell cell57 = row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);

                cell50.setCellValue(listaData.get(vi).A4405TITRA);
                cell51.setCellValue(listaData.get(vi).A4405TIPO);
                cell52.setCellValue(listaData.get(vi).A4405TIPODESC);
                cell53.setCellValue(listaData.get(vi).A4405SUBTI);
                cell54.setCellValue(listaData.get(vi).A4405CATEG);
                cell55.setCellValue(listaData.get(vi).A4405CIA);
                cell56.setCellValue(listaData.get(vi).A4405UNIDA);
                cell57.setCellValue(listaData.get(vi).A4405CECOS);
                cell58.setCellValue(listaData.get(vi).A4405UBICA);
                cell59.setCellValue(listaData.get(vi).A4405CTA);
                cell60.setCellValue(listaData.get(vi).A4405SCTA);
                cell61.setCellValue(listaData.get(vi).A4405EQUI);
                cell62.setCellValue(listaData.get(vi).A4405ICIA);
                cell63.setCellValue(listaData.get(vi).A4405CLIE);
                cell64.setCellValue(listaData.get(vi).A4405FINI);


                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);
                cell64.setCellStyle(bodyStyle);

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
                // </editor-fold>
                
                iter.next();
                ++vi;
                ++vj;
            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }*/
}
