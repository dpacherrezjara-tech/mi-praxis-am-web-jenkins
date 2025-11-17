/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.panel;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.SQP05764Filter;
import net.miatech.beans.SQP05765Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.panel.PanelLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author lzambrano
 */
@Controller
@Scope("request")
@RequestMapping("/ProfilesManagement")
public class ProfilesManagement extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    //Vista principal
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "panel/Management/PerPro";
    }    
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(ModelMap map, HttpServletRequest request) {
        
        SQP05764Filter filter = new SQP05764Filter();
        if(request.getParameter("option")!=null && request.getParameter("group")!=null)
        {
            filter.VP_FILTER = request.getParameter("option").toString().trim(); 
            if(!"".equals(request.getParameter("group").toString().trim()))
                filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
        }
        List<SQP05764Filter> lst_prmpanel;
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst_prmpanel = logic.loadSQP05764(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        HashMap m = new HashMap();
        try{
	        m.put("success",true);
	        m.put("total",lst_prmpanel.get(0).page.TOTROWS);
	        m.put("data",lst_prmpanel);
        }catch (Exception e) {
            throw new SpringException(e);
        }        
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "crud")
    public @ResponseBody String crud(HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE 
        SQP05765Filter filter = new SQP05765Filter(); 
        SQP05851Filter objLog = new SQP05851Filter();
        filter.VP_CCUST = "139";
        String response = "";
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            filter.VP_ID_PROFILE = request.getParameter("ID_PROFILE").toString().trim();
            //filter.VP_CCUST = request.getParameter("CCUST").toString().trim();
            filter.VP_ACTION = request.getParameter("strOption").toString().trim();
            filter.VP_DESC1 = request.getParameter("DESC1").toString().trim();
            filter.VP_STAT = request.getParameter("STAT")!= null ? request.getParameter("STAT").toString().trim() : "";
            
            //LOG INIT
            objLog.VP_ACTIO = request.getParameter("strOption").toString().trim();
            objLog.VP_ID_OPERATOR = request.getParameter("ID_PROFILE").trim();
            objLog.VP_OPER = request.getParameter("DESC1").toString().trim();
            objLog.VP_DESC1 = "PROFILES MANAGEMENT";
            logic.setSQP05851(objLog);
            //LOG END
            
            filter = logic.setSQP05765(filter);
            //response = filter.dbException.MESSAGE;
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        Map m = new LinkedHashMap();
        m.put("success",true);
        m.put("response", "operation sucssesfull");
        return new Gson().toJson(m);
    }
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("UsersPerController : getXLSX");
        String fileName = "usersPer_" + Functions.getFechaActual();

        try {

            Workbook workbook = null;
            File file = File.createTempFile(fileName, ".xlsx");
            List<PX041S01INF001Filter> lstData = new ArrayList<PX041S01INF001Filter>();
            PX041S01INF001Filter  filter = new PX041S01INF001Filter();
            filter.VP_CCUST = "139";
            filter.VP_APLICA = "PX";

            if(request.getParameter("option")!=null && request.getParameter("group")!=null)
            {
                filter.VP_USR = request.getParameter("option").toString().trim(); 
                if(!"".equals(request.getParameter("group").toString().trim()))
                    filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
            }
            filter.page.PAGNUM = 1;
            filter.page.PAGROW = 0;
            filter.page.TOTPAG = 0;
            filter.page.TOTROW = 1;
            filter.page.PAGINIT = 1;
            
            try{
                PanelLogic logic = new PanelLogic();
                logic.setSession(this.serverSession.getServerSession());
                lstData = logic.loadPX041S01INF001(filter);
            }catch (Exception e) {
                throw new SpringException(e);
            }    
            
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Users Permisions");
            Integer vi = 0;
            Iterator iter = lstData.iterator();
            Integer vj = 0;

            Row row = sheet.createRow(vj);
            Cell cell00 = row.createCell(0);
            cell00.setCellValue("USR");
            Cell cell01 = row.createCell(1);
            cell01.setCellValue("NPROG");
            Cell cell02 = row.createCell(2);
            cell02.setCellValue("PROG");
            Cell cell03 = row.createCell(3);
            cell03.setCellValue("PERMA");
            Cell cell04 = row.createCell(4);
            cell04.setCellValue("PERML");
            Cell cell05 = row.createCell(5);
            cell05.setCellValue("PERMC");
            Cell cell06 = row.createCell(6);
            cell06.setCellValue("PERMM");
            Cell cell07 = row.createCell(7);
            cell07.setCellValue("PERME");
            Cell cell08 = row.createCell(8);
            cell08.setCellValue("PERMX");
            Cell cell09 = row.createCell(9);
            cell09.setCellValue("STAT");
            Cell cell10 = row.createCell(10);
            cell10.setCellValue("USCR");
            Cell cell11 = row.createCell(11);
            cell11.setCellValue("DTCR");
            Cell cell12 = row.createCell(12);
            cell12.setCellValue("USUP");
            Cell cell13 = row.createCell(13);
            cell13.setCellValue("DTUP");

            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell cell0 = row.createCell(0);
                Cell cell1 = row.createCell(1);
                Cell cell2 = row.createCell(2);
                Cell cell3 = row.createCell(3);
                Cell cell4 = row.createCell(4);
                Cell cell5 = row.createCell(5);
                Cell cell6 = row.createCell(6);
                Cell cell7 = row.createCell(7);
                Cell cell8 = row.createCell(8);
                Cell cell9 = row.createCell(9);
                Cell cel20 = row.createCell(10);
                Cell cel21 = row.createCell(11);
                Cell cel22 = row.createCell(12);
                Cell cel23 = row.createCell(13);

                cell0.setCellValue(lstData.get(vi).USR);
                cell1.setCellValue(lstData.get(vi).NPROG);
                cell2.setCellValue(lstData.get(vi).PROG);
                cell3.setCellValue(lstData.get(vi).PERMA);
                cell4.setCellValue(lstData.get(vi).PERML);
                cell5.setCellValue(lstData.get(vi).PERMC);
                cell6.setCellValue(lstData.get(vi).PERMM);
                cell7.setCellValue(lstData.get(vi).PERME);
                cell8.setCellValue(lstData.get(vi).PERMX);
                cell9.setCellValue(lstData.get(vi).STAT);
                cel20.setCellValue(lstData.get(vi).USCR);
                cel21.setCellValue(lstData.get(vi).DTCR);
                cel22.setCellValue(lstData.get(vi).USUP);
                cel23.setCellValue(lstData.get(vi).DTUP);

                iter.next();
                ++vi;
                ++vj;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "usersPer_" + Functions.getFechaActual() + ".xlsx";

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }

    }
}
