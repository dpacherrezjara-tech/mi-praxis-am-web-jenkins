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
import net.miatech.praxis.payment.filter.A3800Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class LastConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LastConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LastConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3800Filter> loadPX565SQP04093(A3800Filter filter) throws SQLException, Exception {
        List<A3800Filter> list = new ArrayList<A3800Filter>();
        A3800Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblAMOUNTDOC = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04093(?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());

            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rs01 = cstmt.getResultSet();
            while (rs01.next()) {

                //dblAMOUNTDOC = rs01.getDouble("AMOUNTDOC");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    objRtn = new A3800Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    
                    //, , , , , , , , ,
                    //, , , , , , 
                            
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.SCARCOD = rs01.getString("SCARCOD").trim();
                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.SCARDN = rs01.getString("SCARDN").trim();
                    objRtn.SDATEXP = rs01.getString("SDATEXP").trim();
                    objRtn.SAUTHOC = rs01.getString("SAUTHOC").trim();
                    objRtn.SPNR = rs01.getString("SPNR").trim();
                    objRtn.TRNCU = rs01.getString("TRNCU").trim();
                    objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.SPAYMENT = rs01.getString("SPAYMENT").trim();
                    objRtn.SVFOP = rs01.getDouble("SVFOP");
                    objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                    objRtn.SVFOPS = rs01.getDouble("SVFOPS");
                    objRtn.SCURRENCYS = rs01.getString("SCURRENCYS").trim();

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);
                }
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return list;
    }
    
}
