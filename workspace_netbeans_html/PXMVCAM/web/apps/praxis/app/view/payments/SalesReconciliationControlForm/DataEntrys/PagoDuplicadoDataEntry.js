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
                    layout: 'hbox',
                    align: 'center',
                    width: '100%',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            border: false,
                            title: 'Current Settlement',
                            id: prototype.idDE6 + '-gridLiq',
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
                                    {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                                    {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                                    {text: 'PNR', dataIndex: 'spnr', width: 70},
                                    {text: 'Doc.<br>Type', dataIndex: 'transtype', width: 60},
                                    {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 110},
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
                                            {text: 'Plan', dataIndex: 'nbrinsta', width: 60},
                                            {text: 'Number', dataIndex: 'instanbr', width: 60}
                                        ]
                                    },
                                    {
                                        text: 'Card Number', dataIndex: 'scardn', width: 130
                                    },
                                    {
                                        text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 75
                                    },
                                    {text: 'Curr', dataIndex: 'scurrency', width: 60},
                                    {
                                        text: 'Transac.<br>Amount', dataIndex: 'tgrosamoun', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sales<br>Amount', dataIndex: 'svfops', width: 120,
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
                                    selModel: {
                                        selType: 'checkboxmodel',
                                        mode: 'SINGLE' // o 'SINGLE' si solo quieres una selección a la vez
                                    },
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
                                            {text: 'Payment<br>Merchant ID', dataIndex: 'PMERCHID', width: 110},
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 120,
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