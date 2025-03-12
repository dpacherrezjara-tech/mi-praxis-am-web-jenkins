package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.MiscellaneousCatalogLogic;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.SQP05273Filter;
import net.miatech.praxis.payment.filter.SQP05274Filter;
import net.miatech.praxis.payment.filter.SQP05275Filter;
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
public class MiscellaneousCatalogDAO implements MiscellaneousCatalogLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP05273Filter loadSQP05273Filter(SQP05273Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05273", params,
                new BeanPropertyRowMapper<>(A4451MP.class));
        List<A4451MP> response = (List<A4451MP>) obj.get("result");
        filter.setResponse(response);
        return filter;
    }

    @Override
    public SQP05274Filter loadSQP05274Filter(SQP05274Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05274", params);
        filter.setOUT_ROWS((Integer) obj.get("OUT_ROWS"));
        filter.setOUT_SQLMSG((String) obj.get("OUT_SQLMSG"));
        return filter;
    }

    @Override
    public SQP05275Filter loadSQP05275Filter(SQP05275Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05275", params,
                new BeanPropertyRowMapper<>(A4451MP.class));
        List<A4451MP> response = (List<A4451MP>) obj.get("result");
        filter.setResponse(response.get(0));
        return filter;
    }
    
    
}
