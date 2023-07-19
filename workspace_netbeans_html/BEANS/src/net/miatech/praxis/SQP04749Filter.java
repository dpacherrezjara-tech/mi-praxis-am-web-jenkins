/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis;

/**
 *
 * @author Dvicente
 */
public class SQP04749Filter {
    //INPUT VARS
    private String IN_CCUST;
    private String IN_LOTE;
    private String IN_AGENT;
    private String IN_RFIS;
    
    //OUTPUT VARS
    private String A2445CCST;
    private String A2445RFIC;
    private String A2445RFIS;
    private String A2445MDARV;
    private String A2445MDALC;

    public String getA2445MDALC() {
        return A2445MDALC;
    }

    public void setA2445MDALC(String A2445MDALC) {
        this.A2445MDALC = A2445MDALC;
    }

    public String getA2445MDARV() {
        return A2445MDARV;
    }

    public void setA2445MDARV(String A2445MDARV) {
        this.A2445MDARV = A2445MDARV;
    }
    private Double A2445CARGO;
    private Double IVACARGO;
    
    public void setInputVars(String CCUST, String LOTE,String AGENT,String RFIS){
        this.IN_CCUST = CCUST;
        this.IN_LOTE = LOTE;
        this.IN_AGENT = AGENT;
        this.IN_RFIS = RFIS;
    }

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_LOTE() {
        return IN_LOTE;
    }

    public void setIN_LOTE(String IN_LOTE) {
        this.IN_LOTE = IN_LOTE;
    }

    public String getIN_AGENT() {
        return IN_AGENT;
    }

    public void setIN_AGENT(String IN_AGENT) {
        this.IN_AGENT = IN_AGENT;
    }

    public String getIN_RFIS() {
        return IN_RFIS;
    }

    public void setIN_RFIS(String IN_RFIS) {
        this.IN_RFIS = IN_RFIS;
    }

    public String getA2445CCST() {
        return A2445CCST;
    }

    public void setA2445CCST(String A2445CCST) {
        this.A2445CCST = A2445CCST;
    }

    public String getA2445RFIC() {
        return A2445RFIC;
    }

    public void setA2445RFIC(String A2445RFIC) {
        this.A2445RFIC = A2445RFIC;
    }

    public String getA2445RFIS() {
        return A2445RFIS;
    }

    public void setA2445RFIS(String A2445RFIS) {
        this.A2445RFIS = A2445RFIS;
    }

    public Double getA2445CARGO() {
        return A2445CARGO;
    }

    public void setA2445CARGO(Double A2445CARGO) {
        this.A2445CARGO = A2445CARGO;
    }

    public Double getIVACARGO() {
        return IVACARGO;
    }

    public void setIVACARGO(Double IVACARGO) {
        this.IVACARGO = IVACARGO;
    }
    
    
    
    
}
