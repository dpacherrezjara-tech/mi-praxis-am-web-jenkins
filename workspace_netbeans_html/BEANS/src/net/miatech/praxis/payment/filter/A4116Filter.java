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
    
    public double DISCAMOUN_IMPORT = 0;
    public double DISCAMOUN_IVA = 0;
    public double DISCRATE_IMPORT = 0;
    public double DISCRATE_IVA = 0;
    
    public String strDATE = "";
    public String IN_AXPAYNBR = "";
    public String IN_PCURRENCY = "";
    public String IN_MERCHID = "";
    public String IN_PAYDATE = "";
    public String IN_IDITEMS = "";
    public String DES_MERCHANT = "";
    
    public Pagination page = new Pagination();
    
}
