/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.old;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.old.A4042;

/**
 *
 * @author jesus
 */
public class A4042Filter extends A4042 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";
    public String IN_PRDA = "";
    public String IN_PARTEID = "";
    public String IN_PARTEIDSE = "";
    public String IN_SCURRENCY = "";
    public String IN_SETCURREN = "";
    public long RN = 0;

    public double SVFOP_TOT = 0;
    public double SETAMOUNT_TOT = 0;

    public Pagination page = new Pagination();

}
