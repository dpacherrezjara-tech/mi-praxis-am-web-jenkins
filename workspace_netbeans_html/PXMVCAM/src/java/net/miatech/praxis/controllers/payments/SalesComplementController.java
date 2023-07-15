package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.List;
import java.util.Map;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.logic.payments.SalesComplementLogic;
import net.miatech.praxis.payment.A3152MP;
import net.miatech.praxis.payment.filter.SQP04979Filter;
import net.miatech.praxis.payment.filter.SQP04980Filter;
import net.miatech.praxis.payment.filter.SQP04981Filter;
import net.miatech.praxis.payment.filter.SQP04982Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/SalesComplement")
public class SalesComplementController {
    
    @Autowired
    private SalesComplementLogic logic;
    
    //<editor-fold defaultstate="collapsed" desc="convierte obj">
    private <T> T parseObject(Map<String, Object> params, Class<T> clazz) 
            throws InstantiationException, IllegalAccessException 
    {
        //T instance = clazz.newInstance();
        Gson gson =  new Gson();
        String json = gson.toJson(params);
        //System.out.println(json);
        T filter = (T) gson.fromJson(json, clazz);
        return filter;
    }
    //</editor-fold>
    
    @RequestMapping(value = "getPlusgradeInfo")
    public ResponseEntity<?> getPlusgradeInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Plusgrade Info---------------");
            SQP04979Filter filter = this.parseObject(params,SQP04979Filter.class);
            filter = logic.getSQP04979Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "getLigasInfo")
    public ResponseEntity<?> getLigasInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Ligas Info---------------");
            SQP04980Filter filter = this.parseObject(params,SQP04980Filter.class);
            filter = logic.getSQP04980Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "getTabletsInfo")
    public ResponseEntity<?> getTabletsInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Tablets Info---------------");
            SQP04981Filter filter = this.parseObject(params,SQP04981Filter.class);
            filter = logic.getSQP04981Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "getTicketsPg")
    public ResponseEntity<?> getTicketsPg(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Plusgrade By Ticket---------------");
            SQP04982Filter filter = this.parseObject(params,SQP04982Filter.class);
            filter = logic.getSQP04982Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "searchPNR")
    public ResponseEntity<?> searchPNR(@RequestParam Map<String,Object> params, ModelMap model){
        try {
            System.out.println("-------------Sales Complement: Search PNR---------------");
            SQP00697Filter filter = new SQP00697Filter();
            //filter = this.parseObject(params, SQP00697Filter.class);
            filter.IN_TEXT = params.get("IN_TEXT").toString();
            filter.IN_TFILTER = Integer.parseInt(params.get("IN_TFILTER").toString());
            List<SQP00697Filter> listaData = logic.loadSQP00697(filter);
            model.put("data", listaData);
            model.put("total",listaData.size());
            return new ResponseEntity<>(model,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadMasterInfo")
    public ResponseEntity<?> loadMasterTableInfo(@ModelAttribute SQP05004Filter filter){
        try {
            System.out.println("-------------Sales Complement: Master Table---------------");
            System.out.println("Loading "+filter.getKEY1()+"-"+filter.getKEY2()+"...");
            filter = logic.getSQP05004Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadPaises")
    public ResponseEntity<?> loadPaises(){
        try {
            System.out.println("-------------Sales Complement: Load Paises---------------");
            List<A3152MP> result = logic.getPaises();
            return new ResponseEntity<>(result,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
}
