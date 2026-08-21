package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.BankEmissorCatalogLogic;
import net.miatech.praxis.payment.entities.A4559;
import net.miatech.praxis.payment.filter.SQP05262Filter;
import net.miatech.praxis.payment.filter.SQP05263Filter;
import net.miatech.praxis.payment.filter.SQP05265Filter;
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
@RequestMapping("/BankEmissorCatalog")
@Scope("request")
public class BankEmissorCatalogController {

    @Autowired
    private BankEmissorCatalogLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    private final String controllerName = "BankEmissorCatalog";
    
    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap map) {
        System.out.println("---------------BankEmissorCatalog:loadFilters-------------");
        try {
            map.put("paises", logic.getPaises());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "loadBanks")
    public ResponseEntity<?> loadBanks(@ModelAttribute SQP05262Filter params) {
        System.out.println("---------------BankEmissorCatalog:loadBanks-------------");
        try {
            SQP05262Filter result = logic.loadSQP05262Filter(params);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = "loadBankInfo")
    public ResponseEntity<?> loadBankInfo(@ModelAttribute SQP05265Filter params) {
        System.out.println("---------------BankEmissorCatalog:loadBankInfo-------------");
        try {
            SQP05265Filter result = logic.loadSQP05265Filter(params);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "maintenanceBank", method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceBank(@RequestBody SQP05263Filter params) {
        System.out.println("---------------BankEmissorCatalog:maintenanceBank-------------");
        try {
            logic.loadSQP05263Filter(params);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = "downloadBanks")
    public ResponseEntity<?> downloadBanks(@ModelAttribute SQP05262Filter params) {
        try {
            System.out.println("---------------BankEmissorCatalog:downloadBanks-------------");
            SQP05262Filter filter = logic.loadSQP05262Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[10];
            headers[0] = "Bank Code";
            headers[1] = "Bank Name";
            headers[2] = "Country";
            headers[3] = "Region";
            headers[4] = "User Create";
            headers[5] = "Date Create";
            headers[6] = "Hour Create";
            headers[7] = "User Update";
            headers[8] = "Date Update";
            headers[9] = "Hour Update";
            data.add(headers);
            for (A4559 obj : filter.getResponse()) {
                Object[] row = new Object[10];
                row[0] = obj.getA4559CODE();
                row[1] = obj.getA4559DESC();
                row[2] = obj.getA4559PAIS();
                row[3] = obj.getA4559REGI();
                row[4] = obj.getA4559USCR();
                row[5] = obj.getA4559FECR();
                row[6] = obj.getA4559HOCR();
                row[7] = obj.getA4559USUP();
                row[8] = obj.getA4559FEUP();
                row[9] = obj.getA4559HOUP();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
