/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.entities.A4298;

/**
 *
 * @author Dvicente
 */
public class SQP04717Filter extends A4298 {

    private String IN_CCUST;
    private String IN_PROCESADOR;
    private String IN_OPCION;
    private String IN_FROMDATE;
    private String IN_TODATE;
    public Pagination page = new Pagination();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_PROCESADOR() {
        return IN_PROCESADOR;
    }

    public void setIN_PROCESADOR(String IN_PROCESADOR) {
        this.IN_PROCESADOR = IN_PROCESADOR;
    }

    public String getIN_OPCION() {
        return IN_OPCION;
    }

    public void setIN_OPCION( String IN_OPCION ) {
        this.IN_OPCION = IN_OPCION;
    }

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

}
