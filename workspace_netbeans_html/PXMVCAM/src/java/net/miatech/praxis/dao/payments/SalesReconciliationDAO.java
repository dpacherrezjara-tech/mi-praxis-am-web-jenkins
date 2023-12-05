package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
import net.miatech.praxis.payment.A006;
import net.miatech.praxis.payment.A3152MP;
import net.miatech.praxis.payment.A4451MP;
import net.miatech.praxis.payment.A4507;
import net.miatech.praxis.payment.filter.A4331BPOFilter;
import net.miatech.praxis.payment.filter.A4331NEWFilter;
import net.miatech.praxis.payment.filter.A4331SETTLFilter;
import net.miatech.praxis.payment.filter.A4331SRFilter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.A4482Filter;
import net.miatech.praxis.payment.filter.A4496Filter;
import net.miatech.praxis.payment.filter.ByTicketFilter;
import net.miatech.praxis.payment.filter.ProductionFilter;
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
import net.miatech.praxis.payment.filter.ScannerFilter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
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
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05059")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331SRFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4331SRFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public List<A3152MP> getPaises() throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05016")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A3152MP.class));
        return ((List<A3152MP>) jdbcCall.execute().get("result"));
    }

    @Override
    public List<A006> getMonedas() throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05159")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A006.class));
        return ((List<A006>) jdbcCall.execute().get("result"));
    }

    @Override
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05004")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4451MP.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        filter.setLst((List<A4451MP>) jdbcCall.execute(params).get("result"));
        return filter;
    }

    @Override
    public SQP05060Filter getSQP05060Filter(SQP05060Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05060")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331NEWFilter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4331NEWFilter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Transactional
    @Override
    public SQP05048Filter loadSQP05048Filter(SQP05048Filter filter) throws Exception {
        NamedParameterJdbcTemplate npjt = jdbcUtils.getNamedParameter();
        //,CARDTYPE,SCARDCOD,FVOID
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
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDetail().size()];
        for (int i = 0; i < filter.getDetail().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDetail().get(i));
        }
        npjt.batchUpdate(sql, insertParams);
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05048");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP04847Filter loadSQP04847Filter(SQP04847Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP04847");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05052Filter loadSQP05052Filter(SQP05052Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05052")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331BPOFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse(((List<A4331BPOFilter>) spRes.get("result")).get(0));
        return filter;
    }

    @Override
    public SQP05054Filter loadSQP05054Filter(SQP05054Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05054")
                .returningResultSet("result", new BeanPropertyRowMapper<>(ScannerFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse(((List<ScannerFilter>) spRes.get("result")));
        return filter;
    }

    @Override
    public SQP05187Filter loadSQP05187Filter(SQP05187Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05187")
                .returningResultSet("result", new BeanPropertyRowMapper<>(ScannerFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse(((List<ScannerFilter>) spRes.get("result")));
        return filter;
    }

    @Override
    public SQP05055Filter loadSQP05055Filter(SQP05055Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05055")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4335Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse(((List<A4335Filter>) spRes.get("result")));
        return filter;
    }

    @Override
    public SQP05056Filter loadSQP05056Filter(SQP05056Filter filter) throws Exception {
        NamedParameterJdbcTemplate npjt = jdbcUtils.getNamedParameter();
        //,CARDTYPE,SCARDCOD,FVOID
        final String sql = "INSERT INTO PRAXISMP.X3169 (CCUST,AREFNBR,CCIA,FORMA,SERIE,SEQ,CORRL,TDOC,PRDA,"
                + "TRNCU,SDATE,TCORR) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:CORRL,:TDOC,:PRDA,"
                + ":TRNCU,:SDATE,:TCORR)";
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDetail().size()];
        for (int i = 0; i < filter.getDetail().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDetail().get(i));
        }
        npjt.batchUpdate(sql, insertParams);
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05056");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05057Filter loadSQP05057Filter(SQP05057Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05057");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05062Filter loadSQP05062Filter(SQP05062Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05062")
                .returningResultSet("result", new BeanPropertyRowMapper<>(ScannerFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse((List<ScannerFilter>) spRes.get("result"));
        return filter;
    }

    @Override
    public SQP05061Filter loadSQP05061Filter(SQP05061Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05061")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331NEWFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse((List<A4331NEWFilter>) spRes.get("result"));
        return filter;
    }

    @Override
    public SQP05063Filter loadSQP05063Filter(SQP05063Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05063");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05065Filter loadSQP05065Filter(SQP05065Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05065");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05072Filter loadSQP05072Filter(SQP05072Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05072")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4482Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse((List<A4482Filter>) spRes.get("result"));
        return filter;
    }

    @Transactional
    @Override
    public SQP05077Filter loadSQP05077Filter(SQP05077Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05077");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05182Filter loadSQP05182Filter(SQP05182Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05182")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331NEWFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse((List<A4331NEWFilter>) spRes.get("result"));
        return filter;
    }

    @Override
    public SQP05183Filter loadSQP05183Filter(SQP05183Filter filter) throws Exception {
        NamedParameterJdbcTemplate npjt = jdbcUtils.getNamedParameter();
        //,CARDTYPE,SCARDCOD,FVOID
        final String sql = "INSERT INTO PRAXISMP.X3169 (CCUST,AREFNBR,CCIA,FORMA,SERIE,SEQ,TDOC,PRDA) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:TDOC,:PRDA)";
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDetail().size()];
        for (int i = 0; i < filter.getDetail().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDetail().get(i));
        }
        npjt.batchUpdate(sql, insertParams);
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05183");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05081Filter loadSQP05081Filter(SQP05081Filter filter) throws Exception {
        SimpleJdbcCall spCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05081")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331NEWFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = spCall.execute(params);
        filter.setResponse((List<A4331NEWFilter>) spRes.get("result"));
        return filter;
    }

    @Override
    public SQP05088Filter loadSQP05088Filter(SQP05088Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05088")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331SRFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4331SRFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05089Filter loadSQP05089Filter(SQP05089Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05089")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4496Filter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4496Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05074Filter loadSQP05074Filter(SQP05074Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05074");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setVP_CANT((Integer) obj.get("VP_CANT"));
        return filter;
    }

    @Override
    public SQP05147Filter loadSQP05147Filter() throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05147")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4507.class));
        Map<String, Object> obj = jdbcCall.execute();
        SQP05147Filter filter = new SQP05147Filter();
        filter.setResponse((List<A4507>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05126Filter loadSQP05126Filter(SQP05126Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05126")
                .returningResultSet("result", new BeanPropertyRowMapper<>(ByTicketFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        List<ByTicketFilter> spRes = (List<ByTicketFilter>) obj.get("result");
        if (spRes.size() > 0) {
            filter.setResponse(spRes.get(0));
        }
        return filter;
    }

    @Override
    public SQP05128Filter loadSQP05128Filter(SQP05128Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05128");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05129Filter loadSQP05129Filter(SQP05129Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05129");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Transactional
    @Override
    public SQP05130Filter loadSQP05130Filter(SQP05130Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05130");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05132Filter loadSQP05132Filter(SQP05132Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05132");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05141Filter loadSQP05141Filter(SQP05141Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05141");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05142Filter loadSQP05142Filter(SQP05142Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05142");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setSQLRES((Integer) spRes.get("SQLRES"));
        filter.setSQLMSG((String) spRes.get("SQLMSG"));
        return filter;
    }
    
    

    @Override
    public SQP05133Filter loadSQP05133Filter(SQP05133Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05133")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331SETTLFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setResponse((List<A4331SETTLFilter>) spRes.get("result"));
        return filter;
    }

    @Override
    public SQP05134Filter loadSQP05134Filter(SQP05134Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05134")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331NEWFilter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setResponse((List<A4331NEWFilter>) spRes.get("result"));
        filter.setPageOut(spRes);
        return filter;
    }

    @Override
    public SQP05075Filter loadSQP05075Filter(SQP05075Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05075");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setOUT_USOS((String) spRes.get("OUT_USOS"));
        return filter;
    }

    @Override
    public SQP05202Filter loadSQP05202Filter(SQP05202Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05202")
                .returningResultSet("result", new BeanPropertyRowMapper<>(ProductionFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setResponse((List<ProductionFilter>) spRes.get("result"));
        return filter;
    }

    @Override
    public SQP05203Filter loadSQP05203Filter(SQP05203Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05203")
                .returningResultSet("result", new BeanPropertyRowMapper<>(ProductionFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> spRes = jdbcCall.execute(params);
        filter.setResponse((List<ProductionFilter>) spRes.get("result"));
        return filter;
    }
    
    
}
