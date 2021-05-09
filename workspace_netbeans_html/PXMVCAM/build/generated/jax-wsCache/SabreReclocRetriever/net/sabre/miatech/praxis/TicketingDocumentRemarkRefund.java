
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Remark.Refund complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Remark.Refund">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Endorsements" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *         &lt;element name="Manual" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.Details" minOccurs="0"/>
 *         &lt;element name="Other" type="{http://www.sabre.com/ns/Ticketing/DC}Remark.DetailsWithType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Remark.Refund", propOrder = {
    "endorsements",
    "manual",
    "other"
})
public class TicketingDocumentRemarkRefund {

    @XmlElement(name = "Endorsements")
    protected RemarkDetails endorsements;
    @XmlElement(name = "Manual")
    protected RemarkDetails manual;
    @XmlElement(name = "Other")
    protected List<RemarkDetailsWithType> other;

    /**
     * Gets the value of the endorsements property.
     * 
     * @return
     *     possible object is
     *     {@link RemarkDetails }
     *     
     */
    public RemarkDetails getEndorsements() {
        return endorsements;
    }

    /**
     * Sets the value of the endorsements property.
     * 
     * @param value
     *     allowed object is
     *     {@link RemarkDetails }
     *     
     */
    public void setEndorsements(RemarkDetails value) {
        this.endorsements = value;
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

}
