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
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.program.ProMasterTicketDAO.pasarGarbageCollector;
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
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

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

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
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
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    beanTkt.RATECOMBA = rst.getDouble("RATECOMBA");
                    beanTkt.RATECOMBAC = rst.getDouble("RATECOMBAC");
                    beanTkt.RATECOMSM = rst.getDouble("RATECOMSM");
                    beanTkt.RATEIVABA = rst.getDouble("RATEIVABA");
                    beanTkt.RATEIVABAC = rst.getDouble("RATEIVABAC");
                    beanTkt.RATECOMSMC = rst.getDouble("RATECOMSM");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;

                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = totPDISCAMOU;
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totPTAXAMOU = totPTAXAMOU;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = totDISCAMOUNC;
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totTAXAMOUNC = totTAXAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

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

    public List<A4113Filter> loadPX570SQP04329(A4113Filter filter) throws SQLException, Exception {
        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04329(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, "PAYDATE");
            cstmt.setString(4, filter.AXPAYNBR);
            cstmt.setString(5, filter.PMERCHID);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
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
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    beanTkt.RATECOMBA = rst.getDouble("RATECOMBA");
                    beanTkt.RATECOMBAC = rst.getDouble("RATECOMBAC");
                    beanTkt.RATEIVABA = rst.getDouble("RATEIVABA");
                    beanTkt.RATEIVABAC = rst.getDouble("RATEIVABAC");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;

                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = totPDISCAMOU;
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totPTAXAMOU = totPTAXAMOU;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = totDISCAMOUNC;
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totTAXAMOUNC = totTAXAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

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

    public List<A4113Filter> loadPX570SQP04330(A4113Filter filter) throws SQLException, Exception {

        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04330(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
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
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    beanTkt.RATECOMBA = rst.getDouble("RATECOMBA");
                    beanTkt.RATECOMBAC = rst.getDouble("RATECOMBAC");
                    beanTkt.RATEIVABA = rst.getDouble("RATEIVABA");
                    beanTkt.RATEIVABAC = rst.getDouble("RATEIVABAC");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;

                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = totPDISCAMOU;
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totPTAXAMOU = totPTAXAMOU;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = totDISCAMOUNC;
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totTAXAMOUNC = totTAXAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

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

    public List<A4115Filter> loadPX570SQP04269(A4115Filter filter) throws SQLException, Exception {

        List<A4115Filter> lstTkts = new ArrayList<A4115Filter>(0);
        A4115Filter beanTkt;
        double totSGROSAMOS = 0, totGROSAMOUN = 0, totDISCAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0, totSDGROSSA = 0, totSCGROSSA = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totTRANCOUNTC = 0, totTRANCOUNT = 0, totINSTANBR = 0;

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
                totSGROSAMOS = rst.getDouble("SGROSAMOS");
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
                totTAXAMOUN = rst.getDouble("TAXAMOUN");
                totNETAMOUN = rst.getDouble("NETAMOUN");
                totSDGROSSA = rst.getDouble("SDGROSSA");
                totSCGROSSA = rst.getDouble("SCGROSSA");

                totTRANCOUNT = rst.getDouble("TRANCOUNT");
                totINSTANBR = rst.getDouble("INSTANBR");

                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totTRANCOUNTC = rst.getDouble("TRANCOUNTC");
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

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
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
        double lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        double lngTotQTYTRA = 0, lngTotQTYDOC = 0;
        double TGROSAMOUN_TOTAL = 0;
        double TGROSAMOUNC_TOTAL = 0;
        double DISCAMOUN_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double SFEEAMOU_TOTAL = 0;
        double ACCEAMOUC_TOTAL = 0;
        double ACCEAMOU_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;

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
                TGROSAMOUN_TOTAL = rst.getDouble("TGROSAMOUN_TOTAL");
                TGROSAMOUNC_TOTAL = rst.getDouble("TGROSAMOUNC_TOTAL");
                DISCAMOUN_TOTAL = rst.getDouble("DISCAMOUN_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                SFEEAMOU_TOTAL = rst.getDouble("SFEEAMOU_TOTAL");
                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                ACCEAMOU_TOTAL = rst.getDouble("ACCEAMOU_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
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
                    beanTkt.TGROSAMOUN_TOTAL = TGROSAMOUN_TOTAL;
                    beanTkt.TGROSAMOUNC_TOTAL = TGROSAMOUNC_TOTAL;
                    beanTkt.DISCAMOUN_TOTAL = DISCAMOUN_TOTAL;
                    beanTkt.DISCAMOUNI_TOTAL = DISCAMOUNI_TOTAL;
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.SFEEAMOU_TOTAL = SFEEAMOU_TOTAL;
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.ACCEAMOU_TOTAL = ACCEAMOU_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = DISCAMOUNC_TOTAL;
                    beanTkt.DISCAMOUIC_TOTAL = DISCAMOUIC_TOTAL;

                    beanTkt.TRANSDATE = rst.getString("TRANSDATE");
                    beanTkt.TRANSID = rst.getString("TRANSID");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.INSTANBR = rst.getString("INSTANBR");
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.FINSAMOUC = rst.getDouble("FINSAMOUC");
                    beanTkt.SINSAMOUC = rst.getDouble("SINSAMOUC");

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    beanTkt.DISCAMOUNI = rst.getDouble("DISCAMOUNI");
                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                    beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    beanTkt.DISCAMOUIC = rst.getDouble("DISCAMOUIC");

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                //rst.close();
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

    public List<A4117Filter> loadPX570SQP04278(A4117Filter filter) throws SQLException, Exception {

        List<A4117Filter> lstTkts = new ArrayList<A4117Filter>(0);
        A4117Filter beanTkt;
        double totTGROSAMOUN = 0, totDISCRATE = 0, totDISCAMOUN = 0, totTGROSAMOUC = 0, totDISCAMOUNC = 0;
        double totDISCAMOUN_IVA = 0, totDISCAMOUN_IMPORT = 0, totDISCAMOUNC_IVA = 0, totDISCAMOUNC_IMPORT = 0;

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
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");
                totTGROSAMOUC = rst.getDouble("TGROSAMOUC");
                totDISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                totDISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                totDISCAMOUNC_IVA = rst.getDouble("DISCAMOUNC_IVA");
                totDISCAMOUNC_IMPORT = rst.getDouble("DISCAMOUNC_IMPORT");
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
                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();

                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    //beanTkt.IDITEMP = rst.getString("IDITEMP").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();
                    beanTkt.FEECODE = rst.getString("FEECODE").trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");

                    beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");
                    beanTkt.DISCRATE_IMPORT = rst.getDouble("DISCRATE_IMPORT");
                    beanTkt.DISCRATEBA_IVA = rst.getDouble("DISCRATEBA_IVA");
                    beanTkt.DISCRATEBA_IMPORT = rst.getDouble("DISCRATEBA_IMPORT");
                    beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                    beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                    beanTkt.DISCAMOUNC_IVA = rst.getDouble("DISCAMOUNC_IVA");
                    beanTkt.DISCAMOUNC_IMPORT = rst.getDouble("DISCAMOUNC_IMPORT");

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totTGROSAMOUC = totTGROSAMOUC;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUNC_IVA = totDISCAMOUNC_IVA;
                    beanTkt.totDISCAMOUNC_IMPORT = totDISCAMOUNC_IMPORT;

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
        double totGROSAMOUN = 0, totDISCAMOUN = 0, totSFEEAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totSFEEAMOUNC = 0;

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
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
                totSFEEAMOUN = rst.getDouble("SFEEAMOUN");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totTAXAMOUN = rst.getDouble("TAXAMOUN");
                totNETAMOUN = rst.getDouble("NETAMOUN");

                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
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

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
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

    public List<A4118Filter> loadPX570SQP04376(A4118Filter filter) throws SQLException, Exception {

        List<A4118Filter> lstTkts = new ArrayList<A4118Filter>(0);
        A4118Filter beanTkt;
        double totGROSAMOUN = 0, totDISCAMOUN = 0, totSFEEAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totSFEEAMOUNC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04376(?,?,?,?,?,?,?,?)}";

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
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
                totSFEEAMOUN = rst.getDouble("SFEEAMOUN");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totTAXAMOUN = rst.getDouble("TAXAMOUN");
                totNETAMOUN = rst.getDouble("NETAMOUN");

                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
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

                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.STCON = rst.getString("STCON").trim();

                    if (beanTkt.STCON.equals("2")) {
                        beanTkt.descSTCON = "Accounted";
                    } else {
                        beanTkt.descSTCON = "";
                    }

                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.IDCON = rst.getString("IDCON").trim();

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
    public List<A4116Filter> loadPX570SQP04328(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04328(?,?,?,?,?,?,?,?)}";

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
                //beanTkt.MERCHID = rst.getString("MERCHID").trim();
                //beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                //beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                //beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                //beanTkt.SCARDN = rst.getString("SCARDN").trim();
                //beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                //beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                //beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                //beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                beanTkt.DISCRATE_IMPORT = rst.getDouble("RATECOMBA");
                beanTkt.DISCRATE_IVA = rst.getDouble("RATEIVABA");
                //beanTkt.CERROR = rst.getString("CERROR").trim();

                /*if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }*/
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

    public List<A4116Filter> loadPX570SQP04275(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04275(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        double totDISCAMOUN_IMPORT = 0, totDISCAMOUN_IVA = 0, totTAXAMOUN_AD = 0, totTAXAMOUN_CB = 0, totNETAMOUN = 0, totNETAMOUNC = 0, totTGROSAMOUN = 0,
                totSFEEAMOU = 0, totACCEAMOU = 0, totGROSAMOUN = 0, totDISCAMOUN = 0;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PAYDATE);
            cstmt.setString(3, filter.IN_PCURRENCY);
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
                totDISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                totDISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                totTAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                totTAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                totNETAMOUN = rst.getDouble("NETAMOUN");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");

                totSFEEAMOU = rst.getDouble("SFEEAMOU");
                totACCEAMOU = rst.getDouble("ACCEAMOU");
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
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
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                    beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                    beanTkt.DISCRATE_IMPORT = rst.getDouble("RATECOMBA");
                    beanTkt.DISCRATE_IVA = rst.getDouble("RATEIVABA");
                    beanTkt.RATECOMSM = rst.getDouble("RATECOMSM");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    //Totales
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;

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

    public List<A4116Filter> loadPX570SQP04284(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        
        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");

        double totGROSAMOUN = 0;
        double totTGROSAMOUN = 0;
        double totDISCAMOUN_IMPORT = 0;
        double totDISCAMOUN_IVA = 0;
        double totSFEEAMOU = 0;
        double totACCEAMOU = 0;
        double totTAXAMOUN_AD = 0;
        double totIVACOM12 = 0;
        double totGROSAMOUN_CB = 0;
        double totDISCAMOUN = 0;
        double totTAXAMOUN_CB = 0;
        double totNETAMOUN = 0;
        double totDISCAMOSC = 0;
        double ACCEAMOUC_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double TGROSAMOUC_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;
        double VATCOMMSIC_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04284(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PAYDATE);
            cstmt.setString(3, filter.IN_MERCHID);
            cstmt.setString(4, filter.IN_PCURRENCY);
            cstmt.setString(5, filter.IN_STVAL);
            cstmt.setString(6, filter.IN_PNR);
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
                totGROSAMOUN = rst.getDouble("totGROSAMOUN");
                totTGROSAMOUN = rst.getDouble("totTGROSAMOUN");
                totDISCAMOUN_IMPORT = rst.getDouble("totDISCAMOUN_IMPORT");
                totDISCAMOUN_IVA = rst.getDouble("totDISCAMOUN_IVA");
                totSFEEAMOU = rst.getDouble("totSFEEAMOU");
                totACCEAMOU = rst.getDouble("totACCEAMOU");
                totTAXAMOUN_AD = rst.getDouble("totTAXAMOUN_AD");
                totIVACOM12 = rst.getDouble("totIVACOM12");
                totGROSAMOUN_CB = rst.getDouble("totGROSAMOUN_CB");
                totDISCAMOUN = rst.getDouble("totDISCAMOUN");
                totTAXAMOUN_CB = rst.getDouble("totTAXAMOUN_CB");
                totNETAMOUN = totTGROSAMOUN - totDISCAMOUN_IMPORT - totDISCAMOUN_IVA - totSFEEAMOU - totACCEAMOU - totGROSAMOUN_CB - totDISCAMOUN - totTAXAMOUN_CB - totTAXAMOUN_AD;
                totDISCAMOSC = rst.getDouble("totDISCAMOSC");

                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                TGROSAMOUC_TOTAL = rst.getDouble("TGROSAMOUC_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
                VATCOMMSIC_TOTAL = rst.getDouble("VATCOMMSIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
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
                    beanTkt.QTYTKT = rst.getInt("QTYTKT");
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
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.GROSAMOUN_CB = rst.getDouble("GROSAMOUN_CB");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = beanTkt.TGROSAMOUN - beanTkt.DISCAMOUN_IMPORT - beanTkt.DISCAMOUN_IVA - beanTkt.SFEEAMOU - beanTkt.ACCEAMOU - beanTkt.GROSAMOUN_CB - beanTkt.DISCAMOUN - beanTkt.TAXAMOUN_CB - beanTkt.TAXAMOUN_AD;
                    beanTkt.DISCAMOSC = rst.getDouble("DISCAMOSC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }                    
                    
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    beanTkt.DISCAMOUNI = rst.getDouble("DISCAMOUNI");
                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.VATCOMMSIC = rst.getDouble("VATCOMMSIC");
                    
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                    beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    beanTkt.DISCAMOUIC = rst.getDouble("DISCAMOUIC");

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.RATEACCE = rst.getDouble("RATEACCE");
                    beanTkt.IVACOM12 = rst.getDouble("IVACOM12");

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totIVACOM12 = totIVACOM12;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totDISCAMOSC = totDISCAMOSC;
                    beanTkt.totGROSAMOUN_CB = totGROSAMOUN_CB;

                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.DISCAMOUNI_TOTAL = DISCAMOUNI_TOTAL;
                    beanTkt.TGROSAMOUC_TOTAL = TGROSAMOUC_TOTAL;
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = DISCAMOUNC_TOTAL;
                    beanTkt.DISCAMOUIC_TOTAL = DISCAMOUIC_TOTAL;
                    beanTkt.VATCOMMSIC_TOTAL = VATCOMMSIC_TOTAL;

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

    public List<A4116Filter> loadPX570SQP04377(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        double totGROSAMOUN = 0;
        double totTGROSAMOUN = 0;
        double totDISCAMOUN_IMPORT = 0;
        double totDISCAMOUN_IVA = 0;
        double totSFEEAMOU = 0;
        double totACCEAMOU = 0;
        double totTAXAMOUN_AD = 0;
        double totIVACOM12 = 0;
        double totGROSAMOUN_CB = 0;
        double totDISCAMOUN = 0;
        double totTAXAMOUN_CB = 0;
        double totNETAMOUN = 0;
        double totDISCAMOSC = 0;
        double ACCEAMOUC_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double TGROSAMOUC_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;
        double VATCOMMSIC_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04377(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.PRDA);
            cstmt.setString(3, filter.MERCHID);
            cstmt.setString(4, filter.INVORNBR);
            cstmt.setString(5, filter.ISREFNBR);
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
                totGROSAMOUN = rst.getDouble("totGROSAMOUN");
                totTGROSAMOUN = rst.getDouble("totTGROSAMOUN");
                totDISCAMOUN_IMPORT = rst.getDouble("totDISCAMOUN_IMPORT");
                totDISCAMOUN_IVA = rst.getDouble("totDISCAMOUN_IVA");
                totSFEEAMOU = rst.getDouble("totSFEEAMOU");
                totACCEAMOU = rst.getDouble("totACCEAMOU");
                totTAXAMOUN_AD = rst.getDouble("totTAXAMOUN_AD");
                totIVACOM12 = rst.getDouble("totIVACOM12");
                totGROSAMOUN_CB = rst.getDouble("totGROSAMOUN_CB");
                totDISCAMOUN = rst.getDouble("totDISCAMOUN");
                totTAXAMOUN_CB = rst.getDouble("totTAXAMOUN_CB");
                totNETAMOUN = totTGROSAMOUN - totDISCAMOUN_IMPORT - totDISCAMOUN_IVA - totSFEEAMOU - totACCEAMOU - totGROSAMOUN_CB - totDISCAMOUN - totTAXAMOUN_CB - totTAXAMOUN_AD;
                totDISCAMOSC = rst.getDouble("totDISCAMOSC");
                
                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                TGROSAMOUC_TOTAL = rst.getDouble("TGROSAMOUC_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
                VATCOMMSIC_TOTAL = rst.getDouble("VATCOMMSIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_PAYDATE = filter.IN_PAYDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_ISREFNBR = filter.ISREFNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_TGROSAMOUN = filter.IN_TGROSAMOUN;
                    beanTkt.IN_descSTVAL = filter.IN_descSTVAL;

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    //beanTkt.QTYTKT = rst.getInt("QTYTKT");
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
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.GROSAMOUN_CB = rst.getDouble("GROSAMOUN_CB");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = beanTkt.TGROSAMOUN - beanTkt.DISCAMOUN_IMPORT - beanTkt.DISCAMOUN_IVA - beanTkt.SFEEAMOU - beanTkt.ACCEAMOU - beanTkt.GROSAMOUN_CB - beanTkt.DISCAMOUN - beanTkt.TAXAMOUN_CB - beanTkt.TAXAMOUN_AD;
                    beanTkt.DISCAMOSC = rst.getDouble("DISCAMOSC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }
                    
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    beanTkt.DISCAMOUNI = rst.getDouble("DISCAMOUNI");
                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.VATCOMMSIC = rst.getDouble("VATCOMMSIC");
                    
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                    beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    beanTkt.DISCAMOUIC = rst.getDouble("DISCAMOUIC");

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.RATEACCE = rst.getDouble("RATEACCE");
                    beanTkt.IVACOM12 = rst.getDouble("IVACOM12");

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totIVACOM12 = totIVACOM12;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totDISCAMOSC = totDISCAMOSC;
                    beanTkt.totGROSAMOUN_CB = totGROSAMOUN_CB;
                    
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.DISCAMOUNI_TOTAL = DISCAMOUNI_TOTAL;
                    beanTkt.TGROSAMOUC_TOTAL = TGROSAMOUC_TOTAL;
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = DISCAMOUNC_TOTAL;
                    beanTkt.DISCAMOUIC_TOTAL = DISCAMOUIC_TOTAL;
                    beanTkt.VATCOMMSIC_TOTAL = VATCOMMSIC_TOTAL;

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

    // ---------------------------------------------------------------------------------------------------------------
    public List<A4116Filter> loadPX570SQP04357(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        double TGROSAMOUN_TOTAL = 0;
        double TGROSAMOUNC_TOTAL = 0;
        double DISCAMOUN_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double SFEEAMOU_TOTAL = 0;
        double ACCEAMOUC_TOTAL = 0;
        double ACCEAMOU_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04357(?,?,?,?,?,?,?,?)}";

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

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TGROSAMOUN_TOTAL = rst.getDouble("TGROSAMOUN");
                TGROSAMOUNC_TOTAL = rst.getDouble("TGROSAMOUNC_TOTAL");
                DISCAMOUN_TOTAL = rst.getDouble("DISCAMOUN_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                SFEEAMOU_TOTAL = rst.getDouble("SFEEAMOU_TOTAL");
                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                ACCEAMOU_TOTAL = rst.getDouble("ACCEAMOU_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
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

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    beanTkt.DISCAMOUNI = rst.getDouble("DISCAMOUNI");
                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    beanTkt.DISCAMOUNC = rst.getDouble("DISCAMOUNC");
                    beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    beanTkt.DISCAMOUIC = rst.getDouble("DISCAMOUIC");

                    beanTkt.DISCAMOUN_TOTAL = DISCAMOUN_TOTAL;
                    beanTkt.DISCAMOUNI_TOTAL = DISCAMOUNI_TOTAL;
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.SFEEAMOU_TOTAL = SFEEAMOU_TOTAL;
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.ACCEAMOU_TOTAL = ACCEAMOU_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = DISCAMOUNC_TOTAL;
                    beanTkt.DISCAMOUIC_TOTAL = DISCAMOUIC_TOTAL;
                    beanTkt.TGROSAMOUN_TOTAL = TGROSAMOUN_TOTAL;
                    beanTkt.TGROSAMOUNC_TOTAL = TGROSAMOUNC_TOTAL;

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

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

    public A4116Filter loadPX570SQP04359(A4116Filter filter) throws SQLException, Exception {

        A4116Filter objRtn = new A4116Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04359(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PRDA.trim());
            cstmt01.setString(3, filter.MERCHID.trim());
            cstmt01.setString(4, filter.PAYDATE.trim());
            cstmt01.setString(5, filter.PCURRENCY.trim());
            cstmt01.setString(6, filter.AXPAYNBR.trim());
            cstmt01.setString(7, filter.SMERCHID.trim());
            cstmt01.setString(8, filter.BSUMDATE.trim());
            cstmt01.setString(9, filter.SCARDN.trim());
            cstmt01.setString(10, filter.SAUTHOC.trim());
            cstmt01.setString(11, filter.IDITEMS.trim());
            cstmt01.setString(12, filter.IDITEMT.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.RECTYPE = rs01.getString("RECTYPE").trim();
                objRtn.MERCHID = rs01.getString("MERCHID").trim();
                objRtn.STYPECD = rs01.getString("STYPECD").trim();
                objRtn.AXPAYNBR = rs01.getString("AXPAYNBR").trim();
                objRtn.PAYDATE = rs01.getString("PAYDATE").trim();
                objRtn.PCURRENCY = rs01.getString("PCURRENCY").trim();

                objRtn.SMERCHID = rs01.getString("SMERCHID").trim();
                objRtn.BSUMDATE = rs01.getString("BSUMDATE").trim();
                objRtn.AXPRODAT = rs01.getString("AXPRODAT").trim();
                objRtn.SIREFNBR = rs01.getString("SIREFNBR").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.IDITEMS = rs01.getString("IDITEMS").trim();
                objRtn.IDITEMT = rs01.getString("IDITEMT").trim();

                objRtn.LMERCHID = rs01.getString("LMERCHID").trim();
                objRtn.INVORNBR = rs01.getString("INVORNBR").trim();
                objRtn.SELLERID = rs01.getString("SELLERID").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.ISREFNBR = rs01.getString("ISREFNBR").trim();
                objRtn.DES_MERCHANT = rs01.getString("DES_MERCHANT").trim();
                objRtn.DES_SMERCHANT = rs01.getString("DES_SMERCHANT").trim();

                objRtn.GROSAMOUN = rs01.getDouble("GROSAMOUN");
                objRtn.TGROSAMOUN = rs01.getDouble("TGROSAMOUN");

                objRtn.TRANSDATE = rs01.getString("TRANSDATE");
                objRtn.TRANSID = rs01.getString("TRANSID");
                objRtn.SAUTHOC = rs01.getString("SAUTHOC");
                objRtn.INSTANBR = rs01.getString("INSTANBR");

                objRtn.GROSAMOUNC = rs01.getDouble("GROSAMOUNC");
                objRtn.TGROSAMOUC = rs01.getDouble("TGROSAMOUC");
                objRtn.FINSAMOUC = rs01.getDouble("FINSAMOUC");
                objRtn.SINSAMOUC = rs01.getDouble("SINSAMOUC");

                objRtn.CERROR = rs01.getString("CERROR");

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

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

        return objRtn;
    }

    public String loadPX570SQP04360(A4116Filter filter) throws SQLException, Exception {

        A4116Filter objRtn = new A4116Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String msj = "";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04360(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SCARDN.trim());
            cstmt01.setString(3, filter.INVORNBR.trim());
            cstmt01.setString(4, filter.ISREFNBR.trim());
            cstmt01.setString(5, filter.TRANSDATE.trim());
            cstmt01.setString(6, msj);

            cstmt01.execute();

            msj = cstmt01.getString(6).trim();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public String loadPX570SQP04361(A4116Filter filter) throws SQLException, Exception {

        A4116Filter objRtn = new A4116Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String msj = "";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04361(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PRDA.trim());
            cstmt01.setString(3, filter.MERCHID.trim());
            cstmt01.setString(4, filter.PAYDATE.trim());
            cstmt01.setString(5, filter.PCURRENCY.trim());
            cstmt01.setString(6, filter.AXPAYNBR.trim());
            cstmt01.setString(7, filter.SMERCHID.trim());
            cstmt01.setString(8, filter.BSUMDATE.trim());
            cstmt01.setString(9, filter.SCARDN.trim());
            cstmt01.setString(10, filter.SAUTHOC.trim());
            cstmt01.setString(11, filter.IDITEMS.trim());
            cstmt01.setString(12, filter.IDITEMT.trim());
            cstmt01.setString(13, filter.INVORNBR.trim());
            cstmt01.setString(14, filter.ISREFNBR.trim());
            cstmt01.setString(15, session.getUserView().getUserInfo().USR);
            cstmt01.setString(16, Functions.getFechaActual());
            cstmt01.setString(17, Functions.getHoraActual());

            cstmt01.execute();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }
}
