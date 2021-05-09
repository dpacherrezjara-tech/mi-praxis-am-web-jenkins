
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for OptionalService complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="OptionalService">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="FeeProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="Indicators" type="{http://www.sabre.com/ns/Ticketing/DC}Miscellaneous.Indicators" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="group" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="groupDescription" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="reason" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="ssr" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="filingSource" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="journeyType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "OptionalService", propOrder = {
    "feeProvider",
    "indicators"
})
public class OptionalService {

    @XmlElement(name = "FeeProvider")
    protected IdentifierProvider feeProvider;
    @XmlElement(name = "Indicators")
    protected MiscellaneousIndicators indicators;
    @XmlAttribute(name = "group")
    protected String group;
    @XmlAttribute(name = "groupDescription")
    protected String groupDescription;
    @XmlAttribute(name = "reason")
    protected String reason;
    @XmlAttribute(name = "ssr")
    protected String ssr;
    @XmlAttribute(name = "filingSource")
    protected String filingSource;
    @XmlAttribute(name = "journeyType")
    protected String journeyType;

    /**
     * Gets the value of the feeProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getFeeProvider() {
        return feeProvider;
    }

    /**
     * Sets the value of the feeProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setFeeProvider(IdentifierProvider value) {
        this.feeProvider = value;
    }

    /**
     * Gets the value of the indicators property.
     * 
     * @return
     *     possible object is
     *     {@link MiscellaneousIndicators }
     *     
     */
    public MiscellaneousIndicators getIndicators() {
        return indicators;
    }

    /**
     * Sets the value of the indicators property.
     * 
     * @param value
     *     allowed object is
     *     {@link MiscellaneousIndicators }
     *     
     */
    public void setIndicators(MiscellaneousIndicators value) {
        this.indicators = value;
    }

    /**
     * Gets the value of the group property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGroup() {
        return group;
    }

    /**
     * Sets the value of the group property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGroup(String value) {
        this.group = value;
    }

    /**
     * Gets the value of the groupDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGroupDescription() {
        return groupDescription;
    }

    /**
     * Sets the value of the groupDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGroupDescription(String value) {
        this.groupDescription = value;
    }

    /**
     * Gets the value of the reason property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReason() {
        return reason;
    }

    /**
     * Sets the value of the reason property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReason(String value) {
        this.reason = value;
    }

    /**
     * Gets the value of the ssr property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSsr() {
        return ssr;
    }

    /**
     * Sets the value of the ssr property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSsr(String value) {
        this.ssr = value;
    }

    /**
     * Gets the value of the filingSource property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFilingSource() {
        return filingSource;
    }

    /**
     * Sets the value of the filingSource property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFilingSource(String value) {
        this.filingSource = value;
    }

    /**
     * Gets the value of the journeyType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getJourneyType() {
        return journeyType;
    }

    /**
     * Sets the value of the journeyType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setJourneyType(String value) {
        this.journeyType = value;
    }

}
