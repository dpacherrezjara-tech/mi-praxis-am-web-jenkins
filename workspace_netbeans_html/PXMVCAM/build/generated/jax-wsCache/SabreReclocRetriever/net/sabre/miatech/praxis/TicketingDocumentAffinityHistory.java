
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Affinity.History complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Affinity.History">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="FrequentFlyer" type="{http://www.sabre.com/ns/Ticketing/DC}Affinity.FrequentFlyer" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Affinity.History", propOrder = {
    "frequentFlyer"
})
public class TicketingDocumentAffinityHistory {

    @XmlElement(name = "FrequentFlyer")
    protected AffinityFrequentFlyer frequentFlyer;

    /**
     * Gets the value of the frequentFlyer property.
     * 
     * @return
     *     possible object is
     *     {@link AffinityFrequentFlyer }
     *     
     */
    public AffinityFrequentFlyer getFrequentFlyer() {
        return frequentFlyer;
    }

    /**
     * Sets the value of the frequentFlyer property.
     * 
     * @param value
     *     allowed object is
     *     {@link AffinityFrequentFlyer }
     *     
     */
    public void setFrequentFlyer(AffinityFrequentFlyer value) {
        this.frequentFlyer = value;
    }

}
