using System.Configuration;
using System.Security.Cryptography.X509Certificates;
using System.ServiceProcess;
using System.Text.RegularExpressions;

namespace CertificadoAutomatico;

class Program
{
    private static string _logFilePath = "";
    private static readonly object _logLock = new object();
    private static bool _seGeneroKeystore = false;

    static int Main(string[] args)
    {
        bool exitoGeneracion = false;
        bool exitoDeploy = false;
        string errorGeneracion = "";
        string errorDeploy = "";
        string keystoreFinal = "";

        try
        {
            string rootSetup = ConfigurationManager.AppSettings["rootSetup"];
            string nameSetup = ConfigurationManager.AppSettings["nameSetup"];

            if (string.IsNullOrEmpty(rootSetup) || string.IsNullOrEmpty(nameSetup))
            {
                EscribirLog("[ERROR] Faltan 'rootSetup' o 'nameSetup' en el app.config.", true);
                return 1;
            }

            string setupFilePath = Path.Combine(rootSetup, nameSetup);
            if (!File.Exists(setupFilePath))
            {
                EscribirLog($"[ERROR] No se encontró el archivo de configuración: {setupFilePath}", true);
                return 1;
            }

            var config = ParsearSetupFile(setupFilePath);

            string sourcePath = ObtenerValor(config, "SOURCE_PATH", "CERTIFICATE_SETTINGS");
            string password = ObtenerValor(config, "PASSWORD", "CERTIFICATE_SETTINGS");
            string outputName = ObtenerValor(config, "OUTPUT_NAME", "CERTIFICATE_SETTINGS") ?? "keystore.p12";
            string outputPath = ObtenerValor(config, "OUTPUT_PATH", "CERTIFICATE_SETTINGS") ?? sourcePath;

            string logPath = ObtenerValor(config, "LOG_PATH", "LogPath");
            string logFileName = ObtenerValor(config, "LOG_FILE_NAME", "LogPath");

            _logFilePath = string.IsNullOrEmpty(logPath) || string.IsNullOrEmpty(logFileName)
                ? Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Certificado.log")
                : Path.Combine(logPath, logFileName);

            string logDir = Path.GetDirectoryName(_logFilePath);
            if (!string.IsNullOrEmpty(logDir) && !Directory.Exists(logDir))
                Directory.CreateDirectory(logDir);

            EscribirLog("==================================================");
            EscribirLog($"Iniciando proceso de generación de keystore");
            EscribirLog($"Hora: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");

            if (string.IsNullOrEmpty(sourcePath))
            {
                EscribirLog("[ERROR] No se encontró SOURCE_PATH en [CERTIFICATE_SETTINGS]", true);
                return 1;
            }

            if (!sourcePath.EndsWith(Path.DirectorySeparatorChar.ToString()))
                sourcePath += Path.DirectorySeparatorChar;
            if (!outputPath.EndsWith(Path.DirectorySeparatorChar.ToString()))
                outputPath += Path.DirectorySeparatorChar;

            EscribirLog($"Origen de certificados: {sourcePath}");
            EscribirLog($"Destino del keystore: {outputPath}");

            keystoreFinal = Path.Combine(outputPath, outputName);

            exitoGeneracion = GenerarKeystoreSiEsNecesario(sourcePath, outputPath, password, outputName, out errorGeneracion);

            if (!exitoGeneracion)
            {
                EscribirLog($"[ERROR] Falló la generación: {errorGeneracion}", true);
            }

            
            // BACKUP - CORREGIDO
            if (exitoGeneracion)
            {
                string enableBackup = ObtenerValor(config, "ENABLE_BACKUP", "BACKUP_SETTINGS");
                if (enableBackup?.ToLower() == "true")
                {
                    string backupSource = ObtenerValor(config, "BACKUP_SOURCE_FOLDERS", "BACKUP_SETTINGS");
                    string backupDest = ObtenerValor(config, "BACKUP_DESTINATION", "BACKUP_SETTINGS");

                    if (string.IsNullOrEmpty(backupSource) || string.IsNullOrEmpty(backupDest))
                    {
                        EscribirLog("[ADVERTENCIA] BACKUP activado pero faltan rutas de origen o destino. Se omite.", true);
                    }
                    else
                    {
                        if (!backupSource.EndsWith(Path.DirectorySeparatorChar.ToString()))
                            backupSource += Path.DirectorySeparatorChar;
                        if (!backupDest.EndsWith(Path.DirectorySeparatorChar.ToString()))
                            backupDest += Path.DirectorySeparatorChar;

                        EscribirLog("Iniciando backup de la carpeta de certificados...");
                        bool exitoBackup = RealizarBackupCarpeta(backupSource, backupDest, out string errorBackup);
                        if (exitoBackup)
                            EscribirLog("[ÉXITO] Backup de carpeta completado.");
                        else
                            EscribirLog($"[ERROR] Falló el backup de carpeta: {errorBackup}", true);
                    }
                }
                else
                {
                    EscribirLog("Backup de carpeta desactivado (ENABLE_BACKUP != true).");
                }
            }

            // DESPLIEGUE
            if (exitoGeneracion)
            {
                string enableDeploy = ObtenerValor(config, "ENABLE_DEPLOY", "DEPLOY_SETTINGS");
                if (enableDeploy?.ToLower() == "true")
                {
                    string tomcatDestino = ObtenerValor(config, "TOMCAT_KEYSTORE_PATH", "DEPLOY_SETTINGS");
                    string tomcatServicio = ObtenerValor(config, "TOMCAT_SERVICE_NAME", "DEPLOY_SETTINGS");
                    string restartTomcat = ObtenerValor(config, "RESTART_TOMCAT", "DEPLOY_SETTINGS") ?? "true";
                    string backupOld = ObtenerValor(config, "BACKUP_OLD_KEYSTORE", "DEPLOY_SETTINGS") ?? "true";

                    if (string.IsNullOrEmpty(tomcatDestino))
                    {
                        EscribirLog("[ADVERTENCIA] DEPLOY activado pero no se especificó TOMCAT_KEYSTORE_PATH. Se omite.", true);
                    }
                    else if (string.IsNullOrEmpty(tomcatServicio))
                    {
                        EscribirLog("[ADVERTENCIA] DEPLOY activado pero no se especificó TOMCAT_SERVICE_NAME. Se omite.", true);
                    }
                    else
                    {
                        string origenKeystore = Path.Combine(outputPath, outputName);
                        bool reiniciar = restartTomcat.ToLower() == "true";
                        bool backup = backupOld.ToLower() == "true";

                        EscribirLog("Iniciando despliegue a Tomcat...");
                        exitoDeploy = DesplegarKeystore(origenKeystore, tomcatDestino, tomcatServicio, reiniciar, backup, out errorDeploy);

                        if (exitoDeploy)
                            EscribirLog("[ÉXITO] Despliegue a Tomcat completado.");
                        else
                            EscribirLog($"[ERROR] Falló el despliegue: {errorDeploy}", true);
                    }
                }
                else
                {
                    EscribirLog("Despliegue a Tomcat desactivado (ENABLE_DEPLOY != true).");
                    exitoDeploy = true;
                }
            }

            // EMAIL
            
            string enableEmail = ObtenerValor(config, "ENABLE_EMAIL", "EMAIL_SETTINGS");
            if (enableEmail?.ToLower() == "true")
            {
                EscribirLog("[EMAIL] Enviando notificación...");

                string expiryDate = ObtenerFechaExpiracion(keystoreFinal, password);
                string serverName = ObtenerValor(config, "ENV_NAME", "ENVIRONMENT_SETTINGS") ?? Environment.MachineName;

                string estado;
                string colorEstado;

                bool huboError = !exitoGeneracion || !exitoDeploy;

                if (huboError)
                {
                    estado = "ERROR en el proceso";
                    colorEstado = "#e53e3e";

                    string detallesError = "";
                    if (!exitoGeneracion)
                        detallesError = $"Error en generación: {errorGeneracion}";
                    else if (!exitoDeploy)
                        detallesError = $"Error en despliegue: {errorDeploy}";

                    estado = $"{estado} - {detallesError}";
                }
                else
                {
                    estado = "Actualización exitosa";
                    colorEstado = "#38a169";
                }

                var emailService = new EmailService(config);
                bool exitoEmail = emailService.SendSuccessNotification(
                    expiryDate,
                    serverName,
                    estado,
                    colorEstado,
                    out string errorEmail
                );

                if (exitoEmail)
                    EscribirLog("[EMAIL] Notificación enviada correctamente.");
                else
                    EscribirLog($"[EMAIL] Falló el envío: {errorEmail}", true);
            }
            else
            {
                EscribirLog("[EMAIL] Notificaciones por correo desactivadas.");
            }

            if (exitoGeneracion && exitoDeploy)
            {
                EscribirLog("[ÉXITO] Proceso completado correctamente.");
                return 0;
            }
            else
            {
                EscribirLog("[ERROR] El proceso finalizó con errores. Revise el log.", true);
                return 1;
            }
        }
        catch (Exception ex)
        {
            EscribirLog($"Excepción no controlada: {ex.Message}\n{ex.StackTrace}", true);
            return 2;
        }
        finally
        {
            EscribirLog($"Fin del proceso - {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
            EscribirLog("==================================================");
        }
    }

    public static void EscribirLog(string mensaje, bool esError = false)
    {
        lock (_logLock)
        {
            string linea = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - {mensaje}";
            if (esError)
                Console.ForegroundColor = ConsoleColor.Red;
            else
                Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine(linea);
            Console.ResetColor();

            if (!string.IsNullOrEmpty(_logFilePath))
            {
                try
                {
                    File.AppendAllText(_logFilePath, linea + Environment.NewLine);
                }
                catch { }
            }
        }
    }

    static Dictionary<string, string> ParsearSetupFile(string filePath)
    {
        var dict = new Dictionary<string, string>();
        string currentSection = "";

        foreach (var line in File.ReadAllLines(filePath))
        {
            string trimmed = line.Trim();
            if (string.IsNullOrEmpty(trimmed)) continue;

            if (trimmed.StartsWith("[") && trimmed.EndsWith("]"))
            {
                currentSection = trimmed.TrimStart('[').TrimEnd(']');
                continue;
            }

            if (trimmed.Contains('|'))
            {
                var parts = trimmed.Split('|', 2, StringSplitOptions.TrimEntries);
                if (parts.Length == 2)
                {
                    string key = parts[0];
                    string value = parts[1];
                    string fullKey = string.IsNullOrEmpty(currentSection) ? key : $"{currentSection}.{key}";
                    dict[fullKey] = value;
                }
            }
        }
        return dict;
    }

    static string ObtenerValor(Dictionary<string, string> dict, string key, string section = null)
    {
        string fullKey = string.IsNullOrEmpty(section) ? key : $"{section}.{key}";
        return dict.TryGetValue(fullKey, out string value) ? value : null;
    }

    static bool GenerarKeystoreSiEsNecesario(string sourcePath, string outputPath, string password, string outputName, out string errorMsg)
    {
        errorMsg = "";
        string certFile = Path.Combine(sourcePath, "certificate.crt");
        string keyFile = Path.Combine(sourcePath, "private.key");
        string caFile = Path.Combine(sourcePath, "ca_bundle.crt");
        string outputFile = Path.Combine(outputPath, outputName);

        if (!File.Exists(certFile))
        {
            errorMsg = $"No se encuentra certificate.crt en {sourcePath}";
            _seGeneroKeystore = false;
            return false;
        }
        if (!File.Exists(keyFile))
        {
            errorMsg = $"No se encuentra private.key en {sourcePath}";
            _seGeneroKeystore = false;
            return false;
        }
        if (!File.Exists(caFile))
        {
            errorMsg = $"No se encuentra ca_bundle.crt en {sourcePath}";
            _seGeneroKeystore = false;
            return false;
        }

        bool necesitaGenerar = false;

        if (File.Exists(outputFile))
        {
            DateTime fechaP12 = File.GetLastWriteTime(outputFile);
            DateTime fechaCert = File.GetLastWriteTime(certFile);
            DateTime fechaKey = File.GetLastWriteTime(keyFile);
            DateTime fechaCa = File.GetLastWriteTime(caFile);
            DateTime fechaMaxOrigen = new DateTime[] { fechaCert, fechaKey, fechaCa }.Max();

            if (fechaP12 >= fechaMaxOrigen)
            {
                EscribirLog($"El archivo {outputName} ya está actualizado (última modificación: {fechaP12:yyyy-MM-dd HH:mm:ss}). Se omite la generación.");
                _seGeneroKeystore = false;
                return true;
            }
            else
            {
                EscribirLog($"Los archivos de origen han cambiado. Origen más reciente: {fechaMaxOrigen:yyyy-MM-dd HH:mm:ss}. Se procede a regenerar.");
                necesitaGenerar = true;
            }
        }
        else
        {
            EscribirLog($"El archivo {outputName} no existe en {outputPath}. Se procede a generarlo.");
            necesitaGenerar = true;
        }

        if (!necesitaGenerar)
        {
            _seGeneroKeystore = false;
            return true;
        }

        try
        {
            if (!Directory.Exists(outputPath))
                Directory.CreateDirectory(outputPath);

            EscribirLog("Cargando certificado principal y clave privada...");
            using var certificadoPrincipal = X509Certificate2.CreateFromPemFile(certFile, keyFile);

            EscribirLog("Cargando CA Bundle...");
            string contenidoCa = File.ReadAllText(caFile);
            var coleccion = new X509Certificate2Collection { certificadoPrincipal };

            var certsCa = CargarCertificadosDesdePem(contenidoCa);
            foreach (var c in certsCa)
            {
                coleccion.Add(c);
                EscribirLog("  - Certificado intermedio/CA agregado.");
            }

            EscribirLog($"Generando {outputFile} ...");
            byte[] p12Data = coleccion.Export(X509ContentType.Pkcs12, password);
            File.WriteAllBytes(outputFile, p12Data);

            var fileInfo = new FileInfo(outputFile);
            if (fileInfo.Exists && fileInfo.Length > 0)
            {
                EscribirLog($"Archivo generado correctamente: {outputFile} ({fileInfo.Length} bytes)");
                _seGeneroKeystore = true;
                return true;
            }
            else
            {
                errorMsg = "El archivo generado está vacío o no se pudo escribir.";
                _seGeneroKeystore = false;
                return false;
            }
        }
        catch (Exception ex)
        {
            errorMsg = $"Excepción en la generación: {ex.Message}";
            _seGeneroKeystore = false;
            return false;
        }
    }

    static List<X509Certificate2> CargarCertificadosDesdePem(string contenidoPem)
    {
        var lista = new List<X509Certificate2>();
        var regex = new Regex(@"-----BEGIN CERTIFICATE-----(.*?)-----END CERTIFICATE-----",
                              RegexOptions.Singleline | RegexOptions.IgnoreCase);

        foreach (Match match in regex.Matches(contenidoPem))
        {
            var cert = X509Certificate2.CreateFromPem(match.Value);
            lista.Add(cert);
        }
        return lista;
    }
    // BACKUP

    static bool RealizarBackupCarpeta(string origen, string destino, out string errorMsg)
    {
        errorMsg = "";

        if (!Directory.Exists(origen))
        {
            errorMsg = $"La carpeta de origen no existe: {origen}";
            return false;
        }

        try
        {
            if (!Directory.Exists(destino))
            {
                Directory.CreateDirectory(destino);
                EscribirLog($"Carpeta de destino creada: {destino}");
            }

            EscribirLog($"Copiando {origen} -> {destino} ...");

            string origenLimpio = origen.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
            string destinoLimpio = destino.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);

            string argumentos = $"\"{origenLimpio}\" \"{destinoLimpio}\" /E /COPY:DAT /R:3 /W:10 /NP /NDL";

            var startInfo = new System.Diagnostics.ProcessStartInfo
            {
                FileName = "robocopy",
                Arguments = argumentos,
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };

            using var process = System.Diagnostics.Process.Start(startInfo);
            if (process != null)
            {
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();

                process.WaitForExit();
                int exitCode = process.ExitCode;

                
                if (exitCode >= 8)
                {
                    errorMsg = $"Robocopy falló con código {exitCode}. Output: {output} Error: {error}";
                    return false;
                }
                else
                {
                    EscribirLog($"Robocopy completado con código {exitCode} (0-7 = éxito)");
                }
            }

            return true;
        }
        catch (Exception ex)
        {
            errorMsg = $"Error en backup de carpeta: {ex.Message}";
            return false;
        }
    }
    static bool DesplegarKeystore(string origenKeystore, string destinoKeystore, string servicioTomcat, bool reiniciar, bool backupOld, out string errorMsg)
    {
        errorMsg = "";

        if (!File.Exists(origenKeystore))
        {
            errorMsg = $"El archivo de origen no existe: {origenKeystore}";
            return false;
        }

        try
        {
            string destinoDir = Path.GetDirectoryName(destinoKeystore);
            if (!string.IsNullOrEmpty(destinoDir) && !Directory.Exists(destinoDir))
            {
                Directory.CreateDirectory(destinoDir);
                EscribirLog($"Carpeta de destino creada: {destinoDir}");
            }

            if (backupOld && File.Exists(destinoKeystore))
            {
                string backupFile = destinoKeystore + $".backup_{DateTime.Now:yyyyMMdd_HHmmss}";
                File.Copy(destinoKeystore, backupFile, true);
                EscribirLog($"Backup del keystore anterior guardado en: {backupFile}");
            }

            if (reiniciar)
            {
                EscribirLog($"Deteniendo servicio de Tomcat: {servicioTomcat}...");
                using (var sc = new ServiceController(servicioTomcat))
                {
                    if (sc.Status == ServiceControllerStatus.Running ||
                        sc.Status == ServiceControllerStatus.StartPending)
                    {
                        sc.Stop();
                        sc.WaitForStatus(ServiceControllerStatus.Stopped, TimeSpan.FromSeconds(120));
                        EscribirLog($"Servicio {servicioTomcat} detenido.");
                    }
                    else
                    {
                        EscribirLog($"El servicio {servicioTomcat} ya estaba detenido.");
                    }
                }
            }

            EscribirLog($"Copiando keystore a: {destinoKeystore}");
            File.Copy(origenKeystore, destinoKeystore, true);
            EscribirLog("Keystore copiado correctamente.");

            if (reiniciar)
            {
                EscribirLog($"Iniciando servicio de Tomcat: {servicioTomcat}...");
                using (var sc = new ServiceController(servicioTomcat))
                {
                    sc.Start();
                    sc.WaitForStatus(ServiceControllerStatus.Running, TimeSpan.FromSeconds(120));
                    EscribirLog($"Servicio {servicioTomcat} iniciado.");
                }
            }

            return true;
        }
        catch (Exception ex)
        {
            errorMsg = $"Error en el despliegue: {ex.Message}";
            return false;
        }
    }

    static string ObtenerFechaExpiracion(string keystorePath, string password)
    {
        if (!File.Exists(keystorePath))
            return "No disponible (archivo no encontrado)";

        try
        {
            using var cert = new X509Certificate2(keystorePath, password);
            return cert.NotAfter.ToString("dd/MM/yyyy HH:mm:ss");
        }
        catch (Exception ex)
        {
            EscribirLog($"[ADVERTENCIA] No se pudo leer la fecha de expiración: {ex.Message}", true);
            return "No disponible (error al leer)";
        }
    }
}