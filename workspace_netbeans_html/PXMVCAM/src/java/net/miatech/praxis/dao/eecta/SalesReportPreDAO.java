/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.io.FileOutputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP04556Filter;
import net.miatech.praxis.eecta.SQP04557Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class SalesReportPreDAO {
    // <editor-fold defaultstate="collapsed" desc="Variables locales">

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SQP04556Filter> getSQP04556Filter(SQP04556Filter filter) throws SQLException, Exception {
        List<SQP04556Filter> lstRtn = new ArrayList<SQP04556Filter>(0);
        SQP04556Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04556(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_FDATE2);
            cstmt01.setString(5, filter.VP_CDCLI);
            cstmt01.setString(6, filter.VP_RSOCI);
            cstmt01.setString(7, filter.VP_NRRPT);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04556Filter();
                objRtn.A4245NRRPT = rs01.getString("A4245NRRPT");
                objRtn.A4245CDCLI = rs01.getString("A4245CDCLI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A4245CONTR = rs01.getString("A4245CONTR");
                objRtn.A4245FEECC = rs01.getString("A4245FEECC");
                objRtn.A4245INIPR = rs01.getString("A4245INIPR");
                objRtn.A4245FINPR = rs01.getString("A4245FINPR");
                objRtn.A4245REFBC = rs01.getString("A4245REFBC");

                objRtn.A4245MDLOC = rs01.getString("A4245MDLOC");
                objRtn.A4245FARE = rs01.getDouble("A4245FARE");
                objRtn.A4245IVA = rs01.getDouble("A4245IVA");
                objRtn.A4245TUA = rs01.getDouble("A4245TUA");
                objRtn.A4245YR = rs01.getDouble("A4245YR");
                objRtn.A4245YQ = rs01.getDouble("A4245YQ");
                objRtn.A4245OTR = rs01.getDouble("A4245OTR");
                objRtn.A4245TOT = rs01.getDouble("A4245TOT");
                objRtn.A4245TOTLT = rs01.getString("A4245TOTLT");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

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

    public List<SQP04557Filter> getSQP04557Filter(SQP04557Filter filter) throws SQLException, Exception {
        List<SQP04557Filter> lstRtn = new ArrayList<SQP04557Filter>(0);
        SQP04557Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04557(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4245NRRPT);
            cstmt01.setString(3, filter.VP_A4245CDCLI);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            //this.setSQP03875(); tmp
            /*pos 0*/
            while (rs01.next()) {
                objRtn = new SQP04557Filter();
                objRtn.rpteCab.A4245NRRPT = rs01.getString("A4245NRRPT");
                objRtn.rpteCab.A4245CDCLI = rs01.getString("A4245CDCLI");
                objRtn.rpteCab.A4245CONTR = rs01.getString("A4245CONTR");
                objRtn.rpteCab.A4245FEECC = rs01.getString("A4245FEECC");
                objRtn.rpteCab.A4245INIPR = rs01.getString("A4245INIPR");
                objRtn.rpteCab.A4245FINPR = rs01.getString("A4245FINPR");
                objRtn.rpteCab.A4245REFBC = rs01.getString("A4245REFBC");
                objRtn.rpteCab.A4245MDLOC = rs01.getString("A4245MDLOC");
                objRtn.rpteCab.A4245FARE = rs01.getDouble("A4245FARE");
                objRtn.rpteCab.A4245IVA = rs01.getDouble("A4245IVA");
                objRtn.rpteCab.A4245TUA = rs01.getDouble("A4245TUA");
                objRtn.rpteCab.A4245YR = rs01.getDouble("A4245YR");
                objRtn.rpteCab.A4245YQ = rs01.getDouble("A4245YQ");
                objRtn.rpteCab.A4245OTR = rs01.getDouble("A4245OTR");
                objRtn.rpteCab.A4245TOT = rs01.getDouble("A4245TOT");
                objRtn.rpteCab.A4245TOTLT = rs01.getString("A4245TOTLT");
                //datos CLIENTE
                objRtn.tbl_client.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.tbl_client.A3953DIRE1 = rs01.getString("A3953DIRE1");
                objRtn.tbl_client.A3953COLON = rs01.getString("A3953COLON");
                objRtn.tbl_client.A3953DELEG = rs01.getString("A3953DELEG");
                objRtn.tbl_client.A3953CP = rs01.getString("A3953CP");
                objRtn.tbl_client.A3953LOGO = rs01.getString("A3953LOGO").trim();
                objRtn.tbl_client.A3953PLZCR = rs01.getInt("A3953PLZCR");
                objRtn.tbl_client.A3953TORGN = rs01.getString("A3953TORGN");
                //Fetch BLOB from DB
                Blob blb = rs01.getBlob("LOGOBLOB");
                //blb = null; //temporal
                if (blb != null && !rs01.getString("A3953LOGO").equals("")) {
                    byte barr[] = blb.getBytes(1, (int) blb.length());
                    String Rutatmp = session.getPropertySession().get("RUTA_DOWNLOAD") + "\\";
                    FileOutputStream fout = new FileOutputStream(Rutatmp + rs01.getString("A3953LOGO"));
                    //FileOutputStream fout=new FileOutputStream("/Dumps/"+ rs01.getString("A3953LOGO"));                                    
                    fout.write(barr);
                    fout.close();
                }
                lstRtn.add(objRtn);
            }
            /*pos 1*/
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP04557Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs02.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs02.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs02.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs02.getString("A3961COME2");
                    lstRtn.add(objRtn);
                }
            }
            /*pos 2*/
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objRtn = new SQP04557Filter();
                    objRtn.tbl_misl.A3961DESC1 = rs04.getString("A3961DESC1");
                    objRtn.tbl_misl.A3961DESC2 = rs04.getString("A3961DESC2");
                    objRtn.tbl_misl.A3961COME1 = rs04.getString("A3961COME1");
                    objRtn.tbl_misl.A3961COME2 = rs04.getString("A3961COME2");
                    lstRtn.add(objRtn);
                }
            }
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objRtn = new SQP04557Filter();
                    objRtn.rpteDet1.A4260CCUST = rs03.getString("A4260CCUST");
                    objRtn.rpteDet1.A4260NRRPT = rs03.getString("A4260NRRPT");
                    objRtn.rpteDet1.A4260CDCLI = rs03.getString("A4260CDCLI");
                    objRtn.rpteDet1.A4260NTARJ = rs03.getString("A4260NTARJ");
                    objRtn.rpteDet1.A4260ITEM = rs03.getString("A4260ITEM");
                    objRtn.rpteDet1.A4260TIPO = rs03.getString("A4260TIPO");
                    
                    objRtn.rpteDet1.A4260CAM01 = rs03.getString("A4260CAM01");
                    objRtn.rpteDet1.A4260CAM02 = rs03.getString("A4260CAM02");
                    objRtn.rpteDet1.A4260CAM03 = rs03.getString("A4260CAM03");
                    objRtn.rpteDet1.A4260CAM04 = rs03.getString("A4260CAM04");
                    objRtn.rpteDet1.A4260CAM05 = rs03.getString("A4260CAM05");
                    
                    objRtn.rpteDet1.A4260CAM06 = rs03.getString("A4260CAM06");
                    objRtn.rpteDet1.A4260CAM07 = rs03.getString("A4260CAM07");
                    objRtn.rpteDet1.A4260CAM08 = rs03.getString("A4260CAM08");
                    objRtn.rpteDet1.A4260CAM09 = rs03.getString("A4260CAM09");
                    objRtn.rpteDet1.A4260CAM10 = rs03.getString("A4260CAM10");
                    
                    objRtn.rpteDet1.A4260CAM11 = rs03.getString("A4260CAM11");
                    objRtn.rpteDet1.A4260CAM12 = rs03.getString("A4260CAM12");
                    objRtn.rpteDet1.A4260CAM13 = rs03.getString("A4260CAM13");
                    objRtn.rpteDet1.A4260CAM14 = rs03.getString("A4260CAM14");
                    objRtn.rpteDet1.A4260CAM15 = rs03.getString("A4260CAM15");
                                      
                    
//                    objRtn.rpteDet.A4246CCUST = rs03.getString("A4246CCUST");
//                    objRtn.rpteDet.A4246CIA = rs03.getString("A4246CIA");
//                    objRtn.rpteDet.A4246FORMA = rs03.getString("A4246FORMA");
//                    objRtn.rpteDet.A4246SERIE = rs03.getString("A4246SERIE");
//                    objRtn.rpteDet.A4246SEQ = rs03.getString("A4246SEQ");
//                    objRtn.rpteDet.A4246NTARJ = rs03.getString("A4246NTARJ"); //new
//                    objRtn.rpteDet.A4246FEECC = rs03.getString("A4246FEECC");
//                    objRtn.rpteDet.A4246FECPR = rs03.getString("A4246FECPR");
//                    objRtn.rpteDet.A4246SOLER = rs03.getString("A4246SOLER");
//                    objRtn.rpteDet.A4246GESTR = rs03.getString("A4246GESTR");
//                    objRtn.rpteDet.A4246CFDI = rs03.getString("A4246CFDI");
//                    objRtn.rpteDet.A4246RFC = rs03.getString("A4246RFC");
//                    objRtn.rpteDet.A4246FECTB = rs03.getString("A4246FECTB");
//                    objRtn.rpteDet.A4246TRNCU = rs03.getString("A4246TRNCU");
//                    objRtn.rpteDet.A4246FEVTA = rs03.getString("A4246FEVTA");
//                    objRtn.rpteDet.A4246PAX = rs03.getString("A4246PAX");
//                    objRtn.rpteDet.A4246RUTA = rs03.getString("A4246RUTA");
//                    objRtn.rpteDet.A4246MDLOC = rs03.getString("A4246MDLOC");                    
//                    objRtn.rpteDet.A4246FARE = rs03.getDouble("A4246FARE");
//                    objRtn.rpteDet.A4246IVA = rs03.getDouble("A4246IVA");
//                    objRtn.rpteDet.A4246TUA = rs03.getDouble("A4246TUA");
//                    objRtn.rpteDet.A4246YR = rs03.getDouble("A4246YR");
//                    objRtn.rpteDet.A4246YQ = rs03.getDouble("A4246YQ");
//                    objRtn.rpteDet.A4246OTR = rs03.getDouble("A4246OTR");
//                    objRtn.rpteDet.A4246TOT = rs03.getDouble("A4246TOT");
                    lstRtn.add(objRtn);
                }
            }

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
