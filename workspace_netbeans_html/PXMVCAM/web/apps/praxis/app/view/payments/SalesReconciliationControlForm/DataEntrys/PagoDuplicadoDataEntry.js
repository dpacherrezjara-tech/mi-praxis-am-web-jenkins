prototype.idDE6 = prototype.id + '-formPagoDuplicado';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.PagoDuplicadoDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.PagoDuplicadoDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.PagoDuplicadoDataEntryController'
    ],
    controller: 'PagoDuplicadoDataEntryController',
    title: 'Duplicate Payment - Form',
    header: true,
    width: 1250,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    defaults: {
        border: false,
        width: '100%'
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.idDE6 + '-viewOption',
                            columns: 2, 
                            vertical: false, 
                            defaults: {
                                margin: '0 5 0 5'
                            },
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Duplicated</b>', name: 'opcion', inputValue: 'D',checked: true, width: 90},
                                {boxLabel: '<b style="color:#148D28;">Multi-Payment</b>', name: 'opcion', inputValue: 'M',  width: 120, readOnly:true}
                            ],
                            listeners: {
                                change: 'onChangeOption'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    align: 'center',
                    width: '100%',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            border: false,
                            title: 'Ticket',
                            id: prototype.idDE6 + '-gridTicket',
                            columnLines: true,
                            autoScroll: true,
                            minHeight: 130,
                            height: 'auto',
                            maxHeight: 400,
                            width: '100%',
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                    {text: 'IATA', dataIndex: 'SAGENT', width: 100},
                                    {text: 'Agent<br>Code', dataIndex: 'CODAG', width: 100},
                                    {text: 'Doc.<br>Type', dataIndex: 'TRNCU', width: 60},
                                    {text: 'Ticket Number', dataIndex: 'TICKET', width: 130},
                                    {text: 'Seq', dataIndex: 'SEQ', width: 50},
                                    {text: 'Corrl', dataIndex: 'CORRL', width: 60},
                                    {text: 'Pax Name', dataIndex: 'PAXNAME', width: 200},
                                    {text: 'PNR', dataIndex: 'SPNR', width: 80},
                                    {text: 'RFIC', dataIndex: 'RFIC', width: 60},
                                    {text: 'RFIS', dataIndex: 'RFIS', width: 60},
                                    {text: 'Void', dataIndex: 'FVOID', width: 60},
                                    {text: 'Card Number', dataIndex: 'SCARDN', width: 180},
                                    {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 60},
                                    {text: 'Amount', dataIndex: 'SVFOPS', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Curr', dataIndex: 'SCURRENCY', width: 60},
                                    {text: 'Rolling', dataIndex: 'SEQROLL', width: 70}
                                ]
                            }

                        }
                    ]
                },
                {
                    xtype: 'form',
                    hidden: true,
                    id: prototype.idDE6 + '-liquiParams',
                    width: '100%',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:right;font-weight: bolder;',
                        fieldStyle: 'text-align:center;'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Processing Date',
                            name: 'IN_PRDA',
                            labelWidth: 120,
                            width: 200,
                            format: 'Ymd',
                            editable: true,
                            value: new Date()
                        },
                        {
                            name: 'IN_CARD6',
                            fieldLabel: 'C. Card',
                            labelWidth: 80,
                            width: 160,
                            maxLength: 6,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'label',
                            text: '*****(*)'
                        },
                        {
                            width: 50,
                            name: 'IN_CARD4',
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            fieldLabel: 'Auth',
                            name: 'IN_SAUTHOC',
                            labelWidth: 45,
                            width: 115,
                            maxLength: 6,
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z0-9]/
                        },
                        {
                            xtype: 'button',
                            width: 30,
                            iconCls: 'prx-icon-add',
                            tooltip: 'Add',
                            listeners: {
                                click: 'onAddSettlement'
                            }

                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    id: prototype.idDE6 + '-tabLiquis',
                    width: '100%',
                    height: 'auto',
                    border: false,
                    margin: '0 1 0 1',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        height: 'auto',
                        autoScroll: false,
                        layout: 'fit'
                    },
                    items: [
                        {
                            title: 'Pending Load',
                            itemId: 'P',
                            id: prototype.idDE6 + '-tabPending',
                            items: [
                                {
                                    xtype: 'grid',
                                    margin: '5 0 5 0',
                                    minHeight: 100,
                                    viewConfig: {
                                        stripeRows: false,
                                        enableTextSelection: true,
                                        markDirty: true
                                    },
                                    border: true,
                                    columnLines: true,
                                    id: prototype.idDE6 + '-gridLiqPend',
                                    width: '100%',
                                    maxHeight: 300,
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80},
                                            {text: 'PNR', dataIndex: 'SPNR', width: 70},
                                            {text: 'Doc.<br>Type', dataIndex: 'TRANSTYPE', width: 60},
                                            {text: 'Error Description', dataIndex: 'DES_CERROR', width: 180,
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    const info = record.data;
                                                    if (info.DES_CERROR) {
                                                        metaData.tdAttr = 'data-qtip="' + info.DES_CERROR + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Adju. Description', dataIndex: 'DES_CODADJU', width: 180,
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    const info = record.data;
                                                    if (info.DES_CODADJU) {
                                                        metaData.tdAttr = 'data-qtip="' + info.DES_CODADJU + '"';
                                                    }
                                                    return value;
                                                }},
                                            {text: 'Payment<br>Merchant ID', dataIndex: 'PMERCHID', width: 110},
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                                    const opts = {
                                                        '0': 'Stand By',
                                                        '1': 'Match',
                                                        '2': 'Sales Without Settl.',
                                                        '3': 'Settl. Without Sales',
                                                        '4': 'Match Parcial',
                                                        '5': 'Match Manual',
                                                        '6': 'Match Forzado',
                                                        '7': 'Match por Compensacion',
                                                        '8': 'Match Transaccional',
                                                        '9': 'Match Void',
                                                        'D': 'Match Duplicated'
                                                    };
                                                    return opts[value] || '';
                                                }
                                            },
                                            {
                                                text: 'Installment', width: 120,
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                        metaData.style = "text-align:center;background-color:#F0D094;";
                                                        return value;
                                                    }
                                                },
                                                columns: [
                                                    {text: 'Plan', dataIndex: 'NBRINSTA', width: 60},
                                                    {text: 'Number', dataIndex: 'INSTANBR', width: 60}
                                                ]
                                            },
                                            {
                                                text: 'Card Number', dataIndex: 'SCARDN', width: 130
                                            },
                                            {
                                                text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 75
                                            },
                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60},
                                            {
                                                text: 'Transac.<br>Amount', dataIndex: 'TGROSAMOUN', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                hidden: true,
                                                width: 40,
                                                text: 'Del.',
                                                id: prototype.idDE6 + '-gridLiqDelete',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-image-trash',
                                                        tooltip: 'Delete',
                                                        handler: 'onDeleteRecordLiq'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            title: 'Loaded',
                            itemId: 'C',
                            id: prototype.idDE6 + '-tabConcil',
                            items: [
                                {
                                    xtype: 'grid',
                                    margin: '5 0 5 0',
                                    minHeight: 100,
                                    viewConfig: {
                                        stripeRows: false,
                                        enableTextSelection: true,
                                        markDirty: true
                                    },
                                    border: true,
                                    columnLines: true,
                                    id: prototype.idDE6 + '-gridLiqConc',
                                    width: '100%',
                                    maxHeight: 300,
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80},
                                            {text: 'PNR', dataIndex: 'SPNR', width: 70},
                                            {text: 'Doc.<br>Type', dataIndex: 'TRANSTYPE', width: 60},
                                            {text: 'Error Description', dataIndex: 'des_CERROR', width: 180,
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    const info = record.data;
                                                    if (info.DES_CERROR) {
                                                        metaData.tdAttr = 'data-qtip="' + info.DES_CERROR + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Adju. Description', dataIndex: 'DES_CODADJU', width: 180,
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    const info = record.data;
                                                    if (info.DES_CODADJU) {
                                                        metaData.tdAttr = 'data-qtip="' + info.DES_CODADJU + '"';
                                                    }
                                                    return value;
                                                }},
                                            {text: 'Payment<br>Merchant ID', dataIndex: 'PMERCHID', width: 110},
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                                    const opts = {
                                                        '0': 'Stand By',
                                                        '1': 'Match',
                                                        '2': 'Sales Without Settl.',
                                                        '3': 'Settl. Without Sales',
                                                        '4': 'Match Parcial',
                                                        '5': 'Match Manual',
                                                        '6': 'Match Forzado',
                                                        '7': 'Match por Compensacion',
                                                        '8': 'Match Transaccional',
                                                        '9': 'Match Void'
                                                    };
                                                    return opts[value] || '';
                                                }
                                            },
                                            {
                                                text: 'Installment', width: 120,
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                        metaData.style = "text-align:center;background-color:#F0D094;";
                                                        return value;
                                                    }
                                                },
                                                columns: [
                                                    {text: 'Plan', dataIndex: 'NBRINSTA', width: 60},
                                                    {text: 'Number', dataIndex: 'INSTANBR', width: 60}
                                                ]
                                            },
                                            {
                                                text: 'Card Number', dataIndex: 'SCARDN', width: 130
                                            },
                                            {
                                                text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 75
                                            },
                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60},
                                            {
                                                text: 'Transac.<br>Amount', dataIndex: 'TGROSAMOUN', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Reconcile',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onConciliateClick'
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