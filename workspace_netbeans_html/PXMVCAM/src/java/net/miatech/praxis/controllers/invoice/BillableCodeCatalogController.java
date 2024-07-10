package net.miatech.praxis.controllers.invoice;

import net.miatech.praxis.invoice.filters.SQP05356Filter;
import net.miatech.praxis.invoice.filters.SQP05357Filter;
import net.miatech.praxis.invoice.filters.SQP05360Filter;
import net.miatech.praxis.logic.invoice.BillableCodeCatalogLogic;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/BillableCodeCatalog")
public class BillableCodeCatalogController {
    
    @Autowired
    private BillableCodeCatalogLogic logic;
    
    @RequestMapping(value = "loadBillingCodes")
    public ResponseEntity<?> loadBillingCodes(@ModelAttribute SQP05356Filter params) throws Exception{
        System.out.println("********* BillableCodeCatalog - loadBillingCodes *********");
        SQP05356Filter filter = logic.loadSQP05356Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadBillingCodeInfo")
    public ResponseEntity<?> loadBillingCodeInfo(@ModelAttribute SQP05360Filter params) throws Exception{
        System.out.println("********* BillableCodeCatalog - loadBillingCodeInfo *********");
        SQP05360Filter filter = logic.loadSQP05360Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadCrudBillingCode",method = RequestMethod.POST)
    public ResponseEntity<?> loadCrudBillingCode(@RequestBody SQP05357Filter params) throws Exception{
        System.out.println("********* BillableCodeCatalog - loadCrudBillingCode *********");
        SQP05357Filter filter = logic.loadSQP05357Filter(params);
        return ResponseUtils.ok(filter);
    }
}
