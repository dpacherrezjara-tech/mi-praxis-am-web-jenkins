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
            throws InstantiationException, IllegalAccessException 
    {
        //T instance = clazz.newInstance();
        Gson gson =  new Gson();
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
            Object[] headers = new Object[33];
            headers[0] = "Plusgrade ID";
            headers[1] = "Merchant";
            headers[2] = "Porcessing Date";
            headers[3] = "Diff. Days";
            headers[4] = "Plusgrade VS Amex";
            headers[5] = "Match Date (Plusgrade VS Amex)";
            headers[6] = "Plusgrade VS Sales";
            headers[7] = "Match Date (Plusgrade VS Sales)";
            headers[8] = "Sale Country";
            headers[9] = "Sale Date";
            headers[10] = "CC Code";
            headers[11] = "CC Number";
            headers[12] = "CC Auth";
            headers[13] = "Qty Pax";
            headers[14] = "Currency Offer";
            headers[15] = "Total Amount";
            headers[16] = "Total Amount Off";
            headers[17] = "Sales Amount";
            headers[18] = "Sales Diff.";
            headers[19] = "Sales Country";
            headers[20] = "Sales Date";
            headers[21] = "Qty Tickets";
            headers[22] = "Plusgrade VS Chargeback";
            headers[23] = "PNR";
            headers[24] = "EMD Number";
            headers[25] = "Accounting ID Sales FLEX";
            headers[26] = "Accounting Date";
            headers[27] = "Accounting ID";
            headers[28] = "Error Code";
            headers[29] = "Error Description";
            headers[30] = "Add Pax EMD Number";
            headers[31] = "Add Pax Ticket Number";
            headers[32] = "Token";
            data.add(headers);
            for(A4453Filter obj:filter.getResult()){
                Object[] row = new Object[33];
                row[0] = obj.getPLUSGRAID();
                row[1] = obj.getMERCHID();
                row[2] = obj.getPRDA();
                row[3] = obj.getPASSED_DAYS();
                row[4] = obj.getDescFAMEX();
                row[5] = obj.getAmexFECSELEC();
                row[6] = obj.getDescSTVAL();
                row[7] = obj.getDescVSSales();
                row[8] = obj.getCOUNTRY();
                row[9] = obj.getSDATE();
                row[10] = obj.getSCARCOD();
                row[11] = obj.getSCARDN();
                row[12] = obj.getSAUTHOC();
                row[13] = obj.getNBROFPAX();
                row[14] = obj.getCUROFFER();
                row[15] = obj.getSVFOP();
                row[16] = obj.getAMOUNTOFF();
                row[17] = obj.getSVFOPS();
                row[18] = obj.getDIFF_AMOUNT();
                row[19] = obj.getSCOUNTRY();
                row[20] = obj.getSDATE();
                row[21] = obj.getQTYTKT();
                row[22] = obj.getDescFAMEXCHG();
                row[23] = obj.getPNR();
                row[24] = obj.getEMDNUMBER();
                row[25] = obj.getIDCONFLE();
                row[26] = obj.getFCONT();
                row[27] = obj.getIDCON();
                row[28] = obj.getCERROR();
                row[29] = obj.getDES_CERROR();
                row[30] = "";
                row[31] = "";
                row[32] = obj.getPAYTOKEN();
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
