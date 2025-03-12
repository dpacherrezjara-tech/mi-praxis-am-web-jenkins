package net.miatech.praxis.dao.payments;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.entities.A4496;
import net.miatech.praxis.payment.entities.A4501;
import net.miatech.praxis.payment.entities.A4507;
import net.miatech.praxis.payment.entities.A4581Filter;
import net.miatech.praxis.payment.entities.A4582Filter;
import net.miatech.praxis.payment.entities.A4584;
import net.miatech.praxis.payment.filter.A4331BPOFilter;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.A4331STFilter;
import net.miatech.praxis.payment.filter.A4331SRFilter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.A4482Filter;
import net.miatech.praxis.payment.filter.A4496Filter;
import net.miatech.praxis.payment.filter.ByTicketFilter;
import net.miatech.praxis.payment.filter.CreditCardFilter;
import net.miatech.praxis.payment.filter.ManualBatchFilter;
import net.miatech.praxis.payment.filter.ProductionBPFilter;
import net.miatech.praxis.payment.filter.ProductionBTFilter;
import net.miatech.praxis.payment.filter.SQP04847Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
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
import net.miatech.praxis.payment.filter.SQP05220Filter;
import net.miatech.praxis.payment.filter.SQP05247Filter;
import net.miatech.praxis.payment.filter.SQP05259Filter;
import net.miatech.praxis.payment.filter.SQP05260Filter;
import net.miatech.praxis.payment.filter.SQP05261Filter;
import net.miatech.praxis.payment.filter.SQP05276Filter;
import net.miatech.praxis.payment.filter.SQP05302Filter;
import net.miatech.praxis.payment.filter.SQP05304Filter;
import net.miatech.praxis.payment.filter.SQP05307Filter;
import net.miatech.praxis.payment.filter.SQP05308Filter;
import net.miatech.praxis.payment.filter.SQP05310Filter;
import net.miatech.praxis.payment.filter.SQP05311Filter;
import net.miatech.praxis.payment.filter.SQP05312Filter;
import net.miatech.praxis.payment.filter.SQP05313Filter;
import net.miatech.praxis.payment.filter.SQP05319Filter;
import net.miatech.praxis.payment.filter.ScannerFilter;
import net.miatech.praxis.utils.JdbcUtils;
import net.miatech.praxis.utils.MailUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

/**
 *
 * @author Dvicente
 */
@Service
@Scope("session")
public class SalesReconciliationDAO implements SalesReconciliationLogic {

    @Autowired
    private JdbcUtils jdbcUtils;
    @Autowired
    private MailUtils mailUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP05059Filter getSQP05059Filter(SQP05059Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05059",
                params, new BeanPropertyRowMapper<>(A4331SRFilter.class));
        filter.setResponse((List<A4331SRFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public List<A3152> getPaises() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05016",
                new BeanPropertyRowMapper<>(A3152.class));
        List<A3152> res = (List<A3152>) obj.get("result");
        return res;
    }

    @Override
    public List<A006> getMonedas() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05159",
                new BeanPropertyRowMapper<>(A006.class));
        List<A006> res = (List<A006>) obj.get("result");
        return res;
    }

    @Override
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05004",
                params, new BeanPropertyRowMapper<>(A4451MP.class));
        filter.setLst((List<A4451MP>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05276Filter loadSQP05276Filter(SQP05276Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        List<BeanPropertyRowMapper> mappers = new ArrayList<>();
        //Son 4 resultset diferentes, pero de la misma clase
        mappers.add(new BeanPropertyRowMapper(A4451MP.class));
        mappers.add(new BeanPropertyRowMapper(A4451MP.class));
        mappers.add(new BeanPropertyRowMapper(A4451MP.class));
        mappers.add(new BeanPropertyRowMapper(A4451MP.class));
        mappers.add(new BeanPropertyRowMapper(A3152.class));
        mappers.add(new BeanPropertyRowMapper(A006.class));
        mappers.add(new BeanPropertyRowMapper(A4451MP.class));
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05276",
                params, mappers);
        filter.setCERROR((List<A4451MP>) obj.get("result0"));
        filter.setCODADJU((List<A4451MP>) obj.get("result1"));
        filter.setPROCESADORES((List<A4451MP>) obj.get("result2"));
        filter.setCREDITCARDS((List<A4451MP>) obj.get("result3"));
        filter.setPAISES((List<A3152>) obj.get("result4"));
        filter.setMONEDAS((List<A006>) obj.get("result5"));
        filter.setADMINS((List<A4451MP>) obj.get("result6"));
        return filter;
    }

    @Override
    public SQP05060Filter getSQP05060Filter(SQP05060Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05060",
                params, new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Transactional
    @Override
    public SQP05048Filter loadSQP05048Filter(SQP05048Filter filter) throws Exception {
        //<editor-fold defaultstate="collapsed" desc="SQL">
        final String sql = "INSERT INTO PRAXISMP.X3169 (CCUST,AREFNBR,CCIA,FORMA,SERIE,SEQ,CORRL,TDOC,PRDA,SVFOPS,SCARDN,SAUTHOC,"
                + "TRNCU,STVAL,PMERCHID,SMERCHID,PAYDATE,PROCTYPE,PROCTYPESQ,"
                + "FREGLA,CERROR,FORCESCAN,OBSERV,STMANUAL,"
                + "FUENTE,FVOID,CARDTYPE,SAGENT,SCARDCOD,SCURRENCY,SCOUNTRY,SDATE,SPNR,GRUPO,CODEPR,CANAL,"
                + "CIAP,FORMAP,SERIEP,RUTA0,RUTA1,RUTA2,RUTA3,RUTA4,FVLO1,FVLO2,FVLO3,FVLO4,"
                + "TOTCUP,CPUI,PAX,FLAG,STDOC,TCORR,"
                + "NBRLIQUID,CODCHGBACK,CHGBNUM,TGROSAMOUN,TDOCO) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:CORRL,:TDOC,:PRDA,:SVFOPS,:SCARDN,:SAUTHOC,"
                + ":TRNCU,:STVAL,:PMERCHID,:SMERCHID,:PAYDATE,:PROCTYPE,:PROCTYPESQ,"
                + ":FREGLA,:CERROR,:FORCESCAN,:OBSERV,:STMANUAL,"
                + ":FUENTE,:FVOID,:CARDTYPE,:SAGENT,:SCARDCOD,:SCURRENCY,:SCOUNTRY,:SDATE,:SPNR,:GRUPO,:CODEPR,:CANAL,"
                + ":CIAP,:FORMAP,:SERIEP,:RUTA0,:RUTA1,:RUTA2,:RUTA3,:RUTA4,:FVLO1,:FVLO2,:FVLO3,:FVLO4,"
                + ":TOTCUP,:CPUI,:PAX,:FLAG,:STDOC,:TCORR,"
                + ":NBRLIQUID,:CODCHGBACK,:CHGBNUM,:TGROSAMOUN,:TDOCO)";

//</editor-fold>
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDetail().size()];
        for (int i = 0; i < filter.getDetail().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDetail().get(i));
        }
        jdbcUtils.executeNamedParam(sql, insertParams);
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05048", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP04847Filter loadSQP04847Filter(SQP04847Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04847", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05052Filter loadSQP05052Filter(SQP05052Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05052", params,
                new BeanPropertyRowMapper<>(A4331BPOFilter.class));
        filter.setResponse(((List<A4331BPOFilter>) obj.get("result")).get(0));
        return filter;
    }

    @Override
    public SQP05054Filter loadSQP05054Filter(SQP05054Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05054", params,
                new BeanPropertyRowMapper<>(ScannerFilter.class));
        filter.setResponse(((List<ScannerFilter>) obj.get("result")));
        return filter;
    }

    @Override
    public SQP05187Filter loadSQP05187Filter(SQP05187Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05187", params,
                new BeanPropertyRowMapper<>(ScannerFilter.class));
        filter.setResponse(((List<ScannerFilter>) obj.get("result")));
        return filter;
    }

    @Override
    public SQP05055Filter loadSQP05055Filter(SQP05055Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05055", params,
                new BeanPropertyRowMapper<>(A4335Filter.class));
        filter.setResponse(((List<A4335Filter>) obj.get("result")));
        return filter;
    }

    @Override
    public SQP05056Filter loadSQP05056Filter(SQP05056Filter filter) throws Exception {
        //<editor-fold defaultstate="collapsed" desc="SQL">
        final String sql = "INSERT INTO PRAXISMP.X3169 (CCUST,AREFNBR,CCIA,FORMA,SERIE,SEQ,CORRL,TDOC,PRDA,"
                + "TRNCU,SDATE,TCORR) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:CORRL,:TDOC,:PRDA,"
                + ":TRNCU,:SDATE,:TCORR)";
        //</editor-fold>
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDetail().size()];
        for (int i = 0; i < filter.getDetail().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDetail().get(i));
        }
        jdbcUtils.executeNamedParam(sql, insertParams);
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05056", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05057Filter loadSQP05057Filter(SQP05057Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05057", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05062Filter loadSQP05062Filter(SQP05062Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05062", params,
                new BeanPropertyRowMapper<>(ScannerFilter.class));
        filter.setResponse((List<ScannerFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05061Filter loadSQP05061Filter(SQP05061Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05061", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05063Filter loadSQP05063Filter(SQP05063Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05063", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05065Filter loadSQP05065Filter(SQP05065Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05065", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05259Filter loadSQP05259Filter(SQP05259Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05259", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSQP05261Filter(SQP05261Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05261", params);
        System.out.println("Loading Childs...");
        for (SQP05260Filter child : filter.getChilds()) {
            SqlParameterSource childParams = new BeanPropertySqlParameterSource(child);
            jdbcUtils.executeSQP(LIBRARY, "SQP05260", childParams);
        }
        System.out.println("Childs Loaded...");
    }

    @Override
    public SQP05072Filter loadSQP05072Filter(SQP05072Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05072", params,
                new BeanPropertyRowMapper<>(A4482Filter.class));
        filter.setResponse((List<A4482Filter>) obj.get("result"));
        return filter;
    }

    @Transactional
    @Override
    public SQP05077Filter loadSQP05077Filter(SQP05077Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05077", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05182Filter loadSQP05182Filter(SQP05182Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05182", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05183Filter loadSQP05183Filter(SQP05183Filter filter) throws Exception {
        //<editor-fold defaultstate="collapsed" desc="SQL">
        final String sql = "INSERT INTO PRAXISMP.X3169 (CCUST,AREFNBR,CCIA,FORMA,SERIE,SEQ,TDOC,PRDA) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:TDOC,:PRDA)";
//</editor-fold>
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDetail().size()];
        for (int i = 0; i < filter.getDetail().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDetail().get(i));
        }
        jdbcUtils.executeNamedParam(sql, insertParams);
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05183", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05312Filter loadSQP05312Filter(SQP05312Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05312", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05313Filter loadSQP05313Filter(SQP05313Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05313", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05081Filter loadSQP05081Filter(SQP05081Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05081", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05088Filter loadSQP05088Filter(SQP05088Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05088", params,
                new BeanPropertyRowMapper<>(A4331SRFilter.class));
        filter.setResponse((List<A4331SRFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05089Filter loadSQP05089Filter(SQP05089Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05089", params,
                new BeanPropertyRowMapper<>(A4496Filter.class));
        filter.setResponse((List<A4496Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05074Filter loadSQP05074Filter(SQP05074Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05074", params);
        filter.setVP_CANT((Integer) obj.get("VP_CANT"));
        return filter;
    }

    @Override
    public SQP05147Filter loadSQP05147Filter() throws Exception {
        SQP05147Filter filter = new SQP05147Filter();
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05147",
                new BeanPropertyRowMapper<>(A4507.class));
        filter.setResponse((List<A4507>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05126Filter loadSQP05126Filter(SQP05126Filter filter) throws Exception {
        List<BeanPropertyRowMapper> mappers = new ArrayList<>();
        mappers.add(new BeanPropertyRowMapper<>(ByTicketFilter.class));
        mappers.add(new BeanPropertyRowMapper<>(A4335Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05126", params,
                mappers);
        List<ByTicketFilter> spRes = (List<ByTicketFilter>) obj.get("result0");
        if (!spRes.isEmpty()) {
            filter.setResponse(spRes.get(0));
        }
        List<A4335Filter> spDesglose;
        spDesglose = (List<A4335Filter>) obj.get("result1");
        if (spDesglose != null) {
            if (!spRes.isEmpty()) {
                filter.setDesglose(spDesglose);
            }
        }
        return filter;
    }

    @Override
    public SQP05128Filter loadSQP05128Filter(SQP05128Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05128", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05129Filter loadSQP05129Filter(SQP05129Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05129", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Transactional
    @Override
    public SQP05130Filter loadSQP05130Filter(SQP05130Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05130", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05132Filter loadSQP05132Filter(SQP05132Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05132", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05141Filter loadSQP05141Filter(SQP05141Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05141", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05142Filter loadSQP05142Filter(SQP05142Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05142", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05133Filter loadSQP05133Filter(SQP05133Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05133", params,
                new BeanPropertyRowMapper<>(A4331STFilter.class));
        filter.setResponse((List<A4331STFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05134Filter loadSQP05134Filter(SQP05134Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05134", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05075Filter loadSQP05075Filter(SQP05075Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05075", params);
        filter.setOUT_USOS((String) obj.get("OUT_USOS"));
        return filter;
    }

    @Override
    public SQP05202Filter loadSQP05202Filter(SQP05202Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05202", params,
                new BeanPropertyRowMapper<>(ProductionBPFilter.class));
        filter.setResponse((List<ProductionBPFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05203Filter loadSQP05203Filter(SQP05203Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        BeanPropertyRowMapper rm = new BeanPropertyRowMapper();
        if (filter.getIN_ORIG().equals("P")) {
            rm.setMappedClass(ProductionBPFilter.class);
        } else {
            rm.setMappedClass(ProductionBTFilter.class);
        }
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05203", params, rm);
        filter.setResponse((List<ProductionBPFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05247Filter loadSQP05247Filter(SQP05247Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        BeanPropertyRowMapper rm = new BeanPropertyRowMapper();
        if (filter.getIN_ORIG().equals("P")) {
            rm.setMappedClass(A4331Filter.class);
        } else {
            rm.setMappedClass(A4496Filter.class);
        }
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05247", params, rm);
        filter.setResponse((List<?>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05206Filter loadSQP05206Filter(SQP05206Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05206", params,
                new BeanPropertyRowMapper<>(CreditCardFilter.class));
        filter.setResponse((List<CreditCardFilter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05217Filter loadSQP05217Filter(SQP05217Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05217", params,
                new BeanPropertyRowMapper<>(A4496.class));
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        List<A4496> response = (List<A4496>) obj.get("result");
        if (filter.getSQLRES() > 0) {
            filter.setResponse(response);
        }
        return filter;
    }

    @Override
    public SQP05218Filter loadSQP05218Filter(SQP05218Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05218", params,
                new BeanPropertyRowMapper<>(A4501.class));
        filter.setResponse((List<A4501>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05219Filter loadSQP05219Filter(SQP05219Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05219", params);
        for (SQP05220Filter fop : filter.getFops()) {
            SqlParameterSource fparams = new BeanPropertySqlParameterSource(fop);
            jdbcUtils.executeSQP(LIBRARY, "SQP05220", fparams);
        }
        return filter;
    }

    @Async
    @Override
    public SQP05302Filter loadSQP05302Filter(SQP05302Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05302", params);
        return filter;
    }

    @Override
    public SQP05307Filter loadSQP05307Filter(SQP05307Filter filter) throws Exception {
        String uuid = UUID.randomUUID().toString();
        filter.setIN_UUID(uuid);
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05307", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Async
    @Override
    public void loadMasiveSQP05307Filter(List<SQP05307Filter> list) throws Exception {
        String uuid = UUID.randomUUID().toString();
        SQP05308Filter logFilter = SQP05308Filter.builder()
                .IN_ACTION("I")
                .IN_UUID(uuid)
                .IN_CCUST("139")
                .IN_PRDA(list.get(0).getIN_PRDA())
                .IN_PROCTYPE(list.get(0).getIN_PROCTYPE())
                .IN_PROCTYPESQ(list.get(0).getIN_PROCTYPESQ())
                .IN_TOTAL(list.size())
                .IN_MATCHS(0)
                .IN_ERRORS(0)
                .IN_DESCR("Proceso Conciliacion Manual")
                .IN_STS("0")
                .build();
        try {
            SQP05004Filter correos = new SQP05004Filter();
            correos.setKEY1("PK");
            correos.setKEY2("EMAIL");
            Map<String, Object> objCorreos = jdbcUtils.executeSQP(LIBRARY, "SQP05004",
                    new BeanPropertySqlParameterSource(correos),
                    new BeanPropertyRowMapper<>(A4451MP.class));
            List<A4451MP> lstCorreos = (List<A4451MP>) objCorreos.get("result");
            Map<String, Object> objLog = jdbcUtils.executeSQP(LIBRARY, "SQP05308",
                    new BeanPropertySqlParameterSource(logFilter));
            String fechaProceso = (String) objLog.get("FECR");
            String horaProceso = (String) objLog.get("HOCR");
            String usuario = (String) objLog.get("USCR");
            String procesador = (String) objLog.get("PROCESADOR");
            List<ModelMap> response = new ArrayList<>();
            Integer total = list.size();
            list.forEach((SQP05307Filter filter) -> {
                SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
                filter.setIN_UUID(uuid);
                ModelMap res = new ModelMap();
                try {
                    Map<String, Object> obj = jdbcUtils.executeSQPwithoutLog(LIBRARY, "SQP05307", params);
                    res.put("code", (Integer) obj.get("SQLRES"));
                } catch (Exception e) {
                    res.put("code", 3);
                }
                response.add(res);
            });
            Integer procesados = response.stream()
                    .filter(x -> x.get("code").equals(1))
                    .collect(Collectors.toList())
                    .size();
            logFilter.setIN_MATCHS(procesados);
            Integer error = response.stream()
                    .filter(x -> x.get("code").equals(0))
                    .collect(Collectors.toList())
                    .size();
            logFilter.setIN_ERRORS(error);
            Integer serverError = response.stream()
                    .filter(x -> x.get("code").equals(3))
                    .collect(Collectors.toList())
                    .size();

            logFilter.setIN_ACTION("U");
            logFilter.setIN_STS("1");
            objLog = jdbcUtils.executeSQP(LIBRARY, "SQP05308",
                    new BeanPropertySqlParameterSource(logFilter));
            String fechaProcesoT = (String) objLog.get("FECR");
            String horaProcesoT = (String) objLog.get("HOCR");
            //<editor-fold defaultstate="collapsed" desc="Envio de Correo">
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            List<String> receptores = new ArrayList<>();
            List<String> CC = new ArrayList<>();
            //receptores.add("dvicente@miatech.net");
            lstCorreos.stream().filter(x -> x.getA4451fech2().trim().equals("TO"))
                    .collect(Collectors.toList())
                    .forEach(to -> {
                        receptores.add(to.getA4451desc1().trim());
                    });
            lstCorreos.stream().filter(x -> x.getA4451fech2().trim().equals("CC"))
                    .collect(Collectors.toList())
                    .forEach(to -> {
                        CC.add(to.getA4451desc1().trim());
                    });
            String asunto = "Medios de Pago - Proceso Batch Manuales " + usuario + "-" + fechaProceso;//Data.Asunto;
            String detalle = procesador + "-" + logFilter.getIN_PRDA();
            StringBuilder msg = new StringBuilder();
            msg.append("<b>Estimados(as):</b><br><br>");
            msg.append("Se termino proceso de Match Manuales ejecutado por usuario ")
                    .append(usuario).append(" ")
                    .append(fechaProceso).append("-")
                    .append(horaProceso).append("<br>")
                    .append("y terminado en la fecha ")
                    .append(fechaProcesoT).append("-")
                    .append(horaProcesoT)
                    .append(" con los siguientes resultados: <br><br>");
            msg.append("<table border='1'>");
            msg.append("<tr>")
                    .append("<th>Fecha</th>")
                    .append("<th>Total</th>")
                    .append("<th>Match</th>")
                    .append("<th>Error</th>")
                    .append("<th>Server Error</th>")
                    .append("</tr>");
            msg.append("<tr>")
                    .append("<td>").append(detalle).append("</td>")
                    .append("<td>").append(total).append("</td>")
                    .append("<td>").append(procesados).append("</td>")
                    .append("<td>").append(error).append("</td>")
                    .append("<td>").append(serverError).append("</td>")
                    .append("</tr>");
            msg.append("</table><br><br>");
            msg.append("<b>Payments Control</b><br>");
            msg.append("<b>Miatech International</b><br><br>");
            //</editor-fold>
            //MailUtils mailUtils = new MailUtils(cs);
            mailUtils.sendMail(emisor, asunto, receptores, CC, msg.toString(), null, "notificaciones@miatech.net");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            try {
                logFilter.setIN_ACTION("U");
                logFilter.setIN_STS("2");
                jdbcUtils.executeSQP(LIBRARY, "SQP05308",
                        new BeanPropertySqlParameterSource(logFilter));
            } catch (Exception e2) {
                System.out.println("Error: " + e2.getMessage());
            }
        }

    }

    @Override
    public ModelMap loadSQP05304Filter(SQP05304Filter filter) throws Exception {
        String uuid = UUID.randomUUID().toString();
        SQP05308Filter logFilter = SQP05308Filter.builder()
                .IN_ACTION("I")
                .IN_UUID(uuid)
                .IN_CCUST("139")
                .IN_PRDA(Functions.getFechaActual())
                .IN_PROCTYPE("ALL")
                .IN_PROCTYPESQ("ALL")
                .IN_TOTAL(0)
                .IN_MATCHS(0)
                .IN_ERRORS(0)
                .IN_DESCR("Proceso Conciliacion Automatico")
                .IN_STS("4")
                .build();
        jdbcUtils.executeSQP(LIBRARY, "SQP05308",
                new BeanPropertySqlParameterSource(logFilter));
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05304",
                new BeanPropertySqlParameterSource(filter));
        List<Map<String, String>> resultSet = (List<Map<String, String>>) obj.get("#result-set-1");
        ModelMap map = new ModelMap();
        resultSet.forEach((Map<String, String> x) -> {
            map.put("result", x.get("RESULT"));
        });

        return map;
    }

    @Override
    public SQP05310Filter loadSQP05310Filter(SQP05310Filter filter) throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05310",
                new BeanPropertySqlParameterSource(filter),
                new BeanPropertyRowMapper(A4582Filter.class));
        filter.setResponse((List<A4582Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05311Filter loadSQP05311Filter(SQP05311Filter filter) throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05311",
                new BeanPropertySqlParameterSource(filter),
                new BeanPropertyRowMapper(A4581Filter.class));
        filter.setResponse((List<A4581Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05319Filter loadSQP05319Filter(SQP05319Filter filter) throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05319",
                new BeanPropertySqlParameterSource(filter),
                new BeanPropertyRowMapper(A4584.class));
        filter.setResponse((List<A4584>) obj.get("result"));
        return filter;
    }
}
