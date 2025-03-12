package net.miatech.praxis.dao.flown;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.flown.dto.A4622;
import net.miatech.praxis.flown.dto.A4622Summ;
import net.miatech.praxis.flown.filter.SQP05424Filter;
import net.miatech.praxis.flown.filter.SQP05425Filter;
import net.miatech.praxis.logic.flown.EmdsSabreLogic;
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
public class EmdsSabreDAO implements EmdsSabreLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    private static final String LIBRARY = "PRAXIS";

    @Override
    public SQP05424Filter loadSQP05424Filter(SQP05424Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05424",
                params, new BeanPropertyRowMapper<>(A4622Summ.class));
        filter.setResponse((List<A4622Summ>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05425Filter loadSQP05425Filter(SQP05425Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05425",
                params, new BeanPropertyRowMapper<>(A4622.class));
        filter.setResponse((List<A4622>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }
    
}
