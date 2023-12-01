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
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A4306Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class AccountingEmailMaintenanceFormDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingEmailMaintenanceFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingEmailMaintenanceFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4306Filter> Search(A4306Filter filter) throws SQLException, Exception {
        List<A4306Filter> lstRtn = new ArrayList<A4306Filter>(0);
        A4306Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04653(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_MODULE);
            cstmt01.setString(3, filter.IN_TYPE);
            cstmt01.setString(4, filter.IN_EMAIL);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_LABL);

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

                objRtn = new A4306Filter();
                objRtn.A4306CCUST = rs01.getString("A4306CCUST").trim();
                objRtn.A4306MODUL = rs01.getString("A4306MODUL").trim();
                objRtn.A4306TYPE = rs01.getString("A4306TYPE").trim();
                objRtn.A4306CORRL = rs01.getString("A4306CORRL").trim();
                objRtn.A4306FLAG = rs01.getString("A4306FLAG").trim();
                objRtn.A4306CORER = rs01.getString("A4306CORER").trim();
                objRtn.A4306MODULCO = rs01.getString("A4306MODULCO").trim();
                objRtn.A4306TYPECO = rs01.getString("A4306TYPECO").trim();
                
                
                objRtn.A4306REGIS = rs01.getString("A4306REGIS").trim();
                objRtn.A4306FREGI = rs01.getString("A4306FREGI").trim();
                objRtn.A4306HREGI = rs01.getString("A4306HREGI").trim();
                objRtn.A4306REVIS = rs01.getString("A4306REVIS").trim();
                objRtn.A4306FREVI = rs01.getString("A4306FREVI").trim();
                objRtn.A4306HREVI = rs01.getString("A4306HREVI").trim();
                objRtn.A4306PROP = rs01.getString("A4306PROP").trim();
                objRtn.A4306LABL = rs01.getString("A4306LABL").trim();
                
                
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
    
    public String mantenimiento(A4306Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04654(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_OPCION", filter.IN_OPCION);
            cs.setString("IN_MODUL", filter.A4306MODUL);
            cs.setString("IN_TYPE", filter.A4306TYPE);
            cs.setString("IN_CORRL", filter.A4306CORRL);
            cs.setString("IN_FLAG", filter.A4306FLAG);
            cs.setString("IN_CORER", filter.A4306CORER);
            
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.setString("IN_PROP", filter.A4306PROP);
            cs.setString("IN_LABL", filter.A4306LABL);
            cs.execute();
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
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
