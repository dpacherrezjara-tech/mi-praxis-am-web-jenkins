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
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3649Filter;
import net.miatech.beans.SaleAudit.A3651Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A3649;
import static net.miatech.praxis.dao.salesAudit.RFNDQueryDAO.pasarGarbageCollector;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDPendingDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDPendingDAO() {

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDPendingDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3647Filter> SearchReportQueryRFND(A3647Filter filter) throws SQLException, Exception {
        List<A3647Filter> lstRtn = new ArrayList<A3647Filter>(0);
        A3647Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL LIBSAP26.SQP03099(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_FORMA);
            cstmt01.setString(5, filter.IN_SERIE);
            cstmt01.setString(6, filter.IN_SEQ);
            cstmt01.setString(7, filter.IN_FOLIO);
            cstmt01.setString(8, filter.IN_DATEFROM);
            cstmt01.setString(9, filter.IN_DATETO);
            cstmt01.setString(10, filter.IN_COUNTRY);
            cstmt01.setString(11, filter.IN_STATUS);
            cstmt01.setString(12, filter.IN_USER);
            cstmt01.setString(13, filter.IN_IATA);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3647Filter();
                objRtn.A3647CCUST = rs01.getString("A3647CCUST");
                objRtn.A3647PREME = rs01.getString("A3647PREME");
                objRtn.A3647PAIS = rs01.getString("A3647PAIS");
                objRtn.A3647FOLIO = rs01.getString("A3647FOLIO");
                objRtn.A3647IATA = rs01.getString("A3647IATA");
                objRtn.A3647EMAIL = rs01.getString("A3647EMAIL");
                objRtn.A3647MDA = rs01.getString("A3647MDA");
                objRtn.A3647ARCD = rs01.getString("A3647ARCD");
                objRtn.A3647AREA = rs01.getString("A3647AREA");
                objRtn.A3647COCD = rs01.getString("A3647COCD");
                objRtn.A3647COMP = rs01.getString("A3647COMP");
                objRtn.A3647FTE = rs01.getString("A3647FTE");
                objRtn.A3647FAUTO = rs01.getString("A3647FAUTO");
                objRtn.A3647HAUTO = rs01.getString("A3647HAUTO");
                objRtn.A3647FREJE = rs01.getString("A3647FREJE");
                objRtn.A3647FSETT = rs01.getString("A3647FSETT");
                objRtn.A3647FMODI = rs01.getString("A3647FMODI");
                objRtn.A3647PAX = rs01.getString("A3647PAX");
                objRtn.A3647TVTA = rs01.getString("A3647TVTA");
                objRtn.A3647FLAG = rs01.getString("A3647FLAG");
                objRtn.A3647PGNA = rs01.getString("A3647PGNA");
                objRtn.A3647PGNA1 = rs01.getString("A3647PGNA1");
                objRtn.A3647PGNA2 = rs01.getString("A3647PGNA2");
                objRtn.A3647TDOC = rs01.getString("A3647TDOC");
                objRtn.A3647RAAG = rs01.getString("A3647RAAG");
                objRtn.A3647RAAR = rs01.getString("A3647RAAR");
                objRtn.A3647RAUD = rs01.getString("A3647RAUD");
                objRtn.A3647RAPR = rs01.getString("A3647RAPR");
                objRtn.A3647RATR = rs01.getString("A3647RATR");
                objRtn.A3647FAPPI = rs01.getString("A3647FAPPI");
                objRtn.A3647HAPPI = rs01.getString("A3647HAPPI");
                objRtn.A3647FRERT = rs01.getString("A3647FRERT");
                objRtn.A3647REGAS = rs01.getString("A3647REGAS");
                objRtn.A3647FREAS = rs01.getString("A3647FREAS");
                objRtn.A3647HREAS = rs01.getString("A3647HREAS");
                objRtn.A3647REGRE = rs01.getString("A3647REGRE");
                objRtn.A3647FRERE = rs01.getString("A3647FRERE");
                objRtn.A3647HRERE = rs01.getString("A3647HRERE");
                objRtn.A3647REGRR = rs01.getString("A3647REGRR");
                objRtn.A3647FRERR = rs01.getString("A3647FRERR");
                objRtn.A3647HRERR = rs01.getString("A3647HRERR");
                objRtn.A3647FREGA = rs01.getString("A3647FREGA");
                objRtn.A3647HREGA = rs01.getString("A3647HREGA");
                objRtn.A3647REGIS = rs01.getString("A3647REGIS");
                objRtn.A3647FREGI = rs01.getString("A3647FREGI");
                objRtn.A3647HREGI = rs01.getString("A3647HREGI");
                objRtn.A3647REVIS = rs01.getString("A3647REVIS");
                objRtn.A3647FREVI = rs01.getString("A3647FREVI");
                objRtn.A3647HREVI = rs01.getString("A3647HREVI");
                objRtn.A3647MODO = rs01.getString("A3647MODO");
                objRtn.A3647STATO = rs01.getString("A3647STATO");
                objRtn.A3647DIAS = rs01.getString("DIAS");
                objRtn.A3647TKTDUPLI = rs01.getString("A3647TKTDUPLI");
                objRtn.A3647SEMAF = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A3647TRFD = rs01.getString("A3647TRFD");
                objRtn.A3647CANTIDAD = rs01.getString("A3647CANTIDAD");
                
                objRtn.A3647TARIF = rs01.getDouble("A3647TARIF");
                objRtn.A3647TARIU = rs01.getDouble("A3647TARIU");
                objRtn.A3647TARED = rs01.getDouble("A3647TARED");
                objRtn.A3647COMIS = rs01.getDouble("A3647COMIS");
                objRtn.A3647PORCO = rs01.getDouble("A3647PORCO");
                objRtn.A3647TTAX = rs01.getDouble("A3647TTAX");
                objRtn.A3647PENAL = rs01.getDouble("A3647PENAL");
                objRtn.A3647PORPE = rs01.getDouble("A3647PORPE");
                objRtn.A3647TOTAL = rs01.getDouble("A3647TOTAL");
                objRtn.A3647TARIA = rs01.getDouble("A3647TARIA");
                objRtn.A3647TAIUJ = rs01.getDouble("A3647TAIUJ");
                objRtn.A3647EMAIC = rs01.getString("A3647EMAIC");
                objRtn.A3647ANIO = rs01.getString("A3647ANIO");
                objRtn.A3647SFW = rs01.getString("A3647SFW");
                
                objRtn.A3647TAIDJ = rs01.getDouble("A3647TAIDJ");
                objRtn.A3647COMIA = rs01.getDouble("A3647COMIA");
                objRtn.A3647PORCA = rs01.getDouble("A3647PORCA");
                objRtn.A3647TTAXA = rs01.getDouble("A3647TTAXA");
                objRtn.A3647PENAA = rs01.getDouble("A3647PENAA");
                objRtn.A3647PORPJ = rs01.getDouble("A3647PORPJ");
                objRtn.A3647TOTAA = rs01.getDouble("A3647TOTAA");
                objRtn.A3647TARID = rs01.getDouble("A3647TARID");
                objRtn.A3647TAIUD = rs01.getDouble("A3647TAIUD");
                objRtn.A3647TAIDD = rs01.getDouble("A3647TAIDD");
                objRtn.A3647COMID = rs01.getDouble("A3647COMID");
                objRtn.A3647PORCD = rs01.getDouble("A3647PORCD");
                objRtn.A3647TTAXD = rs01.getDouble("A3647TTAXD");
                objRtn.A3647PENAD = rs01.getDouble("A3647PENAD");
                objRtn.A3647PORPD = rs01.getDouble("A3647PORPD");
                objRtn.A3647TOTAD = rs01.getDouble("A3647TOTAD");
                objRtn.A3647NETO = rs01.getDouble("A3647NETO");
                // A2548EMISION
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
    
     public List<A3651Filter> SearchRFNDRazon(A3651Filter filter) throws SQLException, Exception {
        List<A3651Filter> lstRtn = new ArrayList<A3651Filter>(0);
        A3651Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL LIBSAP26.SQP03100(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PAIS);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3651Filter();
                objRtn.A3651CCUST = rs01.getString("A3651CCUST");
                objRtn.A3651CODRZ = rs01.getString("A3651CODRZ");
                objRtn.A3651FAMIL = rs01.getString("A3651FAMIL");
                objRtn.A3651COMRE = rs01.getString("A3651COMRE");
                objRtn.A3651COMES = rs01.getString("A3651COMES");
                objRtn.A3651COMEN = rs01.getString("A3651COMEN");
                objRtn.A3651COMPO = rs01.getString("A3651COMPO");
                objRtn.A3651COMFR = rs01.getString("A3651COMFR");
                objRtn.IN_COMENT = rs01.getString("VL_LENG");
                lstRtn.add(objRtn);
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
     
     public String ProcesaManualRFND(A3647Filter beanGuardarA3389, ArrayList<A3649Filter> gridDataRazones) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String valida = "Y";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL LIBSAP26.SQP03101(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            //if (beanGuardarA3389.IN_STATUS.equals("R")) {
                for (A3649Filter obj : gridDataRazones) {

                    cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                    cs.setString("IN_PREME", beanGuardarA3389.IN_PREME);
                    cs.setString("IN_ANIO", beanGuardarA3389.IN_ANIO);
                    cs.setString("IN_STATUS", beanGuardarA3389.IN_STATUS);
                    cs.setString("IN_CODRZ", obj.A3649CODE);
                    cs.setString("IN_ERROR", obj.A3649ERROR);
                    cs.setString("IN_FAMIL", obj.A3649FAMIL);
                    cs.setString("IN_ARCHV1", "");
                    cs.setString("IN_ARCHV2", "");
                    cs.setString("IN_ARCHV3", "");
                    cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                    cs.setString("IN_FREGI", Functions.getFechaActual());
                    cs.setString("IN_HREGI", Functions.getHoraActual());
                    cs.setString("IN_VALIDA", valida);
                    cs.execute();
                    valida = "N";
                }

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
     
     public List<A3647Filter> SearchTICKETRFND(A3647Filter filter) throws SQLException, Exception {
        List<A3647Filter> lstRtn = new ArrayList<A3647Filter>(0);
        A3647Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL LIBSAP26.SQP03295(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_PREME);
            cstmt01.setString(4, filter.IN_ANIO);

            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3647Filter();
                objRtn.A3647CCUST = rs01.getString("A3648CCUST");
                objRtn.A3647TKTDUPLI = rs01.getString("A3648CIA") +""+ rs01.getString("A3648FORMA") +""+rs01.getString("A3648SERIE");
                objRtn.A3647FLAG = rs01.getString("A3648FLAG");
                objRtn.A3647PGNA1 = rs01.getString("A3648ERROR"); 
                objRtn.A3647TOTAD = rs01.getDouble("A3648TOTAD"); 
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
}
