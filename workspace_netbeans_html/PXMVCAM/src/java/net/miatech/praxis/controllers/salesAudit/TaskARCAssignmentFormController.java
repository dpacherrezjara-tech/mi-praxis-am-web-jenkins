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
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.TaskARCAssignmentFormLogic;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lremicio
 */
@Controller
@Scope("request")
@RequestMapping("/TaskARCAssignmentForm")
public class TaskARCAssignmentFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private TaskARCAssignmentFormLogic logic;

    @RequestMapping(value = "SearchTaskAssignment")
    public @ResponseBody
    String SearchTaskAssignment(ModelMap map, HttpServletRequest request) {
        List<A4361Filter> lst;
        A4361Filter filter = new A4361Filter();
        try {
            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();
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

            lst = logic.SearchTaskAssignment(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }
    @RequestMapping(value = "SearchGroupTaskAssignment")
    public @ResponseBody
    String SearchGroupTaskAssignment(ModelMap map, HttpServletRequest request) {
        List<A4361Filter> lst;
        A4361Filter filter = new A4361Filter();

        try {
            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_FOLIO = request.getParameter("IN_FOLIO").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();

            lst = logic.SearchGroupTaskAssignment(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "SearchTaskAssignmentDetail")
    public @ResponseBody
    String SearchTaskAssignmentDetail(ModelMap map, HttpServletRequest request) {
        List<A4361Filter> lst;
        A4361Filter filter = new A4361Filter();

        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();

        try {
            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").trim();
            filter.IN_FOLIO = request.getParameter("IN_FOLIO").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();

            lst = logic.SearchTaskAssignment(filter);
            Boolean chk = false;
            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A4361FOLIO", lst.get(vi).A4361FOLIO);
                mapProperties.put("A4361REGAS", lst.get(vi).A4361REGAS);
                mapProperties.put("A4361FREAS", lst.get(vi).A4361FREAS);
                mapProperties.put("A4361IATA", lst.get(vi).A4361IATA);
                mapProperties.put("A4361REGRE", lst.get(vi).A4361REGRE);
                mapProperties.put("A4361FRERE", lst.get(vi).A4361FRERE);
                mapProperties.put("A4361HRERE", lst.get(vi).A4361HRERE);
                mapProperties.put("A4361TOAGE", lst.get(vi).A4361TOAGE);
                switch (lst.get(vi).A4361FLAG.trim()) {
                    case "R":
                        chk = false;
                        break;
                    case "F":
                        chk = false;
                        break;
                    case "X":
                        chk = false;
                        break;
                    default:
                        chk = true;
                        break;
                }
                mapProperties.put("CHK", chk);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A4361Filter filter = new A4361Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            int tiporpt = Integer.parseInt(request.getParameter("TIPORPT"));
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("TaskAssignmentRefund");
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

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15;

            if (tiporpt == 1) {
                List<A4361Filter> lst = logic.SearchGroupTaskAssignment(filter);
                Integer vi = 0, vj = 0;
                Iterator iter = lst.iterator();

                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);

                CH_00.setCellValue("Date");
                CH_01.setCellValue("Auditor");
                CH_02.setCellValue("Pending");
                CH_03.setCellValue("Processed");

                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));

                CH_00.setCellStyle(headerStyle);
                CH_01.setCellStyle(headerStyle);
                CH_02.setCellStyle(headerStyle);
                CH_03.setCellStyle(headerStyle);

                ++vj;

                while (iter.hasNext()) {
                    row = sheet.createRow(vj);

                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);

                    CH_00.setCellValue(lst.get(vi).A4361FREGI);
                    CH_01.setCellValue(lst.get(vi).A4361REGAS);
                    CH_02.setCellValue(lst.get(vi).A4361CANTPEDI);
                    CH_03.setCellValue(lst.get(vi).A4361CANTPROC);

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);

                    iter.next();
                    ++vi;
                    ++vj;
                }

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
            } else if (tiporpt == 2) {
                List<A4361Filter> lst = logic.SearchTaskAssignment(filter);
                Integer vi = 0, vj = 0;
                Iterator iter = lst.iterator();

                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);

                CH_00.setCellValue("Auditor");
                CH_01.setCellValue("Date of Assignment");
                CH_02.setCellValue("Country");
                CH_03.setCellValue("Pending");
                CH_04.setCellValue("Processed");

                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));

                CH_00.setCellStyle(headerStyle);
                CH_01.setCellStyle(headerStyle);
                CH_02.setCellStyle(headerStyle);
                CH_03.setCellStyle(headerStyle);
                CH_04.setCellStyle(headerStyle);

                ++vj;

                while (iter.hasNext()) {
                    row = sheet.createRow(vj);

                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);

                    CH_00.setCellValue(lst.get(vi).A4361REGAS);
                    CH_01.setCellValue(lst.get(vi).A4361FREAS);
                    CH_02.setCellValue(lst.get(vi).A4361PAIS);
                    CH_03.setCellValue(lst.get(vi).A4361CANTPEDI);
                    CH_04.setCellValue(lst.get(vi).A4361CANTPROC);

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);

                    iter.next();
                    ++vi;
                    ++vj;
                }

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
            } else if (tiporpt == 3) {
                List<A4361Filter> lst = logic.SearchTaskAssignmentDetail(filter);
                Integer vi = 0, vj = 0;
                Iterator iter = lst.iterator();

                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);

                CH_00.setCellValue("Auditor");
                CH_01.setCellValue("Document");
                CH_02.setCellValue("Country");
                CH_03.setCellValue("Status");
                CH_04.setCellValue("Date of Assignment");

                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));

                CH_00.setCellStyle(headerStyle);
                CH_01.setCellStyle(headerStyle);
                CH_02.setCellStyle(headerStyle);
                CH_03.setCellStyle(headerStyle);
                CH_04.setCellStyle(headerStyle);

                ++vj;

                while (iter.hasNext()) {
                    row = sheet.createRow(vj);

                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);

                    CH_00.setCellValue(lst.get(vi).A4361REGAS);
                    CH_01.setCellValue(lst.get(vi).A4361FOLIO);
                    CH_02.setCellValue(lst.get(vi).A4361PAIS);
                    CH_03.setCellValue(lst.get(vi).A4361FLAG);
                    CH_04.setCellValue(lst.get(vi).A4361FREAS);

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);

                    iter.next();
                    ++vi;
                    ++vj;
                }

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
            }

            String fileNameDownload = String.format("TaskAssignmentRefundARC - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "insertAuditor")
    public @ResponseBody
    String insertAuditor(ModelMap map, HttpServletRequest request) {
        String result = "";
        A4361Filter filter = new A4361Filter();
        ArrayList<A4361Filter> gridDataRFND = new ArrayList<A4361Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlstRFND")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A4361Filter data = new A4361Filter();
                data.A4361REGAS = gsonObj.get("A4361REGAS").getAsString();
                data.A4361FOLIO = gsonObj.get("A4361FOLIO").getAsString();
                data.A4361FREAS = gsonObj.get("A4361FREAS").getAsString();
                gridDataRFND.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertAuditor(gridDataRFND, filter.IN_USER);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "loadDataInit")
    public @ResponseBody
    String loadDataInit(ModelMap map, HttpServletRequest request) {
        List<A4361Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();

            mapProperties = new HashMap<>();
            mapProperties.put("A4361REGAS", "ALL");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>(); 
            mapProperties.put("A4361REGAS", "AUTOPR");
            lstData.add(mapProperties);            

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A4361REGAS", lst.get(vi).A4361REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataInit2")
    public @ResponseBody
    String loadDataInit2(ModelMap map, HttpServletRequest request) {
        List<A4361Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new TaskARCAssignmentFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();
            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A4361REGAS", lst.get(vi).A4361REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

}
