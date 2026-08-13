package net.miatech.praxis.invoice.filters;

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
public class SQP05356Filter extends CustomPageImpl{
    private String IN_TIPO,IN_CLAVE,IN_CUENTA,IN_SUBCUEN,IN_DESCRIP,IN_CFACT,IN_FDESDE,IN_FFIN;
    List<?> response = new ArrayList<>();
}
