prototype.idDE2 = prototype.id + '-RobotExecutorDataEntry';

Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.DataEntrys.RobotExecutorDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.RobotExecutorDataEntry',
    requires: [
        'Ext.Praxis.controller.salesaudit.ReservationBrowser.RobotExecutorDataEntryController'
    ],
    controller: 'RobotExecutorDataEntryController',
    title: 'Robot Sabre - Form',
    header: true,
    width: 680,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idDE2 + '-formFilters',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            id: prototype.idDE2 + '-cmbTipo',
                            fieldLabel: 'Process By',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ["P", "Parameters"],
                                    ["X", "Excel"]
                                ]
                            }),
                            margin: '3 3 3 3',
                            labelStyle: 'font-weight:bold;text-align:right;',
                            labelWidth: 100,
                            width: 200,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            listeners: {
                                change: 'onChangeType'
                            },
                            value: 'P'
                        },
                        //<editor-fold defaultstate="collapsed" desc="Form Parameters">
                        {
                            xtype: 'form',
                            id: prototype.idDE2 + '-formParams',
                            border: false,
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'start'
                            },
                            defaults: {
                                margin: '3 3 3 3',
                                labelStyle: 'font-weight:bold;text-align:right;'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date()
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Queue',
                                    labelWidth: 60,
                                    width: 150,
                                    name: 'IN_QUEUE',
                                    maxLength: 15, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="File">
                        {
                            xtype: 'form',
                            id: prototype.idDE2 + '-formFile',
                            border: false,
                            hidden: true,
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'start'
                            },
                            defaults: {
                                margin: '3 3 3 3',
                                labelStyle: 'font-weight:bold;text-align:right;'
                            },
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'archivo',
                                    fieldLabel: 'Archivo',
                                    labelWidth: 70,
                                    width: 400,
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    buttonText: 'Seleccionar Archivo...',
                                    accept: '.xlsx', // Aceptar solo archivos .xlsx
                                    listeners: {
                                        change: function (field, value) {
                                            // Verificar la extensión del archivo
                                            var file = field.fileInputEl.dom.files[0];
                                            var fileName = file.name;
                                            var fileExt = fileName.substring(fileName.lastIndexOf('.'));
                                            if (fileExt !== '.xlsx') {
                                                Ext.Msg.alert('Error', 'Solo se permiten archivos con extensión .xlsx.');
                                                field.reset(); // Restablecer el campo de archivo
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                        //</editor-fold>
                    ]

                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});