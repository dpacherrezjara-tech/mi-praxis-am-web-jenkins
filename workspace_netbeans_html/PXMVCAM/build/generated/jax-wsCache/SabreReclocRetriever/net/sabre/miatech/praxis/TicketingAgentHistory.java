
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Ticketing.Agent.History complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.Agent.History">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TicketingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="WorkLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HomeLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Lniata" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="duty" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="sine" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.Agent.History", propOrder = {
    "ticketingProvider",
    "workLocation",
    "homeLocation",
    "lniata"
})
public class TicketingAgentHistory {

    @XmlElement(name = "TicketingProvider")
    protected IdentifierProvider ticketingProvider;
    @XmlElement(name = "WorkLocation")
    protected String workLocation;
    @XmlElement(name = "HomeLocation")
    protected String homeLocation;
    @XmlElement(name = "Lniata")
    protected String lniata;
    @XmlAttribute(name = "duty")
    protected String duty;
    @XmlAttribute(name = "sine")
    protected String sine;

    /**
     * Gets the value of the ticketingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getTicketingProvider() {
        return ticketingProvider;
    }

    /**
     * Sets the value of the ticketingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setTicketingProvider(IdentifierProvider value) {
        this.ticketingProvider = value;
    }

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
     * Gets the value of the lniata property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLniata() {
        return lniata;
    }

    /**
     * Sets the value of the lniata property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLniata(String value) {
        this.lniata = value;
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

}
