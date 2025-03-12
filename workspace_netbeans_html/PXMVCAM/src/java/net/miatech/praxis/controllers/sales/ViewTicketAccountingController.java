/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1819Filter;
import net.miatech.beans.A1830Filter;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.PX0241S01A720Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ZoneMasterFileLogic;
import net.miatech.praxis.logic.sales.AccountingMasterBINESLogic;
import net.miatech.praxis.logic.sales.AccountingMasterCCAMLogic;
import net.miatech.praxis.logic.sales.ViewTicketAccountingLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
import net.miatech.praxis.utils.ExportUtils;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ViewTicketAccounting")
public class ViewTicketAccountingController extends BaseController {
    
    @Autowired
    private ExportUtils exportUtils;

    private static final Logger logError = Logger.getLogger("errorLog");
    private ViewTicketAccountingLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ViewTicketAccounting/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewTicketAccounting : search-------------");
        String FLAG = "";
        FLAG = request.getParameter("FLAG");
        List<PX0241S01A720Filter> lst = this.getList(request, false);

        if (FLAG.equals("1")) {
            map.put("data", lst);
        } else {
            map.put("data", lst);
        }
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size());
        map.put("success", true);
        return new Gson().toJson(map);
    }

    public List<PX0241S01A720Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ViewTicketAccountingLogic();

        List<PX0241S01A720Filter> lst = new ArrayList<>(0);
        PX0241S01A720Filter filter = new PX0241S01A720Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.AIRLINE = request.getParameter("AIRLINE");
            filter.MODE = request.getParameter("MODE");
            filter.TRANSACTION = request.getParameter("TRANSACTION");
            filter.TKT = request.getParameter("TKT");
            filter.SEQ = request.getParameter("SEQ");
            filter.CUPON1 = request.getParameter("CUPON1");
            filter.CUPON2 = request.getParameter("CUPON2");
            filter.CUPON3 = request.getParameter("CUPON3");
            filter.CUPON4 = request.getParameter("CUPON4");
            filter.FROM = request.getParameter("FROM");
            filter.TO = request.getParameter("TO");
            filter.FUENTE = request.getParameter("FUENTE");
            filter.PAIS = request.getParameter("PAIS");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.STERROR = request.getParameter("STERROR");
            filter.FLAG = request.getParameter("FLAG");
            filter.SEQTRAN = Integer.parseInt(request.getParameter("SEQTRAN"));

//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }

            filter.page.PAGNUM = -1;
            filter.page.TOTPAG = 300;
            filter.page.TOTROW = 300;
            
            if (filter.TRANSACTION.equals("RFTX")){
                lst = logic.loadRFTX(filter);
            }else{
                lst = logic.load(filter);
            }

        } catch (Exception e) {
            System.out.println("--->"+e.getMessage());
            throw new SpringException(e);
        }

        return lst;
    }
//
//    @RequestMapping(value = "searchDetail")
//    public @ResponseBody
//    String searchDetail(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- ViewTicketAccounting : searchDetail-------------");
//        map.put("success", true);
//        List<A1881Filter> lst = this.getListDetail(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//
//    }
//
//    public List<A1881Filter> getListDetail(HttpServletRequest request, Boolean bExcel) {
//
//        logic = new ViewTicketAccountingLogic();
//
//        List<A1881Filter> lst = new ArrayList<>(0);
//        A1881Filter filter = new A1881Filter();
//
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//
//        try {
//
//            logic.setSession(this.serverSession.getServerSession());
//
//            filter.IN_A1881CCUST = request.getParameter("IN_A1881CCUST");
//            filter.IN_A1881NFACT = request.getParameter("IN_A1881NFACT");
//            filter.IN_A1881FECHA = request.getParameter("IN_A1881FECHA");
//
//            System.out.println("----------------- Parametros --------------------- ");
//            System.out.println(" limit : " + request.getParameter("limit"));
//            System.out.println(" start : " + request.getParameter("start"));
//            System.out.println("-------------------------------------------------- ");
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
//
//            lst = logic.setPX159S01A1881(filter);
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//
//        return lst;
//    }
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody            
//    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("ViewTicketAccounting : getXLSX");
//
//        String fileNameDownload = String.format("ViewTicketAccounting- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<PX0241S01A720Filter> listaData = this.getList(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("ViewTicketAccounting");
//
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
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
//
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
//
//            // ====== CREANDO TITULOS ======================================
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            Cell CH1_10 = row.createCell(10);
//
//            CH1_00.setCellValue("Nbr");
//            CH1_01.setCellValue("Proccess Date");
//            CH1_02.setCellValue("Operative Unit");
//            CH1_03.setCellValue("Type");
//            CH1_04.setCellValue("Suplier N°");
//            CH1_05.setCellValue("Subsidiary");
//            CH1_06.setCellValue("Invoice Date");
//            CH1_07.setCellValue("Invoice N°");
//            CH1_08.setCellValue("Debit");
//            CH1_09.setCellValue("Credit");
//            CH1_10.setCellValue("Currency");
//            
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//
//            //          ========================================================
//            ++vj;
//            while (iter.hasNext()) {
//
//                row = sheet.createRow(vj);
//                Cell rcell0 = row.createCell(0);
//                Cell rcell1 = row.createCell(1);
//                Cell rcell2 = row.createCell(2);
//                Cell rcell3 = row.createCell(3);
//                Cell rcell4 = row.createCell(4);
//                Cell rcell5 = row.createCell(5);
//                Cell rcell6 = row.createCell(6);
//                Cell rcell7 = row.createCell(7);
//                Cell rcell8 = row.createCell(8);
//                Cell rcell9 = row.createCell(9);
//                Cell rcell10 = row.createCell(10);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).A1880FECHA);
//                rcell2.setCellValue(listaData.get(vi).A1880UNID);
//                rcell3.setCellValue(listaData.get(vi).A1880INDAP);
//                rcell4.setCellValue(listaData.get(vi).A1880PROV);
//                rcell5.setCellValue(listaData.get(vi).A1880SUPR);
//                rcell6.setCellValue(listaData.get(vi).A1880FFACT);
//                rcell7.setCellValue(listaData.get(vi).A1880NFACT);
//                rcell8.setCellValue(listaData.get(vi).A1880ACTIV);
//                rcell9.setCellValue(listaData.get(vi).A1880PASIV);
//                rcell10.setCellValue(listaData.get(vi).A1880MONED);
//
//                rcell0.setCellStyle(bodyStyle);
//                rcell1.setCellStyle(bodyStyle);
//                rcell2.setCellStyle(bodyStyle);
//                rcell3.setCellStyle(bodyStyle);
//                rcell4.setCellStyle(bodyStyle);
//                rcell5.setCellStyle(bodyStyle);
//                rcell6.setCellStyle(bodyStyle);
//                rcell7.setCellStyle(bodyStyle);
//                rcell8.setCellStyle(bodyStyle);
//                rcell9.setCellStyle(bodyStyle);
//                rcell10.setCellStyle(bodyStyle);
//
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
//
//            /**
//             * fileNameDownload = Nombre de descarga
//             */
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
//
//    }
//
//    @RequestMapping(value = "getDetailXLSX")
//    public @ResponseBody            
//    void getDetailXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("ViewTicketAccounting : getDetailXLSX");
//
//        String fileNameDownload = String.format("ViewTicketAccounting- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A1881Filter> listaData = this.getListDetail(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("ViewTicketAccounting");
//
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
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
//
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
//
//            // ====== CREANDO TITULOS ======================================
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);           
//
//            CH1_00.setCellValue("Nbr");
//            CH1_01.setCellValue("Proccess Date");
//            CH1_02.setCellValue("Operative Unit");
//            CH1_03.setCellValue("Type");
//            CH1_04.setCellValue("Suplier N°");
//                      
//            
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//           
//
//            //          ========================================================
//            ++vj;
//            while (iter.hasNext()) {
//
//                row = sheet.createRow(vj);
//                Cell rcell0 = row.createCell(0);
//                Cell rcell1 = row.createCell(1);
//                Cell rcell2 = row.createCell(2);
//                Cell rcell3 = row.createCell(3);
//                Cell rcell4 = row.createCell(4);
//               
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).A1881CUENT);
//                rcell2.setCellValue(listaData.get(vi).A1881DESCR);
//                rcell3.setCellValue(listaData.get(vi).A1881ACTIV);
//                rcell4.setCellValue(listaData.get(vi).A1881PASIV);
//               
//                rcell0.setCellStyle(bodyStyle);
//                rcell1.setCellStyle(bodyStyle);
//                rcell2.setCellStyle(bodyStyle);
//                rcell3.setCellStyle(bodyStyle);
//                rcell4.setCellStyle(bodyStyle);
//               
//
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
//          
//            /**
//             * fileNameDownload = Nombre de descarga
//             */
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
//
//    }

    @RequestMapping(value = "getXLSX")
    public ResponseEntity<?> getXLSX(HttpServletRequest request){
        try {
            System.out.println("---------------ViewTicketAccounting:getXLSX-------------");
            logic = new ViewTicketAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<PX0241S01A720Filter> lst = new ArrayList<>();
            PX0241S01A720Filter params = new PX0241S01A720Filter();
            params.AIRLINE = request.getParameter("AIRLINE");
            params.MODE = request.getParameter("MODE");
            params.TRANSACTION = request.getParameter("TRANSACTION");
            params.TKT = request.getParameter("TKT");
            params.SEQ = request.getParameter("SEQ");
            params.CUPON1 = request.getParameter("CUPON1");
            params.CUPON2 = request.getParameter("CUPON2");
            params.CUPON3 = request.getParameter("CUPON3");
            params.CUPON4 = request.getParameter("CUPON4");
            params.FROM = request.getParameter("FROM");
            params.TO = request.getParameter("TO");
            params.FUENTE = request.getParameter("FUENTE");
            params.PAIS = request.getParameter("PAIS");
            params.CHANNEL = request.getParameter("CHANNEL");
            params.STERROR = request.getParameter("STERROR");
            params.FLAG = request.getParameter("FLAG");
            params.SEQTRAN = Integer.parseInt(request.getParameter("SEQTRAN"));
            params.page.PAGNUM = -1;
            params.page.TOTPAG = 300;
            params.page.TOTROW = 300;
            if (params.TRANSACTION.equals("RFTX")){
                lst = logic.loadRFTX(params);
            }else{
                lst = logic.load(params);
            }
            System.out.println("Total: " + lst.size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[45];
            headers[0] = "TDOC";
            headers[1] = "TFOR";
            headers[2] = "C1";
            headers[3] = "C2";
            headers[4] = "C3";
            headers[5] = "Card";
            headers[6] = "Nbr Card";
            headers[7] = "RFIC";
            headers[8] = "RFIS";
            headers[9] = "Debit Loc";
            headers[10] = "Credit loc";
            headers[11] = "Debit Rev";
            headers[12] = "Credit Rev";
            headers[13] = "IVA";
            headers[14] = "FOP IVA";
            headers[15] = "F. OPEN";
            headers[16] = "VRIC";
            headers[17] = "PFC";
            headers[18] = "IATAVTA-PS";
            headers[19] = "FECUSO";
            headers[20] = "CTA";
            headers[21] = "LIB1";
            headers[22] = "CIA1";
            headers[23] = "CLIENTE";
            headers[24] = "DIRECCION";
            headers[25] = "PROVEEDOR";
            headers[26] = "TD_ORACLE";
            headers[27] = "COMB";
            headers[28] = "TITULO";
            headers[29] = "SUCURSAL";
            headers[30] = "CTACTRL";
            headers[31] = "TITULOCTRL";
            headers[32] = "LIBCTRL";
            headers[33] = "CTAPROVEE";
            headers[34] = "TITULOPROVEE";
            headers[35] = "L. PRO";
            headers[36] = "LCTACTRLPROVEEPRO";
            headers[37] = "TITULOCTRLPROVEE";
            headers[38] = "L.P.CTRL";
            headers[39] = "TITULOCTRLPROVEE";
            headers[40] = "CTAPROVEE";
            headers[41] = "L. AR";
            headers[42] = "CLI. AR06";
            headers[43] = "DIR. AR06";
            headers[44] = "TD. AR06";
            
            data.add(headers);
            for (PX0241S01A720Filter obj : lst) {
                Object[] row = new Object[45];
                row[0] = obj.TDOC;
                
                row[1] = obj.TFOR;
                row[2] = obj.CONCEPT1;
                row[3] = obj.CONCEPT2;
                row[4] = obj.CONCEPT3;
                row[5] = obj.TTARJ;
                row[6] = obj.NTARJ;
                row[7] = obj.RFIC;
                row[8] = obj.RFIS;
                row[9] = obj.DEBITO;
                row[10] = obj.CREDITO;
                row[11] = obj.DEBITORV;
                row[12] = obj.CREDITORV;
                row[13] = obj.TASA;
                row[14] = obj.FOP_IVA;
                row[15] = obj.FOPEN;
                row[16] = obj.VRIC;
                row[17] = obj.PFC;
                row[18] = obj.IATAVTA;
                row[19] = obj.FECUSO;
                row[20] = obj.CTA;
                row[21] = obj.LIB1;
                row[22] = obj.CIA1;
                row[23] = obj.CLIENTE;
                row[24] = obj.PROVEEDOR;
                row[25] = obj.DIRECCION;
                row[26] = obj.TD_ORACLE;
                row[27] = obj.COMB;
                row[28] = obj.TITULO;
                row[29] = obj.SUCURSAL;
                row[30] = obj.CTACTRL;
                row[31] = obj.TITULOCTRL;
                row[32] = obj.LIBCTRL;
                row[33] = obj.CTAPROVEE;
                row[34] = obj.TITULOPROVEE;
                row[35] = obj.LIBPROVEE;
                row[36] = obj.CTACTRLPROVEE;
                row[37] = obj.TITULOCTRLPROVEE;
                row[38] = obj.LIBCTRLPROVEE;
                row[39] = obj.CTAARPROVEE;
                row[40] = obj.TITULOARPROVEE;
                row[41] = obj.LIBARPROVEE;
                row[42] = obj.CLIENTEAR06;
                row[43] = obj.DIRECCIONAR06;
                row[44] = obj.TD_ORACLEAR06;
                data.add(row);
            }
            String controllerName = "ViewTicketAccounting";
            return exportUtils.createExcel(data, controllerName + " - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
}
