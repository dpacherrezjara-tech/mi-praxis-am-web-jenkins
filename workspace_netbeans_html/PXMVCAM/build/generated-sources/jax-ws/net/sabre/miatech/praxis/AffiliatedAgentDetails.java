
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AffiliatedAgent.Details complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AffiliatedAgent.Details">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="WorkLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IataNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HomeLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PseudoCityCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="duty" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="sine" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="ordinal" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AffiliatedAgent.Details", propOrder = {
    "workLocation",
    "iataNumber",
    "homeLocation",
    "pseudoCityCode"
})
public class AffiliatedAgentDetails {

    @XmlElement(name = "WorkLocation")
    protected String workLocation;
    @XmlElement(name = "IataNumber")
    protected String iataNumber;
    @XmlElement(name = "HomeLocation")
    protected String homeLocation;
    @XmlElement(name = "PseudoCityCode")
    protected String pseudoCityCode;
    @XmlAttribute(name = "duty")
    protected String duty;
    @XmlAttribute(name = "sine")
    protected String sine;
    @XmlAttribute(name = "ordinal")
    protected String ordinal;

    /**
     * Gets the value of the workLocation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWorkLocation() {
        return workLocation;
    }

    /**
     * Sets the value of the workLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWorkLocation(String value) {
        this.workLocation = value;
    }

    /**
     * Gets the value of the iataNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIataNumber() {
        return iataNumber;
    }

    /**
     * Sets the value of the iataNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIataNumber(String value) {
        this.iataNumber = value;
    }

    /**
     * Gets the value of the homeLocation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHomeLocation() {
        return homeLocation;
    }

    /**
     * Sets the value of the homeLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHomeLocation(String value) {
        this.homeLocation = value;
    }

    /**
     * Gets the value of the pseudoCityCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPseudoCityCode() {
        return pseudoCityCode;
    }

    /**
     * Sets the value of the pseudoCityCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPseudoCityCode(String value) {
        this.pseudoCityCode = value;
    }

    /**
     * Gets the value of the duty property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDuty() {
        return duty;
    }

    /**
     * Sets the value of the duty property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDuty(String value) {
        this.duty = value;
    }

    /**
     * Gets the value of the sine property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSine() {
        return sine;
    }

    /**
     * Sets the value of the sine property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSine(String value) {
        this.sine = value;
    }

    /**
     * Gets the value of the ordinal property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdinal() {
        return ordinal;
    }

    /**
     * Sets the value of the ordinal property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdinal(String value) {
        this.ordinal = value;
    }

}
