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
import net.miatech.beans.A4836Filter;
import net.miatech.beans.SaleAudit.A2548Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class MaintenanceAnalystsDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    // Clave secreta de 16 bytes para AES-128 (¡en un sistema real, almacena esto de forma segura!)

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4836Filter> SearchMantAuditor(A4836Filter filter) throws SQLException, Exception {
        List<A4836Filter> lstRtn = new ArrayList<A4836Filter>(0);
        A4836Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05736(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_TYPEREPORT);
            cstmt01.setString(4, filter.IN_USER);
            cstmt01.setString(5, filter.IN_DATETO);
            cstmt01.setString(6, filter.IN_DATEFROM);
            cstmt01.setString(7, filter.IN_STATUS);

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
                objRtn = new A4836Filter();
                objRtn.A4836CCUST = rs01.getString("A4836CCUST");
                objRtn.A4836USER = rs01.getString("A4836USER");
                objRtn.A4836PROCE = rs01.getString("A4836PROCE");
                objRtn.A4836CORR = rs01.getInt("A4836CORR");
                objRtn.A4836FLAG = rs01.getString("A4836FLAG");
                objRtn.A4836FLAGDES = rs01.getString("A4836FLAGDES");
                objRtn.A4836DESCR = rs01.getString("A4836DESCR");
                objRtn.A4836FALTA = rs01.getString("A4836FALTA");
                objRtn.A4836FBAJA = rs01.getString("A4836FBAJA");
                objRtn.A4836REGIS = rs01.getString("A4836REGIS");
                objRtn.A4836FREGI = rs01.getString("A4836FREGI");
                objRtn.A4836HREGI = rs01.getString("A4836HREGI");
                objRtn.A4836REVIS = rs01.getString("A4836REVIS");
                objRtn.A4836FREVI = rs01.getString("A4836FREVI");
                objRtn.A4836HREVI = rs01.getString("A4836HREVI");
                // 
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

    public List<A4836Filter> loadDataAuditor() throws SQLException, Exception {
        List<A4836Filter> lstRtn = new ArrayList<A4836Filter>(0);
        A4836Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02745(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "4");
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4836Filter();
                objRtn.A4836USER = rs01.getString("A4836USER");
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

    public String mantenimientoAuditor(A4836Filter filter) throws SQLException, Exception {
        String strRtn = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP05737(?,?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.A4836USER);
            cstmt01.setString(4, filter.A4836PROCE);
            cstmt01.setString(5, filter.A4836FLAG);
            cstmt01.setInt(6, filter.A4836CORR);
            cstmt01.setString(7, filter.A4836DESCR);
            cstmt01.setString(8, filter.A4836FALTA);
            cstmt01.setString(9, filter.A4836FBAJA);

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
