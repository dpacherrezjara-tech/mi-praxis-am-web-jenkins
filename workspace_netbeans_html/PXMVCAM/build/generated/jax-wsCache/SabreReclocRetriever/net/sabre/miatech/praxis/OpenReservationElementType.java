
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for OpenReservationElementType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="OpenReservationElementType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="AgencyFees" type="{http://services.sabre.com/res/or/v1_4}AgencyFeesType" minOccurs="0"/>
 *           &lt;element name="FormOfPayment" type="{http://services.sabre.com/res/or/v1_4}AbstractFOPElementType" minOccurs="0"/>
 *           &lt;element name="LangDetails" type="{http://services.sabre.com/res/or/v1_4}LangDetailsType" minOccurs="0"/>
 *           &lt;element name="SocialMediaContact" type="{http://services.sabre.com/res/or/v1_4}SocialMediaContactType" minOccurs="0"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *       &lt;attribute name="displayIndex" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "OpenReservationElementType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "agencyFees",
    "formOfPayment",
    "langDetails",
    "socialMediaContact"
})
public class OpenReservationElementType {

    @XmlElement(name = "AgencyFees")
    protected AgencyFeesType agencyFees;
    @XmlElement(name = "FormOfPayment")
    protected AbstractFOPElementType formOfPayment;
    @XmlElement(name = "LangDetails")
    protected LangDetailsType langDetails;
    @XmlElement(name = "SocialMediaContact")
    protected SocialMediaContactType socialMediaContact;
    @XmlAttribute(name = "displayIndex")
    protected Integer displayIndex;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "id")
    protected String id;

    /**
     * Gets the value of the agencyFees property.
     * 
     * @return
     *     possible object is
     *     {@link AgencyFeesType }
     *     
     */
    public AgencyFeesType getAgencyFees() {
        return agencyFees;
    }

    /**
     * Sets the value of the agencyFees property.
     * 
     * @param value
     *     allowed object is
     *     {@link AgencyFeesType }
     *     
     */
    public void setAgencyFees(AgencyFeesType value) {
        this.agencyFees = value;
    }

    /**
     * Gets the value of the formOfPayment property.
     * 
     * @return
     *     possible object is
     *     {@link AbstractFOPElementType }
     *     
     */
    public AbstractFOPElementType getFormOfPayment() {
        return formOfPayment;
    }

    /**
     * Sets the value of the formOfPayment property.
     * 
     * @param value
     *     allowed object is
     *     {@link AbstractFOPElementType }
     *     
     */
    public void setFormOfPayment(AbstractFOPElementType value) {
        this.formOfPayment = value;
    }

    /**
     * Gets the value of the langDetails property.
     * 
     * @return
     *     possible object is
     *     {@link LangDetailsType }
     *     
     */
    public LangDetailsType getLangDetails() {
        return langDetails;
    }

    /**
     * Sets the value of the langDetails property.
     * 
     * @param value
     *     allowed object is
     *     {@link LangDetailsType }
     *     
     */
    public void setLangDetails(LangDetailsType value) {
        this.langDetails = value;
    }

    /**
     * Gets the value of the socialMediaContact property.
     * 
     * @return
     *     possible object is
     *     {@link SocialMediaContactType }
     *     
     */
    public SocialMediaContactType getSocialMediaContact() {
        return socialMediaContact;
    }

    /**
     * Sets the value of the socialMediaContact property.
     * 
     * @param value
     *     allowed object is
     *     {@link SocialMediaContactType }
     *     
     */
    public void setSocialMediaContact(SocialMediaContactType value) {
        this.socialMediaContact = value;
    }

    /**
     * Gets the value of the displayIndex property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getDisplayIndex() {
        return displayIndex;
    }

    /**
     * Sets the value of the displayIndex property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setDisplayIndex(Integer value) {
        this.displayIndex = value;
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
