package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.PaymentsCommissionsLogic;
import net.miatech.praxis.payment.A3152MP;
import net.miatech.praxis.payment.A4451MP;
import net.miatech.praxis.payment.filter.A4508Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05135Filter;
import net.miatech.praxis.payment.filter.SQP05155Filter;
import net.miatech.praxis.payment.filter.SQP05156Filter;
import net.miatech.praxis.payment.filter.SQP05158Filter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
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
public class PaymentsCommissionsDAO implements PaymentsCommissionsLogic {

    @Autowired
    private JdbcUtils jdbcUtils;
    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP05155Filter loadSQP05155Filter(SQP05155Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05155")
                .returningResultSet("result", new BeanPropertyRowMapper(A4508Filter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4508Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Transactional
    @Override
    public SQP05156Filter loadSQP05156Filter(SQP05156Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05156");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
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
    public SQP05158Filter loadSQP05158Filter(SQP05158Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05158")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4508Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        List<A4508Filter> lst = (List<A4508Filter>) jdbcCall.execute(params).get("result");
        if (!lst.isEmpty()) {
            filter.setResponse(lst.get(0));
        }
        return filter;
    }

    @Transactional
    @Override
    public SQP05135Filter loadSQP05135Filter(SQP05135Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = jdbcUtils.getJdbcCall()
                .withSchemaName(LIBRARY)
                .withProcedureName("SQP05135");
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

}
