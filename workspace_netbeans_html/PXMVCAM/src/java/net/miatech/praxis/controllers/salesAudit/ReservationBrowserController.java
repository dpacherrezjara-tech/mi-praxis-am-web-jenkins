package net.miatech.praxis.controllers.salesAudit;

import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.logic.salesAudit.ReservationBrowserLogic;
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
@RequestMapping("/ReservationBrowser")
public class ReservationBrowserController {
    
    @Autowired
    private ReservationBrowserLogic logic;
    
    @RequestMapping(value = "loadBrowser")
    public ResponseEntity<?> loadBrowser(SQP05377Filter params) throws Exception{
        SQP05377Filter filter = logic.loadSQP05377Filter(params);
        return ResponseUtils.ok(filter);
    }
}
