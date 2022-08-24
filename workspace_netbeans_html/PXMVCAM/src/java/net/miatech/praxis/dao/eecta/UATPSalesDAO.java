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
import net.miatech.praxis.eecta.A4264Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.eecta.RegistroVentaOALDAO.pasarGarbageCollector;
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
    
    public A4264Filter setSQP04627Filter(A4264Filter filter) throws SQLException,Exception{
        CallableStatement cstmt = null;
        A4264Filter response = null;
        String SQL = "{CALL PXUATP.SQP04627(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.registerOutParameter(1, Types.VARCHAR);
            cstmt.registerOutParameter(2, Types.VARCHAR);
            cstmt.execute();
            response = new A4264Filter();
            response.setOUT_SQLCODE(cstmt.getString(1));
            response.setOUT_MESSAGE(cstmt.getString(2));
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
    
    public List<A4264Filter> getSQP0A4628Filter(A4264Filter filter)throws SQLException,Exception{
        List<A4264Filter> response = new ArrayList<>();
        CallableStatement cstmt = null;
        String SQL = "{CALL PXUATP.SQP04628(?,?,?)}";
        Connection cnx = null;
        ResultSet rs = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, filter.getIN_FROMDATE());
            cstmt.setString(2, filter.getIN_TODATE());
            cstmt.setString(3, filter.getIN_IDFILE());
            cstmt.execute();
            rs = cstmt.getResultSet();
            while (rs.next()) {                
                A4264Filter obj = new A4264Filter();
                //falta poner info
                response.add(obj);
            }
            
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
            cnx.setAutoCommit(false);
            for(String line : lines){
                pstmt.setString(1, line);
                pstmt.addBatch();
            }
            pstmt.executeBatch();
            cnx.commit();
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
    
}
