/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.discharges;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX549S01A1747Filter;
import net.miatech.beans.SQP04905Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.discharges.CouponRegistrationLogic;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author jmeiggs
 */
@Controller
@Scope("request")
@RequestMapping("/CouponRegistration")
public class CouponRegistrationController extends BaseController {
    
    @Autowired
    private ExportUtils exportUtils;
    
    private static final Logger logError = Logger.getLogger("errorLog");
    private CouponRegistrationLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "discharges/CouponRegistration/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CouponRegistration : Search-------------");
        map.put("success", true);
        List<PX549S01A1747Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX549S01A1747Filter> getList(HttpServletRequest request, Boolean bExcel) {
        logic = new CouponRegistrationLogic();
        List<PX549S01A1747Filter> lst = new ArrayList<>(0);
        PX549S01A1747Filter filter = new PX549S01A1747Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_TIPOC = request.getParameter("IN_TIPOC");
            filter.IN_FECHAFROM = request.getParameter("IN_FECHAFROM");
            filter.IN_FECHATO = request.getParameter("IN_FECHATO");
            filter.IN_TKT = request.getParameter("IN_TKT");

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

            lst = logic.loadPX549S01A1747(filter);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }

        return lst;
    }
    
    //@RequestMapping(value = "getXLSX")
    //public @ResponseBody
    //void getXLSX(HttpServletRequest request, HttpServletResponse response) {
    @RequestMapping(value = "getXLSX")
    public ResponseEntity<?> getXLSX(@ModelAttribute SQP04905Filter params){
        logic = new CouponRegistrationLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadByPaymentDetail-------------");
            List<SQP04905Filter> filter = logic.loadSQP04905Filter(params);
            //System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[5];
            if(params.getTFECHA().equals("1"))
                headers[0] = "Accounting Date";
            else{
                headers[0] = "Sale Date";
            }
            headers[1] = "Discharge Type Date";
            headers[2] = "Nbr of Documents";
            headers[3] = "Fare Amount";
            headers[4] = "YQ Amount";
            data.add(headers);
            for (SQP04905Filter obj : filter) {
                Object[] row = new Object[5];
                if(params.getTFECHA().equals("1"))
                    row[0] = obj.getFCONT();
                else{
                    row[0] = obj.getFVTA();
                }
                switch(obj.getTIPOC()){
                    case "1": row[1] = "NATURAL"; break;
                    case "2": row[1] = "ETHNIC"; break;
                    case "3": row[1] = "NON REFUNDABLE"; break;
                    case "6": row[1] = "NO SHOW"; break;
                    case "7": row[1] = "RAC474"; break;
                    case "8": row[1] = "RFTX"; break;
                    case "9": row[1] = "ANCILLARIE NATURAL"; break;
                    case "10": row[1] = "ANCILLARIE NO SHOW"; break;
                    case "11": row[1] = "ANCILLARIE RAC474"; break;
                }
                row[2] = obj.getTDOCS();
                row[3] = obj.getTFARE();
                row[4] = obj.getTYQ();
                data.add(row);
            }
            return exportUtils.createExcel(data, "Coupon Registration" + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadExcel")
    public ResponseEntity<byte[]> descargarExcelDetail(HttpServletRequest request) {
        String nombreFile = request.getParameter("nameFile");
        String fileNameDownload = "CouponRegistration - " + nombreFile.trim() + ".xlsx";

        try {

            String[] nameArr = fileNameDownload.split("\\.");
            String prefix = nameArr[0];
            String suffix = "." + nameArr[1];
            File file = File.createTempFile(prefix, suffix);

            List<PX549S01A1747Filter> listaData = this.getList(request, true);

            try (SXSSFWorkbook workbook = new SXSSFWorkbook()) {
                workbook.setCompressTempFiles(true); // Opcional: comprimir archivos temporales para reducir el espacio en disco utilizado
                Sheet sheet = workbook.createSheet("CouponRegistration");
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
                Cell CH1_10 = row.createCell(10);
                Cell CH1_11 = row.createCell(11);
                Cell CH1_12 = row.createCell(12);
                Cell CH1_13 = row.createCell(13);
                Cell CH1_14 = row.createCell(14);
                Cell CH1_15 = row.createCell(15);
                Cell CH1_16 = row.createCell(16);
                Cell CH1_17 = row.createCell(17);
                Cell CH1_18 = row.createCell(18);
                Cell CH1_19 = row.createCell(19);

                CH1_00.setCellValue("Accounting Date");
                CH1_01.setCellValue("Issue Date");
                CH1_02.setCellValue("Air");
                CH1_03.setCellValue("Document");
                CH1_04.setCellValue("Coupon");
                CH1_05.setCellValue("Discharge Type");
                CH1_06.setCellValue("Source");
                CH1_07.setCellValue("IATA");
                CH1_08.setCellValue("Country");
                CH1_09.setCellValue("Zone");
                CH1_10.setCellValue("Document Type");
                CH1_11.setCellValue("From");
                CH1_12.setCellValue("To");
                CH1_13.setCellValue("Carrier");
                CH1_14.setCellValue("Flight Date");
                CH1_15.setCellValue("Currency");
                CH1_16.setCellValue("Fare Amount");
                CH1_17.setCellValue("Comm Amount");
                CH1_18.setCellValue("SComm Amount");
                CH1_19.setCellValue("YQ Amount");

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
                CH1_15.setCellStyle(headerStyle);
                CH1_16.setCellStyle(headerStyle);
                CH1_17.setCellStyle(headerStyle);
                CH1_18.setCellStyle(headerStyle);
                CH1_19.setCellStyle(headerStyle);

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
                    Cell rcell10 = row.createCell(10);
                    Cell rcell11 = row.createCell(11);
                    Cell rcell12 = row.createCell(12);
                    Cell rcell13 = row.createCell(13);
                    Cell rcell14 = row.createCell(14);
                    Cell rcell15 = row.createCell(15);
                    Cell rcell16 = row.createCell(16);
                    Cell rcell17 = row.createCell(17);
                    Cell rcell18 = row.createCell(18);
                    Cell rcell19 = row.createCell(19);

                    rcell0.setCellValue(listaData.get(vi).FCONT);
                    rcell1.setCellValue(listaData.get(vi).FVTA);
                    rcell2.setCellValue(listaData.get(vi).CCIA);
                    rcell3.setCellValue(listaData.get(vi).FORMASERIE);
                    rcell4.setCellValue(listaData.get(vi).CUPON);
                    rcell5.setCellValue(listaData.get(vi).TIPOC);
                    rcell6.setCellValue(listaData.get(vi).FTE);
                    rcell7.setCellValue(listaData.get(vi).AGTIA);
                    rcell8.setCellValue(listaData.get(vi).PSVVTA);
                    rcell9.setCellValue(listaData.get(vi).ZONA);
                    rcell10.setCellValue(listaData.get(vi).CDOC);
                    rcell11.setCellValue(listaData.get(vi).CDEPART);
                    rcell12.setCellValue(listaData.get(vi).CARRIVA);
                    rcell13.setCellValue(listaData.get(vi).CARR);
                    rcell14.setCellValue(listaData.get(vi).DFLIGHT);
                    rcell15.setCellValue(listaData.get(vi).MDACP);
                    rcell16.setCellValue(listaData.get(vi).VCPNRV);
                    rcell17.setCellValue(listaData.get(vi).COMREV);
                    rcell18.setCellValue(listaData.get(vi).SCOMREV);
                    rcell19.setCellValue(listaData.get(vi).YQREV);
                    iter.next();
                    ++vi;
                    ++vj;
                }

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
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
                /**
                 * fileNameDownload = Nombre de descarga
                 */
                try (FileOutputStream fos = new FileOutputStream(file)) {
                    workbook.write(fos);
                }
            }

            ResponseEntity<byte[]> response = this.zipFile(fileNameDownload, file);

            return response;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "searchSummary")
    public ResponseEntity<?> searchSummary(@RequestParam Map<String, String> params) {
        logic = new CouponRegistrationLogic();
        List res = new ArrayList();
        try {
            logic.setSession(this.serverSession.getServerSession());
            Gson gson = new Gson();
            SQP04905Filter filter = gson.fromJson(gson.toJson(params), SQP04905Filter.class);
            filter.limpiaFechas();
            res = logic.loadSQP04905Filter(filter);
            if (!res.isEmpty()) {
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadText")
    public ResponseEntity<byte[]> descargarTextoDetail(HttpServletRequest request) {

        try {
            String nombreFile = request.getParameter("nameFile");
            String fileNameDownload = "CouponRegistration - " + nombreFile.trim() + ".txt";

            List<PX549S01A1747Filter> lstObj = this.getList(request, true);
            List<String> filas = new ArrayList<>();

            String[] nameArr = fileNameDownload.split("\\.");
            String prefix = nameArr[0];
            String suffix = "." + nameArr[1];
            File file = File.createTempFile(prefix, suffix);

            //encabezado
            String headersTxt = "Accounting Date,Issue Date,Air,Document,Coupon,Discharge Type,Source,IATA,Country,Zone,"
                    + "Document Type,From,To,Carrier,Flight Date,Currency,Fare Amount,Comm Amount,SComm Amount,YQ Amount";
            filas.add(headersTxt);

            //data
            for (PX549S01A1747Filter obj : lstObj) {
                StringBuilder fila = new StringBuilder();
                fila.append(obj.FCONT).append(",");
                fila.append(obj.FVTA).append(",");
                fila.append(obj.CCIA).append(",");
                fila.append(obj.FORMASERIE).append(",");
                fila.append(obj.CUPON).append(",");
                fila.append(obj.TIPOC).append(",");
                fila.append(obj.FTE).append(",");
                fila.append(obj.AGTIA).append(",");
                fila.append(obj.PSVVTA).append(",");
                fila.append(obj.ZONA).append(",");
                fila.append(obj.CDOC).append(",");
                fila.append(obj.CDEPART).append(",");
                fila.append(obj.CARRIVA).append(",");
                fila.append(obj.CARR).append(",");
                fila.append(obj.DFLIGHT).append(",");
                fila.append(obj.MDACP).append(",");
                fila.append(obj.VCPNRV).append(",");
                fila.append(obj.COMREV).append(",");
                fila.append(obj.SCOMREV).append(",");
                fila.append(obj.YQREV);

                filas.add(fila.toString());
            }

            //escribe en txt
            try (FileWriter fw = new FileWriter(file)) {
                fw.append(String.join("\n", filas));
            }

            ResponseEntity<byte[]> response = this.zipFile(fileNameDownload, file);

            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<byte[]> zipFile(String fileNameDownload, File file) throws IOException {

        String flnm = fileNameDownload.split("\\.")[0];

        System.out.println("Nombre de Archivo: " + fileNameDownload);

        //descarga en zip
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ZipOutputStream zos = new ZipOutputStream(baos);

        ZipEntry entrada1 = new ZipEntry(fileNameDownload);
        zos.putNextEntry(entrada1);
        zos.write(FileUtils.readFileToByteArray(file));
        zos.closeEntry();

        zos.finish();
        zos.close();

        if(file!=null){
            file.delete();
        }

        //respuesta http
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", flnm + ".zip");
        return new ResponseEntity<byte[]>(baos.toByteArray(), headers, HttpStatus.OK);
    }
}
