/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP05015Filter;
import net.miatech.beans.SQP05068Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.LoadControlReportLogic;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/LoadControlReport")
public class LoadControlReportController extends BaseController {

    private LoadControlReportLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP05015Filter> listaData;
        SQP05015Filter filter;
        filter = new SQP05015Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_FPROC1 = request.getParameter("VP_FPROC1");
            filter.VP_FUEN = request.getParameter("VP_FUEN");
            filter.VP_PAIS = request.getParameter("VP_PAIS");

//            filter.VP_Fecha1 = request.getParameter("VP_Fecha1");
//            filter.VP_Fecha2 = request.getParameter("VP_Fecha2");
//            filter.VP_StatusFormateo = request.getParameter("VP_StatusFormateo"); 
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new LoadControlReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05015Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/LoadControlReportExcel")
    public @ResponseBody
    void MonthlyAtlBalance_excel(HttpServletRequest request, HttpServletResponse response) {

        logic = new LoadControlReportLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<SQP05068Filter> oList = new ArrayList<SQP05068Filter>(0);
        SQP05068Filter filter = new SQP05068Filter();
        String fileName = "tmp";

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            //filter.VP_PERIODO = request.getParameter("VP_PERIODO").toString().trim();          
            oList = logic.getSQP05068Filter(filter);
            Workbook workbook;
            File file = File.createTempFile(fileName, ".xlsx");
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("hoja1");
            Iterator iter = oList.iterator();
            Integer vi = 0, vj = 0;

            Map<String, CellStyle> styles = createStyles(workbook);
            String styleName;

            styleName = "header";
            Row rowh = sheet.createRow(vj);
            Cell cell0h = rowh.createCell(0);
            cell0h.setCellValue("Processing Date");
            cell0h.setCellStyle(styles.get(styleName));

            Cell cell1h = rowh.createCell(1);
            cell1h.setCellValue("HOT #");
            cell1h.setCellStyle(styles.get(styleName));

            //sheet.autoSizeColumn(1);
            Cell cellXh = rowh.createCell(2);
            cellXh.setCellValue("Country");
            cellXh.setCellStyle(styles.get(styleName));

            Cell cell2h = rowh.createCell(3);
            cell2h.setCellValue("Country Code");
            cell2h.setCellStyle(styles.get(styleName));

            Cell cell3h = rowh.createCell(4);
            cell3h.setCellValue("Curr.");
            cell3h.setCellStyle(styles.get(styleName));

            Cell cell4h = rowh.createCell(5);
            cell4h.setCellValue("Status");
            cell4h.setCellStyle(styles.get(styleName));

            Cell cell5h = rowh.createCell(6);
            cell5h.setCellValue("Issue date(days)");
            cell5h.setCellStyle(styles.get(styleName));

            Cell cell6h = rowh.createCell(7);
            cell6h.setCellValue("SALE");
            cell6h.setCellStyle(styles.get(styleName));

            Cell cell7h = rowh.createCell(8);
            cell7h.setCellValue("EXCH");
            cell7h.setCellStyle(styles.get(styleName));

            Cell cell9h = rowh.createCell(9);
            cell9h.setCellValue("RFND");
            cell9h.setCellStyle(styles.get(styleName));

            Cell cell10h = rowh.createCell(10);
            cell10h.setCellValue("MEMO");
            cell10h.setCellStyle(styles.get(styleName));

            Cell cell11h = rowh.createCell(11);
            cell11h.setCellValue("VOID");
            cell11h.setCellStyle(styles.get(styleName));

            Cell cell13h = rowh.createCell(12);
            cell13h.setCellValue("Status File");
            cell13h.setCellStyle(styles.get(styleName));

            ++vj;
            while (iter.hasNext()) {
                Row row = sheet.createRow(vj);

                styleName = "cell_normal";
                Cell cel25 = row.createCell(0);
                cel25.setCellValue(oList.get(vi).a4493.A4493PRDA);
                cel25.setCellStyle(styles.get(styleName));

                Cell cell0 = row.createCell(1);
                Number value0 = (Number) oList.get(vi).a4493.A4493HOTN;
                cell0.setCellValue(value0.doubleValue());
                cell0.setCellStyle(styles.get(styleName));

                Cell cell1 = row.createCell(2);
                cell1.setCellValue(oList.get(vi).a4493.A4493PAISD);
                cell1.setCellStyle(styles.get(styleName));

                Cell cell2 = row.createCell(3);
                cell2.setCellValue(oList.get(vi).a4493.A4493PAIS);
                cell2.setCellStyle(styles.get(styleName));

                Cell cell3 = row.createCell(4);
                cell3.setCellValue(oList.get(vi).a4493.A4493MDA);
                cell3.setCellStyle(styles.get(styleName));

                Cell cell4 = row.createCell(5);
                cell4.setCellValue(oList.get(vi).a4493.A4493STAT);
                cell4.setCellStyle(styles.get(styleName));

                Cell cell5 = row.createCell(6);
                cell5.setCellValue(oList.get(vi).a4493.A4493ISSUD);
                cell5.setCellStyle(styles.get(styleName));

                styleName = "cell_normal_formato_right";
                Cell cell6 = row.createCell(7);
                Number value = (Number) oList.get(vi).a4493.A4493SALE;
                cell6.setCellValue(value.doubleValue());
                cell6.setCellStyle(styles.get(styleName));

                Cell cell7 = row.createCell(8);
                Number value1 = (Number) oList.get(vi).a4493.A4493EXCH;
                cell7.setCellValue(value1.doubleValue());
                cell7.setCellStyle(styles.get(styleName));

                Cell cel20 = row.createCell(9);
                Number value2 = (Number) oList.get(vi).a4493.A4493RFND;
                cel20.setCellValue(value2.doubleValue());
                cel20.setCellStyle(styles.get(styleName));

                Cell cel21 = row.createCell(10);
                Number value3 = (Number) oList.get(vi).a4493.A4493MEMO;
                cel21.setCellValue(value3.doubleValue());
                cel21.setCellStyle(styles.get(styleName));

                Cell cel22 = row.createCell(11);
                Number value4 = (Number) oList.get(vi).a4493.A4493VOID;
                cel22.setCellValue(value4.doubleValue());
                cel22.setCellStyle(styles.get(styleName));

                styleName = "cell_normal";
                Cell cel23 = row.createCell(12);
                String value5 = oList.get(vi).a4493.A4493LABEL;
                String value6 = oList.get(vi).a4493.A4493FLAG;
                String value7 = oList.get(vi).a4493.A4493STAT.trim();
                String value8 = oList.get(vi).a4859.A4859COME == null ? "" : oList.get(vi).a4859.A4859COME.trim();
                System.out.println("value 8: " + value8);
                String etiqueta = "";

                if (value5.equals("R")) {
//                    etiqueta = "File not reported";
                    if (value8.isEmpty()) {
                            etiqueta = "File not reported";
                    } else {
                            etiqueta = "File not reported – justified";
                    }
                }

                if (value5.equals("A")) {
                    etiqueta = "Weekend file";
                }

                if (value7.equals("") && value6.equals("Y")) {
                    etiqueta = "Currency File not reported";
                }
                
                cel23.setCellValue(etiqueta);
                cel23.setCellStyle(styles.get(styleName));
                
                
                iter.next();
                ++vi;
                ++vj;
            }

            //finally set column widths, the width is measured in units of 1/256th of a character width
            sheet.setColumnWidth(0, 20 * 256); //30 characters wide
            for (int i = 1; i < 13; i++) {
                sheet.setColumnWidth(i, 18 * 256);  //18 characters wide
            }
            //sheet.setColumnWidth(10, 10*256); //10 characters wide

            /**
             * fileNameDownload = Nombre de descarga
             */
            fileName = "LoadControlReportExcel";
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    private static Map<String, CellStyle> createStyles(Workbook wb) {
        Map<String, CellStyle> styles = new HashMap<String, CellStyle>();
        DataFormat df = wb.createDataFormat();

        CellStyle style;
        Font headerFont = wb.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("header_date", style);

        Font font1 = wb.createFont();
        font1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font1);
        styles.put("cell_b", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFont(font1);
        styles.put("cell_b_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_b_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_g", style);

        Font font2 = wb.createFont();
        font2.setColor(IndexedColors.BLUE.getIndex());
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font2);
        styles.put("cell_bb", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_bg", style);

        Font font3 = wb.createFont();
        font3.setFontHeightInPoints((short) 14);
        font3.setColor(IndexedColors.DARK_BLUE.getIndex());
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font3);
        style.setWrapText(true);
        styles.put("cell_h", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setWrapText(false);
        styles.put("cell_normal", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        styles.put("cell_normal_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(false);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_(* #,##0_);_($* (#,##0);_(* \"-\"??_);_(@_)"));
        styles.put("cell_normal_formato_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        //style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_normal_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setIndention((short) 1);
        style.setWrapText(true);
        styles.put("cell_indented", style);

        style = createBorderedStyle(wb);
        style.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        styles.put("cell_blue", style);

        Font monthFont = wb.createFont();
        monthFont.setFontHeightInPoints((short) 12);
        monthFont.setColor(IndexedColors.WHITE.getIndex());
        monthFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont);
        styles.put("cell_totals_left", style);

        Font monthFont1 = wb.createFont();
        monthFont1.setFontHeightInPoints((short) 12);
        monthFont1.setColor(IndexedColors.WHITE.getIndex());
        monthFont1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont1);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_totals_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(wb.createDataFormat().getFormat("0.00%"));
        styles.put("cell_porcentaje_right", style);

        return styles;
    }

    private static CellStyle createBorderedStyle(Workbook wb) {
        CellStyle style = wb.createCellStyle();
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return style;
    }
}
