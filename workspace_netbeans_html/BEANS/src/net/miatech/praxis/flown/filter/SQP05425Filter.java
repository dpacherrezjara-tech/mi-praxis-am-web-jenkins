package net.miatech.praxis.flown.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.flown.dto.A4622;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SQP05425Filter extends CustomPageImpl{
    private String IN_CCUST,IN_FPROCF,IN_FPROCT,IN_STVAL,IN_TPAX,IN_FTE,IN_TICKET;
    List<A4622> response = new ArrayList<>();
}
