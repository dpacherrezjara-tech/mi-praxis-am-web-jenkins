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
            cstmt01.setString(5, filter.VP_STAT );
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
    
    public SQP04195Filter setSQP04195Filter(SQP04195Filter filter ) throws SQLException, Exception {        
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
     public SQP04197Filter setSQP04197Filter(SQP04197Filter filter ) throws SQLException, Exception {        
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
    
}
