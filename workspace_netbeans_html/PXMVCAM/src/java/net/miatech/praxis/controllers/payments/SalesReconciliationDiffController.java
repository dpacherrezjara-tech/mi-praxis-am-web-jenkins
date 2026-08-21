package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.SalesReconciliationDiffLogic;
import net.miatech.praxis.payment.filter.A4511Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05152Filter;
import net.miatech.praxis.payment.filter.SQP05153Filter;
import net.miatech.praxis.payment.filter.SQP05154Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Dvicente
 */
@Controller
@RequestMapping("/SalesReconciliationDiff")
@Scope("request")
public class SalesReconciliationDiffController {
    
    @Autowired
    private SalesReconciliationDiffLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    
    private final String controllerName = "SalesReconciliationDiff";
    
    @RequestMapping(value = "loadSummary")
    public ResponseEntity<?> loadSummary(@ModelAttribute SQP05153Filter params){
        System.out.println("---------------SalesReconciliationDiff:loadSummary-------------");
        try {
            SQP05153Filter filter = logic.loadSQP05153Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadFilters-------------");
            SQP05004Filter filter = new SQP05004Filter();
            filter.setKEY1("PK");
            filter.setKEY2("PROCTYPE");
            model.put("paises", logic.getPaises());
            model.put("procesadores", logic.loadSQP05004Filter(filter).getLst());
            System.out.println("Total: " + model.size());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadDetail")
    public ResponseEntity<?> loadDetail(@ModelAttribute SQP05154Filter params){
        System.out.println("---------------SalesReconciliationDiff:loadDetail-------------");
        try {
            SQP05154Filter filter = logic.loadSQP05154Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "processSummary")
    public ResponseEntity<?> processSummary(@ModelAttribute SQP05152Filter params){
        System.out.println("---------------SalesReconciliationDiff:processSummary-------------");
        try {
            logic.loadSQP05152Filter(params);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
            
    @RequestMapping(value = "downloadSummary")
    public ResponseEntity<?> downloadSummary(@ModelAttribute SQP05153Filter params){
        System.out.println("---------------PaymentsCommissions:downloadSummary-------------");
        try {
            SQP05153Filter filter = logic.loadSQP05153Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[17];
            headers[0] = "Processing Date";
            headers[1] = "Processor";
            headers[2] = "Curr";
            headers[3] = "GROSS";
            headers[4] = "CR Commission";
            headers[5] = "CR VAT Commission";
            headers[6] = "CR Serv. Fee";
            headers[7] = "CR VAT Serv. Fee";
            headers[8] = "CPX Commission";
            headers[9] = "CPX VAT Commission";
            headers[10] = "CPX Serv. Fee";
            headers[11] = "CPX VAT Serv. Fee";
            headers[12] = "DIFF Commission";
            headers[13] = "DIFF VAT Commission";
            headers[14] = "DIFF Serv. Fee";
            headers[15] = "DIFF VAT Serv. Fee";
            headers[16] = "DIFF Qty Errors";
            data.add(headers);
            for (A4511Filter obj : filter.getResponse()) {
                Object[] row = new Object[17];
                row[0] = obj.getPRDA();
                row[1] = obj.getDESC_PROCTYPE();
                row[2] = obj.getSCURRENCY();
                row[3] = obj.getTGROSAMOUN();
                row[4] = obj.getSFEEAMOU();
                row[5] = obj.getIVACOM12();
                row[6] = obj.getSERVICEFEE();
                row[7] = obj.getOVERCOM12();
                row[8] = obj.getSFEEAMOUC();
                row[9] = obj.getIVACOM12C();
                row[10] = obj.getSERVICEFEC();
                row[11] = obj.getOVERCOM12C();
                row[12] = obj.getSFEEAMOUD();
                row[13] = obj.getIVACOM12D();
                row[14] = obj.getSERVICEFED();
                row[15] = obj.getOVERCOM12D();
                row[16] = obj.getALERTS();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " Summary - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadSummaryMerchant")
    public ResponseEntity<?> downloadSummaryMerchant(@ModelAttribute SQP05153Filter params){
        System.out.println("---------------PaymentsCommissions:downloadSummaryMerchant-------------");
        try {
            SQP05153Filter filter = logic.loadSQP05153Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[18];
            headers[0] = "Processing Date";
            headers[1] = "Processor";
            headers[2] = "Merchant";
            headers[3] = "Curr";
            headers[4] = "GROSS";
            headers[5] = "CR Commission";
            headers[6] = "CR VAT Commission";
            headers[7] = "CR Serv. Fee";
            headers[8] = "CR VAT Serv. Fee";
            headers[9] = "CPX Commission";
            headers[10] = "CPX VAT Commission";
            headers[11] = "CPX Serv. Fee";
            headers[12] = "CPX VAT Serv. Fee";
            headers[13] = "DIFF Commission";
            headers[14] = "DIFF VAT Commission";
            headers[15] = "DIFF Serv. Fee";
            headers[16] = "DIFF VAT Serv. Fee";
            headers[17] = "DIFF Qty Errors";
            data.add(headers);
            for (A4511Filter obj : filter.getResponse()) {
                Object[] row = new Object[18];
                row[0] = obj.getPRDA();
                row[1] = obj.getDESC_PROCTYPE();
                row[2] = obj.getPMERCHID();
                row[3] = obj.getSCURRENCY();
                row[4] = obj.getTGROSAMOUN();
                row[5] = obj.getSFEEAMOU();
                row[6] = obj.getIVACOM12();
                row[7] = obj.getSERVICEFEE();
                row[8] = obj.getOVERCOM12();
                row[9] = obj.getSFEEAMOUC();
                row[10] = obj.getIVACOM12C();
                row[11] = obj.getSERVICEFEC();
                row[12] = obj.getOVERCOM12C();
                row[13] = obj.getSFEEAMOUD();
                row[14] = obj.getIVACOM12D();
                row[15] = obj.getSERVICEFED();
                row[16] = obj.getOVERCOM12D();
                row[17] = obj.getALERTS();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " Merchants - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadDetail")
    public ResponseEntity<?> downloadDetail(@ModelAttribute SQP05154Filter params){
        System.out.println("---------------PaymentsCommissions:downloadDetail-------------");
        try {
            params.setExcel(true);
            SQP05154Filter filter = logic.loadSQP05154Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[26];
            headers[0] = "Processing Date";
            headers[1] = "Processor";
            headers[2] = "Payment Merchant";
            headers[3] = "Country";
            headers[4] = "Doc. Type";
            headers[5] = "Sale Merchant";
            headers[6] = "Description";
            headers[7] = "Sale Date";
            headers[8] = "Card Number";
            headers[9] = "Auth Code";
            headers[10] = "Installments";
            headers[11] = "Curr";
            headers[12] = "GROSS";
            headers[13] = "CR Commission";
            headers[14] = "CR VAT Commission";
            headers[15] = "CR Serv. Fee";
            headers[16] = "CR VAT Serv. Fee";
            headers[17] = "CPX Commission";
            headers[18] = "CPX VAT Commission";
            headers[19] = "CPX Serv. Fee";
            headers[20] = "CPX VAT Serv. Fee";
            headers[21] = "DIFF Commission";
            headers[22] = "DIFF VAT Commission";
            headers[23] = "DIFF Serv. Fee";
            headers[24] = "DIFF VAT Serv. Fee";
            headers[25] = "DIFF Qty Errors";
            data.add(headers);
            for (A4511Filter obj : filter.getResponse()) {
                Object[] row = new Object[26];
                row[0] = obj.getPRDA();
                row[1] = obj.getDESC_PROCTYPE();
                row[2] = obj.getPMERCHID();
                row[3] = obj.getSCOUNTRY();
                row[4] = obj.getTRANSTYPE();
                row[5] = obj.getSMERCHID();
                row[6] = obj.getDESC_SMERCHID();
                row[7] = obj.getSDATE();
                row[8] = obj.getSCARDN();
                row[9] = obj.getSAUTHOC();
                row[10] = obj.getINSTANBR();
                row[11] = obj.getSCURRENCY();
                row[12] = obj.getTGROSAMOUN();
                row[13] = obj.getSFEEAMOU();
                row[14] = obj.getIVACOM12();
                row[15] = obj.getSERVICEFEE();
                row[16] = obj.getOVERCOM12();
                row[17] = obj.getSFEEAMOUC();
                row[18] = obj.getIVACOM12C();
                row[19] = obj.getSERVICEFEC();
                row[20] = obj.getOVERCOM12C();
                row[21] = obj.getSFEEAMOUD();
                row[22] = obj.getIVACOM12D();
                row[23] = obj.getSERVICEFED();
                row[24] = obj.getOVERCOM12D();
                row[25] = obj.getSTATUS().equals("Y")?"Difference":"Match";
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " Detail - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
