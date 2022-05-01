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
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SalesReconciliAmexLogic;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4117Filter;
import net.miatech.praxis.payment.filter.A4118Filter;
import net.miatech.beans.SQP00697Filter;
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

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/SalesReconciliAmex")
public class SalesReconciliAmexController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesReconciliAmexLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SalesReconciliAmex/form_index";
    }

    @RequestMapping(value = "searchMainSummary")
    public @ResponseBody
    String searchMainSummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : SearchMainSummary-------------");

        map.put("success", true);
        List<A4113Filter> lst = this.getListMainSummary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4113Filter> getListMainSummary(HttpServletRequest request, Boolean bExcel) {

        List<A4113Filter> lst = new ArrayList<>(0);
        A4113Filter filter = new A4113Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4113Filter.class);

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

            lst = logic.loadPX570SQP04378(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : Search-------------");

        map.put("success", true);
        List<A4113Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4113Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A4113Filter> lst = new ArrayList<>(0);
        A4113Filter filter = new A4113Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4113Filter.class);

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

            lst = logic.loadPX570SQP04257(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A4113Filter> getListForFile(A4113Filter filter) {

        List<A4113Filter> lst = new ArrayList<>(0);
        Gson gson = new Gson();

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadPX570SQP04329(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A4113Filter> getListForFileMultipleDifferences(A4113Filter filter) {

        List<A4113Filter> lst = new ArrayList<>(0);

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadPX570SQP04330(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetSubmission")
    public @ResponseBody
    String searchDetSubmission(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetSubmission-------------");

        map.put("success", true);
        List<A4115Filter> lst = this.getListSubmission(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4115Filter> getListSubmission(HttpServletRequest request, Boolean bExcel) {

        List<A4115Filter> lst = new ArrayList<>(0);
        A4115Filter filter = new A4115Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4115Filter.class);

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

            lst = logic.loadPX570SQP04269(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTransaction")
    public @ResponseBody
    String searchDetTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetTransaction-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListTransaction(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListTransaction(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04270(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetPricing")
    public @ResponseBody
    String searchDetPricing(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetPricing-------------");

        map.put("success", true);
        List<A4117Filter> lst = this.getListPricing(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4117Filter> getListPricing(HttpServletRequest request, Boolean bExcel) {

        List<A4117Filter> lst = new ArrayList<>(0);
        A4117Filter filter = new A4117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4117Filter.class);

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

            lst = logic.loadPX570SQP04278(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetChargeback")
    public @ResponseBody
    String searchDetChargeback(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetChargeback-------------");

        map.put("success", true);
        List<A4118Filter> lst = this.getListChargeback(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4118Filter> getListChargeback(HttpServletRequest request, Boolean bExcel) {

        List<A4118Filter> lst = new ArrayList<>(0);
        A4118Filter filter = new A4118Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4118Filter.class);

            lst = logic.loadPX570SQP04279(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchMainSettlement")
    public @ResponseBody
    String searchMainSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchMainSettlement-------------");
        map.put("success", true);
        List<A4116Filter> lst = this.getListMainSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListMainSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04328(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchMainAdjustment")
    public @ResponseBody
    String searchMainAdjustment(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchMainAdjustment-------------");
        map.put("success", true);
        List<A4118Filter> lst = this.getListMainAdjustment(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4118Filter> getListMainAdjustment(HttpServletRequest request, Boolean bExcel) {

        List<A4118Filter> lst = new ArrayList<>(0);
        A4118Filter filter = new A4118Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4118Filter.class);

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

            lst = logic.loadPX570SQP04376(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSettlement")
    public @ResponseBody
    String searchSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04275(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetSettlement")
    public @ResponseBody
    String searchDetSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDetSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDetSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04284(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTktSettlement")
    public @ResponseBody
    String searchDetTktSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetTktSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDetTktSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDetTktSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04377(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchErrorTransaction")
    public @ResponseBody
    String searchErrorTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchErrorTransaction-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListErrorTransaction(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListErrorTransaction(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04357(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchPNR")
    public @ResponseBody
    String searchPNR(ModelMap map, HttpServletRequest request) {

        SQP00697Filter filter = new SQP00697Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            SalesReconciliAmexLogic logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<SQP00697Filter> listaData = logic.loadSQP00697(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchTransactionErrorDetail")
    public @ResponseBody
    String searchTransactionErrorDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : searchTransactionErrorDetail-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new SalesReconciliAmexLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX570SQP04359(filter);
//            lstInfo = logic.loadPX570SQP04395(result);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "gridTransactionError")
    public @ResponseBody
    String gridTransactionError(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : gridTransactionError-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new SalesReconciliAmexLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {

            lstInfo = logic.loadPX570SQP04395(filter);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "gridTransactionErrorByTKT")
    public @ResponseBody
    String gridTransactionErrorByTKT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : gridTransactionErrorByTKT-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new SalesReconciliAmexLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {

            lstInfo = logic.loadPX570SQP04455(filter);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ValidateTransaction")
    public @ResponseBody
    String ValidateTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : ValidateTransaction-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX570SQP04360(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceErrorTransaction")
    public @ResponseBody
    String MaintenanceErrorTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : MaintenanceErrorTransaction-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX570SQP04361(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    //Excels
    @RequestMapping(value = "getXLSXMainSummary")
    public @ResponseBody
    void getXLSXMainSummary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSummary");
        String fileNameDownload = String.format("Report Main Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = this.getListMainSummary(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Curr");
            CH1_2.setCellValue("Summary");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("Differences");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 22));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("Discount");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("NET");
            CH2_9.setCellValue("GROSS");
            CH2_10.setCellValue("Discount");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("NET");
            CH2_16.setCellValue("GROSS");
            CH2_17.setCellValue("Discount");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("NET");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("Commission");
            CH3_4.setCellValue("Serv. Fee");
            CH3_5.setCellValue("Adjustment");
            CH3_6.setCellValue("VAT");
            CH3_7.setCellValue("Op. Debit");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("Commission");
            CH3_11.setCellValue("Serv. Fee");
            CH3_12.setCellValue("Adjustment");
            CH3_13.setCellValue("VAT");
            CH3_14.setCellValue("Op. Debit");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("Commission");
            CH3_18.setCellValue("Serv. Fee");
            CH3_19.setCellValue("Adjustment");
            CH3_20.setCellValue("VAT");
            CH3_21.setCellValue("Op. Debit");
            CH3_22.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PCURRENCY);
                rcell2.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell3.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell4.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell5.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell6.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell7.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell8.setCellValue(listaData.get(vi).PNETAMOU);
                rcell9.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell10.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell11.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell12.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell13.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell14.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell15.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell16.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell17.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell18.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell19.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell20.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell21.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell22.setCellValue(listaData.get(vi).DIFF_PNETAMOU);
                iter.next();
                ++vi;
                ++vj;

                if (rcell16.getNumericCellValue() <= -1) {
                    rcell16.setCellStyle(bodyStyle);
                }
                if (rcell17.getNumericCellValue() <= -1) {
                    rcell17.setCellStyle(bodyStyle);
                }
                if (rcell18.getNumericCellValue() <= -1) {
                    rcell18.setCellStyle(bodyStyle);
                }
                if (rcell19.getNumericCellValue() <= -1) {
                    rcell19.setCellStyle(bodyStyle);
                }
                if (rcell20.getNumericCellValue() <= -1) {
                    rcell20.setCellStyle(bodyStyle);
                }
                if (rcell21.getNumericCellValue() <= -1) {
                    rcell21.setCellStyle(bodyStyle);
                }
                if (rcell22.getNumericCellValue() <= -1) {
                    rcell22.setCellStyle(bodyStyle);
                }
            }

            // ======  Nivel de TOTALES ==========
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
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue(listaData.get(0).totPGROSAMOU);
            CH1_3_T.setCellValue(listaData.get(0).totPDISCAMOU);
            CH1_4_T.setCellValue(listaData.get(0).totPSFEEAMOU);
            CH1_5_T.setCellValue(listaData.get(0).totPADJAMOUN);
            CH1_6_T.setCellValue(listaData.get(0).totPTAXAMOU);
            CH1_7_T.setCellValue(listaData.get(0).totODBALAMOU);
            CH1_8_T.setCellValue(listaData.get(0).totPNETAMOU);
            CH1_9_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_10_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_11_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_12_T.setCellValue(listaData.get(0).totADJAMOUNC);
            CH1_13_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_14_T.setCellValue(listaData.get(0).totODBALAMOUC);
            CH1_15_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_16_T.setCellValue(listaData.get(0).totDIFF_PGROSAMOU);
            CH1_17_T.setCellValue(listaData.get(0).totDIFF_PDISCAMOU);
            CH1_18_T.setCellValue(listaData.get(0).totDIFF_PSFEEAMOU);
            CH1_19_T.setCellValue(listaData.get(0).totDIFF_PADJAMOUN);
            CH1_20_T.setCellValue(listaData.get(0).totDIFF_PTAXAMOU);
            CH1_21_T.setCellValue(listaData.get(0).totDIFF_ODBALAMOU);
            CH1_22_T.setCellValue(listaData.get(0).totDIFF_PNETAMOU);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);

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

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Summary Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            String date = "";
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("AX Number");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Curr");
            CH1_5.setCellValue("Summary");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("Differences");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);
            Cell CH2_31 = row2.createCell(31);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("GROSS");
            CH2_6.setCellValue("Discount");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("NET");
            CH2_15.setCellValue("GROSS");
            CH2_16.setCellValue("Discount");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("NET");
            CH2_25.setCellValue("GROSS");
            CH2_26.setCellValue("Discount");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("Net");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);
            Cell CH3_28 = row3.createCell(28);
            Cell CH3_29 = row3.createCell(29);
            Cell CH3_30 = row3.createCell(30);
            Cell CH3_31 = row3.createCell(31);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("Pay Rate");
            CH3_7.setCellValue("Sale Rate");
            CH3_8.setCellValue("Commission");
            CH3_9.setCellValue("Serv. Fee");
            CH3_10.setCellValue("Adjustment");
            CH3_11.setCellValue("VAT Rate");
            CH3_12.setCellValue("VAT");
            CH3_13.setCellValue("Op. Debit");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("Pay Rate");
            CH3_17.setCellValue("Sale Rate");
            CH3_18.setCellValue("Commission");
            CH3_19.setCellValue("Serv. Fee");
            CH3_20.setCellValue("Adjustment");
            CH3_21.setCellValue("VAT Rate");
            CH3_22.setCellValue("VAT");
            CH3_23.setCellValue("Op. Debit");
            CH3_24.setCellValue("");
            CH3_25.setCellValue("");
            CH3_26.setCellValue("Commission");
            CH3_27.setCellValue("Serv. Fee");
            CH3_28.setCellValue("Adjustment");
            CH3_29.setCellValue("VAT");
            CH3_30.setCellValue("Op. Debit");
            CH3_31.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);
            CH3_28.setCellStyle(headerStyle);
            CH3_29.setCellStyle(headerStyle);
            CH3_30.setCellStyle(headerStyle);
            CH3_31.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)         
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 31, 31));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 31));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 30));

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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).AXPAYNBR);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).PCURRENCY);
                rcell5.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell6.setCellValue(listaData.get(vi).RATECOMBA + "%");
                rcell7.setCellValue(listaData.get(vi).RATECOMSM + "%");
                rcell8.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell9.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell10.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell11.setCellValue(listaData.get(vi).RATEIVABA + "%");
                rcell12.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell13.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell14.setCellValue(listaData.get(vi).PNETAMOU);
                rcell15.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell16.setCellValue(listaData.get(vi).RATECOMBAC + "%");
                rcell17.setCellValue(listaData.get(vi).RATECOMSMC + "%");
                rcell18.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell19.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell20.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell21.setCellValue(listaData.get(vi).RATEIVABAC + "%");
                rcell22.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell23.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell24.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell25.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell26.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell27.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell29.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell30.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell31.setCellValue(listaData.get(vi).DIFF_PNETAMOU);

                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell3.setCellStyle(bodyStyle);
                }
                if (rcell25.getNumericCellValue() <= -1) {
                    rcell25.setCellStyle(bodyStyle);
                }
                if (rcell26.getNumericCellValue() <= -1) {
                    rcell26.setCellStyle(bodyStyle);
                }
                if (rcell27.getNumericCellValue() <= -1) {
                    rcell27.setCellStyle(bodyStyle);
                }
                if (rcell28.getNumericCellValue() <= -1) {
                    rcell28.setCellStyle(bodyStyle);
                }
                if (rcell29.getNumericCellValue() <= -1) {
                    rcell29.setCellStyle(bodyStyle);
                }
                if (rcell30.getNumericCellValue() <= -1) {
                    rcell30.setCellStyle(bodyStyle);
                }
                if (rcell31.getNumericCellValue() <= -1) {
                    rcell31.setCellStyle(bodyStyle);
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
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);
            Cell CH1_31_T = rowTotal.createCell(31);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue(listaData.get(0).totPGROSAMOU);
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue(listaData.get(0).totPDISCAMOU);
            CH1_9_T.setCellValue(listaData.get(0).totPSFEEAMOU);
            CH1_10_T.setCellValue(listaData.get(0).totPADJAMOUN);
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue(listaData.get(0).totPTAXAMOU);
            CH1_13_T.setCellValue(listaData.get(0).totODBALAMOU);
            CH1_14_T.setCellValue(listaData.get(0).totPNETAMOU);
            CH1_15_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_19_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_20_T.setCellValue(listaData.get(0).totADJAMOUNC);
            CH1_21_T.setCellValue("");
            CH1_22_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_23_T.setCellValue(listaData.get(0).totODBALAMOUC);
            CH1_24_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_25_T.setCellValue(listaData.get(0).totDIFF_PGROSAMOU);
            CH1_26_T.setCellValue(listaData.get(0).totDIFF_PDISCAMOU);
            CH1_27_T.setCellValue(listaData.get(0).totDIFF_PSFEEAMOU);
            CH1_28_T.setCellValue(listaData.get(0).totDIFF_PADJAMOUN);
            CH1_29_T.setCellValue(listaData.get(0).totDIFF_PTAXAMOU);
            CH1_30_T.setCellValue(listaData.get(0).totDIFF_ODBALAMOU);
            CH1_31_T.setCellValue(listaData.get(0).totDIFF_PNETAMOU);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);
            CH1_31_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);

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

    @RequestMapping(value = "getXLSXChargeback")
    public @ResponseBody
    void getXLSXChargeback(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXChargeback");
        String fileNameDownload = String.format("Adjustment Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4118Filter> listaData = this.getListChargeback(request, true);
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
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);

            CH1_0.setCellValue("Source");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Number");
            CH1_3.setCellValue("Invoice Refer.Number PNR");
            CH1_4.setCellValue("Indus.Speci.Ref.Nbr");
            CH1_5.setCellValue("Reason Code");
            CH1_6.setCellValue("Description");
            CH1_7.setCellValue("Chargeback");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Result Reconciliation Chargeback");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));
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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("NET");
            CH2_12.setCellValue("GROSS");
            CH2_13.setCellValue("Discount");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("NET");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Commission");
            CH3_9.setCellValue("Serv.Fee");
            CH3_10.setCellValue("VAT");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("Commission");
            CH3_14.setCellValue("Serv.Fee");
            CH3_15.setCellValue("VAT");
            CH3_16.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));

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

                rcell0.setCellValue(listaData.get(vi).RECTYPE);
                rcell1.setCellValue(listaData.get(vi).desCERROR);
                rcell2.setCellValue(listaData.get(vi).CHADJNBR);
                rcell3.setCellValue(listaData.get(vi).INVORNBR);
                rcell4.setCellValue(listaData.get(vi).ISREFNBR);
                rcell5.setCellValue(listaData.get(vi).CHAADJCOD);
                rcell6.setCellValue(listaData.get(vi).CHAADJDES);
                rcell7.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell8.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell9.setCellValue(listaData.get(vi).SFEEAMOUN);
                rcell10.setCellValue(listaData.get(vi).TAXAMOUN);
                rcell11.setCellValue(listaData.get(vi).NETAMOUN);
                rcell12.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell13.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell14.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell15.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell16.setCellValue(listaData.get(vi).NETAMOUNC);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_8_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_9_T.setCellValue(listaData.get(0).totSFEEAMOUN);
            CH1_10_T.setCellValue(listaData.get(0).totTAXAMOUN);
            CH1_11_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_12_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_13_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_14_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_16_T.setCellValue(listaData.get(0).totNETAMOUNC);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXSubmission")
    public @ResponseBody
    void getXLSXSubmission(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXSubmission");
        String fileNameDownload = String.format("Submission Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4115Filter> listaData = this.getListSubmission(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("Submission");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("Submission");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Result Reconciliation Submission vs Transaction/Pricing");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));
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

            CH2_0.setCellValue("Merchant ID");
            CH2_1.setCellValue("Status");
            CH2_2.setCellValue("Sales Merchant ID");
            CH2_3.setCellValue("ID Sub.");
            CH2_4.setCellValue("Submis Date");
            CH2_5.setCellValue("AMEX Process Date");
            CH2_6.setCellValue("Invoice Number");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("NET");
            CH2_11.setCellValue("Transact. Count");
            CH2_12.setCellValue("GROSS");
            CH2_13.setCellValue("Discount");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("NET");
            CH2_16.setCellValue("Transact. Count");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));

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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Commission");
            CH3_9.setCellValue("VAT Commission");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("Commission");
            CH3_14.setCellValue("VAT Commission");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

                rcell0.setCellValue(listaData.get(vi).MERCHID);
                rcell1.setCellValue(listaData.get(vi).desCERROR);
                rcell2.setCellValue(listaData.get(vi).SMERCHID);
                rcell3.setCellValue(listaData.get(vi).IDITEMS);
                rcell4.setCellValue(listaData.get(vi).BSUMDATE);
                rcell5.setCellValue(listaData.get(vi).AXPRODAT);
                rcell6.setCellValue(listaData.get(vi).SIREFNBR);
                rcell7.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell8.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell9.setCellValue(listaData.get(vi).TAXAMOUN);
                rcell10.setCellValue(listaData.get(vi).NETAMOUN);
                rcell11.setCellValue(listaData.get(vi).TRANCOUNT);
                rcell12.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell13.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell14.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell15.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell16.setCellValue(listaData.get(vi).TRANCOUNTC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell1.setCellStyle(bodyStyle);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_8_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_9_T.setCellValue(listaData.get(0).totTAXAMOUN);
            CH1_10_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_11_T.setCellValue(listaData.get(0).totTRANCOUNT);
            CH1_12_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_13_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_14_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_16_T.setCellValue(listaData.get(0).totTRANCOUNTC);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXTransaction")
    public @ResponseBody
    void getXLSXTransaction(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXTransaction");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListTransaction(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Transaction");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Transaction Amount");
            CH1_13.setCellValue("MSI");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("Commission Base");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("Result Reconciliation Transaction");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 27));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);

            CH2_0.setCellValue("Merchant ID");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("Sales Merchant ID");
            CH2_3.setCellValue("ID Tran.");
            CH2_4.setCellValue("Invoice Refer.Number PNR");
            CH2_5.setCellValue("Seller ID");
            CH2_6.setCellValue("Installment");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Card Account Number");
            CH2_9.setCellValue("Approval Code");
            CH2_10.setCellValue("Indust.Speci. Ref.Nbr");
            CH2_11.setCellValue("Date");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("Rate Comm.");
            CH2_14.setCellValue("Serv.Fee");
            CH2_15.setCellValue("Accel Amount");
            CH2_16.setCellValue("Total Comm.");
            CH2_17.setCellValue("Discount Rate");
            CH2_18.setCellValue("Discount Amount");
            CH2_19.setCellValue("Discount Rate VAT");
            CH2_20.setCellValue("Discount Amount VAT");
            CH2_21.setCellValue("Transaction Amount");
            CH2_22.setCellValue("MSI");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("Commission Base");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("");
            CH2_27.setCellValue("");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 27));
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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("Plan");
            CH3_7.setCellValue("Number");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("Rate Comm.");
            CH3_23.setCellValue("Total Comm.");
            CH3_24.setCellValue("Discount Rate Comm.");
            CH3_25.setCellValue("Discount Amount Comm.");
            CH3_26.setCellValue("Discount Rate VAT.");
            CH3_27.setCellValue("Discount Amount VAT.");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 27, 27));
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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);

                rcell0.setCellValue(listaData.get(vi).MERCHID);
                rcell1.setCellValue(listaData.get(vi).desCERROR);
                rcell2.setCellValue(listaData.get(vi).SMERCHID);
                rcell3.setCellValue(listaData.get(vi).IDITEMT);
                rcell4.setCellValue(listaData.get(vi).INVORNBR);
                rcell5.setCellValue(listaData.get(vi).SELLERID);
                rcell6.setCellValue(listaData.get(vi).NBRINSTA);
                rcell7.setCellValue(listaData.get(vi).INSTANBR);
                rcell8.setCellValue(listaData.get(vi).SCARDN);
                rcell9.setCellValue(listaData.get(vi).SAUTHOC);
                rcell10.setCellValue(listaData.get(vi).ISREFNBR);
                rcell11.setCellValue(listaData.get(vi).TRANSDATE);
                rcell12.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell13.setCellValue(listaData.get(vi).RATESFEE);
                rcell14.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell15.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell16.setCellValue(listaData.get(vi).ACCEAMOUC);
                rcell17.setCellValue(listaData.get(vi).DISCRATE);
                rcell18.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell19.setCellValue(listaData.get(vi).DISCRATEI);
                rcell20.setCellValue(listaData.get(vi).DISCAMOUNI);
                rcell21.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell22.setCellValue(listaData.get(vi).RATESFEEC);
                rcell23.setCellValue(listaData.get(vi).SFEEAMOUC);
                rcell24.setCellValue(listaData.get(vi).DISCRATEC);
                rcell25.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell26.setCellValue(listaData.get(vi).DISCRATEIC);
                rcell27.setCellValue(listaData.get(vi).DISCAMOUIC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell1.setCellStyle(bodyStyle);
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
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue(listaData.get(0).TGROSAMOUN_TOTAL);
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).SFEEAMOU_TOTAL);
            CH1_15_T.setCellValue(listaData.get(0).ACCEAMOU_TOTAL);
            CH1_16_T.setCellValue(listaData.get(0).ACCEAMOUC_TOTAL);
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue(listaData.get(0).DISCAMOUN_TOTAL);
            CH1_19_T.setCellValue("");
            CH1_20_T.setCellValue(listaData.get(0).DISCAMOUNI_TOTAL);
            CH1_21_T.setCellValue(listaData.get(0).TGROSAMOUNC_TOTAL);
            CH1_22_T.setCellValue("");
            CH1_23_T.setCellValue(listaData.get(0).SFEEAMOUC_TOTAL);
            CH1_24_T.setCellValue("");
            CH1_25_T.setCellValue(listaData.get(0).DISCAMOUNC_TOTAL);
            CH1_26_T.setCellValue("");
            CH1_27_T.setCellValue(listaData.get(0).DISCAMOUIC_TOTAL);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);

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

    @RequestMapping(value = "getXLSXPricing")
    public @ResponseBody
    void getXLSXPricing(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXPricing");
        String fileNameDownload = String.format("Pricing Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            String date = "";
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4117Filter> listaData = this.getListPricing(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Pricing");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("Transaction Amount");
            CH1_11.setCellValue("Discount");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("Transaction Amount");
            CH1_16.setCellValue("Result Reconciliation Pricing");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 15, 15));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Sales Merchant ID");
            CH2_4.setCellValue("Invoice Refer. Number PNR");
            CH2_5.setCellValue("Card Account Number");
            CH2_6.setCellValue("Approval Code");
            CH2_7.setCellValue("ID Tran.");
            CH2_8.setCellValue("Fee Code");
            CH2_9.setCellValue("Transaction Date");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("Commission");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("VAT");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("Commission");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("VAT");
            CH2_19.setCellValue("");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 19));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("Rate");
            CH3_12.setCellValue("Amount");
            CH3_13.setCellValue("Rate");
            CH3_14.setCellValue("Amount");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("Rate");
            CH3_17.setCellValue("Amount");
            CH3_18.setCellValue("Rate");
            CH3_19.setCellValue("Amount");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).MERCHID);
                rcell2.setCellValue(listaData.get(vi).desCERROR);
                rcell3.setCellValue(listaData.get(vi).SMERCHID);
                rcell4.setCellValue(listaData.get(vi).INVORNBR);
                rcell5.setCellValue(listaData.get(vi).SCARDN);
                rcell6.setCellValue(listaData.get(vi).SAUTHOC);
                rcell7.setCellValue(listaData.get(vi).IDITEMT);
                rcell8.setCellValue(listaData.get(vi).FEECODE);
                rcell9.setCellValue(listaData.get(vi).TRANSDATE);
                rcell10.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell11.setCellValue(listaData.get(vi).DISCRATE_IMPORT);
                rcell12.setCellValue(listaData.get(vi).DISCAMOUN_IMPORT);
                rcell13.setCellValue(listaData.get(vi).DISCRATE_IVA);
                rcell14.setCellValue(listaData.get(vi).DISCAMOUN_IVA);
                rcell15.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell16.setCellValue(listaData.get(vi).DISCRATEBA_IMPORT);
                rcell17.setCellValue(listaData.get(vi).DISCAMOUNC_IMPORT);
                rcell18.setCellValue(listaData.get(vi).DISCRATEBA_IVA);
                rcell19.setCellValue(listaData.get(vi).DISCAMOUNC_IVA);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell2.setCellStyle(bodyStyle);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue(listaData.get(0).totDISCAMOUN_IMPORT);
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).totDISCAMOUN_IVA);
            CH1_15_T.setCellValue(listaData.get(0).totTGROSAMOUC);
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue(listaData.get(0).totDISCAMOUNC_IMPORT);
            CH1_18_T.setCellValue("");
            CH1_19_T.setCellValue(listaData.get(0).totDISCAMOUNC_IVA);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXMainSettlement")
    public @ResponseBody
    void getXLSXMainSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSettlement");
        String fileNameDownload = String.format("Main Settlement Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListMainSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Currency");
            CH1_2.setCellValue("GROSS Amount");
            CH1_3.setCellValue("Commission");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("Serv. Fee");
            CH1_6.setCellValue("Acceleration Amount");
            CH1_7.setCellValue("VAT COM 1+2");
            CH1_8.setCellValue("Chargeback");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("Net amount to receive AM");
            CH1_12.setCellValue("Currency Settlement");
            CH1_13.setCellValue("Reconciled Net Amount");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 10));

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));

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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Amount");
            CH2_4.setCellValue("VAT");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Amount");
            CH2_9.setCellValue("Commission");
            CH2_10.setCellValue("VAT");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PCURRENCY);
                rcell2.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell3.setCellValue(listaData.get(vi).DISCAMOUN_IMPORT);
                rcell4.setCellValue(listaData.get(vi).DISCAMOUN_IVA);
                rcell5.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell6.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell7.setCellValue(listaData.get(vi).TAXAMOUN_AD);
                rcell8.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell9.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell10.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell11.setCellValue(listaData.get(vi).NETAMOUN);
                rcell12.setCellValue(listaData.get(vi).PCURRENCY);
                rcell13.setCellValue(listaData.get(vi).NETAMOUNC);
                iter.next();
                ++vi;
                ++vj;
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

    @RequestMapping(value = "getXLSXSettlement")
    public @ResponseBody
    void getXLSXSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXSettlement");
        String fileNameDownload = String.format("Settlement Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Merchant");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Currency");
            CH1_4.setCellValue("GROSS Amount");
            CH1_5.setCellValue("Commission");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("Serv. Fee");
            CH1_11.setCellValue("Acceleration Amount");
            CH1_12.setCellValue("VAT COM 1+2");
            CH1_13.setCellValue("Chargeback");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("Net Amount to Receive AM");
            CH1_17.setCellValue("Currency Settlement");
            CH1_18.setCellValue("Reconciled Net Amount");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("Pay Rate");
            CH2_6.setCellValue("Sale Rate");
            CH2_7.setCellValue("Amount");
            CH2_8.setCellValue("VAT Rate");
            CH2_9.setCellValue("VAT");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("Amount");
            CH2_14.setCellValue("Commission");
            CH2_15.setCellValue("VAT");
            CH2_16.setCellValue("");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).MERCHID);
                rcell2.setCellValue(listaData.get(vi).desCERROR);
                rcell3.setCellValue(listaData.get(vi).PCURRENCY);
                rcell4.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell5.setCellValue(listaData.get(vi).DISCRATE_IMPORT);
                rcell6.setCellValue(listaData.get(vi).RATECOMSM);
                rcell7.setCellValue(listaData.get(vi).DISCAMOUN_IMPORT);
                rcell8.setCellValue(listaData.get(vi).DISCRATE_IVA);
                rcell9.setCellValue(listaData.get(vi).DISCAMOUN_IVA);
                rcell10.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell11.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell12.setCellValue(listaData.get(vi).TAXAMOUN_AD);
                rcell13.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell14.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell15.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell16.setCellValue(listaData.get(vi).NETAMOUN);
                rcell17.setCellValue(listaData.get(vi).PCURRENCY);
                rcell18.setCellValue(listaData.get(vi).NETAMOUNC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell2.setCellStyle(bodyStyle);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).totDISCAMOUN_IMPORT);
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue(listaData.get(0).totDISCAMOUN_IVA);
            CH1_10_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_11_T.setCellValue(listaData.get(0).totACCEAMOU);
            CH1_12_T.setCellValue(listaData.get(0).totTAXAMOUN_AD);
            CH1_13_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_14_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_15_T.setCellValue(listaData.get(0).totTAXAMOUN_CB);
            CH1_16_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue(listaData.get(0).totNETAMOUNC);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXDetSettlement")
    public @ResponseBody
    void getXLSXDetSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetSettlement");
        String fileNameDownload = String.format("Settlement Detail Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListDetSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);
            Cell CH1_32 = row1.createCell(32);
            Cell CH1_33 = row1.createCell(33);
            Cell CH1_34 = row1.createCell(34);
            Cell CH1_35 = row1.createCell(35);
            Cell CH1_36 = row1.createCell(36);
            Cell CH1_37 = row1.createCell(37);
            Cell CH1_38 = row1.createCell(38);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Transaction");
            CH1_2.setCellValue("Passed");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("Transaction");
            CH1_6.setCellValue("Qty Tkts");
            CH1_7.setCellValue("Invoice Refer.Number PNR");
            CH1_8.setCellValue("PNR");
            CH1_9.setCellValue("Indust.Speci.Ref.Nbr");
            CH1_10.setCellValue("Card Number");
            CH1_11.setCellValue("Auth.");
            CH1_12.setCellValue("Installment Plan");
            CH1_13.setCellValue("Installment Number");
            CH1_14.setCellValue("Transaction Amount");
            CH1_15.setCellValue("MSI");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("Commission Base");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("Result Reconciliation Transaction");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("Chargeback");
            CH1_33.setCellValue("");
            CH1_34.setCellValue("");
            CH1_35.setCellValue("Net Amount to Recive AM");
            CH1_36.setCellValue("Currency Settlement");
            CH1_37.setCellValue("Calculated Commission");
            CH1_38.setCellValue("Rule");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_32.setCellStyle(headerStyle);
            CH1_33.setCellStyle(headerStyle);
            CH1_34.setCellStyle(headerStyle);
            CH1_35.setCellStyle(headerStyle);
            CH1_36.setCellStyle(headerStyle);
            CH1_37.setCellStyle(headerStyle);
            CH1_38.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 37, 37));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 38, 38));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);
            Cell CH2_31 = row2.createCell(31);
            Cell CH2_32 = row2.createCell(32);
            Cell CH2_33 = row2.createCell(33);
            Cell CH2_34 = row2.createCell(34);
            Cell CH2_35 = row2.createCell(35);
            Cell CH2_36 = row2.createCell(36);
            Cell CH2_37 = row2.createCell(37);
            Cell CH2_38 = row2.createCell(38);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Days");
            CH2_3.setCellValue("Reconciliation Settlement");
            CH2_4.setCellValue("Settlement vs Sales");
            CH2_5.setCellValue("Type");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("Rate Comm.");
            CH2_16.setCellValue("Serv.Fee");
            CH2_17.setCellValue("Accel.Amount");
            CH2_18.setCellValue("Total Comm.");
            CH2_19.setCellValue("VAT COMM 1 2");
            CH2_20.setCellValue("Discount Rate");
            CH2_21.setCellValue("Discount Amount");
            CH2_22.setCellValue("Discount Rate AV");
            CH2_23.setCellValue("Discount Amount AV");
            CH2_24.setCellValue("Transaction Amount");
            CH2_25.setCellValue("MSI");
            CH2_26.setCellValue("");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("Commission Base");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("");
            CH2_32.setCellValue("Amount");
            CH2_33.setCellValue("Commission");
            CH2_34.setCellValue("VAT");
            CH2_35.setCellValue("");
            CH2_36.setCellValue("");
            CH2_37.setCellValue("");
            CH2_38.setCellValue("");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_32.setCellStyle(headerStyle);
            CH2_33.setCellStyle(headerStyle);
            CH2_34.setCellStyle(headerStyle);
            CH2_35.setCellStyle(headerStyle);
            CH2_36.setCellStyle(headerStyle);
            CH2_37.setCellStyle(headerStyle);
            CH2_38.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 31));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 34, 34));
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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);
            Cell CH3_28 = row3.createCell(28);
            Cell CH3_29 = row3.createCell(29);
            Cell CH3_30 = row3.createCell(30);
            Cell CH3_31 = row3.createCell(31);
            Cell CH3_32 = row3.createCell(32);
            Cell CH3_33 = row3.createCell(33);
            Cell CH3_34 = row3.createCell(34);
            Cell CH3_35 = row3.createCell(35);
            Cell CH3_36 = row3.createCell(36);
            Cell CH3_37 = row3.createCell(37);
            Cell CH3_38 = row3.createCell(38);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("");
            CH3_24.setCellValue("");
            CH3_25.setCellValue("Rate Comm.");
            CH3_26.setCellValue("Total Comm.");
            CH3_27.setCellValue("VAT COMM 1 2");
            CH3_28.setCellValue("Discount Rate Comm.");
            CH3_29.setCellValue("Discount Amount Comm.");
            CH3_30.setCellValue("Discount Rate VAT");
            CH3_31.setCellValue("Discount Amount VAT");
            CH3_32.setCellValue("");
            CH3_33.setCellValue("");
            CH3_34.setCellValue("");
            CH3_35.setCellValue("");
            CH3_36.setCellValue("");
            CH3_37.setCellValue("");
            CH3_38.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);
            CH3_28.setCellStyle(headerStyle);
            CH3_29.setCellStyle(headerStyle);
            CH3_30.setCellStyle(headerStyle);
            CH3_31.setCellStyle(headerStyle);
            CH3_32.setCellStyle(headerStyle);
            CH3_33.setCellStyle(headerStyle);
            CH3_34.setCellStyle(headerStyle);
            CH3_35.setCellStyle(headerStyle);
            CH3_36.setCellStyle(headerStyle);
            CH3_37.setCellStyle(headerStyle);
            CH3_38.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 31, 31));
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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);
                Cell rcell32 = row1.createCell(32);
                Cell rcell33 = row1.createCell(33);
                Cell rcell34 = row1.createCell(34);
                Cell rcell35 = row1.createCell(35);
                Cell rcell36 = row1.createCell(36);
                Cell rcell37 = row1.createCell(37);
                Cell rcell38 = row1.createCell(38);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).TRANSDATE);
                rcell2.setCellValue(listaData.get(vi).PASSED_DAYS);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).descSTVAL);
                rcell5.setCellValue(listaData.get(vi).RECTYPE);
                rcell6.setCellValue(listaData.get(vi).QTYTKT);
                rcell7.setCellValue(listaData.get(vi).INVORNBR);
                rcell8.setCellValue(listaData.get(vi).SPNR);
                rcell9.setCellValue(listaData.get(vi).ISREFNBR);
                rcell10.setCellValue(listaData.get(vi).SCARDN);
                rcell11.setCellValue(listaData.get(vi).SAUTHOC);
                rcell12.setCellValue(listaData.get(vi).NBRINSTA);
                rcell13.setCellValue(listaData.get(vi).INSTANBR);
                rcell14.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell15.setCellValue(listaData.get(vi).RATESFEE);
                rcell16.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell17.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell18.setCellValue(listaData.get(vi).ACCEAMOUC);
                rcell19.setCellValue(listaData.get(vi).IVACOM12);
                rcell20.setCellValue(listaData.get(vi).DISCRATE);
                rcell21.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell22.setCellValue(listaData.get(vi).DISCRATEI);
                rcell23.setCellValue(listaData.get(vi).DISCAMOUNI);
                rcell24.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell25.setCellValue(listaData.get(vi).RATESFEEC);
                rcell26.setCellValue(listaData.get(vi).SFEEAMOUC);
                rcell27.setCellValue(listaData.get(vi).VATCOMMSIC);
                rcell28.setCellValue(listaData.get(vi).DISCRATEC);
                rcell29.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell30.setCellValue(listaData.get(vi).DISCRATEIC);
                rcell31.setCellValue(listaData.get(vi).DISCAMOUIC);
                rcell32.setCellValue(listaData.get(vi).GROSAMOUN_CB);
                rcell33.setCellValue(listaData.get(vi).DISCAMOUN_CB);
                rcell34.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell35.setCellValue(listaData.get(vi).NETAMOUN);
                rcell36.setCellValue(listaData.get(vi).IN_PCURRENCY);
                rcell37.setCellValue(listaData.get(vi).DISCAMOSC);
                rcell38.setCellValue(listaData.get(vi).descFREGLA);

                if (listaData.get(vi).CERROR.equals("")) {
                    //nadine
                } else {
                    rcell3.setCellStyle(bodyStyle);
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
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);
            Cell CH1_31_T = rowTotal.createCell(31);
            Cell CH1_32_T = rowTotal.createCell(32);
            Cell CH1_33_T = rowTotal.createCell(33);
            Cell CH1_34_T = rowTotal.createCell(34);
            Cell CH1_35_T = rowTotal.createCell(35);
            Cell CH1_36_T = rowTotal.createCell(36);
            Cell CH1_37_T = rowTotal.createCell(37);
            Cell CH1_38_T = rowTotal.createCell(38);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_15_T.setCellValue("");
            CH1_16_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_17_T.setCellValue(listaData.get(0).totACCEAMOU);
            CH1_18_T.setCellValue(listaData.get(0).ACCEAMOUC_TOTAL);
            CH1_19_T.setCellValue(listaData.get(0).totIVACOM12);
            CH1_20_T.setCellValue("");
            CH1_21_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_22_T.setCellValue("");
            CH1_23_T.setCellValue(listaData.get(0).DISCAMOUNI_TOTAL);
            CH1_24_T.setCellValue(listaData.get(0).TGROSAMOUC_TOTAL);
            CH1_25_T.setCellValue("");
            CH1_26_T.setCellValue(listaData.get(0).SFEEAMOUC_TOTAL);
            CH1_27_T.setCellValue(listaData.get(0).VATCOMMSIC_TOTAL);
            CH1_28_T.setCellValue("");
            CH1_29_T.setCellValue(listaData.get(0).DISCAMOUNC_TOTAL);
            CH1_30_T.setCellValue("");
            CH1_31_T.setCellValue(listaData.get(0).DISCAMOUIC_TOTAL);
            CH1_32_T.setCellValue(listaData.get(0).totGROSAMOUN_CB);
            CH1_33_T.setCellValue(listaData.get(0).DISCAMOUN_CB_TOTAL);
            CH1_34_T.setCellValue(listaData.get(0).totTAXAMOUN_CB);
            CH1_35_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_36_T.setCellValue("");
            CH1_37_T.setCellValue(listaData.get(0).totDISCAMOSC);
            CH1_38_T.setCellValue("");

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);
            CH1_31_T.setCellStyle(totalStyle);
            CH1_32_T.setCellStyle(totalStyle);
            CH1_33_T.setCellStyle(totalStyle);
            CH1_34_T.setCellStyle(totalStyle);
            CH1_35_T.setCellStyle(totalStyle);
            CH1_36_T.setCellStyle(totalStyle);
            CH1_37_T.setCellStyle(totalStyle);
            CH1_38_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);

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

    @RequestMapping(value = "getXLSXMainErrorTransactiont")
    public @ResponseBody
    void getXLSXMainErrorTransactiont(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainErrorTransactiont");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListErrorTransaction(request, true);
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
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("Error");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("Transaction");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("Transaction Amount");
            CH1_15.setCellValue("MSI");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("Commision Base");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("Result Reconciliation Transaction");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 29));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("Code");
            CH2_3.setCellValue("Description");
            CH2_4.setCellValue("Sales Merchant ID");
            CH2_5.setCellValue("ID tran.");
            CH2_6.setCellValue("Indust.Speci.Ref.Nbr TKT");
            CH2_7.setCellValue("Invoice Refer. Number PNR");
            CH2_8.setCellValue("Seller ID");
            CH2_9.setCellValue("Installment");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("Card Account Number");
            CH2_12.setCellValue("Approval Code");
            CH2_13.setCellValue("Date");
            CH2_14.setCellValue("Transaction Amount");
            CH2_15.setCellValue("Rate Comm.");
            CH2_16.setCellValue("Serv.Free");
            CH2_17.setCellValue("Accel.Amount");
            CH2_18.setCellValue("Total Comm.");
            CH2_19.setCellValue("Discount Rate");
            CH2_20.setCellValue("Discount Amount");
            CH2_21.setCellValue("Discount Rate VAT");
            CH2_22.setCellValue("Discount Amount VAT");
            CH2_23.setCellValue("Transaction Amount");
            CH2_24.setCellValue("MSI");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("Commision Base");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 29));

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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);
            Cell CH3_28 = row3.createCell(28);
            Cell CH3_29 = row3.createCell(29);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("Plan");
            CH3_10.setCellValue("Number");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("");
            CH3_24.setCellValue("Rate Comm.");
            CH3_25.setCellValue("Total Comm.");
            CH3_26.setCellValue("Discount Rate Comm.");
            CH3_27.setCellValue("Discount Amount Co...");
            CH3_28.setCellValue("Discount Rate VAT.");
            CH3_29.setCellValue("Discount Amount VAT");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);
            CH3_28.setCellStyle(headerStyle);
            CH3_29.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 28, 28));
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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).MERCHID);
                rcell2.setCellValue(listaData.get(vi).CERROR);
                rcell3.setCellValue(listaData.get(vi).DES_CERROR);
                rcell4.setCellValue(listaData.get(vi).SMERCHID);
                rcell5.setCellValue(listaData.get(vi).IDITEMT);
                rcell6.setCellValue(listaData.get(vi).ISREFNBR);
                rcell7.setCellValue(listaData.get(vi).INVORNBR);
                rcell8.setCellValue(listaData.get(vi).SELLERID);
                rcell9.setCellValue(listaData.get(vi).NBRINSTA);
                rcell10.setCellValue(listaData.get(vi).INSTANBR);
                rcell11.setCellValue(listaData.get(vi).SCARDN);
                rcell12.setCellValue(listaData.get(vi).SAUTHOC);
                rcell13.setCellValue(listaData.get(vi).TRANSDATE);
                //rcell14.setCellValue(listaData.get(vi).TRANSID);
                //rcell15.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell14.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell15.setCellValue(listaData.get(vi).RATESFEE);
                rcell16.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell17.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell18.setCellValue(listaData.get(vi).ACCEAMOUC);
                rcell19.setCellValue(listaData.get(vi).DISCRATE);
                rcell20.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell21.setCellValue(listaData.get(vi).DISCRATEI);
                rcell22.setCellValue(listaData.get(vi).DISCAMOUNI);
                rcell23.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell24.setCellValue(listaData.get(vi).RATESFEEC);
                rcell25.setCellValue(listaData.get(vi).SFEEAMOUC);
                rcell26.setCellValue(listaData.get(vi).DISCRATEC);
                rcell27.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell28.setCellValue(listaData.get(vi).DISCRATEIC);
                rcell29.setCellValue(listaData.get(vi).DISCAMOUIC);
                //     rcell30.setCellValue(listaData.get(vi).FINSAMOUC);
                //   rcell31.setCellValue(listaData.get(vi).SINSAMOUC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell3.setCellStyle(bodyStyle);
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
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).TGROSAMOUN_TOTAL);
            CH1_15_T.setCellValue("");
            CH1_16_T.setCellValue(listaData.get(0).SFEEAMOU_TOTAL);
            CH1_17_T.setCellValue(listaData.get(0).ACCEAMOU_TOTAL);
            CH1_18_T.setCellValue(listaData.get(0).ACCEAMOUC_TOTAL);
            CH1_19_T.setCellValue("");
            CH1_20_T.setCellValue(listaData.get(0).DISCAMOUN_TOTAL);
            CH1_21_T.setCellValue("");
            CH1_22_T.setCellValue(listaData.get(0).DISCAMOUNI_TOTAL);
            CH1_23_T.setCellValue(listaData.get(0).TGROSAMOUNC_TOTAL);
            CH1_24_T.setCellValue("");
            CH1_25_T.setCellValue(listaData.get(0).SFEEAMOUC_TOTAL);
            CH1_26_T.setCellValue("");
            CH1_27_T.setCellValue(listaData.get(0).DISCAMOUNC_TOTAL);
            CH1_28_T.setCellValue("");
            CH1_29_T.setCellValue(listaData.get(0).DISCAMOUIC_TOTAL);

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);

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

    @RequestMapping(value = "getXLSXMainAdjustment")
    public @ResponseBody
    void getXLSXMainAdjustment(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainAdjustment");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4118Filter> listaData = this.getListMainAdjustment(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Merchant ID");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Sales");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("Reason Code");
            CH1_7.setCellValue("Description");
            CH1_8.setCellValue("Curr.");
            CH1_9.setCellValue("GROSS");
            CH1_10.setCellValue("Discount");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("NET");
            CH1_14.setCellValue("Result Reconciliation Summary");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("Accounting");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 18));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Merchant");
            CH2_4.setCellValue("Date");
            CH2_5.setCellValue("Number");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("Commission");
            CH2_11.setCellValue("Serv.fee");
            CH2_12.setCellValue("VAT");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("ID");
            CH2_17.setCellValue("Status");
            CH2_18.setCellValue("Date");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("Net");
            CH3_15.setCellValue("Serv.Fee");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).MERCHID);
                rcell2.setCellValue(listaData.get(vi).desCERROR);
                rcell3.setCellValue(listaData.get(vi).SMERCHID);
                rcell4.setCellValue(listaData.get(vi).BSUMDATE);
                rcell5.setCellValue(listaData.get(vi).CHADJNBR);
                rcell6.setCellValue(listaData.get(vi).CHAADJCOD);
                rcell7.setCellValue(listaData.get(vi).CHAADJDES);
                rcell8.setCellValue(listaData.get(vi).PCURRENCY);
                rcell9.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell10.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell11.setCellValue(listaData.get(vi).SFEEAMOUN);
                rcell12.setCellValue(listaData.get(vi).TAXAMOUN);
                rcell13.setCellValue(listaData.get(vi).NETAMOUN);
                rcell14.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell15.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell16.setCellValue(listaData.get(vi).IDCON);
                rcell17.setCellValue(listaData.get(vi).STCON);
                rcell18.setCellValue(listaData.get(vi).FCONT);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell2.setCellStyle(bodyStyle);
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_10_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_11_T.setCellValue(listaData.get(0).totSFEEAMOUN);
            CH1_12_T.setCellValue(listaData.get(0).totTAXAMOUN);
            CH1_13_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_14_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue("");

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
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);

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

    //MAIL
    @RequestMapping(value = "sendMail")
    public @ResponseBody
    String sendMail(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- SalesReconciliAmex : sendMail-------------");
        map.put("success", true);
        boolean iboolean;
        A4113Filter objRtn = new A4113Filter();

        objRtn.DATE = request.getParameter("DATE");
        objRtn.AXPAYNBR = request.getParameter("AXPAYNBR");
        objRtn.PMERCHID = request.getParameter("PMERCHID");
        objRtn.PCURRENCY = request.getParameter("PCURRENCY");
        objRtn.DIFF_PNETAMOU_STRING = request.getParameter("DIFF_PNETAMOU_STRING");

        // Enviar el Mail            
        iboolean = SendMail(objRtn);
        if (iboolean) {
            map.put("MESSAGE", "Email sent!");
        } else {
            map.put("MESSAGE", "Could not send email!");
        }

        return new Gson().toJson(map);
    }

    public boolean SendMail(A4113Filter Data) throws IOException, Exception {
        boolean iboolean;
        //Data.DATE, Data.AXPAYNBR, Data.PMERCHID, Data.PCURRENCY, Data.DIFF_PNETAMOU_STRING
        ProMail proMail = new ProMail();

        List<String> receptores = new ArrayList<>();
        receptores.add("eneves@miatech.net");
        //receptores.add("rtoledo@aeromexico.com");
        //receptores.add("rpichardor@aeromexico.com");

        List<String> Ccpy = new ArrayList<>();
        Ccpy.add("ctarazona@miatech.net");

        String asunto = "Debit Memo";
        /*
        String mensaje = "<p>Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Se efectuó la conciliación de la liquidación aplicando los acuerdos vigentes encontrando diferencias en los cobros retenidos por comisiones.<br><br>";
        mensaje = mensaje + "\n" + "Adjunto detalle de liquidación:<br>";
        mensaje = mensaje + "\n" + "<ul>";
        mensaje = mensaje + "\n" + "<li>Fecha de liquidación : " + Data.DATE + "</li>";
        mensaje = mensaje + "\n" + "<li>AX Number : " + Data.AXPAYNBR + "</li>";
        mensaje = mensaje + "\n" + "<li>Merchant Number : " + Data.PMERCHID + "</li>";
        mensaje = mensaje + "\n" + "<li>Valor : " + Data.PCURRENCY + " " + Data.DIFF_PNETAMOU_STRING + "</li>";
        mensaje = mensaje + "\n" + "</ul>";
        mensaje = mensaje + "\n" + "Solicitamos nos puedan aclarar este hallazgo.<br><br>";
        mensaje = mensaje + "\n" + "Saludos cordiales.<br><br>";
        mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#616161;font-size:10.5pt;font-family:Open Sans,sans-serif;\">Gerente de Orden al Cobro</span><br>";
        mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
         */
        String mensaje = "Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Derivado de los procesos internos de conciliación,<br>";
        mensaje = mensaje + "\n" + "Hemos detectado  diferencias en el cobro de:<br>";
        mensaje = mensaje + "\n" + "<ul>";
        mensaje = mensaje + "\n" + "<li>Fecha de liquidación : " + Data.DATE + "</li>";
        mensaje = mensaje + "\n" + "<li>AX Number : " + Data.AXPAYNBR + "</li>";
        mensaje = mensaje + "\n" + "<li>Merchant Number : " + Data.PMERCHID + "</li>";
        mensaje = mensaje + "\n" + "<li>Valor : " + Data.PCURRENCY + " " + Data.DIFF_PNETAMOU_STRING + "</li>";
        mensaje = mensaje + "\n" + "</ul>";
        mensaje = mensaje + "\n" + "Según el detalle anexo.<br>";
        mensaje = mensaje + "\n" + "Agradecemos su atención y quedamos atentos a la aclaración de este hallazgo.<br><br></p>";
        mensaje = mensaje + "\n" + "Saludos cordiales.<br><br>";
        mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#616161;font-size:10.5pt;font-family:Open Sans,sans-serif;\">Gerente de Orden al Cobro</span><br>";
        mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";

        String correoMask = "amaclaracionescontracargos@miatech.net";

        List<String> archivos = new ArrayList<>();
        String archivo = this.createFileForEmail(Data);
        archivos.add(archivo);

        iboolean = proMail.sendEmailAMEX(asunto, receptores, Ccpy, mensaje, correoMask, archivos);
        return iboolean;
    }

    public String createFileForEmail(A4113Filter filter) throws Exception {
        System.out.println("Report : createFileForEmail");
        String fileNameDownload = "Settlement Diferences Report " + Functions.getFechaActual() + " " + Functions.getHoraActual() + " ";
        try {
            String date = "";
            Workbook workbook;

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = this.getListForFile(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("AX Number");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Curr");
            CH1_5.setCellValue("Summary");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("Differences");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("GROSS");
            CH2_6.setCellValue("Discount");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("NET");
            CH2_14.setCellValue("GROSS");
            CH2_15.setCellValue("Discount");
            CH2_16.setCellValue("");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("NET");
            CH2_23.setCellValue("GROSS");
            CH2_24.setCellValue("Discount");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("Net");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);
            Cell CH3_28 = row3.createCell(28);
            Cell CH3_29 = row3.createCell(29);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("Rate");
            CH3_7.setCellValue("Commission");
            CH3_8.setCellValue("Serv. Fee");
            CH3_9.setCellValue("Adjustment");
            CH3_10.setCellValue("VAT Rate");
            CH3_11.setCellValue("VAT");
            CH3_12.setCellValue("Op. Debit");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("Rate");
            CH3_16.setCellValue("Commission");
            CH3_17.setCellValue("Serv. Fee");
            CH3_18.setCellValue("Adjustment");
            CH3_19.setCellValue("VAT Rate");
            CH3_20.setCellValue("VAT");
            CH3_21.setCellValue("Op. Debit");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("");
            CH3_24.setCellValue("Commission");
            CH3_25.setCellValue("Serv. Fee");
            CH3_26.setCellValue("Adjustment");
            CH3_27.setCellValue("VAT");
            CH3_28.setCellValue("Op. Debit");
            CH3_29.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);
            CH3_28.setCellStyle(headerStyle);
            CH3_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)         
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 29, 29));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 29));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 28));

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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).AXPAYNBR);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).PCURRENCY);
                rcell5.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell6.setCellValue(listaData.get(vi).RATECOMBA + "%");
                rcell7.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell8.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell9.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell10.setCellValue(listaData.get(vi).RATEIVABA + "%");
                rcell11.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell12.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell13.setCellValue(listaData.get(vi).PNETAMOU);
                rcell14.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell15.setCellValue(listaData.get(vi).RATECOMBAC + "%");
                rcell16.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell17.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell18.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell19.setCellValue(listaData.get(vi).RATEIVABAC + "%");
                rcell20.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell21.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell22.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell23.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell24.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell25.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell26.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell27.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell29.setCellValue(listaData.get(vi).DIFF_PNETAMOU);
                iter.next();
                ++vi;
                ++vj;
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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
             */
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            //workbook.write(response.getOutputStream());
            workbook.write(fos);
            fos.close();
            return file.getAbsolutePath();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "sendMailMultipleDifferences")
    public @ResponseBody
    String sendMailMultipleDifferences(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- SalesReconciliAmex : sendMailMultipleDifferences-------------");
        map.put("success", true);
        boolean iboolean;
        A4113Filter objRtn = new A4113Filter();

        objRtn.IN_DATEFROM = request.getParameter("IN_DATEFROM");
        objRtn.IN_DATETO = request.getParameter("IN_DATETO");
        objRtn.IN_DATE = request.getParameter("IN_DATE");

        // Enviar el Mail            
        iboolean = SendMailMultipleDifferences(objRtn);
        if (iboolean) {
            map.put("MESSAGE", "Email sent!");
        } else {
            map.put("MESSAGE", "Could not send email!");
        }

        return new Gson().toJson(map);
    }

    public boolean SendMailMultipleDifferences(A4113Filter Data) throws IOException, Exception {
        boolean iboolean;
        //Data.DATE, Data.AXPAYNBR, Data.PMERCHID, Data.PCURRENCY, Data.DIFF_PNETAMOU_STRING
        ProMail proMail = new ProMail();

        DecimalFormatSymbols simbolo = new DecimalFormatSymbols();
        simbolo.setDecimalSeparator('.');
        simbolo.setGroupingSeparator(',');
        DecimalFormat formatea = new DecimalFormat("#,###.##", simbolo);
        double a = 0;

        List<String> receptores = new ArrayList<>();
        receptores.add("eneves@miatech.net");
        //receptores.add("rtoledo@aeromexico.com");
        //receptores.add("rpichardor@aeromexico.com");

        List<String> Ccpy = new ArrayList<>();
        Ccpy.add("ctarazona@miatech.net");

        String asunto = "Debit Memo";

        List<A4113Filter> listaData = this.getListForFileMultipleDifferences(Data);

        /*String mensaje = "<html>";
        mensaje = mensaje + "\n" + "<style> table, th, td {  border:1px solid black; } td { text-align: center;} </style>";
        mensaje = mensaje + "\n" + "<body>";
        mensaje = mensaje + "\n" + "<p>Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Se efectuó la conciliación de la liquidación aplicando los acuerdos vigentes encontrando diferencias en los cobros retenidos por comisiones.<br><br>";
        mensaje = mensaje + "\n" + "Adjunto detalle de liquidación:<br>";
        mensaje = mensaje + "\n" + "<table style=\"width:100%\">";
        mensaje = mensaje + "\n" + "<tr>    <th>Fecha de liquidación</th>    <th>AX Number</th>    <th>Merchant Number</th>    <th>Moneda</th>    <th>Valor</th>    </tr>";

        for (int i = 0; i < listaData.size(); i++) {
            a = Functions.redondear(listaData.get(i).DIFF_PNETAMOU, 2);
            String diferencia = formatea.format(a);
            diferencia = diferencia.replace("-", "");
            mensaje = mensaje + "\n" + "<tr>    <td>" + listaData.get(i).DATE + "</td>    <td>" + listaData.get(i).AXPAYNBR + "</td>    <td>" + listaData.get(i).PMERCHID + "</td>    <td>" + listaData.get(i).PCURRENCY + "</td>    <td>" + diferencia + "</td>    </tr>";
        }

        mensaje = mensaje + "\n" + "</table>";

        mensaje = mensaje + "\n" + "Solicitamos nos puedan aclarar este hallazgo.<br><br>";
        mensaje = mensaje + "\n" + "Saludos cordiales.<br><br>";
        mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#616161;font-size:10.5pt;font-family:Open Sans,sans-serif;\">Gerente de Orden al Cobro</span><br>";
        mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
        mensaje = mensaje + "\n" + "</body>";
        mensaje = mensaje + "\n" + "</html>";*/
        String mensaje = "<html>";
        mensaje = mensaje + "\n" + "<style> table, th, td {  border:1px solid black; } td { text-align: center;} </style>";
        mensaje = mensaje + "\n" + "<body>";
        mensaje = mensaje + "\n" + "Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Derivado de los procesos internos de conciliación,<br><br>";
        mensaje = mensaje + "\n" + "Hemos detectado  diferencias en el cobro de:<br>";
        mensaje = mensaje + "\n" + "<table style=\"width:100%\">";
        mensaje = mensaje + "\n" + "<tr>    <th>Fecha de liquidación</th>    <th>AX Number</th>    <th>Merchant Number</th>    <th>Moneda</th>    <th>Valor</th>    </tr>";

        for (int i = 0; i < listaData.size(); i++) {
            a = Functions.redondear(listaData.get(i).DIFF_PNETAMOU, 2);
            String diferencia = formatea.format(a);
            diferencia = diferencia.replace("-", "");
            mensaje = mensaje + "\n" + "<tr>    <td>" + listaData.get(i).DATE + "</td>    <td>" + listaData.get(i).AXPAYNBR + "</td>    <td>" + listaData.get(i).PMERCHID + "</td>    <td>" + listaData.get(i).PCURRENCY + "</td>    <td>" + diferencia + "</td>    </tr>";
        }

        mensaje = mensaje + "\n" + "</table>";

        mensaje = mensaje + "\n" + "Según el detalle anexo.<br>";
        mensaje = mensaje + "\n" + "Agradecemos su atención y quedamos atentos a la aclaración de este hallazgo.<br><br>";
        mensaje = mensaje + "\n" + "Saludos cordiales.<br><br>";
        mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#616161;font-size:10.5pt;font-family:Open Sans,sans-serif;\">Gerente de Orden al Cobro</span><br>";
        mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
        mensaje = mensaje + "\n" + "</body>";
        mensaje = mensaje + "\n" + "</html>";

        String correoMask = "amaclaracionescontracargos@miatech.net";

        List<String> archivos = new ArrayList<>();
        String archivo = this.createFileForEmailMultipleDifferences(Data, listaData);
        archivos.add(archivo);

        iboolean = proMail.sendEmailAMEX(asunto, receptores, Ccpy, mensaje, correoMask, archivos);
        return iboolean;
    }

    public String createFileForEmailMultipleDifferences(A4113Filter filter, List<A4113Filter> Lista) throws Exception {
        System.out.println("Report : createFileForEmail");
        String fileNameDownload = "Settlement Diferences Report " + Functions.getFechaActual() + " " + Functions.getHoraActual() + " ";
        try {
            String date = "";
            Workbook workbook;

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = Lista;
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
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
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("AX Number");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Curr");
            CH1_5.setCellValue("Summary");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("Differences");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");

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
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("GROSS");
            CH2_6.setCellValue("Discount");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("NET");
            CH2_14.setCellValue("GROSS");
            CH2_15.setCellValue("Discount");
            CH2_16.setCellValue("");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("NET");
            CH2_23.setCellValue("GROSS");
            CH2_24.setCellValue("Discount");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("Net");

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
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);
            Cell CH3_28 = row3.createCell(28);
            Cell CH3_29 = row3.createCell(29);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("Rate");
            CH3_7.setCellValue("Commission");
            CH3_8.setCellValue("Serv. Fee");
            CH3_9.setCellValue("Adjustment");
            CH3_10.setCellValue("VAT Rate");
            CH3_11.setCellValue("VAT");
            CH3_12.setCellValue("Op. Debit");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("Rate");
            CH3_16.setCellValue("Commission");
            CH3_17.setCellValue("Serv. Fee");
            CH3_18.setCellValue("Adjustment");
            CH3_19.setCellValue("VAT Rate");
            CH3_20.setCellValue("VAT");
            CH3_21.setCellValue("Op. Debit");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("");
            CH3_24.setCellValue("Commission");
            CH3_25.setCellValue("Serv. Fee");
            CH3_26.setCellValue("Adjustment");
            CH3_27.setCellValue("VAT");
            CH3_28.setCellValue("Op. Debit");
            CH3_29.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);
            CH3_28.setCellStyle(headerStyle);
            CH3_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)         
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 29, 29));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 29));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 28));

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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).AXPAYNBR);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).PCURRENCY);
                rcell5.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell6.setCellValue(listaData.get(vi).RATECOMBA + "%");
                rcell7.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell8.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell9.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell10.setCellValue(listaData.get(vi).RATEIVABA + "%");
                rcell11.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell12.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell13.setCellValue(listaData.get(vi).PNETAMOU);
                rcell14.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell15.setCellValue(listaData.get(vi).RATECOMBAC + "%");
                rcell16.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell17.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell18.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell19.setCellValue(listaData.get(vi).RATEIVABAC + "%");
                rcell20.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell21.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell22.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell23.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell24.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell25.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell26.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell27.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell29.setCellValue(listaData.get(vi).DIFF_PNETAMOU);
                iter.next();
                ++vi;
                ++vj;
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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
             */
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            //workbook.write(response.getOutputStream());
            workbook.write(fos);
            fos.close();
            return file.getAbsolutePath();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    //Listado de Codigos de error
    @RequestMapping(value = "getErrorCodes")
    public @ResponseBody
    String getErrorCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getErrorCodes-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetErrorCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetErrorCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04414(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
}
