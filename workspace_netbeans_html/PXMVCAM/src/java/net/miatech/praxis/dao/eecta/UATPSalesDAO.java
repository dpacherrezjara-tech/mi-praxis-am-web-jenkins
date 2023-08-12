/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP04627Filter;
import net.miatech.praxis.eecta.SQP04628Filter;
import net.miatech.praxis.eecta.SQP04629Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author Dvicente
 */
public class UATPSalesDAO {
    
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
    
    public SQP04627Filter setSQP04627Filter() throws SQLException,Exception{
        CallableStatement cstmt = null;
        SQP04627Filter response = null;
        String SQL = "{CALL PXUATP.SQP04627(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.registerOutParameter(1, Types.VARCHAR);
            cstmt.registerOutParameter(2, Types.VARCHAR);
            cstmt.execute();
            response = new SQP04627Filter();
            response.setOU_SQLCODE(cstmt.getString(1));
            response.setOU_MESSAGE(cstmt.getString(2));
        } catch (Exception e) {
            logError.info("Exception -> User: " + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(),e);
        }finally {
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
        
        return response;
    }
    
    public List<SQP04628Filter> getSQP04628Filter(SQP04628Filter filter)throws SQLException,Exception{
        List<SQP04628Filter> response = new ArrayList<>();
        CallableStatement cstmt = null;
        String SQL = "{CALL PXUATP.SQP04628(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rs = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.setString(1, filter.getIN_FROMDATE());
            cstmt.setString(2, filter.getIN_TODATE());
            cstmt.setString(3, filter.getIN_IDFILE());
            cstmt.setInt(4, filter.getPagination().PAGNUM);
            cstmt.setInt(5, filter.getPagination().PAGROW);
            cstmt.setInt(6, filter.getPagination().TOTPAG);
            cstmt.setInt(7, filter.getPagination().TOTROW);
            cstmt.execute();
            filter.getPagination().PAGNUM = cstmt.getInt(4);
            filter.getPagination().PAGROW = cstmt.getInt(5);
            filter.getPagination().TOTPAG = cstmt.getInt(6);
            filter.getPagination().TOTROW = cstmt.getInt(7);
            rs = cstmt.getResultSet();
            while (rs.next()) {                
                SQP04628Filter obj = new SQP04628Filter();
                obj.setA4264CCUST(rs.getString("A4264CCUST"));
                obj.setA4264CFBC(rs.getDouble("A4264CFBC"));
                obj.setA4264CFBD(rs.getDouble("A4264CFBD"));
                obj.setA4264CFIT(rs.getString("A4264CFIT"));
                obj.setA4264CFSC(rs.getDouble("A4264CFSC"));
                obj.setA4264CFSD(rs.getDouble("A4264CFSD"));
                obj.setA4264FCARG(rs.getString("A4264FCARG"));
                obj.setA4264FECAC(rs.getString("A4264FECAC"));
                obj.setA4264FECIN(rs.getString("A4264FECIN"));
                obj.setA4264FLNM(rs.getString("A4264FLNM"));
                obj.setA4264HCARG(rs.getString("A4264HCARG"));
                obj.setA4264HORAC(rs.getString("A4264HORAC"));
                obj.setA4264HORIN(rs.getString("A4264HORIN"));
                obj.setA4264IDFIL(rs.getString("A4264IDFIL"));
                obj.setA4264INVC(rs.getString("A4264INVC"));
                obj.setA4264INVE(rs.getString("A4264INVE"));
                obj.setA4264PRDA(rs.getString("A4264PRDA"));
                obj.setA4264REVNC(rs.getString("A4264REVNC"));
                obj.setA4264SQNR(rs.getDouble("A4264SQNR"));
                obj.setA4264STCAR(rs.getString("A4264STCAR"));
                obj.setA4264STREC(rs.getString("A4264STREC"));
                obj.setA4264TIME(rs.getString("A4264TIME"));
                obj.setA4264TLINVC(rs.getDouble("A4264TLINV"));
                obj.setA4264TNBT(rs.getDouble("A4264TNBT"));
                obj.setA4264TNIV(rs.getDouble("A4264TNIV"));
                obj.setA4264TPST(rs.getString("A4264TPST"));
                obj.setA4264TTRNC(rs.getDouble("A4264TTRNC"));
                obj.setA4264UCARG(rs.getString("A4264UCARG"));
                obj.setA4264USRAC(rs.getString("A4264USRAC"));
                obj.setA4264USRIN(rs.getString("A4264USRIN"));
                
                //datos de ingreso
                obj.setIN_FROMDATE(filter.getIN_FROMDATE());
                obj.setIN_TODATE(filter.getIN_TODATE());
                obj.setIN_IDFILE(filter.getIN_IDFILE());
                
                //datos de paginacion
                obj.getPagination().PAGNUM = filter.getPagination().PAGNUM;
                obj.getPagination().PAGROW = filter.getPagination().PAGROW;
                obj.getPagination().TOTPAG = filter.getPagination().TOTPAG;
                obj.getPagination().TOTROW = filter.getPagination().TOTROW;
                response.add(obj);
            }
            
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            response = null;
        }finally{
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
        return response;
    }
    
    public boolean setX3155(List<String> lines)throws SQLException,Exception{
        Connection cnx = null;
        PreparedStatement pstmt = null;
        String SQL = "INSERT INTO PXUATP.X3155 VALUES (?)";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cnx.prepareStatement("TRUNCATE TABLE PXUATP.X3155").execute();
            pstmt = cnx.prepareStatement(SQL);
            //cnx.setAutoCommit(false);
            for(String line : lines){
                pstmt.setString(1, line);
                pstmt.addBatch();
            }
            pstmt.executeBatch();
            //cnx.commit();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            return false;
        }finally{
            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return true;
    }
    
    public SQP04629Filter getSQP04629Filter(SQP04629Filter filter) throws SQLException, Exception{
        Connection cnx = null;
        CallableStatement cstmt = null;
        String SQL = "{CALL PXUATP.SQP04629(?,?)}";
        SQP04629Filter response =  new SQP04629Filter();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1,filter.getIN_CCUST());
            cstmt.setString(2, filter.getIN_IDFILE());
            //cstmt.registerOutParameter(3, Types.VARCHAR);
            //cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.execute();
            response.setOU_SQLCODE("1");
            response.setOU_MESSAGE("Proceso culminado.");
        } catch (Exception e) {
            logError.info("Exception -> User: " + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(),e);
            response.setOU_SQLCODE("2");
            response.setOU_MESSAGE("Error al procesar => " + e.getMessage());
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
        return response;
    }
    
}
