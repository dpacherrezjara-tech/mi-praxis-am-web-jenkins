
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.AdditionalFare.FareComponent complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.AdditionalFare.FareComponent">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MarkUp" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.MarkUp.FareComponent" minOccurs="0"/>
 *         &lt;element name="AfterMarkUp" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Markup" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="manual" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="retailerRule" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.AdditionalFare.FareComponent", propOrder = {
    "markUp",
    "afterMarkUp"
})
public class AmountsAdditionalFareFareComponent {

    @XmlElement(name = "MarkUp")
    protected AmountMarkUpFareComponent markUp;
    @XmlElement(name = "AfterMarkUp")
    protected AmountMarkup afterMarkUp;
    @XmlAttribute(name = "manual")
    protected Boolean manual;
    @XmlAttribute(name = "retailerRule")
    protected String retailerRule;

    /**
     * Gets the value of the markUp property.
     * 
     * @return
     *     possible object is
     *     {@link AmountMarkUpFareComponent }
     *     
     */
    public AmountMarkUpFareComponent getMarkUp() {
        return markUp;
    }

    /**
     * Sets the value of the markUp property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountMarkUpFareComponent }
     *     
     */
    public void setMarkUp(AmountMarkUpFareComponent value) {
        this.markUp = value;
    }

    /**
     * Gets the value of the afterMarkUp property.
     * 
     * @return
     *     possible object is
     *     {@link AmountMarkup }
     *     
     */
    public AmountMarkup getAfterMarkUp() {
        return afterMarkUp;
    }

    /**
     * Sets the value of the afterMarkUp property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountMarkup }
     *     
     */
    public void setAfterMarkUp(AmountMarkup value) {
        this.afterMarkUp = value;
    }

    /**
     * Gets the value of the manual property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isManual() {
        return manual;
    }

    /**
     * Sets the value of the manual property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setManual(Boolean value) {
        this.manual = value;
    }

    /**
     * Gets the value of the retailerRule property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRetailerRule() {
        return retailerRule;
    }

    /**
     * Sets the value of the retailerRule property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRetailerRule(String value) {
        this.retailerRule = value;
    }

}
