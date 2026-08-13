/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers;

/**
 *
 * @author lzambrano
 */


//import com.okta.jwt.AccessTokenVerifier;
//import com.okta.jwt.JwtVerifiers;
//import com.okta.jwt.Jwt;
import java.util.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Controller
@Scope("request")
@RequestMapping("/Auth")
public class AuthController extends BaseController {

    //private final AccessTokenVerifier verifier;
    
    private static final String ISSUER = "https://integrator-7732299.okta.com/oauth2/default";
    private static final String CLIENT_ID = "0oauokoov4OLsYxv3697";
    private static final String CLIENT_SECRET = "PwE9EsN3Sof4pXTHlo004TxmLwlyrJZwvoRg6U36xCf8SUeRjvN6qKSYxl5IIpd4";
    private static final String REDIRECT_URI = "http://localhost:8080/AEROMEXICO/Auth"; // URL de tu app
    private static final String SCOPES = "openid profile email";

    /**
     * Verifica un access_token recibido por POST
     */
    //@RequestMapping("/callback")
    @RequestMapping(method = RequestMethod.GET)
    public String index(@RequestParam("code") String code,
                                 @RequestParam("state") String state,
                                 HttpServletRequest request) 
    {
        try{
            // 🔹 Intercambiar el "code" por un access_token y id_token
        String tokenEndpoint = ISSUER + "/v1/token";

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "authorization_code");
        form.add("code", code);
        form.add("redirect_uri", REDIRECT_URI);
        form.add("client_id", CLIENT_ID);
        form.add("client_secret", CLIENT_SECRET);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(form, headers);

            Map<String, Object> tokenResponse =
                restTemplate.postForObject(tokenEndpoint, entity, Map.class);

            // Guardar datos en sesión
            request.getSession().setAttribute("tokens", tokenResponse);
            System.out.println("Tokens: " + tokenResponse);
            String accessToken = (String) tokenResponse.get("access_token");
            String idToken   = (String) tokenResponse.get("id_token");
            String tokenType = (String) tokenResponse.get("token_type");
            Integer expires  = (Integer) tokenResponse.get("expires_in");
            String scope     = (String) tokenResponse.get("scope");

            // Los JWT tienen 3 partes: header.payload.signature
        String[] parts = accessToken.split("\\.");
        if (parts.length < 2) {
            throw new IllegalArgumentException("No es un JWT válido");
        }

        // Decodificar payload (parte 2)
        String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]));
        System.out.println("Payload JSON: " + payloadJson);

        // Convertir a Map con Jackson
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> claims = mapper.readValue(payloadJson, Map.class);

        // Recuperar valores
        System.out.println("sub (username): " + claims.get("sub"));
        System.out.println("email: " + claims.get("email"));
        
        // Guardar en el request
        request.setAttribute("username", claims.get("sub"));
        
            }
            catch(Exception ex){
            String message = ex.getMessage();
        }
        
        
        return "welcome";
    }    
}

