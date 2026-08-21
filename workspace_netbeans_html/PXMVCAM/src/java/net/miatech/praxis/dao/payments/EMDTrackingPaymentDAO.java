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
import net.miatech.praxis.payment.old.A2331Filter;
import net.miatech.praxis.payment.old.A3757Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class EMDTrackingPaymentDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public EMDTrackingPaymentDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EMDTrackingPaymentDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //**************************************************************************
    //***************************** PX529 **************************************
    //**************************************************************************
    
    public List<A3757Filter> loadPX529SQP03550(A3757Filter filter) throws SQLException, Exception {
        
        List<A3757Filter> lstTkts = new ArrayList<A3757Filter>(0);
        A3757Filter bean;
        long QTKTS1 = 0, QTKTEN = 0, QTKTNEW = 0 , QTKTFLOW=0,QTKTACLA=0,QTKTCHAR=0;
        double AMOUNT1 = 0, AMOUNTEN = 0, AMOUNTNEW = 0,AMOUNTFLOW=0,AMOUNTCL=0,AMOUNTCH=0;


        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03550(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.execute();
            
            rst = cstmt.getResultSet();

            while (rst.next()) {

                QTKTS1 = rst.getLong("QTKTS1");
                QTKTEN = rst.getLong("QTKTEN");
                QTKTNEW = rst.getLong("QTKTNEW");
                QTKTFLOW = rst.getLong("QTKTFLOW");
                QTKTACLA = rst.getLong("QTKTACLA");
                QTKTCHAR = rst.getLong("QTKTCHAR");
                
                AMOUNT1 = rst.getDouble("AMOUNT1");
                AMOUNTEN = rst.getDouble("AMOUNTEN");
                AMOUNTNEW = rst.getDouble("AMOUNTNEW");
                AMOUNTFLOW = rst.getDouble("AMOUNTFLOW");
                AMOUNTCL = rst.getDouble("AMOUNTCL");
                AMOUNTCH = rst.getDouble("AMOUNTCH");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A3757Filter();
                    bean.DSALES = rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DSALES);
                    bean.CURRENCY = rst.getString("CURRENCY");
                    
                    bean.QTKTS1 = rst.getLong("QTKTS1");
                    bean.QTKTEN = rst.getLong("QTKTEN");
                    bean.QTKTNEW = rst.getLong("QTKTNEW");
                    bean.QTKTFLOW = rst.getLong("QTKTFLOW");
                    bean.QTKTACLA = rst.getLong("QTKTACLA");
                    bean.QTKTCHAR = rst.getLong("QTKTCHAR");

                    bean.AMOUNT1 = rst.getDouble("AMOUNT1");
                    bean.AMOUNTEN = rst.getDouble("AMOUNTEN");
                    bean.AMOUNTNEW = rst.getDouble("AMOUNTNEW");
                    bean.AMOUNTFLOW = rst.getDouble("AMOUNTFLOW");
                    bean.AMOUNTCL = rst.getDouble("AMOUNTCL");
                    bean.AMOUNTCH = rst.getDouble("AMOUNTCH");
                    
                    //Totales
                    bean.totQTKTS1 = QTKTS1;
                    bean.totQTKTEN = QTKTEN;
                    bean.totQTKTNEW = QTKTNEW;
                    bean.totQTKTFLOW = QTKTFLOW;
                    bean.totQTKTACLA = QTKTACLA;
                    bean.totQTKTCHAR = QTKTCHAR;
                    
                    bean.totAMOUNT1 = AMOUNT1;
                    bean.totAMOUNTEN = AMOUNTEN;
                    bean.totAMOUNTNEW = AMOUNTNEW;
                    bean.totAMOUNTFLOW = AMOUNTFLOW;
                    bean.totAMOUNTCL = AMOUNTCL;
                    bean.totAMOUNTCH = AMOUNTCH;
                    
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
   
    public List<A3757Filter> loadPX529SQP03551(A3757Filter filter) throws SQLException, Exception {
        
        List<A3757Filter> lstTkts = new ArrayList<A3757Filter>(0);
        A3757Filter bean;
        long QTKTS1 = 0, QTKTEN = 0, QTKTNEW = 0 , QTKTFLOW=0,QTKTACLA=0,QTKTCHAR=0;
        double AMOUNT1 = 0, AMOUNTEN = 0, AMOUNTNEW = 0,AMOUNTFLOW=0,AMOUNTCL=0,AMOUNTCH=0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03551(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DSALES);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.execute();
            
            rst = cstmt.getResultSet();

            while (rst.next()) {

                QTKTS1 = rst.getLong("QTKTS1");
                QTKTEN = rst.getLong("QTKTEN");
                QTKTNEW = rst.getLong("QTKTNEW");
                QTKTFLOW = rst.getLong("QTKTFLOW");
                QTKTACLA = rst.getLong("QTKTACLA");
                QTKTCHAR = rst.getLong("QTKTCHAR");
                
                AMOUNT1 = rst.getDouble("AMOUNT1");
                AMOUNTEN = rst.getDouble("AMOUNTEN");
                AMOUNTNEW = rst.getDouble("AMOUNTNEW");
                AMOUNTFLOW = rst.getDouble("AMOUNTFLOW");
                AMOUNTCL = rst.getDouble("AMOUNTCL");
                AMOUNTCH = rst.getDouble("AMOUNTCH");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A3757Filter();
                    
                    bean.strFormatDate = filter.strFormatDate;
                    bean.DSALES = rst.getString("DSALES");
                    bean.strFormatDate2 = Functions.getMonthConvert(bean.DSALES);
                    bean.CURRENCY = rst.getString("CURRENCY");
                    
                    bean.QTKTS1 = rst.getLong("QTKTS1");
                    bean.QTKTEN = rst.getLong("QTKTEN");
                    bean.QTKTNEW = rst.getLong("QTKTNEW");
                    bean.QTKTFLOW = rst.getLong("QTKTFLOW");
                    bean.QTKTACLA = rst.getLong("QTKTACLA");
                    bean.QTKTCHAR = rst.getLong("QTKTCHAR");

                    bean.AMOUNT1 = rst.getDouble("AMOUNT1");
                    bean.AMOUNTEN = rst.getDouble("AMOUNTEN");
                    bean.AMOUNTNEW = rst.getDouble("AMOUNTNEW");
                    bean.AMOUNTFLOW = rst.getDouble("AMOUNTFLOW");
                    bean.AMOUNTCL = rst.getDouble("AMOUNTCL");
                    bean.AMOUNTCH = rst.getDouble("AMOUNTCH");
                    
                    //Totales
                    bean.totQTKTS1 = QTKTS1;
                    bean.totQTKTEN = QTKTEN;
                    bean.totQTKTNEW = QTKTNEW;
                    bean.totQTKTFLOW = QTKTFLOW;
                    bean.totQTKTACLA = QTKTACLA;
                    bean.totQTKTCHAR = QTKTCHAR;
                    
                    bean.totAMOUNT1 = AMOUNT1;
                    bean.totAMOUNTEN = AMOUNTEN;
                    bean.totAMOUNTNEW = AMOUNTNEW;
                    bean.totAMOUNTFLOW = AMOUNTFLOW;
                    bean.totAMOUNTCL = AMOUNTCL;
                    bean.totAMOUNTCH = AMOUNTCH;
                    
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
    
    public List<A3757Filter> loadPX529SQP03552(A3757Filter filter) throws SQLException, Exception {
        
        List<A3757Filter> lstTkts = new ArrayList<A3757Filter>(0);
        A3757Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F","Flown");
        hm.put("E","Exchange");
        hm.put("R","Refund");
        hm.put(" ","Without Use");
               
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03552(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);


            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DSALES);
            cstmt.setString(3, filter.IN_TKT);

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
                VFOP = rst.getDouble("VFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A3757Filter();
                    bean.strFormatDate2 = filter.strFormatDate2;
                    bean.DSALES = rst.getString("FVTA");
                    bean.strFormatDate2 = Functions.getMonthConvert(bean.DSALES);
                    bean.CCIAA  = rst.getString("CCIAA");
                    bean.FORMAA = rst.getString("FORMAA");
                    bean.SERIEA = rst.getString("SERIEA");
                    bean.strTicket = bean.CCIAA + bean.FORMAA + bean.SERIEA;
                    bean.FVTA   = rst.getString("FVTA");
                    bean.strFormatDate3 = Functions.getMonthConvert(bean.FVTA);
                    bean.AGENTE = rst.getString("AGENTE");
                    bean.strDesc2 = rst.getString("desAGENTE");
                    bean.CURRENCY = rst.getString("CURRENC");
                    bean.VFOP   = rst.getDouble("VFOP");
                    bean.TDOC   = rst.getString("TDOC");
                    bean.strDesc1   = rst.getString("desTDOC");
                    bean.STVAL  = rst.getString("STVAL");
                    bean.desSTVAL = rst.getString("desSTVAL");
                    bean.strColor2 = rst.getString("strColor2");
                    bean.TRACE  = rst.getString("TRACE");
                    bean.CCIAN  = rst.getString("CCIAN");
                    bean.FORMAN = rst.getString("FORMAN");
                    bean.SERIEN = rst.getString("SERIEN");
                    bean.strDesc = bean.CCIAN + bean.FORMAN + bean.SERIEN;
                    bean.FVTAN = rst.getString("FVTAN");
                    bean.strFormatDate6 = Functions.getMonthConvert(bean.FVTAN);
                    bean.FECR   = rst.getString("FECR");
                    bean.strFormatDate4 = Functions.getMonthConvert(bean.FECR);
                    bean.MSGERR = rst.getString("MSGERR");
                    bean.SENTDATE = rst.getString("SENTDATE");
                    bean.strFormatDate5 = Functions.getMonthConvert(bean.SENTDATE);
                    bean.STVALB = rst.getString("STVALB");
                    bean.desSTVALB = rst.getString("desSTVALB");
                    bean.strColor = rst.getString("strColor");
                    bean.STUSO  = rst.getString("STUSO");
                    bean.STUSO1  = rst.getString("STUSO1");
                    bean.strDesc4 = (String) hm.get(bean.STUSO1);
                    bean.STUSO2  = rst.getString("STUSO2");
                    bean.strDesc5 = (String) hm.get(bean.STUSO2);
                    bean.STUSO3  = rst.getString("STUSO3");
                    bean.strDesc6 = (String) hm.get(bean.STUSO3);
                    bean.STUSO4  = rst.getString("STUSO4");
                    bean.strDesc7 = (String) hm.get(bean.STUSO4);
                    
                    bean.STUSON  = rst.getString("STUSON");
                    bean.STUSON1  = rst.getString("STUSON1");
                    bean.strDesc8 = (String) hm.get(bean.STUSON1);
                    bean.STUSON2  = rst.getString("STUSON2");
                    bean.strDesc9 = (String) hm.get(bean.STUSON2);
                    bean.STUSON3  = rst.getString("STUSON3");
                    bean.strDesc10 = (String) hm.get(bean.STUSON3);
                    bean.STUSON4  = rst.getString("STUSON4");
                    bean.strDesc11 = (String) hm.get(bean.STUSON4);
                    
                    //Totales
                    bean.totVFOP = VFOP;
                    
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
    /*LOG*/
    public List<A3757Filter> loadPX529SQP03571(A3757Filter filter) throws SQLException, Exception {
        
        List<A3757Filter> lstTkts = new ArrayList<A3757Filter>(0);
        A3757Filter bean;
        long QTY = 0,ACLARAC=0,REVERSE=0,CHGBACK=0,OTHER=0;
        double REVERSE_AMT =0.0 ,CHGBACK_AMT =0.0,SVFOPUSD=0.0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03571(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.execute();
            
            rst = cstmt.getResultSet();

            while (rst.next()) {

                QTY = rst.getLong("QTY");
                ACLARAC = rst.getLong("ACLARAC");
                REVERSE = rst.getLong("REVERSE");
                CHGBACK = rst.getLong("CHGBACK");
                OTHER = rst.getLong("OTHER");
                
                SVFOPUSD = rst.getDouble("SVFOPUSD");
                REVERSE_AMT = rst.getDouble("REVERSE_AMT");
                CHGBACK_AMT = rst.getDouble("CHGBACK_AMT");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A3757Filter();
                    bean.DCREATION = rst.getString("DCREATION");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DCREATION);
                    bean.MSGERR = rst.getString("MSGERR");
                    
                    bean.QTY = rst.getLong("QTY");
                    bean.ACLARAC = rst.getLong("ACLARAC");
                    bean.REVERSE = rst.getLong("REVERSE");
                    bean.CHGBACK = rst.getLong("CHGBACK");
                    bean.OTHER = rst.getLong("OTHER");
                    
                    bean.SVFOPUSD = rst.getDouble("SVFOPUSD");
                    bean.REVERSE_AMT = rst.getDouble("REVERSE_AMT");
                    bean.CHGBACK_AMT = rst.getDouble("CHGBACK_AMT");
                    
                    //Totales
                    bean.totQTY = QTY;
                    bean.totACLARAC = ACLARAC;
                    bean.totREVERSE = REVERSE;
                    bean.totCHGBACK = CHGBACK;
                    bean.totOTHER = OTHER;
                    
                    bean.totSVFOPUSD = SVFOPUSD;
                    bean.totREVERSE_AMT = REVERSE_AMT;
                    bean.totCHGBACK_AMT = CHGBACK_AMT;
                    
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
    
    public List<A2331Filter> loadPX529SQP03572(A2331Filter filter) throws SQLException, Exception {
        
        List<A2331Filter> lstTkts = new ArrayList<A2331Filter>(0);
        A2331Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F","Flown");
        hm.put("E","Exchange");
        hm.put("R","Refund");
        hm.put(" ","Without Use");
               
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03572(?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);


            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FECR);
            cstmt.setString(3, filter.TDOC);
            cstmt.setString(4, filter.IN_TKT);

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
                VFOP = rst.getDouble("VFOP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    bean = new A2331Filter();
                    bean.FECR = filter.FECR;
                    bean.TDOC = filter.TDOC;
                    bean.strFormatDate = Functions.getMonthConvert(bean.FECR);
                    bean.CCIA  = rst.getString("CCIA");
                    bean.FORMA = rst.getString("FORMA");
                    bean.SERIE = rst.getString("SERIE");
                    bean.strTicket = bean.CCIA + bean.FORMA + bean.SERIE;
                    bean.SALEDATE  = rst.getString("SALEDATE");
                    bean.strFormatDate1  = Functions.getMonthConvert(bean.SALEDATE);
                    bean.SENTDATE  = rst.getString("SENTDATE");
                    bean.strFormatDate2 = Functions.getMonthConvert(bean.SENTDATE);
                    bean.CODEBANK  = rst.getString("CODEBANK");
                    bean.strDescBank  = rst.getString("desCODEBANK");
                    bean.SCARCOD  = rst.getString("SCARCOD");
                    bean.CARDNBR  = rst.getString("CARDNBR");
                    bean.AUTHNBR  = rst.getString("AUTHNBR");
                    bean.MSGERR  = rst.getString("MSGERR");
                    bean.STVAL  = rst.getString("STVAL");
                    bean.MFOP  = rst.getString("MFOP");
                    bean.VFOP  = rst.getDouble("VFOP");
                    bean.STUSOS  = rst.getString("STUSOS");
                    bean.strDescUsoCpn1  = rst.getString("STUSOS1");
                    bean.strDescUsoCpnF1= (String) hm.get(bean.strDescUsoCpn1);
                    bean.strDescUsoCpn2  = rst.getString("STUSOS2");
                    bean.strDescUsoCpnF2 = (String) hm.get(bean.strDescUsoCpn2);
                    bean.strDescUsoCpn3  = rst.getString("STUSOS3");
                    bean.strDescUsoCpnF3 = (String) hm.get(bean.strDescUsoCpn3);
                    bean.strDescUsoCpn4  = rst.getString("STUSOS4");
                    bean.strDescUsoCpnF4 = (String) hm.get(bean.strDescUsoCpn4);
                    bean.PAX  = rst.getString("PAX");
                    
                    bean.totVFOP  = VFOP;
                    //Totales
                    
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
