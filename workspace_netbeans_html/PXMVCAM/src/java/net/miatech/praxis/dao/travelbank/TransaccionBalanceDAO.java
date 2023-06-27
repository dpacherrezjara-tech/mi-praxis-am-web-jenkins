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
import net.miatech.praxis.travelbank.SQP04894Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class TransaccionBalanceDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public TransaccionBalanceDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    // <editor-fold defaultstate="collapsed" desc="CONSULTA POR TRANSACC ID">
    public List<SQP04894Filter> getSQP04894Filter(SQP04894Filter filter) throws SQLException, Exception {
        List<SQP04894Filter> lstRtn = new ArrayList<SQP04894Filter>(0);
        SQP04894Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04894(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
//            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FECHA1);
            cstmt01.setString(4, filter.VP_FECHA2);
            cstmt01.setString(5, filter.VP_ACCNBR);
            cstmt01.setString(6, filter.VP_CREDID);
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
                objRtn = new SQP04894Filter();
                objRtn.XAIRLIN = rs01.getString("XAIRLIN");
                objRtn.XNCTA = rs01.getString("XNCTA");
                objRtn.XCREDID = rs01.getString("XCREDID");
                objRtn.XFILE = rs01.getString("XFILE");
                objRtn.XSRVCC = rs01.getString("XSRVCC");    
                objRtn.XTYPEI = rs01.getString("XTYPEI");                    
                objRtn.XTRANSACTION = rs01.getString("XTRANSACTION");
                objRtn.XDATE = rs01.getString("XDATE");
                objRtn.XTICKET = rs01.getString("XTICKET");
                objRtn.XCURR = rs01.getString("XCURR");
                objRtn.XVALUE = rs01.getDouble("XVALUE");
                objRtn.XBALANCE = rs01.getDouble("XBALANCE");
                objRtn.XTCAMBIO = rs01.getDouble("XTCAMBIO");
                objRtn.XVREVENUE = rs01.getDouble("XVREVENUE");
                objRtn.XVPESOS = rs01.getDouble("XVPESOS");
                objRtn.XFLAG1 = rs01.getString("XFLAG1");
                objRtn.XERROR = rs01.getString("XERROR");
                objRtn.XIDISR = rs01.getString("XIDISR");
                objRtn.XIDRIN = rs01.getString("XIDRIN");                
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
