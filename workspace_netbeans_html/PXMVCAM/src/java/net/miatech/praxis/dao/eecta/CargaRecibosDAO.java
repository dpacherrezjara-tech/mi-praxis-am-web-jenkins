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
import net.miatech.praxis.eecta.SQP04195Filter;
import net.miatech.praxis.eecta.SQP04196Filter;
import net.miatech.praxis.eecta.SQP04197Filter;
import net.miatech.praxis.eecta.SQP04211Filter;
import net.miatech.praxis.eecta.SQP04217Filter;
import net.miatech.praxis.eecta.SQP04218Filter;
import net.miatech.praxis.eecta.SQP04219Filter;
import net.miatech.praxis.eecta.SQP04253Filter;
import net.miatech.praxis.eecta.SQP04254Filter;
import net.miatech.praxis.eecta.SQP04255Filter;
import net.miatech.praxis.eecta.SQP04259Filter;
import net.miatech.praxis.eecta.SQP04260Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class CargaRecibosDAO {
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
     public List<SQP04217Filter> getSQP04217Filter(SQP04217Filter filter) throws SQLException, Exception {
        List<SQP04217Filter> lstRtn = new ArrayList<SQP04217Filter>(0);
        SQP04217Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04217(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDATE1);
            cstmt01.setString(3, filter.VP_FDATE2);
            cstmt01.setString(4, filter.VP_IDRCB);
            cstmt01.setString(5, filter.VP_STAT);
            cstmt01.setString(6, filter.VP_TRXOR);
            cstmt01.setString(7, filter.VP_CDCLI);
            cstmt01.setString(8, filter.VP_VPARM);
            
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04217Filter();
                objRtn.A4102CCUST = rs01.getString("A4102CCUST");
                objRtn.A4102IDRCB = rs01.getString("A4102IDRCB");
                objRtn.A4102CDCLI = rs01.getString("A4102CDCLI");
                objRtn.A4102LOTE = rs01.getString("A4102LOTE");
                objRtn.A4102FECRC = rs01.getString("A4102FECRC");
                objRtn.A4102QTYRC = rs01.getInt("A4102QTYRC");
                objRtn.A4102TOTRC = rs01.getDouble("A4102TOTRC");
                objRtn.A4102MDARC = rs01.getString("A4102MDARC");                
                objRtn.A4102TOTAP = rs01.getDouble("A4102TOTAP");
                objRtn.A4102TAJUS = rs01.getDouble("A4102TAJUS");
                objRtn.A4102SALDO = rs01.getDouble("A4102SALDO");
                objRtn.A4102ESTAD = rs01.getString("A4102ESTAD");                
                objRtn.A4102REGIS = rs01.getString("A4102REGIS");
                objRtn.A4102FREGI = rs01.getString("A4102FREGI");
                objRtn.A4102HREGI = rs01.getString("A4102HREGI");
                objRtn.A4102REVIS = rs01.getString("A4102REVIS");
                objRtn.A4102FREVI = rs01.getString("A4102FREVI");
                objRtn.A4102HREVI = rs01.getString("A4102HREVI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");

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

    public List<SQP04211Filter> getSQP04211Filter(SQP04211Filter filter) throws SQLException, Exception {
        List<SQP04211Filter> lstRtn = new ArrayList<SQP04211Filter>(0);
        SQP04211Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04211(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDATE1);
            cstmt01.setString(3, filter.VP_FDATE2);
            cstmt01.setString(4, filter.VP_LOTE);
            cstmt01.setString(5, filter.VP_STAT);
            cstmt01.setString(6, filter.VP_TRXOR);
            cstmt01.setString(7, filter.VP_IDRCB);

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
                objRtn = new SQP04211Filter();
                objRtn.A4103CCUST = rs01.getString("A4103CCUST");
                objRtn.A4103IDRCB = rs01.getString("A4103IDRCB");
                objRtn.A4103SQRCB = rs01.getInt("A4103SQRCB");
                objRtn.A4103NUMRC = rs01.getString("A4103NUMRC");
                objRtn.A4103NRO = rs01.getInt("A4103NRO");
                objRtn.A4103LOTE = rs01.getString("A4103LOTE");
                objRtn.A4103CDCLI = rs01.getString("A4103CDCLI");
                objRtn.A4103TIPO = rs01.getString("A4103TIPO");
                objRtn.A4103ESTAD = rs01.getString("A4103ESTAD");
                objRtn.A4103CUENT = rs01.getString("A4103CUENT");
                objRtn.A4103NRCLO = rs01.getString("A4103NRCLO");
                objRtn.A4103UNDOP = rs01.getString("A4103UNDOP");
                objRtn.A4103FECRC = rs01.getString("A4103FECRC");
                objRtn.A4103FECDP = rs01.getString("A4103FECDP");
                objRtn.A4103REFRC = rs01.getString("A4103REFRC").trim();
                objRtn.A4103DESRC = rs01.getString("A4103DESRC").trim();
                objRtn.A4103MDARC = rs01.getString("A4103MDARC");
                objRtn.A4103MONTO = rs01.getDouble("A4103MONTO");
                objRtn.A4103STRCB = rs01.getString("A4103STRCB");
                objRtn.A4103TOTAP = rs01.getDouble("A4103TOTAP");
                objRtn.A4103TAJUS = rs01.getDouble("A4103TAJUS");
                objRtn.A4103SALDO = rs01.getDouble("A4103SALDO");
                objRtn.A4103STAT = rs01.getString("A4103STAT");
                objRtn.A4103CODER = rs01.getString("A4103CODER");
                objRtn.A4103REGIS = rs01.getString("A4103REGIS");
                objRtn.A4103FREGI = rs01.getString("A4103FREGI");
                objRtn.A4103HREGI = rs01.getString("A4103HREGI");
                objRtn.A4103REVIS = rs01.getString("A4103REVIS");
                objRtn.A4103FREVI = rs01.getString("A4103FREVI");
                objRtn.A4103HREVI = rs01.getString("A4103HREVI");

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

    public List<SQP04196Filter> getSQP04196Filter(SQP04196Filter filter) throws SQLException, Exception {
        List<SQP04196Filter> lstRtn = new ArrayList<SQP04196Filter>(0);
        SQP04196Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04196(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDATE1);
            cstmt01.setString(3, filter.VP_FDATE2);
            cstmt01.setString(4, filter.VP_LOTE);
            cstmt01.setString(5, filter.VP_STAT);
            cstmt01.setString(6, filter.VP_TRXOR);
            cstmt01.setString(7, filter.VP_STREF);
            cstmt01.setString(8, filter.VP_CUENT);
            cstmt01.setString(9, filter.VP_MDATX);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04196Filter();
                objRtn.A4096CCUST = rs01.getString("A4096CCUST");
                objRtn.A4096LOTE = rs01.getString("A4096LOTE");
                objRtn.A4096SQCG = rs01.getInt("A4096SQCG");
                objRtn.A4096FCARG = rs01.getString("A4096FCARG");
                objRtn.A4096FRCBO = rs01.getString("A4096FRCBO");
                objRtn.A4096FDPTO = rs01.getString("A4096FDPTO");
                objRtn.A4096NRO = rs01.getInt("A4096NRO");
                objRtn.A4096UNDOP = rs01.getString("A4096UNDOP");
                objRtn.A4096TRXOR = rs01.getString("A4096TRXOR");
                objRtn.A4096MONTO = rs01.getDouble("A4096MONTO");
                objRtn.A4096MDATX = rs01.getString("A4096MDATX");
                objRtn.A4096TIPO = rs01.getString("A4096TIPO");
                objRtn.A4096ESTAD = rs01.getString("A4096ESTAD");
                objRtn.A4096CUENT = rs01.getString("A4096CUENT");
                objRtn.A4096NRCLO = rs01.getString("A4096NRCLO");
                objRtn.A4096DESCR = rs01.getString("A4096DESCR");
                objRtn.A4096REFER = rs01.getString("A4096REFER");
                objRtn.A4096STREF = rs01.getString("A4096STREF");
                objRtn.A4096STSRC = rs01.getString("A4096STSRC");
                objRtn.A4096TOTAP = rs01.getDouble("A4096TOTAP");
                objRtn.A4096SALDP = rs01.getDouble("A4096SALDP");
                objRtn.A4096CDCLI = rs01.getString("A4096CDCLI");
                objRtn.A4096STAT = rs01.getString("A4096STAT");
                objRtn.A4096CODER = rs01.getString("A4096CODER");
                objRtn.A4096DESER = rs01.getString("A4096DESER");

                objRtn.A4096REGIS = rs01.getString("A4096REGIS");
                objRtn.A4096FREGI = rs01.getString("A4096FREGI");
                objRtn.A4096HREGI = rs01.getString("A4096HREGI");
                objRtn.A4096REVIS = rs01.getString("A4096REVIS");
                objRtn.A4096FREVI = rs01.getString("A4096FREVI");
                objRtn.A4096HREVI = rs01.getString("A4096HREVI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                
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

    public SQP04195Filter setSQP04195Filter(SQP04195Filter filter) throws SQLException, Exception {
        SQP04195Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04195(?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.registerOutParameter(4, Types.VARCHAR);
            cstmt01.registerOutParameter(5, Types.VARCHAR);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_JSON_TEXT);
            cstmt01.execute();
            objRtn = new SQP04195Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(3);
            objRtn.dbException.MESSAGE = cstmt01.getString(4);
            objRtn.OU_A4096LOTE = cstmt01.getString(5);

        } finally {
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
        return objRtn;
    }

    public SQP04197Filter setSQP04197Filter(SQP04197Filter filter) throws SQLException, Exception {
        SQP04197Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04197(?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.registerOutParameter(4, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_LOTE);
            cstmt01.execute();
            objRtn = new SQP04197Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(3);
            objRtn.dbException.MESSAGE = cstmt01.getString(4);

        } finally {
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
        return objRtn;
    }
    public List<SQP04218Filter> getSQP04218Filter(SQP04218Filter filter) throws SQLException, Exception {
        List<SQP04218Filter> lstRtn = new ArrayList<SQP04218Filter>(0);
        SQP04218Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04218(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_IDRCB);        
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04218Filter();
                objRtn.A4105CCUST =  rs01.getString("A4105CCUST");
                objRtn.A4105IDAPL = rs01.getString("A4105IDAPL");                                
                objRtn.A4105FECPG = rs01.getString("A4105FECPG");
                objRtn.A4105MDAPG = rs01.getString("A4105MDAPG");
                objRtn.A4105TOTPG = rs01.getDouble("A4105TOTPG");                
                objRtn.A4105TIPPG_00 = rs01.getString("A4105TIPPG_00");
                objRtn.A4105NRLOT = rs01.getString("A4105NRLOT");
                objRtn.A4105CDCLI = rs01.getString("A4105CDCLI");
                objRtn.A4105IDRCB = rs01.getString("A4105IDRCB");                                
                objRtn.A4105REGIS = rs01.getString("A4105REGIS");
                objRtn.A4105FREGI = rs01.getString("A4105FREGI");
                objRtn.A4105HREGI = rs01.getString("A4105HREGI");
                objRtn.A4105REVIS = rs01.getString("A4105FREVI");
                objRtn.A4105FREVI = rs01.getString("A4105FREVI");
                objRtn.A4105HREVI = rs01.getString("A4105HREVI");                
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
     public List<SQP04219Filter> getSQP04219Filter(SQP04219Filter filter) throws SQLException, Exception {
        List<SQP04219Filter> lstRtn = new ArrayList<SQP04219Filter>(0);
         SQP04219Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04219(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_IDPG);
            cstmt01.setString(3, filter.VP_RECIBO);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);            
            cstmt01.execute();            
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04219Filter();
                objRtn.A4106CCUST =  rs01.getString("A4106CCUST");
                objRtn.A4106IDAPL = rs01.getString("A4106IDAPL");
                objRtn.A4106IDRCB = rs01.getString("A4106IDRCB");
                objRtn.A4106SQRCB = rs01.getString("A4106SQRCB");
                objRtn.A4106SQAPL = rs01.getString("A4106SQAPL");
                objRtn.A4106NUMRC = rs01.getString("A4106NUMRC");
                objRtn.A4106LOTE = rs01.getString("A4106LOTE");                
                objRtn.A4106CDCLI = rs01.getString("A4106CDCLI");
                objRtn.A4106TIPPG = rs01.getString("A4106TIPPG_00");
                objRtn.A4106STSPG = rs01.getString("A4106STSPG_00");
                objRtn.A4106REFPG = rs01.getString("A4106REFPG").trim();
                objRtn.A4106FECPG = rs01.getString("A4106FECPG");
                objRtn.A4106BANCO = rs01.getString("A4106BANCO");
                objRtn.A4106CTABC = rs01.getString("A4106CTABC");
                objRtn.A4106TRXPG = rs01.getString("A4106TRXPG");
                
                //importe
                objRtn.A4106TOT = rs01.getDouble("A4106TOT");
                objRtn.A4106TOTAP = rs01.getDouble("A4106TOTAP");
                objRtn.A4106SALD = rs01.getDouble("A4106SALD");
                objRtn.A4106MDA = rs01.getString("A4106MDA");
                //audit
                objRtn.A4106APLIC = rs01.getString("A4106APLIC");
                objRtn.A4106FAPLC = rs01.getString("A4106FAPLC");
                objRtn.A4106HAPLC = rs01.getString("A4106HAPLC");
                
                objRtn.A4106REGIS = rs01.getString("A4106REGIS");
                objRtn.A4106FREGI = rs01.getString("A4106FREGI");
                objRtn.A4106HREGI = rs01.getString("A4106HREGI");
                objRtn.A4106REVIS = rs01.getString("A4106REVIS");
                objRtn.A4106FREVI = rs01.getString("A4106FREVI");
                objRtn.A4106HREVI = rs01.getString("A4106HREVI");
                
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
     
     public SQP04253Filter setSQP04253Filter(SQP04253Filter filter) throws SQLException, Exception {
        SQP04253Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04253(?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.VARCHAR);
            cstmt01.registerOutParameter(5, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.vp_fproc);
            cstmt01.setString(3, filter.vp_cdcli);            
            cstmt01.execute();
            objRtn = new SQP04253Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(4);
            objRtn.dbException.MESSAGE = cstmt01.getString(5);

        } finally {
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
        return objRtn;
    }
    
    public List<SQP04254Filter> getSQP04254Filter(SQP04254Filter filter) throws SQLException, Exception {
        List<SQP04254Filter> lstRtn = new ArrayList<SQP04254Filter>(0);
         SQP04254Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04254(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CDCLI);
            cstmt01.setString(3, filter.VP_RSOCI);
            cstmt01.setString(4, filter.VP_LOTE);            
            cstmt01.setString(5, filter.VP_NUMRC);
            cstmt01.setString(6, filter.VP_ESTAD);
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
                objRtn = new SQP04254Filter();
                objRtn.A4107CCUST = rs01.getString("A4107CCUST");
                objRtn.A4107FPROC = rs01.getString("A4107FPROC");
                objRtn.A4107NLOTE = rs01.getString("A4107NLOTE");
                objRtn.A4107CDCLI = rs01.getString("A4107CDCLI");
                objRtn.A4107RFC = rs01.getString("A4107RFC");
                objRtn.A4107RSOCI = rs01.getString("A4107RSOCI");
                objRtn.A4107CTABC = rs01.getString("A4107CTABC");
                objRtn.A4107RFCEM = rs01.getString("A4107RFCEM");
                objRtn.A4107SQRCB = rs01.getInt("A4107SQRCB");
                objRtn.A4107NUMRC = rs01.getString("A4107NUMRC");
                objRtn.A4107FPAGO = rs01.getString("A4107FPAGO");
                objRtn.A4107FOP = rs01.getString("A4107FOP");
                objRtn.A4107MONED = rs01.getString("A4107MONED");
                objRtn.A4107TMONT = rs01.getDouble("A4107TMONT");
                objRtn.A4107TCAMB = rs01.getDouble("A4107TCAMB");
                objRtn.A4107TLTTK = rs01.getInt("A4107TLTTK");
                objRtn.A4107CLVPS = rs01.getString("A4107CLVPS");
                objRtn.A4107CANT = rs01.getInt("A4107CANT");
                objRtn.A4107CLVU = rs01.getString("A4107CLVU");
                objRtn.A4107DESC = rs01.getString("A4107DESC");
                objRtn.A4107VALUN = rs01.getDouble("A4107VALUN");
                objRtn.A4107BASE = rs01.getDouble("A4107BASE");
                objRtn.A4107IMPUE = rs01.getDouble("A4107IMPUE");
                objRtn.A4107TIPOT = rs01.getString("A4107TIPOT");
                objRtn.A4107IMPOR = rs01.getDouble("A4107IMPOR");

                objRtn.A4107FFISC = rs01.getString("A4107FFISC");
                objRtn.A4107NSERI = rs01.getString("A4107NSERI");
                objRtn.A4107FEMIS = rs01.getString("A4107FEMIS");
                objRtn.A4107TLPDF = rs01.getInt("A4107TLPDF");
                objRtn.A4107TLXML = rs01.getInt("A4107TLXML");
                objRtn.A4107ESTAD = rs01.getString("A4107ESTAD");
                objRtn.A4107RMSG = rs01.getString("A4107RMSG");
                objRtn.A4107IENV = rs01.getString("A4107IENV");
                objRtn.A4107EMAIL = rs01.getString("A4107EMAIL");
                objRtn.A4107PTXML = rs01.getString("A4107PTXML").trim();
                objRtn.A4107PTPDF = rs01.getString("A4107PTPDF").trim();
                
                objRtn.A4107USRIN = rs01.getString("A4107USRIN");
                objRtn.A4107FECIN = rs01.getString("A4107FECIN");
                objRtn.A4107HORIN = rs01.getString("A4107HORIN");
                objRtn.A4107USRAC = rs01.getString("A4107USRAC");
                objRtn.A4107FECAC = rs01.getString("A4107FECAC");
                objRtn.A4107HORAC = rs01.getString("A4107HORAC");
                                      

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
    
    public List<SQP04255Filter> getSQP04255Filter(SQP04255Filter filter) throws SQLException, Exception {
        List<SQP04255Filter> lstRtn = new ArrayList<SQP04255Filter>(0);
         SQP04255Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04255(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FPROC);
            cstmt01.setString(3, filter.VP_CDCLI);
            cstmt01.setString(4, filter.VP_NLOTE);            
            cstmt01.setInt(5, filter.VP_SQRCB);
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
                objRtn = new SQP04255Filter();
                objRtn.A4108CCUST = rs01.getString("A4108CCUST");
                objRtn.A4108FPROC = rs01.getString("A4108FPROC");
                objRtn.A4108CDCLI = rs01.getString("A4108CDCLI");
                objRtn.A4108NLOTE = rs01.getString("A4108NLOTE");
                objRtn.A4108SQRCB = rs01.getInt("A4108SQRCB");
                objRtn.A4108CIA = rs01.getString("A4108CIA");
                objRtn.A4108FORMA = rs01.getString("A4108FORMA");
                objRtn.A4108SERIE = rs01.getString("A4108SERIE");
                objRtn.A4108SEQ = rs01.getString("A4108SEQ");
                objRtn.A4108TRNCU = rs01.getString("A4108TRNCU");
                objRtn.A4108GRUPO = rs01.getString("A4108GRUPO");
                objRtn.A4108FCONT = rs01.getString("A4108FCONT");
                objRtn.A4108CFDI = rs01.getString("A4108CFDI");
                objRtn.A4108TIPO = rs01.getString("A4108TIPO");
                objRtn.A4108FOP = rs01.getString("A4108FOP");
                objRtn.A4108MPG = rs01.getString("A4108MPG");
                objRtn.A4108SQAPL = rs01.getString("A4108SQAPL");
                objRtn.A4108MDA = rs01.getString("A4108MDA");
                objRtn.A4108TCAM = rs01.getDouble("A4108TCAM");
                objRtn.A4108TOT = rs01.getDouble("A4108TOT");
                objRtn.A4108TOTAP = rs01.getDouble("A4108TOTAP");
                objRtn.A4108TAJUS = rs01.getDouble("A4108TAJUS");
                objRtn.A4108SALD = rs01.getDouble("A4108SALD");
                objRtn.A4108STAT = rs01.getString("A4108STAT");

                objRtn.A4108REGIS = rs01.getString("A4108REGIS");
                objRtn.A4108FREGI = rs01.getString("A4108FREGI");
                objRtn.A4108HREGI = rs01.getString("A4108HREGI");
                objRtn.A4108REVIS = rs01.getString("A4108REVIS");
                objRtn.A4108FREVI = rs01.getString("A4108FREVI");
                objRtn.A4108HREVI = rs01.getString("A4108HREVI");
                                      
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
     public SQP04259Filter setSQP04259Filter(SQP04259Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04259(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.registerOutParameter(5, Types.VARCHAR);                        
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_CDCLI);
            cstmt.setString(3, filter.VP_JSON);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(4);
            filter.dbException.MESSAGE = cstmt.getString(5);
                        
        } finally {
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
        return filter;
    } 
     public SQP04260Filter setSQP04260Filter(SQP04260Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04260(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);                        
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_A4103IDRCB);
            cstmt.setInt(3, filter.VP_A4103SQRCB);
            cstmt.setInt(4, filter.VP_A4103NRO);
            cstmt.setString(5, filter.VP_A4103LOTE);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(6);
            filter.dbException.MESSAGE = cstmt.getString(7);
                        
        } finally {
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
        return filter;
    } 
     
     
}
