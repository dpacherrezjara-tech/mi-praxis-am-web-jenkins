/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
Ext.define('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.SimplifiedUsageFileControlLoadSFTPForm', {
    extend: 'Ext.window.Window',
    xtype: 'simplifiedusagefileformsimple',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.button.Button'
    ],
    title: 'Procesar carga de archivo a SFTP',
    width: 300,
    height: 200,
    layout: 'fit',
    modal: true,
    closable: true,
    resizable: false,
    
    items: [{
        xtype: 'form',
        bodyPadding: 20,
        defaults: {
//            anchor: '100%',
            labelAlign: 'top'
        },
        
        items: [{
            xtype: 'datefield',
            name: 'fecha',
            fieldLabel: 'Fecha de Proceso',
            allowBlank: false,
            value: new Date(),
            format: 'd/m/Y',
            width: 100,
            maxValue: new Date(),
            emptyText: 'Seleccione una fecha'
        }],
        
        buttons: [{
            text: 'Cancelar',
            iconCls: 'prx-icon-cancel',
            handler: function(btn) {
                btn.up('window').close();
            }
        }, {
            text: 'Procesar',
            formBind: true,
            iconCls: 'prx-icon-image-file',
            handler: function(btn) {
                var form = btn.up('form').getForm();
                
                if (form.isValid()) {
                    var fecha = form.findField('fecha').getValue();
                    var fechaFormateada = Ext.Date.format(fecha, 'Ymd');
                    
                    // Preparar datos
                    var requestData = {
                        VP_CCUST: "139",  // Valor por defecto
                        VP_FECHA1: fechaFormateada,
                        VP_FECHA2: fechaFormateada,
                        VP_TOPE: 1
                    };
                    
                    // Deshabilitar botón
                    btn.setDisabled(true);
                    btn.setText('Procesando...');
                    
                    // Mostrar loading
                    var window = btn.up('window');
                    window.setLoading('Procesando...');
                    
                    // URL del endpoint
                    var url = prototype.url + '/upload-sftp-async-json';
                    
                    // Enviar con Fetch API
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('Error HTTP: ' + response.status);
                        }
                        return response.json();
                    })
                    .then(function(data) {
                        window.setLoading(false);
                        btn.setDisabled(false);
                        btn.setText('Procesar');
                        
                        if (data.success) {
                            Ext.Msg.alert('Éxito', 
                                data.message || 'Proceso iniciado correctamente',
                                function() {
                                    window.close();
                                }
                            );
                        } else {
                            Ext.Msg.alert('Error', data.error || 'Error al procesar');
                        }
                    })
                    .catch(function(error) {
                        window.setLoading(false);
                        btn.setDisabled(false);
                        btn.setText('Procesar');
                        
                        Ext.Msg.alert('Error', 
                            'No se pudo conectar con el servidor: ' + error.message
                        );
                    });
                }
            }
        }]
    }]
});