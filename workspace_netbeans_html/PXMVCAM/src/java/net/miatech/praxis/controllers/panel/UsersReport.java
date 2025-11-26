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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP05798Filter;
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
@RequestMapping("/UsersReport")
public class UsersReport extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    //Vista principal
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "panel/Management/PerPro";
    }    
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(ModelMap map, HttpServletRequest request) {
        
        SQP05798Filter filter = new SQP05798Filter();
        filter.VP_CCUST = "139";
        
        if(request.getParameter("option")!=null && request.getParameter("group")!=null)
        {
            filter.VP_FILTER = request.getParameter("option").toString().trim(); 
            if(!"".equals(request.getParameter("group").toString().trim()))
                filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
        }
        List<SQP05798Filter> lst_prmpanel;
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst_prmpanel = logic.loadSQP05798(filter);
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("UsersReportController : getXLSX");
        String fileName = "UsersReport_" + Functions.getFechaActual();

        try {

            Workbook workbook = null;
            File file = File.createTempFile(fileName, ".xlsx");
            List<SQP05798Filter> lstData = new ArrayList<SQP05798Filter>();
            SQP05798Filter  filter = new SQP05798Filter();
            filter.VP_CCUST = "139";

            if(request.getParameter("option")!=null && request.getParameter("group")!=null)
            {
                filter.VP_FILTER = request.getParameter("option").toString().trim(); 
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
                lstData = logic.loadSQP05798(filter);
            }catch (Exception e) {
                throw new SpringException(e);
            }    
            
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Programs Report");
            Integer vi = 0;
            Iterator iter = lstData.iterator();
            Integer vj = 0;

            Row row = sheet.createRow(vj);
            Cell cell00 = row.createCell(0);
            cell00.setCellValue("CCUST");
            Cell cell01 = row.createCell(1);
            cell01.setCellValue("USR");
            Cell cell02 = row.createCell(2);
            cell02.setCellValue("NOM");
            Cell cell03 = row.createCell(3);
            cell03.setCellValue("APE");
            Cell cell04 = row.createCell(4);
            cell04.setCellValue("DESC1");
            Cell cell05 = row.createCell(5);
            cell05.setCellValue("MAIL");
            Cell cell06 = row.createCell(6);
            cell06.setCellValue("PROFILE");
            Cell cell07 = row.createCell(7);
            cell07.setCellValue("NPROG");
            Cell cell08 = row.createCell(8);
            cell08.setCellValue("PERMA");
            Cell cell09 = row.createCell(9);
            cell09.setCellValue("PERML");
            Cell cell10 = row.createCell(10);
            cell10.setCellValue("PERMC");
            Cell cell11 = row.createCell(11);
            cell11.setCellValue("PERMM");
            Cell cell12 = row.createCell(12);
            cell12.setCellValue("PERME");
            Cell cell13 = row.createCell(13);
            cell13.setCellValue("PERMX");
            Cell cell14 = row.createCell(14);
            cell14.setCellValue("USRC");
            Cell cell15 = row.createCell(15);
            cell15.setCellValue("DATC");

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
                Cell cell010 = row.createCell(10);
                Cell cell011 = row.createCell(11);
                Cell cell012 = row.createCell(12);
                Cell cell013 = row.createCell(13);
                Cell cell014 = row.createCell(14);
                Cell cell015 = row.createCell(15);

                cell0.setCellValue(lstData.get(vi).CCUST);
                cell1.setCellValue(lstData.get(vi).USR);
                cell2.setCellValue(lstData.get(vi).NOM);
                cell3.setCellValue(lstData.get(vi).APE);
                cell4.setCellValue(lstData.get(vi).DESC1);
                cell5.setCellValue(lstData.get(vi).MAIL);
                cell6.setCellValue(lstData.get(vi).PROFILE);
                cell7.setCellValue(lstData.get(vi).NPROG);
                cell8.setCellValue(lstData.get(vi).PERMA);
                cell9.setCellValue(lstData.get(vi).PERML);
                cell010.setCellValue(lstData.get(vi).PERMC);
                cell011.setCellValue(lstData.get(vi).PERMM);
                cell012.setCellValue(lstData.get(vi).PERME);
                cell013.setCellValue(lstData.get(vi).PERMX);
                cell014.setCellValue(lstData.get(vi).USRC);
                cell015.setCellValue(lstData.get(vi).DATC);

                iter.next();
                ++vi;
                ++vj;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "UsersReport_" + Functions.getFechaActual() + ".xlsx";

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
