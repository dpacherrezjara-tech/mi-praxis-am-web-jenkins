package net.miatech.praxis.controllers.flown;

import net.miatech.praxis.flown.filter.SQP05424Filter;
import net.miatech.praxis.flown.filter.SQP05425Filter;
import net.miatech.praxis.logic.flown.EmdsSabreLogic;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/EmdsSabre")
public class EmdsSabreController {
    
    @Autowired
    private EmdsSabreLogic logic;
    
    @RequestMapping(value = "loadSummary")
    public ResponseEntity<?> loadSummary(SQP05424Filter params) throws Exception{
        System.out.println("**** EmdsSabreController - loadSummary ****");
        SQP05424Filter filter = logic.loadSQP05424Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadDetail")
    public ResponseEntity<?> loadDetail(SQP05425Filter params) throws Exception{
        System.out.println("**** EmdsSabreController - loadDetail ****");
        SQP05425Filter filter = logic.loadSQP05425Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
}
