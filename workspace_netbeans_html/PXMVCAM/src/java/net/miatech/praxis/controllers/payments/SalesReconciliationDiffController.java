package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.SalesReconciliationDiffLogic;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05152Filter;
import net.miatech.praxis.payment.filter.SQP05153Filter;
import net.miatech.praxis.payment.filter.SQP05154Filter;
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
}
