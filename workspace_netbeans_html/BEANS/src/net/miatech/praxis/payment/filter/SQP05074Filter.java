package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05074Filter {
    private String VP_CCUST,VP_FPROC;

    public String getVP_CCUST() {
        return VP_CCUST;
    }

    public void setVP_CCUST(String VP_CCUST) {
        this.VP_CCUST = VP_CCUST;
    }

    public String getVP_FPROC() {
        return VP_FPROC;
    }

    public void setVP_FPROC(String VP_FPROC) {
        this.VP_FPROC = VP_FPROC;
    }
}
