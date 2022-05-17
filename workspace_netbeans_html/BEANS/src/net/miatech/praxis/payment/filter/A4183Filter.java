package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4183;

/**
 *
 * @author jsolano
 */
public class A4183Filter extends A4183 {
    
    public String IN_TKT = "";
 
    public double totA4183ACTIV = 0;
    public double totA4183PASIV = 0;
    public double totA4183ACTRV = 0;
    public double totA4183PASRV = 0;
    
    public List<A4183Filter> lstSendManual = new ArrayList<A4183Filter>(0);

    public Pagination page = new Pagination();
    

   
}
