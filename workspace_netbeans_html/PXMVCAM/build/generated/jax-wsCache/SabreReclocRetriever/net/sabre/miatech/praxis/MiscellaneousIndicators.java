
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Miscellaneous.Indicators complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Miscellaneous.Indicators">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="feeOverride" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="consumed" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="taxExempt" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Miscellaneous.Indicators")
public class MiscellaneousIndicators {

    @XmlAttribute(name = "feeOverride")
    protected Boolean feeOverride;
    @XmlAttribute(name = "consumed")
    protected String consumed;
    @XmlAttribute(name = "taxExempt")
    protected Boolean taxExempt;

    /**
     * Gets the value of the feeOverride property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isFeeOverride() {
        return feeOverride;
    }

    /**
     * Sets the value of the feeOverride property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setFeeOverride(Boolean value) {
        this.feeOverride = value;
    }

    /**
     * Gets the value of the consumed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConsumed() {
        return consumed;
    }

    /**
     * Sets the value of the consumed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConsumed(String value) {
        this.consumed = value;
    }

    /**
     * Gets the value of the taxExempt property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isTaxExempt() {
        return taxExempt;
    }

    /**
     * Sets the value of the taxExempt property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setTaxExempt(Boolean value) {
        this.taxExempt = value;
    }

}
