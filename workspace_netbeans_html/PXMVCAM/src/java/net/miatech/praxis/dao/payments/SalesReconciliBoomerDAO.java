/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2324Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;



public class SalesReconciliBoomerDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesReconciliBoomerDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReconciliBoomerDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    
    
    public List<A2324Filter> loadPX559SQP04021(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        long totSVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04021(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

//            cstmt.registerOutParameter(13, Types.INTEGER);
//            cstmt.registerOutParameter(14, Types.INTEGER);
//            cstmt.registerOutParameter(15, Types.INTEGER);
//            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strFecFiltro);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_TDOC.trim());
//            cstmt.setString(6, filter.IN_PAYMENT.trim());
//            cstmt.setString(7, filter.IN_BANK);
//            cstmt.setString(8, filter.IN_CARDC.trim());
//            //cstmt.setString(9, filter.IN_CARDN.trim());
//            cstmt.setString(9, filter.IN_CARDN1.trim());
//            cstmt.setString(10, filter.IN_CARDN2.trim());
//            cstmt.setString(11, filter.IN_MERCHN.trim());
//            cstmt.setString(12, filter.IN_AGENT.trim());

//            cstmt.setInt(13, filter.page.PAGNUM);
//            cstmt.setInt(14, filter.page.PAGROW);
//            cstmt.setInt(15, filter.page.TOTPAG);
//            cstmt.setInt(16, filter.page.TOTROW);
            cstmt.execute();

//            filter.page.PAGNUM = cstmt.getInt(13);
//            filter.page.PAGROW = cstmt.getInt(14);
//            filter.page.TOTPAG = cstmt.getInt(15);
//            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totSVFOP = rst.getLong("SVFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    beanTkt = new A2324Filter();
                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
                    beanTkt.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    beanTkt.IN_FECHA_TO = filter.IN_FECHA_TO.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    
                    
//                    beanTkt.DATE = rst.getString("DATE").trim();
                    
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if(beanTkt.STVAL.equals("1")){
                        beanTkt.desSTVAL = "Match";
                    }else if(beanTkt.STVAL.equals("2")){
                        beanTkt.desSTVAL = "Payment SB w/o Sales";
                    }else if(beanTkt.STVAL.equals("3")){
                        beanTkt.desSTVAL = "Sales w/o Payment SB";
                    }else if(beanTkt.STVAL.equals("4")){
                        beanTkt.desSTVAL = "Match Difference";
                    }else{
                        beanTkt.desSTVAL = "";
                    }
                    beanTkt.REFNBR = rst.getString("REFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                    beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                    beanTkt.SVFOP = rst.getLong("SVFOP");

                    beanTkt.totSVFOP = totSVFOP;

//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstTkts;
    }
    
    public List<A2324Filter> loadPX559SQP04020(A2324Filter filter) throws SQLException, Exception {

        List<A2324Filter> lstTkts = new ArrayList<A2324Filter>(0);
        A2324Filter beanTkt;
        long lngTotCant = 0, lngQtyDoc = 0;
        double dblSVFOP = 0;
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("1", "Accepted");
        hmDescEstados.put("2", "Rejected");
        hmDescEstados.put("3", "Suspect");

        String estado = "", strTitulo = "";
        HashMap<String, String> hmDescEstadosTit = new HashMap<String, String>();
        hmDescEstadosTit.put("1", "Accepted");
        hmDescEstadosTit.put("2", "Rejected");
        hmDescEstadosTit.put("3", "Suspect");
        hmDescEstadosTit.put("P", "Paying w/o Sales");
        hmDescEstadosTit.put("C", "Clarifications");
        hmDescEstadosTit.put("H", "Chargebacks");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04020(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PNR);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
//                lngTotCant += rst.getLong("CANT");
//                lngQtyDoc += rst.getLong("QTYDOC");
//                dblSVFOP += rst.getDouble("SVFOP");

                beanTkt = new A2324Filter();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.SDATE = rst.getString("SDATE").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if(beanTkt.STVAL.equals("1")){
                    beanTkt.desSTVAL = "Match";
                }else if(beanTkt.STVAL.equals("2")){
                    beanTkt.desSTVAL = "Payment SB w/o Sales";
                }else if(beanTkt.STVAL.equals("3")){
                    beanTkt.desSTVAL = "Sales w/o Payment SB";
                }else if(beanTkt.STVAL.equals("4")){
                    beanTkt.desSTVAL = "Match Difference";
                }else{
                    beanTkt.desSTVAL = "";
                }
                beanTkt.REFNBR = rst.getString("REFNBR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.TIPOTAR = rst.getString("TIPOTAR").trim();
                beanTkt.CODEBANK = rst.getString("CODEBANK").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("SDATE").trim());

                beanTkt.SVFOP = rst.getLong("SVFOP");
//                    beanTkt.totSVFOP = totSVFOP;

                lstTkts.add(beanTkt);
            }
            rst.close();

//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    beanTkt = new A2324Filter();
//                    beanTkt.strFecFiltro = filter.strFecFiltro.trim();
//                    beanTkt.strFormatDate = filter.strFormatDate.trim();
//                    beanTkt.IN_SDATE = filter.IN_SDATE.trim();
//                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
//                    beanTkt.IN_CARDN1 = filter.IN_CARDN1.trim();
//                    beanTkt.IN_CARDN2 = filter.IN_CARDN2.trim();
//                    beanTkt.IN_CARDC = filter.IN_CARDC.trim();
//                    beanTkt.IN_STVAL = filter.IN_STVAL.trim();
//                    beanTkt.IN_BSTVAL = filter.IN_BSTVAL.trim();
//                    beanTkt.SCARCOD = filter.SCARCOD.trim();
//                    beanTkt.strDescCard = filter.strDescCard.trim();
//                    beanTkt.SORIG = filter.SORIG.trim();
//                    beanTkt.IN_MERCHN = filter.IN_MERCHN.trim();
//                    beanTkt.IN_AGENT = filter.IN_AGENT.trim();
//                    beanTkt.IN_BANK = filter.IN_BANK.trim();
//
//                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
//                    beanTkt.CCIA = rst.getString("CCIA").trim();
//                    beanTkt.FORMA = rst.getString("FORMA").trim();
//                    beanTkt.SERIE = rst.getString("SERIE").trim();
//
//                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
//                    //beanTkt.strDescStatus = rst.getString("NOMAGENT").trim();
//                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
//                    if (beanTkt.strPEM.trim().equals("01")) {
//                        beanTkt.strPEM = "Manual";
//                    } else if (beanTkt.strPEM.trim().equals("05")) {
//                        beanTkt.strPEM = "Chip EMV";
//                    } else if (beanTkt.strPEM.trim().equals("80")) {
//                        beanTkt.strPEM = "Fallback";
//                    } else if (beanTkt.strPEM.trim().equals("90")) {
//                        beanTkt.strPEM = "Deslizada";
//                    }
//                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
//                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
//                    beanTkt.strSCARDN = Functions.enmascararNumTarjeta(rst.getString("SCARDN").trim(), "");
//                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
//                    beanTkt.SVFOP = rst.getDouble("SVFOP");
//                    //beanTkt.lngQTYDOC = rst.getLong("QTYDOC");
//                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
//                    //beanTkt.strDescCountry = rst.getString("NAMES").trim();
//
//                    beanTkt.TDOC = rst.getString("TDOC").trim();
//                    beanTkt.SDATE = rst.getString("SDATE").trim();
//                    if (beanTkt.strFLOAD.trim().equals("M")) {
//                        beanTkt.strFLOAD = "Manual";
//                    }
//                    /*beanTkt.MERCHN = rst.getString("MERCHN").trim();
//                    if (rst.getString("NMERCHN") != null && !rst.getString("NMERCHN").trim().equals("-")) {
//                        beanTkt.strDescMerchn = rst.getString("NMERCHN").trim();
//                    }*/
//
//                    //**********************************************************
//                    if (!filter.IN_BSTVAL.trim().equals("")) {
//                        estado = hmDescEstadosTit.get(beanTkt.IN_BSTVAL).toString();
//                    }
//
//                    if (filter.IN_STVAL.trim().equals("1")) {
//                        estado = "Match";
//                    } else if (filter.IN_STVAL.trim().equals("2")) {
//                        estado = "Settlement w/o Paying";
//                    } else if (filter.IN_STVAL.trim().equals("3")) {
//                        estado = "Paying w/o Settlement";
//                    } /*else if (filter.IN_STVAL.trim().equals("4")) {
//                     estado = "Match with Differences";
//                     } */ else if (filter.IN_STVAL.trim().equals("4")) {
//                        estado = "Match Manual";
//                    }
//
//                    strTitulo += beanTkt.SDATE + " - Card : " + beanTkt.SCARCOD + " : " + beanTkt.strDescCard + " *** " + estado + " ***";
//                    beanTkt.strTitulo = strTitulo;
//
//                    beanTkt.REFBOOMER = rst.getString("REFBOOMER").trim();
//                    beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
//                    beanTkt.DAMOUNT = rst.getDouble("DAMOUNT");
//                    beanTkt.BCURRENCY = rst.getString("BCURRENCY").trim();
//                    beanTkt.BCARCOD = rst.getString("BCARCOD").trim();
//                    beanTkt.BCARDN = rst.getString("BCARDN").trim();
//                    /*if (rst.getString("DESCERROR") != null && !rst.getString("DESCERROR").trim().equals("")) {
//                        beanTkt.strDescripcion = rst.getString("CERROR").trim() + " : " + rst.getString("DESCERROR").trim();
//                    } else {
//                        beanTkt.strDescripcion = "(**) : (Empty)";
//                    }*/
//                    
//                    beanTkt.SPNR = rst.getString("SPNR").trim();
//                    
//                    beanTkt.lngTotQACCB = lngTotCant;
//                    beanTkt.lngTotQTYDOC = lngQtyDoc;
//                    beanTkt.dblTotSVFOP = dblSVFOP;
//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
//
//                    lstTkts.add(beanTkt);
//                }
//                rst.close();
//            }

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

        return lstTkts;
    }
    
   
    
}
