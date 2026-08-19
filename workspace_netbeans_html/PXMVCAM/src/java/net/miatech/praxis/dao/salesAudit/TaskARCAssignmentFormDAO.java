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
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.Functions;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author lremicio
 */
public class TaskARCAssignmentFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public TaskARCAssignmentFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public TaskARCAssignmentFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4361Filter> SearchGroupTaskAssignment(A4361Filter filter) throws SQLException, Exception {
        List<A4361Filter> lstRtn = new ArrayList<A4361Filter>(0);
        A4361Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP05540(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_USER);
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_FOLIO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4361Filter();
                objRtn.A4361REGAS = rs01.getString("A4361REGAS");
                objRtn.A4361CANTPEDI = rs01.getString("PEDIEN");
                objRtn.A4361CANTPROC = rs01.getString("PROCE");
                objRtn.A4361FREGI = rs01.getString("A4361FREGI");
                objRtn.A4361RN = rs01.getInt("RN");
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

    public List<A4361Filter> SearchTaskAssignment(A4361Filter filter) throws SQLException, Exception {
        List<A4361Filter> lstRtn = new ArrayList<A4361Filter>(0);
        A4361Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP05541(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_FOLIO);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_DATETO);
            cstmt01.setString(6, filter.IN_FLAG);
            cstmt01.setString(7, filter.IN_STATUS);
            cstmt01.setString(8, filter.IN_USER);
            cstmt01.setString(9, filter.IN_IATA);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4361Filter();
                objRtn.A4361FOLIO = rs01.getString("A4361FOLIO");
                objRtn.A4361FLAG = rs01.getString("A4361FLAG");

                objRtn.A4361REGAS = rs01.getString("A4361REGAS");
                objRtn.A4361FREAS = rs01.getString("A4361FREAS");
                objRtn.A4361IATA = rs01.getString("A4361IATA");
                objRtn.A4361REGRE = rs01.getString("A4361REGRE");
                objRtn.A4361FRERE = rs01.getString("A4361FRERE");
                objRtn.A4361HRERE = rs01.getString("A4361HRERE");

                objRtn.A4361TOAGE = rs01.getInt("A4361TOTAL");

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

    public List<A4361Filter> SearchTaskAssignmentDetail(A4361Filter filter) throws SQLException, Exception {
        List<A4361Filter> lstRtn = new ArrayList<A4361Filter>(0);
        A4361Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02756(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_FOLIO);
            cstmt01.setString(6, filter.IN_FORMA);
            cstmt01.setString(7, filter.IN_STATUS);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, "99");//filter.IN_ROBOT
            cstmt01.setString(10, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4361Filter();
                objRtn.A4361CCUST = rs01.getString("A4361CCUST");
                objRtn.A4361REGAS = rs01.getString("A4361REGAS");
                objRtn.A4361PAIS = rs01.getString("A4361PAIS");
                objRtn.A4361FOLIO = rs01.getString("A4361FOLIO");
                objRtn.A4361PREME = rs01.getString("A4361PREME");
                objRtn.A4361FLAG = rs01.getString("A4361FLAG");
                objRtn.A4361FREAS = rs01.getString("A4361FREAS");

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

    public String insertAuditor(ArrayList<A4361Filter> filter, String Auditor) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXRFNDESP.SQP05542(?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A4361Filter obj : filter) {

                cs.setString("IN_A4361CCUST", session.getUserView().getCustomerInfo().CCUST);

                cs.setString("IN_A4361REGAS", obj.A4361REGAS);
                cs.setString("IN_A4361FOLIO", obj.A4361FOLIO);
                cs.setString("IN_A4361FREAS", obj.A4361FREAS);
                cs.setString("IN_NEWAUDITOR", Auditor);

                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());
                //cs.setString("IN_OLD", filter.CAMPO);

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<A4361Filter> loadDataInit() throws SQLException, Exception {
        List<A4361Filter> lstRtn = new ArrayList<A4361Filter>(0);
        A4361Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02745(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "3");
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4361Filter();
                objRtn.A4361REGAS = rs01.getString("A4359USER");
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

}
