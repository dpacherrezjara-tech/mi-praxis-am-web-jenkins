package net.miatech.praxis.flown.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.flown.dto.A4622Summ;

/**
 *
 * @author dvicente
 */
@Data
public class SQP05424Filter {
    private String IN_CCUST,IN_FPROCF,IN_FPROCT,IN_STVAL,IN_TPAX,IN_FTE,IN_TICKET;
    
    List<A4622Summ> response = new ArrayList<>();
}
