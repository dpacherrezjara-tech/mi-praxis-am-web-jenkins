
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ServiceCoupon.Indicators complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ServiceCoupon.Indicators">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="fareBreak" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="turnaround" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="noBreak" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="connectionOverride" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="zeroFareAmount" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="unchargeableSurface" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="sideTripStart" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="sideTripEnd" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ServiceCoupon.Indicators")
public class ServiceCouponIndicators {

    @XmlAttribute(name = "fareBreak")
    protected Boolean fareBreak;
    @XmlAttribute(name = "turnaround")
    protected Boolean turnaround;
    @XmlAttribute(name = "noBreak")
    protected Boolean noBreak;
    @XmlAttribute(name = "connectionOverride")
    protected Boolean connectionOverride;
    @XmlAttribute(name = "zeroFareAmount")
    protected Boolean zeroFareAmount;
    @XmlAttribute(name = "unchargeableSurface")
    protected Boolean unchargeableSurface;
    @XmlAttribute(name = "sideTripStart")
    protected Boolean sideTripStart;
    @XmlAttribute(name = "sideTripEnd")
    protected Boolean sideTripEnd;

    /**
     * Gets the value of the fareBreak property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isFareBreak() {
        return fareBreak;
    }

    /**
     * Sets the value of the fareBreak property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setFareBreak(Boolean value) {
        this.fareBreak = value;
    }

    /**
     * Gets the value of the turnaround property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isTurnaround() {
        return turnaround;
    }

    /**
     * Sets the value of the turnaround property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setTurnaround(Boolean value) {
        this.turnaround = value;
    }

    /**
     * Gets the value of the noBreak property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isNoBreak() {
        return noBreak;
    }

    /**
     * Sets the value of the noBreak property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setNoBreak(Boolean value) {
        this.noBreak = value;
    }

    /**
     * Gets the value of the connectionOverride property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isConnectionOverride() {
        return connectionOverride;
    }

    /**
     * Sets the value of the connectionOverride property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setConnectionOverride(Boolean value) {
        this.connectionOverride = value;
    }

    /**
     * Gets the value of the zeroFareAmount property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isZeroFareAmount() {
        return zeroFareAmount;
    }

    /**
     * Sets the value of the zeroFareAmount property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setZeroFareAmount(Boolean value) {
        this.zeroFareAmount = value;
    }

    /**
     * Gets the value of the unchargeableSurface property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isUnchargeableSurface() {
        return unchargeableSurface;
    }

    /**
     * Sets the value of the unchargeableSurface property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setUnchargeableSurface(Boolean value) {
        this.unchargeableSurface = value;
    }

    /**
     * Gets the value of the sideTripStart property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isSideTripStart() {
        return sideTripStart;
    }

    /**
     * Sets the value of the sideTripStart property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setSideTripStart(Boolean value) {
        this.sideTripStart = value;
    }

    /**
     * Gets the value of the sideTripEnd property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isSideTripEnd() {
        return sideTripEnd;
    }

    /**
     * Sets the value of the sideTripEnd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setSideTripEnd(Boolean value) {
        this.sideTripEnd = value;
    }

}
