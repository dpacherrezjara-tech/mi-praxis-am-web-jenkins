package net.miatech.praxis.logic.flown;

import net.miatech.praxis.flown.filter.SQP05424Filter;
import net.miatech.praxis.flown.filter.SQP05425Filter;

/**
 *
 * @author dvicente
 */
public interface EmdsSabreLogic {
    SQP05424Filter loadSQP05424Filter(SQP05424Filter filter) throws Exception;
    SQP05425Filter loadSQP05425Filter(SQP05425Filter filter) throws Exception;
}
