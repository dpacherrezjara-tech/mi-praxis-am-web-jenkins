package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.X3169;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class SQP05056Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,IN_PROCTYPE,IN_PROCTYPESQ,IN_OBSERV,IN_ADJU;
    private Integer SQLRES;
    private String SQLMSG;
    
    private List<X3169> detail = new ArrayList<>();
}
