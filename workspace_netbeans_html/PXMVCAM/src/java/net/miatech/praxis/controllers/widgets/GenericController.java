package net.miatech.praxis.controllers.widgets;

import java.io.File;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.logic.widgets.GenericLogic;
import net.miatech.praxis.generics.CallStoreFilter;
import net.miatech.praxis.generics.CallStorePaggin;
import net.miatech.praxis.generics.DownloadExcelFilter;
import net.miatech.praxis.generics.RecordsFilter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/Generic")
@Scope("request")
public class GenericController {
    @Autowired
    private GenericLogic logic;
    @Autowired
    private ExportUtils exportUtils;
    
    @RequestMapping(value = "CallStoreGet",method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> CallStoreGet(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStoreGet *****");
        System.out.println("***** Generic - CallStoreGet PRUEBA CAMBIO DE VERSION*****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        return ResponseUtils.ok(logic.callStoreProcedure(params));
    }
    
    @RequestMapping(value = "CallStorePost",method = RequestMethod.POST)
    public ResponseEntity<?> CallStorePost(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStorePost *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        return ResponseUtils.create(logic.callStoreProcedure(params));
    }
    
    @RequestMapping(value = "CallStorePostAsync",method = RequestMethod.POST)
    public ResponseEntity<?> CallStorePostAsync(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStorePostAsync *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        logic.callStoreProcedureAsync(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "CallStorePaggin/{library}/{procedure}")
    public ResponseEntity<?> CallStorePaggin(
            @PathVariable String library,
            @PathVariable String procedure, 
            @RequestParam Map<String,Object> params) throws Exception {
        System.out.println("***** Generic - CallStorePaggin *****");
        CallStorePaggin filter = new CallStorePaggin();
        filter.setLibrary(library);
        filter.setProcedure(procedure);
        filter.setParams(params);
        
        System.out.println("Parameters: " + library + "." + procedure);
        return new ResponseEntity(logic.callStoreProcedurePaggin(filter),HttpStatus.OK) ;
    }
    
    @RequestMapping(value = "loadRecordsOnTable/{library}/{table}",method = RequestMethod.POST)
    public ResponseEntity<?> loadRecordsOnTable(
            @PathVariable String library,
            @PathVariable String table,
            @RequestBody List<RecordsFilter> lst) throws Exception {
        System.out.println("***** Generic - loadRecordsOnTable *****");
        System.out.println("Parameters: " + library + "." + table);
        System.out.println("Total Records on load: " + lst.size() );
        logic.loadRecordsOnTable(library, table, lst);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "downloadExcel", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> downloadExcel(@RequestBody DownloadExcelFilter params, HttpServletRequest request) {
        try {
            System.out.println("***** Generic - downloadExcel *****");
            System.out.println("Parameters: " + params.getLIBRARY() + "." + params.getPROGRAM());

            List<Object[]> data = logic.getDataForExcel(params);
            String fileName = params.getFILE_NAME() != null ? params.getFILE_NAME() : "export";
            ResponseEntity<byte[]> excelResponse = exportUtils.createExcel(data, fileName);

            byte[] fileBytes = excelResponse.getBody();
            String uuid = UUID.randomUUID().toString().replace("-", "");
            String safeFileName = fileName.replaceAll("[^a-zA-Z0-9_\\-]", "_");
            String tempFileName = uuid + "_" + safeFileName + ".zip";

            File tempFile = new File(System.getProperty("java.io.tmpdir"), tempFileName);
            Files.write(tempFile.toPath(), fileBytes);

            String downloadUrl = request.getContextPath() + "/Generic/downloadExcelFile/" + tempFileName;

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("downloadUrl", downloadUrl);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("data", responseData);

            return ResponseUtils.ok(response);
        } catch (Exception e) {
            System.out.println("Error on downloadExcel: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "downloadExcelFile/{filename}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> downloadExcelFile(@PathVariable String filename) {
        try {
            if (!filename.matches("[a-f0-9]{32}_[a-zA-Z0-9_\\-]+\\.zip")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            File tempDir = new File(System.getProperty("java.io.tmpdir"));
            File tempFile = new File(tempDir, filename);

            if (!tempFile.exists() || !tempFile.getCanonicalPath().startsWith(tempDir.getCanonicalPath())) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            byte[] fileBytes = Files.readAllBytes(tempFile.toPath());
            tempFile.delete();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", filename);
            headers.setContentLength(fileBytes.length);

            return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error on downloadExcelFile: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
