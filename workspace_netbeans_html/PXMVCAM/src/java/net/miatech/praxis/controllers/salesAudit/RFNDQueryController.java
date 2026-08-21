/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3648Filter;
import net.miatech.beans.SaleAudit.A3649Filter;
import net.miatech.beans.SaleAudit.A3652Filter;
import net.miatech.beans.SaleAudit.A3653Filter;
import net.miatech.beans.SaleAudit.A3656Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RFNDQueryLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RFNDQuery")
public class RFNDQueryController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDQueryLogic logic;

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3647Filter> lst;
        A3647Filter filter = new A3647Filter();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_FOLIO = request.getParameter("IN_DOCUMET").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchReportQueryRFND(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchQueryRFNDetail")
    public @ResponseBody
    String SearchQueryRFNDetail(ModelMap map, HttpServletRequest request) {
        A3647Filter lst;
        A3647Filter filter = new A3647Filter();

        HashMap map01, map02;
        ArrayList<HashMap<String, String>> lst_DOCUMENTS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();

        ArrayList<HashMap<String, String>> lsta_TAXESAGEN = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_TAXESAM = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_Card = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_COUPNS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_HISTORY = new ArrayList<>();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();

            lst = logic.SearchQueryRFNDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RAZON">
            for (int vi = 0; vi < lst.lst_RAZON.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3649CCUST", lst.lst_RAZON.get(vi).A3649CCUST);
                map01.put("A3649PREME", lst.lst_RAZON.get(vi).A3649PREME);
                map01.put("A3649CORRL", lst.lst_RAZON.get(vi).A3649CORRL);
                map01.put("A3649FLAG", lst.lst_RAZON.get(vi).A3649FLAG);
                map01.put("A3649TYPE", lst.lst_RAZON.get(vi).A3649TYPE);
                map01.put("A3649BASE", lst.lst_RAZON.get(vi).A3649BASE);
                map01.put("A3649CODE", lst.lst_RAZON.get(vi).A3649CODE);

                map01.put("A3649ERROR", lst.lst_RAZON.get(vi).A3649ERROR);
                map01.put("A3649ARCHI", lst.lst_RAZON.get(vi).A3649ARCHI);
                map01.put("A3649REGRQ", lst.lst_RAZON.get(vi).A3649REGRQ);
                map01.put("A3649FRERQ", lst.lst_RAZON.get(vi).A3649FRERQ);
                map01.put("A3649REGIS", lst.lst_RAZON.get(vi).A3649REGIS);
                map01.put("A3649FREGI", lst.lst_RAZON.get(vi).A3649FREGI);
                map01.put("A3649HREGI", lst.lst_RAZON.get(vi).A3649HREGI);

                lst_RAZON.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTS">
            for (int vi = 0; vi < lst.lst_DOCUMENTS.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A3648CCUST", lst.lst_DOCUMENTS.get(vi).A3648CCUST);
                map02.put("A3648TKT", lst.lst_DOCUMENTS.get(vi).A3648TKT);
                map02.put("A3648CIA", lst.lst_DOCUMENTS.get(vi).A3648CIA);
                map02.put("A3648FORMA", lst.lst_DOCUMENTS.get(vi).A3648FORMA);
                map02.put("A3648SERIE", lst.lst_DOCUMENTS.get(vi).A3648SERIE);
                map02.put("A3648SEQ", lst.lst_DOCUMENTS.get(vi).A3648SEQ);
                map02.put("A3648CORRL", lst.lst_DOCUMENTS.get(vi).A3648CORRL);
                map02.put("A3648PREME", lst.lst_DOCUMENTS.get(vi).A3648PREME);
                map02.put("A3648TIDOC", lst.lst_DOCUMENTS.get(vi).A3648TIDOC);
                map02.put("A3648CIAI", lst.lst_DOCUMENTS.get(vi).A3648CIAI);
                map02.put("A3648FORMI", lst.lst_DOCUMENTS.get(vi).A3648FORMI);
                map02.put("A3648SEREI", lst.lst_DOCUMENTS.get(vi).A3648SEREI);
                map02.put("A3648FLAG", lst.lst_DOCUMENTS.get(vi).A3648FLAG);
                map02.put("A3648FVNTA", lst.lst_DOCUMENTS.get(vi).A3648FVNTA);
                map02.put("A3648PNR", lst.lst_DOCUMENTS.get(vi).A3648PNR);
                map02.put("A3648CUPON", lst.lst_DOCUMENTS.get(vi).A3648CUPON);
                map02.put("A3648ELECT", lst.lst_DOCUMENTS.get(vi).A3648ELECT);
                map02.put("A3648ORIGE", lst.lst_DOCUMENTS.get(vi).A3648ORIGE);
                map02.put("A3648DESTI", lst.lst_DOCUMENTS.get(vi).A3648DESTI);
                map02.put("A3648IDFIS", lst.lst_DOCUMENTS.get(vi).A3648IDFIS);
                map02.put("A3648PAX", lst.lst_DOCUMENTS.get(vi).A3648PAX);
                map02.put("A3648TPAX", lst.lst_DOCUMENTS.get(vi).A3648TPAX);
                map02.put("A3648IATA", lst.lst_DOCUMENTS.get(vi).A3648IATA);
                map02.put("A3648TRNCU", lst.lst_DOCUMENTS.get(vi).A3648TRNCU);
                map02.put("A3648MDA", lst.lst_DOCUMENTS.get(vi).A3648MDA);
                map02.put("A3648TARIF", lst.lst_DOCUMENTS.get(vi).A3648TARIF);
                map02.put("A3648FAREC", lst.lst_DOCUMENTS.get(vi).A3648FAREC);
                map02.put("A3648FRERQ", lst.lst_DOCUMENTS.get(vi).A3648FRERQ);
                map02.put("A3648REGRQ", lst.lst_DOCUMENTS.get(vi).A3648REGRQ);
                map02.put("A3648CPN1", lst.lst_DOCUMENTS.get(vi).A3648CPN1);
                map02.put("A3648CPN2", lst.lst_DOCUMENTS.get(vi).A3648CPN2);
                map02.put("A3648CPN3", lst.lst_DOCUMENTS.get(vi).A3648CPN3);
                map02.put("A3648CPN4", lst.lst_DOCUMENTS.get(vi).A3648CPN4);
                map02.put("A3648ENDOR", lst.lst_DOCUMENTS.get(vi).A3648ENDOR);
                map02.put("A3648REGIS", lst.lst_DOCUMENTS.get(vi).A3648REGIS);
                map02.put("A3648FREGI", lst.lst_DOCUMENTS.get(vi).A3648FREGI);
                map02.put("A3648HREGI", lst.lst_DOCUMENTS.get(vi).A3648HREGI);
                map02.put("A3648REVIS", lst.lst_DOCUMENTS.get(vi).A3648REVIS);
                map02.put("A3648FREVI", lst.lst_DOCUMENTS.get(vi).A3648FREVI);
                map02.put("A3648HREVI", lst.lst_DOCUMENTS.get(vi).A3648HREVI);
                map02.put("A3648STATU", lst.lst_DOCUMENTS.get(vi).A3648STATU);
                map02.put("A3648TARIQ", lst.lst_DOCUMENTS.get(vi).A3648TARIQ);
                map02.put("A3648FEE", lst.lst_DOCUMENTS.get(vi).A3648FEE);
                map02.put("A3648PAIVTA", lst.lst_DOCUMENTS.get(vi).A3648PAIVTA);
                map02.put("A3648ANIO", lst.lst_DOCUMENTS.get(vi).A3648ANIO);
                map02.put("A3648MARCA", lst.lst_DOCUMENTS.get(vi).A3648MARCA);
                map02.put("A3648STFIN", lst.lst_DOCUMENTS.get(vi).A3648STFIN);
                map02.put("A3648STATO", lst.lst_DOCUMENTS.get(vi).A3648STATO);

                map02.put("A3648COMIS", lst.lst_DOCUMENTS.get(vi).A3648COMIS);
                map02.put("A3648SCOM", lst.lst_DOCUMENTS.get(vi).A3648SCOM);
                map02.put("A3648TTAX", lst.lst_DOCUMENTS.get(vi).A3648TTAX);
                map02.put("A3648ROE", lst.lst_DOCUMENTS.get(vi).A3648ROE);
                map02.put("A3648TOTAL", lst.lst_DOCUMENTS.get(vi).A3648TOTAL);
                map02.put("A3648TRFND", lst.lst_DOCUMENTS.get(vi).A3648TRFND);
                map02.put("A3648TARID", lst.lst_DOCUMENTS.get(vi).A3648TARID);
                map02.put("A3648TTAXD", lst.lst_DOCUMENTS.get(vi).A3648TTAXD);
                map02.put("A3648COMID", lst.lst_DOCUMENTS.get(vi).A3648COMID);
                map02.put("A3648SCOMD", lst.lst_DOCUMENTS.get(vi).A3648SCOMD);
                map02.put("A3648TOTAD", lst.lst_DOCUMENTS.get(vi).A3648TOTAD);
                map02.put("A3648RFNDB", lst.lst_DOCUMENTS.get(vi).A3648RFNDB);
                lst_DOCUMENTS.add(map02);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_DOCUMENTS", lst_DOCUMENTS);
        map.put("lst_RAZON", lst_RAZON);

        map.put("lsta_TAXESAGEN", lsta_TAXESAGEN);
        map.put("lsta_TAXESAM", lsta_TAXESAM);
        map.put("lsta_Card", lsta_Card);
        map.put("lsta_COUPNS", lsta_COUPNS);
        map.put("lsta_HISTORY", lsta_HISTORY);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaMantenimiento")
    public @ResponseBody
    String ProcesaMantenimiento(ModelMap map, HttpServletRequest request) {
        String result = "";
        String result2 = "";
        String mensaje = "Error de Emisión";
        A3647Filter filter = new A3647Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            if (!"".equals(mensaje)) {
                result2 = rfndestatuspagina(filter, mensaje);
            }
            RFNDQueryLogic logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaMantenimiento(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String rfndestatuspagina(A3647Filter beanGene, String Razones) {
        String mensaje = "";
        String flag = "";
        String token = "";
        boolean success = true;
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFND").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String req_preme = beanGene.IN_PREME;
            String req_statu = "A";
            String drq_descrip = Razones;
            String drq_flag = "A";
            String drq_base = "PR";
            String req_email = beanGene.A3647EMAIL;
            String req_message = "La solicitud esta volviendo a revizar y se enceuntra en el estado de <b>PENDING</b> con el folio" + beanGene.A3647FOLIO + "<br/>"
                    + "Con tu folio y tu correo podras verificar en que stautus se encuentra tu reembolso. ";
            //IN_DOCUMENT = "2522497772";

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            HashMap bodyData1 = new HashMap<>();
            bodyData1.put("username", "api_miatech@miatech.net");
            bodyData1.put("password", "BWW^X0vA2Mhy");

            HttpResponse<JsonNode> response1 = Unirest.post(urlREST + "/api/login/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData1))
                    .asJson();

            token = response1.getBody().getObject().get("token").toString();

            HashMap bodyData = new HashMap<>();
            bodyData.put("req_ccust", "139");
            bodyData.put("req_preme", req_preme);
            bodyData.put("req_statu", req_statu);
            //bodyData.put("drq_codi", drq_codi);
            bodyData.put("drq_descrip", drq_descrip);
            bodyData.put("drq_flag", drq_flag);
            bodyData.put("drq_base", drq_base);
            bodyData.put("req_email", req_email);
            bodyData.put("req_message", req_message);

            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/refund/direct/status/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());
            mensaje = response.getBody().getObject().get("msg").toString();

        } catch (SQLException e) {
            mensaje = e.getMessage();
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return mensaje;
    }

    @RequestMapping(value = "ProcesaManualRFNDTCKT")
    public @ResponseBody
    String ProcesaManualRFNDTCKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        String razones = "";
        String taxes = "";
        String fop = "";
        boolean iboolean;
        A3648Filter filter = new A3648Filter();
        ArrayList<A3656Filter> gridDataRazones = new ArrayList<A3656Filter>();
        ArrayList<A3652Filter> gridDataTaxes = new ArrayList<A3652Filter>();
        ArrayList<A3653Filter> gridDataFop = new ArrayList<A3653Filter>();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonRazo = parser.parse(request.getParameter("beanlstRazones")).getAsJsonArray();
            JsonArray gsonTaxes = parser.parse(request.getParameter("beanlstTaxes")).getAsJsonArray();
            JsonArray gsonFop = parser.parse(request.getParameter("beanlstlstFop")).getAsJsonArray();
            for (JsonElement obj : gsonTaxes) {
                JsonObject gsonObj = obj.getAsJsonObject();
                taxes = taxes + "|" + gsonObj.get("A3652CDTAX").getAsString() + "$" + gsonObj.get("A3652TXDIF").getAsDouble() + "$" + gsonObj.get("A3652APFC").getAsString() + "$" + gsonObj.get("A3652CORRL").getAsString();
            }
            //LISTA DE TKT
            for (JsonElement obj : gsonRazo) {
                JsonObject gsonObj = obj.getAsJsonObject();
                razones += razones + "|" + gsonObj.get("A3649CODE").getAsString() + "$" + gsonObj.get("A3649ERROR").getAsString();
            }
            //LISTA DE FOP 
            for (JsonElement obj : gsonFop) {
                JsonObject gsonObj = obj.getAsJsonObject();
                fop += fop + "|" + gsonObj.get("A3653CFOP").getAsString() + "$" + gsonObj.get("A3653TYCAR").getAsString() + "$" + gsonObj.get("A3653NTARJ").getAsString() + "$" + gsonObj.get("A3653TOTAL").getAsString() + "$" + gsonObj.get("A3653FEXP").getAsString() + "$" + gsonObj.get("A3653CAPL").getAsString() + "$" + gsonObj.get("A3653CORRL").getAsString();
            }

            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualRFNDTCKT(filter, taxes, razones, fop);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchQueryRFNDetailTCKT")
    public @ResponseBody
    String SearchQueryRFNDetailTCKT(ModelMap map, HttpServletRequest request) {
        A3647Filter lst;
        A3647Filter filter = new A3647Filter();

        HashMap map01, map03, map04, map05, map06, map07;
        ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();

        ArrayList<HashMap<String, String>> lsta_TAXESAGEN = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_TAXESAM = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_Card = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_COUPNS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_HISTORY = new ArrayList<>();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_TICKET = request.getParameter("IN_TICKET").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();

            lst = logic.SearchQueryRFNDetailTCKT(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RAZON">
            for (int vi = 0; vi < lst.lst_RAZON.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3649CCUST", lst.lst_RAZON.get(vi).A3649CCUST);
                map01.put("A3649PREME", lst.lst_RAZON.get(vi).A3649PREME);
                map01.put("A3649CORRL", lst.lst_RAZON.get(vi).A3649CORRL);
                map01.put("A3649TYPE", lst.lst_RAZON.get(vi).A3649TYPE);
                map01.put("A3649BASE", lst.lst_RAZON.get(vi).A3649BASE);
                map01.put("A3649CODE", lst.lst_RAZON.get(vi).A3649CODE);
                map01.put("A3649ANIO", lst.lst_RAZON.get(vi).A3649ANIO);
                map01.put("A3649ERROR", lst.lst_RAZON.get(vi).A3649ERROR);
                map01.put("A3649REGIS", lst.lst_RAZON.get(vi).A3649REGIS);
                map01.put("A3649FREGI", lst.lst_RAZON.get(vi).A3649FREGI);
                map01.put("A3649HREGI", lst.lst_RAZON.get(vi).A3649HREGI);

                lst_RAZON.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXESAGEN">
            for (int vi = 0; vi < lst.lst_TAXESAGEN.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A3652CCUST", lst.lst_TAXESAGEN.get(vi).A3652CCUST);
                map03.put("A3652CIA", lst.lst_TAXESAGEN.get(vi).A3652CIA);
                map03.put("A3652FORMA", lst.lst_TAXESAGEN.get(vi).A3652FORMA);
                map03.put("A3652SERIE", lst.lst_TAXESAGEN.get(vi).A3652SERIE);
                map03.put("A3652SEQ", lst.lst_TAXESAGEN.get(vi).A3652SEQ);
                map03.put("A3652CORRL", lst.lst_TAXESAGEN.get(vi).A3652CORRL);
                map03.put("A3652CDTAX", lst.lst_TAXESAGEN.get(vi).A3652CDTAX);
                map03.put("A3652MONED", lst.lst_TAXESAGEN.get(vi).A3652MONED);
                map03.put("A3652STAT", lst.lst_TAXESAGEN.get(vi).A3652STAT);
                map03.put("A3652ERROR", lst.lst_TAXESAGEN.get(vi).A3652ERROR);
                map03.put("A3652PREME", lst.lst_TAXESAGEN.get(vi).A3652PREME);
                map03.put("A3652TYPE", lst.lst_TAXESAGEN.get(vi).A3652TYPE);
                map03.put("A3652REGIS", lst.lst_TAXESAGEN.get(vi).A3652REGIS);
                map03.put("A3652FREGI", lst.lst_TAXESAGEN.get(vi).A3652FREGI);
                map03.put("A3652HREGI", lst.lst_TAXESAGEN.get(vi).A3652HREGI);
                map03.put("A3652TXMIA", lst.lst_TAXESAGEN.get(vi).A3652TXMIA);
                map03.put("A3652TXDIF", lst.lst_TAXESAGEN.get(vi).A3652TXDIF);
                map03.put("A3652ANIO", lst.lst_TAXESAGEN.get(vi).A3652ANIO);
                map03.put("A3652APFC", lst.lst_TAXESAGEN.get(vi).A3652APFC);
                lsta_TAXESAGEN.add(map03);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXESAM">
            for (int vi = 0; vi < lst.lst_TAXESAM.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A3652CCUST", lst.lst_TAXESAM.get(vi).A3652CCUST);
                map04.put("A3652CIA", lst.lst_TAXESAM.get(vi).A3652CIA);
                map04.put("A3652FORMA", lst.lst_TAXESAM.get(vi).A3652FORMA);
                map04.put("A3652SERIE", lst.lst_TAXESAM.get(vi).A3652SERIE);
                map04.put("A3652SEQ", lst.lst_TAXESAM.get(vi).A3652SEQ);
                map04.put("A3652APFC", lst.lst_TAXESAM.get(vi).A3652APFC);
                map04.put("A3652CORRL", lst.lst_TAXESAM.get(vi).A3652CORRL);
                map04.put("A3652CDTAX", lst.lst_TAXESAM.get(vi).A3652CDTAX);
                map04.put("A3652MONED", lst.lst_TAXESAM.get(vi).A3652MONED);
                map04.put("A3652STAT", lst.lst_TAXESAM.get(vi).A3652STAT);
                map04.put("A3652ERROR", lst.lst_TAXESAM.get(vi).A3652ERROR);
                map04.put("A3652PREME", lst.lst_TAXESAM.get(vi).A3652PREME);
                map04.put("A3652TYPE", lst.lst_TAXESAM.get(vi).A3652TYPE);
                map04.put("A3652REGIS", lst.lst_TAXESAM.get(vi).A3652REGIS);
                map04.put("A3652FREGI", lst.lst_TAXESAM.get(vi).A3652FREGI);
                map04.put("A3652HREGI", lst.lst_TAXESAM.get(vi).A3652HREGI);
                map04.put("A3652TXMIA", lst.lst_TAXESAM.get(vi).A3652TXMIA);
                map04.put("A3652TXDIF", lst.lst_TAXESAM.get(vi).A3652TXDIF);
                map04.put("A3652PAIS", lst.lst_TAXESAM.get(vi).A3652PAIS);
                map04.put("A3652TPTAX", lst.lst_TAXESAM.get(vi).A3652TPTAX);
                map04.put("A3652CTRL", lst.lst_TAXESAM.get(vi).A3652CTRL);
                map04.put("A3652ANIO", lst.lst_TAXESAM.get(vi).A3652ANIO);
                lsta_TAXESAM.add(map04);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_Card">
            for (int vi = 0; vi < lst.lst_Card.size(); ++vi) {
                map05 = new HashMap<>();

                map05.put("A3653CCUST", lst.lst_Card.get(vi).A3653CCUST);
                map05.put("A3653CIA", lst.lst_Card.get(vi).A3653CIA);
                map05.put("A3653FORMA", lst.lst_Card.get(vi).A3653FORMA);
                map05.put("A3653SERIE", lst.lst_Card.get(vi).A3653SERIE);
                map05.put("A3653SEQ", lst.lst_Card.get(vi).A3653SEQ);
                map05.put("A3653CFOP", lst.lst_Card.get(vi).A3653CFOP);
                map05.put("A3653TYCAR", lst.lst_Card.get(vi).A3653TYCAR);
                map05.put("A3653CUR", lst.lst_Card.get(vi).A3653CUR);
                map05.put("A3653NTARJ", lst.lst_Card.get(vi).A3653NTARJ);
                map05.put("A3653PREME", lst.lst_Card.get(vi).A3653PREME);
                map05.put("A3653CORRL", lst.lst_Card.get(vi).A3653CORRL);
                map05.put("A3653TYPE", lst.lst_Card.get(vi).A3653TYPE);
                map05.put("A3653REGIS", lst.lst_Card.get(vi).A3653REGIS);
                map05.put("A3653FREGI", lst.lst_Card.get(vi).A3653FREGI);
                map05.put("A3653HREGI", lst.lst_Card.get(vi).A3653HREGI);
                map05.put("A3653MONTO", lst.lst_Card.get(vi).A3653MONTO);
                map05.put("A3653MONTE", lst.lst_Card.get(vi).A3653MONTE);
                map05.put("A3653TOTAL", lst.lst_Card.get(vi).A3653TOTAL);
                map05.put("A3653ANIO", lst.lst_Card.get(vi).A3653ANIO);

                map05.put("A3653FEXP", lst.lst_Card.get(vi).A3653FEXP);
                map05.put("A3653CAPL", lst.lst_Card.get(vi).A3653CAPL);
                map05.put("A3653FLAG", lst.lst_Card.get(vi).A3653FLAG);

                lsta_Card.add(map05);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_COUPNS">
            for (int vi = 0; vi < lst.LIS_COUPNS.size(); ++vi) {
                map06 = new HashMap<>();

                map06.put("A3654CCUST", lst.LIS_COUPNS.get(vi).A3654CCUST);
                map06.put("A3648CIA", lst.LIS_COUPNS.get(vi).A3648CIA);
                map06.put("A3648FORMA", lst.LIS_COUPNS.get(vi).A3648FORMA);
                map06.put("A3648SERIE", lst.LIS_COUPNS.get(vi).A3648SERIE);
                map06.put("A3648SEQ", lst.LIS_COUPNS.get(vi).A3648SEQ);
                map06.put("A3654CPN", lst.LIS_COUPNS.get(vi).A3654CPN);
                map06.put("A3654MARKE", lst.LIS_COUPNS.get(vi).A3654MARKE);
                map06.put("A3654NFLGH", lst.LIS_COUPNS.get(vi).A3654NFLGH);
                map06.put("A3654CLAS", lst.LIS_COUPNS.get(vi).A3654CLAS);
                map06.put("A3654FBASI", lst.LIS_COUPNS.get(vi).A3654FBASI);
                map06.put("A3654ORIGE", lst.LIS_COUPNS.get(vi).A3654ORIGE);
                map06.put("A3654FORIG", lst.LIS_COUPNS.get(vi).A3654FORIG);
                map06.put("A3654HORIG", lst.LIS_COUPNS.get(vi).A3654HORIG);
                map06.put("A3654DESTI", lst.LIS_COUPNS.get(vi).A3654DESTI);
                map06.put("A3654FDEST", lst.LIS_COUPNS.get(vi).A3654FDEST);
                map06.put("A3654HDEST", lst.LIS_COUPNS.get(vi).A3654HDEST);
                map06.put("A3654BOOKI", lst.LIS_COUPNS.get(vi).A3654BOOKI);
                map06.put("A3654CURS1", lst.LIS_COUPNS.get(vi).A3654CURS1);
                map06.put("A3654CURS2", lst.LIS_COUPNS.get(vi).A3654CURS2);
                map06.put("A3654CURS3", lst.LIS_COUPNS.get(vi).A3654CURS3);
                map06.put("A3654CURS4", lst.LIS_COUPNS.get(vi).A3654CURS4);
                map06.put("A3654PROVI", lst.LIS_COUPNS.get(vi).A3654PROVI);
                map06.put("A3654BAGAL", lst.LIS_COUPNS.get(vi).A3654BAGAL);
                map06.put("A3654STOP", lst.LIS_COUPNS.get(vi).A3654STOP);
                map06.put("A3654USE1", lst.LIS_COUPNS.get(vi).A3654USE1);
                map06.put("A3654USE2", lst.LIS_COUPNS.get(vi).A3654USE2);
                map06.put("A3654USE3", lst.LIS_COUPNS.get(vi).A3654USE3);
                map06.put("A3654FAREC", lst.LIS_COUPNS.get(vi).A3654FAREC);
                map06.put("A3654DESIG", lst.LIS_COUPNS.get(vi).A3654DESIG);
                map06.put("A3654PREME", lst.LIS_COUPNS.get(vi).A3654PREME);
                map06.put("A3654CORRL", lst.LIS_COUPNS.get(vi).A3654CORRL);
                map06.put("A3654REGIS", lst.LIS_COUPNS.get(vi).A3654REGIS);
                map06.put("A3654FREGI", lst.LIS_COUPNS.get(vi).A3654FREGI);
                map06.put("A3654MONTO", lst.LIS_COUPNS.get(vi).A3654MONTO);

                lsta_COUPNS.add(map06);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_HISTORY">
            for (int vi = 0; vi < lst.LIS_HISTORY.size(); ++vi) {
                map07 = new HashMap<>();

                map07.put("A3655CCUST", lst.LIS_HISTORY.get(vi).A3655CCUST);
                map07.put("A3655CIA", lst.LIS_HISTORY.get(vi).A3655CIA);
                map07.put("A3655FORMA", lst.LIS_HISTORY.get(vi).A3655FORMA);
                map07.put("A3655SERIE", lst.LIS_HISTORY.get(vi).A3655SERIE);
                map07.put("A3655SEQ", lst.LIS_HISTORY.get(vi).A3655SEQ);
                map07.put("A3655CPN", lst.LIS_HISTORY.get(vi).A3655CPN);
                map07.put("A3655PROVI", lst.LIS_HISTORY.get(vi).A3655PROVI);
                map07.put("A3655WORKL", lst.LIS_HISTORY.get(vi).A3655WORKL);
                map07.put("A3655HOMEL", lst.LIS_HISTORY.get(vi).A3655HOMEL);
                map07.put("A3655DATE", lst.LIS_HISTORY.get(vi).A3655DATE);

                map07.put("A3655HDAT1", lst.LIS_HISTORY.get(vi).A3655HDAT1);
                map07.put("A3655INPUT", lst.LIS_HISTORY.get(vi).A3655INPUT);
                map07.put("A3655SUPPO", lst.LIS_HISTORY.get(vi).A3655SUPPO);
                map07.put("A3655OLDRE", lst.LIS_HISTORY.get(vi).A3655OLDRE);
                map07.put("A3655PURGE", lst.LIS_HISTORY.get(vi).A3655PURGE);
                map07.put("A3655STATU", lst.LIS_HISTORY.get(vi).A3655STATU);
                map07.put("A3655CHIST", lst.LIS_HISTORY.get(vi).A3655CHIST);
                map07.put("A3655PREME", lst.LIS_HISTORY.get(vi).A3655PREME);
                map07.put("A3655CORRL", lst.LIS_HISTORY.get(vi).A3655CORRL);
                map07.put("A3655TYPE", lst.LIS_HISTORY.get(vi).A3655TYPE);
                map07.put("A3655REGIS", lst.LIS_HISTORY.get(vi).A3655REGIS);
                map07.put("A3655FREGI", lst.LIS_HISTORY.get(vi).A3655FREGI);
                map07.put("A3655HREGI", lst.LIS_HISTORY.get(vi).A3655HREGI);

                lsta_HISTORY.add(map07);
            }
            // </editor-fold>
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_RAZON", lst_RAZON);
        map.put("lsta_TAXESAGEN", lsta_TAXESAGEN);
        map.put("lsta_TAXESAM", lsta_TAXESAM);
        map.put("lsta_Card", lsta_Card);
        map.put("lsta_COUPNS", lsta_COUPNS);
        map.put("lsta_HISTORY", lsta_HISTORY);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaDeleteTAXManual")
    public @ResponseBody
    String ProcesaDeleteTAXManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        A3652Filter filter = new A3652Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaDeleteTAXManual(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

}
