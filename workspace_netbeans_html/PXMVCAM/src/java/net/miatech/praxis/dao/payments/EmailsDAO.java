package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.A4169;
import net.miatech.praxis.payment.filter.A4169Filter;
import net.miatech.praxis.payment.filter.A4169Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class EmailsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public EmailsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EmailsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4169Filter> loadPX601SQP04566(A4169Filter filter) throws SQLException, Exception {

        List<A4169Filter> lstData = new ArrayList<A4169Filter>(0);
        A4169Filter bean;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("S", "Sales");
        hmDescEstados.put("R", "RFND");
        hmDescEstados.put("A", "Adjustment");
        hmDescEstados.put("N", "ADM/NOTA CARGO");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04566(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setInt(2, filter.page.PAGNUM);
            cstmt.setInt(3, filter.page.PAGROW);
            cstmt.setInt(4, filter.page.TOTPAG);
            cstmt.setInt(5, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(2);
            filter.page.PAGROW = cstmt.getInt(3);
            filter.page.TOTPAG = cstmt.getInt(4);
            filter.page.TOTROW = cstmt.getInt(5);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A4169Filter();

                bean.TTABLA = rst.getString("TTABLA");
                bean.DESCR_TTABLA = rst.getString("DESCR_TTABLA");
                bean.CODETB = rst.getString("CODETB");
                bean.DESCRE1 = rst.getString("DESCRE1");
                bean.DESCRE2 = rst.getString("DESCRE2");
                //bean.TDOC = rst.getString("TDOC");
                if (hmDescEstados.containsKey(rst.getString("TDOC").trim())) {
                    bean.TDOC = hmDescEstados.get(rst.getString("TDOC").trim()).toString();
                } else {
                    bean.TDOC = rst.getString("TDOC").trim();
                }
                bean.CANT1 = rst.getInt("CANT1");
                bean.CANT2 = rst.getInt("CANT2");
                bean.STVAL = rst.getString("STVAL");
                if (rst.getString("STVAL").trim().equals("V")) {
                    bean.descSTVAL = "Vigente";
                } else if (rst.getString("STVAL").trim().equals("A")) {
                    bean.descSTVAL = "Anulado";
                }
                
                bean.DATINI = rst.getString("DATINI").trim();
                bean.DATFIN = rst.getString("DATFIN").trim();
                
                bean.USCR = rst.getString("USCR").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.HOCR = rst.getString("HOCR").trim();
                bean.PGMCR = rst.getString("PGMCR").trim();
                bean.USUP = rst.getString("USUP").trim();
                bean.FEUP = rst.getString("FEUP").trim();
                bean.HOUP = rst.getString("HOUP").trim();
                bean.PGMUP = rst.getString("PGMUP").trim();
                
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
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

        return lstData;
    }

    public A4169Filter loadPX601SQP04567(A4169Filter filter) throws SQLException, Exception {

        A4169Filter beanTkt = new A4169Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04567(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODETB.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                beanTkt.CCUST = rs01.getString("CCUST");
                beanTkt.CODETB = rs01.getString("CODETB").trim();
                beanTkt.TTABLA = rs01.getString("TTABLA").trim();
                beanTkt.DESCRE1 = rs01.getString("DESCRE1").trim();
                beanTkt.DESCRE2 = rs01.getString("DESCRE2").trim();
                
                beanTkt.DATINI = rs01.getString("DATINI").trim();
                beanTkt.DATFIN = rs01.getString("DATFIN").trim();

                beanTkt.USCR = rs01.getString("USCR").trim();
                beanTkt.FECR = rs01.getString("FECR").trim();
                beanTkt.HOCR = rs01.getString("HOCR").trim();
                beanTkt.PGMCR = rs01.getString("PGMCR").trim();
                beanTkt.USUP = rs01.getString("USUP").trim();
                beanTkt.FEUP = rs01.getString("FEUP").trim();
                beanTkt.HOUP = rs01.getString("HOUP").trim();
                beanTkt.PGMUP = rs01.getString("PGMUP").trim();

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

        return beanTkt;
    }

    public String loadPX601SQP04568(A4169Filter filter, String option) throws SQLException, Exception {
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04568(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.TTABLA.trim());
            cstmt.setString(4, filter.CODETB.trim());
            cstmt.setString(5, filter.CODETBCO.trim());
            cstmt.setString(6, filter.DESCRE1.trim());
            cstmt.setString(7, filter.DESCRE2.trim());
            cstmt.setString(8, filter.DATINI.trim());
            cstmt.setString(9, filter.DATFIN.trim());
            cstmt.setString(10, session.getUserView().getUserInfo().USR);
            cstmt.setString(11, Functions.getFechaActual());
            cstmt.setString(12, Functions.getHoraActual());

            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;

    }
}
