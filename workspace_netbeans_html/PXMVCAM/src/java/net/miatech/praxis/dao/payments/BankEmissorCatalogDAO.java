package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.BankEmissorCatalogLogic;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4559;
import net.miatech.praxis.payment.filter.SQP05262Filter;
import net.miatech.praxis.payment.filter.SQP05263Filter;
import net.miatech.praxis.payment.filter.SQP05265Filter;
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
public class BankEmissorCatalogDAO implements BankEmissorCatalogLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public List<A3152> getPaises() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05745", 
                new BeanPropertyRowMapper<>(A3152.class));
        return ((List<A3152>) obj.get("result"));
    }
    
    @Override
    public SQP05262Filter loadSQP05262Filter(SQP05262Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05262", params,
                new BeanPropertyRowMapper<>(A4559.class));
        filter.setResponse((List<A4559>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSQP05263Filter(SQP05263Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05263", params);
    }

    @Override
    public SQP05265Filter loadSQP05265Filter(SQP05265Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05265", params,
                new BeanPropertyRowMapper<>(A4559.class));
        List<A4559> lst = (List<A4559>) obj.get("result");
        if (!lst.isEmpty()) {
            filter.setResponse(lst.get(0));
        }
        return filter;
    }

}
