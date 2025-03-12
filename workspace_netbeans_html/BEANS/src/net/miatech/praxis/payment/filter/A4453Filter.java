package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4453;

/**
 *
 * @author Dvicente
 */
public class A4453Filter extends A4453{
    
    private long RN;
    private String descFAMEX;
    private String descSTCON ;
    private String descSTVAL;
    private String descFAMEXCHG;
    private String PASSED_DAYS;    
    private String INVORNBR;    
    private String ISREFNBR;    
    private double DIFF_AMOUNT;
    private String DES_CERROR;
    private String IN_SCARDN1;
    private String IN_SCARDN2;

    public long getRN() {
        return RN;
    }

    public void setRN(long RN) {
        this.RN = RN;
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

    public String getPASSED_DAYS() {
        return PASSED_DAYS;
    }

    public void setPASSED_DAYS(String PASSED_DAYS) {
        this.PASSED_DAYS = PASSED_DAYS;
    }

    public String getINVORNBR() {
        return INVORNBR;
    }

    public void setINVORNBR(String INVORNBR) {
        this.INVORNBR = INVORNBR;
    }

    public String getISREFNBR() {
        return ISREFNBR;
    }

    public void setISREFNBR(String ISREFNBR) {
        this.ISREFNBR = ISREFNBR;
    }

    public double getDIFF_AMOUNT() {
        return DIFF_AMOUNT;
    }

    public void setDIFF_AMOUNT(double DIFF_AMOUNT) {
        this.DIFF_AMOUNT = DIFF_AMOUNT;
    }

    public String getDES_CERROR() {
        return DES_CERROR;
    }

    public void setDES_CERROR(String DES_CERROR) {
        this.DES_CERROR = DES_CERROR;
    }

    public String getIN_SCARDN1() {
        return IN_SCARDN1;
    }

    public void setIN_SCARDN1(String IN_SCARDN1) {
        this.IN_SCARDN1 = IN_SCARDN1;
    }

    public String getIN_SCARDN2() {
        return IN_SCARDN2;
    }

    public void setIN_SCARDN2(String IN_SCARDN2) {
        this.IN_SCARDN2 = IN_SCARDN2;
    }
    
}
