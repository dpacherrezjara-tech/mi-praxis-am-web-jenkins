package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.PaymentsCommissionsLogic;
import net.miatech.praxis.payment.filter.A4508Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05135Filter;
import net.miatech.praxis.payment.filter.SQP05155Filter;
import net.miatech.praxis.payment.filter.SQP05156Filter;
import net.miatech.praxis.payment.filter.SQP05158Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Dvicente
 */
@Controller
@RequestMapping("PaymentsCommissions")
@Scope("request")
public class PaymentsCommissionsController {
    @Autowired
    private PaymentsCommissionsLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;

    private final String controllerName = "PaymentsCommissions";
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadFilters-------------");
            SQP05004Filter filter = new SQP05004Filter();
            filter.setKEY1("PK");
            filter.setKEY2("PROCTYPE");
            model.put("paises", logic.getPaises());
            model.put("procesadores", logic.loadSQP05004Filter(filter).getLst());
            filter.setKEY1("PR");
            filter.setKEY2("");
            model.put("procesq", logic.loadSQP05004Filter(filter).getLst());
            System.out.println("Total: " + model.size());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadMasterCommissions")
    public ResponseEntity<?> loadMasterCommissions(@ModelAttribute SQP05155Filter params){
        System.out.println("---------------PaymentsCommissions:loadMasterCommissions-------------");
        try {
            SQP05155Filter filter = logic.loadSQP05155Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadMasterCommissions")
    public ResponseEntity<?> downloadMasterCommissions(@ModelAttribute SQP05155Filter params){
        System.out.println("---------------PaymentsCommissions:downloadMasterCommissions-------------");
        try {
            params.setExcel(true);
            SQP05155Filter filter = logic.loadSQP05155Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[11];
            headers[0] = "Type";
            headers[1] = "Card Type";
            headers[2] = "Installments";
            headers[3] = "Processor";
            headers[4] = "Country";
            headers[5] = "Initial Date";
            headers[6] = "Expiry Date";
            headers[7] = "% Commission";
            headers[8] = "VAT";
            headers[9] = "Date Created";
            headers[10] = "Date Updated";
            data.add(headers);
            for (A4508Filter obj : filter.getResponse()) {
                Object[] row = new Object[9];
                row[0] = obj.getCODIGO().equals("COM")?"Commission":"MSI";
                row[1] = obj.getTIPOTARJ().equals("C")?"Credit":"Debit";
                row[2] = obj.getCUOTAS();
                row[3] = obj.getDESC_PROCTYPE();
                row[4] = obj.getCOUNTRY().trim().equals("")?"All":obj.getCOUNTRY();
                row[5] = obj.getFECFROM();
                row[6] = obj.getFECTO();
                row[7] = obj.getRATCNAC() + "%";
                row[8] = obj.getRATEIVA() + "%";
                row[8] = obj.getFECR();
                row[8] = obj.getFEUP();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadCommission")
    public ResponseEntity<?> loadCommission(@ModelAttribute SQP05158Filter params){
        System.out.println("---------------PaymentsCommissions:loadCommission-------------");
        try {
            SQP05158Filter filter = logic.loadSQP05158Filter(params);
            System.out.println("Item found: " + filter.getResponse().getID());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "addCommission")
    public ResponseEntity<?> addCommission(@RequestBody SQP05156Filter params){
        System.out.println("---------------PaymentsCommissions:addCommission-------------");
        try {
            SQP05156Filter filter = logic.loadSQP05156Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "editCommission")
    public ResponseEntity<?> editCommission(@RequestBody SQP05135Filter params){
        System.out.println("---------------PaymentsCommissions:editCommission-------------");
        try {
            SQP05135Filter filter = logic.loadSQP05135Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
