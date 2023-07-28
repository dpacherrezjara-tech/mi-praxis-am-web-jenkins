package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.Collections;
import java.util.Map;
import net.miatech.praxis.logic.payments.ErrorControlLogic;
import net.miatech.praxis.payment.errordtos.VN0002PG;
import net.miatech.praxis.payment.errordtos.VN0002PG_UP;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05020Filter;
import net.miatech.praxis.payment.filter.SQP05021Filter;
import net.miatech.praxis.payment.filter.SQP05025Filter;
import net.miatech.praxis.payment.filter.SQP05026Filter;
import org.codehaus.jackson.map.ObjectMapper;
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
@Scope("request")
@RequestMapping("/ErrorControl")
public class ErrorControlController {
    
    @Autowired
    private ErrorControlLogic logic;
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model){
        try {
            System.out.println("*******************ErrorControl: loadFilters*********************");
            model.put("lstError", logic.getSQP05019Filter());
            SQP05004Filter procesadores = new SQP05004Filter();
            procesadores.setKEY1("PR");
            model.put("lstProcs", logic.getSQP05004Filter(procesadores).getLst());
            return new ResponseEntity<>(model,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorSummary")
    public ResponseEntity<?> loadErrorSummary(@ModelAttribute SQP05020Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorSummary*********************");
            return new ResponseEntity<>(logic.getSQP05020Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorDetail")
    public ResponseEntity<?> loadErrorDetail(@ModelAttribute SQP05021Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorDetail*********************");
            return new ResponseEntity<>(logic.getSQP05021Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorArchSummary")
    public ResponseEntity<?> loadErrorArchSummary(@ModelAttribute SQP05025Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorArchSummary*********************");
            return new ResponseEntity<>(logic.getSQP05025Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadErrorArchDetail")
    public ResponseEntity<?> loadErrorArchDetail(@ModelAttribute SQP05026Filter filter){
        try {
            System.out.println("*******************ErrorControl: loadErrorArchDetail*********************");
            return new ResponseEntity<>(logic.getSQP05026Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    
    /**
    * Procedimientos para Data Entrys
    */
    @RequestMapping(value = "loadVN0002Info")
    public ResponseEntity<?> loadVN0002Info(@ModelAttribute VN0002PG filter){
        try {
            System.out.println("*******************ErrorControl: loadVN0002Info*********************");
            return new ResponseEntity<>(logic.getVN0002PGInfo(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "updateVN0002PG",method = RequestMethod.PATCH)
    public ResponseEntity<?> updateVN0002PG(@RequestBody Map<String,Object> filter){
        try {
            VN0002PG_UP obj = new ObjectMapper().convertValue(filter,VN0002PG_UP.class);
            System.out.println("*******************ErrorControl: updateVN0002PG*********************");
            Integer result = logic.updateVN0002PG(obj);
            //return new ResponseEntity<>(logic.updateVN0002PG(obj),HttpStatus.OK);
            return new ResponseEntity<>(Collections.singletonMap("status", result),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    
}
