
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for Ticketing.Agent complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.Agent">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TicketingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="StationLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StationNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="WorkLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HomeLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Lniata" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IsoCountryCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IataNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CompanyName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HomeStation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HomeBranch" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FirstName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LastName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EmployeeNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ShiftStartDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="StateProvince" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CrsLocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Session" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Agent.Session" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
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
@XmlType(name = "Ticketing.Agent", propOrder = {
    "ticketingProvider",
    "stationLocation",
    "stationNumber",
    "workLocation",
    "homeLocation",
    "lniata",
    "isoCountryCode",
    "iataNumber",
    "companyName",
    "homeStation",
    "homeBranch",
    "name",
    "firstName",
    "lastName",
    "employeeNumber",
    "shiftStartDateTime",
    "stateProvince",
    "crsLocation",
    "session"
})
public class TicketingAgent {

    @XmlElement(name = "TicketingProvider")
    protected IdentifierProvider ticketingProvider;
    @XmlElement(name = "StationLocation")
    protected String stationLocation;
    @XmlElement(name = "StationNumber")
    protected String stationNumber;
    @XmlElement(name = "WorkLocation")
    protected String workLocation;
    @XmlElement(name = "HomeLocation")
    protected String homeLocation;
    @XmlElement(name = "Lniata")
    protected String lniata;
    @XmlElement(name = "IsoCountryCode")
    protected String isoCountryCode;
    @XmlElement(name = "IataNumber")
    protected String iataNumber;
    @XmlElement(name = "CompanyName")
    protected String companyName;
    @XmlElement(name = "HomeStation")
    protected String homeStation;
    @XmlElement(name = "HomeBranch")
    protected String homeBranch;
    @XmlElement(name = "Name")
    protected String name;
    @XmlElement(name = "FirstName")
    protected String firstName;
    @XmlElement(name = "LastName")
    protected String lastName;
    @XmlElement(name = "EmployeeNumber")
    protected String employeeNumber;
    @XmlElement(name = "ShiftStartDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar shiftStartDateTime;
    @XmlElement(name = "StateProvince")
    protected String stateProvince;
    @XmlElement(name = "CrsLocation")
    protected String crsLocation;
    @XmlElement(name = "Session")
    protected TicketingAgentSession session;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "duty")
    protected String duty;
    @XmlAttribute(name = "sine")
    protected String sine;
    @XmlAttribute(name = "ordinal")
    protected String ordinal;

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
     * Gets the value of the stationLocation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStationLocation() {
        return stationLocation;
    }

    /**
     * Sets the value of the stationLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStationLocation(String value) {
        this.stationLocation = value;
    }

    /**
     * Gets the value of the stationNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStationNumber() {
        return stationNumber;
    }

    /**
     * Sets the value of the stationNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStationNumber(String value) {
        this.stationNumber = value;
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
     * Gets the value of the isoCountryCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIsoCountryCode() {
        return isoCountryCode;
    }

    /**
     * Sets the value of the isoCountryCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIsoCountryCode(String value) {
        this.isoCountryCode = value;
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
     * Gets the value of the companyName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCompanyName() {
        return companyName;
    }

    /**
     * Sets the value of the companyName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCompanyName(String value) {
        this.companyName = value;
    }

    /**
     * Gets the value of the homeStation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHomeStation() {
        return homeStation;
    }

    /**
     * Sets the value of the homeStation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHomeStation(String value) {
        this.homeStation = value;
    }

    /**
     * Gets the value of the homeBranch property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHomeBranch() {
        return homeBranch;
    }

    /**
     * Sets the value of the homeBranch property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHomeBranch(String value) {
        this.homeBranch = value;
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

    /**
     * Gets the value of the firstName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the value of the firstName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFirstName(String value) {
        this.firstName = value;
    }

    /**
     * Gets the value of the lastName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the value of the lastName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastName(String value) {
        this.lastName = value;
    }

    /**
     * Gets the value of the employeeNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEmployeeNumber() {
        return employeeNumber;
    }

    /**
     * Sets the value of the employeeNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEmployeeNumber(String value) {
        this.employeeNumber = value;
    }

    /**
     * Gets the value of the shiftStartDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getShiftStartDateTime() {
        return shiftStartDateTime;
    }

    /**
     * Sets the value of the shiftStartDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setShiftStartDateTime(XMLGregorianCalendar value) {
        this.shiftStartDateTime = value;
    }

    /**
     * Gets the value of the stateProvince property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStateProvince() {
        return stateProvince;
    }

    /**
     * Sets the value of the stateProvince property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStateProvince(String value) {
        this.stateProvince = value;
    }

    /**
     * Gets the value of the crsLocation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCrsLocation() {
        return crsLocation;
    }

    /**
     * Sets the value of the crsLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCrsLocation(String value) {
        this.crsLocation = value;
    }

    /**
     * Gets the value of the session property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingAgentSession }
     *     
     */
    public TicketingAgentSession getSession() {
        return session;
    }

    /**
     * Sets the value of the session property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingAgentSession }
     *     
     */
    public void setSession(TicketingAgentSession value) {
        this.session = value;
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
