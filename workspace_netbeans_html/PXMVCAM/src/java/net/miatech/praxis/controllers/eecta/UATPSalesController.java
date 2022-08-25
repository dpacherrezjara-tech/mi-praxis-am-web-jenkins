/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04627Filter;
import net.miatech.praxis.eecta.SQP04628Filter;
import net.miatech.praxis.logic.eecta.UATPSalesLogic;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
//import sun.net.www.content.audio.x_aiff;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/UATPSales")
public class UATPSalesController extends BaseController{
    
    private UATPSalesLogic logic;
    
    @RequestMapping(value = "/saveFileA4264",method = RequestMethod.POST)
    public @ResponseBody String saveFileUATP(ModelMap map, HttpServletRequest request, 
               @RequestParam("textfile") MultipartFile textfile) throws IOException{
        final List<String> listX3155 = new ArrayList<>();
        boolean truncate = false;
        SQP04627Filter response = new SQP04627Filter();
        try {
            InputStream file = textfile.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(file));
            reader.lines().forEach(new Consumer<String>() {
                @Override
                public void accept(String arg0) {
                    listX3155.add(arg0);
                }
            });
            truncate =  logic.saveX3155(listX3155);
            if (truncate) {
                response = logic.setSQP04627Filter();
                map.put("success", true);
                map.put("response", response);
            }else{
                throw new Exception("Error");
            }
            
        } catch (Exception e) {
            map.put("success", false);
            response.setOU_MESSAGE(e.getMessage());
            response.setOU_SQLCODE("0");
            map.put("response",response);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getA4264")
    public @ResponseBody String getA4264Data(ModelMap map, HttpServletRequest request){
        List<SQP04628Filter> listObj = new ArrayList<>();
        SQP04628Filter filter = new SQP04628Filter();
        filter.getPagination().TOTROW = -1;
        filter.getPagination().START =0;
        filter.getPagination().LIMIT = 0;
        try {
            filter.setIN_FROMDATE(request.getParameter("IN_FROMDATE"));
            filter.setIN_TODATE(request.getParameter("IN_TODATE"));
            filter.setIN_IDFILE(request.getParameter("IN_IDFILE"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.getPagination().PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.getPagination().PAGNUM = (start / filter.getPagination().PAGROW) + 1;
            logic = new UATPSalesLogic();
            listObj = logic.getSQP04628Filter(filter);
            map.put("success", true);
            map.put("total", !listObj.isEmpty() ? listObj.get(0).getPagination().TOTROW : 0);            
            map.put("data", listObj);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
}
