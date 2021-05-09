
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Identifier.ControllingProvider complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Identifier.ControllingProvider">
 *   &lt;simpleContent>
 *     &lt;extension base="&lt;http://www.sabre.com/ns/Ticketing/DC>Identifier.Provider">
 *       &lt;attribute name="hosted" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="currentStatus" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/extension>
 *   &lt;/simpleContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Identifier.ControllingProvider")
public class IdentifierControllingProvider
    extends IdentifierProvider
{

    @XmlAttribute(name = "hosted")
    protected Boolean hosted;
    @XmlAttribute(name = "currentStatus")
    protected String currentStatus;

    /**
     * Gets the value of the hosted property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isHosted() {
        return hosted;
    }

    /**
     * Sets the value of the hosted property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setHosted(Boolean value) {
        this.hosted = value;
    }

    /**
     * Gets the value of the currentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentStatus() {
        return currentStatus;
    }

    /**
     * Sets the value of the currentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentStatus(String value) {
        this.currentStatus = value;
    }

}
