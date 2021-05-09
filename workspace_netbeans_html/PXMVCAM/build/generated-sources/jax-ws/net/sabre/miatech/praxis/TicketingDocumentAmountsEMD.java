
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Amounts.EMD complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Amounts.EMD">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="New" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.New" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Amounts.EMD", propOrder = {
    "_new"
})
public class TicketingDocumentAmountsEMD {

    @XmlElement(name = "New")
    protected AmountsNew _new;

    /**
     * Gets the value of the new property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsNew }
     *     
     */
    public AmountsNew getNew() {
        return _new;
    }

    /**
     * Sets the value of the new property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsNew }
     *     
     */
    public void setNew(AmountsNew value) {
        this._new = value;
    }

}
