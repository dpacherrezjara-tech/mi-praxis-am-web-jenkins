prototype.idPlus = prototype.id + '-PlusgradeReconciliationDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesComplementForm.DataEntrys.PlusgradeReconciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.PlusgradeDetailDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesComplement.PlusgradeReconciliationController'
    ],
    controller: 'PlusgradeReconciliationController',
    title: 'Plusgrade Reconciliation - Form',
    header: true,
    width: 848,
    maxHeight: 820,
    // maxHeight: 780,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idPlus + '-informationForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            scrollable: true,
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5'
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false,
                        renderer: function (value) {
                            return value.trim();
                        }
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="General Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">General Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Processing Date',
                                    name: 'PRDA',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Merchant ID',
                                    name: 'MERCHID',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Iata',
                                    name: 'SAGENT',
                                    labelWidth: 110,
                                    width: 260
                                },
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Plusgrade ID',
                                    name: 'PLUSGRAID',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'COUNTRY',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Sale Date',
                                    name: 'SDATE',
                                    labelWidth: 110,
                                    width: 260
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Card Code',
                                    dataIndex: 'SCARCOD',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'Card Number',
                                    dataIndex: 'SCARDN',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'Auth Code',
                                    dataIndex: 'SAUTHOC',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'PNR',
                                    name: 'PNR',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'EMD Number',
                                    name: 'EMDNUMBER',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Type',
                                    name: 'UPGRATYPE',
                                    labelWidth: 110,
                                    width: 260
                                }
                            ]
                        }

                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Accounting Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Accounting Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'STCON_DESCRIPTION',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'ID',
                                    labelWidth: 110,
                                    width: 530,
                                    name: 'IDCON'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Date',
                                    name: 'FCONT',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'FLEX ID',
                                    labelWidth: 110,
                                    width: 530,
                                    name: 'IDCONFLE'
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Error Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Error Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Code',
                                    name: 'CERROR',
                                    readOnly: true,
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Description',
                                    name: 'CERROR_DESCRIPTION',
                                    readOnly: true,
                                    labelWidth: 110,
                                    width: 530
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Flag Selection',
                                    name: 'FSELEC_DESCRIPTION',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true,
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Conciliation With Settlement">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Conciliation With Settlement</span>',
                    id: prototype.idPlus + '-fsSaleInfo',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'STATUS_FAMEX',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'Date Match',
                                    name: 'DATE_MATCH_AMEX',
                                    labelWidth: 110,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Ref. Number',
                                    name: 'AREFNBR',
                                    labelWidth: 110,
                                    width: 260
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Conciliation With Sale">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Conciliation With Sale</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    labelWidth: 110,
                                    width: 260,
                                    dataIndex: 'STVAL_DESCRIPTION',
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'Currency',
                                    name: 'CUROFFER',
                                    labelWidth: 110,
                                    readOnly: true,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Transac. Amount',
                                    name: 'SVFOP',
                                    readOnly: true,
                                    labelWidth: 110,
                                    width: 260,
                                    fieldStyle: 'text-align:right;',
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Rule',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true,
                                    dataIndex: 'FREGLA_DESCRIPTION'
                                },
                                {
                                    fieldLabel: 'Qty Tkts',
                                    name: 'QTYTKT',
                                    labelWidth: 110,
                                    readOnly: true,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Sale Amount',
                                    readOnly: true,
                                    labelWidth: 110,
                                    width: 260,
                                    fieldStyle: 'text-align:right;',
                                    dataIndex: 'SVFOP_SUM',
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Sale Date',
                                    name: 'SDATES',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'Date Match',
                                    name: 'DATE_MATCH_SALES',
                                    labelWidth: 110,
                                    width: 260,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: 'Diff. Amount',
                                    name: 'DIFFERENCE_CALCULATE',
                                    readOnly: true,
                                    labelWidth: 110,
                                    width: 260,
                                    fieldStyle: 'text-align:right;',
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Scanner Inputs">
                {
                    xtype: 'fieldset',
                    id: prototype.idPlus + '-scannerInputs',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Scanner</span>',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    collapsible: true,
                    collapsed: true,
                    border: true,
                    width: '100%',
                    style: {
                        backgroundColor: '#efe5e5'
                    },
                    listeners: {
                        'expand': 'onCenterDataEntry',
                        'collapse': 'onCenterDataEntry'
                    },
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.idPlus + '-scannerForm',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            width: '100%',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                xtype: 'panel',
                                width: '100%',
                                bodyStyle: 'background: transparent',
                                border: false,
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '2 5 2 5',
                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;'
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Ticket',
                                            name: 'IN_TICKET',
                                            labelWidth: 60,
                                            width: 155,
                                            maskRe: /[0-9]/,
                                            maxLength: 13,
                                            enforceMaxLength: true,
                                            validator: function (value) {
                                                if (value.length < 13 && value.length !== 0) {
                                                    return 'Invalid Ticket Number';
                                                }
                                                return true;
                                            }
                                        },
                                        {
                                            fieldLabel: 'PNR',
                                            name: 'IN_SPNR',
                                            labelWidth: 40,
                                            width: 120,
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            validator: function (value) {
                                                if (value.length < 6 && value.length !== 0) {
                                                    return 'Invalid PNR';
                                                }
                                                return true;
                                            },
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setValue(newValue.toUpperCase());
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Sale Date',
                                            name: 'IN_SDATE',
                                            labelWidth: 65,
                                            width: 145,
                                            format: 'Ymd',
                                            editable: true,
                                            value: new Date()
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'Add',
                                            listeners: {
                                                click: 'onClickAddTicketsSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clean',
                                            listeners: {
                                                click: 'onClickClearScannerInputs'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Tabs Panel">
                {
                    xtype: 'panel',
                    width: '100%',
                    id: prototype.idPlus + '-panelGrids1',
                    border: false,
                    defaults: {},
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.idPlus + '-tabMain',
                            width: '100%',
                            height: 'auto',
                            border: false,
                            margin: '0 1 0 1',
                            bodyStyle: 'background: transparent',
                            //layout: 'fit',
                            defaults: {
                                //margin: '0 5 0 5',
                                height: 'auto',
                                autoScroll: false,
                                layout: 'fit',
                                defaults: {
                                    width: '100%',
                                    minHeight: 100,
                                    maxHeight: 155,
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    columnLines: true,
                                    autoScroll: true,
                                    height: 'auto'
                                }
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="BPO Tab">
                                {
                                    title: 'Added BPO',
                                    itemId: 'A',
                                    id: prototype.idPlus + '-tabBPO',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idPlus + '-gridBPO',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Del.',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Delete',
                                                                handler: 'onDeleteRecordBPO'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Status', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Pending';
                                                        }
                                                    },
                                                    {
                                                        text: 'Cur.', dataIndex: 'A4501MFOP', width: 45
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'A4501VFOP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'A4501FECVT', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'A4501PNR', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', width: 110, dataIndex: 'TICKET',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Corrl', width: 50, dataIndex: 'A4501CORRL'
                                                    },
                                                    {
                                                        text: 'Pax', dataIndex: 'A4496PAX', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value !== undefined && value !== null) {
                                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Iata', dataIndex: 'A4501AGENT', width: 75
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
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
                                                                text: 'Cod', dataIndex: 'A4501TTARJ', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'A4501NREF', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'A4501CAPL', width: 70
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    bbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        }, // Distribución horizontal
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 2 3 5',
                                            labelStyle: 'text-align:right;font-weight: bolder;',
                                            fieldStyle: 'text-align:right;',
                                            editable: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idPlus + '-totBPOTickets',
                                                fieldLabel: 'Total Tickets',
                                                labelWidth: 110,
                                                submitValue: false,
                                                width: 150,
                                                value: '0',
                                                //reset:false
                                            },
                                            {
                                                id: prototype.idPlus + '-totBPOAmount',
                                                fieldLabel: 'Sum Amount',
                                                labelWidth: 110,
                                                submitValue: false,
                                                width: 180,
                                                value: '0.00',
                                                //reset:false
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-reload',
                                                tooltip: 'Reload Grid',
                                                listeners: {
                                                    click: 'onclickReloadGridSuggestAndBlocked'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-delete',
                                                tooltip: 'Clean Grid',
                                                listeners: {
                                                    click: 'onClickcleanGridBPO'
                                                }
                                            }
                                        ]
                                    }

                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Blocked Tab">
                                {
                                    title: 'Blocked',
                                    itemId: 'B',
                                    id: prototype.idPlus + '-tabBlocked',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idPlus + '-gridBlocked',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Blocked';
                                                        }
                                                    },
                                                    {
                                                        text: 'Cur.', dataIndex: 'A4501MFOP', width: 45
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'A4501VFOP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'A4501FECVT', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'A4501PNR', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', width: 110, dataIndex: 'TICKET',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Corrl', width: 50, dataIndex: 'A4501CORRL'
                                                    },
                                                    {
                                                        text: 'Pax', dataIndex: 'A4496PAX', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value !== undefined && value !== null) {
                                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Iata', dataIndex: 'A4501AGENT', width: 75
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
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
                                                                text: 'Cod', dataIndex: 'A4501TTARJ', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'A4501NREF', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'A4501CAPL', width: 70
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    bbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '98%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        }, // Distribución horizontal
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 2 3 5',
                                            labelStyle: 'text-align:right;font-weight: bolder;',
                                            fieldStyle: 'text-align:right;',
                                            editable: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idPlus + '-totBlockedTickets',
                                                fieldLabel: 'Total Tickets',
                                                labelWidth: 110,
                                                submitValue: false,
                                                width: 150,
                                                value: '0'
                                            },
                                            {
                                                id: prototype.idPlus + '-totBlockedAmount',
                                                fieldLabel: 'Sum Amount',
                                                labelWidth: 110,
                                                submitValue: false,
                                                width: 180,
                                                value: '0.00'
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-reload',
                                                tooltip: 'Reload Grid',
                                                listeners: {
                                                    click: 'onclickReloadGridSuggestAndBlocked'
                                                }
                                            }
                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Match Tab">
                                {
                                    title: 'Match',
                                    itemId: 'M',
                                    id: prototype.idPlus + '-tabMatch',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idPlus + '-gridMatch',
                                            maxHeight: 180,
                                            emptyText: 'No tickets available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Concil.';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'FTE', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const opts = {
                                                                'S': 'ASR',
                                                                'B': 'BSP',
                                                                'M': 'Manual',
                                                                'A': 'ARC'
                                                            };
                                                            return opts[value] || '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'TRNCU', width: 60
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
                                                                text: 'Cod', dataIndex: 'SCARCOD', width: 45
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'SCARDN', width: 110
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'SAUTHOC', width: 55
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'SCURRENCY', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 70
                                                    },
                                                    {
                                                        text: 'Ticket', width: 110, dataIndex: 'TICKET',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Corrl', width: 45, dataIndex: 'CORRL' },
                                                    { text: 'Void', width: 40, dataIndex: 'FVOID' },
                                                    { text: 'Iata', dataIndex: 'SAGENT', width: 75 },
                                                    { text: 'Selected', dataIndex: 'CURRENT_SELECTED', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value === 1 ) {
                                                                metaData.tdAttr = 'data-qtip="Selected"';
                                                                return '<img src="resources/img/botones/back.png"/>';
                                                            }
                                                            return null;
                                                        }
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'panel',
                                                border: false,
                                                width: '98%',
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                }, // Distribución horizontal
                                                defaults: {
                                                    xtype: 'textfield',
                                                    margin: '3 5 3 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:right;',
                                                    editable: false
                                                },
                                                items: [
                                                    {
                                                        id: prototype.idPlus + '-totalMatchTickets',
                                                        fieldLabel: 'Total Tickets',
                                                        submitValue: false,
                                                        labelWidth: 110,
                                                        width: 150,
                                                        value: '0'
                                                    },
                                                    {
                                                        id: prototype.idPlus + '-totalMachAmount',
                                                        fieldLabel: 'Sum Amount',
                                                        submitValue: false,
                                                        labelWidth: 110,
                                                        width: 180,
                                                        value: '0.00'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Group Plusgrade Tab">
                                {
                                    title: 'Group Plusgrade',
                                    itemId: 'T',
                                    id: prototype.idPlus + '-tabGroupPlusgrade',
//                                    hidden: true,
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idPlus + '-gridGroupPlusgrade',
                                            maxHeight: 180,
                                            emptyText: 'No relations settlements',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    { text: 'RN', xtype: 'rownumberer', dataIndex: 'POSITION', width: 40 },
                                                    { text: 'EMD Number', width: 120, dataIndex: 'EMDNUMBER',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Currency', width: 70, dataIndex: 'CUROFFER' },
                                                    {
                                                        text: 'Amount EMD', dataIndex: 'TOTALEMD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sale Amount', dataIndex: 'SVFOPS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Difference', dataIndex: 'DIFF_AMOUNT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    { text: 'PNR', dataIndex: 'PNR', width: 70 },
                                                    { text: 'Status', dataIndex: 'STVAL_DESCRIPTION', width: 120 },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            { text: 'Code', dataIndex: 'SCARCOD', width: 50 },
                                                            { text: 'Number', dataIndex: 'SCARDN', width: 120 },
                                                            { text: 'Auth', dataIndex: 'SAUTHOC', width: 60 }
                                                        ]
                                                    },
                                                    { text: 'Selected', dataIndex: 'CURRENT_SELECTED', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value === 1 ) {
                                                                metaData.tdAttr = 'data-qtip="Selected"';
                                                                return '<img src="resources/img/botones/back.png"/>';
                                                            }
                                                            return null;
                                                        }
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'panel',
                                                border: false,
                                                width: '98%',
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                }, // Distribución horizontal
                                                defaults: {
                                                    xtype: 'textfield',
                                                    margin: '3 5 3 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:right;',
                                                    editable: false
                                                },
                                                items: [
                                                    {
                                                        id: prototype.idPlus + '-totGroupPlusgradeTickets',
                                                        fieldLabel: 'Total Tickets',
                                                        submitValue: false,
                                                        labelWidth: 110,
                                                        width: 150,
                                                        value: '0'
                                                    },
                                                    {
                                                        id: prototype.idPlus + '-totGroupPlusgradeAmount',
                                                        fieldLabel: 'Sum Amount',
                                                        submitValue: false,
                                                        labelWidth: 110,
                                                        width: 180,
                                                        value: '0.00'
                                                    }
                                                ]
                                            }
                                        }
                                        
                                    ]
                                }
                                //</editor-fold>
                            ]
                        },
                    ]
                },
                //</editor-fold>
                
                //<editor-fold defaultstate="collapsed" desc="Control Data">
                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: true,
                    margin: '5 5 5 5',
                    style: {
                        backgroundColor: 'white'
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {labelWidth: 90, width: 180, fieldLabel: 'User Create', name: 'USCR'},
                                {labelWidth: 90, width: 180, fieldLabel: 'Date Create', name: 'FECR'},
                                {labelWidth: 90, width: 180, fieldLabel: 'Hour Create', name: 'HOCR'}
                            ]
                        },
                        {
                            items: [
                                {labelWidth: 90, width: 180, fieldLabel: 'User Update', name: 'USUP'},
                                {labelWidth: 90, width: 180, fieldLabel: 'Date Update', name: 'FEUP'},
                                {labelWidth: 90, width: 180, fieldLabel: 'Hour Update', name: 'HOUP'}
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0', 
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                
                {
                    text: 'Update',
                    id: prototype.idPlus + '-btnUpdate',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onClickUpdate'
                    }
                },
                {
                    text: 'Reverse Match',
                    // hidden: true,
                    id: prototype.idPlus + '-btnReverse',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onClickReverseMatch'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idPlus + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
