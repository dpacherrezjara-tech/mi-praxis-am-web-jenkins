package net.miatech.praxis.classes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Dvicente
 */
@Configuration
public class SSLConfig {

    @Bean
    public SSLDisabler sslDisabler() {
        return new SSLDisabler();
    }
}
