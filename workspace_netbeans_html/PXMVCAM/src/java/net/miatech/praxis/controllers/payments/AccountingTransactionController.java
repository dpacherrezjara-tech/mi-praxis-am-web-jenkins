package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.AccountingTransactionLogic;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05036Filter;
import net.miatech.praxis.payment.filter.SQP05037Filter;
import net.miatech.praxis.payment.filter.SQP05041Filter;
import net.miatech.praxis.payment.filter.SQP05042Filter;
import net.miatech.praxis.payment.filter.SQP05043Filter;
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
@Scope("request")
@RequestMapping("/AccountingTransaction")
public class AccountingTransactionController {
    
    @Autowired
    private AccountingTransactionLogic logic;
    private static final String controllerName = "Accounting Transaction";
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model){
        try {
            System.out.println("*******************Accounting Transaction: loadFilters*********************");
            SQP05004Filter procesadores = new SQP05004Filter();
            procesadores.setKEY1("PR");
            model.put("lstProcs", logic.getSQP05004Filter(procesadores).getLst());
            return new ResponseEntity<>(model,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadSummary")
    public ResponseEntity<?> loadSummary(@ModelAttribute SQP05036Filter filter){
        try {
            System.out.println("*******************Accounting Transaction: loadSummary*********************");
            return new ResponseEntity<>(logic.getSQP05036Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadSummaryTree")
    public ResponseEntity<?> loadSummaryTree(@ModelAttribute SQP05037Filter filter){
        try {
            System.out.println("*******************Accounting Transaction: loadSummaryTree*********************");
            return new ResponseEntity<>(logic.getSQP05037Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadSummaryTreeDetail")
    public ResponseEntity<?> loadSummaryTreeDetail(@ModelAttribute SQP05041Filter filter){
        try {
            System.out.println("*******************Accounting Transaction: loadSummaryTreeDetail*********************");
            return new ResponseEntity<>(logic.getSQP05041Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadDetailAccounted")
    public ResponseEntity<?> loadDetailAccounted(@ModelAttribute SQP05042Filter filter){
        try {
            System.out.println("*******************Accounting Transaction: loadDetailAccounted*********************");
            return new ResponseEntity<>(logic.getSQP05042Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadDetailTickets")
    public ResponseEntity<?> loadDetailTickets(@ModelAttribute SQP05043Filter filter){
        try {
            System.out.println("*******************Accounting Transaction: loadDetailTickets*********************");
            return new ResponseEntity<>(logic.getSQP05043Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
