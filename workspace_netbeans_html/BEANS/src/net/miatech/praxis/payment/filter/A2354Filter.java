/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.A2354;
import net.miatech.beans.Pagination;

/**
 *
 * @author andrea
 */
public class A2354Filter extends A2354 {

    public String IN_MERCHN = "";
    public String IN_DESCR = "";
    public String IN_RSOCIAL = "";
    public String strFecha = "";
    public String strDescrip = "";
    public String A003CANAL = "";
    public String A003IATA = "";
    public long RN = 0;
    public String strDescripCtry = "";
    //A003
    public String A003KEY1 = "";
    public Pagination page = new Pagination();
}
