/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.old;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.old.A4041;

/**
 *
 * @author jesus
 */
public class A4041Filter extends A4041 {
    
    public String IN_DATEFROM = "";   
    public String IN_DATETO = "";   
    public String IN_DATE = "";   
    public String DATE = "";
    public String IN_PRDA = "";
    public String IN_PARTEID = "";
    public long RN = 0;
    
    public double SVFOP_TOT = 0;
    public double SETAMOUNT_TOT = 0;

    public Pagination page = new Pagination();
    
}
