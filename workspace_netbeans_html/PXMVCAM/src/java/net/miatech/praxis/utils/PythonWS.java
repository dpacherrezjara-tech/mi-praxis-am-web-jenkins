package net.miatech.praxis.utils;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import net.miatech.praxis.classes.CurrentSession;
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.ui.ModelMap;

/**
 *
 * @author Dvicente
 */
@Component
@Scope("request")
public class PythonWS {

    //<editor-fold defaultstate="collapsed" desc="vars">
    @Autowired
    private CurrentSession session;
    //</editor-fold>

    private String getRestUrl(String endpoint) {
        String restUrl = this.session.getServerSession().getPropertySession().get("RUTA_REST_SERVICE_AM").toString() + endpoint;
        System.out.println("ACTIVE URL: " + restUrl);
        return restUrl;
    }

    public ResponseEntity<byte[]> downloadFilesFromPython(String endpoint, HashMap body) throws Exception {
        Unirest.setTimeouts(3600000, 3600000);
        Future<HttpResponse<JsonNode>> postFuture = Unirest.post(this.getRestUrl(endpoint))//Sending
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(body))
                .asJsonAsync();

        HttpResponse<JsonNode> postResponse = postFuture.get();
        String downloadUrl = postResponse.getBody().getObject().getString("filename");

        // Descargamos el archivo desde la URL de descarga obtenida
        HttpResponse<InputStream> httpResponse = Unirest.get(downloadUrl).asBinary();

        // Si la respuesta HTTP tiene éxito, leemos los datos de la respuesta
        if (httpResponse.getStatus() == HttpURLConnection.HTTP_OK) {
            InputStream inputStream = httpResponse.getBody();
            byte[] responseBody = IOUtils.toByteArray(inputStream);
            inputStream.close();

            String nombreFile = Paths.get(new URL(downloadUrl).getPath())
                    .getFileName().toString();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", nombreFile);

            // Devolvemos un ResponseEntity con los datos de la respuesta y el código de estado HTTP 200
            return new ResponseEntity<>(responseBody, headers, HttpStatus.OK);
        } else {
            System.out.println("Falló la descarga del archivo. Código de respuesta HTTP: " + httpResponse.getStatus());
            // Devolvemos un ResponseEntity con el código de estado HTTP 400 si la descarga falla
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> downloadFilesVisorPython(String endpoint, HashMap body, String sesion) throws InterruptedException, ExecutionException, JSONException {
        Unirest.setTimeouts(3600000, 3600000);
        Future<HttpResponse<JsonNode>> postFuture = Unirest.post(this.getRestUrl(endpoint))//Sending
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(body))
                .asJsonAsync();

        HttpResponse<JsonNode> postResponse = postFuture.get();
        Object obj = postResponse.getBody().getObject();
        JSONObject jsonObject = (JSONObject) obj;
        List<Map<String, String>> resp = new ArrayList<>();
        //
        JSONArray ListDatos = (JSONArray) jsonObject.get("files");
        for (int i = 0; i < ListDatos.length(); i++) {
            JSONObject datosfor = ListDatos.getJSONObject(i);
            String url1 = datosfor.getString("url");
            String extension = datosfor.getString("extension");
            String[] partes = url1.split("/");
            //
            String imageUrl = url1.replace(" ", "%20");
            String destinationFile = sesion + "\\" + partes[partes.length - 1];
            String NameFile = partes[partes.length - 1]; 
            //
            try {

                URL url = new URL(imageUrl);
                InputStream inputStream = url.openStream();
                OutputStream outputStream = new FileOutputStream(destinationFile);

                byte[] buffer = new byte[2048];
                int length;

                while ((length = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, length);
                }

                inputStream.close();
                outputStream.close();
                // SOBRE ESCRIBIT UN OBJ
                Map<String, String> objres = new HashMap<>();

                objres.put("extension", extension);
                objres.put("url", NameFile);
                resp.add(objres);

            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        //System.out.println("objets: " + obj);
        ModelMap mprespta = new ModelMap();
        mprespta.put("success", true);
        mprespta.put("data", resp);
        return new ResponseEntity(mprespta, HttpStatus.OK);
    }

    public @ResponseBody
    boolean uploadFilesPython(String endpoint, String ciente, String remote_path, File File1, File File2, File File3) throws InterruptedException, ExecutionException, JSONException, UnirestException {
        boolean retorno = false;
        JSONObject myObject = null;
        Unirest.setTimeouts(3600000, 3600000);
        if (File3 != null) {
            HttpResponse<String> response = Unirest.post(this.getRestUrl(endpoint))
                    .field("client", ciente)
                    .field("remote_path", remote_path)
                    .field("file", File1)
                    .field("file", File2)
                    .field("file", File3)
                    .asString();
            myObject = new JSONObject(response.getBody());
        } else if (File2 != null) {
            HttpResponse<String> response = Unirest.post(this.getRestUrl(endpoint))
                    .field("client", ciente)
                    .field("remote_path", remote_path)
                    .field("file", File1)
                    .field("file", File2)
                    .asString();
            myObject = new JSONObject(response.getBody());
        } else {
            HttpResponse<String> response = Unirest.post(this.getRestUrl(endpoint))
                    .field("client", ciente)
                    .field("remote_path", remote_path)
                    .field("file", File1)
                    .asString();
            myObject = new JSONObject(response.getBody());
        }

        //  myObject.get("message");
        retorno = (boolean) myObject.get("success");
        return retorno;
    }

}
