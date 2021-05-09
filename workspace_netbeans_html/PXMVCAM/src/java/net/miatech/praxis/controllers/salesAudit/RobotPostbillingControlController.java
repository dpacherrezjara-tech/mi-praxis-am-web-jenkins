/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A3536Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.salesAudit.RobotPostbillingControlLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RobotPostbillingControl")
public class RobotPostbillingControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    @RequestMapping(value = "SearchPostbillingControl")
    public @ResponseBody
    String SearchPostbillingControl(ModelMap map, HttpServletRequest request) {
        A3536Filter filter = new A3536Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            /*filter.page.TOTROW = -1;
             filter.page.START = 0;
             filter.page.LIMIT = 0;
            
             int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
             int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
             filter.page.PAGROW = 20;
             start = (start != 0 ? start : 0);
             filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;*/

            RobotPostbillingControlLogic logic = new RobotPostbillingControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3536Filter> lst_search = logic.SearchPostbillingControl(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
           // map.put("totalPAG", lst_search.size() > 0 ? (lst_search.get(0).A3388TOTALPAG == null ? "" : lst_search.get(0).A3388TOTALPAG) : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }
}
