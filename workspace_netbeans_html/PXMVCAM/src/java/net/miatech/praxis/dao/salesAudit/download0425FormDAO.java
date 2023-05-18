/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00977Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class download0425FormDAO {

   private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public download0425FormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public download0425FormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }


    public List<SQP00977Filter> Search(SQP00977Filter filter) throws SQLException, Exception {
        List<SQP00977Filter> lstRtn = new ArrayList<SQP00977Filter>(0);
        SQP00977Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP00963(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_TYPE);
            cstmt01.setString(9, filter.VP_SEQ);
            cstmt01.setString(10, filter.VP_OPCION);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00977Filter();

                objRtn.A2558CCUST = rs01.getString("A2558CCUST");
                objRtn.A2558CIA = rs01.getString("A2558CIA");
                objRtn.A2558FORMA = rs01.getString("A2558FORMA");
                objRtn.A2558SERIE = rs01.getString("A2558SERIE");
                objRtn.A2558TIKET =  rs01.getString("A2558CIA") +""+rs01.getString("A2558FORMA") +""+rs01.getString("A2558SERIE");
                objRtn.A2558FUENT = rs01.getString("A2558FUENT");
                objRtn.A2558SFUEN = rs01.getString("A2558SFUEN");
                objRtn.A2558TRNCU = rs01.getString("A2558TRNCU");
                objRtn.A2558AGTIA = rs01.getString("A2558AGTIA");
                objRtn.A2558AGENT = rs01.getString("A2558AGENT");
                objRtn.A2558FBRI1 = rs01.getString("A2558FBRI1");
                objRtn.A2558FBRI2 = rs01.getString("A2558FBRI2");
                objRtn.A2558FBRI3 = rs01.getString("A2558FBRI3");
                objRtn.A2558FBRI4 = rs01.getString("A2558FBRI4");
                objRtn.A2558CLAS1 = rs01.getString("A2558CLAS1");
                objRtn.A2558CLAS2 = rs01.getString("A2558CLAS2");
                objRtn.A2558CLAS3 = rs01.getString("A2558CLAS3");
                objRtn.A2558CLAS4 = rs01.getString("A2558CLAS4");
                objRtn.A2558FVTA = rs01.getString("A2558FVTA");
                objRtn.A2558CFOP = rs01.getString("A2558CFOP");
                objRtn.A2558TFOP = rs01.getString("A2558TFOP");
                objRtn.A2558TTARJ = rs01.getString("A2558TTARJ");
                objRtn.A2558NREF = rs01.getString("A2558NREF");
                objRtn.A2558PAX = rs01.getString("A2558PAX");
                objRtn.A2558TPAX = rs01.getString("A2558TPAX");
                objRtn.A2558CDIT = rs01.getString("A2558CDIT");
                objRtn.A2558PVTA = rs01.getString("A2558PVTA");
                objRtn.A2558ARPI = rs01.getString("A2558ARPI");
                objRtn.A2558MDA = rs01.getString("A2558MDA");
                objRtn.A2558TRIFA = rs01.getDouble("A2558TRIFA");
                objRtn.A2558TTCOM = rs01.getDouble("A2558TTCOM");
                objRtn.A2558TTAX = rs01.getDouble("A2558TTAX");
                objRtn.A2558NLOTE = rs01.getString("A2558NLOTE");
                objRtn.A2558TVTA = rs01.getString("A2558TVTA");
                objRtn.A2558FLAG = rs01.getString("A2558FLAG");
                objRtn.A2558CHEQ = rs01.getString("A2558CHEQ");
                objRtn.A2558PNR = rs01.getString("A2558PNR");
                objRtn.A2558TDOC = rs01.getString("A2558TDOC");
                objRtn.A2558ADC = rs01.getDouble("A2558ADC");
                objRtn.A2558NSEQ = rs01.getString("A2558NSEQ");
                objRtn.A2558REGIS = rs01.getString("A2558REGIS");
                objRtn.A2558FREGI = rs01.getString("A2558FREGI");
                objRtn.A2558HREGI = rs01.getString("A2558HREGI");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    
    public String ProcesarTKTATOS(SQP00977Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00977(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PAIS", filter.VP_PAIS);
            cs.setString("IN_DATEFROM", filter.VP_DATEFROM);
            cs.setString("IN_DATETO", filter.VP_DATETO);
            cs.setString("IN_CIA", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FORMA", filter.VP_FORMA);
            cs.setString("IN_SERIE", filter.VP_SERIE);
            cs.setString("IN_TYPE", filter.VP_TYPE);
            cs.setString("IN_SEQ", filter.VP_SEQ);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_OPCION", filter.VP_OPCION);
            cs.setString("IN_IATA", filter.VP_IATA);
            
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
