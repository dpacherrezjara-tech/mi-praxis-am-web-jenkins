
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.RelatedDocument complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.RelatedDocument">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Original" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Base" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Equivalent" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="TotalTax" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Total" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.RelatedDocument", propOrder = {
    "original",
    "base",
    "equivalent",
    "totalTax",
    "total"
})
public class AmountsRelatedDocument {

    @XmlElement(name = "Original")
    protected AmountBasic original;
    @XmlElement(name = "Base")
    protected AmountBasic base;
    @XmlElement(name = "Equivalent")
    protected AmountBasic equivalent;
    @XmlElement(name = "TotalTax")
    protected AmountBasic totalTax;
    @XmlElement(name = "Total")
    protected AmountBasic total;

    /**
     * Gets the value of the original property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getOriginal() {
        return original;
    }

    /**
     * Sets the value of the original property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setOriginal(AmountBasic value) {
        this.original = value;
    }

    /**
     * Gets the value of the base property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getBase() {
        return base;
    }

    /**
     * Sets the value of the base property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setBase(AmountBasic value) {
        this.base = value;
    }

    /**
     * Gets the value of the equivalent property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getEquivalent() {
        return equivalent;
    }

    /**
     * Sets the value of the equivalent property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setEquivalent(AmountBasic value) {
        this.equivalent = value;
    }

    /**
     * Gets the value of the totalTax property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getTotalTax() {
        return totalTax;
    }

    /**
     * Sets the value of the totalTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setTotalTax(AmountBasic value) {
        this.totalTax = value;
    }

    /**
     * Gets the value of the total property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setTotal(AmountBasic value) {
        this.total = value;
    }

}
