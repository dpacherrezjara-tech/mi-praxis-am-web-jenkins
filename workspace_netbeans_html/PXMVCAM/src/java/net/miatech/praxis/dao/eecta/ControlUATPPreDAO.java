/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import com.google.gson.JsonArray;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP03347Filter;
import net.miatech.praxis.eecta.SQP03348Filter;
import net.miatech.praxis.eecta.SQP04229Filter;
import net.miatech.praxis.eecta.SQP04530Filter;
import net.miatech.praxis.eecta.SQP05188Filter;
import net.miatech.praxis.eecta.SQP05189Filter;
import net.miatech.praxis.eecta.SQP05190Filter;
import net.miatech.praxis.eecta.SQP05191Filter;
import net.miatech.praxis.eecta.SQP05192Filter;
import net.miatech.praxis.eecta.SQP05524Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ControlUATPPreDAO {

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

    public List<SQP05188Filter> getSQP05188Filter(SQP05188Filter filter) throws SQLException, Exception {
        List<SQP05188Filter> lstRtn = new ArrayList<SQP05188Filter>(0);
        SQP05188Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05188(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_FDATE2);
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
            while (rs01.next()) {
                objRtn = new SQP05188Filter();
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530FCONT = rs01.getString("A1530FCONT");
                objRtn.A1530STS9 = rs01.getString("A1530STS9");
                objRtn.STS9 = rs01.getString("STS9");
                objRtn.RPTE = rs01.getString("RPTE");
                objRtn.APL = rs01.getString("APL");
                objRtn.FAC = rs01.getString("FAC");

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

    public List<SQP05189Filter> getSQP05189Filter(SQP05189Filter filter) throws SQLException, Exception {
        List<SQP05189Filter> lstRtn = new ArrayList<SQP05189Filter>(0);
        SQP05189Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05189(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_TICKET);
            cstmt01.setString(5, filter.VP_ESTADO);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05189Filter();
                objRtn.A4240CCUST = rs01.getString("A4240CCUST");
                objRtn.A4240CIA = rs01.getString("A4240CIA");
                objRtn.A4240FORMA = rs01.getString("A4240FORMA");
                objRtn.A4240SERIE = rs01.getString("A4240SERIE");
                objRtn.A4240SEQ = rs01.getString("A4240SEQ");
                objRtn.A4240GRUPO = rs01.getString("A4240GRUPO");
                objRtn.A4240FPROC = rs01.getString("A4240FPROC");
                objRtn.A4240FUENT = rs01.getString("A4240FUENT");
                objRtn.A4240TDOC = rs01.getString("A4240TDOC");
                objRtn.A4240TRNCU = rs01.getString("A4240TRNCU");
                objRtn.A4240PNR = rs01.getString("A4240PNR");
                objRtn.A4240IATA = rs01.getString("A4240IATA");
                objRtn.A4240FEVTA = rs01.getString("A4240FEVTA");
                objRtn.A4240PAX = rs01.getString("A4240PAX");

                objRtn.A4240FCONT = rs01.getString("A4240FCONT");
                objRtn.A4240ESTA = rs01.getString("A4240ESTA");
                objRtn.A4240CODE = rs01.getString("A4240CODE");
                objRtn.A1272DES = rs01.getString("A1272DES");
                objRtn.A4240MDLOC = rs01.getString("A4240MDLOC");
                objRtn.A4240TCMXN = rs01.getDouble("A4240TCMXN");
                objRtn.A4240FARE = rs01.getDouble("A4240FARE");
                objRtn.A4240IVA = rs01.getDouble("A4240IVA");
                objRtn.A4240TUA = rs01.getDouble("A4240TUA");
                objRtn.A4240YR = rs01.getDouble("A4240YR");
                objRtn.A4240YQ = rs01.getDouble("A4240YQ");
                objRtn.A4240OTR = rs01.getDouble("A4240OTR");
                objRtn.A4240TOTAL = rs01.getDouble("A4240TOTAL");

                objRtn.A4240CFOP = rs01.getString("A4240CFOP");
                objRtn.A4240TTARJ = rs01.getString("A4240TTARJ");
                objRtn.A4240NTARJ = rs01.getString("A4240NTARJ");
                objRtn.A4240VFOP = rs01.getDouble("A4240VFOP");

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

    public SQP04530Filter setSQP04530Filter(SQP04530Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04530(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_PROCESO);
            cstmt.setString(3, filter.VP_FDATE1);
            cstmt.setString(4, filter.VP_TIPO);
            cstmt.setString(5, filter.VP_CDCLI);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(6);
            filter.dbException.MESSAGE = cstmt.getString(7);

        } finally {
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
        return filter;
    }

    public List<SQP03347Filter> getSQP03347Filter(SQP03347Filter filter) throws SQLException, Exception {
        List<SQP03347Filter> lstRtn = new ArrayList<SQP03347Filter>(0);
        SQP03347Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03347(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDESDE);
            cstmt01.setString(3, filter.VP_FHASTA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03347Filter();
//                objRtn.A4250CCUST = rs01.getString("A4250CCUST");
//                objRtn.A4250CIA = rs01.getString("A4250CIA");                
//                objRtn.A4250FORMA = rs01.getString("A4250FORMA");
//                objRtn.A4250SERIE = rs01.getString("A4250SERIE");                    
//                objRtn.A4250SEQ = rs01.getString("A4250SEQ");                    
//                objRtn.A4250TRNCU = rs01.getString("A4250TRNCU");                    
//                objRtn.A4250GRUPO = rs01.getString("A4250GRUPO");                                                    
//                objRtn.A4250FCONT = rs01.getString("A4250FCONT");                
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

    public SQP03348Filter setSQP03348Filter(SQP03348Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03348(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(3, Types.VARCHAR);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.vp_json);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(3);
            filter.dbException.MESSAGE = cstmt.getString(4);

        } finally {
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
        return filter;
    }

    public List<SQP05191Filter> getSQP05191Filter(SQP05191Filter filter) throws SQLException, Exception {
        List<SQP05191Filter> lstRtn = new ArrayList<SQP05191Filter>(0);
        SQP05191Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05191(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FECHA1);
            cstmt01.setString(4, filter.VP_FECHA2);
            cstmt01.setString(5, filter.VP_STAT);
            cstmt01.setString(6, filter.VP_TICKET);
            cstmt01.setString(7, filter.VP_CDCLI);
            cstmt01.setString(8, filter.VP_NLOTE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05191Filter();
                objRtn.A4250CCUST = rs01.getString("A4250CCUST");
                objRtn.A4250CIA = rs01.getString("A4250CIA");
                objRtn.A4250FORMA = rs01.getString("A4250FORMA");
                objRtn.A4250SERIE = rs01.getString("A4250SERIE");
                objRtn.A4250SEQ = rs01.getString("A4250SEQ");
                objRtn.A4250TRNCU = rs01.getString("A4250TRNCU");
                objRtn.A4250GRUPO = rs01.getString("A4250GRUPO");
                objRtn.A4250FCONT = rs01.getString("A4250FCONT");
                objRtn.A4250TIPO = rs01.getString("A4250TIPO");
                objRtn.A4250CFDI = rs01.getString("A4250CFDI");
                objRtn.A4250RFC = rs01.getString("A4250RFC");
                objRtn.A4250RFCN = rs01.getString("A4250RFCN");
                objRtn.A4250FECTB = rs01.getString("A4250FECTB");
                objRtn.A4250FOP = rs01.getString("A4250FOP");
                objRtn.A4250MPG = rs01.getString("A4250MPG");
                objRtn.A4250STAT = rs01.getString("A4250STAT");
                objRtn.A4250REGIS = rs01.getString("A4250REGIS");
                objRtn.A4250FREGI = rs01.getString("A4250FREGI");
                objRtn.A4250REVIS = rs01.getString("A4250REVIS");
                objRtn.A4250FREVI = rs01.getString("A4250FREVI");
                objRtn.A4250HREVI = rs01.getString("A4250HREVI");
                //NEWS

                objRtn.A4250IDANT = rs01.getString("A4250IDANT");
                objRtn.A4250CFDIP = rs01.getString("A4250CFDIP");

                objRtn.A4250CDCLI = rs01.getString("A4250CDCLI");
                objRtn.A4250NLOTE = rs01.getString("A4250NLOTE");
                objRtn.A4250PNR = rs01.getString("A4250PNR");
                objRtn.A4250STDE = rs01.getString("A4250STDE");
                objRtn.A4250RMSG = rs01.getString("A4250RMSG");
                objRtn.A4250PXML = rs01.getString("A4250PXML");
                objRtn.A4250PPDF = rs01.getString("A4250PPDF");
                objRtn.A4250IENV = rs01.getString("A4250IENV");

                objRtn.RSOCI = rs01.getString("A3953RSOCI");
                objRtn.REFER = rs01.getString("A3953REFER");

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

    public List<SQP05192Filter> getSQP05192Filter(SQP05192Filter filter) throws SQLException, Exception {
        List<SQP05192Filter> lstRtn = new ArrayList<SQP05192Filter>(0);
        SQP05192Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05192(?,?,?,?,?,?,?,?,?,?)}";
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
            cstmt01.setString(5, filter.VP_STAT);
            cstmt01.setString(6, filter.VP_TICKET);
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
                objRtn = new SQP05192Filter();
                objRtn.A4243CCUST = rs01.getString("A4243CCUST");
                objRtn.A4243CIA = rs01.getString("A4243CIA");
                objRtn.A4243FORMA = rs01.getString("A4243FORMA");
                objRtn.A4243SERIE = rs01.getString("A4243SERIE");
                objRtn.A4243SEQ = rs01.getString("A4243SEQ");
                objRtn.A4243GRUPO = rs01.getString("A4243GRUPO");
                objRtn.A4243TRNCU = rs01.getString("A4243TRNCU");
                objRtn.A4243CORRL = rs01.getInt("A4243CORRL");
                objRtn.A4243FCONT = rs01.getString("A4243FCONT");
                objRtn.A4243ARCH = rs01.getString("A4243ARCH");
                objRtn.A4243CAMPO = rs01.getString("A4243CAMPO");
                objRtn.A4243CODER = rs01.getString("A4243CODER");
                objRtn.A4243DATA = rs01.getString("A4243DATA").trim();
                objRtn.A4243STSER = rs01.getString("A4243STSER");
                objRtn.A4243TIPCO = rs01.getString("A4243TIPCO");
                objRtn.A4243RUT = rs01.getString("A4243RUT");
                objRtn.A4243KEY = rs01.getString("A4243KEY");
                objRtn.A4243USRFZ = rs01.getString("A4243USRFZ");
                objRtn.A4243FECFZ = rs01.getString("A4243FECFZ");
                objRtn.A4243HORFZ = rs01.getString("A4243HORFZ");
                objRtn.A4243USRIN = rs01.getString("A4243USRIN");
                objRtn.A4243HORIN = rs01.getString("A4243HORIN");
                objRtn.A4243USRAC = rs01.getString("A4243USRAC");
                objRtn.A4243FECAC = rs01.getString("A4243FECAC");
                objRtn.A4243HORAC = rs01.getString("A4243HORAC");
                objRtn.A1272DES = rs01.getString("A1272DES").trim();
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

    public SQP04229Filter setSQP04229Filter(SQP04229Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04229(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.vp_fdesde);
            cstmt.setString(3, filter.vp_fhasta);
            cstmt.setString(4, filter.vp_cdcli);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(5);
            filter.dbException.MESSAGE = cstmt.getString(6);

        } finally {
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
        return filter;
    }

    public List<SQP05190Filter> getSQP05190Filter(SQP05190Filter filter) throws SQLException, Exception {
        List<SQP05190Filter> lstRtn = new ArrayList<SQP05190Filter>(0);
        SQP05190Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05190(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDATE1);
            cstmt01.setString(3, filter.VP_FDATE2);
            cstmt01.setString(4, filter.VP_LOTE);
            cstmt01.setString(5, filter.VP_STAT);
            cstmt01.setString(6, filter.VP_TICKET);
            cstmt01.setString(7, filter.VP_CDCLI);
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
                objRtn = new SQP05190Filter();
                objRtn.A4516CCUST = rs01.getString("A4516CCUST");
                objRtn.A4516FPROC = rs01.getString("A4516FPROC");
                objRtn.A4516CDCLI = rs01.getString("A4516CDCLI");
                objRtn.A4516NLOTE = rs01.getString("A4516NLOTE");
                objRtn.A4516TLTTK = rs01.getInt("A4516TLTTK");
                objRtn.A4516TLPDF = rs01.getInt("A4516TLPDF");
                objRtn.A4516TLXML = rs01.getInt("A4516TLXML");
                objRtn.A4516TLERR = rs01.getInt("A4516TLERR");
                objRtn.A4516TLNFA = rs01.getInt("A4516TLNFA");
                objRtn.A4516TTLRC = rs01.getInt("A4516TTLRC");
                objRtn.A4516ESTAD = rs01.getString("A4516ESTAD");
                objRtn.A4516ESTAD_1 = rs01.getString("A4516ESTAD_1");
                objRtn.A4516IENV = rs01.getString("A4516IENV");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI").trim();
                objRtn.A4516USRIN = rs01.getString("A4516USRIN");
                objRtn.A4516FECIN = rs01.getString("A4516FECIN");
                objRtn.A4516HORIN = rs01.getString("A4516HORIN");
                objRtn.A4516USRAC = rs01.getString("A4516USRAC");
                objRtn.A4516FECAC = rs01.getString("A4516FECAC");
                objRtn.A4516HORAC = rs01.getString("A4516HORAC");

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

    public SQP05524Filter setSQP05524Filter(SQP05524Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP05524(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_EMAILS);
            cstmt.setString(3, filter.VP_DATA.toString());
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(4);
            filter.dbException.MESSAGE = cstmt.getString(5);

        } finally {
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
        return filter;
    }
}
