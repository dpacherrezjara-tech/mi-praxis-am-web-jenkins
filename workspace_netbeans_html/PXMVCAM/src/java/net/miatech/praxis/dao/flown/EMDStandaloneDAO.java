package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.beans.A1817Filter;
import net.miatech.praxis.flown.A1817;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class EMDStandaloneDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public EMDStandaloneDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EMDStandaloneDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX529 **************************************
    //**************************************************************************
    public List<A1817Filter> loadPX529SQP04931(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F", "Flown");
        hm.put("E", "Exchange");
        hm.put("R", "Refund");
        hm.put(" ", "Without Use");

        int TOT_QTYUSED = 0, TOT_QTYCONCI = 0, TOT_QTYPEND = 0, TOT_QTYPOLIZA = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04931(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TIPO);
            cstmt.setString(3, filter.IN_DATE_FROM);
            cstmt.setString(4, filter.IN_DATE_TO);
            cstmt.setString(5, filter.IN_STVAL);
            cstmt.setString(6, filter.IN_COUNTRY);

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                TOT_QTYUSED = rst.getInt("QTYUSED");
                TOT_QTYCONCI = rst.getInt("QTYCONCI");
                TOT_QTYPEND = rst.getInt("QTYPEND");
                TOT_QTYPOLIZA = rst.getInt("QTYPOLIZA");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.IN_TIPO = filter.IN_TIPO.trim();
                    bean.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.QTYUSED = rst.getInt("QTYUSED");
                    bean.QTYCONCI = rst.getInt("QTYCONCI");
                    bean.QTYPEND = rst.getInt("QTYPEND");
                    bean.QTYPOLIZA = rst.getInt("QTYPOLIZA");

                    bean.TOT_QTYUSED = TOT_QTYUSED;
                    bean.TOT_QTYCONCI = TOT_QTYCONCI;
                    bean.TOT_QTYPEND = TOT_QTYPEND;
                    bean.TOT_QTYPOLIZA = TOT_QTYPOLIZA;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(bean);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

    public List<A1817Filter> loadPX529SQP04934(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F", "Flown");
        hm.put("E", "Exchange");
        hm.put("R", "Refund");
        hm.put(" ", "Without Use");

        int TOT_QTYUSED = 0, TOT_QTYCONCI = 0, TOT_QTYPEND = 0, TOT_QTYPOLIZA = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04934(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TIPO);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_STVAL);
            cstmt.setString(5, filter.IN_COUNTRY);

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
                TOT_QTYUSED = rst.getInt("QTYUSED");
                TOT_QTYCONCI = rst.getInt("QTYCONCI");
                TOT_QTYPEND = rst.getInt("QTYPEND");
                TOT_QTYPOLIZA = rst.getInt("QTYPOLIZA");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.IN_TIPO = filter.IN_TIPO.trim();
                    bean.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.QTYUSED = rst.getInt("QTYUSED");
                    bean.QTYCONCI = rst.getInt("QTYCONCI");
                    bean.QTYPEND = rst.getInt("QTYPEND");
                    bean.QTYPOLIZA = rst.getInt("QTYPOLIZA");

                    bean.TOT_QTYUSED = TOT_QTYUSED;
                    bean.TOT_QTYCONCI = TOT_QTYCONCI;
                    bean.TOT_QTYPEND = TOT_QTYPEND;
                    bean.TOT_QTYPOLIZA = TOT_QTYPOLIZA;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(bean);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

    public List<A1817Filter> loadPX529SQP05094(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter beanTkt;

        A1817Filter objRtn;
        objRtn = new A1817Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05094(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A1817Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
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

//    public List<A1817Filter> loadPX529SQP04934(A1817Filter filter) throws SQLException, Exception {
//        
//        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
//        A1817Filter bean;
//        double VFOP = 0;
//        HashMap hm = new HashMap();
//        hm.put("F","Flown");
//        hm.put("E","Exchange");
//        hm.put("R","Refund");
//        hm.put(" ","Without Use");
//               
//        int TOT_QTYSALED = 0,TOT_QTYUSESD = 0,TOT_QTYSALEP = 0,TOT_QTYUSESP = 0,TOT_QTYEMDAU = 0,TOT_QTYEMDMA = 0,TOT_QTYEMDCT = 0;
//        
//        CallableStatement cstmt = null;
//        ResultSet rst = null;
//        Connection cnx = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04934(?,?,?,?,?,?,?,?)}";
//
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//
//            cstmt.registerOutParameter(5, Types.INTEGER);
//            cstmt.registerOutParameter(6, Types.INTEGER);
//            cstmt.registerOutParameter(7, Types.INTEGER);
//            cstmt.registerOutParameter(8, Types.INTEGER);
//            
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_TIPO);
//            cstmt.setString(3, filter.IN_DATE);
//            cstmt.setString(4, filter.IN_STVAL);
//
//            cstmt.setInt(5, filter.page.PAGNUM);
//            cstmt.setInt(6, filter.page.PAGROW);
//            cstmt.setInt(7, filter.page.TOTPAG);
//            cstmt.setInt(8, filter.page.TOTROW);
//            
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(5);
//            filter.page.PAGROW = cstmt.getInt(6);
//            filter.page.TOTPAG = cstmt.getInt(7);
//            filter.page.TOTROW = cstmt.getInt(8);
//            
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                TOT_QTYSALED  = rst.getInt("QTYSALED");
//                TOT_QTYUSESD  = rst.getInt("QTYUSESD");
//                TOT_QTYSALEP  = rst.getInt("QTYSALEP");
//                TOT_QTYUSESP  = rst.getInt("QTYUSESP");
//                TOT_QTYEMDAU  = rst.getInt("QTYEMDAU");
//                TOT_QTYEMDMA  = rst.getInt("QTYEMDMA");
//                TOT_QTYEMDCT  = rst.getInt("QTYEMDCT");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    bean = new A1817Filter();
//                    bean.IN_TIPO = filter.IN_TIPO.trim();
//                    bean.DFLIGHT = rst.getString("DFLIGHT");
//                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
//                    bean.QTYSALED  = rst.getInt("QTYSALED");
//                    bean.QTYUSESD  = rst.getInt("QTYUSESD");
//                    bean.QTYSALEP  = rst.getInt("QTYSALEP");
//                    bean.QTYUSESP  = rst.getInt("QTYUSESP");
//                    bean.QTYEMDAU  = rst.getInt("QTYEMDAU");
//                    bean.QTYEMDMA  = rst.getInt("QTYEMDMA");
//                    bean.QTYEMDCT  = rst.getInt("QTYEMDCT");
//                    
//                    bean.TOT_QTYSALED  = TOT_QTYSALED;
//                    bean.TOT_QTYUSESD  = TOT_QTYUSESD;
//                    bean.TOT_QTYSALEP  = TOT_QTYSALEP;
//                    bean.TOT_QTYUSESP  = TOT_QTYUSESP;
//                    bean.TOT_QTYEMDAU  = TOT_QTYEMDAU;
//                    bean.TOT_QTYEMDMA  = TOT_QTYEMDMA;
//                    bean.TOT_QTYEMDCT  = TOT_QTYEMDCT;
//                    
//                    bean.page.PAGNUM = filter.page.PAGNUM;
//                    bean.page.PAGROW = filter.page.PAGROW;
//                    bean.page.TOTPAG = filter.page.TOTPAG;
//                    bean.page.TOTROW = filter.page.TOTROW;
//                    
//                    lstTkts.add(bean);
//                }
//                rst.close();
//            }
//
//        } catch (Exception e) {
//            e.getMessage();
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstTkts;
//    }
    public List<A1817Filter> loadPX529SQP04924(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F", "Flown");
        hm.put("E", "Exchange");
        hm.put("R", "Refund");
        hm.put(" ", "Without Use");

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04924(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TIPO);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_STVAL);
            cstmt.setString(5, filter.IN_TICKET);
            cstmt.setString(6, filter.IN_COUNTRY);

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();

            while (rst.next()) {
//                VFOP = rst.getDouble("VFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.IN_TIPO = filter.IN_TIPO.trim();
                    bean.IN_COUNTRY = filter.IN_COUNTRY.trim();
                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.SCOUNTRY = rst.getString("PSVVTA");
                    bean.AGENTE = rst.getString("AGTIA");
//                    bean.strDescAgente = rst.getString("desAGENTE");
                    bean.ORIG = rst.getString("CDEPART");
                    bean.DEST = rst.getString("CARRIVA");
                    bean.CCIA = rst.getString("CCIA");
                    bean.FORMA = rst.getString("FORMA");
                    bean.SERIE = rst.getString("SERIE");
                    bean.CUPON = rst.getString("CUPON");
                    bean.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();

                    bean.SEQ = rst.getString("SEQ");
                    bean.SEQRO = rst.getString("SEQRO");
                    bean.FBASE = rst.getString("FBASE");
                    bean.RBD = rst.getString("CABI");
                    bean.TPAX = rst.getString("TPAX");
                    bean.QTYPAX = rst.getInt("QTYPAX");
                    bean.TOPUS = rst.getString("TOPUS");
                    bean.CARR = rst.getString("CARR");
                    bean.VCPN = rst.getDouble("VCPN");
                    bean.CURRENCY = rst.getString("MDACP");
                    bean.RFIC = rst.getString("RFIC");
                    bean.RECODE = rst.getString("RECODE");
                    bean.DESC_RECODE = rst.getString("DESC_RECODE");
                    bean.RDATE = rst.getString("DVCR");
                    bean.descRDATE = Functions.getMonthConvert(bean.RDATE);
                    bean.STVAL = rst.getString("STVAL");
                    bean.IDCON = rst.getString("IDCON");
                    bean.FCONT = rst.getString("FCONT");
                    bean.descFCONT = Functions.getMonthConvert(bean.FCONT);
                    bean.FVTA = rst.getString("FVTA");
                    bean.descFVTA = Functions.getMonthConvert(bean.FVTA);
                    bean.FECVAL = rst.getString("FECVAL");
                    bean.descFECVAL = Functions.getMonthConvert(bean.FECVAL);
                    if (bean.STVAL.equals("0")) {
                        bean.descSTVAL = "Venta sin Uso";
                    } else if (bean.STVAL.equals("1")) {
                        bean.descSTVAL = "Uso sin Venta";
                    } else if (bean.STVAL.equals("2")) {
                        bean.descSTVAL = "MATCH";
                    }
                    
                    bean.TN16 = rst.getString("TN16");
                    bean.TN00 = rst.getString("TN00");
                    
                    //Totales
//                    bean.totVFOP = VFOP;
                    bean.USCR = rst.getString("USCR");
                    bean.FECR = rst.getString("FECR");
                    bean.HOCR = rst.getString("HOCR");
                    bean.USUP = rst.getString("USUP");
                    bean.FEUP = rst.getString("FEUP");
                    bean.HOUP = rst.getString("HOUP");

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(bean);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.getMessage();
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

    public List<A1817Filter> loadPX529SQP05095(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05095(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.RFIC);
            cstmt.setString(3, filter.RECODE);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                bean = new A1817Filter();
                bean.RFIC = rst.getString("RFIC");
                bean.RECODE = rst.getString("RECODE");
                lstTkts.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
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

    public String loadPX529SQP04925(A1817Filter filter, String option) throws SQLException, Exception {
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04925(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.TICKET.trim());
            cstmt.setString(4, filter.CUPON.trim());
            cstmt.setString(5, filter.SEQ.trim());
            cstmt.setString(6, filter.SEQRO.trim());
            cstmt.setString(7, filter.ORIG.trim());
            cstmt.setString(8, filter.DEST.trim());
            cstmt.setString(9, filter.DFLIGHT.trim());
            cstmt.setString(10, filter.SCOUNTRY.trim());
            cstmt.setString(11, filter.AGENTE.trim());
            cstmt.setString(12, filter.FVTA.trim());
            cstmt.setString(13, filter.RFIC.trim());
            cstmt.setString(14, filter.RECODE.trim());
            cstmt.setString(15, filter.DESC_RECODE.trim());
            cstmt.setString(16, filter.FCONT.trim());
            cstmt.setString(17, filter.IDCON.trim());
            cstmt.setString(18, filter.STVAL.trim());
            cstmt.setString(19, filter.FBASE.trim());
            cstmt.setString(20, filter.RBD.trim());
            cstmt.setInt(21, filter.QTYPAX);
            cstmt.setString(22, filter.TPAX.trim());
            cstmt.setString(23, filter.TOPUS.trim());
            cstmt.setString(24, filter.CARR.trim());
            cstmt.setString(25, filter.FECVAL.trim());
            cstmt.setString(26, filter.CURRENCY.trim());
            cstmt.setDouble(27, filter.VCPN);
            cstmt.setString(28, filter.TN16);
            cstmt.setString(29, filter.TN00);
            cstmt.setString(30, session.getUserView().getUserInfo().USR);
            cstmt.setString(31, Functions.getFechaActual());
            cstmt.setString(32, Functions.getHoraActual());

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
