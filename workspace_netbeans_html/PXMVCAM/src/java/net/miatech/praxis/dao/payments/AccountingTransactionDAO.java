package net.miatech.praxis.dao.payments;

import java.sql.Connection;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.AccountingTransactionLogic;
import net.miatech.praxis.payment.A4451MP;
import net.miatech.praxis.payment.filter.A4183NEWFilter;
import net.miatech.praxis.payment.filter.A4331ATSumFilter;
import net.miatech.praxis.payment.filter.A4331ATTreeFilter;
import net.miatech.praxis.payment.filter.A4331NEWFilter;
import net.miatech.praxis.payment.filter.A4335Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05036Filter;
import net.miatech.praxis.payment.filter.SQP05037Filter;
import net.miatech.praxis.payment.filter.SQP05041Filter;
import net.miatech.praxis.payment.filter.SQP05042Filter;
import net.miatech.praxis.payment.filter.SQP05043Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Service;

/**
 *
 * @author Dvicente
 */
@Service
@Scope("session")
public class AccountingTransactionDAO implements AccountingTransactionLogic{
    
    //<editor-fold defaultstate="collapsed" desc="inject">
    @Autowired
    private CurrentSession session;

    private JdbcTemplate getConnection() throws Exception {
        Connection cnx = session.getServerSession().getCNXIBMDB2().getIBMDB2Connection();
        JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(cnx, false));
        return jdbcTemplate;
    } 
//</editor-fold>

    @Override
    public SQP05036Filter getSQP05036Filter(SQP05036Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                .withSchemaName("PRAXISMP")
                .withProcedureName("SQP05036")
                .returningResultSet("result", new BeanPropertyRowMapper(A4331ATSumFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4331ATSumFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                .withSchemaName("PRAXISMP")
                .withProcedureName("SQP05004")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4451MP.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        filter.setLst((List<A4451MP>) jdbcCall.execute(params).get("result"));
        return filter;
    }

    @Override
    public SQP05037Filter getSQP05037Filter(SQP05037Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                .withSchemaName("PRAXISMP")
                .withProcedureName("SQP05037")
                .returningResultSet("result", new BeanPropertyRowMapper(A4331ATTreeFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4331ATTreeFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05041Filter getSQP05041Filter(SQP05041Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                        .withSchemaName("PRAXISMP")
                        .withProcedureName("SQP05041")
                        .returningResultSet("result", new BeanPropertyRowMapper(A4331NEWFilter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4331NEWFilter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05042Filter getSQP05042Filter(SQP05042Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                        .withSchemaName("PRAXISMP")
                        .withProcedureName("SQP05042")
                        .returningResultSet("result", new BeanPropertyRowMapper(A4183NEWFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4183NEWFilter>) obj.get("result"));
        return filter;
    }

    @Override
    public SQP05043Filter getSQP05043Filter(SQP05043Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                        .withSchemaName("PRAXISMP")
                        .withProcedureName("SQP05043")
                        .returningResultSet("result", new BeanPropertyRowMapper(A4335Filter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4335Filter>) obj.get("result"));
        return filter;
    }

}
