
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for HotelType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="HotelType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Reservation" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="LineNumber" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
 *                   &lt;element name="LineType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="LineStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="POSRequestorID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="SpecialPrefs" type="{http://services.sabre.com/res/or/v1_4}MyArrayOfString8" minOccurs="0"/>
 *                   &lt;element name="RoomType" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="RoomTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="NumberOfUnits" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
 *                             &lt;element name="ShortText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="RateOccupancyPerRoom" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
 *                             &lt;element name="BedTypeDesc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="NumOfBeds" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="RoomRates" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="AmountBeforeTax" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Override" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="RateAccessCodeBooked" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="ClientIdentificationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="RateAccessCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="CategoryTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="GuestCounts" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="GuestCount" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
 *                             &lt;element name="ExtraGuestCount" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="RollAwayCount" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="CribCount" type="{http://www.w3.org/2001/XMLSchema}integer" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="ReserveUnderName" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="ChildGuestCount" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
 *                             &lt;element name="ChildAges" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="TimeSpanStart" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *                   &lt;element name="TimeSpanDuration" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="TimeSpanEnd" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *                   &lt;element name="Guarantee" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="PaymentCardNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="ChainCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="HotelCode" maxOccurs="unbounded" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;simpleContent>
 *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                           &lt;attribute name="Source" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                         &lt;/extension>
 *                       &lt;/simpleContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="HotelCityCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="HotelName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="HotelTotalPricing" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="TotalTax" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="Tax" maxOccurs="unbounded" minOccurs="0">
 *                                         &lt;complexType>
 *                                           &lt;simpleContent>
 *                                             &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                                               &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                             &lt;/extension>
 *                                           &lt;/simpleContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                     &lt;/sequence>
 *                                     &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="TotalSurcharge" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="Surcharge" maxOccurs="unbounded" minOccurs="0">
 *                                         &lt;complexType>
 *                                           &lt;simpleContent>
 *                                             &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                                               &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                             &lt;/extension>
 *                                           &lt;/simpleContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                     &lt;/sequence>
 *                                     &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="ApproximateTotal" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;attribute name="AmountAndCurrency" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="RateChange" maxOccurs="unbounded" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                     &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                     &lt;attribute name="Effective" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                     &lt;attribute name="Surcharge" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                     &lt;attribute name="Tax" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="Disclaimer" maxOccurs="unbounded" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;simpleContent>
 *                                   &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                                     &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/extension>
 *                                 &lt;/simpleContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="HotelFees" type="{http://services.sabre.com/res/or/v1_4}ArrayOfHotelTypeReservationHotelTotalPricingHotelFee" minOccurs="0"/>
 *                             &lt;element name="NightlyRateTotal" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *                             &lt;element name="MaxNightlyRate" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *                             &lt;element name="CommissionableUsdTotal" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *                           &lt;/sequence>
 *                           &lt;attribute name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="HotelReplyText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="HotelUniqueID" type="{http://services.sabre.com/res/or/v1_4}HotelUniqueIDType" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="AdditionalInformation" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="ConfirmationNumber" maxOccurs="unbounded" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;simpleContent>
 *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                           &lt;attribute name="Source" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                           &lt;attribute name="DirectConnect" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
 *                         &lt;/extension>
 *                       &lt;/simpleContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="Address" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="AddressLine" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="CountryCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="City" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="State" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="ZipCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="ContactNumbers" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="PhoneNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                             &lt;element name="FaxNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="CancelPenaltyPolicyCode" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                   &lt;element name="CustLoyaltyMembershipID" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                   &lt;element name="IDNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                   &lt;element name="CorporateIDNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                   &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                   &lt;element name="Commission" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="Indicator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="PerNight" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="WrittenConfirmation" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="SegmentText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="sequence" type="{http://www.w3.org/2001/XMLSchema}short" />
 *       &lt;attribute name="isPast" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="index" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HotelType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "reservation",
    "additionalInformation",
    "segmentText"
})
@XmlSeeAlso({
    HotelProductType.class
})
public class HotelType {

    @XmlElement(name = "Reservation")
    protected HotelType.Reservation reservation;
    @XmlElement(name = "AdditionalInformation")
    protected HotelType.AdditionalInformation additionalInformation;
    @XmlElement(name = "SegmentText")
    protected String segmentText;
    @XmlAttribute(name = "sequence")
    protected Short sequence;
    @XmlAttribute(name = "isPast")
    protected Boolean isPast;
    @XmlAttribute(name = "index")
    protected BigInteger index;
    @XmlAttribute(name = "id")
    protected String id;

    /**
     * Gets the value of the reservation property.
     * 
     * @return
     *     possible object is
     *     {@link HotelType.Reservation }
     *     
     */
    public HotelType.Reservation getReservation() {
        return reservation;
    }

    /**
     * Sets the value of the reservation property.
     * 
     * @param value
     *     allowed object is
     *     {@link HotelType.Reservation }
     *     
     */
    public void setReservation(HotelType.Reservation value) {
        this.reservation = value;
    }

    /**
     * Gets the value of the additionalInformation property.
     * 
     * @return
     *     possible object is
     *     {@link HotelType.AdditionalInformation }
     *     
     */
    public HotelType.AdditionalInformation getAdditionalInformation() {
        return additionalInformation;
    }

    /**
     * Sets the value of the additionalInformation property.
     * 
     * @param value
     *     allowed object is
     *     {@link HotelType.AdditionalInformation }
     *     
     */
    public void setAdditionalInformation(HotelType.AdditionalInformation value) {
        this.additionalInformation = value;
    }

    /**
     * Gets the value of the segmentText property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSegmentText() {
        return segmentText;
    }

    /**
     * Sets the value of the segmentText property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSegmentText(String value) {
        this.segmentText = value;
    }

    /**
     * Gets the value of the sequence property.
     * 
     * @return
     *     possible object is
     *     {@link Short }
     *     
     */
    public Short getSequence() {
        return sequence;
    }

    /**
     * Sets the value of the sequence property.
     * 
     * @param value
     *     allowed object is
     *     {@link Short }
     *     
     */
    public void setSequence(Short value) {
        this.sequence = value;
    }

    /**
     * Gets the value of the isPast property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isIsPast() {
        return isPast;
    }

    /**
     * Sets the value of the isPast property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setIsPast(Boolean value) {
        this.isPast = value;
    }

    /**
     * Gets the value of the index property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getIndex() {
        return index;
    }

    /**
     * Sets the value of the index property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setIndex(BigInteger value) {
        this.index = value;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="ConfirmationNumber" maxOccurs="unbounded" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="Source" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                 &lt;attribute name="DirectConnect" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="Address" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="AddressLine" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="CountryCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="City" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="State" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="ZipCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="ContactNumbers" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="PhoneNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="FaxNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="CancelPenaltyPolicyCode" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *         &lt;element name="CustLoyaltyMembershipID" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *         &lt;element name="IDNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *         &lt;element name="CorporateIDNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *         &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *         &lt;element name="Commission" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="Indicator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="PerNight" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="WrittenConfirmation" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "confirmationNumber",
        "address",
        "contactNumbers",
        "cancelPenaltyPolicyCode",
        "custLoyaltyMembershipID",
        "idNumber",
        "corporateIDNumber",
        "text",
        "commission",
        "writtenConfirmation"
    })
    public static class AdditionalInformation {

        @XmlElement(name = "ConfirmationNumber", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<HotelType.AdditionalInformation.ConfirmationNumber> confirmationNumber;
        @XmlElement(name = "Address", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.AdditionalInformation.Address address;
        @XmlElement(name = "ContactNumbers", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.AdditionalInformation.ContactNumbers contactNumbers;
        @XmlElement(name = "CancelPenaltyPolicyCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<String> cancelPenaltyPolicyCode;
        @XmlElement(name = "CustLoyaltyMembershipID", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<String> custLoyaltyMembershipID;
        @XmlElement(name = "IDNumber", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<String> idNumber;
        @XmlElement(name = "CorporateIDNumber", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<String> corporateIDNumber;
        @XmlElement(name = "Text", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<String> text;
        @XmlElement(name = "Commission", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.AdditionalInformation.Commission commission;
        @XmlElement(name = "WrittenConfirmation", namespace = "http://services.sabre.com/res/or/v1_4")
        protected Boolean writtenConfirmation;

        /**
         * Gets the value of the confirmationNumber property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the confirmationNumber property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getConfirmationNumber().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link HotelType.AdditionalInformation.ConfirmationNumber }
         * 
         * 
         */
        public List<HotelType.AdditionalInformation.ConfirmationNumber> getConfirmationNumber() {
            if (confirmationNumber == null) {
                confirmationNumber = new ArrayList<HotelType.AdditionalInformation.ConfirmationNumber>();
            }
            return this.confirmationNumber;
        }

        /**
         * Gets the value of the address property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.AdditionalInformation.Address }
         *     
         */
        public HotelType.AdditionalInformation.Address getAddress() {
            return address;
        }

        /**
         * Sets the value of the address property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.AdditionalInformation.Address }
         *     
         */
        public void setAddress(HotelType.AdditionalInformation.Address value) {
            this.address = value;
        }

        /**
         * Gets the value of the contactNumbers property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.AdditionalInformation.ContactNumbers }
         *     
         */
        public HotelType.AdditionalInformation.ContactNumbers getContactNumbers() {
            return contactNumbers;
        }

        /**
         * Sets the value of the contactNumbers property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.AdditionalInformation.ContactNumbers }
         *     
         */
        public void setContactNumbers(HotelType.AdditionalInformation.ContactNumbers value) {
            this.contactNumbers = value;
        }

        /**
         * Gets the value of the cancelPenaltyPolicyCode property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the cancelPenaltyPolicyCode property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getCancelPenaltyPolicyCode().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getCancelPenaltyPolicyCode() {
            if (cancelPenaltyPolicyCode == null) {
                cancelPenaltyPolicyCode = new ArrayList<String>();
            }
            return this.cancelPenaltyPolicyCode;
        }

        /**
         * Gets the value of the custLoyaltyMembershipID property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the custLoyaltyMembershipID property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getCustLoyaltyMembershipID().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getCustLoyaltyMembershipID() {
            if (custLoyaltyMembershipID == null) {
                custLoyaltyMembershipID = new ArrayList<String>();
            }
            return this.custLoyaltyMembershipID;
        }

        /**
         * Gets the value of the idNumber property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the idNumber property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getIDNumber().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getIDNumber() {
            if (idNumber == null) {
                idNumber = new ArrayList<String>();
            }
            return this.idNumber;
        }

        /**
         * Gets the value of the corporateIDNumber property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the corporateIDNumber property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getCorporateIDNumber().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getCorporateIDNumber() {
            if (corporateIDNumber == null) {
                corporateIDNumber = new ArrayList<String>();
            }
            return this.corporateIDNumber;
        }

        /**
         * Gets the value of the text property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the text property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getText().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getText() {
            if (text == null) {
                text = new ArrayList<String>();
            }
            return this.text;
        }

        /**
         * Gets the value of the commission property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.AdditionalInformation.Commission }
         *     
         */
        public HotelType.AdditionalInformation.Commission getCommission() {
            return commission;
        }

        /**
         * Sets the value of the commission property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.AdditionalInformation.Commission }
         *     
         */
        public void setCommission(HotelType.AdditionalInformation.Commission value) {
            this.commission = value;
        }

        /**
         * Gets the value of the writtenConfirmation property.
         * 
         * @return
         *     possible object is
         *     {@link Boolean }
         *     
         */
        public Boolean isWrittenConfirmation() {
            return writtenConfirmation;
        }

        /**
         * Sets the value of the writtenConfirmation property.
         * 
         * @param value
         *     allowed object is
         *     {@link Boolean }
         *     
         */
        public void setWrittenConfirmation(Boolean value) {
            this.writtenConfirmation = value;
        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="AddressLine" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="CountryCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="City" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="State" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="ZipCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "addressLine",
            "countryCode",
            "city",
            "state",
            "zipCode"
        })
        public static class Address {

            @XmlElement(name = "AddressLine", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<String> addressLine;
            @XmlElement(name = "CountryCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String countryCode;
            @XmlElement(name = "City", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String city;
            @XmlElement(name = "State", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String state;
            @XmlElement(name = "ZipCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String zipCode;

            /**
             * Gets the value of the addressLine property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the addressLine property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getAddressLine().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link String }
             * 
             * 
             */
            public List<String> getAddressLine() {
                if (addressLine == null) {
                    addressLine = new ArrayList<String>();
                }
                return this.addressLine;
            }

            /**
             * Gets the value of the countryCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCountryCode() {
                return countryCode;
            }

            /**
             * Sets the value of the countryCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCountryCode(String value) {
                this.countryCode = value;
            }

            /**
             * Gets the value of the city property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCity() {
                return city;
            }

            /**
             * Sets the value of the city property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCity(String value) {
                this.city = value;
            }

            /**
             * Gets the value of the state property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getState() {
                return state;
            }

            /**
             * Sets the value of the state property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setState(String value) {
                this.state = value;
            }

            /**
             * Gets the value of the zipCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getZipCode() {
                return zipCode;
            }

            /**
             * Sets the value of the zipCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setZipCode(String value) {
                this.zipCode = value;
            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="Indicator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="PerNight" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "indicator",
            "perNight",
            "text"
        })
        public static class Commission {

            @XmlElement(name = "Indicator", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String indicator;
            @XmlElement(name = "PerNight", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String perNight;
            @XmlElement(name = "Text", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String text;

            /**
             * Gets the value of the indicator property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getIndicator() {
                return indicator;
            }

            /**
             * Sets the value of the indicator property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setIndicator(String value) {
                this.indicator = value;
            }

            /**
             * Gets the value of the perNight property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getPerNight() {
                return perNight;
            }

            /**
             * Sets the value of the perNight property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setPerNight(String value) {
                this.perNight = value;
            }

            /**
             * Gets the value of the text property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getText() {
                return text;
            }

            /**
             * Sets the value of the text property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setText(String value) {
                this.text = value;
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
         *       &lt;attribute name="Source" type="{http://www.w3.org/2001/XMLSchema}string" />
         *       &lt;attribute name="DirectConnect" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
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
        public static class ConfirmationNumber {

            @XmlValue
            protected String value;
            @XmlAttribute(name = "Source")
            protected String source;
            @XmlAttribute(name = "DirectConnect")
            protected Boolean directConnect;

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
             * Gets the value of the source property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getSource() {
                return source;
            }

            /**
             * Sets the value of the source property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setSource(String value) {
                this.source = value;
            }

            /**
             * Gets the value of the directConnect property.
             * 
             * @return
             *     possible object is
             *     {@link Boolean }
             *     
             */
            public boolean isDirectConnect() {
                if (directConnect == null) {
                    return false;
                } else {
                    return directConnect;
                }
            }

            /**
             * Sets the value of the directConnect property.
             * 
             * @param value
             *     allowed object is
             *     {@link Boolean }
             *     
             */
            public void setDirectConnect(Boolean value) {
                this.directConnect = value;
            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="PhoneNumber" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="FaxNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "phoneNumber",
            "faxNumber"
        })
        public static class ContactNumbers {

            @XmlElement(name = "PhoneNumber", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<String> phoneNumber;
            @XmlElement(name = "FaxNumber", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String faxNumber;

            /**
             * Gets the value of the phoneNumber property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the phoneNumber property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getPhoneNumber().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link String }
             * 
             * 
             */
            public List<String> getPhoneNumber() {
                if (phoneNumber == null) {
                    phoneNumber = new ArrayList<String>();
                }
                return this.phoneNumber;
            }

            /**
             * Gets the value of the faxNumber property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getFaxNumber() {
                return faxNumber;
            }

            /**
             * Sets the value of the faxNumber property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setFaxNumber(String value) {
                this.faxNumber = value;
            }

        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="LineNumber" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
     *         &lt;element name="LineType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="LineStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="POSRequestorID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="SpecialPrefs" type="{http://services.sabre.com/res/or/v1_4}MyArrayOfString8" minOccurs="0"/>
     *         &lt;element name="RoomType" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="RoomTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="NumberOfUnits" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
     *                   &lt;element name="ShortText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="RateOccupancyPerRoom" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
     *                   &lt;element name="BedTypeDesc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="NumOfBeds" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="RoomRates" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="AmountBeforeTax" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Override" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="RateAccessCodeBooked" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="ClientIdentificationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="RateAccessCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="CategoryTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="GuestCounts" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="GuestCount" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
     *                   &lt;element name="ExtraGuestCount" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="RollAwayCount" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="CribCount" type="{http://www.w3.org/2001/XMLSchema}integer" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="ReserveUnderName" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                   &lt;element name="ChildGuestCount" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
     *                   &lt;element name="ChildAges" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="TimeSpanStart" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
     *         &lt;element name="TimeSpanDuration" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="TimeSpanEnd" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
     *         &lt;element name="Guarantee" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="PaymentCardNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="ChainCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="HotelCode" maxOccurs="unbounded" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="Source" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="HotelCityCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="HotelName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="HotelTotalPricing" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="TotalTax" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="Tax" maxOccurs="unbounded" minOccurs="0">
     *                               &lt;complexType>
     *                                 &lt;simpleContent>
     *                                   &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                                     &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                   &lt;/extension>
     *                                 &lt;/simpleContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                           &lt;/sequence>
     *                           &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="TotalSurcharge" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="Surcharge" maxOccurs="unbounded" minOccurs="0">
     *                               &lt;complexType>
     *                                 &lt;simpleContent>
     *                                   &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                                     &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                   &lt;/extension>
     *                                 &lt;/simpleContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                           &lt;/sequence>
     *                           &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="ApproximateTotal" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;attribute name="AmountAndCurrency" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="RateChange" maxOccurs="unbounded" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                           &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                           &lt;attribute name="Effective" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                           &lt;attribute name="Surcharge" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                           &lt;attribute name="Tax" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="Disclaimer" maxOccurs="unbounded" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;simpleContent>
     *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                           &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/extension>
     *                       &lt;/simpleContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="HotelFees" type="{http://services.sabre.com/res/or/v1_4}ArrayOfHotelTypeReservationHotelTotalPricingHotelFee" minOccurs="0"/>
     *                   &lt;element name="NightlyRateTotal" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
     *                   &lt;element name="MaxNightlyRate" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
     *                   &lt;element name="CommissionableUsdTotal" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
     *                 &lt;/sequence>
     *                 &lt;attribute name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="HotelReplyText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="HotelUniqueID" type="{http://services.sabre.com/res/or/v1_4}HotelUniqueIDType" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "lineNumber",
        "lineType",
        "lineStatus",
        "posRequestorID",
        "specialPrefs",
        "roomType",
        "roomRates",
        "rateAccessCodeBooked",
        "guestCounts",
        "timeSpanStart",
        "timeSpanDuration",
        "timeSpanEnd",
        "guarantee",
        "chainCode",
        "hotelCode",
        "hotelCityCode",
        "hotelName",
        "hotelTotalPricing",
        "hotelReplyText",
        "hotelUniqueID"
    })
    public static class Reservation {

        @XmlElement(name = "LineNumber", namespace = "http://services.sabre.com/res/or/v1_4")
        protected BigInteger lineNumber;
        @XmlElement(name = "LineType", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String lineType;
        @XmlElement(name = "LineStatus", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String lineStatus;
        @XmlElement(name = "POSRequestorID", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String posRequestorID;
        @XmlElement(name = "SpecialPrefs", namespace = "http://services.sabre.com/res/or/v1_4")
        protected MyArrayOfString8 specialPrefs;
        @XmlElement(name = "RoomType", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.Reservation.RoomType roomType;
        @XmlElement(name = "RoomRates", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.Reservation.RoomRates roomRates;
        @XmlElement(name = "RateAccessCodeBooked", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.Reservation.RateAccessCodeBooked rateAccessCodeBooked;
        @XmlElement(name = "GuestCounts", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.Reservation.GuestCounts guestCounts;
        @XmlElement(name = "TimeSpanStart", namespace = "http://services.sabre.com/res/or/v1_4")
        @XmlSchemaType(name = "dateTime")
        protected XMLGregorianCalendar timeSpanStart;
        @XmlElement(name = "TimeSpanDuration", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String timeSpanDuration;
        @XmlElement(name = "TimeSpanEnd", namespace = "http://services.sabre.com/res/or/v1_4")
        @XmlSchemaType(name = "dateTime")
        protected XMLGregorianCalendar timeSpanEnd;
        @XmlElement(name = "Guarantee", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.Reservation.Guarantee guarantee;
        @XmlElement(name = "ChainCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String chainCode;
        @XmlElement(name = "HotelCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<HotelType.Reservation.HotelCode> hotelCode;
        @XmlElement(name = "HotelCityCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String hotelCityCode;
        @XmlElement(name = "HotelName", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String hotelName;
        @XmlElement(name = "HotelTotalPricing", namespace = "http://services.sabre.com/res/or/v1_4")
        protected HotelType.Reservation.HotelTotalPricing hotelTotalPricing;
        @XmlElement(name = "HotelReplyText", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String hotelReplyText;
        @XmlElement(name = "HotelUniqueID", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<HotelUniqueIDType> hotelUniqueID;

        /**
         * Gets the value of the lineNumber property.
         * 
         * @return
         *     possible object is
         *     {@link BigInteger }
         *     
         */
        public BigInteger getLineNumber() {
            return lineNumber;
        }

        /**
         * Sets the value of the lineNumber property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigInteger }
         *     
         */
        public void setLineNumber(BigInteger value) {
            this.lineNumber = value;
        }

        /**
         * Gets the value of the lineType property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getLineType() {
            return lineType;
        }

        /**
         * Sets the value of the lineType property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setLineType(String value) {
            this.lineType = value;
        }

        /**
         * Gets the value of the lineStatus property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getLineStatus() {
            return lineStatus;
        }

        /**
         * Sets the value of the lineStatus property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setLineStatus(String value) {
            this.lineStatus = value;
        }

        /**
         * Gets the value of the posRequestorID property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getPOSRequestorID() {
            return posRequestorID;
        }

        /**
         * Sets the value of the posRequestorID property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setPOSRequestorID(String value) {
            this.posRequestorID = value;
        }

        /**
         * Gets the value of the specialPrefs property.
         * 
         * @return
         *     possible object is
         *     {@link MyArrayOfString8 }
         *     
         */
        public MyArrayOfString8 getSpecialPrefs() {
            return specialPrefs;
        }

        /**
         * Sets the value of the specialPrefs property.
         * 
         * @param value
         *     allowed object is
         *     {@link MyArrayOfString8 }
         *     
         */
        public void setSpecialPrefs(MyArrayOfString8 value) {
            this.specialPrefs = value;
        }

        /**
         * Gets the value of the roomType property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.Reservation.RoomType }
         *     
         */
        public HotelType.Reservation.RoomType getRoomType() {
            return roomType;
        }

        /**
         * Sets the value of the roomType property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.Reservation.RoomType }
         *     
         */
        public void setRoomType(HotelType.Reservation.RoomType value) {
            this.roomType = value;
        }

        /**
         * Gets the value of the roomRates property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.Reservation.RoomRates }
         *     
         */
        public HotelType.Reservation.RoomRates getRoomRates() {
            return roomRates;
        }

        /**
         * Sets the value of the roomRates property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.Reservation.RoomRates }
         *     
         */
        public void setRoomRates(HotelType.Reservation.RoomRates value) {
            this.roomRates = value;
        }

        /**
         * Gets the value of the rateAccessCodeBooked property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.Reservation.RateAccessCodeBooked }
         *     
         */
        public HotelType.Reservation.RateAccessCodeBooked getRateAccessCodeBooked() {
            return rateAccessCodeBooked;
        }

        /**
         * Sets the value of the rateAccessCodeBooked property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.Reservation.RateAccessCodeBooked }
         *     
         */
        public void setRateAccessCodeBooked(HotelType.Reservation.RateAccessCodeBooked value) {
            this.rateAccessCodeBooked = value;
        }

        /**
         * Gets the value of the guestCounts property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.Reservation.GuestCounts }
         *     
         */
        public HotelType.Reservation.GuestCounts getGuestCounts() {
            return guestCounts;
        }

        /**
         * Sets the value of the guestCounts property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.Reservation.GuestCounts }
         *     
         */
        public void setGuestCounts(HotelType.Reservation.GuestCounts value) {
            this.guestCounts = value;
        }

        /**
         * Gets the value of the timeSpanStart property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getTimeSpanStart() {
            return timeSpanStart;
        }

        /**
         * Sets the value of the timeSpanStart property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setTimeSpanStart(XMLGregorianCalendar value) {
            this.timeSpanStart = value;
        }

        /**
         * Gets the value of the timeSpanDuration property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTimeSpanDuration() {
            return timeSpanDuration;
        }

        /**
         * Sets the value of the timeSpanDuration property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTimeSpanDuration(String value) {
            this.timeSpanDuration = value;
        }

        /**
         * Gets the value of the timeSpanEnd property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getTimeSpanEnd() {
            return timeSpanEnd;
        }

        /**
         * Sets the value of the timeSpanEnd property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setTimeSpanEnd(XMLGregorianCalendar value) {
            this.timeSpanEnd = value;
        }

        /**
         * Gets the value of the guarantee property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.Reservation.Guarantee }
         *     
         */
        public HotelType.Reservation.Guarantee getGuarantee() {
            return guarantee;
        }

        /**
         * Sets the value of the guarantee property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.Reservation.Guarantee }
         *     
         */
        public void setGuarantee(HotelType.Reservation.Guarantee value) {
            this.guarantee = value;
        }

        /**
         * Gets the value of the chainCode property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getChainCode() {
            return chainCode;
        }

        /**
         * Sets the value of the chainCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setChainCode(String value) {
            this.chainCode = value;
        }

        /**
         * Gets the value of the hotelCode property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the hotelCode property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getHotelCode().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link HotelType.Reservation.HotelCode }
         * 
         * 
         */
        public List<HotelType.Reservation.HotelCode> getHotelCode() {
            if (hotelCode == null) {
                hotelCode = new ArrayList<HotelType.Reservation.HotelCode>();
            }
            return this.hotelCode;
        }

        /**
         * Gets the value of the hotelCityCode property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getHotelCityCode() {
            return hotelCityCode;
        }

        /**
         * Sets the value of the hotelCityCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setHotelCityCode(String value) {
            this.hotelCityCode = value;
        }

        /**
         * Gets the value of the hotelName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getHotelName() {
            return hotelName;
        }

        /**
         * Sets the value of the hotelName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setHotelName(String value) {
            this.hotelName = value;
        }

        /**
         * Gets the value of the hotelTotalPricing property.
         * 
         * @return
         *     possible object is
         *     {@link HotelType.Reservation.HotelTotalPricing }
         *     
         */
        public HotelType.Reservation.HotelTotalPricing getHotelTotalPricing() {
            return hotelTotalPricing;
        }

        /**
         * Sets the value of the hotelTotalPricing property.
         * 
         * @param value
         *     allowed object is
         *     {@link HotelType.Reservation.HotelTotalPricing }
         *     
         */
        public void setHotelTotalPricing(HotelType.Reservation.HotelTotalPricing value) {
            this.hotelTotalPricing = value;
        }

        /**
         * Gets the value of the hotelReplyText property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getHotelReplyText() {
            return hotelReplyText;
        }

        /**
         * Sets the value of the hotelReplyText property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setHotelReplyText(String value) {
            this.hotelReplyText = value;
        }

        /**
         * Gets the value of the hotelUniqueID property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the hotelUniqueID property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getHotelUniqueID().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link HotelUniqueIDType }
         * 
         * 
         */
        public List<HotelUniqueIDType> getHotelUniqueID() {
            if (hotelUniqueID == null) {
                hotelUniqueID = new ArrayList<HotelUniqueIDType>();
            }
            return this.hotelUniqueID;
        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="PaymentCardNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "paymentCardNumber",
            "text"
        })
        public static class Guarantee {

            @XmlElement(name = "PaymentCardNumber", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String paymentCardNumber;
            @XmlElement(name = "Text", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String text;

            /**
             * Gets the value of the paymentCardNumber property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getPaymentCardNumber() {
                return paymentCardNumber;
            }

            /**
             * Sets the value of the paymentCardNumber property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setPaymentCardNumber(String value) {
                this.paymentCardNumber = value;
            }

            /**
             * Gets the value of the text property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getText() {
                return text;
            }

            /**
             * Sets the value of the text property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setText(String value) {
                this.text = value;
            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="GuestCount" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
         *         &lt;element name="ExtraGuestCount" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="RollAwayCount" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="CribCount" type="{http://www.w3.org/2001/XMLSchema}integer" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="ReserveUnderName" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *         &lt;element name="ChildGuestCount" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
         *         &lt;element name="ChildAges" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "guestCount",
            "extraGuestCount",
            "rollAwayCount",
            "cribCount",
            "reserveUnderName",
            "name",
            "childGuestCount",
            "childAges"
        })
        public static class GuestCounts {

            @XmlElement(name = "GuestCount", namespace = "http://services.sabre.com/res/or/v1_4")
            protected BigInteger guestCount;
            @XmlElement(name = "ExtraGuestCount", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<String> extraGuestCount;
            @XmlElement(name = "RollAwayCount", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<String> rollAwayCount;
            @XmlElement(name = "CribCount", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<BigInteger> cribCount;
            @XmlElement(name = "ReserveUnderName", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<String> reserveUnderName;
            @XmlElement(name = "Name", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<String> name;
            @XmlElement(name = "ChildGuestCount", namespace = "http://services.sabre.com/res/or/v1_4")
            @XmlSchemaType(name = "unsignedShort")
            protected Integer childGuestCount;
            @XmlElement(name = "ChildAges", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String childAges;

            /**
             * Gets the value of the guestCount property.
             * 
             * @return
             *     possible object is
             *     {@link BigInteger }
             *     
             */
            public BigInteger getGuestCount() {
                return guestCount;
            }

            /**
             * Sets the value of the guestCount property.
             * 
             * @param value
             *     allowed object is
             *     {@link BigInteger }
             *     
             */
            public void setGuestCount(BigInteger value) {
                this.guestCount = value;
            }

            /**
             * Gets the value of the extraGuestCount property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the extraGuestCount property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getExtraGuestCount().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link String }
             * 
             * 
             */
            public List<String> getExtraGuestCount() {
                if (extraGuestCount == null) {
                    extraGuestCount = new ArrayList<String>();
                }
                return this.extraGuestCount;
            }

            /**
             * Gets the value of the rollAwayCount property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the rollAwayCount property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getRollAwayCount().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link String }
             * 
             * 
             */
            public List<String> getRollAwayCount() {
                if (rollAwayCount == null) {
                    rollAwayCount = new ArrayList<String>();
                }
                return this.rollAwayCount;
            }

            /**
             * Gets the value of the cribCount property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the cribCount property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getCribCount().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link BigInteger }
             * 
             * 
             */
            public List<BigInteger> getCribCount() {
                if (cribCount == null) {
                    cribCount = new ArrayList<BigInteger>();
                }
                return this.cribCount;
            }

            /**
             * Gets the value of the reserveUnderName property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the reserveUnderName property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getReserveUnderName().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link String }
             * 
             * 
             */
            public List<String> getReserveUnderName() {
                if (reserveUnderName == null) {
                    reserveUnderName = new ArrayList<String>();
                }
                return this.reserveUnderName;
            }

            /**
             * Gets the value of the name property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the name property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getName().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link String }
             * 
             * 
             */
            public List<String> getName() {
                if (name == null) {
                    name = new ArrayList<String>();
                }
                return this.name;
            }

            /**
             * Gets the value of the childGuestCount property.
             * 
             * @return
             *     possible object is
             *     {@link Integer }
             *     
             */
            public Integer getChildGuestCount() {
                return childGuestCount;
            }

            /**
             * Sets the value of the childGuestCount property.
             * 
             * @param value
             *     allowed object is
             *     {@link Integer }
             *     
             */
            public void setChildGuestCount(Integer value) {
                this.childGuestCount = value;
            }

            /**
             * Gets the value of the childAges property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getChildAges() {
                return childAges;
            }

            /**
             * Sets the value of the childAges property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setChildAges(String value) {
                this.childAges = value;
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
         *       &lt;attribute name="Source" type="{http://www.w3.org/2001/XMLSchema}string" />
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
        public static class HotelCode {

            @XmlValue
            protected String value;
            @XmlAttribute(name = "Source")
            protected String source;

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
             * Gets the value of the source property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getSource() {
                return source;
            }

            /**
             * Sets the value of the source property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setSource(String value) {
                this.source = value;
            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="TotalTax" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="Tax" maxOccurs="unbounded" minOccurs="0">
         *                     &lt;complexType>
         *                       &lt;simpleContent>
         *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *                           &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                         &lt;/extension>
         *                       &lt;/simpleContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                 &lt;/sequence>
         *                 &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="TotalSurcharge" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="Surcharge" maxOccurs="unbounded" minOccurs="0">
         *                     &lt;complexType>
         *                       &lt;simpleContent>
         *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *                           &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                         &lt;/extension>
         *                       &lt;/simpleContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                 &lt;/sequence>
         *                 &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="ApproximateTotal" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;attribute name="AmountAndCurrency" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="RateChange" maxOccurs="unbounded" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                 &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                 &lt;attribute name="Effective" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                 &lt;attribute name="Surcharge" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                 &lt;attribute name="Tax" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="Disclaimer" maxOccurs="unbounded" minOccurs="0">
         *           &lt;complexType>
         *             &lt;simpleContent>
         *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *                 &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/extension>
         *             &lt;/simpleContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="HotelFees" type="{http://services.sabre.com/res/or/v1_4}ArrayOfHotelTypeReservationHotelTotalPricingHotelFee" minOccurs="0"/>
         *         &lt;element name="NightlyRateTotal" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
         *         &lt;element name="MaxNightlyRate" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
         *         &lt;element name="CommissionableUsdTotal" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
         *       &lt;/sequence>
         *       &lt;attribute name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" />
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "totalTax",
            "totalSurcharge",
            "approximateTotal",
            "rateChange",
            "disclaimer",
            "hotelFees",
            "nightlyRateTotal",
            "maxNightlyRate",
            "commissionableUsdTotal"
        })
        public static class HotelTotalPricing {

            @XmlElement(name = "TotalTax", namespace = "http://services.sabre.com/res/or/v1_4")
            protected HotelType.Reservation.HotelTotalPricing.TotalTax totalTax;
            @XmlElement(name = "TotalSurcharge", namespace = "http://services.sabre.com/res/or/v1_4")
            protected HotelType.Reservation.HotelTotalPricing.TotalSurcharge totalSurcharge;
            @XmlElement(name = "ApproximateTotal", namespace = "http://services.sabre.com/res/or/v1_4")
            protected HotelType.Reservation.HotelTotalPricing.ApproximateTotal approximateTotal;
            @XmlElement(name = "RateChange", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<HotelType.Reservation.HotelTotalPricing.RateChange> rateChange;
            @XmlElement(name = "Disclaimer", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<HotelType.Reservation.HotelTotalPricing.Disclaimer> disclaimer;
            @XmlElement(name = "HotelFees", namespace = "http://services.sabre.com/res/or/v1_4")
            protected ArrayOfHotelTypeReservationHotelTotalPricingHotelFee hotelFees;
            @XmlElement(name = "NightlyRateTotal", namespace = "http://services.sabre.com/res/or/v1_4")
            protected Float nightlyRateTotal;
            @XmlElement(name = "MaxNightlyRate", namespace = "http://services.sabre.com/res/or/v1_4")
            protected Float maxNightlyRate;
            @XmlElement(name = "CommissionableUsdTotal", namespace = "http://services.sabre.com/res/or/v1_4")
            protected Float commissionableUsdTotal;
            @XmlAttribute(name = "CurrencyCode")
            protected String currencyCode;

            /**
             * Gets the value of the totalTax property.
             * 
             * @return
             *     possible object is
             *     {@link HotelType.Reservation.HotelTotalPricing.TotalTax }
             *     
             */
            public HotelType.Reservation.HotelTotalPricing.TotalTax getTotalTax() {
                return totalTax;
            }

            /**
             * Sets the value of the totalTax property.
             * 
             * @param value
             *     allowed object is
             *     {@link HotelType.Reservation.HotelTotalPricing.TotalTax }
             *     
             */
            public void setTotalTax(HotelType.Reservation.HotelTotalPricing.TotalTax value) {
                this.totalTax = value;
            }

            /**
             * Gets the value of the totalSurcharge property.
             * 
             * @return
             *     possible object is
             *     {@link HotelType.Reservation.HotelTotalPricing.TotalSurcharge }
             *     
             */
            public HotelType.Reservation.HotelTotalPricing.TotalSurcharge getTotalSurcharge() {
                return totalSurcharge;
            }

            /**
             * Sets the value of the totalSurcharge property.
             * 
             * @param value
             *     allowed object is
             *     {@link HotelType.Reservation.HotelTotalPricing.TotalSurcharge }
             *     
             */
            public void setTotalSurcharge(HotelType.Reservation.HotelTotalPricing.TotalSurcharge value) {
                this.totalSurcharge = value;
            }

            /**
             * Gets the value of the approximateTotal property.
             * 
             * @return
             *     possible object is
             *     {@link HotelType.Reservation.HotelTotalPricing.ApproximateTotal }
             *     
             */
            public HotelType.Reservation.HotelTotalPricing.ApproximateTotal getApproximateTotal() {
                return approximateTotal;
            }

            /**
             * Sets the value of the approximateTotal property.
             * 
             * @param value
             *     allowed object is
             *     {@link HotelType.Reservation.HotelTotalPricing.ApproximateTotal }
             *     
             */
            public void setApproximateTotal(HotelType.Reservation.HotelTotalPricing.ApproximateTotal value) {
                this.approximateTotal = value;
            }

            /**
             * Gets the value of the rateChange property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the rateChange property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getRateChange().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link HotelType.Reservation.HotelTotalPricing.RateChange }
             * 
             * 
             */
            public List<HotelType.Reservation.HotelTotalPricing.RateChange> getRateChange() {
                if (rateChange == null) {
                    rateChange = new ArrayList<HotelType.Reservation.HotelTotalPricing.RateChange>();
                }
                return this.rateChange;
            }

            /**
             * Gets the value of the disclaimer property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the disclaimer property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getDisclaimer().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link HotelType.Reservation.HotelTotalPricing.Disclaimer }
             * 
             * 
             */
            public List<HotelType.Reservation.HotelTotalPricing.Disclaimer> getDisclaimer() {
                if (disclaimer == null) {
                    disclaimer = new ArrayList<HotelType.Reservation.HotelTotalPricing.Disclaimer>();
                }
                return this.disclaimer;
            }

            /**
             * Gets the value of the hotelFees property.
             * 
             * @return
             *     possible object is
             *     {@link ArrayOfHotelTypeReservationHotelTotalPricingHotelFee }
             *     
             */
            public ArrayOfHotelTypeReservationHotelTotalPricingHotelFee getHotelFees() {
                return hotelFees;
            }

            /**
             * Sets the value of the hotelFees property.
             * 
             * @param value
             *     allowed object is
             *     {@link ArrayOfHotelTypeReservationHotelTotalPricingHotelFee }
             *     
             */
            public void setHotelFees(ArrayOfHotelTypeReservationHotelTotalPricingHotelFee value) {
                this.hotelFees = value;
            }

            /**
             * Gets the value of the nightlyRateTotal property.
             * 
             * @return
             *     possible object is
             *     {@link Float }
             *     
             */
            public Float getNightlyRateTotal() {
                return nightlyRateTotal;
            }

            /**
             * Sets the value of the nightlyRateTotal property.
             * 
             * @param value
             *     allowed object is
             *     {@link Float }
             *     
             */
            public void setNightlyRateTotal(Float value) {
                this.nightlyRateTotal = value;
            }

            /**
             * Gets the value of the maxNightlyRate property.
             * 
             * @return
             *     possible object is
             *     {@link Float }
             *     
             */
            public Float getMaxNightlyRate() {
                return maxNightlyRate;
            }

            /**
             * Sets the value of the maxNightlyRate property.
             * 
             * @param value
             *     allowed object is
             *     {@link Float }
             *     
             */
            public void setMaxNightlyRate(Float value) {
                this.maxNightlyRate = value;
            }

            /**
             * Gets the value of the commissionableUsdTotal property.
             * 
             * @return
             *     possible object is
             *     {@link Float }
             *     
             */
            public Float getCommissionableUsdTotal() {
                return commissionableUsdTotal;
            }

            /**
             * Sets the value of the commissionableUsdTotal property.
             * 
             * @param value
             *     allowed object is
             *     {@link Float }
             *     
             */
            public void setCommissionableUsdTotal(Float value) {
                this.commissionableUsdTotal = value;
            }

            /**
             * Gets the value of the currencyCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCurrencyCode() {
                return currencyCode;
            }

            /**
             * Sets the value of the currencyCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCurrencyCode(String value) {
                this.currencyCode = value;
            }


            /**
             * <p>Java class for anonymous complex type.
             * 
             * <p>The following schema fragment specifies the expected content contained within this class.
             * 
             * <pre>
             * &lt;complexType>
             *   &lt;complexContent>
             *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *       &lt;attribute name="AmountAndCurrency" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "")
            public static class ApproximateTotal {

                @XmlAttribute(name = "AmountAndCurrency")
                protected String amountAndCurrency;

                /**
                 * Gets the value of the amountAndCurrency property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAmountAndCurrency() {
                    return amountAndCurrency;
                }

                /**
                 * Sets the value of the amountAndCurrency property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAmountAndCurrency(String value) {
                    this.amountAndCurrency = value;
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
             *       &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
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
            public static class Disclaimer {

                @XmlValue
                protected String value;
                @XmlAttribute(name = "Id")
                protected String id;

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
                 * Gets the value of the id property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getId() {
                    return id;
                }

                /**
                 * Sets the value of the id property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setId(String value) {
                    this.id = value;
                }

            }


            /**
             * <p>Java class for anonymous complex type.
             * 
             * <p>The following schema fragment specifies the expected content contained within this class.
             * 
             * <pre>
             * &lt;complexType>
             *   &lt;complexContent>
             *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *       &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
             *       &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
             *       &lt;attribute name="Effective" type="{http://www.w3.org/2001/XMLSchema}string" />
             *       &lt;attribute name="Surcharge" type="{http://www.w3.org/2001/XMLSchema}string" />
             *       &lt;attribute name="Tax" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "")
            public static class RateChange {

                @XmlAttribute(name = "Id")
                protected String id;
                @XmlAttribute(name = "Amount")
                protected String amount;
                @XmlAttribute(name = "Effective")
                protected String effective;
                @XmlAttribute(name = "Surcharge")
                protected String surcharge;
                @XmlAttribute(name = "Tax")
                protected String tax;

                /**
                 * Gets the value of the id property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getId() {
                    return id;
                }

                /**
                 * Sets the value of the id property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setId(String value) {
                    this.id = value;
                }

                /**
                 * Gets the value of the amount property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAmount() {
                    return amount;
                }

                /**
                 * Sets the value of the amount property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAmount(String value) {
                    this.amount = value;
                }

                /**
                 * Gets the value of the effective property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getEffective() {
                    return effective;
                }

                /**
                 * Sets the value of the effective property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setEffective(String value) {
                    this.effective = value;
                }

                /**
                 * Gets the value of the surcharge property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getSurcharge() {
                    return surcharge;
                }

                /**
                 * Sets the value of the surcharge property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setSurcharge(String value) {
                    this.surcharge = value;
                }

                /**
                 * Gets the value of the tax property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getTax() {
                    return tax;
                }

                /**
                 * Sets the value of the tax property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setTax(String value) {
                    this.tax = value;
                }

            }


            /**
             * <p>Java class for anonymous complex type.
             * 
             * <p>The following schema fragment specifies the expected content contained within this class.
             * 
             * <pre>
             * &lt;complexType>
             *   &lt;complexContent>
             *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *       &lt;sequence>
             *         &lt;element name="Surcharge" maxOccurs="unbounded" minOccurs="0">
             *           &lt;complexType>
             *             &lt;simpleContent>
             *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
             *                 &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
             *               &lt;/extension>
             *             &lt;/simpleContent>
             *           &lt;/complexType>
             *         &lt;/element>
             *       &lt;/sequence>
             *       &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "", propOrder = {
                "surcharge"
            })
            public static class TotalSurcharge {

                @XmlElement(name = "Surcharge", namespace = "http://services.sabre.com/res/or/v1_4")
                protected List<HotelType.Reservation.HotelTotalPricing.TotalSurcharge.Surcharge> surcharge;
                @XmlAttribute(name = "Amount")
                protected String amount;

                /**
                 * Gets the value of the surcharge property.
                 * 
                 * <p>
                 * This accessor method returns a reference to the live list,
                 * not a snapshot. Therefore any modification you make to the
                 * returned list will be present inside the JAXB object.
                 * This is why there is not a <CODE>set</CODE> method for the surcharge property.
                 * 
                 * <p>
                 * For example, to add a new item, do as follows:
                 * <pre>
                 *    getSurcharge().add(newItem);
                 * </pre>
                 * 
                 * 
                 * <p>
                 * Objects of the following type(s) are allowed in the list
                 * {@link HotelType.Reservation.HotelTotalPricing.TotalSurcharge.Surcharge }
                 * 
                 * 
                 */
                public List<HotelType.Reservation.HotelTotalPricing.TotalSurcharge.Surcharge> getSurcharge() {
                    if (surcharge == null) {
                        surcharge = new ArrayList<HotelType.Reservation.HotelTotalPricing.TotalSurcharge.Surcharge>();
                    }
                    return this.surcharge;
                }

                /**
                 * Gets the value of the amount property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAmount() {
                    return amount;
                }

                /**
                 * Sets the value of the amount property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAmount(String value) {
                    this.amount = value;
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
                 *       &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
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
                public static class Surcharge {

                    @XmlValue
                    protected String value;
                    @XmlAttribute(name = "Id")
                    protected String id;

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
                     * Gets the value of the id property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getId() {
                        return id;
                    }

                    /**
                     * Sets the value of the id property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setId(String value) {
                        this.id = value;
                    }

                }

            }


            /**
             * <p>Java class for anonymous complex type.
             * 
             * <p>The following schema fragment specifies the expected content contained within this class.
             * 
             * <pre>
             * &lt;complexType>
             *   &lt;complexContent>
             *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *       &lt;sequence>
             *         &lt;element name="Tax" maxOccurs="unbounded" minOccurs="0">
             *           &lt;complexType>
             *             &lt;simpleContent>
             *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
             *                 &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
             *               &lt;/extension>
             *             &lt;/simpleContent>
             *           &lt;/complexType>
             *         &lt;/element>
             *       &lt;/sequence>
             *       &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "", propOrder = {
                "tax"
            })
            public static class TotalTax {

                @XmlElement(name = "Tax", namespace = "http://services.sabre.com/res/or/v1_4")
                protected List<HotelType.Reservation.HotelTotalPricing.TotalTax.Tax> tax;
                @XmlAttribute(name = "Amount")
                protected String amount;

                /**
                 * Gets the value of the tax property.
                 * 
                 * <p>
                 * This accessor method returns a reference to the live list,
                 * not a snapshot. Therefore any modification you make to the
                 * returned list will be present inside the JAXB object.
                 * This is why there is not a <CODE>set</CODE> method for the tax property.
                 * 
                 * <p>
                 * For example, to add a new item, do as follows:
                 * <pre>
                 *    getTax().add(newItem);
                 * </pre>
                 * 
                 * 
                 * <p>
                 * Objects of the following type(s) are allowed in the list
                 * {@link HotelType.Reservation.HotelTotalPricing.TotalTax.Tax }
                 * 
                 * 
                 */
                public List<HotelType.Reservation.HotelTotalPricing.TotalTax.Tax> getTax() {
                    if (tax == null) {
                        tax = new ArrayList<HotelType.Reservation.HotelTotalPricing.TotalTax.Tax>();
                    }
                    return this.tax;
                }

                /**
                 * Gets the value of the amount property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAmount() {
                    return amount;
                }

                /**
                 * Sets the value of the amount property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAmount(String value) {
                    this.amount = value;
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
                 *       &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
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
                public static class Tax {

                    @XmlValue
                    protected String value;
                    @XmlAttribute(name = "Id")
                    protected String id;

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
                     * Gets the value of the id property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getId() {
                        return id;
                    }

                    /**
                     * Sets the value of the id property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setId(String value) {
                        this.id = value;
                    }

                }

            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="ClientIdentificationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="RateAccessCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="CategoryTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "clientIdentificationCode",
            "rateAccessCode",
            "categoryTypeCode"
        })
        public static class RateAccessCodeBooked {

            @XmlElement(name = "ClientIdentificationCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String clientIdentificationCode;
            @XmlElement(name = "RateAccessCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String rateAccessCode;
            @XmlElement(name = "CategoryTypeCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String categoryTypeCode;

            /**
             * Gets the value of the clientIdentificationCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getClientIdentificationCode() {
                return clientIdentificationCode;
            }

            /**
             * Sets the value of the clientIdentificationCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setClientIdentificationCode(String value) {
                this.clientIdentificationCode = value;
            }

            /**
             * Gets the value of the rateAccessCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getRateAccessCode() {
                return rateAccessCode;
            }

            /**
             * Sets the value of the rateAccessCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setRateAccessCode(String value) {
                this.rateAccessCode = value;
            }

            /**
             * Gets the value of the categoryTypeCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCategoryTypeCode() {
                return categoryTypeCode;
            }

            /**
             * Sets the value of the categoryTypeCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCategoryTypeCode(String value) {
                this.categoryTypeCode = value;
            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="AmountBeforeTax" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Override" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "amountBeforeTax",
            "currencyCode",
            "override"
        })
        public static class RoomRates {

            @XmlElement(name = "AmountBeforeTax", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String amountBeforeTax;
            @XmlElement(name = "CurrencyCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String currencyCode;
            @XmlElement(name = "Override", namespace = "http://services.sabre.com/res/or/v1_4")
            protected Boolean override;

            /**
             * Gets the value of the amountBeforeTax property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getAmountBeforeTax() {
                return amountBeforeTax;
            }

            /**
             * Sets the value of the amountBeforeTax property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setAmountBeforeTax(String value) {
                this.amountBeforeTax = value;
            }

            /**
             * Gets the value of the currencyCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCurrencyCode() {
                return currencyCode;
            }

            /**
             * Sets the value of the currencyCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCurrencyCode(String value) {
                this.currencyCode = value;
            }

            /**
             * Gets the value of the override property.
             * 
             * @return
             *     possible object is
             *     {@link Boolean }
             *     
             */
            public Boolean isOverride() {
                return override;
            }

            /**
             * Sets the value of the override property.
             * 
             * @param value
             *     allowed object is
             *     {@link Boolean }
             *     
             */
            public void setOverride(Boolean value) {
                this.override = value;
            }

        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="RoomTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="NumberOfUnits" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
         *         &lt;element name="ShortText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="RateOccupancyPerRoom" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
         *         &lt;element name="BedTypeDesc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="NumOfBeds" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "roomTypeCode",
            "numberOfUnits",
            "shortText",
            "rateOccupancyPerRoom",
            "bedTypeDesc",
            "numOfBeds"
        })
        public static class RoomType {

            @XmlElement(name = "RoomTypeCode", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String roomTypeCode;
            @XmlElement(name = "NumberOfUnits", namespace = "http://services.sabre.com/res/or/v1_4")
            protected BigInteger numberOfUnits;
            @XmlElement(name = "ShortText", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String shortText;
            @XmlElement(name = "RateOccupancyPerRoom", namespace = "http://services.sabre.com/res/or/v1_4")
            @XmlSchemaType(name = "unsignedShort")
            protected Integer rateOccupancyPerRoom;
            @XmlElement(name = "BedTypeDesc", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String bedTypeDesc;
            @XmlElement(name = "NumOfBeds", namespace = "http://services.sabre.com/res/or/v1_4")
            @XmlSchemaType(name = "unsignedShort")
            protected Integer numOfBeds;

            /**
             * Gets the value of the roomTypeCode property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getRoomTypeCode() {
                return roomTypeCode;
            }

            /**
             * Sets the value of the roomTypeCode property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setRoomTypeCode(String value) {
                this.roomTypeCode = value;
            }

            /**
             * Gets the value of the numberOfUnits property.
             * 
             * @return
             *     possible object is
             *     {@link BigInteger }
             *     
             */
            public BigInteger getNumberOfUnits() {
                return numberOfUnits;
            }

            /**
             * Sets the value of the numberOfUnits property.
             * 
             * @param value
             *     allowed object is
             *     {@link BigInteger }
             *     
             */
            public void setNumberOfUnits(BigInteger value) {
                this.numberOfUnits = value;
            }

            /**
             * Gets the value of the shortText property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getShortText() {
                return shortText;
            }

            /**
             * Sets the value of the shortText property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setShortText(String value) {
                this.shortText = value;
            }

            /**
             * Gets the value of the rateOccupancyPerRoom property.
             * 
             * @return
             *     possible object is
             *     {@link Integer }
             *     
             */
            public Integer getRateOccupancyPerRoom() {
                return rateOccupancyPerRoom;
            }

            /**
             * Sets the value of the rateOccupancyPerRoom property.
             * 
             * @param value
             *     allowed object is
             *     {@link Integer }
             *     
             */
            public void setRateOccupancyPerRoom(Integer value) {
                this.rateOccupancyPerRoom = value;
            }

            /**
             * Gets the value of the bedTypeDesc property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getBedTypeDesc() {
                return bedTypeDesc;
            }

            /**
             * Sets the value of the bedTypeDesc property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setBedTypeDesc(String value) {
                this.bedTypeDesc = value;
            }

            /**
             * Gets the value of the numOfBeds property.
             * 
             * @return
             *     possible object is
             *     {@link Integer }
             *     
             */
            public Integer getNumOfBeds() {
                return numOfBeds;
            }

            /**
             * Sets the value of the numOfBeds property.
             * 
             * @param value
             *     allowed object is
             *     {@link Integer }
             *     
             */
            public void setNumOfBeds(Integer value) {
                this.numOfBeds = value;
            }

        }

    }

}
