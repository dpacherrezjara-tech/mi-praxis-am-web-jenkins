package net.miatech.praxis.dao.travelbank;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.travelbank.SQP04995Filter;
import net.miatech.praxis.travelbank.SQP04996Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ReconciliationReportDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public ReconciliationReportDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    // <editor-fold defaultstate="collapsed" desc="Resumen">
    public List<SQP04995Filter> getSQP04995Filter(SQP04995Filter filter) throws SQLException, Exception {
        List<SQP04995Filter> lstRtn = new ArrayList<SQP04995Filter>(0);
        SQP04995Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04995(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_NCTA);
            cstmt01.setString(4, filter.VP_MONED);
            cstmt01.setString(5, filter.VP_STAT);

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
                objRtn = new SQP04995Filter();
                objRtn.RN = rs01.getString("RN");
                objRtn.A4460CCUST = rs01.getString("A4460CCUST");
                objRtn.A4460CUENT = rs01.getString("A4460CUENT");
                objRtn.A4460MONED = rs01.getString("A4460MONED");
                objRtn.A4460SALDO = rs01.getDouble("A4460SALDO");
                objRtn.A4460SALAN = rs01.getDouble("A4460SALAN");
                objRtn.A4460SALRV = rs01.getDouble("A4460SALRV");
                objRtn.A4460SALPE = rs01.getDouble("A4460SALPE");

                objRtn.A4460REGIS = rs01.getString("A4460REGIS");
                objRtn.A4460FREGI = rs01.getString("A4460FREGI");
                objRtn.A4460HREGI = rs01.getString("A4460HREGI");
                objRtn.A4460REVIS = rs01.getString("A4460REVIS");
                objRtn.A4460FREVI = rs01.getString("A4460FREVI");
                objRtn.A4460HREVI = rs01.getString("A4460HREVI");

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

    // <editor-fold defaultstate="collapsed" desc="Detallado x credi id">
    public List<SQP04996Filter> getSQP04996Filter(SQP04996Filter filter) throws SQLException, Exception {
        List<SQP04996Filter> lstRtn = new ArrayList<SQP04996Filter>(0);
        SQP04996Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04996(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_NCTA);
            cstmt01.setString(4, filter.VP_MONED);
            cstmt01.setString(5, filter.VP_CRDID);
            cstmt01.setString(6, filter.VP_DESDE);
            cstmt01.setString(7, filter.VP_HASTA);
            cstmt01.setString(8, filter.VP_SERVC);
            cstmt01.setString(9, filter.VP_STAT);
            cstmt01.setString(10, filter.VP_LSTA);
            cstmt01.setString(11, filter.VP_PSTA);

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04996Filter();
                objRtn.RN = rs01.getString("RN");
                objRtn.A4467CCUST = rs01.getString("A4467CCUST");
                objRtn.A4467FRPDA = rs01.getString("A4467FRPDA");
                objRtn.A4467CUENT = rs01.getString("A4467CUENT");
                objRtn.A4467MONED = rs01.getString("A4467MONED");
                objRtn.A4467CRDID = rs01.getString("A4467CRDID");
                objRtn.A4467CRDSQ = rs01.getString("A4467CRDSQ");
                objRtn.A4467FEMIS = rs01.getString("A4467FEMIS");
                objRtn.A4467EXPDT = rs01.getString("A4467EXPDT");
                objRtn.A4467SERVC = rs01.getString("A4467SERVC");
                objRtn.A4467AORIG = rs01.getDouble("A4467AORIG");
                objRtn.A4467AUSAD = rs01.getDouble("A4467AUSAD");
                objRtn.A4467ABALR = rs01.getDouble("A4467ABALR");
                objRtn.A4467TCAMC = rs01.getDouble("A4467TCAMC");
                objRtn.A4467AORMX = rs01.getDouble("A4467AORMX");
                objRtn.A4467AUSMX = rs01.getDouble("A4467AUSMX");
                objRtn.A4467ABLMX = rs01.getDouble("A4467ABLMX");
                objRtn.A4467AORRV = rs01.getDouble("A4467AORRV");
                objRtn.A4467AUSRV = rs01.getDouble("A4467AUSRV");
                objRtn.A4467ABLRV = rs01.getDouble("A4467ABLRV");
                
                objRtn.A4467LCUEN = rs01.getString("A4467LCUEN");
                objRtn.A4467LMNDA = rs01.getString("A4467LMNDA");
                objRtn.A4467LCRID = rs01.getString("A4467LCRID");
                objRtn.A4467LCRSQ = rs01.getString("A4467LCRSQ");
                objRtn.A4467LVORG = rs01.getDouble("A4467LVORG");
                objRtn.A4467LBALR = rs01.getDouble("A4467LBALR");
                objRtn.A4467LSTA = rs01.getString("A4467LSTA");

                objRtn.A4467PCUEN = rs01.getString("A4467PCUEN");
                objRtn.A4467PMNDA = rs01.getString("A4467PMNDA");
                objRtn.A4467PCRID = rs01.getString("A4467PCRID");
                objRtn.A4467PCRSQ = rs01.getString("A4467PCRSQ");
                
                objRtn.A4467PORGA = rs01.getDouble("A4467PORGA");
                objRtn.A4467PUSAD = rs01.getDouble("A4467PUSAD");
                objRtn.A4467PBALR = rs01.getDouble("A4467PBALR");
                
                objRtn.A4467PORMX = rs01.getDouble("A4467PORMX");
                objRtn.A4467PUSMX = rs01.getDouble("A4467PUSMX");
                objRtn.A4467PBLMX = rs01.getDouble("A4467PBLMX");
                objRtn.A4467PORRV = rs01.getDouble("A4467PORRV");
                objRtn.A4467PUSRV = rs01.getDouble("A4467PUSRV");
                objRtn.A4467PBLRV = rs01.getDouble("A4467PBLRV");                
                objRtn.A4467PSTA = rs01.getString("A4467PSTA");

                objRtn.A4467REGIS = rs01.getString("A4467REGIS");
                objRtn.A4467FREGI = rs01.getString("A4467FREGI");
                objRtn.A4467HREGI = rs01.getString("A4467HREGI");
                objRtn.A4467REVIS = rs01.getString("A4467REVIS");
                objRtn.A4467FREVI = rs01.getString("A4467FREVI");
                objRtn.A4467HREVI = rs01.getString("A4467HREVI");

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
