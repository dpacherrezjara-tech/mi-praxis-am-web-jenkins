/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.program;

import net.miatech.praxis.controllers.payments.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.IMF145Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.program.ProPaymentsControlLogic;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A3020Filter;
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
@RequestMapping("/ProPaymentsControl")
public class ProPaymentsControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ProPaymentsControlLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ProPaymentsControl/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : search-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02084(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCountry")
    public @ResponseBody
    String searchCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchCountry-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListCountry(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListCountry(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02085(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCard")
    public @ResponseBody
    String searchCard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchCard-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListCard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListCard(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02086(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchChannel")
    public @ResponseBody
    String searchChannel(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchChannel-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListChannel(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListChannel(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02087(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchIata")
    public @ResponseBody
    String searchIata(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchIata-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListIata(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListIata(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02240(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPayDelay")
    public @ResponseBody
    String searchPayDelay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPayDelay-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPayDelay(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPayDelay(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02146(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPayDelayCountry")
    public @ResponseBody
    String searchPayDelayCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPayDelayCountry-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPayDelayCountry(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPayDelayCountry(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02147(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPayDelayCard")
    public @ResponseBody
    String searchPayDelayCard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPayDelayCard-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPayDelayCard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPayDelayCard(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02148(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchPayDelayMerchant")
    public @ResponseBody
    String searchPayDelayMerchant(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPayDelayMerchant-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPayDelayCard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPayDelayMerchant(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02149(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchUSAState")
    public @ResponseBody
    String searchUSAState(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchUSAState-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListState(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListState(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02215(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFareTax")
    public @ResponseBody
    String searchFareTax(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchFareTax-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListFareTax(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListFareTax(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX109SQP02245(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPOS")
    public @ResponseBody
    String searchPOS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPOS-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPOS(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPOS(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02349(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPOSMonth")
    public @ResponseBody
    String searchPOSMonth(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPOSMonth-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPOSMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPOSMonth(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02315(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetPEMBank")
    public @ResponseBody
    String searchDetPEMBank(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchDetPEMBank-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPEMBank(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPEMBank(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02323(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetPEMAgent")
    public @ResponseBody
    String searchDetPEMAgent(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchDetPEMAgent-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPEMAgent(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPEMAgent(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02324(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPhasesStatus")
    public @ResponseBody
    String searchPhasesStatus(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchPhasesStatus-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPhasesStatus(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPhasesStatus(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02325(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetPhasesBank")
    public @ResponseBody
    String searchDetPhasesBank(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchDetPhasesBank-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPhasesBank(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPhasesBank(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02326(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetPhasesCard")
    public @ResponseBody
    String searchDetPhasesCard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchDetPhasesCard-------------");
        map.put("success", true);
        List<A3020Filter> lst = this.getListPhasesCard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3020Filter> getListPhasesCard(HttpServletRequest request, Boolean bExcel) {

        List<A3020Filter> lst = new ArrayList<>(0);
        A3020Filter filter = new A3020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3020Filter.class);
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

            lst = logic.loadPX418SQP02327(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchClarificationTOT")
    public @ResponseBody
    String searchClarificationTOT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchClarificationTOT-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListClarificationTOT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListClarificationTOT(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP03203(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchClarification")
    public @ResponseBody
    String searchClarification(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchClarification-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListClarification(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListClarification(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP02079(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetClarifBank")
    public @ResponseBody
    String searchDetClarifBank(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchDetClarifBank-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListClarifBank(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListClarifBank(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP02104(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ------------------------------------------------------------------------------------------------------------------
    @RequestMapping(value = "searchNewAmex")
    public @ResponseBody
    String searchNewAmex(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchNewAmex-------------");
        map.put("success", true);
        List<IMF145Filter> lst = this.getListSearchNewAmex(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF145Filter> getListSearchNewAmex(HttpServletRequest request, Boolean bExcel) {

        List<IMF145Filter> lst = new ArrayList<>(0);
        IMF145Filter filter = new IMF145Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF145Filter.class);
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

            lst = logic.loadSQP04546(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchNewAmexByCountry")
    public @ResponseBody
    String searchNewAmexByCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchNewAmexByCountry-------------");
        map.put("success", true);
        List<IMF145Filter> lst = this.getListSearchNewAmexByCountry(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF145Filter> getListSearchNewAmexByCountry(HttpServletRequest request, Boolean bExcel) {

        List<IMF145Filter> lst = new ArrayList<>(0);
        IMF145Filter filter = new IMF145Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF145Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            /*if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }*/

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lst = logic.loadSQP04541(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    // ------------------------------------------------------------------------------------------------------------------
    @RequestMapping(value = "searchAuditCom")
    public @ResponseBody
    String searchAuditCom(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchAuditCom-------------");
        map.put("success", true);
        List<IMF145Filter> lst = this.getListSearchAuditCom(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF145Filter> getListSearchAuditCom(HttpServletRequest request, Boolean bExcel) {

        List<IMF145Filter> lst = new ArrayList<>(0);
        IMF145Filter filter = new IMF145Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF145Filter.class);
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

            lst = logic.loadSQP04912(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchAuditComByCard")
    public @ResponseBody
    String searchAuditComByCard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchAuditComByCard-------------");
        map.put("success", true);
        List<IMF145Filter> lst = this.getListSearchAuditComByCard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF145Filter> getListSearchAuditComByCard(HttpServletRequest request, Boolean bExcel) {

        List<IMF145Filter> lst = new ArrayList<>(0);
        IMF145Filter filter = new IMF145Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF145Filter.class);
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

            lst = logic.loadSQP04915(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchAuditComByDay")
    public @ResponseBody
    String searchAuditComByDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchAuditComByDay-------------");
        map.put("success", true);
        List<IMF145Filter> lst = this.getListSearchAuditComByDay(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF145Filter> getListSearchAuditComByDay(HttpServletRequest request, Boolean bExcel) {

        List<IMF145Filter> lst = new ArrayList<>(0);
        IMF145Filter filter = new IMF145Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF145Filter.class);
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

            lst = logic.loadSQP04913(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchAuditComByDayDAY")
    public @ResponseBody
    String searchAuditComByDayDAY(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchAuditComByDayDAY-------------");
        map.put("success", true);
        List<IMF145Filter> lst = this.getListSearchAuditComByDayDAY(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF145Filter> getListSearchAuditComByDayDAY(HttpServletRequest request, Boolean bExcel) {

        List<IMF145Filter> lst = new ArrayList<>(0);
        IMF145Filter filter = new IMF145Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ProPaymentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF145Filter.class);
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

            lst = logic.loadSQP04914(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getXLSX_boxAuditCom")
    public @ResponseBody
    void getXLSX_boxAuditCom(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_boxAuditCom");
        String fileNameDownload = String.format("Report AuditCom - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF145Filter> listaData = this.getListSearchAuditCom(request, true);
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

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Settlement");
            CH1_2.setCellValue("Fare");
            CH1_3.setCellValue("Diff");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Commission");
            CH2_2.setCellValue("Commission");
        
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).SADJUST);
                rcell2.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell3.setCellValue(listaData.get(vi).DIF);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).totSADJUST);
            CH1_2_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_3_T.setCellValue(listaData.get(0).totDIF);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);

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
    
    @RequestMapping(value = "getXLSX_boxAuditComByCard")
    public @ResponseBody
    void getXLSX_boxAuditComByCard(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_boxAuditCom");
        String fileNameDownload = String.format("Report AuditCom By Card - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF145Filter> listaData = this.getListSearchAuditComByCard(request, true);
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

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Credit Card");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("Settlement");
            CH1_4.setCellValue("Fare");
            CH1_5.setCellValue("Diff");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
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
            CH2_1.setCellValue("Code");
            CH2_2.setCellValue("Description");
            CH2_3.setCellValue("Commision");
            CH2_4.setCellValue("Commission");
        
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
                rcell1.setCellValue(listaData.get(vi).SCARCOD);
                rcell2.setCellValue(listaData.get(vi).SCARDescr);
                rcell3.setCellValue(listaData.get(vi).SADJUST);
                rcell4.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell5.setCellValue(listaData.get(vi).DIF);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue(listaData.get(0).totSADJUST);
            CH1_4_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_5_T.setCellValue(listaData.get(0).totDIF);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);

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
    
    @RequestMapping(value = "getXLSX_boxAuditComByDay")
    public @ResponseBody
    void getXLSX_boxAuditComByDay(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_boxAuditComByDay");
        String fileNameDownload = String.format("Report AuditCom by Day - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF145Filter> listaData = this.getListSearchAuditComByDay(request, true);
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

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Settlement");
            CH1_2.setCellValue("Fare");
            CH1_3.setCellValue("Diff");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Commission");
            CH2_2.setCellValue("Commission");
        
            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);

                rcell0.setCellValue(listaData.get(vi).SDATE);
                rcell1.setCellValue(listaData.get(vi).SADJUST);
                rcell2.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell3.setCellValue(listaData.get(vi).DIF);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).totSADJUST);
            CH1_2_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_3_T.setCellValue(listaData.get(0).totDIF);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);

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
    
    @RequestMapping(value = "getXLSX_boxAuditComByDayDAY")
    public @ResponseBody
    void getXLSX_boxAuditComByDayDAY(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_boxAuditComByDayDAY");
        String fileNameDownload = String.format("Report AuditCom by Day Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF145Filter> listaData = this.getListSearchAuditComByDayDAY(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle data = (XSSFCellStyle) workbook.createCellStyle();
            data.setDataFormat((short) 2);
            totalStyle.setDataFormat((short) 2);
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

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("Comm.Rate");
            CH1_7.setCellValue("Settlement");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("USD");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 14));
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

            CH2_0.setCellValue("Ticket");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("PNR");
            CH2_3.setCellValue("Card Number");
            CH2_4.setCellValue("Auth.");
            CH2_5.setCellValue("Amount");
            
            CH2_7.setCellValue("Curr.");
            CH2_8.setCellValue("Sale Fare");
            CH2_9.setCellValue("Audit Comm.");
            CH2_10.setCellValue("Sett. Comm.");
            
            CH2_11.setCellValue("Exchange rate");
            CH2_12.setCellValue("Sett. Comm.");
            CH2_13.setCellValue("Fare. Comm.");
            CH2_14.setCellValue("Diff. Comm");
        
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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
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

                rcell0.setCellValue(listaData.get(vi).TICKET);
                rcell1.setCellValue(listaData.get(vi).strFormatDate);
                rcell2.setCellValue(listaData.get(vi).SPNR);
                rcell3.setCellValue(listaData.get(vi).SCARDN);
                rcell4.setCellValue(listaData.get(vi).SAUTHOC);
                rcell5.setCellValue(listaData.get(vi).SVFOPS);
                rcell6.setCellValue(listaData.get(vi).DISCRATEC);
                rcell7.setCellValue(listaData.get(vi).SCURRENCY);
                rcell8.setCellValue(listaData.get(vi).FINSAMOUC);
                rcell9.setCellValue(listaData.get(vi).SINSAMOUC);
                rcell10.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell11.setCellValue(listaData.get(vi).RATESFEED);//este
                rcell12.setCellValue(listaData.get(vi).SADJUST);
                rcell13.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell14.setCellValue(listaData.get(vi).DIF);
                
                rcell0.setCellStyle(data);
                rcell1.setCellStyle(data);
                rcell2.setCellStyle(data);
                rcell3.setCellStyle(data);
                rcell4.setCellStyle(data);
                rcell5.setCellStyle(data);
                rcell6.setCellStyle(data);
                rcell7.setCellStyle(data);
                rcell8.setCellStyle(data);
                rcell9.setCellStyle(data);
                rcell10.setCellStyle(data);
                rcell11.setCellStyle(data);
                rcell12.setCellStyle(data);
                rcell13.setCellStyle(data);
                rcell14.setCellStyle(data);
                
                iter.next();
                ++vi;
                ++vj;
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue(listaData.get(0).totSVFOPS);
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue(listaData.get(0).totFINSAMOUC);
            CH1_9_T.setCellValue(listaData.get(0).totSINSAMOUC);
            CH1_10_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue(listaData.get(0).totSADJUST);
            CH1_13_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_14_T.setCellValue(listaData.get(0).totDIF);

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
    
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("ProPaymentsControl : getXLSX");
//
//        String fileNameDownload = String.format("ProPaymentsControl - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A3020Filter> listaData = this.getList(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("ReasonCodeReport");
//
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
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
//
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//
//            // ====== CREANDO TITULOS ======================================
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            Cell CH1_10 = row.createCell(10);
//            Cell CH1_11 = row.createCell(11);
//
//            CH1_00.setCellValue("Nbr");
//            CH1_01.setCellValue("Bank");
//            CH1_04.setCellValue("Curr.");
//            CH1_05.setCellValue("Commision Rate");
//            CH1_08.setCellValue("Rate");
//            CH1_09.setCellValue("Cliente");
//            CH1_10.setCellValue("Status");
//            CH1_11.setCellValue("Bank");
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
//
//            //*******************
//            ++vj;
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);
//            Cell CH2_08 = row2.createCell(8);
//            Cell CH2_09 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//
//            CH2_01.setCellValue("Ctry");
//            CH2_02.setCellValue("Code");
//            CH2_03.setCellValue("Name");
//            CH2_05.setCellValue("Normal");
//            CH2_06.setCellValue("Promotional 1");
//            CH2_07.setCellValue("Promotional 2");
//            CH2_08.setCellValue("IVA");
//            CH2_11.setCellValue("Status");
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//
//            //          ========================================================
//            ++vj;
//            while (iter.hasNext()) {
//
//                row = sheet.createRow(vj);
//                Cell rcell0 = row.createCell(0);
//                Cell rcell1 = row.createCell(1);
//                Cell rcell2 = row.createCell(2);
//                Cell rcell3 = row.createCell(3);
//                Cell rcell4 = row.createCell(4);
//                Cell rcell5 = row.createCell(5);
//
//                Cell rcell6 = row.createCell(6);
//                Cell rcell7 = row.createCell(7);
//                Cell rcell8 = row.createCell(8);
//                Cell rcell9 = row.createCell(9);
//                Cell rcel20 = row.createCell(10);
//                Cell rcel21 = row.createCell(11);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).COUNTRY);
//                rcell2.setCellValue(listaData.get(vi).CODEBANK);
//                rcell3.setCellValue(listaData.get(vi).NAMEBANK);
//                rcell4.setCellValue(listaData.get(vi).CURRENC);
//                rcell5.setCellValue(listaData.get(vi).RATECON);
//                rcell6.setCellValue(listaData.get(vi).RATECOP1);
//                rcell7.setCellValue(listaData.get(vi).RATECOP2);
//                rcell8.setCellValue(listaData.get(vi).RATEIVA);
//                rcell9.setCellValue(listaData.get(vi).CLIENTE);
//                rcel20.setCellValue(listaData.get(vi).FSTAT);
//                rcel21.setCellValue(listaData.get(vi).FINSUMO);
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//
//            /**
//             * fileNameDownload = Nombre de descarga
//             */
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
