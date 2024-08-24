package net.miatech.praxis.dao.salesAudit;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.SaleAudit.entities.A4590;
import net.miatech.praxis.SaleAudit.entities.A4591;
import net.miatech.praxis.SaleAudit.entities.A4592;
import net.miatech.praxis.SaleAudit.entities.A4593;
import net.miatech.praxis.SaleAudit.filter.SQP05372Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05379Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05401Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05402Filter;
import net.miatech.praxis.logic.salesAudit.ReservationBrowserLogic;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.scheduling.annotation.Async;
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

    @Async("sabreRobotExecutor")
    @Override
    public SQP05372Filter loadSQP05372Filter(SQP05372Filter filter) throws Exception {
        if(filter.getIN_OPTION().equals("X")){
            final String sql = "INSERT INTO PXSAUDIT.X3179 VALUES(:CCUST,:PRDA,:PNR,:FUENTE,:CUUID)";
            BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getData().size()];
            for (int i = 0; i < filter.getData().size(); i++) {
                insertParams[i] = new BeanPropertySqlParameterSource(filter.getData().get(i));
            }
            jdbcUtils.executeNamedParam(sql, insertParams);
        }
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05372", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        System.out.println(obj.get("SQLMSG"));
        return filter;
    }

    @Override
    public SQP05379Filter loadSQP05379Filter(SQP05379Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05379", params,
                BeanPropertyRowMapper.newInstance(A4592.class));
        filter.setResponse((List<A4592>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05401Filter loadSQP05401Filter() throws Exception {
        SQP05401Filter filter = new SQP05401Filter();
        BeanPropertyRowMapper rm = new BeanPropertyRowMapper(A4593.class);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05401",rm);
        filter.setResponse((List<A4593>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05402Filter loadSQP05402Filter(SQP05402Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05402", params);
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }

}
