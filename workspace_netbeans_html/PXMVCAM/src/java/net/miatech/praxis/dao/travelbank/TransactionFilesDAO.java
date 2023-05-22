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
import net.miatech.praxis.travelbank.SQP04821Filter;
import net.miatech.praxis.travelbank.SQP04822Filter;
import net.miatech.praxis.travelbank.SQP04823Filter;
import net.miatech.praxis.travelbank.SQP04824Filter;
import net.miatech.praxis.travelbank.SQP04970Filter;
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
    
    public List<SQP04970Filter> getSQP04970Filter(SQP04970Filter filter) throws SQLException, Exception {
        List<SQP04970Filter> lstRtn = new ArrayList<SQP04970Filter>(0);
        SQP04970Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04970(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
//            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4281IDISS);
            cstmt01.setString(3, filter.VP_A4281SQISS);
//            cstmt01.setInt(9, filter.page.PAGNUM);
//            cstmt01.setInt(10, filter.page.PAGROW);
//            cstmt01.setInt(11, filter.page.TOTPAG);
//            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(9);
//            filter.page.PAGROW = cstmt01.getInt(10);
//            filter.page.TOTPAG = cstmt01.getInt(11);
//            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04970Filter();
                objRtn.A4281CCUST = rs01.getString("A4281CCUST");
                objRtn.A4281IDISS = rs01.getString("A4281IDISS");
                objRtn.A4281SQISS = rs01.getString("A4281SQISS");                
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

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;

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
    public List<SQP04821Filter> getSQP04821Filter(SQP04821Filter filter) throws SQLException, Exception {
        List<SQP04821Filter> lstRtn = new ArrayList<SQP04821Filter>(0);
        SQP04821Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04821(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.VP_IDLOS);
            cstmt01.setString(4, filter.VP_TICKET);
            cstmt01.setString(5, filter.VP_NCTA);
            cstmt01.setString(6, filter.VP_IDFIL1);
            cstmt01.setString(7, filter.VP_IDFIL2);
            cstmt01.setString(8, filter.VP_DESDE);
            cstmt01.setString(9, filter.VP_HASTA);
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
                objRtn = new SQP04821Filter();
                objRtn.A4347CCUST = rs01.getString("A4347CCUST");
                objRtn.A4347IDLOS = rs01.getString("A4347IDLOS");
                objRtn.A4347SQLOS = rs01.getString("A4347SQLOS");
                objRtn.A4347NCTA = rs01.getString("A4347NCTA");
                objRtn.A4347PNR = rs01.getString("A4347PNR");
                objRtn.A4347PRDA = rs01.getString("A4347PRDA");
                objRtn.A4347SQDIA = rs01.getString("A4347SQDIA");
                objRtn.A4347MDA = rs01.getString("A4347MDA");
                objRtn.A4347DEC = rs01.getString("A4347DEC");
                objRtn.A4347RFORI = rs01.getDouble("A4347RFORI");
                objRtn.A4347DEDU = rs01.getDouble("A4347DEDU");
                objRtn.A4347VLOS = rs01.getDouble("A4347VLOS");
                objRtn.A4347CIA = rs01.getString("A4347CIA");
                objRtn.A4347FORMA = rs01.getString("A4347FORMA");
                objRtn.A4347SERIE = rs01.getString("A4347SERIE");
                objRtn.A4347STS = rs01.getString("A4347STS");
                objRtn.A4347ERR = rs01.getString("A4347ERR");

                objRtn.A4347IDFIL = rs01.getString("A4347IDFIL");
                objRtn.A4347TYPE = rs01.getString("A4347TYPE");
                objRtn.A4347PCONT = rs01.getString("A4347PCONT");
                objRtn.A4347FCONT = rs01.getString("A4347FCONT");
                objRtn.A4347TRNCU = rs01.getString("A4347TRNCU");
                objRtn.A4347STSRG = rs01.getString("A4347STSRG");
                objRtn.A4347STSPX = rs01.getString("A4347STSPX");
                objRtn.A4347FRFND = rs01.getString("A4347FRFND");
                objRtn.A4347CPN1 = rs01.getString("A4347CPN1");
                objRtn.A4347CPN2 = rs01.getString("A4347CPN2");
                objRtn.A4347CPN3 = rs01.getString("A4347CPN3");
                objRtn.A4347CPN4 = rs01.getString("A4347CPN4");
                objRtn.A4347FENVI = rs01.getString("A4347FENVI");
                objRtn.A4347HENVI = rs01.getString("A4347HENVI");
                objRtn.A4347FRETO = rs01.getString("A4347FRETO");
                objRtn.A4347HRETO = rs01.getString("A4347HRETO");
                objRtn.A4347STSP1 = rs01.getString("A4347STSP1");
                objRtn.A4347FPROC = rs01.getString("A4347FPROC");
                objRtn.A4347HPROC = rs01.getString("A4347HPROC");
                objRtn.A4347STSP2 = rs01.getString("A4347STSP2");

                // aut
                objRtn.A4347REGIS = rs01.getString("A4347REGIS");
                objRtn.A4347FREGI = rs01.getString("A4347FREGI");
                objRtn.A4347HREGI = rs01.getString("A4347HREGI");
                objRtn.A4347REVIS = rs01.getString("A4347REVIS");
                objRtn.A4347FREVI = rs01.getString("A4347FREVI");
                objRtn.A4347HREVI = rs01.getString("A4347HREVI");

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
    // <editor-fold defaultstate="collapsed" desc="MERGE">
    public List<SQP04822Filter> getSQP04822Filter(SQP04822Filter filter) throws SQLException, Exception {
        List<SQP04822Filter> lstRtn = new ArrayList<SQP04822Filter>(0);
        SQP04822Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04822(?,?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.VP_NCTAF);
            cstmt01.setString(4, filter.VP_NCTAT);
            cstmt01.setString(5, filter.VP_DESDE);
            cstmt01.setString(6, filter.VP_HASTA);
            cstmt01.setString(7, filter.VP_IDFIL1);
            cstmt01.setString(8, filter.VP_IDFIL2);
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
                objRtn = new SQP04822Filter();
                objRtn.A4356CCUST = rs01.getString("A4356CCUST");
                objRtn.A4356PRDA = rs01.getString("A4356PRDA");
                objRtn.A4356SQDIA = rs01.getString("A4356SQDIA");
                objRtn.A4356NCTAT = rs01.getString("A4356NCTAT");
                objRtn.A4356NCTAF = rs01.getString("A4356NCTAF");
                objRtn.A4356MDA = rs01.getString("A4356MDA");
                objRtn.A4356DEC = rs01.getString("A4356DEC");
                objRtn.A4356VBALT = rs01.getDouble("A4356VBALT");
                objRtn.A4356VBALF = rs01.getDouble("A4356VBALF");
                objRtn.A4356STSM = rs01.getString("A4356STSM");
                objRtn.A4356FCRE = rs01.getString("A4356FCRE");
                objRtn.A4356STS = rs01.getString("A4356STS");
                objRtn.A4356ERR = rs01.getString("A4356ERR");
                objRtn.A4356IDFIL = rs01.getString("A4356IDFIL");
                objRtn.A4356TYPE = rs01.getString("A4356TYPE");
                objRtn.A4356PCONT = rs01.getString("A4356PCONT");
                objRtn.A4356FCONT = rs01.getString("A4356FCONT");
                // aut
                objRtn.A4356REGIS = rs01.getString("A4356REGIS");
                objRtn.A4356FREGI = rs01.getString("A4356FREGI");
                objRtn.A4356HREGI = rs01.getString("A4356HREGI");
                objRtn.A4356REVIS = rs01.getString("A4356REVIS");
                objRtn.A4356FREVI = rs01.getString("A4356FREVI");
                objRtn.A4356HREVI = rs01.getString("A4356HREVI");

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

    public List<SQP04823Filter> getSQP04823Filter(SQP04823Filter filter) throws SQLException, Exception {
        List<SQP04823Filter> lstRtn = new ArrayList<SQP04823Filter>(0);
        SQP04823Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04823(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_NCTA);
            cstmt01.setString(4, filter.VP_PRDA);
            cstmt01.setString(5, filter.VP_TRAN);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04823Filter();
                objRtn.A4357CCUST = rs01.getString("A4357CCUST");
                objRtn.A4357IDMER = rs01.getString("A4357IDMER");
                objRtn.A4357SQMER = rs01.getString("A4357SQMER");

                objRtn.A4357NCTAT = rs01.getString("A4357NCTAT");
                objRtn.A4357RFCTA = rs01.getString("A4357RFCTA");
                objRtn.A4357PRDA = rs01.getString("A4357PRDA");
                objRtn.A4357SQDIA = rs01.getString("A4357SQDIA");
                objRtn.A4357MDA = rs01.getString("A4357MDA");
                objRtn.A4357DEC = rs01.getString("A4357DEC");
                objRtn.A4357VALOR = rs01.getDouble("A4357VALOR");
                objRtn.A4357BALNC = rs01.getDouble("A4357BALNC");
                objRtn.A4357SERV = rs01.getString("A4357SERV");
                objRtn.A4357TIPD = rs01.getString("A4357TIPD");
                objRtn.A4357FEMI = rs01.getString("A4357FEMI");
                objRtn.A4357FEXP = rs01.getString("A4357FEXP");
                objRtn.A4357STS = rs01.getString("A4357STS");
                objRtn.A4357ERR = rs01.getString("A4357ERR");
                objRtn.A4357IDFIL = rs01.getString("A4357IDFIL");
                objRtn.A4357TYPE = rs01.getString("A4357TYPE");
                objRtn.A4357TRNCU = rs01.getString("A4357TRNCU");
                objRtn.A4357IDISS = rs01.getString("A4357IDISS");

                // aut
                objRtn.A4357REGIS = rs01.getString("A4357REGIS");
                objRtn.A4357FREGI = rs01.getString("A4357FREGI");
                objRtn.A4357HREGI = rs01.getString("A4357HREGI");
                objRtn.A4357REVIS = rs01.getString("A4357REVIS");
                objRtn.A4357FREVI = rs01.getString("A4357FREVI");
                objRtn.A4357HREVI = rs01.getString("A4357HREVI");

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
    // <editor-fold defaultstate="collapsed" desc="LIABILITY">
    public List<SQP04824Filter> getSQP04824Filter(SQP04824Filter filter) throws SQLException, Exception {
        List<SQP04824Filter> lstRtn = new ArrayList<SQP04824Filter>(0);
        SQP04824Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXTRVLBANK.SQP04824(?,?,?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(3, filter.VP_IDMER);
            cstmt01.setString(4, filter.VP_NCTAT);
            cstmt01.setString(5, filter.VP_DESDE);
            cstmt01.setString(6, filter.VP_HASTA);
            cstmt01.setString(7, filter.VP_IDFIL1);
            cstmt01.setString(8, filter.VP_IDFIL2);
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
                objRtn = new SQP04824Filter();
                objRtn.A4357CCUST = rs01.getString("A4357CCUST");
                objRtn.A4357IDMER = rs01.getString("A4357IDMER");
                objRtn.A4357SQMER = rs01.getString("A4357SQMER");
                objRtn.A4357NCTAT = rs01.getString("A4357NCTAT");
                objRtn.A4357RFCTA = rs01.getString("A4357RFCTA");
                objRtn.A4357PRDA = rs01.getString("A4357PRDA");
                objRtn.A4357SQDIA = rs01.getString("A4357SQDIA");
                objRtn.A4357MDA = rs01.getString("A4357MDA");
                objRtn.A4357DEC = rs01.getString("A4357DEC");
                objRtn.A4357VALOR = rs01.getDouble("A4357VALOR");
                objRtn.A4357BALNC = rs01.getDouble("A4357BALNC");
                objRtn.A4357SERV = rs01.getString("A4357SERV");
                objRtn.A4357TIPD = rs01.getString("A4357TIPD");
                objRtn.A4357FEMI = rs01.getString("A4357FEMI");
                objRtn.A4357FEXP = rs01.getString("A4357FEXP");
                objRtn.A4357STS = rs01.getString("A4357STS");
                objRtn.A4357ERR = rs01.getString("A4357ERR");
                objRtn.A4357IDFIL = rs01.getString("A4357IDFIL");
                objRtn.A4357TYPE = rs01.getString("A4357TYPE");
                objRtn.A4357TRNCU = rs01.getString("A4357TRNCU");
                objRtn.A4357IDISS = rs01.getString("A4357IDISS");
                // aut
                objRtn.A4357REGIS = rs01.getString("A4357REGIS");
                objRtn.A4357FREGI = rs01.getString("A4357FREGI");
                objRtn.A4357HREGI = rs01.getString("A4357HREGI");
                objRtn.A4357REVIS = rs01.getString("A4357REVIS");
                objRtn.A4357FREVI = rs01.getString("A4357FREVI");
                objRtn.A4357HREVI = rs01.getString("A4357HREVI");

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
}
