package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A4290;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AttosMasterFileLogic;
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
@Scope("session")
@RequestMapping("/AttosMasterFile")
public class AttosMasterFileController extends BaseController {

    private AttosMasterFileLogic logic;
    private A4290 filter;
    private MasterDAO dao;
//    HashMap<String, String> hmPaises;
    // <editor-fold defaultstate="collapsed" desc="Variable de Export de Excel">
    private final int MAXROW_EXL = 500;
    private final String NAME_EXL = "ATTOs To Cities Master File";
    private String fileNameDownload;
    private Workbook workbook = null;
    private File file;
    private Sheet sheet;
    private XSSFCellStyle headerStyle;
    private CellStyle bodyStyle;
    private int vi = 0, vj = 0;
    private Iterator iter;
    private Row row, row2;
    private Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
    // </editor-fold>

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) throws SQLException, Exception {
        map.put("success", false);
        filter = new A4290();
        try {
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = dao.loadPaisesHash();

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AttosMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A4290> listaData = logic.loadCityReport(filter, filter.intPageRws, hmPaises);

            map.put("success", true);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "cityReportMaintance")
    public @ResponseBody
    String cityReportMaintance(ModelMap map, HttpServletRequest request) {
        String strOption;
        try {
            filter = new A4290();
            filter.A4290CTATO = request.getParameter("A4290CTATO").trim();                    
            filter.A4290FINI = request.getParameter("A4290FINI").trim();
            filter.A4290FFIN = request.getParameter("A4290FFIN").trim();            
            filter.A4290NOMBR = request.getParameter("A4290NOMBR").trim();
            filter.A4290CATEG = request.getParameter("A4290CATEG").trim();
            filter.A4290CIUD = request.getParameter("A4290CIUD").trim();
            filter.A4290NOMCD = request.getParameter("A4290NOMCD").trim();
            filter.A4290STATE = request.getParameter("A4290STATE").trim();
            filter.A4290PAIS = request.getParameter("A4290PAIS").trim();
            filter.A4290TIMZ = request.getParameter("A4290TIMZ").trim();
            filter.A4290STAT = request.getParameter("A4290STAT").trim();
            
            filter.IN_A4290CTATO_OLD = request.getParameter("IN_A4290CTATO_OLD").trim();
            filter.IN_A4290FINI_OLD = request.getParameter("IN_A4290FINI_OLD").trim();

            String A4290LONG = request.getParameter("A4290LONG").trim();
            if (!A4290LONG.equals("")) {
                filter.A4290LONG = Double.parseDouble(A4290LONG);
            } else {
                filter.A4290LONG = 0;
            }

            String A4290LATI = request.getParameter("A4290LATI").trim();
            if (!A4290LATI.equals("")) {
                filter.A4290LATI = Double.parseDouble(A4290LATI);
            } else {
                filter.A4290LATI = 0;
            }

            strOption = request.getParameter("strOption");

            logic = new AttosMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.cityReportMaintance(filter, strOption);
            map.put("success", true);
            map.put("intResult", result);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        } catch (Exception ex) {
            map.put("success", false);
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A4290();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = dao.loadPaisesHash();

            logic = new AttosMasterFileLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4290> listaData = logic.loadCityReport6EXCEL(filter, hmPaises);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(NAME_EXL);
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);

            CH_00.setCellValue("Airport Code");
            CH_01.setCellValue("Airport Name");
            CH_02.setCellValue("City Code");
            CH_03.setCellValue("City Name");
            CH_04.setCellValue("Country Code");
            CH_05.setCellValue("Country Name");
            CH_06.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);

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

                CH_00.setCellValue(listaData.get(vi).A4290CTATO);
                CH_01.setCellValue(listaData.get(vi).A4290NOMBR);
                CH_02.setCellValue(listaData.get(vi).A4290CIUD);
                CH_03.setCellValue(listaData.get(vi).A4290NOMCD);
                CH_04.setCellValue(listaData.get(vi).A4290PAIS);
                CH_05.setCellValue(listaData.get(vi).strNomPais);
                CH_06.setCellValue(listaData.get(vi).A4290STAT);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
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
            String fileNameDownload = String.format(NAME_EXL + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    /*@RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        fileNameDownload = String.format(NAME_EXL + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        filter = new A4290();
        try {
            file = File.createTempFile(fileNameDownload, ".xlsx");
            
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = dao.loadPaisesHash();
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            
            logic = new AttosMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A4290> listaData = logic.loadCityReport6EXCEL(filter, hmPaises);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            sheet = workbook.createSheet(NAME_EXL);
            headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
            bodyStyle = workbook.createCellStyle();
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
            
            vi = 0;
            vj = 0;
            
            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Airport");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("City");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Country");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));

            CH1_00.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);

            ++vj;

            row2 = sheet.createRow(vj);
    //            Cell CH2_00 = row2.createCell(0);
    //            Cell CH2_01 = row2.createCell(1);
    //            Cell CH2_02 = row2.createCell(2);
    //            Cell CH2_03 = row2.createCell(3);
    //            Cell CH2_05 = row2.createCell(5);
    //            Cell CH2_06 = row2.createCell(6);
    //            Cell CH2_19 = row2.createCell(19);
    //            Cell CH2_21 = row2.createCell(21);

            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Code");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Name");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Code");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Name");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Code");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Name");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);

    //            sheet.autoSizeColumn(0, true);
    //            sheet.autoSizeColumn(1, true);
    //            sheet.autoSizeColumn(2, true);
    //            sheet.autoSizeColumn(3, true);
    //            sheet.autoSizeColumn(4, true);
    //            sheet.autoSizeColumn(5, true);
    //            sheet.autoSizeColumn(6, true);
    //            sheet.autoSizeColumn(7, true);

            ++vj;
            // </editor-fold>
            
            iter = listaData.iterator();
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                
                cell50.setCellValue(listaData.get(vi).A4290CTATO);
                cell51.setCellValue(listaData.get(vi).A4290NOMBR);
                cell52.setCellValue(listaData.get(vi).A4290CIUD);
                cell53.setCellValue(listaData.get(vi).A4290NOMCD);
                cell54.setCellValue(listaData.get(vi).A4290PAIS);
                cell55.setCellValue(listaData.get(vi).strNomPais);
                cell56.setCellValue(listaData.get(vi).A4290STAT);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(5, true);
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

        } catch (IOException e) {
            e.printStackTrace();
            throw new SpringException(e);
        } catch (NumberFormatException | SQLException ex) {
        } catch (Exception ex) {
        }
    }*/
}
