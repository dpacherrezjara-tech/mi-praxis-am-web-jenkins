/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A4361;
import net.miatech.praxis.SaleAudit.A4362;
import net.miatech.praxis.SaleAudit.A4363;
import net.miatech.praxis.SaleAudit.A4364;
import net.miatech.praxis.SaleAudit.A4365;
import net.miatech.praxis.SaleAudit.A4366;
import net.miatech.praxis.SaleAudit.A4367;

/**
 *
 * @author zperez
 */
public class A4361Filter extends A4361 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_IATA = "";
    public String IN_FLAG = "";
    public String IN_FOLIO = "";
    public String IN_TYPE = "";
    public String IN_TICKET = "";
    public String IN_STATUSBPO = "";
    public String IN_STATUS = "";
    public String IN_PREME = "";
    public String IN_USER = "";
    public String IN_ANIO = "";
    public String IN_CORR = "";
    public String IN_SEQ = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_CORRL = "";

    public List<A4362> lst_RAZON = new ArrayList<A4362>(0);
    public List<A4363> lst_DOCUMENTS = new ArrayList<A4363>(0);
    public List<A4367> lst_USOS = new ArrayList<A4367>(0);
    public List<A4365> lst_Card = new ArrayList<A4365>(0);
    public List<A4366> LIS_COUPNS = new ArrayList<A4366>(0);
    public List<A4364> lst_TAXES = new ArrayList<A4364>(0);
    public List<A4364> lst_TAXAUDI = new ArrayList<A4364>(0);

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();
}
