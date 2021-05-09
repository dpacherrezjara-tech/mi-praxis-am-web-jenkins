
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.aeromexico.com}ReclocRequest"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "reclocRequest"
})
@XmlRootElement(name = "GetRecloc", namespace = "http://www.aeromexico.com/")
public class GetRecloc {

    @XmlElement(name = "ReclocRequest", namespace = "http://www.aeromexico.com", required = true, nillable = true)
    protected ReclocREQ reclocRequest;

    /**
     * Gets the value of the reclocRequest property.
     * 
     * @return
     *     possible object is
     *     {@link ReclocREQ }
     *     
     */
    public ReclocREQ getReclocRequest() {
        return reclocRequest;
    }

    /**
     * Sets the value of the reclocRequest property.
     * 
     * @param value
     *     allowed object is
     *     {@link ReclocREQ }
     *     
     */
    public void setReclocRequest(ReclocREQ value) {
        this.reclocRequest = value;
    }

}
