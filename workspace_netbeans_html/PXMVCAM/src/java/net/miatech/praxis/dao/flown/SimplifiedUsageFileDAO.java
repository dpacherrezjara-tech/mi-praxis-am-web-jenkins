/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.filter.SQP05613Filter;
import net.miatech.praxis.flown.filter.SQP05607Filter;
import net.miatech.praxis.flown.filter.SQP05612Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class SimplifiedUsageFileDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SQP05607Filter> getSQP05607Filter(SQP05607Filter filter) throws SQLException, Exception {
        List<SQP05607Filter> lstRtn = new ArrayList<>(0);
        SQP05607Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP05607(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FECHADESDE);
            cstmt01.setString(3, filter.VP_FECHAHASTA);
            cstmt01.setString(4, filter.VP_STAT);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05607Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.FECHA = rs01.getString("FECHA");
                objRtn.SEQ = rs01.getString("SEQ");

                objRtn.QTYLIFT = rs01.getInt("QTYLIFT");
                objRtn.QTYIPAY = rs01.getInt("QTYIPAY");
                objRtn.QTYTOTAL = rs01.getInt("QTYTOTAL");

                objRtn.FILNAME = rs01.getString("FILNAME");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.LOGTXT = rs01.getString("LOGTXT");
                objRtn.USRCR = rs01.getString("USRCR");
                objRtn.FECCR = rs01.getString("FECCR");
                objRtn.HORCR = rs01.getString("HORCR");

                objRtn.USRUP = rs01.getString("USRUP");
                objRtn.FECUP = rs01.getString("FECUP");
                objRtn.HORUP = rs01.getString("HORUP");

                objRtn.ESTADO_1 = rs01.getString("ESTADO_1");

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

    public List<SQP05612Filter> getSQP05612Filter(SQP05612Filter filter) throws SQLException, Exception {
        List<SQP05612Filter> lstRtn = new ArrayList<>(0);
        SQP05612Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP05612(?,?)}";
        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(5, Types.INTEGER);
//            cstmt01.registerOutParameter(6, Types.INTEGER);
//            cstmt01.registerOutParameter(7, Types.INTEGER);
//            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FECHA);
//            cstmt01.setInt(5, filter.page.PAGNUM);
//            cstmt01.setInt(6, filter.page.PAGROW);
//            cstmt01.setInt(7, filter.page.TOTPAG);
//            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(5);
//            filter.page.PAGROW = cstmt01.getInt(6);
//            filter.page.TOTPAG = cstmt01.getInt(7);
//            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05612Filter();
                objRtn.ID = rs01.getInt("ID");
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.FECHA = rs01.getString("FECHA");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.IDLOG = rs01.getInt("IDLOG");
                objRtn.LOGTXT = rs01.getString("LOGTXT");
                objRtn.USRCR = rs01.getString("USRCR");
                objRtn.FECCR = rs01.getString("FECCR");
                objRtn.HORCR = rs01.getString("HORCR");

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
    
    public List<SQP05613Filter> getSQP05613Filter(SQP05613Filter filter) throws SQLException, Exception {
        List<SQP05613Filter> lstRtn = new ArrayList<>(0);
        SQP05613Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP05613(?,?,?,?,?,?)}";
        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FECHA); 
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05613Filter();
                objRtn.ID = rs01.getInt("ID");
                objRtn.TKT = rs01.getString("TKT");
                objRtn.RECORD = rs01.getString("RECORD");
                objRtn.TEXT = rs01.getString("TEXT");
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
}
