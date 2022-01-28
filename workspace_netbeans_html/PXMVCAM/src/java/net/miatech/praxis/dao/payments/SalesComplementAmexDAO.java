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
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A4124Filter;
import net.miatech.praxis.payment.filter.A4166Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author ctarazona
 */
public class SalesComplementAmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesComplementAmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesComplementAmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4124Filter> loadPX585SQP04354(A4124Filter filter) throws SQLException, Exception {

        List<A4124Filter> lst = new ArrayList<A4124Filter>(0);
        A4124Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04354(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_DATEFROM);
            cstmt.setString(4, filter.IN_DATETO);
            cstmt.setString(5, filter.IN_FAMEX);
            cstmt.setString(6, filter.IN_STCON);

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
                bean = new A4124Filter();
                bean.COUNTRY = rst.getString("COUNTRY").trim();
                bean.PRDA = rst.getString("PRDA").trim();
                bean.PLUSGRAID = rst.getString("PLUSGRAID").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.SDATE = rst.getString("SDATE").trim();
                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.SCARDBIN = rst.getString("SCARDBIN").trim();
                bean.PNR = rst.getString("PNR").trim();
                bean.MERCHID = rst.getString("MERCHID").trim();
                bean.CURRPARTN = rst.getString("CURRPARTN").trim();
                bean.SVFOP = rst.getDouble("SVFOP");
                bean.EMDNUMBER = rst.getString("EMDNUMBER").trim();
                bean.ADDPAXEMD = rst.getString("ADDPAXEMD").trim();
                bean.ADDPAXTKT = rst.getString("ADDPAXTKT").trim();
                bean.FAMEX = rst.getString("FAMEX").trim();
                if (bean.FAMEX.equals("")) {
                    bean.descFAMEX = "Pending";
                } else if (bean.FAMEX.equals("1")) {
                    bean.descFAMEX = "Processed";
                }

                bean.STCON = rst.getString("STCON").trim();
                if (bean.STCON.equals("")) {
                    bean.descSTCON = "Pending";
                } else if (bean.STCON.equals("1")) {
                    bean.descSTCON = "Found";
                } else if (bean.STCON.equals("2")) {
                    bean.descSTCON = "Accounted";
                }

                bean.FCONT = rst.getString("FCONT").trim();
                bean.IDCON = rst.getString("IDCON").trim();
                bean.PASSED_DAYS = rst.getString("PASSED_DAYS").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lst.add(bean);
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

        return lst;
    }

    public List<A4166Filter> loadPX585SQP04355(A4166Filter filter) throws SQLException, Exception {

        List<A4166Filter> lst = new ArrayList<A4166Filter>(0);
        A4166Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04355(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_DATEFROM);
            cstmt.setString(4, filter.IN_DATETO);
            cstmt.setString(5, filter.IN_FAMEX);
            cstmt.setString(6, filter.IN_STCON);
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
                bean = new A4166Filter();

                bean.MERCHID = rst.getString("MERCHID").trim();
                bean.SDATE = rst.getString("SDATE").trim();
                bean.STIME = rst.getString("STIME").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                bean.SVFOP = rst.getDouble("SVFOP");
                bean.NAMECARD = rst.getString("NAMECARD").trim();
                bean.BANCOEMI = rst.getString("BANCOEMI").trim();
                bean.PRDA = rst.getString("PRDA").trim();
                bean.OPERATNBR = rst.getString("OPERATNBR").trim();
                bean.TICKET1 = rst.getString("TICKET1").trim();
                bean.TICKET2 = rst.getString("TICKET2").trim();
                bean.TICKET3 = rst.getString("TICKET3").trim();
                bean.TICKET4 = rst.getString("TICKET4").trim();
                bean.TICKET5 = rst.getString("TICKET5").trim();
                bean.TICKET6 = rst.getString("TICKET6").trim();
                bean.TICKET7 = rst.getString("TICKET7").trim();
                bean.TICKET8 = rst.getString("TICKET8").trim();
                bean.TICKET9 = rst.getString("TICKET9").trim();
                bean.TICKET10 = rst.getString("TICKET10").trim();
                bean.PNR = rst.getString("PNR").trim();

                bean.FAMEX = rst.getString("FAMEX").trim();
                if (bean.FAMEX.equals("")) {
                    bean.descFAMEX = "Pending";
                } else if (bean.FAMEX.equals("1")) {
                    bean.descFAMEX = "Processed";
                }

                bean.STCON = rst.getString("STCON").trim();
                if (bean.STCON.equals("")) {
                    bean.descSTCON = "Pending";
                } else if (bean.STCON.equals("1")) {
                    bean.descSTCON = "Found";
                } else if (bean.STCON.equals("2")) {
                    bean.descSTCON = "Accounted";
                }

                bean.FCONT = rst.getString("FCONT").trim();
                bean.IDCON = rst.getString("IDCON").trim();
                bean.PASSED_DAYS = rst.getString("PASSED_DAYS").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lst.add(bean);
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

        return lst;
    }

    public List<A4166Filter> loadPX585SQP04356(A4166Filter filter) throws SQLException, Exception {

        List<A4166Filter> lst = new ArrayList<A4166Filter>(0);
        A4166Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04356(?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE);
            cstmt.setString(3, filter.IN_DATEFROM);
            cstmt.setString(4, filter.IN_DATETO);
            cstmt.setString(5, filter.IN_FAMEX);
            cstmt.setString(6, filter.IN_STCON);
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
                bean = new A4166Filter();

                bean.MERCHID = rst.getString("MERCHID").trim();
                bean.SDATE = rst.getString("SDATE").trim();
                bean.STIME = rst.getString("STIME").trim();
                bean.SCARDN = rst.getString("SCARDN").trim();
                bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                bean.SVFOP = rst.getDouble("SVFOP");
                bean.NAMECARD = rst.getString("NAMECARD").trim();
                bean.BANCOEMI = rst.getString("BANCOEMI").trim();
                bean.PRDA = rst.getString("PRDA").trim();
                bean.OPERATNBR = rst.getString("OPERATNBR").trim();
                bean.TICKET1 = rst.getString("TICKET1").trim();
                bean.TICKET2 = rst.getString("TICKET2").trim();
                bean.TICKET3 = rst.getString("TICKET3").trim();
                bean.TICKET4 = rst.getString("TICKET4").trim();
                bean.TICKET5 = rst.getString("TICKET5").trim();
                bean.TICKET6 = rst.getString("TICKET6").trim();
                bean.TICKET7 = rst.getString("TICKET7").trim();
                bean.TICKET8 = rst.getString("TICKET8").trim();
                bean.TICKET9 = rst.getString("TICKET9").trim();
                bean.TICKET10 = rst.getString("TICKET10").trim();
                bean.PNR = rst.getString("PNR").trim();

                bean.FAMEX = rst.getString("FAMEX").trim();
                if (bean.FAMEX.equals("")) {
                    bean.descFAMEX = "Pending";
                } else if (bean.FAMEX.equals("1")) {
                    bean.descFAMEX = "Processed";
                }

                bean.STCON = rst.getString("STCON").trim();
                if (bean.STCON.equals("")) {
                    bean.descSTCON = "Pending";
                } else if (bean.STCON.equals("1")) {
                    bean.descSTCON = "Found";
                } else if (bean.STCON.equals("2")) {
                    bean.descSTCON = "Accounted";
                }

                bean.FCONT = rst.getString("FCONT").trim();
                bean.IDCON = rst.getString("IDCON").trim();
                bean.PASSED_DAYS = rst.getString("PASSED_DAYS").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lst.add(bean);
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

        return lst;
    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        List<SQP00697Filter> lstRtn = new ArrayList<SQP00697Filter>(0);
        SQP00697Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00697(?,?,?,?,?,?,?,?)}"; //LIBSAP23.SQP00697V2

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TFILTER);
            cstmt01.setString(3, filter.IN_TEXT);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setString(5, "");//filter.page.ROWLST.get(filter.page.PAGNUM));
            cstmt01.setString(6, filter.IN_DATE_FROM);
            cstmt01.setString(7, filter.IN_DATE_TO);
            cstmt01.setString(8, filter.IN_IATA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00697Filter();
                objRtn.ROWKEY = rs01.getString("ROWKEY");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720FECVTA = Functions.getMonthConvertDate(rs01.getString("A720FECVTA"));
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
