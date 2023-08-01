package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import net.miatech.praxis.logic.payments.InputsTmzLogic;
import net.miatech.praxis.payment.A4305;
import net.miatech.praxis.payment.A4344;
import net.miatech.praxis.payment.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
import net.miatech.praxis.payment.filter.SQP04974Filter;
import net.miatech.praxis.payment.filter.SQP04975Filter;
import net.miatech.praxis.payment.filter.SQP04976Filter;
import net.miatech.praxis.payment.filter.SQP05033Filter;
import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.record.formula.functions.T;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/InputsTmz")
public class InputsTmzController {

    @Autowired
    private InputsTmzLogic logic;

    //<editor-fold defaultstate="collapsed" desc="convierte obj">
    private <T> T parseObject(Map<String, Object> params, Class<T> clazz)
            throws InstantiationException, IllegalAccessException {
        //T instance = clazz.newInstance();
        Gson gson = new Gson();
        T filter = (T) gson.fromJson(gson.toJson(params), clazz);
        return filter;
    }
    //</editor-fold>

    @RequestMapping(value = "getInfoCombos")
    public ResponseEntity<?> getInfoCombo(@RequestParam Map<String, Object> params) {
        try {
            SQP04971Filter filter = this.parseObject(params, SQP04971Filter.class);
            SQP04971Filter res = logic.getSQP04971Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getInfoCombos: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getCalendarInfo")
    public ResponseEntity<?> getCalendarInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04972Filter filter = this.parseObject(params, SQP04972Filter.class);
            List<CalendarTmz> res = logic.getSQP04972Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getCalendarInfo: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getDetailSummaryInfo")
    public ResponseEntity<?> getDetailSummaryInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04974Filter filter = this.parseObject(params, SQP04974Filter.class);
            List<SQP04974Filter> res = logic.getSQP04974Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getDetailSummaryInfo: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getCalendarFechaInfo")
    public ResponseEntity<?> getCalendarFechaInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04975Filter filter = this.parseObject(params, SQP04975Filter.class);
            List<SQP04975Filter> res = logic.getSQP04975Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getCalendarFechaInfo: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getDataGridInfo")
    public ResponseEntity<?> getDataGridInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04976Filter filter = new SQP04976Filter(); //this.parseObject(params, SQP04976Filter.class);
            filter.setFECHA_FROM(params.get("FECHA_FROM").toString());
            filter.setPROCESADOR(params.get("PROCESADOR").toString());
            filter.setTIPO(params.get("TIPO").toString());
            filter.setLimit(params.get("limit") == null ? null : Integer.parseInt(params.get("limit").toString()));
            filter.setStart(params.get("start") == null ? null : Integer.parseInt(params.get("start").toString()));
            //Boolean excel = false;//filter.getExcel()== null? false:filter.getExcel();
            Boolean excel = params.get("excel") == null ? false : true;
            if (!excel) {
                filter.getPage().PAGROW = 20;
                Integer start = filter.getStart();
                start = (start != 0 ? start : 0);
                filter.getPage().PAGNUM = (start / filter.getPage().PAGROW) + 1;
            } else {
                filter.getPage().PAGROW = -1;
                filter.getPage().PAGNUM = 1;
            }
            SQP04976Filter res = logic.getSQP04976Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getDataGridInfo: " + e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getDataGridCInfo")
    public ResponseEntity<?> getDataGridCInfo(@ModelAttribute SQP05033Filter filter) {
        try {
            System.out.println("*************************** Inputs TMZ: getDataGridCInfo ****************************");
            return new ResponseEntity<>(logic.getSQP05033Filter(filter), HttpStatus.OK);
        } catch (Exception e) {
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadProcessorsInfo")
    public ResponseEntity<byte[]> downloadProcessorsInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04976Filter filter = new SQP04976Filter(); //this.parseObject(params, SQP04976Filter.class);
            filter.setFECHA_FROM(params.get("FECHA_FROM").toString());
            filter.setPROCESADOR(params.get("PROCESADOR").toString());
            filter.setTIPO(params.get("TIPO").toString());
            filter.setLimit(params.get("limit") == null ? null : Integer.parseInt(params.get("limit").toString()));
            filter.setStart(params.get("start") == null ? null : Integer.parseInt(params.get("start").toString()));
            //Boolean excel = false;//filter.getExcel()== null? false:filter.getExcel();
            Boolean excel = params.get("excel") == null ? false : true;
            if (!excel) {
                filter.getPage().PAGROW = 20;
                Integer start = filter.getStart();
                start = (start != 0 ? start : 0);
                filter.getPage().PAGNUM = (start / filter.getPage().PAGROW) + 1;
            } else {
                filter.getPage().PAGROW = -1;
                filter.getPage().PAGNUM = 1;
            }
            SQP04976Filter res = logic.getSQP04976Filter(filter);
            
            ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
            if(filter.getTIPO().equals("0")){
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[24];
                header[0] = "Seq";
                header[1] = "Grupo";
                header[2] = "Procesador";
                header[3] = "Fecha de Proceso";
                header[4] = "Territorio";
                header[5] = "Pais";
                header[6] = "Merch ID";
                header[7] = "Merch Liq Pago";
                header[8] = "Merch ID Party";
                header[9] = "Merch Pago Party";
                header[10] = "Fecha de Transaccion";
                header[11] = "Num. Tarjeta";
                header[12] = "Num. Autorizacion";
                header[13] = "Num. Cuotas";
                header[14] = "Total Cuotas";
                header[15] = "Plan de Pagos";
                header[16] = "Cia";
                header[17] = "Documento";
                header[18] = "Dig. Chequeo";
                header[19] = "PNR";
                header[20] = "Cod. Razon";
                header[21] = "Subc. Razon";
                header[22] = "Agente";
                header[23] = "Pais Venta";
                data.add(header);
                
                for(A4305 obj:res.getLstReceived()){
                    Object[] row = new Object[24];
                    row[0] = obj.getRN();
                    row[1] = obj.getA4305GRUPO();
                    row[2] = obj.getA4305PROCE();
                    row[3] = obj.getA4305PRDA();
                    row[4] = obj.getA4305TERRI();
                    row[5] = obj.getA4305PAIS();
                    row[6] = obj.getA4305MERID();
                    row[7] = obj.getA4305MERPG();
                    row[8] = obj.getA4305MERPI();
                    row[9] = obj.getA4305MERPP();
                    row[10] = obj.getA4305FECTR();
                    row[11] = obj.getA4305NUMTJ();
                    row[12] = obj.getA4305NUMAT();
                    row[13] = obj.getA4305NUMCU();
                    row[14] = obj.getA4305TOTCU();
                    row[15] = obj.getA4305PLANP();
                    row[16] = obj.getA4305CIA();
                    row[17] = obj.getA4305FORMA() + obj.getA4305SERIE();
                    row[18] = obj.getA4305DCHEQ();
                    row[19] = obj.getA4305PNR();
                    row[20] = obj.getA4305RFIC();
                    row[21] = obj.getA4305RFIS();
                    row[22] = obj.getA4305IATA();
                    row[23] = obj.getA4305PAIS();
                    data.add(row);
                }
                response = this.createExcel(data, "Received - " + filter.getPROCESADOR() + filter.getFECHA_FROM());
            }else if(filter.getTIPO().equals("1")){
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[5];
                header[0] = "RN";
                header[1] = "Procesador";
                header[2] = "Carrier";
                header[3] = "Max Long";
                header[4] = "Fecha de Proceso";
                data.add(header);
                
                for(A4344 obj:res.getLstLoaded()){
                    Object[] row = new Object[5];
                    row[0] = obj.getRN();
                    row[1] = obj.getPROCESADOR();
                    row[2] = obj.getCXRRNUM();
                    row[3] = obj.getTAMMAXLONG();
                    row[4] = obj.getTRADM();
                    data.add(row);
                }
                response = this.createExcel(data, "Loaded - " + filter.getPROCESADOR() + filter.getFECHA_FROM());
            }else{
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[24];
                header[0] = "Seq";
                header[1] = "Grupo";
                header[2] = "Procesador";
                header[3] = "Fecha de Proceso";
                header[4] = "Territorio";
                header[5] = "Pais";
                header[6] = "Merch ID";
                header[7] = "Merch Liq Pago";
                header[8] = "Merch ID Party";
                header[9] = "Merch Pago Party";
                header[10] = "Fecha de Transaccion";
                header[11] = "Num. Tarjeta";
                header[12] = "Num. Autorizacion";
                header[13] = "Num. Cuotas";
                header[14] = "Total Cuotas";
                header[15] = "Plan de Pagos";
                header[16] = "Cia";
                header[17] = "Documento";
                header[18] = "Dig. Chequeo";
                header[19] = "PNR";
                header[20] = "Cod. Razon";
                header[21] = "Subc. Razon";
                header[22] = "Agente";
                header[23] = "Pais Venta";
                data.add(header);
                
                for(A4305 obj:res.getLstExonerados()){
                    Object[] row = new Object[24];
                    row[0] = obj.getRN();
                    row[1] = obj.getA4305GRUPO();
                    row[2] = obj.getA4305PROCE();
                    row[3] = obj.getA4305PRDA();
                    row[4] = obj.getA4305TERRI();
                    row[5] = obj.getA4305PAIS();
                    row[6] = obj.getA4305MERID();
                    row[7] = obj.getA4305MERPG();
                    row[8] = obj.getA4305MERPI();
                    row[9] = obj.getA4305MERPP();
                    row[10] = obj.getA4305FECTR();
                    row[11] = obj.getA4305NUMTJ();
                    row[12] = obj.getA4305NUMAT();
                    row[13] = obj.getA4305NUMCU();
                    row[14] = obj.getA4305TOTCU();
                    row[15] = obj.getA4305PLANP();
                    row[16] = obj.getA4305CIA();
                    row[17] = obj.getA4305FORMA() + obj.getA4305SERIE();
                    row[18] = obj.getA4305DCHEQ();
                    row[19] = obj.getA4305PNR();
                    row[20] = obj.getA4305RFIC();
                    row[21] = obj.getA4305RFIS();
                    row[22] = obj.getA4305IATA();
                    row[23] = obj.getA4305PAIS();
                    data.add(row);
                }
                response = this.createExcel(data, "Exonerated - " + filter.getPROCESADOR() + filter.getFECHA_FROM());
            }
            return response;
        } catch (Exception e) {
            System.out.println("Error en getDataGridInfo: " + e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<byte[]> createExcel(List<Object[]> data, String fileName)throws IOException{
        String fileNameDownload = fileName + ".xlsx";
        try (SXSSFWorkbook workbook = new SXSSFWorkbook()) {
            String[] nameArr = fileNameDownload.split("\\.");
            String prefix = nameArr[0];
            String suffix = "." + nameArr[1];
            File file = File.createTempFile(prefix, suffix);
            Sheet sheet = workbook.createSheet();
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

            Row rowHeader = sheet.createRow(0);
            int cols = 0;

            for (Object obj : data.get(0)) {
                Cell ch = rowHeader.createCell(cols);
                ch.setCellValue(obj.toString());
                cols++;
            }
            for (int i = 1; i < data.size(); i++) {
                Row row = sheet.createRow(i);
                for (int x = 0; x < data.get(i).length; x++) {
                    Cell cell = row.createCell(x);
                    cell.setCellValue(data.get(i)[x].toString());
                }
            }
            
            for(int c=0;c<cols;c++){
                sheet.autoSizeColumn(c);
            }
            
            try (FileOutputStream fos = new FileOutputStream(file)) {
                workbook.write(fos);
            }
            
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
            headers.setContentDispositionFormData("attachment", prefix + ".zip");
            return new ResponseEntity<byte[]>(baos.toByteArray(), headers, HttpStatus.OK);
        }
    }
}
