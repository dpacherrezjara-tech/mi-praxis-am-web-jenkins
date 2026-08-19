/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A4803Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class ReportsFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4803Filter> SearchQueryReports(A4803Filter filter) throws SQLException, Exception {
        List<A4803Filter> lstRtn = new ArrayList<A4803Filter>(0);
        A4803Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05707(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_PROCTYPE);
            cstmt01.setString(6, filter.IN_CODADJU);
            cstmt01.setString(7, filter.IN_USER);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A4803Filter();
                objRtn.A4803CCUST = rs01.getString("A4803CCUST");
                objRtn.A4803CODRE = rs01.getString("A4803CODRE");
                objRtn.A4803FPRO = rs01.getString("A4803FPRO");
                objRtn.A4803NRTE = rs01.getString("A4803NRTE");
                objRtn.A4803EMAIL = rs01.getString("A4803EMAIL");
                objRtn.A4803FLAG = rs01.getString("A4803FLAG");
                objRtn.A4803FCUL = rs01.getString("A4803FCUL");
                objRtn.A4803REGIS = rs01.getString("A4803REGIS");
                objRtn.A4803FREGI = rs01.getString("A4803FREGI");
                objRtn.A4803FLAGDESC = rs01.getString("A4803FLAGDESC");
                objRtn.A4803TYPE = rs01.getString("A4803TYPE");
                objRtn.A4803TYPEDES = rs01.getString("A4803TYPEDES");
                objRtn.A4803TOTAL = rs01.getInt("TOTAL");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public String generateReport(A4803Filter filter, String json) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXISMP.SQP05703(?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_TYPEREPORT", filter.IN_TYPEREPORT);
            cs.setString("IN_NOMBREREPORT", filter.IN_NOMBREREPORT);
            cs.setString("IN_EMAIL", filter.IN_EMAIL);
            cs.setString("IN_PARAMETROS", json);

            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("CODREPORT");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
