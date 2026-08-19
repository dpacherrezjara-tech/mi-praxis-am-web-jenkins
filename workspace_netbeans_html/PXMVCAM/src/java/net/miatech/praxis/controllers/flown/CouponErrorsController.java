package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1702Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1702;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.CouponErrorsLogic;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/CouponErrors")
public class CouponErrorsController extends BaseController {

    private CouponErrorsLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request,Boolean bExcel) {
        A1702Filter filter = new A1702Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
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
            
            logic = new CouponErrorsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1702Filter> listaData = logic.loadPX102S01A1702(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchCompleteData")
    public @ResponseBody
    String searchCompleteData(ModelMap map, HttpServletRequest request) {
        A1702Filter filter = new A1702Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new CouponErrorsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            A1702 A1702bean = logic.loadPX102S02A1702(filter);

            map.put("success", true);
            map.put("A1702bean", A1702bean);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/MaintenanceA1702")
    public @ResponseBody
    String MaintenanceA1702(ModelMap map, HttpServletRequest request) {
        A1702 filter = new A1702();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String strOption = request.getParameter("strOption");

            logic = new CouponErrorsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String msj = logic.loadPX102S03A1702(filter, strOption);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "updateAircraft", method = RequestMethod.POST)
    public @ResponseBody
    String updateCommA1816(ModelMap map, @RequestParam("excelfile_VLO") MultipartFile excelfile, HttpServletRequest request) {
        byte[] bytes = null;

        String msj = "No existen registros por actualizar";

//        
        Integer cont = 0;
        try {
            List<A1702Filter> lstAircraft = new ArrayList<>(0);
            A1702Filter obj = new A1702Filter();
            double prue = 0;
            int prue2 = 0;
            String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //HSSFCell cell;
            DataFormatter formatter = new DataFormatter(); 
            
            while (iterator.hasNext()) {

                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 2) {
                    if (sheet.getCell(0) != null) {
                        obj = new A1702Filter();
//                        obj.DFLIGHT = sheet.getCell(1) == null ? "" : sheet.getCell(1).toString().trim();
                        obj.EQUIPO = sheet.getCell(1) == null ? "" : sheet.getCell(1).toString().trim();
                        obj.MODELO = formatter.formatCellValue(sheet.getCell(2));
                        obj.NUMERO = formatter.formatCellValue(sheet.getCell(3));
                        
                        obj.MATRIC = sheet.getCell(4) == null ? "" : sheet.getCell(4).toString().trim();
                        obj.CARRIER = sheet.getCell(5) == null ? "" : sheet.getCell(5).toString().trim();
                        obj.TIPO = sheet.getCell(6) == null ? "" : sheet.getCell(6).toString().trim();
//                        obj.FECHA = sheet.getCell(7) == null ? "" : sheet.getCell(7).toString().trim();
                        obj.FECHA = sheet.getCell(7) == null ? "" : sheet.getCell(7).toString().trim();
                        System.out.println(obj.FECHA);

                        if (obj.FECHA.contains("-")) {
                            String[] fecha = obj.FECHA.split("-");
                            String fecha2 = String.format("%0" + 4 + "d", Integer.valueOf(fecha[2]));
                            String fecha1 = fecha[1];
                            if (fecha1.equals("ene")) {
                                fecha1 = "01";
                            } else if (fecha1.equals("feb")) {
                                fecha1 = "02";
                            } else if (fecha1.equals("mar")) {
                                fecha1 = "03";
                            } else if (fecha1.equals("abr")) {
                                fecha1 = "04";
                            } else if (fecha1.equals("may")) {
                                fecha1 = "05";
                            } else if (fecha1.equals("jun")) {
                                fecha1 = "06";
                            } else if (fecha1.equals("jul")) {
                                fecha1 = "07";
                            } else if (fecha1.equals("ago")) {
                                fecha1 = "08";
                            } else if (fecha1.equals("sep")) {
                                fecha1 = "09";
                            } else if (fecha1.equals("oct")) {
                                fecha1 = "10";
                            } else if (fecha1.equals("nov")) {
                                fecha1 = "11";
                            } else if (fecha1.equals("dic")) {
                                fecha1 = "12";
                            }

                            fecha1 = String.format("%0" + 2 + "d", Integer.valueOf(fecha1));
                            String fecha0 = String.format("%0" + 2 + "d", Integer.valueOf(fecha[0]));
                            System.out.println(fecha2 + fecha1 + fecha0);
                            obj.FECHA = fecha2 + fecha1 + fecha0;
                        }

                        obj.FECHAOP = sheet.getCell(8) == null ? "" : sheet.getCell(8).toString().trim();
                        System.out.println(obj.FECHAOP);

                        if (obj.FECHAOP.contains("-")) {
                            String[] fecha = obj.FECHAOP.split("-");
                            String fecha2 = String.format("%0" + 4 + "d", Integer.valueOf(fecha[2]));
                            String fecha1 = fecha[1];
                            if (fecha1.equals("ene")) {
                                fecha1 = "01";
                            } else if (fecha1.equals("feb")) {
                                fecha1 = "02";
                            } else if (fecha1.equals("mar")) {
                                fecha1 = "03";
                            } else if (fecha1.equals("abr")) {
                                fecha1 = "04";
                            } else if (fecha1.equals("may")) {
                                fecha1 = "05";
                            } else if (fecha1.equals("jun")) {
                                fecha1 = "06";
                            } else if (fecha1.equals("jul")) {
                                fecha1 = "07";
                            } else if (fecha1.equals("ago")) {
                                fecha1 = "08";
                            } else if (fecha1.equals("sep")) {
                                fecha1 = "09";
                            } else if (fecha1.equals("oct")) {
                                fecha1 = "10";
                            } else if (fecha1.equals("nov")) {
                                fecha1 = "11";
                            } else if (fecha1.equals("dic")) {
                                fecha1 = "12";
                            }

                            fecha1 = String.format("%0" + 2 + "d", Integer.valueOf(fecha1));
                            String fecha0 = String.format("%0" + 2 + "d", Integer.valueOf(fecha[0]));
                            System.out.println(fecha2 + fecha1 + fecha0);
                            obj.FECHAOP = fecha2 + fecha1 + fecha0;
                        }
                        obj.FECINICO = sheet.getCell(9) == null ? "" : sheet.getCell(9).toString().trim();
                        obj.FECFINCO = sheet.getCell(10) == null ? "" : sheet.getCell(10).toString().trim();
                        String HORAVLO = "", PAXF = "", PAXJ = "", PAXY = "", PAX = "", TOTMILL = "", TOTGALO = "", TOTCARG = "", PESO = "", PESOMAX = "";

                        HORAVLO = sheet.getCell(11).toString().trim();
                        obj.HORAVLO = Double.parseDouble(HORAVLO);

                        PAXF = sheet.getCell(12).toString().trim();
                        PAXF = PAXF.replace(".0", "");
                        obj.PAXF = Integer.parseInt(PAXF);

                        PAXJ = sheet.getCell(13).toString().trim();
                        PAXJ = PAXJ.replace(".0", "");
                        obj.PAXJ = Integer.parseInt(PAXJ);

                        PAXY = sheet.getCell(14).toString().trim();
                        PAXY = PAXY.replace(".0", "");
                        obj.PAXY = Integer.parseInt(PAXY);

                        PAX = sheet.getCell(15).toString().trim();
                        PAX = PAX.replace(".0", "");
                        obj.PAX = Integer.parseInt(PAX);

                        TOTMILL = sheet.getCell(16).toString().trim();
                        obj.TOTMILL = Double.parseDouble(TOTMILL);

                        TOTGALO = sheet.getCell(17).toString().trim();
                        obj.TOTGALO = Double.parseDouble(TOTGALO);
                        try {
                            TOTCARG = sheet.getCell(18).toString().trim();
                            obj.TOTCARG = Double.parseDouble(TOTCARG);
                        } catch (Exception a) {
                            obj.TOTCARG = 0.0;
                        }
                        try {
                            PESO = sheet.getCell(19).toString().trim();
                            obj.PESO = Double.parseDouble(PESO);
                        } catch (Exception a) {
                            obj.PESO = 0.0;
                        }
                        try {
                            PESOMAX = sheet.getCell(20).toString().trim();
                            obj.PESOMAX = Double.parseDouble(PESOMAX);
                        } catch (Exception a) {
                            obj.PESOMAX = 0.0;
                        }

                        obj.ESTADO = sheet.getCell(21) == null ? "" : sheet.getCell(21).toString().trim().toUpperCase();
                        if (obj.ESTADO.equals("ACTIVO")) {
                            obj.ESTADO = "1";
                        } else {
                            obj.ESTADO = "";
                        }
                        System.out.println("Registro" + cont);
                        lstAircraft.add(obj);

                    }
                }
            }

            logic = new CouponErrorsLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (lstAircraft.size() > 0) {
                msj = logic.loadSQP04933(lstAircraft);
            }
            map.put("success", true);
            map.put("msj", msj);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        String fileNameDownload = String.format("Flown ST7 Errors - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            // Obtener filtro
            A1702Filter filter = new A1702Filter();
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            filter.IN_ERRORCODE = request.getParameter("IN_ERRORCODE");

            // Lógica de negocio
            logic = new CouponErrorsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1702Filter> listaData = logic.loadPX102S01A1702(filter);

            System.out.println("Total registros recibidos: " + listaData.size());
            if (listaData.isEmpty()) {
                System.out.println("No se encontraron registros.");
            }

            for (A1702Filter item : listaData) {
                System.out.println("TIP: " + item.A2543TIP +
                                   ", PROCESS: " + item.A2543PROCESS +
                                   ", COD: " + item.A2543COD +
                                   ", DES: " + item.A2543DES);
            }

            // Crear el libro y hoja
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("BPO Flown Coupon Errors");

            // Estilos
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

            // Crear encabezados
            int vj = 0;
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Nbr");

            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Process");

            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Error Code");

            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Error Description");

            // Unir celdas para encabezado
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);

            vj++;

            // Llenar datos
            for (int i = 0; i < listaData.size(); i++) {
                A1702Filter data = listaData.get(i);
                row = sheet.createRow(vj);

                Cell cell00 = row.createCell(0);
                Cell cell01 = row.createCell(1);
                Cell cell02 = row.createCell(2);
                Cell cell03 = row.createCell(3);

                // Nbr = i + 1
                cell00.setCellValue(i + 1);
                cell01.setCellValue(data.A2543PROCESS);
                cell02.setCellValue(data.A2543COD);
                cell03.setCellValue(data.A2543DES);

                cell00.setCellStyle(bodyStyle);
                cell01.setCellStyle(bodyStyle);
                cell02.setCellStyle(bodyStyle);
                cell03.setCellStyle(bodyStyle);

                vj++;
            }

            // Ajustar ancho de columnas
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);

            // Preparar respuesta
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            // Escribir archivo al OutputStream
            workbook.write(response.getOutputStream());
            workbook.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }


}
