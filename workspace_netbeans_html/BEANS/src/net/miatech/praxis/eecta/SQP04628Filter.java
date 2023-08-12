/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

import net.miatech.beans.Pagination;

/**
 *
 * @author Dvicente
 */
public class SQP04628Filter extends A4264{
    private String IN_FROMDATE;
    private String IN_TODATE;
    private String IN_IDFILE;
    private Pagination pagination = new Pagination();

    public String getIN_FROMDATE() {
        return IN_FROMDATE;
    }

    public void setIN_FROMDATE(String IN_FROMDATE) {
        this.IN_FROMDATE = IN_FROMDATE;
    }

    public String getIN_TODATE() {
        return IN_TODATE;
    }

    public void setIN_TODATE(String IN_TODATE) {
        this.IN_TODATE = IN_TODATE;
    }

    public String getIN_IDFILE() {
        return IN_IDFILE;
    }

    public void setIN_IDFILE(String IN_IDFILE) {
        this.IN_IDFILE = IN_IDFILE;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
    
    
}
