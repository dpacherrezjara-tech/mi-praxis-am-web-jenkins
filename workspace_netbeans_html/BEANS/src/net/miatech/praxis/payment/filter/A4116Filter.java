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
    public String IN_TRANSDATE = "";
    public String IN_AXPRODAT = "";
    public String IN_FREGLA = "";
    public String IN_SCARDN = "";
    public String IN_SAUTHOC = "";
    public String IN_WARNING = "";
    public String IN_CERROR = "";
    public String IN_TDOC = "";
    
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
    public double DISCAMOUN_CB_TOTAL = 0;
    public double SFEEAMOUC_TOTAL = 0;
    public double SFEEAMOU_TOTAL = 0;
    public double ACCEAMOUC_TOTAL = 0;
    public double ACCEAMOU_TOTAL = 0;
    public double DISCAMOUNC_TOTAL = 0;
    public double DISCAMOUIC_TOTAL = 0;
    
    
    public double DISCAMOUN = 0;
    public double DISCAMOUN_CB = 0;
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
    public String DES_CERROR = "";
    public String FSELEC = "";

    //CAMPOS A720
    public String A720AGENTE = "";
    public String A720FRESV = "";
    public String A720RUTA0 = "";
    public String A720RUTA1 = "";
    public String A720NVLO1 = "";
    public String A720FVLO1 = "";
    public String A720PNR = "";
    public String A720FECVTA = "";
    
    
    // A1531
    public String A1531CIA = "";
    public String A1531FORMA = "";
    public String A1531SERIE = "";
    public String A1531TKT = "";
    public String A1531NREF = "";
    public String A1531CAPL = "";
    public String A1531CFOP = "";
    public String A1531TTARJ = "";
    public double A1531VFOP = 0.0;
    public double tot_VFOP = 0.0;
    
    //Listado de codigos de error
    public String CODE = "";
    public String NAME = "";
    
    public Pagination page = new Pagination();
    
    
    
    
    
}
