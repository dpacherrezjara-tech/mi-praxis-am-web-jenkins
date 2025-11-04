package net.miatech.praxis.payment.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.miatech.praxis.payment.entities.A4183;

/**
 *
 * @author DPandal
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class A4183DetailAccounting extends A4183 {
    
    private String TICKET, FILETYPE, A4183AREFN, A4183FFILE, A4183CLIEN, PROCESSOR_DESCRIPTION;
 
}

