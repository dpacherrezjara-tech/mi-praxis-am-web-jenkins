package net.miatech.praxis.payment.filter;

import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonMethod;

/**
 *
 * @author Dvicente
 */
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05307Filter {

    @Size(max = 3, min = 3)
    String IN_CCUST;
    @Size(max = 8,min = 8)
    String IN_PRDA;
    @Size(max = 1, min = 1)
    String IN_TDOC;
    @Size(max = 30)
    String IN_AREFNBR;
}
