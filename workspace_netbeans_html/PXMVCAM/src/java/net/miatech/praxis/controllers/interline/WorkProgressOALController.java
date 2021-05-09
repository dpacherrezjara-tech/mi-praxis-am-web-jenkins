package net.miatech.praxis.controllers.interline;

// <editor-fold defaultstate="collapsed" desc="import">
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
import net.miatech.beans.A020Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.WorkProgressOALLogic;
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
@RequestMapping("/WorkProgressOAL")
public class WorkProgressOALController extends BaseController {
    
    private WorkProgressOALLogic logic;
    private A020Filter filter;
    private A1692Filter filter2;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new A020Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            hm = logic.loadPX234S01A1692(filter);
            
            map.put("success", true);
            map.put("listaData", hm.get("DETALLE"));
            map.put("lstTotal", hm.get("TOTALES"));
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search_2")
    public @ResponseBody
    String search_2(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new A020Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            hm = logic.loadPX234S01A1692_2(filter);
            
            map.put("success", true);
            map.put("listaData", hm.get("DETALLE"));
            map.put("lstTotal", hm.get("TOTALES"));
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchVCR")
    public @ResponseBody
    String searchVCR(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> lstData;
        filter2 = new A1692Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        try {
            filter2.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter2.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstData = logic.loadSQP01513(filter2);
            
            map.put("success", true);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            map.put("data", lstData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXVCR")
    public @ResponseBody
    void getXLSXVCR(HttpServletRequest request, HttpServletResponse response) {
        List<A1692Filter> listaData;
        filter2 = new A1692Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Work Progress OAL VCR - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter2.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter2.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            filter2.page.PAGROW = -1;
            filter2.page.PAGNUM = 1;
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01513(filter2);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Work Progress OAL VCR");
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

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("VCR Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Accounting Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Flight Date");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Quantity");
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Total");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("OWN");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("OAL");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("OCR");
            Cell CH2_06 = row2.createCell(6);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);

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

                cell50.setCellValue(listaData.get(vi).strFormatFECVAL);
                cell51.setCellValue(listaData.get(vi).strFCON);
                cell52.setCellValue(listaData.get(vi).strFormatDate);
                cell53.setCellValue(listaData.get(vi).CPN_Proc);
                cell54.setCellValue(listaData.get(vi).CPN_Bill);
                cell55.setCellValue(listaData.get(vi).CPN_Aud);
                cell56.setCellValue(listaData.get(vi).NETO);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
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
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        HashMap hm;
        filter = new A020Filter();
        
        String fileNameDownload = String.format("Work Progress OAL - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            hm = logic.loadPX234S01A1692(filter);
            List listaData = (List) hm.get("DETALLE");
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Work Progress OAL");
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

//            Integer vi = 0;
//            Integer vj = 0;
//            Iterator iter = listaData.iterator();
//
//            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("VCR Date");
//            Cell CH1_01 = row.createCell(1);
//            CH1_01.setCellValue("Accounting Date");
//            Cell CH1_02 = row.createCell(2);
//            CH1_02.setCellValue("Flight Date");
//            Cell CH1_03 = row.createCell(3);
//            CH1_03.setCellValue("Quantity");
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            CH1_06.setCellValue("Total");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//
//            ++vj;
//            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            CH2_03.setCellValue("OWN");
//            Cell CH2_04 = row2.createCell(4);
//            CH2_04.setCellValue("OAL");
//            Cell CH2_05 = row2.createCell(5);
//            CH2_05.setCellValue("OCR");
//            Cell CH2_06 = row2.createCell(6);
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//
////            CH2_00.setCellStyle(headerStyle);
////            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//
////            sheet.autoSizeColumn(0, true);
////            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//
//            ++vj;
//            // </editor-fold>
//            
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                
//                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//
//                cell50.setCellValue(listaData.get(vi).strFormatFECVAL);
//                cell51.setCellValue(listaData.get(vi).strFCON);
//                cell52.setCellValue(listaData.get(vi).strFormatDate);
//                cell53.setCellValue(listaData.get(vi).CPN_Proc);
//                cell54.setCellValue(listaData.get(vi).CPN_Bill);
//                cell55.setCellValue(listaData.get(vi).CPN_Aud);
//                cell56.setCellValue(listaData.get(vi).NETO);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                // </editor-fold>
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
}
