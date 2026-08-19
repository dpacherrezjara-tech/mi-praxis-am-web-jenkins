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
import net.miatech.beans.SaleAudit.A4359Filter;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDQueryRefundFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDQueryRefundFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDQueryRefundFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4361Filter> SearchRfndCabece(A4361Filter filter) throws SQLException, Exception {
        List<A4361Filter> lstRtn = new ArrayList<A4361Filter>(0);
        A4361Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04733(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_TICKET);
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_FLAG);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_USER);
            cstmt01.setString(10, filter.IN_FOLIO);
            cstmt01.setString(11, "A");

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4361Filter();
                objRtn.A4361CCUST = rs01.getString("A4361CCUST");
                objRtn.A4361PREME = rs01.getString("A4361PREME");
                objRtn.A4361ANIO = rs01.getString("A4361ANIO");
                objRtn.A4361FOLIO = rs01.getString("A4361FOLIO");
                objRtn.A4361FREGI = rs01.getString("A4361FREGI");
                objRtn.A4361REGAS = rs01.getString("A4361REGAS");
                objRtn.A4361FAUTO = rs01.getString("A4361FAUTO");
                objRtn.A4361FAPPI = rs01.getString("A4361FAPPI");
                objRtn.A4361RN = rs01.getInt("RN");
                objRtn.CANTOK = rs01.getInt("CANTOK");
                objRtn.CANTKO = rs01.getInt("CANTKO");
                objRtn.CANTPRO = rs01.getInt("CANTPRO");
                objRtn.CANTPE = rs01.getInt("CANTPE");
                objRtn.TOTALCANT = rs01.getInt("CANTKO") + rs01.getInt("CANTOK") + rs01.getInt("CANTPE");
                objRtn.SUMAOK = rs01.getDouble("SUMAOK");
                objRtn.A4361DIAS = rs01.getString("DIAS");
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
    public List<A4359Filter> Searchauditor() throws SQLException, Exception {
        List<A4359Filter> lstRtn = new ArrayList<A4359Filter>(0);
        A4359Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP04737(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, "2");
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4359Filter();
                objRtn.A4359USER = rs01.getString("A4359USER");
                lstRtn.add(objRtn);
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
}
