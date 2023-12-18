/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.old;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.old.A4040;

/**
 *
 * @author jesus
 */
public class A4040Filter extends A4040 {
    
    public String IN_DATEFROM = "";   
    public String IN_DATETO = "";   
    public String IN_DATE = "";   
    public String DATE = "";
    public String IN_PRDA = "";
    public long RN = 0;
    
    public String SCURRENCY = "";
    public String SETCURREN = "";
    public double DIF_TOTTRAAMO = 0;
    public double DIF_TOTSETAMO = 0;
    public double DIF_TOTPENAMO = 0;
    public double DIF_TOTREJAMO = 0;
    
    //A4042
    public double SETAMOUNT = 0;
    public double SETAMOUNTC = 0;

    public Pagination page = new Pagination();
    
}
