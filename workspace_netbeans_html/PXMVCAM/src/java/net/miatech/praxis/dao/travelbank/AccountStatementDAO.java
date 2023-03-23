/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.travelbank;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.travelbank.SQP04825Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AccountStatementDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public AccountStatementDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    // <editor-fold defaultstate="collapsed" desc="EECC">

    public List<SQP04825Filter> getSQP04825Filter(SQP04825Filter filter) throws SQLException, Exception {
        List<SQP04825Filter> lstRtn = new ArrayList<SQP04825Filter>(0);
        SQP04825Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04825(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_DESDE);
            cstmt01.setString(4, filter.VP_HASTA);
            cstmt01.setString(5, filter.VP_NCTA);
            cstmt01.setString(6, filter.VP_MONEDA);
            cstmt01.setString(7, filter.VP_ARCHI);
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
                objRtn = new SQP04825Filter();
                objRtn.A4417CCUST = rs01.getString("A4417CCUST");
                objRtn.A4417IDCTA = rs01.getInt("A4417IDCTA");
                objRtn.A4417PRDA = rs01.getString("A4417PRDA");
                objRtn.A4417FEMI = rs01.getString("A4417FEMI");
                objRtn.A4417CUENT = rs01.getString("A4417CUENT");
                objRtn.A4417MONED = rs01.getString("A4417MONED");
                objRtn.A4417ARCHI = rs01.getString("A4417ARCHI");
                objRtn.A4417TRXID = rs01.getString("A4417TRXID");
                objRtn.A4417CREID = rs01.getString("A4417CREID");
                objRtn.A4417TRANS = rs01.getString("A4417TRANS");
                objRtn.A4417SRVCC = rs01.getString("A4417SRVCC");
                objRtn.A4417BTCUR = rs01.getString("A4417BTCUR");
                objRtn.A4417VALOR = rs01.getDouble("A4417VALOR");
                objRtn.A4417TYPEI = rs01.getString("A4417TYPEI");
                objRtn.A4417DNUBR = rs01.getString("A4417DNUBR");
                objRtn.A4417TOTTR = rs01.getDouble("A4417TOTTR");
                objRtn.A4417SALDO = rs01.getDouble("A4417SALDO");
                // aut
                objRtn.A4417REGIS = rs01.getString("A4417REGIS");
                objRtn.A4417FREGI = rs01.getString("A4417FREGI");
                objRtn.A4417HREGI = rs01.getString("A4417HREGI");
                objRtn.A4417REVIS = rs01.getString("A4417REVIS");
                objRtn.A4417FREVI = rs01.getString("A4417FREVI");
                objRtn.A4417HREVI = rs01.getString("A4417HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    // </editor-fold>    
}
