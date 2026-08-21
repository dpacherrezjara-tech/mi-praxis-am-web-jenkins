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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A3676Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.old.ExcelChargeBack;
import net.miatech.praxis.payment.old.A2280Filter;
import net.miatech.praxis.payment.old.A2290Filter;
import net.miatech.praxis.payment.old.A2331Filter;
import net.miatech.praxis.payment.old.A2345Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class DataRequestedByDateDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DataRequestedByDateDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DataRequestedByDateDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2331Filter> loadPX573SQP04266(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        HashMap hmDescCRULE = new HashMap();
        hmDescCRULE.put("", "");
        hmDescCRULE.put("01", "Total");
        hmDescCRULE.put("02", "Parcial");
        hmDescCRULE.put("03", "Ya usado");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        int contador = 0;
        String MERCHANT = "", SCARCOD = "", CARDNBR = "", AUTHNBR = "", PNR = "";
        boolean color = true;

        long QTKT = 0, QLINK = 0, QCARD = 0, QNOT = 0, QNMATCH = 0;
        double AUTAMOUNT = 0, VFOP = 0, ANOT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04266(?,?,?,?,?,?,?,?,?,?,?,?)}";
        System.out.println("Ejecutando ----> " + SQLCLL01);
        System.out.println(filter.page.PAGNUM);
        System.out.println(filter.page.PAGROW);
        System.out.println(filter.page.TOTPAG);
        System.out.println(filter.page.TOTROW);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TKT.trim());
            cstmt.setString(6, filter.IN_PNR.trim());
            cstmt.setString(7, filter.IN_SCARDN1.trim() + '%' + filter.IN_SCARDN2.trim() + '%');
            cstmt.setString(8, filter.IN_AUTH.trim());
            
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            while (rs01.next()) {
                objRtn = new A2331Filter();

                if (contador == 0) {
                    MERCHANT = rs01.getString("MERCHN").trim();
                    SCARCOD = rs01.getString("SCARCOD").trim();
                    CARDNBR = rs01.getString("CARDNBR").trim();
                    AUTHNBR = rs01.getString("AUTHNBR").trim();
                    PNR = rs01.getString("PNR").trim();
                }

                objRtn.IN_DATE = filter.IN_DATE;
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                objRtn.DATE = rs01.getString(filter.IN_DATE.trim()).trim();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.IATADATE = rs01.getString("IATADATE").trim();
                objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.DATEN = rs01.getString("DATEN").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();                
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.TICKET = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();
                if (hmDescSTVAL.containsKey(objRtn.STVAL)) {
                    objRtn.descSTVAL = hmDescSTVAL.get(objRtn.STVAL).toString();
                } else {
                    objRtn.descSTVAL = objRtn.STVAL;
                }								

                objRtn.INDCPN = rs01.getString("INDCPN").trim();
                objRtn.STUSO = rs01.getString("STUSO").trim();
                objRtn.INDCPNS = rs01.getString("INDCPNS").trim();
                objRtn.DATSABF = rs01.getString("DATSABF").trim();
                objRtn.INDCPNSL = rs01.getString("INDCPNSL").trim();
                objRtn.STUSOS = rs01.getString("STUSOS").trim();
                objRtn.DATSABL = rs01.getString("DATSABL").trim();
                objRtn.FSELEC = rs01.getString("FSELEC").trim();
                objRtn.FECSELEC = rs01.getString("FECSELEC").trim();
                objRtn.FVCTO = rs01.getString("FVCTO").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.IDCON = rs01.getString("IDCON").trim();
                objRtn.DATAPLICA = rs01.getString("DATAPLICA").trim();
                objRtn.CRULE = rs01.getString("CRULE").trim();
                objRtn.MFOP = rs01.getString("MFOP").trim();
                objRtn.FOLIO = rs01.getString("FOLIO").trim();
                
                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();
                objRtn.VFOP = rs01.getDouble("VFOP");    
                if (contador == 0) {
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                } else if (MERCHANT.equals(rs01.getString("MERCHN").trim())
                        & SCARCOD.equals(rs01.getString("SCARCOD").trim())
                        & CARDNBR.equals(rs01.getString("CARDNBR").trim())
                        & AUTHNBR.equals(rs01.getString("AUTHNBR").trim())
                        & PNR.equals(rs01.getString("PNR").trim())) {
                    objRtn.AUTAMOUNT = 0;
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                } else {
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    MERCHANT = rs01.getString("MERCHN").trim();
                    SCARCOD = rs01.getString("SCARCOD").trim();
                    CARDNBR = rs01.getString("CARDNBR").trim();
                    AUTHNBR = rs01.getString("AUTHNBR").trim();
                    PNR = rs01.getString("PNR").trim();

                    color = !color;
                }

                objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                objRtn.PNR = rs01.getString("PNR").trim();

                if (color) {
                    objRtn.COLOR = "#91b9fa";
                } else {
                    objRtn.COLOR = "#e6ecf5";
                }
                
                objRtn.FSELECX = rs01.getString("FSELECX").trim();
                if (objRtn.FSELECX.equals("1")) {
                    objRtn.FSELECX = "Y";
                } else {
                    objRtn.FSELECX = "";
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);
                contador++;
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

    public List<A3676Filter> loadPX573SQP04276(A3676Filter filter) throws SQLException, Exception {

        List<A3676Filter> list = new ArrayList<A3676Filter>();
        A3676Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        HashMap hmDescCRULE = new HashMap();
        hmDescCRULE.put("", "");
        hmDescCRULE.put("01", "Total");
        hmDescCRULE.put("02", "Parcial");
        hmDescCRULE.put("03", "Ya usado");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04276(?,?,?,?,?,?,?,?)}";
        System.out.println("Ejecutando ----> " + SQLCLL01);
        System.out.println(filter.page.PAGNUM);
        System.out.println(filter.page.PAGROW);
        System.out.println(filter.page.TOTPAG);
        System.out.println(filter.page.TOTROW);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM.trim());
            cstmt.setString(3, filter.IN_DATETO.trim());
            cstmt.setString(4, filter.IN_TKT.trim());
            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            while (rs01.next()) {

                objRtn = new A3676Filter();
                objRtn.IN_DATEFROM = filter.IN_DATEFROM;
                objRtn.IN_DATETO = filter.IN_DATETO;

                objRtn.A3676FRECE = rs01.getString("A3676FRECE").trim();
                objRtn.A3676CIA = rs01.getString("A3676CIA").trim();
                objRtn.A3676FORMA = rs01.getString("A3676FORMA").trim();
                objRtn.A3676SERIE = rs01.getString("A3676SERIE").trim();
                objRtn.TICKET = objRtn.A3676CIA + objRtn.A3676FORMA + objRtn.A3676SERIE;
                objRtn.A3676CUPON = rs01.getString("A3676CUPON").trim();
                objRtn.A3676SEQ = rs01.getString("A3676SEQ").trim();
                objRtn.A3676STCON = rs01.getString("A3676STCON").trim();
                objRtn.A3676STROB = rs01.getString("A3676STROB").trim();
                objRtn.A3676CUR = rs01.getString("A3676CUR").trim();
                objRtn.A3676MONTO = rs01.getDouble("A3676MONTO");
                objRtn.A3676CPNRB = rs01.getString("A3676CPNRB").trim();
                objRtn.A3676CURRB = rs01.getString("A3676CURRB").trim();
                objRtn.A3676MONRB = rs01.getDouble("A3676MONRB");
                objRtn.A3676STINI = rs01.getString("A3676STINI").trim();
                objRtn.A3676STFIN = rs01.getString("A3676STINI").trim();
                objRtn.A3676DESCR = rs01.getString("A3676DESCR").trim();
                objRtn.A3676RESUL = rs01.getString("A3676RESUL").trim();
                objRtn.A3676REFER = rs01.getString("A3676REFER").trim();
                objRtn.A3676REFRB = rs01.getString("A3676REFRB").trim();

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

    public List<A2331Filter> loadPX573SQP04287(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        HashMap hmDescCRULE = new HashMap();
        hmDescCRULE.put("", "");
        hmDescCRULE.put("01", "Total");
        hmDescCRULE.put("02", "Parcial");
        hmDescCRULE.put("03", "Ya usado");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        int contador = 0;
        String MERCHANT = "", SCARCOD = "", CARDNBR = "", AUTHNBR = "", PNR = "";
        boolean color = true;

        long QTKT = 0, QLINK = 0, QCARD = 0, QNOT = 0, QNMATCH = 0;
        double AUTAMOUNT = 0, VFOP = 0, ANOT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04287(?,?,?,?,?,?,?,?,?,?,?,?)}";
        System.out.println("Ejecutando ----> " + SQLCLL01);
        System.out.println(filter.page.PAGNUM);
        System.out.println(filter.page.PAGROW);
        System.out.println(filter.page.TOTPAG);
        System.out.println(filter.page.TOTROW);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.IN_FECHA_FROM.trim());
            cstmt.setString(4, filter.IN_FECHA_TO.trim());
            cstmt.setString(5, filter.IN_TKT.trim());
            cstmt.setString(6, filter.IN_PNR.trim());
            cstmt.setString(7, filter.IN_SCARDN1.trim() + '%' + filter.IN_SCARDN2.trim() + '%');
            cstmt.setString(8, filter.IN_AUTH.trim());
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            while (rs01.next()) {
                objRtn = new A2331Filter();

                if (contador == 0) {
                    MERCHANT = rs01.getString("MERCHN").trim();
                    SCARCOD = rs01.getString("SCARCOD").trim();
                    CARDNBR = rs01.getString("CARDNBR").trim();
                    AUTHNBR = rs01.getString("AUTHNBR").trim();
                    PNR = rs01.getString("PNR").trim();
                }

                objRtn.IN_DATE = filter.IN_DATE;
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                objRtn.DATE = rs01.getString(filter.IN_DATE.trim()).trim();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.IATADATE = rs01.getString("IATADATE").trim();
                objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.DATEN = rs01.getString("DATEN").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();
                objRtn.MFOP = rs01.getString("MFOP").trim();
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.TICKET = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();
                //								

                objRtn.INDCPN = rs01.getString("INDCPN").trim();
                objRtn.STUSO = rs01.getString("STUSO").trim();
                objRtn.INDCPNS = rs01.getString("INDCPNS").trim();
                objRtn.DATSABF = rs01.getString("DATSABF").trim();
                objRtn.INDCPNSL = rs01.getString("INDCPNSL").trim();
                objRtn.STUSOS = rs01.getString("STUSOS").trim();
                objRtn.DATSABL = rs01.getString("DATSABL").trim();
                objRtn.FSELEC = rs01.getString("FSELEC").trim();
                objRtn.FECSELEC = rs01.getString("FECSELEC").trim();
                objRtn.FVCTO = rs01.getString("FVCTO").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.IDCON = rs01.getString("IDCON").trim();
                objRtn.DATAPLICA = rs01.getString("DATAPLICA").trim();
                objRtn.CRULE = rs01.getString("CRULE").trim();
                if (hmDescCRULE.containsKey(objRtn.CRULE)) {
                    objRtn.strDescCRULE = hmDescCRULE.get(objRtn.CRULE).toString();
                } else {
                    objRtn.strDescCRULE = objRtn.CRULE;
                }

                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();

                if (contador == 0) {
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                } else if (MERCHANT.equals(rs01.getString("MERCHN").trim())
                        & SCARCOD.equals(rs01.getString("SCARCOD").trim())
                        & CARDNBR.equals(rs01.getString("CARDNBR").trim())
                        & AUTHNBR.equals(rs01.getString("AUTHNBR").trim())
                        & PNR.equals(rs01.getString("PNR").trim())) {
                    objRtn.AUTAMOUNT = 0;
                } else {
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    MERCHANT = rs01.getString("MERCHN").trim();
                    SCARCOD = rs01.getString("SCARCOD").trim();
                    CARDNBR = rs01.getString("CARDNBR").trim();
                    AUTHNBR = rs01.getString("AUTHNBR").trim();
                    PNR = rs01.getString("PNR").trim();

                    color = !color;
                }

                objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                objRtn.PNR = rs01.getString("PNR").trim();

                if (color) {
                    objRtn.COLOR = "#91b9fa";
                } else {
                    objRtn.COLOR = "#e6ecf5";
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);
                contador++;
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

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        List<SQP00697Filter> lstRtn = new ArrayList<SQP00697Filter>(0);
        SQP00697Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00697(?,?,?,?,?,?,?,?,?)}"; //LIBSAP23.SQP00697V2

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TFILTER);
            cstmt01.setString(3, filter.IN_TEXT);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setString(5, "");//filter.page.ROWLST.get(filter.page.PAGNUM));
            cstmt01.setString(6, filter.IN_DATE_FROM);
            cstmt01.setString(7, filter.IN_DATE_TO);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, ""); //IN_CAPL

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00697Filter();
                objRtn.ROWKEY = rs01.getString("ROWKEY");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720FECVTA = Functions.getMonthConvertDate(rs01.getString("A720FECVTA"));
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.IN_IATA = rs01.getString("A1531CAPL"); // Deberías ser A1531CAPL en lugar de IN_IATA
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    
    public List<A2331Filter> SQP04382(A2331Filter filter) throws SQLException, Exception {

        List<A2331Filter> list = new ArrayList<A2331Filter>();
        A2331Filter objRtn;
        HashMap hmDescSTVAL = new HashMap();
        hmDescSTVAL.put("", "");
        hmDescSTVAL.put("1", "Stand By");
        hmDescSTVAL.put("2", "Sent to Office");
        hmDescSTVAL.put("3", "Linked");
        hmDescSTVAL.put("4", "Sent to Bank");
        hmDescSTVAL.put("5", "Chargeback");
        hmDescSTVAL.put("6", "Reverse Chargeback");

        HashMap hmDescCRULE = new HashMap();
        hmDescCRULE.put("", "");
        hmDescCRULE.put("01", "Total");
        hmDescCRULE.put("02", "Parcial");
        hmDescCRULE.put("03", "Ya usado");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        int contador = 0;
        String MERCHANT = "", SCARCOD = "", CARDNBR = "", AUTHNBR = "", PNR = "";
        boolean color = true;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04382(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SENTDATE.trim());
            cstmt.setString(3, filter.FOLIO.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.MERCHN.trim());
            cstmt.setString(6, filter.CARDNBR.trim());
            cstmt.setString(7, filter.AUTHNBR.trim());
            cstmt.setString(8, filter.NUMREFER.trim());
            cstmt.setString(9, filter.CCIA.trim());
            cstmt.setString(10, filter.FORMA.trim());
            cstmt.setString(11, filter.SERIE.trim());
            cstmt.setString(12, filter.SQCRFILE.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                objRtn = new A2331Filter();
                
                objRtn.CCIAEX = rs01.getString("CCIAEX").trim();
                objRtn.FORMAEX = rs01.getString("FORMAEX").trim();
                objRtn.SERIEEX = rs01.getString("SERIEEX").trim();
                objRtn.TICKETX = objRtn.CCIAEX + objRtn.FORMAEX + objRtn.SERIEEX;
                
                objRtn.STUSOSX = rs01.getString("STUSOSX").trim();
                objRtn.INDCPNX = rs01.getString("INDCPNX").trim();
                objRtn.INDCPNSX = rs01.getString("INDCPNSX").trim();
                objRtn.INDCPNSLX = rs01.getString("INDCPNSLX").trim();
                
                if(objRtn.CCIAEX.equals("") && objRtn.FORMAEX.equals("") && objRtn.SERIEEX.equals("")){
                    System.out.println("NEXT");
                    continue;
                }

                if (contador == 0) {
                    MERCHANT = rs01.getString("MERCHN").trim();
                    SCARCOD = rs01.getString("SCARCOD").trim();
                    CARDNBR = rs01.getString("CARDNBR").trim();
                    AUTHNBR = rs01.getString("AUTHNBR").trim();
                    PNR = rs01.getString("PNR").trim();
                }

                objRtn.IN_DATE = filter.IN_DATE;
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                objRtn.DATE = rs01.getString(filter.IN_DATE.trim()).trim();
                objRtn.SENTDATE = rs01.getString("SENTDATE").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.IATADATE = rs01.getString("IATADATE").trim();
                objRtn.LINKDATE = rs01.getString("LINKDATE").trim();
                objRtn.LINKHORA = rs01.getString("LINKHORA").trim();
                objRtn.DATES = rs01.getString("DATES").trim();
                objRtn.DATEN = rs01.getString("DATEN").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FORMA = rs01.getString("FORMA").trim();                
                objRtn.SERIE = rs01.getString("SERIE").trim();
                objRtn.TICKET = objRtn.CCIA + objRtn.FORMA + objRtn.SERIE;
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.strDescStatus = hmDescSTVAL.get(objRtn.STVAL).toString();
                //								

                objRtn.INDCPN = rs01.getString("INDCPN").trim();
                objRtn.STUSO = rs01.getString("STUSO").trim();
                objRtn.INDCPNS = rs01.getString("INDCPNS").trim();
                objRtn.DATSABF = rs01.getString("DATSABF").trim();
                objRtn.INDCPNSL = rs01.getString("INDCPNSL").trim();
                objRtn.STUSOS = rs01.getString("STUSOS").trim();
                objRtn.DATSABL = rs01.getString("DATSABL").trim();
                objRtn.FSELEC = rs01.getString("FSELEC").trim();
                objRtn.FECSELEC = rs01.getString("FECSELEC").trim();
                objRtn.FVCTO = rs01.getString("FVCTO").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.IDCON = rs01.getString("IDCON").trim();
                objRtn.DATAPLICA = rs01.getString("DATAPLICA").trim();
                objRtn.CRULE = rs01.getString("CRULE").trim();
                objRtn.MFOP = rs01.getString("MFOP").trim();
                if (hmDescCRULE.containsKey(objRtn.CRULE)) {
                    objRtn.strDescCRULE = hmDescCRULE.get(objRtn.CRULE).toString();
                } else {
                    objRtn.strDescCRULE = objRtn.CRULE;
                }

                objRtn.MERCHN = rs01.getString("MERCHN").trim();
                objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                objRtn.CARDNBR = rs01.getString("CARDNBR").trim();
                objRtn.AUTHNBR = rs01.getString("AUTHNBR").trim();

                if (contador == 0) {
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                } else if (MERCHANT.equals(rs01.getString("MERCHN").trim())
                        & SCARCOD.equals(rs01.getString("SCARCOD").trim())
                        & CARDNBR.equals(rs01.getString("CARDNBR").trim())
                        & AUTHNBR.equals(rs01.getString("AUTHNBR").trim())
                        & PNR.equals(rs01.getString("PNR").trim())) {
                    objRtn.AUTAMOUNT = 0;
                } else {
                    objRtn.AUTAMOUNT = rs01.getDouble("AUTAMOUNT");
                    MERCHANT = rs01.getString("MERCHN").trim();
                    SCARCOD = rs01.getString("SCARCOD").trim();
                    CARDNBR = rs01.getString("CARDNBR").trim();
                    AUTHNBR = rs01.getString("AUTHNBR").trim();
                    PNR = rs01.getString("PNR").trim();

                    color = !color;
                }

                objRtn.SALEDATE = rs01.getString("SALEDATE").trim();
                objRtn.PNR = rs01.getString("PNR").trim();

                if (color) {
                    objRtn.COLOR = "#91b9fa";
                } else {
                    objRtn.COLOR = "#e6ecf5";
                }
                
                objRtn.FSELECX = rs01.getString("FSELECX").trim();
                if (objRtn.FSELECX.equals("1")) {
                    objRtn.FSELECX = "Y";
                } else {
                    objRtn.FSELECX = "";
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);
                contador++;
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

        return list;
    }
    
    
    
}
