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
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SalesReconciliAmexLogic;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
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
            
            lst = logic.loadPX570SQP04257(filter);
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
            
            lst = logic.loadPX570SQP04269(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    
}
