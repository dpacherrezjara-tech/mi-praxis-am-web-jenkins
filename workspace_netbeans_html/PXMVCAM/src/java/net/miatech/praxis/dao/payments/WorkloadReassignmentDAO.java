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
import net.miatech.beans.SQP05739Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class WorkloadReassignmentDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP05739Filter> SearchGroupTaskAssignment(SQP05739Filter filter) throws SQLException, Exception {
        List<SQP05739Filter> lstRtn = new ArrayList<SQP05739Filter>(0);
        SQP05739Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP05739(?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_USER);
            cstmt01.setString(6, filter.IN_PROCESADOR);

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
                objRtn = new SQP05739Filter();
                //objRtn.AUASI = rs01.getString("AUASI");
                objRtn.PEDIEN = rs01.getInt("PEDIEN");
                objRtn.PROCE = rs01.getInt("PROCE");
                objRtn.STABY = rs01.getInt("STABY");
                objRtn.TOTAL = rs01.getInt("PROCE") + rs01.getInt("PEDIEN") + rs01.getInt("STABY");
                objRtn.PRDA1 = rs01.getString("PRDA");
                objRtn.PROCTYPESQ1 = rs01.getString("PROCTYPESQ");
                objRtn.PROCTYPE1 = rs01.getString("PROCTYPE");
                objRtn.DESCRI = rs01.getString("A4451DESC2");
                objRtn.groupField = rs01.getString("PRDA") + " - " + rs01.getString("A4451DESC2");

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

    public List<SQP05739Filter> SearchTaskAssignmentDetail(SQP05739Filter filter) throws SQLException, Exception {
        List<SQP05739Filter> lstRtn = new ArrayList<SQP05739Filter>(0);
        SQP05739Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05742(?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.AUASI);
            cstmt01.setString(4, filter.PRDA1);
            cstmt01.setString(5, filter.PRDA2);
            cstmt01.setString(6, filter.PROCTYPE1);
            cstmt01.setString(7, filter.PROCTYPESQ1);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP05739Filter();

                objRtn.AUASI = rs01.getString("AUASI");
                objRtn.PEDIEN = rs01.getInt("PEDIEN");
                objRtn.PROCE = rs01.getInt("PROCE");
                objRtn.STABY = rs01.getInt("STABY");
                objRtn.TOTAL = rs01.getInt("PROCE") + rs01.getInt("PEDIEN") + rs01.getInt("STABY");
                objRtn.PRDA1 = rs01.getString("PRDA");
                objRtn.PROCTYPESQ1 = rs01.getString("PROCTYPESQ");
                objRtn.PROCTYPE1 = rs01.getString("PROCTYPE");
                objRtn.DESCRI = rs01.getString("A4451DESC2");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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

    public String insertAuditor(ArrayList<SQP05739Filter> filter, String Auditor) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXISMP.SQP05741(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (SQP05739Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_PRDA", obj.PRDA1);
                cs.setString("IN_PRTIME", obj.PRTIME1);
                cs.setString("IN_RECTYPE", obj.RECTYPE1);
                cs.setString("IN_PROCTYPE", obj.PROCTYPE1);
                cs.setString("IN_PROCTYPESQ", obj.PROCTYPESQ1);
                cs.setString("IN_SMERCHID", obj.SMERCHID1);
                cs.setString("IN_AREFNBR", obj.AREFNBR1);
                cs.setString("IN_SDATE", obj.SDATE1);
                cs.setString("IN_STIME", obj.STIME1);
                cs.setString("IN_SCARDN", obj.SCARDN1);
                cs.setString("IN_SEQNBR", obj.SEQNBR1);
                cs.setString("IN_NewAuditor", Auditor);

                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());

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

    public List<A4836Filter> ListAuditorProcesa(A4836Filter filter) throws SQLException, Exception {
        List<A4836Filter> lstRtn = new ArrayList<A4836Filter>(0);
        A4836Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP05740(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_AUASI);
            cstmt01.setString(4, filter.IN_PRDA);
            cstmt01.setString(5, "");
            cstmt01.setString(6, filter.IN_PROCTYPE);
            cstmt01.setString(7, filter.IN_PROCTYPESQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4836Filter();
                objRtn.A4836USER = rs01.getString("A4836USER");

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
    
    public String ProcesaAsignacion(A4836Filter filter, String listasigna) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXISMP.SQP05593(?,?,?,?,?,?,?,?)}"; 
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PROCTYPE1", filter.PROCTYPE1.trim());
            cs.setString("IN_PROCTYPESQ1", filter.PROCTYPESQ1.trim());
            cs.setString("IN_PRDA1", filter.PRDA1.trim());
            //
            cs.setString("IN_listasigna", listasigna); 
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
    

}
