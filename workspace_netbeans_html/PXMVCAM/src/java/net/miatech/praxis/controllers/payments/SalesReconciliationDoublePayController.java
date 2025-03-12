package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.SalesReconciliationDoublePayLogic;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05163Filter;
import net.miatech.praxis.payment.filter.SQP05164Filter;
import net.miatech.praxis.payment.filter.SQP05165Filter;
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
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Dvicente
 */
@Controller
@RequestMapping("/SalesReconciliationDoublePay")
@Scope("request")
public class SalesReconciliationDoublePayController {
    
    @Autowired
    private SalesReconciliationDoublePayLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    
    private final String controllerName = "SalesReconciliationDoublePay";
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        System.out.println("----------------SalesReconciliationDoublePay:loadFilters-------------");
        try {
            model.put("paises", logic.getPaises());
            model.put("monedas", logic.getMonedas());
            SQP05004Filter filter = new SQP05004Filter();
            filter.setKEY1("PK");
            filter.setKEY2("PROCTYPE");
            model.put("procesadores", logic.getSQP05004Filter(filter).getLst());
            System.out.println("Total: " + model.size());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadInfo")
    public ResponseEntity<?> loadInfo(@ModelAttribute SQP05163Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:loadInfo-------------");
        try {
            SQP05163Filter filter = logic.loadSQP05163Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadTrnxInfo")
    public ResponseEntity<?> loadTrnxDesglose(@ModelAttribute SQP05052Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:loadTrnxInfo-------------");
        try {
            SQP05052Filter filter = logic.loadSQP05052Filter(params);
            System.out.println("Item Found: " + filter.getIN_AREFNBR());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadTrnxDesglose")
    public ResponseEntity<?> loadTrnxDesglose(@ModelAttribute SQP05165Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:loadTrnxDesglose-------------");
        try {
            SQP05165Filter filter = logic.loadSQP05165Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "maintenanceRefundInfo",method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceRefundInfo(@RequestBody SQP05164Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:maintenanceRefundInfo-------------");
        try {
            SQP05164Filter filter = logic.loadSQP05164Filter(params);
            System.out.println("Record updated: " + filter.getIN_AREFNBR());
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadInfo")
    public ResponseEntity<?> downloadInfo(@ModelAttribute SQP05163Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:downloadInfo-------------");
        try {
            SQP05163Filter filter = logic.loadSQP05163Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[25];
            headers[0] = "Processing Date";
            headers[1] = "Payment Date";
            headers[2] = "Payment Merch. ID";
            headers[3] = "Settl. VS Sales";
            headers[4] = "Refund Status";
            headers[5] = "Doc. Type";
            headers[6] = "Sale Merch. ID";
            headers[7] = "Description";
            headers[8] = "Invoice Refer.\nNbr PNR";
            headers[9] = "PNR";
            headers[10] = "Ticket Ref.";
            headers[11] = "Card Number";
            headers[12] = "Auth Code";
            headers[13] = "Sale Date";
            headers[14] = "Transac. Amount";
            headers[15] = "Curr.";
            headers[16] = "Pay Tickets";
            headers[17] = "Refund Date";
            headers[18] = "Refund Operation";
            headers[19] = "Refund Agent";
            headers[20] = "Refund Auth.";
            headers[21] = "Error Code";
            headers[22] = "Description";
            headers[23] = "Adju Code";
            headers[24] = "Description";
            data.add(headers);
            for (A4331Filter obj : filter.getResponse()) {
                Object[] row = new Object[25];
                row[0] = obj.getPrda();
                row[1] = obj.getPaydate();
                row[2] = obj.getPmerchid();
                row[3] = convertStatus(obj.getStval());
                row[4] = obj.getStrfnd().equals("1")?"Processed":"Pending";
                row[5] = obj.getTranstype();
                row[6] = obj.getSmerchid();
                row[7] = obj.getDES_SMERCHANT();
                row[8] = obj.getInvoirn();
                row[9] = obj.getSpnr();
                row[10] = obj.getTicket();
                row[11] = obj.getScardn();
                row[12] = obj.getSauthoc();
                row[13] = obj.getSdate();
                row[14] = obj.getTgrosamoun();
                row[15] = obj.getPcurrency();
                row[16] = obj.getQtytkt();
                row[17] = obj.getRfdate();
                row[18] = obj.getRfoperb();
                row[19] = obj.getRfaudit();
                row[20] = obj.getRfautor();
                row[21] = obj.getCerror();
                row[22] = obj.getDES_CERROR();
                row[23] = obj.getCodadju();
                row[24] = obj.getDESC_CODADJU();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadTrnxDesglose")
    public ResponseEntity<?> downloadTrnxDesglose(@ModelAttribute SQP05165Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:downloadTrnxDesglose-------------");
        try {
            SQP05165Filter filter = logic.loadSQP05165Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[24];
            headers[0] = "Status";
            headers[1] = "Src.";
            headers[2] = "Doc type";
            headers[3] = "Card Code";
            headers[4] = "Card number";
            headers[5] = "Auth Code";
            headers[6] = "Curr.";
            headers[7] = "Amount";
            headers[8] = "Amount\nTransaction";
            headers[9] = "Sales Date";
            headers[10] = "PNR";
            headers[11] = "Ticket";
            headers[12] = "Corrl";
            headers[13] = "Flag\nVoid";
            headers[14] = "Agent";
            headers[15] = "Adju. Code";
            headers[16] = "Description";
            headers[17] = "Base Comm.";
            headers[18] = "VAT";
            headers[19] = "MSI\nServ. Fee";
            headers[20] = "VAT Serv. Fee";
            headers[21] = "Accounting\nDate";
            headers[22] = "Accounting\nID";
            headers[23] = "Accounting\nStatus";
            data.add(headers);
            for (A4335Filter obj : filter.getResponse()) {
                Object[] row = new Object[24];
                row[0] = "Concil.";
                row[1] = obj.getFuente();
                row[2] = obj.getTrncu();
                row[3] = obj.getScarcod();
                row[4] = obj.getScardn();
                row[5] = obj.getSauthoc();
                row[6] = obj.getScurrency();
                row[7] = obj.getSvfops();
                row[8] = obj.getSVFOPS_TOTAL();
                row[9] = obj.getSdate();
                row[10] = obj.getSpnr();
                row[11] = obj.getCcia()+ obj.getForma()+ obj.getSerie();
                row[12] = obj.getCorrl();
                row[13] = obj.getFvoid();
                row[14] = obj.getSagent();
                row[15] = obj.getTrncu().equals("ADJU")?obj.getCerror():"";
                row[16] = obj.getDESC_CODADJU();
                row[17] = obj.getDiscamounc();
                row[18] = obj.getDiscamouni();
                row[19] = obj.getAcceamou();
                row[20] = obj.getIvacom12();
                row[21] = obj.getLIQ_FCON();
                row[22] = obj.getLIQ_IDCON();
                row[23] = obj.getLIQ_STCON().equals("1")?"Accounted":"Pending";
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " Breakdown - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    //<editor-fold defaultstate="collapsed" desc="Funciones">
    private static String convertStatus(String stval) {
        String valor = "";
        switch (stval) {
            case "1":
                valor = "Stand By";
                break;
            case "2":
                valor = "Sales without Settl.";
                break;
            case "3":
                valor = "Settl. without Sales";
                break;
            case "4":
                valor = "Match Difference";
                break;
            case "5":
                valor = "Match Manual";
                break;
            case "6":
                valor = "Forced Match";
                break;
            case "7":
                valor = "Compensation Match";
                break;
            case "8":
                valor = "Pending RFND";
                break;
        }
        return valor;
    }
//</editor-fold>
}
