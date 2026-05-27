package net.miatech.praxis.controllers.payments;
//<editor-fold defaultstate="collapsed" desc="Imports">
import java.awt.Color;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
import net.miatech.praxis.payment.entities.A4507;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.A4331STFilter;
import net.miatech.praxis.payment.filter.A4496Filter;
import net.miatech.praxis.payment.filter.SQP04847Filter;
import net.miatech.praxis.payment.filter.SQP05048Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05054Filter;
import net.miatech.praxis.payment.filter.SQP05055Filter;
import net.miatech.praxis.payment.filter.SQP05056Filter;
import net.miatech.praxis.payment.filter.SQP05057Filter;
import net.miatech.praxis.payment.filter.SQP05059Filter;
import net.miatech.praxis.payment.filter.SQP05060Filter;
import net.miatech.praxis.payment.filter.SQP05061Filter;
import net.miatech.praxis.payment.filter.SQP05062Filter;
import net.miatech.praxis.payment.filter.SQP05063Filter;
import net.miatech.praxis.payment.filter.SQP05065Filter;
import net.miatech.praxis.payment.filter.SQP05072Filter;
import net.miatech.praxis.payment.filter.SQP05074Filter;
import net.miatech.praxis.payment.filter.SQP05075Filter;
import net.miatech.praxis.payment.filter.SQP05077Filter;
import net.miatech.praxis.payment.filter.SQP05081Filter;
import net.miatech.praxis.payment.filter.SQP05088Filter;
import net.miatech.praxis.payment.filter.SQP05089Filter;
import net.miatech.praxis.payment.filter.SQP05126Filter;
import net.miatech.praxis.payment.filter.SQP05128Filter;
import net.miatech.praxis.payment.filter.SQP05129Filter;
import net.miatech.praxis.payment.filter.SQP05130Filter;
import net.miatech.praxis.payment.filter.SQP05132Filter;
import net.miatech.praxis.payment.filter.SQP05133Filter;
import net.miatech.praxis.payment.filter.SQP05134Filter;
import net.miatech.praxis.payment.filter.SQP05141Filter;
import net.miatech.praxis.payment.filter.SQP05142Filter;
import net.miatech.praxis.payment.filter.SQP05147Filter;
import net.miatech.praxis.payment.filter.SQP05182Filter;
import net.miatech.praxis.payment.filter.SQP05183Filter;
import net.miatech.praxis.payment.filter.SQP05187Filter;
import net.miatech.praxis.payment.filter.SQP05202Filter;
import net.miatech.praxis.payment.filter.SQP05203Filter;
import net.miatech.praxis.payment.filter.SQP05206Filter;
import net.miatech.praxis.payment.filter.SQP05217Filter;
import net.miatech.praxis.payment.filter.SQP05218Filter;
import net.miatech.praxis.payment.filter.SQP05219Filter;
import net.miatech.praxis.payment.filter.SQP05247Filter;
import net.miatech.praxis.payment.filter.SQP05259Filter;
import net.miatech.praxis.payment.filter.SQP05261Filter;
import net.miatech.praxis.payment.filter.SQP05276Filter;
import net.miatech.praxis.payment.filter.SQP05302Filter;
import net.miatech.praxis.payment.filter.SQP05304Filter;
import net.miatech.praxis.payment.filter.SQP05307Filter;
import net.miatech.praxis.payment.filter.SQP05310Filter;
import net.miatech.praxis.payment.filter.SQP05311Filter;
import net.miatech.praxis.payment.filter.SQP05312Filter;
import net.miatech.praxis.payment.filter.SQP05313Filter;
import net.miatech.praxis.payment.filter.SQP05319Filter;
import net.miatech.praxis.payment.filter.SQP05646Filter;
import net.miatech.praxis.payment.filter.SQP05709Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SabreWebService;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import net.sabre.miatech.praxis.TicketRES;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//</editor-fold>

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/SalesReconciliationBPO")
public class SalesReconciliationBPOController {

    @Autowired
    private SalesReconciliationLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    @Autowired
    private SabreWebService sabreWebService;

    private final String controllerName = "PaymentsReconciliation";

    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadFilters-------------");
            SQP05276Filter webFilters = logic.loadSQP05276Filter(new SQP05276Filter("1"));
            model.put("creditcards", webFilters.getCREDITCARDS());
            model.put("procesadores", webFilters.getPROCESADORES());
            model.put("cerror", webFilters.getCERROR());
            model.put("codadju", webFilters.getCODADJU());
            model.put("paises", webFilters.getPAISES());
            model.put("monedas", webFilters.getMONEDAS());
            model.put("admins", webFilters.getADMINS());
            model.put("stvals", webFilters.getSTVALS());
            model.put("autocomments", webFilters.getAUTOCOMMENTS());
            model.put("reglas", webFilters.getREGLAS());
            System.out.println("Total: " + model.size());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadTicketUses")
    public ResponseEntity<?> loadTicketUses(@ModelAttribute SQP05075Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadTicketUses-------------");
        try {
            SQP05075Filter filter = logic.loadSQP05075Filter(params);
            System.out.println("Ticket found: " + filter.getOUT_USOS());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadSabreUses/{ticket}")
    public ResponseEntity<?> loadSabreUses(@PathVariable String ticket) {
        System.out.println("---------------SalesReconciliationBPO:loadSabreUses-------------");
        try {
            if (ticket != null && ticket.length() == 13) {
                TicketRES response = sabreWebService.getTicketInfo(ticket);
                if (!"00".equals(response.getOPResult().getErrorCode())) {
                    throw new Exception(response.getOPResult().getErrorDescription());
                }
                System.out.println(response.getOPResult().getErrorDescription() + " " + ticket);
                List<?> lst = new ArrayList<>();
                if (response.getTicketDataType().getTicket() != null) {
                    //ticcket
                    lst = response.getTicketDataType().getTicket().getServiceCoupon();
                } else if (response.getTicketDataType().getElectronicMiscDocument() != null) {
                    //emd
                    lst = response.getTicketDataType()
                            .getElectronicMiscDocument()
                            .getMiscellaneous()
                            .get(0).getServiceCoupon();
                }
                return new ResponseEntity<>(lst, HttpStatus.OK);
            } else {
                System.out.println("Invalid Ticket Number: " + ticket);
                throw new Exception("Invalid Ticket Number: " + ticket);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //<editor-fold defaultstate="collapsed" desc="By payment">
    @RequestMapping(value = "loadByPaymentSummary")
    public ResponseEntity<?> loadByPaymentSummary(@ModelAttribute SQP05059Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadByPaymentSummary-------------");
            filter = logic.getSQP05059Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadByPaymentDetail")
    public ResponseEntity<?> loadByPaymentDetail(@ModelAttribute SQP05060Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadByPaymentDetail-------------");
            filter = logic.getSQP05060Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "processTransactionsBatch", method = RequestMethod.POST)
    public ResponseEntity<?> processTransactionsBatch(@RequestBody SQP05074Filter params) {
        try {
            System.out.println("---------------SalesReconciliationBPO:processTransactionsBatch-------------");
            SQP05074Filter filter = logic.loadSQP05074Filter(params);
            System.out.println("Process Successfull, total affected: " + filter.getVP_CANT());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Mantenimiento By Payment">
    @RequestMapping(value = "maintenanceErrorTransactionBPO", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceErrorTransaction(@RequestBody SQP05048Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceErrorTransactionBPO-------------");
        ModelMap model = new ModelMap();
        try {
            SQP05048Filter filter = logic.loadSQP05048Filter(params);
            model.put("status", filter.getSQLRES());
            model.put("response", filter.getSQLMSG());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "ReverseTransaction")
    public ResponseEntity<?> ReverseTransaction(@ModelAttribute SQP04847Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : ReverseTransaction-------------");
        ModelMap model = new ModelMap();
        try {
            SQP04847Filter filter = logic.loadSQP04847Filter(params);
            model.put("status", filter.getSQLRES());
            model.put("response", filter.getSQLMSG());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPOInfo")
    public ResponseEntity<?> loadErrorTransactionBPOInfo(@ModelAttribute SQP05052Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPOInfo-------------");
        try {
            SQP05052Filter filter = logic.loadSQP05052Filter(params);
            System.out.println("Item Found: " + filter.getResponse().getArefnbr());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPOScanner")
    public ResponseEntity<?> loadErrorTransactionBPOScanner(@ModelAttribute SQP05054Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPOScanner-------------");
        try {
            SQP05054Filter filter = logic.loadSQP05054Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionStandByScanner")
    public ResponseEntity<?> loadErrorTransactionStandByScanner(@ModelAttribute SQP05187Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionStandByScanner-------------");
        try {
            SQP05187Filter filter = logic.loadSQP05187Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPODesglose")
    public ResponseEntity<?> loadErrorTransactionBPODesglose(@ModelAttribute SQP05055Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPODesglose-------------");
        try {
            SQP05055Filter filter = logic.loadSQP05055Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadErrorTransactionBPODesgloseCHBK")
    public ResponseEntity<?> loadErrorTransactionBPODesgloseCHBK(@ModelAttribute SQP05072Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadErrorTransactionBPODesgloseCHBK-------------");
        try {
            SQP05072Filter filter = logic.loadSQP05072Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "errorTransactionBPOsetStandBy", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> errorTransactionBPOsetStandBy(@RequestBody SQP05056Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : errorTransactionBPOsetStandBy-------------");
        try {
            SQP05056Filter filter = logic.loadSQP05056Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "errorTransactionBPOreverseStandBy")
    public ResponseEntity<?> errorTransactionBPOreverseStandBy(@ModelAttribute SQP05057Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : errorTransactionBPOreverseStandBy-------------");
        try {
            SQP05057Filter filter = logic.loadSQP05057Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadScannerManual")
    public ResponseEntity<?> loadScannerManual(@ModelAttribute SQP05062Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadScannerManual-------------");
        try {
            SQP05062Filter filter = logic.loadSQP05062Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="MSI Tracking">
    @RequestMapping(value = "loadMSITrackingInfo")
    public ResponseEntity<?> loadMSITrackingInfo(@ModelAttribute SQP05061Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadMSITrackingInfo-------------");
        try {
            SQP05061Filter filter = logic.loadSQP05061Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "maintenanceReverseMSITracking", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceReverseMSITracking(@RequestBody SQP05063Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceReverseMSITracking-------------");
        try {
            SQP05063Filter filter = logic.loadSQP05063Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "maintenanceMSITracking", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceMSITracking(@RequestBody SQP05065Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceMSITracking-------------");
        try {
            SQP05065Filter filter = logic.loadSQP05065Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "loadMSITrackingManualInfo")
    public ResponseEntity<?> loadMSITrackingManualInfo(@ModelAttribute SQP05259Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadMSITrackingManualInfo-------------");
        try {
            SQP05259Filter filter = logic.loadSQP05259Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "maintenanceConcilTransacMan", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceMSITracking(@RequestBody SQP05261Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceConcilTransacMan-------------");
        try {
            logic.loadSQP05261Filter(params);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Chargeback Tracking">
    @RequestMapping(value = "loadChargebackTrackingInfo")
    public ResponseEntity<?> loadChargebackTrackingInfo(@ModelAttribute SQP05081Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadChargebackTrackingInfo-------------");
        try {
            SQP05081Filter filter = logic.loadSQP05081Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "maintenanceChargebackTracking", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceChargebackTracking(@RequestBody SQP05077Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceChargebackTracking-------------");
        try {
            SQP05077Filter filter = logic.loadSQP05077Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "loadChargebackTrackingBrowser")
    public ResponseEntity<?> loadChargebackTrackingBrowser(@ModelAttribute SQP05182Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : loadChargebackTrackingBrowser-------------");
        try {
            SQP05182Filter filter = logic.loadSQP05182Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "maintenanceChargebackManual", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> maintenanceChargebackManual(@RequestBody SQP05183Filter params) {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceChargebackManual-------------");
        try {
            SQP05183Filter filter = logic.loadSQP05183Filter(params);
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @RequestMapping(value = "loadSaleCHBKTrackingInfo")
    public ResponseEntity<?> loadSaleCHBKTrackingInfo(@ModelAttribute SQP05312Filter params) throws Exception {
        System.out.println("-------------- SalesReconciliationBPO : loadSaleCHBKTrackingInfo-------------");
        SQP05312Filter filter = logic.loadSQP05312Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "maintenanceChbkSaleConcil", method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceChbkSaleConcil(@RequestBody SQP05313Filter params) throws Exception {
        System.out.println("-------------- SalesReconciliationBPO : maintenanceChbkSaleConcil-------------");
        SQP05313Filter filter = logic.loadSQP05313Filter(params);
        return ResponseUtils.create(filter);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="By Ticket">
    @RequestMapping(value = "loadByTicketSummary")
    public ResponseEntity<?> loadByTicketSummary(@ModelAttribute SQP05088Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadByTicketSummary-------------");
        try {
            SQP05088Filter filter = logic.loadSQP05088Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/v2/loadByTicketSummary")
    public ResponseEntity<?> v2LoadByTicketSummary(@ModelAttribute SQP05646Filter params) {
        System.out.println("--------------- v2 SalesReconciliationBPO:loadByTicketSummary -------------");
        try {
            SQP05646Filter filter = logic.LoadSQP05646Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadByTicketDetail")
    public ResponseEntity<?> loadByTicketDetail(@ModelAttribute SQP05089Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadByTicketSummary-------------");
        try {
            SQP05089Filter filter = logic.loadSQP05089Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Mantenimiento By Ticket">
    @RequestMapping(value = "loadByTicketConciliationInfo")
    public ResponseEntity<?> loadByTicketConciliationInfo(@ModelAttribute SQP05126Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadByTicketConciliationInfo-------------");
        try {
            SQP05126Filter filter = logic.loadSQP05126Filter(params);
            System.out.println("Ticket found: "
                    + filter.getResponse().getA4496CIA()
                    + filter.getResponse().getA4496FORMA()
                    + filter.getResponse().getA4496SERIE());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationStandBy")
    public ResponseEntity<?> ticketConciliationStandBy(@ModelAttribute SQP05128Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationStandBy-------------");
        try {
            SQP05128Filter filter = logic.loadSQP05128Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationReverseStandBy")
    public ResponseEntity<?> ticketConciliationReverseStandBy(@ModelAttribute SQP05129Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationReverseStandBy-------------");
        try {
            SQP05129Filter filter = logic.loadSQP05129Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationGenerateAdm", method = RequestMethod.POST)
    public ResponseEntity<?> ticketConciliationGenerateAdm(@RequestBody SQP05130Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationGenerateAdm-------------");
        try {
            SQP05130Filter filter = logic.loadSQP05130Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationReverseADM")
    public ResponseEntity<?> ticketConciliationReverseADM(@ModelAttribute SQP05132Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationReverseADM-------------");
        try {
            SQP05132Filter filter = logic.loadSQP05132Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationForceMatch")
    public ResponseEntity<?> ticketConciliationForceMatch(@ModelAttribute SQP05141Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationForceMatch-------------");
        try {
            SQP05141Filter filter = logic.loadSQP05141Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "ticketConciliationRevForceMatch")
    public ResponseEntity<?> ticketConciliationRevForceMatch(@ModelAttribute SQP05142Filter params) {
        System.out.println("---------------SalesReconciliationBPO:ticketConciliationRevForceMatch-------------");
        try {
            SQP05142Filter filter = logic.loadSQP05142Filter(params);
            System.out.println("Response: " + filter.getSQLMSG());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Settlement">
    @RequestMapping(value = "loadSettlementSummary")
    public ResponseEntity<?> loadSettlementSummary(@ModelAttribute SQP05133Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadSettlementSummary-------------");
        try {
            SQP05133Filter filter = logic.loadSQP05133Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadSettlementDetail")
    public ResponseEntity<?> loadSettlementDetail(@ModelAttribute SQP05134Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadSettlementDetail-------------");
        try {
            SQP05134Filter filter = logic.loadSQP05134Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Descarga Exceles">
    @RequestMapping(value = "downloadByPaymentDetail")
    public ResponseEntity<?> downloadByPaymentDetail(@ModelAttribute SQP05060Filter params) {
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadByPaymentDetail-------------");
            SQP05060Filter filter = logic.getSQP05060Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[34];
            headers[0] = "Processing Date";
            headers[1] = "Payment Date";
            headers[2] = "Processor";
            headers[3] = "Country";
            headers[4] = "Payment Merchant ID";
            headers[5] = "Status Sett. vs Sales";
            headers[6] = "Doc. Type";
            headers[7] = "Void";
            headers[8] = "Code Rule";
            headers[9] = "Sales Merchant ID";
            headers[10] = "Iata";
            headers[11] = "Description";
            headers[12] = "Sale Date";
            headers[13] = "Card Number";
            headers[14] = "Auth Code";
            headers[15] = "Installment Plan";
            headers[16] = "Installment Number";
            headers[17] = "Ticket";
            headers[18] = "PNR";
            headers[19] = "Invoice Refer. Number PNR";
            headers[20] = "ARN";
            headers[21] = "Ref. Number";
            headers[22] = "Currency";
            headers[23] = "Transaction Amount";
            headers[24] = "Sale Amount";
            headers[25] = "Difference Amount";
            headers[26] = "Quantity Ticket";
            headers[27] = "Error Code";
            headers[28] = "Description";
            headers[29] = "Adju. Code";
            headers[30] = "Description";
            headers[31] = "User Update";
            headers[32] = "Date Update";
            headers[33] = "BPO Comment";
            data.add(headers);
            for (A4331Filter obj : filter.getResponse()) {
                Object[] row = new Object[34];
                row[0] = obj.getPrda();
                row[1] = obj.getPaydate();
                row[2] = obj.getDESC_PROCTYPE();
                row[3] = obj.getScountry();
                row[4] = obj.getPmerchid();
                row[5] = convertStatus(obj.getStval());
                row[6] = obj.getTranstype();
                row[7] = obj.getFvoid();
                row[8] = obj.getFregla();
                row[9] = obj.getSmerchid();
                row[10] = obj.getIATA();
                row[11] = obj.getDES_SMERCHANT();
                row[12] = obj.getSdate();
                row[13] = obj.getScardn();
                row[14] = obj.getSauthoc();
                row[15] = obj.getNbrinsta();
                row[16] = obj.getInstanbr();
                row[17] = obj.getTicket();
                row[18] = obj.getSpnr();
                row[19] = obj.getInvoirn();
                row[20] = obj.getArn();
                row[21] = obj.getArefnbr();
                row[22] = obj.getScurrency();
                row[23] = obj.getTgrosamoun();
                row[24] = obj.getSvfops();
                row[25] = obj.getDIFFERENCE();
                row[26] = obj.getQtytkt();
                row[27] = obj.getCerror();
                row[28] = obj.getDES_CERROR();
                row[29] = obj.getCodadju();
                row[30] = obj.getDESC_CODADJU();
                row[31] = obj.getUsup();
                row[32] = obj.getFeup();
                if (obj.getBPOCOMENT().isEmpty()) {
                    row[33] = obj.getADJUCOMENT();
                } else {
                    row[33] = obj.getBPOCOMENT();
                }
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - ByPayment " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadTransactionsBatch")
    public ResponseEntity<?> downloadTransactionsBatch() {
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadTransactionsBatch-------------");
            SQP05147Filter filter = logic.loadSQP05147Filter();
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[25];
            headers[0] = "Processing Date";
            headers[1] = "Payment Date";
            headers[2] = "Processor";
            headers[3] = "Country";
            headers[4] = "Payment Merchant ID";
            headers[5] = "Status Sett. vs Sales";
            headers[6] = "Doc. Type";
            headers[7] = "Void";
            headers[8] = "Sales Merchant ID";
            headers[9] = "Description";
            headers[10] = "Sale Date";
            headers[11] = "Card Number";
            headers[12] = "Auth Code";
            headers[13] = "Installment Plan";
            headers[14] = "Installment Number";
            headers[15] = "Ticket";
            headers[16] = "PNR";
            headers[17] = "Currency";
            headers[18] = "Transaction Amount";
            headers[19] = "Error Code";
            headers[20] = "Description";
            headers[21] = "Adju. Code";
            headers[22] = "Description";
            headers[23] = "User Update";
            headers[24] = "Date Update";
            data.add(headers);
            for (A4507 obj : filter.getResponse()) {
                Object[] row = new Object[25];
                row[0] = obj.getPRDA();
                row[1] = obj.getPAYDATE();
                row[2] = obj.getDESC_PROCTYPE();
                row[3] = obj.getSCOUNTRY();
                row[4] = obj.getPMERCHID();
                row[5] = convertStatus(obj.getSTVAL());
                row[6] = obj.getTRANSTYPE();
                row[7] = obj.getFVOID();
                row[8] = obj.getSMERCHID();
                row[9] = obj.getDES_SMERCHANT();
                row[10] = obj.getSDATE();
                row[11] = obj.getSCARDN();
                row[12] = obj.getSAUTHOC();
                row[13] = obj.getNBRINSTA();
                row[14] = obj.getINSTANBR();
                row[15] = obj.getTICKET();
                row[16] = obj.getSPNR();
                //row[17] = obj.getInvoirn();
                row[17] = obj.getSCURRENCY();
                row[18] = obj.getTGROSAMOUN();
                row[19] = obj.getCERROR();
                row[20] = obj.getDESC_CERROR();
                row[21] = obj.getCODADJU();
                row[22] = obj.getDESC_CODADJU();
                row[23] = obj.getUSUP();
                row[24] = obj.getFEUP();
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - BatchTrnx " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadByTicketDetail")
    public ResponseEntity<?> downloadByTicketDetail(@ModelAttribute SQP05089Filter params) {
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadByTicketDetail-------------");
            SQP05089Filter filter = logic.loadSQP05089Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            //headers
            Object[] headers = new Object[30];
            headers[0] = "Sale Date";
            headers[1] = "IATA";
            headers[2] = "Source";
            headers[3] = "Channel";
            headers[4] = "Country";
            headers[5] = "Agent";
            headers[6] = "Trnx";
            headers[7] = "Doc. Type";
            headers[8] = "Void";
            headers[9] = "RFIC";
            headers[10] = "RFIS";
            headers[11] = "Pax Name";
            headers[12] = "Ticket";
            headers[13] = "PNR";
            headers[14] = "Card Type";
            headers[15] = "Card Code";
            headers[16] = "Card Number";
            headers[17] = "Auth Code";
            headers[18] = "Amount";
            headers[19] = "Currency";
            headers[20] = "Reconciliation Amount";
            headers[21] = "Difference Amount";
            headers[22] = "Expected Date";
            headers[23] = "Payment Date";
            headers[24] = "Difference";
            headers[25] = "Processing Date";
            headers[26] = "Status";
            headers[27] = "Processor";
            headers[28] = "ADM St.";
            headers[29] = "BPO Comment";
            data.add(headers);
            for (A4496Filter obj : filter.getResponse()) {
                Object[] row = new Object[30];
                row[0] = obj.getA4496FECVT();
                row[1] = obj.getA4496AGENT();
                row[2] = obj.getA4496FUENT();
                row[3] = obj.getA4496SFUEN();
                row[4] = obj.getA4496PAIS();
                row[5] = obj.getA4496CODAG();
                row[6] = obj.getA4496TRNCU();
                row[7] = obj.getA4496TIPOD();
                row[8] = obj.getA4496TKVOI();
                row[9] = obj.getA4496RFIC();
                row[10] = obj.getA4496RFIS1();
                row[11] = obj.getA4496PAX();
                row[12] = obj.getA4496CIA() + obj.getA4496FORMA() + obj.getA4496SERIE();
                row[13] = obj.getA4496PNR();
                row[14] = obj.getCARDTYPE(); 
                row[15] = obj.getA4501TTARJ();
                row[16] = obj.getA4501NREF();
                row[17] = obj.getA4501CAPL();
                row[18] = obj.getA4501VFOP();
                row[19] = obj.getA4501MFOP();
                row[20] = obj.getRECONCILIATION_AMOUNT();
                row[21] = obj.getDIFFERENCE_AMOUNT();
                row[22] = obj.getPROCDATE();
                row[23] = obj.getPAYDATE();
                row[24] = restaFechas(obj.getPROCDATE(), obj.getPAYDATE());
                row[25] = obj.getA4501PRDA();
                row[26] = convertStatus(obj.getA4501STVAL());
                row[27] = obj.getDESC_PROCTYPE();
                row[28] = obj.getA4501STADM();
                if (obj.getA4501STADM().trim().isEmpty()) {
                    row[29] = !obj.getBPO_COMEN2().isEmpty() ? obj.getBPO_COMEN2() : obj.getBPO_COMEN();
                } else {
                    row[29] = obj.getADM_COMEN();
                }
                data.add(row);
            }
            return exportUtils.createExcel(data, controllerName + " - ByTicket " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadSettlementDetail")
    public ResponseEntity<?> downloadSettlementDetail(@ModelAttribute SQP05134Filter params) {
        System.out.println("---------------SalesReconciliationBPO:downloadSettlementDetail-------------");
        try {
            SQP05134Filter filter = logic.loadSQP05134Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            List<CustomExcelCell> header = new ArrayList<>();
            header.add(new CustomExcelCell("Processing\nDate"));
            header.add(new CustomExcelCell("Payment\nDate"));
            header.add(new CustomExcelCell("Sales\nDate"));
            header.add(new CustomExcelCell("Settlement\nVS Sales"));
            header.add(new CustomExcelCell("Update Status"));
            header.add(new CustomExcelCell("Sale Merchant"));
            header.add(new CustomExcelCell("Payment Merchant"));
            header.add(new CustomExcelCell("Processor"));
            header.add(new CustomExcelCell("Country"));
            header.add(new CustomExcelCell("Qty\nTkts"));
            header.add(new CustomExcelCell("Invoice\nRef. Number\nPNR"));
            header.add(new CustomExcelCell("ARN"));
            header.add(new CustomExcelCell("PNR"));
            header.add(new CustomExcelCell("Document\nType"));
            header.add(new CustomExcelCell("Indust. Speci.\nRef. Nbr."));
            header.add(new CustomExcelCell("Card Number"));
            header.add(new CustomExcelCell("Auth."));
            header.add(new CustomExcelCell("Installment\nPlan"));
            header.add(new CustomExcelCell("Installment\nNumber"));
            header.add(new CustomExcelCell("Currency"));
            header.add(new CustomExcelCell("Sales\nAmount"));
            header.add(new CustomExcelCell("Transac.\nAmount"));
            header.add(new CustomExcelCell("MSI Rate"));
            header.add(new CustomExcelCell("Serv. Fee"));
            header.add(new CustomExcelCell("MSI VAT"));
            header.add(new CustomExcelCell("Comm. Rate"));
            header.add(new CustomExcelCell("Comm. Amount"));
            header.add(new CustomExcelCell("Comm.\nVAT Rate"));
            header.add(new CustomExcelCell("Comm.\nVAT Amount"));
            header.add(new CustomExcelCell("CHBK\nNumber"));
            header.add(new CustomExcelCell("CHBK\nReason Code"));
            header.add(new CustomExcelCell("CHBK\nAmount"));
            header.add(new CustomExcelCell("CHBK\nComm."));
            header.add(new CustomExcelCell("CHBK\nVAT"));
            header.add(new CustomExcelCell("ADJU\nAmount"));
            header.add(new CustomExcelCell("ADJU\nComm."));
            header.add(new CustomExcelCell("ADJU\nVAT"));
            header.add(new CustomExcelCell("TAX"));
            header.add(new CustomExcelCell("NET Amount"));
            header.add(new CustomExcelCell("NET Amount\nTo Reveive AM"));
            header.add(new CustomExcelCell("Currency\nSettlement"));
            header.add(new CustomExcelCell("Code\nRule"));
            header.add(new CustomExcelCell("Description\nRule"));
            header.add(new CustomExcelCell("Flag\nCompl."));
            header.add(new CustomExcelCell("Praxis\nID"));
            header.add(new CustomExcelCell("Accounting\nDate"));
            data.add(header);

            //colores
            Color c1 = new Color(178, 218, 250);
            Color c2 = new Color(252, 246, 220);
            for (A4331Filter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getPrda()));
                row.add(new CustomExcelCell(obj.getPaydate()));
                row.add(new CustomExcelCell(obj.getSdate()));
                row.add(new CustomExcelCell(convertStatus(obj.getStval())));
                row.add(new CustomExcelCell(obj.getFeup()));
                row.add(new CustomExcelCell(obj.getSmerchid()));
                row.add(new CustomExcelCell(obj.getPmerchid()));
                row.add(new CustomExcelCell(obj.getDESC_PROCTYPE()));
                row.add(new CustomExcelCell(obj.getScountry()));
                row.add(new CustomExcelCell(obj.getQtytkt()));
                row.add(new CustomExcelCell(obj.getInvoirn()));
                row.add(new CustomExcelCell(obj.getArn()));
                row.add(new CustomExcelCell(obj.getSpnr()));
                row.add(new CustomExcelCell(obj.getTranstype()));
                row.add(new CustomExcelCell(obj.getIsrefnbr()));
                row.add(new CustomExcelCell(obj.getScardn()));
                row.add(new CustomExcelCell(obj.getSauthoc()));
                row.add(new CustomExcelCell(obj.getInstanbr()));
                row.add(new CustomExcelCell(obj.getNbrinsta()));
                row.add(new CustomExcelCell(obj.getScurrency()));
                row.add(new CustomExcelCell(obj.getSvfops()));
                //row.add(new CustomExcelCell(obj.getTGROSAMOUN_ADJ(), c1));
                row.add(new CustomExcelCell(obj.getTgrosamoun()));
                row.add(new CustomExcelCell(obj.getSfeerate()));
                row.add(new CustomExcelCell(obj.getServicefee()));
                row.add(new CustomExcelCell(obj.getOvercom12()));
                row.add(new CustomExcelCell(obj.getDiscrate()));
                row.add(new CustomExcelCell(obj.getDiscamoun()));
                row.add(new CustomExcelCell(obj.getDiscratei()));
                row.add(new CustomExcelCell(obj.getDiscamouni()));
                row.add(new CustomExcelCell(obj.getChgbnum()));
                row.add(new CustomExcelCell(obj.getCodchgback()));
                if (obj.getTranstype().equals("CHBK")) {
                    row.add(new CustomExcelCell(obj.getTgrosamoun()));
                    row.add(new CustomExcelCell(obj.getDiscamoun()));
                    row.add(new CustomExcelCell(obj.getDiscamouni()));
                } else {
                    row.add(new CustomExcelCell(0));
                    row.add(new CustomExcelCell(0));
                    row.add(new CustomExcelCell(0));
                }
                if (obj.getTranstype().equals("ADJU")) {
                    row.add(new CustomExcelCell(obj.getTgrosamoun()));
                    row.add(new CustomExcelCell(obj.getDiscamoun()));
                    row.add(new CustomExcelCell(obj.getDiscamouni()));
                } else {
                    row.add(new CustomExcelCell(0));
                    row.add(new CustomExcelCell(0));
                    row.add(new CustomExcelCell(0));
                }
                row.add(new CustomExcelCell(obj.getAdjusment()));
                row.add(new CustomExcelCell(obj.getNeto(), c2));
                row.add(new CustomExcelCell(obj.getNetopay(), c2));
                row.add(new CustomExcelCell(obj.getPcurrency(), c2));
                row.add(new CustomExcelCell(obj.getFregla()));
                row.add(new CustomExcelCell(convertRegla(obj.getFregla())));
                row.add(new CustomExcelCell(convertFcompl(obj.getFcompl())));
                row.add(new CustomExcelCell(obj.getIdconl()));
                row.add(new CustomExcelCell(obj.getFcontl()));
                
                data.add(row);
            }

            return exportUtils.createCustomExcel(data, controllerName + " - Settlement Detail " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadSettlementSummary")
    public ResponseEntity<?> downloadSettlementSummary(@ModelAttribute SQP05133Filter params) {
        System.out.println("---------------SalesReconciliationBPO:downloadSettlementSummary-------------");
        try {
            SQP05133Filter filter = logic.loadSQP05133Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            String procesador = filter.getResponse().get(0).getDESC_PROCTYPE().trim();
            String title = "";
            if (params.getIN_MERCHANT() != null) {
                title = "Merchant " + procesador + " " + params.getIN_SCURRENCY() + "_" + params.getIN_DATEFROM();
            } else {
                title = "Summary " + params.getIN_DATEFROM()
                        + "-" + params.getIN_DATETO().substring(params.getIN_DATETO().length() - 2);
            }
            List<List<CustomExcelCell>> data = new ArrayList<>();
            List<CustomExcelCell> header = new ArrayList<>();
            header.add(new CustomExcelCell("Processing\nDate"));
            if (params.getIN_MERCHANT() != null) {
                header.add(new CustomExcelCell("Merchant"));
            }
            header.add(new CustomExcelCell("Processor"));
            header.add(new CustomExcelCell("Country"));
            header.add(new CustomExcelCell("Qty\nTransactions"));
            header.add(new CustomExcelCell("Currency"));
            header.add(new CustomExcelCell("Total\nAmount"));
            header.add(new CustomExcelCell("GROSS\nAmount"));
            header.add(new CustomExcelCell("Comm.\nAmount"));
            header.add(new CustomExcelCell("Comm.\nVAT"));
            header.add(new CustomExcelCell("Serv. Fee"));
            header.add(new CustomExcelCell("Serv. Fee\nVAT"));
            header.add(new CustomExcelCell("CHBK\nAmount"));
            header.add(new CustomExcelCell("CHBK\nComm."));
            header.add(new CustomExcelCell("CHBK\nVAT"));
            header.add(new CustomExcelCell("ADJU\nAmount"));
            header.add(new CustomExcelCell("ADJU\nComm."));
            header.add(new CustomExcelCell("ADJU\nVAT"));
            header.add(new CustomExcelCell("TAX"));
            header.add(new CustomExcelCell("NET Amount"));
            header.add(new CustomExcelCell("Payment Info.\nCurrency"));
            header.add(new CustomExcelCell("Payment Info.\nTotal Amount"));
            header.add(new CustomExcelCell("Payment Info.\nGROSS Amount"));
            header.add(new CustomExcelCell("Payment Info.\nComm. Amount"));
            header.add(new CustomExcelCell("Payment Info.\nComm. VAT"));
            header.add(new CustomExcelCell("Payment Info.\nServ. Fee\nAmount"));
            header.add(new CustomExcelCell("Payment Info.\nServ. Fee\nVAT"));
            header.add(new CustomExcelCell("Payment Info.\nTAX"));
            header.add(new CustomExcelCell("Payment Info.\nNET Amount\nTo receive AM"));
            data.add(header);

            //colores
            Color c1 = new Color(178, 218, 250);
            Color c2 = new Color(252, 246, 220);
            for (A4331STFilter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getPRDA()));
                if (params.getIN_MERCHANT() != null) {
                    row.add(new CustomExcelCell(obj.getPMERCHID()));
                }
                row.add(new CustomExcelCell(obj.getDESC_PROCTYPE()));
                row.add(new CustomExcelCell(obj.getSCOUNTRY()));
                row.add(new CustomExcelCell(obj.getQTYTRN()));
                row.add(new CustomExcelCell(obj.getSCURRENCY()));
                row.add(new CustomExcelCell(obj.getTGROSAMOUN(), c1));
                row.add(new CustomExcelCell(obj.getTGROSAMOUN_WCA(), c1));
                row.add(new CustomExcelCell(obj.getDISCAMOUN(), c1));
                row.add(new CustomExcelCell(obj.getDISCAMOUNI(), c1));
                row.add(new CustomExcelCell(obj.getSERVICEFEE(), c1));
                row.add(new CustomExcelCell(obj.getOVERCOM12(), c1));
                row.add(new CustomExcelCell(obj.getTGROSAMOUN_CB(), c1));
                row.add(new CustomExcelCell(obj.getDISCAMOUN_CB(), c1));
                row.add(new CustomExcelCell(obj.getDISCAMOUNI_CB(), c1));
                row.add(new CustomExcelCell(obj.getADJUSTMENT(), c1));
                row.add(new CustomExcelCell(obj.getDISCAMOUN_ADJ(), c1));
                row.add(new CustomExcelCell(obj.getDISCAMOUNI_ADJ(), c1));
                row.add(new CustomExcelCell(obj.getTAX(), c1));
                row.add(new CustomExcelCell(obj.getNETAMOUN(), c1));
                row.add(new CustomExcelCell(obj.getPCURRENCY(), c2));
                row.add(new CustomExcelCell(obj.getTGROSAMPAY(), c2));
                row.add(new CustomExcelCell(obj.getTGROSAMPAY_WCA(), c2));
                row.add(new CustomExcelCell(obj.getSFEEAMOU(), c2));
                row.add(new CustomExcelCell(obj.getIVACOM12(), c2));
                row.add(new CustomExcelCell(obj.getSERVICFEEP(), c2));
                row.add(new CustomExcelCell(obj.getOVERCOM12P(), c2));
                row.add(new CustomExcelCell(obj.getTAXP(), c2));
                row.add(new CustomExcelCell(obj.getNETOPAY(), c2));
                data.add(row);
            }

            return exportUtils.createCustomExcel(data,
                    "Settlement " + title);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Funciones">
    private static String convertStatus(String stval) {
        String valor = "";
        switch (stval) {
            case "0":
                valor = "Stand By";
                break;
            case "1":
                valor = "Match";
                break;
            case "2":
                valor = "Sales without Settl.";
                break;
            case "3":
                valor = "Settl. without Sales";
                break;
            case "4":
                valor = "Match Partial";
                break;
            case "5":
                valor = "Match Manual";
                break;
            case "6":
                valor = "Match Forced";
                break;
            case "7":
                valor = "Match Compensation";
                break;
            case "8":
                valor = "Match Transaccional";
                break;
            case "9":
                valor = "Match Void";
                break;
            case "A":
                valor = "Match OC/Camepa";
                break;
            case "C":
                valor = "Match Complement";
                break;
            case "D":
                valor = "Match Balance";
                break;
            case "E":
                valor = "Duplicate Payment";
                break;
            case "M":
                valor = "Match Multi-Payment";
                break;    
        }
        return valor;
    }

    private static String convertRegla(String fregla) {
        String valor = "";
        switch (fregla) {
//            case "1":
//                valor = "Ticket";
//                break;
//            case "2":
//                valor = "PNR";
//                break;
//            case "3":
//                valor = "C. Card";
//                break;
//            case "4":
//                valor = "Desg. Manual";
//                break;
//            case "5":
//                valor = "Desg. Transac.";
//                break;
            case "0":
                    valor = "TKT+PNR+IATA+FE+I+T+A";
                    break;
            case "1":
                    valor = "TKT+IATA+FE+I+T+A";
                    break;
            case "2":
                    valor = "TKT+PNR+FE+I+T+A";
                    break;
            case "3":
                    valor = "TKT+FE+I+T+A";
                    break;
            case "4":
                    valor = "PNR+IATA+FE+I+T+A";
                    break;
            case "5":
                    valor = "IATA+FE+I+T+A";
                    break;
            case "6":
                    valor = "PNR+FE+I+T+A";
                    break;
            case "7":
                    valor = "FE+I+T+A";
                    break;
            case "8":
                    valor = "TKT+PNR+FE+I+T";
                    break;
            case "9":
                    valor = "TKT+PNR+FE+ID+T+A";
                    break;
            case "A":
                    valor = "PNR+FE+I+T";
                    break;
            case "B":
                    valor = "PNR+FE+ID+T+A";
                    break;
            case "C":
                    valor = "TKT+FE+I+T";
                    break;
            case "D":
                    valor = "FE+I+T";
                    break;
            case "E":
                    valor = "FE+I+PNR";
                    break;
        }
        return valor;
    }

    private static String convertFcompl(String fcompl) {
        String valor = "";
        switch (fcompl) {
            case "1":
                valor = "Plusgrade";
                break;
            case "2":
                valor = "Ligas";
                break;
            case "3":
                valor = "Tablet";
                break;
            case "4":
                valor = "BPO";
                break;
        }
        return valor;
    }

    private static long restaFechas(String fecha1Str, String fecha2Str) {
        SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyyMMdd");
        Date fecha1 = null;
        Date fecha2 = null;
        try {
            fecha1 = formatoFecha.parse(fecha1Str);
            if (!fecha2Str.trim().isEmpty()) {
                fecha2 = formatoFecha.parse(fecha2Str);
            }
        } catch (ParseException | NullPointerException e) {
        }

        if (fecha1 != null && fecha2 != null) {
            long diferenciaEnMilisegundos = fecha2.getTime() - fecha1.getTime();
            long diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
            return diferenciaEnDias;
        } else {
            return 0;
        }
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Produccion">
    @RequestMapping(value = "loadProductionBp")
    public ResponseEntity<?> loadProductionBp(@ModelAttribute SQP05202Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadProductionBp-------------");
            filter = logic.loadSQP05202Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadProductionBpDetail")
    public ResponseEntity<?> loadProductionBpDetail(@ModelAttribute SQP05203Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:loadProductionBpDetail-------------");
            filter = logic.loadSQP05203Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadProduction")
    public ResponseEntity<?> downloadProduction(@ModelAttribute SQP05247Filter filter) {
        try {
            System.out.println("---------------SalesReconciliationBPO:downloadProduction-------------");
            filter = logic.loadSQP05247Filter(filter);
            System.out.println("Total: " + filter.getResponse().size());
            List<Object[]> data = new ArrayList<>();
            String title = "";

            if (filter.getIN_ORIG().equals("P")) {
                //headers
                Object[] headers = new Object[18];
                headers[0] = "Worked Date";
                headers[1] = "Worked Hour";
                headers[2] = "Username";
                headers[3] = "Doc. Type";
                headers[4] = "Processor";
                headers[5] = "Country";
                headers[6] = "Processing Date";
                headers[7] = "Status";
                headers[8] = "Card Number";
                headers[9] = "Auth Code";
                headers[10] = "Amount";
                headers[11] = "Currency";
                headers[12] = "PNR";
                headers[13] = "Qty Tkts";
                headers[14] = "Ticket";
                headers[15] = "Reference Number";
                headers[16] = "Adjustment";
                headers[17] = "BPO Comment";
                data.add(headers);
                for (Object line : filter.getResponse()) {
                    A4331Filter obj = (A4331Filter) line;
                    Object[] row = new Object[18];
                    row[0] = obj.getFeup();
                    row[1] = obj.getHoup();
                    row[2] = obj.getUsup();
                    row[3] = obj.getTranstype();
                    row[4] = obj.getDESC_PROCTYPE();
                    row[5] = obj.getScountry();
                    row[6] = obj.getPrda();
                    row[7] = convertStatus(obj.getStval());
                    row[8] = obj.getScardn();
                    row[9] = obj.getSauthoc();
                    row[10] = obj.getTgrosamoun();
                    row[11] = obj.getScurrency();
                    row[12] = obj.getSpnr();
                    row[13] = obj.getQtytkt();
                    row[14] = obj.getTicket();
                    row[15] = obj.getArefnbr();
                    row[16] = obj.getCodadju();
                    row[17] = obj.getBPOCOMENT();
                    data.add(row);
                }
                title = controllerName + " - ByPayment Production ";
            } else {
                //headers
                Object[] headers = new Object[17];
                headers[0] = "Worked Date";
                headers[1] = "Worked Hour";
                headers[2] = "Username";
                headers[3] = "Doc. Type";
                headers[4] = "Processor";
                headers[5] = "Country";
                headers[6] = "Sale Date";
                headers[7] = "Status";
                headers[8] = "Card Number";
                headers[9] = "Auth Code";
                headers[10] = "Amount";
                headers[11] = "Currency";
                headers[12] = "PNR";
                headers[13] = "Card Type";
                headers[14] = "Ticket";
                headers[15] = "BPO Comment";
                headers[16] = "ADM Comment";
                data.add(headers);
                for (Object line : filter.getResponse()) {
                    A4496Filter obj = (A4496Filter) line;
                    Object[] row = new Object[17];
                    row[0] = obj.getA4501FEUP();
                    row[1] = obj.getA4501HOUP();
                    row[2] = obj.getA4501USUP();
                    row[3] = obj.getA4496TRNCU();
                    row[4] = obj.getDESC_PROCTYPE();
                    row[5] = obj.getA4496PAIS();
                    row[6] = obj.getA4496FECVT();
                    row[7] = convertStatus(obj.getA4501STVAL());
                    row[8] = obj.getA4501NREF();
                    row[9] = obj.getA4501CAPL();
                    row[10] = obj.getA4501VFOP();
                    row[11] = obj.getA4501MFOP();
                    row[12] = obj.getA4496PNR();
                    row[13] = obj.getDESC_TARJ();
                    row[14] = obj.getTICKET();
                    row[15] = obj.getBPO_COMEN().trim().isEmpty()
                            ? obj.getBPO_COMEN2()
                            : obj.getBPO_COMEN();
                    row[16] = obj.getADM_COMEN();
                    data.add(row);
                }
                title = controllerName + " - ByTicket Production ";
            }

            return exportUtils.createExcel(data, title + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Credit Card Filter">
    @RequestMapping(value = "loadCreditCardFilter")
    public ResponseEntity<?> loadCreditCardFilter(@ModelAttribute SQP05206Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadCreditCardFilter-------------");
        try {
            SQP05206Filter filter = logic.loadSQP05206Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Mantenimiento Tarjetas">
    @RequestMapping(value = "loadTicket")
    public ResponseEntity<?> loadTicket(@ModelAttribute SQP05217Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadTicket-------------");
        try {
            SQP05217Filter filter = logic.loadSQP05217Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadFopInformation")
    public ResponseEntity<?> loadFopInformation(@ModelAttribute SQP05218Filter params) {
        System.out.println("---------------SalesReconciliationBPO:loadFopInformation-------------");
        try {
            SQP05218Filter filter = logic.loadSQP05218Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "insertTicketRecord", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loadFopInformation(@RequestBody SQP05219Filter params) {
        System.out.println("---------------SalesReconciliationBPO:insertTicketRecord-------------");
        try {
            logic.loadSQP05219Filter(params);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Batch Manual">
    @RequestMapping(value = "processBatchInformation")
    public ResponseEntity<?> processBatchInformation(@ModelAttribute SQP05302Filter params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:processBatchInformation-------------");
        logic.loadSQP05302Filter(params);
        Map map = Collections.singletonMap("message", "Proceso Ejecutandose");
        return ResponseUtils.ok(map);
    }
    
    @RequestMapping(value = "loadBatchInformation")
    public ResponseEntity<?> loadBatchInformation(@ModelAttribute SQP05319Filter params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:loadBatchInformation-------------");
        SQP05319Filter filter = logic.loadSQP05319Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadBatchLog")
    public ResponseEntity<?> loadBatchLog(@ModelAttribute SQP05310Filter params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:loadBatchInformation-------------");
        SQP05310Filter filter = logic.loadSQP05310Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadBatchLogInfo")
    public ResponseEntity<?> loadBatchLogInfo(@ModelAttribute SQP05311Filter params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:loadBatchInformation-------------");
        SQP05311Filter filter = logic.loadSQP05311Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "autoMatchManual", method = RequestMethod.POST)
    public ResponseEntity<?> autoMatchManual(@Valid @RequestBody SQP05307Filter params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:autoMatchManual-------------");
        SQP05307Filter filter = logic.loadSQP05307Filter(params);
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "masiveAutoMatchManual", method = RequestMethod.POST)
    public ResponseEntity<?> masiveAutoMatchManual(@RequestBody List<SQP05307Filter> params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:masiveAutoMatchManual-------------");
        logic.loadMasiveSQP05307Filter(params);
        Map map = Collections.singletonMap("message", "Proceso Ejecutandose");
        return ResponseUtils.ok(map);
    }
    
    @RequestMapping(value = "runAutomaticConciliation", method = RequestMethod.POST)
    public ResponseEntity<?> runAutomaticConciliation(@RequestBody SQP05304Filter params) throws Exception {
        System.out.println("---------------SalesReconciliationBPO:runAutomaticConciliation-------------");
        ModelMap map = logic.loadSQP05304Filter(params);
        return ResponseUtils.ok(map);
    }
//</editor-fold>

// ticket sabre status
    @RequestMapping(value = "downloadByTicketDetailv2")
        public ResponseEntity<?> downloadByTicketDetailv2(@ModelAttribute SQP05709Filter params) {
            try {
                System.out.println("---------------SabreTicketStatus:downloadByTicketDetailv2-------------");
                SQP05709Filter filter = logic.loadSQP05709Filter(params);
                System.out.println("Total: " + filter.getResponse().size());
                List<Object[]> data = new ArrayList<>();
                // headers
                Object[] headers = new Object[30];
                headers[0] = "Sale Date";
                headers[1] = "IATA";
                headers[2] = "Source";
                headers[3] = "Channel";
                headers[4] = "Country";
                headers[5] = "Agent";
                headers[6] = "Trnx";
                headers[7] = "Doc. Type";
                headers[8] = "Void";
                headers[9] = "RFIC";
                headers[10] = "RFIS";
                headers[11] = "Pax Name";
                headers[12] = "Ticket";
                headers[13] = "PNR";
                headers[14] = "Card Type";
                headers[15] = "Card Code";
                headers[16] = "Card Number";
                headers[17] = "Auth Code";
                headers[18] = "Amount";
                headers[19] = "Currency";
                headers[20] = "Reconciliation Amount";
                headers[21] = "Difference Amount";
                headers[22] = "Expected Date";
                headers[23] = "Payment Date";
                headers[24] = "Difference";
                headers[25] = "Processing Date";
                headers[26] = "Status";
                headers[27] = "Processor";
                headers[28] = "ADM St.";
                headers[29] = "BPO Comment";
                data.add(headers);
                for (A4496Filter obj : filter.getResponse()) {
                    Object[] row = new Object[30];
                    row[0] = obj.getA4496FECVT();
                    row[1] = obj.getA4496AGENT();
                    row[2] = obj.getA4496FUENT();
                    row[3] = obj.getA4496SFUEN();
                    row[4] = obj.getA4496PAIS();
                    row[5] = obj.getA4496CODAG();
                    row[6] = obj.getA4496TRNCU();
                    row[7] = obj.getA4496TIPOD();
                    row[8] = obj.getA4496TKVOI();
                    row[9] = obj.getA4496RFIC();
                    row[10] = obj.getA4496RFIS1();
                    row[11] = obj.getA4496PAX();
                    row[12] = obj.getA4496CIA() + obj.getA4496FORMA() + obj.getA4496SERIE();
                    row[13] = obj.getA4496PNR();
                    row[14] = obj.getCARDTYPE();
                    row[15] = obj.getA4501TTARJ();
                    row[16] = obj.getA4501NREF();
                    row[17] = obj.getA4501CAPL();
                    row[18] = obj.getA4501VFOP();
                    row[19] = obj.getA4501MFOP();
                    row[20] = obj.getRECONCILIATION_AMOUNT();
                    row[21] = obj.getDIFFERENCE_AMOUNT();
                    row[22] = obj.getPROCDATE();
                    row[23] = obj.getPAYDATE();
                    row[24] = restaFechas(obj.getPROCDATE(), obj.getPAYDATE());
                    row[25] = obj.getA4501PRDA();
                    row[26] = convertStatus(obj.getA4501STVAL());
                    row[27] = obj.getDESC_PROCTYPE();
                    row[28] = obj.getA4501STADM();
                    if (obj.getA4501STADM().trim().isEmpty()) {
                        row[29] = !obj.getBPO_COMEN2().isEmpty() ? obj.getBPO_COMEN2() : obj.getBPO_COMEN();
                    } else {
                        row[29] = obj.getADM_COMEN();
                    }
                    data.add(row);
                }
                return exportUtils.createExcel(data, "Payments - SabreTicketStatus " + Functions.getFechaActual());
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

}
