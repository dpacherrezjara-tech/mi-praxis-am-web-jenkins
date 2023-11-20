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
import net.miatech.praxis.eecta.SQP03943Filter;
import net.miatech.praxis.eecta.SQP03952Filter;
import net.miatech.praxis.eecta.SQP04053Filter;
import net.miatech.praxis.eecta.SQP04059Filter;
import net.miatech.praxis.eecta.SQP05193Filter;
import net.miatech.praxis.eecta.SQP05194Filter;
import net.miatech.praxis.eecta.SQP05195Filter;
import net.miatech.praxis.eecta.SQP05196Filter;
 import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AplPaymentPreDAO {
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

    public List<SQP05193Filter> getSQP05193Filter(SQP05193Filter filter) throws SQLException, Exception {
        List<SQP05193Filter> lstRtn = new ArrayList<SQP05193Filter>(0);
       SQP05193Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05193(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_FDATE2);
            cstmt01.setString(5, filter.VP_CDCLI);
            cstmt01.setString(6, filter.VP_RSOCI);
            cstmt01.setString(7, filter.VP_NRRPT);
            cstmt01.setString(8, filter.VP_REFPG);
            cstmt01.setString(9, filter.VP_CTABC);
            cstmt01.setString(10, filter.VP_STSPG);
            cstmt01.setString(11, filter.VP_BOLET);
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
                objRtn = new SQP05193Filter();
                objRtn.A4245NRRPT = rs01.getString("A4245NRRPT");
                objRtn.A4245CDCLI = rs01.getString("A4245CDCLI");                
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A4245REFBC = rs01.getString("A4245REFBC");
                objRtn.A3953BANCO = rs01.getString("A3953BANCO");
                objRtn.A3953CTABC = rs01.getString("A3953CTABC");                
                objRtn.A4245INIPR = rs01.getString("A4245INIPR");
                objRtn.A4245FINPR = rs01.getString("A4245FINPR");                
                objRtn.A4245MDLOC = rs01.getString("A4245MDLOC");
                objRtn.A4245FARE = rs01.getDouble("A4245FARE");
                objRtn.A4245IVA = rs01.getDouble("A4245IVA");
                objRtn.A4245TUA = rs01.getDouble("A4245TUA");
                objRtn.A4245YR = rs01.getDouble("A4245YR");
                objRtn.A4245YQ = rs01.getDouble("A4245YQ");
                objRtn.A4245OTR = rs01.getDouble("A4245OTR");
                objRtn.A4245TOT = rs01.getDouble("A4245TOT");
                //news
                objRtn.A4245TIPPG = rs01.getString("A4245TIPPG");      
                objRtn.A4245STSPG = rs01.getString("A4245STSPG");                                     
                objRtn.A4245TOTAP = rs01.getDouble("A4245TOTAP");
                objRtn.A4245TAJUS = rs01.getDouble("A4245TAJUS");
                objRtn.A4245SALDP = rs01.getDouble("A4245SALDP");
                    
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
    public List<SQP05196Filter> getSQP05196Filter(SQP05196Filter filter) throws SQLException, Exception {
        List<SQP05196Filter> lstRtn = new ArrayList<SQP05196Filter>(0);
        SQP05196Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05196(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4246NRRPT);
            cstmt01.setString(3, filter.VP_A4246CDCLI);
            cstmt01.setString(4, filter.VP_TFILTTRO);
            cstmt01.setString(5, filter.VP_PARAM1);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05196Filter();
                objRtn.A4246CCUST =  rs01.getString("A4246CCUST");
                objRtn.TICKET_NUMBER = rs01.getString("A4246CIA")+rs01.getString("A4246FORMA")+rs01.getString("A4246SERIE");
                objRtn.A4246CIA = rs01.getString("A4246CIA");
                objRtn.A4246FORMA = rs01.getString("A4246FORMA");
                objRtn.A4246SERIE = rs01.getString("A4246SERIE");
                objRtn.A4246SEQ = rs01.getString("A4246SEQ");
                objRtn.A4246NRRPT = rs01.getString("A4246NRRPT");
                objRtn.A4246SQRPT = rs01.getString("A4246SQRPT");
                objRtn.A4246CDCLI = rs01.getString("A4246CDCLI");
                objRtn.A4246SOLER = rs01.getString("A4246SOLER");
                objRtn.A4246GESTR = rs01.getString("A4246GESTR");
                objRtn.A4246CFDI = rs01.getString("A4246CFDI");
                objRtn.A4246RFC = rs01.getString("A4246RFC");
                objRtn.A4246FECTB = rs01.getString("A4246FECTB");
                objRtn.A4246GRUPO = rs01.getString("A4246GRUPO");
                objRtn.A4246FPROC = rs01.getString("A4246FPROC");
                objRtn.A4246TRNCU = rs01.getString("A4246TRNCU");
                objRtn.A4246FARE = rs01.getDouble("A4246FARE");
                objRtn.A4246IVA = rs01.getDouble("A4246IVA");
                objRtn.A4246TUA = rs01.getDouble("A4246TUA");
                objRtn.A4246YR = rs01.getDouble("A4246YR");
                objRtn.A4246YQ = rs01.getDouble("A4246YQ");
                objRtn.A4246OTR = rs01.getDouble("A4246OTR");
                objRtn.A4246TOT = rs01.getDouble("A4246TOT");
                objRtn.A4246PAX = rs01.getString("A4246PAX");
                objRtn.A4246IDCON = rs01.getString("A4246IDCON");
                objRtn.A4246FCONT = rs01.getString("A4246FCONT");     
                objRtn.A4246TOTAP = rs01.getDouble("A4246TOTAP"); 
                objRtn.A4246TAJUS = rs01.getDouble("A4246TAJUS"); 
                objRtn.A4246SALDP = rs01.getDouble("A4246SALDP");
                objRtn.A4246STSPG = rs01.getString("A4246STSPG");                
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
    
    public SQP03952Filter setSQP03952Filter(SQP03952Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03952(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(15, Types.VARCHAR);
            cstmt.registerOutParameter(16, Types.VARCHAR);            
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(3, filter.A4252REFPG);
//            cstmt.setString(4, filter.A4252FECPG);
//            cstmt.setDouble(5, filter.A4252TOTPG);
//            cstmt.setString(6, filter.A4252MDAPG);
//            cstmt.setString(7, filter.A4252TIPPG);
//            cstmt.setString(8, filter.A4252NRRPT);
//            cstmt.setString(9, filter.A4252CDCLI);
//            cstmt.setString(10, filter.A4252BANCO.trim());
//            cstmt.setString(11, filter.A4252CTABC.trim());
            cstmt.setString(12, filter.VP_TICKET_NC.trim());
            cstmt.setString(13, filter.VP_NUM_RECIBO.trim());
            cstmt.setString(14, filter.VP_json_detail);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(15);
            filter.dbException.MESSAGE = cstmt.getString(16);
                        
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
    
    public List<SQP05194Filter> getSQP05194Filter(SQP05194Filter filter) throws SQLException, Exception {
        List<SQP05194Filter> lstRtn = new ArrayList<SQP05194Filter>(0);
        SQP05194Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05194(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_NRRPT);
            cstmt01.setString(3, filter.VP_CDCLI);            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05194Filter();
                objRtn.A4252CCUST =  rs01.getString("A4252CCUST");
                objRtn.A4252IDPG = rs01.getString("A4252IDPG");                
                //objRtn.A4252REFPG = rs01.getString("A4252REFPG");
                objRtn.A4252FECPG = rs01.getString("A4252FECPG");
                objRtn.A4252MDAPG = rs01.getString("A4252MDAPG");
                objRtn.A4252TOTPG = rs01.getDouble("A4252TOTPG");                
                objRtn.A4252TIPPG = rs01.getString("A4252TIPPG_00");
                objRtn.A4252NRRPT = rs01.getString("A4252NRRPT");
                objRtn.A4252CDCLI = rs01.getString("A4252CDCLI");
                //objRtn.A4252BANCO = rs01.getString("A4252BANCO");                
                //objRtn.A4252CTABC = rs01.getString("A4252CTABC");
                objRtn.A4252REGIS = rs01.getString("A4252REGIS");
                objRtn.A4252FREGI = rs01.getString("A4252FREGI");
                objRtn.A4252HREGI = rs01.getString("A4252HREGI");
                objRtn.A4252REVIS = rs01.getString("A4252REVIS");
                objRtn.A4252FREVI = rs01.getString("A4252FREVI");
                objRtn.A4252HREVI = rs01.getString("A4252HREVI");                
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
     public List<SQP05195Filter> getSQP05195Filter(SQP05195Filter filter) throws SQLException, Exception {
        List<SQP05195Filter> lstRtn = new ArrayList<SQP05195Filter>(0);
        SQP05195Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05195(?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.TICKET_NUMBER);
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
                objRtn = new SQP05195Filter();
                objRtn.A4254CCUST =  rs01.getString("A4254CCUST");
                objRtn.TICKET_NUMBER = rs01.getString("A4254CIA")+rs01.getString("A4254FORMA")+rs01.getString("A4254SERIE");
                objRtn.A4254CIA = rs01.getString("A4254CIA");
                objRtn.A4254FORMA = rs01.getString("A4254FORMA");
                objRtn.A4254SERIE = rs01.getString("A4254SERIE");
                objRtn.A4254SEQ = rs01.getString("A4254SEQ");
                objRtn.A4254TRNCU = rs01.getString("A4254TRNCU");
                objRtn.A4254GRUPO = rs01.getString("A4254GRUPO");
                objRtn.A4254SQAPL = rs01.getString("A4254SQAPL");
                objRtn.A4254NRRPT = rs01.getString("A4254NRRPT");
                objRtn.A4254SQRPT = rs01.getString("A4254SQRPT");
                objRtn.A4254CDCLI = rs01.getString("A4254CDCLI");
                objRtn.A4254TIPPG = rs01.getString("A4254TIPPG_00");
                objRtn.A4254STSPG = rs01.getString("A4254STSPG_00");
                objRtn.A4254IDPG = rs01.getString("A4254IDPG");
                objRtn.A4254SQPG = rs01.getString("A4254SQPG");
                objRtn.A4254SQRCB = rs01.getString("A4254SQRCB");                
                objRtn.A4254REFPG = rs01.getString("A4254REFPG");
                objRtn.A4254FECPG = rs01.getString("A4254FECPG");
                objRtn.A4254BANCO = rs01.getString("A4254BANCO");
                objRtn.A4254CTABC = rs01.getString("A4254CTABC");
                objRtn.A4254TRXPG = rs01.getString("A4254TRXPG");
                
                //importe
                objRtn.A4254TOT = rs01.getDouble("A4254TOT");
                objRtn.A4254TOTAP = rs01.getDouble("A4254TOTAP");
                objRtn.A4254TAJUS = rs01.getDouble("A4254TAJUS");
                objRtn.A4254SALD = rs01.getDouble("A4254SALD");
                objRtn.A4254MDA = rs01.getString("A4254MDA");
                //audit
                objRtn.A4254APLIC = rs01.getString("A4254APLIC");
                objRtn.A4254FAPLC = rs01.getString("A4254FAPLC");
                objRtn.A4254HAPLC = rs01.getString("A4254HAPLC");
                objRtn.A4254REGIS = rs01.getString("A4254REGIS");
                objRtn.A4254FREGI = rs01.getString("A4254FREGI");
                objRtn.A4254HREGI = rs01.getString("A4254HREGI");
                objRtn.A4254REVIS = rs01.getString("A4254REVIS");
                objRtn.A4254FREVI = rs01.getString("A4254FREVI");
                objRtn.A4254HREVI = rs01.getString("A4254HREVI");
                
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
     public SQP03943Filter setSQP03943Filter(SQP03943Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03943(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);            
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(3, filter.A4252REFPG);
//            cstmt.setString(4, filter.A4252FECPG);
//            cstmt.setDouble(5, filter.A4252TOTPG);
//            cstmt.setString(6, filter.A4252MDAPG);
//            cstmt.setString(7, filter.A4252TIPPG);
//            cstmt.setString(8, filter.A4252NRRPT);
//            cstmt.setString(9, filter.A4252CDCLI);
//            cstmt.setString(10, filter.A4252BANCO.trim());
//            cstmt.setString(11, filter.A4252CTABC.trim()); 
            cstmt.setString(12, filter.VP_CAPL); 
            
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);
                        
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
     public SQP04059Filter setSQP04059Filter(SQP04059Filter filter ) throws SQLException, Exception {        
        SQP04059Filter objRtn; 
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04059(?,?,?,?,?,?)}";
        Connection cnx = null;        
        ResultSet rst = null;        
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
                cstmt01 = cnx.prepareCall(SQLCLL01);            
                cstmt01.registerOutParameter(4, Types.VARCHAR);
                cstmt01.registerOutParameter(5, Types.VARCHAR);
                cstmt01.registerOutParameter(6, Types.VARCHAR);
                cstmt01.setString(1, filter.VP_ACTION);
                cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(3, filter.VP_JSON);
                cstmt01.execute();
                objRtn = new SQP04059Filter();                
                objRtn.dbException.SQLCODE = cstmt01.getString(4);
                objRtn.dbException.MESSAGE = cstmt01.getString(5);
                objRtn.OU_A4021LOTE = cstmt01.getString(6);
                
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
     public List<SQP04053Filter> getSQP04053Filter(SQP04053Filter filter) throws SQLException, Exception {
        List<SQP04053Filter> lstRtn = new ArrayList<SQP04053Filter>(0);
        SQP04053Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04053(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4021LOTE);
            cstmt01.setString(3, filter.VP_BOLETO);
            cstmt01.setString(4, filter.VP_A4021STAT);
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
                objRtn = new SQP04053Filter();
                objRtn.A4021CCUST =  rs01.getString("A4021CCUST");                
                objRtn.A4021LOTE = rs01.getString("A4021LOTE");
                objRtn.A4021SQCG = rs01.getString("A4021SQCG");
                objRtn.A4021CIA = rs01.getString("A4021CIA");
                objRtn.A4021FORMA = rs01.getString("A4021FORMA");
                objRtn.A4021SERIE = rs01.getString("A4021SERIE");
                objRtn.A4021UUID = rs01.getString("A4021UUID");
                objRtn.A4021REFPG = rs01.getString("A4021REFPG");
                objRtn.A4021FECPG = rs01.getString("A4021FECPG");
                objRtn.A4021TOTPG = rs01.getDouble("A4021TOTPG");
                objRtn.A4021MDAPG = rs01.getString("A4021MDAPG");
                objRtn.A4021STAT = rs01.getString("A4021STAT");
                objRtn.A4021CODER = rs01.getString("A4021CODER");
                objRtn.A4021DESER = rs01.getString("A4021DESER");
                objRtn.A4021NRRPT = rs01.getString("A4021NRRPT");
                objRtn.A4021CDCLI = rs01.getString("A4021CDCLI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A4021TOVTA = rs01.getDouble("A4021TOVTA");
                objRtn.A4021TODIF = rs01.getDouble("A4021TODIF");
                objRtn.A4021BANCO = rs01.getString("A4021BANCO");
                objRtn.A4021CTABC = rs01.getString("A4021CTABC");               
                //audit
                objRtn.A4021REGIS = rs01.getString("A4021REGIS");
                objRtn.A4021FREGI = rs01.getString("A4021FREGI");
                objRtn.A4021HREGI = rs01.getString("A4021HREGI");
                
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
