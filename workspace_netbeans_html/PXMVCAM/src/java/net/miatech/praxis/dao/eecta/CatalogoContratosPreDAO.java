/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP04587Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class CatalogoContratosPreDAO {
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
    public List<SQP04587Filter> getSQP04587Filter(SQP04587Filter filter) throws SQLException, Exception {
        List<SQP04587Filter> lstRtn = new ArrayList<SQP04587Filter>(0);
        SQP04587Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04587(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FECHA1);
            cstmt01.setString(4, filter.VP_FECHA2);
            cstmt01.setString(5, filter.VP_CDCLI);
            cstmt01.setString(6, filter.VP_PARAM);
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
                objRtn = new SQP04587Filter();
                objRtn.A4241CCUST = rs01.getString("A4241CCUST");
                objRtn.A4241IDANT = rs01.getInt("A4241IDANT");
                objRtn.A4241FEC = rs01.getString("A4241FEC");
                objRtn.A4241FECPE = rs01.getString("A4241FECPE");
                objRtn.A4241TOTAN = rs01.getDouble("A4241TOTAN");
                objRtn.A4241MDA = rs01.getString("A4241MDA");
                objRtn.A4241TOTBF = rs01.getDouble("A4241TOTBF");
                objRtn.A4241PORBF = rs01.getDouble("A4241PORBF");
                objRtn.A4241TOT = rs01.getDouble("A4241TOT");
                objRtn.A4241ORDN = rs01.getString("A4241ORDN");
                objRtn.A4241CONTR = rs01.getString("A4241CONTR");
                objRtn.A4241REF = rs01.getString("A4241REF");
                objRtn.A4241STANT = rs01.getString("A4241STANT");
                objRtn.A4241FECDE = rs01.getString("A4241FECDE");
                objRtn.A4241FECHA = rs01.getString("A4241FECHA");
                objRtn.A4241STSPG = rs01.getString("A4241STSPG");
                objRtn.A4241IDRCB = rs01.getInt("A4241IDRCB");
                objRtn.A4241FECRC = rs01.getString("A4241FECRC");
                objRtn.A4241NUMRC = rs01.getString("A4241NUMRC");
                objRtn.A4241CDCLI = rs01.getString("A4241CDCLI");
                objRtn.A4241USRIN = rs01.getString("A4241USRIN");
                objRtn.A4241FECIN = rs01.getString("A4241FECIN");
                objRtn.A4241HORIN = rs01.getString("A4241HORIN");
                objRtn.A4241USRAC = rs01.getString("A4241USRAC");
                objRtn.A4241FECAC = rs01.getString("A4241FECAC");
                objRtn.A4241HORAC = rs01.getString("A4241HORAC");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                
                // saldos
                objRtn.A4242IDANT = rs01.getInt("A4242IDANT");
                objRtn.A4242TOTAN = rs01.getDouble("A4242TOTAN");
                objRtn.A4242TOTBF = rs01.getDouble("A4242TOTBF");
                objRtn.A4242TOT = rs01.getDouble("A4242TOT");
                objRtn.A4242TOTAP = rs01.getDouble("A4242TOTAP");
                objRtn.A4242SALDO = rs01.getDouble("A4242SALDO");
                objRtn.A4242VTAAN = rs01.getDouble("A4242VTAAN");
                objRtn.A4242SALAN = rs01.getDouble("A4242SALAN");
                objRtn.A4242VTABF = rs01.getDouble("A4242VTABF");
                objRtn.A4242SALBF = rs01.getDouble("A4242SALBF");
                
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
