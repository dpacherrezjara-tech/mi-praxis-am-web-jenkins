
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
 * <p>Java class for TicketingDocument.Details.EMD complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Details.EMD">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TourNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Reservation" type="{http://www.sabre.com/ns/Ticketing/DC}Reservation.Details" minOccurs="0"/>
 *         &lt;element name="SystemCreateDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="LocalIssueDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="LastUpdate" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="ExpirationDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="ValidatingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="ItineraryType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SettlementAuthorization" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ElectronicMiscType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareCalculationMode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ReasonForIssue" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PreviousStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareCalculationPricing" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="GovernmentTaxIdentification" type="{http://www.sabre.com/ns/Ticketing/DC}GovernmentTaxInfo.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="MandateInfo" type="{http://www.sabre.com/ns/Ticketing/DC}MandateInfo.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="NetType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Details.EMD", propOrder = {
    "tourNumber",
    "reservation",
    "systemCreateDateTime",
    "localIssueDateTime",
    "lastUpdate",
    "expirationDate",
    "validatingProvider",
    "itineraryType",
    "settlementAuthorization",
    "electronicMiscType",
    "fareCalculationMode",
    "reasonForIssue",
    "currentStatus",
    "previousStatus",
    "fareCalculationPricing",
    "governmentTaxIdentification",
    "mandateInfo",
    "netType"
})
public class TicketingDocumentDetailsEMD {

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
    @XmlElement(name = "ExpirationDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar expirationDate;
    @XmlElement(name = "ValidatingProvider")
    protected IdentifierProvider validatingProvider;
    @XmlElement(name = "ItineraryType")
    protected String itineraryType;
    @XmlElement(name = "SettlementAuthorization")
    protected String settlementAuthorization;
    @XmlElement(name = "ElectronicMiscType")
    protected String electronicMiscType;
    @XmlElement(name = "FareCalculationMode")
    protected String fareCalculationMode;
    @XmlElement(name = "ReasonForIssue")
    protected String reasonForIssue;
    @XmlElement(name = "CurrentStatus")
    protected String currentStatus;
    @XmlElement(name = "PreviousStatus")
    protected String previousStatus;
    @XmlElement(name = "FareCalculationPricing")
    protected String fareCalculationPricing;
    @XmlElement(name = "GovernmentTaxIdentification")
    protected List<GovernmentTaxInfoDetails> governmentTaxIdentification;
    @XmlElement(name = "MandateInfo")
    protected List<MandateInfoDetails> mandateInfo;
    @XmlElement(name = "NetType")
    protected String netType;

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
     * Gets the value of the expirationDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getExpirationDate() {
        return expirationDate;
    }

    /**
     * Sets the value of the expirationDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setExpirationDate(XMLGregorianCalendar value) {
        this.expirationDate = value;
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
     * Gets the value of the itineraryType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getItineraryType() {
        return itineraryType;
    }

    /**
     * Sets the value of the itineraryType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setItineraryType(String value) {
        this.itineraryType = value;
    }

    /**
     * Gets the value of the settlementAuthorization property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSettlementAuthorization() {
        return settlementAuthorization;
    }

    /**
     * Sets the value of the settlementAuthorization property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSettlementAuthorization(String value) {
        this.settlementAuthorization = value;
    }

    /**
     * Gets the value of the electronicMiscType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElectronicMiscType() {
        return electronicMiscType;
    }

    /**
     * Sets the value of the electronicMiscType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElectronicMiscType(String value) {
        this.electronicMiscType = value;
    }

    /**
     * Gets the value of the fareCalculationMode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFareCalculationMode() {
        return fareCalculationMode;
    }

    /**
     * Sets the value of the fareCalculationMode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFareCalculationMode(String value) {
        this.fareCalculationMode = value;
    }

    /**
     * Gets the value of the reasonForIssue property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReasonForIssue() {
        return reasonForIssue;
    }

    /**
     * Sets the value of the reasonForIssue property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReasonForIssue(String value) {
        this.reasonForIssue = value;
    }

    /**
     * Gets the value of the currentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentStatus() {
        return currentStatus;
    }

    /**
     * Sets the value of the currentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentStatus(String value) {
        this.currentStatus = value;
    }

    /**
     * Gets the value of the previousStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreviousStatus() {
        return previousStatus;
    }

    /**
     * Sets the value of the previousStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreviousStatus(String value) {
        this.previousStatus = value;
    }

    /**
     * Gets the value of the fareCalculationPricing property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFareCalculationPricing() {
        return fareCalculationPricing;
    }

    /**
     * Sets the value of the fareCalculationPricing property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFareCalculationPricing(String value) {
        this.fareCalculationPricing = value;
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

    /**
     * Gets the value of the mandateInfo property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the mandateInfo property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMandateInfo().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MandateInfoDetails }
     * 
     * 
     */
    public List<MandateInfoDetails> getMandateInfo() {
        if (mandateInfo == null) {
            mandateInfo = new ArrayList<MandateInfoDetails>();
        }
        return this.mandateInfo;
    }

    /**
     * Gets the value of the netType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNetType() {
        return netType;
    }

    /**
     * Sets the value of the netType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNetType(String value) {
        this.netType = value;
    }

}
