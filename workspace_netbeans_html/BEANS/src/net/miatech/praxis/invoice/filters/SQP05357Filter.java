package net.miatech.praxis.invoice.filters;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05357Filter {
    private String IN_OPTION,IN_IDCOD,IN_TIPO,IN_CLAVE,
            IN_DESCRIP,IN_CFACT,IN_FDESDE,IN_FFIN;
    private Integer SQLRES;
    private String SQLMSG;
}
