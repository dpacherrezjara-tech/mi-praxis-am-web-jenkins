
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amount.Details.SourceLREC complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amount.Details.SourceLREC">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details">
 *       &lt;attribute name="vcrLrec" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amount.Details.SourceLREC")
public class AmountDetailsSourceLREC
    extends AmountDetails
{

    @XmlAttribute(name = "vcrLrec")
    protected String vcrLrec;

    /**
     * Gets the value of the vcrLrec property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVcrLrec() {
        return vcrLrec;
    }

    /**
     * Sets the value of the vcrLrec property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVcrLrec(String value) {
        this.vcrLrec = value;
    }

}
