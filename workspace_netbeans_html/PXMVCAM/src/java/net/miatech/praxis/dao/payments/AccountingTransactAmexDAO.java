package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class AccountingTransactAmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingTransactAmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingTransactAmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

  public List<A4116Filter> loadPX590SQP04416(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        
        double totTGROSAMOUN = 0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04416(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
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
                totTGROSAMOUN = rst.getInt("TGROSAMOUN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.TGROSAMOUN = rst.getInt("TGROSAMOUN");
                    
                    //TOTALEs
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

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
  
  public List<A4116Filter> loadPX590SQP04417(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        
        double SFEEAMOUC_TOTAL = 0;
        double SFEEAMOU_TOTAL = 0;
        double ACCEAMOUC_TOTAL = 0;
        double ACCEAMOU_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04417(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
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
//                totPNETAMOU = rst.getDouble("PNETAMOU");
//                totPGROSAMOU = rst.getDouble("PGROSAMOU");
//                totPDISCAMOU = rst.getDouble("PDISCAMOU");
//                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
//                totPADJAMOUN = rst.getDouble("PADJAMOUN");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                  //  beanTkt.QTYTKT = rst.getDouble("QTYTKT");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
//                    beanTkt.STCONL = rst.getString("STCONL").trim();
//                    beanTkt.FCONTL = rst.getString("FCONTL").trim();
//                    beanTkt.IDCONL = rst.getString("IDCONL").trim();

                    //TOTALEs
//                    beanTkt.totPNETAMOU = totPNETAMOU;
//                    beanTkt.totPGROSAMOU = totPGROSAMOU;
//                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
//                    beanTkt.totPADJAMOUN = totPADJAMOUN;
//                    beanTkt.totODBALAMOU = totODBALAMOU;
//                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    
                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

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
