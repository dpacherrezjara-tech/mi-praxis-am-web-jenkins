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
import net.miatech.praxis.payment.old.A4040Filter;
import net.miatech.praxis.payment.old.A4041Filter;
import net.miatech.praxis.payment.old.A4042Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ReconciliationWorldPayDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ReconciliationWorldPayDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ReconciliationWorldPayDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
        public List<A4040Filter> loadPX589SQP04434(A4040Filter filter) throws SQLException, Exception {

        List<A4040Filter> lstData = new ArrayList<A4040Filter>(0);
        A4040Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        
        double SETAMOUNT = 0, SETAMOUNTC = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04434(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM.trim());
            cstmt.setString(3, filter.IN_DATETO.trim());
            cstmt.setString(4, filter.IN_DATE.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                //Totales
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new A4040Filter();
                    bean.RN = rst.getLong("RN");
                    bean.PRDA = rst.getString("PRDA").trim();
                    bean.SETCURREN = rst.getString("SETCURREN").trim();

                    bean.SETAMOUNT = rst.getDouble("SETAMOUNT");
                    bean.SETAMOUNTC = rst.getDouble("SETAMOUNTC");

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
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

    public List<A4040Filter> loadPX589SQP04411(A4040Filter filter) throws SQLException, Exception {

        List<A4040Filter> lstData = new ArrayList<A4040Filter>(0);
        A4040Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04411(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE.trim());
            cstmt.setString(3, filter.IN_DATE.trim());
            cstmt.setString(4, filter.SETCURREN.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                //Capturar totales
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new A4040Filter();
                    bean.RN = rst.getLong("RN");
                    bean.PRDA = rst.getString("PRDA").trim();
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.SETCURREN = rst.getString("SETCURREN").trim();
                    //bean.RECNBR = rst.getString("RECNBR").trim();
                    // bean.PARTEID = rst.getString("PARTEID").trim();

                    bean.TOTTRAAMOU = rst.getDouble("TOTTRAAMOU");
                    bean.TOTSETAMOU = rst.getDouble("TOTSETAMOU");
                    bean.TOTPENAMOU = rst.getDouble("TOTPENAMOU");
                    bean.TOTREJAMOU = rst.getDouble("TOTREJAMOU");
                    bean.TOTTRAAMOC = rst.getDouble("TOTTRAAMOC");
                    bean.TOTSETAMOC = rst.getDouble("TOTSETAMOC");
                    bean.TOTPENAMOC = rst.getDouble("TOTPENAMOC");
                    bean.TOTREJAMOC = rst.getDouble("TOTREJAMOC");

                    bean.DIF_TOTTRAAMO = bean.TOTTRAAMOU - bean.TOTTRAAMOC;
                    bean.DIF_TOTSETAMO = bean.TOTSETAMOU - bean.TOTSETAMOC;
                    bean.DIF_TOTPENAMO = bean.TOTPENAMOU - bean.TOTPENAMOC;
                    bean.DIF_TOTREJAMO = bean.TOTREJAMOU - bean.TOTREJAMOC;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
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

    public List<A4040Filter> loadPX589SQP04412(A4040Filter filter) throws SQLException, Exception {

        List<A4040Filter> lstData = new ArrayList<A4040Filter>(0);
        A4040Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04412(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE.trim());
            cstmt.setString(3, filter.IN_DATE.trim());
            cstmt.setString(4, filter.SETCURREN.trim());
            cstmt.setString(5, filter.SCURRENCY.trim());

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                //Capturar totales
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new A4040Filter();
                    bean.RN = rst.getLong("RN");
                    bean.PRDA = rst.getString("PRDA").trim();
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.SETCURREN = rst.getString("SETCURREN").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.RECNBR = rst.getString("RECNBR").trim();
                    bean.PARTEID = rst.getString("PARTEID").trim();
                    bean.MERCHID = rst.getString("MERCHID").trim();
                    bean.PARTEIDSE = rst.getString("PARTEIDSE").trim();

                    bean.TOTTRAAMOU = rst.getDouble("TOTTRAAMOU");
                    bean.TOTSETAMOU = rst.getDouble("TOTSETAMOU");
                    bean.TOTPENAMOU = rst.getDouble("TOTPENAMOU");
                    bean.TOTREJAMOU = rst.getDouble("TOTREJAMOU");
                    bean.TOTTRAAMOC = rst.getDouble("TOTTRAAMOC");
                    bean.TOTSETAMOC = rst.getDouble("TOTSETAMOC");
                    bean.TOTPENAMOC = rst.getDouble("TOTPENAMOC");
                    bean.TOTREJAMOC = rst.getDouble("TOTREJAMOC");

                    bean.DIF_TOTTRAAMO = bean.TOTTRAAMOU - bean.TOTTRAAMOC;
                    bean.DIF_TOTSETAMO = bean.TOTSETAMOU - bean.TOTSETAMOC;
                    bean.DIF_TOTPENAMO = bean.TOTPENAMOU - bean.TOTPENAMOC;
                    bean.DIF_TOTREJAMO = bean.TOTREJAMOU - bean.TOTREJAMOC;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
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

    public List<A4041Filter> loadPX589SQP04430(A4041Filter filter) throws SQLException, Exception {

        List<A4041Filter> lstData = new ArrayList<A4041Filter>(0);
        A4041Filter bean;
        double SVFOP = 0, SETAMOUNT = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04430(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());
            cstmt.setString(3, filter.IN_PARTEID.trim());

            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                SVFOP = rst.getDouble("SVFOP");
                SETAMOUNT = rst.getDouble("SETAMOUNT");
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new A4041Filter();
                    bean.RN = rst.getLong("RN");
                    bean.IN_PRDA = filter.IN_PRDA;
                    bean.IN_PARTEID = filter.IN_PARTEID;
                    
                    bean.PRDA = rst.getString("PRDA").trim();
                    bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    bean.RECTYPE = rst.getString("RECTYPE").trim();
                    bean.MERCHID = rst.getString("MERCHID").trim();
                    bean.PARTEID = rst.getString("PARTEID").trim();
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.SVFOP = rst.getDouble("SVFOP");
                    bean.SCARDN = rst.getString("SCARDN").trim();
                    bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                    bean.TKTNUMBER = rst.getString("TKTNUMBER").trim();
                    bean.TRATYPE = rst.getString("TRATYPE").trim();
                    bean.SETAMOUNT = rst.getDouble("SETAMOUNT");
                    bean.PARTEIDSE = rst.getString("PARTEIDSE").trim();
                    bean.SETCURREN = rst.getString("SETCURREN").trim();
                    
                    bean.SVFOP_TOT = SVFOP;
                    bean.SETAMOUNT_TOT = SETAMOUNT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
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
    
    public List<A4042Filter> loadPX589SQP04431(A4042Filter filter) throws SQLException, Exception {

        List<A4042Filter> lstData = new ArrayList<A4042Filter>(0);
        A4042Filter bean;
        double SVFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04431(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PRDA.trim());
            cstmt.setString(3, filter.IN_PARTEIDSE.trim());
            cstmt.setString(4, filter.IN_SCURRENCY.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                SVFOP = rst.getDouble("SVFOP");
            }

            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new A4042Filter();
                    bean.RN = rst.getLong("RN");
                    bean.IN_PRDA = filter.IN_PRDA;
                    bean.IN_PARTEIDSE = filter.IN_PARTEIDSE;
                    bean.IN_SCURRENCY = filter.IN_SCURRENCY;
                    
                    bean.PRDA = rst.getString("PRDA").trim();
                    bean.RECTYPE = rst.getString("RECTYPE").trim();
                    bean.PARTEIDSE = rst.getString("PARTEIDSE").trim();
                    bean.NAMEID = rst.getString("NAMEID").trim();
                    bean.BILLCODID = rst.getString("BILLCODID").trim();
                    bean.SVFOP = rst.getDouble("SVFOP");
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.DUEDATE = rst.getString("DUEDATE").trim();
                    
                    bean.SVFOP_TOT = SVFOP;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    lstData.add(bean);
                }
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
}
