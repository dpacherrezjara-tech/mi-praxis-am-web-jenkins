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
    
    public List<A1817Filter> loadPX529SQP04924(A1817Filter filter) throws SQLException, Exception {
        
        List<A1817Filter> lstTkts = new ArrayList<A1817Filter>(0);
        A1817Filter bean;
        double VFOP = 0;
        HashMap hm = new HashMap();
        hm.put("F","Flown");
        hm.put("E","Exchange");
        hm.put("R","Refund");
        hm.put(" ","Without Use");
               
        
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
            cstmt.setString(3, filter.IN_DATE_FROM);
            cstmt.setString(4, filter.IN_DATE_TO);
            cstmt.setString(5, filter.IN_STVAL);
            cstmt.setString(6, filter.IN_TICKET);

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
                    bean.DSALES = rst.getString("FVTA");
                    bean.strFormatDate = Functions.getMonthConvert(bean.DSALES);
                    bean.SCOUNTRY  = rst.getString("PSVVTA");
                    bean.AGENTE  = rst.getString("AGTIA");
//                    bean.strDescAgente = rst.getString("desAGENTE");
                    bean.ORIG  = rst.getString("CDEPART");
                    bean.DEST  = rst.getString("CARRIVA");
                    bean.CCIA  = rst.getString("CCIA");
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
                    bean.STVAL  = rst.getString("STVAL");
                    bean.IDCON  = rst.getString("IDCON");
                    bean.FCONT  = rst.getString("FCONT");
                    bean.descFCONT = Functions.getMonthConvert(bean.FCONT);
                    bean.FVTA   = rst.getString("FVTA");
                    bean.descFVTA = Functions.getMonthConvert(bean.FVTA);
                    
                    if(bean.STVAL.equals("0")){
                        bean.descSTVAL = "Venta sin Uso";
                    }else if(bean.STVAL.equals("1")){
                        bean.descSTVAL = "Uso sin Venta";
                    }else if(bean.STVAL.equals("2")){
                        bean.descSTVAL = "MATCH";
                    }
//                    bean.VFOP   = rst.getDouble("VFOP");
                    
                    
                    //Totales
//                    bean.totVFOP = VFOP;
                    
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
