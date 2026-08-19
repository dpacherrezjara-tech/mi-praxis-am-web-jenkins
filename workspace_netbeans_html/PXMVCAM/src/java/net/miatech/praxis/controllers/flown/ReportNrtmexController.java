
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ReportNrtmexLogic;
import net.miatech.beans.A1817Filter;
import net.miatech.praxis.flown.A1817;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/ReportNrtmex")
public class ReportNrtmexController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ReportNrtmexLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ReportNrtmex/form_index";
    }
    
    
    @RequestMapping(value = "searchMain")
    public @ResponseBody
    String searchMain(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReportNrtmex : Search Main-------------");
        map.put("success", true);
        List<A1817Filter> lst = this.getListMain(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getListMain(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReportNrtmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

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

            lst = logic.loadPX529SQP04935(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReportNrtmex : Search-------------");
        map.put("success", true);
        List<A1817Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1817Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1817Filter> lst = new ArrayList<>(0);
        A1817Filter filter = new A1817Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReportNrtmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1817Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

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

            lst = logic.loadPX529SQP04932(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "downloadText")
    public @ResponseBody
    void downloadText(HttpServletRequest request, HttpServletResponse response) {
        A1817Filter filter = new A1817Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();        

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());  
            
            filter.page.PAGNUM = -1;            
            filter.page.PAGROW = -1;           
            
            logic = new ReportNrtmexLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            List<A1817Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            int len = listaData.size();
            Integer vi = 0;
            
            String fileNameDownload = String.format("Reporte NRT-MEX-" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
            File file = new File(rutaFile + "\\" + fileNameDownload + ".txt");
            if (file.exists()) {
                file.delete();
            }
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "Period|Ticket|Flight Date|Flight Nbr|Orig|Dest|Service Clas|Carr|Stock|Poliza Date|Equip|Matric|Qty Pax|Period Oper|Date Oper|Fare Basis|Type|Name|PNR|PNR Locator|Birthday|Doc.Type|Doc.Nbr|Country|Transact|Comments|Tax Amount|Ruta";
            writer.println("" + cadena);
            for (vi = 0; vi < len; vi++) {
                cadena = "";
                //FLIGHT INFORMATION
                cadena += "" + listaData.get(vi).strFormatDate2 + "|";
                cadena += "" + listaData.get(vi).strTicket + "|";
                cadena += "" + listaData.get(vi).strFormatDate2 + "|";
                cadena += "" + listaData.get(vi).NFLIGHT + "|";
                cadena += "" + listaData.get(vi).ORIG + "|";
                cadena += "" + listaData.get(vi).DEST + "|";
                cadena += "" + listaData.get(vi).CLAS + "|";
                cadena += "" + listaData.get(vi).CARR + "|";
                cadena += "" + listaData.get(vi).FSTOCK + "|";
                cadena += "" + listaData.get(vi).strFormatDate3 + "|";
                cadena += "" + listaData.get(vi).EQUIPO + "|";
                cadena += "" + listaData.get(vi).MATRICUL + "|";
                cadena += "" + listaData.get(vi).QTYPAX + "|";
                cadena += "" + listaData.get(vi).strFormatDate4 + "|";
                cadena += "" + listaData.get(vi).strFormatDate5 + "|";
                cadena += "" + listaData.get(vi).FBASE + "|";
                //CDD INFORMATION
                cadena += "" + listaData.get(vi).TPAX + "|";
                cadena += "" + listaData.get(vi).PAXNAME + "|";
                cadena += "" + listaData.get(vi).SPNR+ "|";
                cadena += "" + listaData.get(vi).CRPNRL+ "|";
                cadena += "" + listaData.get(vi).FNAC+ "|";
                cadena += "" + listaData.get(vi).DOCIDEN+ "|";
                cadena += "" + listaData.get(vi).NDOCIDEN+ "|";
                cadena += "" + listaData.get(vi).CCOUNTRY+ "|";
                //
                cadena += "" + listaData.get(vi).TTRANS+ "|"; 
                cadena += "" + listaData.get(vi).COMMENTS+ "|";
                cadena += "" + listaData.get(vi).TAXAMOUNT+ "|";
                cadena += "" + listaData.get(vi).RUTA;
                
//                cadena += "" + listaData.get(vi).A1729LOTE;
                
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            /**
             * Comprimimos archivo generado para su optima descarga
             */
            if (!zip(fileNameDownload)) {
                response.setContentType("application/zip");
            }
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileNameDownload + ".gz" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileNameDownload + ".gz");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
//            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

    public Boolean zip(String fileName) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File(path + "\\" + fileName + ".gz");

            if (fileZip.exists()) {
                fileZip.delete();
            }

            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".gz");

            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }

    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
        zipOutputStream.putNextEntry(zipEntry);
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        byte[] buf = new byte[4096];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.flush();
        zipOutputStream.closeEntry();
        zipOutputStream.close();
        fileOutputStream.close();
    }

    
    //Excels
    @RequestMapping(value = "getXLSXMain")
    public @ResponseBody
    void getXLSXMain(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Report NRT-MEX : " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1817Filter> listaData = this.getListMain(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("Flown");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("Flight");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("Audit Tax");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Total Cpns");
            CH2_2.setCellValue("Pending");
            CH2_3.setCellValue("Conciliated");
            CH2_4.setCellValue("Paid");
            CH2_5.setCellValue("Not Payed");
            CH2_6.setCellValue("Applied");
            CH2_7.setCellValue("Not Applied");
            CH2_8.setCellValue("Exonerated");
            
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
           
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).QTYTOTAL);
                rcell2.setCellValue(listaData.get(vi).QTYPEND);
                rcell3.setCellValue(listaData.get(vi).QTYCONC);
                rcell4.setCellValue(listaData.get(vi).QTYPAY);
                rcell5.setCellValue(listaData.get(vi).QTYNOPAY);
                rcell6.setCellValue(listaData.get(vi).QTYAPLI);
                rcell7.setCellValue(listaData.get(vi).QTYNOAPLI);
                rcell8.setCellValue(listaData.get(vi).QTYEXON);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).TOT_QTYTOTAL);
            CH1_2_T.setCellValue(listaData.get(0).TOT_QTYPEND);
            CH1_3_T.setCellValue(listaData.get(0).TOT_QTYCONC);
            CH1_4_T.setCellValue(listaData.get(0).TOT_QTYPAY);
            CH1_5_T.setCellValue(listaData.get(0).TOT_QTYNOPAY);
            CH1_6_T.setCellValue(listaData.get(0).TOT_QTYAPLI);
            CH1_7_T.setCellValue(listaData.get(0).TOT_QTYNOAPLI);
            CH1_8_T.setCellValue(listaData.get(0).TOT_QTYEXON);
            
            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

}

