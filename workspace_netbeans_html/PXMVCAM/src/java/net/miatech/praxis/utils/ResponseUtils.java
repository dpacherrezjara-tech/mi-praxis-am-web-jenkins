/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.utils;

import com.google.gson.Gson;
import java.nio.charset.StandardCharsets;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Dvicente
 */
public class ResponseUtils<T> {
    public static ResponseEntity<?> ok(Object body){
        Gson gson = new Gson();
        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
        // Forzar charset UTF-8 explícitamente
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        return new ResponseEntity(gson.toJson(body),headers,HttpStatus.OK);
    }
    
    public static ResponseEntity<?> create(Object body){
        Gson gson = new Gson();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity(gson.toJson(body),headers,HttpStatus.CREATED);
    }
    
    public static ResponseEntity<?> create(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity(headers,HttpStatus.CREATED);
    }
}
