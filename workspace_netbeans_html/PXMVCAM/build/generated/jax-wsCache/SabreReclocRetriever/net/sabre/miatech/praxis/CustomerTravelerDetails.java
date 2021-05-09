
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Customer.Traveler.Details complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Customer.Traveler.Details">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FirstName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LastName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ExternalNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Age" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/>
 *         &lt;element name="PassengerType" type="{http://www.sabre.com/ns/Ticketing/DC}Code.Passenger" minOccurs="0"/>
 *         &lt;element name="Contact" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Customer.Contact" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="FormOfIdentification" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Customer.FOID" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="PricedPassengerType" type="{http://www.sabre.com/ns/Ticketing/DC}Code.Passenger" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="nameId" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="nameNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Customer.Traveler.Details", propOrder = {
    "name",
    "firstName",
    "lastName",
    "externalNumber",
    "age",
    "passengerType",
    "contact",
    "formOfIdentification",
    "pricedPassengerType"
})
public class CustomerTravelerDetails {

    @XmlElement(name = "Name")
    protected String name;
    @XmlElement(name = "FirstName")
    protected String firstName;
    @XmlElement(name = "LastName")
    protected String lastName;
    @XmlElement(name = "ExternalNumber")
    protected String externalNumber;
    @XmlElement(name = "Age")
    protected BigInteger age;
    @XmlElement(name = "PassengerType")
    protected CodePassenger passengerType;
    @XmlElement(name = "Contact")
    protected List<TicketingDocumentCustomerContact> contact;
    @XmlElement(name = "FormOfIdentification")
    protected List<TicketingDocumentCustomerFOID> formOfIdentification;
    @XmlElement(name = "PricedPassengerType")
    protected CodePassenger pricedPassengerType;
    @XmlAttribute(name = "nameId")
    protected BigInteger nameId;
    @XmlAttribute(name = "nameNumber")
    protected String nameNumber;

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
     * Gets the value of the externalNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExternalNumber() {
        return externalNumber;
    }

    /**
     * Sets the value of the externalNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExternalNumber(String value) {
        this.externalNumber = value;
    }

    /**
     * Gets the value of the age property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getAge() {
        return age;
    }

    /**
     * Sets the value of the age property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setAge(BigInteger value) {
        this.age = value;
    }

    /**
     * Gets the value of the passengerType property.
     * 
     * @return
     *     possible object is
     *     {@link CodePassenger }
     *     
     */
    public CodePassenger getPassengerType() {
        return passengerType;
    }

    /**
     * Sets the value of the passengerType property.
     * 
     * @param value
     *     allowed object is
     *     {@link CodePassenger }
     *     
     */
    public void setPassengerType(CodePassenger value) {
        this.passengerType = value;
    }

    /**
     * Gets the value of the contact property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the contact property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getContact().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentCustomerContact }
     * 
     * 
     */
    public List<TicketingDocumentCustomerContact> getContact() {
        if (contact == null) {
            contact = new ArrayList<TicketingDocumentCustomerContact>();
        }
        return this.contact;
    }

    /**
     * Gets the value of the formOfIdentification property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the formOfIdentification property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFormOfIdentification().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentCustomerFOID }
     * 
     * 
     */
    public List<TicketingDocumentCustomerFOID> getFormOfIdentification() {
        if (formOfIdentification == null) {
            formOfIdentification = new ArrayList<TicketingDocumentCustomerFOID>();
        }
        return this.formOfIdentification;
    }

    /**
     * Gets the value of the pricedPassengerType property.
     * 
     * @return
     *     possible object is
     *     {@link CodePassenger }
     *     
     */
    public CodePassenger getPricedPassengerType() {
        return pricedPassengerType;
    }

    /**
     * Sets the value of the pricedPassengerType property.
     * 
     * @param value
     *     allowed object is
     *     {@link CodePassenger }
     *     
     */
    public void setPricedPassengerType(CodePassenger value) {
        this.pricedPassengerType = value;
    }

    /**
     * Gets the value of the nameId property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getNameId() {
        return nameId;
    }

    /**
     * Sets the value of the nameId property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setNameId(BigInteger value) {
        this.nameId = value;
    }

    /**
     * Gets the value of the nameNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNameNumber() {
        return nameNumber;
    }

    /**
     * Sets the value of the nameNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNameNumber(String value) {
        this.nameNumber = value;
    }

}
