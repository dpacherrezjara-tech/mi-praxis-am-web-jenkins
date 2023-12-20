package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.SalesReconciliationDoublePayLogic;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.A4331BPOFilter;
import net.miatech.praxis.payment.filter.A4331Filter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05163Filter;
import net.miatech.praxis.payment.filter.SQP05164Filter;
import net.miatech.praxis.payment.filter.SQP05165Filter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

/**
 *
 * @author Dvicente
 */
@Service
@Scope("session")
public class SalesReconciliationDoublePayDAO implements SalesReconciliationDoublePayLogic{

    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";
    
    @Override
    public List<A3152> getPaises() throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05016")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A3152.class));
        return ((List<A3152>) jdbcCall.execute().get("result"));
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
    public SQP05163Filter loadSQP05163Filter(SQP05163Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05163")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String,Object> spRes = jdbcCall.execute(params);
        filter.setResponse((List<A4331Filter>) spRes.get("result"));
        filter.setPageOut(spRes);
        return filter;
    }

    @Override
    public SQP05164Filter loadSQP05164Filter(SQP05164Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05164");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String,Object> spRes = jdbcCall.execute(params);
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
    public SQP05165Filter loadSQP05165Filter(SQP05165Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05165")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4335Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String,Object> spRes = jdbcCall.execute(params);
        filter.setResponse((List<A4335Filter>) spRes.get("result"));
        return filter;
    }
    
    
}
