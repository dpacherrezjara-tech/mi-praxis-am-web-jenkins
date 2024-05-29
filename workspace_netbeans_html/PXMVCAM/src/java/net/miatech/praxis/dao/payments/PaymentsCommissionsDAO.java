package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.PaymentsCommissionsLogic;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.A4508Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05135Filter;
import net.miatech.praxis.payment.filter.SQP05155Filter;
import net.miatech.praxis.payment.filter.SQP05156Filter;
import net.miatech.praxis.payment.filter.SQP05158Filter;
import net.miatech.praxis.payment.filter.SQP05267Filter;
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
public class PaymentsCommissionsDAO implements PaymentsCommissionsLogic {

    @Autowired
    private JdbcUtils jdbcUtils;
    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP05155Filter loadSQP05155Filter(SQP05155Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05155", params,
                new BeanPropertyRowMapper<>(A4508Filter.class));
        filter.setResponse((List<A4508Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Transactional
    @Override
    public SQP05156Filter loadSQP05156Filter(SQP05156Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05156", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public List<A3152> getPaises() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05016", new BeanPropertyRowMapper<>(A3152.class));
        return ((List<A3152>) obj.get("result"));
    }

    @Override
    public List<A006> getMonedas() throws Exception {
         Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05159",
                new BeanPropertyRowMapper<>(A006.class));
        List<A006> res = (List<A006>) obj.get("result");
        return res;
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
    public SQP05158Filter loadSQP05158Filter(SQP05158Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05158", params,
                new BeanPropertyRowMapper<>(A4508Filter.class));
        List<A4508Filter> lst = (List<A4508Filter>) obj.get("result");
        if (!lst.isEmpty()) {
            filter.setResponse(lst.get(0));
        }
        return filter;
    }

    @Transactional
    @Override
    public SQP05135Filter loadSQP05135Filter(SQP05135Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05135", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public void loadSQP05267Filter(SQP05267Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05267", params);
    }

    
}
