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
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4117Filter;
import net.miatech.praxis.payment.filter.A4118Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class SalesReconciliAmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesReconciliAmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReconciliAmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4113Filter> loadPX570SQP04257(A4113Filter filter) throws SQLException, Exception {

        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04257(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);

            cstmt.execute();

//            rst = cstmt.getResultSet();
//            while (rst.next()) {
//                lngTotQMATCH = rst.getLong("QMATCH");
//                lngTotQBANK = rst.getLong("QBANK");
//                // lngTotQBANK_R = rst.getLong("QBANK_R");
//                total = lngTotQBANK + lngTotQBANK_R;
//                lngTotQPAY = rst.getLong("QPAY");
//                lngTotQDIFF = rst.getLong("QDIFF");
//                lngTotQTYTRA = rst.getLong("QTYTRA");
//                lngTotQTYDOC = rst.getLong("QTYDOC");
//            }
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new A4113Filter();
                beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();

                beanTkt.DATE = rst.getString("DATE").trim();
                beanTkt.PRDA = rst.getString("PRDA").trim();
                beanTkt.PMERCHID = rst.getString("PMERCHID").trim();
                beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                beanTkt.PNETAMOU = rst.getDouble("PNETAMOU");
                beanTkt.PGROSAMOU = rst.getDouble("PGROSAMOU");
                beanTkt.PDISCAMOU = rst.getDouble("PDISCAMOU");
                beanTkt.PSFEEAMOU = rst.getDouble("PSFEEAMOU");
                beanTkt.PADJAMOUN = rst.getDouble("PADJAMOUN");
                beanTkt.PTAXAMOU = rst.getDouble("PTAXAMOU");
                beanTkt.ODBALAMOU = rst.getDouble("ODBALAMOU");

                beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                beanTkt.ADJAMOUNC = rst.getDouble("ADJAMOUNC");
                beanTkt.TAXAMOUNC = rst.getDouble("TAXAMOUNC");
                beanTkt.ODBALAMOUC = rst.getDouble("ODBALAMOUC");
                beanTkt.CERROR = rst.getString("CERROR");

                if (beanTkt.CERROR.equals("01")) {
                    beanTkt.desCERROR = "Difference";
                } else if (beanTkt.CERROR.equals("00")) {
                    beanTkt.desCERROR = "Conciliate";
                }

                lstTkts.add(beanTkt);
            }
            rst.close();
//            }

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

    public List<A4115Filter> loadPX570SQP04269(A4115Filter filter) throws SQLException, Exception {

        List<A4115Filter> lstTkts = new ArrayList<A4115Filter>(0);
        A4115Filter beanTkt;
        long totSGROSAMOS = 0, totGROSAMOUN = 0, totDISCAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0, totSDGROSSA = 0 ,totSCGROSSA = 0;
        long totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totTRANCOUNTC = 0 , totTRANCOUNT = 0, totINSTANBR = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04269(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totSGROSAMOS = rst.getLong("SGROSAMOS");
                totGROSAMOUN = rst.getLong("GROSAMOUN");
                totDISCAMOUN = rst.getLong("DISCAMOUN");
                totTAXAMOUN = rst.getLong("TAXAMOUN");
                totNETAMOUN = rst.getLong("NETAMOUN");
                totSDGROSSA = rst.getLong("SDGROSSA");
                totSCGROSSA = rst.getLong("SCGROSSA");
                
                totTRANCOUNT = rst.getLong("TRANCOUNT");
                totINSTANBR = rst.getLong("INSTANBR");
                
                totGROSAMOUNC = rst.getLong("GROSAMOUNC");
                totDISCAMOUNC = rst.getLong("DISCAMOUNC");
                totTAXAMOUNC = rst.getLong("TAXAMOUNC");
                totNETAMOUNC = rst.getLong("NETAMOUNC");
                totTRANCOUNTC = rst.getLong("TRANCOUNTC");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4115Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.SGROSAMOS = rst.getDouble("SGROSAMOS");
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.TAXAMOUN = rst.getDouble("TAXAMOUN");
                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.SDGROSSA = rst.getDouble("SDGROSSA");
                    beanTkt.SCGROSSA = rst.getDouble("SCGROSSA");

                    beanTkt.TRANCOUNT = rst.getDouble("TRANCOUNT");
                    beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                    beanTkt.OSETDATE = rst.getString("OSETDATE").trim();

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                    beanTkt.TAXAMOUNC = rst.getDouble("TAXAMOUNC");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.TRANCOUNTC = rst.getDouble("TRANCOUNTC");

                    beanTkt.CERROR = rst.getString("CERROR");

                    if (beanTkt.CERROR.equals("01")) {
                        beanTkt.desCERROR = "Difference";
                    } else if (beanTkt.CERROR.equals("00")) {
                        beanTkt.desCERROR = "Conciliate";
                    }
                    
                    beanTkt.totSGROSAMOS = totSGROSAMOS;
                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;
                    beanTkt.totTAXAMOUN = totTAXAMOUN;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totSDGROSSA = totSDGROSSA;
                    beanTkt.totSCGROSSA = totSCGROSSA;
                    
                    beanTkt.totTRANCOUNT = totTRANCOUNT;
                    beanTkt.totINSTANBR = totINSTANBR;
                    
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = totDISCAMOUNC;
                    beanTkt.totTAXAMOUNC = totTAXAMOUNC;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totTRANCOUNTC = totTRANCOUNTC;

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

    public List<A4116Filter> loadPX570SQP04270(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        long lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        long lngTotQTYTRA = 0, lngTotQTYDOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04270(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            cstmt.setString(9, filter.IN_IDITEMS);
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new A4116Filter();
                beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();
                beanTkt.strDATE = filter.strDATE.trim();
                beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                beanTkt.IN_IDITEMS = filter.IN_IDITEMS.trim();

                beanTkt.RN = rst.getString("RN").trim();
                beanTkt.DATE = rst.getString("DATE").trim();
                beanTkt.PRDA = rst.getString("PRDA").trim();
                beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                beanTkt.MERCHID = rst.getString("MERCHID").trim();
                beanTkt.STYPECD = rst.getString("STYPECD").trim();
                beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();

                beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                beanTkt.IDITEMT = rst.getString("IDITEMT").trim();

                beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                beanTkt.SELLERID = rst.getString("SELLERID").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");

                beanTkt.TRANSDATE = rst.getString("TRANSDATE");
                beanTkt.TRANSID = rst.getString("TRANSID");
                beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                beanTkt.INSTANBR = rst.getString("INSTANBR");

                beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                beanTkt.FINSAMOUC = rst.getDouble("FINSAMOUC");
                beanTkt.SINSAMOUC = rst.getDouble("SINSAMOUC");

                beanTkt.CERROR = rst.getString("CERROR");

                if (beanTkt.CERROR.equals("01")) {
                    beanTkt.desCERROR = "Difference";
                } else if (beanTkt.CERROR.equals("00")) {
                    beanTkt.desCERROR = "Conciliate";
                }

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

    public List<A4117Filter> loadPX570SQP04278(A4117Filter filter) throws SQLException, Exception {

        List<A4117Filter> lstTkts = new ArrayList<A4117Filter>(0);
        A4117Filter beanTkt;
        long totTGROSAMOUN = 0, totDISCRATE = 0, totDISCAMOUN = 0, totTGROSAMOUC = 0, totDISCAMOUNC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04278(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            cstmt.setString(9, filter.IN_IDITEMS);
            cstmt.setString(10, filter.IN_IDITEMT);
            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totTGROSAMOUN = rst.getLong("TGROSAMOUN");
                totDISCRATE = rst.getLong("DISCRATE");
                totDISCAMOUN = rst.getLong("DISCAMOUN");
                totTGROSAMOUC = rst.getLong("TGROSAMOUC");
                totDISCAMOUNC = rst.getLong("DISCAMOUNC");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4117Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_IDITEMS = filter.IN_IDITEMS.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();

                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.IDITEMP = rst.getString("IDITEMP").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();
                    beanTkt.FEECODE = rst.getString("FEECODE").trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");

                    beanTkt.CERROR = rst.getString("CERROR");

                    if (beanTkt.CERROR.equals("01")) {
                        beanTkt.desCERROR = "Difference";
                    } else if (beanTkt.CERROR.equals("00")) {
                        beanTkt.desCERROR = "Conciliate";
                    }
                    
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCRATE = totDISCRATE;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;
                    beanTkt.totTGROSAMOUC = totTGROSAMOUC;
                    beanTkt.totDISCAMOUNC = totDISCAMOUNC;

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
    
    public List<A4118Filter> loadPX570SQP04279(A4118Filter filter) throws SQLException, Exception {

        List<A4118Filter> lstTkts = new ArrayList<A4118Filter>(0);
        A4118Filter beanTkt;
        long totGROSAMOUN = 0, totDISCAMOUN = 0, totSFEEAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0;
        long totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totSFEEAMOUNC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04279(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totGROSAMOUN = rst.getLong("GROSAMOUN");
                totDISCAMOUN = rst.getLong("DISCAMOUN");
                totSFEEAMOUN = rst.getLong("SFEEAMOUN");
                totSFEEAMOUNC = rst.getLong("SFEEAMOUNC");
                totTAXAMOUN = rst.getLong("TAXAMOUN");
                totNETAMOUN = rst.getLong("NETAMOUN");
                
                totGROSAMOUNC = rst.getLong("GROSAMOUNC");
                totDISCAMOUNC = rst.getLong("DISCAMOUNC");
                totTAXAMOUNC = rst.getLong("TAXAMOUNC");
                totNETAMOUNC = rst.getLong("NETAMOUNC");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4118Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.CHADJNBR = rst.getString("CHADJNBR").trim();
                    beanTkt.CHAADJCOD = rst.getString("CHAADJCOD").trim();
                    beanTkt.CHAADJDES = rst.getString("CHAADJDES").trim();
                    
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.SFEEAMOUN = rst.getDouble("SFEEAMOUN");
                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.TAXAMOUN = rst.getDouble("TAXAMOUN");
                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                    beanTkt.TAXAMOUNC = rst.getDouble("TAXAMOUNC");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");

                    beanTkt.CERROR = rst.getString("CERROR");

                    if (beanTkt.CERROR.equals("01")) {
                        beanTkt.desCERROR = "Difference";
                    } else if (beanTkt.CERROR.equals("00")) {
                        beanTkt.desCERROR = "Conciliate";
                    }
                    
                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;
                    beanTkt.totSFEEAMOUN = totSFEEAMOUN;
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totTAXAMOUN = totTAXAMOUN;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = totDISCAMOUNC;
                    beanTkt.totTAXAMOUNC = totTAXAMOUNC;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;

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
    
    // ---------------------------------------------------

    public List<A4116Filter> loadPX570SQP04275(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04275(?,?,?,?,?,?,?,?)}";

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

                beanTkt = new A4116Filter();
                beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();

                beanTkt.RN = rst.getString("RN").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                //beanTkt.PRDA = rst.getString("PRDA").trim();
                beanTkt.MERCHID = rst.getString("MERCHID").trim();
                //beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                //beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                //beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                //beanTkt.SCARDN = rst.getString("SCARDN").trim();
                //beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                //beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                //beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                //beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                //beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                if (beanTkt.TGROSAMOUN != 0){
                    beanTkt.DISCRATE_IMPORT = beanTkt.DISCAMOUN_IMPORT*100/beanTkt.TGROSAMOUN;
                }                
                //beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");
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
    
    public List<A4116Filter> loadPX570SQP04284(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04284(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PAYDATE);
            cstmt.setString(3, filter.IN_MERCHID);
            cstmt.setString(4, filter.IN_PCURRENCY);
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

                beanTkt = new A4116Filter();
                beanTkt.IN_PAYDATE = filter.IN_PAYDATE.trim();
                beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                
                beanTkt.RN = rst.getString("RN").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                beanTkt.INVORNBR = rst.getString("INVORNBR");
                beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                beanTkt.DISCRATE_IMPORT = rst.getDouble("DISCRATE_IMPORT");
                //beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");

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

    // ---------------------------------------------------------------------------------------------------------------
}
