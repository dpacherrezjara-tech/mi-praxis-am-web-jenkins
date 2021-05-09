
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Ticketing.Agent.Session complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.Agent.Session">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="AgentOpenType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AgentCloseType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StationOpenType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StationCloseType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.Agent.Session", propOrder = {
    "agentOpenType",
    "agentCloseType",
    "stationOpenType",
    "stationCloseType"
})
public class TicketingAgentSession {

    @XmlElement(name = "AgentOpenType")
    protected String agentOpenType;
    @XmlElement(name = "AgentCloseType")
    protected String agentCloseType;
    @XmlElement(name = "StationOpenType")
    protected String stationOpenType;
    @XmlElement(name = "StationCloseType")
    protected String stationCloseType;

    /**
     * Gets the value of the agentOpenType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAgentOpenType() {
        return agentOpenType;
    }

    /**
     * Sets the value of the agentOpenType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAgentOpenType(String value) {
        this.agentOpenType = value;
    }

    /**
     * Gets the value of the agentCloseType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAgentCloseType() {
        return agentCloseType;
    }

    /**
     * Sets the value of the agentCloseType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAgentCloseType(String value) {
        this.agentCloseType = value;
    }

    /**
     * Gets the value of the stationOpenType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStationOpenType() {
        return stationOpenType;
    }

    /**
     * Sets the value of the stationOpenType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStationOpenType(String value) {
        this.stationOpenType = value;
    }

    /**
     * Gets the value of the stationCloseType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStationCloseType() {
        return stationCloseType;
    }

    /**
     * Sets the value of the stationCloseType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStationCloseType(String value) {
        this.stationCloseType = value;
    }

}
