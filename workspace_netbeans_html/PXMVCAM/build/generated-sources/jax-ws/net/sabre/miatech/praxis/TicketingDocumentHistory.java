
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.History complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.History">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Agent" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Agent.History" minOccurs="0"/>
 *         &lt;element name="TransactionInfo" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.TransactionInfo.History" minOccurs="0"/>
 *         &lt;element name="Details" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Details.History" minOccurs="0"/>
 *         &lt;element name="ServiceCouponHistory" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.ServiceCoupon.History" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="RelatedDocumentHistory" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Related.History" minOccurs="0"/>
 *         &lt;element name="AffinityHistory" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Affinity.History" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="sequence" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="number" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.History", propOrder = {
    "agent",
    "transactionInfo",
    "details",
    "serviceCouponHistory",
    "relatedDocumentHistory",
    "affinityHistory"
})
public class TicketingDocumentHistory {

    @XmlElement(name = "Agent")
    protected TicketingAgentHistory agent;
    @XmlElement(name = "TransactionInfo")
    protected TicketingTransactionInfoHistory transactionInfo;
    @XmlElement(name = "Details")
    protected TicketingDetailsHistory details;
    @XmlElement(name = "ServiceCouponHistory")
    protected List<TicketingDocumentServiceCouponHistory> serviceCouponHistory;
    @XmlElement(name = "RelatedDocumentHistory")
    protected TicketingDocumentRelatedHistory relatedDocumentHistory;
    @XmlElement(name = "AffinityHistory")
    protected List<TicketingDocumentAffinityHistory> affinityHistory;
    @XmlAttribute(name = "sequence")
    protected BigInteger sequence;
    @XmlAttribute(name = "number")
    protected BigInteger number;
    @XmlAttribute(name = "code")
    protected String code;

    /**
     * Gets the value of the agent property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingAgentHistory }
     *     
     */
    public TicketingAgentHistory getAgent() {
        return agent;
    }

    /**
     * Sets the value of the agent property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingAgentHistory }
     *     
     */
    public void setAgent(TicketingAgentHistory value) {
        this.agent = value;
    }

    /**
     * Gets the value of the transactionInfo property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingTransactionInfoHistory }
     *     
     */
    public TicketingTransactionInfoHistory getTransactionInfo() {
        return transactionInfo;
    }

    /**
     * Sets the value of the transactionInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingTransactionInfoHistory }
     *     
     */
    public void setTransactionInfo(TicketingTransactionInfoHistory value) {
        this.transactionInfo = value;
    }

    /**
     * Gets the value of the details property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDetailsHistory }
     *     
     */
    public TicketingDetailsHistory getDetails() {
        return details;
    }

    /**
     * Sets the value of the details property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDetailsHistory }
     *     
     */
    public void setDetails(TicketingDetailsHistory value) {
        this.details = value;
    }

    /**
     * Gets the value of the serviceCouponHistory property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the serviceCouponHistory property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getServiceCouponHistory().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentServiceCouponHistory }
     * 
     * 
     */
    public List<TicketingDocumentServiceCouponHistory> getServiceCouponHistory() {
        if (serviceCouponHistory == null) {
            serviceCouponHistory = new ArrayList<TicketingDocumentServiceCouponHistory>();
        }
        return this.serviceCouponHistory;
    }

    /**
     * Gets the value of the relatedDocumentHistory property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentRelatedHistory }
     *     
     */
    public TicketingDocumentRelatedHistory getRelatedDocumentHistory() {
        return relatedDocumentHistory;
    }

    /**
     * Sets the value of the relatedDocumentHistory property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentRelatedHistory }
     *     
     */
    public void setRelatedDocumentHistory(TicketingDocumentRelatedHistory value) {
        this.relatedDocumentHistory = value;
    }

    /**
     * Gets the value of the affinityHistory property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the affinityHistory property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAffinityHistory().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentAffinityHistory }
     * 
     * 
     */
    public List<TicketingDocumentAffinityHistory> getAffinityHistory() {
        if (affinityHistory == null) {
            affinityHistory = new ArrayList<TicketingDocumentAffinityHistory>();
        }
        return this.affinityHistory;
    }

    /**
     * Gets the value of the sequence property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getSequence() {
        return sequence;
    }

    /**
     * Sets the value of the sequence property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setSequence(BigInteger value) {
        this.sequence = value;
    }

    /**
     * Gets the value of the number property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getNumber() {
        return number;
    }

    /**
     * Sets the value of the number property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setNumber(BigInteger value) {
        this.number = value;
    }

    /**
     * Gets the value of the code property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCode() {
        return code;
    }

    /**
     * Sets the value of the code property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCode(String value) {
        this.code = value;
    }

}
