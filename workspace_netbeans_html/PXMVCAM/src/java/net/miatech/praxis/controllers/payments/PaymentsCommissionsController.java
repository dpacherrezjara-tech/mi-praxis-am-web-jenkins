package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.BankEmissorCatalogLogic;
import net.miatech.praxis.logic.payments.PaymentsCommissionsLogic;
import net.miatech.praxis.payment.filter.A4508Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05135Filter;
import net.miatech.praxis.payment.filter.SQP05155Filter;
import net.miatech.praxis.payment.filter.SQP05156Filter;
import net.miatech.praxis.payment.filter.SQP05158Filter;
import net.miatech.praxis.payment.filter.SQP05262Filter;
import net.miatech.praxis.payment.filter.SQP05267Filter;
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
    private BankEmissorCatalogLogic bankLogic;
    
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
            SQP05262Filter bankFilter = new SQP05262Filter();
            bankFilter.setIN_CCUST("139");
            model.put("banks", bankLogic.loadSQP05262Filter(bankFilter).getResponse());
            model.put("monedas", logic.getMonedas());
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
            Object[] headers = new Object[21];
            headers[0] = "Type";
            headers[1] = "Card Type";
            headers[2] = "Installments";
            headers[3] = "Processor";
            headers[4] = "Country";
            headers[5] = "Initial Date";
            headers[6] = "Expiry Date";
            headers[7] = "% Commission";
            headers[8] = "VAT";
            headers[9] = "Bank";
            headers[10] = "Brand";
            headers[11] = "BIN Code";
            headers[12] = "BIN Description";
            headers[13] = "Min. Amount";
            headers[14] = "Curr.";
            headers[15] = "User Created";
            headers[16] = "Date Created";
            headers[17] = "Hour Created";
            headers[18] = "User Updated";
            headers[19] = "Date Updated";
            headers[20] = "Hour Updated";
            data.add(headers);
            for (A4508Filter obj : filter.getResponse()) {
                Object[] row = new Object[21];
                row[0] = convertTypeComm(obj.getCODIGO());
                row[1] = obj.getTIPOTARJ().equals("C")?"Credit":"Debit";
                row[2] = obj.getCUOTAS();
                row[3] = obj.getDESC_PROCTYPE();
                row[4] = obj.getCOUNTRY().trim().equals("")?"All":obj.getCOUNTRY();
                row[5] = obj.getFECFROM();
                row[6] = obj.getFECTO();
                row[7] = obj.getRATCNAC();
                row[8] = obj.getRATEIVA() + "%";
                row[9] = obj.getDESC_BANK();
                row[10] = convertBrandCard(obj.getCODECARD());
                row[11] = obj.getCODEBIN();
                row[12] = obj.getDESCBIN();
                row[13] = obj.getMINAMT();
                row[14] = obj.getCURRAMT();
                row[15] = obj.getUSCR();
                row[16] = obj.getFECR();
                row[17] = obj.getHOCR();
                row[18] = obj.getUSUP();
                row[19] = obj.getFEUP();
                row[20] = obj.getHOUP();
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
    
    @RequestMapping(value = "deleteCommission")
    public ResponseEntity<?> deleteCommission(@RequestBody SQP05267Filter params){
        System.out.println("---------------PaymentsCommissions:deleteCommission-------------");
        try {
            logic.loadSQP05267Filter(params);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    private static String convertBrandCard(String codecard){
        String result = "";
        switch (codecard.trim()) {
            case "1":
                result = "Visa";
                break;
            case "2":
                result = "MasterCard";
                break;
            case "3":
                result = "American Express";
                break;
            default:
                result = "";
        }
        return result;
    }
    
    private static String convertTypeComm(String typecomm){
        String result = "";
        switch (typecomm.trim()) {
            case "MSI":
                result = "MSI Comm.";
                break;
            case "COM":
                result = "Base Comm.";
                break;
            case "BIN":
                result = "Bank Comm.";
                break;
            default:
                result = "";
        }
        return result;
    }
}
