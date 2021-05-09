
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Remark complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Remark">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Endorsements" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.DetailsWithType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Manual" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *         &lt;element name="Payment" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *         &lt;element name="OriginalIssue" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *         &lt;element name="Prepaid" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *         &lt;element name="Passenger" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.DetailsWithHeader" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Other" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.DetailsWithType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="PrivateFareText" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Remark", propOrder = {
    "endorsements",
    "manual",
    "payment",
    "originalIssue",
    "prepaid",
    "passenger",
    "other",
    "privateFareText"
})
public class TicketingDocumentRemark {

    @XmlElement(name = "Endorsements")
    protected List<RemarkDetailsWithType> endorsements;
    @XmlElement(name = "Manual")
    protected RemarkDetails manual;
    @XmlElement(name = "Payment")
    protected RemarkDetails payment;
    @XmlElement(name = "OriginalIssue")
    protected RemarkDetails originalIssue;
    @XmlElement(name = "Prepaid")
    protected RemarkDetails prepaid;
    @XmlElement(name = "Passenger")
    protected List<RemarkDetailsWithHeader> passenger;
    @XmlElement(name = "Other")
    protected List<RemarkDetailsWithType> other;
    @XmlElement(name = "PrivateFareText")
    protected RemarkDetails privateFareText;

    /**
     * Gets the value of the endorsements property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the endorsements property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEndorsements().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RemarkDetailsWithType }
     * 
     * 
     */
    public List<RemarkDetailsWithType> getEndorsements() {
        if (endorsements == null) {
            endorsements = new ArrayList<RemarkDetailsWithType>();
        }
        return this.endorsements;
    }

    /**
     * Gets the value of the manual property.
     * 
     * @return
     *     possible object is
     *     {@link RemarkDetails }
     *     
     */
    public RemarkDetails getManual() {
        return manual;
    }

    /**
     * Sets the value of the manual property.
     * 
     * @param value
     *     allowed object is
     *     {@link RemarkDetails }
     *     
     */
    public void setManual(RemarkDetails value) {
        this.manual = value;
    }

    /**
     * Gets the value of the payment property.
     * 
     * @return
     *     possible object is
     *     {@link RemarkDetails }
     *     
     */
    public RemarkDetails getPayment() {
        return payment;
    }

    /**
     * Sets the value of the payment property.
     * 
     * @param value
     *     allowed object is
     *     {@link RemarkDetails }
     *     
     */
    public void setPayment(RemarkDetails value) {
        this.payment = value;
    }

    /**
     * Gets the value of the originalIssue property.
     * 
     * @return
     *     possible object is
     *     {@link RemarkDetails }
     *     
     */
    public RemarkDetails getOriginalIssue() {
        return originalIssue;
    }

    /**
     * Sets the value of the originalIssue property.
     * 
     * @param value
     *     allowed object is
     *     {@link RemarkDetails }
     *     
     */
    public void setOriginalIssue(RemarkDetails value) {
        this.originalIssue = value;
    }

    /**
     * Gets the value of the prepaid property.
     * 
     * @return
     *     possible object is
     *     {@link RemarkDetails }
     *     
     */
    public RemarkDetails getPrepaid() {
        return prepaid;
    }

    /**
     * Sets the value of the prepaid property.
     * 
     * @param value
     *     allowed object is
     *     {@link RemarkDetails }
     *     
     */
    public void setPrepaid(RemarkDetails value) {
        this.prepaid = value;
    }

    /**
     * Gets the value of the passenger property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the passenger property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPassenger().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RemarkDetailsWithHeader }
     * 
     * 
     */
    public List<RemarkDetailsWithHeader> getPassenger() {
        if (passenger == null) {
            passenger = new ArrayList<RemarkDetailsWithHeader>();
        }
        return this.passenger;
    }

    /**
     * Gets the value of the other property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the other property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getOther().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RemarkDetailsWithType }
     * 
     * 
     */
    public List<RemarkDetailsWithType> getOther() {
        if (other == null) {
            other = new ArrayList<RemarkDetailsWithType>();
        }
        return this.other;
    }

    /**
     * Gets the value of the privateFareText property.
     * 
     * @return
     *     possible object is
     *     {@link RemarkDetails }
     *     
     */
    public RemarkDetails getPrivateFareText() {
        return privateFareText;
    }

    /**
     * Sets the value of the privateFareText property.
     * 
     * @param value
     *     allowed object is
     *     {@link RemarkDetails }
     *     
     */
    public void setPrivateFareText(RemarkDetails value) {
        this.privateFareText = value;
    }

}
