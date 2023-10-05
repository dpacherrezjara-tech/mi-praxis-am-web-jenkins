package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
import net.miatech.praxis.payment.A4507;
import net.miatech.praxis.payment.filter.A4331NEWFilter;
import net.miatech.praxis.payment.filter.A4496Filter;
import net.miatech.praxis.payment.filter.SQP04847Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05048Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05054Filter;
import net.miatech.praxis.payment.filter.SQP05055Filter;
import net.miatech.praxis.payment.filter.SQP05056Filter;
import net.miatech.praxis.payment.filter.SQP05057Filter;
import net.miatech.praxis.payment.filter.SQP05059Filter;
import net.miatech.praxis.payment.filter.SQP05060Filter;
import net.miatech.praxis.payment.filter.SQP05061Filter;
import net.miatech.praxis.payment.filter.SQP05062Filter;
import net.miatech.praxis.payment.filter.SQP05063Filter;
import net.miatech.praxis.payment.filter.SQP05065Filter;
import net.miatech.praxis.payment.filter.SQP05072Filter;
import net.miatech.praxis.payment.filter.SQP05074Filter;
import net.miatech.praxis.payment.filter.SQP05077Filter;
import net.miatech.praxis.payment.filter.SQP05081Filter;
import net.miatech.praxis.payment.filter.SQP05088Filter;
import net.miatech.praxis.payment.filter.SQP05089Filter;
import net.miatech.praxis.payment.filter.SQP05126Filter;
import net.miatech.praxis.payment.filter.SQP05128Filter;
import net.miatech.praxis.payment.filter.SQP05129Filter;
import net.miatech.praxis.payment.filter.SQP05130Filter;
import net.miatech.praxis.payment.filter.SQP05132Filter;
import net.miatech.praxis.payment.filter.SQP05133Filter;
import net.miatech.praxis.payment.filter.SQP05134Filter;
import net.miatech.praxis.payment.filter.SQP05141Filter;
import net.miatech.praxis.payment.filter.SQP05142Filter;
import net.miatech.praxis.payment.filter.SQP05147Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
@RequestMapping("/SalesReconciliationBPO")
public class SalesReconciliationBPOController {

    @Autowired
    private SalesReconciliationLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    private final String controllerName = "SalesReconciliationBPO";

    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadFilters-------------");
            SQP05004Filter filter = new SQP05004Filter();
            filter.setKEY1("PK");
            filter.setKEY2("PROCTYPE");
            model.put("paises", logic.getPaises());
            model.put("monedas", logic.getMonedas());
            model.put("procesadores", logic.getSQP05004Filter(filter).getLst());
            filter.setKEY2("86");
            model.put("cerror", logic.getSQP05004Filter(filter).getLst());
            filter.setKEY2("89");
            model.put("codadju", logic.getSQP05004Filter(filter).getLst());
            filter.setKEY1("CC");
            filter.setKEY2("");
            model.put("creditcards", logic.getSQP05004Filter(filter).getLst());
            System.out.println("Total: " + model.size());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    //<editor-fold defaultstate="collapsed" desc="By payment">
    @RequestMapping(value = "loadByPaymentSummary")
    public ResponseEntity<?> loadByPaymentSummary(@ModelAttribute SQP05059Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadByPaymentSummary-------------");
            filter = logic.getSQP05059Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadByPaymentDetail")
    public ResponseEntity<?> loadByPaymentDetail(@ModelAttribute SQP05060Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadByPaymentDetail-------------");
            filter = logic.getSQP05060Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "processTransactionsBatch", method = RequestMethod.POST)
    public ResponseEntity<?> processTransactionsBatch(@RequestBody SQP05074Filter params) {
        try {
            System.out.println("---------------SalesReconciliationBPO:processTransactionsBatch-------------");
            SQP05074Filter filter = logic.loadSQP05074Filter(params);
            System.out.println("Process Successfull, total affected: " + filter.getVP_CANT());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadTransactionsBatch")
    public ResponseEntity<?> downloadTransactionsBatch(){
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadTransactionsBatch-------------");
            SQP05147Filter filter = logic.loadSQP05147Filter();
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[25];
            headers[0] = "Processing Date";
            headers[1] = "Payment Date";
            headers[2] = "Processor";
            headers[3] = "Country";
            headers[4] = "Payment Merchant ID";
            headers[5] = "Status Sett. vs Sales";
            headers[6] = "Doc. Type";
            headers[7] = "Void";
            headers[8] = "Sales Merchant ID";
            headers[9] = "Description";
            headers[10] = "Sale Date";
            headers[11] = "Card Number";
            headers[12] = "Auth Code";
            headers[13] = "Installment Plan";
            headers[14] = "Installment Number";
            headers[15] = "Ticket";
            headers[16] = "PNR";
            headers[17] = "Currency";
            headers[18] = "Transaction Amount";
            headers[19] = "Error Code";
            headers[20] = "Description";
            headers[21] = "Adju. Code";
            headers[22] = "Description";
            headers[23] = "User Update";
            headers[24] = "Date Update";
            data.add(headers);
            for (A4507 obj : filter.getResponse()) {
                Object[] row = new Object[25];
                row[0] = obj.getPRDA();
                row[1] = obj.getPAYDATE();
                row[2] = obj.getDESC_PROCTYPE();
                row[3] = obj.getSCOUNTRY();
                row[4] = obj.getPMERCHID();
                row[5] = convertStatus(obj.getSTVAL());
                row[6] = obj.getTRANSTYPE();
                row[7] = obj.getFVOID();
                row[8] = obj.getSMERCHID();
                row[9] = obj.getDES_SMERCHANT();
                row[10] = obj.getSDATE();
                row[11] = obj.getSCARDN();
                row[12] = obj.getSAUTHOC();
                row[13] = obj.getNBRINSTA();
                row[14] = obj.getINSTANBR();
                row[15] = obj.getTICKET();
                row[16] = obj.getSPNR();
                //row[17] = obj.getInvoirn();
                row[17] = obj.getSCURRENCY();
                row[18] = obj.getTGROSAMOUN();
                row[19] = obj.getCERROR();
                row[20] = obj.getDESC_CERROR();
                row[21] = obj.getCODADJU();
                row[22] = obj.getDESC_CODADJU();
                row[23] = obj.getUSUP();
                row[24] = obj.getFEUP();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - BatchTrnx " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Mantenimiento By Payment">
    @RequestMapping(value = "maintenanceErrorTransactionBPO", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceErrorTransaction(@RequestBody SQP05048Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceErrorTransactionBPO-------------");
        ModelMap model = new ModelMap();
        try {
            SQP05048Filter filter = logic.loadSQP05048Filter(params);
            model.put("status", filter.getSQLRES());
            model.put("response", filter.getSQLMSG());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "ReverseTransaction")
    public ResponseEntity<?> ReverseTransaction(@ModelAttribute SQP04847Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : ReverseTransaction-------------");
        ModelMap model = new ModelMap();
        try {
            SQP04847Filter filter = logic.loadSQP04847Filter(params);
            model.put("status", filter.getSQLRES());
            model.put("response", filter.getSQLMSG());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPOInfo")
    public ResponseEntity<?> loadErrorTransactionBPOInfo(@ModelAttribute SQP05052Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPOInfo-------------");
        try {
            SQP05052Filter filter = logic.loadSQP05052Filter(params);
            System.out.println("Item Found: " + filter.getResponse().getArefnbr());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPOScanner")
    public ResponseEntity<?> loadErrorTransactionBPOScanner(@ModelAttribute SQP05054Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPOScanner-------------");
        try {
            SQP05054Filter filter = logic.loadSQP05054Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPODesglose")
    public ResponseEntity<?> loadErrorTransactionBPODesglose(@ModelAttribute SQP05055Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPODesglose-------------");
        try {
            SQP05055Filter filter = logic.loadSQP05055Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPODesgloseCHBK")
    public ResponseEntity<?> loadErrorTransactionBPODesgloseCHBK(@ModelAttribute SQP05072Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPODesgloseCHBK-------------");
        try {
            SQP05072Filter filter = logic.loadSQP05072Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "errorTransactionBPOsetStandBy")
    public ResponseEntity<?> errorTransactionBPOsetStandBy(@ModelAttribute SQP05056Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : errorTransactionBPOsetStandBy-------------");
        try {
            SQP05056Filter filter = logic.loadSQP05056Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "errorTransactionBPOreverseStandBy")
    public ResponseEntity<?> errorTransactionBPOreverseStandBy(@ModelAttribute SQP05057Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : errorTransactionBPOreverseStandBy-------------");
        try {
            SQP05057Filter filter = logic.loadSQP05057Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadScannerManual")
    public ResponseEntity<?> loadScannerManual(@ModelAttribute SQP05062Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadScannerManual-------------");
        try {
            SQP05062Filter filter = logic.loadSQP05062Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Exceles">
    @RequestMapping(value = "downloadByPaymentDetail")
    public ResponseEntity<?> downloadByPaymentDetail(@ModelAttribute SQP05060Filter params) {
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadByPaymentDetail-------------");
            SQP05060Filter filter = logic.getSQP05060Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[26];
            headers[0] = "Processing Date";
            headers[1] = "Payment Date";
            headers[2] = "Processor";
            headers[3] = "Country";
            headers[4] = "Payment Merchant ID";
            headers[5] = "Status Sett. vs Sales";
            headers[6] = "Doc. Type";
            headers[7] = "Void";
            headers[8] = "Sales Merchant ID";
            headers[9] = "Description";
            headers[10] = "Sale Date";
            headers[11] = "Card Number";
            headers[12] = "Auth Code";
            headers[13] = "Installment Plan";
            headers[14] = "Installment Number";
            headers[15] = "Ticket";
            headers[16] = "PNR";
            headers[17] = "Invoice Refer. Number PNR";
            headers[18] = "Currency";
            headers[19] = "Transaction Amount";
            headers[20] = "Error Code";
            headers[21] = "Description";
            headers[22] = "Adju. Code";
            headers[23] = "Description";
            headers[24] = "User Update";
            headers[25] = "Date Update";
            data.add(headers);
            for (A4331NEWFilter obj : filter.getResponse()) {
                Object[] row = new Object[26];
                row[0] = obj.getPrda();
                row[1] = obj.getPaydate();
                row[2] = obj.getDESC_PROCTYPE();
                row[3] = obj.getScountry();
                row[4] = obj.getPmerchid();
                row[5] = convertStatus(obj.getStval());
                row[6] = obj.getTranstype();
                row[7] = obj.getFvoid();
                row[8] = obj.getSmerchid();
                row[9] = obj.getDES_SMERCHANT();
                row[10] = obj.getSdate();
                row[11] = obj.getScardn();
                row[12] = obj.getSauthoc();
                row[13] = obj.getNbrinsta();
                row[14] = obj.getInstanbr();
                row[15] = obj.getTicket();
                row[16] = obj.getSpnr();
                row[17] = obj.getInvoirn();
                row[18] = obj.getScurrency();
                row[19] = obj.getTgrosamoun();
                row[20] = obj.getCerror();
                row[21] = obj.getDES_CERROR();
                row[22] = obj.getCodadju();
                row[23] = obj.getDESC_CODADJU();
                row[24] = obj.getUsup();
                row[25] = obj.getFeup();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - ByPayment " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadByTicketDetail")
    public ResponseEntity<?> downloadByTicketDetail(@ModelAttribute SQP05089Filter params) {
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadByTicketDetail-------------");
            SQP05089Filter filter = logic.loadSQP05089Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[22];
            headers[0] = "Sale Date";
            headers[1] = "IATA";
            headers[2] = "Source";
            headers[3] = "Channel";
            headers[4] = "Country";
            headers[5] = "Agent";
            headers[6] = "Trnx";
            headers[7] = "Doc. Type";
            headers[8] = "Void";
            headers[9] = "RFIC";
            headers[10] = "RFIS";
            headers[11] = "Pax Name";
            headers[12] = "Ticket";
            headers[13] = "PNR";
            headers[14] = "Card Code";
            headers[15] = "Card Number";
            headers[16] = "Auth Code";
            headers[17] = "Amount";
            headers[18] = "Currency";
            headers[19] = "Status";
            headers[20] = "Processor";
            headers[21] = "ADM St.";
            data.add(headers);
            for (A4496Filter obj : filter.getResponse()) {
                Object[] row = new Object[22];
                row[0] = obj.getA4496FECVT();
                row[1] = obj.getA4496AGENT();
                row[2] = obj.getA4496FUENT();
                row[3] = obj.getA4496SFUEN();
                row[4] = obj.getA4496PAIS();
                row[5] = obj.getA4496CODAG();
                row[6] = obj.getA4496TRNCU();
                row[7] = obj.getA4496TIPOD();
                row[8] = obj.getA4496TKVOI();
                row[9] = obj.getA4496RFIC();
                row[10] = obj.getA4496RFIS1();
                row[11] = obj.getA4496PAX();
                row[12] = obj.getA4496CIA() + obj.getA4496FORMA() + obj.getA4496SERIE();
                row[13] = obj.getA4496PNR();
                row[14] = obj.getA4501TTARJ();
                row[15] = obj.getA4501NREF();
                row[16] = obj.getA4501CAPL();
                row[17] = obj.getA4501VFOP();
                row[18] = obj.getA4501MFOP();
                row[19] = convertStatus(obj.getA4501STVAL());
                row[20] = obj.getDESC_PROCTYPE();
                row[21] = obj.getA4501STADM();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - ByTicket " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="MSI Tracking">
    @RequestMapping(value = "loadMSITrackingInfo")
    public ResponseEntity<?> loadMSITrackingInfo(@ModelAttribute SQP05061Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadMSITrackingInfo-------------");
        try {
            SQP05061Filter filter = logic.loadSQP05061Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "maintenanceReverseMSITracking", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceReverseMSITracking(@RequestBody SQP05063Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceReverseMSITracking-------------");
        try {
            SQP05063Filter filter = logic.loadSQP05063Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "maintenanceMSITracking", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceMSITracking(@RequestBody SQP05065Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceMSITracking-------------");
        try {
            SQP05065Filter filter = logic.loadSQP05065Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="ChargeBackTracking">
    @RequestMapping(value = "loadChargebackTrackingInfo")
    public ResponseEntity<?> loadChargebackTrackingInfo(@ModelAttribute SQP05081Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadChargebackTrackingInfo-------------");
        try {
            SQP05081Filter filter = logic.loadSQP05081Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "maintenanceChargebackTracking", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceChargebackTracking(@RequestBody SQP05077Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceChargebackTracking-------------");
        try {
            SQP05077Filter filter = logic.loadSQP05077Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="By Ticket">
    @RequestMapping(value = "loadByTicketSummary")
    public ResponseEntity<?> loadByTicketSummary(@ModelAttribute SQP05088Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadByTicketSummary-------------");
        try {
            SQP05088Filter filter = logic.loadSQP05088Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadByTicketDetail")
    public ResponseEntity<?> loadByTicketDetail(@ModelAttribute SQP05089Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadByTicketSummary-------------");
        try {
            SQP05089Filter filter = logic.loadSQP05089Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadByTicketConciliationInfo")
    public ResponseEntity<?> loadByTicketConciliationInfo(@ModelAttribute SQP05126Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadByTicketConciliationInfo-------------");
        try {
            SQP05126Filter filter = logic.loadSQP05126Filter(params);
            System.out.println("Ticket found: "
                    + filter.getResponse().getA4496CIA()
                    + filter.getResponse().getA4496FORMA()
                    + filter.getResponse().getA4496SERIE());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationStandBy")
    public ResponseEntity<?> ticketConciliationStandBy(@ModelAttribute SQP05128Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationStandBy-------------");
        try {
            SQP05128Filter filter = logic.loadSQP05128Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationReverseStandBy")
    public ResponseEntity<?> ticketConciliationReverseStandBy(@ModelAttribute SQP05129Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationReverseStandBy-------------");
        try {
            SQP05129Filter filter = logic.loadSQP05129Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationGenerateAdm", method = RequestMethod.POST)
    public ResponseEntity<?> ticketConciliationGenerateAdm(@RequestBody SQP05130Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationGenerateAdm-------------");
        try {
            SQP05130Filter filter = logic.loadSQP05130Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationReverseADM")
    public ResponseEntity<?> ticketConciliationReverseADM(@ModelAttribute SQP05132Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationReverseADM-------------");
        try {
            SQP05132Filter filter = logic.loadSQP05132Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Settlement">
    @RequestMapping(value = "loadSettlementSummary")
    public ResponseEntity<?> loadSettlementSummary(@ModelAttribute SQP05133Filter params){
        System.out.println("---------------SalesReconciliationBPO:loadSettlementSummary-------------");
        try {
            SQP05133Filter filter = logic.loadSQP05133Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadSettlementDetail")
    public ResponseEntity<?> loadSettlementDetail(@ModelAttribute SQP05134Filter params){
        System.out.println("---------------SalesReconciliationBPO:loadSettlementDetail-------------");
        try {
            SQP05134Filter filter = logic.loadSQP05134Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Summary">
    @RequestMapping(value = "loadSummary")
    public ResponseEntity<?> loadSummary(@ModelAttribute SQP05141Filter params){
        System.out.println("---------------SalesReconciliationBPO:loadSummary-------------");
        try {
            SQP05141Filter filter = logic.loadSQP05141Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadSummaryDetail")
    public ResponseEntity<?> loadSummary(@ModelAttribute SQP05142Filter params){
        System.out.println("---------------SalesReconciliationBPO:loadSummaryDetail-------------");
        try {
            SQP05142Filter filter = logic.loadSQP05142Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//</editor-fold>
    
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
