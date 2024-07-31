package net.miatech.praxis.SaleAudit.filter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.miatech.praxis.SaleAudit.entities.X3179;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05372Filter {
    
    
    private String IN_CCUST,IN_FROM,IN_TO,IN_QUEUE,IN_OPTION;
    
    @Getter
    @Setter(AccessLevel.NONE)
    private String  IN_UUID;
    private List<X3179> data = new ArrayList<>();
    
    private Integer SQLRES;
    private String SQLMSG;
    
    public void setRandomUUID(){
        this.IN_UUID = UUID.randomUUID().toString().replace("-", "");
        data.forEach(x->{
            x.setCUUID(this.IN_UUID);
        });
    }
}
