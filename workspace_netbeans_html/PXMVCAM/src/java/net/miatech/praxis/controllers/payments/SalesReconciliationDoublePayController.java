package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.SalesReconciliationDoublePayLogic;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05163Filter;
import net.miatech.praxis.payment.filter.SQP05164Filter;
import net.miatech.praxis.payment.filter.SQP05165Filter;
import net.miatech.praxis.utils.ExportUtils;
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
    
}
