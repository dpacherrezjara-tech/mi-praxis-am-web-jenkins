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
import net.miatech.praxis.eecta.SQP03347Filter;
import net.miatech.praxis.eecta.SQP03348Filter;
import net.miatech.praxis.eecta.SQP04108Filter;
import net.miatech.praxis.eecta.SQP04109Filter;
import net.miatech.praxis.eecta.SQP04110Filter;
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
    
    public List<SQP04108Filter> getSQP04108Filter(SQP04108Filter filter) throws SQLException, Exception {
        List<SQP04108Filter> lstRtn = new ArrayList<SQP04108Filter>(0);
        SQP04108Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04108(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_FDATE2);            
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
                objRtn = new SQP04108Filter();
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530FCONT = rs01.getString("A1530FCONT");                
                objRtn.A1530STS9 = rs01.getString("A1530STS9");
                objRtn.STS9 = rs01.getString("STS9");                    
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
    public List<SQP04109Filter> getSQP04109Filter(SQP04109Filter filter) throws SQLException, Exception {
        List<SQP04109Filter> lstRtn = new ArrayList<SQP04109Filter>(0);
        SQP04109Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04109(?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_TICKET);            
            cstmt01.setString(5, filter.VP_ESTADO);            
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
                objRtn = new SQP04109Filter();                
                objRtn.A3535CCUST = rs01.getString("A3535CCUST");
                objRtn.A3535CIA = rs01.getString("A3535CIA");                
                objRtn.A3535FORMA = rs01.getString("A3535FORMA");
                objRtn.A3535SERIE = rs01.getString("A3535SERIE");                    
                objRtn.A3535SEQ = rs01.getString("A3535SEQ");                    
                objRtn.A3535GRUPO = rs01.getString("A3535GRUPO");                    
                objRtn.A3535FPROC = rs01.getString("A3535FPROC");                    
                objRtn.A3535FUENT = rs01.getString("A3535FUENT");                    
                objRtn.A3535TDOC = rs01.getString("A3535TDOC");
                objRtn.A3535TRNCU = rs01.getString("A3535TRNCU");
                objRtn.A3535PNR = rs01.getString("A3535PNR");
                objRtn.A3535IATA = rs01.getString("A3535IATA");
                objRtn.A3535FEVTA = rs01.getString("A3535FEVTA");
                objRtn.A3535PAX = rs01.getString("A3535PAX");
                
                objRtn.A3535FCONT = rs01.getString("A3535FCONT");
                objRtn.A3535ESTA = rs01.getString("A3535ESTA");
                objRtn.A3535CODE = rs01.getString("A3535CODE");
                objRtn.A1272DES = rs01.getString("A1272DES");                
                objRtn.A3535MDLOC = rs01.getString("A3535MDLOC");
                objRtn.A3535TCMXN = rs01.getDouble("A3535TCMXN");
                objRtn.A3535FARE = rs01.getDouble("A3535FARE");
                objRtn.A3535IVA = rs01.getDouble("A3535IVA");
                objRtn.A3535TUA = rs01.getDouble("A3535TUA");
                objRtn.A3535YR = rs01.getDouble("A3535YR");
                objRtn.A3535YQ = rs01.getDouble("A3535YQ");
                objRtn.A3535OTR = rs01.getDouble("A3535OTR");
                objRtn.A3535TOTAL = rs01.getDouble("A3535TOTAL");
                
                objRtn.A3535CFOP = rs01.getString("A3535CFOP");
                objRtn.A3535TTARJ = rs01.getString("A3535TTARJ");
                objRtn.A3535NTARJ = rs01.getString("A3535NTARJ");
                objRtn.A3535VFOP = rs01.getDouble("A3535VFOP");
                
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
     
    public SQP04110Filter setSQP04110Filter(SQP04110Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04110(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);                        
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_PROCESO);
            cstmt.setString(3, filter.VP_FDATE1);
            cstmt.setString(4, filter.VP_FDATE2);
            cstmt.setString(5, filter.VP_FEJEC);
            cstmt.setString(6, filter.VP_CDCLI);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(7);
            filter.dbException.MESSAGE = cstmt.getString(8);
                        
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
    public List<SQP03347Filter> getSQP03347Filter(SQP03347Filter filter) throws SQLException, Exception {
        List<SQP03347Filter> lstRtn = new ArrayList<SQP03347Filter>(0);
        SQP03347Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03347(?,?,?)}";
        Connection cnx = null;        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);           
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDESDE);
            cstmt01.setString(3, filter.VP_FHASTA);
            cstmt01.execute();                        
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03347Filter();                
                objRtn.A4054CCUST = rs01.getString("A4054CCUST");
                objRtn.A4054CIA = rs01.getString("A4054CIA");                
                objRtn.A4054FORMA = rs01.getString("A4054FORMA");
                objRtn.A4054SERIE = rs01.getString("A4054SERIE");                    
                objRtn.A4054SEQ = rs01.getString("A4054SEQ");                    
                objRtn.A4054TRNCU = rs01.getString("A4054TRNCU");                    
                objRtn.A4054GRUPO = rs01.getString("A4054GRUPO");                                                    
                objRtn.A4054FCONT = rs01.getString("A4054FCONT");                
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
    
    public SQP03348Filter setSQP03348Filter(SQP03348Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03348(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);                        
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_CCIA);
            cstmt.setString(3, filter.VP_FORMA);
            cstmt.setString(4, filter.VP_SERIE);
            cstmt.setString(5, filter.VP_SEQ);
            cstmt.setString(6, filter.VP_TRNCU);
            cstmt.setString(7, filter.VP_GRUPO);
            cstmt.setString(8, filter.vp_json);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(9);
            filter.dbException.MESSAGE = cstmt.getString(10);
                        
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
