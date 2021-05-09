
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketRES complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketRES">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OPResult" type="{http://www.aeromexico.com}ErrorType" minOccurs="0"/>
 *         &lt;element name="HeaderRS" type="{http://www.aeromexico.com}HdrError" minOccurs="0"/>
 *         &lt;element name="TicketDataType" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocumentInfo.AllTypes" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketRES", namespace = "http://www.aeromexico.com", propOrder = {
    "opResult",
    "headerRS",
    "ticketDataType"
})
public class TicketRES {

    @XmlElement(name = "OPResult")
    protected ErrorType opResult;
    @XmlElement(name = "HeaderRS")
    protected HdrError headerRS;
    @XmlElement(name = "TicketDataType")
    protected TicketingDocumentInfoAllTypes ticketDataType;

    /**
     * Gets the value of the opResult property.
     * 
     * @return
     *     possible object is
     *     {@link ErrorType }
     *     
     */
    public ErrorType getOPResult() {
        return opResult;
    }

    /**
     * Sets the value of the opResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ErrorType }
     *     
     */
    public void setOPResult(ErrorType value) {
        this.opResult = value;
    }

    /**
     * Gets the value of the headerRS property.
     * 
     * @return
     *     possible object is
     *     {@link HdrError }
     *     
     */
    public HdrError getHeaderRS() {
        return headerRS;
    }

    /**
     * Sets the value of the headerRS property.
     * 
     * @param value
     *     allowed object is
     *     {@link HdrError }
     *     
     */
    public void setHeaderRS(HdrError value) {
        this.headerRS = value;
    }

    /**
     * Gets the value of the ticketDataType property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentInfoAllTypes }
     *     
     */
    public TicketingDocumentInfoAllTypes getTicketDataType() {
        return ticketDataType;
    }

    /**
     * Sets the value of the ticketDataType property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentInfoAllTypes }
     *     
     */
    public void setTicketDataType(TicketingDocumentInfoAllTypes value) {
        this.ticketDataType = value;
    }

}
