/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.A2559Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.AccountedAmountsInvoicedLogic;
import net.miatech.praxis.logic.flown.AccountingMasterControlLogic;
import net.miatech.praxis.logic.flown.CatalogueFlightLogic;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.praxisbi.A4992Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingMasterControl")
public class AccountingMasterControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingMasterControlLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/AccountingMasterControl/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingMasterControl : Controller-------------");
        map.put("success", true);
        List<A4992Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A4992Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new AccountingMasterControlLogic();

        List<A4992Filter> lst = new ArrayList<>(0);
        A4992Filter filter = new A4992Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_MODULO = request.getParameter("IN_MODULO");
            filter.A1955STATU = request.getParameter("A1955STATU");
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO");
            filter.IN_FECHA_ACUSE = request.getParameter("IN_FECHA_ACUSE");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = -1;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.searchSQP05346(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Accounting Master Control : getXLSX");
        String fileNameDownload = String.format("Accounting Master Control - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4992Filter> listaData = this.getList(request, false);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Accounting Master Control");

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

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("ID Process");
            CH1_02.setCellValue("Module");
            CH1_03.setCellValue("Proc. Date");
            CH1_04.setCellValue("Cont. Date");
            CH1_05.setCellValue("Program");
            CH1_06.setCellValue("Description");
            CH1_07.setCellValue("Creator User");
            CH1_08.setCellValue("Creation Date");
            CH1_09.setCellValue("Creation Time");

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

            //          ========================================================
            ++vj;
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

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A4492ID);
                rcell2.setCellValue(listaData.get(vi).A4492MODUL);
                rcell3.setCellValue(listaData.get(vi).A4492FPROC);
                rcell4.setCellValue(listaData.get(vi).A4492FCONT);
                rcell5.setCellValue(listaData.get(vi).A4492PROG);
                rcell6.setCellValue(listaData.get(vi).A4492DESC);
                rcell7.setCellValue(listaData.get(vi).A4492UREGI);
                rcell8.setCellValue(listaData.get(vi).A4492FREGI);
                rcell9.setCellValue(listaData.get(vi).A4492HREGI);

                iter.next();
                ++vi;
                ++vj;
            }

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

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Accounting Master Control : Mantenimiento");
        String msj = "";
        String result = "";
        A1955Filter filter = new A1955Filter();
        A1955Filter reversa = new A1955Filter();
        String strOption = "";
        try {
            logic = new AccountingMasterControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            strOption = request.getParameter("strOption").toString().trim();

            filter.A1955MODUL = request.getParameter("A1955MODUL");
            filter.IN_ENVIO = request.getParameter("IN_ENVIO");
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO");            

            if (strOption.equals("I") && filter.IN_ENVIO.equals("true")) {
                String dato = logic.consistenciaFlown(filter);
            }
            
            if(strOption.equals("D")){                
                switch(filter.A1955MODUL){
                    case "PFLOWNPRE" :
                        logic.reversaFlown(filter);
                        break;
                }                
            }  
            
            result = logic.accountMaintance(filter, strOption);
                        
        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("result", result);        
        m.put("strOption", strOption);

        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "validation")
    public @ResponseBody
    String validation(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws Exception {
        A1955Filter listaData;
        A1955Filter filter = new A1955Filter();
        try {

            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO").trim();
            filter.A1955ACTIO = request.getParameter("strOption").trim();
            filter.A1955FPROC = request.getParameter("IN_FECHA_PROCESO").trim();
            filter.A1955MODUL = request.getParameter("A1955MODUL").trim();
            logic = new AccountingMasterControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.accountValidation(filter);
            
            map.put("success", true);            
            map.put("data", listaData);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
     
    @RequestMapping(value = "/searchReversa")
    public @ResponseBody
    String searchReversa(ModelMap map, HttpServletRequest request) {
        A1955Filter listaData;
        A1955Filter filter = new A1955Filter();
        try {
            filter.IN_MODULO = request.getParameter("IN_MODULO").trim();
            filter.A1955FPROC = request.getParameter("IN_FECHA_PROCESO").trim();
            
            logic = new AccountingMasterControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.searchReversa(filter);
            
            map.put("success", true);            
            map.put("data", listaData);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/MaintancePendingFlown")
    public @ResponseBody
    String MaintancePendingFlown(ModelMap map, HttpServletRequest request) {
        A1955Filter filter = new A1955Filter();
        String strOption;
        try {
            filter.A1955MODUL = request.getParameter("A1955MODUL");
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO");
            strOption = request.getParameter("strOption");            
            
            logic = new AccountingMasterControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            String result = logic.accountMaintancePendingFlown(filter,strOption);
            
            map.put("success", true);
            map.put("result", result);
            map.put("strOption", strOption);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    } 
}
