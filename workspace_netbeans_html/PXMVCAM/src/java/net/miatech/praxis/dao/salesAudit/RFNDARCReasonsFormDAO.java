/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A4360Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDARCReasonsFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDARCReasonsFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDARCReasonsFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A4360Filter> SearchRFNDReasaons(A4360Filter filter) throws SQLException, Exception {
        List<A4360Filter> lstRtn = new ArrayList<A4360Filter>(0);
        A4360Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04701(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CODRAZ);
            cstmt01.setString(4, filter.IN_STATUS);
            cstmt01.setString(5, filter.IN_COMENT);
            cstmt01.setString(6, filter.A4360FAMIL);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4360Filter();
                objRtn.A4360CCUST = rs01.getString("A4360CCUST");
                objRtn.A4360CODRZ = rs01.getString("A4360CODRZ");
                objRtn.A4360FAMIL = rs01.getString("A4360FAMIL");
                objRtn.A4360COMRE = rs01.getString("A4360COMRE");
                objRtn.A4360COMES = rs01.getString("A4360COMES");
                objRtn.A4360COMEN = rs01.getString("A4360COMEN");
                objRtn.A4360COMPO = rs01.getString("A4360COMPO");
                objRtn.A4360COMFR = rs01.getString("A4360COMFR");
                objRtn.A4360REGIS = rs01.getString("A4360REGIS");
                objRtn.A4360FREGI = rs01.getString("A4360FREGI");
                objRtn.A4360HREGI = rs01.getString("A4360HREGI");
                objRtn.A4360REVIS = rs01.getString("A4360REVIS");
                objRtn.A4360FREVI = rs01.getString("A4360FREVI");
                objRtn.A4360HREVI = rs01.getString("A4360HREVI");
                objRtn.A4360FLAG = rs01.getString("A4360FLAG");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public String insertTKT(A4360Filter filter) throws SQLException, Exception {
        String strRtn = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04703(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        String strUsuario, strFecha, strHora;
        try {
            strUsuario = session.getUserView().getUserInfo().USR;
            strFecha = Functions.getFechaActual();
            strHora = Functions.getHoraActual();

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.A4360CODRZ);
            cstmt01.setString(4, filter.A4360FAMIL);
            cstmt01.setString(5, filter.A4360COMRE);
            cstmt01.setString(6, filter.A4360COMES);
            cstmt01.setString(7, filter.A4360COMEN);
            cstmt01.setString(8, filter.A4360COMPO);
            cstmt01.setString(9, filter.A4360COMFR);
            cstmt01.setString(10, strUsuario);
            cstmt01.setString(11, strFecha);
            cstmt01.setString(12, strHora);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                strRtn = rs01.getString("VMESSAGE");
            }

        } catch (Exception e) {
            //strRtn = "";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    if (cnx != null) //cnx.rollback();
                    {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    if (cnx != null) //cnx.rollback();
                    {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return strRtn;
    }
    

}
