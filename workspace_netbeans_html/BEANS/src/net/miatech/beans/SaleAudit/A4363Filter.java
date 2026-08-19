/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A4363;

/**
 *
 * @author zperez
 */
public class A4363Filter extends A4363 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_IATA = "";
    public String IN_TYPE = "";
    public String IN_TICKET = "";
    public String IN_STATUSBPO = "";
    public String IN_STATUS = "";
    public String IN_PREME = "";
    public String IN_USER = "";
    public String IN_TKT = "";
    public String IN_ANIO = "";
    public String IN_CORR = "";
    public String IN_SEQ = "";

    public String IN_FOLIO = "";
    public String IN_COUNTRY = "";
    public String IN_CORRL = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_MDA = "";
    public String IN_MDAEQUI = "";
    public String IN_CONJU = "";
    public String IN_MARCA = "";
    public String IN_CPN1 = "";
    public String IN_CPN2 = "";
    public String IN_CPN3 = "";
    public String IN_CPN4 = "";
    public String IN_CPN5 = "";
    public String IN_CPN6 = "";
    public String IN_CPN7 = "";
    public String IN_CPN8 = "";
    public String IN_TRFND = "";
    public String IN_EMAIL= "";

    public double IN_TARIF = 0d;
    public double IN_TARIFEQUI = 0d;
    public double IN_PENALTY = 0d;

    public double IN_TTAX = 0d;
    public double IN_COMMI = 0d;
    public double IN_TOTALRFND = 0d;

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
