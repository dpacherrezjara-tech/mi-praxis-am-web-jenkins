
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Indicators.Refund complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Indicators.Refund">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="electronic" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="manualAdd" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="manualUpdate" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Indicators.Refund")
public class TicketingDocumentIndicatorsRefund {

    @XmlAttribute(name = "electronic")
    protected Boolean electronic;
    @XmlAttribute(name = "manualAdd")
    protected Boolean manualAdd;
    @XmlAttribute(name = "manualUpdate")
    protected Boolean manualUpdate;

    /**
     * Gets the value of the electronic property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isElectronic() {
        return electronic;
    }

    /**
     * Sets the value of the electronic property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setElectronic(Boolean value) {
        this.electronic = value;
    }

    /**
     * Gets the value of the manualAdd property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isManualAdd() {
        return manualAdd;
    }

    /**
     * Sets the value of the manualAdd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setManualAdd(Boolean value) {
        this.manualAdd = value;
    }

    /**
     * Gets the value of the manualUpdate property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isManualUpdate() {
        return manualUpdate;
    }

    /**
     * Sets the value of the manualUpdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setManualUpdate(Boolean value) {
        this.manualUpdate = value;
    }

}
