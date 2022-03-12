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
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A4116Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class SalesCompensationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesCompensationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesCompensationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4116Filter> loadPX588SQP04425(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstData = new ArrayList<A4116Filter>(0);
        A4116Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        double totTGROSAMOUN = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04425(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM.trim());
            cstmt.setString(3, filter.IN_DATETO.trim());
            cstmt.setString(4, filter.IN_DATE.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A4116Filter();
                    bean.RN = rst.getString("RN");
                    bean.BSUMDATE = rst.getString("BSUMDATE").trim();
                    bean.SPNR = rst.getString("SPNR").trim();
                    bean.ISREFNBR = rst.getString("ISREFNBR").trim();
                    bean.SCARDN = rst.getString("SCARDN").trim();
                    bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                    bean.PCURRENCY = rst.getString("PCURRENCY").trim();
                    bean.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    bean.PAYDATE = rst.getString("PAYDATE").trim();
                    bean.MERCHID = rst.getString("MERCHID").trim();
                    bean.TRANSDATE = rst.getString("TRANSDATE").trim();
                    bean.STVAL = rst.getString("STVAL").trim();
                    bean.descSTVAL = "Forced Match";
                    bean.CERROR = rst.getString("CERROR").trim();
                    bean.desCERROR = "Compensation";
                    bean.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    
                    bean.A720AGENTE = rst.getString("A720AGENTE").trim();
                    bean.A720FRESV = rst.getString("A720FRESV").trim();
                    bean.A720RUTA0 = rst.getString("A720RUTA0").trim();
                    bean.A720RUTA1 = rst.getString("A720RUTA1").trim();
                    bean.A720NVLO1 = rst.getString("A720NVLO1").trim();
                    bean.A720FVLO1 = rst.getString("A720FVLO1").trim();

                    bean.totTGROSAMOUN = totTGROSAMOUN;
                    
                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
                rst.close();
            }

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

        return lstData;
    }
}
