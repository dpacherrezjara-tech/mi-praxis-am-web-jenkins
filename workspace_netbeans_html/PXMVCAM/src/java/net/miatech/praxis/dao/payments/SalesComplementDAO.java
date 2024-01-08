package net.miatech.praxis.dao.payments;

import java.math.BigDecimal;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.SalesComplementLogic;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;
import net.miatech.praxis.payment.filter.A4453Filter;
import net.miatech.praxis.payment.filter.A4454Filter;
import net.miatech.praxis.payment.filter.A4455Filter;
import net.miatech.praxis.payment.filter.SQP04979Filter;
import net.miatech.praxis.payment.filter.SQP04980Filter;
import net.miatech.praxis.payment.filter.SQP04981Filter;
import net.miatech.praxis.payment.filter.SQP04982Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.utils.JdbcUtils;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
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
public class SalesComplementDAO implements SalesComplementLogic {
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SQP04979Filter getSQP04979Filter(SQP04979Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04979", params,
                new BeanPropertyRowMapper<>(A4453Filter.class));
        List<A4453Filter> response = (List<A4453Filter>) obj.get("result");
        for (A4453Filter bean : response) {
            //descSTVAL
            if (bean.getSTVAL().trim().equals("")) {
                bean.setDescSTVAL("Pending");
            } else if (bean.getSTVAL().equals("1") && bean.getSTCON().trim().equals("")) {
                bean.setDescSTVAL("Match");
            } else if (bean.getSTVAL().equals("1") && bean.getSTCON().equals("2")) {
                bean.setDescSTVAL("Accounted");
            }
            //descFAMEXCHG
            if (bean.getFAMEXCHG().equals("1")) {
                bean.setDescFAMEXCHG("Match");
            }
            //descFAMEX
            if (bean.getFAMEX().trim().equals("")) {
                bean.setDescFAMEX("Pending");
            } else if (bean.getFAMEX().equals("1")) {
                bean.setDescFAMEX("Match");
                bean.setPASSED_DAYS("00");
            }
        }
        filter.setResult(response);
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP04980Filter getSQP04980Filter(SQP04980Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04980", params,
                new BeanPropertyRowMapper<>(A4454Filter.class));
        List<A4454Filter> response = (List<A4454Filter>) obj.get("result");
        for (A4454Filter bean : response) {
            //descSTCON
            if (bean.getSTVAL().trim().equals("")) {
                bean.setDescSTVAL("Pending");
            } else if (bean.getSTVAL().equals("1")&& bean.getSTCON().trim().equals("")) {
                bean.setDescSTVAL("Match");
            } else if (bean.getSTVAL().equals("1")&& bean.getSTCON().equals("2")) {
                bean.setDescSTVAL("Accounted");
            }
            //descFAMEX
            if (bean.getFAMEX().trim().equals("")) {
                bean.setDescFAMEX("Pending");
            } else if (bean.getFAMEX().equals("2")) {
                bean.setDescFAMEX("Match");
            }
        }
        filter.setResult(response);
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP04981Filter getSQP04981Filter(SQP04981Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04981", params,
                new BeanPropertyRowMapper<>(A4454Filter.class));
        List<A4454Filter> response = (List<A4454Filter>) obj.get("result");
        for (A4454Filter bean : response) {
            //descSTCON
            if (bean.getSTVAL().trim().equals("")) {
                bean.setDescSTVAL("Pending");
            } else if (bean.getSTVAL().equals("1")&& bean.getSTCON().trim().equals("")) {
                bean.setDescSTVAL("Match");
            } else if (bean.getSTVAL().equals("1") && bean.getSTCON().equals("2")) {
                bean.setDescSTVAL("Accounted");
            }
            //descFAMEX
            if (bean.getFAMEX().trim().equals("")) {
                bean.setDescFAMEX("Pending");
            } else if (bean.getFAMEX().equals("3")) {
                bean.setDescFAMEX("Match");
            }
        }
        filter.setResult(response);
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SQP04982Filter getSQP04982Filter(SQP04982Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04982", params,
                new BeanPropertyRowMapper<>(A4455Filter.class));
        List<A4455Filter> response = (List<A4455Filter>) obj.get("result");
        filter.setSVFOP((BigDecimal) obj.get("SVFOP"));
        for (A4455Filter bean : response) {
            bean.setSVFOP_TOT(filter.getSVFOP());
        }
        filter.setResult(response);
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter){
        List<SQP00697Filter> lstRtn = new ArrayList<>();
        try {
            // Definir los parámetros de entrada
            SqlParameterSource inParams = new MapSqlParameterSource()
                    .addValue("IN_CCUST", "139")
                    .addValue("IN_TFILTER", filter.IN_TFILTER)
                    .addValue("IN_TEXT", filter.IN_TEXT)
                    .addValue("IN_PAGROW", filter.page.PAGROW)
                    .addValue("IN_ROWLST", "")
                    .addValue("IN_DATE_FROM", filter.IN_DATE_FROM)
                    .addValue("IN_DATE_TO", filter.IN_DATE_TO)
                    .addValue("IN_IATA", filter.IN_IATA)
                    .addValue("IN_CAPL", "");

            // Ejecutar la llamada al procedimiento almacenado y obtener el resultado
            Map<String, Object> result = jdbcUtils.executeSQP("PRAXIS", "SQP00697", inParams);
            List<Map<String, Object>> rs = (List<Map<String, Object>>) result.get("#result-set-1");
            for (Map<String, Object> item : rs) {
                SQP00697Filter objRtn = new SQP00697Filter();
                objRtn.ROWKEY = item.get("ROWKEY").toString();
                objRtn.A720PAX = item.get("A720PAX").toString();
                objRtn.TICKET = item.get("TICKET").toString();
                objRtn.A1531NREF = item.get("A1531NREF").toString();
                objRtn.A720CIUVTA = item.get("A720CIUVTA").toString();
                objRtn.A720AGENTE = item.get("A720AGENTE").toString();
                objRtn.A720FECVTA = Functions.getMonthConvertDate(item.get("A720FECVTA").toString());
                objRtn.A720TARIFA = Double.parseDouble(item.get("A720TARIFA").toString());
                objRtn.A720MONEDA = item.get("A720MONEDA").toString();
                objRtn.A720PNR = item.get("A720PNR").toString();
                objRtn.IN_IATA = item.get("A1531CAPL").toString(); // Deberías ser A1531CAPL en lugar de IN_IATA
                objRtn.A1531VFOP = Double.parseDouble(item.get("A1531VFOP").toString());
                objRtn.A720SEQ = item.get("A720SEQ").toString();
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return lstRtn;
    }

    @Override
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception {
        JdbcTemplate jdbcTemplate = jdbcUtils.getJdbcTemplate();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("PRAXISMP")
                .withProcedureName("SQP05004")
                .returningResultSet("result", new BeanPropertyRowMapper<>(A4451MP.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        filter.setLst((List<A4451MP>) jdbcCall.execute(params).get("result"));
        filter.setKEY1("AC");
        //agrega lista de complementos
        params = new BeanPropertySqlParameterSource(filter);
        filter.getLst().addAll((List<A4451MP>) jdbcCall.execute(params).get("result"));
        //agrega lista de tarjetas de filtro de tarjetas
        filter.setKEY1("CC");
        params = new BeanPropertySqlParameterSource(filter);
        filter.getLst().addAll((List<A4451MP>) jdbcCall.execute(params).get("result"));
        jdbcUtils.closeConnection(jdbcCall);
        return filter;
    }

    @Override
    public List<A3152> getPaises() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05016", 
                new BeanPropertyRowMapper<>(A3152.class));
        return ((List<A3152>) obj.get("result"));
    }

}
