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
        String SQLCLL01 = "{CALL PXUATP.SQP04196(?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(7, filter.VP_STREF);
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

}
