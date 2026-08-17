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
import net.miatech.praxis.payment.filter.A4497Filter;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class AmdsControlFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public AmdsControlFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AmdsControlFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4497Filter> SearchReport(A4497Filter filter) throws SQLException, Exception {
        List<A4497Filter> lstRtn = new ArrayList<A4497Filter>(0);
        A4497Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05139(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);
            cstmt01.registerOutParameter(19, Types.INTEGER);
            cstmt01.registerOutParameter(20, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);

            cstmt01.setString(5, filter.IN_CIA);
            cstmt01.setString(6, filter.IN_FORMASERIE);
            cstmt01.setString(7, filter.IN_SEQ);
            cstmt01.setString(8, filter.IN_NUMBER);
            cstmt01.setString(9, filter.IN_COUTRY);
            cstmt01.setString(10, filter.IN_STATUS);
            cstmt01.setString(11, filter.IN_SOURCE);
            cstmt01.setString(12, filter.IN_CHANNEL);
            
            cstmt01.setString(13, filter.IN_A4497TRSRC);
            cstmt01.setString(14, filter.IN_A4497SCARD);
            cstmt01.setString(15, filter.IN_A4497ARN);
            cstmt01.setString(16, filter.IN_A4497NETO);
            
            
            cstmt01.setInt(17, filter.page.PAGNUM);
            cstmt01.setInt(18, filter.page.PAGROW);
            cstmt01.setInt(19, filter.page.TOTPAG);
            cstmt01.setInt(20, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(17);
            filter.page.PAGROW = cstmt01.getInt(18);
            filter.page.TOTPAG = cstmt01.getInt(19);
            filter.page.TOTROW = cstmt01.getInt(20);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A4497Filter();

                objRtn.A4497CCUST = rs01.getString("A4497CCUST");
                objRtn.A4497CIA = rs01.getString("A4497CIA");
                objRtn.A4497FORMA = rs01.getString("A4497FORMA");
                objRtn.A4497SERIE = rs01.getString("A4497SERIE");
                objRtn.A4497SEQ = rs01.getString("A4497SEQ");
                objRtn.A4497NMEMO = rs01.getString("A4497NMEMO");
                objRtn.A4497TKT = rs01.getString("A4497CIA") + "" + rs01.getString("A4497FORMA") + "" + rs01.getString("A4497SERIE");
                objRtn.A4497CORRL = rs01.getString("A4497CORRL");
                objRtn.A4497SEQTB = rs01.getInt("A4497SEQTB");
                objRtn.A4497TRNCO = rs01.getString("A4497TRNCO");
                objRtn.A4497TRNCU = rs01.getString("A4497TRNCU");
                objRtn.A4497FVTA = rs01.getString("A4497FVTA");
                objRtn.A4497CPN = rs01.getString("A4497CPN");
                objRtn.A4497CNJ = rs01.getString("A4497CNJ");
                objRtn.A4497PAIS = rs01.getString("A4497PAIS");
                objRtn.A4497TVTA = rs01.getString("A4497TVTA");
                objRtn.A4497IATA = rs01.getString("A4497IATA");
                objRtn.AGENCY = rs01.getString("AGENCY");
                objRtn.A4497FTE = rs01.getString("A4497FTE");
                objRtn.A4497CANAL = rs01.getString("A4497CANAL");
                objRtn.A4497TPAX = rs01.getString("A4497TPAX");
                objRtn.A4497PAX = rs01.getString("A4497PAX");
                objRtn.A4497PNR = rs01.getString("A4497PNR");
                objRtn.A4497EPR = rs01.getString("A4497EPR");
                objRtn.A4497FLAG = rs01.getString("A4497FLAG");
                objRtn.A4497MDA = rs01.getString("A4497MDA");
                objRtn.A4497MDAOR = rs01.getString("A4497MDAOR");
                objRtn.A4497MONLI = rs01.getDouble("A4497MONLI");
                objRtn.A4497MONTO = rs01.getDouble("A4497MONTO");
                objRtn.A4497NETO = rs01.getDouble("A4497NETO");
                objRtn.A4497PREME = rs01.getString("A4497PREME");
                objRtn.A4497FEMI = rs01.getString("A4497FEMI");
                objRtn.A4497CNXPA = rs01.getString("A4497CNXPA");
                objRtn.A4497CODR1 = rs01.getString("A4497CODR1");
                objRtn.A4497DESC1 = rs01.getString("A4497DESC1");
                objRtn.A4497REGIS = rs01.getString("A4497REGIS");
                objRtn.A4497FREGI = rs01.getString("A4497FREGI");
                objRtn.A4497HREGI = rs01.getString("A4497HREGI");
                objRtn.A4497REVIS = rs01.getString("A4497REVIS");
                objRtn.A4497FREVI = rs01.getString("A4497FREVI");
                objRtn.A4497HREVI = rs01.getString("A4497HREVI");
                objRtn.A4497TDOC = rs01.getString("A4497TDOC");
                objRtn.A4497ARN = rs01.getString("A4497ARN");
                objRtn.A4497PRDA = rs01.getString("A4497PRDA");
                objRtn.A4497FLAGDES = rs01.getString("A4497FLAGDES");
                objRtn.A4497SCARD = rs01.getString("A4497SCARD");
                objRtn.A4497TRSRC = rs01.getString("A4497TRSRC");

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

    public String VeriUpadaStatus(ArrayList<A4497Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXISMP.SQP05708(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A4497Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_OPTION", obj.IN_OPTION);
                cs.setString("IN_A4497CIA", obj.A4497CIA);
                cs.setString("IN_A4497FORMA", obj.A4497FORMA);
                cs.setString("IN_A4497SERIE", obj.A4497SERIE);
                cs.setString("IN_A4497SEQ", obj.A4497SEQ);
                cs.setString("IN_A4497TRNCU", obj.A4497TRNCU);
                cs.setInt("IN_A4497SEQTB", obj.A4497SEQTB);
                cs.setString("IN_A4497FTE", obj.A4497FTE);
                cs.setString("IN_A4497FLAG", obj.A4497FLAG);
                cs.setString("IN_A4497IATA", obj.A4497IATA);
                cs.setString("IN_A4497EPR", obj.A4497EPR);
                cs.setString("IN_A4497PAIS", obj.A4497PAIS);

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
