package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4775;

/**
 *
 * @author Dvicente
 */
public class A4775Filter extends A4775{
    private long RN;
    private String PASSED_DAYS;
    private String descFAMEX;
    private String descSTCON ;
    private String descSTVAL;
    private String descFAMEXCHG;

    public long getRN() {
        return RN;
    }

    public void setRN(long RN) {
        this.RN = RN;
    }

    public String getPASSED_DAYS() {
        return PASSED_DAYS;
    }

    public void setPASSED_DAYS(String PASSED_DAYS) {
        this.PASSED_DAYS = PASSED_DAYS;
    }

    public String getDescFAMEX() {
        return descFAMEX;
    }

    public void setDescFAMEX(String descFAMEX) {
        this.descFAMEX = descFAMEX;
    }

    public String getDescSTCON() {
        return descSTCON;
    }

    public void setDescSTCON(String descSTCON) {
        this.descSTCON = descSTCON;
    }

    public String getDescSTVAL() {
        return descSTVAL;
    }

    public void setDescSTVAL(String descSTVAL) {
        this.descSTVAL = descSTVAL;
    }

    public String getDescFAMEXCHG() {
        return descFAMEXCHG;
    }

    public void setDescFAMEXCHG(String descFAMEXCHG) {
        this.descFAMEXCHG = descFAMEXCHG;
    }
    
    
}
