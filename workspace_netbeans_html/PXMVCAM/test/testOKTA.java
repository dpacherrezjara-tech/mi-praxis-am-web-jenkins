
import java.io.PrintWriter;
import java.io.StringWriter;
import net.miatech.beans.SaleAudit.A3647Filter;
import org.apache.log4j.Logger;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author lzambrano
 */
public class testOKTA {
    private static final Logger logError = Logger.getLogger("errorLog");
    public static void main(String[] args) { // mainRefund
        // TODO code application logic here
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw); 
        
        try{
            A3647Filter beanGene = new A3647Filter();
            beanGene.IN_CIA = "139"; 
            beanGene.IN_FORMA = "4405";
            beanGene.IN_SERIE = "365101";
            beanGene.IN_CORRL= "0001";
            beanGene.IN_PREME = "0000000294";
            beanGene.IN_ANIO = "2023";
            beanGene.IN_SEQ = "00";
            

        }
        
        catch(Exception e){
            e.printStackTrace(pw);
            sw.toString();
            System.out.println("Exception -> User: LZAMBRANO Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        
    }
    
}
