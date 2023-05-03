/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.IMF145;

/**
 *
 * @author ggutierrez
 */
public class IMF145Filter extends IMF145{
    
    public long RN;
    public String IN_DATE = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_FECHA = "";
    public String IN_PAYMENT = "";
    public String IN_TDOC = "";
    public String IN_FTE = "";
    public int IN_TOP = 0;
    public String IN_SCOUNTRY = "";
    public String IN_FLAG = "";
    public String IN_FINSUMO = "";
    public String IN_BANK = "";
    
    public String strFormatDate = "";
    
    public long diffQTYSALCC;
    public long diffAMOUNTCC;
    public long totdiffAMOUNTCC;
    public long totdiffQTYSALCC;
    
    public long totQTYSALES;
    public long totAMOUNTS;
    public long totQTYSALCA;
    public long totAMOUNTCA;
    public long totQTYSALCC;
    public long totAMOUNTCC;
    public long totQTYSALBA;
    public long totAMOUNTBA;
    public long totVALOREX;
    public long totVALORCA;
    public long totVALORCC;
    
    public String SDATE = "";
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String TICKET = "";
    public String SAUTHOC = "";
    public String SCARDN = "";
    public String SAGENT = "";
    public String IN_FECHA_DIA = "";
    public String IN_CURRENCY = "";
    public String PCURRENCY = "";
    public String SPNR = "";
    public String SCURRENCY = "";
    public long SVFOPS = 0;
    public long DISCRATEC = 0;
    public long FINSAMOUC = 0;
    public long SINSAMOUC = 0;
    public long DISCAMOUN = 0;
    public long RATESFEED = 0;
    public long SADJUST = 0;
    public long SFEEAMOU = 0;
    public long DIF = 0;
    public long totSVFOPS = 0;
    public long totDISCRATEC = 0;
    public long totFINSAMOUC = 0;
    public long totSINSAMOUC = 0;
    public long totDISCAMOUN = 0;
    public long totRATESFEED = 0;
    public long totSADJUST = 0;
    public long totSFEEAMOU = 0;
    public long totDIF = 0;
    
    public Pagination page = new Pagination();
}
