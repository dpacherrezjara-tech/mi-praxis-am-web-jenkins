
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.BulkTicket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.BulkTicket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Base" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Equivalent" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="TotalTax" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Total" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.BulkTicket", propOrder = {
    "base",
    "equivalent",
    "totalTax",
    "total"
})
public class AmountsBulkTicket {

    @XmlElement(name = "Base")
    protected AmountDetails base;
    @XmlElement(name = "Equivalent")
    protected AmountDetails equivalent;
    @XmlElement(name = "TotalTax")
    protected AmountDetails totalTax;
    @XmlElement(name = "Total")
    protected AmountDetails total;

    /**
     * Gets the value of the base property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getBase() {
        return base;
    }

    /**
     * Sets the value of the base property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setBase(AmountDetails value) {
        this.base = value;
    }

    /**
     * Gets the value of the equivalent property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getEquivalent() {
        return equivalent;
    }

    /**
     * Sets the value of the equivalent property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setEquivalent(AmountDetails value) {
        this.equivalent = value;
    }

    /**
     * Gets the value of the totalTax property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getTotalTax() {
        return totalTax;
    }

    /**
     * Sets the value of the totalTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setTotalTax(AmountDetails value) {
        this.totalTax = value;
    }

    /**
     * Gets the value of the total property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setTotal(AmountDetails value) {
        this.total = value;
    }

}
