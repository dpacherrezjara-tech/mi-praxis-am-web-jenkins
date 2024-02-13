package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.MerchantNumberTmzLogic;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.praxis.payment.filter.SQP05254Filter;
import net.miatech.praxis.payment.filter.SQP05255Filter;
import net.miatech.praxis.payment.filter.SQP05256Filter;
import net.miatech.praxis.payment.filter.SQP05258Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
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
@RequestMapping("/MerchantNumberTmz")
@Scope("request")
public class MerchantNumberTmzController {

    @Autowired
    private MerchantNumberTmzLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    private final String controllerName = "MerchantNumberTmz";

    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap map) {
        System.out.println("---------------MerchantNumberTmz:loadFilters-------------");
        try {
            map.put("paises", logic.getPaises());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "loadMerchants")
    public ResponseEntity<?> loadMerchants(@ModelAttribute SQP05254Filter params) {
        System.out.println("---------------MerchantNumberTmz:loadMerchants-------------");
        try {
            SQP05254Filter result = logic.loadSQP05254Filter(params);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "loadMerchantInfo")
    public ResponseEntity<?> loadMerchantInfo(@ModelAttribute SQP05255Filter params) {
        System.out.println("---------------MerchantNumberTmz:loadMerchantInfo-------------");
        try {
            SQP05255Filter result = logic.loadSQP05255Filter(params);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "maintenanceMerchant", method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceMerchant(@RequestBody SQP05256Filter params) {
        System.out.println("---------------MerchantNumberTmz:maintenanceMerchant-------------");
        try {
            logic.loadSQP05256Filter(params);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "loadIataInfo")
    public ResponseEntity<?> loadIataInfo(@ModelAttribute SQP05258Filter params) {
        System.out.println("---------------MerchantNumberTmz:loadIataInfo-------------");
        try {
            SQP05258Filter result = logic.loadSQP05258Filter(params);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "downloadMerchants")
    public ResponseEntity<?> downloadMerchants(@ModelAttribute SQP05254Filter params) {
        try {
            System.out.println("---------------MerchantNumberTmz:downloadMerchants-------------");
            SQP05254Filter filter = logic.loadSQP05254Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[14];
            headers[0] = "Merchant Nbr.";
            headers[1] = "Merchant Name";
            headers[2] = "Status";
            headers[3] = "Operative Unit";
            headers[4] = "Channel";
            headers[5] = "Social Reason";
            headers[6] = "Merchant Payment";
            headers[7] = "Country";
            headers[8] = "IATA Code";
            headers[9] = "IATA Name";
            headers[10] = "Comm. Client Code";
            headers[11] = "Comm. Client Address";
            headers[12] = "Chbk. Client Code";
            headers[13] = "Chbk. Client Address";
            data.add(headers);
            for (A2354Filter obj : filter.getResponse()) {
                Object[] row = new Object[14];
                row[0] = obj.getMERCHN();
                row[1] = obj.getDESCR();
                row[2] = obj.getSTATUS().equals("0") ? "Disabled" : "Enabled";
                row[3] = getOperativeUnit(obj.getUNIOPE());
                row[4] = obj.getCANAL();
                row[5] = obj.getRSOCIAL();
                row[6] = obj.getMERCHP();
                row[7] = obj.getSCOUNTRY();
                row[8] = obj.getCIATA();
                row[9] = obj.getNIATA();
                row[10] = obj.getCODCLIT1();
                row[11] = obj.getDIRCLIT1();
                row[12] = obj.getCODCLIT2();
                row[13] = obj.getDIRCLIT2();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private static String getOperativeUnit(String code) {
        String result = "";
        switch (code) {
            case "1":
                result = "Aerovias MX";
                break;
            case "2":
                result = "Aeromexico Cargo";
                break;
            case "3":
                result = "PLM";
                break;
            default:
                result = "None";
        }
        return result;
    }
}
