/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.classes;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
public class RunningThreads {

    //muestra los executor de clase PraxisAsync
    public String getRunningThreadsToString() {
        StringBuilder sb = new StringBuilder();
        Set<Thread> threadSet = Thread.getAllStackTraces().keySet();
        if (threadSet.isEmpty()) {
            return null;
        }
        Thread[] tArray = threadSet.toArray(new Thread[threadSet.size()]);
        int cont = 1;
        for (Thread tr : tArray) {
            if (tr.getName().startsWith("PraxisAsync")) {
                sb.append("*****************************************************************").append("\n");
                sb.append("Thread #").append(cont + " ").append(tr.getName()).append("\n");
                if (tr.getContextClassLoader() != null) {
                    sb.append("Class Loader -> ").append(tr.getContextClassLoader().toString()).append("\n");
                }
                //sb.append("Thread Group ->").append(tr.getThreadGroup().getName()).append("\n");
                cont++;
            }
        }
        sb.append("*****************************************************************");
        return sb.toString();
    }

    public List<Thread> getRunningThreads() {
        Set<Thread> threadSet = Thread.getAllStackTraces().keySet();
        if (threadSet.isEmpty()) {
            return null;
        }
        List<Thread> tArray = new ArrayList<>();
        for(Thread tr : threadSet){
            if (tr.getName().startsWith("PraxisAsync")) {
                tArray.add(tr);
            }
        }
        
        return tArray;
    }

    @Deprecated
    public void cancelThread(String trName) {
        Set<Thread> threadSet = Thread.getAllStackTraces().keySet();
        if (!threadSet.isEmpty()) {
            Thread[] tArray = threadSet.toArray(new Thread[threadSet.size()]);
            for (Thread tr : tArray) {
                if (trName.equals(tr.getName())) {
                    if (!tr.isInterrupted()) {
                        tr.interrupt();
                    }
                }
            }
        }

    }
}
