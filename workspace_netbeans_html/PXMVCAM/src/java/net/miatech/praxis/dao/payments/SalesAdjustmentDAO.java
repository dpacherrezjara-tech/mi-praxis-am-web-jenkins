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
import static net.miatech.praxis.dao.payments.SalesReconciliAmexDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class SalesAdjustmentDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesAdjustmentDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesAdjustmentDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4116Filter> loadPX599SQP04472(A4116Filter filter) throws SQLException, Exception {

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

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "Match"); //PLUSGRADE
        hmDescFCOMPL.put("2", "Match"); //LIGAS
        hmDescFCOMPL.put("3", "Match"); //TABLET
        hmDescFCOMPL.put("4", "Match"); //BPO

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("0", "Pending");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04472(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt.setString(5, filter.IN_CERROR);
            cstmt.setString(6, filter.IN_PNR);
            cstmt.setString(7, filter.IN_TDOC);
            cstmt.setString(8, filter.IN_SCARDN1.trim() + '%' + filter.IN_SCARDN2.trim() + '%');
            cstmt.setString(9, filter.IN_SAUTHOC);
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

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
                    //    beanTkt.IN_CERROR = filter.IN_CERROR.trim();
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
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                        beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                    } else {
                        beanTkt.descTDOC = rst.getString("TDOC").trim();
                    }

                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                    if (hmDescReglas.containsKey(rst.getString("FREGLA").trim())) {
                        beanTkt.descFREGLA = hmDescReglas.get(rst.getString("FREGLA").trim()).toString();
                    } else {
                        beanTkt.descFREGLA = rst.getString("FREGLA").trim();
                    }
                        
                    beanTkt.QTYTKT = rst.getInt("QTYTKT");
                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();

                    beanTkt.FCOMPL = rst.getString("FCOMPL").trim();
                    if (hmDescFCOMPL.containsKey(rst.getString("FCOMPL").trim())) {
                        beanTkt.descFCOMPL = hmDescFCOMPL.get(rst.getString("FCOMPL").trim()).toString();
                    } else {
                        beanTkt.descFCOMPL = rst.getString("FCOMPL").trim();
                    }

                    beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SELLERID = rst.getString("SELLERID").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.DES_SMERCHANT = rst.getString("DES_SMERCHANT").trim();
                    if (beanTkt.SMERCHID.equals("9353227755")) {
                        beanTkt.DES_SMERCHANT = "PLUSGRADE";
                    } else if (beanTkt.SMERCHID.equals("8133735688")) {
                        beanTkt.DES_SMERCHANT = "LIGAS";
                    } else if (beanTkt.SMERCHID.equals("9352724851")) {
                        beanTkt.DES_SMERCHANT = "TABLET";
                    }

                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    beanTkt.TRANSDATE = rst.getString("TRANSDATE");
                    beanTkt.TRANSID = rst.getString("TRANSID");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.INSTANBR = rst.getString("INSTANBR");
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    beanTkt.DES_CERROR = rst.getString("DES_CERROR");

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    beanTkt.FINSAMOUC = rst.getDouble("FINSAMOUC");
                    beanTkt.SINSAMOUC = rst.getDouble("SINSAMOUC");

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }
                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }

                    beanTkt.DISCAMOUNI_TOTAL = DISCAMOUNI_TOTAL;
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.SFEEAMOU_TOTAL = SFEEAMOU_TOTAL;
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.ACCEAMOU_TOTAL = ACCEAMOU_TOTAL;
                    beanTkt.TGROSAMOUN_TOTAL = TGROSAMOUN_TOTAL;
                    beanTkt.DISCAMOUN_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUN_TOTAL, DISCAMOUN_TOTAL);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUN_TOTAL, DISCAMOUNI_TOTAL);
                    beanTkt.TGROSAMOUNC_TOTAL = TGROSAMOUNC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUNC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                        beanTkt.DES_CERROR = "";
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
    
    public List<A4116Filter> loadPX570SQP04470(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        A4116Filter objRtn;
        objRtn = new A4116Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04470(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

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

    public double cambioSigno(double numero_base, double numero_a_cambiar) {
        if (numero_base >= 0) {
            numero_a_cambiar = Math.abs(numero_a_cambiar) * -1;
        } else {
            numero_a_cambiar = Math.abs(numero_a_cambiar);
        }
        return numero_a_cambiar;
    }

    public double mantenerSigno(double numero_base, double numero_a_cambiar) {
        if (numero_base >= 0) {
            numero_a_cambiar = Math.abs(numero_a_cambiar);
        } else {
            numero_a_cambiar = Math.abs(numero_a_cambiar) * -1;
        }
        return numero_a_cambiar;
    }
    
    public List<A4116Filter> loadPX570SQP04540(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("0", "Pending");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

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
        double DISCAMOUN_CB_TOTAL = 0;
        double SADJUST_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04540(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.MERCHID);
            cstmt.setString(5, filter.SPNR);
            cstmt.setString(6, filter.ISREFNBR);
            cstmt.setString(7, filter.IN_TRANSDATE);
            cstmt.setString(8, filter.IN_AXPRODAT);
            cstmt.setString(9, filter.IN_FREGLA);
            cstmt.setString(10, filter.IN_SCARDN);
            cstmt.setString(11, filter.IN_SAUTHOC);
            cstmt.setString(12, filter.IN_IDITEMT);
            cstmt.setString(13, filter.IN_IDITEMS);
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

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
                DISCAMOUN_CB_TOTAL = rst.getDouble("DISCAMOUN_CB_TOTAL");
                SADJUST_TOTAL = rst.getDouble("SADJUST_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_ISREFNBR = filter.ISREFNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_TGROSAMOUN = filter.IN_TGROSAMOUN;
                    beanTkt.IN_descSTVAL = filter.IN_descSTVAL;

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString(filter.IN_DATE.trim()).trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    //beanTkt.QTYTKT = rst.getInt("QTYTKT");
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN_CB = rst.getDouble("DISCAMOUN_CB");

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                    beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                    beanTkt.DISCRATE_IMPORT = rst.getDouble("DISCRATE_IMPORT");
                    //beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");
                    beanTkt.SADJUST = rst.getDouble("SADJUST");
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.GROSAMOUN_CB = rst.getDouble("GROSAMOUN_CB");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = beanTkt.TGROSAMOUN - beanTkt.DISCAMOUN_IMPORT - beanTkt.DISCAMOUN_IVA - beanTkt.SFEEAMOU - beanTkt.ACCEAMOU - beanTkt.GROSAMOUN_CB - beanTkt.DISCAMOUN - beanTkt.TAXAMOUN_CB - beanTkt.TAXAMOUN_AD;
                    beanTkt.DISCAMOSC = rst.getDouble("DISCAMOSC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.desCERROR = rst.getString("desCERROR").trim();

                    /*if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }*/
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.VATCOMMSIC = rst.getDouble("VATCOMMSIC");

                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                        beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                    } else {
                        beanTkt.descTDOC = rst.getString("TDOC").trim();
                    }

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.RATEACCE = rst.getDouble("RATEACCE");
                    beanTkt.IVACOM12 = rst.getDouble("IVACOM12");

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN = this.cambioSigno(beanTkt.totTGROSAMOUN, totDISCAMOUN);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.totDISCAMOUN, DISCAMOUNI_TOTAL);
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totIVACOM12 = totIVACOM12;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totDISCAMOSC = totDISCAMOSC;
                    beanTkt.totGROSAMOUN_CB = totGROSAMOUN_CB;

                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.TGROSAMOUC_TOTAL = TGROSAMOUC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.VATCOMMSIC_TOTAL = VATCOMMSIC_TOTAL;
                    beanTkt.DISCAMOUN_CB_TOTAL = DISCAMOUN_CB_TOTAL;
                    beanTkt.SADJUST_TOTAL = SADJUST_TOTAL;

                    beanTkt.A1531TTARJ = "AX";
                    beanTkt.FDESGLOSE = "1";
                    beanTkt.A1531NREF = beanTkt.SCARDN;
                    beanTkt.A1531CAPL = beanTkt.SAUTHOC;
                    beanTkt.A1531VFOP = beanTkt.TGROSAMOUN;
                    beanTkt.tot_VFOP = beanTkt.totTGROSAMOUN;
                    beanTkt.A720FECVTA = beanTkt.TRANSDATE;
                    beanTkt.A720PNR = beanTkt.SPNR;
                    beanTkt.A1531TKT = beanTkt.ISREFNBR;
                    beanTkt.A720AGENTE = "";

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
    
//    public String loadPX267SQP00672(A2281 filter, String option) throws SQLException, Exception  {
//        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
//        String strMsj = "Operation was successful.";
//
//        CallableStatement cstmt = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00672(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.setString(1, option);
//            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
//            cstmt.setString(3, filter.COUNTRY.trim());
//            cstmt.setString(4, filter.CURRENC.trim());
//            cstmt.setString(5, filter.CODEBANK.trim());
//            cstmt.setString(6, filter.NAMEBANK.trim());
//            cstmt.setString(7, filter.FSTAT.trim());
//            cstmt.setString(8, filter.FINSUMO.trim());
//            cstmt.setDouble(9, filter.RATECON);
//            cstmt.setDouble(10, filter.RATECOP1);
//            cstmt.setDouble(11, filter.RATECOP2);
//            cstmt.setDouble(12, filter.RATEIVA);
//            cstmt.setString(13, filter.CLIENTE.trim());
//            cstmt.setString(14, filter.CODBANKN.trim());
//            cstmt.setInt(15, filter.DOCNUM);
//            cstmt.setString(16, session.getUserView().getUserInfo().USR);
//            cstmt.setString(17, Functions.getFechaActual());
//            cstmt.setString(18, Functions.getHoraActual());
//            cstmt.execute();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            strMsj = e.getMessage();
//        } finally {
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
//        return strMsj;
//
//    }
//
//    public A2281 loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
//
//        A2281 objRtn = new A2281();
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00673(?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.CODEBANK.trim());
//            cstmt01.setString(3, filter.COUNTRY.trim());
//            cstmt01.setString(4, filter.CURRENC.trim());
//
//            cstmt01.execute();
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//                objRtn.CCUST = rs01.getString("CCUST");
//                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
//                objRtn.CURRENC = rs01.getString("CURRENC").trim();
//                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
//                objRtn.NAMEBANK = rs01.getString("NAMEBANK").trim();
//                objRtn.FSTAT = rs01.getString("FSTAT").trim();
//                objRtn.FINSUMO = rs01.getString("FINSUMO").trim();
//                objRtn.CLIENTE = rs01.getString("CLIENTE").trim();
//                objRtn.RATECON = rs01.getDouble("RATECON");
//                objRtn.RATECOP1 = rs01.getDouble("RATECOP1");
//                objRtn.RATECOP2 = rs01.getDouble("RATECOP2");
//                objRtn.RATEIVA = rs01.getDouble("RATEIVA");
//                objRtn.CODBANKN = rs01.getString("CODBANKN");
//                objRtn.DOCNUM = rs01.getInt("DOCNUM");
//
//                objRtn.USCR = rs01.getString("USCR");
//                objRtn.FECR = rs01.getString("FECR");
//                objRtn.HOCR = rs01.getString("HOCR");
//                objRtn.USUP = rs01.getString("USUP");
//                objRtn.FEUP = rs01.getString("FEUP");
//                objRtn.HOUP = rs01.getString("HOUP");
//
//                //lstRtn.add(objRtn);
//            }
//        } catch (Exception e) {
//            e.getMessage();
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return objRtn;
//    }
}
