package net.miatech.praxis.controllers.invoice;

import net.miatech.praxis.invoice.filters.SQP05361Filter;
import net.miatech.praxis.invoice.filters.SQP05362Filter;
import net.miatech.praxis.logic.invoice.ArithmeticValidationLogic;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/ArithmeticValidation")
public class ArithmeticValidationController {
    
    @Autowired
    private ArithmeticValidationLogic logic;
    
    @RequestMapping(value = "loadErrors")
    public ResponseEntity<?> loadErrors(@ModelAttribute SQP05361Filter params) throws Exception{
        SQP05361Filter filter = logic.loadSQP05361Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadInformation")
    public ResponseEntity<?> loadInformation(@ModelAttribute SQP05362Filter params) throws Exception{
        SQP05362Filter filter = logic.loadSQP05362Filter(params);
        return ResponseUtils.ok(filter);
    }
}
