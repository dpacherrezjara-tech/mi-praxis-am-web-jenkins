/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1744Filter;
import net.miatech.beans.A1817Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.UserView;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ElectronicMiscelaneousLogic;
import net.miatech.praxis.logic.flown.ZoneAverageRatesLogic;
import net.miatech.praxis.spring.INF020;
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
import net.miatech.praxis.logic.screens.FacsimilLogic;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("session")
@RequestMapping("/ZoneAverageRates")
public class ZoneAverageRatesController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ZoneAverageRatesLogic logic;
    private MasterDAO masterDAO;
    private HashMap<String, String> hmPaises;
    private HashMap<String, String> hmAeropuertos;
    private String tipo = "1";

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/ZoneAverageRates/form_index";
    }

//    @RequestMapping(value = "loadData")
//    public @ResponseBody
//    String loadData(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- Load Data : Controller-------------");
//        map.put("success", true);
//
//        try {
//
//            masterDAO = new MasterDAO();
//            masterDAO.setSession(this.serverSession.getServerSession());
//            List<A1007> lstCiudades = masterDAO.loadCiudades();
//            map.put("dataCiudades", lstCiudades);
//
//        } catch (SQLException ex) {
//            System.out.println(ex.getMessage());
//        }
//
//        return new Gson().toJson(map);
//
//    }
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneAverageRatesController : Search-------------");
        map.put("success", true);
        List<A1692Filter> listaData = this.getList(request, true);
        System.out.println("Total : " + listaData.size());
        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        return new Gson().toJson(map);

    }

    public List<A1692Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1692Filter> lst = new ArrayList<>(0);
        A1692Filter filter = new A1692Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ZoneAverageRatesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1692Filter.class);
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

            lst = logic.loadSQP03848(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByDay")
    public @ResponseBody
    String searchByDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneAverageRatesController : searchByDay-------------");
        map.put("success", true);
        List<A1692Filter> listaData = this.getListByDay(request, false);
        System.out.println("Total : " + listaData.size());
        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        return new Gson().toJson(map);

    }

    public List<A1692Filter> getListByDay(HttpServletRequest request, Boolean bExcel) {

        List<A1692Filter> lst = new ArrayList<>(0);
        A1692Filter filter = new A1692Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ZoneAverageRatesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1692Filter.class);
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

            lst = logic.loadSQP03849(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByZone")
    public @ResponseBody
    String searchByZone(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneAverageRatesController : searchByZone-------------");
        map.put("success", true);
        List<A1692Filter> listaData = this.getListByZone(request, false);
        System.out.println("Total : " + listaData.size());
        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        return new Gson().toJson(map);

    }

    public List<A1692Filter> getListByZone(HttpServletRequest request, Boolean bExcel) {

        List<A1692Filter> lst = new ArrayList<>(0);
        A1692Filter filter = new A1692Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ZoneAverageRatesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1692Filter.class);
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

            lst = logic.loadSQP03848_GG(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
}
