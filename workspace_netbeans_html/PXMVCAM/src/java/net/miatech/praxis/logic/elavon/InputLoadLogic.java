/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.elavon;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.elavon.InputLoadDAO;
import net.miatech.praxis.elavon.X3147temp;

/**
 *
 * @author Dvicente
 */
public class InputLoadLogic {
    private InputLoadDAO dao = new InputLoadDAO();
    
    public void setSession(IServerSession ss){
        dao.setSession(ss);
    }
    
    public boolean saveX3147(List<X3147temp> temp)throws SQLException,Exception{
        return dao.setX3147(temp);
    }
}
