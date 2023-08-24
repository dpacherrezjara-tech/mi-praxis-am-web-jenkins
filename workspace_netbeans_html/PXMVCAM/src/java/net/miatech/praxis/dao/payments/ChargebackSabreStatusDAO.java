package net.miatech.praxis.dao.payments;

import java.sql.Connection;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.ChargebackSabreStatusLogic;
import net.miatech.praxis.payment.filter.A4482Filter;
import net.miatech.praxis.payment.filter.PNRFilter;
import net.miatech.praxis.payment.filter.SQP05047Filter;
import net.miatech.praxis.payment.filter.SQP05046Filter;
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
@Scope("request")
public class ChargebackSabreStatusDAO implements ChargebackSabreStatusLogic{

    @Autowired
    private CurrentSession session;

    //<editor-fold defaultstate="collapsed" desc="JDBC">
    private JdbcTemplate getConnection() throws Exception {
        Connection cnx = session.getServerSession().getCNXIBMDB2().getIBMDB2Connection();
        JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(cnx, false));
        return jdbcTemplate;
    }
    //</editor-fold>
    
    @Override
    public SQP05046Filter getSQP05046Filter(SQP05046Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP05046")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(A4482Filter.class));
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<A4482Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP05047Filter getSQP00697Filter(SQP05047Filter filter) throws Exception {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(this.getConnection())
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP05047")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(PNRFilter.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcCall.execute(params);
        filter.setResponse((List<PNRFilter>) obj.get("result"));
        return filter;
    }
}
