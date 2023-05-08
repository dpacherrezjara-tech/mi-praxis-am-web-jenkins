package net.miatech.praxis.dao.payments;

import java.sql.Connection;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.payments.InputsTmzLogic;
import net.miatech.praxis.payment.A4451;
import net.miatech.praxis.payment.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
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
            System.out.println("Error generado: " + e.getMessage());
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

                res.setLstFechas((List<Map<String, String>>) obj.get("#result-set-1"));
                res.setLstFiles((List<Map<String, String>>) obj.get("#result-set-2"));
                
                Map<String, List<Map<String, String>>> fechaPorProcesador = new HashMap<>();

                for (Map<String, String> f : res.getLstFechas()) {
                    String fechaAgrupada = f.get("prda");
                    if (!fechaPorProcesador.containsKey(fechaAgrupada)) {
                        fechaPorProcesador.put(fechaAgrupada, new ArrayList<Map<String, String>>());
                    }
                    fechaPorProcesador.get(fechaAgrupada).add(f);
                }
                
                int numFiles = res.getLstFiles().size();

                List<LocalDate> fechas = this.obtenerFechasLaborales(Integer.parseInt(filter.getFROM_YEAR()));
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
                    }else{
                        if(fechaPorProcesador.get(fechaString).size()!=numFiles){
                            fechaStatus.setStatus("incomplete");
                        }else{
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

    public List<LocalDate> obtenerFechasLaborales(int year) {
        LocalDate startDate = LocalDate.ofYearDay(year, 1);
        LocalDate endDate;
        if (year == LocalDate.now().getYear()) {
            endDate = LocalDate.now();
        } else {
            endDate = LocalDate.ofYearDay(year, 365); // O 366 si es bisiesto
        }
        LocalDate date = startDate;
        List<LocalDate> result = new ArrayList<>();

        while (!date.isAfter(endDate)) {
            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
                result.add(date);
            }
            date = date.plusDays(1);
        }
        return result;
    }

}
