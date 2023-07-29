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
import net.miatech.praxis.payment.A4305;
import net.miatech.praxis.payment.A4344;
import net.miatech.praxis.payment.A4451;
import net.miatech.praxis.payment.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
import net.miatech.praxis.payment.filter.SQP04974Filter;
import net.miatech.praxis.payment.filter.SQP04975Filter;
import net.miatech.praxis.payment.filter.SQP04976Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
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

    private JdbcTemplate getConnection() throws Exception {
        Connection cnx = session.getServerSession().getCNXIBMDB2().getIBMDB2Connection();
        JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(cnx, false));
        return jdbcTemplate;
    }

    @Override
    public SQP04971Filter getSQP04971Filter(SQP04971Filter filter) {
        SQP04971Filter res = new SQP04971Filter();
        try {
            JdbcTemplate jdbcTemplate = this.getConnection();
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP04971")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(A4451.class));
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("TIPO", filter.getTIPO());
            params.addValue("STATUS", filter.getSTATUS());
            Map<String, Object> obj = jdbcCall.execute(params);
            res.setLstFuentes((List<A4451>) obj.get("result"));

            MasterDAO masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) session.getServerSession());
            res.setLstPaises(masterDAO.loadPaises());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return res;

    }

    @Override
    public List<CalendarTmz> getSQP04972Filter(SQP04972Filter filter) {
        List<CalendarTmz> result = new ArrayList<>();
        try {
            SQP04972Filter res = new SQP04972Filter();
            JdbcTemplate jdbcTemplate = this.getConnection();
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP04972");
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("TIPO", filter.getTIPO());
            params.addValue("FROM_YEAR", filter.getFROM_YEAR());
            params.addValue("CCUST", filter.getCCUST());
            Map<String, Object> obj = jdbcCall.execute(params);
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
            JdbcTemplate jdbcTemplate = this.getConnection();
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP04974")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(SQP04974Filter.class));
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("TIPO", filter.getTIPO());
            params.addValue("FECHA_FROM", filter.getFECHA_FROM());
            params.addValue("FECHA_TO", filter.getFECHA_TO());
            Map<String, Object> obj = jdbcCall.execute(params);
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
            JdbcTemplate jdbcTemplate = this.getConnection();
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP04975")
                    .returningResultSet("result", new BeanPropertyRowMapper<>(SQP04975Filter.class));
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("TIPO", filter.getTIPO());
            params.addValue("FECHA_FROM", filter.getFECHA_FROM());
            params.addValue("CCUST", filter.getCCUST());
            Map<String, Object> obj = jdbcCall.execute(params);
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
            JdbcTemplate jdbcTemplate = this.getConnection();
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("PRAXISMP")
                    .withProcedureName("SQP04976");

            if (filter.getTIPO().equals("0")) {
                jdbcCall.returningResultSet("result", new BeanPropertyRowMapper<>(A4305.class));
            }else if(filter.getTIPO().equals("1")){
                jdbcCall.returningResultSet("result", new BeanPropertyRowMapper<>(A4305.class));
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
                if (filter.getTIPO().equals("0")) {
                    List<A4305> lstReceived = (List<A4305>) obj.get("result");
                    filter.setLstReceived(lstReceived);
                    filter.setTotal(lstReceived.size()>0?filter.getPage().TOTROW:0);
                }else if (filter.getTIPO().equals("1")){
                    List<A4344> lstLoaded = (List<A4344>) obj.get("result");
                    filter.setLstLoaded(lstLoaded);
                    filter.setTotal(lstLoaded.size()>0?filter.getPage().TOTROW:0);
                }else {
                    List<A4305> lstExonerados = (List<A4305>) obj.get("result");
                    filter.setLstExonerados(lstExonerados);
                    filter.setTotal(lstExonerados.size()>0?filter.getPage().TOTROW:0);
                }
                
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return filter;
    }

}
