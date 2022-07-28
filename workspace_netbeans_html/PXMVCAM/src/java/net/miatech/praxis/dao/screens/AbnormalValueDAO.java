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
import java.util.List;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF111Filter;
import net.miatech.beans.IMF121Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class AbnormalValueDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AbnormalValueDAO() {
    }

    public AbnormalValueDAO(IServerSession ss) {
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

    public List<A1007> loadPX037S05A1007() throws SQLException, Exception {

        List<A1007> lstRtn = new ArrayList<A1007>(0);
        A1007 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX037S05A1007()}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1007();

                objRtn.A1007CTATO = rs01.getString("A1007CTATO");
                objRtn.A1007NOMBR = rs01.getString("A1007NOMBR");
                objRtn.A1007PAIS = rs01.getString("A1007PAIS");
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    // =========================================================================
    // =============================== SALES ===================================
    // =========================================================================
    public List<IMF111Filter> loadPX414SQP02393(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;
        long QTKTS = 0, QTKTSMAX = 0, QTKTSBEL = 0;
        double AMOUNT = 0, AMOUNTMAX = 0, AMOUNTBEL = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02393_2(?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTS = rs01.getLong("QTKTSMIMF");
                QTKTSMAX = rs01.getLong("QTKTSMAXF");
                QTKTSBEL = rs01.getLong("QTKTSBELF");
                /*  QTKTS1 = rs01.getLong("QTKTS1");
                 QTKTS2 = rs01.getLong("QTKTS2");
                 QTKTS3 = rs01.getLong("QTKTS3");
                 QTKTS4 = rs01.getLong("QTKTS4");
                 QTKTS5 = rs01.getLong("QTKTS5");
                 QTKTS6 = rs01.getLong("QTKTS6");*/

                AMOUNT = rs01.getDouble("VALORMIMF");
                AMOUNTMAX = rs01.getDouble("VALORMAXF");
                AMOUNTBEL = rs01.getDouble("VALORBELF");
                /* AMOUNT1 = rs01.getDouble("AMOUNT1");
                 AMOUNT2 = rs01.getDouble("AMOUNT2");
                 AMOUNT3 = rs01.getDouble("AMOUNT3");
                 AMOUNT4 = rs01.getDouble("AMOUNT4");
                 AMOUNT5 = rs01.getDouble("AMOUNT5");
                 AMOUNT6 = rs01.getDouble("AMOUNT6");*/

                //VALADM = rs01.getDouble("VALADM");
            }

            rs01.close();
            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.FlagFactor = filter.FlagFactor;
                    objRtn.FECHA = rs01.getString("DSALES");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHA);
                    objRtn.QTKTS = rs01.getLong("QTKTSMIM");
                    objRtn.QTKTSmax = rs01.getLong("QTKTSMAX");
                    objRtn.QTKTSbel = rs01.getLong("QTKTSBEL");
                    /* objRtn.QTKTS1 = rs01.getLong("QTKTS1");
                     objRtn.QTKTS2 = rs01.getLong("QTKTS2");
                     objRtn.QTKTS3 = rs01.getLong("QTKTS3");
                     objRtn.QTKTS4 = rs01.getLong("QTKTS4");
                     objRtn.QTKTS5 = rs01.getLong("QTKTS5");
                     objRtn.QTKTS6 = rs01.getLong("QTKTS6");*/

                    objRtn.AMOUNT = rs01.getDouble("VALORMIM");
                    objRtn.AMOUNTmax = rs01.getDouble("VALORMAX");
                    objRtn.AMOUNTbel = rs01.getDouble("VALORBEL");
                    /*objRtn.AMOUNT1 = rs01.getDouble("AMOUNT1");
                     objRtn.AMOUNT2 = rs01.getDouble("AMOUNT2");
                     objRtn.AMOUNT3 = rs01.getDouble("AMOUNT3");
                     objRtn.AMOUNT4 = rs01.getDouble("AMOUNT4");
                     objRtn.AMOUNT5 = rs01.getDouble("AMOUNT5");
                     objRtn.AMOUNT6 = rs01.getDouble("AMOUNT6");
                     objRtn.VALADM = rs01.getDouble("VALADM");*/

                    objRtn.lngTotQTKTS = QTKTS;
                    objRtn.lngTotQTKTSmax = QTKTSMAX;
                    objRtn.lngTotQTKTSbel = QTKTSBEL;
                    /*objRtn.lngTotQTKTS1 = QTKTS1;
                     objRtn.lngTotQTKTS2 = QTKTS2;
                     objRtn.lngTotQTKTS3 = QTKTS3;
                     objRtn.lngTotQTKTS4 = QTKTS4;
                     objRtn.lngTotQTKTS5 = QTKTS5;
                     objRtn.lngTotQTKTS6 = QTKTS6;*/

                    objRtn.dblTotAMOUNT = AMOUNT;
                    objRtn.dblTotAMOUNTmax = AMOUNTMAX;
                    objRtn.dblTotAMOUNTbel = AMOUNTBEL;
                    /*objRtn.dblTotAMOUNT1 = AMOUNT1;
                     objRtn.dblTotAMOUNT2 = AMOUNT2;
                     objRtn.dblTotAMOUNT3 = AMOUNT3;
                     objRtn.dblTotAMOUNT4 = AMOUNT4;
                     objRtn.dblTotAMOUNT5 = AMOUNT5;
                     objRtn.dblTotAMOUNT6 = AMOUNT6;
                     objRtn.totVALADM = VALADM;*/

                    objRtn.perMax = (objRtn.dblTotAMOUNTmax > 0) ? (objRtn.AMOUNTmax * 100) / objRtn.dblTotAMOUNTmax : 0;
                    objRtn.perMim = (objRtn.dblTotAMOUNT > 0) ? (objRtn.AMOUNT * 100) / objRtn.dblTotAMOUNT : 0;
                    objRtn.perBel = (objRtn.dblTotAMOUNTbel > 0) ? (objRtn.AMOUNTbel * 100) / objRtn.dblTotAMOUNTbel : 0;

                    objRtn.avgMax = (objRtn.QTKTSmax > 0) ? (objRtn.AMOUNTmax) / objRtn.QTKTSmax : 0;
                    objRtn.avgMim = (objRtn.QTKTS > 0) ? (objRtn.AMOUNT) / objRtn.QTKTS : 0;
                    objRtn.avgBel = (objRtn.QTKTSbel > 0) ? (objRtn.AMOUNTbel) / objRtn.QTKTSbel : 0;

                    lstRtn.add(objRtn);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        } finally {
            setClose(rs01, cstmt01, cnx);
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02394(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;
        long PMP = 0, PMP1 = 0;
        double RATED = 0, VALOR = 0, VALOR1 = 0, VALOREX = 0, VALORCA = 0, VALORCC = 0, VALADM = 0, VALORMIN = 0, VALORBAS = 0, DIFFNORMAL = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.SQP02394(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FECHA);
            cstmt01.setString(3, filter.IN_FLAGEX);
            cstmt01.setString(4, filter.IN_RATED);
            cstmt01.setString(5, filter.IN_TYPE);
            cstmt01.setString(6, filter.IN_ORDER);
            cstmt01.setString(7, filter.FlagFactor);
            cstmt01.setString(8, filter.CITYO);
            cstmt01.setString(9, filter.CITYD);
            cstmt01.setString(10, filter.FECR);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                PMP = rs01.getLong("PMP");
                PMP1 = rs01.getLong("PMP1");

                RATED = rs01.getDouble("RATED");
                VALOR = rs01.getDouble("VALOR");
                //VALOR1 = rs01.getDouble("VALOR1");
                //VALOREX = rs01.getDouble("VALOREX");
                //VALORCA = rs01.getDouble("VALORCA");
                //VALORCC = rs01.getDouble("VALORCC");
                // VALADM = rs01.getDouble("VALADM");
                VALORMIN = rs01.getDouble("VALORMIN");
                VALORBAS = rs01.getDouble("VALORBASE");
                DIFFNORMAL = rs01.getDouble("DIFFNORMAL");

            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF111Filter();
                    objRtn.FECHA = filter.FECHA;
                    objRtn.IN_FLAGEX = filter.IN_FLAGEX;
                    objRtn.IN_RATED = filter.IN_RATED;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_ORDER = filter.IN_ORDER;
                    objRtn.FlagFactor = filter.FlagFactor;
                    objRtn.CITYO = filter.CITYO;
                    objRtn.CITYD = filter.CITYD;
                    objRtn.SALICPN = rs01.getString("SALICPN");
                    objRtn.USEICPN = rs01.getString("USEICPN");
                    objRtn.FSAVUS = rs01.getString("FSAVUS");
                    //  objRtn.strColor = rs01.getString("strColor");
                    objRtn.strDescription1 = rs01.getString("FSAVUS");
                    objRtn.RATEPOR = rs01.getDouble("RATEPOR");
                    objRtn.CITYS = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                    objRtn.strCountry = rs01.getString("DES_COUN");
                    objRtn.DESC_ORIG = rs01.getString("DESC_ORIG") + " - " + rs01.getString("DESC_DEST");
                    objRtn.DESC_DEST = rs01.getString("DESC_A720RUTA0") + " - " + rs01.getString("DESC_A720RUTA1") + " - "
                            + rs01.getString("DESC_A720RUTA2") + " - " + rs01.getString("DESC_A720RUTA3") + " - "
                            + rs01.getString("DESC_A720RUTA4");
                    /*  objRtn.strA720CARRA1= rs01.getString("DESC_A720CARRA1");
                     objRtn.strA720CARRA2= rs01.getString("DESC_A720CARRA2");
                     objRtn.strA720CARRA3= rs01.getString("DESC_A720CARRA3");
                     objRtn.strA720CARRA4= rs01.getString("DESC_A720CARRA4");*/
                    objRtn.CLASEO = rs01.getString("CLASEO");
                    objRtn.FACRMI = rs01.getDouble("FACRMI");
                    objRtn.FACMIN = rs01.getDouble("FACMIN");
                    objRtn.FACMAX = rs01.getDouble("FACMAX");
                    objRtn.FACRBA = rs01.getDouble("FACRBA");
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strDescription = rs01.getString("DESCAGT");
                    objRtn.VENDOR = rs01.getString("VENDOR");
                    objRtn.FEAC = Functions.getMonthConvert(rs01.getString("FEAC"));;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + rs01.getString("FORMA") + rs01.getString("SERIE");
                    objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FAREBASE = rs01.getString("FAREBASE").trim();
                    objRtn.DIFFNORMAL = rs01.getDouble("DIFFNORMAL");
                    objRtn.PMP = rs01.getLong("PMP");
                    objRtn.PMP1 = rs01.getLong("PMP1");
                    objRtn.RATED = rs01.getDouble("RATED");
                    objRtn.CURRENC = rs01.getString("CURRENC");
                    objRtn.VALOR = rs01.getDouble("VALOR");

                    objRtn.A720VALOR1 = rs01.getDouble("A720VALOR1");
                    objRtn.A720VALOR2 = rs01.getDouble("A720VALOR2");
                    objRtn.A720VALOR3 = rs01.getDouble("A720VALOR3");
                    objRtn.A720VALOR4 = rs01.getDouble("A720VALOR4");
                    objRtn.A720FACT1 = rs01.getLong("A720FACT1");
                    objRtn.A720FACT2 = rs01.getLong("A720FACT2");
                    objRtn.A720FACT3 = rs01.getLong("A720FACT3");
                    objRtn.A720FACT4 = rs01.getLong("A720FACT4");
                    /* objRtn.A720FBUSO1 = rs01.getString("A720FBUSO1");
                     objRtn.A720FBUSO2 = rs01.getString("A720FBUSO2");
                     objRtn.A720FBUSO3 = rs01.getString("A720FBUSO3");
                     objRtn.A720FBUSO4 = rs01.getString("A720FBUSO4");*/
                    objRtn.A720CARRA1 = rs01.getString("A720CARRA1");
                    objRtn.A720CARRA2 = rs01.getString("A720CARRA2");
                    objRtn.A720CARRA3 = rs01.getString("A720CARRA3");
                    objRtn.A720CARRA4 = rs01.getString("A720CARRA4");

                    if (objRtn.A720VALOR1 > 0) {
                        objRtn.strA720VALOR1 = nfDbl.format(objRtn.A720VALOR1);
                    }
                    if (objRtn.A720VALOR2 > 0) {
                        objRtn.strA720VALOR2 = nfDbl.format(objRtn.A720VALOR2);
                    }
                    if (objRtn.A720VALOR3 > 0) {
                        objRtn.strA720VALOR3 = nfDbl.format(objRtn.A720VALOR3);
                    }
                    if (objRtn.A720VALOR4 > 0) {
                        objRtn.strA720VALOR4 = nfDbl.format(objRtn.A720VALOR4);
                    }

                    if (objRtn.A720FACT1 > 0) {
                        objRtn.strA720FACT1 = nfLng.format(objRtn.A720FACT1);
                    }
                    if (objRtn.A720FACT2 > 0) {
                        objRtn.strA720FACT2 = nfLng.format(objRtn.A720FACT2);
                    }
                    if (objRtn.A720FACT3 > 0) {
                        objRtn.strA720FACT3 = nfLng.format(objRtn.A720FACT3);
                    }
                    if (objRtn.A720FACT4 > 0) {
                        objRtn.strA720FACT4 = nfLng.format(objRtn.A720FACT4);
                    }

                    objRtn.rout = rs01.getString("A720RUTA0") + " - " + rs01.getString("A720RUTA1") + " - "
                            + rs01.getString("A720RUTA2") + " - " + rs01.getString("A720RUTA3") + " - " + rs01.getString("A720RUTA4");
                    objRtn.totvalor01 = rs01.getDouble("A720VALOR1") + rs01.getDouble("A720VALOR2")
                            + rs01.getDouble("A720VALOR3") + rs01.getDouble("A720VALOR4");
                    objRtn.totmilla01 = rs01.getLong("A720FACT1") + rs01.getLong("A720FACT2") + rs01.getLong("A720FACT3")
                            + rs01.getLong("A720FACT4");
                    //   objRtn.VALOR1 = rs01.getDouble("VALOR1");
                    //   objRtn.VALOREX = rs01.getDouble("VALOREX");
                    //   objRtn.VALORCA = rs01.getDouble("VALORCA");
                    //   objRtn.VALORCC = rs01.getDouble("VALORCC");
                    //   objRtn.EXCHAN = rs01.getString("EXCHAN");
                    //   objRtn.VALADM = rs01.getDouble("VALADM");

                    objRtn.VALORMIN = rs01.getDouble("VALORMIN");
                    objRtn.VALORBAS = rs01.getDouble("VALORBASE");
                    objRtn.strDescription2 = rs01.getString("CANAVS").trim();
                    /*if (objRtn.CANAV.equals("B")) {
                     objRtn.strDescription2 = "BSP";
                     } else if (objRtn.CANAV.equals("A")) {
                     objRtn.strDescription2 = "ARC";
                     } else if (objRtn.CANAV.equals("S")) {
                     objRtn.strDescription2 = "ASR";
                     } else if (objRtn.CANAV.equals("T")) {
                     objRtn.strDescription2 = "TCN";
                     }*/

                    if (rs01.getString("CANAVS").trim().equals("ASR")) {
                        if (rs01.getString("TDOC").equals("INT")) {
                            objRtn.TDOC = "WEB";
                        } else {
                            objRtn.TDOC = rs01.getString("TDOC");
                        }
                    } else {
                        objRtn.TDOC = "";
                    }
                    objRtn.totPMP = PMP;
                    objRtn.totPMP1 = PMP1;
                    objRtn.totRATED = RATED;
                    objRtn.totVALOR = VALOR;
                    objRtn.totVALOR1 = VALOR1;
                    objRtn.totVALOREX = VALOREX;
                    objRtn.totVALORCA = VALORCA;
                    objRtn.totVALORCC = VALORCC;
                    objRtn.totVALADM = VALADM;

                    objRtn.totVALORBAS = VALORBAS;
                    objRtn.totVALORMIN = VALORMIN;
                    objRtn.totVALORMAX = DIFFNORMAL;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }

    public List<IMF111Filter> loadPX414SQP02395(IMF111Filter filter) throws SQLException, Exception {

        List<IMF111Filter> lstRtn = new ArrayList<IMF111Filter>(0);
        IMF111Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02395(?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_AGENTE);
            cstmt01.setString(5, filter.IN_TKT);
            cstmt01.setString(6, filter.IN_TYPE);
            cstmt01.setString(7, filter.IN_ORDER);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new IMF111Filter();
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_AGENTE = filter.IN_AGENTE;
                objRtn.IN_TKT = filter.IN_TKT;
                objRtn.IN_TYPE = filter.IN_TYPE;
                objRtn.IN_ORDER = filter.IN_ORDER;

                objRtn.RATEPOR = rs01.getDouble("RATEPOR");
                objRtn.SALICPN = rs01.getString("SALICPN");
                objRtn.USEICPN = rs01.getString("USEICPN");
                objRtn.DSALES = rs01.getString("DSALES");
                objRtn.CITYS = rs01.getString("CITYO") + " - " + rs01.getString("CITYD");
                objRtn.DESC_ORIG = rs01.getString("DESC_ORIG") + "-" + rs01.getString("DESC_DEST");
                objRtn.COUNTRYS = rs01.getString("COUNTRYS");
                objRtn.strCountry = rs01.getString("DES_COUN");
                objRtn.CLASEO = rs01.getString("CLASEO");
                objRtn.FACRMI = rs01.getDouble("FACRMI");
                objRtn.FACMIN = rs01.getDouble("FACMIN");
                objRtn.FACMAX = rs01.getDouble("FACMAX");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);
                objRtn.VENDOR = rs01.getString("VENDOR");
                objRtn.strDescription = rs01.getString("DESCAGT");
                objRtn.strDescription1 = rs01.getString("TIPOFAC");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.TKT = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");

                objRtn.PMP = rs01.getLong("PMP");
                objRtn.PMP1 = rs01.getLong("PMP1");
                objRtn.RATED = rs01.getDouble("RATED");
                objRtn.CURRENC = rs01.getString("CURRENC");
                objRtn.VALOR = rs01.getDouble("VALOR");
                objRtn.VALOR1 = rs01.getDouble("VALOR1");
                objRtn.VALOREX = rs01.getDouble("VALOREX");
                objRtn.VALORCA = rs01.getDouble("VALORCA");
                objRtn.VALORCC = rs01.getDouble("VALORCC");
                objRtn.FACRBA = rs01.getDouble("FACRBA");
                objRtn.EXCHAN = rs01.getString("EXCHAN");
                objRtn.VALADM = rs01.getDouble("VALADM");
                objRtn.FAREBASE = rs01.getString("FAREBASE").trim();
                objRtn.DIFFNORMAL = rs01.getDouble("DIFFNORMAL");
                objRtn.VALORMIN = rs01.getDouble("VALORMIN");
                objRtn.VALORBAS = rs01.getDouble("VALORBASE");
                objRtn.CANAV = rs01.getString("CANAV").trim();
                if (objRtn.CANAV.equals("B")) {
                    objRtn.strDescription2 = "BSP";
                } else if (objRtn.CANAV.equals("A")) {
                    objRtn.strDescription2 = "ARC";
                } else if (objRtn.CANAV.equals("S")) {
                    objRtn.strDescription2 = "ASR";
                } else if (objRtn.CANAV.equals("T")) {
                    objRtn.strDescription2 = "TCN";
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            setClose(rs01, cstmt01, cnx);
        }

        return lstRtn;
    }
    
    // =========================================================================
    // ================= SALES AGENT CONTROL ===================================
    // =========================================================================    

    public List<WRF016Filterwk> loadPX109SQP01230_MESES(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int CP1 = 0, CP2 = 0, CP3 = 0, CP4 = 0, CP5 = 0, CP6 = 0, TKT1 = 0, TKT2 = 0, TKT3 = 0, TKT4 = 0, TKT5 = 0, TKT6 = 0;
        double AMT1 = 0, AMT2 = 0, AMT3 = 0, AMT4 = 0, AMT5 = 0, AMT6 = 0, TOTVAR = 0, TOTGEN = 0, PROMEDIO = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01230(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.execute();
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M1");
                CP1 = rst.getInt("C1");
                TKT1 = rst.getInt("T1");
                AMT2 = rst.getDouble("M2");
                CP2 = rst.getInt("C2");
                TKT2 = rst.getInt("T2");
                AMT3 = rst.getDouble("M3");
                CP3 = rst.getInt("C3");
                TKT3 = rst.getInt("T3");
                AMT4 = rst.getDouble("M4");
                CP4 = rst.getInt("C4");
                TKT4 = rst.getInt("T4");
                AMT5 = rst.getDouble("M5");
                CP5 = rst.getInt("C5");
                TKT5 = rst.getInt("T5");
                AMT6 = rst.getDouble("M6");
                CP6 = rst.getInt("C6");
                TKT6 = rst.getInt("T6");
                //TOTGEN = rst.getDouble("TOTGEN");
                PROMEDIO = rst.getDouble("PROMEDIO");
                TOTVAR = rst.getDouble("TOTVAR");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("CODTRAN");

                    objRtn.Aud1 = rst.getDouble("M1");
                    objRtn.Rej1 = rst.getInt("C1");
                    objRtn.Sup1 = rst.getInt("T1");

                    objRtn.Aud2 = rst.getDouble("M2");
                    objRtn.Rej2 = rst.getInt("C2");
                    objRtn.Sup2 = rst.getInt("T2");

                    objRtn.Aud3 = rst.getDouble("M3");
                    objRtn.Rej3 = rst.getInt("C3");
                    objRtn.Sup3 = rst.getInt("T3");

                    objRtn.Aud4 = rst.getDouble("M4");
                    objRtn.Rej4 = rst.getInt("C4");
                    objRtn.Sup4 = rst.getInt("T4");

                    objRtn.Aud5 = rst.getDouble("M5");
                    objRtn.Rej5 = rst.getInt("C5");
                    objRtn.Sup5 = rst.getInt("T5");

                    objRtn.Aud6 = rst.getDouble("M6");
                    objRtn.Rej6 = rst.getInt("C6");
                    objRtn.Sup6 = rst.getInt("T6");

                    objRtn.Rate1 = rst.getDouble("DIFF");
                    objRtn.Rate2 = rst.getDouble("PROMEDIO");
                    objRtn.Rate3 = rst.getDouble("VAR");

                    //objRtn.Rate4 = TOTGEN;
                    objRtn.Rate5 = PROMEDIO;
                    objRtn.Rate6 = TOTVAR;

                    objRtn.dblPerRev = (AMT6 > 0) ? objRtn.Aud6 * 100 / AMT6 : 0;//Porcentajes del último mes
                    if (objRtn.dblPerRev < 0) {
                        objRtn.dblPerRev = objRtn.dblPerRev * -1;
                    }

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = CP1;
                    objRtn.totSup1 = TKT1;
                    objRtn.totNet2 = AMT2;
                    objRtn.totRej2 = CP2;
                    objRtn.totSup2 = TKT2;
                    objRtn.totNet3 = AMT3;
                    objRtn.totRej3 = CP3;
                    objRtn.totSup3 = TKT3;
                    objRtn.totNet4 = AMT4;
                    objRtn.totRej4 = CP4;
                    objRtn.totSup4 = TKT4;
                    objRtn.totNet5 = AMT5;
                    objRtn.totRej5 = CP5;
                    objRtn.totSup5 = TKT5;
                    objRtn.totNet6 = AMT6;
                    objRtn.totRej6 = CP6;
                    objRtn.totSup6 = TKT6;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    lista.add(objRtn);
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
    
    public List<WRF016Filterwk> loadPX109SQP02476_COUNTRY(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1 = 0;
        int REJ1 = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02476(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M6");
                REJ1 = rst.getInt("C6");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("COUNTRYS");
                    objRtn.strCountryName = rst.getString("DESCRIP");
                    objRtn.TDOC = rst.getString("TRNCU");
                    objRtn.FMETHOD = rst.getString("CANAV");
                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Rej1 = rst.getInt("C6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = REJ1;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
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
    
    
    public List<WRF016Filterwk> loadPX109SQP01232_COUNTRY(DashboardFilter filter) throws SQLException, Exception {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1 = 0;
        String mes1 = "", mes2 = "", mes3 = "", mes4 = "", mes5 = "", mes6 = "", fec_actual = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01232(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PAIS);
            cstmt.setString(5, filter.strTIPO);
            cstmt.setString(6, filter.FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                AMT1 = rst.getDouble("M6");

            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("COUNTRYS");
                    objRtn.strFlag = rst.getString("DESCRIP");

                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");

                    objRtn.totNet1 = AMT1;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
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

    
    // =========================================================================
    // ======================= Difference Fare =================================
    // =========================================================================

    public List<IMF121Filter> loadPX414SQPGG121(IMF121Filter filter) throws SQLException, Exception {

        List<IMF121Filter> lstRtn = new ArrayList<>(0);
        IMF121Filter objRtn;
        long QTKTSH = 0;
        double VALORH = 0;
        long QTKTSL = 0;
        double VALORL = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.GG121(?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);

            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            System.out.println(filter.DSALES);
            System.out.println("");
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTSH = rs01.getLong("QTKTSH");
                VALORH = rs01.getDouble("VALORH");
                QTKTSL = rs01.getLong("QTKTSL");
                VALORL = rs01.getDouble("VALORL");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF121Filter();
                    objRtn.DSALES = rs01.getString("DSALES").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DSALES);

                    objRtn.QTTKT = rs01.getLong("QTKTSH") + rs01.getLong("QTKTSL");
                    objRtn.VALORT = rs01.getDouble("VALORH") + rs01.getDouble("VALORL");

                    objRtn.QTKTSH = rs01.getLong("QTKTSH");
                    objRtn.QTKTSL = rs01.getLong("QTKTSL");
                    objRtn.VALORH = rs01.getDouble("VALORH");
                    objRtn.VALORL = rs01.getDouble("VALORL");

                    objRtn.totQTKTSH = QTKTSH;
                    objRtn.totQTKTSL = QTKTSL;
                    objRtn.totVALORH = VALORH;
                    objRtn.totVALORL = VALORL;

                    objRtn.totQTTKT = QTKTSH + QTKTSL;
                    objRtn.totVALORT = VALORH + VALORL;

//                    objRtn.page.PAGNUM = filter.page.PAGNUM;
//                    objRtn.page.PAGROW = filter.page.PAGROW;
//                    objRtn.page.TOTPAG = filter.page.TOTPAG;
//                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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

    public List<IMF121Filter> loadPX414SQPGG122(IMF121Filter filter) throws SQLException, Exception  {

        List<IMF121Filter> lstRtn = new ArrayList<>(0);
        IMF121Filter objRtn;
        long QTKTSH = 0;
        double VALORH = 0;
        long QTKTSL = 0;
        double VALORL = 0;
        String strTitulo = "Sales Date : " + filter.strFormatDate;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        String SQLCLL01 = "{CALL PRAXIS.GG122(?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DSALES.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                QTKTSH = rs01.getLong("QTKTSH");
                VALORH = rs01.getDouble("VALORH");
                QTKTSL = rs01.getLong("QTKTSL");
                VALORL = rs01.getDouble("VALORL");
            }

            rs01.close();

            if (cstmt01.getMoreResults()) {

                rs01 = cstmt01.getResultSet();

                while (rs01.next()) {

                    objRtn = new IMF121Filter();
                    objRtn.COUNTRYS = rs01.getString("COUNTRYS").trim();
                    objRtn.strTitulo = strTitulo;

                    objRtn.QTTKT = rs01.getLong("QTKTSH") + rs01.getLong("QTKTSL");
                    objRtn.VALORT = rs01.getLong("VALORH") + rs01.getLong("VALORL");

                    objRtn.QTKTSH = rs01.getLong("QTKTSH");
                    objRtn.QTKTSL = rs01.getLong("QTKTSL");
                    objRtn.VALORH = rs01.getLong("VALORH");
                    objRtn.VALORL = rs01.getLong("VALORL");

                    objRtn.totQTKTSH = QTKTSH;
                    objRtn.totQTKTSL = QTKTSL;
                    objRtn.totVALORH = VALORH;
                    objRtn.totVALORL = VALORL;

                    objRtn.totQTTKT = QTKTSH + QTKTSL;
                    objRtn.totVALORT = VALORH + VALORL;

                    lstRtn.add(objRtn);
                }
            }

        } catch (SQLException e) {
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        } catch (Exception e) {

        }

    }

}
