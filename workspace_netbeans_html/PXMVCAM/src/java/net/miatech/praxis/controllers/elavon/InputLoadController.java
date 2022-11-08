package net.miatech.praxis.controllers.elavon;

import com.google.gson.Gson;
import com.monitorjbl.xlsx.StreamingReader;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.RunningThreads;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.elavon.ElavonExcelFile;
import net.miatech.praxis.elavon.SQP04650Filter;
import net.miatech.praxis.elavon.SQP04651Filter;
import net.miatech.praxis.elavon.SQP04674Filter;
import net.miatech.praxis.elavon.X3147temp;
import net.miatech.praxis.logic.elavon.ElavonExcel;
import net.miatech.praxis.logic.elavon.InputLoadLogic;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/InputLoad")
public class InputLoadController extends BaseController {

    // <editor-fold defaultstate="collapsed" desc="Dependencias">
    @Autowired
    private ElavonExcel elavonExcel;

    @Autowired
    private RunningThreads rt;

    @Autowired
    private InputLoadLogic logic;
     // </editor-fold>

    @Transactional
    @RequestMapping(value = "/uploadExcelRecon", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody
    String uploadExcelRecon(ModelMap map, @RequestParam(value = "excelfile", required = true) MultipartFile excelfile, HttpServletRequest request) throws IOException {
        System.out.println("Ejecutando Proceso Elavon");
        List<X3147temp> temp = new ArrayList<>();
        SQP04650Filter filter = new SQP04650Filter();
        SQP04674Filter filter2 = new SQP04674Filter();
        try {
            //logic = new InputLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            String filename = excelfile.getOriginalFilename();
            Double filesize = excelfile.getSize() * 0.00000095367432;
            Integer filerows = 0;
            System.out.println("Achivo actual Pesa: " + filesize + " MB.");
            if (filesize > 15) {
                throw new Exception("Archivo demasiado grande para procesar");
            }

            StreamingReader sr = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .sheetIndex(0)
                    .read(excelfile.getInputStream());
            for (Row fila : sr) {
                //fila empieza a contar desde 0 (la fila 0 es cabecera)
                //se omite la cabecera
                if (fila.getRowNum() > 0) {
                    if (fila.getCell(0) != null) {
                        filerows++;
                        X3147temp x = new X3147temp();
                        x.setSYSTEM(fila.getCell(0) == null ? "" : fila.getCell(0).getStringCellValue());
                        //si primera fila vacia no se procesa
                        if (x.getSYSTEM().equals("")) {
                            break;
                        }
                        x.setBATCH_DATE(fila.getCell(1) == null ? "" : fila.getCell(1).getStringCellValue());
                        x.setEXT_MID(fila.getCell(2) == null ? "" : fila.getCell(2).getStringCellValue());
                        x.setGLOBAL_NAME(fila.getCell(3) == null ? "" : fila.getCell(3).getStringCellValue());
                        x.setFUNDED_CCY(fila.getCell(4) == null ? "" : fila.getCell(4).getStringCellValue());
                        x.setUSD_RATE(fila.getCell(5) == null ? 0 : fila.getCell(5).getNumericCellValue());
                        x.setSALES_TYPE(fila.getCell(6) == null ? "" : fila.getCell(6).getStringCellValue());
                        x.setCARD(fila.getCell(7) == null ? "" : fila.getCell(7).getStringCellValue());
                        x.setROC_TEXT(fila.getCell(8) == null ? "" : fila.getCell(8).getStringCellValue());
                        x.setCOMBTIC_NUM(fila.getCell(9) == null ? "" : fila.getCell(9).getStringCellValue());
                        x.setTKT(fila.getCell(10) == null ? "" : fila.getCell(10).getStringCellValue());
                        x.setTRX_DEPART_DTE(fila.getCell(11) == null ? "" : fila.getCell(11).getStringCellValue());
                        x.setTRN_AMT(fila.getCell(12) == null ? 0 : fila.getCell(12).getNumericCellValue());
                        x.setCONV_TRN_AMT(fila.getCell(13) == null ? 0 : fila.getCell(13).getNumericCellValue());
                        x.setCPT_ID(fila.getCell(14) == null ? "" : fila.getCell(14).getStringCellValue());
                        temp.add(x);
                    }
                }
            }
            boolean saveTemp = logic.saveX3147(temp);
            if (saveTemp) {
                filter.setIN_FILENAME(filename);
                filter.setIN_ROWSRCV(filerows);
                filter = logic.getSQP04650(filter);
                if (filter == null) {
                    throw new SQLException();
                }
                filter2.setIN_CCUST("139");
                filter2 = logic.getSQP04674(filter2);
                if (filter2 == null) {
                    throw new SQLException();
                }
                map.put("success", filter.getOUT_SQLCODE().equals("1") && filter2.getOUT_SQLCODE().equals("1"));
                map.put("responseHeader", filter.getOUT_MESSAGE());
                map.put("responseData", filter2.getOUT_MESSAGE());
            } else {
                throw new SQLException();
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("response", "error in sql");
        } catch (Exception e) {
            map.put("success", false);
            map.put("response", e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getHeaderInfo")
    public @ResponseBody
    String getInputHeader(ModelMap map, HttpServletRequest request) {
        List<SQP04651Filter> listObj = new ArrayList<>();
        SQP04651Filter filter = new SQP04651Filter();
        filter.getPagination().TOTROW = -1;
        filter.getPagination().START = 0;
        filter.getPagination().LIMIT = 0;
        try {
            filter.setIN_FROMDATE(request.getParameter("IN_FROMDATE"));
            filter.setIN_TODATE(request.getParameter("IN_TODATE"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.getPagination().PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.getPagination().PAGNUM = (start / filter.getPagination().PAGROW) + 1;
            //logic = new InputLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listObj = logic.getSQP04651(filter);
            map.put("success", true);
            map.put("total", !listObj.isEmpty() ? listObj.get(0).getPagination().TOTROW : 0);
            map.put("data", listObj);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getReconFormat/{idFile}", produces = "application/octet-stream")
    public void downloadReconFormat(@PathVariable String idFile, @RequestParam(required = false, defaultValue = "xlsx") String format, HttpServletResponse response) throws IOException {
        List<ElavonExcelFile> files = new ArrayList<>();
        try {
            //logic = new InputLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //obtiene los resultados del proceso elavon
            files = logic.getResultElavon(idFile);
            if (files.isEmpty()) {
                throw new Exception("Error al obtener resultados");
            }
            OutputStream os = response.getOutputStream();
            response.setHeader("Content-Disposition", "attachment;filename=elavon_" + new Date() + ".zip");
            //response.setContentType("application/octet-stream");
            if (format.equals("xlsx")) {
                //convierte los resultados a excel y comprime
                elavonExcel.compressFiles(os, files);
            } else {
                //convierte los resultados a texto y comprime
                elavonExcel.compressFilesTxt(os, files);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("Error al descargar");
        }
    }

    @Transactional
    @RequestMapping(value = "/uploadExcelReconAsync", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody
    String uploadExcelReconAsync(ModelMap map, @RequestParam(value = "excelfile", required = true) MultipartFile excelfile, HttpServletRequest request) throws IOException {
        System.out.println("Ejecutando Proceso Elavon");
        List<X3147temp> temp = new ArrayList<>();
        SQP04650Filter filter = new SQP04650Filter();
        final SQP04674Filter filter2 = new SQP04674Filter();
        try {
            //logic = new InputLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            String filename = excelfile.getOriginalFilename();
            Double filesize = excelfile.getSize() * 0.00000095367432;
            Integer filerows = 0;
            System.out.println("Achivo actual Pesa: " + filesize + " MB.");
            if (filesize > 29) {
                throw new Exception("Archivo demasiado grande para procesar");
            }
            if(!logic.getProcessRunning()){
                throw new SQLException("Another process running, please wait");
            }
            StreamingReader sr = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .sheetIndex(0)
                    .read(excelfile.getInputStream());
            for (Row fila : sr) {
                //fila empieza a contar desde 0 (la fila 0 es cabecera)
                //se omite la cabecera
                if (fila.getRowNum() > 0) {
                    if (fila.getCell(0) != null) {
                        filerows++;
                        X3147temp x = new X3147temp();
                        x.setSYSTEM(fila.getCell(0) == null ? "" : fila.getCell(0).getStringCellValue());
                        //si primera fila vacia no se procesa
                        if (x.getSYSTEM().equals("")) {
                            break;
                        }
                        x.setBATCH_DATE(fila.getCell(1) == null ? "" : fila.getCell(1).getStringCellValue());
                        x.setEXT_MID(fila.getCell(2) == null ? "" : fila.getCell(2).getStringCellValue());
                        x.setGLOBAL_NAME(fila.getCell(3) == null ? "" : fila.getCell(3).getStringCellValue());
                        x.setFUNDED_CCY(fila.getCell(4) == null ? "" : fila.getCell(4).getStringCellValue());
                        x.setUSD_RATE(fila.getCell(5) == null ? 0 : fila.getCell(5).getNumericCellValue());
                        x.setSALES_TYPE(fila.getCell(6) == null ? "" : fila.getCell(6).getStringCellValue());
                        x.setCARD(fila.getCell(7) == null ? "" : fila.getCell(7).getStringCellValue());
                        x.setROC_TEXT(fila.getCell(8) == null ? "" : fila.getCell(8).getStringCellValue());
                        x.setCOMBTIC_NUM(fila.getCell(9) == null ? "" : fila.getCell(9).getStringCellValue());
                        x.setTKT(fila.getCell(10) == null ? "" : fila.getCell(10).getStringCellValue());
                        x.setTRX_DEPART_DTE(fila.getCell(11) == null ? "" : fila.getCell(11).getStringCellValue());
                        x.setTRN_AMT(fila.getCell(12) == null ? 0 : fila.getCell(12).getNumericCellValue());
                        x.setCONV_TRN_AMT(fila.getCell(13) == null ? 0 : fila.getCell(13).getNumericCellValue());
                        x.setCPT_ID(fila.getCell(14) == null ? "" : fila.getCell(14).getStringCellValue());
                        temp.add(x);
                    }
                }
            }
            boolean saveTemp = logic.saveX3147(temp);
            if (saveTemp) {
                filter.setIN_FILENAME(filename);
                filter.setIN_ROWSRCV(filerows);
                filter = logic.getSQP04650(filter);
                if (filter == null) {
                    throw new SQLException("Error in sql");
                }
                filter2.setIN_CCUST("139");
                //se ejecuta asyncronamente
                logic.getSQP04674async(filter2);
                
                //muestra las ejecuciones actuales del thread pool
                System.out.println(rt.getRunningThreadsToString() == null ? "No async workers" : rt.getRunningThreadsToString());
                
                map.put("success", filter.getOUT_SQLCODE().equals("1"));
                map.put("response", filter.getOUT_MESSAGE());
                //map.put("responseData",filter2.getOUT_MESSAGE());
            } else {
                throw new SQLException();
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("response", e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("response", e.getMessage());
        }
        return new Gson().toJson(map);
    }
}
