package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ReconciliationDoublePaymentLogic;
import net.miatech.praxis.logic.payments.SalesReconciliAmexLogic;
import net.miatech.praxis.payment.old.A4116Filter;
import net.miatech.praxis.payment.old.A4331OFilter;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.SQP04955Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05043Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/ReconciliationDoublePayment")
public class ReconciliationDoublePaymentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ReconciliationDoublePaymentLogic logic;
    private MasterDAO masterDAO;
    private static String controllerName = "Reconciliation Double Payment";
    
    @Autowired
    private ExportUtils exportUtils;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ReconciliationDoublePayment/form_index";
    }

    @RequestMapping(value = "searchAdjustment")
    public @ResponseBody
    String searchAdjustment(@ModelAttribute SQP04955Filter filter) {
        ModelMap map = new ModelMap();
        try {
            System.out.println("-------------- Reconc. Double Payment : searchAdjustment-------------");
            logic = new ReconciliationDoublePaymentLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = logic.getSQP04955Filter(filter);
            map.put("data", filter.getResponse());
            map.put("total", filter.getResponse().size() > 0 ? filter.getIO_TOTROW() : 0);
            map.put("success", true);
        } catch (Exception e) {
            map.put("success", false);
            System.out.println("Error: " + e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchAdjustmentXLSX")
    public ResponseEntity<?> searchAdjustmentXLSX(@ModelAttribute SQP04955Filter filter) {
        try {
            System.out.println("-------------- Reconc. Double Payment : searchAdjustmentXLSX-------------");
            logic = new ReconciliationDoublePaymentLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter.setExcel(Boolean.TRUE);
            filter = logic.getSQP04955Filter(filter);
            List<Object[]> data = new ArrayList<>();
            Object[] header = new Object[21];
            header[0] = "Payment Date";
            header[1] = "Payment Merchant ID";
            header[2] = "Settl. VS Sales";
            header[3] = "Refund";
            header[4] = "Doc. Type";
            header[5] = "Sales Merchant ID";
            header[6] = "Description";
            header[7] = "Invoice Ref. Number PNR";
            header[8] = "PNR";
            header[9] = "Indust. Speci. Ref. Number TKT";
            header[10] = "Card Account Number";
            header[11] = "Approval Code";
            header[12] = "Sales Date";
            header[13] = "Transaction Amount";
            header[14] = "Payments Tickets";
            header[15] = "Error Code";
            header[16] = "Error Description";
            header[17] = "Refund Bank Date";
            header[18] = "Refund Bank Operation";
            header[19] = "Refund Bank Agent";
            header[20] = "Refund Bank Auth";
            data.add(header);
            for(A4331Filter obj : filter.getResponse()){
                Object[] row = new Object[21];
                row[0] = obj.getPaydate();
                row[1] = obj.getPmerchid();
                row[2] = Arrays.asList("1","5","6","7").contains(obj.getStval())?"Match":"Pending";
                row[3] = obj.getStrfnd();
                row[4] = obj.getTranstype();
                row[5] = obj.getSmerchid();
                row[6] = obj.getDES_SMERCHANT();
                row[7] = obj.getInvoirn();
                row[8] = obj.getSpnr();
                row[9] = obj.getTicket();
                row[10] = obj.getScardn();
                row[11] = obj.getSauthoc();
                row[12] = obj.getSdate();
                row[13] = obj.getTgrosamoun();
                row[14] = obj.getQtytkt();
                row[15] = obj.getCerror();
                row[16] = obj.getDES_CERROR();
                row[17] = obj.getRfdate();
                row[18] = obj.getRfoperb();
                row[19] = obj.getRfaudit();
                row[20] = obj.getRfautor();
                data.add(row);
            }
            String fileName = controllerName + " - " + 
                    (filter.getIN_TGRID().equals("V")?"Void":"Double Payment") + 
                    " " + Functions.getFechaActual();
            
            return exportUtils.createExcel(data,fileName);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "searchTicketsSettlement")
    public @ResponseBody
    String searchTicketsSettlement(@ModelAttribute SQP05043Filter filter) {
        ModelMap map = new ModelMap();
        try {
            System.out.println("-------------- SalesReconciliAmex : searchAdjustment-------------");
            logic = new ReconciliationDoublePaymentLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = logic.getSQP05043Filter(filter);
            map.put("data", filter.getResponse());
            map.put("total", filter.getResponse().size());
            map.put("success", true);
        } catch (Exception e) {
            map.put("success", false);
            System.out.println("Error: " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getAdjustmentCodes")
    public @ResponseBody
    String getCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : getAdjustmentCodes-------------");

        map.put("success", true);
        List<A4331OFilter> lst = this.getListGetAdjustmentCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4331OFilter> getListGetAdjustmentCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4331OFilter> lst = new ArrayList<>(0);
        A4331OFilter filter = new A4331OFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationDoublePaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4331OFilter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX606SQP04470(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "searchDetTktSettlement")
    public @ResponseBody
    String searchDetTktSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetTktSettlement-------------");

        map.put("success", true);
        List<A4331OFilter> lst = this.getListDetTktSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4331OFilter> getListDetTktSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4331OFilter> lst = new ArrayList<>(0);
        A4331OFilter filter = new A4331OFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationDoublePaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4331OFilter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            /*if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }*/
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lst = logic.loadPX606SQP04698(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTransactionErrorDetail")
    public @ResponseBody
    String searchTransactionErrorDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : searchTransactionErrorDetail-------------");

        Gson gson = new Gson();
        A4331OFilter filter = new A4331OFilter();
        A4331OFilter result = new A4331OFilter();
        List<A4331OFilter> lstInfo = new ArrayList<A4331OFilter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4331OFilter.class);

        logic = new ReconciliationDoublePaymentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX606SQP04720(filter);
//            lstInfo = logic.loadPX606SQP04722(result);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceDoublePayment")
    public @ResponseBody
    String MaintenanceErrorTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Adjustment - Double Payment : MaintenanceDoublePayment-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new ReconciliationDoublePaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX622SQP04954(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchPNR")
    public @ResponseBody
    String searchPNR(ModelMap map, HttpServletRequest request) {

        SQP00697Filter filter = new SQP00697Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            SalesReconciliAmexLogic logic = new SalesReconciliAmexLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<SQP00697Filter> listaData = logic.loadSQP00697(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
}
