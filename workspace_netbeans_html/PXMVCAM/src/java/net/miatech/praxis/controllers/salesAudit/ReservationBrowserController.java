package net.miatech.praxis.controllers.salesAudit;

import com.monitorjbl.xlsx.StreamingReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import net.miatech.praxis.SaleAudit.entities.A4590;
import net.miatech.praxis.SaleAudit.entities.A4591;
import net.miatech.praxis.SaleAudit.entities.X3179;
import net.miatech.praxis.SaleAudit.filter.RobotSabrePayload;
import net.miatech.praxis.SaleAudit.filter.RobotSabreResponse;
import net.miatech.praxis.SaleAudit.filter.SQP05372Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05379Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05401Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05402Filter;
import net.miatech.praxis.logic.salesAudit.ReservationBrowserLogic;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

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
    
    @Autowired
    private ExportUtils exportUtils;
    
    private final String controllerName = "ReservationBrowser";
    
     private static enum SearchStatus {
        PENDING("P", "Pending"),
        FOUND("F", "Found"),
        NOT_FOUND("N", "Not found"),
        UNKNOWN("", "Unknown");

        private final String code;
        private final String description;

        SearchStatus(String code, String description) {
            this.code = code;
            this.description = description;
        }

        public String getDescription() {
            return description;
        }

        public static String fromCode(String code) {
            for (SearchStatus status : values()) {
                if (status.code.equalsIgnoreCase(code)) {
                    return status.description;
                }
            }
            return UNKNOWN.description;
        }
    }
    
    // PNR pendientes o completados
    @RequestMapping(value = "loadBrowser")
    public ResponseEntity<?> loadBrowser(@ModelAttribute SQP05377Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadBrowser ****");
        SQP05377Filter filter = logic.loadSQP05377Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "downloadTickets", method = RequestMethod.GET)
    public ResponseEntity<?> downloadTickets(@ModelAttribute SQP05377Filter params) throws Exception{
        try {
            System.out.println("---------------ReservationBrowser:downloadTickets-------------");
            SQP05377Filter filter = logic.loadSQP05377Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[20];
            headers[0] = "RN";
            headers[1] = "Processing Date";
            headers[2] = "Source";
            headers[3] = "Queue";
            headers[4] = "Transaction";
            headers[5] = "Ticket";
            headers[6] = "PNR";
            headers[7] = "PNR Sabre";
            headers[8] = "Pax Name";
            headers[9] = "Pax Number";
            headers[10] = "DOCS";
            headers[11] = "DOCA";
            headers[12] = "OSIS";
            headers[13] = "Status";
            headers[14] = "User Create";
            headers[15] = "Date Create";
            headers[16] = "Hour Create";
            headers[17] = "User Update";
            headers[18] = "Date Update";
            headers[19] = "Hour Update";
            data.add(headers);
            
            
            for (Object object : filter.getResponse()) {
                
                A4591 obj = (A4591) object;
                                
                Object[] row = new Object[20];
                row[0] = obj.getRN();
                row[1] = obj.getPRDA();
                row[2] = obj.getFUENTE();
                row[3] = obj.getJOBQUEUE();
                row[4] = obj.getTRNCU();
                row[5] = obj.getCCIA() + obj.getFORMA() + obj.getSERIE();
                row[6] = obj.getPNR();
                row[7] = obj.getPNRAA();
                row[8] = obj.getPAX();
                row[9] = obj.getCODPAX();
                row[10] = obj.getDOCS();
                row[11] = obj.getDOCA();
                row[12] = obj.getOSIS();
                row[13] = obj.getSTSEARCH();
                row[13] = SearchStatus.fromCode(obj.getSTSEARCH());
                row[14] = obj.getUSCR();
                row[15] = obj.getFECR();
                row[16] = obj.getHOCR();
                row[17] = obj.getUSUP();
                row[18] = obj.getFEUP();
                row[19] = obj.getHOUP();       
                data.add(row);
            }
            String partNameFile = controllerName + "Ticket";
            return exportUtils.createExcel(data, partNameFile + " - " + Functions.getFechaActual());
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "downloadPNR", method = RequestMethod.GET)
    public ResponseEntity<?> downloadPNR(@ModelAttribute SQP05377Filter params) throws Exception{
        try {
            System.out.println("---------------ReservationBrowser:downloadPNR-------------");
            SQP05377Filter filter = logic.loadSQP05377Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[16];
            headers[0] = "RN";
            headers[1] = "Processing Date";
            headers[2] = "PNR";
            headers[3] = "PNR Sabre";
            headers[4] = "Source";
            headers[5] = "Queue";
            headers[6] = "Ticket Reference";
            headers[7] = "Quantity Tickets";
            headers[8] = "Status";
            headers[9] = "Origin";
            headers[10] = "User Create";
            headers[11] = "Date Create";
            headers[12] = "Hour Create";
            headers[13] = "User Update";
            headers[14] = "Date Update";
            headers[15] = "Hour Update";
            data.add(headers);
            
            for (Object object : filter.getResponse()) {
                
                A4590 obj = (A4590) object;
                                
                Object[] row = new Object[16];
                row[0] = obj.getRN();
                row[1] = obj.getPRDA();
                row[2] = obj.getPNR();
                row[3] = obj.getPNRAA();
                row[4] = obj.getFUENTE();
                row[5] = obj.getJOBQUEUE();
                row[6] = obj.getREFTKT();
                row[7] = obj.getQTYTKT();
                row[8] = SearchStatus.fromCode(obj.getSTSEARCH());
                row[9] = obj.getTXTORIGIN();
                row[10] = obj.getUSCR();
                row[11] = obj.getFECR();
                row[12] = obj.getHOCR();
                row[13] = obj.getUSUP();
                row[14] = obj.getFEUP();
                row[15] = obj.getHOUP();       
                data.add(row);
            }
            String partNameFile = controllerName + "Pnr";
            return exportUtils.createExcel(data, partNameFile + " - " + Functions.getFechaActual());
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "loadRobotLog")
    public ResponseEntity<?> loadRobotLog(@ModelAttribute SQP05379Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadRobotLog ****");
        SQP05379Filter filter = logic.loadSQP05379Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "executeRobot",method = RequestMethod.POST)
    public ResponseEntity<?> executeRobot(@RequestBody RobotSabrePayload params) throws Exception{
        System.out.println("**** ReservationBrowser - executeRobot ****");
        RobotSabreResponse response = logic.loadExecuteRobot(params);
        return ResponseUtils.ok(response);
    }
    
    // Agrupacion y Proceso de Robot por parametros
    @RequestMapping(value = "processRobotByParams")
    public ResponseEntity<?> processRobot(@RequestBody SQP05372Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - processRobotByParams ****");
        params.setRandomUUID();
//        logic.loadSQP05372Filter(params);
        SQP05372Filter filter = logic.loadSQP05372Filter(params);
        return ResponseUtils.create(filter);
    }
    
    @RequestMapping(value = "processRobotByExcel")
    public ResponseEntity<?> processRobotByExcel(@RequestPart("archivo") MultipartFile excelfile) throws Exception{
        System.out.println("**** ReservationBrowser - processRobotByExcel ****");
        StreamingReader sr = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .sheetIndex(0)
                    .read(excelfile.getInputStream());
        final List<X3179> excelRows = new ArrayList<>();
        sr.forEach((Row fila)->{
            if (fila.getRowNum() > 0) {
                X3179 obj = X3179.builder()
                        .CCUST("139")
                        .PRDA(fila.getCell(0).getStringCellValue())
                        .PNR(fila.getCell(1).getStringCellValue())
                        .FUENTE(fila.getCell(2).getStringCellValue())
                        .build();
                excelRows.add(obj);
            }
        });
        List<X3179> distintosPnr = new ArrayList<>(excelRows.stream()
            .collect(Collectors.toMap(
                excel -> excel.getPRDA()+ "-" + excel.getPNR(),
                excel -> excel,
                (existing, replacement) -> existing)) // Manejar duplicados, quedarse con el existente
            .values());
        SQP05372Filter params = new SQP05372Filter();
        params.setIN_CCUST("139");
        params.setIN_OPTION("X");
        params.setIN_QUEUE("EXCEL");
        params.setData(distintosPnr);
        params.setRandomUUID();
        logic.loadSQP05372Filter(params);
        return ResponseUtils.create();
    }
    
    // @RequestBody SQP05401Filter params
    @RequestMapping(value = "loadKeys")
    public ResponseEntity<?> loadKeys(@ModelAttribute SQP05401Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadKeys ****");
        SQP05401Filter filter = logic.loadSQP05401Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "updateKeys",method = RequestMethod.POST)
    public ResponseEntity<?> updateKeys(@RequestBody SQP05402Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadKeys ****");
        SQP05402Filter filter = logic.loadSQP05402Filter(params);
        return ResponseUtils.ok(filter);
    }
}
