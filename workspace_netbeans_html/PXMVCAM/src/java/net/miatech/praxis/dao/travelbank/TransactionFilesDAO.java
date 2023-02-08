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
import net.miatech.praxis.travelbank.SQP04806Filter;
import net.miatech.praxis.travelbank.SQP04807Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class TransactionFilesDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
   private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public TransactionFilesDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    
    public List<SQP04806Filter> getSQP04806Filter(SQP04806Filter filter) throws SQLException, Exception {
        List<SQP04806Filter> lstRtn = new ArrayList<SQP04806Filter>(0);
        SQP04806Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04806(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_IDFIL1);
            cstmt01.setString(4, filter.VP_IDFIL2);
            cstmt01.setString(5, filter.VP_DESDE);
            cstmt01.setString(6, filter.VP_HASTA);
            cstmt01.setString(7, filter.VP_IDISS);
            cstmt01.setString(8, filter.VP_STS);
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
                objRtn = new SQP04806Filter();
                objRtn.A4280CCUST = rs01.getString("A4280CCUST");
                objRtn.A4280PRDA = rs01.getString("A4280PRDA");
                objRtn.A4280MDA = rs01.getString("A4280MDA");
                objRtn.A4280SQDIA = rs01.getString("A4280SQDIA");
                objRtn.A4280TIP = rs01.getString("A4280TIP");
                objRtn.A4280TRX2 = rs01.getString("A4280TRX2");
                objRtn.A4280TOT = rs01.getDouble("A4280TOT");                
                objRtn.A4280DEC = rs01.getString("A4280DEC");
                objRtn.A4280STS = rs01.getString("A4280STS");  
                objRtn.A4280STS_1 = rs01.getString("A4280STS_1");  
                objRtn.A4280STS2 = rs01.getString("A4280STS2");
                objRtn.A4280STS2_1 = rs01.getString("A4280STS2_1");
                objRtn.A4280STS3 = rs01.getString("A4280STS3");                
                objRtn.A4280IDFIL = rs01.getString("A4280IDFIL");
                objRtn.A4280TYPE = rs01.getString("A4280TYPE");
                objRtn.A4280PCONT = rs01.getString("A4280PCONT");
                objRtn.A4280FCONT = rs01.getString("A4280FCONT");
                // aut
                objRtn.A4280REGIS = rs01.getString("A4280REGIS");
                objRtn.A4280FREGI = rs01.getString("A4280FREGI");
                objRtn.A4280HREGI = rs01.getString("A4280HREGI");
                objRtn.A4280REVIS = rs01.getString("A4280REVIS");
                objRtn.A4280FREVI = rs01.getString("A4280FREVI");
                objRtn.A4280HREVI = rs01.getString("A4280HREVI");
                
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
    
    public List<SQP04807Filter> getSQP04807Filter(SQP04807Filter filter) throws SQLException, Exception {
        List<SQP04807Filter> lstRtn = new ArrayList<SQP04807Filter>(0);
        SQP04807Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04807(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_PRDA);
            cstmt01.setString(4, filter.VP_MDA);
            cstmt01.setString(5, filter.VP_SQDIA);
            cstmt01.setString(6, filter.VP_IDISS);
            cstmt01.setString(7, filter.VP_Document);
            cstmt01.setString(8, filter.VP_IDISR);
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
                objRtn = new SQP04807Filter();
                objRtn.A4281CCUST  = rs01.getString("A4281CCUST");
                objRtn.A4281IDISS = rs01.getString("A4281IDISS");
                objRtn.A4281NCTA = rs01.getString("A4281NCTA");
                objRtn.A4281SERV = rs01.getString("A4281SERV");
                objRtn.A4281PRDA = rs01.getString("A4281PRDA");
                objRtn.A4281MDA = rs01.getString("A4281MDA");
                objRtn.A4281SQDIA = rs01.getString("A4281SQDIA");                
                objRtn.A4281DEC = rs01.getString("A4281DEC");
                objRtn.A4281VALOR = rs01.getDouble("A4281VALOR");                                
                objRtn.A4281REF = rs01.getString("A4281REF");  
                objRtn.A4281CIU = rs01.getString("A4281CIU");  
                objRtn.A4281MOT = rs01.getString("A4281MOT");
                objRtn.A4281TIPD = rs01.getString("A4281TIPD");
                objRtn.A4281FEMI = rs01.getString("A4281FEMI");                
                objRtn.A4281FEXP = rs01.getString("A4281FEXP");
                objRtn.A4281NMC = rs01.getString("A4281NMC");
                objRtn.A4281CIA = rs01.getString("A4281CIA");
                objRtn.A4281FORMA = rs01.getString("A4281FORMA");
                objRtn.A4281SERIE = rs01.getString("A4281SERIE");
                objRtn.A4281STS = rs01.getString("A4281STS");
                objRtn.A4281ERR = rs01.getString("A4281ERR");
                objRtn.A4281IDFIL = rs01.getString("A4281IDFIL");
                objRtn.A4281TYPE = rs01.getString("A4281TYPE");
                objRtn.A4281TRNCU = rs01.getString("A4281TRNCU");
                objRtn.A4281IDISR = rs01.getString("A4281IDISR");
                objRtn.A4281SQISR = rs01.getString("A4281SQISR");                                
                // aut
                objRtn.A4281REGIS = rs01.getString("A4281REGIS");
                objRtn.A4281FREGI = rs01.getString("A4281FREGI");
                objRtn.A4281HREGI = rs01.getString("A4281HREGI");
                objRtn.A4281REVIS = rs01.getString("A4281REVIS");
                objRtn.A4281FREVI = rs01.getString("A4281FREVI");
                objRtn.A4281HREVI = rs01.getString("A4281HREVI");
                
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
