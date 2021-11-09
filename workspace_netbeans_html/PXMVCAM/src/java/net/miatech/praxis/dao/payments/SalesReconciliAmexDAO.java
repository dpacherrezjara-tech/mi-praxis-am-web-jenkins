/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class SalesReconciliAmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesReconciliAmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReconciliAmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A4113Filter> loadPX570SQP04257(A4113Filter filter) throws SQLException, Exception {

        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04257(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);

            cstmt.execute();

//            rst = cstmt.getResultSet();
//            while (rst.next()) {
//                lngTotQMATCH = rst.getLong("QMATCH");
//                lngTotQBANK = rst.getLong("QBANK");
//                // lngTotQBANK_R = rst.getLong("QBANK_R");
//                total = lngTotQBANK + lngTotQBANK_R;
//                lngTotQPAY = rst.getLong("QPAY");
//                lngTotQDIFF = rst.getLong("QDIFF");
//                lngTotQTYTRA = rst.getLong("QTYTRA");
//                lngTotQTYDOC = rst.getLong("QTYDOC");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
                
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4113Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    
                    
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.PMERCHID = rst.getString("PMERCHID").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    
                    beanTkt.PNETAMOU = rst.getDouble("PNETAMOU");
                    beanTkt.PGROSAMOU = rst.getDouble("PGROSAMOU");
                    beanTkt.PDISCAMOU = rst.getDouble("PDISCAMOU");
                    beanTkt.PSFEEAMOU = rst.getDouble("PSFEEAMOU");
                    beanTkt.PADJAMOUN = rst.getDouble("PADJAMOUN");
                    beanTkt.PTAXAMOU = rst.getDouble("PTAXAMOU");
                    beanTkt.ODBALAMOU = rst.getDouble("ODBALAMOU");

                    lstTkts.add(beanTkt);
                }
                rst.close();
//            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
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

        return lstTkts;
    }
    
    
    
    // ---------------------------------------------------------------------------------------------------------------

}
