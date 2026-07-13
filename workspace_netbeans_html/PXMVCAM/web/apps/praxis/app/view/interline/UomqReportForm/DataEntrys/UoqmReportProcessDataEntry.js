

prototype.idDE2 = prototype.id + '-UoqmReportProcessDataEntry';

Ext.define('Ext.Praxis.view.interline.UomqReportForm.DataEntrys.UoqmReportProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.UoqmReportProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.interline.UomqReport.UoqmReportProcessDataEntryController'
    ],
    controller: 'UoqmReportProcessDataEntryController',
    title: 'Process - Form',
    header: true,
    width: 500,
    minHeight: 150,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE2 + '-processForm',
            layout: 'vbox',
            border: false,
            bodyStyle: 'background: transparent',
            defaults: {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    pack: 'start'
                },
                bodyStyle: 'background: transparent',
                border: false,
                width:'100%',
                defaults: {
                    fieldStyle: 'text-align: center;',
                    padding: '5 1 5 1',
                    anchor: '100%',
                    hiddenLabel: false,
                    labelAlign: 'right',
                    hidden: false
                }
            },
            width:'100%',
            items: [
                {
                    items: [
                        {
                            xtype: 'combobox',
                            labelStyle: 'font-weight:bold;',
                            fieldLabel: 'Client',
                            name: 'IN_CCUST',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['139', 'AM - AEROMEXICO']
                                ]
                            }),
                            labelWidth: 60,
                            width: 190,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '139',
                            hidden: true
                        },
                        {
                            xtype: 'combobox',
                            labelStyle: 'font-weight:bold;',
                            fieldLabel: 'Process By',
                            name: 'IN_TIPO',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['R', 'Range of Groups'],
                                    ['E', 'Upload Excel']
                                ]
                            }),
                            labelWidth: 100,
                            width: 220,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'R',
                            listeners: {
                                change: 'onChangeType'
                            }
                        }
                    ]
                },
                {
                    id: prototype.idDE2 + '-panelRangeGroups',
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: '2 5 2 5',
                            name:'IN_GRUPOF',
                            labelStyle: 'text-align:right;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: true,
                            fieldLabel: 'From',
                            labelWidth: 70,
                            width: 200,
                            maxLength: 6,
                            maskRe: /[0-9]/,
                            value: ''
                        },
                        {
                            xtype: 'textfield',
                            margin: '2 5 2 5',
                            name:'IN_GRUPOT',
                            labelStyle: 'text-align:right;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: true,
                            fieldLabel: 'To',
                            labelWidth: 70,
                            width: 200,
                            maxLength: 6,
                            maskRe: /[0-9]/,
                            value: ''
                        }
                    ]
                },
                {
                    id: prototype.idDE2 + '-panelUploadExcel',
                    margin: '5 5 5 5',
                    hidden: true,
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'excelFile', // Nombre que recibirá el servidor
                            fieldLabel: 'File Name',
                            id: prototype.idDE2 + '-excelFiles',
                            labelWidth: 80,
                            msgTarget: 'side',
                            allowBlank: false,
                            width: '90%',
                            buttonText: 'Upload...',
                            // Filtro básico para que el navegador sugiera solo archivos Excel
                            accept: '.xls,.xlsx'
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
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 5 5 5'
            },
            items: [
                {
                    text: 'Process',
                    id: prototype.idDE2 + '-btn-process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});