package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
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

    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadFilters-------------");
            SQP05004Filter filter = new SQP05004Filter();
            filter.setKEY1("PR");
            model.put("paises", logic.getPaises());
            model.put("procesadores", logic.getSQP05004Filter(filter).getLst());
            filter.setKEY1("PK");
            filter.setKEY2("86");
            model.put("cerror", logic.getSQP05004Filter(filter).getLst());
            filter.setKEY2("89");
            model.put("codadju", logic.getSQP05004Filter(filter).getLst());
            System.out.println("Total: " + model.size());
            return new ResponseEntity<>(model, HttpStatus.OK);
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
}
