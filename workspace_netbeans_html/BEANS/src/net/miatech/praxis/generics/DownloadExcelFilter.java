package net.miatech.praxis.generics;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DownloadExcelFilter {
    private String LIBRARY;
    private String PROGRAM;
    private Map<String, Object> PARAMS;
    private String FILE_NAME;
    private List<ExcelFieldDef> EXCEL_FIELDS;

    private int IO_PAGNUM = 1;
    private int IO_PAGROW = -1;  // -1 = todas las filas, sin paginacion
    private int IO_TOTPAG = -1;
    private int IO_TOTROW = -1;

    public void setPaginationForExcel() {
        if (this.PARAMS == null) {
            this.PARAMS = new HashMap<>();
        }
        this.PARAMS.put("IO_PAGNUM", this.IO_PAGNUM);
        this.PARAMS.put("IO_PAGROW", this.IO_PAGROW);
        this.PARAMS.put("IO_TOTPAG", this.IO_TOTPAG);
        this.PARAMS.put("IO_TOTROW", this.IO_TOTROW);
    }
}
