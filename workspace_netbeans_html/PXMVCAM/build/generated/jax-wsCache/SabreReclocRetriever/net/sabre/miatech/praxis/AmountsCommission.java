
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.Commission complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.Commission">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Category35" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Commission.Category35" minOccurs="0"/>
 *         &lt;element name="Agency" type="{http://www.sabre.com/ns/Ticketing/DC}ArrayOfAmountCommission" minOccurs="0"/>
 *         &lt;element name="Manual" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Commission" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.Commission", propOrder = {
    "category35",
    "agency",
    "manual"
})
public class AmountsCommission {

    @XmlElement(name = "Category35")
    protected AmountCommissionCategory35 category35;
    @XmlElement(name = "Agency")
    protected ArrayOfAmountCommission agency;
    @XmlElement(name = "Manual")
    protected AmountCommission manual;

    /**
     * Gets the value of the category35 property.
     * 
     * @return
     *     possible object is
     *     {@link AmountCommissionCategory35 }
     *     
     */
    public AmountCommissionCategory35 getCategory35() {
        return category35;
    }

    /**
     * Sets the value of the category35 property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountCommissionCategory35 }
     *     
     */
    public void setCategory35(AmountCommissionCategory35 value) {
        this.category35 = value;
    }

    /**
     * Gets the value of the agency property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAmountCommission }
     *     
     */
    public ArrayOfAmountCommission getAgency() {
        return agency;
    }

    /**
     * Sets the value of the agency property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAmountCommission }
     *     
     */
    public void setAgency(ArrayOfAmountCommission value) {
        this.agency = value;
    }

    /**
     * Gets the value of the manual property.
     * 
     * @return
     *     possible object is
     *     {@link AmountCommission }
     *     
     */
    public AmountCommission getManual() {
        return manual;
    }

    /**
     * Sets the value of the manual property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountCommission }
     *     
     */
    public void setManual(AmountCommission value) {
        this.manual = value;
    }

}
