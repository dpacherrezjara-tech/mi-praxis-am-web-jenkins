/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP05015Filter;
import net.miatech.beans.SQP05068Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.sales.LoadControlReportDAO.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class LoadControlReportDAO {

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

    public List<SQP05015Filter> getSQP05015Filter(SQP05015Filter filter) throws SQLException, Exception {
        List<SQP05015Filter> lstRtn = new ArrayList<SQP05015Filter>(0);
        SQP05015Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP05015(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FPROC1);
            cstmt01.setString(3, filter.VP_FUEN);
            cstmt01.setString(4, filter.VP_PAIS);
            
//            cstmt01.setInt(8, filter.page.PAGNUM);
//            cstmt01.setInt(9, filter.page.PAGROW);
//            cstmt01.setInt(10, filter.page.TOTPAG);
//            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(8);
//            filter.page.PAGROW = cstmt01.getInt(9);
//            filter.page.TOTPAG = cstmt01.getInt(10);
//            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05015Filter();
                objRtn.NHOT = rs01.getInt("NHOT");
                objRtn.COUNTRY = rs01.getString("COUNTRY");
                objRtn.COUNTRY_CODE = rs01.getString("COUNTRY_CODE");
                objRtn.CURR = rs01.getString("CURR");
                
                objRtn.PRDA1 = rs01.getString("PRDA1");
                objRtn.PRDA1_ = rs01.getString("PRDA1_");
                objRtn.STATUS1 = rs01.getString("STATUS1");
                objRtn.ISSUDT1 = rs01.getString("ISSUDT1");
                objRtn.SALE1 = rs01.getInt("SALE1");
                objRtn.EXCH1 = rs01.getInt("EXCH1");
                objRtn.RFND1 = rs01.getInt("RFND1");
                objRtn.MEMO1 = rs01.getInt("MEMO1");
                objRtn.VOID1 = rs01.getInt("VOID1");
                objRtn.LABEL1 = rs01.getString("LABEL1");
                objRtn.FLG1 = rs01.getString("FLG1");
                objRtn.COMMENT1 = rs01.getString("COMMENT1");

                objRtn.PRDA2 = rs01.getString("PRDA2");
                objRtn.PRDA2_ = rs01.getString("PRDA2_");
                objRtn.STATUS2 = rs01.getString("STATUS2");
                objRtn.ISSUDT2 = rs01.getString("ISSUDT2");
                objRtn.SALE2 = rs01.getInt("SALE2");
                objRtn.EXCH2 = rs01.getInt("EXCH2");
                objRtn.RFND2 = rs01.getInt("RFND2");
                objRtn.MEMO2 = rs01.getInt("MEMO2");
                objRtn.VOID2 = rs01.getInt("VOID2");
                objRtn.LABEL2 = rs01.getString("LABEL2");
                objRtn.FLG2 = rs01.getString("FLG2");
                objRtn.COMMENT2 = rs01.getString("COMMENT2");

                objRtn.PRDA3 = rs01.getString("PRDA3");
                objRtn.PRDA3_ = rs01.getString("PRDA3_");
                objRtn.STATUS3 = rs01.getString("STATUS3");
                objRtn.ISSUDT3 = rs01.getString("ISSUDT3");
                objRtn.SALE3 = rs01.getInt("SALE3");
                objRtn.EXCH3 = rs01.getInt("EXCH3");
                objRtn.RFND3 = rs01.getInt("RFND3");
                objRtn.MEMO3 = rs01.getInt("MEMO3");
                objRtn.VOID3 = rs01.getInt("VOID3");
                objRtn.LABEL3 = rs01.getString("LABEL3");
                objRtn.FLG3 = rs01.getString("FLG3");
                objRtn.COMMENT3 = rs01.getString("COMMENT3");

                objRtn.PRDA4 = rs01.getString("PRDA4");
                objRtn.PRDA4_ = rs01.getString("PRDA4_");
                objRtn.STATUS4 = rs01.getString("STATUS4");
                objRtn.ISSUDT4 = rs01.getString("ISSUDT4");
                objRtn.SALE4 = rs01.getInt("SALE4");
                objRtn.EXCH4 = rs01.getInt("EXCH4");
                objRtn.RFND4 = rs01.getInt("RFND4");
                objRtn.MEMO4 = rs01.getInt("MEMO4");
                objRtn.VOID4 = rs01.getInt("VOID4");
                objRtn.LABEL4 = rs01.getString("LABEL4");
                objRtn.FLG4 = rs01.getString("FLG4");
                objRtn.COMMENT4 = rs01.getString("COMMENT4");

                objRtn.PRDA5 = rs01.getString("PRDA5");
                objRtn.PRDA5_ = rs01.getString("PRDA5_");
                objRtn.STATUS5 = rs01.getString("STATUS5");
                objRtn.ISSUDT5 = rs01.getString("ISSUDT5");
                objRtn.SALE5 = rs01.getInt("SALE5");
                objRtn.EXCH5 = rs01.getInt("EXCH5");
                objRtn.RFND5 = rs01.getInt("RFND5");
                objRtn.MEMO5 = rs01.getInt("MEMO5");
                objRtn.VOID5 = rs01.getInt("VOID5");
                objRtn.LABEL5 = rs01.getString("LABEL5");
                objRtn.FLG5 = rs01.getString("FLG5");
                objRtn.COMMENT5 = rs01.getString("COMMENT5");

                objRtn.PRDA6 = rs01.getString("PRDA6");
                objRtn.PRDA6_ = rs01.getString("PRDA6_");
                objRtn.STATUS6 = rs01.getString("STATUS6");
                objRtn.ISSUDT6 = rs01.getString("ISSUDT6");
                objRtn.SALE6 = rs01.getInt("SALE6");
                objRtn.EXCH6 = rs01.getInt("EXCH6");
                objRtn.RFND6 = rs01.getInt("RFND6");
                objRtn.MEMO6 = rs01.getInt("MEMO6");
                objRtn.VOID6 = rs01.getInt("VOID6");
                objRtn.LABEL6 = rs01.getString("LABEL6");
                objRtn.FLG6 = rs01.getString("FLG6");
                objRtn.COMMENT6 = rs01.getString("COMMENT6");

                objRtn.PRDA7 = rs01.getString("PRDA7");
                objRtn.PRDA7_ = rs01.getString("PRDA7_");
                objRtn.STATUS7 = rs01.getString("STATUS7");
                objRtn.ISSUDT7 = rs01.getString("ISSUDT7");
                objRtn.SALE7 = rs01.getInt("SALE7");
                objRtn.EXCH7 = rs01.getInt("EXCH7");
                objRtn.RFND7 = rs01.getInt("RFND7");
                objRtn.MEMO7 = rs01.getInt("MEMO7");
                objRtn.VOID7 = rs01.getInt("VOID7");
                objRtn.LABEL7 = rs01.getString("LABEL7");
                objRtn.FLG7 = rs01.getString("FLG7");
                objRtn.COMMENT7 = rs01.getString("COMMENT7");
                
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
    
    //excel
    public List<SQP05068Filter> getSQP05068Filter(SQP05068Filter filter) throws SQLException, Exception {
        List<SQP05068Filter> lstRtn = new ArrayList<SQP05068Filter>(0);
        SQP05068Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP05068(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FPROC1);
            cstmt01.setString(3, filter.VP_FPROC2);            
            
//            cstmt01.setInt(8, filter.page.PAGNUM);
//            cstmt01.setInt(9, filter.page.PAGROW);
//            cstmt01.setInt(10, filter.page.TOTPAG);
//            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(8);
//            filter.page.PAGROW = cstmt01.getInt(9);
//            filter.page.TOTPAG = cstmt01.getInt(10);
//            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05068Filter();
                objRtn.a4493.A4493CCUST = rs01.getString("A4493CCUST");
                objRtn.a4493.A4493PRDA = rs01.getString("A4493PRDA");
                objRtn.a4493.A4493HOTN = rs01.getInt("A4493HOTN");
                objRtn.a4493.A4493FUENT = rs01.getString("A4493FUENT");                
                objRtn.a4493.A4493PAIS = rs01.getString("A4493PAIS");                
                objRtn.a4493.A4493PAISD = rs01.getString("A4493PAISD");
                objRtn.a4493.A4493MDA = rs01.getString("A4493MDA");                                              
                                
                objRtn.a4493.A4493STAT = rs01.getString("A4493STAT");
                objRtn.a4493.A4493ISSUD = rs01.getString("A4493ISSUD");
                objRtn.a4493.A4493SALE = rs01.getInt("A4493SALE");
                objRtn.a4493.A4493EXCH = rs01.getInt("A4493EXCH");
                objRtn.a4493.A4493RFND = rs01.getInt("A4493RFND");
                objRtn.a4493.A4493MEMO = rs01.getInt("A4493MEMO");
                objRtn.a4493.A4493VOID = rs01.getInt("A4493VOID");
                objRtn.a4493.A4493LABEL = rs01.getString("A4493LABEL");
                objRtn.a4493.A4493FLAG = rs01.getString("A4493FLAG");
                objRtn.a4859.A4859COME = rs01.getString("A4859COME");
                
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
