package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4507;

/**
 *
 * @author Dvicente
 */
public class SQP05147Filter {
    private List<A4507> response = new ArrayList<>();

    public List<A4507> getResponse() {
        return response;
    }

    public void setResponse(List<A4507> response) {
        this.response = response;
    }
}
