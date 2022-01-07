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
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF053Filter;
import net.miatech.beans.IMF111Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.interline.filter.SFI040Filter;
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
                    } else {
                        if (rs01.getString("CODIGO").trim().isEmpty()) {
                            objRtn.COUNTRY_NAME = "(INTERNET)";
                        } else {
                            objRtn.COUNTRY_NAME = rs01.getString("CODIGO");
                        }
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
                        bean.Perc3 = (bean.TOTAL_AMOUNT > 0) ? (bean.AMOUNT * 100) / bean.TOTAL_AMOUNT : 0;
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
    
    /** Flown Analysis */
    
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
    
    public List<A1971Filter> loadPX109SQP01927(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> listado = new ArrayList();
        A1971Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        long QTY = 0, QTY_VAL = 0, QTY_CON = 0, QTY_PEN = 0, QCPNON = 0, QCPNOAL = 0;
        double VCPN_VAL = 0, VCPN_CON = 0, VCPN_PEN = 0, VCPNON = 0, VCPNOAL = 0;

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
                VCPN_VAL = rs01.getDouble("VCPN_VAL");
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
}
