package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.entities.A4305;
import net.miatech.praxis.payment.entities.A4344;

/**
 *
 * @author Dvicente
 */
public class SQP04976Filter {

    private String PROCESADOR;
    private String TIPO;
    private String FECHA_FROM;
    private String STS;
    
    //datos opcionales
    private Integer limit;
    private Integer start;
//    private Boolean excel;

    private Pagination page = new Pagination();

    private List<A4305> lstReceived = new ArrayList<>();
    private List<A4344> lstLoaded = new ArrayList<>();
    private List<A4305> lstExonerados = new ArrayList<>();
    private Integer total;

    public String getPROCESADOR() {
        return PROCESADOR;
    }

    public void setPROCESADOR(String PROCESADOR) {
        this.PROCESADOR = PROCESADOR;
    }

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getFECHA_FROM() {
        return FECHA_FROM;
    }

    public void setFECHA_FROM(String FECHA_FROM) {
        this.FECHA_FROM = FECHA_FROM;
    }

    public String getSTS() {
        return STS;
    }

    public void setSTS(String STS) {
        this.STS = STS;
    }

    public Pagination getPage() {
        return page;
    }

    public void setPage(Pagination page) {
        this.page = page;
    }

    public List<A4305> getLstReceived() {
        return lstReceived;
    }

    public void setLstReceived(List<A4305> lstReceived) {
        this.lstReceived = lstReceived;
    }

    public List<A4344> getLstLoaded() {
        return lstLoaded;
    }

    public void setLstLoaded(List<A4344> lstLoaded) {
        this.lstLoaded = lstLoaded;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

//    public Boolean getExcel() {
//        return excel;
//    }
//
//    public void setExcel(Boolean excel) {
//        this.excel = excel;
//    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public List<A4305> getLstExonerados() {
        return lstExonerados;
    }

    public void setLstExonerados(List<A4305> lstExonerados) {
        this.lstExonerados = lstExonerados;
    }
    
    
}
