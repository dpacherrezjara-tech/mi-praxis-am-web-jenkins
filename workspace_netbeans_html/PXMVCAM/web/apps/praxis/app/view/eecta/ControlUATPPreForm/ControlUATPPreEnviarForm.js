

Ext.define('Ext.Praxis.view.eecta.ControlUATPPreForm.ControlUATPPreEnviarForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id06 + '-dataEntry',
    controller: prototype.id06 + '-controlUATPPreEnviarController',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATPPre.ControlUATPPreEnviarController',
        'Ext.Praxis.view.eecta.ControlUATPPreForm.Info05'
    ],
    title: 'Enviar facturas al cliente',
    header: true,
    width: 870,
    height: 450,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id06 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id06 + '-form01',
                    layout: 'vbox',
                    width: '100%',
                    border:true,
                    margin: '5 2 0 0',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-IdCliente',
                                    fieldLabel: 'Id Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    labelWidth: 120, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    readOnly: true, value: '',
                                    width: 210
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-NombreCliente',
                                    fieldLabel: 'Nombre Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    labelWidth: 120, fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                    readOnly: true, value: '',
                                    width: 400
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-Email',
                                    fieldLabel: 'Enviar a:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    labelWidth: 120, 
                                    // fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                    readOnly: false, emptyText:'Ingresar email separados por ; si es más de un correo',
                                    width: 500
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id06 + '-panel-contenedor-grid',
                    layout: 'fit',
                    width: 850,
                    items: [{
                            xtype: prototype.id06 + '-info05'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Enviar',
                    id: prototype.id06 + '-btn-enviar',
                    iconCls: 'prx-icon-processing',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancelar',
                    id: prototype.id06 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});