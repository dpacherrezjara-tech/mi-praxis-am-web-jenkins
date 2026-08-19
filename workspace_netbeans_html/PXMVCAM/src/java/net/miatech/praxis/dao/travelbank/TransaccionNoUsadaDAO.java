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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.travelbank.SQP04903Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class TransaccionNoUsadaDAO {
    // <editor-fold defaultstate="collapsed" desc="Variables locales">

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public TransaccionNoUsadaDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    // <editor-fold defaultstate="collapsed" desc="TNU">
    public List<SQP04903Filter> getSQP04903Filter(SQP04903Filter filter) throws SQLException, Exception {
        List<SQP04903Filter> lstRtn = new ArrayList<SQP04903Filter>(0);
        SQP04903Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04903(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
//            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERIODO);
            cstmt01.setString(3, filter.MONEDA);
//            cstmt01.setInt(9, filter.page.PAGNUM);
//            cstmt01.setInt(10, filter.page.PAGROW);
//            cstmt01.setInt(11, filter.page.TOTPAG);
//            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(9);
//            filter.page.PAGROW = cstmt01.getInt(10);
//            filter.page.TOTPAG = cstmt01.getInt(11);
//            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04903Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.PERIODO = rs01.getString("PERIODO");
                objRtn.ORDEN = rs01.getInt("ORDEN");
                objRtn.MONEDA = rs01.getString("MONEDA");
                objRtn.CODIGO = rs01.getString("CODIGO");
                objRtn.CONCEPTO = rs01.getString("CONCEPTO");
                objRtn.ENE = rs01.getDouble("ENE");
                objRtn.FEB = rs01.getDouble("FEB");
                objRtn.MAR = rs01.getDouble("MAR");
                objRtn.ABR = rs01.getDouble("ABR");
                objRtn.MAY = rs01.getDouble("MAY");
                objRtn.JUN = rs01.getDouble("JUN");
                objRtn.JUL = rs01.getDouble("JUL");
                objRtn.AGO = rs01.getDouble("AGO");
                objRtn.SET = rs01.getDouble("SET");
                objRtn.OCT = rs01.getDouble("OCT");
                objRtn.NOV = rs01.getDouble("NOV");
                objRtn.DIC = rs01.getDouble("DIC");

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
