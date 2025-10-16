/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.controllers.payments;

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
import net.miatech.beans.A4836Filter;
import net.miatech.beans.SQP05739Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.WorkloadReassignmentLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/WorkloadReassignment")
public class WorkloadReassignmentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private WorkloadReassignmentLogic logic;

    @RequestMapping(value = "SearchGroupTaskAssignment")
    public @ResponseBody
    String SearchGroupTaskAssignment(ModelMap map, HttpServletRequest request) {
        List<SQP05739Filter> lst;
        SQP05739Filter filter = new SQP05739Filter();

        try {
            logic = new WorkloadReassignmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_PROCESADOR = request.getParameter("IN_PROCESADOR").trim();
            filter.page.PAGROW = 20;

            lst = logic.SearchGroupTaskAssignment(filter);
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
        SQP05739Filter filter = new SQP05739Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new WorkloadReassignmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("TaskAssignmentMDProcesadores");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04;

            List<SQP05739Filter> lst = logic.SearchGroupTaskAssignment(filter);
            Integer vi = 0, vj = 0;
            Iterator iter = lst.iterator();

            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);

            CH_00.setCellValue("Processing Date");
            CH_01.setCellValue("Auditor");
            CH_02.setCellValue("Procesador");
            CH_03.setCellValue("Pending");
            CH_04.setCellValue("Processed");

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

                CH_00.setCellValue(lst.get(vi).PRDA1);
                CH_01.setCellValue(lst.get(vi).AUASI);
                CH_02.setCellValue(lst.get(vi).PROCTYPESQ1);
                CH_03.setCellValue(lst.get(vi).PEDIEN);
                CH_04.setCellValue(lst.get(vi).PROCE);

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

            String fileNameDownload = String.format("TaskAssignmentMDProcesadores - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "SearchTaskAssignmentDetail")
    public @ResponseBody
    String SearchTaskAssignmentDetail(ModelMap map, HttpServletRequest request) {
        List<SQP05739Filter> lst;
        SQP05739Filter filter = new SQP05739Filter();

        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();

        try {
            logic = new WorkloadReassignmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.AUASI = request.getParameter("AUASI").trim();
            filter.PRDA1 = request.getParameter("PRDA1").trim();
            filter.PRDA2 = request.getParameter("PRDA2").trim();
            filter.PROCTYPE1 = request.getParameter("PROCTYPE1").trim();
            filter.PROCTYPESQ1 = request.getParameter("PROCTYPESQ1").trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchTaskAssignmentDetail(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertAuditor")
    public @ResponseBody
    String insertAuditor(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP05739Filter filter = new SQP05739Filter();
        ArrayList<SQP05739Filter> gridDataRFND = new ArrayList<SQP05739Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlstRFND")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP05739Filter data = new SQP05739Filter();
                data.PRDA1 = gsonObj.get("PRDA1").getAsString();
                data.PRTIME1 = gsonObj.get("PRTIME1").getAsString();
                data.RECTYPE1 = gsonObj.get("RECTYPE1").getAsString();
                data.PROCTYPE1 = gsonObj.get("PROCTYPE1").getAsString();
                data.PROCTYPESQ1 = gsonObj.get("PROCTYPESQ1").getAsString();
                data.SMERCHID1 = gsonObj.get("SMERCHID1").getAsString();
                data.AREFNBR1 = gsonObj.get("AREFNBR1").getAsString();
                data.SDATE1 = gsonObj.get("SDATE1").getAsString();
                data.STIME1 = gsonObj.get("STIME1").getAsString();
                data.SCARDN1 = gsonObj.get("SCARDN1").getAsString();
                data.SEQNBR1 = gsonObj.get("SEQNBR1").getAsString();
                gridDataRFND.add(data);

            }
            logic = new WorkloadReassignmentLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertAuditor(gridDataRFND, filter.IN_USER);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ListAuditorProcesa")
    public @ResponseBody
    String ListAuditorProcesa(ModelMap map, HttpServletRequest request) {
        List<A4836Filter> lst;
        A4836Filter filter = new A4836Filter();

        try {
            logic = new WorkloadReassignmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_AUASI = request.getParameter("AUASI").trim();
            filter.IN_PRDA = request.getParameter("PRDA1").trim();
            filter.IN_PROCTYPE = request.getParameter("PROCTYPE1").trim();
            filter.IN_PROCTYPESQ = request.getParameter("PROCTYPESQ1").trim();

            lst = logic.ListAuditorProcesa(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
}
