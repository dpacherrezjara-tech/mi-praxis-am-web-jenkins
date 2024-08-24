package net.miatech.praxis.SaleAudit.filter;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SQP05402Filter {
    private String IN_OPTION,
            IN_A4593KEY1,
            IN_A4593KEY2,
            IN_A4593KEY3,
            IN_A4593DESC1,
            IN_A4593DESC2,
            IN_A4593COMEN,
            IN_A4593STS;
    private Integer SQLRES;
    private String SQLMSG;
}
