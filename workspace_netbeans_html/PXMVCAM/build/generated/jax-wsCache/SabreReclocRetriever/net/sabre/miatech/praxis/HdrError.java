
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for HdrError complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="HdrError">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="DiagnosticData" type="{http://www.aeromexico.com}Diagnostics" minOccurs="0"/>
 *         &lt;element name="Results" type="{http://www.aeromexico.com}Results1" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HdrError", namespace = "http://www.aeromexico.com", propOrder = {
    "diagnosticData",
    "results"
})
public class HdrError {

    @XmlElement(name = "DiagnosticData")
    protected Diagnostics diagnosticData;
    @XmlElement(name = "Results")
    protected Results1 results;

    /**
     * Gets the value of the diagnosticData property.
     * 
     * @return
     *     possible object is
     *     {@link Diagnostics }
     *     
     */
    public Diagnostics getDiagnosticData() {
        return diagnosticData;
    }

    /**
     * Sets the value of the diagnosticData property.
     * 
     * @param value
     *     allowed object is
     *     {@link Diagnostics }
     *     
     */
    public void setDiagnosticData(Diagnostics value) {
        this.diagnosticData = value;
    }

    /**
     * Gets the value of the results property.
     * 
     * @return
     *     possible object is
     *     {@link Results1 }
     *     
     */
    public Results1 getResults() {
        return results;
    }

    /**
     * Sets the value of the results property.
     * 
     * @param value
     *     allowed object is
     *     {@link Results1 }
     *     
     */
    public void setResults(Results1 value) {
        this.results = value;
    }

}
