
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Taxes.Other complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Taxes.Other">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="FeeTax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="TotalFeeTax" type="{http://www.sabre.com/ns/Ticketing/DC}Amount1" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Taxes.Other", propOrder = {
    "feeTax",
    "totalFeeTax"
})
public class TicketingDocumentTaxesOther {

    @XmlElement(name = "FeeTax")
    protected List<TaxDetails> feeTax;
    @XmlElement(name = "TotalFeeTax")
    protected Amount1 totalFeeTax;

    /**
     * Gets the value of the feeTax property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the feeTax property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFeeTax().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxDetails }
     * 
     * 
     */
    public List<TaxDetails> getFeeTax() {
        if (feeTax == null) {
            feeTax = new ArrayList<TaxDetails>();
        }
        return this.feeTax;
    }

    /**
     * Gets the value of the totalFeeTax property.
     * 
     * @return
     *     possible object is
     *     {@link Amount1 }
     *     
     */
    public Amount1 getTotalFeeTax() {
        return totalFeeTax;
    }

    /**
     * Sets the value of the totalFeeTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link Amount1 }
     *     
     */
    public void setTotalFeeTax(Amount1 value) {
        this.totalFeeTax = value;
    }

}
