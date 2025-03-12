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
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05153", params,
                new BeanPropertyRowMapper<>(A4511Filter.class));
        filter.setResponse((List<A4511Filter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05154Filter loadSQP05154Filter(SQP05154Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05154", params,
                new BeanPropertyRowMapper<>(A4511Filter.class));
        filter.setResponse((List<A4511Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public List<A3152> getPaises() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05016",
                new BeanPropertyRowMapper<>(A3152.class));
        return ((List<A3152>) obj.get("result"));
    }

    @Override
    public SQP05004Filter loadSQP05004Filter(SQP05004Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05004", params,
                new BeanPropertyRowMapper<>(A4451MP.class));
        filter.setLst((List<A4451MP>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSQP05152Filter(SQP05152Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05152", params);
    }

    
}
