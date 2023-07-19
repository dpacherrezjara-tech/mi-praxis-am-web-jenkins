package net.miatech.praxis.Sales.filters;

import net.miatech.beans.Pagination;
import net.miatech.praxis.Sales.A4373;

/**
 *
 * @author Dvicente
 */
public class SQP04747Filter extends A4373{
    
    //datos input
    private int IN_OPCION;
    private String IN_AIRLIN;
    private String IN_GRUPO;
    private String IN_TKT;
    private String IN_IATA;
    
    //paginacion;
    private Pagination page =  new Pagination();
    
    //datos adicionales
    private int RN;
    private String DOCUMENTO;
    private String CNJ;
    private int QTY_ERROR;

    public int getIN_OPCION() {
        return IN_OPCION;
    }

    public void setIN_OPCION(int IN_OPCION) {
        this.IN_OPCION = IN_OPCION;
    }

    public String getIN_AIRLIN() {
        return IN_AIRLIN;
    }

    public void setIN_AIRLIN(String IN_AIRLIN) {
        this.IN_AIRLIN = IN_AIRLIN;
    }

    public String getIN_GRUPO() {
        return IN_GRUPO;
    }

    public void setIN_GRUPO(String IN_GRUPO) {
        this.IN_GRUPO = IN_GRUPO;
    }

    public String getIN_TKT() {
        return IN_TKT;
    }

    public void setIN_TKT(String IN_TKT) {
        this.IN_TKT = IN_TKT;
    }

    public String getIN_IATA() {
        return IN_IATA;
    }

    public void setIN_IATA(String IN_IATA) {
        this.IN_IATA = IN_IATA;
    }

    public Pagination getPag() {
        return page;
    }

    public void setPag(Pagination pag) {
        this.page= pag;
    }

    public int getRN() {
        return RN;
    }

    public void setRN(int RN) {
        this.RN = RN;
    }

    public String getDOCUMENTO() {
        return DOCUMENTO;
    }

    public void setDOCUMENTO(String DOCUMENTO) {
        this.DOCUMENTO = DOCUMENTO;
    }

    public String getCNJ() {
        return CNJ;
    }

    public void setCNJ(String CNJ) {
        this.CNJ = CNJ;
    }

    public int getQTY_ERROR() {
        return QTY_ERROR;
    }

    public void setQTY_ERROR(int QTY_ERROR) {
        this.QTY_ERROR = QTY_ERROR;
    }
    
    
    
}
