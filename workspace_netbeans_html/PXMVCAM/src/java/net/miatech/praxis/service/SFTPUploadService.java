/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.service;

import com.google.gson.Gson;
import net.miatech.praxis.dto.UploadSFTPRequest;
import net.miatech.praxis.dto.UploadSFTPResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.concurrent.Future;

/**
 * Servicio para realizar llamadas asíncronas a la API
 * URL: http://127.0.0.1:3600/api/v1/aeromexico/simplifiedusagefile/uploadFileSFTP
 * @author vhidalgo
 */
@Service
public class SFTPUploadService {

    private static final Logger logger = LoggerFactory.getLogger(SFTPUploadService.class);
    private static final String API_RUTA = "/api/v1/aeromexico/simplifiedusagefile/uploadFileSFTP";
    private final RestTemplate restTemplate;
    private final Gson gson;
    
    public SFTPUploadService() {
        
        this.restTemplate = new RestTemplate();
        this.gson = new Gson();
    }

    /**
     * Realiza una llamada asíncrona a la API de carga SFTP
     * 
     * @param request Objeto con los parámetros de la solicitud
     * @param API_URL
     * @return Future con la respuesta de la API
     */
    @Async("taskExecutor1")
    public Future<UploadSFTPResponse> uploadFileAsync(UploadSFTPRequest request, String API_URL ) {
        logger.info("Iniciando llamada asincrona a API SFTP con parametros: {}", request);
        
        UploadSFTPResponse response = new UploadSFTPResponse();
        
        try {
            // Configurar headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Convertir request a JSON
            String jsonBody = gson.toJson(request);
            logger.debug("Request JSON: {}", jsonBody);
            
            // Crear entidad HTTP
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
            
            // Realizar llamada POST 
                ResponseEntity<String> apiResponse = restTemplate.exchange(
                API_URL + API_RUTA,
                HttpMethod.POST,
                entity,
                String.class
            );
            
            // Procesar respuesta exitosa
            logger.info("Respuesta recibida con código: {}", apiResponse.getStatusCode());
            response.setSuccess(true);
            response.setMessage("Archivo cargado exitosamente");
            response.setData(apiResponse.getBody());
            
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // Errores HTTP (4xx, 5xx)
            // logger.error("Error HTTP al llamar API SFTP: {} - {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            response.setSuccess(false);
            response.setError("Error HTTP: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            response.setMessage("Error al procesar la solicitud");
            
        } catch (Exception e) {
            // Otros errores
            logger.error("Error inesperado al llamar API SFTP", e);
            response.setSuccess(false);
            response.setError(e.getMessage());
            response.setMessage("Error inesperado al conectar con la API");
        }
        
        return new AsyncResult<>(response);
    }

    /**
     * Realiza una llamada síncrona a la API de carga SFTP (sin @Async)
     * Útil cuando se necesita respuesta inmediata
     * 
     * @param request Objeto con los parámetros de la solicitud
     * @param API_URL
     * @return Respuesta de la API
     */
    public UploadSFTPResponse uploadFileSync(UploadSFTPRequest request, String API_URL) {
        logger.info("Iniciando llamada síncrona a API SFTP con parámetros: {}", request);
        
        UploadSFTPResponse response = new UploadSFTPResponse();
        
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            String jsonBody = gson.toJson(request);
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
            
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                API_URL + API_RUTA,
                HttpMethod.POST,
                entity,
                String.class
            );
            
            response.setSuccess(true);
            response.setMessage("Archivo cargado exitosamente");
            response.setData(apiResponse.getBody());
            
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            //logger.error("Error HTTP al llamar API SFTP: {} - {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            response.setSuccess(false);
            response.setError("Error HTTP: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            response.setMessage("Error al procesar la solicitud");
            
        } catch (Exception e) {
            logger.error("Error inesperado al llamar API SFTP", e);
            response.setSuccess(false);
            response.setError(e.getMessage());
            response.setMessage("Error inesperado al conectar con la API");
        }
        
        return response;
    }
}
