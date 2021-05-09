
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Indicators.EMD complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Indicators.EMD">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="commisionable" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="electronic" use="required" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="interlineable" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="refundable" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="historical" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Indicators.EMD")
public class TicketingDocumentIndicatorsEMD {

    @XmlAttribute(name = "commisionable")
    protected Boolean commisionable;
    @XmlAttribute(name = "electronic", required = true)
    protected boolean electronic;
    @XmlAttribute(name = "interlineable")
    protected Boolean interlineable;
    @XmlAttribute(name = "refundable")
    protected String refundable;
    @XmlAttribute(name = "historical")
    protected Boolean historical;

    /**
     * Gets the value of the commisionable property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isCommisionable() {
        return commisionable;
    }

    /**
     * Sets the value of the commisionable property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setCommisionable(Boolean value) {
        this.commisionable = value;
    }

    /**
     * Gets the value of the electronic property.
     * 
     */
    public boolean isElectronic() {
        return electronic;
    }

    /**
     * Sets the value of the electronic property.
     * 
     */
    public void setElectronic(boolean value) {
        this.electronic = value;
    }

    /**
     * Gets the value of the interlineable property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isInterlineable() {
        return interlineable;
    }

    /**
     * Sets the value of the interlineable property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setInterlineable(Boolean value) {
        this.interlineable = value;
    }

    /**
     * Gets the value of the refundable property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRefundable() {
        return refundable;
    }

    /**
     * Sets the value of the refundable property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRefundable(String value) {
        this.refundable = value;
    }

    /**
     * Gets the value of the historical property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isHistorical() {
        return historical;
    }

    /**
     * Sets the value of the historical property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setHistorical(Boolean value) {
        this.historical = value;
    }

}
