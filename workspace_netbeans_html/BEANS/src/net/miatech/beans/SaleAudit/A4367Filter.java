/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A4367;

/**
 *
 * @author zperez
 */
public class A4367Filter {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    
     public String IN_PREME = "";
     public String IN_ANIO = "";
     public String IN_CIA = "";
     public String IN_FORMA = "";
     public String IN_SERIE = "";
     public String IN_SEQ = "";
     public String IN_CORRL = "";
    
     public List<A4367> lst_USOS = new ArrayList<A4367>(0);
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();
}
