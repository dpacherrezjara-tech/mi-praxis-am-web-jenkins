package net.miatech.praxis.payment.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05313Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,
            IN_PRDAS,IN_TDOCS,IN_AREFNBRS;
    private String SQLMSG;
    private Integer SQLRES;
}
