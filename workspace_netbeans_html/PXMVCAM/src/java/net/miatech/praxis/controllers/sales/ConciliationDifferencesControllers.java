/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP04369Filter;
import net.miatech.beans.SQP04370ASRBYTRXFilter;
import net.miatech.beans.SQP04370ASRFilter;
import net.miatech.beans.SQP04370Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConciliationDifferencesLogic;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/ConciliationDifferences")
public class ConciliationDifferencesControllers extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ConciliationDifferencesLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04370Filter> lst = new ArrayList<>(0);
        SQP04370Filter filter = new SQP04370Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER");
            filter.IN_FPRDA_FROM = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA_TO = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadSQP04370Filter(filter);
//            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("total", lst.size());
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "searchASR")
    public @ResponseBody
    String searchASR(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04370ASRFilter> lst = new ArrayList<>(0);
        SQP04370Filter filter = new SQP04370Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER");
            filter.IN_FPRDA_FROM = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA_TO = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadSQP04370ASRFilter(filter);
//            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("total", lst.size());
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "searchASRTRX")
    public @ResponseBody
    String searchASRTRX(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04370ASRBYTRXFilter> lst = new ArrayList<>(0);
        SQP04370Filter filter = new SQP04370Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER");
            filter.IN_FPRDA_FROM = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA_TO = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadSQP04370ASRBYTRXFilter(filter);
//            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("total", lst.size());
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04369Filter> lst = new ArrayList<>(0);
        SQP04369Filter filter = new SQP04369Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FPRDA1 = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA2 = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");
            filter.IN_IDFIL = request.getParameter("IN_IDFIL");
            filter.IN_STATUS = request.getParameter("IN_STATUS");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.loadSQP04369Filter(filter);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }
}
