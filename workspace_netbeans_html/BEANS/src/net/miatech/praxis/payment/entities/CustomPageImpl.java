package net.miatech.praxis.payment.entities;

import java.util.Map;
import net.miatech.beans.Pagination;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author Dvicente
 */
public class CustomPageImpl {
    //paginacion
    @JsonIgnore
    private Pagination pagination = new Pagination();
    private String start;
    private String limit;
    private Boolean excel;
    private int total;
    
    @JsonProperty("pagnum")
    private int IO_PAGNUM;
    @JsonProperty("pagrow")
    private int IO_PAGROW;
    @JsonProperty("totpag")
    private int IO_TOTPAG;
    @JsonProperty("totrow")
    private int IO_TOTROW;
    
    public void setPage() {
        int start = this.start == null ? 0 : Integer.parseInt(this.start);
        int limit = this.limit == null ? -1 : Integer.parseInt(this.limit);
        boolean excel = this.excel==null?false:this.excel;
        if (!excel) {
            this.getPagination().PAGROW = 20;
            this.getPagination().PAGNUM = (start / this.getPagination().PAGROW) + 1;
        } else {
            this.getPagination().PAGROW = -1;
            this.getPagination().PAGNUM = 1;
        }
        this.IO_PAGNUM = this.pagination.PAGNUM;
        this.IO_PAGROW = this.pagination.PAGROW;
        this.IO_TOTPAG = this.pagination.TOTPAG;
        this.IO_TOTROW = this.pagination.TOTROW;
    }
    
    public void setPageOut(Map<String,Object> obj){
        this.IO_PAGNUM = Integer.parseInt(obj.get("IO_PAGNUM").toString());
        this.IO_PAGROW = Integer.parseInt(obj.get("IO_PAGROW").toString());
        this.IO_TOTPAG = Integer.parseInt(obj.get("IO_TOTPAG").toString());
        this.IO_TOTROW = Integer.parseInt(obj.get("IO_TOTROW").toString());
        this.total = this.IO_TOTROW;
    }

    public Pagination getPagination() {
        return pagination;
    }
    
    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public Boolean getExcel() {
        return excel;
    }

    public void setExcel(Boolean excel) {
        this.excel = excel;
    }

    public int getIO_PAGNUM() {
        return IO_PAGNUM;
    }

    public void setIO_PAGNUM(int IO_PAGNUM) {
        this.IO_PAGNUM = IO_PAGNUM;
    }

    public int getIO_PAGROW() {
        return IO_PAGROW;
    }

    public void setIO_PAGROW(int IO_PAGROW) {
        this.IO_PAGROW = IO_PAGROW;
    }

    public int getIO_TOTPAG() {
        return IO_TOTPAG;
    }

    public void setIO_TOTPAG(int IO_TOTPAG) {
        this.IO_TOTPAG = IO_TOTPAG;
    }

    public int getIO_TOTROW() {
        return IO_TOTROW;
    }

    public void setIO_TOTROW(int IO_TOTROW) {
        this.IO_TOTROW = IO_TOTROW;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
    
    
    
    
}
