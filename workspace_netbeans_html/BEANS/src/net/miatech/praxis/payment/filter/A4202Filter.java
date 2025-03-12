package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4202;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class A4202Filter extends A4202{
    private String NIATA;

    public String getNIATA() {
        return NIATA;
    }

    public void setNIATA(String NIATA) {
        this.NIATA = NIATA;
    }
}
