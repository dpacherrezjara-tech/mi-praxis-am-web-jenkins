package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.SalesReconciliationLogic;
import net.miatech.praxis.payment.A3152MP;
import net.miatech.praxis.payment.A4451MP;
import net.miatech.praxis.payment.filter.A4331BPOFilter;
import net.miatech.praxis.payment.filter.A4331NEWFilter;
import net.miatech.praxis.payment.filter.A4331SRFilter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.A4482Filter;
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
import net.miatech.praxis.payment.filter.SQP05077Filter;
import net.miatech.praxis.payment.filter.SQP05081Filter;
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
        String sql = "INSERT INTO PRAXISMP.X3169 (CCUST,AREFNBR,CCIA,FORMA,SERIE,SEQ,CORRL,TDOC,PRDA,SVFOPS,SCARDN,SAUTHOC,"
                + "TRNCU,STVAL,PMERCHID,SMERCHID,PAYDATE,PROCTYPE,PROCTYPESQ,"
                + "FREGLA,CERROR,FORCESCAN,OBSERV,STMANUAL,"
                + "FUENTE,FVOID,CARDTYPE,SAGENT,SCARDCOD,SCURRENCY,SCOUNTRY,SDATE,SPNR,GRUPO,CODEPR,CANAL,"
                + "CIAP,FORMAP,SERIEP,RUTA0,RUTA1,RUTA2,RUTA3,RUTA4,FVLO1,FVLO2,FVLO3,FVLO4," 
                + "TOTCUP,CPUI,PAX,FLAG,STDOC,"
                + "NBRLIQUID,CODCHGBACK,CHGBNUM,TGROSAMOUN) "
                + "VALUES"
                + "(:CCUST,:AREFNBR,:CCIA,:FORMA,:SERIE,:SEQ,:CORRL,:TDOC,:PRDA,:SVFOPS,:SCARDN,:SAUTHOC,"
                + ":TRNCU,:STVAL,:PMERCHID,:SMERCHID,:PAYDATE,:PROCTYPE,:PROCTYPESQ,"
                + ":FREGLA,:CERROR,:FORCESCAN,:OBSERV,:STMANUAL,"
                + ":FUENTE,:FVOID,:CARDTYPE,:SAGENT,:SCARDCOD,:SCURRENCY,:SCOUNTRY,:SDATE,:SPNR,:GRUPO,:CODEPR,:CANAL,"
                + ":CIAP,:FORMAP,:SERIEP,:RUTA0,:RUTA1,:RUTA2,:RUTA3,:RUTA4,:FVLO1,:FVLO2,:FVLO3,:FVLO4," 
                + ":TOTCUP,:CPUI,:PAX,:FLAG,:STDOC,"
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
    
    
}
