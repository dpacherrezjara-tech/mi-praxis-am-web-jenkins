package net.miatech.praxis.payment.filter;

import javax.validation.constraints.Size;
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
public class SQP05307Filter {
    private String IN_UUID;
    @Size(max = 3, min = 3)
    private String IN_CCUST;
    @Size(max = 8,min = 8)
    private String IN_PRDA;
    @Size(max = 1, min = 1)
    private String IN_TDOC;
    @Size(max = 30)
    private String IN_AREFNBR;
    @Size(max = 10)
    private String IN_PROCTYPE;
    @Size(max = 10)
    private String IN_PROCTYPESQ;
    @Size(max = 8)
    private String IN_SDATE;
    @Size(max = 8)
    private String IN_PAYDATE;
    @Size(max = 15)
    private String IN_PMERCHID;
    @Size(max = 15)
    private String IN_SMERCHID;
    @Size(max = 3)
    private String IN_SCURRENCY;
    @Size(max = 19)
    private String IN_PCARDN;
    @Size(max = 6)
    private String IN_PPNR;
    @Size(max = 9)
    private String IN_PAUTHOC;
    @Size(max = 1)
    private String IN_FLAG;
    @Size(max = 1)
    private String IN_FVOID;
    @Size(max = 10)
    private String IN_NBRLIQUID;
    @Size(max = 10)
    private String IN_CODCHGBACK;
    @Size(max = 30)
    private String IN_CHGBNUM;
    @Size(max = 1)
    private String IN_FDESGLOSE;
    private String SQLMSG;
    private Double IN_SVFOPS;
    private Double IN_ADJU;
    private Double IN_TGROSAMOUN;
    private Integer IN_QTYTKT;
    private Integer SQLRES;
}
