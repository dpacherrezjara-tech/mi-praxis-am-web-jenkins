/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.SaleAudit.filter;

import java.util.Map;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dpandal
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RobotSabreResponse {
    private Map<String, String> data;
    private String message;
    private int status;
}
