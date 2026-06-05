package net.miatech.praxis.generics;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExcelFieldDef {
    private String title;
    private String field;
    private int order;
}
