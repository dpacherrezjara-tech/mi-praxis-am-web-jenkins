package net.miatech.praxis.controllers.payments;

import java.awt.Color;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.AccountingTransactionLogic;
import net.miatech.praxis.payment.filter.A4183Filter;
import net.miatech.praxis.payment.filter.A4183DetailAccounting;
import net.miatech.utils.CustomExcelCell;
import net.miatech.praxis.payment.filter.A4331AT1Filter;
import net.miatech.praxis.payment.filter.A4331AT2Filter;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05036Filter;
import net.miatech.praxis.payment.filter.SQP05037Filter;
import net.miatech.praxis.payment.filter.SQP05041Filter;
import net.miatech.praxis.payment.filter.SQP05042Filter;
import net.miatech.praxis.payment.filter.SQP05043Filter;
import net.miatech.praxis.payment.filter.SQP05724Filter;
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

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingTransaction")
public class AccountingTransactionController {

    @Autowired
    private AccountingTransactionLogic logic;
    private static final String controllerName = "Accounting Transaction";

    @Autowired
    private ExportUtils exportUtils;

    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters(ModelMap model) {
        try {
            System.out.println("*******************Accounting Transaction: loadFilters*********************");
            SQP05004Filter procesadores = new SQP05004Filter();
            procesadores.setKEY1("PR");
            model.put("lstProcs", logic.getSQP05004Filter(procesadores).getLst());
            model.put("monedas", logic.getMonedas());
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadSummary")
    public ResponseEntity<?> loadSummary(@ModelAttribute SQP05036Filter filter) {
        try {
            System.out.println("*******************Accounting Transaction: loadSummary*********************");
            return new ResponseEntity<>(logic.getSQP05036Filter(filter), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadSummaryTree")
    public ResponseEntity<?> loadSummaryTree(@ModelAttribute SQP05037Filter params) {
        try {
            System.out.println("*******************Accounting Transaction: loadSummaryTree*********************");
            SQP05037Filter filter = logic.getSQP05037Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            return new ResponseEntity<>(filter, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadSummaryTreeDetail")
    public ResponseEntity<?> loadSummaryTreeDetail(@ModelAttribute SQP05041Filter filter) {
        try {
            System.out.println("*******************Accounting Transaction: loadSummaryTreeDetail*********************");
            return new ResponseEntity<>(logic.getSQP05041Filter(filter), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadDetailAccounted")
    public ResponseEntity<?> loadDetailAccounted(@ModelAttribute SQP05042Filter filter) {
        try {
            System.out.println("*******************Accounting Transaction: loadDetailAccounted*********************");
            return new ResponseEntity<>(logic.getSQP05042Filter(filter), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "loadDetailTickets")
    public ResponseEntity<?> loadDetailTickets(@ModelAttribute SQP05043Filter filter) {
        try {
            System.out.println("*******************Accounting Transaction: loadDetailTickets*********************");
            return new ResponseEntity<>(logic.getSQP05043Filter(filter), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadSummary")
    public ResponseEntity<?> downloadSummary(@ModelAttribute SQP05036Filter params) {
        try {
            System.out.println("---------------Accounting Transaction:downloadSummary-------------");
            SQP05036Filter filter = logic.getSQP05036Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            //headers
            List<CustomExcelCell> headers = new ArrayList<>();
            if (params.getIN_TFECHA().equals("P")) {
                headers.add(new CustomExcelCell("Processing\nDate"));
            } else {
                headers.add(new CustomExcelCell("Sale Date"));
            }
            headers.add(new CustomExcelCell("Processor"));
            headers.add(new CustomExcelCell("Currency"));
            headers.add(new CustomExcelCell("Match"));
            headers.add(new CustomExcelCell("Qty\nMatch"));
            headers.add(new CustomExcelCell("Pending"));
            headers.add(new CustomExcelCell("Qty\nPending"));
            headers.add(new CustomExcelCell("Total"));
            headers.add(new CustomExcelCell("Qty\nTotal"));
            data.add(headers);

            for (A4331AT1Filter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getFECHA()));
                row.add(new CustomExcelCell(obj.getPROC_DESC()));
                row.add(new CustomExcelCell(obj.getScurrency()));
                row.add(new CustomExcelCell(obj.getACCOUNTED()));
                row.add(new CustomExcelCell(obj.getQTY_ACCOUNTED()));
                row.add(new CustomExcelCell(obj.getPENDING()));
                row.add(new CustomExcelCell(obj.getQTY_PENDING()));
                row.add(new CustomExcelCell(obj.getTOTAL()));
                row.add(new CustomExcelCell(obj.getQTY_TOTAL()));
                data.add(row);
            }
            
            return exportUtils.createCustomExcel(data, controllerName + " - Summary " + params.getFECHA_FROM());
//            return exportUtils.createCustomExcel(data, controllerName + " - Summary " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadSummaryTree")
    public ResponseEntity<?> downloadSummaryTree(@ModelAttribute SQP05037Filter params) {
        try {
            System.out.println("---------------Accounting Transaction:downloadSummaryTree-------------");
            SQP05037Filter filter = logic.getSQP05037Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            //headers
            List<CustomExcelCell> headers = new ArrayList<>();
            if (params.getIN_TFECHA().equals("P")) {
                headers.add(new CustomExcelCell("Processing\nDate"));
                headers.add(new CustomExcelCell("FLEX ID"));
                headers.add(new CustomExcelCell("PRAXIS ID"));
            } else {
                headers.add(new CustomExcelCell("Sale Date"));
                headers.add(new CustomExcelCell("PRAXIS ID"));
                headers.add(new CustomExcelCell("FLEX ID"));
            }
            headers.add(new CustomExcelCell("Processor"));
            headers.add(new CustomExcelCell("Currency"));
            headers.add(new CustomExcelCell("Match"));
            headers.add(new CustomExcelCell("Qty\nMatch"));
            headers.add(new CustomExcelCell("Pending"));
            headers.add(new CustomExcelCell("Qty\nPending"));
            headers.add(new CustomExcelCell("Total"));
            headers.add(new CustomExcelCell("Qty\nTotal"));
            data.add(headers);

            //colores
            Color c1 = new Color(51, 204, 255);
            Color c2 = new Color(102, 255, 102);

            for (A4331AT2Filter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getFECHA()));
                if (params.getIN_TFECHA().equals("P")) {
                    row.add(new CustomExcelCell(obj.getIDFLEX(),
                            c1));
                    row.add(new CustomExcelCell(obj.getPRAXISID(),
                            c2));
                } else {
                    row.add(new CustomExcelCell(obj.getPRAXISID(),
                            c1));
                    row.add(new CustomExcelCell(obj.getIDFLEX(),
                            c2));
                }
                row.add(new CustomExcelCell(obj.getPROC_DESC()));
                row.add(new CustomExcelCell(params.getIN_MDA()));
                row.add(new CustomExcelCell(obj.getACCOUNTED()));
                row.add(new CustomExcelCell(obj.getQTY_ACCOUNTED()));
                row.add(new CustomExcelCell(obj.getPENDING()));
                row.add(new CustomExcelCell(obj.getQTY_PENDING()));
                row.add(new CustomExcelCell(obj.getTOTAL()));
                row.add(new CustomExcelCell(obj.getQTY_TOTAL()));
                data.add(row);
            }
            
            return exportUtils.createCustomExcel(data, controllerName + " - SummaryTree " + params.getFECHA_FROM());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadSummaryTreeDetail")
    public ResponseEntity<?> downloadSummaryTreeDetail(@ModelAttribute SQP05041Filter params) {
        try {
            System.out.println("---------------Accounting Transaction:downloadSummaryTreeDetail-------------");
            SQP05041Filter filter = logic.getSQP05041Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            //headers
            List<CustomExcelCell> headers = new ArrayList<>();
            if (params.getIN_TFECHA().equals("P")) {
                headers.add(new CustomExcelCell("Processing\nDate"));
            } else {
                headers.add(new CustomExcelCell("Sale\nDate"));
            }
            headers.add(new CustomExcelCell("Doc. Type"));
            headers.add(new CustomExcelCell("Status"));
            headers.add(new CustomExcelCell("Flex ID"));
            headers.add(new CustomExcelCell("PRAXIS ID"));
            headers.add(new CustomExcelCell("Date"));
            headers.add(new CustomExcelCell("Acc. Status"));
            headers.add(new CustomExcelCell("Card Number"));
            headers.add(new CustomExcelCell("Auth\nCode"));
            if (params.getIN_TFECHA().equals("P")) {
                headers.add(new CustomExcelCell("Sale\nDate"));
            } else {
                headers.add(new CustomExcelCell("Processing\nDate"));
            }
            headers.add(new CustomExcelCell("Currency"));
            headers.add(new CustomExcelCell("Transaction\nAmount"));
            headers.add(new CustomExcelCell("PNR"));
            headers.add(new CustomExcelCell("Qty\nTkts"));
            headers.add(new CustomExcelCell("Ticket Nbr"));
            data.add(headers);

            //colores
            Color c1 = new Color(128, 236, 117);
            //Color c2 = new Color(102, 255, 102);

            for (A4331Filter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                if (params.getIN_TFECHA().equals("P")) {
                    row.add(new CustomExcelCell(obj.getPrda()));
                } else {
                    row.add(new CustomExcelCell(obj.getSdate()));
                }
                row.add(new CustomExcelCell(obj.getTranstype()));
                row.add(new CustomExcelCell(formatStval(obj.getStval())));
                row.add(new CustomExcelCell(obj.getIDFLEX(), c1));
                row.add(new CustomExcelCell(obj.getPRAXISID(), c1));
                row.add(new CustomExcelCell(obj.getFcontl(), c1));
                row.add(new CustomExcelCell(formatStcon(obj.getStconl()), c1));
                row.add(new CustomExcelCell(obj.getScardn()));
                row.add(new CustomExcelCell(obj.getSauthoc()));
                if (params.getIN_TFECHA().equals("P")) {
                    row.add(new CustomExcelCell(obj.getSdate()));
                } else {
                    row.add(new CustomExcelCell(obj.getPrda()));
                }
                row.add(new CustomExcelCell(obj.getScurrency()));
                row.add(new CustomExcelCell(obj.getTgrosamoun()));
                row.add(new CustomExcelCell(obj.getSpnr()));
                row.add(new CustomExcelCell(obj.getQtytkt()));
                row.add(new CustomExcelCell(obj.getTicket()));
                data.add(row);
            }
            return exportUtils.createCustomExcel(data, controllerName + " - SummaryDetail " + params.getFECHA_FROM());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadDetailAccounted")
    public ResponseEntity<?> downloadDetailAccounted(@ModelAttribute SQP05042Filter params) {
        try {
            System.out.println("---------------Accounting Transaction:downloadDetailAccounted-------------");
            SQP05042Filter filter = logic.getSQP05042Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            //headers
            List<CustomExcelCell> headers = new ArrayList<>();
            headers.add(new CustomExcelCell("Ticket"));
            headers.add(new CustomExcelCell("Mode"));
            headers.add(new CustomExcelCell("SRC"));
            headers.add(new CustomExcelCell("Sub\nSRC"));
            headers.add(new CustomExcelCell("FOP"));
            headers.add(new CustomExcelCell("CPN"));
            headers.add(new CustomExcelCell("SEQ"));
            headers.add(new CustomExcelCell("Settlement\nDate"));
            headers.add(new CustomExcelCell("Settlement\nPeriod"));
            headers.add(new CustomExcelCell("Account Number"));
            headers.add(new CustomExcelCell("LOC\nCurr"));
            headers.add(new CustomExcelCell("LOC\nDebit"));
            headers.add(new CustomExcelCell("LOC\nCredit"));
            headers.add(new CustomExcelCell("Concept"));
            headers.add(new CustomExcelCell("Client"));
            headers.add(new CustomExcelCell("Provider"));
            headers.add(new CustomExcelCell("Jornal Entry"));
            data.add(headers);

            //colores
            //Color c1 = new Color(128, 236, 117);
            for (A4183Filter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getA4183cia() + obj.getA4183forma() + obj.getA4183serie()));
                row.add(new CustomExcelCell(obj.getA4183modo()));
                row.add(new CustomExcelCell(obj.getA4183fuent()));
                row.add(new CustomExcelCell(obj.getA4183subfu()));
                row.add(new CustomExcelCell(obj.getA4183fp()));
                row.add(new CustomExcelCell(obj.getA4183cupon()));
                row.add(new CustomExcelCell(obj.getA4183seq()));
                row.add(new CustomExcelCell(obj.getA4183fpro()));
                row.add(new CustomExcelCell(obj.getA4183fcont()));
               // row.add(new CustomExcelCell(obj.getA4183cuent()));
                row.add(new CustomExcelCell(obj.getACCOUNT()));
                row.add(new CustomExcelCell(obj.getA4183cur()));
                row.add(new CustomExcelCell(obj.getA4183activ()));
                row.add(new CustomExcelCell(obj.getA4183pasiv()));
                row.add(new CustomExcelCell(obj.getA4183titu()));
                row.add(new CustomExcelCell(obj.getA4183clien()));
                row.add(new CustomExcelCell(obj.getA4183prov()));
                row.add(new CustomExcelCell(obj.getA4183idcon()));
                data.add(row);
            }
            return exportUtils.createCustomExcel(data, controllerName + " - Detail Accounted " + params.getIN_PRDA());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  
    @RequestMapping(value = "downloadDetailTickets")
    public ResponseEntity<?> downloadDetailTickets(@ModelAttribute SQP05043Filter params) {
        try {
            System.out.println("*******************Accounting Transaction: downloadDetailTickets*********************");
            SQP05043Filter filter = logic.getSQP05043Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            //headers
            List<CustomExcelCell> headers = new ArrayList<>();
            headers.add(new CustomExcelCell("Payment\nDate"));
            headers.add(new CustomExcelCell("Status"));
            headers.add(new CustomExcelCell("Ticket"));
            headers.add(new CustomExcelCell("Seq"));
            headers.add(new CustomExcelCell("Card Number"));
            headers.add(new CustomExcelCell("Auth"));
            headers.add(new CustomExcelCell("PNR"));
            headers.add(new CustomExcelCell("Sale\nDate"));
            headers.add(new CustomExcelCell("Currency"));
            headers.add(new CustomExcelCell("Total\nSale Amount"));
            headers.add(new CustomExcelCell("Amount\nTransaction"));
            headers.add(new CustomExcelCell("Acc. Sales\nDate"));
            headers.add(new CustomExcelCell("Acc. Sales\nID"));
            headers.add(new CustomExcelCell("Acc. Settl.\nDate"));
            headers.add(new CustomExcelCell("Acc. Settl.\nID"));
            headers.add(new CustomExcelCell("Acc. Settl.\nStatus"));
            data.add(headers);

            //colores
            //Color c1 = new Color(128, 236, 117);
            for (A4335Filter obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getPaydate()));
                row.add(new CustomExcelCell(formatStval(obj.getStval())));
                row.add(new CustomExcelCell(obj.getTKT()));
                row.add(new CustomExcelCell(obj.getSeq()));
                row.add(new CustomExcelCell(obj.getScardn()));
                row.add(new CustomExcelCell(obj.getSauthoc()));
                row.add(new CustomExcelCell(obj.getSpnr()));
                row.add(new CustomExcelCell(obj.getSdate()));
                row.add(new CustomExcelCell(obj.getScurrency()));
                row.add(new CustomExcelCell(obj.getSVFOPS_TOTAL()));
                row.add(new CustomExcelCell(obj.getSvfops()));
                row.add(new CustomExcelCell(obj.getFcont()));
                row.add(new CustomExcelCell(obj.getIdcon()));
                row.add(new CustomExcelCell(obj.getLIQ_FCON()));
                row.add(new CustomExcelCell(obj.getLIQ_IDCON()));
                row.add(new CustomExcelCell(formatStcon(obj.getLIQ_STCON())));
                data.add(row);
            }
            return exportUtils.createCustomExcel(data, controllerName + " - Detail Tickets " + Functions.getFechaActual());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadAllDetailAccounted")
    public ResponseEntity<?> downloadAllDetailAccounted(@ModelAttribute SQP05724Filter params) {
        try {
            System.out.println("*******************Accounting Transaction: downloadAllDetailAccounted*********************");
            SQP05724Filter filter = logic.getSQP05724Filter(params);
            System.out.println("Total: " + filter.getResponse().size());
            List<List<CustomExcelCell>> data = new ArrayList<>();
            //headers
            List<CustomExcelCell> headers = new ArrayList<>();
            headers.add(new CustomExcelCell("Ticket"));
            headers.add(new CustomExcelCell("File Type"));
            headers.add(new CustomExcelCell("Mode"));
            headers.add(new CustomExcelCell("SRC"));
            headers.add(new CustomExcelCell("Sub\nSRC"));
            headers.add(new CustomExcelCell("FOP"));
            headers.add(new CustomExcelCell("CPN"));
            headers.add(new CustomExcelCell("SEQ"));
            headers.add(new CustomExcelCell("Settlement Date"));
            headers.add(new CustomExcelCell("Accounting Date"));
            headers.add(new CustomExcelCell("Account Number"));
            headers.add(new CustomExcelCell("Currency"));
            headers.add(new CustomExcelCell("Debit"));
            headers.add(new CustomExcelCell("Credit"));
            headers.add(new CustomExcelCell("Code Concept"));
            headers.add(new CustomExcelCell("Description Concept"));
            headers.add(new CustomExcelCell("Client"));
            headers.add(new CustomExcelCell("PNR"));
            headers.add(new CustomExcelCell("Provider"));
            headers.add(new CustomExcelCell("Praxis ID"));
            headers.add(new CustomExcelCell("Flex ID"));
            headers.add(new CustomExcelCell("Reference Number"));
            headers.add(new CustomExcelCell("Processor"));
            data.add(headers);

            for (A4183DetailAccounting obj : filter.getResponse()) {
                List<CustomExcelCell> row = new ArrayList<>();
                row.add(new CustomExcelCell(obj.getTICKET()));
                row.add(new CustomExcelCell(obj.getFILETYPE()));
                row.add(new CustomExcelCell(obj.getA4183modo()));
                row.add(new CustomExcelCell(obj.getA4183fuent()));
                row.add(new CustomExcelCell(obj.getA4183subfu()));
                row.add(new CustomExcelCell(obj.getA4183fp()));
                row.add(new CustomExcelCell(obj.getA4183cupon()));
                row.add(new CustomExcelCell(obj.getA4183seq()));
                row.add(new CustomExcelCell(obj.getA4183ffile()));
                row.add(new CustomExcelCell(obj.getA4183fcont()));
                row.add(new CustomExcelCell(obj.getA4183cuent()));
                row.add(new CustomExcelCell(obj.getA4183cur()));
                row.add(new CustomExcelCell(obj.getA4183activ()));
                row.add(new CustomExcelCell(obj.getA4183pasiv()));
                row.add(new CustomExcelCell(obj.getA4183orig()));
                row.add(new CustomExcelCell(obj.getA4183titu()));
                row.add(new CustomExcelCell(obj.getA4183clien()));
                row.add(new CustomExcelCell(obj.getA4183cope()));
                row.add(new CustomExcelCell(obj.getA4183prov()));
                row.add(new CustomExcelCell(obj.getA4183idcon()));
                row.add(new CustomExcelCell(obj.getA4183idfle()));
                row.add(new CustomExcelCell(obj.getA4183AREFN()));
                row.add(new CustomExcelCell(obj.getPROCESSOR_DESCRIPTION()));
                data.add(row);
            }
            return exportUtils.createCustomExcel(data, controllerName + " - All Detail Accounting " + params.getFECHA_FROM());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //<editor-fold defaultstate="collapsed" desc="Formateo de Columnas">
    private static String formatStcon(String stcon) {
        String value = "";
        switch (stcon.trim()) {
            case "":
                value = "Pending";
                break;
            case "1":
                value = "Accounted";
                break;
            default:
                value = "Debug";
        }
        return value;
    }

    private static String formatStval(String stval) {
        String value = "";
        List<String> listaValores = new ArrayList<>();
        listaValores.add("1");
        listaValores.add("5");
        listaValores.add("6");
        listaValores.add("7");

        if (listaValores.contains(stval)) {
            value = "Match";
        } else {
            value = "Pending";
        }
        return value;
    }
    //</editor-fold>
}
