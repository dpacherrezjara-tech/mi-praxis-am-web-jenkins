/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.async.Callback;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.ReportTaxA1530Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingTaxdetailFormLogic;
import org.apache.log4j.Logger;
import org.json.JSONObject;
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
@RequestMapping("/AccountingTaxdetailForm")
public class AccountingTaxdetailFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingTaxdetailFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<ReportTaxA1530Filter> lst;
        ReportTaxA1530Filter filter = new ReportTaxA1530Filter();

        try {
            logic = new AccountingTaxdetailFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            filter.Opcion = request.getParameter("Opcion");
            filter.SALES = request.getParameter("SALES");
            filter.BANK = request.getParameter("BANK");
            filter.Tax = request.getParameter("Tax");
            filter.CONTABLE = request.getParameter("CONTABLE");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.DateFrom = request.getParameter("DateFrom");
            filter.DateTo = request.getParameter("DateTo");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.IATA = request.getParameter("IATA");
            filter.Currency = request.getParameter("Currency");
            filter.COUNTRYTAX = request.getParameter("COUNTRYTAX");

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.loadPXReportTax1530(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "sendReport")
    public @ResponseBody
    String sendReport(ModelMap map, HttpServletRequest request) {
        String result = "";
        ReportTaxA1530Filter filter = new ReportTaxA1530Filter();

        try {
            filter.CorreoPri = request.getParameter("CorreoPri");
            filter.CorreoCopi = request.getParameter("CorreoCopi");
            filter.Opcion = request.getParameter("Opcion");
            filter.SALES = request.getParameter("SALES");
            filter.BANK = request.getParameter("BANK");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.Tax = request.getParameter("Tax");
            filter.CONTABLE = request.getParameter("CONTABLE");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.DateFrom = request.getParameter("DateFrom");
            filter.DateTo = request.getParameter("DateTo");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.IATA = request.getParameter("IATA");
            filter.Currency = request.getParameter("Currency");
            filter.COUNTRYTAX = request.getParameter("COUNTRYTAX");

            result = upload_s3(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String upload_s3(ReportTaxA1530Filter filter) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_API_PRAXIS").toString();
        String context = "";//serverSession.getUserView().getUserInfo().CONTEXT;
        String usr = serverSession.getServerSession().getUserView().getUserInfo().USR;
        String pass = serverSession.getServerSession().getUserView().getUserInfo().TOKEN;

        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);

        Map<String, Object> queryParams = new HashMap<>();
        queryParams.put("V_CCUST", "139");
        queryParams.put("V_BUSCARPOR", filter.Opcion);
        queryParams.put("V_FECINI", filter.DateFrom);
        queryParams.put("V_FECFIN", filter.DateTo);
        queryParams.put("V_IDCON", filter.CONTABLE);
        queryParams.put("V_TIPOTAX", filter.Tax);
        queryParams.put("V_GRUPO", filter.GRUPO);
        queryParams.put("V_TIPOFUENT", filter.SALES);
        queryParams.put("V_MDA", filter.Currency);
        queryParams.put("V_COUNTRY", filter.COUNTRY);
        queryParams.put("V_BANCO", filter.BANK);
        queryParams.put("V_AGENTE", filter.IATA);
        queryParams.put("V_CHANEL", filter.CHANNEL);
        queryParams.put("V_ATO", filter.ATO);
        queryParams.put("V_COUNTRY_TAX", filter.COUNTRYTAX);
        queryParams.put("to_emails", filter.CorreoPri);
        queryParams.put("cc_emails", filter.CorreoCopi);
        queryParams.put("domain", context);
        queryParams.put("IN_USER", usr);
        queryParams.put("IN_PWD", pass);

        HttpResponse<JsonNode> response = Unirest.get(urlREST.trim() + "/accounting-tax-detail/report").queryString(queryParams).asJson();
        JsonNode body = response.getBody();
        // Extrae los datos específicos del JSON
        JSONObject jsonObject = body.getObject();
        String status = jsonObject.getString("status");
        String error_code = "0";//response.getBody().getObject().get("error_code").toString();
        String error_msg;
        if (status.equals("success")) {
            error_msg = jsonObject.getString("message");//response.getBody().getObject().get("error_msg").toString();
        } else {
            error_msg = jsonObject.getString("message");//response.getBody().getObject().get("error_msg").toString();
        }
        return error_msg;

    }

}
