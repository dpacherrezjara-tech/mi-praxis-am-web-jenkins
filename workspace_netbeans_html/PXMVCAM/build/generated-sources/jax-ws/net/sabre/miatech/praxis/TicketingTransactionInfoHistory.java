
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for Ticketing.TransactionInfo.History complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.TransactionInfo.History">
 *   &lt;complexContent>
 *     &lt;extension base="{http://services.sabre.com/STL/v01}TransactionInfo">
 *       &lt;sequence>
 *         &lt;element name="LocalDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="SystemDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="SystemProvider" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="InputMessage" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.TransactionInfo.History", propOrder = {
    "localDateTime",
    "systemDateTime",
    "systemProvider",
    "inputMessage"
})
public class TicketingTransactionInfoHistory
    extends TransactionInfo
{

    @XmlElement(name = "LocalDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar localDateTime;
    @XmlElement(name = "SystemDateTime", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar systemDateTime;
    @XmlElement(name = "SystemProvider")
    protected String systemProvider;
    @XmlElement(name = "InputMessage")
    protected String inputMessage;

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
     *     {@link String }
     *     
     */
    public String getSystemProvider() {
        return systemProvider;
    }

    /**
     * Sets the value of the systemProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSystemProvider(String value) {
        this.systemProvider = value;
    }

    /**
     * Gets the value of the inputMessage property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInputMessage() {
        return inputMessage;
    }

    /**
     * Sets the value of the inputMessage property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInputMessage(String value) {
        this.inputMessage = value;
    }

}
