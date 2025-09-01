package net.miatech.praxis.dao.salesAudit;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.SaleAudit.entities.A4590;
import net.miatech.praxis.SaleAudit.entities.A4591;
import net.miatech.praxis.SaleAudit.entities.A4592;
import net.miatech.praxis.SaleAudit.entities.A4593;
import net.miatech.praxis.SaleAudit.filter.RobotSabrePayload;
import net.miatech.praxis.SaleAudit.filter.RobotSabreResponse;
import net.miatech.praxis.SaleAudit.filter.SQP05372Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05379Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05401Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05402Filter;
import net.miatech.praxis.classes.CurrentSession;
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
    
    @Autowired
    public CurrentSession serverSession;

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

//    @Async("sabreRobotExecutor")
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
        filter.setSQLFECR((String) obj.get("SQLFECR"));        
        System.out.println(obj.get("SQLMSG"));
        
        if (filter.getSQLRES() == 1){
            
            RobotSabrePayload payload = new RobotSabrePayload();
            payload.setOPTION("P");
            payload.setCCUST(filter.getIN_CCUST());
            payload.setFECR(filter.getSQLFECR());
            payload.setCUUID(filter.getIN_UUID());

            RobotSabreResponse responseData = loadExecuteRobot(payload);

            filter.setSQLMSG(filter.getSQLMSG() + " and " + responseData.getMessage());

        }
        return filter;
    }
    
    @Override
    public RobotSabreResponse loadExecuteRobot(RobotSabrePayload payload) throws Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("API_ROBOT_COMMAND_CENTER").toString();
        String envREST = serverSession.getServerSession().getPropertySession().get("API_ROBOT_COMMAND_CENTER_ENVIRONMENT").toString();
//            String urlREST = "http://127.0.0.1:9999/";
        String urlAPI  = "api/v1/robot_sabre_search/";
        payload.setENVIRONMENT(envREST);
        
        RobotSabreResponse responseData = new RobotSabreResponse();
        Unirest.setTimeouts(3600000, 3600000); 
        
        HttpResponse<JsonNode> responseAPI = Unirest.post( urlREST + urlAPI )
                .header("content-type", "application/json") 
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(payload))
                .asJson();
        if (responseAPI.getStatus() == 200) {
            responseData = new Gson().fromJson(responseAPI.getBody().getObject().toString(), RobotSabreResponse.class);
//                String message = responseAPI.getBody().getObject().get("message").toString();
//            filter.setSQLMSG((String) filter.getSQLMSG() + " and " + responseData.getMessage());
        } else {
            responseData.setStatus(0);
            responseData.setMessage("Error in Api Robot Command Center");            
        }
        
        return responseData;
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
    public SQP05401Filter loadSQP05401Filter(SQP05401Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
//        BeanPropertyRowMapper params = new BeanPropertyRowMapper(A4593.class);
//        BeanPropertyRowMapper params = new BeanPropertyRowMapper();  //A4593.class
        BeanPropertyRowMapper<A4593> mapper = new BeanPropertyRowMapper<>(A4593.class);
        
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05401", params, mapper);
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
