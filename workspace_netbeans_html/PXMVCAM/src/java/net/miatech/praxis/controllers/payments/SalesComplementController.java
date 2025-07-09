package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.logic.payments.SalesComplementLogic;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.A4453Filter;
import net.miatech.praxis.payment.filter.A4454Filter;
import net.miatech.praxis.payment.filter.SQP04979Filter;
import net.miatech.praxis.payment.filter.SQP04980Filter;
import net.miatech.praxis.payment.filter.SQP04981Filter;
import net.miatech.praxis.payment.filter.SQP04982Filter;
import net.miatech.praxis.payment.filter.SQP04983Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/SalesComplement")
public class SalesComplementController {

    @Autowired
    private SalesComplementLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    private static String controllerName = "Sales Complement";

    //<editor-fold defaultstate="collapsed" desc="convierte obj">
    private <T> T parseObject(Map<String, Object> params, Class<T> clazz)
            throws InstantiationException, IllegalAccessException {
        //T instance = clazz.newInstance();
        Gson gson = new Gson();
        String json = gson.toJson(params);
        //System.out.println(json);
        T filter = (T) gson.fromJson(json, clazz);
        return filter;
    }
    //</editor-fold>

    @RequestMapping(value = "getPlusgradeInfo")
    public ResponseEntity<?> getPlusgradeInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Plusgrade Info---------------");
            SQP04979Filter filter = this.parseObject(params,SQP04979Filter.class);
            filter = logic.getSQP04979Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "getLigasInfo")
    public ResponseEntity<?> getLigasInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Ligas Info---------------");
            SQP04980Filter filter = this.parseObject(params,SQP04980Filter.class);
            filter = logic.getSQP04980Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "getTabletsInfo")
    public ResponseEntity<?> getTabletsInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Tablets Info---------------");
            SQP04981Filter filter = this.parseObject(params,SQP04981Filter.class);
            filter = logic.getSQP04981Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "getTicketsPg")
    public ResponseEntity<?> getTicketsPg(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: Plusgrade By Ticket---------------");
            SQP04982Filter filter = this.parseObject(params,SQP04982Filter.class);
            filter = logic.getSQP04982Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "searchPNR")
    public ResponseEntity<?> searchPNR(@RequestParam Map<String,Object> params, ModelMap model){
        try {
            System.out.println("-------------Sales Complement: Search PNR---------------");
            SQP00697Filter filter = new SQP00697Filter();
            //filter = this.parseObject(params, SQP00697Filter.class);
            filter.IN_TEXT = params.get("IN_TEXT").toString();
            filter.IN_TFILTER = Integer.parseInt(params.get("IN_TFILTER").toString());
            List<SQP00697Filter> listaData = logic.loadSQP00697(filter);
            model.put("data", listaData);
            model.put("total",listaData.size());
            return new ResponseEntity<>(model,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            //e.printStackTrace(); //solo en testing
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadMasterInfo")
    public ResponseEntity<?> loadMasterTableInfo(@ModelAttribute SQP05004Filter filter){
        try {
            System.out.println("-------------Sales Complement: Master Table---------------");
            System.out.println("Loading "+filter.getKEY1()+"-"+filter.getKEY2()+"...");
            filter = logic.getSQP05004Filter(filter);
            return new ResponseEntity<>(filter,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadPaises")
    public ResponseEntity<?> loadPaises(){
        try {
            System.out.println("-------------Sales Complement: Load Paises---------------");
            List<A3152> result = logic.getPaises();
            return new ResponseEntity<>(result,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadPlusgradeInfo")
    public ResponseEntity<byte[]> downloadPlusgradeInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: downloadPlusgradeInfo---------------");
            SQP04979Filter filter = this.parseObject(params,SQP04979Filter.class);
            filter = logic.getSQP04979Filter(filter);

            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[31];
            headers[0] = "Plusgrade ID";
            headers[1] = "Merchant";
            headers[2] = "Porcessing Date";
            headers[3] = "Diff. Days";
            headers[4] = "Plusgrade VS Amex";
            headers[5] = "Plusgrade VS Sales";
            headers[6] = "Sale Country";
            headers[7] = "Sale Date";
            headers[8] = "CC Code";
            headers[9] = "CC Number";
            headers[10] = "CC Auth";
            headers[11] = "Qty Pax";
            headers[12] = "Currency Offer";
            headers[13] = "Total Amount";
            headers[14] = "Total Amount Off";
            headers[15] = "Sales Amount";
            headers[16] = "Sales Diff.";
            headers[17] = "Sales Country";
            headers[18] = "Sales Date";
            headers[19] = "Qty Tickets";
            headers[20] = "Plusgrade VS Chargeback";
            headers[21] = "PNR";
            headers[22] = "EMD Number";
            headers[23] = "Accounting ID Sales FLEX";
            headers[24] = "Accounting Date";
            headers[25] = "Accounting ID";
            headers[26] = "Error Code";
            headers[27] = "Error Description";
            headers[28] = "Add Pax EMD Number";
            headers[29] = "Add Pax Ticket Number";
            headers[30] = "Token";
            data.add(headers);
            for(A4453Filter obj:filter.getResult()){
                Object[] row = new Object[31];
                row[0] = obj.getPLUSGRAID();
                row[1] = obj.getMERCHID();
                row[2] = obj.getPRDA();
                row[3] = obj.getPASSED_DAYS();
                row[4] = obj.getDescFAMEX();
                row[5] = obj.getDescSTVAL();
                row[6] = obj.getCOUNTRY();
                row[7] = obj.getSDATE();
                row[8] = obj.getSCARCOD();
                row[9] = obj.getSCARDN();
                row[10] = obj.getSAUTHOC();
                row[11] = obj.getNBROFPAX();
                row[12] = obj.getCUROFFER();
                row[13] = obj.getSVFOP();
                row[14] = obj.getAMOUNTOFF();
                row[15] = obj.getSVFOPS();
                row[16] = obj.getDIFF_AMOUNT();
                row[17] = obj.getSCOUNTRY();
                row[18] = obj.getSDATE();
                row[19] = obj.getQTYTKT();
                row[20] = obj.getDescFAMEXCHG();
                row[21] = obj.getPNR();
                row[22] = obj.getEMDNUMBER();
                row[23] = obj.getIDCONFLE();
                row[24] = obj.getFCONT();
                row[25] = obj.getIDCON();
                row[26] = obj.getCERROR();
                row[27] = obj.getDES_CERROR();
                row[28] = "";
                row[29] = "";
                row[30] = obj.getPAYTOKEN();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - PlusgradeReport" + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadLigasInfo")
    public ResponseEntity<byte[]> downloadLigasInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: downloadLigasInfo---------------");
            SQP04980Filter filter = this.parseObject(params,SQP04980Filter.class);
            filter = logic.getSQP04980Filter(filter);

            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[23];
            headers[0] = "Operation Number";
            headers[1] = "Merchant";
            headers[2] = "Processing Date";
            headers[3] = "Diff. Days";
            headers[4] = "Ligas VS Amex";
            headers[5] = "Sales Date";
            headers[6] = "Sale Time";
            headers[7] = "CC Name";
            headers[8] = "CC Number";
            headers[9] = "CC Auth";
            headers[10] = "Total Amount";
            headers[11] = "Issuing Bank";
            headers[12] = "PNR";
            headers[13] = "Ticket1";
            headers[14] = "Ticket2";
            headers[15] = "Ticket3";
            headers[16] = "Ticket4";
            headers[17] = "Ticket5";
            headers[18] = "Ticket6";
            headers[19] = "Ticket7";
            headers[20] = "Ticket8";
            headers[21] = "Ticket9";
            headers[22] = "Ticket10";
            data.add(headers);
            for(A4454Filter obj:filter.getResult()){
                Object[] row = new Object[23];
                row[0] = obj.getOPERATNBR();
                row[1] = obj.getMERCHID();
                row[2] = obj.getPRDA();
                row[3] = obj.getPASSED_DAYS();
                row[4] = obj.getDescFAMEX();
                row[5] = obj.getSDATE();
                row[6] = obj.getSTIME();
                row[7] = obj.getNAMECARD();
                row[8] = obj.getSCARDN();
                row[9] = obj.getSAUTHOC();
                row[10] = obj.getSVFOP();
                row[11] = obj.getBANCOEMI();
                row[12] = obj.getPNR();
                row[13] = obj.getTICKET1();
                row[14] = obj.getTICKET2();
                row[15] = obj.getTICKET3();
                row[16] = obj.getTICKET4();
                row[17] = obj.getTICKET5();
                row[18] = obj.getTICKET6();
                row[19] = obj.getTICKET7();
                row[20] = obj.getTICKET8();
                row[21] = obj.getTICKET9();
                row[22] = obj.getTICKET10();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - LigasReport" + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadTabletInfo")
    public ResponseEntity<byte[]> downloadTabletInfo(@RequestParam Map<String,Object> params){
        try {
            System.out.println("-------------Sales Complement: downloadTabletInfo---------------");
            SQP04981Filter filter = this.parseObject(params,SQP04981Filter.class);
            filter = logic.getSQP04981Filter(filter);

            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[23];
            headers[0] = "Operation Number";
            headers[1] = "Merchant";
            headers[2] = "Processing Date";
            headers[3] = "Diff. Days";
            headers[4] = "Tablet VS Amex";
            headers[5] = "Sales Date";
            headers[6] = "Sale Time";
            headers[7] = "CC Name";
            headers[8] = "CC Number";
            headers[9] = "CC Auth";
            headers[10] = "Total Amount";
            headers[11] = "Issuing Bank";
            headers[12] = "PNR";
            headers[13] = "Ticket1";
            headers[14] = "Ticket2";
            headers[15] = "Ticket3";
            headers[16] = "Ticket4";
            headers[17] = "Ticket5";
            headers[18] = "Ticket6";
            headers[19] = "Ticket7";
            headers[20] = "Ticket8";
            headers[21] = "Ticket9";
            headers[22] = "Ticket10";
            data.add(headers);
            for(A4454Filter obj:filter.getResult()){
                Object[] row = new Object[23];
                row[0] = obj.getOPERATNBR();
                row[1] = obj.getMERCHID();
                row[2] = obj.getPRDA();
                row[3] = obj.getPASSED_DAYS();
                row[4] = obj.getDescFAMEX();
                row[5] = obj.getSDATE();
                row[6] = obj.getSTIME();
                row[7] = obj.getNAMECARD();
                row[8] = obj.getSCARDN();
                row[9] = obj.getSAUTHOC();
                row[10] = obj.getSVFOP();
                row[11] = obj.getBANCOEMI();
                row[12] = obj.getPNR();
                row[13] = obj.getTICKET1();
                row[14] = obj.getTICKET2();
                row[15] = obj.getTICKET3();
                row[16] = obj.getTICKET4();
                row[17] = obj.getTICKET5();
                row[18] = obj.getTICKET6();
                row[19] = obj.getTICKET7();
                row[20] = obj.getTICKET8();
                row[21] = obj.getTICKET9();
                row[22] = obj.getTICKET10();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - TabletsReport" + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
