/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.elavon;

import net.miatech.beans.Pagination;

/**
 *
 * @author Dvicente
 */
public class SQP04651Filter extends A4295{
    private String IN_FROMDATE;
    private String IN_TODATE;
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

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
    
    
}
