
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Results1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Results1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Fail" type="{http://www.aeromexico.com}Failure" minOccurs="0"/>
 *         &lt;element name="Success" type="{http://www.aeromexico.com}Success" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Results1", namespace = "http://www.aeromexico.com", propOrder = {
    "fail",
    "success"
})
public class Results1 {

    @XmlElement(name = "Fail")
    protected Failure fail;
    @XmlElement(name = "Success")
    protected Success success;

    /**
     * Gets the value of the fail property.
     * 
     * @return
     *     possible object is
     *     {@link Failure }
     *     
     */
    public Failure getFail() {
        return fail;
    }

    /**
     * Sets the value of the fail property.
     * 
     * @param value
     *     allowed object is
     *     {@link Failure }
     *     
     */
    public void setFail(Failure value) {
        this.fail = value;
    }

    /**
     * Gets the value of the success property.
     * 
     * @return
     *     possible object is
     *     {@link Success }
     *     
     */
    public Success getSuccess() {
        return success;
    }

    /**
     * Sets the value of the success property.
     * 
     * @param value
     *     allowed object is
     *     {@link Success }
     *     
     */
    public void setSuccess(Success value) {
        this.success = value;
    }

}
