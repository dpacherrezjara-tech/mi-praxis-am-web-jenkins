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
import net.miatech.beans.SaleAudit.A3648Filter;
import net.miatech.beans.SaleAudit.A3652Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A3648;
import net.miatech.praxis.SaleAudit.A3649;
import net.miatech.praxis.SaleAudit.A3652;
import net.miatech.praxis.SaleAudit.A3653;
import net.miatech.praxis.SaleAudit.A3654;
import net.miatech.praxis.SaleAudit.A3655;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDQueryDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDQueryDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDQueryDAO(IServerSession ss) {
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
        String SQLCLL01 = "{CALL LIBSAP26.SQP03097(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                objRtn.A3647EMAIC = rs01.getString("A3647EMAIC");
                objRtn.A3647ANIO = rs01.getString("A3647ANIO");
                objRtn.A3647DIAS = rs01.getString("DIAS");
                objRtn.A3647TKTDUPLI = rs01.getString("A3647TKTDUPLI");
                objRtn.A3647SEMAF = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A3647TRFD = rs01.getString("A3647TRFD");
                objRtn.A3647CANTIDAD = rs01.getString("A3647CANTIDAD");
                objRtn.A3647SFW = rs01.getString("A3647SFW");

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

    public A3647Filter SearchQueryRFNDetail(A3647Filter filter) throws SQLException, Exception {
        A3647Filter lstGeneral = null;
        List<A3648> lst_DOCUMENTS = new ArrayList<A3648>(0);
        List<A3649> lst_RAZON = new ArrayList<A3649>(0);

        A3647Filter objRtnGeneral = null;
        A3648 objlst_DOCUMENTS = null;
        A3649 objlst_RAZON = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        String SQLCLL01 = "{CALL LIBSAP26.SQP03098(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_PREME);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_ANIO);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LIST DOCUMENTS
            while (rs01.next()) {
                objlst_DOCUMENTS = new A3648();
                objlst_DOCUMENTS.A3648CCUST = rs01.getString("A3648CCUST");
                objlst_DOCUMENTS.A3648CIA = rs01.getString("A3648CIA");
                objlst_DOCUMENTS.A3648FORMA = rs01.getString("A3648FORMA");
                objlst_DOCUMENTS.A3648SERIE = rs01.getString("A3648SERIE");
                objlst_DOCUMENTS.A3648SEQ = rs01.getString("A3648SEQ");
                objlst_DOCUMENTS.A3648CORRL = rs01.getString("A3648CORRL");
                objlst_DOCUMENTS.A3648TKT = rs01.getString("A3648CIA") + "" + rs01.getString("A3648FORMA") + "" + rs01.getString("A3648SERIE");
                objlst_DOCUMENTS.A3648PREME = rs01.getString("A3648PREME");
                objlst_DOCUMENTS.A3648TIDOC = rs01.getString("A3648TIDOC");
                objlst_DOCUMENTS.A3648CIAI = rs01.getString("A3648CIAI");
                objlst_DOCUMENTS.A3648FORMI = rs01.getString("A3648FORMI");
                objlst_DOCUMENTS.A3648SEREI = rs01.getString("A3648SEREI");
                objlst_DOCUMENTS.A3648FLAG = rs01.getString("A3648FLAG");
                objlst_DOCUMENTS.A3648FEE = rs01.getString("A3648FEE");
                objlst_DOCUMENTS.A3648PAIVTA = rs01.getString("A3648AIVTA");

                objlst_DOCUMENTS.A3648FVNTA = rs01.getString("A3648FSALE");
                objlst_DOCUMENTS.A3648PNR = rs01.getString("A3648PNR");
                objlst_DOCUMENTS.A3648CUPON = rs01.getString("A3648CUPON");
                objlst_DOCUMENTS.A3648ELECT = rs01.getString("A3648ELECT");
                objlst_DOCUMENTS.A3648ORIGE = rs01.getString("A3648ORIGE");
                objlst_DOCUMENTS.A3648DESTI = rs01.getString("A3648DESTI");
                objlst_DOCUMENTS.A3648IDFIS = rs01.getString("A3648IDFIS");
                objlst_DOCUMENTS.A3648PAX = rs01.getString("A3648PAX");
                objlst_DOCUMENTS.A3648TPAX = rs01.getString("A3648TPAX");
                objlst_DOCUMENTS.A3648IATA = rs01.getString("A3648IATA");
                objlst_DOCUMENTS.A3648TRNCU = rs01.getString("A3648TRNCU");
                objlst_DOCUMENTS.A3648MDA = rs01.getString("A3648MDA");

                objlst_DOCUMENTS.A3648STATU = rs01.getString("A3648STATU");
                objlst_DOCUMENTS.A3648ENDOR = rs01.getString("A3648ENDOR");
                objlst_DOCUMENTS.A3648FAREC = rs01.getString("A3648FAREC");
                objlst_DOCUMENTS.A3648FRERQ = rs01.getString("A3648FRERQ");
                objlst_DOCUMENTS.A3648REGRQ = rs01.getString("A3648REGRQ");

                objlst_DOCUMENTS.A3648CPN1 = rs01.getString("A3648CPN1");
                objlst_DOCUMENTS.A3648CPN2 = rs01.getString("A3648CPN2");
                objlst_DOCUMENTS.A3648CPN3 = rs01.getString("A3648CPN3");
                objlst_DOCUMENTS.A3648CPN4 = rs01.getString("A3648CPN4");
                objlst_DOCUMENTS.A3648TRFND = rs01.getString("A3648TRFND");

                objlst_DOCUMENTS.A3648REGIS = rs01.getString("A3648REGIS");
                objlst_DOCUMENTS.A3648FREGI = rs01.getString("A3648FREGI");
                objlst_DOCUMENTS.A3648HREGI = rs01.getString("A3648HREGI");
                objlst_DOCUMENTS.A3648REVIS = rs01.getString("A3648REVIS");
                objlst_DOCUMENTS.A3648FREVI = rs01.getString("A3648FREVI");
                objlst_DOCUMENTS.A3648HREVI = rs01.getString("A3648HREVI");
                objlst_DOCUMENTS.A3648RFNDB = rs01.getString("A3648RFNDB");
                objlst_DOCUMENTS.A3648ANIO = rs01.getString("A3648ANIO");
                objlst_DOCUMENTS.A3648MARCA = rs01.getString("A3648MARCA");
                objlst_DOCUMENTS.A3648STFIN = rs01.getString("A3648STFIN");
                objlst_DOCUMENTS.A3648STATO = rs01.getString("A3648STATO");
                //AGENCIA
                objlst_DOCUMENTS.A3648TARIF = rs01.getDouble("A3648TARIF");
                objlst_DOCUMENTS.A3648TARIQ = rs01.getDouble("A3648TARIQ");
                objlst_DOCUMENTS.A3648COMIS = rs01.getDouble("A3648COMIS");
                objlst_DOCUMENTS.A3648SCOM = rs01.getDouble("A3648SCOM");
                objlst_DOCUMENTS.A3648TTAX = rs01.getDouble("A3648TTAX");
                objlst_DOCUMENTS.A3648ROE = rs01.getDouble("A3648ROE");
                objlst_DOCUMENTS.A3648TOTAL = rs01.getDouble("A3648TOTAL");
                ///AM

                objlst_DOCUMENTS.A3648TARID = rs01.getDouble("A3648TARID");
                objlst_DOCUMENTS.A3648TTAXD = rs01.getDouble("A3648TTAXD");
                objlst_DOCUMENTS.A3648COMID = rs01.getDouble("A3648COMID");
                objlst_DOCUMENTS.A3648SCOMD = rs01.getDouble("A3648SCOMD");
                objlst_DOCUMENTS.A3648TOTAD = rs01.getDouble("A3648TOTAD");
                lst_DOCUMENTS.add(objlst_DOCUMENTS);
            }
            ////LIST DE RAZONES 
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_RAZON = new A3649();
                    objlst_RAZON.A3649CCUST = rs02.getString("A3649CCUST");
                    objlst_RAZON.A3649PREME = rs02.getString("A3649PREME");
                    objlst_RAZON.A3649CORRL = rs02.getString("A3649CORRL");
                    objlst_RAZON.A3649FLAG = rs02.getString("A3649FLAG");
                    objlst_RAZON.A3649TYPE = rs02.getString("A3649TYPE");
                    objlst_RAZON.A3649BASE = rs02.getString("A3649BASE");
                    objlst_RAZON.A3649CODE = rs02.getString("A3649CODE");
                    objlst_RAZON.A3649ERROR = rs02.getString("A3649ERROR");
                    objlst_RAZON.A3649ARCHI = rs02.getString("A3649ARCHI");
                    objlst_RAZON.A3649REGRQ = rs02.getString("A3649REGRQ");
                    objlst_RAZON.A3649FRERQ = rs02.getString("A3649FRERQ");
                    objlst_RAZON.A3649REGIS = rs02.getString("A3649REGIS");
                    objlst_RAZON.A3649FREGI = rs02.getString("A3649FREGI");
                    objlst_RAZON.A3649HREGI = rs02.getString("A3649HREGI");
                    lst_RAZON.add(objlst_RAZON);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new A3647Filter();
            objRtnGeneral.lst_DOCUMENTS = lst_DOCUMENTS;
            objRtnGeneral.lst_RAZON = lst_RAZON;

            lstGeneral = objRtnGeneral;
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
        return lstGeneral;

    }

    public String ProcesaMantenimiento(A3647Filter beanGuardarA3389) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03102(?,?,?,?,?,?,?)}";//SQP02515
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PREME", beanGuardarA3389.IN_PREME);
            cs.setString("IN_ANIO", beanGuardarA3389.IN_ANIO);//FALTA
            cs.setString("IN_STATUS", beanGuardarA3389.IN_STATUS);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

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

    public String ProcesaManualRFNDTCKT(A3648Filter filter, String lstaTaxes, String lstaRazones,String lstafop) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03104(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP02515
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_TKT", filter.IN_TKT);
            cs.setString("IN_SEQ", filter.IN_SEQ);
            cs.setString("IN_CORRL", filter.IN_CORRL);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_ANIO", filter.IN_ANIO);
            cs.setString("IN_MDA", filter.IN_MDA);

            cs.setString("IN_CPN1", filter.IN_CPN1);
            cs.setString("IN_CPN2", filter.IN_CPN2);
            cs.setString("IN_CPN3", filter.IN_CPN3);
            cs.setString("IN_CPN4", filter.IN_CPN4);

            cs.setString("IN_COUNTRY", filter.IN_COUNTRY);
            cs.setString("IN_STATUS", filter.IN_STATUS);
            cs.setDouble("IN_TARIF", filter.IN_TARIF);
            cs.setDouble("IN_TTAX", filter.IN_TTAX);
            cs.setDouble("IN_TOTALRFND", filter.IN_TOTALRFND);
            cs.setString("IN_LSTATaxes", lstaTaxes);
            cs.setString("IN_LSTARazones", lstaRazones);
            cs.setString("IN_LSTAfop", lstafop);
            cs.setString("IN_MARCA", filter.IN_MARCA);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

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

    public A3647Filter SearchQueryRFNDetailTCKT(A3647Filter filter) throws SQLException, Exception {
        A3647Filter lstGeneral = null;
        List<A3648> lst_DOCUMENTS = new ArrayList<A3648>(0);
        List<A3649> lst_RAZON = new ArrayList<A3649>(0);

        List<A3652> TEM_TAXESAGEN = new ArrayList<A3652>(0);
        List<A3652> TEM_TAXESAM = new ArrayList<A3652>(0);
        List<A3653> TEM_CARD = new ArrayList<A3653>(0);
        List<A3654> TEM_COUPNS = new ArrayList<A3654>(0);
        List<A3655> TEM_HISTORY = new ArrayList<A3655>(0);

        A3647Filter objRtnGeneral = null;
        A3648 objlst_DOCUMENTS = null;
        A3649 objlst_RAZON = null;

        A3652 objlst_TAXESAGEN = null;
        A3652 objlst_TAXESAM = null;
        A3653 objlst_CARD = null;
        A3654 objlst_COUPNS = null;
        A3655 objlst_HISTORY = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        ResultSet rs05 = null;
        ResultSet rs06 = null;
        ResultSet rs07 = null;

        String SQLCLL01 = "{CALL LIBSAP26.SQP03105(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_TICKET);
            cstmt01.setString(4, filter.IN_ANIO);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ////LIST TAXES AGENCIA 
            while (rs01.next()) {
                objlst_TAXESAGEN = new A3652();
                objlst_TAXESAGEN.A3652CCUST = rs01.getString("A3652CCUST");
                objlst_TAXESAGEN.A3652CIA = rs01.getString("A3652CIA");
                objlst_TAXESAGEN.A3652FORMA = rs01.getString("A3652FORMA");
                objlst_TAXESAGEN.A3652SERIE = rs01.getString("A3652SERIE");
                objlst_TAXESAGEN.A3652SEQ = rs01.getString("A3652SEQ");
                objlst_TAXESAGEN.A3652FOLIO = rs01.getString("A3652FOLIO");
                objlst_TAXESAGEN.A3652CORRL = rs01.getString("A3652CORRL");
                objlst_TAXESAGEN.A3652CDTAX = rs01.getString("A3652CDTAX");
                objlst_TAXESAGEN.A3652MONED = rs01.getString("A3652MONED");
                objlst_TAXESAGEN.A3652STAT = rs01.getString("A3652STAT");
                objlst_TAXESAGEN.A3652ERROR = rs01.getString("A3652ERROR");
                objlst_TAXESAGEN.A3652PREME = rs01.getString("A3652PREME");
                objlst_TAXESAGEN.A3652TYPE = rs01.getString("A3652TYPE");
                objlst_TAXESAGEN.A3652REGIS = rs01.getString("A3652REGIS");
                objlst_TAXESAGEN.A3652FREGI = rs01.getString("A3652FREGI");
                objlst_TAXESAGEN.A3652HREGI = rs01.getString("A3652HREGI");
                objlst_TAXESAGEN.A3652ANIO = rs01.getString("A3652ANIO");
                objlst_TAXESAGEN.A3652TXMIA = rs01.getDouble("A3652TXMIA");
                objlst_TAXESAGEN.A3652TXDIF = rs01.getDouble("A3652TXDIF");
                objlst_TAXESAGEN.A3652APFC = rs01.getString("A3652APFC");
                

                TEM_TAXESAGEN.add(objlst_TAXESAGEN);
            }
            ////LIST TAXES AM
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_TAXESAM = new A3652();
                    objlst_TAXESAM.A3652CCUST = rs02.getString("A3652CCUST");
                    objlst_TAXESAM.A3652CIA = rs02.getString("A3652CIA");
                    objlst_TAXESAM.A3652FORMA = rs02.getString("A3652FORMA");
                    objlst_TAXESAM.A3652SERIE = rs02.getString("A3652SERIE");
                    objlst_TAXESAM.A3652SEQ = rs02.getString("A3652SEQ");
                    objlst_TAXESAM.A3652FOLIO = rs02.getString("A3652FOLIO");
                    objlst_TAXESAM.A3652CORRL = rs02.getString("A3652CORRL");
                    objlst_TAXESAM.A3652CDTAX = rs02.getString("A3652CDTAX");
                    objlst_TAXESAM.A3652MONED = rs02.getString("A3652MONED");
                    objlst_TAXESAM.A3652STAT = rs02.getString("A3652STAT");
                    objlst_TAXESAM.A3652ERROR = rs02.getString("A3652ERROR");
                    objlst_TAXESAM.A3652PREME = rs02.getString("A3652PREME");
                    objlst_TAXESAM.A3652TYPE = rs02.getString("A3652TYPE");
                    objlst_TAXESAM.A3652REGIS = rs02.getString("A3652REGIS");
                    objlst_TAXESAM.A3652FREGI = rs02.getString("A3652FREGI");
                    objlst_TAXESAM.A3652HREGI = rs02.getString("A3652HREGI");
                    objlst_TAXESAM.A3652PAIS = rs02.getString("A3652PAIS");
                    objlst_TAXESAM.A3652TPTAX = rs02.getString("A3652TPTAX");
                    objlst_TAXESAM.A3652CTRL = rs02.getString("A3652CTRL");
                    objlst_TAXESAM.A3652ANIO = rs02.getString("A3652ANIO");        
                    objlst_TAXESAM.A3652TXMIA = rs02.getDouble("A3652TXMIA");
                    objlst_TAXESAM.A3652TXDIF = rs02.getDouble("A3652TXDIF");
                    objlst_TAXESAM.A3652APFC = rs02.getString("A3652APFC");
                    TEM_TAXESAM.add(objlst_TAXESAM);
                }
            }
            ////LIST Card Type
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_CARD = new A3653();
                    objlst_CARD.A3653CCUST = rs03.getString("A3653CCUST");
                    objlst_CARD.A3653CIA = rs03.getString("A3653CIA");
                    objlst_CARD.A3653FORMA = rs03.getString("A3653FORMA");
                    objlst_CARD.A3653SERIE = rs03.getString("A3653SERIE");
                    objlst_CARD.A3653SEQ = rs03.getString("A3653SEQ");
                    objlst_CARD.A3653CFOP = rs03.getString("A3653CFOP");
                    objlst_CARD.A3653TYCAR = rs03.getString("A3653TYCAR");
                    objlst_CARD.A3653CUR = rs03.getString("A3653CUR");
                    objlst_CARD.A3653NTARJ = rs03.getString("A3653NTARJ");
                    objlst_CARD.A3653PREME = rs03.getString("A3653PREME");
                    objlst_CARD.A3653CORRL = rs03.getString("A3653CORRL");
                    objlst_CARD.A3653TYPE = rs03.getString("A3653TYPE");
                    objlst_CARD.A3653REGIS = rs03.getString("A3653REGIS");
                    objlst_CARD.A3653FREGI = rs03.getString("A3653FREGI");
                    objlst_CARD.A3653HREGI = rs03.getString("A3653HREGI");
                    objlst_CARD.A3653MONTO = rs03.getDouble("A3653MONTO");
                    objlst_CARD.A3653MONTE = rs03.getDouble("A3653MONTE");
                    objlst_CARD.A3653TOTAL = rs03.getDouble("A3653TOTAL");
                    
                    objlst_CARD.A3653FEXP = rs03.getString("A3653FEXP");
                    objlst_CARD.A3653CAPL = rs03.getString("A3653CAPL");
                    objlst_CARD.A3653FLAG = rs03.getString("A3653FLAG");
                    objlst_CARD.A3653ANIO = rs03.getString("A3653ANIO");

                    TEM_CARD.add(objlst_CARD);
                }
            }
            ////LISTA DE CUPONES IN_XMLLISCOUPNS 
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_COUPNS = new A3654();
                    objlst_COUPNS.A3654CCUST = rs04.getString("A3654CCUST");
                    objlst_COUPNS.A3648CIA = rs04.getString("A3648CIA");
                    objlst_COUPNS.A3648FORMA = rs04.getString("A3648FORMA");
                    objlst_COUPNS.A3648SERIE = rs04.getString("A3648SERIE");
                    objlst_COUPNS.A3648SEQ = rs04.getString("A3648SEQ");
                    objlst_COUPNS.A3654CPN = rs04.getString("A3654CPN");
                    objlst_COUPNS.A3654MARKE = rs04.getString("A3654MARKE");
                    objlst_COUPNS.A3654NFLGH = rs04.getString("A3654NFLGH");
                    objlst_COUPNS.A3654CLAS = rs04.getString("A3654CLAS");
                    objlst_COUPNS.A3654FBASI = rs04.getString("A3654FBASI");
                    objlst_COUPNS.A3654ORIGE = rs04.getString("A3654ORIGE");
                    objlst_COUPNS.A3654FORIG = rs04.getString("A3654FORIG");
                    objlst_COUPNS.A3654HORIG = rs04.getString("A3654HORIG");
                    objlst_COUPNS.A3654DESTI = rs04.getString("A3654DESTI");
                    objlst_COUPNS.A3654FDEST = rs04.getString("A3654FDEST");
                    objlst_COUPNS.A3654HDEST = rs04.getString("A3654HDEST");
                    objlst_COUPNS.A3654BOOKI = rs04.getString("A3654BOOKI");
                    objlst_COUPNS.A3654CURS1 = rs04.getString("A3654CURS1");
                    objlst_COUPNS.A3654CURS2 = rs04.getString("A3654CURS2");
                    objlst_COUPNS.A3654CURS3 = rs04.getString("A3654CURS3");
                    objlst_COUPNS.A3654CURS4 = rs04.getString("A3654CURS4");
                    objlst_COUPNS.A3654PROVI = rs04.getString("A3654PROVI");
                    objlst_COUPNS.A3654BAGAL = rs04.getString("A3654BAGAL");
                    objlst_COUPNS.A3654STOP = rs04.getString("A3654STOP");
                    objlst_COUPNS.A3654USE1 = rs04.getString("A3654USE1");
                    objlst_COUPNS.A3654USE2 = rs04.getString("A3654USE2");
                    objlst_COUPNS.A3654USE3 = rs04.getString("A3654USE3");
                    objlst_COUPNS.A3654FAREC = rs04.getString("A3654FAREC");
                    objlst_COUPNS.A3654DESIG = rs04.getString("A3654DESIG");
                    objlst_COUPNS.A3654PREME = rs04.getString("A3654PREME");
                    objlst_COUPNS.A3654CORRL = rs04.getString("A3654CORRL");
                    objlst_COUPNS.A3654REGIS = rs04.getString("A3654REGIS");
                    objlst_COUPNS.A3654FREGI = rs04.getString("A3654FREGI");
                    objlst_COUPNS.A3654MONTO = rs04.getDouble("A3654MONTO");

                    TEM_COUPNS.add(objlst_COUPNS);
                }
            }
            ////LISTA DE HISTORIAL IN_XMLHISTORY
            if (cstmt01.getMoreResults()) {
                rs05 = cstmt01.getResultSet();
                while (rs05.next()) {
                    objlst_HISTORY = new A3655();
                    objlst_HISTORY.A3655CCUST = rs05.getString("A3655CCUST");

                    objlst_HISTORY.A3655CIA = rs05.getString("A3655CIA");
                    objlst_HISTORY.A3655FORMA = rs05.getString("A3655FORMA");
                    objlst_HISTORY.A3655SERIE = rs05.getString("A3655SERIE");
                    objlst_HISTORY.A3655SEQ = rs05.getString("A3655SEQ");
                    objlst_HISTORY.A3655CPN = rs05.getString("A3655CPN");
                    objlst_HISTORY.A3655PROVI = rs05.getString("A3655PROVI");
                    objlst_HISTORY.A3655WORKL = rs05.getString("A3655WORKL");
                    objlst_HISTORY.A3655HOMEL = rs05.getString("A3655HOMEL");
                    objlst_HISTORY.A3655DATE = rs05.getString("A3655DATE");
                    objlst_HISTORY.A3655HDAT1 = rs05.getString("A3655HDAT1");
                    objlst_HISTORY.A3655INPUT = rs05.getString("A3655INPUT");
                    objlst_HISTORY.A3655SUPPO = rs05.getString("A3655SUPPO");
                    objlst_HISTORY.A3655OLDRE = rs05.getString("A3655OLDRE");
                    objlst_HISTORY.A3655PURGE = rs05.getString("A3655PURGE");
                    objlst_HISTORY.A3655STATU = rs05.getString("A3655STATU");
                    objlst_HISTORY.A3655CHIST = rs05.getString("A3655CHIST");
                    objlst_HISTORY.A3655PREME = rs05.getString("A3655PREME");
                    objlst_HISTORY.A3655CORRL = rs05.getString("A3655CORRL");
                    objlst_HISTORY.A3655TYPE = rs05.getString("A3655TYPE");
                    objlst_HISTORY.A3655REGIS = rs05.getString("A3655REGIS");
                    objlst_HISTORY.A3655FREGI = rs05.getString("A3655FREGI");
                    objlst_HISTORY.A3655HREGI = rs05.getString("A3655HREGI");
                    TEM_HISTORY.add(objlst_HISTORY);
                }
            }
            ////LISTA DE RAZONES TICKTES
            if (cstmt01.getMoreResults()) {
                rs06 = cstmt01.getResultSet();
                while (rs06.next()) {
                    objlst_RAZON = new A3649();
                    objlst_RAZON.A3649CCUST = rs06.getString("A3656CCUST");
                    objlst_RAZON.A3649PREME = rs06.getString("A3656PREME");
                    objlst_RAZON.A3649ANIO = rs06.getString("A3656ANIO");
                    objlst_RAZON.A3649CORRL = rs06.getString("A3656CORRL");
                    objlst_RAZON.A3649TYPE = rs06.getString("A3656TYPE");
                    objlst_RAZON.A3649BASE = rs06.getString("A3656BASE");
                    objlst_RAZON.A3649CODE = rs06.getString("A3656CODE");
                    objlst_RAZON.A3649ERROR = rs06.getString("A3656ERROR");
                    objlst_RAZON.A3649REGIS = rs06.getString("A3656REGIS");
                    objlst_RAZON.A3649FREGI = rs06.getString("A3656FREGI");
                    objlst_RAZON.A3649HREGI = rs06.getString("A3656HREGI");
                    lst_RAZON.add(objlst_RAZON);
                }
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A3647Filter();
            objRtnGeneral.lst_RAZON = lst_RAZON;
            objRtnGeneral.lst_TAXESAGEN = TEM_TAXESAGEN;
            objRtnGeneral.lst_TAXESAM = TEM_TAXESAM;
            objRtnGeneral.lst_Card = TEM_CARD;
            objRtnGeneral.LIS_COUPNS = TEM_COUPNS;
            objRtnGeneral.LIS_HISTORY = TEM_HISTORY;

            lstGeneral = objRtnGeneral;
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
        return lstGeneral;

    }
    
    public String ProcesaDeleteTAXManual(A3652Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03458(?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_OPTION", filter.IN_OPTION);
            cs.setString("IN_A3652CIA", filter.A3652CIA);
            cs.setString("IN_A3652FORMA", filter.A3652FORMA);
            cs.setString("IN_A3652SERIE", filter.A3652SERIE);
            cs.setString("IN_A3652SEQ", filter.A3652SEQ);
            cs.setString("IN_A3652CORRL", filter.A3652CORRL);
            cs.setString("IN_A3652PREME", filter.A3652PREME);
            cs.setString("IN_A3652ANIO", filter.A3652ANIO);            
            
            cs.execute();

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

}
