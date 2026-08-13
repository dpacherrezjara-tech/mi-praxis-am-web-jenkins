/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.classes;

import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadPoolExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 *
 * @author Dvicente
 */
@Configuration
@EnableAsync
@ComponentScan("net.miatech")
public class SpringAsyncConfig {

    @Bean
    public TaskExecutor taskExecutor1() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(7);
        executor.setMaxPoolSize(42);
        executor.setQueueCapacity(11);
        executor.setThreadNamePrefix("PraxisAsync-");
        executor.setWaitForTasksToCompleteOnShutdown(false);
        executor.initialize();
        return executor;
    }

    @Bean(name = "sabreRobotExecutor")
    public TaskExecutor sabreRobotExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5); // Número de hilos que se mantendrán en el pool
        executor.setMaxPoolSize(5); // Máximo número de hilos
        executor.setQueueCapacity(5); // Capacidad de la cola
        executor.setThreadNamePrefix("SabreRobot-");
        executor.setWaitForTasksToCompleteOnShutdown(false);
        // Establecer el manejador de rechazo para lanzar una excepción cuando la cola esté llena
        executor.setRejectedExecutionHandler((Runnable r, ThreadPoolExecutor executor1) -> {
            throw new RuntimeException("La cola está llena. No se puede aceptar más tareas.");
        });
        executor.initialize();
        return executor;
    }
}
