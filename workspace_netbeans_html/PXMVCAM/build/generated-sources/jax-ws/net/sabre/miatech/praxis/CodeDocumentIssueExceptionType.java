
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Code.DocumentIssueExceptionType.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="Code.DocumentIssueExceptionType">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="D"/>
 *     &lt;enumeration value="L"/>
 *     &lt;enumeration value="X"/>
 *     &lt;enumeration value="G"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "Code.DocumentIssueExceptionType")
@XmlEnum
public enum CodeDocumentIssueExceptionType {

    D,
    L,
    X,
    G;

    public String value() {
        return name();
    }

    public static CodeDocumentIssueExceptionType fromValue(String v) {
        return valueOf(v);
    }

}
