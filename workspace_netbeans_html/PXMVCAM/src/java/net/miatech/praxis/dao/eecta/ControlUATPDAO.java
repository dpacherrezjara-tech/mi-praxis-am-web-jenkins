/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ControlUATPDAO {
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
    /*
    public List<SQP01558Filter> getSQP01558Filter(SQP01558Filter filter) throws SQLException, Exception {
        List<SQP01558Filter> lstRtn = new ArrayList<SQP01558Filter>(0);
        SQP01558Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01558(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_YEAR);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01558Filter();
                objRtn.NBR = rs01.getString("NBR");
                objRtn.MES = rs01.getString("MES");
                objRtn.strDescription = Functions.getMonthConvert(objRtn.MES);
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAXM = rs01.getInt("PAXM");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.PAXNM = rs01.getInt("PAXNM");
                objRtn.NETNM = rs01.getDouble("NETNM");
                objRtn.PAXNU = rs01.getInt("PAXNU");
                objRtn.NETNU = rs01.getDouble("NETNU");
                objRtn.PNOMATCH = rs01.getDouble("PNOMATCH");
                objRtn.OVERAGE = rs01.getDouble("OVERAGE");
                objRtn.CANCEL = rs01.getDouble("CANCEL");
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
    */
}
