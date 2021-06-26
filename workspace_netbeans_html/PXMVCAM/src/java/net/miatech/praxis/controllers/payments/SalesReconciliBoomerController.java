/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SalesReconciliBoomerLogic;
import net.miatech.praxis.payment.filter.A2324Filter;
import net.miatech.praxis.payment.filter.A2318Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/SalesReconciliBoomer")
public class SalesReconciliBoomerController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesReconciliBoomerLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SalesReconciliBoomer/form_index";
    }

    @RequestMapping(value = "searchSummary")
    public @ResponseBody
    String searchSummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchSummary-------------");

        map.put("success", true);
        List<A2324Filter> lst = this.getListSummary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2324Filter> getListSummary(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter = new A2324Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX559SQP04019(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSummaryHeader")
    public @ResponseBody
    String searchSummaryHeader(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchSummaryHeader-------------");

        map.put("success", true);
        List<A2318Filter> lst = this.getListSummaryHeader(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2318Filter> getListSummaryHeader(HttpServletRequest request, Boolean bExcel) {

        List<A2318Filter> lst = new ArrayList<>(0);
        A2318Filter filter = new A2318Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2318Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX559SQP03991(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetHeader")
    public @ResponseBody
    String searchDetHeader(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchDetHeader-------------");
        HashMap<String, List<A2318Filter>> hmResultado = new HashMap<String, List<A2318Filter>>();
        
        map.put("success", true);
        hmResultado = this.getListSummaryDetailHeader(request, false);
        List<A2318Filter> lst = hmResultado.get("DATA");
        List<A2318Filter> lstTotal  = hmResultado.get("TOTAL");
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstTotal", lstTotal);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<A2318Filter>> getListSummaryDetailHeader(HttpServletRequest request, Boolean bExcel) {
        
        HashMap<String, List<A2318Filter>> lst = new HashMap<String, List<A2318Filter>>();
        A2318Filter filter = new A2318Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2318Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX559SQP03992(filter);
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : Search-------------");

        map.put("success", true);
        List<A2324Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2324Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter = new A2324Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX559SQP04021(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByPNR")
    public @ResponseBody
    String searchByPNR(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            List<A2324Filter> lst = this.getListByPNR(request, false);

            map.put("success", true);
            map.put("data", lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    public List<A2324Filter> getListByPNR(HttpServletRequest request, Boolean bExcel) {

        List<A2324Filter> lst = new ArrayList<>(0);
        A2324Filter filter;
        Gson gson = new Gson();
        String beanString;

        try {
            logic = new SalesReconciliBoomerLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2324Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            lst = logic.loadPX559SQP04020(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

}
