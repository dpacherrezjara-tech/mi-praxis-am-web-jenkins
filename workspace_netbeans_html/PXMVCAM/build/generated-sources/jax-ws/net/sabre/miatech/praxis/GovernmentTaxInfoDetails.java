
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for GovernmentTaxInfo.Details complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GovernmentTaxInfo.Details">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ValueAddedTax" type="{http://www.sabre.com/ns/Ticketing/DC}GovernmentTaxInfo.Basic" minOccurs="0"/>
 *         &lt;element name="Fiscal" type="{http://www.sabre.com/ns/Ticketing/DC}GovernmentTaxInfo.Basic" minOccurs="0"/>
 *         &lt;element name="Disclaimer" type="{http://www.sabre.com/ns/Ticketing/DC}GovernmentTaxInfo.Disclaimer" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="idType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GovernmentTaxInfo.Details", propOrder = {
    "valueAddedTax",
    "fiscal",
    "disclaimer"
})
public class GovernmentTaxInfoDetails {

    @XmlElement(name = "ValueAddedTax")
    protected GovernmentTaxInfoBasic valueAddedTax;
    @XmlElement(name = "Fiscal")
    protected GovernmentTaxInfoBasic fiscal;
    @XmlElement(name = "Disclaimer")
    protected GovernmentTaxInfoDisclaimer disclaimer;
    @XmlAttribute(name = "idType")
    protected String idType;

    /**
     * Gets the value of the valueAddedTax property.
     * 
     * @return
     *     possible object is
     *     {@link GovernmentTaxInfoBasic }
     *     
     */
    public GovernmentTaxInfoBasic getValueAddedTax() {
        return valueAddedTax;
    }

    /**
     * Sets the value of the valueAddedTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link GovernmentTaxInfoBasic }
     *     
     */
    public void setValueAddedTax(GovernmentTaxInfoBasic value) {
        this.valueAddedTax = value;
    }

    /**
     * Gets the value of the fiscal property.
     * 
     * @return
     *     possible object is
     *     {@link GovernmentTaxInfoBasic }
     *     
     */
    public GovernmentTaxInfoBasic getFiscal() {
        return fiscal;
    }

    /**
     * Sets the value of the fiscal property.
     * 
     * @param value
     *     allowed object is
     *     {@link GovernmentTaxInfoBasic }
     *     
     */
    public void setFiscal(GovernmentTaxInfoBasic value) {
        this.fiscal = value;
    }

    /**
     * Gets the value of the disclaimer property.
     * 
     * @return
     *     possible object is
     *     {@link GovernmentTaxInfoDisclaimer }
     *     
     */
    public GovernmentTaxInfoDisclaimer getDisclaimer() {
        return disclaimer;
    }

    /**
     * Sets the value of the disclaimer property.
     * 
     * @param value
     *     allowed object is
     *     {@link GovernmentTaxInfoDisclaimer }
     *     
     */
    public void setDisclaimer(GovernmentTaxInfoDisclaimer value) {
        this.disclaimer = value;
    }

    /**
     * Gets the value of the idType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdType() {
        return idType;
    }

    /**
     * Sets the value of the idType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdType(String value) {
        this.idType = value;
    }

}
