package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.MerchantNumberTmzLogic;
import net.miatech.praxis.payment.entities.A003;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.praxis.payment.filter.A4202Filter;
import net.miatech.praxis.payment.filter.SQP05254Filter;
import net.miatech.praxis.payment.filter.SQP05255Filter;
import net.miatech.praxis.payment.filter.SQP05256Filter;
import net.miatech.praxis.payment.filter.SQP05258Filter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

/**
 *
 * @author Dvicente
 */
@Service
@Scope("session")
public class MerchantNumberTmzDAO implements MerchantNumberTmzLogic{
    
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
    public SQP05254Filter loadSQP05254Filter(SQP05254Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05254", params,
                new BeanPropertyRowMapper<>(A2354Filter.class));
        filter.setResponse((List<A2354Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05255Filter loadSQP05255Filter(SQP05255Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        List<BeanPropertyRowMapper> mappers = new ArrayList<>();
        mappers.add(new BeanPropertyRowMapper<>(A2354Filter.class));
        mappers.add(new BeanPropertyRowMapper<>(A4202Filter.class));
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05255", params,
                mappers);
        List<A2354Filter> lst = (List<A2354Filter>) obj.get("result0");
        List<A4202Filter> iatas = (List<A4202Filter>) obj.get("result1");
        if (!lst.isEmpty()) {
            filter.setResponse(lst.get(0));
            filter.setIatas(iatas);
        }
        return filter;
    }

    @Override
    public void loadSQP05256Filter(SQP05256Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SQP05256", params);
        for(A4202Filter obj:filter.getIatas()){
            MapSqlParameterSource map = new MapSqlParameterSource();
            map.addValue("IN_CCUST", obj.getCCUST());
            map.addValue("IN_MERCHN", obj.getMERCHN());
            map.addValue("IN_IATA", obj.getCIATA());
            map.addValue("IN_SCOUNTRY", obj.getSCOUNTRY());
            map.addValue("IN_CANAL", obj.getCANAL());
            jdbcUtils.executeSQP(LIBRARY, "SQP05257", map);
        }
    }

    @Override
    public SQP05258Filter loadSQP05258Filter(SQP05258Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05258", params,
                new BeanPropertyRowMapper<>(A003.class));
        List<A003> lst = (List<A003>) obj.get("result");
        if(!lst.isEmpty()){
            filter.setResponse(lst.get(0));
        }
        filter.setSQLCOD((Integer) obj.get("SQLCOD"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        return filter;
    }
    
    
}
