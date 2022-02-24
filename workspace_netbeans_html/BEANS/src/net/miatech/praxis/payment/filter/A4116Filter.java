/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4116;

/**
 *
 * @author ggutierrez
 */
public class A4116Filter extends A4116 {
    
    public String RN = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";
    public String IN_PNR = "";
    public String IN_STVAL = "";
    
    public double DISCAMOUN_IMPORT = 0;
    public double DISCAMOUN_IVA = 0;
    public double DISCRATE_IMPORT = 0;
    public double DISCRATE_IVA = 0;
    public double TGROSAMOUN_TOTAL = 0;
    public double TGROSAMOUNC_TOTAL = 0;
    public double DISCAMOUN_TOTAL = 0;
    public double DISCAMOUNI_TOTAL = 0;
    public double TGROSAMOUC_TOTAL = 0;
    public double VATCOMMSIC_TOTAL = 0;
    public double SFEEAMOUC_TOTAL = 0;
    public double SFEEAMOU_TOTAL = 0;
    public double ACCEAMOUC_TOTAL = 0;
    public double ACCEAMOU_TOTAL = 0;
    public double DISCAMOUNC_TOTAL = 0;
    public double DISCAMOUIC_TOTAL = 0;
    
    
    public double DISCAMOUN = 0;
    public double TAXAMOUN_CB = 0;
    public double TAXAMOUN_AD = 0;
    public double NETAMOUN = 0;
    public double NETAMOUNC = 0;
    public double DISCAMOSC = 0;
    public double GROSAMOUN_CB = 0;
    
    public double totGROSAMOUN = 0;
    public double totTGROSAMOUN = 0;
    public double totDISCAMOUN_IMPORT = 0;
    public double totDISCAMOUN_IVA = 0;
    public double totSFEEAMOU = 0;
    public double totACCEAMOU = 0;
    public double totTAXAMOUN_AD = 0;
    public double totIVACOM12 = 0;
    public double totGROSAMOUN_CB = 0;
    public double totDISCAMOUN = 0;
    public double totTAXAMOUN_CB = 0;
    public double totNETAMOUN = 0;
    public double totDISCAMOSC = 0;
    public double totNETAMOUNC = 0;
    
    public String strDATE = "";
    public String IN_AXPAYNBR = "";
    public String IN_PCURRENCY = "";
    public String IN_descSTVAL = "";
    public double IN_TGROSAMOUN = 0;
    public String IN_ISREFNBR = "";
    public String IN_MERCHID = "";
    public String IN_PAYDATE = "";
    public String IN_IDITEMS = "";
    public String DES_MERCHANT = "";
    public String DES_SMERCHANT = "";
    
    public Pagination page = new Pagination();
    
}
