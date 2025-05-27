package net.miatech.praxis.logic.widgets;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.generics.CallStoreFilter;
import net.miatech.praxis.generics.CallStorePaggin;
import net.miatech.praxis.generics.RecordsFilter;

/**
 *
 * @author dvicente
 */
public interface GenericLogic {
    Map<String,Object> callStoreProcedure(CallStoreFilter filter) throws Exception;
    Map<String,Object> callStoreProcedureAsync(CallStoreFilter filter) throws Exception;
    CallStorePaggin callStoreProcedurePaggin(CallStorePaggin filter) throws Exception;
    void loadRecordsOnTable(String LIBRARY,String TABLE,List<RecordsFilter> lst) throws Exception;
}
