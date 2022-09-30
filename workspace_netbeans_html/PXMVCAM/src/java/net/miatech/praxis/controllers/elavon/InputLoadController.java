package net.miatech.praxis.controllers.elavon;


import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.elavon.X3147temp;
import net.miatech.praxis.logic.elavon.InputLoadLogic;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/InputLoad")
public class InputLoadController extends BaseController{
    
    private InputLoadLogic logic;
    
    @RequestMapping(value = "/uploadExcelRecon",method = RequestMethod.POST,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody String uploadExcelRecon(ModelMap map,@RequestParam("excelfile")MultipartFile excelfile,HttpServletRequest request)throws IOException{
        System.out.println("Ejecuta");
        try {
            logic = new InputLoadLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            XSSFWorkbook wb = new XSSFWorkbook(excelfile.getInputStream());
            Sheet hoja = wb.getSheetAt(0);
            Iterator<Row> it = hoja.iterator();
            Integer rowCount = 0;
            List<X3147temp> temp = new ArrayList<>();
            
            while(it.hasNext()){
                rowCount++;
                Row fila = it.next();
                if (rowCount>1) {
                    if (fila.getCell(0) != null) {
                        X3147temp x = new X3147temp();
                        x.setSYSTEM(fila.getCell(0)==null?"":fila.getCell(0).toString());
                        //si primera fila vacia no se procesa
                        if (x.getSYSTEM().equals("")) {
                            break;
                        }
                        x.setBATCH_DATE(fila.getCell(0)==null?"":fila.getCell(1).toString());
                        x.setEXT_MID(fila.getCell(0)==null?"":fila.getCell(2).toString());
                        x.setGLOBAL_NAME(fila.getCell(0)==null?"":fila.getCell(3).toString());
                        x.setFUNDED_CCY(fila.getCell(0)==null?"":fila.getCell(4).toString());
                        x.setUSD_RATE(fila.getCell(0)==null?0:fila.getCell(5).getNumericCellValue());
                        x.setSALES_TYPE(fila.getCell(0)==null?"":fila.getCell(6).toString());
                        x.setCARD(fila.getCell(0)==null?"":fila.getCell(7).toString());
                        x.setROC_TEXT(fila.getCell(0)==null?"":fila.getCell(8).toString());
                        x.setCOMBTIC_NUM(fila.getCell(0)==null?"":fila.getCell(9).toString());
                        x.setTKT(fila.getCell(0)==null?"":fila.getCell(10).toString());
                        x.setTRX_DEPART_DTE(fila.getCell(0)==null?"":fila.getCell(12).toString());
                        x.setTRN_AMT(fila.getCell(0)==null?0:fila.getCell(13).getNumericCellValue());
                        x.setCONV_TRN_AMT(fila.getCell(0)==null?0:fila.getCell(14).getNumericCellValue());
                        x.setCPT_ID(fila.getCell(0)==null?"":fila.getCell(15).toString());
                        temp.add(x);
                    }
                }
            }
            boolean saveTemp = logic.saveX3147(temp);
            if (saveTemp) {
                map.put("success", saveTemp);
                map.put("response","execution was successfull");
            }
        } catch (Exception e) {
            map.put("success", false);
            map.put("response","error in sql");
        }
        return new Gson().toJson(map);
    }
}
