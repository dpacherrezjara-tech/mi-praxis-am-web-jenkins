prototype.idDE4 = prototype.id + '-ManualBatchDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ManualBatchDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ManualBatchDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ManualBatchDataEntryController'
    ],
    controller: 'ManualBatchDataEntryController',
    title: 'Manual Batch - Form',
    header: true,
    width: 1500,
    resizable: false,
    layout: 'fit',
    modal: false,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'panel',
            width: '100%',
            border: false,
            margin: 3,
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
                    id: prototype.idDE4 + '-formFilters',
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
                            xtype: 'datefield',
                            name: 'IN_PRDA',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 50,
                            width: 150,
                            value: new Date()
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Doc. Type',
                            name: 'IN_TRANSTYPE',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['SALE', 'Sale'],
                                    ['RFND', 'Refund']
                                ]
                            }),
                            labelWidth: 80,
                            width: 200,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'SALE'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDE4 + '-cmbProctype',
                            name: 'IN_PROCTYPE',
                            hidden: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDE4 + '-cmbProctypesq',
                            name: 'IN_PROCTYPESQ',
                            labelWidth: 70,
                            width: 250,
                            valueField: 'a4451key2',
                            displayField: 'a4451desc1',
                            fieldLabel: 'Processor',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            caseSensitive: false,
                            autoSelect: true,
                            labelAlign: 'right',
                            typeAhead: true,
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            //store: [],
                            value: '',
                            listeners: {
                                change: 'onChangeProctypesq'
                            }

                        },
                        {
                            xtype: 'button',
                            id: prototype.idDE4 + '-btnSearch',
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
                            id: prototype.idDE4 + '-btnProcess',
                            height: 25,
                            width: 25,
                            margin: '4 4 4 4',
                            iconCls: 'prx-icon-reload',
                            tooltip: 'Process',
                            listeners: {
                                click: 'onProcessAdjuBtn'
                            }
                        }
                    ]
                },
                //</editor-fold>,
                //<editor-fold defaultstate="collapsed" desc="Grilla">
                {
                    xtype: 'grid',
                    defaults: {},
                    width: '99%',
                    minHeight: 165,
                    maxHeight: 560,
                    margin: '5 8 5 8',
                    border: false,
                    id: prototype.idDE4 + '-gridBatch',
                    emptyText: 'No transactions available',
                    store: [],
                    selModel: {
                        type: 'checkboxmodel',
                        checkboxSelect: false,
                        checkOnly: true
                    },
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
                                locked: true,
                                xtype: 'rownumberer', // Columna de número de fila
                                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 40,
                                text: 'Edit',
                                locked: true,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-detail',
                                        tooltip: 'Open Detail',
                                        handler: 'onClickBPO'
                                    }
                                ]
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 50,
                                text: 'Match',
                                locked: true,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-update',
                                        tooltip: 'Match Transaction',
                                        handler: 'onMatchTransaction'
                                    }
                                ]
                            },
                            {
                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80
                            },
                            {
                                text: 'Doc. Type', dataIndex: 'TRANSTYPE', width: 80
                            },
                            {
                                text: 'Status<br>Settl. VS Sales', dataIndex: 'STVAL', width: 150, autoSizeColumn: true,
                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                    const opts = {
                                        'A': 'Match OC/Camepa',
                                        'C': 'Match Complement',
                                        'D': 'Match Balance',
                                        'E': 'Match Duplicate Payment',
                                        'M': 'Match Multi-Payment',
                                        '0': 'Stand By',
                                        '1': 'Match',
                                        '2': 'Sales Without Settl.',
                                        '3': 'Settl. Without Sales',
                                        '4': 'Match Partial',
                                        '5': 'Match Manual',
                                        '6': 'Match Forced',
                                        '7': 'Match  for Compensation',
                                        '8': 'Match Transactional',
                                        '9': 'Match Void'
                                    };
                                    return opts[value] || '';
                                }
                            },
                            {
                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80
                            },
                            {
                                text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80
                            },
                            {
                                text: 'Sale<br>Merchant ID', width: 120, dataIndex: 'SMERCHID'
                            },

                            {
                                text: 'Void', width: 40, dataIndex: 'FVOID'
                            },
                            {
                                text: 'Credit Card',
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'SCARDN', width: 150
                                    },
                                    {
                                        text: 'Auth', dataIndex: 'SAUTHOC', width: 70
                                    }
                                ]
                            },
                            {
                                text: 'PNR', dataIndex: 'SPNR', width: 70
                            },
                            {
                                text: 'Ticket', width: 120, dataIndex: 'TICKET'
                            },
                            {
                                text: 'Transaction<br>Amount', dataIndex: 'TGROSAMOUN', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: 'Curr', dataIndex: 'SCURRENCY', width: 50,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#c0f0af;";
                                    return value;
                                }
                            },

                            {
                                text: 'Conciliation Info',
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;background-color:#B2DAFA";
                                        return value;
                                    }
                                },
                                columns: [
                                    {
                                        text: 'PNR<br>Found', dataIndex: 'PPNR', width: 70
                                    },
                                    {
                                        text: 'Card<br>Found', dataIndex: 'PCARDN', width: 150
                                    },
                                    {
                                        text: 'Auth<br>Found', dataIndex: 'PAUTHOC', width: 70
                                    },
                                    {
                                        text: 'Sale Amount', dataIndex: 'SVFOPS', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Adjustment', dataIndex: 'ADJU', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Adjustment<br>USD', dataIndex: 'ADJU_USD', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Exch<br>Type', dataIndex: 'EXCHRATE', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Status<br>PNR', width: 50,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const {SPNR, PPNR} = record.data;
                                    if (SPNR.trim() === PPNR.trim()) {
                                        return '<img src="resources/img/icon/16x16/check.png"/>';
                                    } else {
                                        return '<img src="resources/img/icon/delete.png"/>';
                                    }
                                }
                            },
                            {text: 'Status<br>Auth', width: 50,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const {SAUTHOC, PAUTHOC} = record.data;
                                    if (SAUTHOC.trim() === PAUTHOC.trim()) {
                                        return '<img src="resources/img/icon/16x16/check.png"/>';
                                    } else {
                                        return '<img src="resources/img/icon/delete.png"/>';
                                    }
                                }
                            }
                        ]
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            border: false,
                            margin: '3 5 3 5',
                            layout: {
                                pack: 'end'
                            },
                            fieldStyle: 'text-align:center',
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
                                {
                                    text: 'Update All',
                                    iconCls: 'prx-icon-update',
                                    listeners: {
                                        click: 'onUpdateAll'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>

            ]
        }
    ]
});