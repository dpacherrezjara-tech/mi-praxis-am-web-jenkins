package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP04847Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05048Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05054Filter;
import net.miatech.praxis.payment.filter.SQP05055Filter;
import net.miatech.praxis.payment.filter.SQP05056Filter;
import net.miatech.praxis.payment.filter.SQP05057Filter;
import net.miatech.praxis.payment.filter.SQP05059Filter;
import net.miatech.praxis.payment.filter.SQP05060Filter;
import net.miatech.praxis.payment.filter.SQP05061Filter;
import net.miatech.praxis.payment.filter.SQP05062Filter;
import net.miatech.praxis.payment.filter.SQP05063Filter;
import net.miatech.praxis.payment.filter.SQP05065Filter;
import net.miatech.praxis.payment.filter.SQP05072Filter;
import net.miatech.praxis.payment.filter.SQP05074Filter;
import net.miatech.praxis.payment.filter.SQP05075Filter;
import net.miatech.praxis.payment.filter.SQP05077Filter;
import net.miatech.praxis.payment.filter.SQP05081Filter;
import net.miatech.praxis.payment.filter.SQP05088Filter;
import net.miatech.praxis.payment.filter.SQP05089Filter;
import net.miatech.praxis.payment.filter.SQP05126Filter;
import net.miatech.praxis.payment.filter.SQP05128Filter;
import net.miatech.praxis.payment.filter.SQP05129Filter;
import net.miatech.praxis.payment.filter.SQP05130Filter;
import net.miatech.praxis.payment.filter.SQP05132Filter;
import net.miatech.praxis.payment.filter.SQP05133Filter;
import net.miatech.praxis.payment.filter.SQP05134Filter;
import net.miatech.praxis.payment.filter.SQP05141Filter;
import net.miatech.praxis.payment.filter.SQP05142Filter;
import net.miatech.praxis.payment.filter.SQP05147Filter;
import net.miatech.praxis.payment.filter.SQP05182Filter;
import net.miatech.praxis.payment.filter.SQP05183Filter;
import net.miatech.praxis.payment.filter.SQP05187Filter;
import net.miatech.praxis.payment.filter.SQP05202Filter;
import net.miatech.praxis.payment.filter.SQP05203Filter;
import net.miatech.praxis.payment.filter.SQP05206Filter;
import net.miatech.praxis.payment.filter.SQP05217Filter;
import net.miatech.praxis.payment.filter.SQP05218Filter;
import net.miatech.praxis.payment.filter.SQP05219Filter;
import net.miatech.praxis.payment.filter.SQP05247Filter;
import net.miatech.praxis.payment.filter.SQP05259Filter;
import net.miatech.praxis.payment.filter.SQP05261Filter;
import net.miatech.praxis.payment.filter.SQP05276Filter;
import net.miatech.praxis.payment.filter.SQP05302Filter;
import net.miatech.praxis.payment.filter.SQP05304Filter;
import net.miatech.praxis.payment.filter.SQP05307Filter;
import net.miatech.praxis.payment.filter.SQP05310Filter;
import net.miatech.praxis.payment.filter.SQP05311Filter;
import net.miatech.praxis.payment.filter.SQP05312Filter;
import net.miatech.praxis.payment.filter.SQP05313Filter;
import net.miatech.praxis.payment.filter.SQP05319Filter;
import net.miatech.praxis.payment.filter.SQP05646Filter;
import net.miatech.praxis.payment.filter.SQP05709Filter;
import org.springframework.ui.ModelMap;

/**
 *
 * @author Dvicente
 */
public interface SalesReconciliationLogic {

    //storeds para listado de payments
    SQP05059Filter getSQP05059Filter(SQP05059Filter filter) throws Exception;

    List<A3152> getPaises() throws Exception;
    List<A006> getMonedas() throws Exception;

    SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception;
    //Constantes Medios de Pago
    SQP05276Filter loadSQP05276Filter(SQP05276Filter filter) throws Exception;

    SQP05060Filter getSQP05060Filter(SQP05060Filter filter) throws Exception;

    //Stored para mantenimiento de Data Entry
    SQP05048Filter loadSQP05048Filter(SQP05048Filter filter) throws Exception;

    SQP04847Filter loadSQP04847Filter(SQP04847Filter filter) throws Exception;

    SQP05052Filter loadSQP05052Filter(SQP05052Filter filter) throws Exception;

    SQP05054Filter loadSQP05054Filter(SQP05054Filter filter) throws Exception;

    SQP05187Filter loadSQP05187Filter(SQP05187Filter filter) throws Exception;
    
    SQP05055Filter loadSQP05055Filter(SQP05055Filter filter) throws Exception;

    SQP05056Filter loadSQP05056Filter(SQP05056Filter filter) throws Exception;

    SQP05057Filter loadSQP05057Filter(SQP05057Filter filter) throws Exception;

    SQP05062Filter loadSQP05062Filter(SQP05062Filter filter) throws Exception;
    
    SQP05061Filter loadSQP05061Filter(SQP05061Filter filter) throws Exception;
    
    SQP05072Filter loadSQP05072Filter(SQP05072Filter filter) throws Exception;
    
    //Mantenimiento MSI Tracking
    SQP05063Filter loadSQP05063Filter(SQP05063Filter filter) throws Exception;
    SQP05065Filter loadSQP05065Filter(SQP05065Filter filter) throws Exception;
    SQP05259Filter loadSQP05259Filter(SQP05259Filter filter) throws Exception;
    void loadSQP05261Filter(SQP05261Filter params) throws Exception;
    
    //Mantenimiento ChargebackTracking
    SQP05081Filter loadSQP05081Filter(SQP05081Filter filter) throws Exception;
    SQP05077Filter loadSQP05077Filter(SQP05077Filter filter) throws Exception;
    SQP05182Filter loadSQP05182Filter(SQP05182Filter filter) throws Exception;
    SQP05183Filter loadSQP05183Filter(SQP05183Filter filter) throws Exception;
    SQP05312Filter loadSQP05312Filter(SQP05312Filter filter) throws Exception;
    SQP05313Filter loadSQP05313Filter(SQP05313Filter filter) throws Exception;
            
    //proceso de conciliacion entre Transacciones
    SQP05074Filter loadSQP05074Filter(SQP05074Filter filter) throws Exception;
    SQP05147Filter loadSQP05147Filter() throws Exception;
    
    //storeds para listado de ticket
    SQP05088Filter loadSQP05088Filter(SQP05088Filter filter) throws Exception;
    SQP05646Filter LoadSQP05646Filter(SQP05646Filter filter) throws Exception;
    SQP05089Filter loadSQP05089Filter(SQP05089Filter filter) throws Exception;
    SQP05709Filter loadSQP05709Filter(SQP05709Filter filter) throws Exception;
    
    SQP05126Filter loadSQP05126Filter(SQP05126Filter filter) throws Exception;
    
    //Mantenimiento Stand By BT
    SQP05128Filter loadSQP05128Filter(SQP05128Filter filter) throws Exception;
    SQP05129Filter loadSQP05129Filter(SQP05129Filter filter) throws Exception;
    //ADM By Ticket
    SQP05130Filter loadSQP05130Filter(SQP05130Filter filter) throws Exception;
    //Reversa ADM
    SQP05132Filter loadSQP05132Filter(SQP05132Filter filter) throws Exception;
    //Force Match VOID
    SQP05141Filter loadSQP05141Filter(SQP05141Filter filter) throws Exception;
    SQP05142Filter loadSQP05142Filter(SQP05142Filter filter) throws Exception;
    
    //Settlement
    SQP05133Filter loadSQP05133Filter(SQP05133Filter filter) throws Exception;
    SQP05134Filter loadSQP05134Filter(SQP05134Filter filter) throws Exception;
    
    //BUSCADOR DE USOS
    SQP05075Filter loadSQP05075Filter(SQP05075Filter filter) throws Exception;
    
    //Produccion BPO
    SQP05202Filter loadSQP05202Filter(SQP05202Filter filter) throws Exception;
    SQP05203Filter loadSQP05203Filter(SQP05203Filter filter) throws Exception;
    SQP05247Filter loadSQP05247Filter(SQP05247Filter filter) throws Exception;
    
    //Conteo de tarjetas por fecha
    SQP05206Filter loadSQP05206Filter(SQP05206Filter filter) throws Exception;
    
    //Formulario de insercion tarjeta de credito y ticket
    SQP05217Filter loadSQP05217Filter(SQP05217Filter filter) throws Exception;
    SQP05218Filter loadSQP05218Filter(SQP05218Filter filter) throws Exception;
    SQP05219Filter loadSQP05219Filter(SQP05219Filter filter) throws Exception;

    //Batch para conciliacion manual de ajustes
    SQP05302Filter loadSQP05302Filter(SQP05302Filter filter) throws Exception;
    SQP05307Filter loadSQP05307Filter(SQP05307Filter filter) throws Exception;
    void loadMasiveSQP05307Filter(List<SQP05307Filter> lst) throws Exception;
    SQP05310Filter loadSQP05310Filter(SQP05310Filter filter) throws Exception;
    SQP05311Filter loadSQP05311Filter(SQP05311Filter filter) throws Exception;
    SQP05319Filter loadSQP05319Filter(SQP05319Filter filter) throws Exception;
    
    //Conciliaction Automatica (lanzar proceso)
    ModelMap loadSQP05304Filter(SQP05304Filter filter) throws Exception;
}
