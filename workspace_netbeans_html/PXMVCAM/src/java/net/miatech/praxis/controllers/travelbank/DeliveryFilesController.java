package net.miatech.praxis.controllers.travelbank;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.travelbank.DeliveryFilesLogic;
import net.miatech.praxis.travelbank.SQP04836Filter;
import net.miatech.praxis.travelbank.SQP04837Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/DeliveryFiles")
public class DeliveryFilesController extends BaseController{
    
    //<editor-fold defaultstate="collapsed" desc="variables">
    @Autowired
    private DeliveryFilesLogic logic;
    //</editor-fold>
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(ModelMap map, @RequestParam Map<String,String> params){
        SQP04836Filter filter = new SQP04836Filter();
        List<SQP04836Filter> response = new ArrayList<>();
        try{
            filter.setCCUST(params.get("CCUST"));
            filter.setFECHAI(params.get("FECHAI"));
            filter.setFECHAF(params.get("FECHAF"));
            filter.setTIPO(params.get("TIPO"));
            filter.setIDFIL(params.get("IDFIL"));
            filter.getPagination().TOTROW = -1;
            filter.getPagination().START = 0;
            filter.getPagination().LIMIT = 0;
            
            int limit = params.get("limit") == null ? -1 : Integer.parseInt(params.get("limit"));
            int start = params.get("start") == null ? 0 : Integer.parseInt(params.get("start"));
            
            filter.getPagination().PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.getPagination().PAGNUM = (start / filter.getPagination().PAGROW) + 1;
            
            logic.setSession((IServerSession) serverSession.getServerSession());
            response = logic.getSQP04836Filter(filter);
            map.put("success", true);
            map.put("total", !response.isEmpty() ? response.get(0).getPagination().TOTROW : 0);
            map.put("data", response);
            
        }catch(Exception ex){
            map.put("session", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getDeliveryRaw")
    public ResponseEntity<?> getDeliveryRaw(@RequestParam Map<String,String> params){
        SQP04837Filter filter = new SQP04837Filter();
        List<SQP04837Filter> response = new ArrayList<>();
        try{
            filter.setCCUST(params.get("CCUST"));
            filter.setTIPO(params.get("TIPO"));
            filter.setIDFIL(params.get("IDFIL"));
            logic.setSession((IServerSession) serverSession.getServerSession());
            response = logic.getSQP04837Filter(filter);
            return new ResponseEntity<>(response,HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
