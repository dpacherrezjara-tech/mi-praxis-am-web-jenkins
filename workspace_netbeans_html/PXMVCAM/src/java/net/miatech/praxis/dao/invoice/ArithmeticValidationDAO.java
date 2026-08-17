package net.miatech.praxis.dao.invoice;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.miatech.praxis.invoice.entities.A1924NZ;
import net.miatech.praxis.invoice.entities.A1946VALID;
import net.miatech.praxis.invoice.filters.SQP05361Filter;
import net.miatech.praxis.invoice.filters.SQP05362Filter;
import net.miatech.praxis.invoice.filters.SQP05363Filter;
import net.miatech.praxis.logic.invoice.ArithmeticValidationLogic;
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
public class ArithmeticValidationDAO implements ArithmeticValidationLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    private static final String LIBRARY = "PRAXIS";

    @Override
    public SQP05361Filter loadSQP05361Filter(SQP05361Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05361",
                params, new BeanPropertyRowMapper<>(A1946VALID.class));
        filter.setResponse((List<A1946VALID>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05362Filter loadSQP05362Filter(SQP05362Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05362",
                params, new BeanPropertyRowMapper<>(A1924NZ.class));
        filter.setResponse((List<A1924NZ>) obj.get("result"));
        return filter;
    }

    @Override
    public List<SQP05363Filter> loadSQP05363Filter(List<SQP05363Filter> data) throws Exception {
        data.forEach((SQP05363Filter filter)->{
            SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
            try {
                Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05363",
                        params);
                filter.setSQLRES((Integer) obj.get("SQLRES"));
                filter.setSQLMSG((String) obj.get("SQLMSG"));
            } catch (Exception ex) {
                Logger.getLogger(ArithmeticValidationDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        });
        return data;
    }
    
}
