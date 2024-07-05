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
public class SQP05363Filter {
    private String IN_OPTION;
    private String IN_A1924CCUST,IN_A1924CIA,IN_A1924FORMA,IN_A1924SERIE,IN_A1924TRNCU,IN_A1924FPROC,IN_A1924TIPO,
	IN_A1924AGRUP,IN_A1924SEQ,IN_A1924CUENT,IN_A1924SUBCU,IN_A1924TREGI,IN_A1924FUENT,IN_A1924PAIS,
	IN_A1924CFACT,IN_A1924TRNCO,IN_A1924IATA,IN_A1924MDA,IN_A1924IVA,
	IN_A1924PT1,IN_A1924PT2,IN_A1924PT3,IN_A1924PT4,IN_A1924PT5,IN_A1924IDCON,IN_A1924SECAU;
    private Double IN_A1924TCAMB,IN_A1924TOTLO,IN_A1924TOTRV,
	IN_A1924IVALO,IN_A1924IVARV,IN_A1924TDESC,IN_A1924TDESR,IN_A1924STOTL,IN_A1924STOTR;
    
    private Integer SQLRES;
    private String SQLMSG;
}
