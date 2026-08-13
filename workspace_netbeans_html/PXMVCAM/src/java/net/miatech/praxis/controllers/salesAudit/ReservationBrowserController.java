package net.miatech.praxis.controllers.salesAudit;

import com.monitorjbl.xlsx.StreamingReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import net.miatech.praxis.SaleAudit.entities.X3179;
import net.miatech.praxis.SaleAudit.filter.SQP05372Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05379Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05401Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05402Filter;
import net.miatech.praxis.logic.salesAudit.ReservationBrowserLogic;
import net.miatech.praxis.utils.ResponseUtils;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
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
    
    @RequestMapping(value = "loadBrowser")
    public ResponseEntity<?> loadBrowser(@ModelAttribute SQP05377Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadBrowser ****");
        SQP05377Filter filter = logic.loadSQP05377Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadRobotLog")
    public ResponseEntity<?> loadRobotLog(@ModelAttribute SQP05379Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadRobotLog ****");
        SQP05379Filter filter = logic.loadSQP05379Filter(params);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "processRobotByParams")
    public ResponseEntity<?> processRobot(@RequestBody SQP05372Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - processRobotByParams ****");
        params.setRandomUUID();
        logic.loadSQP05372Filter(params);
        return ResponseUtils.create();
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
    
    @RequestMapping(value = "loadKeys")
    public ResponseEntity<?> loadKeys() throws Exception{
        System.out.println("**** ReservationBrowser - loadKeys ****");
        SQP05401Filter filter = logic.loadSQP05401Filter();
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "updateKeys",method = RequestMethod.POST)
    public ResponseEntity<?> updateKeys(@RequestBody SQP05402Filter params) throws Exception{
        System.out.println("**** ReservationBrowser - loadKeys ****");
        SQP05402Filter filter = logic.loadSQP05402Filter(params);
        return ResponseUtils.ok(filter);
    }
}
