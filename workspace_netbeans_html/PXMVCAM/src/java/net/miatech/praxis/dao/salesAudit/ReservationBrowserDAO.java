package net.miatech.praxis.dao.salesAudit;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.SaleAudit.entities.A4590;
import net.miatech.praxis.SaleAudit.entities.A4591;
import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.logic.salesAudit.ReservationBrowserLogic;
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
public class ReservationBrowserDAO implements ReservationBrowserLogic {
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    private static final String LIBRARY = "PXSAUDIT";
    
    @Override
    public SQP05377Filter loadSQP05377Filter(SQP05377Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        BeanPropertyRowMapper rm = new BeanPropertyRowMapper();
        if (filter.getIN_OPTION().equals("P")) {
            rm.setMappedClass(A4590.class);
        } else {
            rm.setMappedClass(A4591.class);
        }
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05377", params,
                rm);
        filter.setResponse((List<A4590>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }
    
}
