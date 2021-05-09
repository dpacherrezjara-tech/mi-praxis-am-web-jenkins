
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for TicketingDocument.Details.Ticket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Details.Ticket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TourNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Reservation" type="{http://www.sabre.com/ns/Ticketing/DC}Reservation.Details" minOccurs="0"/>
 *         &lt;element name="SystemCreateDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="LocalIssueDateTime" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>dateTime">
 *                 &lt;attribute name="useTimeForPricing" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="LastUpdate" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="ExpirationDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="ValidatingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="AgencyBillingNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="InvoiceNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Waiver" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OriginCity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationCity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ItineraryType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SettlementAuthorization" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="InternationalSaleInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="InclusiveTransaction" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ExchTransactionType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ExchTransactionDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="ExchTransactionTime" type="{http://www.w3.org/2001/XMLSchema}time" minOccurs="0"/>
 *         &lt;element name="ExchCategory" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EvenExchWaive" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ElectronicMiscType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ReasonForIssue" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareCalculationMode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TicketingMode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PriceCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PriceCheckDigit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CouponText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ReasonType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ReasonDescription" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PreviousStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ExceptionType" type="{http://www.sabre.com/ns/Ticketing/DC}Code.DocumentIssueExceptionType" minOccurs="0"/>
 *         &lt;element name="CurrentActivity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PreviousActivity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrencyOverride" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PointOfSaleOverride" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PointOfTicketOverride" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CorporateId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AccountCode" type="{http://www.sabre.com/ns/Ticketing/DC}Code.Account" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="GovernmentStatus" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.GovernmentStatus" minOccurs="0"/>
 *         &lt;element name="FareCalculationPricing" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ResidentLargeFamilyDiscount" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TicketDestination" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TicketTravel" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BaggageDisclosure" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.BaggageDisclosure" minOccurs="0"/>
 *         &lt;element name="GovernmentTaxIdentification" type="{http://www.sabre.com/ns/Ticketing/DC}GovernmentTaxInfo.Details" minOccurs="0"/>
 *         &lt;element name="MandateInfo" type="{http://www.sabre.com/ns/Ticketing/DC}MandateInfo.Details" minOccurs="0"/>
 *         &lt;element name="NetType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PricingRetailerRule" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AdjustedSellingRetailerRule" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PricingAgentLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PrivateFareInd" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="PricingCategory" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Details.Ticket", propOrder = {
    "tourNumber",
    "reservation",
    "systemCreateDateTime",
    "localIssueDateTime",
    "lastUpdate",
    "expirationDate",
    "validatingProvider",
    "agencyBillingNumber",
    "invoiceNumber",
    "waiver",
    "originCity",
    "destinationCity",
    "itineraryType",
    "settlementAuthorization",
    "internationalSaleInd",
    "inclusiveTransaction",
    "exchTransactionType",
    "exchTransactionDate",
    "exchTransactionTime",
    "exchCategory",
    "evenExchWaive",
    "electronicMiscType",
    "reasonForIssue",
    "fareCalculationMode",
    "ticketingMode",
    "priceCode",
    "priceCheckDigit",
    "couponText",
    "reasonType",
    "reasonDescription",
    "currentStatus",
    "previousStatus",
    "exceptionType",
    "currentActivity",
    "previousActivity",
    "currencyOverride",
    "pointOfSaleOverride",
    "pointOfTicketOverride",
    "corporateId",
    "accountCode",
    "governmentStatus",
    "fareCalculationPricing",
    "residentLargeFamilyDiscount",
    "ticketDestination",
    "ticketTravel",
    "baggageDisclosure",
    "governmentTaxIdentification",
    "mandateInfo",
    "netType",
    "pricingRetailerRule",
    "adjustedSellingRetailerRule",
    "pricingAgentLocation",
    "privateFareInd",
    "pricingCategory"
})
public class TicketingDocumentDetailsTicket {

    @XmlElement(name = "TourNumber")
    protected String tourNumber;
    @XmlElement(name = "Reservation")
    protected ReservationDetails reservation;
    @XmlElement(name = "SystemCreateDateTime", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar systemCreateDateTime;
    @XmlElement(name = "LocalIssueDateTime")
    protected TicketingDocumentDetailsTicket.LocalIssueDateTime localIssueDateTime;
    @XmlElement(name = "LastUpdate", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar lastUpdate;
    @XmlElement(name = "ExpirationDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar expirationDate;
    @XmlElement(name = "ValidatingProvider")
    protected IdentifierProvider validatingProvider;
    @XmlElement(name = "AgencyBillingNumber")
    protected String agencyBillingNumber;
    @XmlElement(name = "InvoiceNumber")
    protected String invoiceNumber;
    @XmlElement(name = "Waiver")
    protected String waiver;
    @XmlElement(name = "OriginCity")
    protected String originCity;
    @XmlElement(name = "DestinationCity")
    protected String destinationCity;
    @XmlElement(name = "ItineraryType")
    protected String itineraryType;
    @XmlElement(name = "SettlementAuthorization")
    protected String settlementAuthorization;
    @XmlElement(name = "InternationalSaleInd")
    protected String internationalSaleInd;
    @XmlElement(name = "InclusiveTransaction")
    protected String inclusiveTransaction;
    @XmlElement(name = "ExchTransactionType")
    protected String exchTransactionType;
    @XmlElement(name = "ExchTransactionDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar exchTransactionDate;
    @XmlElement(name = "ExchTransactionTime")
    @XmlSchemaType(name = "time")
    protected XMLGregorianCalendar exchTransactionTime;
    @XmlElement(name = "ExchCategory")
    protected String exchCategory;
    @XmlElement(name = "EvenExchWaive")
    protected String evenExchWaive;
    @XmlElement(name = "ElectronicMiscType")
    protected String electronicMiscType;
    @XmlElement(name = "ReasonForIssue")
    protected String reasonForIssue;
    @XmlElement(name = "FareCalculationMode")
    protected String fareCalculationMode;
    @XmlElement(name = "TicketingMode")
    protected String ticketingMode;
    @XmlElement(name = "PriceCode")
    protected String priceCode;
    @XmlElement(name = "PriceCheckDigit")
    protected String priceCheckDigit;
    @XmlElement(name = "CouponText")
    protected String couponText;
    @XmlElement(name = "ReasonType")
    protected String reasonType;
    @XmlElement(name = "ReasonDescription")
    protected String reasonDescription;
    @XmlElement(name = "CurrentStatus")
    protected String currentStatus;
    @XmlElement(name = "PreviousStatus")
    protected String previousStatus;
    @XmlElement(name = "ExceptionType")
    protected CodeDocumentIssueExceptionType exceptionType;
    @XmlElement(name = "CurrentActivity")
    protected String currentActivity;
    @XmlElement(name = "PreviousActivity")
    protected String previousActivity;
    @XmlElement(name = "CurrencyOverride")
    protected String currencyOverride;
    @XmlElement(name = "PointOfSaleOverride")
    protected String pointOfSaleOverride;
    @XmlElement(name = "PointOfTicketOverride")
    protected String pointOfTicketOverride;
    @XmlElement(name = "CorporateId")
    protected String corporateId;
    @XmlElement(name = "AccountCode")
    protected List<CodeAccount> accountCode;
    @XmlElement(name = "GovernmentStatus")
    protected TicketingDocumentGovernmentStatus governmentStatus;
    @XmlElement(name = "FareCalculationPricing")
    protected String fareCalculationPricing;
    @XmlElement(name = "ResidentLargeFamilyDiscount")
    protected String residentLargeFamilyDiscount;
    @XmlElement(name = "TicketDestination")
    protected String ticketDestination;
    @XmlElement(name = "TicketTravel")
    protected String ticketTravel;
    @XmlElement(name = "BaggageDisclosure")
    protected TicketingDocumentBaggageDisclosure baggageDisclosure;
    @XmlElement(name = "GovernmentTaxIdentification")
    protected GovernmentTaxInfoDetails governmentTaxIdentification;
    @XmlElement(name = "MandateInfo")
    protected MandateInfoDetails mandateInfo;
    @XmlElement(name = "NetType")
    protected String netType;
    @XmlElement(name = "PricingRetailerRule")
    protected String pricingRetailerRule;
    @XmlElement(name = "AdjustedSellingRetailerRule")
    protected String adjustedSellingRetailerRule;
    @XmlElement(name = "PricingAgentLocation")
    protected String pricingAgentLocation;
    @XmlElement(name = "PrivateFareInd")
    protected Boolean privateFareInd;
    @XmlElement(name = "PricingCategory")
    protected String pricingCategory;

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
     *     {@link TicketingDocumentDetailsTicket.LocalIssueDateTime }
     *     
     */
    public TicketingDocumentDetailsTicket.LocalIssueDateTime getLocalIssueDateTime() {
        return localIssueDateTime;
    }

    /**
     * Sets the value of the localIssueDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentDetailsTicket.LocalIssueDateTime }
     *     
     */
    public void setLocalIssueDateTime(TicketingDocumentDetailsTicket.LocalIssueDateTime value) {
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
     * Gets the value of the agencyBillingNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAgencyBillingNumber() {
        return agencyBillingNumber;
    }

    /**
     * Sets the value of the agencyBillingNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAgencyBillingNumber(String value) {
        this.agencyBillingNumber = value;
    }

    /**
     * Gets the value of the invoiceNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    /**
     * Sets the value of the invoiceNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInvoiceNumber(String value) {
        this.invoiceNumber = value;
    }

    /**
     * Gets the value of the waiver property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWaiver() {
        return waiver;
    }

    /**
     * Sets the value of the waiver property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWaiver(String value) {
        this.waiver = value;
    }

    /**
     * Gets the value of the originCity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOriginCity() {
        return originCity;
    }

    /**
     * Sets the value of the originCity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOriginCity(String value) {
        this.originCity = value;
    }

    /**
     * Gets the value of the destinationCity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationCity() {
        return destinationCity;
    }

    /**
     * Sets the value of the destinationCity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationCity(String value) {
        this.destinationCity = value;
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
     * Gets the value of the internationalSaleInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInternationalSaleInd() {
        return internationalSaleInd;
    }

    /**
     * Sets the value of the internationalSaleInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInternationalSaleInd(String value) {
        this.internationalSaleInd = value;
    }

    /**
     * Gets the value of the inclusiveTransaction property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInclusiveTransaction() {
        return inclusiveTransaction;
    }

    /**
     * Sets the value of the inclusiveTransaction property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInclusiveTransaction(String value) {
        this.inclusiveTransaction = value;
    }

    /**
     * Gets the value of the exchTransactionType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExchTransactionType() {
        return exchTransactionType;
    }

    /**
     * Sets the value of the exchTransactionType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExchTransactionType(String value) {
        this.exchTransactionType = value;
    }

    /**
     * Gets the value of the exchTransactionDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getExchTransactionDate() {
        return exchTransactionDate;
    }

    /**
     * Sets the value of the exchTransactionDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setExchTransactionDate(XMLGregorianCalendar value) {
        this.exchTransactionDate = value;
    }

    /**
     * Gets the value of the exchTransactionTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getExchTransactionTime() {
        return exchTransactionTime;
    }

    /**
     * Sets the value of the exchTransactionTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setExchTransactionTime(XMLGregorianCalendar value) {
        this.exchTransactionTime = value;
    }

    /**
     * Gets the value of the exchCategory property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExchCategory() {
        return exchCategory;
    }

    /**
     * Sets the value of the exchCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExchCategory(String value) {
        this.exchCategory = value;
    }

    /**
     * Gets the value of the evenExchWaive property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEvenExchWaive() {
        return evenExchWaive;
    }

    /**
     * Sets the value of the evenExchWaive property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEvenExchWaive(String value) {
        this.evenExchWaive = value;
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
     * Gets the value of the ticketingMode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTicketingMode() {
        return ticketingMode;
    }

    /**
     * Sets the value of the ticketingMode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTicketingMode(String value) {
        this.ticketingMode = value;
    }

    /**
     * Gets the value of the priceCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPriceCode() {
        return priceCode;
    }

    /**
     * Sets the value of the priceCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPriceCode(String value) {
        this.priceCode = value;
    }

    /**
     * Gets the value of the priceCheckDigit property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPriceCheckDigit() {
        return priceCheckDigit;
    }

    /**
     * Sets the value of the priceCheckDigit property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPriceCheckDigit(String value) {
        this.priceCheckDigit = value;
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
     * Gets the value of the reasonType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReasonType() {
        return reasonType;
    }

    /**
     * Sets the value of the reasonType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReasonType(String value) {
        this.reasonType = value;
    }

    /**
     * Gets the value of the reasonDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReasonDescription() {
        return reasonDescription;
    }

    /**
     * Sets the value of the reasonDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReasonDescription(String value) {
        this.reasonDescription = value;
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
     * Gets the value of the exceptionType property.
     * 
     * @return
     *     possible object is
     *     {@link CodeDocumentIssueExceptionType }
     *     
     */
    public CodeDocumentIssueExceptionType getExceptionType() {
        return exceptionType;
    }

    /**
     * Sets the value of the exceptionType property.
     * 
     * @param value
     *     allowed object is
     *     {@link CodeDocumentIssueExceptionType }
     *     
     */
    public void setExceptionType(CodeDocumentIssueExceptionType value) {
        this.exceptionType = value;
    }

    /**
     * Gets the value of the currentActivity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentActivity() {
        return currentActivity;
    }

    /**
     * Sets the value of the currentActivity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentActivity(String value) {
        this.currentActivity = value;
    }

    /**
     * Gets the value of the previousActivity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreviousActivity() {
        return previousActivity;
    }

    /**
     * Sets the value of the previousActivity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreviousActivity(String value) {
        this.previousActivity = value;
    }

    /**
     * Gets the value of the currencyOverride property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrencyOverride() {
        return currencyOverride;
    }

    /**
     * Sets the value of the currencyOverride property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrencyOverride(String value) {
        this.currencyOverride = value;
    }

    /**
     * Gets the value of the pointOfSaleOverride property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPointOfSaleOverride() {
        return pointOfSaleOverride;
    }

    /**
     * Sets the value of the pointOfSaleOverride property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPointOfSaleOverride(String value) {
        this.pointOfSaleOverride = value;
    }

    /**
     * Gets the value of the pointOfTicketOverride property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPointOfTicketOverride() {
        return pointOfTicketOverride;
    }

    /**
     * Sets the value of the pointOfTicketOverride property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPointOfTicketOverride(String value) {
        this.pointOfTicketOverride = value;
    }

    /**
     * Gets the value of the corporateId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCorporateId() {
        return corporateId;
    }

    /**
     * Sets the value of the corporateId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCorporateId(String value) {
        this.corporateId = value;
    }

    /**
     * Gets the value of the accountCode property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the accountCode property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAccountCode().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CodeAccount }
     * 
     * 
     */
    public List<CodeAccount> getAccountCode() {
        if (accountCode == null) {
            accountCode = new ArrayList<CodeAccount>();
        }
        return this.accountCode;
    }

    /**
     * Gets the value of the governmentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentGovernmentStatus }
     *     
     */
    public TicketingDocumentGovernmentStatus getGovernmentStatus() {
        return governmentStatus;
    }

    /**
     * Sets the value of the governmentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentGovernmentStatus }
     *     
     */
    public void setGovernmentStatus(TicketingDocumentGovernmentStatus value) {
        this.governmentStatus = value;
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
     * Gets the value of the residentLargeFamilyDiscount property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResidentLargeFamilyDiscount() {
        return residentLargeFamilyDiscount;
    }

    /**
     * Sets the value of the residentLargeFamilyDiscount property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResidentLargeFamilyDiscount(String value) {
        this.residentLargeFamilyDiscount = value;
    }

    /**
     * Gets the value of the ticketDestination property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTicketDestination() {
        return ticketDestination;
    }

    /**
     * Sets the value of the ticketDestination property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTicketDestination(String value) {
        this.ticketDestination = value;
    }

    /**
     * Gets the value of the ticketTravel property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTicketTravel() {
        return ticketTravel;
    }

    /**
     * Sets the value of the ticketTravel property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTicketTravel(String value) {
        this.ticketTravel = value;
    }

    /**
     * Gets the value of the baggageDisclosure property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentBaggageDisclosure }
     *     
     */
    public TicketingDocumentBaggageDisclosure getBaggageDisclosure() {
        return baggageDisclosure;
    }

    /**
     * Sets the value of the baggageDisclosure property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentBaggageDisclosure }
     *     
     */
    public void setBaggageDisclosure(TicketingDocumentBaggageDisclosure value) {
        this.baggageDisclosure = value;
    }

    /**
     * Gets the value of the governmentTaxIdentification property.
     * 
     * @return
     *     possible object is
     *     {@link GovernmentTaxInfoDetails }
     *     
     */
    public GovernmentTaxInfoDetails getGovernmentTaxIdentification() {
        return governmentTaxIdentification;
    }

    /**
     * Sets the value of the governmentTaxIdentification property.
     * 
     * @param value
     *     allowed object is
     *     {@link GovernmentTaxInfoDetails }
     *     
     */
    public void setGovernmentTaxIdentification(GovernmentTaxInfoDetails value) {
        this.governmentTaxIdentification = value;
    }

    /**
     * Gets the value of the mandateInfo property.
     * 
     * @return
     *     possible object is
     *     {@link MandateInfoDetails }
     *     
     */
    public MandateInfoDetails getMandateInfo() {
        return mandateInfo;
    }

    /**
     * Sets the value of the mandateInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link MandateInfoDetails }
     *     
     */
    public void setMandateInfo(MandateInfoDetails value) {
        this.mandateInfo = value;
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

    /**
     * Gets the value of the pricingRetailerRule property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPricingRetailerRule() {
        return pricingRetailerRule;
    }

    /**
     * Sets the value of the pricingRetailerRule property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPricingRetailerRule(String value) {
        this.pricingRetailerRule = value;
    }

    /**
     * Gets the value of the adjustedSellingRetailerRule property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdjustedSellingRetailerRule() {
        return adjustedSellingRetailerRule;
    }

    /**
     * Sets the value of the adjustedSellingRetailerRule property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdjustedSellingRetailerRule(String value) {
        this.adjustedSellingRetailerRule = value;
    }

    /**
     * Gets the value of the pricingAgentLocation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPricingAgentLocation() {
        return pricingAgentLocation;
    }

    /**
     * Sets the value of the pricingAgentLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPricingAgentLocation(String value) {
        this.pricingAgentLocation = value;
    }

    /**
     * Gets the value of the privateFareInd property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isPrivateFareInd() {
        return privateFareInd;
    }

    /**
     * Sets the value of the privateFareInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPrivateFareInd(Boolean value) {
        this.privateFareInd = value;
    }

    /**
     * Gets the value of the pricingCategory property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPricingCategory() {
        return pricingCategory;
    }

    /**
     * Sets the value of the pricingCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPricingCategory(String value) {
        this.pricingCategory = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>dateTime">
     *       &lt;attribute name="useTimeForPricing" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class LocalIssueDateTime {

        @XmlValue
        @XmlSchemaType(name = "dateTime")
        protected XMLGregorianCalendar value;
        @XmlAttribute(name = "useTimeForPricing")
        protected Boolean useTimeForPricing;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setValue(XMLGregorianCalendar value) {
            this.value = value;
        }

        /**
         * Gets the value of the useTimeForPricing property.
         * 
         * @return
         *     possible object is
         *     {@link Boolean }
         *     
         */
        public boolean isUseTimeForPricing() {
            if (useTimeForPricing == null) {
                return false;
            } else {
                return useTimeForPricing;
            }
        }

        /**
         * Sets the value of the useTimeForPricing property.
         * 
         * @param value
         *     allowed object is
         *     {@link Boolean }
         *     
         */
        public void setUseTimeForPricing(Boolean value) {
            this.useTimeForPricing = value;
        }

    }

}
