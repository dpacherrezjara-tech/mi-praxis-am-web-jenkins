/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.screens;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.A2826Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF053Filter;
import net.miatech.beans.IMF111Filter;
import net.miatech.beans.PX228S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libcust.A051wr;
import net.miatech.libmiatec.A1007;
import static net.miatech.praxis.dao.tnu.AtlSalesUseMonthlyBalanceDAO.pasarGarbageCollector;
import net.miatech.praxis.interline.filter.IMF117Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class Dashboard01DAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public Dashboard01DAO() {
    }

    public Dashboard01DAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public Map<Byte, List<DashboardFilter>> obtaingData(DashboardFilter filter) throws SQLException, Exception {

        Map<Byte, List<DashboardFilter>> mapRtn = new HashMap<Byte, List<DashboardFilter>>(0);
        List<DashboardFilter> lstSalesByMonthTotals = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByMonthData = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByChannelsTotals = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByChannelsData = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByCountrysData = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        String flag = "";

        mapRtn.put(DashboardFilter.P_SALES_PER_MONTH_TOTALS, lstSalesByMonthTotals);
        mapRtn.put(DashboardFilter.P_SALES_PER_MONTH_DATA, lstSalesByMonthData);
        mapRtn.put(DashboardFilter.P_SALES_PER_CHANNELS_TOTALS, lstSalesByChannelsTotals);
        mapRtn.put(DashboardFilter.P_SALES_PER_CHANNELS_DATA, lstSalesByChannelsData);
        mapRtn.put(DashboardFilter.P_SALES_PER_COUNTRYS_DATA, lstSalesByCountrysData);

        CallableStatement cstmt01 = null;
        ResultSet rs00 = null, rs01 = null, rs02 = null, rs03 = null, rs04 = null;
        double totQTYCPN = 0, totQTYON = 0, totQTYOFF = 0, totQTYFL = 0;
        double totAMOCPN = 0, totAMOON = 0, totAMOOFF = 0, totAMOFL = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".S0001P0001(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAIS);
            cstmt01.setByte(5, filter.TOP);

            cstmt01.execute();

            rs00 = cstmt01.getResultSet();
            while (rs00.next()) {
                objRtn = new DashboardFilter();
                objRtn.QCPNSF = rs00.getInt("QCPNSF");
                objRtn.AMOUNTF = rs00.getDouble("AMOUNTF");
                objRtn.TOTAL_CUPONS_PERCENTF = rs00.getDouble("TOTAL_COUPON_FLOWN_PER");
                objRtn.TOTAL_AMOUNT = rs00.getDouble("TOTAL_AMOUNT");
                objRtn.TOTAL_CUPONS = rs00.getInt("TOTAL_CUPONS");
                objRtn.totAVG = rs00.getDouble("TOTAL_AMOUNT") / rs00.getInt("TOTAL_CUPONS");
                objRtn.TOTAL_AMOUNT_OFF = rs00.getDouble("TOTAL_AMOUNT_OFF");
                objRtn.TOTAL_AMOUNT_ON = rs00.getDouble("TOTAL_AMOUNT_ON");
                objRtn.TOTAL_CUPONS_OFF = rs00.getInt("TOTAL_CUPONS_OFF");
                objRtn.TOTAL_CUPONS_ON = rs00.getInt("TOTAL_CUPONS_ON");
                objRtn.TOTAL_AMOUNT_ON_AVG_RATE = rs00.getDouble("TOTAL_AMOUNT_ON_AVG_RATE");
                objRtn.TOTAL_AMOUNT_OFF_AVG_RATE = rs00.getDouble("TOTAL_AMOUNT_OFF_AVG_RATE");
                objRtn.TOTAL_AMOUNT0 = rs00.getDouble("TOTAL_AMOUNTNR");
                objRtn.TOTAL_QCPNS0 = rs00.getInt("TOTAL_CUPONSNR");

                objRtn.AMOUNT_OFF_PERCENT = rs00.getDouble("AMOUNT_OFF_PERCENT");
                objRtn.AMOUNT_ON_PERCENT = rs00.getDouble("AMOUNT_ON_PERCENT");
                objRtn.CUPONS_OFF_PERCENT = rs00.getDouble("CUPONS_OFF_PERCENT");
                objRtn.CUPONS_ON_PERCENT = rs00.getDouble("CUPONS_ON_PERCENT");
                lstSalesByMonthTotals.add(objRtn);

                totQTYCPN = objRtn.TOTAL_CUPONS;
                totQTYON = objRtn.TOTAL_CUPONS_ON;
                totQTYOFF = objRtn.TOTAL_CUPONS_OFF;
                totQTYFL += objRtn.QCPNSF;
                totAMOCPN = objRtn.TOTAL_AMOUNT;
                totAMOON = objRtn.TOTAL_AMOUNT_ON;
                totAMOOFF = objRtn.TOTAL_AMOUNT_OFF;
                totAMOFL += objRtn.AMOUNTF;
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                    //objRtn.strFormatDate = Functions.getAbreviaturaMes(objRtn.DSALES.substring(4,6));            

                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.QCPNSF = rs01.getInt("QCPNSF");
                    objRtn.AMOUNTF = rs01.getDouble("AMOUNTF");
                    objRtn.CUPONS_PERCENTF = rs01.getDouble("COUPON_FLOWN_PERC");
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.CUPONS_AVG = rs01.getDouble("CUPONS_AVG");
                    objRtn.AMOUNT_AVG_RATE = rs01.getDouble("AMOUNT_AVG_RATE");
                    objRtn.AMOUNT_OFF = rs01.getDouble("AMOUNT_OFF");
                    objRtn.AMOUNT_ON = rs01.getDouble("AMOUNT_ON");
                    objRtn.CUPONS_OFF = rs01.getInt("CUPONS_OFF");
                    objRtn.CUPONS_ON = rs01.getInt("CUPONS_ON");
                    objRtn.AMOUNT_OFF_PERCENT = rs01.getDouble("AMOUNT_OFF_PERCENT");
                    objRtn.AMOUNT_ON_PERCENT = rs01.getDouble("AMOUNT_ON_PERCENT");
                    objRtn.CUPONS_OFF_PERCENT = rs01.getDouble("CUPONS_OFF_PERCENT");
                    objRtn.CUPONS_ON_PERCENT = rs01.getDouble("CUPONS_ON_PERCENT");
                    objRtn.AMOUNT_OFF_AVG_RATE = rs01.getDouble("AMOUNT_OFF_AVG_RATE");
                    objRtn.AMOUNT_ON_AVG_RATE = rs01.getDouble("AMOUNT_ON_AVG_RATE");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNTNR");
                    objRtn.QCPNS0 = rs01.getInt("CUPONSNR");

                    objRtn.totQTYCPN = totQTYCPN;
                    objRtn.totQTYON = totQTYON;
                    objRtn.totQTYOFF = totQTYOFF;
                    objRtn.totQTYFL = totQTYFL;
                    objRtn.totAMOCPN = totAMOCPN;
                    objRtn.totAMOON = totAMOON;
                    objRtn.totAMOOFF = totAMOOFF;
                    objRtn.totAMOFL = totAMOFL;

                    flag = rs01.getString("FLAG");
                    objRtn.FLAG = flag.substring(0, 1);
                    objRtn.COMENTARIO = flag.substring(1);
                    if (!objRtn.FLAG.equals("1")) {//cuando sea 0 esta abierto y contiene fecha
                        objRtn.COMENTARIO = Functions.getMonthConvert(objRtn.COMENTARIO);
                        //objRtn.COMENTARIO = Functions.getMonthConvert(Functions.rest1DaytoDate(Functions.getFechaActual()));
                    }
                    lstSalesByMonthData.add(objRtn);
                }
                if (cstmt01.getMoreResults()) {
                    rs02 = cstmt01.getResultSet();

                    if (rs02.next()) {
                        objRtn = new DashboardFilter();
                        objRtn.TOTAL_AMOUNT = rs02.getDouble("TOTAL_AMOUNT");
                        objRtn.TOTAL_CUPONS = rs02.getInt("TOTAL_CUPONS");
                        objRtn.TOTAL_AMOUNT_OFF = rs02.getDouble("TOTAL_AMOUNT_OFF");
                        objRtn.TOTAL_AMOUNT_ON = rs02.getDouble("TOTAL_AMOUNT_ON");
                        objRtn.TOTAL_CUPONS_OFF = rs02.getInt("TOTAL_CUPONS_OFF");
                        objRtn.TOTAL_CUPONS_ON = rs02.getInt("TOTAL_CUPONS_ON");
                        objRtn.TOTAL_AMOUNT_ON_AVG_RATE = rs02.getDouble("TOTAL_AMOUNT_ON_AVG_RATE");
                        objRtn.TOTAL_AMOUNT_OFF_AVG_RATE = rs02.getDouble("TOTAL_AMOUNT_OFF_AVG_RATE");
                        objRtn.TOTAL_AMOUNT0 = rs02.getDouble("TOTAL_AMOUNTNR");
                        objRtn.TOTAL_QCPNS0 = rs02.getInt("TOTAL_CUPONSNR");
                        lstSalesByChannelsTotals.add(objRtn);
                    }

                    if (cstmt01.getMoreResults()) {
                        rs03 = cstmt01.getResultSet();

                        while (rs03.next()) {
                            objRtn = new DashboardFilter();
                            objRtn.CANAV = rs03.getString("CANAV");
                            objRtn.CANAVT = rs03.getString("CANAVT");
                            objRtn.CUPONS = rs03.getInt("CUPONS");
                            objRtn.AMOUNT = rs03.getDouble("AMOUNT");
                            objRtn.TARIFA = rs03.getDouble("TARIFA");
                            objRtn.CUPONS_AVG = rs03.getDouble("AVG_CUPONS");
                            objRtn.AMOUNT_AVG_RATE = rs03.getDouble("AVG");
                            objRtn.AMOUNT_OFF = rs03.getDouble("AMOUNT_OFF");
                            objRtn.AMOUNT_ON = rs03.getDouble("AMOUNT_ON");
                            objRtn.CUPONS_OFF = rs03.getInt("CUPONS_OFF");
                            objRtn.CUPONS_ON = rs03.getInt("CUPONS_ON");
                            objRtn.AMOUNT_OFF_AVG_RATE = rs03.getDouble("AMOUNT_OFF_AVG_RATE");
                            objRtn.AMOUNT_ON_AVG_RATE = rs03.getDouble("AMOUNT_ON_AVG_RATE");
                            objRtn.AMOUNT0 = rs03.getDouble("AMOUNTNR");
                            objRtn.QCPNS0 = rs03.getInt("CUPONSNR");
                            lstSalesByChannelsData.add(objRtn);
                        }

                        if (cstmt01.getMoreResults()) {
                            rs04 = cstmt01.getResultSet();

                            while (rs04.next()) {
                                objRtn = new DashboardFilter();
                                objRtn.COUNTRY = rs04.getString("COUNTRY");
                                objRtn.COUNTRY_NAME = rs04.getString("COUNTRY_NAME");
                                objRtn.AMOUNT = rs04.getDouble("AMOUNT");
                                objRtn.CUPONS = rs04.getInt("CUPONS");
                                objRtn.AMOUNT_OFF = rs04.getDouble("AMOUNT_OFF");
                                objRtn.AMOUNT_ON = rs04.getDouble("AMOUNT_ON");
                                objRtn.CUPONS_OFF = rs04.getInt("CUPONS_OFF");
                                objRtn.CUPONS_ON = rs04.getInt("CUPONS_ON");
                                objRtn.AMOUNT0 = rs04.getDouble("AMOUNTNR");
                                objRtn.QCPNS0 = rs04.getInt("CUPONSNR");

                                lstSalesByCountrysData.add(objRtn);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs00 != null) {
                rs00.close();
            }
            if (rs01 != null) {
                rs01.close();
            }
            if (rs02 != null) {
                rs02.close();
            }
            if (rs03 != null) {
                rs03.close();
            }
            if (rs04 != null) {
                rs04.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
        }

        return mapRtn;
    }

    public List<DashboardFilter> loadPX109SQP00641(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int CUPONS = 0, QCPNSF = 0, CUPONSNR = 0;
        double AMOUNT = 0, AMOUNTF = 0, TARIFA = 0, AMOUNTNR = 0;
        String strTitulo = "";
        if (!filter.strFormatDate.trim().isEmpty()) {
            strTitulo += "Sales Date : " + filter.strFormatDate.trim() + "  -  ";
        }
        if (!filter.ALLIC.trim().isEmpty()) {
            //strTitulo += "Alliance : " + filter.ALLIC.trim() + "  -  ";
            if (filter.ALLIC.trim().equals("SKY")) {
                strTitulo += "Alliance : Sky Team  -  ";
            } else if (filter.ALLIC.trim().equals("ONE")) {
                strTitulo += "Alliance : One World  -  ";
            } else if (filter.ALLIC.trim().equals("STA")) {
                strTitulo += "Alliance : Star Alliance  -  ";
            } else if (filter.ALLIC.trim().equals("OTH")) {
                strTitulo += "Alliance : Other Airlines  -  ";
            }
        }
        if (!filter.IN_PAIS.trim().isEmpty()) {
            strTitulo += "Country : " + filter.IN_PAIS.trim() + "  -  ";
        }
        if (!filter.COUNTRY.trim().isEmpty()) {
            if (filter.COUNTRY.trim().length() == 2) {
                strTitulo += "Country : " + filter.COUNTRY.trim() + " " + filter.COUNTRY_NAME.trim() + "  -  ";
            } else {
                strTitulo += "City : " + filter.COUNTRY.trim() + " " + filter.COUNTRY_NAME.trim() + "  -  ";
            }
        }
        if (!filter.CARRIER.trim().isEmpty()) {
            strTitulo += "Carrier : " + filter.CARRIER.trim() + "  -  ";
        }

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00641(?,?,?,?,?,?,?,?,?)}";
        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);//Pais o ciudad
            cstmt01.setString(8, filter.COUNTRY);
            cstmt01.setString(9, filter.CARRIER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CUPONS = rs01.getInt("CUPONS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNSF = rs01.getInt("QCPNSF");
                AMOUNTF = rs01.getDouble("AMOUNTF");
                TARIFA = rs01.getDouble("TARIFA");
                CUPONSNR = rs01.getInt("CUPONSNR");
                AMOUNTNR = rs01.getDouble("AMOUNTNR");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.IN_ALLIC = filter.strDescription;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.DSALES = filter.DSALES;
                    objRtn.TYPE = filter.TYPE;
                    objRtn.CARRIER = filter.CARRIER;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.COUNTRY = rs01.getString("NOMBRE");//Pais o ciudad 
                    objRtn.COUNTRY_NAME = rs01.getString("DESCRIP");
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.QCPNSF = rs01.getInt("QCPNSF");
                    objRtn.AMOUNTF = rs01.getDouble("AMOUNTF");
                    objRtn.CUPONS_PERCENT = (CUPONS > 0) ? ((objRtn.CUPONS * 100.00) / CUPONS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.strDescription5 = strTitulo;
                    objRtn.QCPNS0 = rs01.getInt("CUPONSNR");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNTNR");
                    //Totales
                    objRtn.TOTAL_CUPONS = CUPONS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_CUPONSF = QCPNSF;
                    objRtn.TOTAL_AMOUNTF = AMOUNTF;
                    objRtn.TOTAL_AVG = TARIFA;
                    objRtn.TOTAL_QCPNS0 = CUPONSNR;
                    objRtn.TOTAL_AMOUNT0 = AMOUNTNR;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP00642(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int CUPONS = 0, CUPONSNR = 0; //, QCPNSF = 0;
        double AMOUNT = 0, AMOUNTNR = 0, TARIFA = 0; //, AMOUNTF = 0;
        String strTitulo = "";
        if (!filter.strFormatDate.trim().isEmpty()) {
            strTitulo += "Sales Date : " + filter.strFormatDate.trim() + "  -  ";
        }
        if (!filter.ALLIC.trim().isEmpty()) {
            //strTitulo += "Alliance : " + filter.ALLIC.trim() + "  -  ";
            if (filter.ALLIC.trim().equals("SKY")) {
                strTitulo += "Alliance : Sky Team  -  ";
            } else if (filter.ALLIC.trim().equals("ONE")) {
                strTitulo += "Alliance : One World  -  ";
            } else if (filter.ALLIC.trim().equals("STA")) {
                strTitulo += "Alliance : Star Alliance  -  ";
            } else if (filter.ALLIC.trim().equals("OTH")) {
                strTitulo += "Alliance : Other Airlines  -  ";
            }
        }
        if (!filter.IN_PAIS.trim().isEmpty()) {
            strTitulo += "Country : " + filter.IN_PAIS.trim() + "  -  ";
        }
        if (!filter.COUNTRY.trim().isEmpty()) {
            if (filter.COUNTRY.trim().length() == 2) {
                strTitulo += "Country : " + filter.COUNTRY.trim() + "  " + filter.COUNTRY_NAME.trim() + "  -  ";
            } else {
                strTitulo += "City : " + filter.COUNTRY.trim() + "  " + filter.COUNTRY_NAME.trim() + "  -  ";
            }
        }
        if (!filter.CARRIER.trim().isEmpty()) {
            strTitulo += "Carrier : " + filter.CARRIER.trim() + "  -  ";
        }

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }
        if (filter.strDescription5.contains("Country") && !strTitulo.contains("Country")) {
            strTitulo += "  -  " + filter.strDescription5.substring(filter.strDescription5.indexOf("Country"), filter.strDescription5.indexOf("Country") + 12);
        }

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00642(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY
            cstmt01.setString(9, filter.CARRIER);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CUPONS = rs01.getInt("CUPONS");
                AMOUNT = rs01.getDouble("AMOUNT");
                CUPONSNR = rs01.getInt("CUPONSNR");
                AMOUNTNR = rs01.getDouble("AMOUNTNR");
                //QCPNSF = rs01.getInt("QCPNSF");
                //AMOUNTF = rs01.getDouble("AMOUNTF");
                TARIFA = rs01.getDouble("AVG");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.TYPE = filter.TYPE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.IN_ALLIC = filter.IN_ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.COUNTRY_NAME = filter.COUNTRY_NAME;
                    objRtn.DSALES = filter.DSALES;
                    objRtn.CARRIER = filter.CARRIER;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.strDescription = rs01.getString("DESCRIP");
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.QCPNS0 = rs01.getInt("CUPONSNR");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNTNR");
                    //objRtn.QCPNSF = rs01.getInt("QCPNSF");
                    //objRtn.AMOUNTF = rs01.getDouble("AMOUNTF");
                    objRtn.CUPONS_PERCENT = (CUPONS > 0) ? ((objRtn.CUPONS * 100.00) / CUPONS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.TARIFA = rs01.getDouble("AVG");
                    objRtn.strDescription5 = strTitulo;
                    //Totales
                    objRtn.TOTAL_CUPONS = CUPONS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_QCPNS0 = CUPONSNR;
                    objRtn.TOTAL_AMOUNT0 = AMOUNTNR;
                    //objRtn.TOTAL_CUPONSF = QCPNSF;
                    //objRtn.TOTAL_AMOUNTF = AMOUNTF;
                    objRtn.TOTAL_AVG = TARIFA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01540(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int CUPONS = 0, CUPONSNR = 0; //, QCPNSF = 0;
        double AMOUNT = 0, AMOUNTNR = 0, TARIFA = 0; //, AMOUNTF = 0;
        String strTitulo = "";
        if (!filter.strFormatDate.trim().isEmpty()) {
            strTitulo += "Sales Date : " + filter.strFormatDate.trim() + "  -  ";
        }
        /*if (!filter.ALLIC.trim().isEmpty()) {
         strTitulo += "Alliance : " + filter.ALLIC.trim() + "  -  ";
         }
         if (!filter.IN_PAIS.trim().isEmpty()) {
         strTitulo += "Country : " + filter.IN_PAIS.trim() + "  -  ";
         }*/
        if (!filter.COUNTRY.trim().isEmpty()) {
            if (filter.COUNTRY.trim().length() == 2) {
                strTitulo += "Country : " + filter.COUNTRY.trim() + "  " + filter.COUNTRY_NAME.trim() + "  -  ";
            } else {
                strTitulo += "City : " + filter.COUNTRY.trim() + "  " + filter.COUNTRY_NAME.trim() + "  -  ";
            }
        }
        /*if (!filter.CARRIER.trim().isEmpty()) {
         strTitulo += "Carrier : " + filter.CARRIER.trim() + "  -  ";
         }*/

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }
        if (filter.strDescription5.contains("Country") && !strTitulo.contains("Country")) {
            strTitulo += "  -  " + filter.strDescription5.substring(filter.strDescription5.indexOf("Country"), filter.strDescription5.indexOf("Country") + 12);
        }

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01540(?,?,?,?,?,?,?,?,?)}";
        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.COUNTRY);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CUPONS = rs01.getInt("CUPONS");
                AMOUNT = rs01.getDouble("AMOUNT");
                CUPONSNR = rs01.getInt("CUPONSNR");
                AMOUNTNR = rs01.getDouble("AMOUNTNR");
                TARIFA = rs01.getDouble("AVG");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new DashboardFilter();
                    //objRtn.TYPE = filter.TYPE;
                    objRtn.strFormatDate = filter.strFormatDate;
                    //objRtn.IN_PAIS = filter.IN_PAIS;
                    //objRtn.ALLIC = filter.ALLIC;
                    //objRtn.IN_ALLIC = filter.IN_ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.COUNTRY_NAME = filter.COUNTRY_NAME;
                    objRtn.DSALES = filter.DSALES;
                    //objRtn.CARRIER = filter.CARRIER;
                    //objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    //objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.strDescription = rs01.getString("DESCRIP");
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.QCPNS0 = rs01.getInt("CUPONSNR");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNTNR");
                    objRtn.CUPONS_PERCENT = (CUPONS > 0) ? ((objRtn.CUPONS * 100.00) / CUPONS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.TARIFA = rs01.getDouble("AVG");
                    objRtn.strDescription5 = strTitulo;
                    //Totales
                    objRtn.TOTAL_CUPONS = CUPONS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_QCPNS0 = CUPONSNR;
                    objRtn.TOTAL_AMOUNT0 = AMOUNTNR;
                    objRtn.TOTAL_AVG = TARIFA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP04921(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        long SALETKT = 0, EXCHTKT = 0, RFNDTKT = 0, AADMTKT = 0, AACMTKT = 0;
        double SALEUSD = 0, EXCHUSD = 0, RFNDUSD = 0, AADMUSD = 0, AACMUSD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04921(?,?,?)}";
        session.getCNXIBMDB2().open();

        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                SALETKT = rs01.getLong("SALETKT");
                SALEUSD = rs01.getDouble("SALEUSD");
                EXCHTKT = rs01.getLong("EXCHTKT");
                EXCHUSD = rs01.getDouble("EXCHUSD");
                RFNDTKT = rs01.getLong("RFNDTKT");
                RFNDUSD = rs01.getDouble("RFNDUSD");
                AADMTKT = rs01.getLong("AADMTKT");
                AADMUSD = rs01.getDouble("AADMUSD");
                AACMTKT = rs01.getLong("AACMTKT");
                AACMUSD = rs01.getDouble("AACMUSD");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new DashboardFilter();

                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                    objRtn.SALETKT = rs01.getLong("SALETKT");
                    objRtn.SALEUSD = rs01.getDouble("SALEUSD");
                    objRtn.EXCHTKT = rs01.getLong("EXCHTKT");
                    objRtn.EXCHUSD = rs01.getDouble("EXCHUSD");
                    objRtn.RFNDTKT = rs01.getLong("RFNDTKT");
                    objRtn.RFNDUSD = rs01.getDouble("RFNDUSD");
                    objRtn.AADMTKT = rs01.getLong("AADMTKT");
                    objRtn.AADMUSD = rs01.getDouble("AADMUSD");
                    objRtn.AACMTKT = rs01.getLong("AACMTKT");
                    objRtn.AACMUSD = rs01.getDouble("AACMUSD");
                    objRtn.AMOUNT_SALES_PERCENT = (SALEUSD > 0) ? ((objRtn.SALEUSD * 100) / SALEUSD) : 0;
                    //Totales
                    objRtn.TOTAL_SALETKT = SALETKT;
                    objRtn.TOTAL_SALEUSD = SALEUSD;
                    objRtn.TOTAL_EXCHTKT = EXCHTKT;
                    objRtn.TOTAL_EXCHUSD = EXCHUSD;
                    objRtn.TOTAL_RFNDTKT = RFNDTKT;
                    objRtn.TOTAL_RFNDUSD = RFNDUSD;
                    objRtn.TOTAL_AADMTKT = AADMTKT;
                    objRtn.TOTAL_AADMUSD = AADMUSD;
                    objRtn.TOTAL_AACMTKT = AACMTKT;
                    objRtn.TOTAL_AACMUSD = AACMUSD;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP00644(DashboardFilter filter, String strGROUPBY) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int CUPONS = 0, CUPONS_ON = 0, CUPONS_OFF = 0, QCPNSF = 0, CUPONSNR = 0;
        double AMOUNT = 0, AMOUNT_ON = 0, AMOUNT_OFF = 0, AMOUNTF = 0, AMOUNTNR = 0;
        filter.TOP = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00644(?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAIS);
            cstmt01.setByte(5, filter.TOP);
            cstmt01.setString(6, strGROUPBY);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CUPONS = rs01.getInt("CUPONS");
                AMOUNT = rs01.getDouble("AMOUNT");
                CUPONS_ON = rs01.getInt("CUPON_ON");
                CUPONS_OFF = rs01.getInt("CUPON_OFF");
                AMOUNT_ON = rs01.getDouble("ON");
                AMOUNT_OFF = rs01.getDouble("OFF");
                QCPNSF = rs01.getInt("QCPNSF");
                AMOUNTF = rs01.getDouble("AMOUNTF");
                CUPONSNR = rs01.getInt("CUPONSNR");
                AMOUNTNR = rs01.getDouble("AMOUNTNR");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.TOP = filter.TOP;
                    objRtn.RN = rs01.getLong("RN");
                    if (strGROUPBY.equals("CITY")) {
                        objRtn.COUNTRYO = rs01.getString("COUNTRYS");
                    }
                    objRtn.COUNTRY = rs01.getString("CODIGO");
                    if (!rs01.getString("NAME").trim().isEmpty()) {
                        objRtn.COUNTRY_NAME = rs01.getString("NAME");
                    } else if (rs01.getString("CODIGO").trim().isEmpty()) {
                        objRtn.COUNTRY_NAME = "(INTERNET)";
                    } else {
                        objRtn.COUNTRY_NAME = rs01.getString("CODIGO");
                    }
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.Perc1 = (CUPONS > 0) ? (objRtn.CUPONS * 100.0) / CUPONS : 0;
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.Perc2 = (AMOUNT > 0) ? (objRtn.AMOUNT * 100.0) / AMOUNT : 0;
                    objRtn.CUPONS_ON = rs01.getInt("CUPON_ON");
                    objRtn.CUPONS_OFF = rs01.getInt("CUPON_OFF");
                    objRtn.AMOUNT_ON = rs01.getDouble("ON");
                    objRtn.AMOUNT_OFF = rs01.getDouble("OFF");
                    objRtn.CUPON_F = rs01.getInt("QCPNSF");
                    objRtn.AMOUNTF = rs01.getDouble("AMOUNTF");
                    objRtn.QCPNS0 = rs01.getInt("CUPONSNR");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNTNR");
                    objRtn.TARIFA = Double.isNaN((objRtn.AMOUNT) / objRtn.CUPONS) ? 0 : (objRtn.AMOUNT) / objRtn.CUPONS;

                    //Porcentajes
                    objRtn.CUPONS_PERCENTF = (objRtn.CUPONS > 0) ? ((objRtn.CUPON_F * 100.0) / objRtn.CUPONS) : 0;
                    objRtn.TOTAL_CUPONS_OFF_PERCEN = (CUPONS > 0) ? (CUPONS_OFF * 100.0) / CUPONS * 1.0 : 0;
                    objRtn.TOTAL_CUPONS_ON_PERCEN = (CUPONS > 0) ? (CUPONS_ON * 100.0) / CUPONS * 1.0 : 0;
                    objRtn.TOTAL_AMOUNT_ON_PERCENT = (AMOUNT > 0) ? ((AMOUNT_ON * 100.00) / AMOUNT) : 0;
                    objRtn.TOTAL_AMOUNT_OFF_PERCENT = (AMOUNT > 0) ? ((AMOUNT_OFF * 100.00) / AMOUNT) : 0;
                    objRtn.TOTAL_AMOUNT_PERCENTF = (AMOUNT > 0) ? ((AMOUNTF * 100.0) / AMOUNT) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONS = CUPONS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_AMOUNT_ON = AMOUNT_ON;
                    objRtn.TOTAL_AMOUNT_OFF = AMOUNT_OFF;
                    objRtn.TOTAL_CUPONS_ON = CUPONS_ON;
                    objRtn.TOTAL_CUPONS_OFF = CUPONS_OFF;
                    objRtn.TOTAL_CUPONSF = QCPNSF;
                    objRtn.TOTAL_AMOUNTF = AMOUNTF;
                    objRtn.TOTAL_QCPNS0 = CUPONSNR;
                    objRtn.TOTAL_AMOUNT0 = AMOUNTNR;

                    //AVG - RATE
                    objRtn.TOTAL_AMOUNT_ON_AVG_RATE = (CUPONS_ON > 0) ? ((AMOUNT_ON) / CUPONS_ON * 1.0) : 0;
                    objRtn.TOTAL_AMOUNT_OFF_AVG_RATE = (CUPONS_OFF > 0) ? ((AMOUNT_OFF) / CUPONS_OFF * 1.0) : 0;
                    objRtn.AMOUNT_AVG_RATE = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100.0) / AMOUNT) : 0;
                    objRtn.CUPONS_AVG = (CUPONS > 0) ? ((objRtn.CUPONS * 100.0) / CUPONS * 1.0) : 0;
                    objRtn.AMOUNT_OFF_AVG = (objRtn.AMOUNT > 0) ? ((objRtn.AMOUNT_OFF * 100.0) / objRtn.AMOUNT) : 0;
                    objRtn.AMOUNT_ON_AVG = (objRtn.AMOUNT > 0) ? ((objRtn.AMOUNT_ON * 100.0) / objRtn.AMOUNT) : 0;
                    objRtn.CUPONS_OFF_AVG = (objRtn.CUPONS > 0) ? ((objRtn.CUPONS_OFF * 100.0) / objRtn.CUPONS) : 0;
                    objRtn.CUPONS_ON_AVG = (objRtn.CUPONS > 0) ? ((objRtn.CUPONS_ON * 100.0) / objRtn.CUPONS) : 0;
                    objRtn.AMOUNT_OFF_AVG_RATE = (objRtn.CUPONS_OFF > 0) ? (objRtn.AMOUNT_OFF / objRtn.CUPONS_OFF * 1.0) : 0;
                    objRtn.AMOUNT_ON_AVG_RATE = (objRtn.CUPONS_ON > 0) ? (objRtn.AMOUNT_ON / objRtn.CUPONS_ON * 1.0) : 0;
                    objRtn.CUPONS_RATE = (CUPONS > 0) ? ((objRtn.CUPONS * 100.0) / CUPONS * 1.0) : 0;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP00988(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS_A = 0, CUPONS = 0, CUPONSNR_A = 0, CUPONSNR = 0;
        double AMOUNT_A = 0, AMOUNT = 0, AMOUNTNR_A = 0, AMOUNTNR = 0;
        String DESCRIP_A = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00988(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                CUPONS_A = rst.getInt("CUPONS");
                AMOUNT_A = rst.getDouble("AMOUNT");
                DESCRIP_A = rst.getString("DESCRIP");
                CUPONSNR_A = rst.getInt("CUPONSNR");
                AMOUNTNR_A = rst.getDouble("AMOUNTNR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    CUPONS = rst.getInt("CUPONS");
                    AMOUNT = rst.getDouble("AMOUNT");
                    CUPONSNR = rst.getInt("CUPONSNR");
                    AMOUNTNR = rst.getDouble("AMOUNTNR");
                }
                rst.close();

                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        bean = new DashboardFilter();
                        bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                        bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                        bean.IN_PAIS = filter.IN_PAIS;
                        if (rst.getString("ALLIC").trim().isEmpty()) {
                            bean.ALLIC = "OTH";
                        } else {
                            bean.ALLIC = rst.getString("ALLIC");
                        }
                        bean.CUPONS = rst.getInt("CUPONS");
                        bean.AMOUNT = rst.getDouble("AMOUNT");
                        bean.QCPNS0 = rst.getInt("CUPONSNR");
                        bean.AMOUNT0 = rst.getDouble("AMOUNTNR");
                        bean.strDescription = rst.getString("DESCRIP");
                        bean.Perc1 = (CUPONS > 0) ? (bean.CUPONS * 100.0) / CUPONS : 0;
                        bean.Perc2 = (AMOUNT > 0) ? (bean.AMOUNT * 100.0) / AMOUNT : 0;
                        bean.AVG = (bean.CUPONS > 0) ? bean.AMOUNT / bean.CUPONS : 0;
                        //TOTALES DETALLE
                        bean.CUPONS_OFF = CUPONS;
                        bean.AMOUNT_OFF = AMOUNT;
                        bean.CUPONS_OTHER = CUPONSNR;
                        bean.AMOUNT_O = AMOUNTNR;
                        bean.totAVG = (CUPONS > 0) ? AMOUNT / CUPONS : 0;

                        //AEROMEXICO
                        bean.CUPONS_ON = CUPONS_A;
                        bean.AMOUNT_ON = AMOUNT_A;
                        bean.CUPONS_MEX = CUPONSNR_A;
                        bean.AMOUNT_F = AMOUNTNR_A;
                        bean.strDescription1 = DESCRIP_A;
                        bean.totAVG1 = (CUPONS_A > 0) ? AMOUNT_A / CUPONS_A : 0;

                        //TOTALES UNIVERSALES
                        bean.TOTAL_CUPONS = CUPONS + CUPONS_A;
                        bean.TOTAL_AMOUNT = AMOUNT + AMOUNT_A;
                        bean.TOTAL_QCPNS0 = CUPONSNR + CUPONSNR_A;
                        bean.TOTAL_AMOUNT0 = AMOUNTNR + AMOUNTNR_A;
                        bean.totAVG2 = (bean.TOTAL_CUPONS > 0) ? bean.TOTAL_AMOUNT / bean.TOTAL_CUPONS : 0;

                        //Porcentajes Generales
                        bean.Perc3 = (bean.TOTAL_AMOUNT > 0) ? (bean.AMOUNT * 100) / bean.TOTAL_AMOUNT : 0;  // QUEDA PENDIENTE A REVISAR EL CALCULO "% GENERAL AMOUNT"
                        //TOTALES DETALLE
                        bean.Perc4 = (bean.TOTAL_AMOUNT > 0) ? (AMOUNT * 100) / bean.TOTAL_AMOUNT : 0;
                        //AEROMEXICO
                        bean.Perc5 = (bean.TOTAL_AMOUNT > 0) ? (AMOUNT_A * 100) / bean.TOTAL_AMOUNT : 0;

                        lista.add(bean);
                    }

                }
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00645(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0, CUPONSNR = 0;
        double AMOUNT = 0, AMOUNTNR = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00645(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.IN_TSALES);
            cstmt.setString(6, filter.IN_ONOFF);
            cstmt.setString(7, filter.IN_CITYPAIR);
            cstmt.setString(8, filter.TYPE);
            cstmt.setString(9, filter.IN_ORDER);

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                CUPONS = rst.getInt("CUPONS");
                AMOUNT = rst.getDouble("AMOUNT");
                CUPONSNR = rst.getInt("CUPONSNR");
                AMOUNTNR = rst.getDouble("AMOUNTNR");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_PAIS = filter.IN_PAIS;
                    bean.IN_TSALES = filter.IN_TSALES;
                    bean.IN_ONOFF = filter.IN_ONOFF;
                    bean.IN_CITYPAIR = filter.IN_CITYPAIR;
                    bean.TYPE = filter.TYPE;
                    bean.IN_ORDER = filter.IN_ORDER;
                    bean.RN = rst.getLong("RN");
                    bean.strCITYO = rst.getString("V_CITYO");
                    bean.strCITYD = rst.getString("V_CITYD");
                    bean.ValMax = rst.getDouble("VALMAX");
                    bean.CITYO = rst.getString("CITYO");
                    bean.CITYD = rst.getString("CITYD");
                    bean.strDescription = bean.CITYO + " - " + bean.CITYD;
                    bean.strDescription4 = rst.getString("DES_CO");
                    bean.strDescription5 = rst.getString("DES_CD");
                    bean.COUNTRYO = rst.getString("COUNTRYO");
                    bean.COUNTRYD = rst.getString("COUNTRYD");
                    bean.strDescription1 = bean.COUNTRYO + " - " + bean.COUNTRYD;
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPONS_AVG = (CUPONS > 0) ? (bean.CUPONS * 100.0) / CUPONS : 0;
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_AVG_RATE = (AMOUNT > 0) ? (bean.AMOUNT * 100) / AMOUNT : 0;
                    bean.TARIFA = (bean.CUPONS > 0) ? bean.AMOUNT / bean.CUPONS : 0;
                    bean.PMP = rst.getDouble("PMP");
                    bean.RevMil = rst.getDouble("REVMIL");
                    bean.AMOUNT_PERCENT = rst.getDouble("WMIL");
                    bean.QCPNS0 = rst.getInt("CUPONSNR");
                    bean.AMOUNT0 = rst.getDouble("AMOUNTNR");

                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAL_QCPNS0 = CUPONSNR;
                    bean.TOTAL_AMOUNT0 = AMOUNTNR;
                    bean.totAVG = (CUPONS > 0) ? AMOUNT / CUPONS : 0;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List loadVentasA1426Agente(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        double total = 0.0, total_amountF = 0, AMOUNTNR = 0;
        int total_cupons = 0, total_cuponsF = 0, CUPONSNR = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01203(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS.trim());
            cstmt01.setString(6, filter.CANAV.trim());
            cstmt01.setString(7, filter.CANAVT.trim());
            cstmt01.setString(8, filter.IN_ONOFF.trim());

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                total_cuponsF += rs01.getInt("QCPNSF");
                total_amountF += rs01.getDouble("AMOUNTF");
                total += rs01.getDouble("AMOUNT");
                total_cupons += rs01.getDouble("CUPONS");
                AMOUNTNR += rs01.getDouble("AMOUNTNR");
                CUPONSNR += rs01.getDouble("CUPONSNR");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {

                    objRtn = new DashboardFilter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.CANAV = filter.CANAV;
                    objRtn.CANAVT = filter.CANAVT;
                    objRtn.IN_ONOFF = filter.IN_ONOFF;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.COUNTRY = rs01.getString("COUNTRYS");
                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.CANAV = rs01.getString("CANAV");
                    objRtn.CLASS = rs01.getString("CANAL");
                    objRtn.COUNTRY_NAME = rs01.getString("DESCRIP");
                    objRtn.strDescription1 = rs01.getString("DESCAGT");
                    objRtn.strDescription2 = rs01.getString("DES_CANAV");

                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.QCPNSF = rs01.getInt("QCPNSF");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AMOUNTF = rs01.getDouble("AMOUNTF");
                    objRtn.QCPNS0 = rs01.getInt("CUPONSNR");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNTNR");

                    //Totales
                    objRtn.TOTAL_CUPONS = total_cupons;
                    objRtn.TOTAL_CUPONSF = total_cuponsF;
                    objRtn.TOTAL_AMOUNT = total;
                    objRtn.TOTAL_AMOUNTF = total_amountF;
                    objRtn.TOTAL_QCPNS0 = CUPONSNR;
                    objRtn.TOTAL_AMOUNT0 = AMOUNTNR;

                    objRtn.CUPONS_PERCENTF = (objRtn.CUPONS > 0) ? ((objRtn.QCPNSF * 100.0) / objRtn.CUPONS) : 0;
                    objRtn.TARIFA = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.CUPONS_PERCENT = (total_cupons > 0) ? ((objRtn.CUPONS * 100.00) / total_cupons) : 0;
                    objRtn.AMOUNT_PERCENT = (total > 0) ? ((objRtn.AMOUNT * 100) / total) : 0;
                    objRtn.TOTAL_CUPONS_PERCENTF = (total_cupons > 0) ? ((total_cuponsF * 100.0) / total_cupons) : 0;
                    objRtn.TOTAL_AVG = (total_cupons > 0) ? (total / total_cupons) : 0;
                    // =========================================================

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    // ========================= GDS ===========================================
    public List<DashboardFilter> loadPX109SQP01504(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int QCPNS = 0, QTKTS = 0;
        double AMOUNT = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        /*HashMap<String, String> hmGDS = new HashMap<String, String>();
         hmGDS.put("7906", "Amadeus");
         hmGDS.put("5235", "Worldspan");
         hmGDS.put("1315", "Axess");
         hmGDS.put("8352", "Axess");
         hmGDS.put("0011", "Sabre");
         hmGDS.put("5880", "Galileo");
         hmGDS.put("7733", "Galileo");
         hmGDS.put("7884", "Infini");
         hmGDS.put("7766", "Abacus");
         hmGDS.put("9995", "TravelSky");
         hmGDS.put("", "Sabre");*/
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01504(?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_TOP);
            cstmt.setString(5, filter.IN_PAIS);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                QCPNS = rst.getInt("QCPNS");
                QTKTS = rst.getInt("QTKTS");
                AMOUNT = rst.getDouble("AMOUNT");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_PAIS = filter.IN_PAIS;
                    bean.IN_TOP = filter.IN_TOP;
                    bean.GDS = rst.getString("GDS");
                    /*if (hmGDS.containsKey(rst.getString("GDS").trim())) {
                     bean.strDescription = hmGDS.get(rst.getString("GDS").trim()).toString();
                     } else {
                     bean.strDescription = "";
                     }*/
                    if (rst.getString("DESCRIP").trim().isEmpty()) {
                        bean.strDescription = "MANUAL";
                    } else {
                        bean.strDescription = rst.getString("DESCRIP").trim();
                    }
                    bean.CUPONS = rst.getInt("QCPNS");
                    bean.TKT = rst.getInt("QTKTS");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.Perc3 = (QTKTS > 0) ? (bean.TKT * 100.00) / QTKTS : 0;
                    bean.Perc1 = (QCPNS > 0) ? (bean.CUPONS * 100.00) / QCPNS : 0;
                    bean.Perc2 = (AMOUNT > 0) ? (bean.AMOUNT * 100.00) / AMOUNT : 0;
                    bean.AVG = (bean.CUPONS > 0) ? bean.AMOUNT / bean.CUPONS : 0;

                    //TOTALES
                    bean.totTKT = QTKTS;
                    bean.TOTAL_CUPONS = QCPNS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.totAVG2 = (bean.TOTAL_CUPONS > 0) ? bean.TOTAL_AMOUNT / bean.TOTAL_CUPONS : 0;

                    lista.add(bean);
                }

            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            setClose(rst, cstmt, cnx);
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP01505(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int QCPNS = 0, QTKTS = 0;
        double AMOUNT = 0;
        String strTitulo = "";
        if (!filter.IN_PAIS.trim().isEmpty()) {
            strTitulo += "Country : " + filter.IN_PAIS.trim() + "  -  ";
        }
        if (!filter.GDS.trim().isEmpty()) {
            strTitulo += "GDS : " + filter.GDS.trim() + " " + filter.strDescription.trim() + "  -  ";
        }

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01505(?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_TOP);
            cstmt.setString(5, filter.IN_PAIS);
            cstmt.setString(6, filter.GDS);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                QCPNS = rst.getInt("QCPNS");
                QTKTS = rst.getInt("QTKTS");
                AMOUNT = rst.getDouble("AMOUNT");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_PAIS = filter.IN_PAIS;
                    bean.IN_TOP = filter.IN_TOP;
                    bean.GDS = filter.GDS;
                    bean.strDescription = filter.strDescription;
                    if (rst.getString("SFTE").trim().equals("B")) {
                        bean.FTE = "BSP";
                    } else if (rst.getString("SFTE").trim().equals("A")) {
                        bean.FTE = "ARC";
                    } else if (rst.getString("SFTE").trim().equals("S")) {
                        bean.FTE = "ASR";
                    } else {
                        bean.FTE = rst.getString("SFTE").trim();
                    }
                    bean.COUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.strDescription1 = rst.getString("A006KEY1").trim();
                    bean.strDescription5 = strTitulo;
                    bean.CUPONS = rst.getInt("QCPNS");
                    bean.TKT = rst.getInt("QTKTS");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.Perc3 = (QTKTS > 0) ? (bean.TKT * 100.00) / QTKTS : 0;
                    bean.Perc1 = (QCPNS > 0) ? (bean.CUPONS * 100.00) / QCPNS : 0;
                    bean.Perc2 = (AMOUNT > 0) ? (bean.AMOUNT * 100.00) / AMOUNT : 0;
                    bean.AVG = (bean.CUPONS > 0) ? bean.AMOUNT / bean.CUPONS : 0;

                    //TOTALES
                    bean.totTKT = QTKTS;
                    bean.TOTAL_CUPONS = QCPNS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.totAVG2 = (bean.TOTAL_CUPONS > 0) ? bean.TOTAL_AMOUNT / bean.TOTAL_CUPONS : 0;

                    lista.add(bean);
                }

            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            setClose(rst, cstmt, cnx);
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP01538(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int QCPNS = 0, QTKTS = 0;
        double AMOUNT = 0;
        String strTitulo = "";
        if (!filter.GDS.trim().isEmpty()) {
            strTitulo += "GDS : " + filter.GDS.trim() + " " + filter.strDescription.trim() + "  -  ";
        }
        if (!filter.FTE.trim().isEmpty()) {
            strTitulo += "Sales Source : " + filter.FTE.trim() + "  -  ";
        }
        if (!filter.COUNTRY.trim().isEmpty()) {
            strTitulo += "Country : " + filter.strDescription1.trim() + "  -  ";
        }

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }

        if (!filter.FTE.trim().isEmpty()) {
            if (filter.FTE.trim().equals("BSP")) {
                filter.FTE = "B";
            } else if (filter.FTE.trim().equals("ARC")) {
                filter.FTE = "A";
            } else if (filter.FTE.trim().equals("ASR")) {
                filter.FTE = "S";
            }
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01538(?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            //cstmt.setString(4, filter.IN_TOP);
            cstmt.setString(4, filter.COUNTRY);
            cstmt.setString(5, filter.GDS);
            cstmt.setString(6, filter.FTE);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                QCPNS = rst.getInt("QCPNS");
                QTKTS = rst.getInt("QTKTS");
                AMOUNT = rst.getDouble("AMOUNT");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_PAIS = filter.IN_PAIS;
                    bean.IN_TOP = filter.IN_TOP;
                    bean.COUNTRY = filter.COUNTRY;
                    bean.GDS = filter.GDS;
                    bean.FTE = filter.FTE;
                    bean.strDescription = filter.strDescription;
                    bean.VENDOR = rst.getString("VENDOR").trim();
                    bean.strDescription5 = strTitulo;
                    bean.CUPONS = rst.getInt("QCPNS");
                    bean.TKT = rst.getInt("QTKTS");
                    bean.AMOUNT = rst.getDouble("VALOR");
                    bean.Perc3 = (QTKTS > 0) ? (bean.TKT * 100.00) / QTKTS : 0;
                    bean.Perc1 = (QCPNS > 0) ? (bean.CUPONS * 100.00) / QCPNS : 0;
                    bean.Perc2 = (AMOUNT > 0) ? (bean.AMOUNT * 100.00) / AMOUNT : 0;
                    bean.AVG = (bean.CUPONS > 0) ? bean.AMOUNT / bean.CUPONS : 0;

                    //TOTALES
                    bean.totTKT = QTKTS;
                    bean.TOTAL_CUPONS = QCPNS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.totAVG2 = (bean.TOTAL_CUPONS > 0) ? bean.TOTAL_AMOUNT / bean.TOTAL_CUPONS : 0;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lista.add(bean);
                }

            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            setClose(rst, cstmt, cnx);
        }

        return lista;
    }

    public List<A720Filter> loadPX109SQP01539(DashboardFilter filter) throws SQLException, Exception {

        List<A720Filter> lstRtn = new ArrayList<A720Filter>(0);
        A720Filter objRtn;
        String strTitulo = "";
        if (!filter.GDS.trim().isEmpty()) {
            strTitulo += "GDS : " + filter.GDS.trim() + " " + filter.strDescription.trim() + "  -  ";
        }
        if (!filter.FTE.trim().isEmpty()) {
            strTitulo += "Sales Source : " + filter.FTE.trim() + "  -  ";
        }
        if (!filter.COUNTRY.trim().isEmpty()) {
            strTitulo += "Country : " + filter.strDescription1.trim() + "  -  ";
        }
        if (!filter.VENDOR.trim().isEmpty()) {
            strTitulo += "Agent : " + filter.VENDOR.trim() + "  -  ";
        }

        if (strTitulo.endsWith("  -  ")) {
            strTitulo = strTitulo.substring(0, strTitulo.length() - 3);
        }

        if (!filter.FTE.trim().isEmpty()) {
            if (filter.FTE.trim().equals("BSP")) {
                filter.FTE = "B";
            } else if (filter.FTE.trim().equals("ARC")) {
                filter.FTE = "A";
            } else if (filter.FTE.trim().equals("ASR")) {
                filter.FTE = "S";
            }
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01539(?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            //cstmt.setString(4, filter.IN_TOP);
            cstmt.setString(4, filter.COUNTRY);
            cstmt.setString(5, filter.GDS);
            cstmt.setString(6, filter.FTE);
            cstmt.setString(7, filter.VENDOR);
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                objRtn = new A720Filter();
                objRtn.A720AGENTE = filter.VENDOR;
                objRtn.A720FECVTA = filter.DSALES;
                objRtn.strFormatDate = filter.strFormatDate;
                objRtn.RN = rst.getLong("RN");
                objRtn.A720CIA = rst.getString("CCIA");
                objRtn.A720FORMA = rst.getString("FORMA");
                objRtn.A720SERIE = rst.getString("SERIE");
                objRtn.CUPON = rst.getString("CUPON");
                objRtn.TICKET = rst.getString("CCIA") + " " + rst.getString("FORMA") + rst.getString("SERIE") + " " + rst.getString("CUPON");
                objRtn.A720NVLO = rst.getString("NFLIGHT");
                objRtn.A720FVLO = rst.getString("DFLIGHT");
                objRtn.A720FBORI = rst.getString("FAREBASE");
                objRtn.A720BOOKI = rst.getString("BOOKI");
                objRtn.A720CLASE = rst.getString("CLASE");
                objRtn.A720CARRA = rst.getString("CARRIER");
                objRtn.A720MDAPAG = rst.getString("CURRENC");
                objRtn.A720FARE = rst.getDouble("TARIFA");
                objRtn.A720RUTAO = rst.getString("CITYO");
                objRtn.A720RUTAD = rst.getString("CITYD");
                objRtn.A720MDAFA = rst.getString("CURRENL");
                objRtn.A720VALOR = rst.getDouble("VALOR");
                objRtn.A720ACCD = rst.getString("CANAV");
                objRtn.strDescripcion5 = strTitulo;
                objRtn.strDescripcion4 = objRtn.A720RUTAO + " - " + objRtn.A720RUTAD;

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rst, cstmt, cnx);
        }

        return lstRtn;
    }

    // ========================== TOTALS BY CABIN ==============================
    public List<DashboardFilter> loadPX109SQP00932(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0, CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0;
        long CUPONSNR = 0;
        double AMOUNT = 0, AMOUNT_F = 0, AMOUNT_J = 0, AMOUNT_Y = 0, AMOUNTNR = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00932(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_ONOFF);
            cstmt.setString(5, filter.IN_CITYPAIR);
            cstmt.setString(6, filter.IN_PAIS);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                CUPONS = rst.getInt("CUPONS");
                CUPON_F = rst.getInt("CPN_F");
                CUPON_J = rst.getInt("CPN_J");
                CUPON_Y = rst.getInt("CPN_Y");
                AMOUNT = rst.getDouble("AMOUNT");
                AMOUNT_F = rst.getDouble("AMT_F");
                AMOUNT_J = rst.getDouble("AMT_J");
                AMOUNT_Y = rst.getDouble("AMT_Y");
                CUPONSNR = rst.getLong("CUPONSNR");
                AMOUNTNR = rst.getDouble("AMOUNTNR");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_ONOFF = filter.IN_ONOFF;
                    bean.IN_CITYPAIR = filter.IN_CITYPAIR;
                    bean.IN_PAIS = filter.IN_PAIS;

                    if (!filter.IN_CITYPAIR.equals("")) {
                        bean.CITYO = rst.getString("CITYO").trim();
                        bean.CITYD = rst.getString("CITYD").trim();
                        bean.strFormatDate = rst.getString("CITYO").trim() + " - " + rst.getString("CITYD").trim();
                    } else {
                        bean.DSALES = rst.getString("DSALES");
                        bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    }
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPON_F = rst.getInt("CPN_F");
                    bean.CUPON_J = rst.getInt("CPN_J");
                    bean.CUPON_Y = rst.getInt("CPN_Y");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_F = rst.getDouble("AMT_F");
                    bean.AMOUNT_J = rst.getDouble("AMT_J");
                    bean.AMOUNT_Y = rst.getDouble("AMT_Y");
                    bean.QCPNS0 = rst.getLong("CUPONSNR");
                    bean.AMOUNT0 = rst.getDouble("AMOUNTNR");

                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTCUPON_F = CUPON_F;
                    bean.TOTCUPON_J = CUPON_J;
                    bean.TOTCUPON_Y = CUPON_Y;
                    bean.TOTAL_QCPNS0 = CUPONSNR;

                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAMOUNT_F = AMOUNT_F;
                    bean.TOTAMOUNT_J = AMOUNT_J;
                    bean.TOTAMOUNT_Y = AMOUNT_Y;
                    bean.TOTAL_AMOUNT0 = AMOUNTNR;

                    bean.Perc1 = (CUPONS > 0) ? (CUPON_F * 100.0) / CUPONS : 0;
                    bean.Perc2 = (CUPONS > 0) ? (CUPON_J * 100.0) / CUPONS : 0;
                    bean.Perc3 = (CUPONS > 0) ? (CUPON_Y * 100.0) / CUPONS : 0;

                    bean.Perc4 = (AMOUNT > 0) ? (AMOUNT_F * 100.0) / AMOUNT : 0;
                    bean.Perc5 = (AMOUNT > 0) ? (AMOUNT_J * 100.0) / AMOUNT : 0;
                    bean.Perc6 = (AMOUNT > 0) ? (AMOUNT_Y * 100.0) / AMOUNT : 0;

                    bean.totAVG = (CUPONS > 0) ? AMOUNT / CUPONS : 0;
                    bean.totAVG1 = (CUPON_F > 0) ? AMOUNT_F / CUPON_F : 0;
                    bean.totAVG2 = (CUPON_J > 0) ? AMOUNT_J / CUPON_J : 0;
                    bean.totAVG3 = (CUPON_Y > 0) ? AMOUNT_Y / CUPON_Y : 0;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP01542(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0, CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0;
        long CUPONSNR = 0;
        double AMOUNT = 0, AMOUNT_F = 0, AMOUNT_J = 0, AMOUNT_Y = 0, AMOUNTNR = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01542(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_ONOFF);
            cstmt.setString(5, filter.IN_CITYPAIR);
            cstmt.setString(6, filter.IN_PAIS);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                CUPONS = rst.getInt("CUPONS");
                CUPON_F = rst.getInt("CPN_F");
                CUPON_J = rst.getInt("CPN_J");
                CUPON_Y = rst.getInt("CPN_Y");
                AMOUNT = rst.getDouble("AMOUNT");
                AMOUNT_F = rst.getDouble("AMT_F");
                AMOUNT_J = rst.getDouble("AMT_J");
                AMOUNT_Y = rst.getDouble("AMT_Y");
                CUPONSNR = rst.getLong("CUPONSNR");
                AMOUNTNR = rst.getDouble("AMOUNTNR");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.IN_ONOFF = filter.IN_ONOFF;
                    bean.IN_CITYPAIR = filter.IN_CITYPAIR;
                    bean.IN_PAIS = filter.IN_PAIS;

                    if (!filter.IN_CITYPAIR.equals("")) {
                        bean.CITYO = rst.getString("CITYO").trim();
                        bean.CITYD = rst.getString("CITYD").trim();
                        bean.strFormatDate = rst.getString("CITYO").trim() + " - " + rst.getString("CITYD").trim();
                    } else {
                        bean.DSALES = rst.getString("DSALES");
                        bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    }
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPON_F = rst.getInt("CPN_F");
                    bean.CUPON_J = rst.getInt("CPN_J");
                    bean.CUPON_Y = rst.getInt("CPN_Y");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_F = rst.getDouble("AMT_F");
                    bean.AMOUNT_J = rst.getDouble("AMT_J");
                    bean.AMOUNT_Y = rst.getDouble("AMT_Y");
                    bean.QCPNS0 = rst.getLong("CUPONSNR");
                    bean.AMOUNT0 = rst.getDouble("AMOUNTNR");

                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTCUPON_F = CUPON_F;
                    bean.TOTCUPON_J = CUPON_J;
                    bean.TOTCUPON_Y = CUPON_Y;
                    bean.TOTAL_QCPNS0 = CUPONSNR;

                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAMOUNT_F = AMOUNT_F;
                    bean.TOTAMOUNT_J = AMOUNT_J;
                    bean.TOTAMOUNT_Y = AMOUNT_Y;
                    bean.TOTAL_AMOUNT0 = AMOUNTNR;

                    bean.Perc1 = (CUPONS > 0) ? (CUPON_F * 100.0) / CUPONS : 0;
                    bean.Perc2 = (CUPONS > 0) ? (CUPON_J * 100.0) / CUPONS : 0;
                    bean.Perc3 = (CUPONS > 0) ? (CUPON_Y * 100.0) / CUPONS : 0;

                    bean.Perc4 = (AMOUNT > 0) ? (AMOUNT_F * 100.0) / AMOUNT : 0;
                    bean.Perc5 = (AMOUNT > 0) ? (AMOUNT_J * 100.0) / AMOUNT : 0;
                    bean.Perc6 = (AMOUNT > 0) ? (AMOUNT_Y * 100.0) / AMOUNT : 0;

                    bean.totAVG = (CUPONS > 0) ? AMOUNT / CUPONS : 0;
                    bean.totAVG1 = (CUPON_F > 0) ? AMOUNT_F / CUPON_F : 0;
                    bean.totAVG2 = (CUPON_J > 0) ? AMOUNT_J / CUPON_J : 0;
                    bean.totAVG3 = (CUPON_Y > 0) ? AMOUNT_Y / CUPON_Y : 0;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00550(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0, CUPONSNR = 0;
        double AMOUNT = 0, AMOUNTNR = 0, REVXMI = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00550(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DSALES);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.CITYO);
            cstmt.setString(6, filter.CITYD);
            cstmt.setString(7, filter.IN_PAIS);
            cstmt.setString(8, filter.CLASS);
            cstmt.setString(9, filter.IN_ONOFF);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                CUPONS = rst.getInt("CUPONS");
                AMOUNT = rst.getDouble("AMOUNT");
                CUPONSNR = rst.getInt("CUPONSNR");
                AMOUNTNR = rst.getDouble("AMOUNTNR");
                REVXMI = rst.getDouble("REVXMI");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.CITYO = filter.CITYO;
                    bean.CITYD = filter.CITYD;
                    bean.IN_ONOFF = filter.IN_ONOFF;
                    bean.IN_CITYPAIR = filter.IN_CITYPAIR;
                    bean.strDescription = rst.getString("BOOKI");
                    bean.strDescription1 = rst.getString("A051DESCR1");
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.QCPNS0 = rst.getInt("CUPONSNR");
                    bean.AMOUNT0 = rst.getDouble("AMOUNTNR");
                    bean.REVXMI = rst.getDouble("REVXMI");

                    bean.AMOUNT_ON = bean.AMOUNT / bean.CUPONS;
                    bean.AMOUNT_OFF = bean.AMOUNT_ON * bean.CUPONS;
                    bean.TARIFA = (bean.CUPONS > 0) ? ((bean.AMOUNT) / bean.CUPONS) : 0;

                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAL_QCPNS0 = CUPONSNR;
                    bean.TOTAL_AMOUNT0 = AMOUNTNR;
                    bean.TOTAL_REVXMI = REVXMI;
                    bean.totAVG = (CUPONS > 0) ? ((AMOUNT) / CUPONS) : 0;
                    bean.Perc1 = (rst.getDouble("CUPONS") * 100) / bean.TOTAL_CUPONS;
                    bean.Perc2 = (rst.getDouble("AMOUNT") * 100) / bean.TOTAL_AMOUNT;

                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    // =========================Compare Per Sales
    public HashMap loadPX109SQP01571(DashboardFilter filter) throws SQLException, Exception {

        HashMap hm = new HashMap();
        List<DashboardFilter> lstRtn1 = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstRtn2 = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstRtn3 = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int CUPONS = 0;
        double AMOUNT = 0, AVG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01571(?,?,?,?)}";
        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAIS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CUPONS = rs01.getInt("CUPONS");
                AMOUNT = rs01.getDouble("AMOUNT");
                AVG = rs01.getDouble("AVGE");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = rs01.getDouble("AVGE");
                    //Totales
                    objRtn.TOTAL_CUPONS = CUPONS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.totAVG = AVG;

                    lstRtn1.add(objRtn);
                }

                hm.put("lst1", lstRtn1);
                rs01.close();

                if (cstmt01.getMoreResults()) {
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        CUPONS = rs01.getInt("CUPONS");
                        AMOUNT = rs01.getDouble("AMOUNT");
                        AVG = rs01.getDouble("AVGE");
                    }
                    rs01.close();

                    if (cstmt01.getMoreResults()) {
                        rs01 = cstmt01.getResultSet();
                        while (rs01.next()) {
                            objRtn = new DashboardFilter();
                            objRtn.DSALES = rs01.getString("DSALES");
                            objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                            objRtn.CUPONS = rs01.getInt("CUPONS");
                            objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                            objRtn.AVG = rs01.getDouble("AVGE");
                            //Totales
                            objRtn.TOTAL_CUPONS = CUPONS;
                            objRtn.TOTAL_AMOUNT = AMOUNT;
                            objRtn.totAVG = AVG;

                            lstRtn2.add(objRtn);
                        }

                        hm.put("lst2", lstRtn2);
                        rs01.close();

                        if (cstmt01.getMoreResults()) {
                            rs01 = cstmt01.getResultSet();
                            while (rs01.next()) {
                                CUPONS = rs01.getInt("CUPONS");
                                AMOUNT = rs01.getDouble("AMOUNT");
                                AVG = rs01.getDouble("AVGE");
                            }
                            rs01.close();

                            if (cstmt01.getMoreResults()) {
                                rs01 = cstmt01.getResultSet();
                                while (rs01.next()) {
                                    objRtn = new DashboardFilter();
                                    objRtn.DSALES = rs01.getString("DSALES");
                                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                                    objRtn.CUPONS = rs01.getInt("CUPONS");
                                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                                    objRtn.AVG = rs01.getDouble("AVGE");
                                    //Totales
                                    objRtn.TOTAL_CUPONS = CUPONS;
                                    objRtn.TOTAL_AMOUNT = AMOUNT;
                                    objRtn.totAVG = AVG;

                                    lstRtn3.add(objRtn);
                                }
                                hm.put("lst3", lstRtn3);
                            }
                        }

                    }

                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return hm;
    }

    public HashMap loadPX109SQP03478(DashboardFilter filter) throws SQLException, Exception {

        HashMap hm = new HashMap();
        List<DashboardFilter> lstRtn1 = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstRtn2 = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstRtn3 = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstRtn4 = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn = null;
        int CUPONS = 0;
        double AMOUNT = 0, AVG = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03478_1(?,?,?,?)}";
        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_PAIS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CUPONS = rs01.getInt("CUPONS");
                AMOUNT = rs01.getDouble("AMOUNT");
                AVG = rs01.getDouble("AVGE");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = rs01.getDouble("AVGE");
                    //Totales
                    objRtn.TOTAL_CUPONS = CUPONS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.totAVG = AVG;

                    lstRtn1.add(objRtn);
                }

                hm.put("lst1", lstRtn1);
                rs01.close();

                if (cstmt01.getMoreResults()) {
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        CUPONS = rs01.getInt("CUPONS");
                        AMOUNT = rs01.getDouble("AMOUNT");
                        AVG = rs01.getDouble("AVGE");
                    }
                    rs01.close();

                    if (cstmt01.getMoreResults()) {
                        rs01 = cstmt01.getResultSet();
                        while (rs01.next()) {
                            objRtn = new DashboardFilter();
                            objRtn.DSALES = rs01.getString("DSALES");
                            objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                            objRtn.CUPONS = rs01.getInt("CUPONS");
                            objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                            objRtn.AVG = rs01.getDouble("AVGE");
                            //Totales
                            objRtn.TOTAL_CUPONS = CUPONS;
                            objRtn.TOTAL_AMOUNT = AMOUNT;
                            objRtn.totAVG = AVG;
                            lstRtn2.add(objRtn);
                        }

                        hm.put("lst2", lstRtn2);
                        rs01.close();

                        if (cstmt01.getMoreResults()) {
                            rs01 = cstmt01.getResultSet();
                            while (rs01.next()) {
                                CUPONS = rs01.getInt("CUPONS");
                                AMOUNT = rs01.getDouble("AMOUNT");
                                AVG = rs01.getDouble("AVGE");
                            }
                            rs01.close();

                            if (cstmt01.getMoreResults()) {
                                rs01 = cstmt01.getResultSet();
                                while (rs01.next()) {
                                    objRtn = new DashboardFilter();
                                    objRtn.DSALES = rs01.getString("DSALES");
                                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                                    objRtn.CUPONS = rs01.getInt("CUPONS");
                                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                                    objRtn.AVG = rs01.getDouble("AVGE");
                                    //Totales
                                    objRtn.TOTAL_CUPONS = CUPONS;
                                    objRtn.TOTAL_AMOUNT = AMOUNT;
                                    objRtn.totAVG = AVG;
                                    lstRtn3.add(objRtn);
                                }

                                hm.put("lst3", lstRtn3);
                                rs01.close();

                                if (cstmt01.getMoreResults()) {
                                    rs01 = cstmt01.getResultSet();
                                    while (rs01.next()) {

                                        AVG = rs01.getDouble("AVGTOT");
                                    }
                                    rs01.close();

                                    if (cstmt01.getMoreResults()) {
                                        rs01 = cstmt01.getResultSet();
                                        while (rs01.next()) {
                                            objRtn = new DashboardFilter();

                                            objRtn.AVG = rs01.getDouble("AVGTOT");
                                            //Totales

                                            objRtn.totAVG = AVG;
                                            lstRtn4.add(objRtn);
                                        }
                                        hm.put("lst4", lstRtn4);

                                    }
                                }
                            }
                        }

                    }

                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return hm;
    }

    /*loadPX109SQP00988*/
    public List<DashboardFilter> loadPX109SQP01518(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0, CUPONSNR = 0;
        double AMOUNT = 0, AMOUNTNR = 0;
        String strTitulo = "";
        if (!filter.ALLIC.trim().isEmpty()) {
            if (filter.ALLIC.trim().equals("SKY")) {
                strTitulo += "Alliance : Sky Team";
            } else if (filter.ALLIC.trim().equals("ONE")) {
                strTitulo += "Alliance : One World";
            } else if (filter.ALLIC.trim().equals("STA")) {
                strTitulo += "Alliance : Star Alliance";
            } else if (filter.ALLIC.trim().equals("OTH")) {
                strTitulo += "Alliance : Other Airlines";
            }
        }

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01518(?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.ALLIC);
            cstmt.setString(5, filter.IN_PAIS);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                CUPONS = rst.getInt("CUPONS");
                AMOUNT = rst.getDouble("AMOUNT");
                CUPONSNR = rst.getInt("CUPONSNR");
                AMOUNTNR = rst.getDouble("AMOUNTNR");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO;
                    bean.ALLIC = filter.ALLIC;
                    bean.IN_PAIS = filter.IN_PAIS;
                    bean.CARRIER = rst.getString("CARRIER");
                    bean.strDescription = rst.getString("A005KEY3");
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.QCPNS0 = rst.getInt("CUPONSNR");
                    bean.AMOUNT0 = rst.getDouble("AMOUNTNR");
                    bean.Perc1 = (CUPONS > 0) ? (bean.CUPONS * 100) / CUPONS : 0;
                    bean.Perc2 = (AMOUNT > 0) ? (bean.AMOUNT * 100) / AMOUNT : 0;
                    bean.AVG = (bean.CUPONS > 0) ? bean.AMOUNT / bean.CUPONS : 0;
                    //TOTALES DETALLE
                    bean.CUPONS_OFF = CUPONS;
                    bean.AMOUNT_OFF = AMOUNT;
                    bean.TOTAL_QCPNS0 = CUPONSNR;
                    bean.TOTAL_AMOUNT0 = AMOUNTNR;
                    bean.totAVG = (CUPONS > 0) ? AMOUNT / CUPONS : 0;
                    bean.strDescription5 = strTitulo;

                    //Porcentajes Generales
                    bean.Perc3 = (bean.TOTAL_AMOUNT > 0) ? (bean.AMOUNT * 100) / bean.TOTAL_AMOUNT : 0;
                    //TOTALES DETALLE
                    bean.Perc4 = (bean.TOTAL_AMOUNT > 0) ? (AMOUNT * 100) / bean.TOTAL_AMOUNT : 0;

                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            setClose(rst, cstmt, cnx);
        }

        return lista;
    }

    //ROUTING TYPE
    public List<DashboardFilter> loadPX109SQP01516(DashboardFilter filter) throws SQLException, Exception {

        /*SQP00642*/
        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0;
        long QKMS = 0;
        double AMOUNT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01516(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY    

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    /*DSALES,QTKTS,QCPNS,AMOUNT*/
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.RN = rs01.getLong("RN");
                    /*objRtn.DSALES = rs01.getString("DSALES");
                     objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES) ;*/
                    objRtn.TYPE = rs01.getString("TIPRUTODV");
                    objRtn.strDescription = rs01.getString("DES_TYPEROUTE");
                    objRtn.strDescription1 = rs01.getString("TRIPTYPE");
                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;

                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_CUPONSF = QTKTS;
                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, null);
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01519(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0;
        long QKMS = 0;
        double AMOUNT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01519(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.TYPE = filter.TYPE;
                    objRtn.strDescription1 = filter.strDescription;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CITYO = rs01.getString("ORIGEN");
                    objRtn.CITYD = rs01.getString("DESTINO");
                    //objRtn.strDescription = rs01.getString("RUTAODV");
                    objRtn.strDescription = Functions.getStringWithSeparator(rs01.getString("RUTAODV"), "-", 3);

                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;
                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.totKM = QTKTS;
                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, null);
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01519_CHART(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0;
        double AMOUNT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01519_CHART(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.TYPE = filter.TYPE;
                    objRtn.strDescription1 = filter.strDescription;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CITYO = rs01.getString("ORIGEN");
                    objRtn.CITYD = rs01.getString("DESTINO");
                    objRtn.strDescription = rs01.getString("RUTAODV");
                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_CUPONSF = QTKTS;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, null);
        }

        return lstRtn;
    }

    // ===================================== FARE TYPE ========================================================================
    public List<DashboardFilter> loadPX109SQP01523(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0, BSP_CPN = 0, ARC_CPN = 0, ASR_CPN = 0;
        long QKMS = 0;
        double AMOUNT = 0, BSP_AMT = 0, ARC_AMT = 0, ASR_AMT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01523(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY    

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS

                BSP_CPN = rs01.getInt("BSP_CPN");
                ARC_CPN = rs01.getInt("ARC_CPN");
                ASR_CPN = rs01.getInt("ASR_CPN");
                BSP_AMT = rs01.getDouble("BSP_AMT");
                ARC_AMT = rs01.getDouble("ARC_AMT");
                ASR_AMT = rs01.getDouble("ASR_AMT");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    /*DSALES,QTKTS,QCPNS,AMOUNT*/
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.TYPE = rs01.getString("TTARIF");
                    objRtn.strDescription = rs01.getString("DES_TYPEFARE");
                    //objRtn.strDescription1 = rs01.getString("TRIPTYPE");
                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;

                    objRtn.CUPONS_BSP = rs01.getInt("BSP_CPN");
                    objRtn.CUPONS_ARC = rs01.getInt("ARC_CPN");
                    objRtn.CUPONS_ASR = rs01.getInt("ASR_CPN");
                    objRtn.AMOUNT_BSP = rs01.getDouble("BSP_AMT");
                    objRtn.AMOUNT_ARC = rs01.getDouble("ARC_AMT");
                    objRtn.AMOUNT_ASR = rs01.getDouble("ASR_AMT");

                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONSF = QTKTS;//TKT
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.totCUPONS_BSP = BSP_CPN;
                    objRtn.totCUPONS_ARC = ARC_CPN;
                    objRtn.totCUPONS_ASR = ASR_CPN;
                    objRtn.totAMOUNT_BSP = BSP_AMT;
                    objRtn.totAMOUNT_ARC = ARC_AMT;
                    objRtn.totAMOUNT_ASR = ASR_AMT;

                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01533(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0, CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0;
        long QKMS = 0;
        double AMOUNT = 0, AMOUNT_F = 0, AMOUNT_J = 0, AMOUNT_Y = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01533(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY    

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS

                CUPON_F = rs01.getInt("CUPON_F");
                CUPON_J = rs01.getInt("CUPON_J");
                CUPON_Y = rs01.getInt("CUPON_Y");
                AMOUNT_F = rs01.getDouble("AMOUNT_F");
                AMOUNT_J = rs01.getDouble("AMOUNT_J");
                AMOUNT_Y = rs01.getDouble("AMOUNT_Y");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    /*DSALES,QTKTS,QCPNS,AMOUNT*/
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.TYPE = rs01.getString("TTARIF");
                    objRtn.strDescription = rs01.getString("DES_TYPEFARE");
                    //objRtn.strDescription1 = rs01.getString("TRIPTYPE");
                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;

                    objRtn.CUPON_F = rs01.getInt("CUPON_F");
                    objRtn.CUPON_J = rs01.getInt("CUPON_J");
                    objRtn.CUPON_Y = rs01.getInt("CUPON_Y");
                    objRtn.AMOUNT_F = rs01.getDouble("AMOUNT_F");
                    objRtn.AMOUNT_J = rs01.getDouble("AMOUNT_J");
                    objRtn.AMOUNT_Y = rs01.getDouble("AMOUNT_Y");

                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONSF = QTKTS;//TKT
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;

                    objRtn.TOTCUPON_F = CUPON_F;
                    objRtn.TOTCUPON_J = CUPON_J;
                    objRtn.TOTCUPON_Y = CUPON_Y;
                    objRtn.TOTAMOUNT_F = AMOUNT_F;
                    objRtn.TOTAMOUNT_J = AMOUNT_J;
                    objRtn.TOTAMOUNT_Y = AMOUNT_Y;

                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01982(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0, CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0, QTKTS0 = 0, QCPNS0 = 0;
        long QKMS = 0;
        double AMOUNT = 0, AMOUNT_F = 0, AMOUNT_J = 0, AMOUNT_Y = 0, AMOUNT0 = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        HashMap resultado = new HashMap();
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01982(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.ALLIC);
            cstmt01.setString(7, filter.TYPE);
            cstmt01.setString(8, filter.COUNTRY);//Country o CITY    

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS
                AMOUNT0 = rs01.getDouble("AMOUNT0");
                QCPNS0 = rs01.getInt("QCPNS0");

                CUPON_F = rs01.getInt("CUPON_F");
                CUPON_J = rs01.getInt("CUPON_J");
                CUPON_Y = rs01.getInt("CUPON_Y");
                AMOUNT_F = rs01.getDouble("AMOUNT_F");
                AMOUNT_J = rs01.getDouble("AMOUNT_J");
                AMOUNT_Y = rs01.getDouble("AMOUNT_Y");
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    /*DSALES,QTKTS,QCPNS,AMOUNT*/
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.TYPE = filter.TYPE;

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.ZONA = rs01.getString("ZONA");
                    if (hm.containsKey(rs01.getString("ZONA").trim().toUpperCase())) {
                        objRtn.strDescriptionZone = hm.get(rs01.getString("ZONA").trim()).toString();
                    }
                    // objRtn.strDescriptionZone = rs01.getString("DESC_ZONA").trim();
                    //objRtn.strDescription1 = rs01.getString("TRIPTYPE");
                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.QCPNS0 = rs01.getInt("QCPNS0");
                    objRtn.AMOUNT0 = rs01.getDouble("AMOUNT0");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;

                    objRtn.CUPON_F = rs01.getInt("CUPON_F");
                    objRtn.CUPON_J = rs01.getInt("CUPON_J");
                    objRtn.CUPON_Y = rs01.getInt("CUPON_Y");
                    objRtn.AMOUNT_F = rs01.getDouble("AMOUNT_F");
                    objRtn.AMOUNT_J = rs01.getDouble("AMOUNT_J");
                    objRtn.AMOUNT_Y = rs01.getDouble("AMOUNT_Y");

                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONSF = QTKTS;//TKT
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.totQCPNS0 = QCPNS0;
                    objRtn.totAMOUNT0 = AMOUNT0;

                    objRtn.TOTCUPON_F = CUPON_F;
                    objRtn.TOTCUPON_J = CUPON_J;
                    objRtn.TOTCUPON_Y = CUPON_Y;
                    objRtn.TOTAMOUNT_F = AMOUNT_F;
                    objRtn.TOTAMOUNT_J = AMOUNT_J;
                    objRtn.TOTAMOUNT_Y = AMOUNT_Y;

                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01526(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0;
        long QKMS = 0;
        double AMOUNT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01526(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.TYPE);
            cstmt01.setString(7, "");
            cstmt01.setString(8, "");//Country o CITY

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.TYPE = filter.TYPE;
                    objRtn.strDescription1 = filter.strDescription;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CITYO = rs01.getString("ORIGEN");
                    objRtn.CITYD = rs01.getString("DESTINO");
                    //objRtn.strDescription = rs01.getString("RUTAODV");
                    //objRtn.strDescription = Functions.getStringWithSeparator(rs01.getString("RUTAODV"),"-",3);

                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;
                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_CUPONSF = QTKTS;
                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<DashboardFilter> loadPX109SQP01983(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        int QTKTS = 0, QCPNS = 0;
        long QKMS = 0;
        double AMOUNT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01983(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();

        try {

            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS);
            cstmt01.setString(6, filter.TYPE);
            cstmt01.setString(7, "");
            cstmt01.setString(8, "");//Country o CITY
            cstmt01.setString(9, filter.ZONA.trim());

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTS = rs01.getInt("QTKTS");
                AMOUNT = rs01.getDouble("AMOUNT");
                QCPNS = rs01.getInt("QCPNS");
                QKMS = rs01.getLong("QKMS");//KMS
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = filter.DSALES;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_PAIS = filter.IN_PAIS;
                    objRtn.ALLIC = filter.ALLIC;
                    objRtn.COUNTRY = filter.COUNTRY;
                    objRtn.TYPE = filter.TYPE;
                    objRtn.ZONA = filter.ZONA;
                    objRtn.strDescriptionZone = filter.strDescriptionZone.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CITYO = rs01.getString("ORIGEN");
                    objRtn.CITYD = rs01.getString("DESTINO");
                    //objRtn.strDescription = rs01.getString("RUTAODV");
                    //objRtn.strDescription = Functions.getStringWithSeparator(rs01.getString("RUTAODV"),"-",3);

                    objRtn.CUPONS = rs01.getInt("QCPNS");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.AVG = (objRtn.CUPONS > 0) ? (objRtn.AMOUNT / objRtn.CUPONS) : 0;
                    objRtn.QCPNSF = rs01.getInt("QTKTS");
                    objRtn.CUPONS_PERCENT = (QCPNS > 0) ? ((objRtn.CUPONS * 100.00) / QCPNS) : 0;
                    objRtn.AMOUNT_PERCENT = (AMOUNT > 0) ? ((objRtn.AMOUNT * 100) / AMOUNT) : 0;
                    objRtn.CUPONS_PERCENTF = (QTKTS > 0) ? ((objRtn.QCPNSF * 100.00) / QTKTS) : 0;
                    //AVG
                    objRtn.KM = rs01.getLong("QKMS");//KMS
                    objRtn.AVG_PMP = (objRtn.KM > 0) ? (objRtn.AMOUNT / objRtn.KM) : 0;

                    //Totales
                    objRtn.TOTAL_CUPONS = QCPNS;
                    objRtn.TOTAL_AMOUNT = AMOUNT;
                    objRtn.TOTAL_CUPONSF = QTKTS;
                    //kms
                    objRtn.totKM = QKMS;
                    objRtn.totAVG = (objRtn.TOTAL_CUPONS > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.TOTAL_CUPONS) : 0;
                    objRtn.totAVG1 = (objRtn.totKM > 0) ? (objRtn.TOTAL_AMOUNT / objRtn.totKM) : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    /**
     * **********************Charts*****************************************
     */
    public HashMap loadPX109SQP00994(DashboardFilter filter) throws SQLException, Exception {
        HashMap hm = new HashMap();
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lista2 = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0;
        double AMOUNT = 0, COMISION = 0, TAX = 0, AYQ = 0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00994(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.FLAG);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                CUPONS = rst.getInt("QTKTS1");
                AMOUNT = rst.getDouble("AMOUNT1");
                COMISION = rst.getDouble("COMISION");
                TAX = rst.getDouble("TAX");
                AYQ = rst.getDouble("AYQ");
            }
            rst.close();

            if (cstmt.getMoreResults()) {

                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    if (filter.IN_FECHA_FROM.trim().length() > 4) {
                        bean.DSALES = filter.IN_FECHA_FROM;
                    } else {
                        bean.DSALES = rst.getString("DSALES");
                    }
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.TYPE = rst.getString("TRNCU");

                    bean.CUPONS = rst.getInt("QTKTS1");
                    bean.AMOUNT = rst.getDouble("AMOUNT1");
                    bean.Perc1 = (AMOUNT > 0) ? (bean.AMOUNT * 100) / AMOUNT : 0;
                    if (bean.AMOUNT < 0) {
                        bean.Perc1 = bean.Perc1 * -1.0;
                    }
                    bean.Perc2 = (CUPONS > 0) ? (bean.CUPONS * 100.00) / CUPONS : 0;
                    if (bean.CUPONS < 0) {
                        bean.Perc2 = bean.Perc2 * -1.0;
                    }

                    bean.COMISION = rst.getDouble("COMISION");
                    bean.TAX = rst.getDouble("TAX");
                    bean.AYQ = rst.getDouble("AYQ");

                    bean.tot_Perc4 = (AMOUNT > 0) ? (COMISION * 100.0) / AMOUNT : 0;
                    bean.tot_Perc5 = (AMOUNT > 0) ? (TAX * 100.0) / AMOUNT : 0;
                    bean.tot_Perc6 = (AMOUNT > 0) ? (AYQ * 100.0) / AMOUNT : 0;
                    lista2.add(bean);
                }
                hm.put("lstTotales", lista2);
                rst.close();

                if (cstmt.getMoreResults()) {
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        bean = new DashboardFilter();
                        bean.DSALES = rst.getString("DSALES");
                        bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                        bean.TYPE = rst.getString("TRNCU");

                        bean.CUPONS = rst.getInt("QTKTS1");
                        bean.AMOUNT = rst.getDouble("AMOUNT1");
                        bean.COMISION = rst.getDouble("COMISION");
                        bean.TAX = rst.getDouble("TAX");
                        bean.AYQ = rst.getDouble("AYQ");

                        bean.TOTAL_CUPONS = CUPONS;
                        bean.TOTAL_AMOUNT = AMOUNT;
                        bean.totCOMISION = COMISION;
                        bean.totTAX = TAX;
                        bean.totAYQ = AYQ;

                        bean.Perc1 = (AMOUNT > 0) ? (bean.AMOUNT * 100) / AMOUNT : 0;
                        if (bean.AMOUNT < 0) {
                            bean.Perc1 = bean.Perc1 * -1.0;
                        }

                        bean.tot_Perc4 = (AMOUNT > 0) ? (COMISION * 100.0) / AMOUNT : 0;
                        bean.tot_Perc5 = (AMOUNT > 0) ? (TAX * 100.0) / AMOUNT : 0;
                        bean.tot_Perc6 = (AMOUNT > 0) ? (AYQ * 100.0) / AMOUNT : 0;

                        lista.add(bean);
                    }
                    hm.put("lstDetalle", lista);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return hm;
    }

    public List<DashboardFilter> loadPX109SQP00538(DashboardFilter filter) throws SQLException, Exception {

        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        long CUPONS = 0, CUPON_ON = 0, CUPON_OFF = 0, QCPNSF = 0, QKMS = 0, CUPONSNR = 0;
        double AMOUNT = 0, AMT_ON = 0, AMT_OFF = 0, AMOUNTF = 0, REVMIL = 0, AMOUNTNR = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00538(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                CUPONS = rst.getLong("CUPONS");
                CUPON_ON = rst.getLong("CUPON_ON");
                CUPON_OFF = rst.getLong("CUPON_OFF");
                AMOUNT = rst.getDouble("AMOUNT");
                AMT_ON = rst.getDouble("AMT_ON");
                AMT_OFF = rst.getDouble("AMT_OFF");

                QKMS = rst.getLong("QKMS");
                // REVMIL = rst.getDouble("FACRMI");
                //REVMIL = rst.getDouble("REVMIL");
                /* if (rst.getDouble("AMOUNT") > 0 && rst.getLong("QKMS") > 0) {
                 }*/

                REVMIL = rst.getDouble("AMOUNT") / rst.getDouble("QKMS");
                //Flown
                QCPNSF = rst.getLong("QCPNSF");
                AMOUNTF = rst.getDouble("AMOUNTF");

                CUPONSNR = rst.getLong("CUPONSNR");
                AMOUNTNR = rst.getDouble("AMOUNTNR");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.strDescription = rst.getString("PAIS");
                    bean.CUPONS = rst.getLong("CUPONS");
                    bean.CUPONS_ON = rst.getLong("CUPON_ON");
                    bean.CUPONS_OFF = rst.getLong("CUPON_OFF");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_ON = rst.getDouble("AMT_ON");
                    bean.AMOUNT_OFF = rst.getDouble("AMT_OFF");
                    bean.QCPNS0 = rst.getLong("CUPONSNR");
                    bean.AMOUNT0 = rst.getDouble("AMOUNTNR");

                    bean.KM = rst.getLong("QKMS");
                    //  bean.RevMil =rst.getDouble("FACRMI");
                    //  bean.RevMil = rst.getDouble("REVMIL");
                    //  if (rst.getDouble("AMOUNT") > 0 && rst.getLong("QKMS") > 0) {
                    //  }
                    bean.RevMil = rst.getDouble("AMOUNT") / rst.getDouble("QKMS");

                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTAL_CUPONS_ON = CUPON_ON;
                    bean.TOTAL_CUPONS_OFF = CUPON_OFF;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAL_AMOUNT_ON = AMT_ON;
                    bean.TOTAL_AMOUNT_OFF = AMT_OFF;
                    bean.totKM = QKMS;
                    bean.TOTAL_AVG = REVMIL;
                    bean.TOTAL_QCPNS0 = CUPONSNR;
                    bean.TOTAL_AMOUNT0 = AMOUNTNR;

                    //Porcentajes
                    bean.CUPONS_PERCENT = (CUPONS > 0) ? ((bean.CUPONS * 100.0) / CUPONS) : 0;
                    bean.AMOUNT_PERCENT = (AMOUNT > 0) ? ((bean.AMOUNT * 100.0) / AMOUNT) : 0;
                    //AVG
                    bean.TARIFA = (bean.CUPONS > 0) ? ((bean.AMOUNT) / bean.CUPONS) : 0;
                    bean.AMOUNT_ON_AVG_RATE = (bean.CUPONS_ON > 0) ? ((bean.AMOUNT_ON) / bean.CUPONS_ON) : 0;
                    bean.AMOUNT_OFF_AVG_RATE = (bean.CUPONS_OFF > 0) ? ((bean.AMOUNT_OFF) / bean.CUPONS_OFF) : 0;

                    //FLOWN
                    bean.QCPNSF = rst.getLong("QCPNSF");
                    bean.AMOUNTF = rst.getDouble("AMOUNTF");
                    bean.TOT_QCPNSF = QCPNSF;
                    bean.TOT_AMOUNTF = AMOUNTF;
                    //Porcentajes Flown
                    bean.CUPONS_PERCENTF = (QCPNSF > 0) ? ((bean.QCPNSF * 100.0) / QCPNSF) : 0;
                    bean.AMOUNT_PERCENTF = (AMOUNTF > 0) ? ((bean.AMOUNTF * 100.0) / AMOUNTF) : 0;

                    //Porcentajes Flown respecto a Sales
                    bean.CUPONS_OFF_PERCENT = (bean.CUPONS > 0) ? ((bean.QCPNSF * 100.0) / bean.CUPONS) : 0;
                    bean.TOTAL_CUPONS_PERCENTF = (CUPONS > 0) ? ((QCPNSF * 100.0) / CUPONS) : 0;

                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00540(DashboardFilter filter) throws SQLException, Exception {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00540(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new DashboardFilter();
                bean.DSALES = rst.getString("DSALES");
                bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                bean.CUPONS_MEX = rst.getInt("CPN_MEX");
                bean.CUPONS_OTHER = rst.getInt("CPN_OTHER");
                bean.CPN_ASR_MEX = rst.getInt("CPN_ASR_MEX");
                bean.CPN_ASR_OTHER = rst.getInt("CPN_ASR_OTHER");
                bean.CUPONS_ASR = rst.getInt("CPN_ASR");
                bean.CUPONS_ARC = rst.getInt("CPN_ARC");

                bean.CUPONS = rst.getInt("CPN_MEX_F");
                bean.CUPONS_OFF = rst.getInt("CPN_OTHER_F");
                bean.CUPONS_ON = rst.getInt("CPN_ASR_F");
                bean.CUPONS_ON_AVG = rst.getInt("CPN_ARC_F");

                lista.add(bean);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00541(DashboardFilter filter) throws SQLException, Exception {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS = 0, CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0;
        double AMOUNT = 0, AMOUNT_F = 0, AMOUNT_J = 0, AMOUNT_Y = 0;
        int QCPNSF = 0, CUPONF_F = 0, CUPONF_J = 0, CUPONF_Y = 0;
        double AMOUNTF = 0, AMOUNTF_F = 0, AMOUNTF_J = 0, AMOUNTF_Y = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00541(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_ONOFF);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                CUPONS = rst.getInt("CUPONS");
                CUPON_F = rst.getInt("CPN_F");
                CUPON_J = rst.getInt("CPN_J");
                CUPON_Y = rst.getInt("CPN_Y");
                AMOUNT = rst.getDouble("AMOUNT");
                AMOUNT_F = rst.getDouble("AMT_F");
                AMOUNT_J = rst.getDouble("AMT_J");
                AMOUNT_Y = rst.getDouble("AMT_Y");
                //FLOWN
                QCPNSF = rst.getInt("QCPNSF");
                CUPONF_F = rst.getInt("CPNF_F");
                CUPONF_J = rst.getInt("CPNF_J");
                CUPONF_Y = rst.getInt("CPNF_Y");
                AMOUNTF = rst.getDouble("AMOUNTF");
                AMOUNTF_F = rst.getDouble("AMTF_F");
                AMOUNTF_J = rst.getDouble("AMTF_J");
                AMOUNTF_Y = rst.getDouble("AMTF_Y");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.DSALES = rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPON_F = rst.getInt("CPN_F");
                    bean.CUPON_J = rst.getInt("CPN_J");
                    bean.CUPON_Y = rst.getInt("CPN_Y");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_F = rst.getDouble("AMT_F");
                    bean.AMOUNT_J = rst.getDouble("AMT_J");
                    bean.AMOUNT_Y = rst.getDouble("AMT_Y");

                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTCUPON_F = CUPON_F;
                    bean.Perc1 = (bean.TOTAL_CUPONS > 0) ? (bean.TOTCUPON_F * 100.0) / bean.TOTAL_CUPONS : 0;
                    bean.TOTCUPON_J = CUPON_J;
                    bean.Perc2 = (bean.TOTAL_CUPONS > 0) ? (bean.TOTCUPON_J * 100.0) / bean.TOTAL_CUPONS : 0;
                    bean.TOTCUPON_Y = CUPON_Y;
                    bean.Perc3 = (bean.TOTAL_CUPONS > 0) ? (bean.TOTCUPON_Y * 100.0) / bean.TOTAL_CUPONS : 0;

                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAMOUNT_F = AMOUNT_F;
                    bean.Perc4 = (bean.TOTAL_AMOUNT > 0) ? (bean.TOTAMOUNT_F * 100.0) / bean.TOTAL_AMOUNT : 0;
                    bean.TOTAMOUNT_J = AMOUNT_J;
                    bean.Perc5 = (bean.TOTAL_AMOUNT > 0) ? (bean.TOTAMOUNT_J * 100.0) / bean.TOTAL_AMOUNT : 0;
                    bean.TOTAMOUNT_Y = AMOUNT_Y;
                    bean.Perc6 = (bean.TOTAL_AMOUNT > 0) ? (bean.TOTAMOUNT_Y * 100.0) / bean.TOTAL_AMOUNT : 0;

                    //FLOWN
                    bean.QCPNSF = rst.getInt("QCPNSF");
                    bean.CUPONF_F = rst.getInt("CPNF_F");
                    bean.CUPONF_J = rst.getInt("CPNF_J");
                    bean.CUPONF_Y = rst.getInt("CPNF_Y");
                    bean.AMOUNTF = rst.getDouble("AMOUNTF");
                    bean.AMOUNTF_F = rst.getDouble("AMTF_F");
                    bean.AMOUNTF_J = rst.getDouble("AMTF_J");
                    bean.AMOUNTF_Y = rst.getDouble("AMTF_Y");

                    bean.TOTAL_CUPONSF = QCPNSF;
                    bean.TOTCUPONF_F = CUPONF_F;
                    bean.TOTCUPONF_J = CUPONF_J;
                    bean.TOTCUPONF_Y = CUPONF_Y;

                    bean.TOTAL_AMOUNTF = AMOUNTF;
                    bean.TOTAMOUNTF_F = AMOUNTF_F;
                    bean.TOTAMOUNTF_J = AMOUNTF_J;
                    bean.TOTAMOUNTF_Y = AMOUNTF_Y;

                    //Porcentaje usado Cupones
                    bean.CUPONS_PERCENT = (bean.CUPONS > 0) ? ((bean.QCPNSF * 100.0) / bean.CUPONS) : 0;
                    bean.CUPON_F_PER = (bean.CUPON_F > 0) ? ((bean.CUPONF_F * 100.0) / bean.CUPON_F) : 0;
                    bean.CUPON_J_PER = (bean.CUPON_J > 0) ? ((bean.CUPONF_J * 100.0) / bean.CUPON_J) : 0;
                    bean.CUPON_Y_PER = (bean.CUPON_Y > 0) ? ((bean.CUPONF_Y * 100.0) / bean.CUPON_Y) : 0;

                    bean.TOTCUPON_F_PER = (bean.TOTCUPON_F > 0) ? ((bean.TOTCUPONF_F * 100.0) / bean.TOTCUPON_F) : 0;
                    bean.TOTCUPON_J_PER = (bean.TOTCUPON_J > 0) ? ((bean.TOTCUPONF_J * 100.0) / bean.TOTCUPON_J) : 0;
                    bean.TOTCUPON_Y_PER = (bean.TOTCUPON_Y > 0) ? ((bean.TOTCUPONF_Y * 100.0) / bean.TOTCUPON_Y) : 0;
                    bean.TOTAL_CUPONS_PERCENTF = (bean.TOTAL_CUPONS > 0) ? ((bean.TOTAL_CUPONSF * 100.0) / bean.TOTAL_CUPONS) : 0;

                    //Porcentaje usado Amount
                    bean.AMOUNT_PERCENT = (bean.AMOUNT > 0) ? ((bean.AMOUNTF * 100.0) / bean.AMOUNT) : 0;
                    bean.AMOUNT_F_PER = (bean.AMOUNT_F > 0) ? ((bean.AMOUNTF_F * 100.0) / bean.AMOUNT_F) : 0;
                    bean.AMOUNT_J_PER = (bean.AMOUNT_J > 0) ? ((bean.AMOUNTF_J * 100.0) / bean.AMOUNT_J) : 0;
                    bean.AMOUNT_Y_PER = (bean.AMOUNT_Y > 0) ? ((bean.AMOUNTF_Y * 100.0) / bean.AMOUNT_Y) : 0;

                    bean.TOTAMOUNT_F_PER = (bean.TOTAMOUNT_F > 0) ? ((bean.TOTAMOUNTF_F * 100.0) / bean.TOTAMOUNT_F) : 0;
                    bean.TOTAMOUNT_J_PER = (bean.TOTAMOUNT_J > 0) ? ((bean.TOTAMOUNTF_J * 100.0) / bean.TOTAMOUNT_J) : 0;
                    bean.TOTAMOUNT_Y_PER = (bean.TOTAMOUNT_Y > 0) ? ((bean.TOTAMOUNTF_Y * 100.0) / bean.TOTAMOUNT_Y) : 0;
                    bean.TOTAL_AMOUNT_PERCENTF = (bean.TOTAL_AMOUNT > 0) ? ((bean.TOTAL_AMOUNTF * 100.0) / bean.TOTAL_AMOUNT) : 0;

                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List loadVentasA1426Agente_3(DashboardFilter filter) throws SQLException, Exception {

        List listado = new ArrayList();
        double total = 0.0, total_amountF = 0;
        int total_cupons = 0, total_cuponsF = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01203(?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_PAIS.trim());
            cstmt01.setString(6, filter.CANAV.trim());
            cstmt01.setString(7, filter.CANAVT.trim());
            cstmt01.setString(8, filter.IN_ONOFF.trim());

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                total_cuponsF = rs01.getInt("QCPNSF");
                total_amountF = rs01.getDouble("AMOUNTF");
                total = rs01.getDouble("AMOUNT");
                total_cupons = rs01.getInt("CUPONS");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {

                    HashMap hm = new HashMap();

                    hm.put("IN_FECHA_FROM", filter.IN_FECHA_FROM);
                    hm.put("IN_FECHA_TO", filter.IN_FECHA_TO);
                    hm.put("IN_PAIS", filter.IN_PAIS);
                    hm.put("CANAV", filter.CANAV);

                    hm.put("COUNTRY", rs01.getString("COUNTRYS"));
                    hm.put("VENDOR", rs01.getString("VENDOR"));
                    hm.put("CANAV", rs01.getString("CANAV"));
                    hm.put("COUNTRY_NAME", rs01.getString("DESCRIP"));
                    hm.put("strDescription1", rs01.getString("DESCAGT"));
                    hm.put("strDescription2", rs01.getString("DES_CANAV"));

                    hm.put("CUPONS_PERCENTF", (rs01.getInt("CUPONS") > 0) ? ((rs01.getInt("QCPNSF") * 100.0) / rs01.getInt("CUPONS")) : 0);
                    hm.put("CUPONS", rs01.getDouble("CUPONS"));
                    hm.put("QCPNSF", rs01.getDouble("QCPNSF"));
                    hm.put("AMOUNT", rs01.getDouble("AMOUNT"));
                    hm.put("AMOUNTF", rs01.getDouble("AMOUNTF"));

                    hm.put("TOTAL_CUPONS", total_cupons);
                    hm.put("TOTAL_CUPONSF", total_cuponsF);
                    hm.put("TOTAL_AMOUNT", total);
                    hm.put("TOTAL_AMOUNTF", total_amountF);

                    hm.put("CUPONS_PERCENTF", (rs01.getDouble("CUPONS") > 0) ? ((rs01.getDouble("QCPNSF") * 100.0) / rs01.getDouble("CUPONS")) : 0);
                    hm.put("TARIFA", (rs01.getDouble("CUPONS") > 0) ? (rs01.getDouble("AMOUNT") / rs01.getDouble("CUPONS")) : 0);
                    hm.put("CUPONS_PERCENT", (total_cupons > 0) ? ((rs01.getDouble("CUPONS") * 100.00) / total_cupons) : 0);
                    hm.put("AMOUNT_PERCENT", (total > 0) ? ((rs01.getDouble("AMOUNT") * 100) / total) : 0);
                    hm.put("TOTAL_CUPONS_PERCENTF", (total_cupons > 0) ? ((total_cuponsF * 100.0) / total_cupons) : 0);
                    hm.put("TOTAL_AVG", (total_cupons > 0) ? (total / total_cupons) : 0);

                    listado.add(hm);

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, null);
        }

        return listado;
    }

    /**
     * INTERLINEA
     */
    public List<SFI040Filter> loadPX237S01SFI040_2(A050Filter filter) throws SQLException, Exception {

        List<SFI040Filter> lstRtn = new ArrayList<SFI040Filter>(0);
        SFI040Filter objRtn;
        int PAXFAV = 0, PAXCAR = 0, PAXFAV_LY = 0, PAXCARL_LY = 0;
        double AMTFAV = 0, AMTCAR = 0, AMTFAV_LY = 0, AMTCAR_LY = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.strYearF = Functions.fillZeros(2, filter.strYearF).replace("00", "");//YYYY
        filter.strMonthF = Functions.fillZeros(2, filter.strMonthF).replace("00", "");
        filter.strDayF = Functions.fillZeros(2, filter.strDayF).replace("00", "");
        filter.strYearT = Functions.fillZeros(2, filter.strYearT).replace("00", "");//YYYY
        filter.strMonthT = Functions.fillZeros(2, filter.strMonthT).replace("00", "");
        filter.strDayT = Functions.fillZeros(2, filter.strDayT).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX237S01SFI040_2(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.strYearF.substring(2, 4) + filter.strMonthF + filter.strDayF);
            cstmt01.setString(3, filter.strYearT.substring(2, 4) + filter.strMonthT + filter.strDayT);
            cstmt01.setString(4, filter.IN_PERIOD);
            cstmt01.setString(5, filter.A050AIRLIN);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getInt("PAXFAV");
                PAXCAR = rs01.getInt("PAXCAR");
                AMTFAV = rs01.getDouble("AMTFAV");
                AMTCAR = rs01.getDouble("AMTCAR");
                PAXFAV_LY = rs01.getInt("PAXFAV_LY");
                PAXCARL_LY = rs01.getInt("PAXCAR_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");
                AMTCAR_LY = rs01.getDouble("AMTCAR_LY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI040Filter();
                    objRtn.yearFrom = filter.strYearF;
                    objRtn.monthFrom = filter.strMonthF;
                    objRtn.yearTo = filter.strYearT;
                    objRtn.monthTo = filter.strMonthT;
                    objRtn.dayFrom = filter.strDayF;
                    objRtn.dayTo = filter.strDayT;
                    objRtn.PERNUM = filter.IN_PERIOD;
                    objRtn.BAIR = filter.A050AIRLIN;
                    objRtn.BDATE = rs01.getString("MES");
                    objRtn.strFormatDate = Functions.getAbreviaturaMes(objRtn.BDATE);
                    //---------ANIO DEL FILTRO-------
                    //A FAVOR
                    objRtn.NUMREC = rs01.getInt("PAXFAV");
                    objRtn.TNET = rs01.getDouble("AMTFAV");
                    //A CARGO
                    objRtn.QITEMSCAR = rs01.getInt("PAXCAR");
                    objRtn.TNETOCAR = rs01.getDouble("AMTCAR");

                    //-------ANIO ANTERIOR---------------
                    //A FAVOR
                    objRtn.QITEMS_LY = rs01.getInt("PAXFAV_LY");
                    objRtn.TNETO_LY = rs01.getDouble("AMTFAV_LY");
                    //A CARGO
                    objRtn.QITEMSCAR_LY = rs01.getInt("PAXCAR_LY");
                    objRtn.TNETOCAR_LY = rs01.getDouble("AMTCAR_LY");

                    objRtn.diffQITEMS = objRtn.QITEMSCAR - objRtn.NUMREC;
                    objRtn.diffTNETO = objRtn.TNETOCAR - objRtn.TNET;
                    objRtn.diffQITEMS_LY = objRtn.QITEMSCAR_LY - objRtn.QITEMS_LY;
                    objRtn.diffTNETO_LY = objRtn.TNETOCAR_LY - objRtn.TNETO_LY;
                    if (objRtn.diffQITEMS < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQITEMS_LY < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    //A FAVOR (LY=LAST YEAR))
                    objRtn.totQITEMS = PAXFAV;
                    objRtn.totTNETO = AMTFAV;
                    objRtn.totQITEMS_LY = PAXFAV_LY;
                    objRtn.totTNETO_LY = AMTFAV_LY;

                    //A CARGOO
                    objRtn.totGROSSI = PAXCAR;//QITEMS
                    objRtn.totISCI = AMTCAR;//USD
                    objRtn.totGROSSI_LY = PAXCARL_LY;
                    objRtn.totISCI_LY = AMTCAR_LY;
                    //GRAFICO
                    if ((objRtn.TNET == 0) && (objRtn.TNETOCAR == 0)) {
                        //nadine
                    } else {
                        objRtn.BDATEGRA = rs01.getString("MES");
                        objRtn.strFormatDateGRA = Functions.getAbreviaturaMes(objRtn.BDATEGRA);
                        objRtn.TNETGRA = rs01.getDouble("AMTFAV");
                        objRtn.TNETOCARGRA = rs01.getDouble("AMTCAR");
                    }
                    //Totales de Diferencias favor - a cargo
                    objRtn.totTAXI = PAXCAR - PAXFAV;//QITEMS
                    objRtn.totTAXI_LY = PAXCARL_LY - PAXFAV_LY;//QITEMS 
                    objRtn.totSISCI = AMTCAR - AMTFAV;//USD
                    objRtn.totSISCI_LY = AMTCAR_LY - AMTFAV_LY;//USD

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<A050Filter> loadPX109SQP00881(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> lstRtn = new ArrayList<A050Filter>(0);
        A050Filter objRtn;
        long QTY = 0, QTY2 = 0;
        double A050ACEPTA = 0, A050COMISI = 0, A050TUA = 0, A050NETO = 0;
        double A050ACEPTA2 = 0, A050COMISI2 = 0, A050TUA2 = 0, A050NETO2 = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00881(?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.A050AIRLIN);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTY = rs01.getInt("QTY_IXC");
                A050ACEPTA = rs01.getDouble("GROS_IXC");
                A050COMISI = rs01.getDouble("ISC_IXC");
                A050TUA = rs01.getDouble("TAX_IXC");
                A050NETO = rs01.getDouble("NETO_IXC");

                QTY2 = rs01.getInt("QTY_IXP");
                A050ACEPTA2 = rs01.getDouble("GROS_IXP");
                A050COMISI2 = rs01.getDouble("ISC_IXP");
                A050TUA2 = rs01.getDouble("TAX_IXP");
                A050NETO2 = rs01.getDouble("NETO_IXP");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A050Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.A050AIRLIN = filter.A050AIRLIN;
                    objRtn.strDescripcion5 = "USD";
                    objRtn.A050FCONTA = rs01.getString("FECHA");
                    objRtn.strDescripcion = Functions.getMonthConvert(objRtn.A050FCONTA);
                    objRtn.QTY = rs01.getInt("QTY_IXC");
                    objRtn.A050ACEPTA = rs01.getDouble("GROS_IXC");
                    objRtn.A050COMISI = rs01.getDouble("ISC_IXC");
                    objRtn.A050TUA = rs01.getDouble("TAX_IXC");
                    objRtn.A050NETO = rs01.getDouble("NETO_IXC");

                    objRtn.QTY2 = rs01.getInt("QTY_IXP");
                    objRtn.A050ACEPTA2 = rs01.getDouble("GROS_IXP");
                    objRtn.A050COMISI2 = rs01.getDouble("ISC_IXP");
                    objRtn.A050TUA2 = rs01.getDouble("TAX_IXP");
                    objRtn.A050NETO2 = rs01.getDouble("NETO_IXP");

                    objRtn.totQTY = QTY;
                    objRtn.totA050ACEPTA = A050ACEPTA;
                    objRtn.totA050COMISI = A050COMISI;
                    objRtn.totA050TUA = A050TUA;
                    objRtn.totA050NETO = A050NETO;
                    

                    objRtn.totQTY2 = QTY2;
                    objRtn.totA050ACEPTA2 = A050ACEPTA2;
                    objRtn.totA050COMISI2 = A050COMISI2;
                    objRtn.totA050TUA2 = A050TUA2;
                    objRtn.totA050NETO2 = A050NETO2;
                    objRtn.PERCNET = objRtn.A050NETO > 0 ? (objRtn.A050NETO2 / objRtn.A050NETO) * 100 : 0;
                    objRtn.totPERCNET = objRtn.totA050TUA > 0 ? (objRtn.totA050TUA2 / objRtn.totA050TUA) * 100 : 0;
                    
                    objRtn.Perc1 = (objRtn.totA050NETO > 0) ? (objRtn.A050NETO * 100) / objRtn.totA050NETO : 0;
                    objRtn.Perc2 = (objRtn.totA050NETO2 > 0) ? (objRtn.A050NETO2 * 100) / objRtn.totA050NETO2 : 0;

                    objRtn.ACEPTA = objRtn.A050ACEPTA + objRtn.A050ACEPTA2;
                    objRtn.COMISI = objRtn.A050COMISI + objRtn.A050COMISI2;
                    objRtn.TUA = objRtn.A050TUA + objRtn.A050TUA2;
                    objRtn.NETO = objRtn.A050NETO + objRtn.A050NETO2;

                    objRtn.totACEPTA = A050ACEPTA + A050ACEPTA2;
                    objRtn.totCOMISI = A050COMISI + A050COMISI2;
                    objRtn.totTUA = A050TUA + A050TUA2;
                    objRtn.totNETO = A050NETO + A050NETO2;
                    objRtn.Perc3 = (objRtn.totNETO > 0) ? (objRtn.NETO * 100) / objRtn.totNETO : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A050Filter> loadPX109SQP00882(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> lstRtn = new ArrayList<A050Filter>(0);
        A050Filter objRtn;
        long QTY = 0, QTY2 = 0;
        double A050ACEPTA = 0, A050COMISI = 0, A050TUA = 0, A050NETO = 0;
        double A050ACEPTA2 = 0, A050COMISI2 = 0, A050TUA2 = 0, A050NETO2 = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00882(?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.strEstado);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTY = rs01.getInt("QTY_IXC");
                A050ACEPTA = rs01.getDouble("GROS_IXC");
                A050COMISI = rs01.getDouble("ISC_IXC");
                A050TUA = rs01.getDouble("TAX_IXC");
                A050NETO = rs01.getDouble("NETO_IXC");

                /*QTY2 = rs01.getInt("QTY_IXP");
                 A050ACEPTA2 = rs01.getDouble("GROS_IXP");
                 A050COMISI2 = rs01.getDouble("ISC_IXP");
                 A050TUA2 = rs01.getDouble("TAX_IXP");
                 A050NETO2 = rs01.getDouble("NETO_IXP");*/
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A050Filter();
                    objRtn.strDescripcion5 = "USD";
                    objRtn.A050AIRLI3 = rs01.getString("AIR");
                    objRtn.strDescripcion = rs01.getString("DES_AIR");
                    objRtn.strDescripcion1 = rs01.getString("AIR") + " - " + rs01.getString("DES_AIR");
                    objRtn.QTY = rs01.getInt("QTY_IXC");
                    objRtn.A050ACEPTA = rs01.getDouble("GROS_IXC");
                    objRtn.A050COMISI = rs01.getDouble("ISC_IXC");
                    objRtn.A050TUA = rs01.getDouble("TAX_IXC");
                    objRtn.A050NETO = rs01.getDouble("NETO_IXC");

                    /*objRtn.QTY2 = rs01.getInt("QTY_IXP");
                     objRtn.A050ACEPTA2 = rs01.getDouble("GROS_IXP");
                     objRtn.A050COMISI2 = rs01.getDouble("ISC_IXP");
                     objRtn.A050TUA2 = rs01.getDouble("TAX_IXP");
                     objRtn.A050NETO2 = rs01.getDouble("NETO_IXP");*/
                    objRtn.totQTY = QTY;
                    objRtn.totA050ACEPTA = A050ACEPTA;
                    objRtn.totA050COMISI = A050COMISI;
                    objRtn.totA050TUA = A050TUA;
                    objRtn.totA050NETO = A050NETO;

                    /*objRtn.totQTY2 = QTY2;
                     objRtn.totA050ACEPTA2 = A050ACEPTA2;
                     objRtn.totA050COMISI2 = A050COMISI2;
                     objRtn.totA050TUA2 = A050TUA2;
                     objRtn.totA050NETO2 = A050NETO2;*/
                    objRtn.Perc1 = (objRtn.totA050NETO > 0) ? (objRtn.A050NETO * 100) / objRtn.totA050NETO : 0;
                    objRtn.Perc2 = (objRtn.totA050NETO2 > 0) ? (objRtn.A050NETO2 * 100) / objRtn.totA050NETO2 : 0;

                    objRtn.ACEPTA = objRtn.A050ACEPTA + objRtn.A050ACEPTA2;
                    objRtn.COMISI = objRtn.A050COMISI + objRtn.A050COMISI2;
                    objRtn.TUA = objRtn.A050TUA + objRtn.A050TUA2;
                    objRtn.NETO = objRtn.A050NETO + objRtn.A050NETO2;

                    objRtn.totACEPTA = A050ACEPTA + A050ACEPTA2;
                    objRtn.totCOMISI = A050COMISI + A050COMISI2;
                    objRtn.totTUA = A050TUA + A050TUA2;
                    objRtn.totNETO = A050NETO + A050NETO2;
                    objRtn.Perc3 = (objRtn.totNETO > 0) ? (objRtn.NETO * 100) / objRtn.totNETO : 0;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A051wr> loadUsoswr(String calfa) throws SQLException, Exception {

        List<A051wr> lstRtn = new ArrayList<A051wr>(0);
        A051wr objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PXS01_USOS(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, calfa);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A051wr();
                objRtn.A051KEY2 = rs01.getString("A051KEY2");
                objRtn.A051DESCR1 = rs01.getString("A051DESCR1");

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public HashMap loadPX165S01WRF016(WRF016Filterwk filter) throws SQLException, Exception {
        String SQLCLL01 = "";
        HashMap hm = new HashMap();
        List<WRF016Filterwk> lstRtn = new ArrayList<WRF016Filterwk>(0);
        List<WRF016Filterwk> lstRtn2 = new ArrayList<WRF016Filterwk>(0);
        List<WRF016Filterwk> lstRates = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int Aud1 = 0, Rej1 = 0, Aud2 = 0, Rej2 = 0, Aud3 = 0, Rej3 = 0, Aud4 = 0, Rej4 = 0, Aud5 = 0, Rej5 = 0, Aud6 = 0, Rej6 = 0;
        int Supp6 = 0, Supp5 = 0, Supp4 = 0, Supp3 = 0;
        int QSFIM = 0, QSUPAUD = 0, QSUPRM = 0;
        double QCUPON = 0, QAUDI = 0, QRM = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX165S01WRF016(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_TO);
            cstmt01.setInt(3, filter.IN_SELECTBY);
            cstmt01.setString(4, filter.IN_TYPEDOC);
            cstmt01.setString(5, filter.IN_CURRENCY);
            cstmt01.setInt(6, filter.IN_TIPOFECHA);
            cstmt01.setString(7, filter.IN_TYPE);
            cstmt01.setString(8, filter.IN_AIRLINE);
            cstmt01.setString(9, filter.IN_SOURCE);
            cstmt01.setInt(10, 0);
            cstmt01.setInt(11, 0);

            cstmt01.execute();

            filter.Workable = cstmt01.getInt(10);
            filter.Pending = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                Aud1 = rs01.getInt("A1");
                Aud2 = rs01.getInt("A2");
                Aud3 = rs01.getInt("A3");
                Aud4 = rs01.getInt("A4");
                Aud5 = rs01.getInt("A5");
                Aud6 = rs01.getInt("A6");
                if (filter.IN_SELECTBY == 1) {
                    Rej1 = rs01.getInt("B1");
                    Rej2 = rs01.getInt("B2");
                    Rej3 = rs01.getInt("B3");
                    Rej4 = rs01.getInt("B4");
                    Rej5 = rs01.getInt("B5");
                    Rej6 = rs01.getInt("B6");

                    /*Supp6 = rs01.getInt("C6");
                     Supp5 = rs01.getInt("C5");
                     Supp4 = rs01.getInt("C4");
                     Supp3 = rs01.getInt("C3");*/
                    QSFIM = rs01.getInt("QSFIM");
                    QSUPAUD = rs01.getInt("QSUPAUD");
                    QSUPRM = rs01.getInt("QSUPRM");
                }

                QCUPON = rs01.getDouble("QCUPON");
                QAUDI = rs01.getDouble("QAUDI");
                QRM = rs01.getDouble("QRM");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int c = 0;
                while (rs01.next()) {
                    c++;
                    objRtn = new WRF016Filterwk();
                    objRtn.RN = rs01.getInt("NBR");
                    objRtn.strDescripcion = rs01.getString("DESCRIP");
                    objRtn.totNet1 = rs01.getDouble("MES1");
                    objRtn.totNet2 = rs01.getDouble("MES2");
                    objRtn.totNet3 = rs01.getDouble("MES3");
                    objRtn.totNet4 = rs01.getDouble("MES4");
                    objRtn.totNet5 = rs01.getDouble("MES5");
                    objRtn.totNet6 = rs01.getDouble("MES6");
                    lstRates.add(objRtn);
                }
                hm.put("lstRates", lstRates);
                if (cstmt01.getMoreResults()) {
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        objRtn = new WRF016Filterwk();

                        objRtn.FINVOICE = rs01.getString("FECHA");
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);

                        objRtn.Aud1 = rs01.getInt("A1");
                        objRtn.Aud2 = rs01.getInt("A2");
                        objRtn.Aud3 = rs01.getInt("A3");
                        objRtn.Aud4 = rs01.getInt("A4");
                        objRtn.Aud5 = rs01.getInt("A5");
                        objRtn.Aud6 = rs01.getInt("A6");
                        if (filter.IN_SELECTBY == 1) {
                            objRtn.Rej1 = rs01.getInt("B1");
                            objRtn.Rej2 = rs01.getInt("B2");
                            objRtn.Rej3 = rs01.getInt("B3");
                            objRtn.Rej4 = rs01.getInt("B4");
                            objRtn.Rej5 = rs01.getInt("B5");
                            objRtn.Rej6 = rs01.getInt("B6");

                            /*objRtn.Sup6 = rs01.getInt("C6");
                             objRtn.Sup5 = rs01.getInt("C5");
                             objRtn.Sup4 = rs01.getInt("C4");
                             objRtn.Sup3 = rs01.getInt("C3");*/
                            objRtn.totSup6 = Supp6;
                            objRtn.totSup5 = Supp5;
                            objRtn.totSup4 = Supp4;
                            objRtn.totSup3 = Supp3;

                            objRtn.QSFIM = rs01.getInt("QSFIM");
                            objRtn.QSUPAUD = rs01.getInt("QSUPAUD");
                            objRtn.QSUPRM = rs01.getInt("QSUPRM");

                            objRtn.totQSFIM = QSFIM;
                            objRtn.totQSUPAUD = QSUPAUD;
                            objRtn.totQSUPRM = QSUPRM;
                        }

                        objRtn.QCUPON = rs01.getDouble("QCUPON");
                        objRtn.QAUDI = rs01.getDouble("QAUDI");
                        objRtn.QRM = rs01.getDouble("QRM");

                        if (filter.IN_SELECTBY == 1) {
                            objRtn.Porc = (objRtn.QCUPON > 0) ? objRtn.QAUDI * 100 / objRtn.QCUPON : 0;
                        } else {
                            objRtn.Porc = (objRtn.QRM > 0) ? objRtn.QCUPON * 100 / objRtn.QRM : 0;
                        }

                        objRtn.totAud1 = Aud1;
                        objRtn.totRej1 = Rej1;
                        objRtn.totAud2 = Aud2;
                        objRtn.totRej2 = Rej2;
                        objRtn.totAud3 = Aud3;
                        objRtn.totRej3 = Rej3;
                        objRtn.totAud4 = Aud4;
                        objRtn.totRej4 = Rej4;
                        objRtn.totAud5 = Aud5;
                        objRtn.totRej5 = Rej5;
                        objRtn.totAud6 = Aud6;
                        objRtn.totRej6 = Rej6;

                        objRtn.totQCUPON = QCUPON;
                        objRtn.totQAUDI = QAUDI;
                        objRtn.totQRM = QRM;

                        if (filter.IN_SELECTBY == 1) {
                            objRtn.totPorc = (objRtn.totQCUPON > 0) ? objRtn.totQAUDI * 100 / objRtn.totQCUPON : 0;
                        } else {
                            objRtn.totPorc = (objRtn.totQRM > 0) ? objRtn.totQCUPON * 100 / objRtn.totQRM : 0;
                        }

                        objRtn.Workable = filter.Workable;
                        objRtn.Pending = filter.Pending;

                        objRtn.strFormatDate4 = Functions.getMonthConvert(filter.IN_FECHA_TO);
                        objRtn.strDescripcion = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 1));
                        objRtn.strDescripcion1 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 2));
                        objRtn.strDescripcion2 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 3));
                        objRtn.strDescripcion3 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 4));
                        objRtn.strDescripcion4 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 5));

                        objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                        objRtn.IN_SELECTBY = filter.IN_SELECTBY;
                        objRtn.IN_TYPEDOC = filter.IN_TYPEDOC;
                        objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                        objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                        objRtn.IN_TYPE = filter.IN_TYPE;
                        objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                        objRtn.IN_SOURCE = filter.IN_SOURCE;

                        lstRtn.add(objRtn);
                    }
                    hm.put("lst1", lstRtn);

                    if (cstmt01.getMoreResults()) {
                        rs01 = cstmt01.getResultSet();
                        while (rs01.next()) {
                            objRtn = new WRF016Filterwk();

                            objRtn.TDOC = rs01.getString("TDOC");
                            objRtn.strDescripcion = rs01.getString("DES_TDOC");
                            /*if (objRtn.TDOC.equals("1")) {
                             objRtn.strDescripcion = "LIFTED";
                             } else if (objRtn.TDOC.equals("2")) {
                             objRtn.strDescripcion = "FIM/SMP";
                             } else if (objRtn.TDOC.equals("3")) {
                             objRtn.strDescripcion = "FIM/MPA";
                             } else if (objRtn.TDOC.equals("4")) {
                             objRtn.strDescripcion = "CTRs/RMs";
                             } else if (objRtn.TDOC.equals("9")) {
                             objRtn.strDescripcion = "Billing Memo";
                             }*/

                            objRtn.Aud1 = rs01.getInt("A1");
                            objRtn.Aud2 = rs01.getInt("A2");
                            objRtn.Aud3 = rs01.getInt("A3");
                            objRtn.Aud4 = rs01.getInt("A4");
                            objRtn.Aud5 = rs01.getInt("A5");
                            objRtn.Aud6 = rs01.getInt("A6");

                            if (filter.IN_SELECTBY == 1) {
                                objRtn.Rej1 = rs01.getInt("B1");
                                objRtn.Rej2 = rs01.getInt("B2");
                                objRtn.Rej3 = rs01.getInt("B3");
                                objRtn.Rej4 = rs01.getInt("B4");
                                objRtn.Rej5 = rs01.getInt("B5");
                                objRtn.Rej6 = rs01.getInt("B6");
                            }

                            lstRtn2.add(objRtn);

                        }
                        hm.put("lst2", lstRtn2);
                    }
                }
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return hm;
    }

    public List<IMF053Filter> PX109SQP03554(IMF053Filter filter) throws SQLException, Exception {

        List<IMF053Filter> lstRtn = new ArrayList<IMF053Filter>(0);
        IMF053Filter objRtn;

        long QTKTEM = 0, QTKTEA = 0, QTKTES = 0, QTKTEMD = 0, QTKTMS = 0, QTKTEV = 0, QTKTFL = 0, QTKTRF = 0, QTKTEX = 0, TOTQTYEMD = 0, TOTQTYUSE = 0;
        double AMOUNTEM = 0, AMOUNTEA = 0, AMOUNTES = 0, AMOUNTEMD = 0, AMOUNTMS = 0, AMOUNTEV = 0, AMOUNTFL = 0, AMOUNTRF = 0, AMOUNTEX = 0, TOTAMTEMD = 0, TOTAMTUSE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03554(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TIPO_FEC);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTEM = rs01.getLong("QTKTEM");
                QTKTEA = rs01.getLong("QTKTEA");
                QTKTES = rs01.getLong("QTKTES");
                QTKTEMD = rs01.getLong("QTKTEMD");
                QTKTMS = rs01.getLong("QTKTMS");
                QTKTEV = rs01.getLong("QTKTEV");
                QTKTFL = rs01.getLong("QTKTFL");
                QTKTRF = rs01.getLong("QTKTRF");
                QTKTEX = rs01.getLong("QTKTEX");
                TOTQTYEMD = rs01.getLong("TOTQTYEMD");
                TOTQTYUSE = rs01.getLong("TOTQTYUSE");

                AMOUNTEM = rs01.getDouble("AMOUNTEM");
                AMOUNTEA = rs01.getDouble("AMOUNTEA");
                AMOUNTES = rs01.getDouble("AMOUNTES");
                AMOUNTEMD = rs01.getDouble("AMOUNTEMD");
                AMOUNTMS = rs01.getDouble("AMOUNTMS");
                AMOUNTEV = rs01.getDouble("AMOUNTEV");
                AMOUNTFL = rs01.getDouble("AMOUNTFL");
                AMOUNTRF = rs01.getDouble("AMOUNTRF");
                AMOUNTEX = rs01.getDouble("AMOUNTEX");
                TOTAMTEMD = rs01.getDouble("TOTAMTEMD");
                TOTAMTUSE = rs01.getDouble("TOTAMTUSE");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF053Filter();
                    objRtn.IN_TIPO_FEC = filter.IN_TIPO_FEC;
                    objRtn.strFecha = rs01.getString("FECHA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.strFecha);
                    objRtn.CURRENC = rs01.getString("CURRENC");

                    objRtn.QTKTEM = rs01.getLong("QTKTEM");
                    objRtn.QTKTEA = rs01.getLong("QTKTEA");
                    objRtn.QTKTES = rs01.getLong("QTKTES");
                    objRtn.QTKTEMD = rs01.getLong("QTKTEMD");
                    objRtn.QTKTMS = rs01.getLong("QTKTMS");
                    objRtn.QTKTEV = rs01.getLong("QTKTEV");
                    objRtn.QTKTFL = rs01.getLong("QTKTFL");
                    objRtn.QTKTRF = rs01.getLong("QTKTRF");
                    objRtn.QTKTEX = rs01.getLong("QTKTEX");
                    objRtn.TOTQTYEMD = rs01.getLong("TOTQTYEMD");
                    objRtn.TOTQTYUSE = rs01.getLong("TOTQTYUSE");

                    objRtn.AMOUNTEM = rs01.getDouble("AMOUNTEM");
                    objRtn.AMOUNTEA = rs01.getDouble("AMOUNTEA");
                    objRtn.AMOUNTES = rs01.getDouble("AMOUNTES");
                    objRtn.AMOUNTEMD = rs01.getDouble("AMOUNTEMD");
                    objRtn.AMOUNTMS = rs01.getDouble("AMOUNTMS");
                    objRtn.AMOUNTEV = rs01.getDouble("AMOUNTEV");
                    objRtn.AMOUNTFL = rs01.getDouble("AMOUNTFL");
                    objRtn.AMOUNTRF = rs01.getDouble("AMOUNTRF");
                    objRtn.AMOUNTEX = rs01.getDouble("AMOUNTEX");
                    objRtn.TOTAMTEMD = rs01.getDouble("TOTAMTEMD");
                    objRtn.TOTAMTUSE = rs01.getDouble("TOTAMTUSE");

                    objRtn.totQTKTEM = QTKTEM;
                    objRtn.totQTKTEA = QTKTEA;
                    objRtn.totQTKTES = QTKTES;
                    objRtn.totQTKTEMD = QTKTEMD;
                    objRtn.totQTKTMS = QTKTMS;
                    objRtn.totQTKTEV = QTKTEV;
                    objRtn.totQTKTFL = QTKTFL;
                    objRtn.totQTKTRF = QTKTRF;
                    objRtn.totQTKTEX = QTKTEX;
                    objRtn.totTOTQTYEMD = TOTQTYEMD;
                    objRtn.totTOTQTYUSE = TOTQTYUSE;
                    objRtn.totAMOUNTEM = AMOUNTEM;
                    objRtn.totAMOUNTEA = AMOUNTEA;
                    objRtn.totAMOUNTES = AMOUNTES;
                    objRtn.totAMOUNTEMD = AMOUNTEMD;
                    objRtn.totAMOUNTEV = AMOUNTEV;
                    objRtn.totAMOUNTMS = AMOUNTMS;
                    objRtn.totAMOUNTFL = AMOUNTFL;
                    objRtn.totAMOUNTRF = AMOUNTRF;
                    objRtn.totAMOUNTEX = AMOUNTEX;
                    objRtn.totTOTAMTEMD = TOTAMTEMD;
                    objRtn.totTOTAMTUSE = TOTAMTUSE;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<IMF053Filter> PX109SQP03560(IMF053Filter filter) throws SQLException, Exception {

        List<IMF053Filter> lstRtn = new ArrayList<IMF053Filter>(0);
        IMF053Filter objRtn;

        long QTKTEM = 0, QTKTEA = 0, QTKTES = 0, QTKTEMD = 0, QTKTMS = 0, QTKTEV = 0, QTKTFL = 0, QTKTRF = 0, QTKTEX = 0, TOTQTYEMD = 0, TOTQTYUSE = 0;
        double AMOUNTEM = 0, AMOUNTEA = 0, AMOUNTES = 0, AMOUNTEMD = 0, AMOUNTMS = 0, AMOUNTEV = 0, AMOUNTFL = 0, AMOUNTRF = 0, AMOUNTEX = 0, TOTAMTEMD = 0, TOTAMTUSE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03560(?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TIPO_FEC);
            cstmt01.setString(3, filter.strFecha);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTKTEM = rs01.getLong("QTKTEM");
                QTKTEA = rs01.getLong("QTKTEA");
                QTKTES = rs01.getLong("QTKTES");
                QTKTEMD = rs01.getLong("QTKTEMD");
                QTKTMS = rs01.getLong("QTKTMS");
                QTKTEV = rs01.getLong("QTKTEV");
                QTKTFL = rs01.getLong("QTKTFL");
                QTKTRF = rs01.getLong("QTKTRF");
                QTKTEX = rs01.getLong("QTKTEX");
                TOTQTYEMD = rs01.getLong("TOTQTYEMD");
                TOTQTYUSE = rs01.getLong("TOTQTYUSE");

                AMOUNTEM = rs01.getDouble("AMOUNTEM");
                AMOUNTEA = rs01.getDouble("AMOUNTEA");
                AMOUNTES = rs01.getDouble("AMOUNTES");
                AMOUNTEMD = rs01.getDouble("AMOUNTEMD");
                AMOUNTMS = rs01.getDouble("AMOUNTMS");
                AMOUNTEV = rs01.getDouble("AMOUNTEV");
                AMOUNTFL = rs01.getDouble("AMOUNTFL");
                AMOUNTRF = rs01.getDouble("AMOUNTRF");
                AMOUNTEX = rs01.getDouble("AMOUNTEX");
                TOTAMTEMD = rs01.getDouble("TOTAMTEMD");
                TOTAMTUSE = rs01.getDouble("TOTAMTUSE");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF053Filter();
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.strFecha = rs01.getString("FECHA");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.strFecha);
                    objRtn.CURRENC = rs01.getString("CURRENC");

                    objRtn.QTKTEM = rs01.getLong("QTKTEM");
                    objRtn.QTKTEA = rs01.getLong("QTKTEA");
                    objRtn.QTKTES = rs01.getLong("QTKTES");
                    objRtn.QTKTEMD = rs01.getLong("QTKTEMD");
                    objRtn.QTKTMS = rs01.getLong("QTKTMS");
                    objRtn.QTKTEV = rs01.getLong("QTKTEV");
                    objRtn.QTKTFL = rs01.getLong("QTKTFL");
                    objRtn.QTKTRF = rs01.getLong("QTKTRF");
                    objRtn.QTKTEX = rs01.getLong("QTKTEX");
                    objRtn.TOTQTYEMD = rs01.getLong("TOTQTYEMD");
                    objRtn.TOTQTYUSE = rs01.getLong("TOTQTYUSE");

                    objRtn.AMOUNTEM = rs01.getDouble("AMOUNTEM");
                    objRtn.AMOUNTEA = rs01.getDouble("AMOUNTEA");
                    objRtn.AMOUNTES = rs01.getDouble("AMOUNTES");
                    objRtn.AMOUNTEMD = rs01.getDouble("AMOUNTEMD");
                    objRtn.AMOUNTMS = rs01.getDouble("AMOUNTMS");
                    objRtn.AMOUNTEV = rs01.getDouble("AMOUNTEV");
                    objRtn.AMOUNTFL = rs01.getDouble("AMOUNTFL");
                    objRtn.AMOUNTRF = rs01.getDouble("AMOUNTRF");
                    objRtn.AMOUNTEX = rs01.getDouble("AMOUNTEX");
                    objRtn.TOTAMTEMD = rs01.getDouble("TOTAMTEMD");
                    objRtn.TOTAMTUSE = rs01.getDouble("TOTAMTUSE");

                    objRtn.totQTKTEM = QTKTEM;
                    objRtn.totQTKTEA = QTKTEA;
                    objRtn.totQTKTES = QTKTES;
                    objRtn.totQTKTEMD = QTKTEMD;
                    objRtn.totQTKTMS = QTKTMS;
                    objRtn.totQTKTEV = QTKTEV;
                    objRtn.totQTKTFL = QTKTFL;
                    objRtn.totQTKTRF = QTKTRF;
                    objRtn.totQTKTEX = QTKTEX;
                    objRtn.totTOTQTYEMD = TOTQTYEMD;
                    objRtn.totTOTQTYUSE = TOTQTYUSE;
                    objRtn.totAMOUNTEM = AMOUNTEM;
                    objRtn.totAMOUNTEA = AMOUNTEA;
                    objRtn.totAMOUNTES = AMOUNTES;
                    objRtn.totAMOUNTEMD = AMOUNTEMD;
                    objRtn.totAMOUNTEV = AMOUNTEV;
                    objRtn.totAMOUNTMS = AMOUNTMS;
                    objRtn.totAMOUNTFL = AMOUNTFL;
                    objRtn.totAMOUNTRF = AMOUNTRF;
                    objRtn.totAMOUNTEX = AMOUNTEX;
                    objRtn.totTOTAMTEMD = TOTAMTEMD;
                    objRtn.totTOTAMTUSE = TOTAMTUSE;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    /**
     * Flown Analysis
     */
    public List<A1971Filter> loadPX109SQP00556(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();
        A1971Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QTYPAX = 0, QTYPAX_F = 0, QTYPAX_J = 0, QTYPAX_Y = 0;
        long QTYVNR = 0, QTYNRE = 0, QTYFLI = 0, QBNPAX = 0;
        double VCPN = 0, VCPN_F = 0, VCPN_J = 0, VCPN_Y = 0, AMTBN = 0, VCPNRE = 0;
        String fecha = Functions.getFechaActual();

        String SQLCLL01 = "{CALL PRAXIS.SQP00556(?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTYPAX_F = rs01.getLong("QTYPAXF");
                QTYPAX_J = rs01.getLong("QTYPAXJ");
                QTYPAX_Y = rs01.getLong("QTYPAXY");
                VCPN_F = rs01.getDouble("VCPNF");
                VCPN_J = rs01.getDouble("VCPNJ");
                VCPN_Y = rs01.getDouble("VCPNY");
                //Total
                VCPN = rs01.getDouble("VCPN");
                QTYPAX = rs01.getLong("QTYPAX");
                QTYVNR = rs01.getLong("QTYVNR");
                QTYNRE = rs01.getLong("QTYNRE");
                QTYFLI = rs01.getLong("QTYFLI");
                QBNPAX = rs01.getLong("QPAXBN");
                AMTBN = rs01.getDouble("VCPBN");
                VCPNRE = rs01.getDouble("VCPNRE");

            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");

                    objRtn.strDescripcion3 = "CLOSED";
                    objRtn.strRuta = "1";
                    if (objRtn.DFLIGHT.equals(fecha.substring(0, 6))) {
                        objRtn.strDescripcion3 = Functions.getMonthConvert(Functions.restXDaystoDate(fecha, 3));
                        objRtn.strRuta = "";
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.QTYFlight = rs01.getLong("QTYFLI");

                    objRtn.VCPN_F = rs01.getDouble("VCPNF");
                    objRtn.QTYPAX_F = rs01.getInt("QTYPAXF");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;

                    objRtn.VCPN_J = rs01.getDouble("VCPNJ");
                    objRtn.QTYPAX_J = rs01.getInt("QTYPAXJ");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;

                    objRtn.VCPN_Y = rs01.getDouble("VCPNY");
                    objRtn.QTYPAX_Y = rs01.getInt("QTYPAXY");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;

                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.QTYVNR = rs01.getLong("QTYVNR");
                    objRtn.QTYNRE = rs01.getLong("QTYNRE");
                    objRtn.VCPNRE = rs01.getDouble("VCPNRE");
                    objRtn.QEXCEP = rs01.getLong("QTYVNR") + rs01.getLong("QTYNRE");
                    objRtn.Per2 = (objRtn.QTYPAX > 0) ? (objRtn.QTYNRE * 100.0) / objRtn.QTYPAX : 0.00;
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");

                    objRtn.PerCAP = objRtn.AVG_Y * objRtn.QTYVNR;//Amunt Unreported 
                    objRtn.Per1 = (objRtn.VCPN > 0) ? (objRtn.PerCAP * 100.0) / objRtn.VCPN : 0.00;
                    //Totales
                    objRtn.totVCPN = VCPN;
                    objRtn.totQTYPAX = QTYPAX;
                    objRtn.totVCPN_F = VCPN_F;
                    objRtn.totVCPN_J = VCPN_J;
                    objRtn.totVCPN_Y = VCPN_Y;
                    objRtn.totQTYPAX_F = QTYPAX_F;
                    objRtn.totQTYPAX_J = QTYPAX_J;
                    objRtn.totQTYPAX_Y = QTYPAX_Y;
                    objRtn.totQTYVNR = QTYVNR;
                    objRtn.totPer1 = (objRtn.totQTYPAX > 0) ? (objRtn.totQTYVNR * 100.0) / objRtn.totQTYPAX : 0.00;
                    objRtn.totQTYNRE = QTYNRE;
                    objRtn.totPer2 = (objRtn.totQTYPAX > 0) ? (objRtn.totQTYNRE * 100.0) / objRtn.totQTYPAX : 0.00;
                    objRtn.totQEXCEP = QTYVNR + QTYNRE;
                    objRtn.totQTYFlight = QTYFLI;
                    objRtn.totAMTBN = AMTBN;
                    objRtn.totQBNPAX = QBNPAX;
                    objRtn.totVCPNRE = VCPNRE;

                    objRtn.totAVG_F = (objRtn.totQTYPAX_F > 0) ? objRtn.totVCPN_F / objRtn.totQTYPAX_F : 0;
                    objRtn.totAVG_J = (objRtn.totQTYPAX_J > 0) ? objRtn.totVCPN_J / objRtn.totQTYPAX_J : 0;
                    objRtn.totAVG_Y = (objRtn.totQTYPAX_Y > 0) ? objRtn.totVCPN_Y / objRtn.totQTYPAX_Y : 0;
                    objRtn.PerJ = (objRtn.VCPN > 0) ? (objRtn.VCPN_J * 100.0) / objRtn.VCPN : 0.00;
                    objRtn.PerY = (objRtn.VCPN > 0) ? (objRtn.VCPN_Y * 100.0) / objRtn.VCPN : 0.00;
                    objRtn.PerF = (objRtn.VCPN > 0) ? (objRtn.VCPN_F * 100.0) / objRtn.VCPN : 0.00;

                    objRtn.totPer3 = (VCPN > 0) ? (VCPN_J * 100.0) / VCPN : 0.00;
                    objRtn.totPer4 = (VCPN > 0) ? (VCPN_Y * 100.0) / VCPN : 0.00;
                    objRtn.totYIELD = 100;
                    listado.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX109SQP00556MT(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();

        A1971Filter objRtn;
        A1971Filter objRtn0;
        int i = 0, j = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QTYPAX_J = 0, VCPN_J = 0, QTYPAX_Y = 0, VCPN_Y = 0, QTYPAX = 0, VCPN = 0;
        long QTYPAX_JB = 0, VCPN_JB = 0, QTYPAX_YB = 0, VCPN_YB = 0, QTYPAXB = 0, VCPNB = 0;
        String strYearB = "", strValueB = "", strMonthB = "";
        String fecha = Functions.getFechaActual();
        String[] listado1FD = new String[filter.MESES];
        int[] listado1BP = new int[filter.MESES];
        double[] listado1BV = new double[filter.MESES];
        int[] listado1EP = new int[filter.MESES];
        double[] listado1EV = new double[filter.MESES];
        int[] listado1TP = new int[filter.MESES];
        double[] listado1TV = new double[filter.MESES];

        String SQLCLL01 = "{CALL PRAXIS.SQP00556MT(?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_FECHA_FROMB);
            cstmt01.setString(5, filter.IN_FECHA_TOB);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn0 = new A1971Filter();
                objRtn0.IN_FECHA_FROMB = filter.IN_FECHA_FROMB;
                objRtn0.IN_FECHA_TOB = filter.IN_FECHA_TOB;
                objRtn0.DFLIGHTB = rs01.getString("DFLIGHTB");
                objRtn0.strFormatDate = Functions.getMonthConvert6(objRtn0.DFLIGHTB);
                objRtn0.strFormatDateB = Functions.getMonthConvert6(objRtn0.DFLIGHTB);
                //Bussines
                objRtn0.VCPN_JB = rs01.getDouble("VCPNJB");
                objRtn0.QTYPAX_JB = rs01.getLong("QTYPAXJB");
                //Economy
                objRtn0.VCPN_YB = rs01.getDouble("VCPNYB");
                objRtn0.QTYPAX_YB = rs01.getLong("QTYPAXYB");
                //Total
                objRtn0.VCPNB = rs01.getDouble("VCPNB");
                objRtn0.QTYPAXB = rs01.getLong("QTYPAXB");

//                strMonthB = objRtn0.strFormatDate.substring(0, 3);
                strYearB = objRtn0.IN_FECHA_FROMB.substring(0, 4);
//                strValueB = objRtn0.strMonthB + ":" + objRtn0.VCPNB;

                listado1FD[i] = objRtn0.strFormatDateB;
                listado1BP[i] = (int) objRtn0.QTYPAX_JB;
                listado1BV[i] = objRtn0.VCPN_JB;
                listado1EP[i] = (int) objRtn0.QTYPAX_YB;
                listado1EV[i] = objRtn0.VCPN_YB;
                listado1TP[i] = (int) objRtn0.QTYPAXB;
                listado1TV[i] = objRtn0.VCPNB;
                i++;
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");

                    objRtn.strDescripcion3 = "CLOSED";
                    objRtn.strRuta = "1";
                    if (objRtn.DFLIGHT.equals(fecha.substring(0, 6))) {
                        objRtn.strDescripcion3 = Functions.getMonthConvert(Functions.restXDaystoDate(fecha, 3));
                        objRtn.strRuta = "";
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    //pie acutal - anterior
                    objRtn.strMonth = objRtn.strFormatDate.substring(0, 4);
                    objRtn.strYear = objRtn.IN_FECHA_FROM.substring(0, 4);
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.QTYFlight = rs01.getLong("QTYFLI");

                    objRtn.VCPN_F = rs01.getDouble("VCPNF");
                    objRtn.QTYPAX_F = rs01.getInt("QTYPAXF");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;

                    objRtn.VCPN_J = rs01.getDouble("VCPNJ");
                    objRtn.QTYPAX_J = rs01.getInt("QTYPAXJ");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;

                    objRtn.VCPN_Y = rs01.getDouble("VCPNY");
                    objRtn.QTYPAX_Y = rs01.getInt("QTYPAXY");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;

                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.QTYVNR = rs01.getLong("QTYVNR");
                    objRtn.QTYNRE = rs01.getLong("QTYNRE");
                    objRtn.VCPNRE = rs01.getDouble("VCPNRE");
                    objRtn.QEXCEP = rs01.getLong("QTYVNR") + rs01.getLong("QTYNRE");
                    objRtn.Per2 = (objRtn.QTYPAX > 0) ? (objRtn.QTYNRE * 100.0) / objRtn.QTYPAX : 0.00;
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");

                    objRtn.PerCAP = objRtn.AVG_Y * objRtn.QTYVNR;//Amunt Unreported 
                    objRtn.Per1 = (objRtn.VCPN > 0) ? (objRtn.PerCAP * 100.0) / objRtn.VCPN : 0.00;

                    //pie acutal - anterior
                    objRtn.strMonth = objRtn.strFormatDate.substring(0, 3);
                    objRtn.strYear = objRtn.IN_FECHA_FROM.substring(0, 4);
                    objRtn.strValue = objRtn.strMonth + ":" + objRtn.VCPN;

                    objRtn.strFormatDateB = listado1FD[j];
                    objRtn.QTYPAX_JB = listado1BP[j];
                    objRtn.VCPN_JB = listado1BV[j];
                    objRtn.QTYPAX_YB = listado1EP[j];
                    objRtn.VCPN_YB = listado1EV[j];
                    objRtn.QTYPAXB = listado1TP[j];
                    objRtn.VCPNB = listado1TV[j];
                    objRtn.strYearB = strYearB;
                    objRtn.strValueB = objRtn.strMonth + ":" + objRtn.VCPNB;

                    QTYPAX_J += objRtn.QTYPAX_J;
                    VCPN_J += objRtn.VCPN_J;
                    QTYPAX_Y += objRtn.QTYPAX_Y;
                    VCPN_Y += objRtn.VCPN_Y;
                    QTYPAX += objRtn.QTYPAX;
                    VCPN += objRtn.VCPN;

                    QTYPAX_JB += objRtn.QTYPAX_JB;
                    VCPN_JB += objRtn.VCPN_JB;
                    QTYPAX_YB += objRtn.QTYPAX_YB;
                    VCPN_YB += objRtn.VCPN_YB;
                    QTYPAXB += objRtn.QTYPAXB;
                    VCPNB += objRtn.VCPNB;

                    j++;
                    listado.add(objRtn);
                }
            }
            for (int a = 0; a < listado.size(); a++) {
                listado.get(a).totVCPN = VCPNB;
                listado.get(a).totQTYPAX = QTYPAX;
                listado.get(a).totVCPN_Y = VCPN_Y;
                listado.get(a).totQTYPAX_Y = QTYPAX_Y;
                listado.get(a).totVCPN_J = VCPN_J;
                listado.get(a).totQTYPAX_J = QTYPAX_J;
                listado.get(a).totVCPNB = VCPNB;
                listado.get(a).totQTYPAXB = QTYPAXB;
                listado.get(a).totVCPN_YB = VCPN_YB;
                listado.get(a).totQTYPAX_YB = QTYPAX_YB;
                listado.get(a).totVCPN_JB = VCPN_JB;
                listado.get(a).totQTYPAX_JB = QTYPAX_JB;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX109SQP00556NF(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();
        String[] listado1FD = new String[filter.MESES];
        int[] listado1QF = new int[filter.MESES];
        int[] listado1BP = new int[filter.MESES];
        double[] listado1BV = new double[filter.MESES];
        int[] listado1EP = new int[filter.MESES];
        double[] listado1EV = new double[filter.MESES];
        int[] listado1TP = new int[filter.MESES];
        double[] listado1TV = new double[filter.MESES];
        double[] listado1TB = new double[filter.MESES];
        A1971Filter objRtn;
        A1971Filter objRtn0;
        int i = 0, j = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QTYPAX = 0, QTYPAX_F = 0, QTYPAX_J = 0, QTYPAX_Y = 0;
        long QTYVNR = 0, QTYNRE = 0, QTYFLI = 0, QBNPAX = 0;
        long QFLIGHTB = 0, QCPNOALB = 0, VCPNOALB = 0, QCPNONB = 0, VCPNONB = 0, QCPNNFB = 0, VCPNNFB = 0;
        long QFLIGHT = 0, QCPNOAL = 0, VCPNOAL = 0, QCPNON = 0, VCPNON = 0, QCPNNF = 0, VCPNNF = 0;
        double VCPN = 0, VCPN_F = 0, VCPN_J = 0, VCPN_Y = 0, AMTBN = 0, VCPNRE = 0;
        double VCPNB = 0, totVCPNNF = 0, totVCPNNFB = 0, UNI = 0, UNIB = 0;
        double TOVCPNONB = 0, TOVCPNOALB = 0, TOVCPNON = 0, TOVCPNOAL = 0;
        String strYearB = "", strValueB = "", strMonthB = "";
        String fecha = Functions.getFechaActual();

        String SQLCLL01 = "{CALL PRAXIS.SQP00556NF(?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_FECHA_FROMB);
            cstmt01.setString(5, filter.IN_FECHA_TOB);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn0 = new A1971Filter();
                objRtn0.IN_FECHA_FROMB = filter.IN_FECHA_FROMB;
                objRtn0.IN_FECHA_TOB = filter.IN_FECHA_TOB;
                objRtn0.DFLIGHTB = rs01.getString("DFLIGHTB");
                objRtn0.QFLIGHTB = rs01.getLong("QFLIGHTB");
                objRtn0.VCPNB = rs01.getLong("VCPNB");
                objRtn0.strFormatDate = Functions.getMonthConvert6(objRtn0.DFLIGHTB);
                objRtn0.strFormatDateB = Functions.getMonthConvert6(objRtn0.DFLIGHTB);
                //ON
                objRtn0.VCPNONB = rs01.getDouble("VCPNONB");
                objRtn0.QCPNONB = rs01.getLong("QCPNONB");
                //OAL
                objRtn0.VCPNOALB = rs01.getDouble("VCPNOALB");
                objRtn0.QCPNOALB = rs01.getLong("QCPNOALB");
                //Total
                objRtn0.VCPNNFB = objRtn0.VCPNONB + objRtn0.VCPNOALB;
                objRtn0.QCPNNFB = objRtn0.QCPNONB + objRtn0.QCPNOALB;
                //REAL TOTAL GRAFICO PIE3

                strMonthB = objRtn0.strFormatDate.substring(0, 3);
                strYearB = objRtn0.IN_FECHA_FROMB.substring(0, 4);
                strValueB = objRtn0.strMonthB + ":" + objRtn0.VCPNNFB;

                listado1FD[i] = objRtn0.strFormatDateB;
                listado1QF[i] = (int) objRtn0.QFLIGHTB;
                listado1BP[i] = (int) objRtn0.QCPNONB;
                listado1BV[i] = objRtn0.VCPNONB;
                listado1EP[i] = (int) objRtn0.QCPNOALB;
                listado1EV[i] = objRtn0.VCPNOALB;
                listado1TP[i] = (int) objRtn0.QCPNNFB;
                listado1TV[i] = objRtn0.VCPNNFB;
                listado1TB[i] = objRtn0.VCPNB;
                if (i == 0) {
                    TOVCPNONB = rs01.getDouble("TOVCPNONB");
                    TOVCPNOALB = rs01.getDouble("TOVCPNOALB");
                    TOVCPNON = rs01.getDouble("TOVCPNON");
                    TOVCPNOAL = rs01.getDouble("TOVCPNOAL");
                }
                i++;
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");

                    objRtn.strDescripcion3 = "CLOSED";
                    objRtn.strRuta = "1";
                    if (objRtn.DFLIGHT.equals(fecha.substring(0, 6))) {
                        objRtn.strDescripcion3 = Functions.getMonthConvert(Functions.restXDaystoDate(fecha, 3));
                        objRtn.strRuta = "";
                    }

                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    //pie acutal - anterior
                    objRtn.strMonth = objRtn.strFormatDate.substring(0, 4);
                    objRtn.strYear = objRtn.IN_FECHA_FROM.substring(0, 4);
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.QTYFlight = rs01.getLong("QTYFLI");

                    objRtn.VCPN_F = rs01.getDouble("VCPNF");
                    objRtn.QTYPAX_F = rs01.getInt("QTYPAXF");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;

                    objRtn.VCPN_J = rs01.getDouble("VCPNJ");
                    objRtn.QTYPAX_J = rs01.getInt("QTYPAXJ");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;

                    objRtn.VCPN_Y = rs01.getDouble("VCPNY");
                    objRtn.QTYPAX_Y = rs01.getInt("QTYPAXY");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;

                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.QTYVNR = rs01.getLong("QTYVNR");
                    objRtn.QTYNRE = rs01.getLong("QTYNRE");
                    objRtn.VCPNRE = rs01.getDouble("VCPNRE");
                    objRtn.QEXCEP = rs01.getLong("QTYVNR") + rs01.getLong("QTYNRE");
                    objRtn.Per2 = (objRtn.QTYPAX > 0) ? (objRtn.QTYNRE * 100.0) / objRtn.QTYPAX : 0.00;
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");

                    objRtn.PerCAP = objRtn.AVG_Y * objRtn.QTYVNR;//Amunt Unreported 
                    objRtn.Per1 = (objRtn.VCPN > 0) ? (objRtn.PerCAP * 100.0) / objRtn.VCPN : 0.00;

                    objRtn.QFLIGHT = rs01.getLong("QFLIGHT");
                    //ON
                    objRtn.VCPNON = rs01.getDouble("VCPNON");
                    objRtn.QCPNON = rs01.getLong("QCPNON");
                    //OAL
                    objRtn.VCPNOAL = rs01.getDouble("VCPNOAL");
                    objRtn.QCPNOAL = rs01.getLong("QCPNOAL");
                    //Total
                    objRtn.VCPNNF = objRtn.VCPNON + objRtn.VCPNOAL;
                    objRtn.QCPNNF = objRtn.QCPNON + objRtn.QCPNOAL;
                    //pie acutal - anterior
                    objRtn.strMonth = objRtn.strFormatDate.substring(0, 3);
                    objRtn.strYear = objRtn.IN_FECHA_FROM.substring(0, 4);
                    objRtn.strValue = "Total Of:" + objRtn.VCPNNF;

                    objRtn.strFormatDateB = listado1FD[j];
                    objRtn.QFLIGHTB = listado1QF[j];
                    objRtn.QCPNONB = listado1BP[j];
                    objRtn.VCPNONB = listado1BV[j];
                    objRtn.QCPNOALB = listado1EP[j];
                    objRtn.VCPNOALB = listado1EV[j];
                    objRtn.QCPNNFB = listado1TP[j];
                    objRtn.VCPNNFB = listado1TV[j];
                    objRtn.VCPNB = listado1TB[j];
                    objRtn.strYearB = strYearB;
                    objRtn.strValueB = "Total Of:" + objRtn.VCPNNFB;

                    UNIB = TOVCPNONB + TOVCPNOALB;
                    UNI = TOVCPNON + TOVCPNOAL;
                    TOVCPNONB = (TOVCPNONB * 100) / UNIB;
                    TOVCPNOALB = (TOVCPNOALB * 100) / UNIB;
                    TOVCPNON = (TOVCPNON * 100) / UNI;
                    TOVCPNOAL = (TOVCPNOAL * 100) / UNI;
                    objRtn.TOVCPNONB = TOVCPNONB;
                    objRtn.TOVCPNON = TOVCPNON;
                    objRtn.TOVCPNOALB = TOVCPNOALB;
                    objRtn.TOVCPNOAL = TOVCPNOAL;

                    QFLIGHTB += objRtn.QFLIGHTB;
                    QCPNOALB += objRtn.QCPNOALB;
                    VCPNOALB += objRtn.VCPNOALB;
                    QCPNONB += objRtn.QCPNONB;
                    VCPNONB += objRtn.VCPNONB;
                    QCPNNFB += objRtn.QCPNNFB;
                    VCPNNFB += objRtn.VCPNNFB;

                    QFLIGHT += objRtn.QFLIGHT;
                    QCPNOAL += objRtn.QCPNOAL;
                    VCPNOAL += objRtn.VCPNOAL;
                    QCPNON += objRtn.QCPNON;
                    VCPNON += objRtn.VCPNON;
                    QCPNNF += objRtn.QCPNNF;
                    VCPNNF += objRtn.VCPNNF;

                    j++;
                    listado.add(objRtn);
                }
            }
            for (int a = 0; a < listado.size(); a++) {
                listado.get(a).totQFLIGHTB = QFLIGHTB;
                listado.get(a).totQCPNOALB = QCPNOALB;
                listado.get(a).totVCPNOALB = VCPNOALB;
                listado.get(a).totQCPNONB = QCPNONB;
                listado.get(a).totVCPNONB = VCPNONB;
                listado.get(a).totQCPNNFB = QCPNNFB;
                listado.get(a).totVCPNNFB = VCPNNFB;
                listado.get(a).totQFLIGHT = QFLIGHT;
                listado.get(a).totQCPNOAL = QCPNOAL;
                listado.get(a).totVCPNOAL = VCPNOAL;
                listado.get(a).totQCPNON = QCPNON;
                listado.get(a).totVCPNON = VCPNON;
                listado.get(a).totQCPNNF = QCPNNF;
                listado.get(a).totVCPNNF = VCPNNF;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX109SQP00556ZN(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();
        String[] Zones = new String[filter.MESES];
        double[] listado1 = new double[filter.MESES];
        double[] listado2 = new double[filter.MESES];

        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
//        
        A1971Filter objRtn;
        A1971Filter objRtn0;
        int i = 0, j = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String fecha = Functions.getFechaActual();

        String SQLCLL01 = "{CALL PRAXIS.SQP00556ZN(?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_FECHA_FROMB);
            cstmt01.setString(5, filter.IN_FECHA_TOB);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn0 = new A1971Filter();
                objRtn0.QCFLOW = rs01.getLong("QCFLOW");
                objRtn0.QCPAX = rs01.getLong("QCPAX");
                Zones[i] = objRtn0.ZONA;
                listado1[i] = (int) objRtn0.QCFLOW;
                listado2[i] = (int) objRtn0.QCPAX;
                i++;
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.QCFLOW = rs01.getLong("QCFLOW");
                    objRtn.QCPAX = rs01.getLong("QCPAX");
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.strYear = objRtn.IN_FECHA_FROM.substring(0, 4);
                    objRtn.IN_FECHA_FROMB = filter.IN_FECHA_FROMB;
                    objRtn.strYearB = objRtn.IN_FECHA_FROMB.substring(0, 4);
                    if (hm.containsKey(objRtn.ZONA.trim().toUpperCase())) {
                        objRtn.strDescripcion = hm.get(objRtn.ZONA.trim()).toString();
                    }
                    objRtn.AVG = (objRtn.QCFLOW > 0) ? (objRtn.QCPAX) / objRtn.QCFLOW : 0.00;
                    objRtn.ZONAB = Zones[j];
                    if (hm.containsKey(objRtn.ZONAB.trim().toUpperCase())) {
                        objRtn.strDescripcionB = hm.get(objRtn.ZONAB.trim()).toString();
                    }
                    objRtn.QCFLOWB = listado1[j];
                    objRtn.QCPAXB = listado2[j];
                    objRtn.AVGB = (objRtn.QCFLOWB > 0) ? (objRtn.QCPAXB) / objRtn.QCFLOWB : 0.00;
                    j++;
                    listado.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX109SQP00556CA(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();

        A1971Filter objRtn;
        A1971Filter objRtn0;
        int i = 0, j = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Double totAM = 0.0, totCINCOD = 0.0, totAM_OTRO = 0.0, totCINCOD_OTRO = 0.0, totTOTAL = 0.0;
        Double totAMM = 0.0, totCINCODM = 0.0, totAM_OTROM = 0.0, totCINCOD_OTROM = 0.0, totTOTALM = 0.0;
        Double totAM0 = 0.0, totCINCOD0 = 0.0, totAM_OTRO0 = 0.0, totCINCOD_OTRO0 = 0.0, totTOTAL0 = 0.0;
        Double totAMM0 = 0.0, totCINCODM0 = 0.0, totAM_OTROM0 = 0.0, totCINCOD_OTROM0 = 0.0, totTOTALM0 = 0.0;

        String SQLCLL01 = "{CALL PRAXIS.SQP00556CA(?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_DATE);
            cstmt01.setString(3, filter.IN_TIPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            String[] listado1FD = new String[12];
            double[] listado1QF = new double[12];
            double[] listado1BP = new double[12];
            double[] listado1EP = new double[12];
            double[] listado1EV = new double[12];
            double[] listado1TV = new double[12];
            double[] listado1QFM = new double[12];
            double[] listado1BPM = new double[12];
            double[] listado1EPM = new double[12];
            double[] listado1EVM = new double[12];
            double[] listado1TVM = new double[12];

            while (rs01.next()) {
                objRtn0 = new A1971Filter();
                objRtn0.DATE0 = rs01.getString("DPROCES");
                objRtn0.strFormatDate0 = Functions.getMonthConvert6(objRtn0.DATE0);
                objRtn0.AM0 = rs01.getDouble("QTYCPNAM1");
                objRtn0.CINCOD0 = rs01.getDouble("QTYCPN5D1");
                objRtn0.AM_OTRO0 = rs01.getDouble("QTYCPNAM2");
                objRtn0.CINCOD_OTRO0 = rs01.getDouble("QTYCPN5D2");
                objRtn0.TOTAL0 = rs01.getDouble("TOTAL");
                objRtn0.AMM0 = rs01.getDouble("AMOCPNAM1");
                objRtn0.CINCODM0 = rs01.getDouble("AMOCPN5D1");
                objRtn0.AM_OTROM0 = rs01.getDouble("AMOCPNAM2");
                objRtn0.CINCOD_OTROM0 = rs01.getDouble("AMOCPN5D2");
                objRtn0.TOTALM0 = objRtn0.AMM0 + objRtn0.CINCODM0 + objRtn0.AM_OTROM0 + objRtn0.CINCOD_OTROM0;

                listado1FD[i] = objRtn0.strFormatDate0;
                listado1QF[i] = objRtn0.AM0;
                listado1BP[i] = objRtn0.CINCOD0;
                listado1EP[i] = objRtn0.AM_OTRO0;
                listado1EV[i] = objRtn0.CINCOD_OTRO0;
                listado1TV[i] = objRtn0.TOTAL0;
                listado1QFM[i] = objRtn0.AMM0;
                listado1BPM[i] = objRtn0.CINCODM0;
                listado1EPM[i] = objRtn0.AM_OTROM0;
                listado1EVM[i] = objRtn0.CINCOD_OTROM0;
                listado1TVM[i] = objRtn0.TOTALM0;
                i++;
            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.DATE = rs01.getString("DPROCES");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DATE);
                    objRtn.AM = rs01.getDouble("QTYCPNAM1");
                    objRtn.CINCOD = rs01.getDouble("QTYCPN5D1");
                    objRtn.AM_OTRO = rs01.getDouble("QTYCPNAM2");
                    objRtn.CINCOD_OTRO = rs01.getDouble("QTYCPN5D2");
                    objRtn.TOTAL = rs01.getDouble("TOTAL");
                    objRtn.AMM = rs01.getDouble("AMOCPNAM1");
                    objRtn.CINCODM = rs01.getDouble("AMOCPN5D1");
                    objRtn.AM_OTROM = rs01.getDouble("AMOCPNAM2");
                    objRtn.CINCOD_OTROM = rs01.getDouble("AMOCPN5D2");
                    objRtn.TOTALM = objRtn.AMM + objRtn.CINCODM + objRtn.AM_OTROM + objRtn.CINCOD_OTROM;

                    totAM += objRtn.AM;
                    totCINCOD += objRtn.CINCOD;
                    totAM_OTRO += objRtn.AM_OTRO;
                    totCINCOD_OTRO += objRtn.CINCOD_OTRO;
                    totTOTAL += objRtn.TOTAL;
                    totAMM += objRtn.AMM;
                    totCINCODM += objRtn.CINCODM;
                    totAM_OTROM += objRtn.AM_OTROM;
                    totCINCOD_OTROM += objRtn.CINCOD_OTROM;
                    totTOTALM += objRtn.TOTALM;

                    objRtn.strFormatDate0 = listado1FD[j];
                    objRtn.AM0 = listado1QF[j];
                    objRtn.CINCOD0 = listado1BP[j];
                    objRtn.AM_OTRO0 = listado1EP[j];
                    objRtn.CINCOD_OTRO0 = listado1EV[j];
                    objRtn.TOTAL0 = listado1TV[j];
                    objRtn.AMM0 = listado1QFM[j];
                    objRtn.CINCODM0 = listado1BPM[j];
                    objRtn.AM_OTROM0 = listado1EPM[j];
                    objRtn.CINCOD_OTROM0 = listado1EVM[j];
                    objRtn.TOTALM0 = listado1TVM[j];

                    totAM0 += objRtn.AM0;
                    totCINCOD0 += objRtn.CINCOD0;
                    totAM_OTRO0 += objRtn.AM_OTRO0;
                    totCINCOD_OTRO0 += objRtn.CINCOD_OTRO0;
                    totTOTAL0 += objRtn.TOTAL0;
                    totAMM0 += objRtn.AMM0;
                    totCINCODM0 += objRtn.CINCODM0;
                    totAM_OTROM0 += objRtn.AM_OTROM0;
                    totCINCOD_OTROM0 += objRtn.CINCOD_OTROM0;
                    totTOTALM0 += objRtn.TOTALM0;

                    j++;
                    listado.add(objRtn);
                }
            }
            for (int a = 0; a < listado.size(); a++) {
                listado.get(a).totAM = totAM;
                listado.get(a).totCINCOD = totCINCOD;
                listado.get(a).totAM_OTRO = totAM_OTRO;
                listado.get(a).totCINCOD_OTRO = totCINCOD_OTRO;
                listado.get(a).totTOTAL = totTOTAL;
                listado.get(a).totAM0 = totAM0;
                listado.get(a).totCINCOD0 = totCINCOD0;
                listado.get(a).totAM_OTRO0 = totAM_OTRO0;
                listado.get(a).totCINCOD_OTRO0 = totCINCOD_OTRO0;
                listado.get(a).totTOTAL0 = totTOTAL0;
                listado.get(a).totAMM = totAMM;
                listado.get(a).totCINCODM = totCINCODM;
                listado.get(a).totAM_OTROM = totAM_OTROM;
                listado.get(a).totCINCOD_OTROM = totCINCOD_OTROM;
                listado.get(a).totTOTALM = totTOTALM;
                listado.get(a).totAMM0 = totAMM0;
                listado.get(a).totCINCODM0 = totCINCODM0;
                listado.get(a).totAM_OTROM0 = totAM_OTROM0;
                listado.get(a).totCINCOD_OTROM0 = totCINCOD_OTROM0;
                listado.get(a).totTOTALM0 = totTOTALM0;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX109SQP01927(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();
        A1971Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        long QTY = 0, QTY_VAL = 0, QTY_CON = 0, QTY_PEN = 0, QCPNON = 0, QCPNOAL = 0;
        long VCPN_VAL = 0, VCPN_CON = 0, VCPN_PEN = 0, VCPNON = 0, VCPNOAL = 0;

        String SQLCLL01 = "{CALL PRAXIS.SQP01927(?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY = rs01.getLong("QTY");
                QTY_VAL = rs01.getLong("QTY_VAL");
                QTY_CON = rs01.getLong("QTY_CON");
                QTY_PEN = rs01.getLong("QTY_PEN");
                QCPNON = rs01.getLong("QCPNON");
                QCPNOAL = rs01.getLong("QCPNOAL");
                //Total
                VCPN_VAL = rs01.getLong("VCPN_VAL");
                VCPN_CON = rs01.getLong("VCPN_CON");
                VCPN_PEN = rs01.getLong("VCPN_PEN");
                VCPNON = rs01.getLong("VCPNON");
                VCPNOAL = rs01.getLong("VCPNOAL");

            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);

                    objRtn.QTYFlight = rs01.getLong("QTY");

                    objRtn.VCPN = rs01.getDouble("VCPN_VAL");
                    objRtn.VCPN_F = rs01.getDouble("VCPN_CON");
                    objRtn.VCPN_J = rs01.getDouble("VCPN_PEN");
                    objRtn.VCPNON = rs01.getDouble("VCPNON");
                    objRtn.VCPNOAL = rs01.getDouble("VCPNOAL");
                    objRtn.Per2 = (objRtn.VCPN > 0) ? (objRtn.VCPNOAL * 100.0) / objRtn.VCPN : 0;

                    objRtn.QTYPAX = rs01.getInt("QTY_VAL");
                    objRtn.QTYPAX_F = rs01.getInt("QTY_CON");
                    objRtn.QTYPAX_J = rs01.getInt("QTY_PEN");
                    objRtn.QCPNON = rs01.getInt("QCPNON");
                    objRtn.QCPNOAL = rs01.getInt("QCPNOAL");
                    objRtn.Per1 = (objRtn.QTYPAX > 0) ? (objRtn.QCPNOAL * 100.0) / objRtn.QTYPAX : 0;

                    //Totales
                    objRtn.totQTYFlight = QTY;

                    objRtn.totVCPN = VCPN_VAL;
                    objRtn.totVCPN_F = VCPN_CON;
                    objRtn.totVCPN_J = VCPN_PEN;
                    objRtn.totVCPNON = VCPNON;
                    objRtn.totVCPNOAL = VCPNOAL;
                    objRtn.totPer2 = (objRtn.totVCPN > 0) ? (objRtn.totVCPNOAL * 100.0) / objRtn.totVCPN : 0;

                    objRtn.totQTYPAX = QTY_VAL;
                    objRtn.totQTYPAX_F = QTY_CON;
                    objRtn.totQTYPAX_J = QTY_PEN;
                    objRtn.totQCPNON = QCPNON;
                    objRtn.totQCPNOAL = QCPNOAL;
                    objRtn.totPer1 = (objRtn.totQTYPAX > 0) ? (objRtn.totQCPNOAL * 100.0) / objRtn.totQTYPAX : 0;

                    listado.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX109SQP01927M(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();
        A1971Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        long QTY = 0, QTY_VAL = 0, QTY_CON = 0, QTY_PEN = 0, QCPNON = 0, QCPNOAL = 0;
        long VCPN_VAL = 0, VCPN_CON = 0, VCPN_PEN = 0, VCPNON = 0, VCPNOAL = 0;

        String SQLCLL01 = "{CALL PRAXIS.SQP01928(?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            // cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTY = rs01.getLong("QTY");
                QTY_VAL = rs01.getLong("QTY_VAL");
                QTY_CON = rs01.getLong("QTY_CON");
                QTY_PEN = rs01.getLong("QTY_PEN");
                QCPNON = rs01.getLong("QCPNON");
                QCPNOAL = rs01.getLong("QCPNOAL");
                //Total
                VCPN_VAL = rs01.getLong("VCPN_VAL");
                VCPN_CON = rs01.getLong("VCPN_CON");
                VCPN_PEN = rs01.getLong("VCPN_PEN");
                VCPNON = rs01.getLong("VCPNON");
                VCPNOAL = rs01.getLong("VCPNOAL");

            }
            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);

                    objRtn.QTYFlight = rs01.getLong("QTY");

                    objRtn.VCPN = rs01.getDouble("VCPN_VAL");
                    objRtn.VCPN_F = rs01.getDouble("VCPN_CON");
                    objRtn.VCPN_J = rs01.getDouble("VCPN_PEN");
                    objRtn.VCPNON = rs01.getDouble("VCPNON");
                    objRtn.VCPNOAL = rs01.getDouble("VCPNOAL");
                    objRtn.Per2 = (objRtn.VCPN > 0) ? (objRtn.VCPNOAL * 100.0) / objRtn.VCPN : 0;

                    objRtn.QTYPAX = rs01.getInt("QTY_VAL");
                    objRtn.QTYPAX_F = rs01.getInt("QTY_CON");
                    objRtn.QTYPAX_J = rs01.getInt("QTY_PEN");
                    objRtn.QCPNON = rs01.getInt("QCPNON");
                    objRtn.QCPNOAL = rs01.getInt("QCPNOAL");
                    objRtn.Per1 = (objRtn.QTYPAX > 0) ? (objRtn.QCPNOAL * 100.0) / objRtn.QTYPAX : 0;

                    //Totales
                    objRtn.totQTYFlight = QTY;

                    objRtn.totVCPN = VCPN_VAL;
                    objRtn.totVCPN_F = VCPN_CON;
                    objRtn.totVCPN_J = VCPN_PEN;
                    objRtn.totVCPNON = VCPNON;
                    objRtn.totVCPNOAL = VCPNOAL;
                    objRtn.totPer2 = (objRtn.totVCPN > 0) ? (objRtn.totVCPNOAL * 100.0) / objRtn.totVCPN : 0;

                    objRtn.totQTYPAX = QTY_VAL;
                    objRtn.totQTYPAX_F = QTY_CON;
                    objRtn.totQTYPAX_J = QTY_PEN;
                    objRtn.totQCPNON = QCPNON;
                    objRtn.totQCPNOAL = QCPNOAL;
                    objRtn.totPer1 = (objRtn.totQTYPAX > 0) ? (objRtn.totQCPNOAL * 100.0) / objRtn.totQTYPAX : 0;

                    listado.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<A1971Filter> loadPX246SQP01130(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;
        long QTYPAX = 0, QTYPAXJ = 0, QTYPAXY = 0, QTYVNR = 0;
        long QTYNRE = 0, QTYFLI = 0, QBNPAX = 0;
        double VCPN = 0, VCPNJ = 0, VCPNY = 0, AMTBN = 0, VCPNRE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP01130(?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.DFLIGHT);
            cstmt01.setString(4, filter.FLAG_VNR);
            cstmt01.setString(5, filter.IN_NFLIGHT);
            cstmt01.setString(6, filter.IN_CPAIR);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTYFLI = rs01.getLong("QFLIGHT");
                QTYPAX = rs01.getLong("QTYPAX");
                VCPN = rs01.getDouble("VCPN");
                QTYPAXJ = rs01.getLong("J_PAX");
                VCPNJ = rs01.getDouble("J_VCPN");
                QTYPAXY = rs01.getLong("Y_PAX");
                VCPNY = rs01.getDouble("Y_VCPN");
                QTYVNR = rs01.getLong("QTYVNR");
                QTYNRE = rs01.getLong("QTYNRE");
                VCPNRE = rs01.getDouble("VCPNRE");
                QBNPAX = rs01.getLong("QPAXBN");
                AMTBN = rs01.getDouble("VCPBN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.FLAG_VNR = filter.FLAG_VNR;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strDescripcion = rs01.getString("DESCRIP");
                    //objRtn.KMS = rs01.getInt("KMS");
                    objRtn.KMS_1 = rs01.getInt("KMS1");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.VCPN_F = rs01.getDouble("F_VCPN");
                    objRtn.QTYPAX_F = rs01.getInt("F_PAX");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;
                    objRtn.VCPN_J = rs01.getDouble("J_VCPN");
                    objRtn.QTYPAX_J = rs01.getInt("J_PAX");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rs01.getDouble("Y_VCPN");
                    objRtn.QTYPAX_Y = rs01.getInt("Y_PAX");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");
                    //Total
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.QTYFlight = rs01.getLong("QFLIGHT");
                    objRtn.QTYVNR = rs01.getInt("QTYVNR");
                    objRtn.QTYNRE = rs01.getInt("QTYNRE");
                    objRtn.VCPNRE = rs01.getDouble("VCPNRE");

                    //Totales
                    objRtn.totQTYFlight = QTYFLI;
                    objRtn.totQTYPAX = QTYPAX;
                    objRtn.totQTYPAX_J = QTYPAXJ;
                    objRtn.totQTYPAX_Y = QTYPAXY;
                    objRtn.totQTYVNR = QTYVNR;
                    objRtn.totQTYNRE = QTYNRE;
                    objRtn.totVCPN = VCPN;
                    objRtn.totVCPN_J = VCPNJ;
                    objRtn.totVCPN_Y = VCPNY;
                    objRtn.totAMTBN = AMTBN;
                    objRtn.totQBNPAX = QBNPAX;
                    objRtn.totVCPNRE = VCPNRE;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A1971Filter> loadPX246SQP00335(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;
        long QTYPAX = 0, QTYPAXJ = 0, QTYPAXY = 0, QTYVNR = 0;
        long QTYNRE = 0, QTYFLI = 0, QBNPAX = 0;
        double VCPN = 0, VCPNJ = 0, VCPNY = 0, AMTBN = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00335(?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            /*cstmt01.registerOutParameter(5, Types.INTEGER);
             cstmt01.registerOutParameter(6, Types.INTEGER);
             cstmt01.registerOutParameter(7, Types.INTEGER);
             cstmt01.registerOutParameter(8, Types.INTEGER);*/

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.DFLIGHT);
            cstmt01.setString(4, filter.FLAG_VNR);
            cstmt01.setString(5, filter.IN_NFLIGHT);
            cstmt01.setString(6, filter.IN_CPAIR);
            /*cstmt01.setInt(5, filter.page.PAGNUM);
             cstmt01.setInt(6, filter.page.PAGROW);
             cstmt01.setInt(7, filter.page.TOTPAG);
             cstmt01.setInt(8, filter.page.TOTROW);*/

            cstmt01.execute();

            /*filter.page.PAGNUM = cstmt01.getInt(5);
             filter.page.PAGROW = cstmt01.getInt(6);
             filter.page.TOTPAG = cstmt01.getInt(7);
             filter.page.TOTROW = cstmt01.getInt(8);*/
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTYFLI = rs01.getLong("QFLIGHT");
                QTYPAX = rs01.getLong("QTYPAX");
                QTYPAXJ = rs01.getLong("J_PAX");
                QTYPAXY = rs01.getLong("Y_PAX");
                QTYVNR = rs01.getLong("QTYVNR");
                QTYNRE = rs01.getLong("QTYNRE");
                VCPN = rs01.getDouble("VCPN");
                VCPNJ = rs01.getDouble("J_VCPN");
                VCPNY = rs01.getDouble("Y_VCPN");
                QBNPAX = rs01.getLong("QPAXBN");
                AMTBN = rs01.getDouble("VCPBN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.FLAG_VNR = filter.FLAG_VNR;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.NPLANE = filter.NPLANE;
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.strZona = Functions.getNombreZonas(objRtn.ZONA);
                    objRtn.KMS = rs01.getInt("KMS");
                    objRtn.KMS_1 = rs01.getInt("KMS1");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.VCPN_F = rs01.getDouble("F_VCPN");
                    objRtn.QTYPAX_F = rs01.getInt("F_PAX");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;
                    objRtn.VCPN_J = rs01.getDouble("J_VCPN");
                    objRtn.QTYPAX_J = rs01.getInt("J_PAX");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rs01.getDouble("Y_VCPN");
                    objRtn.QTYPAX_Y = rs01.getInt("Y_PAX");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    objRtn.QTYFlight = rs01.getLong("QFLIGHT");
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");
                    //Total
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.QTYVNR = rs01.getInt("QTYVNR");
                    objRtn.QTYNRE = rs01.getInt("QTYNRE");
                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    //Totales
                    objRtn.totQTYFlight = QTYFLI;
                    objRtn.totQTYPAX = QTYPAX;
                    objRtn.totQTYPAX_J = QTYPAXJ;
                    objRtn.totQTYPAX_Y = QTYPAXY;
                    objRtn.totQTYVNR = QTYVNR;
                    objRtn.totQTYNRE = QTYNRE;
                    objRtn.totVCPN = VCPN;
                    objRtn.totVCPN_J = VCPNJ;
                    objRtn.totVCPN_Y = VCPNY;
                    objRtn.totAMTBN = AMTBN;
                    objRtn.totQBNPAX = QBNPAX;

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A1971Filter> loadPX246SQP00334(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;
        long QTYPAX = 0, QTYPAXJ = 0, QTYPAXY = 0, QTYVNR = 0;
        long QTYNRE = 0, QTYFLI = 0, QBNPAX = 0;
        double VCPN = 0, VCPNJ = 0, VCPNY = 0, AMTBN = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00334(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.DFLIGHT);
            cstmt01.setString(5, filter.NPLANE);
            cstmt01.setString(6, filter.ZONA);
            cstmt01.setString(7, filter.FLAG_VNR);
            cstmt01.setString(8, filter.IN_NFLIGHT);
            cstmt01.setString(9, filter.IN_CPAIR);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QTYFLI = rs01.getLong("QFLIGHT");
                QTYPAX = rs01.getLong("QTYPAX");
                QTYPAXJ = rs01.getLong("J_PAX");
                QTYPAXY = rs01.getLong("Y_PAX");
                QTYVNR = rs01.getLong("QTYVNR");
                QTYNRE = rs01.getLong("QTYNRE");
                VCPN = rs01.getDouble("VCPN");
                VCPNJ = rs01.getDouble("J_VCPN");
                VCPNY = rs01.getDouble("Y_VCPN");
                QBNPAX = rs01.getLong("QPAXBN");
                AMTBN = rs01.getDouble("VCPBN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.FLAG_VNR = filter.FLAG_VNR;
                    objRtn.NPLANE = filter.NPLANE;
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strDescripcion1 = rs01.getString("DES_CO") + " - " + rs01.getString("DES_CD");
                    objRtn.strRuta = objRtn.CDEPART + " - " + objRtn.CARRIVA;
                    objRtn.KMS = rs01.getInt("KMS");
                    objRtn.KMS_1 = rs01.getInt("KMS1");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.VCPN_F = rs01.getDouble("F_VCPN");
                    objRtn.QTYPAX_F = rs01.getInt("F_PAX");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;
                    objRtn.VCPN_J = rs01.getDouble("J_VCPN");
                    objRtn.QTYPAX_J = rs01.getInt("J_PAX");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rs01.getDouble("Y_VCPN");
                    objRtn.QTYPAX_Y = rs01.getInt("Y_PAX");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    objRtn.QTYFlight = rs01.getLong("QFLIGHT");
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");
                    //Total
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.AVG = (objRtn.QTYPAX > 0) ? objRtn.VCPN / objRtn.QTYPAX : 0;
                    objRtn.QTYVNR = rs01.getInt("QTYVNR");
                    objRtn.QTYNRE = rs01.getInt("QTYNRE");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    //Totales
                    objRtn.totQTYFlight = QTYFLI;
                    objRtn.totQTYPAX = QTYPAX;
                    objRtn.totQTYPAX_J = QTYPAXJ;
                    objRtn.totQTYPAX_Y = QTYPAXY;
                    objRtn.totQTYVNR = QTYVNR;
                    objRtn.totQTYNRE = QTYNRE;
                    objRtn.totVCPN = VCPN;
                    objRtn.totVCPN_J = VCPNJ;
                    objRtn.totVCPN_Y = VCPNY;
                    objRtn.totAMTBN = AMTBN;
                    objRtn.totQBNPAX = QBNPAX;

                    lstRtn.add(objRtn);
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A1971Filter> loadPX246SQP04618(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;
        HashMap hmDescTPAX = new HashMap();
        hmDescTPAX.put("", "");
        hmDescTPAX.put("A", "Adult");
        hmDescTPAX.put("C", "Children");
        hmDescTPAX.put("I", "Infant");
        long QCPNVAL = 0, BASICM = 0;
        double VCPN = 0, TBASICM = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP04618(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.DFLIGHT);
            cstmt01.setString(5, filter.NPLANE);
            cstmt01.setString(6, filter.ZONA);
            cstmt01.setString(7, filter.FLAG_VNR);
            cstmt01.setString(8, filter.IN_NFLIGHT);
            cstmt01.setString(9, filter.IN_CPAIR);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                QCPNVAL = rs01.getLong("QCPNVAL");
                //BASICM = rs01.getLong("BASICM");
                //TBASICM = rs01.getDouble("TBASICM");
                VCPN = rs01.getDouble("VCPN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.FLAG_VNR = filter.FLAG_VNR;
                    //objRtn.NPLANE = filter.NPLANE;
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT.substring(0, 6));
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    //objRtn.strDescripcion1 = rs01.getString("DES_CO") + " - " + rs01.getString("DES_CD");
                    objRtn.strRuta = objRtn.CDEPART + " - " + objRtn.CARRIVA;

                    objRtn.NFLIGHT = rs01.getString("NFLIGHT").trim();
                    objRtn.NPLANE = rs01.getString("NPLANE").trim();
                    objRtn.CLAS = rs01.getString("CLAS").trim();
                    objRtn.CABI = rs01.getString("CABI").trim();
                    //objRtn.TPAX = rs01.getString("TPAX").trim();
//                    if (hmDescTPAX.containsKey(objRtn.TPAX)) {
//                        objRtn.strDescTPAX = hmDescTPAX.get(objRtn.TPAX).toString();
//                    } else {
//                        objRtn.strDescTPAX = objRtn.TPAX;
//                    }

                    //Total
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    //objRtn.TBASICM = rs01.getDouble("TBASICM");
                    //objRtn.BASICM = rs01.getLong("BASICM");
                    objRtn.QCPNVAL = rs01.getLong("QCPNVAL");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    //Totales
                    objRtn.totVCPN = VCPN;
                    objRtn.totTBASICM = TBASICM;
                    objRtn.totBASICM = BASICM;
                    objRtn.totQCPNVAL = QCPNVAL;

                    lstRtn.add(objRtn);
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A1971Filter> loadPX246SQP00333(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;
        long totF = 0, totY = 0, totJ = 0, totKMS = 0;
        long totFlight = 0, QTYVNR = 0, QTYNRE = 0, QBNPAX = 0;
        double AMT_Y = 0, AMT_J = 0, AMT_F = 0, totAMT = 0, AMTBN = 0;
        int totCabin = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00333(?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            /*cstmt01.registerOutParameter(5, Types.INTEGER);
             cstmt01.registerOutParameter(6, Types.INTEGER);
             cstmt01.registerOutParameter(7, Types.INTEGER);
             cstmt01.registerOutParameter(8, Types.INTEGER);*/

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.DFLIGHT);
            cstmt01.setString(4, filter.FLAG_VNR);
            cstmt01.setString(5, filter.IN_NFLIGHT);
            cstmt01.setString(6, filter.IN_CPAIR);
            /*cstmt01.setInt(5, filter.page.PAGNUM);
             cstmt01.setInt(6, filter.page.PAGROW);
             cstmt01.setInt(7, filter.page.TOTPAG);
             cstmt01.setInt(8, filter.page.TOTROW);*/

            cstmt01.execute();

            /*filter.page.PAGNUM = cstmt01.getInt(5);
             filter.page.PAGROW = cstmt01.getInt(6);
             filter.page.TOTPAG = cstmt01.getInt(7);
             filter.page.TOTROW = cstmt01.getInt(8);*/
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totF = rs01.getLong("QTYPAXF");
                totY = rs01.getLong("QTYPAXY");
                totJ = rs01.getLong("QTYPAXJ");
                totCabin = rs01.getInt("QTYPAX");
                AMT_F = rs01.getDouble("VCPNF");
                AMT_Y = rs01.getDouble("VCPNY");
                AMT_J = rs01.getDouble("VCPNJ");
                totAMT = rs01.getDouble("VCPN");
                totKMS = rs01.getLong("KMS");
                totFlight = rs01.getLong("FLIGHT");

                QTYVNR = rs01.getLong("QTYVNR");
                QTYNRE = rs01.getLong("QTYNRE");
                QBNPAX = rs01.getLong("QPAXBN");
                AMTBN = rs01.getDouble("VCPBN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.FLAG_VNR = filter.FLAG_VNR;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    //objRtn.CARRIER = rs01.getString("CARRIER");
                    objRtn.NPLANE = rs01.getString("NPLANE");
                    objRtn.QTYFlight = rs01.getLong("FLIGHT");
                    objRtn.KMS = rs01.getInt("KMS");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");

                    objRtn.VCPN_F = rs01.getDouble("VCPNF");
                    objRtn.QTYPAX_F = rs01.getInt("QTYPAXF");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;
                    objRtn.VCPN_J = rs01.getDouble("VCPNJ");
                    objRtn.QTYPAX_J = rs01.getInt("QTYPAXJ");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rs01.getDouble("VCPNY");
                    objRtn.QTYPAX_Y = rs01.getInt("QTYPAXY");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    //Total
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.AVG = (objRtn.QTYPAX > 0) ? objRtn.VCPN / objRtn.QTYPAX : 0;

                    objRtn.CAPF = rs01.getLong("CAPF");
                    objRtn.DiffCapF = (objRtn.CAPF > 0) ? objRtn.CAPF - objRtn.QTYPAX_F : 0;
                    objRtn.CAPJ = rs01.getLong("CAPJ");
                    objRtn.DiffCapJ = (objRtn.CAPJ > 0) ? objRtn.CAPJ - objRtn.QTYPAX_J : 0;
                    objRtn.CAPY = rs01.getLong("CAPY");
                    objRtn.DiffCapY = (objRtn.CAPY > 0) ? objRtn.CAPY - objRtn.QTYPAX_Y : 0;

                    objRtn.CAPTOT = rs01.getInt("CAPTOT");
                    objRtn.DiffCap = (objRtn.CAPTOT > 0) ? objRtn.CAPTOT - objRtn.QTYPAX : 0;
                    objRtn.QTYVNR = rs01.getInt("QTYVNR");
                    objRtn.QTYNRE = rs01.getInt("QTYNRE");
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");

                    //Porcentajes
                    objRtn.PerF = (objRtn.CAPF > 0) ? (objRtn.QTYPAX_F * 100) / objRtn.CAPF : 0;
                    objRtn.PerJ = (objRtn.CAPJ > 0) ? (objRtn.QTYPAX_J * 100) / objRtn.CAPJ : 0;
                    objRtn.PerY = (objRtn.CAPY > 0) ? (objRtn.QTYPAX_Y * 100) / objRtn.CAPY : 0;
                    objRtn.PerCAP = (objRtn.CAPTOT > 0) ? (objRtn.QTYPAX * 100) / objRtn.CAPTOT : 0;

                    //TOTALES
                    objRtn.totQTYPAX_F = totF;
                    objRtn.totQTYPAX_J = totJ;
                    objRtn.totQTYPAX_Y = totY;
                    objRtn.totKMS = totKMS;
                    objRtn.totQTYPAX = totCabin;

                    objRtn.totVCPN_F = AMT_F;
                    objRtn.totVCPN_J = AMT_J;
                    objRtn.totVCPN_Y = AMT_Y;
                    objRtn.totVCPN = totAMT;
                    objRtn.totQTYFlight = totFlight;
                    objRtn.totQTYVNR = QTYVNR;
                    objRtn.totQTYNRE = QTYNRE;
                    objRtn.totAMTBN = AMTBN;
                    objRtn.totQBNPAX = QBNPAX;

                    /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                     objRtn.page.PAGROW = filter.page.PAGROW;
                     objRtn.page.TOTPAG = filter.page.TOTPAG;
                     objRtn.page.TOTROW = filter.page.TOTROW;*/
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    //* ************************************************************************
    //* ************************** SPA Profitability ***************************
    //* ************************************************************************
    public List<A1971Filter> loadPX241S01_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSFIM = 0, lnQAUDI = 0, lnQSUPAUD = 0, lnQRMSPA = 0, lnVALMPA = 0, lnQSPA = 0, lnQSPANA = 0, lnPROF = 0;
        double dbQRM = 0, dbNETI = 0, dbRMVSPA = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01485(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.IN_TOP.trim());
            cstmt.setString(10, filter.IN_SPA);
            cstmt.setString(11, filter.IN_TYPE);
            cstmt.setString(12, filter.IN_ORDER);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                lnQCUPON = rs01.getLong("QCUPON");
                lnQSPA = rs01.getLong("QSPA");
                lnQSPANA = rs01.getLong("QSPANA");
                lnQAUDI = rs01.getLong("QAUDI");
                dbQRM = rs01.getDouble("QRM");
                lnQRMSPA = rs01.getLong("QRMSPA");
                dbNETI = rs01.getDouble("NETI");
                dbNETO = rs01.getDouble("NETO");
                lnVALMPA = rs01.getLong("VALMPA");
                dbVALSRP = rs01.getDouble("VALSRP");
                dbVALSPA = rs01.getDouble("VALSPA");
                lnPROF = rs01.getLong("PROF");

                lnQSFIM = rs01.getLong("QSFIM");
                lnQSUPAUD = rs01.getLong("QSUPAUD");
                dbRMVSPA = rs01.getDouble("RMVSPA");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_ORDER = filter.IN_ORDER;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.strAirlineName = rs01.getString("DES_BAIR").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.QRM = rs01.getDouble("QRM");
                    objRtn.QRMSPA = rs01.getDouble("QRMSPA");
                    objRtn.QSPA = rs01.getDouble("QSPA");
                    objRtn.QSPANA = rs01.getInt("QSPANA");
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");
                    if (objRtn.VALSPA > objRtn.VALSRP && objRtn.VALSPA > objRtn.VALMPA) {
                        objRtn.strColor = "0x760c0c";//"0x0c7622"; Color cambiado por ENS 20161026 x ser IXP
                        //objRtn.strImagen = "assets/icons/16x16/green.png";
                        objRtn.strImagen = "assets/icons/16x16/red.png";
                    } else if (objRtn.VALSPA < objRtn.VALSRP || objRtn.VALSPA < objRtn.VALMPA) {
                        objRtn.strColor = "0x0c7622";//"0x760c0c"; Color cambiado por ENS 20161026 x ser IXP
                        //objRtn.strImagen = "assets/icons/16x16/red.png";
                        objRtn.strImagen = "assets/icons/16x16/green.png";
                    } else {
                        objRtn.strColor = "0xb69329";
                        objRtn.strImagen = "assets/icons/16x16/lapiz_blanco.png";
                        //objRtn.strImagen = "assets/icons/16x16/blue.png";
                    }
                    objRtn.RMVSPA = rs01.getDouble("RMVSPA");
                    if (rs01.getString("TDOC").trim().equals("4")) {
                        objRtn.QCUPON = rs01.getDouble("QSFIM");
                        objRtn.QAUDI = rs01.getLong("QSUPAUD");
                    } else {
                        objRtn.QCUPON = rs01.getDouble("QCUPON");
                        objRtn.QAUDI = rs01.getLong("QAUDI");
                    }
                    objRtn.lngPROF = rs01.getLong("PROF");
                    objRtn.dblPROF = rs01.getDouble("PROF");
                    if (objRtn.QSPA > 0) {
                        objRtn.dbAVG = objRtn.dblPROF / objRtn.QSPA;
                    } else {
                        objRtn.dbAVG = 0;
                    }
                    objRtn.perQSPA = (rs01.getDouble("QSPA") * 100) / rs01.getDouble("QCUPON");
//                    objRtn.perQRMSPA = (rs01.getDouble("QRMSPA") * 100) / rs01.getDouble("QRM");

                    //queda pendiene a revisar el de arriba
                    if (rs01.getLong("NETI") > 0) {
                        objRtn.dblPerRec = (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100;
                    } else {
                        objRtn.dblPerRec = 0;
                    }
                    objRtn.dblEfecSRP = (objRtn.VALSPA > 0) ? objRtn.VALSRP * 100 / objRtn.VALSPA : 0;
                    objRtn.dblEfecMPA = (objRtn.VALSPA > 0) ? objRtn.VALMPA * 100 / objRtn.VALSPA : 0;
//
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.lnQSFIM = lnQSFIM;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQSUPAUD = lnQSUPAUD;
                    objRtn.lnQRMSPA = lnQRMSPA;
                    objRtn.lnVALMPA = lnVALMPA;
                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQSPANA = lnQSPANA;
                    objRtn.lnPROF = lnPROF;
                    objRtn.dbQRM = dbQRM;
                    objRtn.dbNETI = dbNETI;
                    objRtn.dbRMVSPA = dbRMVSPA;
                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }
    
    public List<A1971Filter> loadPX241S01_Charts(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSFIM = 0, lnQAUDI = 0, lnQSUPAUD = 0, lnQRMSPA = 0, lnVALMPA = 0, lnQSPA = 0, lnQSPANA = 0, lnPROF = 0;
        double dbQRM = 0, dbNETI = 0, dbRMVSPA = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01485_CHARTS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.IN_TOP.trim());
            cstmt.setString(10, filter.IN_SPA);
            cstmt.setString(11, filter.IN_TYPE);
            cstmt.setString(12, filter.IN_ORDER);

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                lnQCUPON = rs01.getLong("QCUPON");
                lnQSPA = rs01.getLong("QSPA");
                lnQSPANA = rs01.getLong("QSPANA");
                lnQAUDI = rs01.getLong("QAUDI");
                dbQRM = rs01.getDouble("QRM");
                lnQRMSPA = rs01.getLong("QRMSPA");
                dbNETI = rs01.getDouble("NETI");
                dbNETO = rs01.getDouble("NETO");
                lnVALMPA = rs01.getLong("VALMPA");
                dbVALSRP = rs01.getDouble("VALSRP");
                dbVALSPA = rs01.getDouble("VALSPA");
                lnPROF = rs01.getLong("PROF");

                lnQSFIM = rs01.getLong("QSFIM");
                lnQSUPAUD = rs01.getLong("QSUPAUD");
                dbRMVSPA = rs01.getDouble("RMVSPA");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_ORDER = filter.IN_ORDER;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.strAirlineName = rs01.getString("DES_BAIR").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.QRM = rs01.getDouble("QRM");
                    objRtn.QRMSPA = rs01.getDouble("QRMSPA");
                    objRtn.QSPA = rs01.getDouble("QSPA");
                    objRtn.QSPANA = rs01.getInt("QSPANA");
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");
                    if (objRtn.VALSPA > objRtn.VALSRP && objRtn.VALSPA > objRtn.VALMPA) {
                        objRtn.strColor = "0x760c0c";//"0x0c7622"; Color cambiado por ENS 20161026 x ser IXP
                        //objRtn.strImagen = "assets/icons/16x16/green.png";
                        objRtn.strImagen = "assets/icons/16x16/red.png";
                    } else if (objRtn.VALSPA < objRtn.VALSRP || objRtn.VALSPA < objRtn.VALMPA) {
                        objRtn.strColor = "0x0c7622";//"0x760c0c"; Color cambiado por ENS 20161026 x ser IXP
                        //objRtn.strImagen = "assets/icons/16x16/red.png";
                        objRtn.strImagen = "assets/icons/16x16/green.png";
                    } else {
                        objRtn.strColor = "0xb69329";
                        objRtn.strImagen = "assets/icons/16x16/lapiz_blanco.png";
                        //objRtn.strImagen = "assets/icons/16x16/blue.png";
                    }
                    objRtn.RMVSPA = rs01.getDouble("RMVSPA");
                    if (rs01.getString("TDOC").trim().equals("4")) {
                        objRtn.QCUPON = rs01.getDouble("QSFIM");
                        objRtn.QAUDI = rs01.getLong("QSUPAUD");
                    } else {
                        objRtn.QCUPON = rs01.getDouble("QCUPON");
                        objRtn.QAUDI = rs01.getLong("QAUDI");
                    }
                    objRtn.lngPROF = rs01.getLong("PROF");
                    objRtn.dblPROF = rs01.getDouble("PROF");
                    if (objRtn.QSPA > 0) {
                        objRtn.dbAVG = objRtn.dblPROF / objRtn.QSPA;
                    } else {
                        objRtn.dbAVG = 0;
                    }
                    objRtn.perQSPA = (rs01.getDouble("QSPA") * 100) / rs01.getDouble("QCUPON");
//                    objRtn.perQRMSPA = (rs01.getDouble("QRMSPA") * 100) / rs01.getDouble("QRM");

                    //queda pendiene a revisar el de arriba
                    if (rs01.getLong("NETI") > 0) {
                        objRtn.dblPerRec = (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100;
                    } else {
                        objRtn.dblPerRec = 0;
                    }
                    objRtn.dblEfecSRP = (objRtn.VALSPA > 0) ? objRtn.VALSRP * 100 / objRtn.VALSPA : 0;
                    objRtn.dblEfecMPA = (objRtn.VALSPA > 0) ? objRtn.VALMPA * 100 / objRtn.VALSPA : 0;
//
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.lnQSFIM = lnQSFIM;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQSUPAUD = lnQSUPAUD;
                    objRtn.lnQRMSPA = lnQRMSPA;
                    objRtn.lnVALMPA = lnVALMPA;
                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQSPANA = lnQSPANA;
                    objRtn.lnPROF = lnPROF;
                    objRtn.dbQRM = dbQRM;
                    objRtn.dbNETI = dbNETI;
                    objRtn.dbRMVSPA = dbRMVSPA;
                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S02_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQAUDI = 0, lnVALMPA = 0;
        double dbNETI = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00464(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.FINVOICE.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dbVALSPA = rs01.getDouble("VALSPA");
                dbNETI = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                dbNETO = rs01.getDouble("NETO");
                dbVALSRP = rs01.getDouble("VALSRP");
                lnVALMPA = rs01.getLong("VALMPA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.FINVOICE = filter.FINVOICE.trim();

                    objRtn.IN_DATE = rs01.getString("FINVOICE");
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    objRtn.IN_AIRLINE = rs01.getString("AIRLINE");
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    if (objRtn.RMACCEPT.trim().equals("S")) {
                        objRtn.strASIGNED = "Y";
                    } else {
                        objRtn.strASIGNED = "N";
                    }
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");

                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;
                    objRtn.dbNETI = dbNETI;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnVALMPA = lnVALMPA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }
    
    public List<A1971Filter> loadPX241S02_DNot(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQAUDI = 0, lnVALMPA = 0;
        double dbNETI = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00464Not(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.FINVOICE.trim());

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dbVALSPA = rs01.getDouble("VALSPA");
                dbNETI = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                dbNETO = rs01.getDouble("NETO");
                dbVALSRP = rs01.getDouble("VALSRP");
                lnVALMPA = rs01.getLong("VALMPA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.FINVOICE = filter.FINVOICE.trim();

                    objRtn.IN_DATE = rs01.getString("FINVOICE");
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    objRtn.IN_AIRLINE = rs01.getString("AIRLINE");
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    if (objRtn.RMACCEPT.trim().equals("S")) {
                        objRtn.strASIGNED = "Y";
                    } else {
                        objRtn.strASIGNED = "N";
                    }
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");

                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;
                    objRtn.dbNETI = dbNETI;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnVALMPA = lnVALMPA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241SQP01253(A1971Filter filter) throws SQLException, Exception {

        Connection cnx = null;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;

        long lnQAUDI = 0, lnVALMPA = 0;
        double dbNETI = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01253(?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE);
            cstmt.setString(3, filter.AIRLINE);
            cstmt.setString(4, filter.IN_TUSO.trim());
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setString(6, filter.IN_CURRENP.trim());

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dbVALSPA = rs01.getDouble("VALSPA");
                dbNETI = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                dbNETO = rs01.getDouble("NETO");
                dbVALSRP = rs01.getDouble("VALSRP");
                lnVALMPA = rs01.getLong("VALMPA");
            }

            rs01.close();

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.FINVOICE = filter.FINVOICE.trim();

                    objRtn.IN_DATE = rs01.getString("FINVOICE");
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    objRtn.IN_AIRLINE = rs01.getString("AIRLINE");
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    if (objRtn.RMACCEPT.trim().equals("S")) {
                        objRtn.strASIGNED = "Y";
                    } else {
                        objRtn.strASIGNED = "N";
                    }
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");

                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;
                    objRtn.dbNETI = dbNETI;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnVALMPA = lnVALMPA;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241SQP01254(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01254(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE);
            cstmt.setString(3, filter.AIRLINE);
            cstmt.setString(4, filter.strASIGNED);

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                //A1470PREME,A1470SECTO,A1470CIA,A1470FORMA,A1470SERIE,A1470CUPON,A1470DRE1U

                objRtn = new A1971Filter();

                objRtn.AIRLINE = filter.AIRLINE;
                objRtn.NROPRT = rs01.getString("A1470PREME");
                objRtn.CCIA = rs01.getString("A1470CIA");
                objRtn.FORMA = rs01.getString("A1470FORMA");
                objRtn.SERIE = rs01.getString("A1470SERIE");
                objRtn.CUPON = rs01.getString("A1470CUPON");
                objRtn.strASIGNED = rs01.getString("A1470DRE1U");
                objRtn.RUTAP = rs01.getString("A1470SECTO");
                objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S09_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQAUDI = 0, lnVALMPA = 0;
        double dbNETI = 0, dbNETO = 0, dbVALSRP = 0, dbVALSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00503(?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                dbVALSPA = rs01.getDouble("VALSPA");
                dbNETI = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                dbNETO = rs01.getDouble("NETO");
                dbVALSRP = rs01.getDouble("VALSRP");
                lnVALMPA = rs01.getLong("VALMPA");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.IN_DATE = rs01.getString("FINVOICE");
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.IN_DATE);
                    objRtn.IN_AIRLINE = rs01.getString("AIRLINE");
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    if (objRtn.RMACCEPT.trim().equals("S")) {
                        objRtn.strASIGNED = "Y";
                    } else {
                        objRtn.strASIGNED = "N";
                    }
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    objRtn.strFDWORK = objRtn.RUTAP.substring(0, 3) + "-" + objRtn.RUTAP.substring(3, 6);
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    objRtn.VALSPA = rs01.getDouble("VALSPA");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");
                    objRtn.dbNETO = dbNETO;
                    objRtn.dbVALSRP = dbVALSRP;
                    objRtn.dbVALSPA = dbVALSPA;
                    objRtn.dbNETI = dbNETI;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnVALMPA = lnVALMPA;

                    list.add(objRtn);
                }
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S03_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00480(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.strFDWORK = rs01.getString("ARGUM").trim();
                    objRtn.strASIGNED = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);
                    objRtn.QSPA = rs01.getLong("QCANSPA");
                    objRtn.QCUPON = rs01.getLong("QCANTID");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S04_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00481(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    if (rs01.getString("A021KEY") != null) {
                        objRtn.strASIGNED = rs01.getString("A021KEY").trim();
                    }
                    if (rs01.getString("A021COMEN1") != null) {
                        objRtn.COMME1 = rs01.getString("A021COMEN1").trim().replace("\"", "");
                    }
                    objRtn.QCUPON = rs01.getLong("QCANTID");
                    objRtn.QSPA = rs01.getLong("QCANSPA");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S05_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00482(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.strASIGNED = rs01.getString("ARGUM").trim();
                    if (rs01.getString("A051DESCR1") != null) {
                        objRtn.DES_FTE = rs01.getString("A051DESCR1").trim().replace("\"", "");
                    }
                    objRtn.QCUPON = rs01.getLong("QCANTID");
                    objRtn.QSPA = rs01.getLong("QCANSPA");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S06_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnQSPA = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00483(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TUSO.trim());
            cstmt.setString(7, filter.IN_TDOC.trim());
            cstmt.setString(8, filter.IN_CURRENP.trim());
            cstmt.setString(9, filter.STVAL.trim());
            cstmt.setString(10, filter.GRUPO.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnQSPA = rs01.getLong("QCANSPA");
                lnQCUPON = rs01.getLong("QCANTID");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TUSO = filter.IN_TUSO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.STVAL = filter.STVAL.trim();
                    objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.strFDWORK = rs01.getString("ARGUM").trim();
                    objRtn.strASIGNED = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);
                    objRtn.QCUPON = rs01.getLong("QCANTID");
                    objRtn.QSPA = rs01.getLong("QCANSPA");

                    objRtn.lnQSPA = lnQSPA;
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S07_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnPROF = 0, lnQAUDI = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00491(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_CURRENP.trim());
            cstmt.setString(8, filter.strFDWORK.trim());
            cstmt.setString(9, filter.GRUPO.trim());
            cstmt.setString(10, filter.FINVOICE.trim());
            cstmt.setString(11, filter.IN_DATE.trim());

            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnPROF = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                lnQCUPON = rs01.getLong("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    // objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();

                    // objRtn.GRUPO = filter.GRUPO.trim();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.GRUPO = rs01.getString("GRUPO").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.INVOICE = rs01.getString("INVOICE").trim();
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.CUPON = rs01.getString("CUPON").trim();
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("NROPRT").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT").trim();
                    objRtn.TUSO = rs01.getString("TUSO").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.FMETHOD = rs01.getString("FMETHOD").trim();
                    objRtn.strFDWORK = rs01.getString("RUTAP").trim();
                    objRtn.RUTAP = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);

                    objRtn.lnPROF = lnPROF;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241S08_D(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0, lnPROF = 0, lnQAUDI = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00492(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.AIRLINE.trim());
            cstmt.setString(6, filter.IN_TDOC.trim());
            cstmt.setString(7, filter.IN_CURRENP.trim());
            cstmt.setString(8, filter.strASIGNED.trim());
            cstmt.setString(9, filter.GRUPO.trim());
            cstmt.setString(10, filter.FINVOICE.trim());

            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                lnPROF = rs01.getLong("NETI");
                lnQAUDI = rs01.getLong("NETM");
                lnQCUPON = rs01.getLong("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    //Datos del filtro ****************************
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.IN_TDOC = filter.IN_TDOC.trim();
                    objRtn.IN_CURRENP = filter.IN_CURRENP.trim();
                    objRtn.strASIGNED = filter.strASIGNED.trim();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                    objRtn.GRUPO = rs01.getString("GRUPO").trim();
                    objRtn.FINVOICE = rs01.getString("FINVOICE").trim();
                    objRtn.strDATE = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.INVOICE = rs01.getString("INVOICE").trim();
                    objRtn.CURRENP = rs01.getString("CURRENP").trim();
                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.CUPON = rs01.getString("CUPON").trim();
                    objRtn.IN_TKT = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("NROPRT").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT").trim();
                    objRtn.TUSO = rs01.getString("TUSO").trim();
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETM = rs01.getDouble("NETM");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.FMETHOD = rs01.getString("FMETHOD").trim();
                    objRtn.strFDWORK = rs01.getString("RUTAP").trim();
                    objRtn.RUTAP = objRtn.strFDWORK.substring(0, 3) + "-" + objRtn.strFDWORK.substring(3, 6);

                    objRtn.lnPROF = lnPROF;
                    objRtn.lnQAUDI = lnQAUDI;
                    objRtn.lnQCUPON = lnQCUPON;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241SQP01398(A1971Filter filter, String strIndSpa) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0;//, lngQSPA = 0, lngQNSPA = 0;
        double dblVALOR = 0, dblVLSRP = 0, dblVLMPA = 0; //dblAMTSPAA = 0, dblAMTSPAS = 0, dblAMTSPAM = 0, 

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01398(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, Functions.getFechaActual().substring(0, 6));
            cstmt.setString(6, filter.AIRLINE.trim());
            cstmt.setString(7, strIndSpa.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                //Hace quiebre por Currency. Revisar
                lnQCUPON += rs01.getLong("QCPN");
                //lngQSPA += rs01.getLong("QSPA");
                //lngQNSPA += rs01.getLong("QNSPA");
                //dblAMTSPAA += rs01.getDouble("AMTSPAA");
                //dblAMTSPAS += rs01.getDouble("AMTSPAS");
                //dblAMTSPAM += rs01.getDouble("AMTSPAM");
                dblVALOR += rs01.getDouble("VALOR");
                dblVLSRP += rs01.getDouble("VALSRP");
                dblVLMPA += rs01.getDouble("VALMPA");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.FINVOICE = filter.FINVOICE.trim();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.strAirlineName = filter.strAirlineName.trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    try {
                        objRtn.strImagen = rs01.getString("CODAC").trim().substring(3) + "_V" + rs01.getString("VRSAC").trim();//LH_V004
                    } catch (Exception e) {
                    }

                    objRtn.TAGCODE = rs01.getString("TAGCODE").trim();
                    if (rs01.getString("TAGDESC").trim().isEmpty()) {
                        objRtn.TAGDESC = "(EMPTY)";
                    } else {
                        objRtn.TAGDESC = rs01.getString("TAGDESC").trim();
                    }
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.QCPN = rs01.getLong("QCPN");
                    //objRtn.lngQSPA = rs01.getLong("QSPA");
                    //objRtn.lngQNSPA = rs01.getLong("QNSPA");
                    //objRtn.dblAMTSPAA = rs01.getDouble("AMTSPAA");
                    //objRtn.dblAMTSPAS = rs01.getDouble("AMTSPAS");
                    //objRtn.dblAMTSPAM = rs01.getDouble("AMTSPAM");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.VALSRP = rs01.getDouble("VALSRP");
                    objRtn.VALMPA = rs01.getDouble("VALMPA");
                    /*if(objRtn.dblAMTSPAA > 0){
                     if(objRtn.dblAMTSPAA > objRtn.dblAMTSPAS && objRtn.dblAMTSPAA > objRtn.dblAMTSPAM){
                     objRtn.strColor = "0x0c7622";
                     }else if(objRtn.dblAMTSPAA < objRtn.dblAMTSPAS || objRtn.dblAMTSPAA < objRtn.dblAMTSPAM){
                     objRtn.strColor = "0x760c0c";
                     }else{
                     objRtn.strColor = "0xb69329";
                     }
                     }else{
                     objRtn.strColor = "0x244066";
                     }*/
                    //Porcentaje del Total x TAG entre el Total Universal
                    if (lnQCUPON > 0) {
                        objRtn.dblPorc = (rs01.getLong("QCPN") * 100) / (lnQCUPON * 1.00);
                        //Porcentaje del Total SPA/NSPA x TAG entre la cant de Cupones totales Universal
                        //objRtn.dblTotPorcSPA = (lngQSPA * 100) / lnQCUPON;
                        //objRtn.dblTotPorcNSPA = (lngQNSPA * 100) / lnQCUPON;
                    }
                    //Porcentaje del SPA/NSPA x TAG entre la cant de Cupones totales x TAG
                    /*if(objRtn.QCPN > 0){
                     objRtn.dblPorcSPA = (objRtn.lngQSPA * 100) / objRtn.QCPN;
                     objRtn.dblPorcNSPA = (objRtn.lngQNSPA * 100) / objRtn.QCPN;
                     }*/
                    objRtn.lngTotQCPN = lnQCUPON;
                    //objRtn.lngTotQSPA = lngQSPA;
                    //objRtn.lngTotQNSPA = lngQNSPA;
                    //objRtn.dblTotAMTSPAA = dblAMTSPAA;
                    //objRtn.dblTotAMTSPAS = dblAMTSPAS;
                    //objRtn.dblTotAMTSPAM = dblAMTSPAM;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotVALSRP = dblVLSRP;
                    objRtn.dblTotVALMPA = dblVLMPA;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241SQP01404(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        long lnQCUPON = 0;
        double dblVALSRP = 0, dblVALMPA = 0, dblVALOR = 0, dblTotAMT = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01404(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, Functions.getFechaActual().substring(0, 6));
            cstmt.setString(6, filter.AIRLINE.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                //Hace quiebre por Currency. Revisar
                lnQCUPON += rs01.getLong("QCPN");
                if (rs01.getString("INDPR").trim().equals("A")) {
                    //Es SPA
                    dblVALOR += rs01.getDouble("VALOR");
                    dblVALSRP += rs01.getDouble("VALSRP");
                    dblVALMPA += rs01.getDouble("VALMPA");
                    dblTotAMT += rs01.getDouble("VALOR");
                } else {
                    //No es SPA
                    if (rs01.getString("INDPR").trim().equals("S")) {
                        dblTotAMT += rs01.getDouble("VALSRP");
                    } else {
                        dblTotAMT += rs01.getDouble("VALMPA");
                    }
                    //dblVALOR += rs01.getDouble("VALOR");
                    dblVALSRP += rs01.getDouble("VALSRP");
                    dblVALMPA += rs01.getDouble("VALMPA");
                }
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1971Filter();
                    objRtn.FINVOICE = filter.FINVOICE.trim();
                    objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                    objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                    objRtn.AIRLINE = filter.AIRLINE.trim();
                    objRtn.strAirlineName = filter.strAirlineName.trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.TAGDESC = rs01.getString("DESC").trim();
                    objRtn.CURRENC = rs01.getString("CURRENC").trim();
                    objRtn.QCPN = rs01.getLong("QCPN");
                    if (!rs01.getString("DESC").trim().contains("Incomplete")) {
                        //Semaforo solo aplica para SPA
                        objRtn.VALOR = rs01.getDouble("VALOR");
                        objRtn.VALSRP = rs01.getDouble("VALSRP");
                        objRtn.VALMPA = rs01.getDouble("VALMPA");
                        objRtn.dblAMTSPAA = rs01.getDouble("VALOR");
                        if (objRtn.VALOR > objRtn.VALSRP && objRtn.VALOR > objRtn.VALMPA) {
                            objRtn.strColor = "0x760c0c";//"0x0c7622"; Color cambiado por ENS 20161026 x ser IXP
                            //objRtn.strImagen = "assets/icons/16x16/green.png";
                            objRtn.strImagen = "assets/icons/16x16/red.png";
                        } else if (objRtn.VALOR < objRtn.VALSRP || objRtn.VALOR < objRtn.VALMPA) {
                            objRtn.strColor = "0x0c7622";//"0x760c0c"; Color cambiado por ENS 20161026 x ser IXP
                            //objRtn.strImagen = "assets/icons/16x16/red.png";
                            objRtn.strImagen = "assets/icons/16x16/green.png";
                        } else {
                            objRtn.strColor = "0xb69329";
                            objRtn.strImagen = "assets/icons/16x16/lapiz_blanco.png";
                            //objRtn.strImagen = "assets/icons/16x16/blue.png";
                        }
                    } else {
                        objRtn.strColor = "0x244066";
                        objRtn.dblAMTSPAA = rs01.getDouble("VALSRP");
                        objRtn.VALSRP = rs01.getDouble("VALSRP");
                        objRtn.VALMPA = rs01.getDouble("VALMPA");
                        objRtn.strImagen = "assets/icons/16x16/lapiz_blanco.png";
                        //objRtn.strImagen = "assets/icons/16x16/blue.png";
                    }
                    //Porcentaje del Total x DESC entre el Total Universal
                    objRtn.dblPorc = (lnQCUPON > 0) ? (rs01.getLong("QCPN") * 100) / (lnQCUPON * 1.00) : 0;
                    //Porcentaje del Monto x DESC entre el Monto Total
                    objRtn.dblPorcSPA = (dblTotAMT > 0) ? (objRtn.dblAMTSPAA * 100) / (dblTotAMT * 1.00) : 0;

                    objRtn.dblEfecSRP = (objRtn.VALOR > 0) ? objRtn.VALSRP * 100 / objRtn.VALOR : 0;
                    objRtn.dblEfecMPA = (objRtn.VALOR > 0) ? objRtn.VALMPA * 100 / objRtn.VALOR : 0;

                    objRtn.dblAmtEffecSRP = (objRtn.dblEfecSRP > 0) ? (dblTotAMT - objRtn.dblAMTSPAA) * (100 - objRtn.dblEfecSRP) / 100 : 0;
                    objRtn.dblAmtEffecMPA = (objRtn.dblEfecMPA > 0) ? (dblTotAMT - objRtn.dblAMTSPAA) * (100 - objRtn.dblEfecMPA) / 100 : 0;

                    objRtn.lngTotQCPN = lnQCUPON;
                    objRtn.dblTotAMTSPAA = dblTotAMT;
                    objRtn.dblTotVALOR = dblVALOR;
                    objRtn.dblTotVALSRP = dblVALSRP;
                    objRtn.dblTotVALMPA = dblVALMPA;

                    list.add(objRtn);
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX241SQP01493(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> list = new ArrayList<A1971Filter>();
        A1971Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01493(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, Functions.getFechaActual().substring(0, 6));
            cstmt.setString(6, filter.AIRLINE.trim());
            cstmt.setString(7, filter.TAGDESC.trim());

            cstmt.execute();

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {
                objRtn = new A1971Filter();
                objRtn.FINVOICE = filter.FINVOICE.trim();
                objRtn.IN_DATE_FROM = filter.IN_DATE_FROM.trim();
                objRtn.IN_DATE_TO = filter.IN_DATE_TO.trim();
                objRtn.AIRLINE = filter.AIRLINE.trim();
                objRtn.strAirlineName = filter.strAirlineName.trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                objRtn.NROPRT = rs01.getString("NROPRT").trim();
                objRtn.TICKET = rs01.getString("TICKET").trim();
                objRtn.strTICKET = rs01.getString("DESTKT").trim();
                objRtn.RUTA = rs01.getString("RUTA").trim();
                objRtn.FECVTA = rs01.getString("FECVTA").trim();
                objRtn.FBASIS = rs01.getString("FBASIS").trim();
                objRtn.INDPR = rs01.getString("INDPR").trim();
                objRtn.strINDAC = rs01.getString("DES_INDPR").trim();
                objRtn.CODAC = rs01.getString("CODAC").trim();
                objRtn.INDAC = rs01.getString("INDAC").trim();
                objRtn.VRSAC = rs01.getString("VRSAC").trim();
                objRtn.TAGCODE = rs01.getString("TAGCODE").trim();
                objRtn.TAGDESC = rs01.getString("TAGDESC").trim();
                objRtn.CURRENF = rs01.getString("CURRENF").trim();
                objRtn.FARE = rs01.getDouble("FARE");
                objRtn.CURRENC = rs01.getString("CURRENC").trim();
                objRtn.VALOR = rs01.getDouble("VALOR");
                objRtn.VALSRP = rs01.getDouble("VALSRP");
                objRtn.VALMPA = rs01.getDouble("VALMPA");

                list.add(objRtn);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }

    public List<A1971Filter> loadPX246SQP00329(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QTYPAX = 0, QBNPAX = 0, QTYPAXJ = 0, QTYPAXY = 0;
        double VCPN = 0, AMTBN = 0, VCPNJ = 0, VCPNY = 0;

        String SQLCLL01 = "{CALL PRAXIS.SQP00329_2(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            if (filter.NFLIGHT.trim().isEmpty() && !filter.IN_NFLIGHT.trim().isEmpty()) {
                cstmt01.setString(3, filter.IN_NFLIGHT);
            } else {
                cstmt01.setString(3, filter.NFLIGHT);
            }
            cstmt01.setString(4, filter.CARRIER);
            if (filter.CDEPART.trim().isEmpty() && filter.CARRIVA.trim().isEmpty()
                    && !filter.IN_CPAIR.trim().isEmpty()) {
                filter.IN_CPAIR = Functions.fillString(filter.IN_CPAIR, 6);
                cstmt01.setString(5, filter.IN_CPAIR.substring(0, 3));
                cstmt01.setString(6, filter.IN_CPAIR.substring(3, 6));
            } else {
                cstmt01.setString(5, filter.CDEPART);
                cstmt01.setString(6, filter.CARRIVA);
            }
            cstmt01.setString(7, filter.ZONA);
            cstmt01.setString(8, filter.NPLANE);
            cstmt01.setString(9, filter.FLAG_VNR);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTYPAX = rs01.getLong("QTYPAX");
                VCPN = rs01.getDouble("VCPN");
                QBNPAX = rs01.getLong("QPAXBN");
                AMTBN = rs01.getDouble("VCPBN");
                QTYPAXJ = rs01.getLong("J_PAX");
                VCPNJ = rs01.getDouble("J_VCPN");
                QTYPAXY = rs01.getLong("Y_PAX");
                VCPNY = rs01.getDouble("Y_VCPN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.FLAG_VNR = filter.FLAG_VNR;
                    objRtn.NPLANE = filter.NPLANE;
                    objRtn.ZONA = filter.ZONA;
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.strZona = filter.strZona;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.CARRIER = rs01.getString("CARRIER");
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strDescripcion1 = rs01.getString("DES_CO");
                    objRtn.strDescripcion2 = rs01.getString("DES_CD");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.KMS = rs01.getInt("KMS");
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.VCPN_F = rs01.getDouble("F_VCPN");
                    objRtn.QTYPAX_F = rs01.getInt("F_PAX");
                    objRtn.AVG_F = (objRtn.QTYPAX_F > 0) ? objRtn.VCPN_F / objRtn.QTYPAX_F : 0;
                    objRtn.VCPN_J = rs01.getDouble("J_VCPN");
                    objRtn.QTYPAX_J = rs01.getInt("J_PAX");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rs01.getDouble("Y_VCPN");
                    objRtn.QTYPAX_Y = rs01.getInt("Y_PAX");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.AMTBN = rs01.getDouble("VCPBN");
                    objRtn.QBNPAX = rs01.getLong("QPAXBN");
                    //Total
                    objRtn.totQTYPAX = QTYPAX;
                    objRtn.totVCPN = VCPN;
                    objRtn.totAMTBN = AMTBN;
                    objRtn.totQBNPAX = QBNPAX;
                    objRtn.totQTYPAX_J = QTYPAXJ;
                    objRtn.totVCPN_J = VCPNJ;
                    objRtn.totQTYPAX_Y = QTYPAXY;
                    objRtn.totVCPN_Y = VCPNY;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A1692Filter> loadPX246SQP00330(A1971Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        double totVCPN = 0;
        long totPAX = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00330(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.NFLIGHT);
            cstmt01.setString(4, filter.CARRIER);
            cstmt01.setString(5, filter.CDEPART);
            cstmt01.setString(6, filter.CARRIVA);
            cstmt01.setString(7, filter.NPLANE);
            cstmt01.setString(8, filter.CABI);
            cstmt01.setString(9, filter.FBASE);
            cstmt01.setString(10, filter.CLAS);
            cstmt01.setString(11, filter.FLAG_VNR);
            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totVCPN = rs01.getDouble("VCPN");
                totPAX = rs01.getLong("QTYPAX");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.strDescripcion = filter.NPLANE;
                    objRtn.CLAS = filter.CLAS;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.FBASE = rs01.getString("FBASE");
                    objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FCONT = rs01.getString("FCONT");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.strZona = Functions.getNombreZonas(objRtn.ZONA);
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.strDescCDEPART = rs01.getString("DES_CO");
                    objRtn.strDescCARRIVA = rs01.getString("DES_CD");
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.PSVVTA = rs01.getString("PSVVTA");
                    objRtn.strDescPSVVTA = rs01.getString("PAIS");
                    objRtn.AGTIA = rs01.getString("AGTIA");
                    objRtn.strDescAgente = rs01.getString("DESCAGT");
                    objRtn.FVTA = rs01.getString("FVTA");
                    objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.TOPUS = rs01.getString("TOPUS");
                    objRtn.CARR = rs01.getString("CARR");
                    objRtn.CABI = rs01.getString("CABI");
                    objRtn.NPLANE = rs01.getString("NPLANE");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.MDACP = rs01.getString("MDACP");
                    objRtn.VCPMX = rs01.getDouble("VCPMX");
                    objRtn.TCMUS = rs01.getDouble("TCMUS");
                    objRtn.VCPUS = rs01.getDouble("VCPUS");
                    objRtn.COMISI = rs01.getDouble("COMISI");
                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.difVakues = totVCPN;
                    objRtn.totCPN_Aud = totPAX;//Pasajeros

                    objRtn.FVAL = rs01.getString("FVAL");
                    objRtn.strDescFVAL = rs01.getString("DescFVAL");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<A1971Filter> loadPX246SQP00331(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QTYPAX = 0;
        double VCPN = 0;

        String SQLCLL01 = "{CALL PRAXIS.SQP00331(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT.trim());
            if (filter.NFLIGHT.trim().isEmpty() && !filter.IN_NFLIGHT.trim().isEmpty()) {
                cstmt01.setString(3, filter.IN_NFLIGHT);
            } else {
                cstmt01.setString(3, filter.NFLIGHT.trim());
            }
            cstmt01.setString(4, filter.CARRIER.trim());
            if (filter.CDEPART.trim().isEmpty() && filter.CARRIVA.trim().isEmpty()
                    && !filter.IN_CPAIR.trim().isEmpty()) {
                filter.IN_CPAIR = Functions.fillString(filter.IN_CPAIR, 6);
                cstmt01.setString(5, filter.IN_CPAIR.substring(0, 3));
                cstmt01.setString(6, filter.IN_CPAIR.substring(3, 6));
            } else {
                cstmt01.setString(5, filter.CDEPART.trim());
                cstmt01.setString(6, filter.CARRIVA.trim());
            }
            cstmt01.setString(7, filter.ZONA.trim());
            cstmt01.setString(8, filter.NPLANE.trim());
            cstmt01.setString(9, filter.IN_CABI.trim());
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (filter.IN_CABI.trim().equals("NR")) {
                    QTYPAX = rs01.getLong("QTYNRE");
                } else {
                    QTYPAX = rs01.getLong("QTYPAX");
                }
                VCPN = rs01.getDouble("VCPN");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.IN_CABI = filter.IN_CABI.trim();
                    objRtn.strDescripcion3 = filter.NPLANE.trim();
                    objRtn.NFLIGHT = filter.NFLIGHT.trim();
                    objRtn.ZONA = filter.ZONA.trim();
                    objRtn.strZona = filter.strZona.trim();
                    objRtn.IN_NFLIGHT = filter.IN_NFLIGHT;
                    objRtn.IN_CPAIR = filter.IN_CPAIR;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate2 = filter.strFormatDate.trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.CARRIER = rs01.getString("CARRIER");
                    objRtn.CDEPART = filter.CDEPART;
                    objRtn.CARRIVA = filter.CARRIVA;
                    objRtn.NPLANE = rs01.getString("NPLANE");
                    objRtn.CABI = rs01.getString("CABI");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.KMS = rs01.getInt("KMS");
                    if (filter.IN_CABI.trim().equals("NR")) {
                        objRtn.QTYPAX = rs01.getInt("QTYNRE");
                    } else {
                        objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    }
                    objRtn.FBASE = rs01.getString("FBASE");
                    objRtn.CLAS = rs01.getString("CLAS");
                    objRtn.AVG = (objRtn.QTYPAX > 0) ? objRtn.VCPN / objRtn.QTYPAX : 0;
                    objRtn.totQTYPAX = QTYPAX;
                    objRtn.totVCPN = VCPN;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    public List<A1971Filter> loadPX246SQP00342(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<A1971Filter>(0);
        A1971Filter objRtn;
        long totY = 0, totJ = 0, totKMS = 0, totFlight = 0;
        double AMT_Y = 0, AMT_J = 0, totAMT = 0;
        int totCabin = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00342(?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.CARRIER);
            cstmt01.setString(4, filter.CDEPART);
            cstmt01.setString(5, filter.CARRIVA);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totY = rs01.getLong("QTYPAXY");
                totJ = rs01.getLong("QTYPAXJ");
                totCabin = rs01.getInt("QTYPAX");
                AMT_Y = rs01.getDouble("VCPNY");
                AMT_J = rs01.getDouble("VCPNJ");
                totAMT = rs01.getDouble("VCPN");
                totKMS = rs01.getLong("KMS");
                totFlight = rs01.getLong("FLIGHT");
            }
            rs01.close();

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1971Filter();
                    objRtn.DFLIGHT = filter.DFLIGHT;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.CARRIER = filter.CARRIER;
                    objRtn.CDEPART = filter.CDEPART;
                    objRtn.CARRIVA = filter.CARRIVA;
                    objRtn.NPLANE = rs01.getString("NPLANE");
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.QTYFlight = rs01.getLong("FLIGHT");
                    objRtn.KMS = rs01.getInt("KMS");
                    objRtn.strDescripcion4 = rs01.getString("MDACP");
                    objRtn.VCPN_J = rs01.getDouble("VCPNJ");
                    objRtn.QTYPAX_J = rs01.getInt("QTYPAXJ");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rs01.getDouble("VCPNY");
                    objRtn.QTYPAX_Y = rs01.getInt("QTYPAXY");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    //Total
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.QTYPAX = rs01.getLong("QTYPAX");
                    objRtn.AVG = (objRtn.QTYPAX > 0) ? objRtn.VCPN / objRtn.QTYPAX : 0;
                    objRtn.CAPJ = rs01.getLong("CAPJ");
                    objRtn.DiffCapJ = (objRtn.CAPJ > 0) ? objRtn.CAPJ - objRtn.QTYPAX_J : 0;
                    objRtn.CAPY = rs01.getLong("CAPY");
                    objRtn.DiffCapY = (objRtn.CAPY > 0) ? objRtn.CAPY - objRtn.QTYPAX_Y : 0;
                    objRtn.CAPTOT = rs01.getInt("CAPTOT");
                    objRtn.DiffCap = (objRtn.CAPTOT > 0) ? objRtn.CAPTOT - objRtn.QTYPAX : 0;

                    //Porcentajes
                    objRtn.PerJ = (objRtn.CAPJ > 0) ? (objRtn.QTYPAX_J * 100) / objRtn.CAPJ : 0;
                    objRtn.PerY = (objRtn.CAPY > 0) ? (objRtn.QTYPAX_Y * 100) / objRtn.CAPY : 0;
                    objRtn.PerCAP = (objRtn.CAPTOT > 0) ? (objRtn.QTYPAX * 100) / objRtn.CAPTOT : 0;

                    //TOTALES
                    objRtn.totQTYPAX_J = totJ;
                    objRtn.totQTYPAX_Y = totY;
                    objRtn.totKMS = totKMS;
                    objRtn.totQTYPAX = totCabin;

                    objRtn.totVCPN_J = AMT_J;
                    objRtn.totVCPN_Y = AMT_Y;
                    objRtn.totVCPN = totAMT;

                    objRtn.totQTYFlight = totFlight;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return lstRtn;
    }

    /**
     * Expired
     */
    public List<IMF117Filter> loadPX109SQP02666(IMF117Filter filter) throws SQLException, Exception {

        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        double VALOR = 0, VCOMIS = 0, VALORYQ = 0, VALORTAX = 0;
        long QCPNS = 0, QCPNST = 0;
        String flag = "";

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02666_1(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_COUNTRY);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                VALOR = rs01.getDouble("VALOR");
                VCOMIS = rs01.getDouble("VCOMIS");
                VALORYQ = rs01.getDouble("VALORYQ");
                VALORTAX = rs01.getDouble("VALORTAX");
                QCPNS = rs01.getLong("QCPNS");
                QCPNST = rs01.getLong("QCPNST");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    objRtn.DCONT = rs01.getString("DCONT");
                    objRtn.IN_TYPEDOC = objRtn.DCONT;
                    objRtn.strFormatDate = Functions.getMonthConvert7(objRtn.DCONT);
                    // objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.VCOMIS = rs01.getDouble("VCOMIS");
                    objRtn.VALORYQ = rs01.getDouble("VALORYQ");
                    objRtn.VALORTAX = rs01.getDouble("VALORTAX");
                    objRtn.QCPNS = rs01.getLong("QCPNS");
                    objRtn.QCPNST = rs01.getLong("QCPNST");

                    objRtn.totVALOR = VALOR;
                    objRtn.totVCOMIS = VCOMIS;
                    objRtn.totVALORYQ = VALORYQ;
                    objRtn.totVALORTAX = VALORTAX;
                    objRtn.totQCPNS = QCPNS;
                    objRtn.totQCPNST = QCPNST;

                    if (rs01.getLong("QCPNS") == 0) {
                        objRtn.perVALOR = 0;
                    } else {
                        objRtn.perVALOR = rs01.getDouble("VALOR") / rs01.getLong("QCPNS");
                    }

                    if (rs01.getLong("QCPNST") == 0) {
                        objRtn.perVALORYQ = 0;
                    } else {
                        objRtn.perVALORYQ = rs01.getDouble("VALORTAX") / rs01.getLong("QCPNST");
                    }

                    if (objRtn.totQCPNS == 0) {
                        objRtn.totPerVALOR = 0;
                    } else {
                        objRtn.totPerVALOR = objRtn.totVALOR / objRtn.totQCPNS;
                    }

                    if (objRtn.totQCPNST == 0) {
                        objRtn.totPerVALORYQ = 0;
                    } else {
                        objRtn.totPerVALORYQ = objRtn.totVALORTAX / objRtn.totQCPNST;
                    }

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose(rs01, cstmt01, null);
        }

        return lstRtn;
    }

    public List<IMF117Filter> loadPX109SQP02667(IMF117Filter filter) throws SQLException, Exception {

        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        double VALOR = 0, VCOMIS = 0, VALORYQ = 0, VALORTAX = 0;
        long QCPNS = 0, QCPNST = 0;
        String flag = "";

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02667(?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TYPEDOC.substring(0, 4)); //IN_DATE
            cstmt01.setString(3, filter.IN_COUNTRY);

            cstmt01.setInt(4, 1);
            cstmt01.setInt(5, -1);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                VALOR = rs01.getDouble("VALOR");
                VCOMIS = rs01.getDouble("VCOMIS");
                VALORYQ = rs01.getDouble("VALORYQ");
                VALORTAX = rs01.getDouble("VALORTAX");
                QCPNS = rs01.getLong("QCPNS");
                QCPNST = rs01.getLong("QCPNST");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_COUNTRY = filter.IN_COUNTRY;
                    objRtn.IN_TYPEDOC = filter.IN_TYPEDOC;
                    objRtn.DCONT = rs01.getString("DCONT");
                    objRtn.strFormatDate = filter.strFormatDate;;
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strDescripcion = rs01.getString("DES_COUNTRY");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.VALOR = rs01.getDouble("VALOR");
                    objRtn.VCOMIS = rs01.getDouble("VCOMIS");
                    objRtn.VALORYQ = rs01.getDouble("VALORYQ");
                    objRtn.VALORTAX = rs01.getDouble("VALORTAX");
                    objRtn.QCPNS = rs01.getLong("QCPNS");
                    objRtn.QCPNST = rs01.getLong("QCPNST");

                    objRtn.totVALOR = VALOR;
                    objRtn.totVCOMIS = VCOMIS;
                    objRtn.totVALORYQ = VALORYQ;
                    objRtn.totVALORTAX = VALORTAX;
                    objRtn.totQCPNS = QCPNS;
                    objRtn.totQCPNST = QCPNST;

                    if (rs01.getLong("QCPNS") == 0) {
                        objRtn.perVALOR = 0;
                    } else {
                        objRtn.perVALOR = rs01.getDouble("VALOR") / rs01.getLong("QCPNS");
                    }

                    if (rs01.getLong("QCPNST") == 0) {
                        objRtn.perVALORYQ = 0;
                    } else {
                        objRtn.perVALORYQ = rs01.getDouble("VALORTAX") / rs01.getLong("QCPNST");
                    }

                    if (objRtn.totQCPNS == 0) {
                        objRtn.totPerVALOR = 0;
                    } else {
                        objRtn.totPerVALOR = objRtn.totVALOR / objRtn.totQCPNS;
                    }

                    if (objRtn.totQCPNST == 0) {
                        objRtn.totPerVALORYQ = 0;
                    } else {
                        objRtn.totPerVALORYQ = objRtn.totVALORTAX / objRtn.totQCPNST;
                    }

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose(rs01, cstmt01, null);
        }

        return lstRtn;
    }

    public void setClose(ResultSet rs, CallableStatement cstmt, Connection cnx) {

        try {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } else {
                session.getCNXIBMDB2().close();
            }
            pasarGarbageCollector();
        } catch (Exception e) {

        }

    }

    /**
     * IATA
     */
    public List<IMF117Filter> SQP02271(IMF117Filter filter) throws SQLException, Exception {

        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        double TOTAL1 = 0, TOTAL2 = 0, TOTAL3 = 0, TOTAL4 = 0;
        String flag = "";

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP02271(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_ANIO_FROM);
            cstmt01.setString(3, filter.IN_ANIO_TO);
            cstmt01.setString(4, filter.IN_TIPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                TOTAL1 = rs01.getInt("TOTAL_SALES");
                TOTAL2 = rs01.getDouble("TOTAL_NOSALES");
                TOTAL3 = rs01.getInt("TOTAL_ALLSALES");
                TOTAL4 = rs01.getDouble("TOTAL_AMOUNT");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    objRtn.YEAR = rs01.getString("YEAR");
                    objRtn.CODE = rs01.getString("CODE");
                    objRtn.COUNTRY = rs01.getString("COUNTRY");
                    objRtn.SALES = rs01.getDouble("SALES");
                    objRtn.NOSALES = rs01.getDouble("NOSALES");
                    objRtn.ALLSALES = rs01.getDouble("ALLSALES");
                    objRtn.EFFECTIVITY = rs01.getDouble("EFFECTIVITY");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");

                    objRtn.TOTAL_SALES = TOTAL1;
                    objRtn.TOTAL_NOSALES = TOTAL2;
                    objRtn.TOTAL_ALLSALES = TOTAL3;
                    objRtn.TOTAL_AMOUNT = TOTAL4;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<IMF117Filter> loadPX226S01(IMF117Filter filter) throws Exception {
        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QCPNS = 0,QCPNV = 0,QCPNE = 0,QCPNR = 0,QCPNI = 0,QCPNC = 0,QCPNM = 0,QCPNP = 0,VALI_QCPN = 0;
        double AMTS = 0,AMTV = 0,AMTE = 0,AMTR = 0,AMTI = 0,AMTC = 0,AMTM = 0,AMTP = 0,VALI_AMT = 0;
        String SQLCLL01 = "{CALL SQP04923(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QCPNS = rs01.getLong("QCPNS");
                AMTS = rs01.getDouble("AMTS");
                QCPNV = rs01.getLong("QCPNV");
                AMTV = rs01.getDouble("AMTV");
                QCPNE = rs01.getLong("QCPNE");
                AMTE = rs01.getDouble("AMTE");
                QCPNR = rs01.getLong("QCPNR");
                AMTR = rs01.getDouble("AMTR");
                QCPNI = rs01.getLong("QCPNI");
                AMTI = rs01.getDouble("AMTI");
                QCPNC = rs01.getLong("QCPNC");
                AMTC = rs01.getDouble("AMTC");
                QCPNM = rs01.getLong("QCPNM");
                AMTM = rs01.getDouble("AMTM");
                QCPNP = rs01.getLong("QCPNP");
                AMTP = rs01.getDouble("AMTP");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    objRtn.CCUST = rs01.getString("CCUST").trim();
                    objRtn.CURR = rs01.getString("CURR");
                    objRtn.FVTA = rs01.getString("FVTA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.QCPNS = rs01.getLong("QCPNS");
                    objRtn.AMTS = rs01.getDouble("AMTS");
                    objRtn.QCPNV = rs01.getLong("QCPNV");
                    objRtn.AMTV = rs01.getDouble("AMTV");
                    objRtn.QCPNE = rs01.getLong("QCPNE");
                    objRtn.AMTE = rs01.getDouble("AMTE");
                    objRtn.QCPNR = rs01.getLong("QCPNR");
                    objRtn.AMTR = rs01.getDouble("AMTR");
                    objRtn.QCPNI = rs01.getLong("QCPNI");
                    objRtn.AMTI = rs01.getDouble("AMTI");
                    objRtn.QCPNC = rs01.getLong("QCPNC");
                    objRtn.AMTC = rs01.getDouble("AMTC");
                    objRtn.QCPNM = rs01.getLong("QCPNM");
                    objRtn.AMTM = rs01.getDouble("AMTM");
                    objRtn.QCPNP = rs01.getLong("QCPNP");
                    objRtn.AMTP = rs01.getDouble("AMTP");

//                    VALI_AMT = objRtn.AMTS - (objRtn.AMTV+objRtn.AMTE+objRtn.AMTR+objRtn.AMTI+objRtn.AMTC+objRtn.AMTM);
//                    if(VALI_AMT == objRtn.AMTP){
//                        System.out.println(VALI_AMT + " : " + objRtn.AMTP);
//                        System.out.println(objRtn.FVTA + " es correcto");
//                    }else{
//                        System.out.println(VALI_AMT + " : " + objRtn.AMTP);
//                        System.out.println(objRtn.FVTA + " es incorrecto");
//                    }
//                    VALI_QCPN = objRtn.QCPNS - (objRtn.QCPNV+objRtn.QCPNE+objRtn.QCPNR+objRtn.QCPNI+objRtn.QCPNC+objRtn.QCPNM);
//                    if(VALI_QCPN == objRtn.QCPNP){
//                        System.out.println(VALI_QCPN + " : " + objRtn.QCPNP);
//                        System.out.println(objRtn.FVTA + " es correcto");
//                    }else{
//                        System.out.println(VALI_QCPN + " : " + objRtn.QCPNP);
//                        System.out.println(objRtn.FVTA + " es incorrecto");
//                    }
                    
                    objRtn.TOTAL_QCPNS = QCPNS;
                    objRtn.TOTAL_AMTS = AMTS;
                    objRtn.TOTAL_QCPNV = QCPNV;
                    objRtn.TOTAL_AMTV = AMTV;
                    objRtn.TOTAL_QCPNE = QCPNE;
                    objRtn.TOTAL_AMTE = AMTE;
                    objRtn.TOTAL_QCPNR = QCPNR;
                    objRtn.TOTAL_AMTR = AMTR;
                    objRtn.TOTAL_QCPNI = QCPNI;
                    objRtn.TOTAL_AMTI = AMTI;
                    objRtn.TOTAL_QCPNC = QCPNC;
                    objRtn.TOTAL_AMTC = AMTC;
                    objRtn.TOTAL_QCPNM = QCPNM;
                    objRtn.TOTAL_AMTM = AMTM;
                    objRtn.TOTAL_QCPNP = QCPNP;
                    objRtn.TOTAL_AMTP = AMTP;
                    
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception ex) {
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<IMF117Filter> loadPX226SQP05098(IMF117Filter filter) throws Exception {
        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long CPN1 = 0,CPN2 = 0,CPN3 = 0,CPN4 = 0,CPN5 = 0,CPN6 = 0,CPN7 = 0,CPN8 = 0,CPN9 = 0,CPN10 = 0,CPN11 = 0,CPN12 = 0;
        double AMT1 = 0,AMT2 = 0,AMT3 = 0,AMT4 = 0,AMT5 = 0,AMT6 = 0,AMT7 = 0,AMT8 = 0,AMT9 = 0,AMT10 = 0,AMT11 = 0,AMT12 = 0;
        DecimalFormat dfi = new DecimalFormat("#.##");
        DecimalFormat dfn = new DecimalFormat("###,###,###");
        String SQLCLL01 = "{CALL SQP05098(?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_FECHA_FROM_FORE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CPN1 = rs01.getLong("CPN1");
                CPN2 = rs01.getLong("CPN2");
                CPN3 = rs01.getLong("CPN3");
                CPN4 = rs01.getLong("CPN4");
//                CPN5 = rs01.getLong("CPN5");
//                CPN6 = rs01.getLong("CPN6");
//                CPN7 = rs01.getLong("CPN7");
//                CPN8 = rs01.getLong("CPN8");
//                CPN9 = rs01.getLong("CPN9");
//                CPN10 = rs01.getLong("CPN10");
//                CPN11 = rs01.getLong("CPN11");
//                CPN12 = rs01.getLong("CPN12");
                AMT1 = rs01.getDouble("AMT1");
                AMT2 = rs01.getDouble("AMT2");
                AMT3 = rs01.getDouble("AMT3");
                AMT4 = rs01.getDouble("AMT4");
//                AMT5 = rs01.getDouble("AMT5");
//                AMT6 = rs01.getDouble("AMT6");
//                AMT7 = rs01.getDouble("AMT7");
//                AMT8 = rs01.getDouble("AMT8");
//                AMT9 = rs01.getDouble("AMT9");
//                AMT10 = rs01.getDouble("AMT10");
//                AMT11 = rs01.getDouble("AMT11");
//                AMT12 = rs01.getDouble("AMT12");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    
                    objRtn.DFLIGHT1 = rs01.getString("FVLO1");
                    objRtn.DFLIGHT1 = Functions.getMonthConvert(objRtn.DFLIGHT1);
                    objRtn.DSALES1 = rs01.getString("VTA1");
                    objRtn.DSALES1 = Functions.getMonthConvert(objRtn.DSALES1);
                    objRtn.QTYFLY1 = rs01.getLong("CPN1");
                    objRtn.FLYAMO1 = rs01.getDouble("AMT1");
                    objRtn.QTYS1 = rs01.getLong("QTYS1");
                    objRtn.AMOS1 = rs01.getDouble("AMOS1");
                    objRtn.QTYS1_PERCENT = (objRtn.QTYS1 > 0) ? ((objRtn.QTYFLY1 * 100.00) / objRtn.QTYS1) : 0;
                    objRtn.QTYS1_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS1_PERCENT));
                    objRtn.QTYF1 = rs01.getLong("QTYF1");
                    objRtn.AMOF1 = rs01.getDouble("AMOF1");
                    objRtn.QTYF1_PERCENT = (objRtn.QTYF1 > 0) ? ((objRtn.QTYFLY1 * 100.00) / objRtn.QTYF1) : 0;
                    objRtn.QTYF1_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF1_PERCENT));
                    
                    objRtn.DFLIGHT2 = rs01.getString("FVLO2");
                    objRtn.DFLIGHT2 = Functions.getMonthConvert(objRtn.DFLIGHT2);
                    objRtn.DSALES2 = rs01.getString("VTA2");
                    objRtn.DSALES2 = Functions.getMonthConvert(objRtn.DSALES2);
                    objRtn.QTYFLY2 = rs01.getLong("CPN2");
                    objRtn.FLYAMO2 = rs01.getDouble("AMT2");
                    objRtn.QTYS2 = rs01.getLong("QTYS2");
                    objRtn.AMOS2 = rs01.getDouble("AMOS2");
                    objRtn.QTYS2_PERCENT = (objRtn.QTYS2 > 0) ? ((objRtn.QTYFLY2 * 100.00) / objRtn.QTYS2) : 0;
                    objRtn.QTYS2_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS2_PERCENT));
                    objRtn.QTYF2 = rs01.getLong("QTYF2");
                    objRtn.AMOF2 = rs01.getDouble("AMOF2");
                    objRtn.QTYF2_PERCENT = (objRtn.QTYF2 > 0) ? ((objRtn.QTYFLY2 * 100.00) / objRtn.QTYF2) : 0;
                    objRtn.QTYF2_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF2_PERCENT));
                    
                    objRtn.DFLIGHT3 = rs01.getString("FVLO3");
                    objRtn.DFLIGHT3 = Functions.getMonthConvert(objRtn.DFLIGHT3);
                    objRtn.DSALES3 = rs01.getString("VTA3");
                    objRtn.DSALES3 = Functions.getMonthConvert(objRtn.DSALES3);
                    objRtn.QTYFLY3 = rs01.getLong("CPN3");
                    objRtn.FLYAMO3 = rs01.getDouble("AMT3");
                    objRtn.QTYS3 = rs01.getLong("QTYS3");
                    objRtn.AMOS3 = rs01.getDouble("AMOS3");
                    objRtn.QTYS3_PERCENT = (objRtn.QTYS3 > 0) ? ((objRtn.QTYFLY3 * 100.00) / objRtn.QTYS3) : 0;
                    objRtn.QTYS3_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS3_PERCENT));
                    objRtn.QTYF3 = rs01.getLong("QTYF3");
                    objRtn.AMOF3 = rs01.getDouble("AMOF3");
                    objRtn.QTYF3_PERCENT = (objRtn.QTYF3 > 0) ? ((objRtn.QTYFLY3 * 100.00) / objRtn.QTYF3) : 0;
                    objRtn.QTYF3_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF3_PERCENT));
                    
                    objRtn.DFLIGHT4 = rs01.getString("FVLO4");
                    objRtn.DFLIGHT4 = Functions.getMonthConvert(objRtn.DFLIGHT4);
                    objRtn.DSALES4 = rs01.getString("VTA4");
                    objRtn.DSALES4 = Functions.getMonthConvert(objRtn.DSALES4);
                    objRtn.QTYFLY4 = rs01.getLong("CPN4");
                    objRtn.FLYAMO4 = rs01.getDouble("AMT4");
                    objRtn.QTYS4 = rs01.getLong("QTYS4");
                    objRtn.AMOS4 = rs01.getDouble("AMOS4");
                    objRtn.QTYS4_PERCENT = (objRtn.QTYS4 > 0) ? ((objRtn.QTYFLY4 * 100.00) / objRtn.QTYS4) : 0;
                    objRtn.QTYS4_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS4_PERCENT));
                    objRtn.QTYF4 = rs01.getLong("QTYF4");
                    objRtn.AMOF4 = rs01.getDouble("AMOF4");
                    objRtn.QTYF4_PERCENT = (objRtn.QTYF4 > 0) ? ((objRtn.QTYFLY4 * 100.00) / objRtn.QTYF4) : 0;
                    objRtn.QTYF4_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF4_PERCENT));
                    
//                    objRtn.DFLIGHT5 = rs01.getString("FVLO5");
//                    objRtn.DFLIGHT5 = Functions.getMonthConvert(objRtn.DFLIGHT5);
//                    objRtn.DSALES5 = rs01.getString("VTA5");
//                    objRtn.DSALES5 = Functions.getMonthConvert(objRtn.DSALES5);
//                    objRtn.QTYFLY5 = rs01.getLong("CPN5");
//                    objRtn.FLYAMO5 = rs01.getDouble("AMT5");
//                    objRtn.QTYS5 = rs01.getLong("QTYS5");
//                    objRtn.AMOS5 = rs01.getDouble("AMOS5");
//                    objRtn.QTYS5_PERCENT = (objRtn.QTYS5 > 0) ? ((objRtn.QTYFLY5 * 100.00) / objRtn.QTYS5) : 0;
//                    objRtn.QTYS5_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS5_PERCENT));
//                    objRtn.QTYF5 = rs01.getLong("QTYF5");
//                    objRtn.AMOF5 = rs01.getDouble("AMOF5");
//                    objRtn.QTYF5_PERCENT = (objRtn.QTYF5 > 0) ? ((objRtn.QTYFLY5 * 100.00) / objRtn.QTYF5) : 0;
//                    objRtn.QTYF5_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF5_PERCENT));
//                    
//                    objRtn.DFLIGHT6 = rs01.getString("FVLO6");
//                    objRtn.DFLIGHT6 = Functions.getMonthConvert(objRtn.DFLIGHT6);
//                    objRtn.DSALES6 = rs01.getString("VTA6");
//                    objRtn.DSALES6 = Functions.getMonthConvert(objRtn.DSALES6);
//                    objRtn.QTYFLY6 = rs01.getLong("CPN6");
//                    objRtn.FLYAMO6 = rs01.getDouble("AMT6");
//                    objRtn.QTYS6 = rs01.getLong("QTYS6");
//                    objRtn.AMOS6 = rs01.getDouble("AMOS6");
//                    objRtn.QTYS6_PERCENT = (objRtn.QTYS6 > 0) ? ((objRtn.QTYFLY6 * 100.00) / objRtn.QTYS6) : 0;
//                    objRtn.QTYS6_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS6_PERCENT));
//                    objRtn.QTYF6 = rs01.getLong("QTYF6");
//                    objRtn.AMOF6 = rs01.getDouble("AMOF6");
//                    objRtn.QTYF6_PERCENT = (objRtn.QTYF6 > 0) ? ((objRtn.QTYFLY6 * 100.00) / objRtn.QTYF6) : 0;
//                    objRtn.QTYF6_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF6_PERCENT));
//                    
//                    objRtn.DFLIGHT7 = rs01.getString("FVLO7");
//                    objRtn.DFLIGHT7 = Functions.getMonthConvert(objRtn.DFLIGHT7);
//                    objRtn.DSALES7 = rs01.getString("VTA7");
//                    objRtn.DSALES7 = Functions.getMonthConvert(objRtn.DSALES7);
//                    objRtn.QTYFLY7 = rs01.getLong("CPN7");
//                    objRtn.FLYAMO7 = rs01.getDouble("AMT7");
//                    objRtn.QTYS7 = rs01.getLong("QTYS7");
//                    objRtn.AMOS7 = rs01.getDouble("AMOS7");
//                    objRtn.QTYS7_PERCENT = (objRtn.QTYS7 > 0) ? ((objRtn.QTYFLY7 * 100.00) / objRtn.QTYS7) : 0;
//                    objRtn.QTYS7_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS7_PERCENT));
//                    objRtn.QTYF7 = rs01.getLong("QTYF7");
//                    objRtn.AMOF7 = rs01.getDouble("AMOF7");
//                    objRtn.QTYF7_PERCENT = (objRtn.QTYF7 > 0) ? ((objRtn.QTYFLY7 * 100.00) / objRtn.QTYF7) : 0;
//                    objRtn.QTYF7_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF7_PERCENT));
//                    
//                    objRtn.DFLIGHT8 = rs01.getString("FVLO8");
//                    objRtn.DFLIGHT8 = Functions.getMonthConvert(objRtn.DFLIGHT8);
//                    objRtn.DSALES8 = rs01.getString("VTA8");
//                    objRtn.DSALES8 = Functions.getMonthConvert(objRtn.DSALES8);
//                    objRtn.QTYFLY8 = rs01.getLong("CPN8");
//                    objRtn.FLYAMO8 = rs01.getDouble("AMT8");
//                    objRtn.QTYS8 = rs01.getLong("QTYS8");
//                    objRtn.AMOS8 = rs01.getDouble("AMOS8");
//                    objRtn.QTYS8_PERCENT = (objRtn.QTYS8 > 0) ? ((objRtn.QTYFLY8 * 100.00) / objRtn.QTYS8) : 0;
//                    objRtn.QTYS8_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS8_PERCENT));
//                    objRtn.QTYF8 = rs01.getLong("QTYF8");
//                    objRtn.AMOF8 = rs01.getDouble("AMOF8");
//                    objRtn.QTYF8_PERCENT = (objRtn.QTYF8 > 0) ? ((objRtn.QTYFLY8 * 100.00) / objRtn.QTYF8) : 0;
//                    objRtn.QTYF8_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF8_PERCENT));
//                    
//                    objRtn.DFLIGHT9 = rs01.getString("FVLO9");
//                    objRtn.DFLIGHT9 = Functions.getMonthConvert(objRtn.DFLIGHT9);
//                    objRtn.DSALES9 = rs01.getString("VTA9");
//                    objRtn.DSALES9 = Functions.getMonthConvert(objRtn.DSALES9);
//                    objRtn.QTYFLY9 = rs01.getLong("CPN9");
//                    objRtn.FLYAMO9 = rs01.getDouble("AMT9");
//                    objRtn.QTYS9 = rs01.getLong("QTYS9");
//                    objRtn.AMOS9 = rs01.getDouble("AMOS9");
//                    objRtn.QTYS9_PERCENT = (objRtn.QTYS9 > 0) ? ((objRtn.QTYFLY9 * 100.00) / objRtn.QTYS9) : 0;
//                    objRtn.QTYS9_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS9_PERCENT));
//                    objRtn.QTYF9 = rs01.getLong("QTYF9");
//                    objRtn.AMOF9 = rs01.getDouble("AMOF9");
//                    objRtn.QTYF9_PERCENT = (objRtn.QTYF9 > 0) ? ((objRtn.QTYFLY9 * 100.00) / objRtn.QTYF9) : 0;
//                    objRtn.QTYF9_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF9_PERCENT));
//                    
//                    objRtn.DFLIGHT10 = rs01.getString("FVLO10");
//                    objRtn.DFLIGHT10 = Functions.getMonthConvert(objRtn.DFLIGHT10);
//                    objRtn.DSALES10 = rs01.getString("VTA10");
//                    objRtn.DSALES10 = Functions.getMonthConvert(objRtn.DSALES10);
//                    objRtn.QTYFLY10 = rs01.getLong("CPN10");
//                    objRtn.FLYAMO10 = rs01.getDouble("AMT10");
//                    objRtn.QTYS10 = rs01.getLong("QTYS10");
//                    objRtn.AMOS10 = rs01.getDouble("AMOS10");
//                    objRtn.QTYS10_PERCENT = (objRtn.QTYS10 > 0) ? ((objRtn.QTYFLY10 * 100.00) / objRtn.QTYS10) : 0;
//                    objRtn.QTYS10_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS10_PERCENT));
//                    objRtn.QTYF10 = rs01.getLong("QTYF10");
//                    objRtn.AMOF10 = rs01.getDouble("AMOF10");
//                    objRtn.QTYF10_PERCENT = (objRtn.QTYF10 > 0) ? ((objRtn.QTYFLY10 * 100.00) / objRtn.QTYF10) : 0;
//                    objRtn.QTYF10_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF10_PERCENT));
//                    
//                    objRtn.DFLIGHT11 = rs01.getString("FVLO11");
//                    objRtn.DFLIGHT11 = Functions.getMonthConvert(objRtn.DFLIGHT11);
//                    objRtn.DSALES11 = rs01.getString("VTA11");
//                    objRtn.DSALES11 = Functions.getMonthConvert(objRtn.DSALES11);
//                    objRtn.QTYFLY11 = rs01.getLong("CPN11");
//                    objRtn.FLYAMO11 = rs01.getDouble("AMT11");
//                    objRtn.QTYS11 = rs01.getLong("QTYS11");
//                    objRtn.AMOS11 = rs01.getDouble("AMOS11");
//                    objRtn.QTYS11_PERCENT = (objRtn.QTYS11 > 0) ? ((objRtn.QTYFLY11 * 100.00) / objRtn.QTYS11) : 0;
//                    objRtn.QTYS11_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS11_PERCENT));
//                    objRtn.QTYF11 = rs01.getLong("QTYF11");
//                    objRtn.AMOF11 = rs01.getDouble("AMOF11");
//                    objRtn.QTYF11_PERCENT = (objRtn.QTYF11 > 0) ? ((objRtn.QTYFLY11 * 100.00) / objRtn.QTYF11) : 0;
//                    objRtn.QTYF11_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF11_PERCENT));
//                    
//                    objRtn.DFLIGHT12 = rs01.getString("FVLO12");
//                    objRtn.DFLIGHT12 = Functions.getMonthConvert(objRtn.DFLIGHT12);
//                    objRtn.DSALES12 = rs01.getString("VTA12");
//                    objRtn.DSALES12 = Functions.getMonthConvert(objRtn.DSALES12);
//                    objRtn.QTYFLY12 = rs01.getLong("CPN12");
//                    objRtn.FLYAMO12 = rs01.getDouble("AMT12");
//                    objRtn.QTYS12 = rs01.getLong("QTYS12");
//                    objRtn.AMOS12 = rs01.getDouble("AMOS12");
//                    objRtn.QTYS12_PERCENT = (objRtn.QTYS12 > 0) ? ((objRtn.QTYFLY12 * 100.00) / objRtn.QTYS12) : 0;
//                    objRtn.QTYS12_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS12_PERCENT));
//                    objRtn.QTYF12 = rs01.getLong("QTYF12");
//                    objRtn.AMOF12 = rs01.getDouble("AMOF12");
//                    objRtn.QTYF12_PERCENT = (objRtn.QTYF12 > 0) ? ((objRtn.QTYFLY12 * 100.00) / objRtn.QTYF12) : 0;
//                    objRtn.QTYF12_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYF12_PERCENT));
                   
                    //TOTALES
                    objRtn.TOT_CPN1 = CPN1;
                    objRtn.TOT_CPN2 = CPN2;
                    objRtn.TOT_CPN3 = CPN3;
                    objRtn.TOT_CPN4 = CPN4;
//                    objRtn.TOT_CPN5 = CPN5;
//                    objRtn.TOT_CPN6 = CPN6;
//                    objRtn.TOT_CPN7 = CPN7;
//                    objRtn.TOT_CPN8 = CPN8;
//                    objRtn.TOT_CPN9 = CPN9;
//                    objRtn.TOT_CPN10 = CPN10;
//                    objRtn.TOT_CPN11 = CPN11;
//                    objRtn.TOT_CPN12 = CPN12;
                    objRtn.TOT_AMT1 = AMT1;
                    objRtn.TOT_AMT2 = AMT2;
                    objRtn.TOT_AMT3 = AMT3;
                    objRtn.TOT_AMT4 = AMT4;
//                    objRtn.TOT_AMT5 = AMT5;
//                    objRtn.TOT_AMT6 = AMT6;
//                    objRtn.TOT_AMT7 = AMT7;
//                    objRtn.TOT_AMT8 = AMT8;
//                    objRtn.TOT_AMT9 = AMT9;
//                    objRtn.TOT_AMT10 = AMT10;
//                    objRtn.TOT_AMT11 = AMT11;
//                    objRtn.TOT_AMT12 = AMT12;
                    objRtn.TOT_QTYS1_PERCENT = (objRtn.QTYS1 > 0) ? ((objRtn.TOT_CPN1 * 100.00) / objRtn.QTYS1) : 0;
                    objRtn.TOT_QTYS1_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS1_PERCENT));
                    objRtn.TOT_QTYS2_PERCENT = (objRtn.QTYS2 > 0) ? ((objRtn.TOT_CPN2 * 100.00) / objRtn.QTYS2) : 0;
                    objRtn.TOT_QTYS2_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS2_PERCENT));
                    objRtn.TOT_QTYS3_PERCENT = (objRtn.QTYS3 > 0) ? ((objRtn.TOT_CPN3 * 100.00) / objRtn.QTYS3) : 0;
                    objRtn.TOT_QTYS3_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS3_PERCENT));
                    objRtn.TOT_QTYS4_PERCENT = (objRtn.QTYS4 > 0) ? ((objRtn.TOT_CPN4 * 100.00) / objRtn.QTYS4) : 0;
                    objRtn.TOT_QTYS4_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS4_PERCENT));
//                    objRtn.TOT_QTYS5_PERCENT = (objRtn.QTYS5 > 0) ? ((objRtn.TOT_CPN5 * 100.00) / objRtn.QTYS5) : 0;
//                    objRtn.TOT_QTYS5_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS5_PERCENT));
//                    objRtn.TOT_QTYS6_PERCENT = (objRtn.QTYS6 > 0) ? ((objRtn.TOT_CPN6 * 100.00) / objRtn.QTYS6) : 0;
//                    objRtn.TOT_QTYS6_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS6_PERCENT));
//                    objRtn.TOT_QTYS7_PERCENT = (objRtn.QTYS7 > 0) ? ((objRtn.TOT_CPN7 * 100.00) / objRtn.QTYS7) : 0;
//                    objRtn.TOT_QTYS7_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS7_PERCENT));
//                    objRtn.TOT_QTYS8_PERCENT = (objRtn.QTYS8 > 0) ? ((objRtn.TOT_CPN8 * 100.00) / objRtn.QTYS8) : 0;
//                    objRtn.TOT_QTYS8_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS8_PERCENT));
//                    objRtn.TOT_QTYS9_PERCENT = (objRtn.QTYS9 > 0) ? ((objRtn.TOT_CPN9 * 100.00) / objRtn.QTYS9) : 0;
//                    objRtn.TOT_QTYS9_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS9_PERCENT));
//                    objRtn.TOT_QTYS10_PERCENT = (objRtn.QTYS10 > 0) ? ((objRtn.TOT_CPN10 * 100.00) / objRtn.QTYS10) : 0;
//                    objRtn.TOT_QTYS10_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS10_PERCENT));
//                    objRtn.TOT_QTYS11_PERCENT = (objRtn.QTYS11 > 0) ? ((objRtn.TOT_CPN11 * 100.00) / objRtn.QTYS11) : 0;
//                    objRtn.TOT_QTYS11_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS11_PERCENT));
//                    objRtn.TOT_QTYS12_PERCENT = (objRtn.QTYS12 > 0) ? ((objRtn.TOT_CPN12 * 100.00) / objRtn.QTYS12) : 0;
//                    objRtn.TOT_QTYS12_PERCENT = Double.parseDouble(dfi.format(objRtn.TOT_QTYS12_PERCENT));
                    
                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception ex) {
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<IMF117Filter> loadPX226SQP05098Down(IMF117Filter filter) throws Exception {
        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long TOT_QTYFLY1 = 0,TOT_QTYFLY2 = 0,TOT_QTYFLY3 = 0,TOT_QTYFLY4 = 0,TOT_QTYFLY5 = 0,TOT_QTYFLY6 = 0,TOT_QTYFLY7 = 0,TOT_QTYFLY8 = 0,TOT_QTYFLY9 = 0,TOT_QTYFLY10 = 0,TOT_QTYFLY11 = 0,TOT_QTYFLY12 = 0,TOT_QTYSALE = 0,TOT_QTYFLOWN = 0;
        double TOT_FLYAMO1 = 0,TOT_FLYAMO2 = 0,TOT_FLYAMO3 = 0,TOT_FLYAMO4 = 0,TOT_FLYAMO5 = 0,TOT_FLYAMO6 = 0,TOT_FLYAMO7 = 0,TOT_FLYAMO8 = 0,TOT_FLYAMO9 = 0,TOT_FLYAMO10 = 0,TOT_FLYAMO11 = 0,TOT_FLYAMO12 = 0,TOT_AMOSALE = 0,TOT_AMOFLOWN = 0;
        DecimalFormat dfi = new DecimalFormat("#.##");
        DecimalFormat dfn = new DecimalFormat("###,###,###");
        String SQLCLL01 = "{CALL SQP05098_2(?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_FECHA_FROM_FORE);

            cstmt01.execute();

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    
                    objRtn.DSALES1 = rs01.getString("VTA1");
                    objRtn.DSALES1 = Functions.getMonthConvert(objRtn.DSALES1);
                    objRtn.USED1 = rs01.getString("USED1");
                    objRtn.CPNS1 = rs01.getLong("CPNS1");
                    objRtn.QTYS1 = rs01.getLong("QTYS1");
                    objRtn.AMON1 = rs01.getDouble("AMON1");
                    objRtn.QTYS1_PERCENT = (objRtn.QTYS1 > 0) ? ((objRtn.CPNS1 * 100.00) / objRtn.QTYS1) : 0;
                    objRtn.QTYS1_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS1_PERCENT));
                    
                    objRtn.DSALES2 = rs01.getString("VTA2");
                    objRtn.DSALES2 = Functions.getMonthConvert(objRtn.DSALES2);
                    objRtn.USED2 = rs01.getString("USED2");
                    objRtn.CPNS2 = rs01.getLong("CPNS2");
                    objRtn.QTYS2 = rs01.getLong("QTYS2");
                    objRtn.AMON2 = rs01.getDouble("AMON2");
                    objRtn.QTYS2_PERCENT = (objRtn.QTYS2 > 0) ? ((objRtn.CPNS2 * 100.00) / objRtn.QTYS2) : 0;
                    objRtn.QTYS2_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS2_PERCENT));
                    
                    objRtn.DSALES3 = rs01.getString("VTA3");
                    objRtn.DSALES3 = Functions.getMonthConvert(objRtn.DSALES3);
                    objRtn.USED3 = rs01.getString("USED3");
                    objRtn.CPNS3 = rs01.getLong("CPNS3");
                    objRtn.QTYS3 = rs01.getLong("QTYS3");
                    objRtn.AMON3 = rs01.getDouble("AMON3");
                    objRtn.QTYS3_PERCENT = (objRtn.QTYS3 > 0) ? ((objRtn.CPNS3 * 100.00) / objRtn.QTYS3) : 0;
                    objRtn.QTYS3_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS3_PERCENT));
                    
                    objRtn.DSALES4 = rs01.getString("VTA4");
                    objRtn.DSALES4 = Functions.getMonthConvert(objRtn.DSALES4);
                    objRtn.USED4 = rs01.getString("USED4");
                    objRtn.CPNS4 = rs01.getLong("CPNS4");
                    objRtn.QTYS4 = rs01.getLong("QTYS4");
                    objRtn.AMON4 = rs01.getDouble("AMON4");
                    objRtn.QTYS4_PERCENT = (objRtn.QTYS4 > 0) ? ((objRtn.CPNS4 * 100.00) / objRtn.QTYS4) : 0;
                    objRtn.QTYS4_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS4_PERCENT));
//                    
//                    objRtn.DSALES5 = rs01.getString("VTA5");
//                    objRtn.DSALES5 = Functions.getMonthConvert(objRtn.DSALES5);
//                    objRtn.USED5 = rs01.getString("USED5");
//                    objRtn.CPNS5 = rs01.getLong("CPNS5");
//                    objRtn.QTYS5 = rs01.getLong("QTYS5");
//                    objRtn.AMON5 = rs01.getDouble("AMON5");
//                    objRtn.QTYS5_PERCENT = (objRtn.QTYS5 > 0) ? ((objRtn.CPNS5 * 100.00) / objRtn.QTYS5) : 0;
//                    objRtn.QTYS5_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS5_PERCENT));
//                    
//                    objRtn.DSALES6 = rs01.getString("VTA6");
//                    objRtn.DSALES6 = Functions.getMonthConvert(objRtn.DSALES6);
//                    objRtn.USED6 = rs01.getString("USED6");
//                    objRtn.CPNS6 = rs01.getLong("CPNS6");
//                    objRtn.QTYS6 = rs01.getLong("QTYS6");
//                    objRtn.AMON6 = rs01.getDouble("AMON6");
//                    objRtn.QTYS6_PERCENT = (objRtn.QTYS6 > 0) ? ((objRtn.CPNS6 * 100.00) / objRtn.QTYS6) : 0;
//                    objRtn.QTYS6_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS6_PERCENT));
//                    
//                    objRtn.DSALES7 = rs01.getString("VTA7");
//                    objRtn.DSALES7 = Functions.getMonthConvert(objRtn.DSALES7);
//                    objRtn.USED7 = rs01.getString("USED7");
//                    objRtn.CPNS7 = rs01.getLong("CPNS7");
//                    objRtn.QTYS7 = rs01.getLong("QTYS7");
//                    objRtn.AMON7 = rs01.getDouble("AMON7");
//                    objRtn.QTYS7_PERCENT = (objRtn.QTYS7 > 0) ? ((objRtn.CPNS7 * 100.00) / objRtn.QTYS7) : 0;
//                    objRtn.QTYS7_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS7_PERCENT));
//                    
//                    objRtn.DSALES8 = rs01.getString("VTA8");
//                    objRtn.DSALES8 = Functions.getMonthConvert(objRtn.DSALES8);
//                    objRtn.USED8 = rs01.getString("USED8");
//                    objRtn.CPNS8 = rs01.getLong("CPNS8");
//                    objRtn.QTYS8 = rs01.getLong("QTYS8");
//                    objRtn.AMON8 = rs01.getDouble("AMON8");
//                    objRtn.QTYS8_PERCENT = (objRtn.QTYS8 > 0) ? ((objRtn.CPNS8 * 100.00) / objRtn.QTYS8) : 0;
//                    objRtn.QTYS8_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS8_PERCENT));
//                    
//                    objRtn.DSALES9 = rs01.getString("VTA9");
//                    objRtn.DSALES9 = Functions.getMonthConvert(objRtn.DSALES9);
//                    objRtn.USED9 = rs01.getString("USED9");
//                    objRtn.CPNS9 = rs01.getLong("CPNS9");
//                    objRtn.QTYS9 = rs01.getLong("QTYS9");
//                    objRtn.AMON9 = rs01.getDouble("AMON9");
//                    objRtn.QTYS9_PERCENT = (objRtn.QTYS9 > 0) ? ((objRtn.CPNS9 * 100.00) / objRtn.QTYS9) : 0;
//                    objRtn.QTYS9_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS9_PERCENT));
//                    
//                    objRtn.DSALES10 = rs01.getString("VTA10");
//                    objRtn.DSALES10 = Functions.getMonthConvert(objRtn.DSALES10);
//                    objRtn.USED10 = rs01.getString("USED10");
//                    objRtn.CPNS10 = rs01.getLong("CPNS10");
//                    objRtn.QTYS10 = rs01.getLong("QTYS10");
//                    objRtn.AMON10 = rs01.getDouble("AMON10");
//                    objRtn.QTYS10_PERCENT = (objRtn.QTYS10 > 0) ? ((objRtn.CPNS10 * 100.00) / objRtn.QTYS10) : 0;
//                    objRtn.QTYS10_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS10_PERCENT));
//                    
//                    objRtn.DSALES11 = rs01.getString("VTA11");
//                    objRtn.DSALES11 = Functions.getMonthConvert(objRtn.DSALES11);
//                    objRtn.USED11 = rs01.getString("USED11");
//                    objRtn.CPNS11 = rs01.getLong("CPNS11");
//                    objRtn.QTYS11 = rs01.getLong("QTYS11");
//                    objRtn.AMON11 = rs01.getDouble("AMON11");
//                    objRtn.QTYS11_PERCENT = (objRtn.QTYS11 > 0) ? ((objRtn.CPNS11 * 100.00) / objRtn.QTYS11) : 0;
//                    objRtn.QTYS11_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS11_PERCENT));
//                    
//                    objRtn.DSALES12 = rs01.getString("VTA12");
//                    objRtn.DSALES12 = Functions.getMonthConvert(objRtn.DSALES12);
//                    objRtn.USED12 = rs01.getString("USED12");
//                    objRtn.CPNS12 = rs01.getLong("CPNS12");
//                    objRtn.QTYS12 = rs01.getLong("QTYS12");
//                    objRtn.AMON12 = rs01.getDouble("AMON12");
//                    objRtn.QTYS12_PERCENT = (objRtn.QTYS12 > 0) ? ((objRtn.CPNS12 * 100.00) / objRtn.QTYS12) : 0;
//                    objRtn.QTYS12_PERCENT = Double.parseDouble(dfi.format(objRtn.QTYS12_PERCENT));
//                    
                    lstRtn.add(objRtn);
                }
//            }

        } catch (Exception ex) {
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<IMF117Filter> loadPX226SQP05098Graph(IMF117Filter filter) throws Exception {
        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP05098Graph(?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_FECHA_FROM_FORE);
            cstmt01.execute();

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.DSALES = Functions.getMonthConvert(objRtn.DSALES);
                    objRtn.QTYSALE = rs01.getLong("QTYSALE");
                    objRtn.QTYFLOWN = rs01.getLong("QTYFLOWN");
                    lstRtn.add(objRtn);
                }
        } catch (Exception ex) {
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<IMF117Filter> loadPX226SQP05098Chart(IMF117Filter filter) throws Exception {
        List<IMF117Filter> lstRtn = new ArrayList<IMF117Filter>(0);
        IMF117Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        long QTYSALE = 0,QTYFLOWN = 0;
        double AMOSALE = 0,AMOFLOWN = 0;
        String SQLCLL01 = "{CALL SQP05098Chart(?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_FECHA_FROM_FORE_1);
            cstmt01.execute();

            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTYSALE = rs01.getLong("QTYSALE");
                QTYFLOWN = rs01.getLong("QTYFLOWN");
                AMOSALE = rs01.getDouble("AMOSALE");
                AMOFLOWN = rs01.getDouble("AMOFLOWN");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new IMF117Filter();
                    objRtn.IN_YEAR = filter.IN_FECHA_FROM_FORE_1;
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.DSALES = Functions.getMonthConvert(objRtn.DSALES);
                    objRtn.QTYSALE = rs01.getLong("QTYSALE");
                    objRtn.QTYFLOWN = rs01.getLong("QTYFLOWN");
                    objRtn.AMOSALE = rs01.getDouble("AMOSALE");
                    objRtn.AMOFLOWN = rs01.getDouble("AMOFLOWN");
                    
                    objRtn.TOT_QTYSALE = QTYSALE;
                    objRtn.TOT_QTYFLOWN = QTYFLOWN;
                    objRtn.TOT_AMOSALE = AMOSALE;
                    objRtn.TOT_AMOFLOWN = AMOFLOWN;
                    
                    lstRtn.add(objRtn);
                }
            }    
        } catch (Exception ex) {
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

//    public List<IMF117Filter> loadPX228S01A1890(IMF117Filter filter) throws Exception{
//        List<IMF117Filter> lstRtn = new ArrayList<>(0);
//        IMF117Filter objRtn;
//        
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL SQP04923(?,?)}";
//
//        Connection cnx = null;         
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.IN_PER);
//            cstmt01.execute();
//            
//            rs01 = cstmt01.getResultSet();            
//            while (rs01.next()) {                
//                objRtn = new IMF117Filter();
//                objRtn.CCUST    = rs01.getString("CCUST");
//                objRtn.PER      = rs01.getString("PER").trim();
//                objRtn.MES      = rs01.getString("MES").trim();
//                objRtn.MES2     = rs01.getString("MES2").trim();
//                objRtn.SALE     = rs01.getDouble("SALE");
//                objRtn.ENE      = rs01.getDouble("ENE");
//                objRtn.FEB      = rs01.getDouble("FEB");               
//                objRtn.MAR      = rs01.getDouble("MAR");
//                objRtn.ABR      = rs01.getDouble("ABR");
//                objRtn.MAY      = rs01.getDouble("MAY");
//                objRtn.JUN      = rs01.getDouble("JUN");
//                objRtn.JUL      = rs01.getDouble("JUL");
//                objRtn.AGO      = rs01.getDouble("AGO");
//                objRtn.SET      = rs01.getDouble("SET");
//                objRtn.OCT      = rs01.getDouble("OCT");
//                objRtn.NOV      = rs01.getDouble("NOV");
//                objRtn.DIC      = rs01.getDouble("DIC");
//                objRtn.SALDO    = rs01.getDouble("SALDO");
//                objRtn.LAST    = rs01.getDouble("LAST");
//                objRtn.POST    = rs01.getDouble("POST");
//                lstRtn.add(objRtn);
//            }        
//         }catch(Exception ex){
//         }finally {
//            if (rs01 != null) {
//                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cstmt01 != null) {
//                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//         
//         return lstRtn; 
//    }
}
