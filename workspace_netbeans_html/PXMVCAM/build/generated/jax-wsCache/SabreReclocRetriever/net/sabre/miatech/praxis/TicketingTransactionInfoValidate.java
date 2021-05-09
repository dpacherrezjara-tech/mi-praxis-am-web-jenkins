
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for Ticketing.TransactionInfo.Validate complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.TransactionInfo.Validate">
 *   &lt;complexContent>
 *     &lt;extension base="{http://services.sabre.com/STL/v01}TransactionInfo">
 *       &lt;sequence>
 *         &lt;element name="LocalDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="SystemDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="SystemProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="InputEntry" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="actionType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.TransactionInfo.Validate", propOrder = {
    "localDateTime",
    "systemDateTime",
    "systemProvider",
    "inputEntry"
})
public class TicketingTransactionInfoValidate
    extends TransactionInfo
{

    @XmlElement(name = "LocalDateTime", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar localDateTime;
    @XmlElement(name = "SystemDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar systemDateTime;
    @XmlElement(name = "SystemProvider")
    protected IdentifierProvider systemProvider;
    @XmlElement(name = "InputEntry")
    protected String inputEntry;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "actionType")
    protected String actionType;

    /**
     * Gets the value of the localDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getLocalDateTime() {
        return localDateTime;
    }

    /**
     * Sets the value of the localDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setLocalDateTime(XMLGregorianCalendar value) {
        this.localDateTime = value;
    }

    /**
     * Gets the value of the systemDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getSystemDateTime() {
        return systemDateTime;
    }

    /**
     * Sets the value of the systemDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setSystemDateTime(XMLGregorianCalendar value) {
        this.systemDateTime = value;
    }

    /**
     * Gets the value of the systemProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getSystemProvider() {
        return systemProvider;
    }

    /**
     * Sets the value of the systemProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setSystemProvider(IdentifierProvider value) {
        this.systemProvider = value;
    }

    /**
     * Gets the value of the inputEntry property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInputEntry() {
        return inputEntry;
    }

    /**
     * Sets the value of the inputEntry property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInputEntry(String value) {
        this.inputEntry = value;
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
     * Gets the value of the actionType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getActionType() {
        return actionType;
    }

    /**
     * Sets the value of the actionType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setActionType(String value) {
        this.actionType = value;
    }

}
