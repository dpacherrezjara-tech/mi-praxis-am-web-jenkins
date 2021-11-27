/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4118;

/**
 *
 * @author ggutierrez
 */
public class A4118Filter extends A4118 {

    public String RN = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";

//    public String IN_SDATE = "";
//    public String IN_EPAAMEDATA = "";
    public String strDATE = "";
    public String IN_AXPAYNBR = "";
    public String IN_PCURRENCY = "";
    public String IN_MERCHID = "";
    public String DES_MERCHANT = "";

    //Totales
    public long totSGROSAMOS = 0;
    public long totGROSAMOUN = 0;
    public long totDISCAMOUN = 0;
    public long totSFEEAMOUN = 0;
    public long totSFEEAMOUNC = 0;
    public long totTAXAMOUN = 0;
    public long totNETAMOUN = 0;
    public long totSDGROSSA = 0; 
    public long totSCGROSSA = 0;
    
    public long totTRANCOUNT = 0;
    public long totINSTANBR = 0;
    
    public long totGROSAMOUNC = 0; 
    public long totDISCAMOUNC = 0; 
    public long totTAXAMOUNC = 0;
    public long totNETAMOUNC = 0; 
    public long totTRANCOUNTC = 0;

    public Pagination page = new Pagination();

}
