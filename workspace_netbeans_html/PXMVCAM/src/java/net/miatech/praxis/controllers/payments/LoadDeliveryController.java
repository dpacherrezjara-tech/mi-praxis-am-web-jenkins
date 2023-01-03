/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.payments.LoadDeliveryLogic;
import net.miatech.praxis.payment.filter.SQP04717Filter;
import net.miatech.praxis.payment.filter.SQP04718Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Dvicente
 */
@Controller
@RequestMapping("/LoadDelivery")
@Scope("request")
public class LoadDeliveryController extends BaseController{
    
    //<editor-fold defaultstate="collapsed" desc="dependencias">
     @Autowired
    private LoadDeliveryLogic logic;
//</editor-fold>
   
    
    @RequestMapping(value = "/getHeaders",method = RequestMethod.POST)
    public ResponseEntity<?> getHeader(@RequestBody Map<String,Object> body){
        SQP04717Filter filter = new SQP04717Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        filter.setIN_CCUST(body.get("IN_CCUST").toString());
        filter.setIN_PROCESADOR(body.get("IN_PROCESADOR").toString());
        filter.setIN_OPCION(body.get("IN_OPCION").toString());
        filter.setIN_FROMDATE(body.get("IN_FROMDATE").toString());
        filter.setIN_TODATE(body.get("IN_TODATE").toString());
        int start = (int) (body.get("start") == null ? 0 : body.get("start"));
        filter.page.PAGROW = 20;
        start = (start != 0 ? start : 0);
        filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            

        List<SQP04717Filter> res =  new ArrayList<>();
        try{
            logic.setSession((IServerSession) serverSession.getServerSession());
            res = logic.getSQP04717Filter(filter);
        }catch(Exception ex){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(res,HttpStatus.OK);
    }
    
    @RequestMapping(value="/getDelivery",method = RequestMethod.POST)
    public ResponseEntity<?> getDelivery(@RequestBody Map<String,Object> body){
        SQP04718Filter filter = new SQP04718Filter();
        filter.setIN_TABLE(body.get("IN_TABLE").toString());
        filter.setIN_IDFILE(body.get("IN_IDFILE").toString());
        List<SQP04718Filter> res =  new ArrayList<>();
        final StringBuilder maxLong = new StringBuilder();
        try{
            logic.setSession((IServerSession) serverSession.getServerSession());
            res = logic.getSQP04718Filter(filter);
            if (res.isEmpty() || res==null) {
                throw new Exception("No existe Delivery");
            }
            res.forEach(new Consumer<SQP04718Filter>(){
                @Override
                public void accept(SQP04718Filter t) {
                    maxLong.append(t.getLONG()).append("\n");
                }
            });
        }catch(Exception ex){
            return new ResponseEntity(Collections.singletonMap("msg", ex.getMessage()),HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(Collections.singletonMap("long", maxLong.toString()),HttpStatus.OK); 
    }
    
    
}
