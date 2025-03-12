package net.miatech.praxis.dao.payments;

import java.sql.Connection;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.Pagination;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.payments.InputsTmzLogic;
import net.miatech.praxis.payment.entities.A4305;
import net.miatech.praxis.payment.entities.A4344;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
import net.miatech.praxis.payment.filter.SQP04974Filter;
import net.miatech.praxis.payment.filter.SQP04975Filter;
import net.miatech.praxis.payment.filter.SQP04976Filter;
import net.miatech.praxis.payment.filter.SQP05033Filter;
import net.miatech.praxis.utils.JdbcUtils;
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
@Scope("request")
public class InputsTMZDAO implements InputsTmzLogic {

    @Autowired
    private CurrentSession session;
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";


    @Override
    public SQP04971Filter getSQP04971Filter(SQP04971Filter filter) {
        try {
            SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
            Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04971", params,
                new BeanPropertyRowMapper<>(A4451.class));
            filter.setLstFuentes((List<A4451>) obj.get("result"));
            MasterDAO masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) session.getServerSession());
            filter.setLstPaises(masterDAO.loadPaises());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return filter;

    }

    @Override
    public List<CalendarTmz> getSQP04972Filter(SQP04972Filter filter) {
        List<CalendarTmz> result = new ArrayList<>();
        try {
            SQP04972Filter res = new SQP04972Filter();
            SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
            Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04972", params);
            res.setSTS((String) obj.get("STS"));
            if (res.getSTS().equals("1")) {
                //obtiene listado de fechas activas
                res.setLstFechas((List<Map<String, String>>) obj.get("#result-set-1"));
                //numero de archivos por procesador
                res.setNumFiles((int) obj.get("NUM_FILES"));
                //listado de fechas agrupadas
                Map<String, List<Map<String, String>>> fechaPorProcesador = new HashMap<>();
                //agrupamiento de fechas
                for (Map<String, String> f : res.getLstFechas()) {
                    String fechaAgrupada = f.get("prda");
                    if (!fechaPorProcesador.containsKey(fechaAgrupada)) {
                        fechaPorProcesador.put(fechaAgrupada, new ArrayList<Map<String, String>>());
                    }
                    fechaPorProcesador.get(fechaAgrupada).add(f);
                }
                //obtiene las fechas del año
                List<LocalDate> fechas = this.obtenerFechasLaborales(Integer.parseInt(filter.getFROM_YEAR()));
                //valida fecha
                for (LocalDate fecha : fechas) {
                    String fechaString = new StringBuilder()
                            .append(fecha.getYear())
                            .append(String.format("%02d", fecha.getMonthValue()))
                            .append(String.format("%02d", fecha.getDayOfMonth()))
                            .toString();
                    CalendarTmz fechaStatus = new CalendarTmz();
                    fechaStatus.setFecha(fechaString);
                    fechaStatus.setProcesador(filter.getTIPO());
                    fechaStatus.setDayName(fecha.getDayOfWeek().name());
                    if (!fechaPorProcesador.containsKey(fechaString)) {
                        fechaStatus.setStatus("not found");
                    } else {
                        if (fechaPorProcesador.get(fechaString).size() != res.getNumFiles()) {
                            fechaStatus.setStatus("incomplete");
                        } else {
                            fechaStatus.setStatus("ok");
                        }
                    }
                    result.add(fechaStatus);
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return result;
    }

    private List<LocalDate> obtenerFechasLaborales(int year) {
        LocalDate startDate = LocalDate.ofYearDay(year, 1);
        LocalDate endDate;
        if (year == LocalDate.now().getYear()) {
            endDate = LocalDate.now();
        } else {
            endDate = LocalDate.ofYearDay(year, 365); // O 366 si es bisiesto
        }
        LocalDate date = startDate;
        List<LocalDate> result = new ArrayList<>();
        //update: plopez comento que debe considerarse sabado y domingo
        while (!date.isAfter(endDate)) {
//            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
//                result.add(date);
//            }
            result.add(date);
            date = date.plusDays(1);
        }
        return result;
    }

    @Override
    public List<SQP04974Filter> getSQP04974Filter(SQP04974Filter filter) {
        List<SQP04974Filter> res = new ArrayList<>();
        try {
            String procedure = "";
            if(filter.getTIPO().equals("P")){
                procedure= "SQP04974";
            }else{
                procedure= "SQP05030";
            }
            SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
            Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, procedure, params,
                new BeanPropertyRowMapper<>(SQP04974Filter.class));
            res = (List<SQP04974Filter>) obj.get("result");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return res;
    }

    @Override
    public List<SQP04975Filter> getSQP04975Filter(SQP04975Filter filter) {
        List<SQP04975Filter> res = new ArrayList<>();
        try {
            SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
            Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP04975", params,
                new BeanPropertyRowMapper<>(SQP04975Filter.class));
            filter.setSTS((String) obj.get("STS"));
            if (filter.getSTS().equals("1")) {
                res = (List<SQP04975Filter>) obj.get("result");
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return res;
    }

    @Override
    public SQP04976Filter getSQP04976Filter(SQP04976Filter filter) {
        //SQP04976Filter res = new SQP04976Filter();
        try {
            JdbcTemplate jdbcTemplate = jdbcUtils.getJdbcTemplate();
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP04976");

            if (filter.getTIPO().equals("0")) {
                jdbcCall.returningResultSet("result", new BeanPropertyRowMapper<>(A4305.class));
            }else if(filter.getTIPO().equals("1")){
                jdbcCall.returningResultSet("result", new BeanPropertyRowMapper<>(A4344.class));
            }else {
                jdbcCall.returningResultSet("result", new BeanPropertyRowMapper<>(A4305.class));
            }
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("PROCESADOR", filter.getPROCESADOR());
            params.addValue("TIPO", filter.getTIPO());
            params.addValue("FECHA_FROM", filter.getFECHA_FROM());

            //<editor-fold defaultstate="collapsed" desc="paginado request">
            params.addValue("IO_PAGNUM", filter.getPage().PAGNUM);
            params.addValue("IO_PAGROW", filter.getPage().PAGROW);
            params.addValue("IO_TOTPAG", filter.getPage().TOTPAG);
            params.addValue("IO_TOTROW", filter.getPage().TOTROW);
            //</editor-fold>
            Map<String, Object> obj = jdbcCall.execute(params);
            filter.setSTS((String) obj.get("STS"));
            if (filter.getSTS().equals("1")) {
                //<editor-fold defaultstate="collapsed" desc="paginado response">
                Pagination page = new Pagination();
                page.PAGNUM = (int) obj.get("IO_PAGNUM");
                page.PAGROW = (int) obj.get("IO_PAGNUM");
                page.TOTPAG = (int) obj.get("IO_TOTPAG");
                page.TOTROW = (int) obj.get("IO_TOTROW");
                filter.setPage(page);
                //</editor-fold>
                switch (filter.getTIPO()) {
                    case "0":
                        List<A4305> lstReceived = (List<A4305>) obj.get("result");
                        filter.setLstReceived(lstReceived);
                        filter.setTotal(!lstReceived.isEmpty()?filter.getPage().TOTROW:0);
                        break;
                    case "1":
                        List<A4344> lstLoaded = (List<A4344>) obj.get("result");
                        filter.setLstLoaded(lstLoaded);
                        filter.setTotal(!lstLoaded.isEmpty()?filter.getPage().TOTROW:0);
                        break;
                    default:
                        List<A4305> lstExonerados = (List<A4305>) obj.get("result");
                        filter.setLstExonerados(lstExonerados);
                        filter.setTotal(!lstExonerados.isEmpty()?filter.getPage().TOTROW:0);
                        break;
                }
            }
            jdbcUtils.closeConnection(jdbcCall);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return filter;
    }

    @Override
    public SQP05033Filter getSQP05033Filter(SQP05033Filter filter) {
        try {
            filter.setPage();
            SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
            Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05033", params);
            filter.setLst((List<Map<String, Object>>) obj.get("#result-set-1"));
            filter.setPageOut(obj);
        } catch (Exception e) {
            System.out.println("Error SQP05033Filter: " + e.getMessage());
        }
        return filter;
    }

}
