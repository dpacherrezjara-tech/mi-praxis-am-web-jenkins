
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.FareComponent complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.FareComponent">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="AssociatedFareBasis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AssociatedTicketDesignator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="Tariff" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FareRule" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PricingVendor" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Direction" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Mileage" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="sequence" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="flownIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="roundTripIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="oneWayIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="oneWayDirectionalIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="inboundIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="IATAAuthorisedIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="appendNonrefundableIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.FareComponent", propOrder = {
    "associatedFareBasis",
    "associatedTicketDesignator",
    "fareProvider",
    "tariff",
    "fareRule",
    "pricingVendor",
    "direction",
    "mileage"
})
public class TicketingDocumentFareComponent {

    @XmlElement(name = "AssociatedFareBasis")
    protected String associatedFareBasis;
    @XmlElement(name = "AssociatedTicketDesignator")
    protected String associatedTicketDesignator;
    @XmlElement(name = "FareProvider")
    protected IdentifierProvider fareProvider;
    @XmlElement(name = "Tariff")
    protected String tariff;
    @XmlElement(name = "FareRule")
    protected String fareRule;
    @XmlElement(name = "PricingVendor")
    protected String pricingVendor;
    @XmlElement(name = "Direction")
    protected String direction;
    @XmlElement(name = "Mileage")
    protected String mileage;
    @XmlAttribute(name = "sequence")
    protected BigInteger sequence;
    @XmlAttribute(name = "flownIndicator")
    protected Boolean flownIndicator;
    @XmlAttribute(name = "roundTripIndicator")
    protected Boolean roundTripIndicator;
    @XmlAttribute(name = "oneWayIndicator")
    protected Boolean oneWayIndicator;
    @XmlAttribute(name = "oneWayDirectionalIndicator")
    protected Boolean oneWayDirectionalIndicator;
    @XmlAttribute(name = "inboundIndicator")
    protected Boolean inboundIndicator;
    @XmlAttribute(name = "IATAAuthorisedIndicator")
    protected Boolean iataAuthorisedIndicator;
    @XmlAttribute(name = "appendNonrefundableIndicator")
    protected Boolean appendNonrefundableIndicator;

    /**
     * Gets the value of the associatedFareBasis property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAssociatedFareBasis() {
        return associatedFareBasis;
    }

    /**
     * Sets the value of the associatedFareBasis property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAssociatedFareBasis(String value) {
        this.associatedFareBasis = value;
    }

    /**
     * Gets the value of the associatedTicketDesignator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAssociatedTicketDesignator() {
        return associatedTicketDesignator;
    }

    /**
     * Sets the value of the associatedTicketDesignator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAssociatedTicketDesignator(String value) {
        this.associatedTicketDesignator = value;
    }

    /**
     * Gets the value of the fareProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getFareProvider() {
        return fareProvider;
    }

    /**
     * Sets the value of the fareProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setFareProvider(IdentifierProvider value) {
        this.fareProvider = value;
    }

    /**
     * Gets the value of the tariff property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTariff() {
        return tariff;
    }

    /**
     * Sets the value of the tariff property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTariff(String value) {
        this.tariff = value;
    }

    /**
     * Gets the value of the fareRule property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFareRule() {
        return fareRule;
    }

    /**
     * Sets the value of the fareRule property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFareRule(String value) {
        this.fareRule = value;
    }

    /**
     * Gets the value of the pricingVendor property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPricingVendor() {
        return pricingVendor;
    }

    /**
     * Sets the value of the pricingVendor property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPricingVendor(String value) {
        this.pricingVendor = value;
    }

    /**
     * Gets the value of the direction property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDirection() {
        return direction;
    }

    /**
     * Sets the value of the direction property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDirection(String value) {
        this.direction = value;
    }

    /**
     * Gets the value of the mileage property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMileage() {
        return mileage;
    }

    /**
     * Sets the value of the mileage property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMileage(String value) {
        this.mileage = value;
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
     * Gets the value of the flownIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isFlownIndicator() {
        return flownIndicator;
    }

    /**
     * Sets the value of the flownIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setFlownIndicator(Boolean value) {
        this.flownIndicator = value;
    }

    /**
     * Gets the value of the roundTripIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isRoundTripIndicator() {
        return roundTripIndicator;
    }

    /**
     * Sets the value of the roundTripIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setRoundTripIndicator(Boolean value) {
        this.roundTripIndicator = value;
    }

    /**
     * Gets the value of the oneWayIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isOneWayIndicator() {
        return oneWayIndicator;
    }

    /**
     * Sets the value of the oneWayIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setOneWayIndicator(Boolean value) {
        this.oneWayIndicator = value;
    }

    /**
     * Gets the value of the oneWayDirectionalIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isOneWayDirectionalIndicator() {
        return oneWayDirectionalIndicator;
    }

    /**
     * Sets the value of the oneWayDirectionalIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setOneWayDirectionalIndicator(Boolean value) {
        this.oneWayDirectionalIndicator = value;
    }

    /**
     * Gets the value of the inboundIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isInboundIndicator() {
        return inboundIndicator;
    }

    /**
     * Sets the value of the inboundIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setInboundIndicator(Boolean value) {
        this.inboundIndicator = value;
    }

    /**
     * Gets the value of the iataAuthorisedIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isIATAAuthorisedIndicator() {
        return iataAuthorisedIndicator;
    }

    /**
     * Sets the value of the iataAuthorisedIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setIATAAuthorisedIndicator(Boolean value) {
        this.iataAuthorisedIndicator = value;
    }

    /**
     * Gets the value of the appendNonrefundableIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isAppendNonrefundableIndicator() {
        return appendNonrefundableIndicator;
    }

    /**
     * Sets the value of the appendNonrefundableIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setAppendNonrefundableIndicator(Boolean value) {
        this.appendNonrefundableIndicator = value;
    }

}
