package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.ErrorControlLogic;
import net.miatech.praxis.payment.entities.A4297MP;
import net.miatech.praxis.payment.entities.A4481MP;
import net.miatech.praxis.payment.errordtos.VN0002PG;
import net.miatech.praxis.payment.errordtos.VN0002PG_UP;
import net.miatech.praxis.payment.filter.A4297Filter;
import net.miatech.praxis.payment.filter.A4481Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05020Filter;
import net.miatech.praxis.payment.filter.SQP05021Filter;
import net.miatech.praxis.payment.filter.SQP05025Filter;
import net.miatech.praxis.payment.filter.SQP05026Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/ErrorControl")
public class ErrorControlController {
    
    @Autowired
    private ErrorControlLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    private static String controllerName = "Error Control";
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model){
        try {
            System.out.println("*******************ErrorControl: loadFilters*********************");
            model.put("lstError", logic.getSQP05019Filter());
            SQP05004Filter procesadores = new SQP05004Filter();
            procesadores.setKEY1("PR");
            model.put("lstProcs", logic.getSQP05004Filter(procesadores).getLst());
            return new ResponseEntity<>(model,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorSummary")
    public ResponseEntity<?> loadErrorSummary(@ModelAttribute SQP05020Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorSummary*********************");
            return new ResponseEntity<>(logic.getSQP05020Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorDetail")
    public ResponseEntity<?> loadErrorDetail(@ModelAttribute SQP05021Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorDetail*********************");
            return new ResponseEntity<>(logic.getSQP05021Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorArchSummary")
    public ResponseEntity<?> loadErrorArchSummary(@ModelAttribute SQP05025Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorArchSummary*********************");
            return new ResponseEntity<>(logic.getSQP05025Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorArchDetail")
    public ResponseEntity<?> loadErrorArchDetail(@ModelAttribute SQP05026Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorArchDetail*********************");
            return new ResponseEntity<>(logic.getSQP05026Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    //<editor-fold defaultstate="collapsed" desc="Descargas">
    @RequestMapping(value = "downloadErrorSummary")
    public ResponseEntity<?> downloadErrorSummary(@ModelAttribute SQP05020Filter filter){
        try {
            System.out.println("*******************ErrorControl: downloadErrorSummary*********************");
            filter = logic.getSQP05020Filter(filter);
            List<Object[]> data = new ArrayList<>();
            Object[] header = new Object[3];
            header[0] = "Processing Date";
            header[1] = "Proc. Description";
            header[2] = "Qty. Errors";
            data.add(header);
            for(A4481MP obj : filter.getResponse()){
                Object[] row = new Object[3];
                row[0] = obj.getA4481FPROC();
                row[1] = obj.getA4451DESC1();
                row[2] = obj.getTOTAL();
                data.add(row);
            }
            String fileName = controllerName + " - Format " + filter.getTBL_PROC()+Functions.getFechaActual();
            return exportUtils.createExcel(data,fileName);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    
    @RequestMapping(value = "downloadErrorArchSummary")
    public ResponseEntity<?> downloadErrorArchSummary(@ModelAttribute SQP05025Filter filter){
        try {
            System.out.println("*******************ErrorControl: downloadErrorArchSummary*********************");
            filter = logic.getSQP05025Filter(filter);
            List<Object[]> data = new ArrayList<>();
            Object[] header = new Object[3];
            header[0] = "Processing Date";
            header[1] = "Proc. Description";
            header[2] = "Qty. Errors";
            data.add(header);
            for(A4297MP obj : filter.getResult()){
                Object[] row = new Object[3];
                row[0] = obj.getA4297FPRDA();
                row[1] = obj.getA4451DESC1();
                row[2] = obj.getTOTAL();
                data.add(row);
            }
            String fileName = controllerName + " - Load " + filter.getTBL_PROC()+Functions.getFechaActual();
            return exportUtils.createExcel(data,fileName);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadErrorDetail")
    public ResponseEntity<?> downloadErrorDetail(@ModelAttribute SQP05021Filter filter){
        try {
            System.out.println("*******************ErrorControl: downloadErrorDetail*********************");
            filter = logic.getSQP05021Filter(filter);
            List<Object[]> data = new ArrayList<>();
            Object[] header = new Object[14];
            header[0] = "RN";
            header[1] = "Processing Date";
            header[2] = "ID File";
            header[3] = "Proc. Description";
            header[4] = "Sale Country";
            header[5] = "ID Reference";
            header[6] = "Ticket Number";
            header[7] = "Status Error";
            header[8] = "Correction Type";
            header[9] = "Program";
            header[10] = "Error Code";
            header[11] = "Error Description";
            header[12] = "Audited by";
            header[13] = "Audited Date";
            data.add(header);
            for(A4481Filter obj : filter.getLst()){
                Object[] row = new Object[14];
                row[0] = obj.getRN();
                row[1] = obj.getA4481fproc();
                row[2] = obj.getA4481idfil();
                row[3] = obj.getA4451DESC1();
                row[4] = obj.getA4481psvta();
                row[5] = obj.getA4481idref();
                row[6] = obj.getA4481cia() + obj.getA4481forma() + obj.getA4481serie();
                switch (obj.getA4481stser()) {
                    case "0":
                        row[7] = "Pending";
                        break;
                    case "1":
                        row[7] = "Audited";
                        break;
                    default:
                        row[7] = "Pending System";
                        break;
                }
                if(obj.getA4481tipco().equals("A")){
                    row[8] = "Automatic";
                }else{
                    row[8] = "Forced Match";
                }
                row[9] = obj.getA4481prog();
                row[10] = obj.getA4481coder();
                row[11] = obj.getA4481data();
                row[12] = obj.getA4481usrfz();
                row[13] = obj.getA4481fecfz();
                data.add(row);
            }
            String fileName = controllerName + " - Format " + filter.getARCHIVO()+filter.getDATE_FROM()+filter.getCERROR().trim();
            return exportUtils.createExcel(data,fileName);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadErrorArchDetail")
    public ResponseEntity<?> downloadErrorArchDetail(@ModelAttribute SQP05026Filter filter){
        try {
            System.out.println("*******************ErrorControl: downloadErrorArchDetail*********************");
            filter = logic.getSQP05026Filter(filter);
            List<Object[]> data = new ArrayList<>();
            Object[] header = new Object[7];
            header[0] = "RN";
            header[1] = "File Description";
            header[2] = "Processing Date";
            header[3] = "Load Date";
            header[4] = "ID File";
            header[5] = "Error Code";
            header[6] = "Error Description";
            data.add(header);
            for(A4297Filter obj : filter.getLst()){
                Object[] row = new Object[7];
                row[0] = obj.getRN();
                row[1] = obj.getA4451DESC1();
                row[2] = obj.getA4297fprda();
                row[3] = obj.getA4297fregi();
                row[4] = obj.getA4297idfil();
                row[5] = obj.getA4297cderr();
                row[6] = obj.getA4480DES();
                data.add(row);
            }
            String fileName = controllerName + " - Load " + filter.getARCHIVO()+filter.getDATE_FROM()+filter.getCERROR().trim();
            return exportUtils.createExcel(data,fileName);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
//</editor-fold>
    
    /**
    * Procedimientos para Data Entrys
    */
    @RequestMapping(value = "loadVN0002Info")
    public ResponseEntity<?> loadVN0002Info(@ModelAttribute VN0002PG filter){
        try {
            System.out.println("*******************ErrorControl: loadVN0002Info*********************");
            return new ResponseEntity<>(logic.getVN0002PGInfo(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "updateVN0002PG",method = RequestMethod.PATCH)
    public ResponseEntity<?> updateVN0002PG(@RequestBody Map<String,Object> filter){
        try {
            VN0002PG_UP obj = new ObjectMapper().convertValue(filter,VN0002PG_UP.class);
            System.out.println("*******************ErrorControl: updateVN0002PG*********************");
            Integer result = logic.updateVN0002PG(obj);
            //return new ResponseEntity<>(logic.updateVN0002PG(obj),HttpStatus.OK);
            return new ResponseEntity<>(Collections.singletonMap("status", result),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    
}
