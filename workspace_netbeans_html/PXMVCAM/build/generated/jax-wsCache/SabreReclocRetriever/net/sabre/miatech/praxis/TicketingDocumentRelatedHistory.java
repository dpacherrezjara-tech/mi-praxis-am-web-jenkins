
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Related.History complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Related.History">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Miscellaneous" type="{http://www.sabre.com/ns/Ticketing/DC}RelatedDocument.History" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="SupportingDocument" type="{http://www.sabre.com/ns/Ticketing/DC}RelatedDocument.History" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Related.History", propOrder = {
    "miscellaneous",
    "supportingDocument"
})
public class TicketingDocumentRelatedHistory {

    @XmlElement(name = "Miscellaneous")
    protected List<RelatedDocumentHistory> miscellaneous;
    @XmlElement(name = "SupportingDocument")
    protected List<RelatedDocumentHistory> supportingDocument;

    /**
     * Gets the value of the miscellaneous property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the miscellaneous property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMiscellaneous().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RelatedDocumentHistory }
     * 
     * 
     */
    public List<RelatedDocumentHistory> getMiscellaneous() {
        if (miscellaneous == null) {
            miscellaneous = new ArrayList<RelatedDocumentHistory>();
        }
        return this.miscellaneous;
    }

    /**
     * Gets the value of the supportingDocument property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the supportingDocument property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSupportingDocument().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RelatedDocumentHistory }
     * 
     * 
     */
    public List<RelatedDocumentHistory> getSupportingDocument() {
        if (supportingDocument == null) {
            supportingDocument = new ArrayList<RelatedDocumentHistory>();
        }
        return this.supportingDocument;
    }

}
