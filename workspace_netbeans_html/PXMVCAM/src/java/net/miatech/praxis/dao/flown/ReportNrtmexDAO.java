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

public class ReportNrtmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ReportNrtmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ReportNrtmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX529 **************************************
    //**************************************************************************
    public List<A1817Filter> loadPX529SQP04935(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F", "Flown");
        hm.put("E", "Exchange");
        hm.put("R", "Refund");
        hm.put(" ", "Without Use");

        int TOT_QTYTOTAL = 0,TOT_QTYPEND = 0,TOT_QTYCONC = 0,TOT_QTYPAY = 0,TOT_QTYNOPAY = 0,TOT_QTYAPLI = 0,TOT_QTYNOAPLI = 0,TOT_QTYEXON = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04935(?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, filter.IN_DATE_FROM);
            cstmt.setString(4, filter.IN_DATE_TO);

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
                TOT_QTYTOTAL = rst.getInt("QTYTOTAL");
                TOT_QTYPEND = rst.getInt("QTYPEND");
                
                TOT_QTYCONC = rst.getInt("QTYCONC");
                TOT_QTYPAY = rst.getInt("QTYPAY");
                TOT_QTYNOPAY = rst.getInt("QTYNOPAY");

                TOT_QTYAPLI = rst.getInt("QTYAPLI");
                TOT_QTYNOAPLI = rst.getInt("QTYNOAPLI");
                TOT_QTYEXON = rst.getInt("QTYEXON");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.IN_TYPE = filter.IN_TYPE.trim();

                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DFLIGHT);

                    bean.QTYTOTAL = rst.getInt("QTYTOTAL");
                    bean.QTYPEND = rst.getInt("QTYPEND");
                    bean.QTYCONC = rst.getInt("QTYCONC");
                    bean.QTYPAY = rst.getInt("QTYPAY");
                    bean.QTYNOPAY = rst.getInt("QTYNOPAY");

                    bean.QTYAPLI = rst.getInt("QTYAPLI");
                    bean.QTYNOAPLI = rst.getInt("QTYNOAPLI");
                    bean.QTYEXON = rst.getInt("QTYEXON");
                    //TOTALES 
                    bean.TOT_QTYTOTAL = TOT_QTYTOTAL;
                    bean.TOT_QTYPEND = TOT_QTYPEND;
                    bean.TOT_QTYCONC = TOT_QTYCONC;
                    bean.TOT_QTYPAY = TOT_QTYPAY;
                    bean.TOT_QTYNOPAY = TOT_QTYNOPAY;

                    bean.TOT_QTYAPLI = TOT_QTYAPLI;
                    bean.TOT_QTYNOAPLI = TOT_QTYNOAPLI;
                    bean.TOT_QTYEXON = TOT_QTYEXON;

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

    public List<A1817Filter> loadPX529SQP04932(A1817Filter filter) throws SQLException, Exception {

        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F", "Flown");
        hm.put("E", "Exchange");
        hm.put("R", "Refund");
        hm.put(" ", "Without Use");

        double TOT_TAXAMOUNT = 0,TOT_VALTAX = 0,TOT_VALTAXS = 0;
        int TOT_QTYPAX = 0,TOT_STOTAL = 0,TOT_ATOTAL = 0 ;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04932(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, filter.IN_TYPE);
            cstmt.setString(4, filter.DRILL);
            cstmt.setString(5, filter.IN_TICKET);

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
                TOT_TAXAMOUNT = rst.getDouble("TAXAMOUNT");
                TOT_QTYPAX = rst.getInt("QTYPAX");
                TOT_VALTAXS = rst.getDouble("VALTAXS");
                TOT_VALTAX = rst.getDouble("VALTAX");
                TOT_STOTAL = rst.getInt("STOTAL");
                TOT_ATOTAL = rst.getInt("ATOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A1817Filter();
                    bean.IN_TIPO = filter.IN_TIPO.trim();

//                    bean.PERIODO = rst.getString("PERIODO");
                    bean.strFormatDate = Functions.getMonthConvert(bean.PERIODO);

                    bean.RN = rst.getInt("RN");
                    bean.CCUST = rst.getString("CCUST");
                    bean.FCONT = rst.getString("FCONT");
                    bean.CCIA = rst.getString("CCIA");
                    bean.FORMA = rst.getString("FORMA");
                    bean.SERIE = rst.getString("SERIE");
                    bean.CUPON = rst.getString("CUPON");
                    bean.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                    bean.SEQ = rst.getString("SEQ");
                    bean.SEQRO = rst.getString("SEQRO");
                    bean.CCIAP = rst.getString("CCIAP");
                    bean.FORMAP = rst.getString("FORMAP");
                    bean.SERIEP = rst.getString("SERIEP");
                    bean.SEQROP = rst.getString("SEQROP");
                    bean.STVAL = rst.getString("STVAL");
                    
                    if (bean.STVAL.equals("0")) {
                        bean.descSTVAL = "Pending";
                    } else if (bean.STVAL.equals("1")) {
                        bean.descSTVAL = "MATCH";
                    }
                    
                    bean.DFLIGHT = rst.getString("DFLIGHT");
                    bean.strFormatDate2 = Functions.getMonthConvert(bean.DFLIGHT);
                    bean.NFLIGHT = rst.getString("NFLIGHT");
                    bean.CDEPART = rst.getString("CDEPART");
                    bean.CARRIVA = rst.getString("CARRIVA");
                    bean.CLAS = rst.getString("CLAS");
                    bean.CARR = rst.getString("CARR");
                    bean.FSTOCK = rst.getString("FSTOCK");
                    bean.FCONTFL = rst.getString("FCONTFL");
                    bean.strFormatDate3 = Functions.getMonthConvert(bean.FCONTFL);
                    bean.EQUIPO = rst.getString("EQUIPO");
                    bean.MATRICUL = rst.getString("MATRICUL");
                    bean.QTYPAX = rst.getInt("QTYPAX");
                    bean.FOPER = rst.getString("FOPER");
                    bean.strFormatDate4 = Functions.getMonthConvert(bean.FOPER);
                    bean.FHTRANS = rst.getString("FHTRANS");
                    bean.strFormatDate5 = Functions.getMonthConvert(bean.FHTRANS);
                    bean.FBASE = rst.getString("FBASE");
                    bean.TPAX = rst.getString("TPAX");
                    bean.FECVTA = rst.getString("FECVTA");
                    bean.strFormatDate6 = Functions.getMonthConvert(bean.FHTRANS);
                    bean.DAUDTAX = rst.getString("DAUDTAX");
                    bean.strFormatDate7 = Functions.getMonthConvert(bean.DAUDTAX);
                    bean.FCONT = rst.getString("FCONT");
                    bean.strFormatDate8 = Functions.getMonthConvert(bean.FCONT);
                    bean.RESULT = rst.getString("RESULT");
                    bean.ROUTF = rst.getString("ROUTF");
                    
                    bean.CDTAXS = rst.getString("CDTAXS").trim();
                    bean.MONTAXS = rst.getString("MONTAXS").trim();
                    bean.VALTAXS = rst.getDouble("VALTAXS");
                    bean.CDTAX = rst.getString("CDTAX").trim();
                    bean.MONTAX = rst.getString("MONTAX").trim();
                    bean.VALTAX = rst.getDouble("VALTAX");

                    //INFORMACION DEL CDD
                    bean.PAXNAME = rst.getString("PAXNAME");
                    bean.SPNR = rst.getString("SPNR");
                    bean.CRPNRL = rst.getString("CRSPNR");
                    bean.FNAC = rst.getString("FNAC");
                    bean.DOCIDEN = rst.getString("DOCIDEN");
                    bean.NDOCIDEN = rst.getString("NDOCIDEN");
                    bean.CCOUNTRY = rst.getString("CCOUNTRY");

                    bean.TTRANS = rst.getString("TRNCO");
                    bean.ETIQUETA = rst.getString("ETIQUETA");
                    bean.COMMENTS = rst.getString("COMMENTS");
                    bean.TAXAMOUNT = rst.getDouble("TAXAMOUNT");
                    bean.FARECAL = rst.getString("FARECAL");
                    bean.ARGUME = rst.getString("ARGUME");
                    bean.STATAX = rst.getString("STATAX");
                    bean.MONTAX = rst.getString("MONTAX");
                    bean.VALTAX = rst.getDouble("VALTAX");
                    bean.RESTAX = rst.getString("RESTAX");
//                    bean.RUTA  = rst.getString("RUTA");
                    //TOTALES
//                    bean.TOT_TAXAMOUNT  = TOT_TAXAMOUNT;
                    bean.TOT_QTYPAX  = TOT_QTYPAX;
                    bean.TOT_VALTAXS  = TOT_VALTAXS;
                    bean.TOT_VALTAX  = TOT_VALTAX;
                    bean.TOT_STOTAL  = TOT_STOTAL;
                    bean.TOT_ATOTAL  = TOT_ATOTAL;

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

}
