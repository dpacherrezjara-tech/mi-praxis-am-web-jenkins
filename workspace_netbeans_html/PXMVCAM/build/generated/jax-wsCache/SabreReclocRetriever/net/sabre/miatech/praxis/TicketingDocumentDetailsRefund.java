
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for TicketingDocument.Details.Refund complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Details.Refund">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TourNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Reservation" type="{http://www.sabre.com/ns/Ticketing/DC}Reservation.Details" minOccurs="0"/>
 *         &lt;element name="SystemCreateDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="LocalIssueDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="LastUpdate" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="ValidatingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="CouponText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="GovernmentTaxIdentification" type="{http://www.sabre.com/ns/Ticketing/DC}GovernmentTaxInfo.Details" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Details.Refund", propOrder = {
    "tourNumber",
    "reservation",
    "systemCreateDateTime",
    "localIssueDateTime",
    "lastUpdate",
    "validatingProvider",
    "couponText",
    "governmentTaxIdentification"
})
public class TicketingDocumentDetailsRefund {

    @XmlElement(name = "TourNumber")
    protected String tourNumber;
    @XmlElement(name = "Reservation")
    protected ReservationDetails reservation;
    @XmlElement(name = "SystemCreateDateTime", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar systemCreateDateTime;
    @XmlElement(name = "LocalIssueDateTime", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar localIssueDateTime;
    @XmlElement(name = "LastUpdate", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar lastUpdate;
    @XmlElement(name = "ValidatingProvider")
    protected IdentifierProvider validatingProvider;
    @XmlElement(name = "CouponText")
    protected String couponText;
    @XmlElement(name = "GovernmentTaxIdentification")
    protected List<GovernmentTaxInfoDetails> governmentTaxIdentification;

    /**
     * Gets the value of the tourNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTourNumber() {
        return tourNumber;
    }

    /**
     * Sets the value of the tourNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTourNumber(String value) {
        this.tourNumber = value;
    }

    /**
     * Gets the value of the reservation property.
     * 
     * @return
     *     possible object is
     *     {@link ReservationDetails }
     *     
     */
    public ReservationDetails getReservation() {
        return reservation;
    }

    /**
     * Sets the value of the reservation property.
     * 
     * @param value
     *     allowed object is
     *     {@link ReservationDetails }
     *     
     */
    public void setReservation(ReservationDetails value) {
        this.reservation = value;
    }

    /**
     * Gets the value of the systemCreateDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getSystemCreateDateTime() {
        return systemCreateDateTime;
    }

    /**
     * Sets the value of the systemCreateDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setSystemCreateDateTime(XMLGregorianCalendar value) {
        this.systemCreateDateTime = value;
    }

    /**
     * Gets the value of the localIssueDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getLocalIssueDateTime() {
        return localIssueDateTime;
    }

    /**
     * Sets the value of the localIssueDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setLocalIssueDateTime(XMLGregorianCalendar value) {
        this.localIssueDateTime = value;
    }

    /**
     * Gets the value of the lastUpdate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getLastUpdate() {
        return lastUpdate;
    }

    /**
     * Sets the value of the lastUpdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setLastUpdate(XMLGregorianCalendar value) {
        this.lastUpdate = value;
    }

    /**
     * Gets the value of the validatingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getValidatingProvider() {
        return validatingProvider;
    }

    /**
     * Sets the value of the validatingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setValidatingProvider(IdentifierProvider value) {
        this.validatingProvider = value;
    }

    /**
     * Gets the value of the couponText property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCouponText() {
        return couponText;
    }

    /**
     * Sets the value of the couponText property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCouponText(String value) {
        this.couponText = value;
    }

    /**
     * Gets the value of the governmentTaxIdentification property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the governmentTaxIdentification property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getGovernmentTaxIdentification().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link GovernmentTaxInfoDetails }
     * 
     * 
     */
    public List<GovernmentTaxInfoDetails> getGovernmentTaxIdentification() {
        if (governmentTaxIdentification == null) {
            governmentTaxIdentification = new ArrayList<GovernmentTaxInfoDetails>();
        }
        return this.governmentTaxIdentification;
    }

}
