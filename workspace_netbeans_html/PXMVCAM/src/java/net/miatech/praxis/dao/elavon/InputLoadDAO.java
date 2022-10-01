/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.elavon;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.elavon.X3147temp;
import org.apache.log4j.Logger;

/**
 *
 * @author Dvicente
 */
public class InputLoadDAO {
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
    
    public boolean setX3147(List<X3147temp> temp)throws SQLException,Exception{
        Connection cnx = null;
        PreparedStatement pstmt = null;
        String SQL = "INSERT INTO PRAXIS.X3147 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cnx.prepareStatement("TRUNCATE TABLE PRAXIS.X3147").execute();
            pstmt = cnx.prepareStatement(SQL);
            //cnx.setAutoCommit(false);
            for(X3147temp line : temp){
                pstmt.setString(1, line.getSYSTEM());
                pstmt.setString(2, line.getBATCH_DATE());
                pstmt.setString(3, line.getEXT_MID());
                pstmt.setString(4, line.getGLOBAL_NAME());
                pstmt.setString(5, line.getFUNDED_CCY());
                pstmt.setDouble(6, line.getUSD_RATE());
                pstmt.setString(7, line.getSALES_TYPE());
                pstmt.setString(8, line.getCARD());
                pstmt.setString(9, line.getROC_TEXT());
                pstmt.setString(10, line.getCOMBTIC_NUM());
                pstmt.setString(11, line.getTKT());
                pstmt.setString(12, line.getTRX_DEPART_DTE());
                pstmt.setDouble(13, line.getTRN_AMT());
                pstmt.setDouble(14, line.getCONV_TRN_AMT());
                pstmt.setString(15, line.getCPT_ID());
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
}
