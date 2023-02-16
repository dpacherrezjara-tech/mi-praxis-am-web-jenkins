/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.travelbank;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.travelbank.SQP04806Filter;
import net.miatech.praxis.travelbank.SQP04807Filter;
import net.miatech.praxis.travelbank.SQP04808Filter;
import net.miatech.praxis.travelbank.SQP04809Filter;
import net.miatech.praxis.travelbank.SQP04810Filter;
import net.miatech.praxis.travelbank.SQP04819Filter;
import net.miatech.praxis.travelbank.SQP04820Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class TransactionFilesDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    // </editor-fold>
    public TransactionFilesDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    // <editor-fold defaultstate="collapsed" desc="ISSUES">
    public List<SQP04806Filter> getSQP04806Filter(SQP04806Filter filter) throws SQLException, Exception {
        List<SQP04806Filter> lstRtn = new ArrayList<SQP04806Filter>(0);
        SQP04806Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04806(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_IDFIL1);
            cstmt01.setString(4, filter.VP_IDFIL2);
            cstmt01.setString(5, filter.VP_DESDE);
            cstmt01.setString(6, filter.VP_HASTA);
            cstmt01.setString(7, filter.VP_IDISS);
            cstmt01.setString(8, filter.VP_STS);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04806Filter();
                objRtn.A4280CCUST = rs01.getString("A4280CCUST");
                objRtn.A4280PRDA = rs01.getString("A4280PRDA");
                objRtn.A4280MDA = rs01.getString("A4280MDA");
                objRtn.A4280SQDIA = rs01.getString("A4280SQDIA");
                objRtn.A4280TIP = rs01.getString("A4280TIP");
                objRtn.A4280TRX2 = rs01.getString("A4280TRX2");
                objRtn.A4280TOT = rs01.getDouble("A4280TOT");
                objRtn.A4280DEC = rs01.getString("A4280DEC");
                objRtn.A4280STS = rs01.getString("A4280STS");
                objRtn.A4280STS_1 = rs01.getString("A4280STS_1");
                objRtn.A4280STS2 = rs01.getString("A4280STS2");
                objRtn.A4280STS2_1 = rs01.getString("A4280STS2_1");
                objRtn.A4280STS3 = rs01.getString("A4280STS3");
                objRtn.A4280IDFIL = rs01.getString("A4280IDFIL");
                objRtn.A4280TYPE = rs01.getString("A4280TYPE");
                objRtn.A4280PCONT = rs01.getString("A4280PCONT");
                objRtn.A4280FCONT = rs01.getString("A4280FCONT");
                // aut
                objRtn.A4280REGIS = rs01.getString("A4280REGIS");
                objRtn.A4280FREGI = rs01.getString("A4280FREGI");
                objRtn.A4280HREGI = rs01.getString("A4280HREGI");
                objRtn.A4280REVIS = rs01.getString("A4280REVIS");
                objRtn.A4280FREVI = rs01.getString("A4280FREVI");
                objRtn.A4280HREVI = rs01.getString("A4280HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    public List<SQP04807Filter> getSQP04807Filter(SQP04807Filter filter) throws SQLException, Exception {
        List<SQP04807Filter> lstRtn = new ArrayList<SQP04807Filter>(0);
        SQP04807Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04807(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_PRDA);
            cstmt01.setString(4, filter.VP_MDA);
            cstmt01.setString(5, filter.VP_SQDIA);
            cstmt01.setString(6, filter.VP_IDISS);
            cstmt01.setString(7, filter.VP_Document);
            cstmt01.setString(8, filter.VP_IDISR);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04807Filter();
                objRtn.A4281CCUST = rs01.getString("A4281CCUST");
                objRtn.A4281IDISS = rs01.getString("A4281IDISS");
                objRtn.A4281NCTA = rs01.getString("A4281NCTA");
                objRtn.A4281SERV = rs01.getString("A4281SERV");
                objRtn.A4281PRDA = rs01.getString("A4281PRDA");
                objRtn.A4281MDA = rs01.getString("A4281MDA");
                objRtn.A4281SQDIA = rs01.getString("A4281SQDIA");
                objRtn.A4281DEC = rs01.getString("A4281DEC");
                objRtn.A4281VALOR = rs01.getDouble("A4281VALOR");
                objRtn.A4281REF = rs01.getString("A4281REF");
                objRtn.A4281CIU = rs01.getString("A4281CIU");
                objRtn.A4281MOT = rs01.getString("A4281MOT");
                objRtn.A4281TIPD = rs01.getString("A4281TIPD");
                objRtn.A4281FEMI = rs01.getString("A4281FEMI");
                objRtn.A4281FEXP = rs01.getString("A4281FEXP");
                objRtn.A4281NMC = rs01.getString("A4281NMC");
                objRtn.A4281CIA = rs01.getString("A4281CIA");
                objRtn.A4281FORMA = rs01.getString("A4281FORMA");
                objRtn.A4281SERIE = rs01.getString("A4281SERIE");
                objRtn.A4281STS = rs01.getString("A4281STS");
                objRtn.A4281ERR = rs01.getString("A4281ERR");
                objRtn.A4281IDFIL = rs01.getString("A4281IDFIL");
                objRtn.A4281TYPE = rs01.getString("A4281TYPE");
                objRtn.A4281TRNCU = rs01.getString("A4281TRNCU");
                objRtn.A4281IDISR = rs01.getString("A4281IDISR");
                objRtn.A4281SQISR = rs01.getString("A4281SQISR");
                // aut
                objRtn.A4281REGIS = rs01.getString("A4281REGIS");
                objRtn.A4281FREGI = rs01.getString("A4281FREGI");
                objRtn.A4281HREGI = rs01.getString("A4281HREGI");
                objRtn.A4281REVIS = rs01.getString("A4281REVIS");
                objRtn.A4281FREVI = rs01.getString("A4281FREVI");
                objRtn.A4281HREVI = rs01.getString("A4281HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    // </editor-fold>    
    // <editor-fold defaultstate="collapsed" desc="USED">
    public List<SQP04808Filter> getSQP04808Filter(SQP04808Filter filter) throws SQLException, Exception {
        List<SQP04808Filter> lstRtn = new ArrayList<SQP04808Filter>(0);
        SQP04808Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04808(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_IDFIL1);
            cstmt01.setString(4, filter.VP_IDFIL2);
            cstmt01.setString(5, filter.VP_DESDE);
            cstmt01.setString(6, filter.VP_HASTA);
            cstmt01.setString(7, filter.VP_IDISS);
            cstmt01.setString(8, filter.VP_STS);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04808Filter();
                objRtn.A4282CCUST = rs01.getString("A4282CCUST");
                objRtn.A4282PRDA = rs01.getString("A4282PRDA");
                objRtn.A4282MDA = rs01.getString("A4282MDA");
                objRtn.A4282SQDIA = rs01.getString("A4282SQDIA");
                objRtn.A4282TIP = rs01.getString("A4282TIP");
                objRtn.A4282TRX2 = rs01.getString("A4282TRX2");
                objRtn.A4282TOT = rs01.getDouble("A4282TOT");
                objRtn.A4282DEC = rs01.getString("A4282DEC");
                objRtn.A4282STS = rs01.getString("A4282STS");
                objRtn.A4282STS_1 = rs01.getString("A4282STS_1");
                objRtn.A4282STS2 = rs01.getString("A4282STS2");
                objRtn.A4282STS2_1 = rs01.getString("A4282STS2_1");
                objRtn.A4282STS3 = rs01.getString("A4282STS3");
                objRtn.A4282IDFIL = rs01.getString("A4282IDFIL");
                objRtn.A4282TYPE = rs01.getString("A4282TYPE");
                objRtn.A4282PCONT = rs01.getString("A4282PCONT");
                objRtn.A4282FCONT = rs01.getString("A4282FCONT");
                // aut
                objRtn.A4282REGIS = rs01.getString("A4282REGIS");
                objRtn.A4282FREGI = rs01.getString("A4282FREGI");
                objRtn.A4282HREGI = rs01.getString("A4282HREGI");
                objRtn.A4282REVIS = rs01.getString("A4282REVIS");
                objRtn.A4282FREVI = rs01.getString("A4282FREVI");
                objRtn.A4282HREVI = rs01.getString("A4282HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    public List<SQP04809Filter> getSQP04809Filter(SQP04809Filter filter) throws SQLException, Exception {
        List<SQP04809Filter> lstRtn = new ArrayList<SQP04809Filter>(0);
        SQP04809Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04809(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_PRDA);
            cstmt01.setString(4, filter.VP_MDA);
            cstmt01.setString(5, filter.VP_SQDIA);
            cstmt01.setString(6, filter.VP_IDUSE);
            cstmt01.setString(7, filter.VP_Document);
            cstmt01.setString(8, filter.VP_NCTA);
            cstmt01.setString(9, filter.VP_IDISS);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04809Filter();
                objRtn.A4283CCUST = rs01.getString("A4283CCUST");
                objRtn.A4283IDUSE = rs01.getString("A4283IDUSE");
                //objRtn.A4283SQUSE = rs01.getString("A4283SQUSE");
                objRtn.A4283NCTA = rs01.getString("A4283NCTA");
                objRtn.A4283CIA = rs01.getString("A4283CIA");
                objRtn.A4283FORMA = rs01.getString("A4283FORMA");
                objRtn.A4283SERIE = rs01.getString("A4283SERIE");
                objRtn.A4283PRDA = rs01.getString("A4283PRDA");
                objRtn.A4283MDA = rs01.getString("A4283MDA");
                objRtn.A4283SQDIA = rs01.getString("A4283SQDIA");
                objRtn.A4283DEC = rs01.getString("A4283DEC");
                objRtn.A4283VALOR = rs01.getDouble("A4283VALOR");
                objRtn.A4283FECU = rs01.getString("A4283FECU");
                objRtn.A4283REF = rs01.getString("A4283REF");
                objRtn.A4283CIU = rs01.getString("A4283CIU");

//                objRtn.A4283SERV = rs01.getString("A4283SERV");                
//                objRtn.A4283IDISS = rs01.getString("A4283IDISS");
//                objRtn.A4283SQISS = rs01.getString("A4283SQISS");
//                objRtn.A4283MDA1 = rs01.getString("A4283MDA1");
//                objRtn.A4283DEC1 = rs01.getString("A4283DEC1");
//                objRtn.A4283VALO1 = rs01.getDouble("A4283VALO1");
//                objRtn.A4283FEMI = rs01.getString("A4283FEMI");
//                objRtn.A4283TIPD = rs01.getString("A4283TIPD");
//                objRtn.A4283REF1 = rs01.getString("A4283REF1");
//                objRtn.A4283CIU1 = rs01.getString("A4283CIU1");
//                objRtn.A4283IDFIL = rs01.getString("A4283IDFIL");  
//                objRtn.A4283TYPE = rs01.getString("A4283TYPE");  
//                objRtn.A4283TRNCU = rs01.getString("A4283TRNCU");                  
                // aut
//                objRtn.A4283REGIS = rs01.getString("A4283REGIS");
//                objRtn.A4283FREGI = rs01.getString("A4283FREGI");
//                objRtn.A4283HREGI = rs01.getString("A4283HREGI");
//                objRtn.A4283REVIS = rs01.getString("A4283REVIS");
//                objRtn.A4283FREVI = rs01.getString("A4283FREVI");
//                objRtn.A4283HREVI = rs01.getString("A4283HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    public List<SQP04810Filter> getSQP04810Filter(SQP04810Filter filter) throws SQLException, Exception {
        List<SQP04810Filter> lstRtn = new ArrayList<SQP04810Filter>(0);
        SQP04810Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04810(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_PRDA);
            cstmt01.setString(4, filter.VP_MDA);
            cstmt01.setString(5, filter.VP_SQDIA);
            cstmt01.setString(6, filter.VP_IDUSE);
            cstmt01.setString(7, filter.VP_Document);
            cstmt01.setString(8, filter.VP_NCTA);
            cstmt01.setString(9, filter.VP_IDISS);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04810Filter();
                objRtn.A4283CCUST = rs01.getString("A4283CCUST");
                objRtn.A4283IDUSE = rs01.getString("A4283IDUSE");
                objRtn.A4283SQUSE = rs01.getString("A4283SQUSE");
                objRtn.A4283NCTA = rs01.getString("A4283NCTA");
                objRtn.A4283CIA = rs01.getString("A4283CIA");
                objRtn.A4283FORMA = rs01.getString("A4283FORMA");
                objRtn.A4283SERIE = rs01.getString("A4283SERIE");
                objRtn.A4283PRDA = rs01.getString("A4283PRDA");
                objRtn.A4283MDA = rs01.getString("A4283MDA");
                objRtn.A4283SQDIA = rs01.getString("A4283SQDIA");
                objRtn.A4283DEC = rs01.getString("A4283DEC");
                objRtn.A4283VALOR = rs01.getDouble("A4283VALOR");
                objRtn.A4283FECU = rs01.getString("A4283FECU");
                objRtn.A4283REF = rs01.getString("A4283REF");
                objRtn.A4283CIU = rs01.getString("A4283CIU");
                objRtn.A4283SERV = rs01.getString("A4283SERV");
                objRtn.A4283IDISS = rs01.getString("A4283IDISS");
                objRtn.A4283SQISS = rs01.getString("A4283SQISS");
                objRtn.A4283MDA1 = rs01.getString("A4283MDA1");
                objRtn.A4283DEC1 = rs01.getString("A4283DEC1");
                objRtn.A4283VALO1 = rs01.getDouble("A4283VALO1");
                objRtn.A4283FEMI = rs01.getString("A4283FEMI");
                objRtn.A4283TIPD = rs01.getString("A4283TIPD");
                objRtn.A4283REF1 = rs01.getString("A4283REF1");
                objRtn.A4283CIU1 = rs01.getString("A4283CIU1");
                objRtn.A4283IDFIL = rs01.getString("A4283IDFIL");
                objRtn.A4283TYPE = rs01.getString("A4283TYPE");
                objRtn.A4283TRNCU = rs01.getString("A4283TRNCU");
//                 aut
                objRtn.A4283REGIS = rs01.getString("A4283REGIS");
                objRtn.A4283FREGI = rs01.getString("A4283FREGI");
                objRtn.A4283HREGI = rs01.getString("A4283HREGI");
                objRtn.A4283REVIS = rs01.getString("A4283REVIS");
                objRtn.A4283FREVI = rs01.getString("A4283FREVI");
                objRtn.A4283HREVI = rs01.getString("A4283HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="EXPIRE">
    public List<SQP04819Filter> getSQP04819Filter(SQP04819Filter filter) throws SQLException, Exception {
        List<SQP04819Filter> lstRtn = new ArrayList<SQP04819Filter>(0);
        SQP04819Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04819(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_IDFIL1);
            cstmt01.setString(4, filter.VP_IDFIL2);
            cstmt01.setString(5, filter.VP_DESDE);
            cstmt01.setString(6, filter.VP_HASTA);
            cstmt01.setString(7, filter.VP_IDEXP);
            cstmt01.setString(8, filter.VP_STS);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04819Filter();
                objRtn.A4307CCUST = rs01.getString("A4307CCUST");
                objRtn.A4307PRDA = rs01.getString("A4307PRDA");
                objRtn.A4307MDA = rs01.getString("A4307MDA");
                objRtn.A4307SQDIA = rs01.getString("A4307SQDIA");
                objRtn.A4307TIP = rs01.getString("A4307TIP");
                objRtn.A4307TRX2 = rs01.getString("A4307TRX2");
                objRtn.A4307TOT = rs01.getDouble("A4307TOT");
                objRtn.A4307DEC = rs01.getString("A4307DEC");
                objRtn.A4307PRDAD = rs01.getString("A4307PRDAD");
                objRtn.A4307MKT = rs01.getString("A4307MKT");
                objRtn.A4307STS_1 = rs01.getString("A4307STS_1");
                objRtn.A4307STS2 = rs01.getString("A4307STS2");
                objRtn.A4307STS2_1 = rs01.getString("A4307STS2_1");
                objRtn.A4307STS3 = rs01.getString("A4307STS3");
                objRtn.A4307IDFIL = rs01.getString("A4307IDFIL");
                objRtn.A4307TYPE = rs01.getString("A4307TYPE");
                objRtn.A4307PCONT = rs01.getString("A4307PCONT");
                objRtn.A4307FCONT = rs01.getString("A4307FCONT");
                // aut
                objRtn.A4307REGIS = rs01.getString("A4307REGIS");
                objRtn.A4307FREGI = rs01.getString("A4307FREGI");
                objRtn.A4307HREGI = rs01.getString("A4307HREGI");
                objRtn.A4307REVIS = rs01.getString("A4307REVIS");
                objRtn.A4307FREVI = rs01.getString("A4307FREVI");
                objRtn.A4307HREVI = rs01.getString("A4307HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

    public List<SQP04820Filter> getSQP04820Filter(SQP04820Filter filter) throws SQLException, Exception {
        List<SQP04820Filter> lstRtn = new ArrayList<SQP04820Filter>(0);
        SQP04820Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04820(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_PRDA);
            cstmt01.setString(4, filter.VP_MDA);
            cstmt01.setString(5, filter.VP_SQDIA);
            cstmt01.setString(6, filter.VP_IDISS);
            cstmt01.setString(7, filter.VP_Document);
            cstmt01.setString(8, filter.VP_IDEXP);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04820Filter();
                objRtn.A4308CCUST = rs01.getString("A4308CCUST");
                objRtn.A4308IDEXP = rs01.getString("A4308IDEXP");
                objRtn.A4308SQEXP = rs01.getString("A4308SQEXP");

                objRtn.A4308NCTA = rs01.getString("A4308NCTA");
                objRtn.A4308SERV = rs01.getString("A4308SERV");
                objRtn.A4308PRDA = rs01.getString("A4308PRDA");
                objRtn.A4308MDA = rs01.getString("A4308MDA");
                objRtn.A4308SQDIA = rs01.getString("A4308SQDIA");
                objRtn.A4308DEC = rs01.getString("A4308DEC");
                objRtn.A4308VALOR = rs01.getDouble("A4308VALOR");
                objRtn.A4308MKT = rs01.getString("A4308MKT");
                objRtn.A4308TIPD = rs01.getString("A4308TIPD");

                objRtn.A4308FEMI = rs01.getString("A4308FEMI");
                objRtn.A4308FEXP = rs01.getString("A4308FEXP");
                objRtn.A4308VORG = rs01.getDouble("A4308VORG");

                objRtn.A4308PRDAD = rs01.getString("A4308PRDAD");
                objRtn.A4308STS = rs01.getString("A4308STS");
                objRtn.A4308ERR = rs01.getString("A4308ERR");
                objRtn.A4308IDFIL = rs01.getString("A4308IDFIL");
                objRtn.A4308TYPE = rs01.getString("A4308TYPE");

                objRtn.A4308TRNCU = rs01.getString("A4308TRNCU");
                objRtn.A4308IDISS = rs01.getString("A4308IDISS");
                objRtn.A4308SQISS = rs01.getString("A4308SQISS");

                // aut
                objRtn.A4308REGIS = rs01.getString("A4308REGIS");
                objRtn.A4308FREGI = rs01.getString("A4308FREGI");
                objRtn.A4308HREGI = rs01.getString("A4308HREGI");
                objRtn.A4308REVIS = rs01.getString("A4308REVIS");
                objRtn.A4308FREVI = rs01.getString("A4308FREVI");
                objRtn.A4308HREVI = rs01.getString("A4308HREVI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="LOSSES">
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="MERGE">
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="LIABILITY">
    // </editor-fold>
}
