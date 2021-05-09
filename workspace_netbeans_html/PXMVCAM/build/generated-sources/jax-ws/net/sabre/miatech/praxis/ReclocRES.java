
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ReclocRES complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ReclocRES">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OpResType" type="{http://www.aeromexico.com}ErrorType" minOccurs="0"/>
 *         &lt;element name="OpSabreResType" type="{http://services.sabre.com/STL/v01}ApplicationResults" minOccurs="0"/>
 *         &lt;element name="RecordLocatorType" type="{http://services.sabre.com/res/tir/v3_6}TravelItineraryReadRSTravelItinerary" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ReclocRES", namespace = "http://www.aeromexico.com", propOrder = {
    "opResType",
    "opSabreResType",
    "recordLocatorType"
})
public class ReclocRES {

    @XmlElement(name = "OpResType")
    protected ErrorType opResType;
    @XmlElement(name = "OpSabreResType")
    protected ApplicationResults opSabreResType;
    @XmlElement(name = "RecordLocatorType")
    protected TravelItineraryReadRSTravelItinerary recordLocatorType;

    /**
     * Gets the value of the opResType property.
     * 
     * @return
     *     possible object is
     *     {@link ErrorType }
     *     
     */
    public ErrorType getOpResType() {
        return opResType;
    }

    /**
     * Sets the value of the opResType property.
     * 
     * @param value
     *     allowed object is
     *     {@link ErrorType }
     *     
     */
    public void setOpResType(ErrorType value) {
        this.opResType = value;
    }

    /**
     * Gets the value of the opSabreResType property.
     * 
     * @return
     *     possible object is
     *     {@link ApplicationResults }
     *     
     */
    public ApplicationResults getOpSabreResType() {
        return opSabreResType;
    }

    /**
     * Sets the value of the opSabreResType property.
     * 
     * @param value
     *     allowed object is
     *     {@link ApplicationResults }
     *     
     */
    public void setOpSabreResType(ApplicationResults value) {
        this.opSabreResType = value;
    }

    /**
     * Gets the value of the recordLocatorType property.
     * 
     * @return
     *     possible object is
     *     {@link TravelItineraryReadRSTravelItinerary }
     *     
     */
    public TravelItineraryReadRSTravelItinerary getRecordLocatorType() {
        return recordLocatorType;
    }

    /**
     * Sets the value of the recordLocatorType property.
     * 
     * @param value
     *     allowed object is
     *     {@link TravelItineraryReadRSTravelItinerary }
     *     
     */
    public void setRecordLocatorType(TravelItineraryReadRSTravelItinerary value) {
        this.recordLocatorType = value;
    }

}
