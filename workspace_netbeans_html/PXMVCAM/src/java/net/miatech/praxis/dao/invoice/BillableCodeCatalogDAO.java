package net.miatech.praxis.dao.invoice;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.invoice.entities.A4586;
import net.miatech.praxis.invoice.filters.SQP05356Filter;
import net.miatech.praxis.invoice.filters.SQP05357Filter;
import net.miatech.praxis.invoice.filters.SQP05360Filter;
import net.miatech.praxis.logic.invoice.BillableCodeCatalogLogic;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

/**
 *
 * @author dvicente
 */
@Service
@Scope("request")
public class BillableCodeCatalogDAO implements BillableCodeCatalogLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    private static final String LIBRARY = "PRAXIS";

    @Override
    public SQP05356Filter loadSQP05356Filter(SQP05356Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05356",
                params, new BeanPropertyRowMapper<>(A4586.class));
        filter.setResponse((List<A4586>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05357Filter loadSQP05357Filter(SQP05357Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05357",
                params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05360Filter loadSQP05360Filter(SQP05360Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05360",
                params,new BeanPropertyRowMapper<>(A4586.class));
        List<A4586> res = (List<A4586>) obj.get("result");
        if (res != null) {
            if (res.size() == 1) {
                filter.setResponse(res.get(0));
            }
        }
        return filter;
    }
    
}
