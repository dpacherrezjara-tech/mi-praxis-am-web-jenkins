package net.miatech.praxis.dao.travelbank;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import net.miatech.beans.Pagination;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.travelbank.SQP04836Filter;
import net.miatech.praxis.travelbank.SQP04837Filter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Dvicente
 */
@Repository
public class DeliveryFilesDAO {
    
    //<editor-fold defaultstate="collapsed" desc="variables">
    private IServerSession session;
    private Connection cnx = null;
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    //</editor-fold>
    
    public List<SQP04836Filter> getSQP04836Filter(SQP04836Filter filter)throws Exception{
        List<SQP04836Filter> results = new ArrayList<>();
        try{
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(cnx,false));
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PXTRVLBANK")
                    .withProcedureName("SQP04836")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(SQP04836Filter.class));
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("CCUST", filter.getCCUST());
            params.addValue("FECHAI", filter.getFECHAI());
            params.addValue("FECHAF", filter.getFECHAF());
            params.addValue("IDFIL", filter.getIDFIL());
            params.addValue("TIPO", filter.getTIPO());
            //paginado
            params.addValue("IO_PAGNUM", filter.getPagination().PAGNUM);
            params.addValue("IO_PAGROW", filter.getPagination().PAGROW);
            params.addValue("IO_TOTPAG", filter.getPagination().TOTPAG);
            params.addValue("IO_TOTROW", filter.getPagination().TOTROW);
            final Map<String,Object> obj = jdbcCall.execute(params);
            results = (List<SQP04836Filter>) obj.get("result");
            results.forEach(new Consumer<SQP04836Filter>() {
                @Override
                public void accept(SQP04836Filter t) {
                     Pagination page = new Pagination();
                     page.PAGNUM = (int) obj.get("IO_PAGNUM");
                     page.PAGROW = (int) obj.get("IO_PAGROW");
                     page.TOTPAG = (int) obj.get("IO_TOTPAG");
                     page.TOTROW = (int) obj.get("IO_TOTROW");
                     t.setPagination(page);
                }
            });
        }catch(Exception ex){
            System.out.println("Error => " + ex.getMessage());
        }finally{
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return results;
    }
    
    public List<SQP04837Filter> getSQP04837Filter(SQP04837Filter filter)throws Exception{
        List<SQP04837Filter> results = new ArrayList<>();
        try{
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(cnx,false));
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PXTRVLBANK")
                    .withProcedureName("SQP04837")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(SQP04837Filter.class));
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("CCUST", filter.getCCUST());
            params.addValue("IDFIL", filter.getIDFIL());
            params.addValue("TIPO", filter.getTIPO());
            final Map<String,Object> obj = jdbcCall.execute(params);
            results = (List<SQP04837Filter>) obj.get("result");
        }catch(Exception ex){
            System.out.println("Error => " + ex.getMessage());
        }finally{
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return results;
    }
}
