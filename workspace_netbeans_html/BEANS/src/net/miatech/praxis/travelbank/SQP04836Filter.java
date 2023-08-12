package net.miatech.praxis.travelbank;

import net.miatech.beans.Pagination;

/**
 *
 * @author Dvicente
 */
public class SQP04836Filter extends A4275{
    private String CCUST;
    private String FECHAI;
    private String FECHAF;
    private String TIPO;
    private String IDFIL;
    private Pagination page = new Pagination();

    public String getCCUST() {
        return CCUST;
    }

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }

    public String getFECHAI() {
        return FECHAI;
    }

    public void setFECHAI(String FECHAI) {
        this.FECHAI = FECHAI;
    }

    public String getFECHAF() {
        return FECHAF;
    }

    public void setFECHAF(String FECHAF) {
        this.FECHAF = FECHAF;
    }

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getIDFIL() {
        return IDFIL;
    }

    public void setIDFIL(String IDFIL) {
        this.IDFIL = IDFIL;
    }

    public Pagination getPagination() {
        return page;
    }

    public void setPagination(Pagination pagination) {
        this.page = pagination;
    }
    
    
}
