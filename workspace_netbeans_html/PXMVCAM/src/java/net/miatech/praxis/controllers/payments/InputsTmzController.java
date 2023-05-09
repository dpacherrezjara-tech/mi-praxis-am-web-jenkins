package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.InputsTmzLogic;
import net.miatech.praxis.payment.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
import net.miatech.praxis.payment.filter.SQP04974Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/InputsTmz")
public class InputsTmzController {

    @Autowired
    private InputsTmzLogic logic;
    
    //<editor-fold defaultstate="collapsed" desc="convierte obj">
    private <T> T parseObject(Map<String, Object> params, Class<T> clazz) 
            throws InstantiationException, IllegalAccessException 
    {
        //T instance = clazz.newInstance();
        Gson gson =  new Gson();
        T filter = (T) gson.fromJson(gson.toJson(params), clazz);
        return filter;
    }
    //</editor-fold>
    
    @RequestMapping(value = "getInfoCombos")
    public ResponseEntity<?> getInfoCombo(@RequestParam Map<String, Object> params) {
        try {
            SQP04971Filter filter = this.parseObject(params, SQP04971Filter.class);
            SQP04971Filter res = logic.getSQP04971Filter(filter);
            return new ResponseEntity<>(res,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getInfoCombos: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @RequestMapping(value = "getCalendarInfo")
    public ResponseEntity<?> getCalendarInfo (@RequestParam Map<String, Object> params){
        try {
            SQP04972Filter filter = this.parseObject(params, SQP04972Filter.class);
            List<CalendarTmz> res = logic.getSQP04972Filter(filter);
            return new ResponseEntity<>(res,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getInfoCombos: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @RequestMapping(value = "getDetailSummaryInfo")
    public ResponseEntity<?> getDetailSummaryInfo (@RequestParam Map<String, Object> params){
        try {
            SQP04974Filter filter = this.parseObject(params, SQP04974Filter.class);
            List<SQP04974Filter> res = logic.getSQP04974Filter(filter);
            return new ResponseEntity<>(res,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getInfoCombos: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
