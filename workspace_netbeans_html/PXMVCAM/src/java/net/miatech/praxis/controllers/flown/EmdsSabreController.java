package net.miatech.praxis.controllers.flown;

import java.awt.Color;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import net.miatech.praxis.flown.dto.A4622;
import net.miatech.praxis.flown.filter.SQP05424Filter;
import net.miatech.praxis.flown.filter.SQP05425Filter;
import net.miatech.praxis.logic.flown.EmdsSabreLogic;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private ExportUtils exportUtils;
    
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
    
    @RequestMapping(value = "downloadDetail")
    public ResponseEntity<?> downloadDetail(SQP05425Filter params) {
        System.out.println("**** EmdsSabreController - downloadDetail ****");
        try {
            SQP05425Filter filter = logic.loadSQP05425Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            String title = "EMDS Sabre_" + Functions.getFechaActual() + "_" + 
                    UUID.randomUUID().toString().replace("-", "").substring(0, 10);
            List<List<CustomExcelCell>> data = new ArrayList<>();
            List<CustomExcelCell> header = new ArrayList<>();
            header.add(new CustomExcelCell("Processing\nDate"));
            header.add(new CustomExcelCell("Ticket"));
            header.add(new CustomExcelCell("Seq"));
            header.add(new CustomExcelCell("Coupon"));
            header.add(new CustomExcelCell("Source"));
            header.add(new CustomExcelCell("Group"));
            header.add(new CustomExcelCell("Status"));
            header.add(new CustomExcelCell("BATCH"));
            header.add(new CustomExcelCell("Status\nChanged"));
            header.add(new CustomExcelCell("Doc. Code"));
            header.add(new CustomExcelCell("RFIC"));
            header.add(new CustomExcelCell("RFISC"));
            header.add(new CustomExcelCell("Country"));
            header.add(new CustomExcelCell("IATA Code"));
            header.add(new CustomExcelCell("Sale Date"));
            header.add(new CustomExcelCell("Pax Type"));
            header.add(new CustomExcelCell("Carrier\nMkt."));
            header.add(new CustomExcelCell("Carrier\nOpered"));
            header.add(new CustomExcelCell("Coupon\nValue"));
            header.add(new CustomExcelCell("Commission"));
            header.add(new CustomExcelCell("S. Commision"));
            header.add(new CustomExcelCell("YQ"));
            header.add(new CustomExcelCell("Currency"));
            header.add(new CustomExcelCell("Coupon\nValue Rev"));
            header.add(new CustomExcelCell("Commision\nRev"));
            header.add(new CustomExcelCell("S. Commision\nRev"));
            header.add(new CustomExcelCell("YQ Rev"));
            header.add(new CustomExcelCell("Flag"));
            header.add(new CustomExcelCell("Flight Date"));
            header.add(new CustomExcelCell("Flight Number"));
            header.add(new CustomExcelCell("Dep.\nAirport"));
            header.add(new CustomExcelCell("Arr.\nAirport"));
            data.add(header);

            //colores
            Color c1 = new Color(178, 218, 250);
            Color c2 = new Color(252, 246, 220);
            Color c3 = new Color(252, 246, 220);
            for (A4622 obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getFPROC()));
                row.add(new CustomExcelCell(obj.getCCIA() + obj.getFORMA() + obj.getSERIE()));
                row.add(new CustomExcelCell(obj.getSEQ()));
                row.add(new CustomExcelCell(obj.getCUPON()));
                row.add(new CustomExcelCell(obj.getFTE()));
                row.add(new CustomExcelCell(obj.getGRUPO()));
                row.add(new CustomExcelCell(formatSTVAL(obj.getSTVAL())));
                row.add(new CustomExcelCell(obj.getLOTE()));
                row.add(new CustomExcelCell(obj.getSTUSE()));
                row.add(new CustomExcelCell(obj.getCDOC()));
                //row.add(new CustomExcelCell(obj.getTDOC()));
                row.add(new CustomExcelCell(obj.getRFIC()));
                row.add(new CustomExcelCell(obj.getRFIS()));
                row.add(new CustomExcelCell(obj.getPSVVTA()));
                row.add(new CustomExcelCell(obj.getAGTIA()));
                row.add(new CustomExcelCell(obj.getFVTA()));
                row.add(new CustomExcelCell(obj.getTPAX()));
                row.add(new CustomExcelCell(obj.getCARR()));
                row.add(new CustomExcelCell(obj.getCARROP()));
                row.add(new CustomExcelCell(obj.getVCPN()));
                row.add(new CustomExcelCell(obj.getCOMISI()));
                row.add(new CustomExcelCell(obj.getSCOMISI()));
                row.add(new CustomExcelCell(obj.getYQ()));
                row.add(new CustomExcelCell(obj.getMDACP()));
                row.add(new CustomExcelCell(obj.getVCPNRV()));
                row.add(new CustomExcelCell(obj.getCOMREV()));
                row.add(new CustomExcelCell(obj.getSCOMREV()));
                row.add(new CustomExcelCell(obj.getYQREV()));
                row.add(new CustomExcelCell(obj.getTUSO()));
                row.add(new CustomExcelCell(obj.getDFLIGHT()));
                row.add(new CustomExcelCell(obj.getNFLIGHT()));
                row.add(new CustomExcelCell(obj.getCDEPART()));
                row.add(new CustomExcelCell(obj.getCARRIVA()));
                data.add(row);
            }

            return exportUtils.createCustomExcel(data,title);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    private static String formatSTVAL(String stval){
        String response = "";
        switch (stval) {
            case "1":
                response = "Used";
                break;
            case "2":
                response = "No Used";
                break;
            case "4":
                response = "Status Changed";
                break;
        }
        return response;
    }
}
