package net.miatech.praxis.payment.filter;

import java.math.BigDecimal;
import net.miatech.praxis.payment.entities.A4455;

/**
 *
 * @author Dvicente
 */
public class A4455Filter extends A4455{
    private String RN;
    private String TKT;
    private BigDecimal SVFOP_TOT;

    public String getRN() {
        return RN;
    }

    public void setRN(String RN) {
        this.RN = RN;
    }

    public String getTKT() {
        return TKT;
    }

    public void setTKT(String TKT) {
        this.TKT = TKT;
    }

    public BigDecimal getSVFOP_TOT() {
        return SVFOP_TOT;
    }

    public void setSVFOP_TOT(BigDecimal SVFOP_TOT) {
        this.SVFOP_TOT = SVFOP_TOT;
    }
}
