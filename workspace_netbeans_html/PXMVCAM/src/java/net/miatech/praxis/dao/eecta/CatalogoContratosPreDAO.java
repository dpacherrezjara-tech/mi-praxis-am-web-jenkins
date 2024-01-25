/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP04527Filter;
import net.miatech.praxis.eecta.SQP04587Filter;
import net.miatech.praxis.eecta.SQP04588Filter;
import net.miatech.praxis.eecta.SQP04589Filter;
import net.miatech.praxis.eecta.SQP04666Filter;
import net.miatech.praxis.eecta.SQP05212Filter;
import net.miatech.praxis.eecta.SQP05241Filter;
import net.miatech.praxis.eecta.SQP05242Filter;
import net.miatech.praxis.eecta.SQP05245Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class CatalogoContratosPreDAO {
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
    public List<SQP04587Filter> getSQP04587Filter(SQP04587Filter filter) throws SQLException, Exception {
        List<SQP04587Filter> lstRtn = new ArrayList<SQP04587Filter>(0);
        SQP04587Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04587(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FECHA1);
            cstmt01.setString(4, filter.VP_FECHA2);
            cstmt01.setString(5, filter.VP_CDCLI);
            cstmt01.setString(6, filter.VP_PARAM);
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
                objRtn = new SQP04587Filter();
                objRtn.A4241CCUST = rs01.getString("A4241CCUST");
                objRtn.A4241IDANT = rs01.getInt("A4241IDANT");
                objRtn.A4241FEC = rs01.getString("A4241FEC");
                objRtn.A4241FECPE = rs01.getString("A4241FECPE");
                objRtn.A4241TOTAN = rs01.getDouble("A4241TOTAN");
                objRtn.A4241MDA = rs01.getString("A4241MDA");
                objRtn.A4241TOTBF = rs01.getDouble("A4241TOTBF");
                objRtn.A4241PORBF = rs01.getDouble("A4241PORBF");
                objRtn.A4241TOT = rs01.getDouble("A4241TOT");
                objRtn.A4241ORDN = rs01.getString("A4241ORDN");
                objRtn.A4241CONTR = rs01.getString("A4241CONTR");
                objRtn.A4241REF = rs01.getString("A4241REF");
                objRtn.A4241STANT = rs01.getString("A4241STANT");
                objRtn.A4241FECDE = rs01.getString("A4241FECDE");
                objRtn.A4241FECHA = rs01.getString("A4241FECHA");
                objRtn.A4241STSPG = rs01.getString("A4241STSPG");
                objRtn.A4241IDRCB = rs01.getInt("A4241IDRCB");
                objRtn.A4241FECRC = rs01.getString("A4241FECRC");
                objRtn.A4241NUMRC = rs01.getString("A4241NUMRC");
                objRtn.A4241CDCLI = rs01.getString("A4241CDCLI");
                objRtn.A4241USRIN = rs01.getString("A4241USRIN");
                objRtn.A4241FECIN = rs01.getString("A4241FECIN");
                objRtn.A4241HORIN = rs01.getString("A4241HORIN");
                objRtn.A4241USRAC = rs01.getString("A4241USRAC");
                objRtn.A4241FECAC = rs01.getString("A4241FECAC");
                objRtn.A4241HORAC = rs01.getString("A4241HORAC");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                //news
                objRtn.A4241FECTB  = rs01.getString("A4241FECTB");
                objRtn.A4241UIDAN  = rs01.getString("A4241UIDAN");
                objRtn.A4241UIDBF  = rs01.getString("A4241UIDBF");
                objRtn.A4241STATB  = rs01.getString("A4241STATB");
                objRtn.A4241STDE  = rs01.getString("A4241STDE");
                objRtn.A4241RMSG  = rs01.getString("A4241RMSG");
                
                // saldos
                objRtn.A4242IDANT = rs01.getInt("A4242IDANT");
                objRtn.A4242TOTAN = rs01.getDouble("A4242TOTAN");
                objRtn.A4242TOTBF = rs01.getDouble("A4242TOTBF");
                objRtn.A4242TOT = rs01.getDouble("A4242TOT");
                objRtn.A4242TOTAP = rs01.getDouble("A4242TOTAP");
                objRtn.A4242SALDO = rs01.getDouble("A4242SALDO");
                objRtn.A4242VTAAN = rs01.getDouble("A4242VTAAN");
                objRtn.A4242SALAN = rs01.getDouble("A4242SALAN");
                objRtn.A4242VTABF = rs01.getDouble("A4242VTABF");
                objRtn.A4242SALBF = rs01.getDouble("A4242SALBF");
                
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
    public List<SQP04588Filter> getSQP04588Filter(SQP04588Filter filter) throws SQLException, Exception {
        List<SQP04588Filter> lstRtn = new ArrayList<SQP04588Filter>(0);
        SQP04588Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04588(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

//            cstmt01.registerOutParameter(7, Types.INTEGER);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.VP_IDANT);
//            cstmt01.setString(3, filter.VP_FECHA1);
//            cstmt01.setString(4, filter.VP_FECHA2);
//            cstmt01.setString(5, filter.VP_CDCLI);
//            cstmt01.setString(6, filter.VP_PARAM);
//            cstmt01.setInt(7, filter.page.PAGNUM);
//            cstmt01.setInt(8, filter.page.PAGROW);
//            cstmt01.setInt(9, filter.page.TOTPAG);
//            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(7);
//            filter.page.PAGROW = cstmt01.getInt(8);
//            filter.page.TOTPAG = cstmt01.getInt(9);
//            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04588Filter();
                // saldos
                objRtn.A4244IDANT = rs01.getInt("A4244IDANT");
                objRtn.A4244ITEM = rs01.getInt("A4244ITEM");
                objRtn.A4244UATP = rs01.getString("A4244UATP");
                objRtn.A4244TIPO = rs01.getString("A4244TIPO");
                objRtn.A4244MDA = rs01.getString("A4244MDA");
                objRtn.A4244VENTA = rs01.getDouble("A4244VENTA");
                objRtn.A4244TOTAP = rs01.getDouble("A4244TOTAP");
                objRtn.A4244SALDP = rs01.getDouble("A4244SALDP");
                objRtn.A4244STSPG = rs01.getString("A4244STSPG");
                
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;

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
    public List<SQP04589Filter> getSQP04589Filter(SQP04589Filter filter) throws SQLException, Exception {
        List<SQP04589Filter> lstRtn = new ArrayList<SQP04589Filter>(0);
        SQP04589Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04589(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CDCLI);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04589Filter();                
                objRtn.A4244UATP = rs01.getString("A3954TCUAT");
                objRtn.A4244ITEM = 0;                
                objRtn.A4244TIPO = "A";
                objRtn.A4244MDA = "";
                objRtn.A4244VENTA = 0.00;
                objRtn.A4244TOTAP = 0.00;
                objRtn.A4244SALDP = 0.00;
                objRtn.A4244STSPG = ""; 
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
    public SQP04527Filter setSQP04527Filter(SQP04527Filter filter) throws SQLException, Exception {
        SQP04527Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04527(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(21, Types.VARCHAR);
            cstmt01.registerOutParameter(22, Types.VARCHAR);
            cstmt01.registerOutParameter(23, Types.VARCHAR);            
            cstmt01.setString(1, filter.VP_ACTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(3, filter.A4241IDANT);
            cstmt01.setString(4, filter.A4241FEC);
            cstmt01.setDouble(5, filter.A4241TOTAN);
            cstmt01.setString(6, filter.A4241MDA);
            cstmt01.setDouble(7, filter.A4241PORBF);
            cstmt01.setDouble(8, filter.A4241TOTBF);
            cstmt01.setDouble(9, filter.A4241TOT);
            cstmt01.setString(10, filter.A4241ORDN);
            cstmt01.setString(11, filter.A4241CONTR);
            cstmt01.setString(12, filter.A4241REF);
            cstmt01.setString(13, filter.A4241FECDE);
            cstmt01.setString(14, filter.A4241FECHA);
            cstmt01.setString(15, filter.A4241STSPG);
            cstmt01.setInt(16, filter.A4241IDRCB);
            cstmt01.setString(17, filter.A4241FECRC);
            cstmt01.setString(18, filter.A4241NUMRC); 
            cstmt01.setString(19, filter.A4241CDCLI);             
            cstmt01.setString(20, filter.VP_UATPS);
            cstmt01.execute();
            
            objRtn = new SQP04527Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(21);
            objRtn.dbException.MESSAGE = cstmt01.getString(22);
            objRtn.OU_A4241ID = cstmt01.getString(23);

        } finally {
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
    
    public SQP04666Filter setSQP04666Filter(SQP04666Filter filter) throws SQLException, Exception {
        SQP04666Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04666(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.VARCHAR);
            cstmt01.registerOutParameter(7, Types.VARCHAR);                        
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.VP_IDANT);
            cstmt01.setString(3, filter.VP_FDESDE);
            cstmt01.setString(4, filter.VP_FHASTA);
            cstmt01.setString(5, filter.VP_CDCLI);            
            cstmt01.execute();
            
            objRtn = new SQP04666Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(6);
            objRtn.dbException.MESSAGE = cstmt01.getString(7);
            
        } finally {
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
    
    // FACTURACION anticipo beneficio (NC) : para opcion MANUAL
    public SQP05212Filter setSQP05212Filter(SQP05212Filter filter) throws SQLException, Exception {
        SQP05212Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05212(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.VARCHAR);
            cstmt01.registerOutParameter(7, Types.VARCHAR);                        
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.VP_IDANT);
            cstmt01.setString(3, filter.VP_FDESDE);
            cstmt01.setString(4, filter.VP_FHASTA);
            cstmt01.setString(5, filter.VP_CDCLI);            
            cstmt01.execute();            
            objRtn = new SQP05212Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(6);
            objRtn.dbException.MESSAGE = cstmt01.getString(7);
            
        } finally {
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
    
    // FACTURACION anticipo NC TKT : para opcion MANUAL , Falta hacer pruebas 
    public SQP05245Filter setSQP05245Filter(SQP05245Filter filter) throws SQLException, Exception {
        SQP05245Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05245(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.VARCHAR);
            cstmt01.registerOutParameter(7, Types.VARCHAR);                        
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.VP_IDANT);
            cstmt01.setString(3, filter.VP_FDESDE);
            cstmt01.setString(4, filter.VP_FHASTA);
            cstmt01.setString(5, filter.VP_CDCLI);            
            cstmt01.execute();            
            objRtn = new SQP05245Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(6);
            objRtn.dbException.MESSAGE = cstmt01.getString(7);
            
        } finally {
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
   
    public SQP05241Filter setSQP05241Filter(SQP05241Filter filter) throws SQLException, Exception {
        SQP05241Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05241(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR);                        
            cstmt01.registerOutParameter(11, Types.INTEGER); 
            
            cstmt01.setString(1, filter.VP_ACTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_A4549CDCLI);
            cstmt01.setString(4, filter.VP_A4549IDANT);
            cstmt01.setString(5, filter.VP_A4549ITEM);
            cstmt01.setString(6, filter.VP_A4549COMEN);            
            cstmt01.setString(7, filter.VP_A4549NCONT);            
            cstmt01.setString(8, filter.VP_A4549PATHF);            
            cstmt01.execute();            
            objRtn = new SQP05241Filter();
            objRtn.dbException.SQLCODE = cstmt01.getString(9);
            objRtn.dbException.MESSAGE = cstmt01.getString(10);
            objRtn.OU_A4241ID = cstmt01.getInt(11);
            
        } finally {
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
    
     public List<SQP05242Filter> getSQP05242Filter(SQP05242Filter filter) throws SQLException, Exception {
        List<SQP05242Filter> lstRtn = new ArrayList<SQP05242Filter>(0);
        SQP05242Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05242(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.VP_IDANT );
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05242Filter();                
                objRtn.A4549CCUST = rs01.getString("A4549CCUST");
                objRtn.A4549IDANT = rs01.getInt("A4549CCUST");               
                objRtn.A4549CDCLI = rs01.getString("A4549CDCLI");
                objRtn.A4549ITEM = rs01.getInt("A4549ITEM");
                objRtn.A4549COMEN = rs01.getString("A4549COMEN");
                objRtn.A4549NCONT = rs01.getString("A4549NCONT");
                objRtn.A4549PATHF = rs01.getString("A4549PATHF");
                
                objRtn.A4549USRIN = rs01.getString("A4549USRIN");
                objRtn.A4549FECIN = rs01.getString("A4549FECIN");
                objRtn.A4549HORIN = rs01.getString("A4549HORIN");
                objRtn.A4549USRAC = rs01.getString("A4549USRAC");
                objRtn.A4549FECAC = rs01.getString("A4549FECAC");
                objRtn.A4549HORAC = rs01.getString("A4549HORAC");                         
               
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
    
}
