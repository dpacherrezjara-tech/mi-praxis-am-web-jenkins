
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
 *         &lt;element ref="{http://www.aeromexico.com}ReclocResponse"/>
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
    "reclocResponse"
})
@XmlRootElement(name = "GetReclocResponse", namespace = "http://www.aeromexico.com/")
public class GetReclocResponse {

    @XmlElement(name = "ReclocResponse", namespace = "http://www.aeromexico.com", required = true, nillable = true)
    protected ReclocRES reclocResponse;

    /**
     * Gets the value of the reclocResponse property.
     * 
     * @return
     *     possible object is
     *     {@link ReclocRES }
     *     
     */
    public ReclocRES getReclocResponse() {
        return reclocResponse;
    }

    /**
     * Sets the value of the reclocResponse property.
     * 
     * @param value
     *     allowed object is
     *     {@link ReclocRES }
     *     
     */
    public void setReclocResponse(ReclocRES value) {
        this.reclocResponse = value;
    }

}
