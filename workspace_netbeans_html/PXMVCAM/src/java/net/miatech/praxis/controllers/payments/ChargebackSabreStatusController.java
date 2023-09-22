package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.logic.payments.ChargebackSabreStatusLogic;
import net.miatech.praxis.payment.filter.SQP05047Filter;
import net.miatech.praxis.payment.filter.SQP05046Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/ChargebackSabreStatus")
public class ChargebackSabreStatusController {
    
    @Autowired
    private ChargebackSabreStatusLogic logic;
    private static final String controllerName = "Chargeback Sabre Status";
    
    @RequestMapping(value = "loadChargebackSabreStatus")
    public ResponseEntity<?> loadChargebackSabreStatus(@ModelAttribute SQP05046Filter filter){
        try {
            System.out.println("*******************Chargeback Sabre Status: loadChargebackSabreStatus*********************");
            return new ResponseEntity<>(logic.getSQP05046Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadPNRInformation")
    public ResponseEntity<?> loadPNRInformation(@ModelAttribute SQP05047Filter filter){
        try {
            System.out.println("*******************Chargeback Sabre Status: loadPNRInformation*********************");
            return new ResponseEntity<>(logic.getSQP00697Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
