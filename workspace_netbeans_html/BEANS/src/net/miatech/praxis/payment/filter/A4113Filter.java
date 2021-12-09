/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4113;

/**
 *
 * @author ggutierrez
 */
public class A4113Filter extends A4113 {
    
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";
    
    public String IN_SDATE = "";
    public String IN_EPAAMEDATA = "";
    public String IN_MERCHN = "";
    public String IN_PRDA = "";
    public String IN_SETTLD = "";
    public String IN_NBATCH = "";
    public String DES_MERCHANT = "";
    
    //Diferencias
    public double DIFF_PGROSAMOU = 0;
    public double DIFF_PDISCAMOU = 0;
    public double DIFF_PSFEEAMOU = 0;
    public double DIFF_PADJAMOUN = 0;
    public double DIFF_PTAXAMOU = 0;
    public double DIFF_ODBALAMOU = 0;
    public double DIFF_PNETAMOU = 0;
    
    public Pagination page = new Pagination();
    
}
