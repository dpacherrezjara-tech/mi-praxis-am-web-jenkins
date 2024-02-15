package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.entities.A4496;
import net.miatech.praxis.payment.entities.A4501;
import net.miatech.praxis.payment.entities.A4507;
import net.miatech.praxis.payment.filter.A4331BPOFilter;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.A4331STFilter;
import net.miatech.praxis.payment.filter.A4331SRFilter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.A4482Filter;
import net.miatech.praxis.payment.filter.A4496Filter;
import net.miatech.praxis.payment.filter.ByTicketFilter;
import net.miatech.praxis.payment.filter.CreditCardFilter;
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
import net.miatech.praxis.payment.filter.ScannerFilter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Dvicente
 */
@Service
@Scope("session")
public class SalesReconciliationDAO implements SalesReconciliationLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

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
                + "NBRLIQUID,CODCHGBACK,CHGBNUM,TGROSAMOUN) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:CORRL,:TDOC,:PRDA,:SVFOPS,:SCARDN,:SAUTHOC,"
                + ":TRNCU,:STVAL,:PMERCHID,:SMERCHID,:PAYDATE,:PROCTYPE,:PROCTYPESQ,"
                + ":FREGLA,:CERROR,:FORCESCAN,:OBSERV,:STMANUAL,"
                + ":FUENTE,:FVOID,:CARDTYPE,:SAGENT,:SCARDCOD,:SCURRENCY,:SCOUNTRY,:SDATE,:SPNR,:GRUPO,:CODEPR,:CANAL,"
                + ":CIAP,:FORMAP,:SERIEP,:RUTA0,:RUTA1,:RUTA2,:RUTA3,:RUTA4,:FVLO1,:FVLO2,:FVLO3,:FVLO4,"
                + ":TOTCUP,:CPUI,:PAX,:FLAG,:STDOC,:TCORR,"
                + ":NBRLIQUID,:CODCHGBACK,:CHGBNUM,:TGROSAMOUN)";

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
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05126", params,
                new BeanPropertyRowMapper<>(ByTicketFilter.class));
        List<ByTicketFilter> spRes = (List<ByTicketFilter>) obj.get("result");
        if (!spRes.isEmpty()) {
            filter.setResponse(spRes.get(0));
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
}
