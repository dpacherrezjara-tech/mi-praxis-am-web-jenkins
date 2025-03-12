/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A2024Filter;
import net.miatech.beans.A720Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ADJUsesLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
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
@RequestMapping("/ADJUses")
public class ADJUsesController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ADJUsesLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ADJUses/form_index";
    }

    @RequestMapping(value = "SearchADJUses")
    public @ResponseBody
    String SearchADJUses(ModelMap map, HttpServletRequest request) {
        List<A2024Filter> lst;
        A2024Filter filter = new A2024Filter();

        try {
            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_FROM_FILER = request.getParameter("VP_FROM_FILER");
            filter.VP_TO_FILTER = request.getParameter("VP_TO_FILTER");
            filter.VP_BOLETO = request.getParameter("IN_BOLETO");
            filter.VP_GRUPO = request.getParameter("VP_GRUPO");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));
            filter.VP_IATA = request.getParameter("IN_IATA");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchADJUses(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJUses : Search-------------");
        map.put("success", true);
        List<A2024Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2024Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ADJUsesLogic();

        List<A2024Filter> lst = new ArrayList<>(0);
        A2024Filter filter = new A2024Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_FROM_FILER = request.getParameter("VP_FROM_FILER");
            filter.VP_TO_FILTER = request.getParameter("VP_TO_FILTER");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_GRUPO = request.getParameter("VP_GRUPO");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));

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

            lst = logic.lst_search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadTicketEdit")
    public @ResponseBody
    String loadTicketEdit(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A2024Filter> lst = this.getListLoadTicket(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2024Filter> getListLoadTicket(HttpServletRequest request, Boolean bExcel) {

        logic = new ADJUsesLogic();

        List<A2024Filter> lst = new ArrayList<>(0);
        A2024Filter filter = new A2024Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_GRUPO = request.getParameter("VP_GRUPO");
            filter.A2024CORRL = Integer.parseInt(request.getParameter("A2024CORRL"));

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

            lst = logic.exportExcel(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJUsesLogic();

        List<A720Filter> lst = new ArrayList<>(0);
        A720Filter filter = new A720Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.strOption = request.getParameter("strOption");
            filter.A720CIA = request.getParameter("A720CIA");
            filter.A720FORMA = request.getParameter("A720FORMA");
            filter.A720SERIE = request.getParameter("A720SERIE");
            filter.A720SEQ = request.getParameter("A720SEQ");
            filter.A720CARRIER = request.getParameter("A720CARRIER");

            lst = logic.loadTicket(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadSave_datos")
    public @ResponseBody
    String loadSave_datos(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJUsesLogic();

        A2024Filter lst = new A2024Filter();
        A2024Filter filter = new A2024Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.CIA = request.getParameter("CIA");
            filter.FORMA = request.getParameter("FORMA");
            filter.SERIE = request.getParameter("SERIE");
            filter.A2024GRUPO = request.getParameter("A2024GRUPO");
            filter.A2024TRNC = request.getParameter("A2024TRNC");
            filter.A2024FECIN = request.getParameter("A2024FECIN");
            filter.A2024TTARJ = request.getParameter("A2024TTARJ");
            filter.A2024NTARJ = request.getParameter("A2024NTARJ");
            filter.A2024RFIC = request.getParameter("A2024RFIC");
            filter.A2024RFIS = request.getParameter("A2024RFIS");
            filter.A2024VRICOC = request.getParameter("A2024VRICOC");
            filter.A2024FECVTA = request.getParameter("A2024FECVTA");
            filter.A2024AGENT = request.getParameter("A2024AGENT");
            filter.A2024SFUEN = request.getParameter("A2024SFUEN");
            filter.A1541MDAVE = request.getParameter("A1541MDAVE");
            filter.A1541VCPVE = Double.parseDouble(request.getParameter("A1541VCPVE"));
            filter.A1541LCMVE = Double.parseDouble(request.getParameter("A1541LCMVE"));
            filter.A1541LSCMV = Double.parseDouble(request.getParameter("A1541LSCMV"));
            filter.A1541LYQVE = Double.parseDouble(request.getParameter("A1541LYQVE"));
            filter.A1541LYQVE = Double.parseDouble(request.getParameter("A1541LYQVE"));
            filter.A1541TCRVE = Double.parseDouble(request.getParameter("A1541TCRVE"));
            filter.A1541VCPRV = Double.parseDouble(request.getParameter("A1541VCPRV"));
            filter.A1541MREVE = request.getParameter("A1541MREVE");
            filter.A1541RCMVE = Double.parseDouble(request.getParameter("A1541RCMVE"));
            filter.A1541RSCMV = Double.parseDouble(request.getParameter("A1541RSCMV"));
            filter.A1541RYQVE = Double.parseDouble(request.getParameter("A1541RYQVE"));
            filter.SEQ = request.getParameter("SEQ");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.A2024DESCRIP = request.getParameter("A2024DESCRIP");
            filter.A2024IATAUSU = request.getParameter("A2024IATAUSU");
            filter.A1531TFOP = request.getParameter("A1531TFOP");
            filter.CIANEW = request.getParameter("CIANEW");
            filter.FORMANEW = request.getParameter("FORMANEW");
            filter.SERIENEW = request.getParameter("SERIENEW");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));
            filter.A2024CUPON = request.getParameter("A2024CUPON");
            filter.ESTA_TNU = request.getParameter("ESTA_TNU");
            filter.FBASIS = request.getParameter("FBASIS");
            filter.REFE = request.getParameter("REFE");
            filter.TKTSEQ = request.getParameter("TKTSEQ");

            filter.ORI = request.getParameter("ORI");
            filter.DESTI = request.getParameter("DESTI");
            filter.CARR = request.getParameter("CARR");
            filter.NVLO = request.getParameter("NVLO");
            filter.AMOUNT = Double.parseDouble(request.getParameter("AMOUNT"));
            filter.AMOUNTRV = Double.parseDouble(request.getParameter("AMOUNTRV"));
            filter.TKTDATE = request.getParameter("TKTDATE");

            lst = logic.lst_save(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcessContabili")
    public @ResponseBody
    String ProcessContabili(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJUsesLogic();
        Gson gson = new Gson();

        A2024Filter objRtn;
        String listas = "";

        try {

            logic.setSession(this.serverSession.getServerSession());

            listas = request.getParameter("lista");
            A2024Filter[] lista = gson.fromJson(listas, A2024Filter[].class);
            for (A2024Filter lista1 : lista) {
                objRtn = logic.lst_Maintance(lista1);
                map.put("SQLCODE", objRtn.dbException.SQLCODE);
                map.put("MESSAGE", objRtn.dbException.MESSAGE);
            }

        } catch (Exception e) {
            System.out.println("-->E : " + e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertAprobList")
    public @ResponseBody
    String insertAprobList(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A2024Filter> gridData = new ArrayList<A2024Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A2024Filter data = new A2024Filter();
                data.VP_FILTER = 3;
                data.A2024CIA = gsonObj.get("A2024CIA").getAsString();
                data.A2024FORMA = gsonObj.get("A2024FORMA").getAsString();
                data.A2024SERIE = gsonObj.get("A2024SERIE").getAsString();
                data.A2024CORRL = Integer.parseInt(gsonObj.get("A2024CORRL").getAsString());
                data.A2024CUPON = gsonObj.get("A2024CUPON").getAsString();
                data.A2024SEQ = gsonObj.get("A2024SEQ").getAsString();
                gridData.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertAprobList(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "deleteAprobList")
    public @ResponseBody
    String deleteAprobList(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A2024Filter> gridData = new ArrayList<A2024Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A2024Filter data = new A2024Filter();
                data.VP_FILTER = 2;
                data.A2024CIA = gsonObj.get("A2024CIA").getAsString();
                data.A2024FORMA = gsonObj.get("A2024FORMA").getAsString();
                data.A2024SERIE = gsonObj.get("A2024SERIE").getAsString();
                data.A2024CORRL = Integer.parseInt(gsonObj.get("A2024CORRL").getAsString());
                data.A2024CUPON = gsonObj.get("A2024CUPON").getAsString();
                data.A2024SEQ = gsonObj.get("A2024SEQ").getAsString();
                gridData.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertAprobList(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "deleteContabili")
    public @ResponseBody
    String deleteContabili(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJUses : deleteContabili-------------");
        map.put("success", true);
        logic = new ADJUsesLogic();
        A2024Filter filter = new A2024Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_CORREL = Integer.parseInt(request.getParameter("VP_CORREL"));
            filter.A2024CUPON = request.getParameter("A2024CUPON");

            A2024Filter lst_delete = logic.lst_delete(filter);

            map.put("lst_delete", lst_delete);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A2024Filter filter = new A2024Filter();
        String Vl_TTRAX = "";
        String VL_4ESTADO = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2024Filter> listaData = logic.SearchADJUses(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("ADJUses");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14;
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

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Coupon");
            CH_02.setCellValue("ADJ Sec");
            CH_03.setCellValue("Transaction");
            CH_04.setCellValue("ADJ Dat");
            CH_05.setCellValue("Processed");
            CH_06.setCellValue("Adj IATA");
            CH_07.setCellValue("Group TRNC");
            CH_08.setCellValue("Sale Date");
            CH_09.setCellValue("Card Type");
            CH_10.setCellValue("Card Number");
            CH_11.setCellValue("RFIC");
            CH_12.setCellValue("RFIS");
            CH_13.setCellValue("VRICOC");
            CH_14.setCellValue("Description");

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

                CH_00.setCellValue(listaData.get(vi).A2024CODER);
                CH_01.setCellValue(listaData.get(vi).A2024CUPON);
                CH_02.setCellValue(listaData.get(vi).SEQ);
                switch (listaData.get(vi).VP_TTRAX) {
                    case 2:
                        Vl_TTRAX = "EXCH";
                        break;
                    case 13:
                        Vl_TTRAX = "EMD-Flown";
                        break;
                    case 11:
                        Vl_TTRAX = "IXC Rejections";
                        break;
                    case 10:
                        Vl_TTRAX = "IXC Prime";
                        break;
                    case 8:
                        Vl_TTRAX = "IXC";
                        break;
                    case 7:
                        Vl_TTRAX = "RFCP";
                        break;
                    case 4:
                        Vl_TTRAX = "ADM/ACM";
                        break;
                    case 3:
                        Vl_TTRAX = "RFND";
                        break;
                    case 6:
                        Vl_TTRAX = "EXCP";
                        break;
                    case 9:
                        Vl_TTRAX = "DISC";
                        break;
                    case 5:
                        Vl_TTRAX = "FLWN";
                        break;
                    case 1:
                        Vl_TTRAX = "SALE";
                        break;
                    default:
                        Vl_TTRAX = "Interlineal";
                        break;
                }
                CH_03.setCellValue(Vl_TTRAX);
                CH_04.setCellValue(listaData.get(vi).A2024FECIN);

                switch (listaData.get(vi).A2024ESTADO) {
                    case "AN":
                        VL_4ESTADO = "VOID";
                        break;
                    case "OK":
                        VL_4ESTADO = "OK";
                        break;
                    case "IN":
                        VL_4ESTADO = "INITIAL";
                        break;
                    default:
                        VL_4ESTADO = "PENDING";
                        break;
                }
                CH_05.setCellValue(VL_4ESTADO);
                CH_06.setCellValue(listaData.get(vi).A2024IATAUSU);
                CH_07.setCellValue(listaData.get(vi).GRUPO);
                CH_08.setCellValue(listaData.get(vi).A2024FECVTA);
                CH_09.setCellValue(listaData.get(vi).A2024TTARJ);
                CH_10.setCellValue(listaData.get(vi).A2024NTARJ);
                CH_11.setCellValue(listaData.get(vi).A2024RFIC);
                CH_12.setCellValue(listaData.get(vi).A2024RFIS);
                CH_13.setCellValue(listaData.get(vi).A2024VRICOC);
                CH_14.setCellValue(listaData.get(vi).A2024DESCRIP);

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
            // sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);

            String fileNameDownload = String.format("ADJUses - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

}
