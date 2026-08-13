package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A4290;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author OVASQUEZ
 */
public class AttosMasterFileDAO {
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AttosMasterFileDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
//    public List<A4290> loadCityReport(A4290 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
//
//        A4290 ciudad;
//        List<A4290> listaData = new ArrayList<>();
//        int rowsPag = 20;
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = -1;
//
//        if (filter.strExcel.equals("TRUE")) {
//            totRowsPag = -1;
//        }
//        
//        if (filter.intCurrentPg > 0) {
//            PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
//        }
//        try {
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S01A4290(?,?,?,?,?,?,?,?)}";
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cs = cnx.prepareCall(strSQL);
//
//            cs.registerOutParameter(5, Types.INTEGER);
//            cs.registerOutParameter(6, Types.INTEGER);
//            cs.registerOutParameter(7, Types.INTEGER);
//            cs.registerOutParameter(8, Types.INTEGER);
//
//            cs.setString(1, filter.A4290CTATO);
//            cs.setString(2, filter.A4290CIUD);
//            cs.setString(3, filter.A4290PAIS);
//            cs.setString(4, filter.A4290NOMCD.toUpperCase());
//            cs.setInt(5, PAGINIT);
//            cs.setInt(6, totRowsPag);
//            cs.setInt(7, totRows);
//            cs.setInt(8, filter.intTotalRws);
//            cs.execute();
//
//            filter.intCurrentPg = cs.getInt(5);
//            filter.intPageRws = cs.getInt(6);
//            filter.intTotalPgs = cs.getInt(7);
//            filter.intTotalRws = cs.getInt(8);
//
//            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(7)) {
//                totRows = filter.intTotalRws;
//                totPAGS = filter.intTotalPgs;
//            } else {
//                try {
//                    totRows = cs.getInt(8);
//                    int total = (int) (totRows / 20);
//                    int resto = (totRows % 20);
//
//                    if (resto > 0) {
//                        totPAGS = total + 1;
//                    } else {
//                        totPAGS = total;
//                    }
//
//                } catch (Exception e) {
//                    totPAGS = totRows / totRowsPag;
//                }
//            }
//
//            filter.intTotalPgs = totPAGS;
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//                ciudad = new A4290();
//                ciudad.A4290CTATO = rst.getString("A4290CTATO").trim();
//                ciudad.A4290NOMBR = rst.getString("A4290NOMBR").trim().toUpperCase();
//                ciudad.A4290CATEG = rst.getString("A4290CATEG").trim().toUpperCase();
//                ciudad.A4290CIUD = rst.getString("A4290CIUD").trim().toUpperCase();
//                ciudad.A4290NOMCD = rst.getString("A4290NOMCD").trim().toUpperCase();
//                ciudad.A4290STATE = rst.getString("A4290STATE").trim().toUpperCase();
//                ciudad.A4290PAIS = rst.getString("A4290PAIS").trim().toUpperCase();
//                ciudad.A4290TIMZ = rst.getString("A4290TIMZ").trim().toUpperCase();
//                ciudad.A4290STAT = rst.getString("A4290STAT").trim().toUpperCase();
//                ciudad.A4290REGIS = rst.getString("A4290REGIS").trim().toUpperCase();
//                ciudad.A4290FREGI = rst.getString("A4290FREGI").trim();
//                ciudad.A4290HREGI = rst.getString("A4290HREGI").trim();
//                ciudad.A4290REVIS = rst.getString("A4290REVIS").trim().toUpperCase();
//                ciudad.A4290FREVI = rst.getString("A4290FREVI").trim();
//                ciudad.A4290HREVI = rst.getString("A4290HREVI").trim();
//                ciudad.A4290LONG = rst.getDouble("A4290LONG");
//                ciudad.A4290LATI = rst.getDouble("A4290LATI");
//                ciudad.strNomPais = rst.getString("A006PAIS");
//
//                if (hmPaises.containsKey(rst.getString("A4290PAIS").trim().toUpperCase())) {
//                    ciudad.strNomPais = hmPaises.get(rst.getString("A4290PAIS").trim()).toString();
//                }
//                //Paginación ===================================================                
//                ciudad.intCurrentPg = filter.intCurrentPg / filter.intPageRws + 1;
//                ciudad.intPageRws = filter.intPageRws;
//                ciudad.intTotalPgs = filter.intTotalPgs;
//                ciudad.intTotalRws = filter.intTotalRws;
//
//                ciudad.PAGNUM = ciudad.intCurrentPg;
//                ciudad.PAGROW = ciudad.intPageRws;
//                ciudad.TOTPAG = ciudad.intTotalPgs;
//                ciudad.TOTROW = ciudad.intTotalRws;
//
//                listaData.add(ciudad);
//            }
//        } finally {
//            setClose();
//        }
//        
//        return listaData;
//    }
    
    public List<A4290> loadCityReport(A4290 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A4290 ciudad;
        List<A4290> listaData = new ArrayList<A4290>();
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = -1;

        Connection cnx = null;

        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04841(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, filter.A4290CTATO.trim());
            cs.setString(2, filter.A4290CIUD.trim());
            cs.setString(3, filter.A4290PAIS.trim());
            cs.setString(4, filter.A4290NOMCD.trim().toUpperCase());
            cs.setInt(5, PAGINIT);
            cs.setInt(6, totRowsPag);
            cs.setInt(7, totRows);
            cs.setInt(8, filter.intTotalRws);
            cs.execute();

            filter.intCurrentPg = cs.getInt(5);
            filter.intPageRws = cs.getInt(6);
            filter.intTotalPgs = cs.getInt(7);
            filter.intTotalRws = cs.getInt(8);

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(7)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(8);
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

            filter.intTotalPgs = totPAGS;

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                ciudad = new A4290();
                ciudad.A4290CTATO = rst.getString("A4290CTATO").trim();
                ciudad.A4290FINI = Functions.getMonthConvertDate(rst.getString("A4290FINI"));
                ciudad.A4290FFIN = Functions.getMonthConvertDate(rst.getString("A4290FFIN"));
                
                //if (rst.getString("A4290FFIN").trim().equals("99999999")) {
                if (ciudad.A4290FFIN.trim().equals("9999/99/99")) {
                    ciudad.A4290FFIN = ""; 
                }
                
                ciudad.A4290NOMBR = rst.getString("A4290NOMBR").trim().toUpperCase();
                ciudad.A4290CATEG = rst.getString("A4290CATEG").trim().toUpperCase();
                ciudad.A4290CIUD = rst.getString("A4290CIUD").trim().toUpperCase();
                ciudad.A4290NOMCD = rst.getString("A4290NOMCD").trim().toUpperCase();
                ciudad.A4290STATE = rst.getString("A4290STATE").trim().toUpperCase();
                ciudad.A4290PAIS = rst.getString("A4290PAIS").trim().toUpperCase();
                ciudad.A4290TIMZ = rst.getString("A4290TIMZ").trim().toUpperCase();
                ciudad.A4290STAT = rst.getString("A4290STAT").trim().toUpperCase();
                ciudad.A4290REGIS = rst.getString("A4290REGIS").trim().toUpperCase();
                ciudad.A4290FREGI = rst.getString("A4290FREGI").trim();
                ciudad.A4290HREGI = rst.getString("A4290HREGI").trim();
                ciudad.A4290REVIS = rst.getString("A4290REVIS").trim().toUpperCase();
                ciudad.A4290FREVI = rst.getString("A4290FREVI").trim();
                ciudad.A4290HREVI = rst.getString("A4290HREVI").trim();
                ciudad.A4290LONG = rst.getDouble("A4290LONG");
                ciudad.A4290LATI = rst.getDouble("A4290LATI");
                ciudad.strNomPais = rst.getString("A006PAIS");

                if (hmPaises.containsKey(rst.getString("A4290PAIS").trim().toUpperCase())) {
                    ciudad.strNomPais = hmPaises.get(rst.getString("A4290PAIS").trim()).toString();
                }
                //Paginación ===================================================                
                ciudad.intCurrentPg = filter.intCurrentPg / filter.intPageRws + 1;
                ciudad.intPageRws = filter.intPageRws;
                ciudad.intTotalPgs = filter.intTotalPgs;
                ciudad.intTotalRws = filter.intTotalRws;

                listaData.add(ciudad);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }

        } finally {
            if (rst != null) {
                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cs != null) {
                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);

        }
        return listaData;
    }
    
    public List<A4290> loadCityReport6EXCEL(A4290 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
         A4290 objRtn;
        List<A4290> lstRtn = new ArrayList<A4290>();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04841(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.A4290CTATO.trim());
            cstmt01.setString(2, filter.A4290CIUD.trim());
            cstmt01.setString(3, filter.A4290PAIS.trim());
            cstmt01.setString(4, filter.A4290NOMCD.trim().toUpperCase());

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
             int pos = 0;
            while (rs01.next()) {

                pos++;
                objRtn = new A4290();
                objRtn.A4290CTATO = rs01.getString("A4290CTATO").trim();                
                objRtn.A4290FINI = Functions.getMonthConvertDate(rs01.getString("A4290FINI"));
                objRtn.A4290FFIN = Functions.getMonthConvertDate(rs01.getString("A4290FFIN"));               
                objRtn.A4290NOMBR = rs01.getString("A4290NOMBR").trim().toUpperCase();
                objRtn.A4290CATEG = rs01.getString("A4290CATEG").trim().toUpperCase();
                objRtn.A4290CIUD = rs01.getString("A4290CIUD").trim().toUpperCase();
                objRtn.A4290NOMCD = rs01.getString("A4290NOMCD").trim().toUpperCase();
                objRtn.A4290STATE = rs01.getString("A4290STATE").trim().toUpperCase();
                objRtn.A4290PAIS = rs01.getString("A4290PAIS").trim().toUpperCase();
                objRtn.A4290TIMZ = rs01.getString("A4290TIMZ").trim().toUpperCase();
                objRtn.A4290STAT = rs01.getString("A4290STAT").trim().toUpperCase();
                objRtn.A4290REGIS = rs01.getString("A4290REGIS").trim().toUpperCase();
                objRtn.A4290FREGI = rs01.getString("A4290FREGI").trim();
                objRtn.A4290HREGI = rs01.getString("A4290HREGI").trim();
                objRtn.A4290REVIS = rs01.getString("A4290REVIS").trim().toUpperCase();
                objRtn.A4290FREVI = rs01.getString("A4290FREVI").trim();
                objRtn.A4290HREVI = rs01.getString("A4290HREVI").trim();
                objRtn.A4290LONG = rs01.getDouble("A4290LONG");
                objRtn.A4290LATI = rs01.getDouble("A4290LATI");
                objRtn.strNomPais = rs01.getString("A006PAIS");

                if (hmPaises.containsKey(rs01.getString("A4290PAIS").trim().toUpperCase())) {
                    objRtn.strNomPais = hmPaises.get(rs01.getString("A4290PAIS").trim()).toString();
                }

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
    
    public String cityReportMaintance(A4290 filter, String strOption) throws SQLException, Exception {
        String STR_RESULT = "";
        
        strSQL = "{CALL " + session.getMainLibrary() + ".SQP04842(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        cs = cnx.prepareCall(strSQL);
        cs.setString(1, strOption);
        cs.setString(2, filter.A4290CTATO);
        
        cs.setString(3, filter.A4290FINI);
        cs.setString(4, filter.A4290FFIN);
                
        cs.setString(5, filter.A4290NOMBR);
        cs.setString(6, filter.A4290CATEG);
        cs.setString(7, filter.A4290CIUD);
        cs.setString(8, filter.A4290NOMCD);
        cs.setString(9, filter.A4290STATE);
        cs.setString(10, filter.A4290PAIS);
        cs.setString(11, filter.A4290TIMZ);
        cs.setString(12, filter.A4290STAT);
        cs.setString(13, session.getUserView().getUserInfo().USR);
        cs.setString(14, Functions.getFechaActual());
        cs.setString(15, Functions.getHoraActual());
        cs.setDouble(16, filter.A4290LONG);
        cs.setDouble(17, filter.A4290LATI);
        cs.setString(18, filter.IN_A4290CTATO_OLD);
        cs.setString(19, filter.IN_A4290FINI_OLD);
        cs.execute();
        //result = cs.executeUpdate();
        rst = cs.getResultSet();
        while (rst.next()) {
            STR_RESULT = rst.getString("VMESSAGE");
        }
        setClose();

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
