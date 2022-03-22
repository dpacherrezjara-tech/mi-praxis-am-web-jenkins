/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4040;

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
    public int DIF_TOTTRAAMO = 0;
    public int DIF_TOTSETAMO = 0;
    public int DIF_TOTPENAMO = 0;
    public int DIF_TOTREJAMO = 0;

    public Pagination page = new Pagination();
    
}
