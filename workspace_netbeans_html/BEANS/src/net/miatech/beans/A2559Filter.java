/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2559;
/**
 *
 * @author jjulca
 */  
public class A2559Filter extends A2559{
    public long RN;
    public String IN_A2559CCUST = "";
    public String IN_A2559MODO = "";
    public String IN_A2559FPRO = "";
    public String IN_A2559FFILE = "";
    public String IN_FINI = "";
    public String IN_FFIN = "";
    public String IN_PARAM = "";
    
    public Double A2559DFARE = 0.0;
    public Double A2559DTAX = 0.0;
    public Double A2559DISC = 0.0;
    
    public String A2559FCOIC = "";
    public String A2559TUSO = "";
    public Double A2559YQ = 0.0;
    public Double A2559TCAMB = 0.0;
    public Double A2559FYQ = 0.00;
    public Double A2559TCAMF = 0.00;
    public Double DFQ = 0.0;
    public Double DCAMB = 0.0;
    public String IN_FLAG = "";
    
    public String IN_FLOWN_FINI = "";
    public String IN_FLOWN_FFIN = "";
    public String IN_FLIGHT_FINI = "";
    public String IN_FLIGHT_FFIN = "";
    public String IN_BILLING_DATEFINI = "";
    public String IN_BILLING_DATEFFIN = "";
    public String IN_PERIOD = "";
    public String STATUS = "";
    
    public Pagination page = new Pagination();
}
