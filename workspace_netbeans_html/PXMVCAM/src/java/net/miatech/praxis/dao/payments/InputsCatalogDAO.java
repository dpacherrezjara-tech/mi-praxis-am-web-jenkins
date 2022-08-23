package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.A2359;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class InputsCatalogDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InputsCatalogDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InputsCatalogDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2358Filter> loadPX602SQP04601(A2358Filter filter) throws SQLException, Exception {

        List<A2358Filter> lstTkts = new ArrayList<A2358Filter>(0);
        A2358Filter beanTkt;
        
        HashMap<String, String> hmDescINPEXTE = new HashMap<String, String>();
        hmDescINPEXTE.put("", "");
        hmDescINPEXTE.put("0", "Pending");
        hmDescINPEXTE.put("1", "Match");
        
        HashMap<String, String> hmDescINPTYPE = new HashMap<String, String>();
        hmDescINPTYPE.put("", "");
        hmDescINPTYPE.put("D", "DATA");
        hmDescINPTYPE.put("C", "CONTROL");
        hmDescINPTYPE.put("M", "MISCELLANEOUS");
        
        HashMap<String, String> hmDescSTAT = new HashMap<String, String>();
        hmDescSTAT.put("", "");
        hmDescSTAT.put("A", "ACTIVE");
        hmDescSTAT.put("I", "INACTIVE");
        
        HashMap<String, String> hmDescFASE = new HashMap<String, String>();
        hmDescFASE.put("", "");
        hmDescFASE.put("1", "FASE I");
        hmDescFASE.put("2", "FASE II");
        hmDescFASE.put("3", "FASE III");
        
        double totQTYREG = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04601(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.STAT);
            cstmt.setString(3, filter.FASE);
            cstmt.setString(4, filter.INPTYPE);
            cstmt.setString(5, filter.INPEXTE);
            cstmt.setString(6, filter.INPNAME);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

//            rst = cstmt.getResultSet();
//            while (rst.next()) {
//                totQTYREG = rst.getInt("QTYREG");
//            }
//            rst.close();

                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A2358Filter();
//                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
//                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
//                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.APLIC = rst.getString("APLIC").trim();
                    beanTkt.SEQNUM = rst.getString("SEQNUM").trim();
                    beanTkt.DENV = rst.getString("DENV").trim();
                    beanTkt.NETDIR = rst.getString("NETDIR").trim();
                    beanTkt.INPNAME = rst.getString("INPNAME").trim();
                    beanTkt.INPEXTE = rst.getString("INPEXTE").trim();
                    if (hmDescINPTYPE.containsKey(rst.getString("INPTYPE").trim())) {
                        beanTkt.descINPTYPE = hmDescINPTYPE.get(rst.getString("INPTYPE").trim()).toString();
                    } else {
                        beanTkt.descINPTYPE = rst.getString("INPTYPE").trim();
                    }
                    if (hmDescSTAT.containsKey(rst.getString("STAT").trim())) {
                        beanTkt.descSTAT = hmDescSTAT.get(rst.getString("STAT").trim()).toString();
                    } else {
                        beanTkt.descSTAT = rst.getString("STAT").trim();
                    }
                    if (hmDescFASE.containsKey(rst.getString("FASE").trim())) {
                        beanTkt.descFASE = hmDescFASE.get(rst.getString("FASE").trim()).toString();
                    } else {
                        beanTkt.descFASE = rst.getString("FASE").trim();
                    }
                    beanTkt.INPDESC = rst.getString("INPDESC").trim();
                    beanTkt.LIBNAME = rst.getString("LIBNAME").trim();
                    beanTkt.OUTNAME = rst.getString("OUTNAME").trim();
                    beanTkt.FECPROC = rst.getString("FECPROC").trim();
                    beanTkt.TABLA = rst.getString("TABLA").trim();
                    beanTkt.QTYREG = rst.getInt("QTYREG");

                    //TOTALEs
                   // beanTkt.totQTYREG = totQTYREG;
//                    
//                    if (beanTkt.CERROR.equals("")) {
//                        beanTkt.desCERROR = "Conciliate";
//                    } else {
//                        beanTkt.desCERROR = "Difference";
//                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

}

