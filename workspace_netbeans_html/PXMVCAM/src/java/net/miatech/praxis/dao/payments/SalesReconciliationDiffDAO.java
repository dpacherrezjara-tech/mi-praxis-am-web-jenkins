package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.SalesReconciliationDiffLogic;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.A4511Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05152Filter;
import net.miatech.praxis.payment.filter.SQP05153Filter;
import net.miatech.praxis.payment.filter.SQP05154Filter;
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
public class SalesReconciliationDiffDAO implements SalesReconciliationDiffLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP05153Filter loadSQP05153Filter(SQP05153Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05153")
                .returningResultSet("result", new BeanPropertyRowMapper(A4511Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4511Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05154Filter loadSQP05154Filter(SQP05154Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05154")
                .returningResultSet("result", new BeanPropertyRowMapper(A4511Filter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4511Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public List<A3152> getPaises() throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05016")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A3152.class));
        return ((List<A3152>) jdbcCall.execute().get("result"));
    }

    @Override
    public SQP05004Filter loadSQP05004Filter(SQP05004Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05004")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4451MP.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        filter.setLst((List<A4451MP>) jdbcCall.execute(params).get("result"));
        return filter;
    }

    @Override
    public void loadSQP05152Filter(SQP05152Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05152");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcCall.execute(params);
    }

    
}
