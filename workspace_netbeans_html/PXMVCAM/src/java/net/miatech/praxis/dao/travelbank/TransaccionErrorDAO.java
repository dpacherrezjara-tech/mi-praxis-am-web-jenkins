/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.travelbank;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.travelbank.SQP04948Filter;
import net.miatech.praxis.travelbank.SQP04949Filter;
import net.miatech.praxis.travelbank.SQP04984Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class TransaccionErrorDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public TransaccionErrorDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    // <editor-fold defaultstate="collapsed" desc="Resumen de errores">
    public List<SQP04948Filter> getSQP04948Filter(SQP04948Filter filter) throws SQLException, Exception {
        List<SQP04948Filter> lstRtn = new ArrayList<SQP04948Filter>(0);
        SQP04948Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04948(?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.VP_DESDE);
            cstmt01.setString(4, filter.VP_HASTA);
            cstmt01.setString(5, filter.VP_NCTA);
            cstmt01.setString(6, filter.VP_TICKET);
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
                objRtn = new SQP04948Filter();
                objRtn.A4435CCUST = rs01.getString("A4435CCUST");
                objRtn.A4435PRDA = rs01.getString("A4435PRDA");                
                objRtn.A4435SQDIA = rs01.getString("A4435SQDIA");
                objRtn.A4435CDERR = rs01.getString("A4435CDERR");
                objRtn.A4441DES = rs01.getString("A4441DES");
                objRtn.QTY = rs01.getInt("QTY");
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
    // <editor-fold defaultstate="collapsed" desc="Detalle de errores">
    public List<SQP04949Filter> getSQP04949Filter(SQP04949Filter filter) throws SQLException, Exception {
        List<SQP04949Filter> lstRtn = new ArrayList<SQP04949Filter>(0);
        SQP04949Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04949(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PRDA);
            cstmt01.setString(3, filter.VP_SQDIA);
            cstmt01.setString(4, filter.VP_CDERR);
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
                objRtn = new SQP04949Filter();
                objRtn.A4435CCUST = rs01.getString("A4435CCUST");
                objRtn.A4435PRDA = rs01.getString("A4435PRDA");
                objRtn.A4435SQDIA = rs01.getString("A4435SQDIA");
                objRtn.A4435MDA = rs01.getString("A4435MDA");
                objRtn.A4435CDERR = rs01.getString("A4435CDERR");
                objRtn.A4435NCTA = rs01.getString("A4435NCTA");
                objRtn.A4435FECHA = rs01.getString("A4435FECHA");
                objRtn.A4435ID = rs01.getString("A4435ID");
                objRtn.A4435SQ = rs01.getString("A4435SQ");
                objRtn.A4435TYPE = rs01.getString("A4435TYPE");                
                objRtn.A4435SERV = rs01.getString("A4435SERV");
                objRtn.A4435TIPD = rs01.getString("A4435TIPD");                
                objRtn.A4435CIA = rs01.getString("A4435CIA");
                objRtn.A4435FORMA = rs01.getString("A4435FORMA");
                objRtn.A4435SERIE = rs01.getString("A4435SERIE");
                objRtn.A4435IDFIL = rs01.getString("A4435IDFIL");
                objRtn.A4435IDISS = rs01.getString("A4435IDISS");
                objRtn.A4435FEMI = rs01.getString("A4435FEMI");
                objRtn.A4435STSER = rs01.getString("A4435STSER");                               
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
    
     public SQP04984Filter setSQP04984Filter(SQP04984Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04984(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(33, Types.VARCHAR);
            cstmt.registerOutParameter(34, Types.VARCHAR);
            
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A4281IDISS);
            cstmt.setString(4, filter.A4281SQISS);
            cstmt.setString(5, filter.A4281NCTA);
            cstmt.setString(6, filter.A4281SERV);
            cstmt.setString(7, filter.A4281PRDA);
            cstmt.setString(8, filter.A4281MDA);
            cstmt.setString(9, filter.A4281SQDIA);
            cstmt.setString(10, filter.A4281DEC);
            cstmt.setDouble(11, filter.A4281VALOR);
            cstmt.setString(12, filter.A4281REF);
            cstmt.setString(13, filter.A4281CIU);
            cstmt.setString(14, filter.A4281MOT);
            cstmt.setString(15, filter.A4281TIPD);
            cstmt.setString(16, filter.A4281FEMI);
            cstmt.setString(17, filter.A4281FEXP);
            cstmt.setString(18, filter.A4281NMC);
            cstmt.setString(19, filter.A4281CIA);
            cstmt.setString(20, filter.A4281FORMA);
            cstmt.setString(21, filter.A4281SERIE);
            cstmt.setString(22, filter.A4281STS);
            cstmt.setString(23, filter.A4281ERR);
            cstmt.setString(24, filter.A4281IDFIL);
            cstmt.setString(25, filter.A4281TYPE);
            cstmt.setString(26, filter.A4281TRNCU);
            cstmt.setString(27, filter.A4281IDISR); //usado
            cstmt.setString(28, filter.A4281SQISR); //usado
            cstmt.setDouble(29, filter.A4281TCUS);
            cstmt.setDouble(30, filter.A4281TCMX);
            cstmt.setDouble(31, filter.A4281VALUS);
            cstmt.setDouble(32, filter.A4281VALMX);            
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(33);
            filter.dbException.MESSAGE = cstmt.getString(34);            
            
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
