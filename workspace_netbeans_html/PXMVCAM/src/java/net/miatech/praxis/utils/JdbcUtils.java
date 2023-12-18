package net.miatech.praxis.utils;

import java.sql.Connection;
import net.miatech.praxis.classes.CurrentSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
@Scope("session")
public class JdbcUtils {
    
    @Autowired
    private CurrentSession session;
    
    public JdbcTemplate getJdbcTemplate() throws Exception {
        Connection cnx = session.getServerSession().getCNXIBMDB2().getIBMDB2Connection();
        return new JdbcTemplate(new SingleConnectionDataSource(cnx, false));
    }
    
    public NamedParameterJdbcTemplate getNamedParameter() throws Exception {
        return new NamedParameterJdbcTemplate(this.getJdbcTemplate());
    }
    
    public SimpleJdbcCall getJdbcCall()throws Exception{
        return new SimpleJdbcCall(this.getJdbcTemplate());
    }
}
