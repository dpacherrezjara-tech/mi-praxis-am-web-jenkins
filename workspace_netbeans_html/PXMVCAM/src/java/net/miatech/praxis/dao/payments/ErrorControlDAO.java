package net.miatech.praxis.dao.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.ErrorControlLogic;
import net.miatech.praxis.payment.entities.A4297MP;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.entities.A4480MP;
import net.miatech.praxis.payment.entities.A4481MP;
import net.miatech.praxis.payment.errordtos.VN0002PG;
import net.miatech.praxis.payment.errordtos.VN0002PG_UP;
import net.miatech.praxis.payment.filter.A4297Filter;
import net.miatech.praxis.payment.filter.A4481Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05020Filter;
import net.miatech.praxis.payment.filter.SQP05021Filter;
import net.miatech.praxis.payment.filter.SQP05025Filter;
import net.miatech.praxis.payment.filter.SQP05026Filter;
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
public class ErrorControlDAO implements ErrorControlLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public List<A4480MP> getSQP05019Filter() throws Exception{
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05019", 
                new BeanPropertyRowMapper<>(A4480MP.class));
        List<A4480MP> response = (List<A4480MP>) obj.get("result");
        return response;
    }

    @Override
    public SQP05020Filter getSQP05020Filter(SQP05020Filter filter) throws Exception{
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05020", params,
                new BeanPropertyRowMapper<>(A4481MP.class));
        filter.setResponse((List<A4481MP>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05004", params,
                new BeanPropertyRowMapper<>(A4451MP.class));
        filter.setLst((List<A4451MP>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05021Filter getSQP05021Filter(SQP05021Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05021", params,
                new BeanPropertyRowMapper<>(A4481Filter.class));
        filter.setLst((List<A4481Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05025Filter getSQP05025Filter(SQP05025Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05025", params,
                new BeanPropertyRowMapper<>(A4297MP.class));
        filter.setResult((List<A4297MP>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05026Filter getSQP05026Filter(SQP05026Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05026", params,
                new BeanPropertyRowMapper<>(A4297Filter.class));
        filter.setLst((List<A4297Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public VN0002PG getVN0002PGInfo(VN0002PG filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05027", params,
                new BeanPropertyRowMapper<>(VN0002PG.class));
        List<VN0002PG> errors = (List<VN0002PG>) obj.get("result");
        if(!errors.isEmpty()){
            filter = errors.get(0);
            return filter;
        }else{
            throw new SQLException("SQP05027: Objecto no encontrado.");
        }
    }

    @Override
    public Integer updateVN0002PG(VN0002PG_UP filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05028", params);
        Integer result = (Integer) obj.get("SQLRES");
        return result;
    }

}
