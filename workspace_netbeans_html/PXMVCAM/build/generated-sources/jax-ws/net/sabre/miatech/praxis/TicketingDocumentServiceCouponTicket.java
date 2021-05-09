
package net.sabre.miatech.praxis;

import java.math.BigInteger;
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
 * <p>Java class for TicketingDocument.ServiceCoupon.Ticket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.ServiceCoupon.Ticket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MarketingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="MarketingFlightNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OperatingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="OperatingFlightNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ClassOfService" type="{http://www.sabre.com/ns/Ticketing/DC}ClassOfService.Details" minOccurs="0"/>
 *         &lt;element name="Cabin" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="FareBasis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StartLocation" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="StartDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="EndLocation" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;choice>
 *           &lt;element name="EndDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *           &lt;element name="EndTime" type="{http://www.w3.org/2001/XMLSchema}time"/>
 *         &lt;/choice>
 *         &lt;element name="TicketDesignator" type="{http://www.sabre.com/ns/Ticketing/DC}Code.TicketFareDesignator.Details" minOccurs="0"/>
 *         &lt;element name="NotValidBeforeDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="NotValidAfterDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="SettlementAuthorization" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BookingStatus" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="CurrentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PreviousStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrentControllingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.ControllingProvider" minOccurs="0"/>
 *         &lt;element name="ValidatingProviderCouponStatus" type="{http://www.sabre.com/ns/Ticketing/DC}Code.CouponStatus" minOccurs="0"/>
 *         &lt;element name="Reservation" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Reservation" minOccurs="0"/>
 *         &lt;element name="FlownCoupon" type="{http://www.sabre.com/ns/Ticketing/DC}FlownCoupon.Details" minOccurs="0"/>
 *         &lt;element name="Affinity" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Affinity" minOccurs="0"/>
 *         &lt;element name="BagAllowance" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BookingDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="StopOver" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CouponUse" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Indicators" type="{http://www.sabre.com/ns/Ticketing/DC}ServiceCoupon.Indicators" minOccurs="0"/>
 *         &lt;element name="ValidatingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="ConjunctiveDocNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="InvoluntaryReroute" type="{http://www.sabre.com/ns/Ticketing/DC}ServiceCoupon.InvoluntaryReroute" minOccurs="0"/>
 *         &lt;element name="StartTimeText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareBreakAmount" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="PlusUp" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.PlusUp" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="FareBreakDiscount" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Rate" minOccurs="0"/>
 *         &lt;element name="Markup" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Markup" minOccurs="0"/>
 *         &lt;element name="AssociatedDocNumber" type="{http://www.sabre.com/ns/Ticketing/DC}Number.AssociatedDocument" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="BookingClass" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Equipment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PricingRecordFareType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SideTrip" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
 *         &lt;element name="FareComponent" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.FareComponent" minOccurs="0"/>
 *         &lt;element name="Commission" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Commission.FareComponent" minOccurs="0"/>
 *         &lt;element name="NetFare" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.AdditionalFare.FareComponent" minOccurs="0"/>
 *         &lt;element name="AdjustedSellingFare" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.AdditionalFare.FareComponent" minOccurs="0"/>
 *         &lt;element name="BrandedFare" type="{http://www.sabre.com/ns/Ticketing/DC}BrandedFare" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="coupon" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="entitlement" type="{http://www.w3.org/2001/XMLSchema}positiveInteger" />
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="segmentId" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.ServiceCoupon.Ticket", propOrder = {
    "marketingProvider",
    "marketingFlightNumber",
    "operatingProvider",
    "operatingFlightNumber",
    "classOfService",
    "cabin",
    "fareBasis",
    "startLocation",
    "startDateTime",
    "endLocation",
    "endDateTime",
    "endTime",
    "ticketDesignator",
    "notValidBeforeDate",
    "notValidAfterDate",
    "settlementAuthorization",
    "bookingStatus",
    "currentStatus",
    "previousStatus",
    "currentControllingProvider",
    "validatingProviderCouponStatus",
    "reservation",
    "flownCoupon",
    "affinity",
    "bagAllowance",
    "bookingDate",
    "stopOver",
    "couponUse",
    "indicators",
    "validatingProvider",
    "conjunctiveDocNumber",
    "involuntaryReroute",
    "startTimeText",
    "fareBreakAmount",
    "plusUp",
    "fareBreakDiscount",
    "markup",
    "associatedDocNumber",
    "bookingClass",
    "equipment",
    "pricingRecordFareType",
    "fareType",
    "sideTrip",
    "fareComponent",
    "commission",
    "netFare",
    "adjustedSellingFare",
    "brandedFare"
})
public class TicketingDocumentServiceCouponTicket {

    @XmlElement(name = "MarketingProvider")
    protected IdentifierProvider marketingProvider;
    @XmlElement(name = "MarketingFlightNumber")
    protected String marketingFlightNumber;
    @XmlElement(name = "OperatingProvider")
    protected IdentifierProvider operatingProvider;
    @XmlElement(name = "OperatingFlightNumber")
    protected String operatingFlightNumber;
    @XmlElement(name = "ClassOfService")
    protected ClassOfServiceDetails classOfService;
    @XmlElement(name = "Cabin")
    protected TicketingDocumentServiceCouponTicket.Cabin cabin;
    @XmlElement(name = "FareBasis")
    protected String fareBasis;
    @XmlElement(name = "StartLocation")
    protected TicketingDocumentServiceCouponTicket.StartLocation startLocation;
    @XmlElement(name = "StartDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar startDateTime;
    @XmlElement(name = "EndLocation")
    protected TicketingDocumentServiceCouponTicket.EndLocation endLocation;
    @XmlElement(name = "EndDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar endDateTime;
    @XmlElement(name = "EndTime")
    @XmlSchemaType(name = "time")
    protected XMLGregorianCalendar endTime;
    @XmlElement(name = "TicketDesignator")
    protected CodeTicketFareDesignatorDetails ticketDesignator;
    @XmlElement(name = "NotValidBeforeDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar notValidBeforeDate;
    @XmlElement(name = "NotValidAfterDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar notValidAfterDate;
    @XmlElement(name = "SettlementAuthorization")
    protected String settlementAuthorization;
    @XmlElement(name = "BookingStatus")
    protected TicketingDocumentServiceCouponTicket.BookingStatus bookingStatus;
    @XmlElement(name = "CurrentStatus")
    protected String currentStatus;
    @XmlElement(name = "PreviousStatus")
    protected String previousStatus;
    @XmlElement(name = "CurrentControllingProvider")
    protected IdentifierControllingProvider currentControllingProvider;
    @XmlElement(name = "ValidatingProviderCouponStatus")
    protected CodeCouponStatus validatingProviderCouponStatus;
    @XmlElement(name = "Reservation")
    protected IdentifierReservation reservation;
    @XmlElement(name = "FlownCoupon")
    protected FlownCouponDetails flownCoupon;
    @XmlElement(name = "Affinity")
    protected TicketingDocumentAffinity affinity;
    @XmlElement(name = "BagAllowance")
    protected String bagAllowance;
    @XmlElement(name = "BookingDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar bookingDate;
    @XmlElement(name = "StopOver")
    protected String stopOver;
    @XmlElement(name = "CouponUse")
    protected String couponUse;
    @XmlElement(name = "Indicators")
    protected ServiceCouponIndicators indicators;
    @XmlElement(name = "ValidatingProvider")
    protected IdentifierProvider validatingProvider;
    @XmlElement(name = "ConjunctiveDocNumber")
    protected String conjunctiveDocNumber;
    @XmlElement(name = "InvoluntaryReroute")
    protected ServiceCouponInvoluntaryReroute involuntaryReroute;
    @XmlElement(name = "StartTimeText")
    protected String startTimeText;
    @XmlElement(name = "FareBreakAmount")
    protected AmountBasic fareBreakAmount;
    @XmlElement(name = "PlusUp")
    protected List<TicketingDocumentPlusUp> plusUp;
    @XmlElement(name = "FareBreakDiscount")
    protected AmountRate fareBreakDiscount;
    @XmlElement(name = "Markup")
    protected AmountMarkup markup;
    @XmlElement(name = "AssociatedDocNumber")
    protected List<NumberAssociatedDocument> associatedDocNumber;
    @XmlElement(name = "BookingClass")
    protected String bookingClass;
    @XmlElement(name = "Equipment")
    protected String equipment;
    @XmlElement(name = "PricingRecordFareType")
    protected String pricingRecordFareType;
    @XmlElement(name = "FareType")
    protected String fareType;
    @XmlElement(name = "SideTrip")
    protected BigInteger sideTrip;
    @XmlElement(name = "FareComponent")
    protected TicketingDocumentFareComponent fareComponent;
    @XmlElement(name = "Commission")
    protected AmountCommissionFareComponent commission;
    @XmlElement(name = "NetFare")
    protected AmountsAdditionalFareFareComponent netFare;
    @XmlElement(name = "AdjustedSellingFare")
    protected AmountsAdditionalFareFareComponent adjustedSellingFare;
    @XmlElement(name = "BrandedFare")
    protected BrandedFare brandedFare;
    @XmlAttribute(name = "coupon")
    protected BigInteger coupon;
    @XmlAttribute(name = "entitlement")
    @XmlSchemaType(name = "positiveInteger")
    protected BigInteger entitlement;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "segmentId")
    protected BigInteger segmentId;

    /**
     * Gets the value of the marketingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getMarketingProvider() {
        return marketingProvider;
    }

    /**
     * Sets the value of the marketingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setMarketingProvider(IdentifierProvider value) {
        this.marketingProvider = value;
    }

    /**
     * Gets the value of the marketingFlightNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMarketingFlightNumber() {
        return marketingFlightNumber;
    }

    /**
     * Sets the value of the marketingFlightNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMarketingFlightNumber(String value) {
        this.marketingFlightNumber = value;
    }

    /**
     * Gets the value of the operatingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getOperatingProvider() {
        return operatingProvider;
    }

    /**
     * Sets the value of the operatingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setOperatingProvider(IdentifierProvider value) {
        this.operatingProvider = value;
    }

    /**
     * Gets the value of the operatingFlightNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOperatingFlightNumber() {
        return operatingFlightNumber;
    }

    /**
     * Sets the value of the operatingFlightNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOperatingFlightNumber(String value) {
        this.operatingFlightNumber = value;
    }

    /**
     * Gets the value of the classOfService property.
     * 
     * @return
     *     possible object is
     *     {@link ClassOfServiceDetails }
     *     
     */
    public ClassOfServiceDetails getClassOfService() {
        return classOfService;
    }

    /**
     * Sets the value of the classOfService property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClassOfServiceDetails }
     *     
     */
    public void setClassOfService(ClassOfServiceDetails value) {
        this.classOfService = value;
    }

    /**
     * Gets the value of the cabin property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponTicket.Cabin }
     *     
     */
    public TicketingDocumentServiceCouponTicket.Cabin getCabin() {
        return cabin;
    }

    /**
     * Sets the value of the cabin property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponTicket.Cabin }
     *     
     */
    public void setCabin(TicketingDocumentServiceCouponTicket.Cabin value) {
        this.cabin = value;
    }

    /**
     * Gets the value of the fareBasis property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFareBasis() {
        return fareBasis;
    }

    /**
     * Sets the value of the fareBasis property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFareBasis(String value) {
        this.fareBasis = value;
    }

    /**
     * Gets the value of the startLocation property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponTicket.StartLocation }
     *     
     */
    public TicketingDocumentServiceCouponTicket.StartLocation getStartLocation() {
        return startLocation;
    }

    /**
     * Sets the value of the startLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponTicket.StartLocation }
     *     
     */
    public void setStartLocation(TicketingDocumentServiceCouponTicket.StartLocation value) {
        this.startLocation = value;
    }

    /**
     * Gets the value of the startDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getStartDateTime() {
        return startDateTime;
    }

    /**
     * Sets the value of the startDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setStartDateTime(XMLGregorianCalendar value) {
        this.startDateTime = value;
    }

    /**
     * Gets the value of the endLocation property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponTicket.EndLocation }
     *     
     */
    public TicketingDocumentServiceCouponTicket.EndLocation getEndLocation() {
        return endLocation;
    }

    /**
     * Sets the value of the endLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponTicket.EndLocation }
     *     
     */
    public void setEndLocation(TicketingDocumentServiceCouponTicket.EndLocation value) {
        this.endLocation = value;
    }

    /**
     * Gets the value of the endDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getEndDateTime() {
        return endDateTime;
    }

    /**
     * Sets the value of the endDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setEndDateTime(XMLGregorianCalendar value) {
        this.endDateTime = value;
    }

    /**
     * Gets the value of the endTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getEndTime() {
        return endTime;
    }

    /**
     * Sets the value of the endTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setEndTime(XMLGregorianCalendar value) {
        this.endTime = value;
    }

    /**
     * Gets the value of the ticketDesignator property.
     * 
     * @return
     *     possible object is
     *     {@link CodeTicketFareDesignatorDetails }
     *     
     */
    public CodeTicketFareDesignatorDetails getTicketDesignator() {
        return ticketDesignator;
    }

    /**
     * Sets the value of the ticketDesignator property.
     * 
     * @param value
     *     allowed object is
     *     {@link CodeTicketFareDesignatorDetails }
     *     
     */
    public void setTicketDesignator(CodeTicketFareDesignatorDetails value) {
        this.ticketDesignator = value;
    }

    /**
     * Gets the value of the notValidBeforeDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getNotValidBeforeDate() {
        return notValidBeforeDate;
    }

    /**
     * Sets the value of the notValidBeforeDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setNotValidBeforeDate(XMLGregorianCalendar value) {
        this.notValidBeforeDate = value;
    }

    /**
     * Gets the value of the notValidAfterDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getNotValidAfterDate() {
        return notValidAfterDate;
    }

    /**
     * Sets the value of the notValidAfterDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setNotValidAfterDate(XMLGregorianCalendar value) {
        this.notValidAfterDate = value;
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
     * Gets the value of the bookingStatus property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponTicket.BookingStatus }
     *     
     */
    public TicketingDocumentServiceCouponTicket.BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    /**
     * Sets the value of the bookingStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponTicket.BookingStatus }
     *     
     */
    public void setBookingStatus(TicketingDocumentServiceCouponTicket.BookingStatus value) {
        this.bookingStatus = value;
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
     * Gets the value of the currentControllingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierControllingProvider }
     *     
     */
    public IdentifierControllingProvider getCurrentControllingProvider() {
        return currentControllingProvider;
    }

    /**
     * Sets the value of the currentControllingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierControllingProvider }
     *     
     */
    public void setCurrentControllingProvider(IdentifierControllingProvider value) {
        this.currentControllingProvider = value;
    }

    /**
     * Gets the value of the validatingProviderCouponStatus property.
     * 
     * @return
     *     possible object is
     *     {@link CodeCouponStatus }
     *     
     */
    public CodeCouponStatus getValidatingProviderCouponStatus() {
        return validatingProviderCouponStatus;
    }

    /**
     * Sets the value of the validatingProviderCouponStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link CodeCouponStatus }
     *     
     */
    public void setValidatingProviderCouponStatus(CodeCouponStatus value) {
        this.validatingProviderCouponStatus = value;
    }

    /**
     * Gets the value of the reservation property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierReservation }
     *     
     */
    public IdentifierReservation getReservation() {
        return reservation;
    }

    /**
     * Sets the value of the reservation property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierReservation }
     *     
     */
    public void setReservation(IdentifierReservation value) {
        this.reservation = value;
    }

    /**
     * Gets the value of the flownCoupon property.
     * 
     * @return
     *     possible object is
     *     {@link FlownCouponDetails }
     *     
     */
    public FlownCouponDetails getFlownCoupon() {
        return flownCoupon;
    }

    /**
     * Sets the value of the flownCoupon property.
     * 
     * @param value
     *     allowed object is
     *     {@link FlownCouponDetails }
     *     
     */
    public void setFlownCoupon(FlownCouponDetails value) {
        this.flownCoupon = value;
    }

    /**
     * Gets the value of the affinity property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentAffinity }
     *     
     */
    public TicketingDocumentAffinity getAffinity() {
        return affinity;
    }

    /**
     * Sets the value of the affinity property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentAffinity }
     *     
     */
    public void setAffinity(TicketingDocumentAffinity value) {
        this.affinity = value;
    }

    /**
     * Gets the value of the bagAllowance property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBagAllowance() {
        return bagAllowance;
    }

    /**
     * Sets the value of the bagAllowance property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBagAllowance(String value) {
        this.bagAllowance = value;
    }

    /**
     * Gets the value of the bookingDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getBookingDate() {
        return bookingDate;
    }

    /**
     * Sets the value of the bookingDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setBookingDate(XMLGregorianCalendar value) {
        this.bookingDate = value;
    }

    /**
     * Gets the value of the stopOver property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStopOver() {
        return stopOver;
    }

    /**
     * Sets the value of the stopOver property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStopOver(String value) {
        this.stopOver = value;
    }

    /**
     * Gets the value of the couponUse property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCouponUse() {
        return couponUse;
    }

    /**
     * Sets the value of the couponUse property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCouponUse(String value) {
        this.couponUse = value;
    }

    /**
     * Gets the value of the indicators property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceCouponIndicators }
     *     
     */
    public ServiceCouponIndicators getIndicators() {
        return indicators;
    }

    /**
     * Sets the value of the indicators property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceCouponIndicators }
     *     
     */
    public void setIndicators(ServiceCouponIndicators value) {
        this.indicators = value;
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
     * Gets the value of the conjunctiveDocNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConjunctiveDocNumber() {
        return conjunctiveDocNumber;
    }

    /**
     * Sets the value of the conjunctiveDocNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConjunctiveDocNumber(String value) {
        this.conjunctiveDocNumber = value;
    }

    /**
     * Gets the value of the involuntaryReroute property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceCouponInvoluntaryReroute }
     *     
     */
    public ServiceCouponInvoluntaryReroute getInvoluntaryReroute() {
        return involuntaryReroute;
    }

    /**
     * Sets the value of the involuntaryReroute property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceCouponInvoluntaryReroute }
     *     
     */
    public void setInvoluntaryReroute(ServiceCouponInvoluntaryReroute value) {
        this.involuntaryReroute = value;
    }

    /**
     * Gets the value of the startTimeText property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStartTimeText() {
        return startTimeText;
    }

    /**
     * Sets the value of the startTimeText property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStartTimeText(String value) {
        this.startTimeText = value;
    }

    /**
     * Gets the value of the fareBreakAmount property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getFareBreakAmount() {
        return fareBreakAmount;
    }

    /**
     * Sets the value of the fareBreakAmount property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setFareBreakAmount(AmountBasic value) {
        this.fareBreakAmount = value;
    }

    /**
     * Gets the value of the plusUp property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the plusUp property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPlusUp().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentPlusUp }
     * 
     * 
     */
    public List<TicketingDocumentPlusUp> getPlusUp() {
        if (plusUp == null) {
            plusUp = new ArrayList<TicketingDocumentPlusUp>();
        }
        return this.plusUp;
    }

    /**
     * Gets the value of the fareBreakDiscount property.
     * 
     * @return
     *     possible object is
     *     {@link AmountRate }
     *     
     */
    public AmountRate getFareBreakDiscount() {
        return fareBreakDiscount;
    }

    /**
     * Sets the value of the fareBreakDiscount property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountRate }
     *     
     */
    public void setFareBreakDiscount(AmountRate value) {
        this.fareBreakDiscount = value;
    }

    /**
     * Gets the value of the markup property.
     * 
     * @return
     *     possible object is
     *     {@link AmountMarkup }
     *     
     */
    public AmountMarkup getMarkup() {
        return markup;
    }

    /**
     * Sets the value of the markup property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountMarkup }
     *     
     */
    public void setMarkup(AmountMarkup value) {
        this.markup = value;
    }

    /**
     * Gets the value of the associatedDocNumber property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the associatedDocNumber property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAssociatedDocNumber().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NumberAssociatedDocument }
     * 
     * 
     */
    public List<NumberAssociatedDocument> getAssociatedDocNumber() {
        if (associatedDocNumber == null) {
            associatedDocNumber = new ArrayList<NumberAssociatedDocument>();
        }
        return this.associatedDocNumber;
    }

    /**
     * Gets the value of the bookingClass property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBookingClass() {
        return bookingClass;
    }

    /**
     * Sets the value of the bookingClass property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBookingClass(String value) {
        this.bookingClass = value;
    }

    /**
     * Gets the value of the equipment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEquipment() {
        return equipment;
    }

    /**
     * Sets the value of the equipment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEquipment(String value) {
        this.equipment = value;
    }

    /**
     * Gets the value of the pricingRecordFareType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPricingRecordFareType() {
        return pricingRecordFareType;
    }

    /**
     * Sets the value of the pricingRecordFareType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPricingRecordFareType(String value) {
        this.pricingRecordFareType = value;
    }

    /**
     * Gets the value of the fareType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFareType() {
        return fareType;
    }

    /**
     * Sets the value of the fareType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFareType(String value) {
        this.fareType = value;
    }

    /**
     * Gets the value of the sideTrip property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getSideTrip() {
        return sideTrip;
    }

    /**
     * Sets the value of the sideTrip property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setSideTrip(BigInteger value) {
        this.sideTrip = value;
    }

    /**
     * Gets the value of the fareComponent property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentFareComponent }
     *     
     */
    public TicketingDocumentFareComponent getFareComponent() {
        return fareComponent;
    }

    /**
     * Sets the value of the fareComponent property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentFareComponent }
     *     
     */
    public void setFareComponent(TicketingDocumentFareComponent value) {
        this.fareComponent = value;
    }

    /**
     * Gets the value of the commission property.
     * 
     * @return
     *     possible object is
     *     {@link AmountCommissionFareComponent }
     *     
     */
    public AmountCommissionFareComponent getCommission() {
        return commission;
    }

    /**
     * Sets the value of the commission property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountCommissionFareComponent }
     *     
     */
    public void setCommission(AmountCommissionFareComponent value) {
        this.commission = value;
    }

    /**
     * Gets the value of the netFare property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsAdditionalFareFareComponent }
     *     
     */
    public AmountsAdditionalFareFareComponent getNetFare() {
        return netFare;
    }

    /**
     * Sets the value of the netFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsAdditionalFareFareComponent }
     *     
     */
    public void setNetFare(AmountsAdditionalFareFareComponent value) {
        this.netFare = value;
    }

    /**
     * Gets the value of the adjustedSellingFare property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsAdditionalFareFareComponent }
     *     
     */
    public AmountsAdditionalFareFareComponent getAdjustedSellingFare() {
        return adjustedSellingFare;
    }

    /**
     * Sets the value of the adjustedSellingFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsAdditionalFareFareComponent }
     *     
     */
    public void setAdjustedSellingFare(AmountsAdditionalFareFareComponent value) {
        this.adjustedSellingFare = value;
    }

    /**
     * Gets the value of the brandedFare property.
     * 
     * @return
     *     possible object is
     *     {@link BrandedFare }
     *     
     */
    public BrandedFare getBrandedFare() {
        return brandedFare;
    }

    /**
     * Sets the value of the brandedFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link BrandedFare }
     *     
     */
    public void setBrandedFare(BrandedFare value) {
        this.brandedFare = value;
    }

    /**
     * Gets the value of the coupon property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getCoupon() {
        return coupon;
    }

    /**
     * Sets the value of the coupon property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setCoupon(BigInteger value) {
        this.coupon = value;
    }

    /**
     * Gets the value of the entitlement property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getEntitlement() {
        return entitlement;
    }

    /**
     * Sets the value of the entitlement property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setEntitlement(BigInteger value) {
        this.entitlement = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Gets the value of the segmentId property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getSegmentId() {
        return segmentId;
    }

    /**
     * Sets the value of the segmentId property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setSegmentId(BigInteger value) {
        this.segmentId = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class BookingStatus {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class Cabin {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class EndLocation {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class StartLocation {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

    }

}
