package net.miatech.praxis.SaleAudit.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class A4593 {
    private String  A4593KEY1,  
                A4593KEY2,  
                A4593KEY3,  
                A4593DESC1, 
                A4593DESC2, 
                A4593COMEN, 
                A4593STS,   
                A4593USCR,
                A4593USUP;  
                
    private Timestamp A4593TSCR,A4593TSUP; 
}
