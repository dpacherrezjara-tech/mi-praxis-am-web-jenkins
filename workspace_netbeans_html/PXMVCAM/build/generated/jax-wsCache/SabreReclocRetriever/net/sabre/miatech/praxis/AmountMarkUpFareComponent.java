
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amount.MarkUp.FareComponent complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amount.MarkUp.FareComponent">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.sabre.com/ns/Ticketing/DC}Amount.Rate">
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="applicationId" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="ruleSource" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="ruleNumber" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amount.MarkUp.FareComponent")
public class AmountMarkUpFareComponent
    extends AmountRate
{

    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "applicationId")
    protected String applicationId;
    @XmlAttribute(name = "ruleSource")
    protected String ruleSource;
    @XmlAttribute(name = "ruleNumber")
    protected BigInteger ruleNumber;

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
     * Gets the value of the applicationId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApplicationId() {
        return applicationId;
    }

    /**
     * Sets the value of the applicationId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApplicationId(String value) {
        this.applicationId = value;
    }

    /**
     * Gets the value of the ruleSource property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRuleSource() {
        return ruleSource;
    }

    /**
     * Sets the value of the ruleSource property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRuleSource(String value) {
        this.ruleSource = value;
    }

    /**
     * Gets the value of the ruleNumber property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getRuleNumber() {
        return ruleNumber;
    }

    /**
     * Sets the value of the ruleNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setRuleNumber(BigInteger value) {
        this.ruleNumber = value;
    }

}
