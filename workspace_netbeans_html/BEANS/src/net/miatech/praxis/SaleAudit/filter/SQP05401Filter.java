package net.miatech.praxis.SaleAudit.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SQP05401Filter extends CustomPageImpl {
    private String IN_CCUST;
    
    private String IN_KEY2;
    
    //A4593
    List<?> response = new ArrayList<>();
}
