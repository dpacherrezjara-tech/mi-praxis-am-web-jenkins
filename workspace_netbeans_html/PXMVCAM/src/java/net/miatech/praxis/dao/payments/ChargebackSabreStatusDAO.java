package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.ChargebackSabreStatusLogic;
import net.miatech.praxis.payment.filter.A4482Filter;
import net.miatech.praxis.payment.filter.PNRFilter;
import net.miatech.praxis.payment.filter.SQP05047Filter;
import net.miatech.praxis.payment.filter.SQP05046Filter;
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
@Scope("request")
public class ChargebackSabreStatusDAO implements ChargebackSabreStatusLogic{

    @Autowired
    private JdbcUtils jdbcUtils;
    private static final String LIBRARY = "PRAXISMP";
    
    @Override
    public SQP05046Filter getSQP05046Filter(SQP05046Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05046", params,
                new BeanPropertyRowMapper<>(A4482Filter.class));
        filter.setResponse((List<A4482Filter>) obj.get("result"));
        filter.setOU_ALERT((Integer) obj.get("OU_ALERT"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05047Filter getSQP00697Filter(SQP05047Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05047", params,
                new BeanPropertyRowMapper<>(PNRFilter.class));
        filter.setResponse((List<PNRFilter>) obj.get("result"));
        return filter;
    }
}
