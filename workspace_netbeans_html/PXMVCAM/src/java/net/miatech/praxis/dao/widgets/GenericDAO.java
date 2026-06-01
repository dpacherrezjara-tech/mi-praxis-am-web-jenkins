package net.miatech.praxis.dao.widgets;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import net.miatech.praxis.logic.widgets.GenericLogic;
import net.miatech.praxis.generics.CallStoreFilter;
import net.miatech.praxis.generics.CallStorePaggin;
import net.miatech.praxis.generics.DownloadExcelFilter;
import net.miatech.praxis.generics.ExcelFieldDef;
import net.miatech.praxis.generics.RecordsFilter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 *
 * @author dvicente
 */
@Service
@Scope("request")
public class GenericDAO implements GenericLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

    @Override
    public Map<String, Object> callStoreProcedure(CallStoreFilter filter) throws Exception {
        Map<String, Object> res = new HashMap<>();
        Map<String, Object> obj = new HashMap<>();
        Map<String, Object> outVals = new HashMap<>();
        if (filter.getParams().isEmpty()) {
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure());
        } else {
            MapSqlParameterSource params = new MapSqlParameterSource(filter.getParams());
            //SqlParameterSource params = 
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure(), params);
        }

        List<List<Map<String, Object>>> listaDeResultados = new ArrayList<>();
        
        for (Map.Entry<String, Object> entry: obj.entrySet()) {
            if (!(entry.getValue() instanceof List)) {
                outVals.put(entry.getKey(), entry.getValue());
            }
        }
        
        if (!obj.isEmpty()) {
            Map<Integer, List<Map<String, Object>>> sortedResults = new TreeMap<>();
            // Expresión regular para extraer el número del result-set
            Pattern pattern = Pattern.compile("#result-set-(\\d+)");

            for (Map.Entry<String, Object> entry : obj.entrySet()) {
                if (entry.getValue() instanceof List) {
                    Matcher matcher = pattern.matcher(entry.getKey());
                    if (matcher.matches()) {
                        int key = Integer.parseInt(matcher.group(1)); // Extraemos el número
                        sortedResults.put(key, (List<Map<String, Object>>) entry.getValue());
                    } else {
                        // Si la clave no sigue el formato esperado, lo agregamos al final sin ordenar
                        listaDeResultados.add((List<Map<String, Object>>) entry.getValue());
                    }
                }
            }

            // Añadir resultados ordenados
            listaDeResultados.addAll(sortedResults.values());
        }
        res.put("lstVals", outVals);
        res.put("lstRs", listaDeResultados);
        return res;
    }

    @Override
    public CallStorePaggin callStoreProcedurePaggin(CallStorePaggin filter) throws Exception {
        filter.setPage();
        MapSqlParameterSource params = new MapSqlParameterSource(filter.getParams());
        Map<String, Object> obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure(), params);
        for (Object value : obj.values()) {
            if (value instanceof List) {
                filter.setResponse((List<Map<String, Object>>) value);
            }
        }
        filter.setPageOut(obj);
        return filter;
    }

    @Async
    @Override
    public Map<String, Object> callStoreProcedureAsync(CallStoreFilter filter) throws Exception {
        Map<String, Object> res = new HashMap<>();
        Map<String, Object> obj = new HashMap<>();
        if (filter.getParams().isEmpty()) {
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure());
        } else {
            MapSqlParameterSource params = new MapSqlParameterSource(filter.getParams());
            //SqlParameterSource params = 
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure(), params);
        }
        List<List<Map<String, Object>>> listaDeResultados = new ArrayList<>();
        for (Object value : obj.values()) {
            if (value instanceof List) {
                listaDeResultados.add((List<Map<String, Object>>) value);
            }
        }
        res.put("lstRs", listaDeResultados);
        return res;
    }

    @Override
    public List<Object[]> getDataForExcel(DownloadExcelFilter filter) throws Exception {
        Map<String, Object> obj;
        if (filter.getPARAMS() == null || filter.getPARAMS().isEmpty()) {
            obj = jdbcUtils.executeSQP(filter.getLIBRARY(), filter.getPROGRAM());
        } else {
            MapSqlParameterSource params = new MapSqlParameterSource(filter.getPARAMS());
            obj = jdbcUtils.executeSQP(filter.getLIBRARY(), filter.getPROGRAM(), params);
        }

        List<Map<String, Object>> resultSet = new ArrayList<>();
        for (Object value : obj.values()) {
            if (value instanceof List) {
                resultSet = (List<Map<String, Object>>) value;
                break;
            }
        }

        List<ExcelFieldDef> fields = filter.getEXCEL_FIELDS().stream()
                .sorted(Comparator.comparingInt(ExcelFieldDef::getOrder))
                .collect(Collectors.toList());

        List<Object[]> data = new ArrayList<>();

        Object[] headers = new Object[fields.size()];
        for (int i = 0; i < fields.size(); i++) {
            headers[i] = fields.get(i).getTitle();
        }
        data.add(headers);

        for (Map<String, Object> row : resultSet) {
            Object[] dataRow = new Object[fields.size()];
            for (int i = 0; i < fields.size(); i++) {
                dataRow[i] = row.get(fields.get(i).getField());
            }
            data.add(dataRow);
        }

        return data;
    }

    @Override
    public void loadRecordsOnTable(String LIBRARY, String TABLE, List<RecordsFilter> lst) throws Exception {
        final String sql = "INSERT INTO "+LIBRARY+"."+TABLE+" (CUUID,FUUID,TRAMA) "
                + "VALUES"
                + "(:CUUID,:FUUID,:TRAMA)";
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[lst.size()];
        for (int i = 0; i < lst.size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(lst.get(i));
        }
        jdbcUtils.executeNamedParam(sql, insertParams);
    }
    
}
