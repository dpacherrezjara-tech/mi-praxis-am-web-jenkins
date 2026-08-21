/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3650Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BwrQueryRefundLogic;
import net.miatech.praxis.logic.salesAudit.RFNDUserMaintenanceLogic;
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
@RequestMapping("/RFNDUserMaintenance")
public class RFNDUserMaintenanceController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDUserMaintenanceLogic logic;

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3650Filter> lst;
        A3650Filter filter = new A3650Filter();
        try {
            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_AREA = request.getParameter("IN_COUNTRY").toString().trim();
            filter.IN_USER = request.getParameter("IN_USER").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchRefundUser(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "mantenimientoRfndUser")
    public @ResponseBody
    String mantenimientoRfndUser(ModelMap map, HttpServletRequest request) {
        String result = "";
        A3650Filter filter = new A3650Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            RFNDUserMaintenanceLogic logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "loadDataInit2")
    public @ResponseBody
    String loadDataInit2(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();
            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }
    @RequestMapping(value = "loadDataInit")
    public @ResponseBody
    String loadDataInit(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();

            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "ALL");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOAM");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOPR");
            lstData.add(mapProperties);

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

}
