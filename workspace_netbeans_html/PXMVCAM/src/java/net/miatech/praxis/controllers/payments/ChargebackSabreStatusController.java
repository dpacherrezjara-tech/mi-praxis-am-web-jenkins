package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.ChargebackSabreStatusLogic;
import net.miatech.praxis.payment.filter.A4482Filter;
import net.miatech.praxis.payment.filter.SQP05047Filter;
import net.miatech.praxis.payment.filter.SQP05046Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/ChargebackSabreStatus")
public class ChargebackSabreStatusController {
    
    @Autowired
    private ChargebackSabreStatusLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    private static final String controllerName = "ChargebackSabreStatus";
    
    @RequestMapping(value = "loadChargebackSabreStatus")
    public ResponseEntity<?> loadChargebackSabreStatus(@ModelAttribute SQP05046Filter filter){
        try {
            System.out.println("*******************Chargeback Sabre Status: loadChargebackSabreStatus*********************");
            return new ResponseEntity<>(logic.getSQP05046Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadPNRInformation")
    public ResponseEntity<?> loadPNRInformation(@ModelAttribute SQP05047Filter filter){
        try {
            System.out.println("*******************Chargeback Sabre Status: loadPNRInformation*********************");
            return new ResponseEntity<>(logic.getSQP00697Filter(filter),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadChargebackSabreStatus")
    public ResponseEntity<?> downloadChargebackSabreStatus(@ModelAttribute SQP05046Filter params){
        System.out.println("---------------SalesReconciliationDoublePay:downloadChargebackSabreStatus-------------");
        try {
            params.setExcel(true);
            SQP05046Filter filter = logic.getSQP05046Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[45];
            headers[0] = "Date";
            headers[1] = "Sales Date";
            headers[2] = "IATA";
            headers[3] = "PNR";
            headers[4] = "Merchant";
            headers[5] = "Status";
            headers[6] = "Chargeback\nNumber";
            headers[7] = "CC Code";
            headers[8] = "CC Number";
            headers[9] = "CC Auth";
            headers[10] = "CC Curr.";
            headers[11] = "Chargeback Amount";
            headers[12] = "Ticket Amount";
            headers[13] = "Ticket";
            headers[14] = "Indicator\nCpn Sales";
            headers[15] = "Used PRAXIS\nFirst C1";
            headers[16] = "Used PRAXIS\nFirst C2";
            headers[17] = "Used PRAXIS\nFirst C3";
            headers[18] = "Used PRAXIS\nFirst C4";
            headers[19] = "Used PRAXIS\nLast C1";
            headers[20] = "Used PRAXIS\nLast C2";
            headers[21] = "Used PRAXIS\nLast C3";
            headers[22] = "Used PRAXIS\nLast C4";
            headers[23] = "Used SABRE\nFirst C1";
            headers[24] = "Used SABRE\nFirst C2";
            headers[25] = "Used SABRE\nFirst C3";
            headers[26] = "Used SABRE\nFirst C4";
            headers[27] = "Used SABRE\nFirst Date";
            headers[28] = "Date Application";
            headers[29] = "Used SABRE\nLast C1";
            headers[30] = "Used SABRE\nLast C2";
            headers[31] = "Used SABRE\nLast C3";
            headers[32] = "Used SABRE\nLast C4";
            headers[33] = "Used SABRE\nLast Date";
            headers[34] = "Used SABRE 20d\n C1";
            headers[35] = "Used SABRE 20d\n C2";
            headers[36] = "Used SABRE 20d\n C3";
            headers[37] = "Used SABRE 20d\n C4";
            headers[38] = "Used SABRE 20d\nPRAXIS ST";
            headers[39] = "Used SABRE 20d\nSABRE ST";
            headers[40] = "Used SABRE 20d\nSABRE ST 20 days";
            headers[41] = "Flag Exchange";
            headers[42] = "Accounting ID";
            headers[43] = "Accounting Date";
            headers[44] = "Rule Policy";
            data.add(headers);
            for (A4482Filter obj : filter.getResponse()) {
                Object[] row = new Object[45];
                row[0] = obj.getSFECHA();
                row[1] = obj.getSALEDATE();
                row[2] = obj.getAGENTE();
                row[3] = obj.getPNR();
                row[4] = obj.getMERCHN();
                row[5] = convertStatus(obj.getSTVAL());
                row[6] = obj.getFOLIO();
                row[7] = obj.getSCARCOD();
                row[8] = obj.getCARDNBR();
                row[9] = obj.getAUTHNBR();
                row[10] = obj.getMFOP();
                row[11] = obj.getAUTAMOUNT();
                row[12] = obj.getVFOP();
                row[13] = obj.getTICKET();
                row[14] = obj.getINDCPN();
                row[15] = obj.getUSOPXCP1();
                row[16] = obj.getUSOPXCP2();
                row[17] = obj.getUSOPXCP3();
                row[18] = obj.getUSOPXCP4();
                row[19] = obj.getUSOPXCP1();
                row[20] = obj.getUSOPXCP2();
                row[21] = obj.getUSOPXCP3();
                row[22] = obj.getUSOPXCP4();
                row[23] = obj.getUSOSBCP1();
                row[24] = obj.getUSOSBCP2();
                row[25] = obj.getUSOSBCP3();
                row[26] = obj.getUSOSBCP4();
                row[27] = obj.getDATSABF();
                row[28] = obj.getDATAPLICA();
                row[29] = obj.getUSOSBULCP1();
                row[30] = obj.getUSOSBULCP2();
                row[31] = obj.getUSOSBULCP3();
                row[32] = obj.getUSOSBULCP4();
                row[33] = obj.getDATSABL();
                row[34] = obj.getSTUSUCP1();
                row[35] = obj.getSTUSUCP2();
                row[36] = obj.getSTUSUCP3();
                row[37] = obj.getSTUSUCP4();
                row[38] = obj.getSTATUSPX();
                row[39] = obj.getSTATSBRE();
                row[40] = obj.getSTATSBR1();
                switch (obj.getFSELECX()) {
                    case "0":
                        row[41] = "No Exchange";
                        break;
                    case "2":
                        row[41] = "Exchange";
                        break;
                    default:
                        row[41] = "Pending";
                        break;
                }
                row[42] = obj.getIDCON();
                row[43] = obj.getFCONT();
                row[44] = obj.getCRULE();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    //<editor-fold defaultstate="collapsed" desc="Funciones">
    private static String convertStatus(String stval) {
        String valor = "";
        switch (stval) {
            case "1":
                valor = "Stand By";
                break;
            case "2":
                valor = "Sent Office";
                break;
            case "3":
                valor = "Link Document";
                break;
            case "4":
                valor = "Sent Bank";
                break;
            case "5":
                valor = "Chargeback";
                break;
            case "6":
                valor = "Reverse Chargeback";
                break;
        }
        return valor;
    }
//</editor-fold>
}
