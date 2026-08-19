/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.screens;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.IMF111Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.screens.Dashboard01Logic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF053Filter;
import net.miatech.beans.PX228S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libcust.A005wr;
import net.miatech.libcust.A051wr;
import net.miatech.praxis.A005;
import net.miatech.praxis.A051;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.flown.AccountingCalendarController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.A1790;
import net.miatech.praxis.interline.filter.IMF117Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.praxis.logic.flown.AccountingCalendarLogic;
import net.miatech.praxis.logic.tnu.AtlSalesUseMonthlyBalanceLogic;
import net.miatech.utils.ExportSchema;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author jtorres
 */
@Controller
@Scope("request")
@RequestMapping("/Dashboard01")
public class Dashboard01Controller extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private Dashboard01Logic logic;
    private MasterDAO masterDAO;

    // =========================================================================
    // ========================== SALES ANALYSIS ========================================
    // =========================================================================
    @RequestMapping(value = "searchTest")
    public @ResponseBody
    String searchTest(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        Map<Byte, List<DashboardFilter>> mapData = new HashMap<Byte, List<DashboardFilter>>(0);
        Gson gson = new Gson();
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            mapData = logic.obtaingData(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData", mapData);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDDTpMCountryofSale")
    public @ResponseBody
    String loadDDTpMCountryofSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadDDTpMCountryofSale-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListAvisos(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListAvisos(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00641(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadDDTpMAgent")
    public @ResponseBody
    String loadDDTpMAgent(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadDDTpMAgent-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListAgent(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListAgent(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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
            if (!filter.ALLIC.trim().isEmpty()) {
                lst = logic.loadPX109SQP00642(filter);
            } else {
                lst = logic.loadPX109SQP01540(filter);
            }

//            lst = logic.loadPX109SQP00641(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* Country of Sale *************************************
    @RequestMapping(value = "loadCountryOfSale")
    public @ResponseBody
    String loadCountryOfSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCountryofSale-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListCountryofSale(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListCountryofSale(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00644(filter, "COUNTRY");

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* Flown Analysis *************************************
    @RequestMapping(value = "loadFAMonth")
    public @ResponseBody
    String loadFAMonth(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadFAMonth-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListFAMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1971Filter> getListFAMonth(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchWK")
    public @ResponseBody
    String searchWK(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchWK-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchWK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchWK(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP01927(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchWKperMonth")
    public @ResponseBody
    String searchWKperMonth(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchWK-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchWKperMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchWKperMonth(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP01927M(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFlownByMonth")
    public @ResponseBody
    String searchFlownByMonth(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownByMonth-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownByMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchFlownByMonth(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556MT(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFlownOnOff")
    public @ResponseBody
    String searchFlownOnOff(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownOnOff-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownOnOff(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchFlownOnOff(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556NF(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFlownByZone")
    public @ResponseBody
    String searchFlownByZone(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownByZone-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownByZone(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchFlownByZone(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556ZN(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFlownByCarrier")
    public @ResponseBody
    String searchFlownByCarrier(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownByCarrier-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownByCarrier(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchFlownByCarrier(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556CA(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFlownFlight")
    public @ResponseBody
    String searchFlownFlight(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownFlight-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListFlownFlight(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListFlownFlight(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP01130(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* City of Sale ****************************************
    @RequestMapping(value = "loadCityOfSale")
    public @ResponseBody
    String loadCityOfSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCityOfSale-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListCityOfSale(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListCityOfSale(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00644(filter, "CITY");

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* Alliances *******************************************
    @RequestMapping(value = "loadAlliances")
    public @ResponseBody
    String loadAlliances(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadAlliances-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListAlliances(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListAlliances(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00988(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadDetAlliances")
    public @ResponseBody
    String loadDetAlliances(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01518(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetPaisAlliances")
    public @ResponseBody
    String loadDetPaisAlliances(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP00641(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetAgenteAlliances")
    public @ResponseBody
    String loadDetAgenteAlliances(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01540(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadSalesByTransaction")
    public @ResponseBody
    String loadSalesByTransaction(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : loadSalesByTransaction-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListSalesByTransaction(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<DashboardFilter> getListSalesByTransaction(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP04921(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSXSalesByTransaction")
    public @ResponseBody
    void getXLSXSalesByTransaction(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Dashboard01  : getXLSXSalesByTransaction");

        String fileNameDownload = String.format("Sales By Transaction - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<DashboardFilter> listaData = this.getListSalesByTransaction(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleSALE = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleEXCH = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleRFND = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleAADM = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleAACM = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            totalStyleSALE.setFillForegroundColor(new XSSFColor(new java.awt.Color(213, 244, 213)));
            totalStyleSALE.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyleEXCH.setFillForegroundColor(new XSSFColor(new java.awt.Color(213, 240, 244)));
            totalStyleEXCH.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyleRFND.setFillForegroundColor(new XSSFColor(new java.awt.Color(244, 213, 213)));
            totalStyleRFND.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyleAADM.setFillForegroundColor(new XSSFColor(new java.awt.Color(241, 244, 213)));
            totalStyleAADM.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyleAACM.setFillForegroundColor(new XSSFColor(new java.awt.Color(225, 213, 245)));
            totalStyleAACM.setFillPattern(CellStyle.SOLID_FOREGROUND);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================
            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Total SALES");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("Total EXCH");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("Total RFND");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("Total ADM");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("Total ACM");
            CH1_11.setCellValue("");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Tickets");
            CH2_2.setCellValue("USD");
            CH2_3.setCellValue("%");
            CH2_4.setCellValue("Tickets");
            CH2_5.setCellValue("USD");
            CH2_6.setCellValue("Tickets");
            CH2_7.setCellValue("USD");
            CH2_8.setCellValue("Tickets");
            CH2_9.setCellValue("USD");
            CH2_10.setCellValue("Tickets");
            CH2_11.setCellValue("USD");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).SALETKT);
                rcell2.setCellValue(listaData.get(vi).SALEUSD);
                rcell3.setCellValue(listaData.get(vi).AMOUNT_SALES_PERCENT);
                rcell4.setCellValue(listaData.get(vi).EXCHTKT);
                rcell5.setCellValue(listaData.get(vi).EXCHUSD);
                rcell6.setCellValue(listaData.get(vi).RFNDTKT);
                rcell7.setCellValue(listaData.get(vi).RFNDUSD);
                rcell8.setCellValue(listaData.get(vi).AADMTKT);
                rcell9.setCellValue(listaData.get(vi).AADMUSD);
                rcell10.setCellValue(listaData.get(vi).AACMTKT);
                rcell11.setCellValue(listaData.get(vi).AACMUSD);
//                if (listaData.get(vi).CERROR.equals("01")) {
//                    rcell3.setCellStyle(bodyStyle);
//                }

                rcell1.setCellStyle(totalStyleSALE);
                rcell2.setCellStyle(totalStyleSALE);
                rcell3.setCellStyle(totalStyleSALE);
                rcell4.setCellStyle(totalStyleEXCH);
                rcell5.setCellStyle(totalStyleEXCH);
                rcell6.setCellStyle(totalStyleRFND);
                rcell7.setCellStyle(totalStyleRFND);
                rcell8.setCellStyle(totalStyleAADM);
                rcell9.setCellStyle(totalStyleAADM);
                rcell10.setCellStyle(totalStyleAACM);
                rcell11.setCellStyle(totalStyleAACM);

                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);

            CH1_0_T.setCellValue("Totales");
            CH1_1_T.setCellValue(listaData.get(0).SALETKT);
            CH1_2_T.setCellValue(listaData.get(0).SALEUSD);
            CH1_3_T.setCellValue("100%");
            CH1_4_T.setCellValue(listaData.get(0).EXCHTKT);
            CH1_5_T.setCellValue(listaData.get(0).EXCHUSD);
            CH1_6_T.setCellValue(listaData.get(0).RFNDTKT);
            CH1_7_T.setCellValue(listaData.get(0).RFNDUSD);
            CH1_8_T.setCellValue(listaData.get(0).AADMTKT);
            CH1_9_T.setCellValue(listaData.get(0).AADMUSD);
            CH1_10_T.setCellValue(listaData.get(0).AACMTKT);
            CH1_11_T.setCellValue(listaData.get(0).AACMUSD);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXFORE")
    public @ResponseBody
    void getXLSXFORE(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Dashboard01  : getXLSXFORE");

        String fileNameDownload = String.format("Forecast By Month - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF117Filter> listaData = this.getListFORE(request, true);
            List<IMF117Filter> listaData1 = this.getListFOREDown(request, true);
            System.out.println("Tamaño de lista devuelta Fore: " + listaData.size() + " + lista Fore Down: " +  listaData1.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleSALE = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleEXCH = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleRFND = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleAADM = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleAACM = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            totalStyleSALE.setFillForegroundColor(new XSSFColor(new java.awt.Color(187, 228, 252)));
            totalStyleSALE.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyleSALE.setBorderRight(CellStyle.BORDER_THIN);
            totalStyleSALE.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleSALE.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyleSALE.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleSALE.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyleSALE.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleSALE.setBorderTop(CellStyle.BORDER_THIN);
            totalStyleSALE.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0;
            Integer vk = 0;
            Integer vl = 0;
            Iterator iter = listaData.iterator();
            Iterator iter1 = listaData1.iterator();
            // ====== CREANDO TITULOS ======================================
            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);

            if (!listaData.get(vi).DSALES1.equals("")) {
                CH1_0.setCellValue(listaData.get(vi).DSALES1);
            }
            if (!listaData.get(vi).DSALES2.equals("")) {
                CH1_4.setCellValue(listaData.get(vi).DSALES2);
            }
            if (!listaData.get(vi).DSALES3.equals("")) {
                CH1_8.setCellValue(listaData.get(vi).DSALES3);
            }
            if (!listaData.get(vi).DSALES4.equals("")) {
                CH1_12.setCellValue(listaData.get(vi).DSALES4);
            }
            if (!listaData.get(vi).DSALES5.equals("")) {
                CH1_16.setCellValue(listaData.get(vi).DSALES5);
            }

            if (!listaData.get(vi).DSALES1.equals("")) {
                CH1_0.setCellStyle(headerStyle);
                CH1_1.setCellStyle(headerStyle);
                CH1_2.setCellStyle(headerStyle);
                CH1_3.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES2.equals("")) {
                CH1_4.setCellStyle(headerStyle);
                CH1_5.setCellStyle(headerStyle);
                CH1_6.setCellStyle(headerStyle);
                CH1_7.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES3.equals("")) {
                CH1_8.setCellStyle(headerStyle);
                CH1_9.setCellStyle(headerStyle);
                CH1_10.setCellStyle(headerStyle);
                CH1_11.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES4.equals("")) {
                CH1_12.setCellStyle(headerStyle);
                CH1_13.setCellStyle(headerStyle);
                CH1_14.setCellStyle(headerStyle);
                CH1_15.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES5.equals("")) {
                CH1_16.setCellStyle(headerStyle);
                CH1_17.setCellStyle(headerStyle);
                CH1_18.setCellStyle(headerStyle);
                CH1_19.setCellStyle(headerStyle);
            }

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 19));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);

            if (!listaData.get(vi).DSALES1.equals("")) {
                CH2_0.setCellValue("Sales");
                CH2_1.setCellValue(listaData.get(vi).QTYS1);
                CH2_3.setCellValue(listaData.get(vi).AMOS1);
            }
            if (!listaData.get(vi).DSALES2.equals("")) {
                CH2_4.setCellValue("Sales");
                CH2_5.setCellValue(listaData.get(vi).QTYS2);
                CH2_7.setCellValue(listaData.get(vi).AMOS2);
            }
            if (!listaData.get(vi).DSALES3.equals("")) {
                CH2_8.setCellValue("Sales");
                CH2_9.setCellValue(listaData.get(vi).QTYS3);
                CH2_11.setCellValue(listaData.get(vi).AMOS3);
            }
            if (!listaData.get(vi).DSALES4.equals("")) {
                CH2_12.setCellValue("Sales");
                CH2_13.setCellValue(listaData.get(vi).QTYS4);
                CH2_15.setCellValue(listaData.get(vi).AMOS4);
            }
            if (!listaData.get(vi).DSALES5.equals("")) {
                CH2_16.setCellValue("Sales");
                CH2_17.setCellValue(listaData.get(vi).QTYS5);
                CH2_19.setCellValue(listaData.get(vi).AMOS5);
            }
            if (!listaData.get(vi).DSALES1.equals("")) {
                CH2_0.setCellStyle(headerStyle);
                CH2_1.setCellStyle(headerStyle);
                CH2_2.setCellStyle(headerStyle);
                CH2_3.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES2.equals("")) {
                CH2_4.setCellStyle(headerStyle);
                CH2_5.setCellStyle(headerStyle);
                CH2_6.setCellStyle(headerStyle);
                CH2_7.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES3.equals("")) {
                CH2_8.setCellStyle(headerStyle);
                CH2_9.setCellStyle(headerStyle);
                CH2_10.setCellStyle(headerStyle);
                CH2_11.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES4.equals("")) {
                CH2_12.setCellStyle(headerStyle);
                CH2_13.setCellStyle(headerStyle);
                CH2_14.setCellStyle(headerStyle);
                CH2_15.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES5.equals("")) {
                CH2_16.setCellStyle(headerStyle);
                CH2_17.setCellStyle(headerStyle);
                CH2_18.setCellStyle(headerStyle);
                CH2_19.setCellStyle(headerStyle);
            }

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);
            Cell CH3_19 = row3.createCell(19);

            if (!listaData.get(vi).DSALES1.equals("")) {
                CH3_0.setCellValue("Flight Date");
                CH3_1.setCellValue("Coupons");
                CH3_2.setCellValue("%");
                CH3_3.setCellValue("Amount");
            }
            if (!listaData.get(vi).DSALES2.equals("")) {
                CH3_4.setCellValue("Flight Date");
                CH3_5.setCellValue("Coupons");
                CH3_6.setCellValue("%");
                CH3_7.setCellValue("Amount");
            }
            if (!listaData.get(vi).DSALES3.equals("")) {
                CH3_8.setCellValue("Flight Date");
                CH3_9.setCellValue("Coupons");
                CH3_10.setCellValue("%");
                CH3_11.setCellValue("Amount");
            }
            if (!listaData.get(vi).DSALES4.equals("")) {
                CH3_12.setCellValue("Flight Date");
                CH3_13.setCellValue("Coupons");
                CH3_14.setCellValue("%");
                CH3_15.setCellValue("Amount");
            }
            if (!listaData.get(vi).DSALES5.equals("")) {
                CH3_16.setCellValue("Flight Date");
                CH3_17.setCellValue("Coupons");
                CH3_18.setCellValue("%");
                CH3_19.setCellValue("Amount");
            }

            if (!listaData.get(vi).DSALES1.equals("")) {
                CH3_0.setCellStyle(headerStyle);
                CH3_1.setCellStyle(headerStyle);
                CH3_2.setCellStyle(headerStyle);
                CH3_3.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES2.equals("")) {
                CH3_4.setCellStyle(headerStyle);
                CH3_5.setCellStyle(headerStyle);
                CH3_6.setCellStyle(headerStyle);
                CH3_7.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES3.equals("")) {
                CH3_8.setCellStyle(headerStyle);
                CH3_9.setCellStyle(headerStyle);
                CH3_10.setCellStyle(headerStyle);
                CH3_11.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES4.equals("")) {
                CH3_12.setCellStyle(headerStyle);
                CH3_13.setCellStyle(headerStyle);
                CH3_14.setCellStyle(headerStyle);
                CH3_15.setCellStyle(headerStyle);
            }
            if (!listaData.get(vi).DSALES5.equals("")) {
                CH3_16.setCellStyle(headerStyle);
                CH3_17.setCellStyle(headerStyle);
                CH3_18.setCellStyle(headerStyle);
                CH3_19.setCellStyle(headerStyle);
            }

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 19, 19));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);

                if (!listaData.get(vi).DSALES1.equals("")) {
                    rcell0.setCellValue(listaData.get(vi).DFLIGHT1);
                    rcell1.setCellValue(listaData.get(vi).QTYFLY1);
                    rcell2.setCellValue(listaData.get(vi).QTYS1_PERCENT);
                    rcell3.setCellValue(listaData.get(vi).FLYAMO1);
                }
                if (!listaData.get(vi).DSALES2.equals("")) {
                    rcell4.setCellValue(listaData.get(vi).DFLIGHT2);
                    rcell5.setCellValue(listaData.get(vi).QTYFLY2);
                    rcell6.setCellValue(listaData.get(vi).QTYS2_PERCENT);
                    rcell7.setCellValue(listaData.get(vi).FLYAMO2);
                }
                if (!listaData.get(vi).DSALES3.equals("")) {
                    rcell8.setCellValue(listaData.get(vi).DFLIGHT3);
                    rcell9.setCellValue(listaData.get(vi).QTYFLY3);
                    rcell10.setCellValue(listaData.get(vi).QTYS3_PERCENT);
                    rcell11.setCellValue(listaData.get(vi).FLYAMO3);
                }
                if (!listaData.get(vi).DSALES4.equals("")) {
                    rcell12.setCellValue(listaData.get(vi).DFLIGHT4);
                    rcell13.setCellValue(listaData.get(vi).QTYFLY4);
                    rcell14.setCellValue(listaData.get(vi).QTYS4_PERCENT);
                    rcell15.setCellValue(listaData.get(vi).FLYAMO4);
                }
                if (!listaData.get(vi).DSALES5.equals("")) {
                    rcell16.setCellValue(listaData.get(vi).DFLIGHT5);
                    rcell17.setCellValue(listaData.get(vi).QTYFLY5);
                    rcell18.setCellValue(listaData.get(vi).QTYS5_PERCENT);
                    rcell19.setCellValue(listaData.get(vi).FLYAMO5);
                }

                if (!listaData.get(vi).DSALES1.equals("")) {
                    rcell0.setCellStyle(bodyStyle);
                    rcell1.setCellStyle(bodyStyle);
                    rcell2.setCellStyle(bodyStyle);
                    rcell3.setCellStyle(bodyStyle);
                }
                if (!listaData.get(vi).DSALES2.equals("")) {
                    rcell4.setCellStyle(totalStyleSALE);
                    rcell5.setCellStyle(totalStyleSALE);
                    rcell6.setCellStyle(totalStyleSALE);
                    rcell7.setCellStyle(totalStyleSALE);
                }
                if (!listaData.get(vi).DSALES3.equals("")) {
                    rcell8.setCellStyle(bodyStyle);
                    rcell9.setCellStyle(bodyStyle);
                    rcell10.setCellStyle(bodyStyle);
                    rcell11.setCellStyle(bodyStyle);
                }
                if (!listaData.get(vi).DSALES4.equals("")) {
                    rcell12.setCellStyle(totalStyleSALE);
                    rcell13.setCellStyle(totalStyleSALE);
                    rcell14.setCellStyle(totalStyleSALE);
                    rcell15.setCellStyle(totalStyleSALE);
                }
                if (!listaData.get(vi).DSALES5.equals("")) {
                    rcell16.setCellStyle(bodyStyle);
                    rcell17.setCellStyle(bodyStyle);
                    rcell18.setCellStyle(bodyStyle);
                    rcell19.setCellStyle(bodyStyle);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);

            if (!listaData.get(0).DSALES1.equals("")) {
                CH1_0_T.setCellValue("Total");
                CH1_1_T.setCellValue(listaData.get(0).TOT_CPN1);
                CH1_2_T.setCellValue(listaData.get(0).TOT_QTYS1_PERCENT);
                CH1_3_T.setCellValue(listaData.get(0).TOT_AMT1);
            }
            if (!listaData.get(0).DSALES2.equals("")) {
                CH1_4_T.setCellValue("Total");
                CH1_5_T.setCellValue(listaData.get(0).TOT_CPN2);
                CH1_6_T.setCellValue(listaData.get(0).TOT_QTYS2_PERCENT);
                CH1_7_T.setCellValue(listaData.get(0).TOT_AMT2);
            }
            if (!listaData.get(0).DSALES3.equals("")) {
                CH1_8_T.setCellValue("Total");
                CH1_9_T.setCellValue(listaData.get(0).TOT_CPN3);
                CH1_10_T.setCellValue(listaData.get(0).TOT_QTYS3_PERCENT);
                CH1_11_T.setCellValue(listaData.get(0).TOT_AMT3);
            }
            if (!listaData.get(0).DSALES4.equals("")) {
                CH1_12_T.setCellValue("Total");
                CH1_13_T.setCellValue(listaData.get(0).TOT_CPN4);
                CH1_14_T.setCellValue(listaData.get(0).TOT_QTYS4_PERCENT);
                CH1_15_T.setCellValue(listaData.get(0).TOT_AMT4);
            }
            if (!listaData.get(0).DSALES5.equals("")) {
                CH1_16_T.setCellValue("Total");
                CH1_17_T.setCellValue(listaData.get(0).TOT_CPN5);
                CH1_18_T.setCellValue(listaData.get(0).TOT_QTYS5_PERCENT);
                CH1_19_T.setCellValue(listaData.get(0).TOT_AMT5);
            }

            if (!listaData.get(0).DSALES1.equals("")) {
                CH1_0_T.setCellStyle(totalStyle);
                CH1_1_T.setCellStyle(totalStyle);
                CH1_2_T.setCellStyle(totalStyle);
                CH1_3_T.setCellStyle(totalStyle);
            }
            if (!listaData.get(0).DSALES2.equals("")) {
                CH1_4_T.setCellStyle(totalStyle);
                CH1_5_T.setCellStyle(totalStyle);
                CH1_6_T.setCellStyle(totalStyle);
                CH1_7_T.setCellStyle(totalStyle);
            }
            if (!listaData.get(0).DSALES3.equals("")) {
                CH1_8_T.setCellStyle(totalStyle);
                CH1_9_T.setCellStyle(totalStyle);
                CH1_10_T.setCellStyle(totalStyle);
                CH1_11_T.setCellStyle(totalStyle);
            }
            if (!listaData.get(0).DSALES4.equals("")) {
                CH1_12_T.setCellStyle(totalStyle);
                CH1_13_T.setCellStyle(totalStyle);
                CH1_14_T.setCellStyle(totalStyle);
                CH1_15_T.setCellStyle(totalStyle);
            }
            if (!listaData.get(0).DSALES5.equals("")) {
                CH1_16_T.setCellStyle(totalStyle);
                CH1_17_T.setCellStyle(totalStyle);
                CH1_18_T.setCellStyle(totalStyle);
                CH1_19_T.setCellStyle(totalStyle);
            }

            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            vk = vj + 2;
            // ======  Nivel 1 ==========
            Row row11 = sheet.createRow(vk);
            Cell CH1_01D = row11.createCell(0);
            Cell CH1_11D = row11.createCell(1);
            Cell CH1_21D = row11.createCell(2);
            Cell CH1_31D = row11.createCell(3);
            Cell CH1_41D = row11.createCell(4);
            Cell CH1_51D = row11.createCell(5);
            Cell CH1_61D = row11.createCell(6);
            Cell CH1_71D = row11.createCell(7);
            Cell CH1_81D = row11.createCell(8);
            Cell CH1_91D = row11.createCell(9);
            Cell CH1_101D = row11.createCell(10);
            Cell CH1_111D = row11.createCell(11);
            Cell CH1_121D = row11.createCell(12);
            Cell CH1_131D = row11.createCell(13);
            Cell CH1_141D = row11.createCell(14);
            Cell CH1_151D = row11.createCell(15);
            Cell CH1_161D = row11.createCell(16);
            Cell CH1_171D = row11.createCell(17);
            Cell CH1_181D = row11.createCell(18);
            Cell CH1_191D = row11.createCell(19);

            if (!listaData.get(0).DSALES1.equals("")) {
                CH1_01D.setCellValue("Used");
                CH1_11D.setCellValue("Coupons");
                CH1_21D.setCellValue("%");
                CH1_31D.setCellValue("Amount");
            }
            if (!listaData.get(0).DSALES2.equals("")) {
                CH1_41D.setCellValue("Used");
                CH1_51D.setCellValue("Coupons");
                CH1_61D.setCellValue("%");
                CH1_71D.setCellValue("Amount");
            }
            if (!listaData.get(0).DSALES3.equals("")) {
                CH1_81D.setCellValue("Used");
                CH1_91D.setCellValue("Coupons");
                CH1_101D.setCellValue("%");
                CH1_111D.setCellValue("Amount");
            }
            if (!listaData.get(0).DSALES4.equals("")) {
                CH1_121D.setCellValue("Used");
                CH1_131D.setCellValue("Coupons");
                CH1_141D.setCellValue("%");
                CH1_151D.setCellValue("Amount");
            }
            if (!listaData.get(0).DSALES5.equals("")) {
                CH1_161D.setCellValue("Used");
                CH1_171D.setCellValue("Coupons");
                CH1_181D.setCellValue("%");
                CH1_191D.setCellValue("Amount");
            }

            if (!listaData.get(0).DSALES1.equals("")) {
                CH1_01D.setCellStyle(headerStyle);
                CH1_11D.setCellStyle(headerStyle);
                CH1_21D.setCellStyle(headerStyle);
                CH1_31D.setCellStyle(headerStyle);
            }
            if (!listaData.get(0).DSALES2.equals("")) {
                CH1_41D.setCellStyle(headerStyle);
                CH1_51D.setCellStyle(headerStyle);
                CH1_61D.setCellStyle(headerStyle);
                CH1_71D.setCellStyle(headerStyle);
            }
            if (!listaData.get(0).DSALES3.equals("")) {
                CH1_81D.setCellStyle(headerStyle);
                CH1_91D.setCellStyle(headerStyle);
                CH1_101D.setCellStyle(headerStyle);
                CH1_111D.setCellStyle(headerStyle);
            }
            if (!listaData.get(0).DSALES4.equals("")) {
                CH1_121D.setCellStyle(headerStyle);
                CH1_131D.setCellStyle(headerStyle);
                CH1_141D.setCellStyle(headerStyle);
                CH1_151D.setCellStyle(headerStyle);
            }
            if (!listaData.get(0).DSALES5.equals("")) {
                CH1_161D.setCellStyle(headerStyle);
                CH1_171D.setCellStyle(headerStyle);
                CH1_181D.setCellStyle(headerStyle);
                CH1_191D.setCellStyle(headerStyle);
            }

            sheet.addMergedRegion(new CellRangeAddress(17, 17, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 19, 19));
            ++vk;
            //============================================

            while (iter1.hasNext()) {
                row11 = sheet.createRow(vk);
                Cell rcell00D = row11.createCell(0);
                Cell rcell11D = row11.createCell(1);
                Cell rcell21D = row11.createCell(2);
                Cell rcell31D = row11.createCell(3);
                Cell rcell41D = row11.createCell(4);
                Cell rcell51D = row11.createCell(5);
                Cell rcell61D = row11.createCell(6);
                Cell rcell71D = row11.createCell(7);
                Cell rcell81D = row11.createCell(8);
                Cell rcell91D = row11.createCell(9);
                Cell rcell101D = row11.createCell(10);
                Cell rcell111D = row11.createCell(11);
                Cell rcell121D = row11.createCell(12);
                Cell rcell131D = row11.createCell(13);
                Cell rcell141D = row11.createCell(14);
                Cell rcell151D = row11.createCell(15);
                Cell rcell161D = row11.createCell(16);
                Cell rcell171D = row11.createCell(17);
                Cell rcell181D = row11.createCell(18);
                Cell rcell191D = row11.createCell(19);

                if (!listaData.get(0).DSALES1.equals("")) {
                    rcell00D.setCellValue(listaData1.get(vl).USED1);
                    rcell11D.setCellValue(listaData1.get(vl).CPNS1);
                    rcell21D.setCellValue(listaData1.get(vl).QTYS1_PERCENT);
                    rcell31D.setCellValue(listaData1.get(vl).AMON1);
                }
                if (!listaData.get(0).DSALES2.equals("")) {
                    rcell41D.setCellValue(listaData1.get(vl).USED2);
                    rcell51D.setCellValue(listaData1.get(vl).CPNS2);
                    rcell61D.setCellValue(listaData1.get(vl).QTYS2_PERCENT);
                    rcell71D.setCellValue(listaData1.get(vl).AMON2);
                }
                if (!listaData.get(0).DSALES3.equals("")) {
                    rcell81D.setCellValue(listaData1.get(vl).USED3);
                    rcell91D.setCellValue(listaData1.get(vl).CPNS3);
                    rcell101D.setCellValue(listaData1.get(vl).QTYS3_PERCENT);
                    rcell111D.setCellValue(listaData1.get(vl).AMON3);
                }
                if (!listaData.get(0).DSALES4.equals("")) {
                    rcell121D.setCellValue(listaData1.get(vl).USED4);
                    rcell131D.setCellValue(listaData1.get(vl).CPNS4);
                    rcell141D.setCellValue(listaData1.get(vl).QTYS4_PERCENT);
                    rcell151D.setCellValue(listaData1.get(vl).AMON4);
                }
                if (!listaData.get(0).DSALES5.equals("")) {
                    rcell161D.setCellValue(listaData1.get(vl).USED5);
                    rcell171D.setCellValue(listaData1.get(vl).CPNS5);
                    rcell181D.setCellValue(listaData1.get(vl).QTYS5_PERCENT);
                    rcell191D.setCellValue(listaData1.get(vl).AMON5);
                }

                if (!listaData.get(0).DSALES1.equals("")) {
                    rcell00D.setCellStyle(bodyStyle);
                    rcell11D.setCellStyle(bodyStyle);
                    rcell21D.setCellStyle(bodyStyle);
                    rcell31D.setCellStyle(bodyStyle);
                }
                if (!listaData.get(0).DSALES2.equals("")) {
                    rcell41D.setCellStyle(totalStyleSALE);
                    rcell51D.setCellStyle(totalStyleSALE);
                    rcell61D.setCellStyle(totalStyleSALE);
                    rcell71D.setCellStyle(totalStyleSALE);
                }
                if (!listaData.get(0).DSALES3.equals("")) {
                    rcell81D.setCellStyle(bodyStyle);
                    rcell91D.setCellStyle(bodyStyle);
                    rcell101D.setCellStyle(bodyStyle);
                    rcell111D.setCellStyle(bodyStyle);
                }
                if (!listaData.get(0).DSALES4.equals("")) {
                    rcell121D.setCellStyle(totalStyleSALE);
                    rcell131D.setCellStyle(totalStyleSALE);
                    rcell141D.setCellStyle(totalStyleSALE);
                    rcell151D.setCellStyle(totalStyleSALE);
                }
                if (!listaData.get(0).DSALES5.equals("")) {
                    rcell161D.setCellStyle(bodyStyle);
                    rcell171D.setCellStyle(bodyStyle);
                    rcell181D.setCellStyle(bodyStyle);
                    rcell191D.setCellStyle(bodyStyle);
                }

                iter1.next();
                ++vl;
                ++vk;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    //******************** Routing Type *******************************************
    @RequestMapping(value = "loadTypeRoute")
    public @ResponseBody
    String loadTypeRoute(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01516(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetTypeRoute")
    public @ResponseBody
    String loadDetTypeRoute(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01519(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

// ===================================== FARE TYPE ========================================================================
    @RequestMapping(value = "loadTypeFare")
    public @ResponseBody
    String loadTypeFare(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01523(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTypeFareCabin")
    public @ResponseBody
    String loadTypeFareCabin(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01533(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTypeFareZone")
    public @ResponseBody
    String loadTypeFareZone(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01982(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetTypeFare")
    public @ResponseBody
    String loadDetTypeFare(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01526(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetTypeFareZona")
    public @ResponseBody
    String loadDetTypeFareZona(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01983(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    /**
     * **********************Charts*****************************************
     */
    @RequestMapping(value = "loadTotalControlTotalChart")
    public @ResponseBody
    String loadTotalControlTotalChart(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadTotalControlTotalChart-------------");
        HashMap hm = null;

        map.put("success", true);
        hm = this.getListTotalControlTotalChart(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", hm.get("lstDetalle"));
        map.put("lstTotales", hm.get("lstTotales"));
        return new Gson().toJson(map);
    }

    public HashMap getListTotalControlTotalChart(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            hm = logic.loadPX109SQP00994(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return hm;
    }

    @RequestMapping(value = "loadChannelsChart")
    public @ResponseBody
    String loadChannelsChart(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        List<DashboardFilter> lstData2;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP00538(filter);
            lstData2 = logic.loadPX109SQP00540(filter);

            map.put("success", true);
            map.put("data", lstData); //lstDataChannelsTotal
            map.put("lstDataChannelsByDate", lstData2);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadCityPair")
    public @ResponseBody
    String loadCityPair(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }

            lstData = logic.loadPX109SQP00645(filter);

            map.put("success", true);
            map.put("data", lstData);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadSalesAgent")
    public @ResponseBody
    String loadSalesAgent(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }

            lstData = logic.loadVentasA1426Agente(filter);

            map.put("success", true);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            map.put("data", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadCabinChart")
    public @ResponseBody
    String loadCabinChart(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP00541(filter);

            map.put("success", true);
            map.put("data", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    //******************** Chart Agent *******************************************
    @RequestMapping(value = "loadAgentChart_3")
    public @ResponseBody
    String loadAgentChart_3(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadVentasA1426Agente_3(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    //******************** GDS *******************************************
    @RequestMapping(value = "loadGDS")
    public @ResponseBody
    String loadGDS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01504(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetGDS")
    public @ResponseBody
    String loadDetGDS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01505(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetGDSAgte")
    public @ResponseBody
    String loadDetGDSAgte(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01538(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetGDSTkt")
    public @ResponseBody
    String loadDetGDSTkt(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A720Filter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01539(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    // ******************* Compare *******************************************
    @RequestMapping(value = "loadCompareSale")
    public @ResponseBody
    String loadCompareSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCompareSale-------------");
        HashMap hm = null;

        map.put("success", true);
        hm = this.getListCompareSale(request, false);

        map.put("data", hm.get("lst1"));
        map.put("lst2", hm.get("lst2"));
        map.put("lst3", hm.get("lst3"));

        return new Gson().toJson(map);
    }

    public HashMap getListCompareSale(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            hm = logic.loadPX109SQP01571(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return hm;
    }

    // ******************* Totals by Cabin *******************************************
    @RequestMapping(value = "loadCabin")
    public @ResponseBody
    String loadCabin(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            if (filter.IN_ONOFF.trim().isEmpty()) {
                lstData = logic.loadPX109SQP00932(filter);
            } else {
                lstData = logic.loadPX109SQP01542(filter);
            }

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetailCabin")
    public @ResponseBody
    String loadDetailCabin(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP00550(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    // ******************* Compare day *******************************************
    @RequestMapping(value = "loadCompareSaleDay")
    public @ResponseBody
    String loadCompareSaleDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCompareSaleDay-------------");
        HashMap hm = null;

        map.put("success", true);
        hm = this.getListCompareSaleDay(request, false);

        map.put("data", hm.get("lst1"));
        map.put("lst2", hm.get("lst2"));
        map.put("lst3", hm.get("lst3"));
        map.put("lst4", hm.get("lst4"));

        return new Gson().toJson(map);
    }

    public HashMap getListCompareSaleDay(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            hm = logic.loadPX109SQP03478(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return hm;
    }

    /**
     * INTERLINEA
     *
     */
    @RequestMapping(value = "searchAnalysis")
    public @ResponseBody
    String searchAnalysis(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<SFI040Filter> lstData;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX237S01SFI040_2(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchInterline")
    public @ResponseBody
    String searchInterline(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A050Filter> lstData;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP00881(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchInterlineByAir")
    public @ResponseBody
    String searchInterlineByAir(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A050Filter> lstData;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP00882(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "obtainDataFilter_WK")
    public @ResponseBody
    String obtainDataFilter_WK(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

//        List<A005wr> lstAerolineas;
        List<A051wr> lstUsos;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            masterDAO = new MasterDAO();
            masterDAO.setSession(this.serverSession.getServerSession());
            List<A005> lstAerolineas = masterDAO.loadAirlines2();

            byte USO = 2;
            List<A051> lstUSO2 = masterDAO.loadUSO(this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY1, USO);

//            logic = new Dashboard01Logic();
//            logic.setSession(this.serverSession.getServerSession());
//            lstUsos = logic.loadUsoswr("");
            map.put("success", true);
            map.put("lstAerolineas", lstAerolineas);
            map.put("data", lstUSO2);
//            map.put("data", lstUsos);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstUsos", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search_WK")
    public @ResponseBody
    String search_WK(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A050Filter> lstData;
        Gson gson = new Gson();
        WRF016Filterwk filter;

        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF016Filterwk.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S01WRF016(filter);

            map.put("success", true);
            map.put("data", hm.get("lst1"));
            map.put("listaData2", hm.get("lst2"));
            map.put("listaRates", hm.get("lstRates"));

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    public String exportFieldsCompleto(HttpServletRequest request, HttpServletResponse response, List<?> lstDataObjects) throws IOException {

        String downloadName = String.format("Reporte_%1$s.xlsx", UUID.randomUUID().toString().toLowerCase());

        ExportSchema filter = new ExportSchema();
        ExportSchema filterTemp = new ExportSchema();
        ArrayList<ExportSchema> listaColRow = new ArrayList<>();

//        String beanString = "{'columns':[{'text':'Sales','columns':[{'text':'Date','dataIndex':'strFormatDate','width':90,'align':'center','listeners':{'click':'viewDetSales_colHandler','args':['MIN']}}]},"
//                + "           {'text':'Totals','columns':[{'text':'Coupons','dataIndex':'QTKTS','width':80,'align':'center','listeners':{'click':'viewDetSales_colHandler','args':['MIN']}}]},"
//                + "           {'text':'Fare','columns':[{'text':'USD','dataIndex':'AMOUNT','width':90,'align':'center'}]},"
//                + "           {'text':'Percent','dataIndex':'perMim','width':70},"
//                + "           {'text':'AVG','dataIndex':'avgMim','width':70}] }";
//        String beanString = "{'columns':[{'text':'Agent','columns':[{'text':'Code','dataIndex':'VENDOR','width':90,'align':'center'},{'text':'Name','dataIndex':'strDescription','width':200,'align':'left'}]},"
//                + "{'text':'Ctry','dataIndex':'COUNTRYS','width':50,'align':'center'},"
//                + "{'text':'Scr','dataIndex':'strDescription2','width':50,'align':'center'},"
//                + "{'text':'Type','dataIndex':'TDOC','width':50,'align':'center'},"
//                + "{'text':'Ticket Number','dataIndex':'TKT','width':120,'align':'center'},"
//                + "{'text':'Date of','columns':[{'text':'Sale','dataIndex':'FEAC','width':90,'align':'center'}]},"
//                + "{'text':'Org - Des','dataIndex':'CITYS','width':80,'align':'center'},"
//                + "{'text':'Miles','dataIndex':'PMP','width':80},"
//                + "{'text':'Cl','dataIndex':'CLASEO','width':30,'align':'center'},"
//                + "{'text':'Fare Basis','dataIndex':'FAREBASE','width':90,'align':'center'},"
//                + "{'text':'Rev. by Miles','columns':[{'text':'Sold','dataIndex':'FACRMI','width':90,'align':'center'}]},"
//                + "{'text':'Fare USD','columns':[{'text':'Sold','columns':[{'text':'Code','dataIndex':'VENDOR','width':90,'align':'center'},{'text':'Name','dataIndex':'strDescription','width':200,'align':'left'}]},{'text':'Min. -50%','dataIndex':'VALORMIN','width':80},{'text':'Normal(Est)','dataIndex':'VALORBAS','width':80},{'text':'Diff','dataIndex':'DIFFNORMAL','width':70}]},"
//                + "{'text':'Ultima','dataIndex':'PMP','width':80}"
//                + "]}";
        String columns = "{\"columns\":" + request.getParameter("columns") + "}";

//        String columns = "{'text':'2020','text':'2020','level':20,'columns':[{'text':'USD','dataIndex':'AMOUNT','width':90,'align':'center'}]} ";
        filter = new Gson().fromJson(columns, filter.getClass());

        ExportSchema[] column = filter.columns;

        // Creamos el archivo donde almacenaremos la hoja
        // de calculo, recuerde usar la extension correcta,
        // en este caso .xlsx
        File archivo = new File("C:\\Dumps\\reporte.xlsx");

        // Creamos el libro de trabajo de Excel formato OOXML
        Workbook workbook = new XSSFWorkbook();
        //Workbook workbook = new HSSFWorkbook();

        // La hoja donde pondremos los datos
        Sheet pagina = workbook.createSheet("Reporte de productos");

        // Creamos el estilo paga las celdas del encabezado
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        int Columnas = 0;
        int nivel = 0;//Fila 0

        int q_lvl1 = -1;
        int q_lvl2 = -1;
        int q_lvl3 = -1;
        for (ExportSchema obj1 : filter.columns) {
            q_lvl1 = q_lvl1 + 1;
            if (obj1.columns != null) {
                nivel = 1;
                q_lvl1 = q_lvl1 + obj1.columns.length;

                for (ExportSchema obj2 : obj1.columns) {
                    q_lvl2 = q_lvl2 + 1;
                    if (obj2.columns != null) {
                        nivel = 2;
                        q_lvl2 = q_lvl2 + obj2.columns.length;

                        for (ExportSchema obj3 : obj2.columns) {
                            q_lvl3 = q_lvl3 + 1;
                            if (obj3.columns != null) {
                                nivel = 3;
                                q_lvl3 = q_lvl3 + obj3.columns.length;
                            }
                        }
                    }
                }
            }

            switch (nivel) {
                case 1:
                    obj1.index = q_lvl1;
                    break;
                case 2:
                    obj1.index = q_lvl2;
                    break;
                case 3:
                    obj1.index = q_lvl3;
                    break;
                default:
                    obj1.index = -20;
                    break;

            }
            q_lvl1 = -1;
            q_lvl2 = -1;
            q_lvl3 = -1;
        }

        System.out.println(nivel);
        Row fila;
        for (int r = 0; r <= nivel; r++) {
            // Creamos una fila en la hoja en la posicion 0
            fila = pagina.createRow(r);

            if (r == 0) {
                int ini_col = 0;
                int end_col = 0;
                int ini_row = 0;
                int end_row = 0;
                filterTemp = filter;

                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {
                    // Creamos una celda en esa fila, en la posicion 
                    // indicada por el contador del ciclo
                    Cell celda = fila.createCell(ini_col);

                    // Indicamos el estilo que deseamos 
                    // usar en la celda, en este caso el unico 
                    // que hemos creado
                    celda.setCellStyle(style);
                    //            celda.setCellValue(titulos[i]);
                    celda.setCellValue(filterTemp.columns[i].text);

                    if (filterTemp.columns[i].columns != null) {
                        System.out.println(filterTemp.columns[i].columns.length);
                        end_col = ini_col + filterTemp.columns[i].index - 1;
//                        pagina.addMergedRegion(new CellRangeAddress(ini_row, end_row, ini_col, end_col));
                        formatcelRegion(ini_row, end_row, ini_col, end_col, workbook, pagina, listaColRow, filterTemp.columns[i].dataIndex);
                        System.out.println("row_ini: " + ini_row + " row_end: " + end_row + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + filterTemp.columns[i].text);
                    } else {
                        end_col = ini_col;
//                        pagina.addMergedRegion(new CellRangeAddress(ini_row, nivel, ini_col, end_col));
                        formatcelRegion(ini_row, nivel, ini_col, end_col, workbook, pagina, listaColRow, filterTemp.columns[i].dataIndex);
                        System.out.println("row_ini: " + ini_row + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + filterTemp.columns[i].text);
                    }

                    ini_col = end_col + 1;
                    /*

                     //rowFrom,rowTo,colFrom,colTo
                     //                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));*/
                }
            } else if (r == 1) {
                System.out.println("");
                System.out.println("row" + r + " : ---*************************************");
                int ini_col = 0;
                int end_col = 0;
                int ini_row = 0;
                int end_row = 0;
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {

                    if (filterTemp.columns[i].columns != null) {

                        ExportSchema[] columns_nvl1 = filterTemp.columns[i].columns;
                        for (ExportSchema col_nvl1 : columns_nvl1) {

                            // Creamos una celda en esa fila, en la posicion 
                            Cell celda = fila.createCell(ini_col);
                            celda.setCellStyle(style);
                            celda.setCellValue(col_nvl1.text);

                            if (col_nvl1.columns != null) {
                                System.out.println(col_nvl1.columns.length);
                                end_col = ini_col + col_nvl1.columns.length - 1;
                                System.out.println("row_ini: " + r + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + col_nvl1.text);
//                                pagina.addMergedRegion(new CellRangeAddress(r, r, ini_col, end_col));
                                formatcelRegion(r, r, ini_col, end_col, workbook, pagina, listaColRow, col_nvl1.dataIndex);

                            } else {
                                end_col = ini_col;
                                System.out.println("row_ini: " + r + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + col_nvl1.text);
//                                pagina.addMergedRegion(new CellRangeAddress(r, nivel, ini_col, end_col));
                                formatcelRegion(r, nivel, ini_col, end_col, workbook, pagina, listaColRow, col_nvl1.dataIndex);
                            }

                            ini_col = end_col + 1;

                        }
                    } else {
                        ini_col = ini_col + 1;
                    }

                }

            } else if (r == 2) {
                System.out.println("");
                System.out.println("row" + r + " : ---*************************************");
                int ini_col = 0;
                int end_col = 0;
                int ini_row = 0;
                int end_row = 0;
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {

                    if (filterTemp.columns[i].columns != null) {

                        ExportSchema[] columns_nvl1 = filterTemp.columns[i].columns;
                        for (ExportSchema col_nvl1 : columns_nvl1) {

                            if (col_nvl1.columns != null) {
                                ExportSchema[] columns_nvl2 = col_nvl1.columns;
                                for (ExportSchema col_nvl2 : columns_nvl2) {

                                    // Creamos una celda en esa fila, en la posicion 
                                    Cell celda = fila.createCell(ini_col);
                                    celda.setCellStyle(style);
                                    celda.setCellValue(col_nvl2.text);

                                    if (col_nvl2.columns != null) {
                                        System.out.println(col_nvl2.columns.length);
                                        end_col = ini_col + col_nvl2.columns.length - 1;
                                    } else {
                                        end_col = ini_col;
                                    }

                                    System.out.println("row_ini: " + r + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + col_nvl2.text);

//                                    pagina.addMergedRegion(new CellRangeAddress(r, nivel, ini_col, end_col));
                                    formatcelRegion(r, nivel, ini_col, end_col, workbook, pagina, listaColRow, col_nvl2.dataIndex);

                                    ini_col = end_col + 1;

                                }

                            } else {
                                ini_col = ini_col + 1;
                            }

                        }
                    } else {
                        ini_col = ini_col + 1;
                    }

                }

            }

        }

        Collections.sort(listaColRow, new Comparator<ExportSchema>() {
            public int compare(ExportSchema o1, ExportSchema o2) {
                if (o1.colFrom == o2.colFrom) {
                    return 0;
                }
                return o1.colFrom < o2.colFrom ? -1 : 1;
            }
        });

        System.out.println("***************************");
        for (ExportSchema obj : listaColRow) {

            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);

            if (obj.colFrom == obj.colTo && !obj.dataIndex.trim().equals("")) {
                System.out.println("*************************** " + obj.colFrom + " " + obj.colTo + " == " + obj.dataIndex);
            }
            Columnas = obj.colFrom;
        }

//        Class clasePrincipal;
//        Set<Class<?>> classes = getAllExtendedOrImplementedTypesRecursively(IMF111Filter.class);
//
//        for (Class<?> clazz : classes) {
//            System.out.println(clazz.getName());
//            clasePrincipal = clazz;
//        }
        CellStyle rowStyle = workbook.createCellStyle();

        rowStyle.setBorderRight(CellStyle.BORDER_THIN);
        rowStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
        rowStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
        rowStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderTop(CellStyle.BORDER_THIN);
        rowStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

        // Y colocamos los datos en esa fila
        for (int i = 0; i < lstDataObjects.size(); i++) {

            // Ahora creamos una fila en la posicion 1
            fila = pagina.createRow((nivel + 1) + i);

            int j = 0;
            for (ExportSchema obj : listaColRow) {
                if (obj.colFrom == obj.colTo && !obj.dataIndex.trim().equals("")) {
                    // Creamos una celda en esa fila, en la
                    // posicion indicada por el contador del ciclo
                    Cell celda = fila.createCell(j);

                    Object ob = lstDataObjects.get(i);
                    //Obtengo Clase
                    Class cls = ob.getClass();

                    Field f;
                    try {

//                        System.out.println(obj.dataIndex);
                        //Obtengo la Clase a la que pertenece (Clase Normal o extendida)
                        Class<?> x = cls.getField(obj.dataIndex).getDeclaringClass();

                        f = x.getDeclaredField(obj.dataIndex);
                        Class tipo = f.getType();

                        String type = tipo.getSimpleName();

//                        if(tipo.getCanonicalName()){
//                            System.out.println("----" + obj.dataIndex);
//                        }
                        f.setAccessible(true);

                        rowStyle.setAlignment(CellStyle.ALIGN_RIGHT);
                        switch (type) {
                            case "int":
                                celda.setCellValue(Integer.parseInt(String.valueOf(f.get(ob))));
                                break;
                            case "long":
                                celda.setCellValue(Long.parseLong(String.valueOf(f.get(ob))));
                                break;
                            case "double":
                                celda.setCellValue(Double.parseDouble(String.valueOf(f.get(ob))));
                                break;
                            case "float":
                                celda.setCellValue(Float.parseFloat(String.valueOf(f.get(ob))));
                                break;
                            case "String":
                                celda.setCellValue(String.valueOf(f.get(ob)));
                                rowStyle.setAlignment(CellStyle.ALIGN_CENTER);
                                break;
                            default:
                                celda.setCellValue(String.valueOf(f.get(ob)));
                                break;
                        }
                        celda.setCellStyle(rowStyle);

//                        String valor = String.valueOf(f.get(ob));
//                        celda.setCellValue(valor);
                    } catch (Exception ex) {
//                        java.util.logging.Logger.getLogger(Test.class.getName()).log(Level.SEVERE, null, ex);

                    }

                    j++;
                }
            }

        }
        for (int x = 0; x < Columnas; x++) {
            pagina.autoSizeColumn(x, true);
        }

        // Ahora guardaremos el archivo
        try {
//            // Creamos el flujo de salida de datos,
//            // apuntando al archivo donde queremos 
//            // almacenar el libro de Excel
//            FileOutputStream salida = new FileOutputStream(archivo);
//
//            // Almacenamos el libro de 
//            // Excel via ese 
//            // flujo de datos
//            workbook.write(salida);
//
//            // Cerramos el libro para concluir operaciones
//            salida.close();

            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());

        } catch (FileNotFoundException ex) {
//            LOGGER.log(Level.SEVERE, "Archivo no localizable en sistema de archivos");
            System.out.print(ex.getMessage());
        } catch (IOException ex) {
//            LOGGER.log(Level.SEVERE, "Error de entrada/salida");
            System.out.print(ex.getMessage());
        }

        return downloadName;
    }

    public String exportFields(HttpServletRequest request, HttpServletResponse response, List<?> lstDataObjects) {

        String downloadName = String.format("Reporte_%1$s.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            // Creamos el archivo donde almacenaremos la hoja
            // de calculo, recuerde usar la extension correcta,
            // en este caso .xlsx
//        File archivo = new File("C:\\Dumps\\" + downloadName);
            // Creamos el libro de trabajo de Excel formato OOXML
            Workbook workbook = new XSSFWorkbook();
            //Workbook workbook = new HSSFWorkbook();

            // La hoja donde pondremos los datos
            Sheet pagina = workbook.createSheet("Reporte de productos");

            // Creamos el estilo paga las celdas del encabezado
            CellStyle style = workbook.createCellStyle();
            // Indicamos que tendra un fondo azul aqua
            // con patron solido del color indicado
            style.setFillForegroundColor(IndexedColors.AQUA.getIndex());
            style.setFillPattern(style.SOLID_FOREGROUND);

            String[] titulos = {"Identificador", "Consumos",
                "Precio Venta", "Precio Compra"};
            Double[] datos = {1.0, 10.0, 45.5, 25.50};

            // Creamos una fila en la hoja en la posicion 0
            Row fila = pagina.createRow(0);

            // Creamos el encabezado
            for (int i = 0; i < titulos.length; i++) {
                // Creamos una celda en esa fila, en la posicion 
                // indicada por el contador del ciclo
                Cell celda = fila.createCell(i);

                // Indicamos el estilo que deseamos 
                // usar en la celda, en este caso el unico 
                // que hemos creado
                celda.setCellStyle(style);
                celda.setCellValue(titulos[i]);
            }

            // Ahora creamos una fila en la posicion 1
            fila = pagina.createRow(1);

            // Y colocamos los datos en esa fila
            for (int i = 0; i < datos.length; i++) {
                // Creamos una celda en esa fila, en la
                // posicion indicada por el contador del ciclo
                Cell celda = fila.createCell(i);

                celda.setCellValue(datos[i]);
            }

//            // Creamos el flujo de salida de datos,
//            // apuntando al archivo donde queremos 
//            // almacenar el libro de Excel
//            FileOutputStream salida = new FileOutputStream(archivo);
//
//            // Almacenamos el libro de 
//            // Excel via ese 
//            // flujo de datos
//            workbook.write(salida);
//
//            // Cerramos el libro para concluir operaciones
//            salida.close();
//            LOGGER.log(Level.INFO, "Archivo creado existosamente en {0}", archivo.getAbsolutePath());
            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return downloadName;
    }

    public void formatcelRegion(int rowFrom, int rowTo, int colFrom, int colTo, Workbook workbook, Sheet pagina, ArrayList<ExportSchema> listaColRow, String dataIndex) throws IOException {

        pagina.addMergedRegion(new CellRangeAddress(rowFrom, rowTo, colFrom, colTo));
        //        RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
        //        RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
        //        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
        //        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);

        ExportSchema obj = new ExportSchema();
        obj.rowFrom = rowFrom;
        obj.rowTo = rowTo;
        obj.colFrom = colFrom;
        obj.colTo = colTo;
        obj.dataIndex = dataIndex;
        listaColRow.add(obj);

    }

    /**
     * EMD
     *
     */
    @RequestMapping(value = "searchEMD")
    public @ResponseBody
    String searchEMD(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF053Filter> lstData;
        Gson gson = new Gson();
        IMF053Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF053Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.PX109SQP03554(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDayEMD")
    public @ResponseBody
    String searchDayEMD(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF053Filter> lstData;
        Gson gson = new Gson();
        IMF053Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF053Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.PX109SQP03560(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    // =========================================================================
    // ========================== FLOWN ========================================
    // =========================================================================
    // ******************* By Zone ****************************************
    @RequestMapping(value = "searchByZone")
    public @ResponseBody
    String searchByZone(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByZone-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByZone(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByZone(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00335(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* By City Pair ****************************************
    @RequestMapping(value = "searchByCityPair")
    public @ResponseBody
    String searchByCityPair(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByCityPair-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByCityPair(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByCityPair(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00334(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* By Flight Profitability ****************************************
    @RequestMapping(value = "searchByFlightProfitability")
    public @ResponseBody
    String searchByFlightProfitability(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByFlightProfitability-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByFlightProfitability(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByFlightProfitability(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP04618(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByCP_NPlane")
    public @ResponseBody
    String searchByCP_NPlane(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByCP_NPlane-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByCP_NPlane(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByCP_NPlane(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00342(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* By Aircraft *****************************************
    @RequestMapping(value = "searchByNPlane")
    public @ResponseBody
    String searchByNPlane(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByNPlane-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByNPlane(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByNPlane(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00333(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    /**
     * *************************************************************************
     * ************************* SPA PROFITABILITY
     * *****************************
     *
     * *************************************************************************
     * *************************************************************************
     */
    @RequestMapping(value = "search_SPA")
    public @ResponseBody
    String search_SPA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : search_SPA-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearch_SPA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearch_SPA(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//          
            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX241S01_D(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search_ChartsSPA")
    public @ResponseBody
    String search_ChartsSPA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : search_ChartsSPA-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearch_ChartsSPA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearch_ChartsSPA(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//          
            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX241S01_Charts(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTAGSPA")
    public @ResponseBody
    String searchTAGSPA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchTAGSPA-------------");

        List<A1971Filter> lst = this.getListsearchTAGSPA1(request, false);
        List<A1971Filter> lstData = this.getListsearchTAGSPA2(request, false);
        map.put("success", true);
        map.put("data1", lst);
        map.put("data2", lstData);
        return new Gson().toJson(map);
    }

    public List<A1971Filter> getListsearchTAGSPA1(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241SQP01404(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A1971Filter> getListsearchTAGSPA2(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lstData = logic.loadPX241SQP01398(filter, "N");

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lstData;
    }

    @RequestMapping(value = "searchDetTAGSPA")
    public @ResponseBody
    String searchDetTAGSPA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetTAGSPA-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetTAGSPA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetTAGSPA(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241SQP01493(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetail_SPA")
    public @ResponseBody
    String searchDetail_SPA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPA-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetail_SPA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetail_SPA(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241S02_D(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetail_SPANot")
    public @ResponseBody
    String searchDetail_SPANot(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANot-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetail_SPANot(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetail_SPANot(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241S02_DNot(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetail_SPANA")
    public @ResponseBody
    String searchDetail_SPANA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANA-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetail_SPANA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetail_SPANA(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241SQP01253(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetail_SPANA_2")
    public @ResponseBody
    String searchDetail_SPANA_2(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANA_2-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetail_SPANA_2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetail_SPANA_2(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241SQP01254(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTKT")
    public @ResponseBody
    String searchTKT(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANA_2-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchTKT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchTKT(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241S09_D(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchViewGlobal")
    public @ResponseBody
    String searchViewGlobal(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANA_2-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchViewGlobal(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchViewGlobal(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

//            lst = logic.(filter);  //ESTA NO VA, SOLO LAS DE ABAJO
//            lstData1 = logic.loadPX241S03_D(filter);
//            lstData2 = logic.loadPX241S04_D(filter);
//            lstData3 = logic.loadPX241S05_D(filter);
//            lstData4 = logic.loadPX241S06_D(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetailViewGlobal")
    public @ResponseBody
    String searchDetailViewGlobal(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANA_2-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetailViewGlobal(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetailViewGlobal(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241S07_D(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetailViewGlobal2")
    public @ResponseBody
    String searchDetailViewGlobal2(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail_SPANA_2-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListsearchDetailViewGlobal2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListsearchDetailViewGlobal2(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        List<A1971Filter> lstData = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX241S08_D(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ***********************************************************************
    // ************************ DRILLDOWN ALL*********************************
    // ***********************************************************************
    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListDetai(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListDetai(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00329(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetByCoupon")
    public @ResponseBody
    String searchDetByCoupon(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetByCoupon-------------");

        map.put("success", true);
        List<A1692Filter> lst = this.getListDetByCoupon(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1692Filter> getListDetByCoupon(HttpServletRequest request, Boolean bExcel) {

        List<A1692Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00330(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByCabin")
    public @ResponseBody
    String searchByCabin(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByCabin-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByCabin(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByCabin(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00331(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // =========================================================================
    // ========================== EXPIRED ======================================
    // =========================================================================
    @RequestMapping(value = "searchExpired")
    public @ResponseBody
    String searchExpired(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchExpired-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListExpired(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListExpired(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX109SQP02666(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchExpiredDetail")
    public @ResponseBody
    String searchExpiredDetail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchExpiredDetail-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListExpiredDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListExpiredDetail(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX109SQP02667(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSXByCarrierQTY")
    public @ResponseBody
    void getXLSXByCarrierQTY(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Accounting Calendar  : getXLSXByCarrierQTY");

        String fileNameDownload = String.format("Flown By Carrier - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1971Filter> listaData = this.getListSearchFlownByCarrier(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vl = 0;
            Integer vj = 0; //Almacena el numero de fila
            Integer vk = 0;
            Iterator iter = listaData.iterator();
            Iterator iter1 = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("TIckets AM");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("Tickets OAL");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("Total");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("AM");
            CH2_2.setCellValue("5D");
            CH2_3.setCellValue("AM");
            CH2_4.setCellValue("5D");
            CH2_5.setCellValue("");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).AM);
                rcell2.setCellValue(listaData.get(vi).CINCOD);
                rcell3.setCellValue(listaData.get(vi).AM_OTRO);
                rcell4.setCellValue(listaData.get(vi).CINCOD_OTRO);
                rcell5.setCellValue(listaData.get(vi).TOTAL);
//                if (listaData.get(vi).CERROR.equals("01")) {
//                    rcell3.setCellStyle(bodyStyle);
//                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);

            CH1_0_T.setCellValue("Totales");
            CH1_1_T.setCellValue(listaData.get(0).totAM);
            CH1_2_T.setCellValue(listaData.get(0).totCINCOD);
            CH1_3_T.setCellValue(listaData.get(0).totAM_OTRO);
            CH1_4_T.setCellValue(listaData.get(0).totCINCOD_OTRO);
            CH1_5_T.setCellValue(listaData.get(0).totTOTAL);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);

            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            vk = vj + 3;
            // ======  Nivel 1 ==========
            Row row11 = sheet.createRow(vk);
            Cell CH1_01 = row11.createCell(0);
            Cell CH1_11 = row11.createCell(1);
            Cell CH1_21 = row11.createCell(2);
            Cell CH1_31 = row11.createCell(3);
            Cell CH1_41 = row11.createCell(4);
            Cell CH1_51 = row11.createCell(5);

            CH1_01.setCellValue("Poliza");
            CH1_11.setCellValue("TIckets AM");
            CH1_21.setCellValue("");
            CH1_31.setCellValue("Tickets OAL");
            CH1_41.setCellValue("");
            CH1_51.setCellValue("Total");

            CH1_01.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_41.setCellStyle(headerStyle);
            CH1_51.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(17, 17, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(17, 18, 5, 5));
            ++vk;
            //============================================

            // ======  Nivel 2 ==========
            Row row21 = sheet.createRow(vk);
            Cell CH2_01 = row21.createCell(0);
            Cell CH2_11 = row21.createCell(1);
            Cell CH2_21 = row21.createCell(2);
            Cell CH2_31 = row21.createCell(3);
            Cell CH2_41 = row21.createCell(4);
            Cell CH2_51 = row21.createCell(5);

            CH2_01.setCellValue("Date");
            CH2_11.setCellValue("AM");
            CH2_21.setCellValue("5D");
            CH2_31.setCellValue("AM");
            CH2_41.setCellValue("5D");
            CH2_51.setCellValue("");

            CH2_01.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_41.setCellStyle(headerStyle);
            CH2_51.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(18, 18, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 4, 4));
            ++vk;
            //============================================

            while (iter1.hasNext()) {
                row11 = sheet.createRow(vk);
                Cell rcell01 = row11.createCell(0);
                Cell rcell11 = row11.createCell(1);
                Cell rcell21 = row11.createCell(2);
                Cell rcell31 = row11.createCell(3);
                Cell rcell41 = row11.createCell(4);
                Cell rcell51 = row11.createCell(5);

                rcell01.setCellValue(listaData.get(vl).strFormatDate0);
                rcell11.setCellValue(listaData.get(vl).AM0);
                rcell21.setCellValue(listaData.get(vl).CINCOD0);
                rcell31.setCellValue(listaData.get(vl).AM_OTRO0);
                rcell41.setCellValue(listaData.get(vl).CINCOD_OTRO0);
                rcell51.setCellValue(listaData.get(vl).TOTAL0);
//                if (listaData.get(vi).CERROR.equals("01")) {
//                    rcell3.setCellStyle(bodyStyle);
//                }
                iter1.next();
                ++vl;
                ++vk;
            }

            Row rowTotal1 = sheet.createRow(vk);
            Cell CH1_0_T1 = rowTotal1.createCell(0);
            Cell CH1_1_T1 = rowTotal1.createCell(1);
            Cell CH1_2_T1 = rowTotal1.createCell(2);
            Cell CH1_3_T1 = rowTotal1.createCell(3);
            Cell CH1_4_T1 = rowTotal1.createCell(4);
            Cell CH1_5_T1 = rowTotal1.createCell(5);

            CH1_0_T1.setCellValue("Totales");
            CH1_1_T1.setCellValue(listaData.get(0).totAM0);
            CH1_2_T1.setCellValue(listaData.get(0).totCINCOD0);
            CH1_3_T1.setCellValue(listaData.get(0).totAM_OTRO0);
            CH1_4_T1.setCellValue(listaData.get(0).totCINCOD_OTRO0);
            CH1_5_T1.setCellValue(listaData.get(0).totTOTAL0);

            CH1_0_T1.setCellStyle(totalStyle);
            CH1_1_T1.setCellStyle(totalStyle);
            CH1_2_T1.setCellStyle(totalStyle);
            CH1_3_T1.setCellStyle(totalStyle);
            CH1_4_T1.setCellStyle(totalStyle);
            CH1_5_T1.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXByCarrierAMO")
    public @ResponseBody
    void getXLSXByCarrierAMO(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Accounting Calendar  : getXLSXByCarrierAMO");

        String fileNameDownload = String.format("Flown By Carrier - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1971Filter> listaData = this.getListSearchFlownByCarrier(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vl = 0;
            Integer vj = 0; //Almacena el numero de fila
            Integer vk = 0;
            Iterator iter = listaData.iterator();
            Iterator iter1 = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("Amount USD AM");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("Amount USD OAL");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("Total");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("AM");
            CH2_2.setCellValue("5D");
            CH2_3.setCellValue("AM");
            CH2_4.setCellValue("5D");
            CH2_5.setCellValue("");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).AMM);
                rcell2.setCellValue(listaData.get(vi).CINCODM);
                rcell3.setCellValue(listaData.get(vi).AM_OTROM);
                rcell4.setCellValue(listaData.get(vi).CINCOD_OTROM);
                rcell5.setCellValue(listaData.get(vi).TOTALM);
//                if (listaData.get(vi).CERROR.equals("01")) {
//                    rcell3.setCellStyle(bodyStyle);
//                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);

            CH1_0_T.setCellValue("Totales");
            CH1_1_T.setCellValue(listaData.get(0).totAMM);
            CH1_2_T.setCellValue(listaData.get(0).totCINCODM);
            CH1_3_T.setCellValue(listaData.get(0).totAM_OTROM);
            CH1_4_T.setCellValue(listaData.get(0).totCINCOD_OTROM);
            CH1_5_T.setCellValue(listaData.get(0).totTOTALM);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);

            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            //---------------------------------------------------
            vk = vj + 3;
            // ======  Nivel 1 ==========
            Row row11 = sheet.createRow(vk);
            Cell CH1_01 = row11.createCell(0);
            Cell CH1_11 = row11.createCell(1);
            Cell CH1_21 = row11.createCell(2);
            Cell CH1_31 = row11.createCell(3);
            Cell CH1_41 = row11.createCell(4);
            Cell CH1_51 = row11.createCell(5);

            CH1_01.setCellValue("Poliza");
            CH1_11.setCellValue("Amount USD AM");
            CH1_21.setCellValue("");
            CH1_31.setCellValue("Amount USD OAL");
            CH1_41.setCellValue("");
            CH1_51.setCellValue("Total");

            CH1_01.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_41.setCellStyle(headerStyle);
            CH1_51.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(17, 17, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(17, 17, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(17, 18, 5, 5));
            ++vk;
            //============================================

            // ======  Nivel 2 ==========
            Row row21 = sheet.createRow(vk);
            Cell CH2_01 = row21.createCell(0);
            Cell CH2_11 = row21.createCell(1);
            Cell CH2_21 = row21.createCell(2);
            Cell CH2_31 = row21.createCell(3);
            Cell CH2_41 = row21.createCell(4);
            Cell CH2_51 = row21.createCell(5);

            CH2_01.setCellValue("Date");
            CH2_11.setCellValue("AM");
            CH2_21.setCellValue("5D");
            CH2_31.setCellValue("AM");
            CH2_41.setCellValue("5D");
            CH2_51.setCellValue("");

            CH2_01.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_41.setCellStyle(headerStyle);
            CH2_51.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(18, 18, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(18, 18, 4, 4));
            ++vk;
            //============================================

            while (iter1.hasNext()) {
                row11 = sheet.createRow(vk);
                Cell rcell01 = row11.createCell(0);
                Cell rcell11 = row11.createCell(1);
                Cell rcell21 = row11.createCell(2);
                Cell rcell31 = row11.createCell(3);
                Cell rcell41 = row11.createCell(4);
                Cell rcell51 = row11.createCell(5);

                rcell01.setCellValue(listaData.get(vl).strFormatDate0);
                rcell11.setCellValue(listaData.get(vl).AMM0);
                rcell21.setCellValue(listaData.get(vl).CINCODM0);
                rcell31.setCellValue(listaData.get(vl).AM_OTROM0);
                rcell41.setCellValue(listaData.get(vl).CINCOD_OTROM0);
                rcell51.setCellValue(listaData.get(vl).TOTALM0);
//                if (listaData.get(vi).CERROR.equals("01")) {
//                    rcell3.setCellStyle(bodyStyle);
//                }
                iter1.next();
                ++vl;
                ++vk;
            }

            Row rowTotal1 = sheet.createRow(vk);
            Cell CH1_0_T1 = rowTotal1.createCell(0);
            Cell CH1_1_T1 = rowTotal1.createCell(1);
            Cell CH1_2_T1 = rowTotal1.createCell(2);
            Cell CH1_3_T1 = rowTotal1.createCell(3);
            Cell CH1_4_T1 = rowTotal1.createCell(4);
            Cell CH1_5_T1 = rowTotal1.createCell(5);

            CH1_0_T1.setCellValue("Totales");
            CH1_1_T1.setCellValue(listaData.get(0).totAMM0);
            CH1_2_T1.setCellValue(listaData.get(0).totCINCODM0);
            CH1_3_T1.setCellValue(listaData.get(0).totAM_OTROM0);
            CH1_4_T1.setCellValue(listaData.get(0).totCINCOD_OTROM0);
            CH1_5_T1.setCellValue(listaData.get(0).totTOTALM0);

            CH1_0_T1.setCellStyle(totalStyle);
            CH1_1_T1.setCellStyle(totalStyle);
            CH1_2_T1.setCellStyle(totalStyle);
            CH1_3_T1.setCellStyle(totalStyle);
            CH1_4_T1.setCellStyle(totalStyle);
            CH1_5_T1.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    // =========================================================================
    // ========================== SALES BY IATA ================================
    // =========================================================================
    @RequestMapping(value = "searchIATA")
    public @ResponseBody
    String searchIATA(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchIATA-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListIATA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListIATA(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.SQP02271(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadTNURE")
    public @ResponseBody
    String loadTNURE(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : loadTNURE-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListTNURE(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListTNURE(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX226S01(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadFORE")
    public @ResponseBody
    String loadFORE(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : loadFORE-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListFORE(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListFORE(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX226SQP05098(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadFOREDown")
    public @ResponseBody
    String loadFOREDown(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : loadFOREDown-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListFOREDown(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListFOREDown(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX226SQP05098Down(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadFOREGraph")
    public @ResponseBody
    String loadFOREGraph(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : loadFOREGraph-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListFOREGraph(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListFOREGraph(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX226SQP05098Graph(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    //******************** Chart Forecast *******************************************
    @RequestMapping(value = "loadForeChart")
    public @ResponseBody
    String loadForeChart(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF117Filter> lstData;
        IMF117Filter filter = new IMF117Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX226SQP05098Chart(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

//    @RequestMapping(value = "loadTNUVS")
//    public @ResponseBody
//    String loadTNUVS(ModelMap map, HttpServletRequest request) {
//
//        System.out.println("-------------- Dashboard01 : loadTNUVS-------------");
//
//        map.put("success", true);
//        List<IMF117Filter> lst = this.getListTNUVS(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//
//    }
//
//    public List<IMF117Filter> getListTNUVS(HttpServletRequest request, Boolean bExcel) {
//
//        List<IMF117Filter> lst = new ArrayList<>(0);
//        IMF117Filter filter = new IMF117Filter();
//        Gson gson = new Gson();
//        String beanString = "";
//
//        try {
//            logic = new Dashboard01Logic();
//            logic.setSession(this.serverSession.getServerSession());
//
//            beanString = request.getParameter("beanString");
//            filter = gson.fromJson(beanString, IMF117Filter.class);
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
//
//            lst = logic.loadPX228S01A1890(filter);
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//        return lst;
//    }
//    
//    @RequestMapping(value = "loadTNU")
//    public @ResponseBody
//    String loadTNU(HttpServletRequest request) {
//        logic = new Dashboard01Logic();
//        logic.setSession((IServerSession) serverSession.getServerSession());
//        List<PX228S01Filter> oList = new ArrayList<PX228S01Filter>(0);
//        PX228S01Filter filter = new PX228S01Filter();                
//        try {
//            filter.IN_PER = request.getParameter("IN_PER").toString().trim();
//            oList = logic.loadPX228S01A1890(filter);
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//        HashMap m = new HashMap();
//        m.put("success", true);
//        m.put("total", oList.size());
//        m.put("data", oList);
//        return new Gson().toJson(m);
//    }
//    @RequestMapping(value = "getXLSXByMonth")
//    public @ResponseBody
//    void getXLSXByMonth(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Accounting Calendar  : getXLSXByMonth");
//
//        String fileNameDownload = String.format("Flown By Month - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A1971Filter> listaData = this.getListSearchFlownByCarrier(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
//            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
//            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vl = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Integer vk = 17;
//            Iterator iter = listaData.iterator();
//            Iterator iter1 = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//
//            CH1_0.setCellValue("Flight");
//            CH1_1.setCellValue("Cabin");
//            CH1_2.setCellValue("");
//            CH1_3.setCellValue("");
//            CH1_4.setCellValue("");
//            CH1_5.setCellValue("");
//            CH1_6.setCellValue("");
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 6));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//
//            CH2_0.setCellValue("Date");
//            CH2_1.setCellValue("Business");
//            CH2_2.setCellValue("");
//            CH2_3.setCellValue("Economy");
//            CH2_4.setCellValue("");
//            CH2_5.setCellValue("Total");
//            CH2_6.setCellValue("");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
//            ++vj;
//            //============================================
//            
//            // ======  Nivel 3 ==========
//            Row row3 = sheet.createRow(vj);
//            Cell CH3_0 = row3.createCell(0);
//            Cell CH3_1 = row3.createCell(1);
//            Cell CH3_2 = row3.createCell(2);
//            Cell CH3_3 = row3.createCell(3);
//            Cell CH3_4 = row3.createCell(4);
//            Cell CH3_5 = row3.createCell(5);
//            Cell CH3_6 = row3.createCell(6);
//
//            CH3_0.setCellValue("");
//            CH3_1.setCellValue("Pax");
//            CH3_2.setCellValue("Value");
//            CH3_3.setCellValue("Pax");
//            CH3_4.setCellValue("Value");
//            CH3_5.setCellValue("Pax");
//            CH3_6.setCellValue("Value");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
//            ++vj;
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//
//                rcell0.setCellValue(listaData.get(vi).strFormatDate);
//                rcell1.setCellValue(listaData.get(vi).AM);
//                rcell2.setCellValue(listaData.get(vi).CINCOD);
//                rcell3.setCellValue(listaData.get(vi).AM_OTRO);
//                rcell4.setCellValue(listaData.get(vi).CINCOD_OTRO);
//                rcell5.setCellValue(listaData.get(vi).TOTAL);
////                if (listaData.get(vi).CERROR.equals("01")) {
////                    rcell3.setCellStyle(bodyStyle);
////                }
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            Row rowTotal = sheet.createRow(vj);
//            Cell CH1_0_T = rowTotal.createCell(0);
//            Cell CH1_1_T = rowTotal.createCell(1);
//            Cell CH1_2_T = rowTotal.createCell(2);
//            Cell CH1_3_T = rowTotal.createCell(3);
//            Cell CH1_4_T = rowTotal.createCell(4);
//            Cell CH1_5_T = rowTotal.createCell(5);
//
//            CH1_0_T.setCellValue("Totales");
//            CH1_1_T.setCellValue(listaData.get(0).totAM);
//            CH1_2_T.setCellValue(listaData.get(0).totCINCOD);
//            CH1_3_T.setCellValue(listaData.get(0).totAM_OTRO);
//            CH1_4_T.setCellValue(listaData.get(0).totCINCOD_OTRO);
//            CH1_5_T.setCellValue(listaData.get(0).totTOTAL);
//
//            CH1_0_T.setCellStyle(totalStyle);
//            CH1_1_T.setCellStyle(totalStyle);
//            CH1_2_T.setCellStyle(totalStyle);
//            CH1_3_T.setCellStyle(totalStyle);
//            CH1_4_T.setCellStyle(totalStyle);
//            CH1_5_T.setCellStyle(totalStyle);
//
//            //---------------------------------------------------
//            //---------------------------------------------------
//            //---------------------------------------------------
//            //---------------------------------------------------
//            //---------------------------------------------------
//           
//            // ======  Nivel 1 ==========
//            Row row11 = sheet.createRow(vk);
//            Cell CH1_01 = row11.createCell(0);
//            Cell CH1_11 = row11.createCell(1);
//            Cell CH1_21 = row11.createCell(2);
//            Cell CH1_31 = row11.createCell(3);
//            Cell CH1_41 = row11.createCell(4);
//            Cell CH1_51 = row11.createCell(5);
//
//            CH1_01.setCellValue("Poliza");
//            CH1_11.setCellValue("TIckets AM");
//            CH1_21.setCellValue("");
//            CH1_31.setCellValue("Tickets OAL");
//            CH1_41.setCellValue("");
//            CH1_51.setCellValue("Total");
//
//            CH1_01.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_31.setCellStyle(headerStyle);
//            CH1_41.setCellStyle(headerStyle);
//            CH1_51.setCellStyle(headerStyle);
//
//            sheet.addMergedRegion(new CellRangeAddress(17, 17, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(17, 17, 1, 2));
//            sheet.addMergedRegion(new CellRangeAddress(17, 17, 3, 4));
//            sheet.addMergedRegion(new CellRangeAddress(17, 18, 5, 5));
//            ++vk;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row21 = sheet.createRow(vk);
//            Cell CH2_01 = row21.createCell(0);
//            Cell CH2_11 = row21.createCell(1);
//            Cell CH2_21 = row21.createCell(2);
//            Cell CH2_31 = row21.createCell(3);
//            Cell CH2_41 = row21.createCell(4);
//            Cell CH2_51 = row21.createCell(5);
//
//            CH2_01.setCellValue("Date");
//            CH2_11.setCellValue("AM");
//            CH2_21.setCellValue("5D");
//            CH2_31.setCellValue("AM");
//            CH2_41.setCellValue("5D");
//            CH2_51.setCellValue("");
//
//            CH2_01.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_21.setCellStyle(headerStyle);
//            CH2_31.setCellStyle(headerStyle);
//            CH2_41.setCellStyle(headerStyle);
//            CH2_51.setCellStyle(headerStyle);
//
//            sheet.addMergedRegion(new CellRangeAddress(18, 18, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(18, 18, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(18, 18, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(18, 18, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(18, 18, 4, 4));
//            ++vk;
//            //============================================
//
//            while (iter1.hasNext()) {
//                row11 = sheet.createRow(vk);
//                Cell rcell01 = row11.createCell(0);
//                Cell rcell11 = row11.createCell(1);
//                Cell rcell21 = row11.createCell(2);
//                Cell rcell31 = row11.createCell(3);
//                Cell rcell41 = row11.createCell(4);
//                Cell rcell51 = row11.createCell(5);
//
//                rcell01.setCellValue(listaData.get(vl).strFormatDate0);
//                rcell11.setCellValue(listaData.get(vl).AM0);
//                rcell21.setCellValue(listaData.get(vl).CINCOD0);
//                rcell31.setCellValue(listaData.get(vl).AM_OTRO0);
//                rcell41.setCellValue(listaData.get(vl).CINCOD_OTRO0);
//                rcell51.setCellValue(listaData.get(vl).TOTAL0);
////                if (listaData.get(vi).CERROR.equals("01")) {
////                    rcell3.setCellStyle(bodyStyle);
////                }
//                iter1.next();
//                ++vl;
//                ++vk;
//            }
//
//            Row rowTotal1 = sheet.createRow(vk);
//            Cell CH1_0_T1 = rowTotal1.createCell(0);
//            Cell CH1_1_T1 = rowTotal1.createCell(1);
//            Cell CH1_2_T1 = rowTotal1.createCell(2);
//            Cell CH1_3_T1 = rowTotal1.createCell(3);
//            Cell CH1_4_T1 = rowTotal1.createCell(4);
//            Cell CH1_5_T1 = rowTotal1.createCell(5);
//
//            CH1_0_T1.setCellValue("Totales");
//            CH1_1_T1.setCellValue(listaData.get(0).totAM0);
//            CH1_2_T1.setCellValue(listaData.get(0).totCINCOD0);
//            CH1_3_T1.setCellValue(listaData.get(0).totAM_OTRO0);
//            CH1_4_T1.setCellValue(listaData.get(0).totCINCOD_OTRO0);
//            CH1_5_T1.setCellValue(listaData.get(0).totTOTAL0);
//
//            CH1_0_T1.setCellStyle(totalStyle);
//            CH1_1_T1.setCellStyle(totalStyle);
//            CH1_2_T1.setCellStyle(totalStyle);
//            CH1_3_T1.setCellStyle(totalStyle);
//            CH1_4_T1.setCellStyle(totalStyle);
//            CH1_5_T1.setCellStyle(totalStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }
}
