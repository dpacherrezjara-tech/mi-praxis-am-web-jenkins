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
public class SQP05377Filter extends CustomPageImpl {
    private String IN_CCUST, IN_OPTION, IN_FROM, IN_TO, IN_TICKET,
            IN_PNR, IN_PAX, IN_FUENTE, IN_STSEARCH, IN_JOBQUEUE, IN_TXTORIGIN;
    List<?> response = new ArrayList<>();
}
