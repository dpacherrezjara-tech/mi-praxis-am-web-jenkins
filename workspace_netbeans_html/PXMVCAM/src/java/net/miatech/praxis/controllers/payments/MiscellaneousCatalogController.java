package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.MiscellaneousCatalogLogic;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.SQP05273Filter;
import net.miatech.praxis.payment.filter.SQP05274Filter;
import net.miatech.praxis.payment.filter.SQP05275Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/MiscellaneousCatalog")
public class MiscellaneousCatalogController {

    @Autowired
    private MiscellaneousCatalogLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    private static String controllerName = "Miscellaneous Catalog";

    @RequestMapping(value = "loadCatalog")
    public ResponseEntity<?> loadCatalog(@ModelAttribute SQP05273Filter params) {
        System.out.println("---------------MiscellaneousCatalog:loadCatalog-------------");
        try {
            SQP05273Filter filter = logic.loadSQP05273Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadCatalogDet")
    public ResponseEntity<?> loadCatalogDet(@ModelAttribute SQP05275Filter params) {
        System.out.println("---------------MiscellaneousCatalog:loadCatalogDet-------------");
        try {
            SQP05275Filter filter = logic.loadSQP05275Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "maintenanceCatalog", method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceCatalog(@RequestBody SQP05274Filter params) {
        System.out.println("---------------MiscellaneousCatalog:maintenanceCatalog-------------");
        try {
            SQP05274Filter filter = logic.loadSQP05274Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadCatalog")
    public ResponseEntity<?> downloadCatalog(@ModelAttribute SQP05273Filter params) {
        System.out.println("---------------MiscellaneousCatalog:downloadCatalog-------------");
        try {
            SQP05273Filter filter = logic.loadSQP05273Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            
            List<List<CustomExcelCell>> data = new ArrayList<>();
            List<CustomExcelCell> header = new ArrayList<>();
            header.add(new CustomExcelCell("A4451KEY1"));
            header.add(new CustomExcelCell("A4451KEY2"));
            header.add(new CustomExcelCell("A4451KEY3"));
            header.add(new CustomExcelCell("A4451DESC1"));
            header.add(new CustomExcelCell("A4451DESC2"));
            header.add(new CustomExcelCell("A4451CANT1"));
            header.add(new CustomExcelCell("A4451CANT2"));
            header.add(new CustomExcelCell("A4451FECH1"));
            header.add(new CustomExcelCell("A4451FECH2"));
            header.add(new CustomExcelCell("A4451COMEN"));
            header.add(new CustomExcelCell("Status"));
            data.add(header);
            for(A4451MP obj : filter.getResponse()){
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getA4451key1()));
                row.add(new CustomExcelCell(obj.getA4451key2()));
                row.add(new CustomExcelCell(obj.getA4451key3()));
                row.add(new CustomExcelCell(obj.getA4451desc1()));
                row.add(new CustomExcelCell(obj.getA4451desc2()));
                row.add(new CustomExcelCell(obj.getA4451cant1()));
                row.add(new CustomExcelCell(obj.getA4451cant2()));
                row.add(new CustomExcelCell(obj.getA4451fech1()));
                row.add(new CustomExcelCell(obj.getA4451fech2()));
                row.add(new CustomExcelCell(obj.getA4451comen()));
                row.add(new CustomExcelCell(obj.getA4451sts().equals("1")
                        ?"Enabled":"Disabled"));
                data.add(row);
            }
            return exportUtils.createCustomExcel(data, controllerName + "-" + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
}
