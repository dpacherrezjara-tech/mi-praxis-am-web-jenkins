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
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05048Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,IN_PROCTYPE,IN_PROCTYPESQ,
            IN_SPNR,IN_TICKET,IN_CERROR,IN_CODADJU,IN_FVOID,IN_FADM,IN_FDESGLOSE,IN_SEQ;
    private Double IN_SVFOPS;
    private Integer IN_QTYTKT;
    //respuesta
    private Integer SQLRES;
    private String SQLMSG;
    
    List<X3169> detail = new ArrayList<>();
}
