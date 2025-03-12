package net.miatech.praxis.dao.travelbank;

// <editor-fold defaultstate="collapsed" desc="Imports">
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import net.miatech.beans.A4405Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class AccountMasterTravelBankDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public AccountMasterTravelBankDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4405Filter> loadPX126S02A4405(A4405Filter filter) {
        List<A4405Filter> lstRtn = new ArrayList<>(0);
        A4405Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = 20, totRows = -1;
        try {
            strSQL = "{CALL PXTRVLBANK" + ".SQP04844(?,?,?,?,?,?,?,?,?,?)}"; // PX126S01A4405

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, filter.IN_A4405TITRA.trim());
            cs.setString(2, filter.IN_A4405TIPO.trim());
            cs.setString(3, filter.A4405SUBTI.trim());
            cs.setString(4, filter.A4405CATEG.trim());
            cs.setString(5, filter.A4405CTA.trim());
            cs.setString(6, filter.A4405SCTA.trim());
            cs.setInt(7, PAGINIT);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, totRows);
            cs.setInt(10, -1);

            cs.execute();

            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt(9)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cs.getInt(10);
                    int total = (int) (totRows / 20);
                    int resto = (totRows % 20);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new A4405Filter();
                objRtn.RN = rst.getLong("NO");
                objRtn.A4405TITRA = rst.getString("A4405TITRA").trim();
                objRtn.A4405TIPO = rst.getString("A4405TIPO").trim();
                objRtn.A4405TIPODESC = rst.getString("A4405TIPODESC").trim();
                objRtn.A4405SUBTI = rst.getString("A4405SUBTI").trim();
                objRtn.A4405CATEG = rst.getString("A4405CATEG").trim();
                objRtn.A4405CIA = rst.getString("A4405CIA").trim();
                objRtn.A4405UNIDA = rst.getString("A4405UNIDA").trim();
                objRtn.A4405CECOS = rst.getString("A4405CECOS").trim();
                objRtn.A4405UBICA = rst.getString("A4405UBICA").trim();
                objRtn.A4405CTA = rst.getString("A4405CTA").trim();
                objRtn.A4405SCTA = rst.getString("A4405SCTA").trim();
                objRtn.A4405EQUI = rst.getString("A4405EQUI").trim();
                objRtn.A4405ICIA = rst.getString("A4405ICIA").trim();
                objRtn.A4405CLIE = rst.getString("A4405CLIE").trim();
                objRtn.A4405FINI = Functions.getMonthConvertDate(rst.getString("A4405FINI").trim());
                objRtn.A4405FFIN = Functions.getMonthConvertDate(rst.getString("A4405FFIN").trim());

                objRtn.A4405REGIS = rst.getString("A4405REGIS").trim();
                objRtn.A4405FREGI = Functions.getMonthConvertDate(rst.getString("A4405FREGI").trim());
                objRtn.A4405HREGI = Functions.ConvertedTime(rst.getString("A4405HREGI").trim());
                objRtn.A4405REGVI = rst.getString("A4405REGVI").trim();
                objRtn.A4405FREVI = Functions.getMonthConvertDate(rst.getString("A4405FREVI").trim());
                objRtn.A4405HREVI = Functions.ConvertedTime(rst.getString("A4405HREVI").trim());
                objRtn.A4405INTNU = rst.getString("A4405INTNU").trim();                

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }

     public List<A4405Filter> loadPX126S02A4405EXCEL(A4405Filter filter) throws SQLException, Exception {
        List<A4405Filter> lstRtn = new ArrayList<A4405Filter>(0);
        A4405Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTRVLBANK" + ".SQP04844(?,?,?,?,?,?,?,?,?,?)}"; // PX126S01A4405
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A4405TITRA.trim());
            cstmt01.setString(2, filter.IN_A4405TIPO.trim());
            cstmt01.setString(3, filter.A4405SUBTI.trim());
            cstmt01.setString(4, filter.A4405CATEG.trim());
            cstmt01.setString(5, filter.A4405CTA.trim());
            cstmt01.setString(6, filter.A4405SCTA.trim());

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A4405Filter();

                 objRtn.RN = rs01.getLong("NO");
                objRtn.A4405TITRA = rs01.getString("A4405TITRA").trim();
                objRtn.A4405TIPO = rs01.getString("A4405TIPO").trim();
                objRtn.A4405TIPODESC = rs01.getString("A4405TIPODESC").trim();
                objRtn.A4405SUBTI = rs01.getString("A4405SUBTI").trim();
                objRtn.A4405CATEG = rs01.getString("A4405CATEG").trim();
                objRtn.A4405CIA = rs01.getString("A4405CIA").trim();
                objRtn.A4405UNIDA = rs01.getString("A4405UNIDA").trim();
                objRtn.A4405CECOS = rs01.getString("A4405CECOS").trim();
                objRtn.A4405UBICA = rs01.getString("A4405UBICA").trim();
                objRtn.A4405CTA = rs01.getString("A4405CTA").trim();
                objRtn.A4405SCTA = rs01.getString("A4405SCTA").trim();
                objRtn.A4405EQUI = rs01.getString("A4405EQUI").trim();
                objRtn.A4405ICIA = rs01.getString("A4405ICIA").trim();
                objRtn.A4405CLIE = rs01.getString("A4405CLIE").trim();
                objRtn.A4405FINI = Functions.getMonthConvertDate(rs01.getString("A4405FINI").trim());
                objRtn.A4405FFIN = Functions.getMonthConvertDate(rs01.getString("A4405FFIN").trim());

                objRtn.A4405REGIS = rs01.getString("A4405REGIS").trim();
                objRtn.A4405FREGI = Functions.getMonthConvertDate(rs01.getString("A4405FREGI").trim());
                objRtn.A4405HREGI = Functions.ConvertedTime(rs01.getString("A4405HREGI").trim());
                objRtn.A4405REGVI = rs01.getString("A4405REGVI").trim();
                objRtn.A4405FREVI = Functions.getMonthConvertDate(rs01.getString("A4405FREVI").trim());
                objRtn.A4405HREVI = Functions.ConvertedTime(rs01.getString("A4405HREVI").trim());
                objRtn.A4405INTNU = rs01.getString("A4405INTNU").trim();
                
     
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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

        return lstRtn;


    }
    
     public String accountMasterMaintance(A4405Filter filter, String strOption) {
        String STR_RESULT = "";
        try {
            strSQL = "{CALL PXTRVLBANK" + ".SQP04845(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // PX126S02A4405
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.A4405TITRA);
            cs.setString(4, filter.A4405TIPO);
            cs.setString(5, filter.A4405SUBTI);
            cs.setString(6, filter.A4405CATEG);
            cs.setString(7, filter.A4405CIA);
            cs.setString(8, filter.A4405UNIDA);
            cs.setString(9, filter.A4405CECOS);
            cs.setString(10, filter.A4405UBICA);
            cs.setString(11, filter.A4405CTA);
            cs.setString(12, filter.A4405SCTA);
            cs.setString(13, filter.A4405EQUI);
            cs.setString(14, filter.A4405ICIA);
            cs.setString(15, filter.A4405CLIE);
            cs.setString(16, filter.A4405FINI);
            cs.setString(17, filter.A4405FFIN);
            cs.setString(18, session.getUserView().getUserInfo().USR);
            cs.setString(19, Functions.getFechaActual());
            cs.setString(20, Functions.getHoraActual());
            cs.setString(21, filter.IN_A4405TITRA_OLD);
            cs.setString(22, filter.IN_A4405TIPO_OLD);
            cs.setString(23, filter.IN_A4405SUBTI_OLD);
            cs.setString(24, filter.IN_A4405CATEG_OLD);
            cs.setString(25, filter.A4405INTNU);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }

        return STR_RESULT;
    }

    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
