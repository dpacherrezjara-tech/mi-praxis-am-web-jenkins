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
import com.monitorjbl.xlsx.StreamingReader;
import java.io.File;
import java.io.FileOutputStream;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ADJMassiveaccountingFormLogic;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import net.miatech.beans.A3344Filter;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/ADJMassiveaccountingForm")
public class ADJMassiveaccountingFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ADJMassiveaccountingFormLogic logic;

    private static final Pattern DATE_PATTERN = Pattern.compile("\\d{8}"); // YYYYMMDD pattern

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A3344Filter> lst;
        A3344Filter filter = new A3344Filter();

        try {
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VL_DATEFROM = request.getParameter("VL_DATEFROM");
            filter.VL_DATETO = request.getParameter("VL_DATETO");
            filter.VP_TKT = request.getParameter("VP_TKT");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_USER = request.getParameter("VP_USER");
            filter.VP_FUENT = request.getParameter("VP_FUENT");
            filter.VP_STAS = request.getParameter("VP_STAS");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_SEQ = request.getParameter("VP_SEQ");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ListAdjmassive")
    public @ResponseBody
    String ListAdjmassive(ModelMap map, HttpServletRequest request) {
        List<A3344Filter> lst;
        A3344Filter filter = new A3344Filter();

        try {
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.ListAdjmassive(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTKT")
    public @ResponseBody
    String insertTKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A3344Filter> gridData = new ArrayList<A3344Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A3344Filter data = new A3344Filter();
                data.A3344CIA = gsonObj.get("A3344CIA").getAsString();
                data.A3344FORMA = gsonObj.get("A3344FORMA").getAsString();
                data.A3344SERIE = gsonObj.get("A3344SERIE").getAsString();
                data.A3344SEQ = gsonObj.get("A3344SEQ").getAsString();
                data.A3344CPN = gsonObj.get("A3344CPN").getAsString();
                data.A3344TNC = gsonObj.get("A3344TNC").getAsString();
                data.A3344CRRL = gsonObj.get("A3344CRRL").getAsString();
                gridData.add(data);

            }
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "DeleteContabili")
    public @ResponseBody
    String DeleteContabili(ModelMap map, HttpServletRequest request) {
        A3344Filter lst;
        A3344Filter filter = new A3344Filter();

        try {
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.lst_delete(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validar_excel_adjmassive_sale", method = RequestMethod.POST)
    public @ResponseBody
    String validar_excel_adjmassive_sale(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A3344Filter filter = new A3344Filter();
        ArrayList<A3344Filter> lstGeneral = new ArrayList<A3344Filter>(0);
        A3344Filter fileA3344;
        String mensaje = "";
        Integer cont1 = 0;
        String vl_A3344TKT = "";
        double vl_A3344DBLOC = 0;
        double vl_A3344CRLOC = 0;
        double vl_A3344DBREV = 0;
        double vl_A3344CRREV = 0;

        double vl_A3344DBLOC_GL = 0;
        double vl_A3344CRLOC_GL = 0;
        double vl_A3344DBREV_GL = 0;
        double vl_A3344CRREV_GL = 0;
        double vl_A3344DBLOC_AR = 0;
        double vl_A3344CRLOC_AR = 0;
        double vl_A3344DBREV_AR = 0;
        double vl_A3344CRREV_AR = 0;
        double vl_A3344DBLOC_AP = 0;
        double vl_A3344CRLOC_AP = 0;
        double vl_A3344DBREV_AP = 0;
        double vl_A3344CRREV_AP = 0;
        String vl_fuente = "";
        String vl_sufuente = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            DecimalFormat formatter = new DecimalFormat(".##");
            formatter.setRoundingMode(RoundingMode.HALF_UP);

            String filename = excelfile.getOriginalFilename();

            StreamingReader sr = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .sheetIndex(0)
                    .read(excelfile.getInputStream());
            for (Row currentRow : sr) {
                fileA3344 = new A3344Filter();
                if (currentRow.getRowNum() > 0) {
                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA3344.A3344CCUST = "139";
                        fileA3344.VP_TYPE = filter.VP_OPTION;
                        //obteniendo el TKT
                        fileA3344.A3344TKT = currentRow.getCell(0).getStringCellValue();
                        if (fileA3344.A3344TKT.equals("")) {
                            mensaje = "Ticket Number Required";
                            break;
                        }
                        if (fileA3344.A3344TKT.length() != 13) {
                            mensaje = "THE Ticket MUST BE 13 CHARACTERES  " + fileA3344.A3344TKT;
                            break;
                        }
                        if (!containsOnlyNumbers(fileA3344.A3344TKT)) {
                            mensaje = "THE Ticket MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344TKT;
                        }
                        //seq
                        if (currentRow.getCell(1) == null) {
                            mensaje = "Seq Number Required";
                            break;
                        } else {
                            fileA3344.A3344SEQ = currentRow.getCell(1).getStringCellValue();
                            if (fileA3344.A3344SEQ.equals("")) {
                                mensaje = "Sale Date  OR USE Required";
                                break;
                            }
                            if (fileA3344.A3344SEQ.length() != 8) {
                                mensaje = "SALE DATE OR USE  MUST BE 8 CHARACTERES  " + fileA3344.A3344SEQ;
                                break;
                            }
                            if (!isValidDate(fileA3344.A3344SEQ)) {
                                mensaje = "Fecha no válida: " + fileA3344.A3344SEQ + " El formato correcto es: YYYYMMDD.";
                                break;
                            }
                        }
                        //cpn
                        if (currentRow.getCell(2) == null) {
                            mensaje = "Cupón Number Required";
                            break;
                        } else {
                            fileA3344.A3344CPN = currentRow.getCell(2).getStringCellValue();
                            if (fileA3344.A3344CPN.equals("")) {
                                mensaje = "Cupón Number Required";
                                break;
                            }
                            if (fileA3344.A3344CPN.length() != 1) {
                                mensaje = "THE Cupón MUST BE 1 CHARACTERES  " + fileA3344.A3344CPN;
                                break;
                            }
                        }
                        //Transaction_type_code
                        if (currentRow.getCell(3) == null) {
                            mensaje = "Transaction type Required";
                            break;
                        } else {
                            fileA3344.A3344TRNCU = currentRow.getCell(3).getStringCellValue();
                            if (fileA3344.A3344TRNCU.equals("")) {
                                mensaje = "Transaction type Required";
                                break;
                            }
                            if (filter.VP_OPTION.equals("IXP")) {
                                if (fileA3344.A3344TRNCU.length() != 3) {
                                    mensaje = "THE Transaction type MUST BE 3 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            } else {
                                if (fileA3344.A3344TRNCU.length() != 4) {
                                    mensaje = "THE Transaction type MUST BE 4 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            }
                        }
                        //pais solo para ventas y caducos
                        fileA3344.A3344PAIS = currentRow.getCell(4) == null ? "" : currentRow.getCell(4).getStringCellValue();
                        if (fileA3344.A3344PAIS.equals("")) {
                            mensaje = "Country Required";
                            break;
                        }
                        if (fileA3344.A3344PAIS.length() != 2) {
                            mensaje = "THE Country MUST BE 2 CHARACTERES  " + fileA3344.A3344PAIS;
                            break;
                        }
                        if (!fileA3344.A3344PAIS.matches("[a-zA-Z]+")) {
                            mensaje = "THE Country IS NOT VALID  " + fileA3344.A3344PAIS;
                            break;
                        }
                        //fuente solo para ventas y caducos
                        fileA3344.A3344FUENT = currentRow.getCell(5) == null ? "" : currentRow.getCell(5).getStringCellValue();
                        if (fileA3344.A3344FUENT.equals("")) {
                            mensaje = "Source Required";
                            break;
                        }
                        if (fileA3344.A3344FUENT.length() != 3) {
                            mensaje = "THE Source MUST BE 3 CHARACTERES  " + fileA3344.A3344FUENT;
                            break;
                        }
                        if (!fileA3344.A3344FUENT.equals("BSP") && !fileA3344.A3344FUENT.equals("ASR") && !fileA3344.A3344FUENT.equals("ARC") && !fileA3344.A3344FUENT.equals("MAN")) {
                            mensaje = "The source of sale must be ASR OR BSP OR MAN OR ARC  " + fileA3344.A3344FUENT;
                            break;
                        }
                        //sub_fuente solo para ventas y caducos
                        fileA3344.A3344SUBFU = currentRow.getCell(6) == null ? "" : currentRow.getCell(6).getStringCellValue();
                        if (!filter.VP_OPTION.equals("DISC")) {
                            if (fileA3344.A3344SUBFU.equals("")) {
                                mensaje = "Channel Required";
                                break;
                            }
                            if (fileA3344.A3344SUBFU.length() != 3) {
                                mensaje = "THE Channel MUST BE 3 CHARACTERES  " + fileA3344.A3344SUBFU;
                                break;
                            }

                        }
                        //CARRIER solo para ventas y caducos
                        fileA3344.A3344CARRIR = currentRow.getCell(7) == null ? "" : currentRow.getCell(7).getStringCellValue();
                        if (filter.VP_OPTION.equals("DISC")) {
                            if (fileA3344.A3344CARRIR.equals("")) {
                                mensaje = "Carrier Required";
                                break;
                            }
                            if (fileA3344.A3344CARRIR.length() != 2) {
                                mensaje = "THE Carrier MUST BE 2 CHARACTERES  " + fileA3344.A3344CARRIR;
                                break;
                            }
                            if (!fileA3344.A3344CARRIR.equals("5D") && !fileA3344.A3344CARRIR.equals("AM")) {
                                mensaje = "THE Carrier 5D OR AM  " + fileA3344.A3344CARRIR;
                                break;
                            }
                        }

                        //Concepto 1 solo para ventas y caducos
                        fileA3344.A3344CONP1 = currentRow.getCell(8) == null ? "" : currentRow.getCell(8).getStringCellValue();
                        if (fileA3344.A3344CONP1.equals("")) {
                            mensaje = "Concepto 1 Required";
                            break;
                        }
                        if (!filter.VP_OPTION.equals("DISC")) {
                            if (!fileA3344.A3344CONP1.trim().equals("FP") && !fileA3344.A3344CONP1.trim().equals("TX") && !fileA3344.A3344CONP1.trim().equals("FA") && !fileA3344.A3344CONP1.trim().equals("CM")) {
                                mensaje = "The Concept 1 has to be FP or FA  or TX or CM";
                                break;
                            }
                        }
                        /// concepto 2
                        fileA3344.A3344CONP2 = currentRow.getCell(9) == null ? "" : currentRow.getCell(9).getStringCellValue().trim();
                        if (!filter.VP_OPTION.equals("DISC")) {
                            if (fileA3344.A3344CONP2.equals("")) {
                                mensaje = "Concepto 2 Required";
                                break;
                            }
                        }
                        /// concepto 3
                        fileA3344.A3344CONP3 = currentRow.getCell(10) == null ? "" : currentRow.getCell(10).getStringCellValue().trim();
                        //Document type  TKT  
                        fileA3344.A3344TDOC = currentRow.getCell(11) == null ? "" : currentRow.getCell(11).getStringCellValue();
                        if (fileA3344.A3344TDOC.equals("")) {
                            mensaje = "Document type  Required";
                            break;
                        }
                        //CUENTA 
                        fileA3344.A3344CTAC = currentRow.getCell(12) == null ? "" : currentRow.getCell(12).getStringCellValue();
                        if (fileA3344.A3344CTAC.equals("")) {
                            mensaje = "Cuenta  Required";
                            break;
                        }
                        if (fileA3344.A3344CTAC.length() != 36) {
                            mensaje = "THE Cuenta MUST BE 36 CHARACTERES  " + fileA3344.A3344CTAC;
                            break;
                        }
                        if (!isValidCuenta(fileA3344.A3344CTAC)) {
                            mensaje = "THE Cuenta IS NOT VALID  " + fileA3344.A3344CTAC;
                            break;
                        }
                        //TITULO 
                        fileA3344.A3344TITUC = currentRow.getCell(13) == null ? "" : currentRow.getCell(13).getStringCellValue();
                        if (fileA3344.A3344TITUC.equals("")) {
                            mensaje = "Titulo  Required";
                            break;
                        }
                        if (fileA3344.A3344TITUC.length() > 30) {
                            mensaje = "THE Titulo MUST BE 30 CHARACTERES  " + fileA3344.A3344TITUC;
                            break;
                        }
                        //tipo de poliza
                        fileA3344.A3344FILE = currentRow.getCell(14) == null ? "" : currentRow.getCell(14).getStringCellValue();
                        if (fileA3344.A3344FILE.equals("")) {
                            mensaje = "File  Required";
                            break;
                        }
                        if (fileA3344.A3344FILE.length() != 2) {
                            mensaje = "THE FILE MUST BE 2 CHARACTERES  " + fileA3344.A3344FILE;
                            break;
                        }
                        if (!fileA3344.A3344FILE.equals("AP") && !fileA3344.A3344FILE.equals("AR") && !fileA3344.A3344FILE.equals("GL")) {
                            mensaje = "THE FILE AR or AP or GL  " + fileA3344.A3344FILE;
                            break;
                        }
                        //marca de la poliza
                        fileA3344.A3344MARCA = currentRow.getCell(15) == null ? "" : currentRow.getCell(15).getStringCellValue();
                        if (!fileA3344.A3344MARCA.equals("")) {
                            if (filter.VP_OPTION.equals("FLWN")) {
                                fileA3344.A3344MARCA = "X";
                            } else {
                                fileA3344.A3344MARCA = "P";
                            }
                        }
                        if (filter.VP_OPTION.equals("SALE")) {
                            if (fileA3344.A3344CTAC.equals("02-0000000-0000-115301-0000-0000-00") || fileA3344.A3344CTAC.equals("02-0000000-0000-115410-0000-0000-00")
                                    || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-03") || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-06")
                                    || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-30") || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-08")
                                    || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-09") || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-13")
                                    || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-14") || fileA3344.A3344CTAC.equals("03-0000000-1MX1-217102-0000-0000-02")
                                    || fileA3344.A3344CTAC.equals("06-0000000-1MX1-217102-0000-0000-02") //|| fileA3344.A3344CTAC.equals("07-00-000000-0000-2131-24702-0000-02") comentado por restructura contable
                                    || fileA3344.A3344CTAC.equals("08-0000000-1MX1-217102-0000-0000-02") || fileA3344.A3344CTAC.equals("09-0000000-1MX1-217102-0000-0000-02")
                                    || fileA3344.A3344CTAC.equals("13-0000000-1MX1-217102-0000-0000-02") || fileA3344.A3344CTAC.equals("14-0000000-1MX1-217102-0000-0000-02")
                                    || fileA3344.A3344CTAC.equals("02-0000000-1MX1-116103-0000-0000-04") || fileA3344.A3344CTAC.equals("04-0000000-1MX1-217102-0000-0000-02")
                                    || fileA3344.A3344CTAC.equals("06-0000000-0000-115311-0000-0000-00")) {
                                fileA3344.A3344MARCA = "P";
                            } else if (!fileA3344.A3344MARCA.equals("")) {
                                fileA3344.A3344MARCA = "P";
                            } else {
                                fileA3344.A3344MARCA = "";
                            }
                        }

                        //cliente
                        fileA3344.A3344CLIEN = currentRow.getCell(16) == null ? "" : currentRow.getCell(16).getStringCellValue();
                        if (fileA3344.A3344FILE.equals("AR")) {
                            if (fileA3344.A3344CLIEN.equals("")) {
                                mensaje = "MUST ENTER THE Client OF AR  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (!fileA3344.A3344CLIEN.equals("")) {
                                if (fileA3344.A3344CLIEN.length() > 5) {
                                    mensaje = " THE CLIENT MUST BE 5 CHARACTERES" + fileA3344.A3344TKT;
                                    break;
                                }
                                if (!containsOnlyNumbers(fileA3344.A3344CLIEN)) {
                                    mensaje = "THE CLIENT MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344CLIEN;
                                    break;
                                }
                            }
                        }
                        //provedor
                        fileA3344.A3344PROVE = currentRow.getCell(17) == null ? "" : currentRow.getCell(17).getStringCellValue();
                        if (fileA3344.A3344PROVE.equals("AP")) {
                            if (fileA3344.A3344PROVE.equals("")) {
                                mensaje = "MUST ENTER THE PROVIDER OF AP  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (!fileA3344.A3344PROVE.equals("")) {
                                if (fileA3344.A3344PROVE.length() != 4) {
                                    mensaje = " THE PROVIDER MUST BE 4 CHARACTERES" + fileA3344.A3344TKT;
                                    break;
                                }
                            }
                        }
                        //direccion
                        fileA3344.A3344DIREC = currentRow.getCell(18) == null ? "" : currentRow.getCell(18).getStringCellValue();
                        //direccion
                        fileA3344.A3344ORAC = currentRow.getCell(19) == null ? "" : currentRow.getCell(19).getStringCellValue();
                        if (fileA3344.A3344FILE.equals("AR")) {
                            if (fileA3344.A3344DIREC.equals("")) {
                                mensaje = "MUST ENTER THE ADRESS OF AR  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (fileA3344.A3344ORAC.equals("")) {
                                mensaje = "MUST ENTER THE DOC. ORACLE OF AR  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //mda
                        fileA3344.A3344MDA = currentRow.getCell(20) == null ? "" : currentRow.getCell(20).getStringCellValue();
                        if (fileA3344.A3344MDA.equals("")) {
                            mensaje = "MUST ENTER THE Currency  " + fileA3344.A3344TKT;
                            break;
                        }
                        //MONTO_ACTIVO_LOCAL
                        if (!isParsableToDouble(currentRow.getCell(21).getStringCellValue())) {
                            mensaje = "THE MONTO_ACTIVO_LOCAL IS NOT VALID: " + currentRow.getCell(21).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344DBLOC = currentRow.getCell(21) == null ? 0 : Double.parseDouble(currentRow.getCell(21).getStringCellValue());
                        //MONTO_PASIVO_LOCAL
                        if (!isParsableToDouble(currentRow.getCell(22).getStringCellValue())) {
                            mensaje = "THE MONTO_PASIVO_LOCAL IS NOT VALID: " + currentRow.getCell(22).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344CRLOC = currentRow.getCell(22) == null ? 0 : Double.parseDouble(currentRow.getCell(22).getStringCellValue());
                        //MONTO_ACTIVO_REVENUE
                        if (!isParsableToDouble(currentRow.getCell(23).getStringCellValue())) {
                            mensaje = "THE MONTO_ACTIVO_REVENUE IS NOT VALID: " + currentRow.getCell(23).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344DBREV = currentRow.getCell(23) == null ? 0 : Double.parseDouble(currentRow.getCell(23).getStringCellValue());
                        //MONTO_PASIVO_REVUE
                        if (!isParsableToDouble(currentRow.getCell(24).getStringCellValue())) {
                            mensaje = "THE MONTO_PASIVO_REVUE IS NOT VALID: " + currentRow.getCell(24).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344CRREV = currentRow.getCell(24) == null ? 0 : Double.parseDouble(currentRow.getCell(24).getStringCellValue());
                        //TKT REFERECIA
                        fileA3344.A3344TKTAS = currentRow.getCell(25) == null ? "" : currentRow.getCell(25).getStringCellValue();
                        //TKT_SEQ_REFEREC
                        fileA3344.A3344ASSEQ = currentRow.getCell(26) == null ? "" : currentRow.getCell(26).getStringCellValue();
                        if (fileA3344.A3344TRNCU.equals("EXCP")) {
                            if (fileA3344.A3344TKTAS.equals("")) {
                                mensaje = "TKT REFERENCIA  Required " + fileA3344.A3344TKT;
                                break;
                            }
                            if (fileA3344.A3344TKTAS.length() != 10) {
                                mensaje = "THE TKT REFERENCIA MUST BE 10 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }

                            if (fileA3344.A3344ASSEQ.equals("")) {
                                mensaje = "TKT SEQ REFEREC  Required";
                                break;
                            }
                            if (fileA3344.A3344ASSEQ.length() != 2) {
                                mensaje = "THE TKT SEQ REFEREC MUST BE 10 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //TYPE_TRANSACA
                        fileA3344.A3344ESTTR = currentRow.getCell(27) == null ? "" : currentRow.getCell(27).getStringCellValue();
                        if (!fileA3344.A3344ESTTR.equals("")) {
                            if (fileA3344.A3344ESTTR.equals("")) {
                                mensaje = "TYPE TRANSACTION Required";
                                break;
                            }
                            if (fileA3344.A3344ESTTR.length() != 1) {
                                mensaje = "THE TYPE TRANSACTION MUST BE 1 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (fileA3344.A3344TKTVO.equals("")) {
                                mensaje = "ANAULAR  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTVO.length() != 1) {
                                mensaje = "THE ANAULAR BE 1 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //ANAULAR
                        fileA3344.A3344TKTVO = currentRow.getCell(28) == null ? "" : currentRow.getCell(28).getStringCellValue();
                        //IMPORTE_LOCAL
                        if (!isParsableToDouble(currentRow.getCell(29).getStringCellValue())) {
                            mensaje = "THE IMPORTE_LOCAL IS NOT VALID: " + currentRow.getCell(29).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344VLTAX = currentRow.getCell(29) == null ? 0 : Double.parseDouble(currentRow.getCell(29).getStringCellValue());
                        //IMPORTE_REVENUE
                        if (!isParsableToDouble(currentRow.getCell(30).getStringCellValue())) {
                            mensaje = "THE IMPORTE_REVENUE IS NOT VALID: " + currentRow.getCell(30).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344VLTAR = currentRow.getCell(30) == null ? 0 : Double.parseDouble(currentRow.getCell(30).getStringCellValue());
                        //AFFECTATION IATA
                        fileA3344.A3344IATAU = currentRow.getCell(31) == null ? "" : currentRow.getCell(31).getStringCellValue();
                        //TIPO_TARJ
                        fileA3344.A3344TTARJ = currentRow.getCell(32) == null ? "" : currentRow.getCell(32).getStringCellValue();
                        if (!fileA3344.A3344TTARJ.equals("")) {
                            if (fileA3344.A3344TTARJ.length() > 2) {
                                mensaje = "THE TYPE CARD MUST BE 2 CHARACTERES  " + fileA3344.A3344TTARJ;
                                break;
                            }
                        }
                        //NUMERO_ATRJETA
                        fileA3344.A3344NTARJ = currentRow.getCell(33) == null ? "" : currentRow.getCell(33).getStringCellValue();
                        if (!fileA3344.A3344NTARJ.equals("")) {
                            if (fileA3344.A3344NTARJ.length() > 19) {
                                mensaje = "THE CARD NUMBER MUST BE 19 CHARACTERES  " + fileA3344.A3344NTARJ;
                                break;
                            }
                        }
                        //JUSTICACION
                        fileA3344.A3344DESCR = currentRow.getCell(34) == null ? "" : currentRow.getCell(34).getStringCellValue();
                        //IATA_VENTA
                        fileA3344.A3344AGENT = currentRow.getCell(35) == null ? "" : currentRow.getCell(35).getStringCellValue();
                        //TIPO DE CAMBIO
                        if (!isParsableToDouble(currentRow.getCell(36).getStringCellValue())) {
                            mensaje = "THE TIPO DE CAMBIO IS NOT VALID: " + currentRow.getCell(36).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344TCAMB = currentRow.getCell(36) == null ? 0 : Double.parseDouble(currentRow.getCell(36).getStringCellValue());
                        ///FECHA DE PROCESO
                        fileA3344.A3344FPROC = currentRow.getCell(37) == null ? "" : currentRow.getCell(37).getStringCellValue();
                        if (fileA3344.A3344TRNCU.equals("SALE") && !isValidDate(fileA3344.A3344FPROC)) {
                            mensaje = "Fecha de Proceso no válida: " + fileA3344.A3344FPROC + ". El formato correcto es: YYYYMMDD.";
                            break;
                        }
                        //VALIDACION DEL PROCESO
                        if (fileA3344.A3344TRNCU.equals("EXCP")) {
                            if (fileA3344.A3344TKTAS.equals("")) {
                                mensaje = "TKT REFERENCIA  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTAS.length() != 10) {
                                mensaje = "THE TKT REFERENCIA MUST BE 10 CHARACTERES  " + fileA3344.A3344TKTAS;
                                break;
                            }

                            if (fileA3344.A3344ASSEQ.equals("")) {
                                mensaje = "TKT SEQ REFEREC  Required";
                                break;
                            }
                            if (fileA3344.A3344ASSEQ.length() != 2) {
                                mensaje = "THE TKT SEQ REFEREC MUST BE 10 CHARACTERES  " + fileA3344.A3344ASSEQ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344ESTTR.equals("")) {
                            if (fileA3344.A3344ESTTR.equals("")) {
                                mensaje = "TYPE TRANSACTION Required";
                                break;
                            }
                            if (fileA3344.A3344ESTTR.length() != 1) {
                                mensaje = "THE TYPE TRANSACTION MUST BE 1 CHARACTERES  " + fileA3344.A3344ESTTR;
                                break;
                            }
                            if (fileA3344.A3344TKTVO.equals("")) {
                                mensaje = "ANAULAR  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTVO.length() != 1) {
                                mensaje = "THE ANAULAR BE 1 CHARACTERES  " + fileA3344.A3344TKTVO;
                                break;
                            }
                        }

                        if (fileA3344.A3344IATAU.equals("")) {
                            mensaje = "AFFECTATION IATA  Required";
                            break;
                        }
                        if (!containsOnlyNumbers(fileA3344.A3344IATAU)) {
                            mensaje = "THE AFFECTATION IATA MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344IATAU;
                            break;
                        }
                        if (fileA3344.A3344IATAU.length() != 8) {
                            mensaje = "THE AFFECTATION IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344IATAU;
                            break;
                        }

                        if (!fileA3344.A3344TTARJ.equals("")) {
                            if (fileA3344.A3344TTARJ.length() > 2) {
                                mensaje = "THE TYPE CARD MUST BE 2 CHARACTERES  " + fileA3344.A3344TTARJ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344NTARJ.equals("")) {
                            if (fileA3344.A3344NTARJ.length() > 19) {
                                mensaje = "THE CARD NUMBER MUST BE 19 CHARACTERES  " + fileA3344.A3344NTARJ;
                                break;
                            }
                        }

                        if (fileA3344.A3344DESCR.equals("")) {
                            mensaje = "JUSTICACION  Required";
                            break;
                        }
                        if (fileA3344.A3344DESCR.length() > 200) {
                            mensaje = "THE JUSTICACION MUST BE 200 CHARACTERES  " + fileA3344.A3344DESCR;
                            break;
                        }
                        if (fileA3344.A3344AGENT.equals("")) {
                            mensaje = "IATA  Required" + fileA3344.A3344AGENT;
                            break;
                        }
                        if (fileA3344.A3344AGENT.length() != 8) {
                            mensaje = "THE IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344AGENT;
                            break;
                        }
                        if (!containsOnlyNumbers(fileA3344.A3344AGENT)) {
                            mensaje = "THE IATA MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344AGENT;
                            break;
                        }

                        //validacion para volados
                        if (cont1 == 1) {
                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ;//+ "" + fileA3344.A3344CPN;
                            vl_fuente = fileA3344.A3344FUENT;
                            vl_sufuente = fileA3344.A3344SUBFU;
                        }
                        if (cont1 == 1) {
                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ; //+ "" + fileA3344.A3344CPN;
                            vl_fuente = fileA3344.A3344FUENT;
                            vl_sufuente = fileA3344.A3344SUBFU;
                        }

                        if (!vl_A3344TKT.equals(fileA3344.A3344TKT + "" + fileA3344.A3344SEQ/* + "" + fileA3344.A3344CPN*/)) {

                            if (!formatter.format(vl_A3344DBLOC).equals(formatter.format(vl_A3344CRLOC))) {
                                mensaje = "The Pasivo Local Amount must be equal to the credito Local Amount " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV).equals(formatter.format(vl_A3344CRREV))) {
                                mensaje = "The Pasivo Revenue Amount must be equal to the credito Revenue Amount " + vl_A3344DBREV + " - " + vl_A3344CRREV + " - " + vl_A3344TKT;
                                break;
                            }

                            if (!formatter.format(vl_A3344DBLOC_GL).equals(formatter.format(vl_A3344CRLOC_GL))) {
                                mensaje = "The Pasivo Local Amount GL must be equal to the credito Local GL Amount " + vl_A3344DBLOC_GL + " - " + vl_A3344CRLOC_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV_GL).equals(formatter.format(vl_A3344CRREV_GL))) {
                                mensaje = "The Pasivo Revenue Amount GL must be equal to the credito Revenue GL Amount " + vl_A3344DBREV_GL + " - " + vl_A3344CRREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBLOC_AR).equals(formatter.format(vl_A3344CRLOC_AR))) {
                                mensaje = "The Pasivo Local Amount AR must be equal to the credito Local AR Amount " + vl_A3344DBLOC_GL + " - " + vl_A3344DBREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV_AR).equals(formatter.format(vl_A3344CRREV_AR))) {
                                mensaje = "The Pasivo Revenue Amount AR must be equal to the credito Revenue AR Amount  " + vl_A3344CRLOC_GL + " - " + vl_A3344CRREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBLOC_AP).equals(formatter.format(vl_A3344CRLOC_AP))) {
                                mensaje = "The Pasivo Local Amount AP must be equal to the credito Local AP Amount " + vl_A3344DBLOC_GL + " - " + vl_A3344DBREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV_AP).equals(formatter.format(vl_A3344CRREV_AP))) {
                                mensaje = "The Pasivo Revenue Amount AP must be equal to the credito Revenue AP Amount " + vl_A3344CRLOC_GL + " - " + vl_A3344CRREV_GL + " - " + vl_A3344TKT;
                                break;
                            }

                            vl_A3344DBLOC = 0;
                            vl_A3344CRLOC = 0;
                            vl_A3344DBREV = 0;
                            vl_A3344CRREV = 0;

                            vl_A3344DBLOC_GL = 0;
                            vl_A3344CRLOC_GL = 0;
                            vl_A3344DBREV_GL = 0;
                            vl_A3344CRREV_GL = 0;
                            vl_A3344DBLOC_AR = 0;
                            vl_A3344CRLOC_AR = 0;
                            vl_A3344DBREV_AR = 0;
                            vl_A3344CRREV_AR = 0;
                            vl_A3344DBLOC_AP = 0;
                            vl_A3344CRLOC_AP = 0;
                            vl_A3344DBREV_AP = 0;
                            vl_A3344CRREV_AP = 0;

                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + fileA3344.A3344DBREV;
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            /**
                             * nuew procedimiento
                             */
                            vl_fuente = fileA3344.A3344FUENT.trim();
                            vl_sufuente = fileA3344.A3344SUBFU.trim();

                            if (fileA3344.A3344FILE.equals("GL")) {
                                vl_A3344DBLOC_GL = vl_A3344DBLOC_GL + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_GL = vl_A3344CRLOC_GL + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_GL = vl_A3344DBREV_GL + fileA3344.A3344DBREV;
                                vl_A3344CRREV_GL = vl_A3344CRREV_GL + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AR")) {
                                vl_A3344DBLOC_AR = vl_A3344DBLOC_AR + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AR = vl_A3344CRLOC_AR + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AR = vl_A3344DBREV_AR + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AR = vl_A3344CRREV_AR + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AP")) {
                                vl_A3344DBLOC_AP = vl_A3344DBLOC_AP + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AP = vl_A3344CRLOC_AP + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AP = vl_A3344DBREV_AP + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AP = vl_A3344CRREV_AP + fileA3344.A3344CRREV;
                            }
                            /*fin del procedimiento*/

                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ; //+ "" + fileA3344.A3344CPN;
                        } else {

                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + fileA3344.A3344DBREV;
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            if (fileA3344.A3344FUENT.equals("vl_fuente")) {
                                mensaje = " two different sources for the same ticket  " + fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                                break;
                            }
                            if (fileA3344.A3344SUBFU.equals("vl_sufuente")) {
                                mensaje = " two different channel for the same ticket  " + fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                                break;
                            }

                            if (fileA3344.A3344FILE.equals("GL")) {
                                vl_A3344DBLOC_GL = vl_A3344DBLOC_GL + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_GL = vl_A3344CRLOC_GL + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_GL = vl_A3344DBREV_GL + fileA3344.A3344DBREV;
                                vl_A3344CRREV_GL = vl_A3344CRREV_GL + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AR")) {
                                vl_A3344DBLOC_AR = vl_A3344DBLOC_AR + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AR = vl_A3344CRLOC_AR + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AR = vl_A3344DBREV_AR + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AR = vl_A3344CRREV_AR + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AP")) {
                                vl_A3344DBLOC_AP = vl_A3344DBLOC_AP + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AP = vl_A3344CRLOC_AP + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AP = vl_A3344DBREV_AP + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AP = vl_A3344CRREV_AP + fileA3344.A3344CRREV;
                            }

                        }

                        lstGeneral.add(fileA3344);

                    }

                }
            }
            if (mensaje.equals("")) {
                mensaje = logic.subirExcel(lstGeneral, filter.VP_OPTION, filename);
            }
            map.put("success", true);
            map.put("result", mensaje);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validar_excel_adjmassive", method = RequestMethod.POST)
    public @ResponseBody
    String validar_excel_adjmassive(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A3344Filter filter = new A3344Filter();
        ArrayList<A3344Filter> lstGeneral = new ArrayList<A3344Filter>(0);
        A3344Filter fileA3344;
        String mensaje = "";
        String vl_A3344TKT = "";
        String VP_A3344TKT;
        double vl_A3344DBLOC = 0;
        double vl_A3344CRLOC = 0;
        double vl_A3344DBREV = 0;
        double vl_A3344CRREV = 0;
        double vl_A3344TCAMB = 0;
        double vl_A3344CTAC_AR114113833 = 0;
        double vl_A3344CTAC_GL114113833 = 0;
        double vl_A3344CTAC_GL213124704 = 0;
        double vl_A3344CTAC_AP213124704 = 0;
        double vl_CTACAP_A3344DBREV = 0;
        double vl_CTACAP_A3344CRREV = 0;
        double vl_CTACAR_A3344DBREV = 0;
        double vl_CTACAR_A3344CRREV = 0;

        double vl_CTACAR_114113833CRREV = 0;
        double vl_CTACAR_114113833DBREV = 0;
        double vl_CTACAR_213124704DBREV = 0;
        double vl_CTACAP_213124704DBREV = 0;
        double vl_CTA02_DBREV = 0;
        double vl_CTA02_CRREV = 0;
        double vl_CTA03_DBREV = 0;
        double vl_CTA03_CRREV = 0;

        double vl_A3344DBLOC5D = 0;
        double vl_A3344CRLOC5D = 0;
        double vl_A3344DBREV5D = 0;
        double vl_A3344CRREV5D = 0;

        double vl_A3344DBLOCAM = 0;
        double vl_A3344CRLOCAM = 0;
        double vl_A3344DBREVAM = 0;
        double vl_A3344CRREVAM = 0;
        Integer cont1 = 0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            DecimalFormat formatter = new DecimalFormat(".##");
            formatter.setRoundingMode(RoundingMode.HALF_UP);

            String filename = excelfile.getOriginalFilename();

            StreamingReader sr = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .sheetIndex(0)
                    .read(excelfile.getInputStream());

            for (Row currentRow : sr) {
                fileA3344 = new A3344Filter();
                if (currentRow.getRowNum() > 0) {
                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA3344.A3344CCUST = "139";
                        fileA3344.VP_TYPE = filter.VP_OPTION;
                        //obteniendo el TKT
                        fileA3344.A3344TKT = currentRow.getCell(0).getStringCellValue();
                        if (fileA3344.A3344TKT.equals("")) {
                            mensaje = "Ticket Number Required";
                            break;
                        }
                        if (fileA3344.A3344TKT.length() != 13) {
                            mensaje = "THE Ticket MUST BE 13 CHARACTERES  " + fileA3344.A3344TKT;
                            break;
                        }
                        if (!containsOnlyNumbers(fileA3344.A3344TKT)) {
                            mensaje = "THE Ticket MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344TKT;
                        }
                        //seq
                        if (currentRow.getCell(1) == null) {
                            mensaje = "required field flown or IXP sale date and Retention Date for IXC";
                            break;
                        } else {
                            fileA3344.A3344SEQ = currentRow.getCell(1).getStringCellValue();
                            if (fileA3344.A3344SEQ.equals("")) {
                                mensaje = "required field flown or IXP sale date and Retention Date for IXC";
                                break;
                            }
                            if (fileA3344.A3344SEQ.length() != 8) {
                                mensaje = "THE sale date or retention date MUST BE 8 CHARACTERES  " + fileA3344.A3344SEQ;
                                break;
                            }
                            if (!isValidDate(fileA3344.A3344SEQ)) {
                                mensaje = "Fecha no válida: " + fileA3344.A3344SEQ + ". El formato correcto es: YYYYMMDD.";
                                break;
                            }
                        }
                        //cpn
                        if (currentRow.getCell(2) == null) {
                            mensaje = "Cupón Number Required";
                            break;
                        } else {
                            fileA3344.A3344CPN = currentRow.getCell(2).getStringCellValue();
                            if (fileA3344.A3344CPN.equals("")) {
                                mensaje = "Cupón Number Required";
                                break;
                            }
                            if (fileA3344.A3344CPN.length() != 1) {
                                mensaje = "THE Cupón MUST BE 1 CHARACTERES  " + fileA3344.A3344CPN;
                                break;
                            }
                        }
                        //Transaction_type_code
                        if (currentRow.getCell(3) == null) {
                            mensaje = "Transaction type Required";
                            break;
                        } else {
                            fileA3344.A3344TRNCU = currentRow.getCell(3).getStringCellValue();
                            if (fileA3344.A3344TRNCU.equals("")) {
                                mensaje = "Transaction type Required";
                                break;
                            }
                            if (filter.VP_OPTION.equals("IXP") || filter.VP_OPTION.equals("IXC")) {
                                if (fileA3344.A3344TRNCU.length() != 3) {
                                    mensaje = "THE Transaction type MUST BE 3 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            } else {
                                if (fileA3344.A3344TRNCU.length() != 4) {
                                    mensaje = "THE Transaction type MUST BE 4 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            }
                        }
                        //pais solo para ventas y caducos
                        fileA3344.A3344PAIS = currentRow.getCell(4) == null ? "" : currentRow.getCell(4).getStringCellValue();
                        if (!filter.VP_OPTION.equals("FLWN") && !filter.VP_OPTION.equals("IXP") && !filter.VP_OPTION.equals("IXC")) {
                            if (fileA3344.A3344PAIS.equals("")) {
                                mensaje = "Country Required";
                                break;
                            }
                            if (fileA3344.A3344PAIS.length() != 2) {
                                mensaje = "THE Country MUST BE 2 CHARACTERES  " + fileA3344.A3344PAIS;
                                break;
                            }
                            if (!fileA3344.A3344PAIS.matches("[a-zA-Z]+")) {
                                mensaje = "THE Country IS NOT VALID  " + fileA3344.A3344PAIS;
                                break;
                            }
                        }
                        //fuente solo para ventas y caducos
                        fileA3344.A3344FUENT = currentRow.getCell(5) == null ? "" : currentRow.getCell(5).getStringCellValue();
                        if (!filter.VP_OPTION.equals("FLWN") && !filter.VP_OPTION.equals("IXP") && !filter.VP_OPTION.equals("IXC")) {
                            if (fileA3344.A3344FUENT.equals("")) {
                                mensaje = "Source Required";
                                break;
                            }
                            if (fileA3344.A3344FUENT.length() != 3) {
                                mensaje = "THE Source MUST BE 3 CHARACTERES  " + fileA3344.A3344FUENT;
                                break;
                            }

                        }
                        //sub_fuente solo para ventas y caducos
                        fileA3344.A3344SUBFU = currentRow.getCell(6) == null ? "" : currentRow.getCell(6).getStringCellValue();
                        if (!filter.VP_OPTION.equals("FLWN") && !filter.VP_OPTION.equals("IXP") && !filter.VP_OPTION.equals("DISC") && !filter.VP_OPTION.equals("IXC")) {
                            if (fileA3344.A3344SUBFU.equals("")) {
                                mensaje = "Channel Required";
                                break;
                            }
                            if (fileA3344.A3344SUBFU.length() != 3) {
                                mensaje = "THE Channel MUST BE 3 CHARACTERES  " + fileA3344.A3344SUBFU;
                                break;
                            }

                        }

                        //CARRIER solo para ventas y caducos
                        fileA3344.A3344CARRIR = currentRow.getCell(7) == null ? "" : currentRow.getCell(7).getStringCellValue();
                        if (filter.VP_OPTION.equals("FLWN")) {
                            if (fileA3344.A3344CARRIR.equals("")) {
                                mensaje = "Carrier Required";
                                break;
                            }
                            if (fileA3344.A3344CARRIR.length() != 2) {
                                mensaje = "THE Carrier MUST BE 2 CHARACTERES  " + fileA3344.A3344CARRIR;
                                break;
                            }
                            if (!fileA3344.A3344CARRIR.equals("5D") && !fileA3344.A3344CARRIR.equals("AM")) {
                                mensaje = "THE Carrier 5D OR AM  " + fileA3344.A3344CARRIR;
                                break;
                            }
                        }

                        //Concepto 1 solo para ventas y caducos
                        fileA3344.A3344CONP1 = currentRow.getCell(8) == null ? "" : currentRow.getCell(8).getStringCellValue();
                        if (fileA3344.A3344CONP1.equals("")) {
                            mensaje = "Concepto 1 Required";
                            break;
                        }
                        /// concepto 2
                        fileA3344.A3344CONP2 = currentRow.getCell(9) == null ? "" : currentRow.getCell(9).getStringCellValue();
                        /// concepto 3
                        fileA3344.A3344CONP3 = currentRow.getCell(10) == null ? "" : currentRow.getCell(10).getStringCellValue();
                        //Document type  TKT  
                        fileA3344.A3344TDOC = currentRow.getCell(11) == null ? "" : currentRow.getCell(11).getStringCellValue();
                        if (fileA3344.A3344TDOC.equals("")) {
                            mensaje = "Document type  Required";
                            break;
                        }
                        //CUENTA 
                        fileA3344.A3344CTAC = currentRow.getCell(12) == null ? "" : currentRow.getCell(12).getStringCellValue();
                        if (fileA3344.A3344CTAC.equals("")) {
                            mensaje = "Cuenta  Required";
                            break;
                        }
                        if (fileA3344.A3344CTAC.length() != 36) {
                            mensaje = "THE Cuenta MUST BE 36 CHARACTERES  " + fileA3344.A3344CTAC;
                            break;
                        }
                        if (!isValidCuenta(fileA3344.A3344CTAC)) {
                            mensaje = "THE Cuenta IS NOT VALID  " + fileA3344.A3344CTAC;
                            break;
                        }
                        //TITULO 
                        fileA3344.A3344TITUC = currentRow.getCell(13) == null ? "" : currentRow.getCell(13).getStringCellValue();
                        if (fileA3344.A3344TITUC.equals("")) {
                            mensaje = "Titulo  Required";
                            break;
                        }
                        if (fileA3344.A3344TITUC.length() > 30) {
                            mensaje = "THE Titulo MUST BE 30 CHARACTERES  " + fileA3344.A3344TITUC;
                            break;
                        }
                        //tipo de poliza
                        fileA3344.A3344FILE = currentRow.getCell(14) == null ? "" : currentRow.getCell(14).getStringCellValue();
                        if (fileA3344.A3344FILE.equals("")) {
                            mensaje = "File  Required";
                            break;
                        }
                        if (fileA3344.A3344FILE.length() != 2) {
                            mensaje = "THE FILE MUST BE 2 CHARACTERES  " + fileA3344.A3344FILE;
                            break;
                        }
                        if (!fileA3344.A3344FILE.equals("AP") && !fileA3344.A3344FILE.equals("AR") && !fileA3344.A3344FILE.equals("GL")) {
                            mensaje = "THE FILE AR or AP or GL  " + fileA3344.A3344FILE;
                            break;
                        }
                        //marca de la poliza
                        fileA3344.A3344MARCA = currentRow.getCell(15) == null ? "" : currentRow.getCell(15).getStringCellValue();
                        if (!fileA3344.A3344MARCA.equals("")) {
                            if (filter.VP_OPTION.equals("FLWN")) {
                                fileA3344.A3344MARCA = "X";
                            } else {
                                fileA3344.A3344MARCA = "P";
                            }
                        }

                        //cliente
                        fileA3344.A3344CLIEN = currentRow.getCell(16) == null ? "" : currentRow.getCell(16).getStringCellValue();
                        //provedor
                        fileA3344.A3344PROVE = currentRow.getCell(17) == null ? "" : currentRow.getCell(17).getStringCellValue();
                        //direccion
                        fileA3344.A3344DIREC = currentRow.getCell(18) == null ? "" : currentRow.getCell(18).getStringCellValue();
                        //direccion
                        fileA3344.A3344ORAC = currentRow.getCell(19) == null ? "" : currentRow.getCell(19).getStringCellValue();
                        //mda
                        fileA3344.A3344MDA = currentRow.getCell(20) == null ? "" : currentRow.getCell(20).getStringCellValue();
                        //MONTO_ACTIVO_LOCAL
                        if (!isParsableToDouble(currentRow.getCell(21).getStringCellValue())) {
                            mensaje = "THE MONTO_ACTIVO_LOCAL IS NOT VALID: " + currentRow.getCell(21).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344DBLOC = (currentRow.getCell(21) == null || currentRow.getCell(21).getStringCellValue().equals("")) ? 0 : Double.parseDouble(currentRow.getCell(21).getStringCellValue());
                        //MONTO_PASIVO_LOCAL
                        if (!isParsableToDouble(currentRow.getCell(22).getStringCellValue())) {
                            mensaje = "THE MONTO_PASIVO_LOCAL IS NOT VALID: " + currentRow.getCell(22).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344CRLOC = (currentRow.getCell(22) == null || currentRow.getCell(22).getStringCellValue().equals("")) ? 0 : Double.parseDouble(currentRow.getCell(22).getStringCellValue());
                        //MONTO_ACTIVO_REVENUE
                        if (!isParsableToDouble(currentRow.getCell(23).getStringCellValue())) {
                            mensaje = "THE MONTO_ACTIVO_REVENUE IS NOT VALID: " + currentRow.getCell(23).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344DBREV = (currentRow.getCell(23) == null || currentRow.getCell(23).getStringCellValue().equals("")) ? 0 : Double.parseDouble(currentRow.getCell(23).getStringCellValue());
                        //MONTO_PASIVO_REVUE
                        if (!isParsableToDouble(currentRow.getCell(24).getStringCellValue())) {
                            mensaje = "THE MONTO_PASIVO_REVUE IS NOT VALID: " + currentRow.getCell(24).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344CRREV = (currentRow.getCell(24) == null || currentRow.getCell(24).getStringCellValue().equals("")) ? 0 : Double.parseDouble(currentRow.getCell(24).getStringCellValue());
                        //TKT REFERECIA
                        fileA3344.A3344TKTAS = currentRow.getCell(25) == null ? "" : currentRow.getCell(25).getStringCellValue();
                        //TKT_SEQ_REFEREC
                        fileA3344.A3344ASSEQ = currentRow.getCell(26) == null ? "" : currentRow.getCell(26).getStringCellValue();
                        //TYPE_TRANSACA
                        fileA3344.A3344ESTTR = currentRow.getCell(27) == null ? "" : currentRow.getCell(27).getStringCellValue();
                        //ANAULAR
                        fileA3344.A3344TKTVO = currentRow.getCell(28) == null ? "" : currentRow.getCell(28).getStringCellValue();
                        //IMPORTE_LOCAL
                        if (!isParsableToDouble(currentRow.getCell(29).getStringCellValue())) {
                            mensaje = "THE IMPORTE_LOCAL IS NOT VALID: " + currentRow.getCell(29).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344VLTAX = (currentRow.getCell(29) == null || currentRow.getCell(29).getStringCellValue().equals("")) ? 0 : Double.parseDouble(currentRow.getCell(29).getStringCellValue());
                        //IMPORTE_REVENUE
                        if (!isParsableToDouble(currentRow.getCell(30).getStringCellValue())) {
                            mensaje = "THE IMPORTE_REVENUE IS NOT VALID: " + currentRow.getCell(30).getStringCellValue();
                            break;
                        }
                        fileA3344.A3344VLTAR = (currentRow.getCell(30) == null || currentRow.getCell(30).getStringCellValue().equals("")) ? 0 : Double.parseDouble(currentRow.getCell(30).getStringCellValue());
                        //AFFECTATION IATA
                        fileA3344.A3344IATAU = currentRow.getCell(31) == null ? "" : currentRow.getCell(31).getStringCellValue();
                        //TIPO_TARJ
                        fileA3344.A3344TTARJ = currentRow.getCell(32) == null ? "" : currentRow.getCell(32).getStringCellValue();
                        //NUMERO_ATRJETA
                        fileA3344.A3344NTARJ = currentRow.getCell(33) == null ? "" : currentRow.getCell(33).getStringCellValue();
                        //JUSTICACION
                        fileA3344.A3344DESCR = currentRow.getCell(34) == null ? "" : currentRow.getCell(34).getStringCellValue();
                        //IATA_VENTA
                        fileA3344.A3344AGENT = currentRow.getCell(35) == null ? "" : currentRow.getCell(35).getStringCellValue();
                        //TIPO DE CAMBIO
                        fileA3344.A3344TCAMB = currentRow.getCell(36) == null ? 0 : Double.parseDouble(currentRow.getCell(36).getStringCellValue());
                        ///FECHA DE PROCESO
                        fileA3344.A3344FPROC = currentRow.getCell(37) == null ? "" : currentRow.getCell(37).getStringCellValue();
                        if (fileA3344.A3344TRNCU.equals("FLWN") && !isValidDate(fileA3344.A3344FPROC)) {
                            mensaje = "Fecha de Proceso no válida: " + fileA3344.A3344FPROC + ". El formato correcto es: YYYYMMDD.";
                            break;
                        }

                        /* if(!fileA3344.A3344FPROC.equals("")){
                         String vl_A3344FPROC =fileA3344.A3344FPROC.replaceAll("/", "");
                         java.util.Date date1=new Date(vl_A3344FPROC); 
                         java.util.Date date2 = new Date();
                         Integer fecha = date2.compareTo(date1);                             
                         if(fecha > 0){
                         mensaje = "La fecha debe de ser menor al del sistema";
                         break;
                         }
                           
                         } */
                        //VALIDACION DEL PROCESO
                        if (fileA3344.A3344TRNCU.equals("EXCP")) {
                            if (fileA3344.A3344TKTAS.equals("")) {
                                mensaje = "TKT REFERENCIA  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTAS.length() != 10) {
                                mensaje = "THE TKT REFERENCIA MUST BE 10 CHARACTERES  " + fileA3344.A3344TKTAS;
                                break;
                            }

                            if (fileA3344.A3344ASSEQ.equals("")) {
                                mensaje = "TKT SEQ REFEREC  Required";
                                break;
                            }
                            if (fileA3344.A3344ASSEQ.length() != 2) {
                                mensaje = "THE TKT SEQ REFEREC MUST BE 10 CHARACTERES  " + fileA3344.A3344ASSEQ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344ESTTR.equals("")) {
                            if (fileA3344.A3344ESTTR.equals("")) {
                                mensaje = "TYPE TRANSACTION Required";
                                break;
                            }
                            if (fileA3344.A3344ESTTR.length() != 1) {
                                mensaje = "THE TYPE TRANSACTION MUST BE 1 CHARACTERES  " + fileA3344.A3344ESTTR;
                                break;
                            }
                            if (fileA3344.A3344TKTVO.equals("")) {
                                mensaje = "ANAULAR  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTVO.length() != 1) {
                                mensaje = "THE ANAULAR BE 1 CHARACTERES  " + fileA3344.A3344TKTVO;
                                break;
                            }
                        }

                        if (fileA3344.A3344IATAU.equals("")) {
                            mensaje = "AFFECTATION IATA  Required";
                            break;
                        }
                        if (!containsOnlyNumbers(fileA3344.A3344IATAU)) {
                            mensaje = "THE AFFECTATION IATA MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344IATAU;
                            break;
                        }
                        if (fileA3344.A3344IATAU.length() != 8) {
                            mensaje = "THE AFFECTATION IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344IATAU;
                            break;
                        }

                        if (!fileA3344.A3344TTARJ.equals("")) {
                            if (fileA3344.A3344TTARJ.length() > 2) {
                                mensaje = "THE TYPE CARD MUST BE 2 CHARACTERES  " + fileA3344.A3344TTARJ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344NTARJ.equals("")) {
                            if (fileA3344.A3344NTARJ.length() > 19) {
                                mensaje = "THE CARD NUMBER MUST BE 19 CHARACTERES  " + fileA3344.A3344NTARJ;
                                break;
                            }
                        }

                        if (fileA3344.A3344DESCR.equals("")) {
                            mensaje = "JUSTICACION  Required";
                            break;
                        }
                        if (fileA3344.A3344DESCR.length() > 200) {
                            mensaje = "THE JUSTICACION MUST BE 200 CHARACTERES  " + fileA3344.A3344DESCR;
                            break;
                        }

                        if (fileA3344.A3344AGENT.equals("")) {
                            mensaje = "IATA  Required" + fileA3344.A3344AGENT;
                            break;
                        }
                        if (!containsOnlyNumbers(fileA3344.A3344AGENT)) {
                            mensaje = "THE IATA MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344AGENT;
                            break;
                        }
                        if (fileA3344.A3344AGENT.length() != 8) {
                            mensaje = "THE IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344AGENT;
                            break;
                        }

                        //validacion para volados
                        if (filter.VP_OPTION.equals("FLWN")) {

                            if (fileA3344.A3344FILE.equals("AP") && fileA3344.A3344PROVE.equals("")) {
                                mensaje = "Provedor Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && fileA3344.A3344CLIEN.equals("")) {
                                mensaje = "Cliente Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && !containsOnlyNumbers(fileA3344.A3344CLIEN)) {
                                mensaje = "THE CLIENT MUST CONTAIN ONLY NUMBERS: " + fileA3344.A3344CLIEN;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && fileA3344.A3344DIREC.equals("")) {
                                mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && fileA3344.A3344ORAC.equals("")) {
                                mensaje = "ORAC Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344CARRIR.equals("5D")) {
                                if (fileA3344.A3344CTAC.equals("02-0000000-0000-116116-0000-0000-03") || fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02")) {
                                    fileA3344.A3344MARCA = "X";
                                }

                                if (fileA3344.A3344CTAC.equals("03-0000000-1MX1-116101-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                    fileA3344.A3344CLIEN = "13939";
                                    fileA3344.A3344PROVE = "";
                                    if (fileA3344.A3344DIREC.equals("")) {
                                        mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                        break;
                                    }
                                    //fileA3344.A3344DIREC = "16251";//la direccion se tiene que validar
                                    fileA3344.A3344ORAC = "F_INTERCO";
                                }
                                if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                    fileA3344.A3344PROVE = "7181";// validar
                                }
                                if (fileA3344.A3344CTAC.equals("02-0000000-1MX1-217101-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                    fileA3344.A3344PROVE = "7181";
                                }
                                if (fileA3344.A3344CTAC.equals("03-0000000-1MX1-116101-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                    fileA3344.A3344CLIEN = "13939";
                                    fileA3344.A3344PROVE = "";
                                    if (fileA3344.A3344DIREC.equals("")) {
                                        mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                        break;
                                    }
                                    //fileA3344.A3344DIREC = "16251";
                                    fileA3344.A3344ORAC = "F_INTERCO";
                                }
                                if (fileA3344.A3344CTAC.equals("02-0000000-0000-116116-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                    fileA3344.A3344PROVE = "7181";
                                }

                            }
                            //03-00-000000-0000-1141-13833-0000-02
                            //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                            //if (fileA3344.A3344CTAC.substring(18, 22).equals("6111") || fileA3344.A3344CTAC.substring(18, 22).equals("6112")) {
                            if (fileA3344.A3344CTAC.substring(18, 22).equals("611501")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611401")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611103")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611402")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611403")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611101")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611102")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611301")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611601")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617101")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617102")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617103")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617104")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617105")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617106")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611701")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617110")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617111")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("618101")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617113")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617114")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617116")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617115")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617117")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617118")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("611801")
                                    || fileA3344.A3344CTAC.substring(18, 22).equals("617107")) {
                                fileA3344.A3344CONP1 = "CM";
                            }
                            if (fileA3344.A3344CTAC.substring(17, 21).equals("117202") && fileA3344.A3344CTAC.substring(21, 27).equals("0000")) {
                                fileA3344.A3344CONP1 = "CM";
                            }
                        }
                        //VALIDACION PARA INTERLIEAL POR PAGAR
                        if (filter.VP_OPTION.equals("IXP")) {
                            //La cuenta 2171 TNU siempre debe de llenar el apartado de Proveedor.
                            if (fileA3344.A3344CTAC.substring(17, 21).equals("2171")) {
                                if (fileA3344.A3344CONP1.equals("")) {
                                    mensaje = "Concepto 1 Required";
                                    break;
                                }

                            }
                        }
                        //VALIDACION PARA INTERLIEAL POR COBRAR
                        if (filter.VP_OPTION.equals("IXC")) {
                            //La cuenta 2171 TNU siempre debe de llenar el apartado de Proveedor.
                            if (fileA3344.A3344CONP1.equals("")) {
                                mensaje = "Concepto 1 Required";
                                break;
                            }
                            if (fileA3344.A3344CONP2.equals("")) {
                                mensaje = "Concepto 2 Required";
                                break;
                            }
                        }

                        if (cont1 == 1) {
                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                        }

                        if (!vl_A3344TKT.equals(fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN)) {
                            if (!formatter.format(vl_A3344DBLOC).equals(formatter.format(vl_A3344CRLOC))) {
                                mensaje = "The Pasivo Local Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV).equals(formatter.format(vl_A3344CRREV))) {
                                mensaje = "The Pasivo Revenue Amount must be equal to the Activo Revenue Amount " + vl_A3344CRREV + " - " + vl_A3344DBREV + " - " + vl_A3344TKT;
                                break;
                            }

                            if (filter.VP_OPTION.equals("FLWN")) {
                                if (fileA3344.A3344CARRIR.equals("5D")) {

                                    if (!formatter.format(vl_A3344DBLOC5D).equals(formatter.format(vl_A3344CRLOC5D))) {
                                        mensaje = "The Pasivo Local Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_A3344DBREV5D).equals(formatter.format(vl_A3344CRREV5D))) {
                                        mensaje = "The Pasivo Revenue Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                    if (vl_A3344CTAC_AR114113833 != vl_A3344CTAC_GL114113833) {
                                        mensaje = "The account must is incorrect AR " + vl_A3344CTAC_GL114113833 + " - " + vl_A3344CTAC_AR114113833 + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (vl_A3344CTAC_AP213124704 != vl_A3344CTAC_GL213124704) {
                                        mensaje = "The account must is incorrect AP  " + vl_A3344CTAC_AP213124704 + " - " + vl_A3344CTAC_GL213124704 + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAP_A3344DBREV).equals(formatter.format(vl_CTACAP_A3344CRREV))) {
                                        mensaje = "The amounts do not match  " + vl_CTACAP_A3344DBREV + " - " + vl_CTACAP_A3344CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAR_A3344DBREV).equals(formatter.format(vl_CTACAR_A3344CRREV))) {
                                        mensaje = "The amounts do not match  " + vl_CTACAR_A3344CRREV + " - " + vl_CTACAR_A3344DBREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAP_213124704DBREV).equals(formatter.format(vl_CTACAR_213124704DBREV))) {
                                        mensaje = "The amounts do not match AR AND AP   " + vl_CTACAP_213124704DBREV + " - " + vl_CTACAR_213124704DBREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAR_114113833DBREV).equals(formatter.format(vl_CTACAR_114113833CRREV))) {
                                        mensaje = "The amounts do not match GL  " + vl_CTACAR_114113833DBREV + " - " + vl_CTACAR_114113833CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    //.equals("03-00-000000-0000-1141-13833-0000-02") 
                                    if (!formatter.format(vl_CTA02_DBREV).equals(formatter.format(vl_CTA02_CRREV))) {
                                        mensaje = "The amounts do not match CIA  02 " + vl_CTA02_DBREV + " - " + vl_CTA02_CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTA03_DBREV).equals(formatter.format(vl_CTA03_CRREV))) {
                                        mensaje = "The amounts do not match CIA  03 " + vl_CTA03_DBREV + " - " + vl_CTA03_CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }

                                    //.equals("03-00-000000-0000-1141-13833-0000-02") 
                                }

                                if (fileA3344.A3344CARRIR.equals("AM")) {
                                    if (!formatter.format(vl_A3344DBLOCAM).equals(formatter.format(vl_A3344CRLOCAM))) {
                                        mensaje = "The Pasivo Local Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_A3344DBREVAM).equals(formatter.format(vl_A3344CRREVAM))) {
                                        mensaje = "The Pasivo Revenue Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                }

                            }

                            vl_A3344DBLOC = 0;
                            vl_A3344CRLOC = 0;
                            vl_A3344DBREV = 0;
                            vl_A3344CRREV = 0;

                            vl_A3344DBLOC5D = 0;
                            vl_A3344CRLOC5D = 0;
                            vl_A3344DBREV5D = 0;
                            vl_A3344CRREV5D = 0;

                            vl_A3344DBLOCAM = 0;
                            vl_A3344CRLOCAM = 0;
                            vl_A3344DBREVAM = 0;
                            vl_A3344CRREVAM = 0;

                            vl_A3344CTAC_AR114113833 = 0;
                            vl_A3344CTAC_GL114113833 = 0;
                            vl_A3344CTAC_GL213124704 = 0;
                            vl_A3344CTAC_AP213124704 = 0;
                            vl_CTACAP_A3344DBREV = 0;
                            vl_CTACAP_A3344CRREV = 0;
                            vl_CTACAR_A3344DBREV = 0;
                            vl_CTACAR_A3344CRREV = 0;

                            vl_CTACAR_114113833CRREV = 0;
                            vl_CTACAR_114113833DBREV = 0;
                            vl_CTACAR_213124704DBREV = 0;
                            vl_CTACAP_213124704DBREV = 0;
                            vl_CTA02_DBREV = 0;
                            vl_CTA02_CRREV = 0;
                            vl_CTA03_DBREV = 0;
                            vl_CTA03_CRREV = 0;

                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + fileA3344.A3344DBREV;
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            /**
                             * nuew procedimiento
                             */
                            if (filter.VP_OPTION.equals("FLWN")) {
                                if (fileA3344.A3344CARRIR.equals("5D")) {

                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") || fileA3344.A3344CTAC.equals("03-0000000-0000-217105-0000-0000-02") || fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") || fileA3344.A3344CTAC.equals("02-0000000-0000-116114-0000-0000-03")) {
                                        fileA3344.A3344MARCA = "X";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        vl_A3344CTAC_AR114113833 = vl_A3344CTAC_AR114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        if (fileA3344.A3344DIREC.equals("")) {
                                            mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                            break;
                                        }
                                        //fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-0000000-1MX1-116101-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        if (fileA3344.A3344DIREC.equals("")) {
                                            mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                            break;
                                        }
                                        //fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    //new ewn ar
                                    /*if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13835-0000-03") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "12383";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "5408";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }*/
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-116116-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }
                                    //new
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }
                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-217105-0000-0000-02") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "4614";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL114113833 = vl_A3344CTAC_GL114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL213124704 = vl_A3344CTAC_GL213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        vl_A3344CTAC_AP213124704 = vl_A3344CTAC_AP213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344FILE.equals("AP")) {
                                        vl_CTACAP_A3344DBREV = vl_CTACAP_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAP_A3344CRREV = vl_CTACAP_A3344CRREV + fileA3344.A3344CRREV;

                                    }
                                    if (fileA3344.A3344FILE.equals("AR")) {
                                        vl_CTACAR_A3344DBREV = vl_CTACAR_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAR_A3344CRREV = vl_CTACAR_A3344CRREV + fileA3344.A3344CRREV;

                                    }

                                    if (fileA3344.A3344FILE.equals("AR") || fileA3344.A3344FILE.equals("AP")) {
                                        if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                            vl_CTACAP_213124704DBREV = vl_CTACAP_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }
                                        if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                            vl_CTACAR_213124704DBREV = vl_CTACAR_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }

                                    }
                                    if (fileA3344.A3344FILE.equals("GL")) {
                                        if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") || fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03")) {
                                            vl_CTACAR_114113833DBREV = vl_CTACAR_114113833DBREV + fileA3344.A3344DBREV;
                                            vl_CTACAR_114113833CRREV = vl_CTACAR_114113833CRREV + fileA3344.A3344CRREV;
                                        }

                                    }

                                }

                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    vl_A3344DBLOC5D = vl_A3344DBLOC5D + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOC5D = vl_A3344CRLOC5D + fileA3344.A3344CRLOC;
                                    vl_A3344DBREV5D = vl_A3344DBREV5D + fileA3344.A3344DBREV;
                                    vl_A3344CRREV5D = vl_A3344CRREV5D + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CARRIR.equals("AM")) {
                                    vl_A3344DBLOCAM = vl_A3344DBLOCAM + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOCAM = vl_A3344CRLOCAM + fileA3344.A3344CRLOC;
                                    vl_A3344DBREVAM = vl_A3344DBREVAM + fileA3344.A3344DBREV;
                                    vl_A3344CRREVAM = vl_A3344CRREVAM + fileA3344.A3344CRREV;

                                }
                                //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                                if (fileA3344.A3344CTAC.substring(17, 21).equals("117202") || fileA3344.A3344CTAC.substring(17, 21).equals("0000")) {
                                    //vl_CTAC_6111_6112 = vl_CTAC_6111_6112 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                //02-00-000000-0000-1161-14104-0000-00 03-00-000000-0000-1141-13833-0000-02   18 - 28
                                if (fileA3344.A3344CTAC.substring(17, 27).equals("117202-0000")) {
                                    //vl_CTAC_116114104 = vl_CTAC_116114104 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("02")) {
                                    vl_CTA02_DBREV = vl_CTA02_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA02_CRREV = vl_CTA02_CRREV + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("03")) {
                                    vl_CTA03_DBREV = vl_CTA03_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA03_CRREV = vl_CTA03_CRREV + fileA3344.A3344CRREV;
                                }
                            }
                            /*fin del procedimiento*/

                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                        } else {
                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + Double.valueOf(fileA3344.A3344DBREV);
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            if (filter.VP_OPTION.equals("FLWN")) {
                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    /*if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") || fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03")) {
                                     fileA3344.A3344MARCA = "X";
                                     }*/
                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") || fileA3344.A3344CTAC.equals("03-0000000-0000-217105-0000-0000-02") || fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") || fileA3344.A3344CTAC.equals("02-0000000-0000-116114-0000-0000-03")) {
                                        fileA3344.A3344MARCA = "X";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        vl_A3344CTAC_AR114113833 = vl_A3344CTAC_AR114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        if (fileA3344.A3344DIREC.equals("")) {
                                            mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                            break;
                                        }
                                        //fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    if (fileA3344.A3344CTAC.equals("03-0000000-1MX1-116101-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        if (fileA3344.A3344DIREC.equals("")) {
                                            mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                            break;
                                        }
                                        //fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    //new ewn ar
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-116114-0000-0000-03") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "12383";
                                        fileA3344.A3344PROVE = "";
                                        if (fileA3344.A3344DIREC.equals("")) {
                                            mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                            break;
                                        }
                                        //fileA3344.A3344DIREC = "5408";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }

                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }

                                    /*if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13830-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }*/
                                    //new
                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-217105-0000-0000-02") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "4614";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL114113833 = vl_A3344CTAC_GL114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL213124704 = vl_A3344CTAC_GL213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        vl_A3344CTAC_AP213124704 = vl_A3344CTAC_AP213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344FILE.equals("AP")) {
                                        vl_CTACAP_A3344DBREV = vl_CTACAP_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAP_A3344CRREV = vl_CTACAP_A3344CRREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344FILE.equals("AR")) {
                                        vl_CTACAR_A3344DBREV = vl_CTACAR_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAR_A3344CRREV = vl_CTACAR_A3344CRREV + fileA3344.A3344CRREV;
                                    }

                                    if (fileA3344.A3344FILE.equals("AR") || fileA3344.A3344FILE.equals("AP")) {
                                        if (fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                            vl_CTACAP_213124704DBREV = vl_CTACAP_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }
                                        if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                            vl_CTACAR_213124704DBREV = vl_CTACAR_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }

                                    }
                                    if (fileA3344.A3344FILE.equals("GL")) {
                                        if (fileA3344.A3344CTAC.equals("03-0000000-0000-116115-0000-0000-02") || fileA3344.A3344CTAC.equals("02-0000000-0000-217104-0000-0000-03")) {
                                            vl_CTACAR_114113833DBREV = vl_CTACAR_114113833DBREV + fileA3344.A3344DBREV;
                                            vl_CTACAR_114113833CRREV = vl_CTACAR_114113833CRREV + fileA3344.A3344CRREV;
                                        }

                                    }

                                }
                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    vl_A3344DBLOC5D = vl_A3344DBLOC5D + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOC5D = vl_A3344CRLOC5D + fileA3344.A3344CRLOC;
                                    vl_A3344DBREV5D = vl_A3344DBREV5D + fileA3344.A3344DBREV;
                                    vl_A3344CRREV5D = vl_A3344CRREV5D + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CARRIR.equals("AM")) {
                                    vl_A3344DBLOCAM = vl_A3344DBLOCAM + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOCAM = vl_A3344CRLOCAM + fileA3344.A3344CRLOC;
                                    vl_A3344DBREVAM = vl_A3344DBREVAM + fileA3344.A3344DBREV;
                                    vl_A3344CRREVAM = vl_A3344CRREVAM + fileA3344.A3344CRREV;

                                }
                                //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                                if (fileA3344.A3344CTAC.substring(18, 22).equals("6111") || fileA3344.A3344CTAC.substring(18, 22).equals("6112")) {
                                    //  vl_CTAC_6111_6112 = vl_CTAC_6111_6112 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                //02-00-000000-0000-1161-14104-0000-00 03-00-000000-0000-1141-13833-0000-02
                                if (fileA3344.A3344CTAC.substring(17, 27).equals("117202-0000")) {
                                    //vl_CTAC_116114104 = vl_CTAC_116114104 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                ///nuevo
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("02")) {
                                    vl_CTA02_DBREV = vl_CTA02_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA02_CRREV = vl_CTA02_CRREV + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("03")) {
                                    vl_CTA03_DBREV = vl_CTA03_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA03_CRREV = vl_CTA03_CRREV + fileA3344.A3344CRREV;
                                }
                            }
                        }

                        lstGeneral.add(fileA3344);

                    }

                }
            }
            if (mensaje.equals("")) {
                mensaje = logic.subirExcel(lstGeneral, filter.VP_OPTION, filename);
            }
            map.put("success", true);
            map.put("result", mensaje);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("result", e.getMessage());
            System.out.println("Error SQLException");
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("result", e.getMessage());
            System.out.println("Error Exception: " + e.getLocalizedMessage());
            e.printStackTrace();
        }
        return new Gson().toJson(map);
    }

    private static boolean isValidDate(String dateStr) {
        if (DATE_PATTERN.matcher(dateStr).matches()) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
                LocalDate.parse(dateStr, formatter);
                return true;
            } catch (DateTimeParseException e) {
                return false;
            }
        }
        return false;
    }

    private static boolean isParsableToDouble(String str) {
        if (str == null || str.isEmpty()) {
            return true;
        }
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static boolean containsOnlyNumbers(String str) {
        return str.matches("^\\d+$");
    }

    private static boolean isValidCuenta(String str) { //02-0000000-0000-259305-0000-0000-00
        //String expr = "^\\d{2}-\\d{7}-[A-Z0-9]{4}-\\d{6}-\\d{4}-\\d{4}-\\d{2}$";
         String expr = "^\\d{2}-\\d{2}-\\d{6}-[A-Z0-9]{4}-\\d{4}-\\d{5}-\\d{4}-\\d{2}$";
        return str.matches(expr);
    }

    // Código invalidado por Johnny Arias
//    private String getCellValue(Cell cell) {
//        String cellValue = "";
//        DataFormatter formatter = new DataFormatter();
//        if (cell != null) {
//            switch (cell.getCellType()) {
//                case Cell.CELL_TYPE_NUMERIC:
//                    if (DateUtil.isCellDateFormatted(cell)) {
//                        cellValue = formatter.formatCellValue(cell);
//                    } else {
//                        double value = cell.getNumericCellValue();
//                        int intValue = (int) value;
//                        cellValue = value - intValue == 0 ? String
//                                .valueOf(intValue) : String.valueOf(value);
//                    }
//                    break;
//                case Cell.CELL_TYPE_STRING:
//                    cellValue = cell.getStringCellValue();
//                    break;
//                case Cell.CELL_TYPE_BOOLEAN:
//                    cellValue = String.valueOf(cell.getBooleanCellValue());
//                    break;
//                case Cell.CELL_TYPE_FORMULA:
//                    //cellValue = String.valueOf(cell.getCellFormula());
//                    if (DateUtil.isCellDateFormatted(cell)) {
//                        cellValue = formatter.formatCellValue(cell);
//                    } else {
//                        double value = cell.getNumericCellValue();
//                        int intValue = (int) value;
//                        cellValue = value - intValue == 0 ? String
//                                .valueOf(intValue) : String.valueOf(value);
//                    }
//                    break;
//                case Cell.CELL_TYPE_BLANK:
//                    cellValue = "";
//                    break;
//                case Cell.CELL_TYPE_ERROR:
//                    cellValue = "";
//                    break;
//                default:
//                    cellValue = cell.toString().trim();
//                    break;
//            }
//        }
//        return cellValue.trim();
//    }
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3344Filter filter = new A3344Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3344Filter> listaData = logic.search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Load_Excel_Debit_Memo_Type");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17;
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
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Cpn");
            CH_02.setCellValue("ADJ Sec.");
            CH_03.setCellValue("Transaction");
            CH_04.setCellValue("System Date");
            CH_05.setCellValue("DEBIT LOCAL");
            CH_06.setCellValue("CREDIT LOCAL");
            CH_07.setCellValue("NET");
            CH_08.setCellValue("DEBIT REVENUE");
            CH_09.setCellValue("CREDIT REVENUE");
            CH_10.setCellValue("NET");
            CH_11.setCellValue("Adj IATA");
            CH_12.setCellValue("Country");
            CH_13.setCellValue("Source");
            CH_14.setCellValue("Description");
            CH_15.setCellValue("User");
            CH_16.setCellValue("Processed");
            CH_17.setCellValue("CTA");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));

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
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);

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
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);

                CH_00.setCellValue(listaData.get(vi).A3344TKT);
                CH_01.setCellValue(listaData.get(vi).A3344CPN);
                CH_02.setCellValue(listaData.get(vi).A3344CCUST);
                CH_03.setCellValue(listaData.get(vi).A3344TRNCU);
                CH_04.setCellValue(listaData.get(vi).A3344FECIN);
                CH_05.setCellValue(listaData.get(vi).A3344DBLOC);
                CH_06.setCellValue(listaData.get(vi).A3344CRLOC);
                CH_07.setCellValue(listaData.get(vi).SQUARELOC);
                CH_08.setCellValue(listaData.get(vi).A3344DBREV);
                CH_09.setCellValue(listaData.get(vi).A3344CRREV);
                CH_10.setCellValue(listaData.get(vi).SQUAREREV);
                CH_11.setCellValue(listaData.get(vi).A3344IATAU);
                CH_12.setCellValue(listaData.get(vi).A3344PAIS);
                CH_13.setCellValue(listaData.get(vi).A3344FUENT);
                CH_14.setCellValue(listaData.get(vi).A3344DESCR);
                CH_15.setCellValue(listaData.get(vi).A3344USRIN);
                CH_16.setCellValue(listaData.get(vi).A3344FLAG);
                CH_17.setCellValue(listaData.get(vi).A3344CTAC);

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
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

            String fileNameDownload = String.format("Load_Excel_Debit_Memo_Type_" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
