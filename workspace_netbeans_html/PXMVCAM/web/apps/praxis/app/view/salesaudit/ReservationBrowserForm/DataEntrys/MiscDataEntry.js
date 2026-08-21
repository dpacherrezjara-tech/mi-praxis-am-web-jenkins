prototype.idDE3 = prototype.id + '-MiscDataEntry';

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
                    id: prototype.idDE3 + '-mainPanel',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Form Parameters">
                        {
                            xtype: 'form',
                            id: prototype.idDE3 + '-formParams',
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
                            xtype: 'grid',
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {},
                            width: '98%',
                            minHeight: 150,
                            maxHeight: 250,
                            margin: '5 8 5 8',
                            border: false,
                            id: prototype.idDE3 + '-mainGrid',
                            columnLines: true,
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: '#', xtype: 'rownumberer', width: 50},
                                    {
                                        text: 'Processing Date',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        columns: [
                                            {text: 'From', dataIndex: 'PRDAF', width: 80},
                                            {text: 'To', dataIndex: 'PRDAT', width: 80}
                                        ]
                                    },
                                    {
                                        text: 'Queue', dataIndex: 'JOBQUEUE', width: 100
                                    },
                                    {
                                        text: 'Create',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        columns: [
                                            {text: 'User', dataIndex: 'USCR', width: 90},
                                            {text: 'Date', dataIndex: 'FECR', width: 80},
                                            {text: 'Hour', dataIndex: 'HOCR', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    let timeDate = Ext.Date.parse(value, 'his');
                                                    let formattedTime = Ext.Date.format(timeDate, 'h:i:s A');
                                                    return formattedTime;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Update',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        columns: [
                                            {text: 'User', dataIndex: 'USUP', width: 90},
                                            {text: 'Date', dataIndex: 'FEUP', width: 80},
                                            {text: 'Hour', dataIndex: 'HOUP', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    let timeDate = Ext.Date.parse(value, 'his');
                                                    let formattedTime = Ext.Date.format(timeDate, 'h:i:s A');
                                                    return formattedTime;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Status', dataIndex: 'STSEARCH', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            const opcion = {
                                                'P': () => {
                                                    metaData.tdAttr = 'data-qtip="Processing"';
                                                    return '<img src="resources/img/botones/arrow-refresh.png"/>';
                                                },
                                                'S': () => {
                                                    metaData.tdAttr = 'data-qtip="Success"';
                                                    return '<img src="resources/img/icon/16x16/check.png"/>';
                                                },
                                                'X': () => {
                                                    metaData.tdAttr = 'data-qtip="Error"';
                                                    return '<img src="resources/img/icon/delete.png"/>';
                                                }
                                            };
                                            return opcion[value]();
                                        }
                                    }
                                ]
                            }
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