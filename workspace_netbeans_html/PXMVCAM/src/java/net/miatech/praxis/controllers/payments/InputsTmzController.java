package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.InputsTmzLogic;
import net.miatech.praxis.payment.entities.A4305;
import net.miatech.praxis.payment.entities.A4344;
import net.miatech.praxis.payment.entities.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
import net.miatech.praxis.payment.filter.SQP04974Filter;
import net.miatech.praxis.payment.filter.SQP04975Filter;
import net.miatech.praxis.payment.filter.SQP04976Filter;
import net.miatech.praxis.payment.filter.SQP05033Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/InputsTmz")
public class InputsTmzController {

    @Autowired
    private InputsTmzLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    //<editor-fold defaultstate="collapsed" desc="convierte obj">
    private <T> T parseObject(Map<String, Object> params, Class<T> clazz)
            throws InstantiationException, IllegalAccessException {
        //T instance = clazz.newInstance();
        Gson gson = new Gson();
        T filter = (T) gson.fromJson(gson.toJson(params), clazz);
        return filter;
    }
    //</editor-fold>

    @RequestMapping(value = "getInfoCombos")
    public ResponseEntity<?> getInfoCombo(@RequestParam Map<String, Object> params) {
        try {
            SQP04971Filter filter = this.parseObject(params, SQP04971Filter.class);
            SQP04971Filter res = logic.getSQP04971Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getInfoCombos: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getCalendarInfo")
    public ResponseEntity<?> getCalendarInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04972Filter filter = this.parseObject(params, SQP04972Filter.class);
            List<CalendarTmz> res = logic.getSQP04972Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getCalendarInfo: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getDetailSummaryInfo")
    public ResponseEntity<?> getDetailSummaryInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04974Filter filter = this.parseObject(params, SQP04974Filter.class);
            List<SQP04974Filter> res = logic.getSQP04974Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getDetailSummaryInfo: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getCalendarFechaInfo")
    public ResponseEntity<?> getCalendarFechaInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04975Filter filter = this.parseObject(params, SQP04975Filter.class);
            List<SQP04975Filter> res = logic.getSQP04975Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getCalendarFechaInfo: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getDataGridInfo")
    public ResponseEntity<?> getDataGridInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04976Filter filter = new SQP04976Filter(); //this.parseObject(params, SQP04976Filter.class);
            filter.setFECHA_FROM(params.get("FECHA_FROM").toString());
            filter.setPROCESADOR(params.get("PROCESADOR").toString());
            filter.setTIPO(params.get("TIPO").toString());
            filter.setLimit(params.get("limit") == null ? null : Integer.parseInt(params.get("limit").toString()));
            filter.setStart(params.get("start") == null ? null : Integer.parseInt(params.get("start").toString()));
            //Boolean excel = false;//filter.getExcel()== null? false:filter.getExcel();
            Boolean excel = params.get("excel") == null ? false : true;
            if (!excel) {
                filter.getPage().PAGROW = 20;
                Integer start = filter.getStart();
                start = (start != 0 ? start : 0);
                filter.getPage().PAGNUM = (start / filter.getPage().PAGROW) + 1;
            } else {
                filter.getPage().PAGROW = -1;
                filter.getPage().PAGNUM = 1;
            }
            SQP04976Filter res = logic.getSQP04976Filter(filter);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en getDataGridInfo: " + e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "getDataGridCInfo")
    public ResponseEntity<?> getDataGridCInfo(@ModelAttribute SQP05033Filter filter) {
        try {
            System.out.println("*************************** Inputs TMZ: getDataGridCInfo ****************************");
            return new ResponseEntity<>(logic.getSQP05033Filter(filter), HttpStatus.OK);
        } catch (Exception e) {
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadProcessorsInfo")
    public ResponseEntity<byte[]> downloadProcessorsInfo(@RequestParam Map<String, Object> params) {
        try {
            SQP04976Filter filter = new SQP04976Filter(); //this.parseObject(params, SQP04976Filter.class);
            filter.setFECHA_FROM(params.get("FECHA_FROM").toString());
            filter.setPROCESADOR(params.get("PROCESADOR").toString());
            filter.setTIPO(params.get("TIPO").toString());
            filter.setLimit(params.get("limit") == null ? null : Integer.parseInt(params.get("limit").toString()));
            filter.setStart(params.get("start") == null ? null : Integer.parseInt(params.get("start").toString()));
            //Boolean excel = false;//filter.getExcel()== null? false:filter.getExcel();
            Boolean excel = params.get("excel") == null ? false : true;
            if (!excel) {
                filter.getPage().PAGROW = 20;
                Integer start = filter.getStart();
                start = (start != 0 ? start : 0);
                filter.getPage().PAGNUM = (start / filter.getPage().PAGROW) + 1;
            } else {
                filter.getPage().PAGROW = -1;
                filter.getPage().PAGNUM = 1;
            }
            SQP04976Filter res = logic.getSQP04976Filter(filter);

            ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
            if (filter.getTIPO().equals("0")) {
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[24];
                header[0] = "Seq";
                header[1] = "Grupo";
                header[2] = "Procesador";
                header[3] = "Fecha de Proceso";
                header[4] = "Territorio";
                header[5] = "Pais";
                header[6] = "Merch ID";
                header[7] = "Merch Liq Pago";
                header[8] = "Merch ID Party";
                header[9] = "Merch Pago Party";
                header[10] = "Fecha de Transaccion";
                header[11] = "Num. Tarjeta";
                header[12] = "Num. Autorizacion";
                header[13] = "Num. Cuotas";
                header[14] = "Total Cuotas";
                header[15] = "Plan de Pagos";
                header[16] = "Cia";
                header[17] = "Documento";
                header[18] = "Dig. Chequeo";
                header[19] = "PNR";
                header[20] = "Cod. Razon";
                header[21] = "Subc. Razon";
                header[22] = "Agente";
                header[23] = "Pais Venta";
                data.add(header);

                for (A4305 obj : res.getLstReceived()) {
                    Object[] row = new Object[24];
                    row[0] = obj.getRN();
                    row[1] = obj.getA4305GRUPO();
                    row[2] = obj.getA4305PROCE();
                    row[3] = obj.getA4305PRDA();
                    row[4] = obj.getA4305TERRI();
                    row[5] = obj.getA4305PAIS();
                    row[6] = obj.getA4305MERID();
                    row[7] = obj.getA4305MERPG();
                    row[8] = obj.getA4305MERPI();
                    row[9] = obj.getA4305MERPP();
                    row[10] = obj.getA4305FECTR();
                    row[11] = obj.getA4305NUMTJ();
                    row[12] = obj.getA4305NUMAT();
                    row[13] = obj.getA4305NUMCU();
                    row[14] = obj.getA4305TOTCU();
                    row[15] = obj.getA4305PLANP();
                    row[16] = obj.getA4305CIA();
                    row[17] = obj.getA4305FORMA() + obj.getA4305SERIE();
                    row[18] = obj.getA4305DCHEQ();
                    row[19] = obj.getA4305PNR();
                    row[20] = obj.getA4305RFIC();
                    row[21] = obj.getA4305RFIS();
                    row[22] = obj.getA4305IATA();
                    row[23] = obj.getA4305PAIS();
                    data.add(row);
                }
                response = exportUtils.createExcel(data, "Received - " + filter.getPROCESADOR() + filter.getFECHA_FROM());
            } else if (filter.getTIPO().equals("1")) {
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[5];
                header[0] = "RN";
                header[1] = "Procesador";
                header[2] = "Carrier";
                header[3] = "Max Long";
                header[4] = "Fecha de Proceso";
                data.add(header);

                for (A4344 obj : res.getLstLoaded()) {
                    Object[] row = new Object[5];
                    row[0] = obj.getRN();
                    row[1] = obj.getPROCESADOR();
                    row[2] = obj.getCXRRNUM();
                    row[3] = obj.getTAMMAXLONG();
                    row[4] = obj.getTRADM();
                    data.add(row);
                }
                response = exportUtils.createExcel(data, "Loaded - " + filter.getPROCESADOR() + filter.getFECHA_FROM());
            } else {
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[24];
                header[0] = "Seq";
                header[1] = "Grupo";
                header[2] = "Procesador";
                header[3] = "Fecha de Proceso";
                header[4] = "Territorio";
                header[5] = "Pais";
                header[6] = "Merch ID";
                header[7] = "Merch Liq Pago";
                header[8] = "Merch ID Party";
                header[9] = "Merch Pago Party";
                header[10] = "Fecha de Transaccion";
                header[11] = "Num. Tarjeta";
                header[12] = "Num. Autorizacion";
                header[13] = "Num. Cuotas";
                header[14] = "Total Cuotas";
                header[15] = "Plan de Pagos";
                header[16] = "Cia";
                header[17] = "Documento";
                header[18] = "Dig. Chequeo";
                header[19] = "PNR";
                header[20] = "Cod. Razon";
                header[21] = "Subc. Razon";
                header[22] = "Agente";
                header[23] = "Pais Venta";
                data.add(header);

                for (A4305 obj : res.getLstExonerados()) {
                    Object[] row = new Object[24];
                    row[0] = obj.getRN();
                    row[1] = obj.getA4305GRUPO();
                    row[2] = obj.getA4305PROCE();
                    row[3] = obj.getA4305PRDA();
                    row[4] = obj.getA4305TERRI();
                    row[5] = obj.getA4305PAIS();
                    row[6] = obj.getA4305MERID();
                    row[7] = obj.getA4305MERPG();
                    row[8] = obj.getA4305MERPI();
                    row[9] = obj.getA4305MERPP();
                    row[10] = obj.getA4305FECTR();
                    row[11] = obj.getA4305NUMTJ();
                    row[12] = obj.getA4305NUMAT();
                    row[13] = obj.getA4305NUMCU();
                    row[14] = obj.getA4305TOTCU();
                    row[15] = obj.getA4305PLANP();
                    row[16] = obj.getA4305CIA();
                    row[17] = obj.getA4305FORMA() + obj.getA4305SERIE();
                    row[18] = obj.getA4305DCHEQ();
                    row[19] = obj.getA4305PNR();
                    row[20] = obj.getA4305RFIC();
                    row[21] = obj.getA4305RFIS();
                    row[22] = obj.getA4305IATA();
                    row[23] = obj.getA4305PAIS();
                    data.add(row);
                }
                response = exportUtils.createExcel(data, "Exonerated - " + filter.getPROCESADOR() + filter.getFECHA_FROM());
            }
            return response;
        } catch (Exception e) {
            System.out.println("Error en getDataGridInfo: " + e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "downloadComplementInfo")
    public ResponseEntity<byte[]> downloadComplementInfo(@ModelAttribute SQP05033Filter filter) {
        try {
            System.out.println("*************************** Inputs TMZ: downloadProcessorsInfo ****************************");
            SQP05033Filter res = logic.getSQP05033Filter(filter);
            ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
            if (res.getTIPO().equals("R")) {
                //<editor-fold defaultstate="collapsed" desc="Columnas Received">
                List<Object[]> data = new ArrayList<>();
                Object[] header = new Object[7];
                header[0] = "RN";
                header[1] = "Processing Date";
                header[2] = "Complement Type";
                header[3] = "ID File";
                header[4] = "SQNR";
                header[5] = "Record Type";
                header[6] = "Max Long";
                data.add(header);
                for (Map<String, Object> obj : res.getLst()) {
                    Object[] row = new Object[7];
                    row[0] = obj.get("RN");
                    row[1] = obj.get("PRDA");
                    row[2] = obj.get("CMPLTYPE");
                    row[3] = obj.get("IDFIL");
                    row[4] = obj.get("SQNR");
                    row[5] = obj.get("RECTYPE");
                    row[6] = obj.get("MAXLONG");
                    data.add(row);
                }
                response = exportUtils.createExcel(data, "Received - " + filter.getCOMPLEMENTO() + filter.getFECHA_FROM());
                //</editor-fold>
            } else {
                //<editor-fold defaultstate="collapsed" desc="Columnas Loaded">
                List<Object[]> data = new ArrayList<>();
                if (filter.getCOMPLEMENTO().equals("PLUSG00")) {
                    //<editor-fold defaultstate="collapsed" desc="Excel Plusgrade">
                    Object[] header = new Object[39];
                    header[0] = "RN";
                    header[1] = "AMOUNTOFF";
                    header[2] = "AMOUNTOTP";
                    header[3] = "AMOUNTPAX";
                    header[4] = "AREFNBR";
                    header[5] = "AUXDAT";
                    header[6] = "CCUST";
                    header[7] = "CERROR";
                    header[8] = "COUNTRY";
                    header[9] = "CUROFFER";
                    header[10] = "CURRPARTN";
                    header[11] = "DATEUPUTC";
                    header[12] = "DEPDATE";
                    header[13] = "DEPTIME";
                    header[14] = "DEST";
                    header[15] = "EMDNUMBER";
                    header[16] = "FARECLASS";
                    header[17] = "INSUPGRAD";
                    header[18] = "LIVEAOPEN";
                    header[19] = "MERCHID";
                    header[20] = "NEWTKTNBR";
                    header[21] = "ORIBOOKCL";
                    header[22] = "ORIG";
                    header[23] = "PAYTOKEN";
                    header[24] = "PAYTRANID";
                    header[25] = "PLUSGRAID";
                    header[26] = "PNR";
                    header[27] = "PRDA";
                    header[28] = "QTYTKT";
                    header[29] = "SAGENT";
                    header[30] = "SCARCOD";
                    header[31] = "SCARDBIN";
                    header[32] = "SDATE";
                    header[33] = "SDATES";
                    header[34] = "TRVFIRSNA";
                    header[35] = "TRVLASTNA";
                    header[36] = "UPGRATYPE";
                    header[37] = "USERTICKE";
                    header[38] = "USERUPGRA";
                    data.add(header);
                    for (Map<String, Object> obj : res.getLst()) {
                        Object[] row = new Object[39];
                        row[0] = obj.get("RN");
                        row[1] = obj.get("AMOUNTOFF");
                        row[2] = obj.get("AMOUNTOTP");
                        row[3] = obj.get("AMOUNTPAX");
                        row[4] = obj.get("AREFNBR");
                        row[5] = obj.get("AUXDAT");
                        row[6] = obj.get("CCUST");
                        row[7] = obj.get("CERROR");
                        row[8] = obj.get("COUNTRY");
                        row[9] = obj.get("CUROFFER");
                        row[10] = obj.get("CURRPARTN");
                        row[11] = obj.get("DATEUPUTC");
                        row[12] = obj.get("DEPDATE");
                        row[13] = obj.get("DEPTIME");
                        row[14] = obj.get("DEST");
                        row[15] = obj.get("EMDNUMBER");
                        row[16] = obj.get("FARECLASS");
                        row[17] = obj.get("INSUPGRAD");
                        row[18] = obj.get("LIVEAOPEN");
                        row[19] = obj.get("MERCHID");
                        row[20] = obj.get("NEWTKTNBR");
                        row[21] = obj.get("ORIBOOKCL");
                        row[22] = obj.get("ORIG");
                        row[23] = obj.get("PAYTOKEN");
                        row[24] = obj.get("PAYTRANID");
                        row[25] = obj.get("PLUSGRAID");
                        row[26] = obj.get("PNR");
                        row[27] = obj.get("PRDA");
                        row[28] = obj.get("QTYTKT");
                        row[29] = obj.get("SAGENT");
                        row[30] = obj.get("SCARCOD");
                        row[31] = obj.get("SCARDBIN");
                        row[32] = obj.get("SDATE");
                        row[33] = obj.get("SDATES");
                        row[34] = obj.get("TRVFIRSNA");
                        row[35] = obj.get("TRVLASTNA");
                        row[36] = obj.get("UPGRATYPE");
                        row[37] = obj.get("USERTICKE");
                        row[38] = obj.get("USERUPGRA");
                        data.add(row);
                    }
                    //</editor-fold>
                } else {
                    //<editor-fold defaultstate="collapsed" desc="Excel Ligas y Tablets">
                    Object[] header = new Object[33];
                    header[0] = "RN";
                    header[1] = "AREFNBR";
                    header[2] = "BANCOEMI";
                    header[3] = "CCUST";
                    header[4] = "CERROR";
                    header[5] = "CHADJNBR";
                    header[6] = "COUNTRY";
                    header[7] = "ESTATUS";
                    header[8] = "MERCHID";
                    header[9] = "NAMECARD";
                    header[10] = "NAMECLIEN";
                    header[11] = "NAMEMERCH";
                    header[12] = "OPERATNBR";
                    header[13] = "PNR";
                    header[14] = "PRDA";
                    header[15] = "SAUTHOC";
                    header[16] = "SCARDN";
                    header[17] = "SDATE";
                    header[18] = "SUCURNAME";
                    header[19] = "SVFOP";
                    header[20] = "TICKET1";
                    header[21] = "TICKET2";
                    header[22] = "TICKET3";
                    header[23] = "TICKET4";
                    header[24] = "TICKET5";
                    header[25] = "TICKET6";
                    header[26] = "TICKET7";
                    header[27] = "TICKET8";
                    header[28] = "TICKET9";
                    header[29] = "TICKET10";
                    header[30] = "TIPOCARD";
                    header[31] = "TIPOPAGO";
                    header[32] = "TIPOVENTA";
                    header[32] = "USERCOBRO";
                    data.add(header);
                    for (Map<String, Object> obj : res.getLst()) {
                        Object[] row = new Object[33];
                        row[0] = obj.get("RN");
                        row[1] = obj.get("AREFNBR");
                        row[2] = obj.get("BANCOEMI");
                        row[3] = obj.get("CCUST");
                        row[4] = obj.get("CERROR");
                        row[5] = obj.get("CHADJNBR");
                        row[6] = obj.get("COUNTRY");
                        row[7] = obj.get("ESTATUS");
                        row[8] = obj.get("MERCHID");
                        row[9] = obj.get("NAMECARD");
                        row[10] = obj.get("NAMECLIEN");
                        row[11] = obj.get("NAMEMERCH");
                        row[12] = obj.get("OPERATNBR");
                        row[13] = obj.get("PNR");
                        row[14] = obj.get("PRDA");
                        row[15] = obj.get("SAUTHOC");
                        row[16] = obj.get("SCARDN");
                        row[17] = obj.get("SDATE");
                        row[18] = obj.get("SUCURNAME");
                        row[19] = obj.get("SVFOP");
                        row[20] = obj.get("TICKET1");
                        row[21] = obj.get("TICKET2");
                        row[22] = obj.get("TICKET3");
                        row[23] = obj.get("TICKET4");
                        row[24] = obj.get("TICKET5");
                        row[25] = obj.get("TICKET6");
                        row[26] = obj.get("TICKET7");
                        row[27] = obj.get("TICKET8");
                        row[28] = obj.get("TICKET9");
                        row[29] = obj.get("TICKET10");
                        row[30] = obj.get("TIPOCARD");
                        row[31] = obj.get("TIPOPAGO");
                        row[32] = obj.get("TIPOVENTA");
                        row[32] = obj.get("USERCOBRO");
                        data.add(row);
                    }
                    //</editor-fold>
                }
                response = exportUtils.createExcel(data, "Loaded - " + filter.getCOMPLEMENTO() + filter.getFECHA_FROM());
                //</editor-fold>
            }
            return response;
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "downloadDetailSummaryInfo")
    public ResponseEntity<byte[]> downloadDetailSummaryInfo(@ModelAttribute SQP04974Filter filter) throws Exception {
        List<SQP04974Filter> res = logic.getSQP04974Filter(filter);
        String title = "Detail Summary " + Functions.getFechaActual();
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("SEQ"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Load\nDate"));
        header.add(new CustomExcelCell("Source"));
        header.add(new CustomExcelCell("Received"));
        header.add(new CustomExcelCell("Loaded"));
        if(filter.getTIPO().equals("P")){
            header.add(new CustomExcelCell("Exonerated"));
        }
        header.add(new CustomExcelCell("Differences"));
        data.add(header);
        res.forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getRN()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getFREGIS()));
            row.add(new CustomExcelCell(obj.getNOMBREPROC()));
            row.add(new CustomExcelCell(obj.getRECEIVED()));
            row.add(new CustomExcelCell(obj.getLOADED()));
            row.add(new CustomExcelCell(obj.getRECEIVED() - obj.getLOADED()));
            if(filter.getTIPO().equals("P")){
                row.add(new CustomExcelCell(0));
            }
            data.add(row);
        });
        return exportUtils.createCustomExcel(data,title);
    }
}
