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
import net.miatech.beans.SaleAudit.A4360Filter;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.SaleAudit.A4363Filter;
import net.miatech.beans.SaleAudit.A4367Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A4362;
import net.miatech.praxis.SaleAudit.A4363;
import net.miatech.praxis.SaleAudit.A4364;
import net.miatech.praxis.SaleAudit.A4365;
import net.miatech.praxis.SaleAudit.A4366;
import net.miatech.praxis.SaleAudit.A4367;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDAssociatedARCRFNDFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDAssociatedARCRFNDFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDAssociatedARCRFNDFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4361Filter> SearchRfndCabece(A4361Filter filter) throws SQLException, Exception {
        List<A4361Filter> lstRtn = new ArrayList<A4361Filter>(0);
        A4361Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04733(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_TICKET);
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_FLAG);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_USER);
            cstmt01.setString(10, filter.IN_FOLIO);
            cstmt01.setString(11, "P");

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4361Filter();
                objRtn.A4361CCUST = rs01.getString("A4361CCUST");
                objRtn.A4361PREME = rs01.getString("A4361PREME");
                objRtn.A4361ANIO = rs01.getString("A4361ANIO");
                objRtn.A4361FOLIO = rs01.getString("A4361FOLIO");
                objRtn.A4361FREGI = rs01.getString("A4361FREGI");
                objRtn.A4361REGAS = rs01.getString("A4361REGAS");
                objRtn.A4361FAUTO = rs01.getString("A4361FAUTO");
                objRtn.A4361FAPPI = rs01.getString("A4361FAPPI");
                objRtn.A4361RN = rs01.getInt("RN");
                objRtn.CANTOK = rs01.getInt("CANTOK");
                objRtn.CANTKO = rs01.getInt("CANTKO");
                objRtn.CANTPRO = rs01.getInt("CANTPRO");
                objRtn.CANTPE = rs01.getInt("CANTPE");
                objRtn.TOTALCANT = rs01.getInt("CANTKO") + rs01.getInt("CANTOK") + rs01.getInt("CANTPE");
                objRtn.SUMAOK = rs01.getDouble("SUMAOK");
                objRtn.A4361DIAS = rs01.getString("DIAS");
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

    public List<A4363Filter> searchDetail(A4363Filter filter) throws SQLException, Exception {
        List<A4363Filter> lstRtn = new ArrayList<A4363Filter>(0);
        A4363Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04734(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_USER);
            cstmt01.setString(6, filter.IN_TKT);
            cstmt01.setString(7, filter.IN_IATA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4363Filter();
                objRtn.A4363RN = rs01.getInt("RN");
                objRtn.A4363TICKET = rs01.getString("A4363CIA") + "" + rs01.getString("A4363FORMA") + "" + rs01.getString("A4363SERIE");

                objRtn.A4363PREME = rs01.getString("A4363PREME");
                objRtn.A4363ANIO = rs01.getString("A4363ANIO");
                objRtn.A4363CIA = rs01.getString("A4363CIA");
                objRtn.A4363FORMA = rs01.getString("A4363FORMA");
                objRtn.A4363SERIE = rs01.getString("A4363SERIE");
                objRtn.A4363FOLIO = rs01.getString("A4361FOLIO");
                objRtn.A4363CUPON = rs01.getString("A4363XCPN");
                objRtn.A4363SEQ = rs01.getString("A4363SEQ");
                objRtn.A4363CORRL = rs01.getString("A4363CORRL");
                objRtn.A4363MARCA = rs01.getString("A4363MARCA");
                objRtn.A4363SMDA = rs01.getString("A4363SMDA");
                objRtn.A4363SMDAQ = rs01.getString("A4363SMDAQ");
                objRtn.A4363SPAX = rs01.getString("A4363SPAX");
                objRtn.A4363RAAG = rs01.getString("A4361RAAG");
                objRtn.A4363STPAX = rs01.getString("A4363STPAX");
                objRtn.A4363STRCU = rs01.getString("A4363STRCU");
                objRtn.A4363STDOC = rs01.getString("A4363STDOC");
                objRtn.A4363SPVTA = rs01.getString("A4363SPVTA");
                objRtn.A4363CIAI = rs01.getString("A4363CIAI");
                objRtn.A4363FORMI = rs01.getString("A4363FORMI");
                objRtn.A4363SEREI = rs01.getString("A4363SEREI");
                objRtn.A4363CARR1 = rs01.getString("A4363CARR1");
                objRtn.A4363CARR2 = rs01.getString("A4363CARR2");
                objRtn.A4363CARR3 = rs01.getString("A4363CARR3");
                objRtn.A4363CARR4 = rs01.getString("A4363CARR4");
                objRtn.A4363CARR5 = rs01.getString("A4363CARR5");
                objRtn.A4363CARR6 = rs01.getString("A4363CARR6");
                objRtn.A4363CARR7 = rs01.getString("A4363CARR7");
                objRtn.A4363CARR8 = rs01.getString("A4363CARR8");
                objRtn.A4363CONJT = rs01.getString("A4363CONJT");
                objRtn.A4363FEVTA = rs01.getString("A4363FEVTA");
                objRtn.A4363TKTOR = rs01.getString("A4363TKTOR");
                objRtn.A4363XFSAL = rs01.getString("A4363XFSAL");
                objRtn.A4363XPNR = rs01.getString("A4363XPNR");
                objRtn.A4363XCPN = rs01.getString("A4363XCPN");
                objRtn.A4363XELCT = rs01.getString("A4363XELCT");
                objRtn.A4363XORIG = rs01.getString("A4363XORIG");
                objRtn.A4363XDEST = rs01.getString("A4363XDEST");
                objRtn.A4363XIDFI = rs01.getString("A4363XIDFI");
                objRtn.A4363XPAX = rs01.getString("A4363XPAX");
                objRtn.A4363XTPAX = rs01.getString("A4363XTPAX");
                objRtn.A4363XIATA = rs01.getString("A4363XIATA");
                objRtn.A4363XTRCU = rs01.getString("A4363XTRCU");
                objRtn.A4363XMDA = rs01.getString("A4363XMDA");
                objRtn.A4363XMDAQ = rs01.getString("A4363XMDAQ");
                objRtn.A4363XSTAT = rs01.getString("A4363XSTAT");
                objRtn.A4363XENDR = rs01.getString("A4363XENDR");
                objRtn.A4363XFARC = rs01.getString("A4363XFARC");
                objRtn.A4363XRDBE = rs01.getString("A4363XRDBE");
                objRtn.A4363XRFDB = rs01.getString("A4363XRFDB");
                objRtn.A4363XFEE = rs01.getString("A4363XFEE");
                objRtn.A4363XERES = rs01.getString("A4363XERES");
                objRtn.A4363XLKTS = rs01.getString("A4363XLKTS");
                objRtn.A4363TRNCM = rs01.getString("A4363TRNCM");
                objRtn.A4363MMDA = rs01.getString("A4363MMDA");
                objRtn.A4363CPN3D = rs01.getString("A4363CPN3D");
                objRtn.A4363CPN1D = rs01.getString("A4363CPN1D");
                objRtn.A4363CPN2D = rs01.getString("A4363CPN2D");
                objRtn.A4363CPN4D = rs01.getString("A4363CPN4D");
                objRtn.A4363CPN5D = rs01.getString("A4363CPN5D");
                objRtn.A4363CPN6D = rs01.getString("A4363CPN6D");
                objRtn.A4363CPN7D = rs01.getString("A4363CPN7D");
                objRtn.A4363CPN8D = rs01.getString("A4363CPN8D");
                objRtn.A4363MDAD = rs01.getString("A4363MDAD");
                objRtn.A4363MDAQD = rs01.getString("A4363MDAQD");
                objRtn.A4363MDAPG = rs01.getString("A4363MDAPG");
                objRtn.A4363FRERQ = rs01.getString("A4363FRERQ");
                objRtn.A4363FLAG = rs01.getString("A4363FLAG");
                objRtn.A4363STAPG = rs01.getString("A4363STAPG");
                objRtn.A4363STUSO = rs01.getString("A4363STUSO");
                objRtn.A4363GRUPO = rs01.getString("A4363GRUPO");
                objRtn.A4363FGUPO = rs01.getString("A4363FGUPO");
                objRtn.A4363HGUPO = rs01.getString("A4363HGUPO");
                objRtn.A4363REGIS = rs01.getString("A4363REGIS");
                objRtn.A4363FREGI = rs01.getString("A4363FREGI");
                objRtn.A4363HREGI = rs01.getString("A4363HREGI");
                objRtn.A4363REVIS = rs01.getString("A4363REVIS");
                objRtn.A4363FREVI = rs01.getString("A4363FREVI");
                objRtn.A4363HREVI = rs01.getString("A4363HREVI");
                objRtn.A4363TRFND = rs01.getString("A4363TRFND");
                objRtn.A4363STATO = rs01.getString("A4363STATO");
                objRtn.A4363ESTADO = rs01.getString("A4363ESTADO");
                objRtn.A4361IATA = rs01.getString("A4361IATA");
                objRtn.A4363PENAD = rs01.getDouble("A4363PENAD");
                objRtn.A4363AGENCYREQUE = rs01.getString("A4363AGENCYREQUE");
                objRtn.A4363SIATA = rs01.getString("A4363SIATA");
                objRtn.A4363AGENCYISSUE = rs01.getString("A4363AGENCYISSUE");
                objRtn.A4362ERROR = rs01.getString("A4362ERROR");
                objRtn.A4362CODE = rs01.getString("A4362CODE");
                objRtn.A3401STATU = rs01.getString("A3401STATU");
                objRtn.A3401RAAG = rs01.getString("A3401RAAG");
                objRtn.A4363FCOTI = rs01.getString("A4363FCOTI");
                objRtn.A4363HCOTI = rs01.getString("A4363HCOTI");
                objRtn.A4363TRNCO = rs01.getString("A4363TRNCO");
                objRtn.A4363EMAIL = rs01.getString("A4361EMAIL");
                // MONTOS
                objRtn.A4363STARF = rs01.getDouble("A4363STARF");
                objRtn.A4363STARQ = rs01.getDouble("A4363STARQ");
                objRtn.A4363SCOMI = rs01.getDouble("A4363SCOMI");
                objRtn.A4363SSCOM = rs01.getDouble("A4363SSCOM");
                objRtn.A4363STTAX = rs01.getDouble("A4363STTAX");
                objRtn.A4363STOTL = rs01.getDouble("A4363STOTL");
                objRtn.A4363XTARF = rs01.getDouble("A4363XTARF");
                objRtn.A4363XTARQ = rs01.getDouble("A4363XTARQ");
                objRtn.A4363XCOMI = rs01.getDouble("A4363XCOMI");
                objRtn.A4363XSCOM = rs01.getDouble("A4363XSCOM");
                objRtn.A4363XTTAX = rs01.getDouble("A4363XTTAX");
                objRtn.A4363XROE = rs01.getDouble("A4363XROE");
                objRtn.A4363XTOTL = rs01.getDouble("A4363XTOTL");
                objRtn.A4363MONTO = rs01.getDouble("A4363MONTO");
                objRtn.A4363TARID = rs01.getDouble("A4363TARID");
                objRtn.A4363CPIVA = rs01.getDouble("A4363CPIVA");
                objRtn.A4363STAQD = rs01.getDouble("A4363STAQD");
                objRtn.A4363TTAXD = rs01.getDouble("A4363TTAXD");
                objRtn.A4363COMID = rs01.getDouble("A4363COMID");
                objRtn.A4363SCOMD = rs01.getDouble("A4363SCOMD");
                objRtn.A4363TOTAD = rs01.getDouble("A4363TOTAD");
                objRtn.A4363PENCT = rs01.getDouble("A4363PENCT");
                objRtn.A4363IVACT = rs01.getDouble("A4363IVACT");
                objRtn.A4363TOTCT = rs01.getDouble("A4363TOTCT");

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

    public A4361Filter SearchRFNDetailTCKT(A4361Filter filter) throws SQLException, Exception {
        A4361Filter lstGeneral = null;
        List<A4363> lst_DOCUMENTS = new ArrayList<A4363>(0);
        List<A4362> lst_RAZON = new ArrayList<A4362>(0);

        List<A4364> TEM_TAXES = new ArrayList<A4364>(0);
        List<A4364> TEM_TAXAUDI = new ArrayList<A4364>(0);
        List<A4365> TEM_CARD = new ArrayList<A4365>(0);
        List<A4366> TEM_COUPNS = new ArrayList<A4366>(0);
        List<A4367> lst_USOS = new ArrayList<A4367>(0);

        A4361Filter objRtnGeneral = null;
        A4363 objlst_DOCUMENTS = null;
        A4362 objlst_RAZON = null;
        A4367 objlst_USOS = null;

        A4364 objlst_TAXES = null;
        A4364 objlst_TAXUDI = null;
        A4365 objlst_CARD = null;
        A4366 objlst_COUPNS = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        ResultSet rs05 = null;
        ResultSet rs06 = null;
        ResultSet rs07 = null;
        ResultSet rs08 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP04735(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, filter.IN_FORMA);
            cstmt01.setString(6, filter.IN_SERIE);
            cstmt01.setString(7, filter.IN_SEQ);
            cstmt01.setString(8, filter.IN_CORRL);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ////LIST TAXES XML
            while (rs01.next()) {
                objlst_TAXES = new A4364();
                objlst_TAXES.A4364CCUST = rs01.getString("A4364CCUST");
                objlst_TAXES.A4364CIA = rs01.getString("A4364CIA");
                objlst_TAXES.A4364FORMA = rs01.getString("A4364FORMA");
                objlst_TAXES.A4364SERIE = rs01.getString("A4364SERIE");
                objlst_TAXES.A4364SEQ = rs01.getString("A4364SEQ");
                objlst_TAXES.A4364CORRL = rs01.getString("A4364CORRL");
                objlst_TAXES.A4364CDTAX = rs01.getString("A4364CDTAX");
                objlst_TAXES.A4364MONED = rs01.getString("A4364MONED");
                objlst_TAXES.A4364PAIS = rs01.getString("A4364PAIS");
                objlst_TAXES.A4364TPTAX = rs01.getString("A4364TPTAX");
                objlst_TAXES.A4364CTRL = rs01.getString("A4364CTRL");
                objlst_TAXES.A4364APFC = rs01.getString("A4364APFC");
                objlst_TAXES.A4364STAT = rs01.getString("A4364STAT");
                objlst_TAXES.A4364ERROR = rs01.getString("A4364ERROR");
                objlst_TAXES.A4364PREME = rs01.getString("A4364PREME");
                objlst_TAXES.A4364ANIO = rs01.getString("A4364ANIO");
                objlst_TAXES.A4364TYPE = rs01.getString("A4364TYPE");
                objlst_TAXES.A4364TXAGE = rs01.getDouble("A4364TXAGE");
                objlst_TAXES.A4364TXMIA = rs01.getDouble("A4364TXMIA");
                objlst_TAXES.A4364TXDIF = rs01.getDouble("A4364TXDIF");

                TEM_TAXES.add(objlst_TAXES);
            }
            // LISTA DE TAXES AUDITOR
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_TAXUDI = new A4364();
                    objlst_TAXUDI.A4364CCUST = rs02.getString("A4364CCUST");
                    objlst_TAXUDI.A4364CIA = rs02.getString("A4364CIA");
                    objlst_TAXUDI.A4364FORMA = rs02.getString("A4364FORMA");
                    objlst_TAXUDI.A4364SERIE = rs02.getString("A4364SERIE");
                    objlst_TAXUDI.A4364SEQ = rs02.getString("A4364SEQ");
                    objlst_TAXUDI.A4364CORRL = rs02.getString("A4364CORRL");
                    objlst_TAXUDI.A4364CDTAX = rs02.getString("A4364CDTAX");
                    objlst_TAXUDI.A4364MONED = rs02.getString("A4364MONED");
                    objlst_TAXUDI.A4364PAIS = rs02.getString("A4364PAIS");
                    objlst_TAXUDI.A4364TPTAX = rs02.getString("A4364TPTAX");
                    objlst_TAXUDI.A4364CTRL = rs02.getString("A4364CTRL");
                    objlst_TAXUDI.A4364APFC = rs02.getString("A4364APFC");
                    objlst_TAXUDI.A4364STAT = rs02.getString("A4364STAT");
                    objlst_TAXUDI.A4364ERROR = rs02.getString("A4364ERROR");
                    objlst_TAXUDI.A4364PREME = rs02.getString("A4364PREME");
                    objlst_TAXUDI.A4364ANIO = rs02.getString("A4364ANIO");
                    objlst_TAXUDI.A4364TYPE = rs02.getString("A4364TYPE");
                    objlst_TAXUDI.A4364TXAGE = rs02.getDouble("A4364TXAGE");
                    objlst_TAXUDI.A4364TXMIA = rs02.getDouble("A4364TXMIA");
                    objlst_TAXUDI.A4364TXDIF = rs02.getDouble("A4364TXDIF");
                    TEM_TAXAUDI.add(objlst_TAXUDI);
                }
            }
            ////LIST Card Type
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_CARD = new A4365();
                    objlst_CARD.A4365CCUST = rs03.getString("A4365CCUST");
                    objlst_CARD.A4365CIA = rs03.getString("A4365CIA");
                    objlst_CARD.A4365FORMA = rs03.getString("A4365FORMA");
                    objlst_CARD.A4365SERIE = rs03.getString("A4365SERIE");
                    objlst_CARD.A4365SEQ = rs03.getString("A4365SEQ");
                    objlst_CARD.A4365CFOP = rs03.getString("A4365CFOP");
                    objlst_CARD.A4365TYCAR = rs03.getString("A4365TYCAR");
                    objlst_CARD.A4365CUR = rs03.getString("A4365CUR");
                    objlst_CARD.A4365NTARJ = rs03.getString("A4365NTARJ");
                    objlst_CARD.A4365FEXP = rs03.getString("A4365FEXP");
                    objlst_CARD.A4365CAPL = rs03.getString("A4365CAPL");
                    objlst_CARD.A4365PREME = rs03.getString("A4365PREME");
                    objlst_CARD.A4365ANIO = rs03.getString("A4365ANIO");
                    objlst_CARD.A4365CORRL = rs03.getString("A4365CORRL");
                    objlst_CARD.A4365TYPE = rs03.getString("A4365TYPE");
                    objlst_CARD.A4365MONTO = rs03.getDouble("A4365MONTO");
                    objlst_CARD.A4365MONTE = rs03.getDouble("A4365MONTE");
                    objlst_CARD.A4365TOTAL = rs03.getDouble("A4365TOTAL");
                    TEM_CARD.add(objlst_CARD);
                }
            }
            ////LISTA DE CUPONES IN_XMLLISCOUPNS 
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_COUPNS = new A4366();
                    objlst_COUPNS.A4366CCUST = rs04.getString("A4366CCUST");
                    objlst_COUPNS.A4366CIA = rs04.getString("A4366CIA");
                    objlst_COUPNS.A4366FORMA = rs04.getString("A4366FORMA");
                    objlst_COUPNS.A4366SERIE = rs04.getString("A4366SERIE");
                    objlst_COUPNS.A4366SEQ = rs04.getString("A4366SEQ");
                    objlst_COUPNS.A4366CPN = rs04.getString("A4366CPN");
                    objlst_COUPNS.A4366MARKE = rs04.getString("A4366MARKE");
                    objlst_COUPNS.A4366NFLGH = rs04.getString("A4366NFLGH");
                    objlst_COUPNS.A4366CLAS = rs04.getString("A4366CLAS");
                    objlst_COUPNS.A4366FBASI = rs04.getString("A4366FBASI");
                    objlst_COUPNS.A4366ORIGE = rs04.getString("A4366ORIGE");
                    objlst_COUPNS.A4366FORIG = rs04.getString("A4366FORIG");
                    objlst_COUPNS.A4366HORIG = rs04.getString("A4366HORIG");
                    objlst_COUPNS.A4366DESTI = rs04.getString("A4366DESTI");
                    objlst_COUPNS.A4366FDEST = rs04.getString("A4366FDEST");
                    objlst_COUPNS.A4366HDEST = rs04.getString("A4366HDEST");
                    objlst_COUPNS.A4366BOOKI = rs04.getString("A4366BOOKI");
                    objlst_COUPNS.A4366CURS1 = rs04.getString("A4366CURS1");
                    objlst_COUPNS.A4366CURS2 = rs04.getString("A4366CURS2");
                    objlst_COUPNS.A4366CURS3 = rs04.getString("A4366CURS3");
                    objlst_COUPNS.A4366CURS4 = rs04.getString("A4366CURS4");
                    objlst_COUPNS.A4366PROVI = rs04.getString("A4366PROVI");
                    objlst_COUPNS.A4366BAGAL = rs04.getString("A4366BAGAL");
                    objlst_COUPNS.A4366STOP = rs04.getString("A4366STOP");
                    objlst_COUPNS.A4366USE1 = rs04.getString("A4366USE1");
                    objlst_COUPNS.A4366USE2 = rs04.getString("A4366USE2");
                    objlst_COUPNS.A4366USE3 = rs04.getString("A4366USE3");
                    objlst_COUPNS.A4366MONTO = rs04.getDouble("A4366MONTO");
                    objlst_COUPNS.A4366FAREC = rs04.getString("A4366FAREC");
                    objlst_COUPNS.A4366DESIG = rs04.getString("A4366DESIG");
                    objlst_COUPNS.A4366PREME = rs04.getString("A4366PREME");
                    objlst_COUPNS.A4366ANIO = rs04.getString("A4366ANIO");
                    objlst_COUPNS.A4366CORRL = rs04.getString("A4366CORRL");
                    objlst_COUPNS.A4366TYPE = rs04.getString("A4366TYPE");
                    objlst_COUPNS.A4366FLAG = rs04.getString("A4366FLAG");
                    TEM_COUPNS.add(objlst_COUPNS);
                }
            }
            ////LISTA DE RAZONES TICKTES
            if (cstmt01.getMoreResults()) {
                rs06 = cstmt01.getResultSet();
                while (rs06.next()) {
                    objlst_RAZON = new A4362();
                    objlst_RAZON.A4362CCUST = rs06.getString("A4368CCUST");
                    objlst_RAZON.A4362PREME = rs06.getString("A4368PREME");
                    objlst_RAZON.A4362ANIO = rs06.getString("A4368ANIO");
                    objlst_RAZON.A3659CIA = rs06.getString("A4368CIA");
                    objlst_RAZON.A3659FORMA = rs06.getString("A4368FORMA");
                    objlst_RAZON.A3659SERIE = rs06.getString("A4368SERIE");
                    objlst_RAZON.A3659SEQ = rs06.getString("A4368SEQ");
                    objlst_RAZON.A4362CORRL = rs06.getString("A4368CORRL");
                    objlst_RAZON.A4362TYPE = rs06.getString("A4368TYPE");
                    objlst_RAZON.A4362BASE = rs06.getString("A4368BASE");
                    objlst_RAZON.A4362CODE = rs06.getString("A4368CODE");
                    objlst_RAZON.A4362FAMIL = rs06.getString("A4368FAMIL");
                    objlst_RAZON.A4362ERROR = rs06.getString("A4368ERROR");
                    objlst_RAZON.A4362REGIS = rs06.getString("A4368REGIS");
                    objlst_RAZON.A4362FREGI = rs06.getString("A4368FREGI");
                    objlst_RAZON.A4362HREGI = rs06.getString("A4368HREGI");
                    lst_RAZON.add(objlst_RAZON);
                }
            }
            ////LISTA USOS SABRE
            if (cstmt01.getMoreResults()) {
                rs07 = cstmt01.getResultSet();
                while (rs07.next()) {
                    objlst_USOS = new A4367();
                    objlst_USOS.A4367CCUST = rs07.getString("A4367CCUST");
                    objlst_USOS.A4367PREME = rs07.getString("A4367PREME");
                    objlst_USOS.A4367ANIO = rs07.getString("A4367ANIO");
                    objlst_USOS.A4367CIA = rs07.getString("A4367CIA");
                    objlst_USOS.A4367FORMA = rs07.getString("A4367FORMA");
                    objlst_USOS.A4367SERIE = rs07.getString("A4367SERIE");
                    objlst_USOS.A4367SEQ = rs07.getString("A4367SEQ");
                    objlst_USOS.A4367CORRL = rs07.getString("A4367CORRL");
                    objlst_USOS.A4367TICKT = rs07.getString("A4367TICKT");
                    objlst_USOS.A4367CPN = rs07.getString("A4367CPN");
                    objlst_USOS.A4367FCAMB = rs07.getString("A4367FCAMB");

                    objlst_USOS.A4367HCAMB = rs07.getString("A4367HCAMB");
                    objlst_USOS.A4367CODE = rs07.getString("A4367CODE");
                    objlst_USOS.A4367STINI = rs07.getString("A4367STINI");
                    objlst_USOS.A4367STFIN = rs07.getString("A4367STFIN");
                    objlst_USOS.A4367FLAG = rs07.getString("A4367FLAG");
                    objlst_USOS.A4367REGIS = rs07.getString("A4367REGIS");
                    objlst_USOS.A4367FREGI = rs07.getString("A4367FREGI");
                    objlst_USOS.A4367HREGI = rs07.getString("A4367HREGI");

                    lst_USOS.add(objlst_USOS);
                }
            }
            ////LISTA DE BOLETOS REPETIDOS 
            if (cstmt01.getMoreResults()) {
                rs08 = cstmt01.getResultSet();
                while (rs08.next()) {
                    objlst_DOCUMENTS = new A4363();
                    objlst_DOCUMENTS.A4363CCUST = rs08.getString("A4363CCUST");

                    lst_DOCUMENTS.add(objlst_DOCUMENTS);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new A4361Filter();
            objRtnGeneral.lst_TAXES = TEM_TAXES;
            objRtnGeneral.lst_TAXAUDI = TEM_TAXAUDI;
            objRtnGeneral.lst_Card = TEM_CARD;
            objRtnGeneral.LIS_COUPNS = TEM_COUPNS;
            objRtnGeneral.lst_RAZON = lst_RAZON;
            objRtnGeneral.lst_USOS = lst_USOS;
            objRtnGeneral.lst_DOCUMENTS = lst_DOCUMENTS;

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

    public String ProcesaDeleteManual(A4363Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXRFNDESP.SQP04736(?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_OPTION", filter.IN_OPTION);
            cs.setString("IN_A4363CIA", filter.A4363CIA);
            cs.setString("IN_A4363FORMA", filter.A4363FORMA);
            cs.setString("IN_A4363SERIE", filter.A4363SERIE);
            cs.setString("IN_A4363SEQ", filter.A4363SEQ);
            cs.setString("IN_A4363CORRL", filter.A4363CORRL);
            cs.setString("IN_A4363PREME", filter.A4363PREME);
            cs.setString("IN_A4363ANIO", filter.A4363ANIO);

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

    public List<A4360Filter> SearchRFNDRazon(A4360Filter filter) throws SQLException, Exception {
        List<A4360Filter> lstRtn = new ArrayList<A4360Filter>(0);
        A4360Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP04737(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, "1");
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4360Filter();
                objRtn.A4360CCUST = rs01.getString("A4360CCUST");
                objRtn.A4360CODRZ = rs01.getString("A4360CODRZ");
                objRtn.A4360FAMIL = rs01.getString("A4360FAMIL");
                objRtn.A4360COMRE = rs01.getString("A4360COMRE");
                objRtn.A4360COMES = rs01.getString("A4360COMES");
                objRtn.A4360COMEN = rs01.getString("A4360COMEN");
                objRtn.A4360COMPO = rs01.getString("A4360COMPO");
                objRtn.A4360COMFR = rs01.getString("A4360COMFR");
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

    public String ProcesaManualRFNDARCTCKT(A4363Filter filter, String lstaTaxes, String lstaRazones, String lstafop) throws SQLException, Exception {
        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        String strSQL;
        String STR_RESULT = "";
        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXRFNDESP.SQP04738(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP02515
            String SQLCLL02 = "{CALL PXRFNDESP.SQP04739(?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FOLIO", filter.IN_FOLIO);
            cs.setString("IN_COUNTRY", filter.IN_COUNTRY);
            cs.setString("IN_CORRL", filter.IN_CORRL);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_ANIO", filter.IN_ANIO);
            cs.setString("IN_CIA", filter.IN_CIA);
            cs.setString("IN_FORMA", filter.IN_FORMA);
            cs.setString("IN_SERIE", filter.IN_SERIE);
            cs.setString("IN_SEQ", filter.IN_SEQ);
            cs.setDouble("IN_TARIF", filter.IN_TARIF);
            cs.setString("IN_MDA", filter.IN_MDA);
            cs.setDouble("IN_TARIFEQUI", filter.IN_TARIFEQUI);
            cs.setString("IN_MDAEQUI", filter.IN_MDAEQUI);
            cs.setDouble("IN_TTAX", filter.IN_TTAX);
            cs.setDouble("IN_COMMI", filter.IN_COMMI);
            cs.setDouble("IN_TOTALRFND", filter.IN_TOTALRFND);
            cs.setString("IN_STATUS", filter.IN_STATUS);
            cs.setString("IN_CONJU", filter.IN_CONJU);
            cs.setString("IN_MARCA", filter.IN_MARCA);
            cs.setString("IN_CPN1", filter.IN_CPN1);
            cs.setString("IN_CPN2", filter.IN_CPN2);
            cs.setString("IN_CPN3", filter.IN_CPN3);
            cs.setString("IN_CPN4", filter.IN_CPN4);
            cs.setString("IN_CPN5", filter.IN_CPN5);
            cs.setString("IN_CPN6", filter.IN_CPN6);
            cs.setString("IN_CPN7", filter.IN_CPN7);
            cs.setString("IN_CPN8", filter.IN_CPN8);
            cs.setString("IN_TRFND", filter.IN_TRFND);
            cs.setDouble("IN_PENALTY", filter.IN_PENALTY);
            cs.setString("IN_EMAIL", filter.IN_EMAIL);
            cs.setString("IN_LSTATaxes", lstaTaxes);
            cs.setString("IN_LSTARazones", lstaRazones);
            cs.setString("IN_LSTAfop", lstafop);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
                if (rst.getString("VMESSAGE").equals("RECORD INSERTED")) {
                    cs2 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL02);
                    cs2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cs2.setString(2, filter.IN_PREME);
                    cs2.setString(3, filter.IN_ANIO);
                    cs2.execute();
                    rst2 = cs2.getResultSet();
                    while (rst2.next()) {
                        STR_RESULT = rst2.getString("VMESSAGE");
                    }
                    cs2.close();
                }
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

    public A4367Filter ProcesaUpdateUsosCPN(A4367Filter filter) throws SQLException, Exception {
        A4367Filter lstGeneral = null;
        List<A4367> lst_USOS = new ArrayList<A4367>(0);

        A4367Filter objRtnGeneral = null;
        A4367 objlst_USOS = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP04742(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, filter.IN_FORMA);
            cstmt01.setString(6, filter.IN_SERIE);
            cstmt01.setString(7, filter.IN_SEQ);
            cstmt01.setString(8, filter.IN_CORRL);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LIST DOCUMENTS
            while (rs01.next()) {
                objlst_USOS = new A4367();
                objlst_USOS.A4367CCUST = rs01.getString("A4367CCUST");
                objlst_USOS.A4367PREME = rs01.getString("A4367PREME");
                objlst_USOS.A4367ANIO = rs01.getString("A4367ANIO");
                objlst_USOS.A4367CIA = rs01.getString("A4367CIA");
                objlst_USOS.A4367FORMA = rs01.getString("A4367FORMA");
                objlst_USOS.A4367SERIE = rs01.getString("A4367SERIE");
                objlst_USOS.A4367SEQ = rs01.getString("A4367SEQ");
                objlst_USOS.A4367CORRL = rs01.getString("A4367CORRL");
                objlst_USOS.A4367TICKT = rs01.getString("A4367TICKT");
                objlst_USOS.A4367CPN = rs01.getString("A4367CPN");
                objlst_USOS.A4367FCAMB = rs01.getString("A4367FCAMB");

                objlst_USOS.A4367HCAMB = rs01.getString("A4367HCAMB");
                objlst_USOS.A4367CODE = rs01.getString("A4367CODE");
                objlst_USOS.A4367STINI = rs01.getString("A4367STINI");
                objlst_USOS.A4367STFIN = rs01.getString("A4367STFIN");
                objlst_USOS.A4367FLAG = rs01.getString("A4367FLAG");
                objlst_USOS.A4367REGIS = rs01.getString("A4367REGIS");
                objlst_USOS.A4367FREGI = rs01.getString("A4367FREGI");
                objlst_USOS.A4367HREGI = rs01.getString("A4367HREGI");

                lst_USOS.add(objlst_USOS);
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A4367Filter();
            objRtnGeneral.lst_USOS = lst_USOS;

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

}
