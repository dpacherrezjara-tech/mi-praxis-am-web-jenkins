/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A4076Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.salesAudit.MassiveRefunduatpFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/LoadticketReportForm")
public class MassiveRefunduatpFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private MassiveRefunduatpFormLogic logic;

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A4076Filter filter = new A4076Filter();
        ArrayList<A4076Filter> lstGeneral = new ArrayList<A4076Filter>(0);
        A4076Filter fileA4076;
        String result = "";
        int i = 0;
        Integer cont = 0;
        Integer cont1 = 0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            String filename = excelfile.getOriginalFilename();
            //Creates a workbook object from the uploaded excelfile
            // HSSFWorkbook workbook = new HSSFWorkbook(excelfile.getInputStream());
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            HSSFCell cell;
            while (iterator.hasNext()) {
                fileA4076 = new A4076Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {
                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA4076.A4076CCUST = "139";
                        fileA4076.A4076TYPE = filter.IN_TYPE;
                        if (fileA4076.A4076TYPE.equals("MA")) {
                            fileA4076.A4076TICKET = getCellValue(currentRow.getCell(0));
                            if (fileA4076.A4076TICKET.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA4076.A4076TICKET.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES  " + fileA4076.A4076TICKET;
                                break;
                            }
                            fileA4076.A4076REFE = getCellValue(currentRow.getCell(1));
                            if (fileA4076.A4076REFE.equals("")) {
                                result = "REFERENCE required";
                                break;
                            }
                            fileA4076.A4076IATA = getCellValue(currentRow.getCell(2));
                            if (fileA4076.A4076IATA.equals("")) {
                                result = "IATA required";
                                break;
                            }
                            if (fileA4076.A4076IATA.length() != 8) {
                                result = "THE TICKET MUST BE 13 CHARACTERES  " + fileA4076.A4076IATA;
                                break;
                            }
                            fileA4076.A4076MDA = getCellValue(currentRow.getCell(3));
                            if (fileA4076.A4076MDA.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA4076.A4076MDA.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES  " + fileA4076.A4076MDA;
                                break;
                            }
                            fileA4076.A4076TRNCO = getCellValue(currentRow.getCell(4));
                            if (fileA4076.A4076TRNCO.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076TRNCO.length() != 4) {
                                result = "THE Transaction MUST BE 4 CHARACTERES  " + fileA4076.A4076TRNCO;
                                break;
                            }

                            fileA4076.A4076TDOC = getCellValue(currentRow.getCell(5));
                            if (fileA4076.A4076TDOC.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076TDOC.length() != 4) {
                                result = "THE TDOC MUST BE 4 CHARACTERES  " + fileA4076.A4076TDOC;
                                break;
                            }

                            fileA4076.A4076FVTA = getCellValue(currentRow.getCell(6));
                            if (fileA4076.A4076FVTA.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076FVTA.length() != 10) {
                                result = "THE SALE DATE MUST BE 4 CHARACTERES  " + fileA4076.A4076FVTA;
                                break;
                            }

                            fileA4076.A4076CPN = getCellValue(currentRow.getCell(7));
                            fileA4076.A4076FP1 = getCellValue(currentRow.getCell(8));
                            if (!fileA4076.A4076FP1.equals("")) {
                                if (fileA4076.A4076FP1.length() != 2) {
                                    result = "THE FOP1 MUST BE 3 CHARACTERES  " + fileA4076.A4076FP1;
                                    break;
                                }
                            }
                            fileA4076.A4076TCARD1 = getCellValue(currentRow.getCell(9));
                            if (fileA4076.A4076TCARD1.equals("CC")) {
                                if (fileA4076.A4076TCARD1.equals("")) {
                                    result = "Type Card 1 required";
                                    break;
                                }
                            }
                            fileA4076.A4076CARD1 = getCellValue(currentRow.getCell(10));
                            if (!fileA4076.A4076CARD1.equals("")) {
                                if (fileA4076.A4076CARD1.length() != 15) {
                                    result = "THE CARD NUMBER1 MUST BE 15 CHARACTERES  " + fileA4076.A4076CARD1;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(11)).equals("")) {
                                fileA4076.A4076MONTCARD1 = Float.parseFloat(getCellValue(currentRow.getCell(11)));
                            } else {
                                fileA4076.A4076MONTCARD1 = 0;
                            }
                            fileA4076.A4076FP2 = getCellValue(currentRow.getCell(12));
                            if (!fileA4076.A4076FP2.equals("")) {
                                if (fileA4076.A4076FP2.length() != 2) {
                                    result = "THE FOP2 MUST BE 2 CHARACTERES  " + fileA4076.A4076FP2;
                                    break;
                                }
                            }
                            fileA4076.A4076TCARD2 = getCellValue(currentRow.getCell(13));
                            if (fileA4076.A4076TCARD2.equals("CC")) {
                                if (fileA4076.A4076TCARD2.equals("")) {
                                    result = "Type Card 2 required";
                                    break;
                                }
                            }
                            fileA4076.A4076CARD2 = getCellValue(currentRow.getCell(14));
                            if (!fileA4076.A4076CARD2.equals("")) {
                                if (fileA4076.A4076CARD2.length() != 15) {
                                    result = "THE CARD NUMBER2 MUST BE 15 CHARACTERES  " + fileA4076.A4076CARD2;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(15)).equals("")) {
                                fileA4076.A4076MONTCARD2 = Float.parseFloat(getCellValue(currentRow.getCell(15)));
                            } else {
                                fileA4076.A4076MONTCARD2 = 0;
                            }

                            fileA4076.A4076MONTT = getCellValue(currentRow.getCell(16));
                            if (!fileA4076.A4076MONTT.equals("")) {
                                if (fileA4076.A4076MONTT.length() != 3) {
                                    result = "THE CURRENCY FARE MUST BE 3 CHARACTERES  " + fileA4076.A4076MONTT;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(17)).equals("")) {
                                fileA4076.A4076TARTK = Float.parseFloat(getCellValue(currentRow.getCell(17)));
                            } else {
                                fileA4076.A4076TARTK = 0;
                            }
                            fileA4076.A4076MONET = getCellValue(currentRow.getCell(18));
                            if (!fileA4076.A4076MONET.equals("")) {
                                if (fileA4076.A4076MONET.length() != 3) {
                                    result = "THE CURRENCY EQV. MUST BE 3 CHARACTERES  " + fileA4076.A4076MONET;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(19)).equals("")) {
                                fileA4076.A4076EQVTK = Float.parseFloat(getCellValue(currentRow.getCell(19)));
                            } else {
                                fileA4076.A4076EQVTK = 0;
                            }
                            /**
                             * **TAX1 **
                             */
                            fileA4076.A4076TAX1 = getCellValue(currentRow.getCell(20));
                            if (!fileA4076.A4076TAX1.equals("")) {
                                if (fileA4076.A4076TAX1.length() != 2) {
                                    result = "THE TAX1 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX1;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO1 = getCellValue(currentRow.getCell(21));
                            if (!fileA4076.A4076ATO1.equals("")) {
                                if (fileA4076.A4076ATO1.length() != 3) {
                                    result = "THE ATO MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO1;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(22)).equals("")) {
                                fileA4076.A4076MONTAX1 = Float.parseFloat(getCellValue(currentRow.getCell(22)));
                            } else {
                                fileA4076.A4076MONTAX1 = 0;
                            }
                            /**
                             * **TAX2 **
                             */
                            fileA4076.A4076TAX2 = getCellValue(currentRow.getCell(23));
                            if (!fileA4076.A4076TAX2.equals("")) {
                                if (fileA4076.A4076TAX2.length() != 2) {
                                    result = "THE TAX2 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX2;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO2 = getCellValue(currentRow.getCell(24));
                            if (!fileA4076.A4076ATO2.equals("")) {
                                if (fileA4076.A4076ATO2.length() != 3) {
                                    result = "THE ATO2 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO2;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(25)).equals("")) {
                                fileA4076.A4076MONTAX2 = Float.parseFloat(getCellValue(currentRow.getCell(25)));
                            } else {
                                fileA4076.A4076MONTAX2 = 0;
                            }
                            /**
                             * **TAX3 **
                             */
                            fileA4076.A4076TAX3 = getCellValue(currentRow.getCell(26));
                            if (!fileA4076.A4076TAX3.equals("")) {
                                if (fileA4076.A4076TAX3.length() != 2) {
                                    result = "THE TAX3 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX3;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO3 = getCellValue(currentRow.getCell(27));
                            if (!fileA4076.A4076ATO3.equals("")) {
                                if (fileA4076.A4076ATO3.length() != 3) {
                                    result = "THE ATO3 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO3;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(28)).equals("")) {
                                fileA4076.A4076MONTAX3 = Float.parseFloat(getCellValue(currentRow.getCell(28)));
                            } else {
                                fileA4076.A4076MONTAX3 = 0;
                            }
                            /**
                             * **TAX4 **
                             */
                            fileA4076.A4076TAX4 = getCellValue(currentRow.getCell(29));
                            if (!fileA4076.A4076TAX4.equals("")) {
                                if (fileA4076.A4076TAX4.length() != 2) {
                                    result = "THE TAX4 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX4;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO4 = getCellValue(currentRow.getCell(30));
                            if (!fileA4076.A4076ATO4.equals("")) {
                                if (fileA4076.A4076ATO4.length() != 3) {
                                    result = "THE ATO4 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO4;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(31)).equals("")) {
                                fileA4076.A4076MONTAX4 = Float.parseFloat(getCellValue(currentRow.getCell(31)));
                            } else {
                                fileA4076.A4076MONTAX4 = 0;
                            }
                            /**
                             * **TAX5 **
                             */
                            fileA4076.A4076TAX5 = getCellValue(currentRow.getCell(32));
                            if (!fileA4076.A4076TAX5.equals("")) {
                                if (fileA4076.A4076TAX5.length() != 2) {
                                    result = "THE TAX5 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX5;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO5 = getCellValue(currentRow.getCell(33));
                            if (!fileA4076.A4076ATO5.equals("")) {
                                if (fileA4076.A4076ATO5.length() != 3) {
                                    result = "THE ATO5 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO5;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(34)).equals("")) {
                                fileA4076.A4076MONTAX5 = Float.parseFloat(getCellValue(currentRow.getCell(34)));
                            } else {
                                fileA4076.A4076MONTAX5 = 0;
                            }

                            /**
                             * **TAX6 **
                             */
                            fileA4076.A4076TAX6 = getCellValue(currentRow.getCell(35));
                            if (!fileA4076.A4076TAX6.equals("")) {
                                if (fileA4076.A4076TAX6.length() != 2) {
                                    result = "THE TAX6 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX6;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO6 = getCellValue(currentRow.getCell(36));
                            if (!fileA4076.A4076ATO6.equals("")) {
                                if (fileA4076.A4076ATO6.length() != 3) {
                                    result = "THE ATO6 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO6;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(37)).equals("")) {
                                fileA4076.A4076MONTAX6 = Float.parseFloat(getCellValue(currentRow.getCell(37)));
                            } else {
                                fileA4076.A4076MONTAX6 = 0;
                            }
                            /**
                             * **TAX7 **
                             */
                            fileA4076.A4076TAX7 = getCellValue(currentRow.getCell(38));
                            if (!fileA4076.A4076TAX7.equals("")) {
                                if (fileA4076.A4076TAX7.length() != 2) {
                                    result = "THE TAX7 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX7;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO7 = getCellValue(currentRow.getCell(39));
                            if (!fileA4076.A4076ATO7.equals("")) {
                                if (fileA4076.A4076ATO7.length() != 3) {
                                    result = "THE ATO7 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO7;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(40)).equals("")) {
                                fileA4076.A4076MONTAX7 = Float.parseFloat(getCellValue(currentRow.getCell(40)));
                            } else {
                                fileA4076.A4076MONTAX7 = 0;
                            }
                            /**
                             * **TAX8 **
                             */
                            fileA4076.A4076TAX8 = getCellValue(currentRow.getCell(41));
                            if (!fileA4076.A4076TAX8.equals("")) {
                                if (fileA4076.A4076TAX8.length() != 2) {
                                    result = "THE TAX8 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX8;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO8 = getCellValue(currentRow.getCell(42));
                            if (!fileA4076.A4076ATO8.equals("")) {
                                if (fileA4076.A4076ATO8.length() != 3) {
                                    result = "THE ATO8 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO8;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(43)).equals("")) {
                                fileA4076.A4076MONTAX8 = Float.parseFloat(getCellValue(currentRow.getCell(43)));
                            } else {
                                fileA4076.A4076MONTAX8 = 0;
                            }
                            /**
                             * **TAX9 **
                             */
                            fileA4076.A4076TAX9 = getCellValue(currentRow.getCell(44));
                            if (!fileA4076.A4076TAX9.equals("")) {
                                if (fileA4076.A4076TAX9.length() != 2) {
                                    result = "THE TAX9 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX9;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO9 = getCellValue(currentRow.getCell(45));
                            if (!fileA4076.A4076ATO9.equals("")) {
                                if (fileA4076.A4076ATO9.length() != 3) {
                                    result = "THE ATO9 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO9;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(46)).equals("")) {
                                fileA4076.A4076MONTAX9 = Float.parseFloat(getCellValue(currentRow.getCell(46)));
                            } else {
                                fileA4076.A4076MONTAX9 = 0;
                            }
                            /**
                             * **TAX10 **
                             */
                            fileA4076.A4076TAX10 = getCellValue(currentRow.getCell(47));
                            if (!fileA4076.A4076TAX10.equals("")) {
                                if (fileA4076.A4076TAX10.length() != 2) {
                                    result = "THE TAX10 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX10;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO10 = getCellValue(currentRow.getCell(48));
                            if (!fileA4076.A4076ATO10.equals("")) {
                                if (fileA4076.A4076ATO10.length() != 3) {
                                    result = "THE ATO10 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO10;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(49)).equals("")) {
                                fileA4076.A4076MONTAX10 = Float.parseFloat(getCellValue(currentRow.getCell(49)));
                            } else {
                                fileA4076.A4076MONTAX10 = 0;
                            }
                            /**
                             * **TAX11 **
                             */
                            fileA4076.A4076TAX11 = getCellValue(currentRow.getCell(50));
                            if (!fileA4076.A4076TAX11.equals("")) {
                                if (fileA4076.A4076TAX11.length() != 2) {
                                    result = "THE TAX11 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX11;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO11 = getCellValue(currentRow.getCell(51));
                            if (!fileA4076.A4076ATO11.equals("")) {
                                if (fileA4076.A4076ATO11.length() != 3) {
                                    result = "THE ATO11 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO11;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(52)).equals("")) {
                                fileA4076.A4076MONTAX11 = Float.parseFloat(getCellValue(currentRow.getCell(52)));
                            } else {
                                fileA4076.A4076MONTAX11 = 0;
                            }
                            /**
                             * **TAX13 **
                             */
                            fileA4076.A4076TAX12 = getCellValue(currentRow.getCell(53));
                            if (!fileA4076.A4076TAX12.equals("")) {
                                if (fileA4076.A4076TAX12.length() != 2) {
                                    result = "THE TAX12 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX12;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO12 = getCellValue(currentRow.getCell(54));
                            if (!fileA4076.A4076ATO12.equals("")) {
                                if (fileA4076.A4076ATO12.length() != 3) {
                                    result = "THE ATO12 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO12;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(55)).equals("")) {
                                fileA4076.A4076MONTAX12 = Float.parseFloat(getCellValue(currentRow.getCell(55)));
                            } else {
                                fileA4076.A4076MONTAX12 = 0;
                            }
                            /**
                             * **TAX13 **
                             */
                            fileA4076.A4076TAX13 = getCellValue(currentRow.getCell(56));
                            if (!fileA4076.A4076TAX13.equals("")) {
                                if (fileA4076.A4076TAX13.length() != 2) {
                                    result = "THE TAX13 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX13;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO13 = getCellValue(currentRow.getCell(57));
                            if (!fileA4076.A4076ATO13.equals("")) {
                                if (fileA4076.A4076ATO13.length() != 3) {
                                    result = "THE ATO13 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO13;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(58)).equals("")) {
                                fileA4076.A4076MONTAX13 = Float.parseFloat(getCellValue(currentRow.getCell(58)));
                            } else {
                                fileA4076.A4076MONTAX13 = 0;
                            }
                            /**
                             * **TAX14 **
                             */
                            fileA4076.A4076TAX14 = getCellValue(currentRow.getCell(59));
                            if (!fileA4076.A4076TAX14.equals("")) {
                                if (fileA4076.A4076TAX14.length() != 2) {
                                    result = "THE TAX14 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX14;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO14 = getCellValue(currentRow.getCell(60));
                            if (!fileA4076.A4076ATO14.equals("")) {
                                if (fileA4076.A4076ATO14.length() != 3) {
                                    result = "THE ATO14 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO14;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(61)).equals("")) {
                                fileA4076.A4076MONTAX14 = Float.parseFloat(getCellValue(currentRow.getCell(61)));
                            } else {
                                fileA4076.A4076MONTAX14 = 0;
                            }
                            /**
                             * **TAX15 **
                             */
                            fileA4076.A4076TAX15 = getCellValue(currentRow.getCell(62));
                            if (!fileA4076.A4076TAX15.equals("")) {
                                if (fileA4076.A4076TAX15.length() != 2) {
                                    result = "THE TAX15 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX15;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO15 = getCellValue(currentRow.getCell(63));
                            if (!fileA4076.A4076ATO15.equals("")) {
                                if (fileA4076.A4076ATO15.length() != 3) {
                                    result = "THE ATO15 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO15;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(64)).equals("")) {
                                fileA4076.A4076MONTAX15 = Float.parseFloat(getCellValue(currentRow.getCell(64)));
                            } else {
                                fileA4076.A4076MONTAX15 = 0;
                            }
                            /**
                             * **TAX16 **
                             */
                            fileA4076.A4076TAX16 = getCellValue(currentRow.getCell(65));
                            if (!fileA4076.A4076TAX16.equals("")) {
                                if (fileA4076.A4076TAX16.length() != 2) {
                                    result = "THE TAX16 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX16;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO16 = getCellValue(currentRow.getCell(66));
                            if (!fileA4076.A4076ATO16.equals("")) {
                                if (fileA4076.A4076ATO16.length() != 3) {
                                    result = "THE ATO16 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO16;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(67)).equals("")) {
                                fileA4076.A4076MONTAX16 = Float.parseFloat(getCellValue(currentRow.getCell(67)));
                            } else {
                                fileA4076.A4076MONTAX16 = 0;
                            }

                            /**
                             * **TAX17 **
                             */
                            fileA4076.A4076TAX17 = getCellValue(currentRow.getCell(68));
                            if (!fileA4076.A4076TAX17.equals("")) {
                                if (fileA4076.A4076TAX17.length() != 2) {
                                    result = "THE TAX17 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX17;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO17 = getCellValue(currentRow.getCell(69));
                            if (!fileA4076.A4076ATO17.equals("")) {
                                if (fileA4076.A4076ATO17.length() != 3) {
                                    result = "THE ATO17 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO17;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(70)).equals("")) {
                                fileA4076.A4076MONTAX17 = Float.parseFloat(getCellValue(currentRow.getCell(70)));
                            } else {
                                fileA4076.A4076MONTAX17 = 0;
                            }
                            /**
                             * **TAX18 **
                             */
                            fileA4076.A4076TAX18 = getCellValue(currentRow.getCell(71));
                            if (!fileA4076.A4076TAX18.equals("")) {
                                if (fileA4076.A4076TAX18.length() != 2) {
                                    result = "THE TAX18 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX18;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO18 = getCellValue(currentRow.getCell(72));
                            if (!fileA4076.A4076ATO18.equals("")) {
                                if (fileA4076.A4076ATO18.length() != 3) {
                                    result = "THE ATO18 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO18;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(73)).equals("")) {
                                fileA4076.A4076MONTAX18 = Float.parseFloat(getCellValue(currentRow.getCell(73)));
                            } else {
                                fileA4076.A4076MONTAX18 = 0;
                            }
                            if (!getCellValue(currentRow.getCell(74)).equals("")) {
                                fileA4076.A4076NETO = Float.parseFloat(getCellValue(currentRow.getCell(74)));
                            } else {
                                fileA4076.A4076NETO = 0;
                            }
                            if (!getCellValue(currentRow.getCell(75)).equals("")) {
                                fileA4076.A4076TCMBC = Float.parseFloat(getCellValue(currentRow.getCell(75)));
                            } else {
                                fileA4076.A4076TCMBC = 0;
                            }
                            if (!getCellValue(currentRow.getCell(76)).equals("")) {
                                fileA4076.A4076COMI = Float.parseFloat(getCellValue(currentRow.getCell(76)));
                            } else {
                                fileA4076.A4076COMI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(77)).equals("")) {
                                fileA4076.A4076TCMBT = Float.parseFloat(getCellValue(currentRow.getCell(77)));
                            } else {
                                fileA4076.A4076TCMBT = 0;
                            }
                            if (!getCellValue(currentRow.getCell(78)).equals("")) {
                                fileA4076.A4076TAXCO = Float.parseFloat(getCellValue(currentRow.getCell(78)));
                            } else {
                                fileA4076.A4076TAXCO = 0;
                            }
                            fileA4076.A4076BASE = getCellValue(currentRow.getCell(79));
                            if (fileA4076.A4076BASE.equals("")) {
                                result = "TYPE required";
                                break;
                            }
                            if (fileA4076.A4076BASE.length() != 4) {
                                result = "THE TYPE MUST BE 4 CHARACTERES  " + fileA4076.A4076BASE;
                                break;
                            }
                        } else {
                            fileA4076.A4076TICKET = getCellValue(currentRow.getCell(0));
                            if (fileA4076.A4076TICKET.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA4076.A4076TICKET.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES  " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(2)).equals("")) {
                                fileA4076.A4076NETO = Float.parseFloat(getCellValue(currentRow.getCell(2)));
                            } else {
                                fileA4076.A4076NETO = 0;
                            }
                            fileA4076.A4076REFE = getCellValue(currentRow.getCell(3));
                            if (fileA4076.A4076REFE.equals("")) {
                                result = "REFERENCE required";
                                break;
                            }
                            fileA4076.A4076MDA = getCellValue(currentRow.getCell(4));
                            if (fileA4076.A4076MDA.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA4076.A4076MDA.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES  " + fileA4076.A4076MDA;
                                break;
                            }
                            fileA4076.A4076TDOC = getCellValue(currentRow.getCell(5));
                            if (fileA4076.A4076TDOC.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076TDOC.length() != 4) {
                                result = "THE TDOC MUST BE 4 CHARACTERES  " + fileA4076.A4076TDOC;
                                break;
                            }

                            fileA4076.A4076FVTA = getCellValue(currentRow.getCell(6));
                            if (fileA4076.A4076FVTA.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076FVTA.length() != 10) {
                                result = "THE SALE DATE MUST BE 4 CHARACTERES  " + fileA4076.A4076FVTA;
                                break;
                            }
                            fileA4076.A4076BASE = getCellValue(currentRow.getCell(7));
                            if (fileA4076.A4076BASE.equals("")) {
                                result = "TYPE required";
                                break;
                            }
                            if (fileA4076.A4076BASE.length() != 4) {
                                result = "THE TYPE MUST BE 4 CHARACTERES  " + fileA4076.A4076BASE;
                                break;
                            }

                            fileA4076.A4076IATA = "";
                            fileA4076.A4076TRNCO = "";
                            fileA4076.A4076CPN = "";
                            fileA4076.A4076FP1 = "";
                            fileA4076.A4076CARD1 = "";
                            fileA4076.A4076MONTCARD1 = 0.00;
                            fileA4076.A4076FP2 = "";
                            fileA4076.A4076CARD2 = "";
                            fileA4076.A4076MONTCARD2 = 0.00;
                            fileA4076.A4076MONTT = "";
                            fileA4076.A4076TARTK = 0.00;
                            fileA4076.A4076MONET = "";
                            fileA4076.A4076EQVTK = 0.00;
                            fileA4076.A4076TAX1 = "";
                            fileA4076.A4076ATO1 = "";
                            fileA4076.A4076MONTAX1 = 0.00;
                            fileA4076.A4076TAX2 = "";
                            fileA4076.A4076ATO2 = "";
                            fileA4076.A4076MONTAX2 = 0.00;
                            fileA4076.A4076TAX3 = "";
                            fileA4076.A4076ATO3 = "";
                            fileA4076.A4076MONTAX3 = 0.00;
                            fileA4076.A4076TAX4 = "";
                            fileA4076.A4076ATO4 = "";
                            fileA4076.A4076MONTAX4 = 0.00;
                            fileA4076.A4076TAX5 = "";
                            fileA4076.A4076ATO5 = "";
                            fileA4076.A4076MONTAX5 = 0.00;
                            fileA4076.A4076TAX6 = "";
                            fileA4076.A4076ATO6 = "";
                            fileA4076.A4076MONTAX6 = 0.00;
                            fileA4076.A4076TAX7 = "";
                            fileA4076.A4076ATO7 = "";
                            fileA4076.A4076MONTAX7 = 0.00;
                            fileA4076.A4076TAX8 = "";
                            fileA4076.A4076ATO8 = "";
                            fileA4076.A4076MONTAX8 = 0.00;
                            fileA4076.A4076TAX9 = "";
                            fileA4076.A4076ATO9 = "";
                            fileA4076.A4076MONTAX9 = 0.00;
                            fileA4076.A4076TAX10 = "";
                            fileA4076.A4076ATO10 = "";
                            fileA4076.A4076MONTAX10 = 0.00;
                            fileA4076.A4076TAX11 = "";
                            fileA4076.A4076ATO11 = "";
                            fileA4076.A4076MONTAX11 = 0.00;
                            fileA4076.A4076TAX12 = "";
                            fileA4076.A4076ATO12 = "";
                            fileA4076.A4076MONTAX12 = 0.00;
                            fileA4076.A4076TAX13 = "";
                            fileA4076.A4076ATO13 = "";
                            fileA4076.A4076MONTAX13 = 0.00;
                            fileA4076.A4076TAX14 = "";
                            fileA4076.A4076ATO14 = "";
                            fileA4076.A4076MONTAX14 = 0.00;
                            fileA4076.A4076TAX15 = "";
                            fileA4076.A4076ATO15 = "";
                            fileA4076.A4076MONTAX15 = 0.00;
                            fileA4076.A4076TAX16 = "";
                            fileA4076.A4076ATO16 = "";
                            fileA4076.A4076MONTAX16 = 0.00;
                            fileA4076.A4076TAX17 = "";
                            fileA4076.A4076ATO17 = "";
                            fileA4076.A4076MONTAX17 = 0.00;
                            fileA4076.A4076TAX18 = "";
                            fileA4076.A4076ATO18 = "";
                            fileA4076.A4076MONTAX18 = 0.00;
                            fileA4076.A4076TCMBC = 0.00;
                            fileA4076.A4076COMI = 0.00;
                            fileA4076.A4076TCMBT = 0.00;
                            fileA4076.A4076TAXCO = 0.00;
                            fileA4076.A4076TCARD1="";
                            fileA4076.A4076TCARD2="";

                        }
                        lstGeneral.add(fileA4076);

                    }
                }
            }
            if (result.equals("")) {
                result = logic.subirExcel(lstGeneral);
            }

            // byte[] bytes = file.getBytes();
            // result = validar_excel(bytes, filename, filter);
            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    //cellValue = String.valueOf(cell.getCellFormula());
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "";
                    break;
                default:
                    cellValue = cell.toString().trim();
                    break;
            }
        }
        return cellValue.trim();
    }
}
