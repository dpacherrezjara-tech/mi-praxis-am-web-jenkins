prototype.idPM = prototype.id + '-ProcessMassiveDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ProcessMassiveDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessMassiveDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ProcessMassiveDataEntryController'
    ],
    controller: 'ProcessMassiveDataEntryController',
    title: 'Process Massive',
    header: true,
    width: 1200,
    height: 600,
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
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            //<editor-fold defaultstate="collapsed" desc="Execute Section">
            items: [
                {
                    xtype: 'panel',
                    title: 'Execute',
                    border: true,
                    margin: '5 5 0 5',
                    collapsible: true,
                    collapsed: false,
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack: 'start'
                    },
                    defaults: {
                        margin: '6 0 6 0'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.idPM + '-cmbProgram',
                            fieldLabel: 'Process',
                            labelWidth: 60,
                            width: 220,
                            valueField: 'PROGRAM',
                            displayField: 'DESCRIPTION',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            triggerAction: 'all',
                            labelAlign: 'right',
                            listeners: {
                                change: 'onChangeProgramCombo'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.idPM + '-fieldFrom',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false,
                            labelWidth: 50,
                            width: 150,
                            value: new Date(anioActual, mesActual, 1),
                            validator: 'validaFecha',
                            labelAlign: 'right',
                            hidden: true
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.idPM + '-fieldTo',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            editable: false,
                            labelWidth: 30,
                            width: 130,
                            value: fechaActual,
                            validator: 'validaFecha',
                            labelAlign: 'right',
                            hidden: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idPM + '-cmbProcessor',
                            fieldLabel: 'Processor',
                            labelWidth: 70,
                            width: 250,
                            valueField: 'A4451KEY2',
                            displayField: 'A4451DESC1',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            forceSelection: false,
                            triggerAction: 'all',
                            labelAlign: 'right',
                            hidden: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idPM + '-cmbPriority',
                            fieldLabel: 'Rule Priority',
                            labelWidth: 80,
                            width: 190,
                            valueField: 'A4451KEY3',
                            displayField: 'A4451DESC1',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            forceSelection: false,
                            triggerAction: 'all',
                            labelAlign: 'right',
                            hidden: true
                        },
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '3 0 3 0',
                            layout: {
                                pack: 'center'
                            },
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
                                {
                                    text: 'Execute',
                                    iconCls: 'prx-icon-image-process',
                                    listeners: {
                                        click: 'onExecuteClick'
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
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Search Section">
                {
                    xtype: 'panel',
                    title: 'Search Log',
                    border: true,
                    margin: '5 5 5 5',
                    flex: 1,
                    collapsible: true,
                    collapsed: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            layout: 'hbox',
                            border: false,
                            margin: '3 0 0 0',
                            defaults: {
                                // margin: '4 4 4 4',
                                margin: '6 0 6 0',
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idPM + '-searchCmbProgram',
                                    fieldLabel: 'Process',
                                    labelWidth: 60,
                                    width: 220,
                                    valueField: 'PROGRAM',
                                    displayField: 'DESCRIPTION',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    triggerAction: 'all'
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.idPM + '-searchFrom',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1),
                                    validator: 'validaFecha',
                                    labelAlign: 'right',
                                    tooltip: 'Filtro para Date Process'
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.idPM + '-searchTo',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    value: fechaActual,
                                    validator: 'validaFecha',
                                    labelAlign: 'right',
                                    tooltip: 'Filtro para Date Process'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idPM + '-searchCmbStatus',
                                    fieldLabel: 'Status',
                                    labelWidth: 60,
                                    width: 140,
                                    valueField: 'CODE',
                                    displayField: 'DESCRIPTION',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    triggerAction: 'all'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idPM + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    height: 25,
                                    width: 25,
                                    margin: '4 4 8 4',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idPM + '-gridProcessMassive',
                            flex: 1,
                            border: false,
                            margin: '3 3 3 3',
                            store: Ext.create('Ext.data.Store', { 
                                data: [],
                                pageSize: 20
                            }),
                            emptyText: 'No records found',
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
                                    {
                                        text: 'RN',
                                        xtype: 'rownumberer',
                                        width: 40
                                    },
                                    {
                                        text: 'Process',
                                        dataIndex: 'PROGRAM_DESCRIPTION',
                                        width: 140
                                    },
                                    {
                                        text: 'Processing Date',
                                        columns: [
                                            {
                                                text: 'From',
                                                dataIndex: 'FROM',
                                                width: 75,
                                                align: 'center',
                                                tdCls: 'x-grid-cell-center'
                                            },
                                            {
                                                text: 'To',
                                                dataIndex: 'TO',
                                                width: 75,
                                                align: 'center',
                                                tdCls: 'x-grid-cell-center'
                                            }
                                       
                                        ]
                                    },
                                    {
                                        text: 'Processor',
                                        dataIndex: 'PROCESSOR_DESCRIPTION',
                                        width: 120
                                    },
                                    {
                                        text: 'Total', dataIndex: 'TOTAL', width: 80
                                    },
                                    {
                                        text: 'Matchs', dataIndex: 'MATCHS', width: 80
                                    },
                                    {
                                        text: 'Errors',
                                        dataIndex: 'ERRORS',
                                        width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            // value ya contiene el valor de ERRORS
                                            if (value > 0) {
                                                metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;font-weight:bolder;color:red;";
                                                metaData.tdAttr = 'data-qtip="Click for error details"';
                                                return '<a href="#" style="color:inherit;text-decoration:inherit;">' + value + '</a>';
                                            } else {
                                                metaData.style = "text-align:center;";
                                                return value || 0;
                                            }
                                        },
                                        listeners: {
                                            click: function(grid, td, cellIndex, value, tr, rowIndex, e, eOpts) {
                                                // value es el valor directo de la celda 'ERRORS', no record.get
                                                if (value > 0) {
                                                    this.fireEvent('onClickErrors', grid, td, cellIndex, value, tr, rowIndex, e, eOpts);
                                                }
                                            }
                                        }
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'STATUS_DESCRIPTION',
                                        width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            
                                            // Obtener el código del status desde el record
                                            const codeStatus = record.get('STATUS') || '';
                                            
                                            // Definir colores basados en el código del status
                                            let bgColor = '';
                                            const colorMap = {
                                                'N': '#FFE5B4', // Pending
                                                'P': '#B4E5FF', // Processing
                                                'C': '#B4FFB4', // Completed
                                                'E': '#FFB4B4', // Error
                                            };
                                            
                                            // Obtener el color basado en el código del status
                                            bgColor = colorMap[codeStatus] || '';
                                            
                                            // Aplicar el color de fondo si existe
                                            if (bgColor) {
                                                metaData.style += "background-color:" + bgColor + ";";
                                            }
                                            
                                            // Retornar la descripción del status como texto
                                            return value || '';
                                        }
                                    },                         
                                    {
                                        text: 'Description',
                                        dataIndex: 'DESCRIP',
                                        width: 160,
                                        align: 'center',
                                        renderer: function(value, metaData) {
                                            metaData.style = 'text-align:left;';
                                            // Agrega un tooltip completo en el atributo tdAttr
                                            if (value) {
                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                            } else {
                                                metaData.tdAttr = '';
                                            }
                                            return value || '';
                                        }
                                    },
                                    {
                                        text: 'User', dataIndex: 'USCR', width: 80
                                    },
                                    {
                                        text: 'Date<br>Process', dataIndex: 'FECR', width: 80
                                    },
                            
                                ]
                            },
                            bbar: {
                                xtype: 'pagingtoolbar',
                                id: prototype.idPM + '-gridPagingBar',
                                displayInfo: true,
                                displayMsg: 'Records {0} - {1} of {2}',
                                emptyMsg: 'No records to display'
                            }
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ]
});
