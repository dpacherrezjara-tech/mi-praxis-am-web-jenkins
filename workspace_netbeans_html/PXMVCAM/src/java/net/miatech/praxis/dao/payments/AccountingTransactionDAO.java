package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.AccountingTransactionLogic;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.A4183Filter;
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
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

/**
 *
 * @author Dvicente
 */
@Service
@Scope("session")
public class AccountingTransactionDAO implements AccountingTransactionLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP05036Filter getSQP05036Filter(SQP05036Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05036", params,
                new BeanPropertyRowMapper<>(A4331AT1Filter.class));
        filter.setResponse((List<A4331AT1Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05004", params,
                new BeanPropertyRowMapper<>(A4451MP.class));
        filter.setLst((List<A4451MP>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05037Filter getSQP05037Filter(SQP05037Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05037", params,
                new BeanPropertyRowMapper<>(A4331AT2Filter.class));
        filter.setResponse((List<A4331AT2Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05041Filter getSQP05041Filter(SQP05041Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05041", params,
                new BeanPropertyRowMapper<>(A4331Filter.class));
        filter.setResponse((List<A4331Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05042Filter getSQP05042Filter(SQP05042Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05042", params,
                new BeanPropertyRowMapper<>(A4183Filter.class));
        filter.setResponse((List<A4183Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05043Filter getSQP05043Filter(SQP05043Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05043", params,
                new BeanPropertyRowMapper<>(A4335Filter.class));
        filter.setResponse((List<A4335Filter>) obj.get("result"));
        return filter;
    }
    
    @Override
    public List<A006> getMonedas() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05159",
                new BeanPropertyRowMapper<>(A006.class));
        List<A006> res = (List<A006>) obj.get("result");
        return res;
    }
}
