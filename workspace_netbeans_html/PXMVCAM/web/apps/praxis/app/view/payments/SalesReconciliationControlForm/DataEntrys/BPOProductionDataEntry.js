prototype.idDeProd = prototype.id + '-BPOProductionDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.BPOProductionDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.BPOProductionDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.BPOProductionDataEntryController'
    ],
    controller: 'BPOProductionDataEntryController',
    title: 'BPO Production - Form',
    header: true,
    width: 1300,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'panel',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            anchor: '100%',
            items: [
                //<editor-fold defaultstate="collapsed" desc="Filtros">
                {
                    xtype: 'form',
                    layout: 'hbox',
                    id: prototype.idDeProd + '-formFilters',
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Search By',
                            name: 'IN_DATE',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['FEUP', 'Worked Date']
                                ]
                            }),
                            labelWidth: 80,
                            width: 200,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            readOnly: true,
                            value: 'FEUP'
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_FECFROM',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 50,
                            width: 150,
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeDate'
                            },
                            id: prototype.idDeProd + '-datefieldFrom'
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_FECTO',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            altFormats: 'm',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 30,
                            width: 130,
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeDate'
                            },
                            id: prototype.idDeProd + '-datefieldTo'
                        },
                        {
                            name: 'IN_USUP',
                            fieldLabel: 'Username',
                            labelWidth: 80,
                            width: 180,
                            maxLength: 10,
                            enforceMaxLength: true,
                            maskRe: /[A-Za-z]/, // Solo permite letras
                            listeners: {
                                change: function (field, newValue, oldValue, eOpts) {
                                    // Convierte el texto a mayúsculas
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status',
                            name: 'IN_STVAL',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['0', 'Stand By'],
                                    ['5', 'Match Manual'],
                                    ['6', 'Match Forzado']
                                ]
                            }),
                            labelWidth: 55,
                            width: 180,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Origin',
                            name: 'IN_ORIG',
                            value: 'P',
                            width: 155,
                            labelWidth: 55,
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['P', 'By Payment'],
                                    ['T', 'By Ticket']
                                ]
                            }),
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            listeners: {
                                change: 'onChangeOrigin'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Doc. Type',
                            name: 'IN_TRANSTYPE',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['SALE', 'Sale'],
                                    ['RFND', 'Refund'],
                                    ['CHBK', 'Chargeback']
                                ]
                            }),
                            labelWidth: 80,
                            width: 200,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'button',
                            id: prototype.idDeProd + '-btnSearch',
                            height: 25,
                            width: 25,
                            margin: '4 4 4 7',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.idDeProd + '-btnExcel',
                            height: 25,
                            width: 25,
                            margin: '4 4 4 4',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export',
                            listeners: {
                                click: 'onExportExcelBtn'
                            }
                        }
                    ]
                },
                //</editor-fold>
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDeProd + '-gridSummary',
                            columnLines: true,
                            autoScroll: true,
                            minHeight: 180,
                            width: 340,
                            maxHeight: 200,
                            margin: '5 5 5 5',
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
                                        xtype: 'rownumberer', // Columna de número de fila
                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                    },
                                    {text: 'Worked<br>Date', dataIndex: 'feup', width: 80},
                                    {text: 'Username', dataIndex: 'usup', flex: 1},
                                    {text: 'Qty<br>Trnx', dataIndex: 'qtrn', width: 80,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            return '<b>' + value + '<b>';
                                        }
                                    }
                                ]
                            },
                            listeners: {
                                itemclick: 'onClickUser'
                            },
                            features: [
                                {
                                    ftype: 'summary' // Agrega la característica de resumen al grid
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            title: 'Detail',
                            titleAlign: 'center',
                            id: prototype.idDeProd + '-gridDetail',
                            minHeight: 180,
                            maxHeight: 200,
                            flex: 1,
                            margin: '5 5 5 5',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Doc. Type', dataIndex: 'transtype', width: 100},
                                    {text: 'Processor', dataIndex: 'desc_PROCTYPE', flex: 1},
                                    {
                                        text: 'Country', dataIndex: 'scountry', width: 80
                                    },
                                    {
                                        text: 'Status', dataIndex: 'stval', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                            const opts = {
                                                'A': 'Match OC/Camepa',
                                                'C': 'Match Complement',
                                                'D': 'Match Balance',
                                                'E': 'Duplicate Payment',
                                                'M': 'Match Multi-Payment',
                                                '0': 'Stand By',
                                                '1': 'Match',
                                                '2': 'Sales Without Settl.',
                                                '3': 'Settl. Without Sales',
                                                '4': 'Match Partial',
                                                '5': 'Match Manual',
                                                '6': 'Match Forced',
                                                '7': 'Match Compensation',
                                                '8': 'Match Transactional',
                                                '9': 'Match Void'
                                            };
                                            return opts[value] || '';
                                        }
                                    },
                                    {
                                        text: 'Qty', dataIndex: 'qtrn', width: 80,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            return '<b>' + value + '<b>';
                                        }
                                    }
                                ]
                            },
                            features: [
                                {
                                    ftype: 'summary' // Agrega la característica de resumen al grid
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            title: 'Detail',
                            titleAlign: 'center',
                            id: prototype.idDeProd + '-gridDetail2',
                            hidden: true,
                            minHeight: 180,
                            maxHeight: 200,
                            flex: 1,
                            margin: '5 5 5 5',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Fop Type', dataIndex: 'a4501TFOP', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            const opts = {
                                                'CC': 'Credit Card',
                                                'CA': 'Cash'
                                            };
                                            return opts[value] || '';
                                        }
                                    },
                                    {text: 'Processor', dataIndex: 'desc_PROCTYPE', flex: 1},
                                    {
                                        text: 'Card Name', dataIndex: 'desc_TARJ', flex: 1
                                    },
                                    {
                                        text: 'Sale Date', dataIndex: 'a4496FECVT', width: 100
                                    },
                                    {
                                        text: 'Status', dataIndex: 'a4501STVAL', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                            const opts = {
                                                'A': 'Match OC/Camepa',
                                                'C': 'Match Complement',
                                                'D': 'Match Balance',
                                                'E': 'Duplicate Payment',
                                                'M': 'Match Multi-Payment',
                                                '0': 'Stand By',
                                                '1': 'Match',
                                                '2': 'Sales Without Settl.',
                                                '3': 'Settl. Without Sales',
                                                '4': 'Match Partial',
                                                '5': 'Match Manual',
                                                '6': 'Match Forced',
                                                '7': 'Match Compensation',
                                                '8': 'Match Transactional',
                                                '9': 'Match Void'
                                            };
                                            return opts[value] || '';
                                        }
                                    },
                                    {
                                        text: 'Qty', dataIndex: 'qtkt', width: 80,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            return '<b>' + value + '<b>';
                                        }
                                    }
                                ]
                            },
                            features: [
                                {
                                    ftype: 'summary' // Agrega la característica de resumen al grid
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});