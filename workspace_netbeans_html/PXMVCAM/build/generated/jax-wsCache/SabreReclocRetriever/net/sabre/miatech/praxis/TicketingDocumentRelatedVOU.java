
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Related.VOU complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Related.VOU">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Original" type="{http://www.sabre.com/ns/Ticketing/DC}RelatedDocument.Details" minOccurs="0"/>
 *         &lt;element name="Exchange" type="{http://www.sabre.com/ns/Ticketing/DC}RelatedDocument.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Refund" type="{http://www.sabre.com/ns/Ticketing/DC}RelatedDocument.Details" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Related.VOU", propOrder = {
    "original",
    "exchange",
    "refund"
})
public class TicketingDocumentRelatedVOU {

    @XmlElement(name = "Original")
    protected RelatedDocumentDetails original;
    @XmlElement(name = "Exchange")
    protected List<RelatedDocumentDetails> exchange;
    @XmlElement(name = "Refund")
    protected List<RelatedDocumentDetails> refund;

    /**
     * Gets the value of the original property.
     * 
     * @return
     *     possible object is
     *     {@link RelatedDocumentDetails }
     *     
     */
    public RelatedDocumentDetails getOriginal() {
        return original;
    }

    /**
     * Sets the value of the original property.
     * 
     * @param value
     *     allowed object is
     *     {@link RelatedDocumentDetails }
     *     
     */
    public void setOriginal(RelatedDocumentDetails value) {
        this.original = value;
    }

    /**
     * Gets the value of the exchange property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the exchange property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExchange().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RelatedDocumentDetails }
     * 
     * 
     */
    public List<RelatedDocumentDetails> getExchange() {
        if (exchange == null) {
            exchange = new ArrayList<RelatedDocumentDetails>();
        }
        return this.exchange;
    }

    /**
     * Gets the value of the refund property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the refund property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRefund().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RelatedDocumentDetails }
     * 
     * 
     */
    public List<RelatedDocumentDetails> getRefund() {
        if (refund == null) {
            refund = new ArrayList<RelatedDocumentDetails>();
        }
        return this.refund;
    }

}
