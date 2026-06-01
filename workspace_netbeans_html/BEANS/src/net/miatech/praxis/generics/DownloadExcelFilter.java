package net.miatech.praxis.generics;

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
}
