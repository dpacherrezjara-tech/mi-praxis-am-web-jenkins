prototype.idEAD = prototype.id + '-ErrorAccountingDetailDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ErrorAccountingDetailDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ErrorAccountingDetailDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.ErrorAccountingDetailDataEntryController'
    ],
    controller: 'ErrorAccountingDetailDataEntryController',
    title: 'Error Accounting Detail',
    header: true,
    width: 1400,
    height: 800,
    maxHeight: 800,
    resizable: false,
    scrollable: true,
    layout: 'fit',
    modal: true,
    border: false,
    bodyStyle: 'background-color: white !important;',

    listeners: {
        afterrender: 'afterRender'
    },

    tbar: {
        layout: {
            pack: 'end'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export active tab to Excel',
                listeners: {
                    click: 'onDownloadExcelActiveTab'
                }
            }
        ]
    },

    items: [
        {
            xtype: 'panel',
            id: prototype.idEAD + '-tabMain',
            border: false,
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Accounting Detail',
                    itemId: 'accounting',
                    id: prototype.idEAD + '-tabAccounting',
                    layout: 'fit',
                    border: false,
                    flex: 3,
                    minHeight: 350,
                    collapsible: true,
                    collapsed: false,
                    listeners: {
                        expand: 'onSectionExpand'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idEAD + '-gridAccounting',
                            border: false,
                            style: 'background: white',
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true,
                                markDirty: false,
                                listeners: {
                                    refresh: function (dataview) {
                                        Ext.each(dataview.panel.columns, function (column) {
                                            if (column.autoSizeColumn === true) {
                                                column.autoSize();
                                            }
                                        });
                                    }
                                }
                            },
                            columnLines: true,
                            features: [{
                                ftype: 'summary',
                                dock: 'bottom'
                            }],
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {
                                        text: 'RN',
                                        dataIndex: 'RN',
                                        xtype: 'rownumberer',
                                        width: 40
                                    },
                                    {
                                        text: 'Ticket',
                                        dataIndex: 'TICKET',
                                        width: 110,
                                        renderer: function (value, metaData, record) {
                                            metaData.style = "text-align:center;background-color:#FCF6DC;font-weight:bold;";
                                            return value;
                                        },
                                        summaryType: 'count',
                                        summaryRenderer: function (value/*, summaryData, dataIndex*/) {
                                            return 'Total: ' + value;
                                        }
                                    },
                                    {
                                        text: 'Mode',
                                        dataIndex: 'A4183MODO',
                                        width: 50,
                                        renderer: function (value, metaData, record) {
                                            metaData.style = "text-align:center;";
                                            const raw = (value || record.get('a4183modo') || '').toString().trim();
                                            const opts = {
                                                'S': 'SALE',
                                                'M': 'MEMO',
                                                'J': 'EXCH',
                                                'I': 'TAXC',
                                                'R': 'RFND',
                                                'F': 'FLWN',
                                                'C': 'EXPI',
                                                'L': 'IPAY'
                                            };
                                            return opts[raw] || raw;
                                        }
                                    },
                                    {
                                        text: 'SRC',
                                        dataIndex: 'A4183FUENT',
                                        width: 45
                                    },
                                    {
                                        text: 'Sub <br> SRC',
                                        dataIndex: 'A4183SUBFU',
                                        width: 45
                                    },
                                    {
                                        text: 'FOP',
                                        dataIndex: 'A4183FP',
                                        width: 45
                                    },
                                    {
                                        text: 'CPN',
                                        dataIndex: 'A4183CUPON',
                                        width: 50
                                    },
                                    {
                                        text: 'SEQ',
                                        dataIndex: 'A4183SEQ',
                                        width: 50
                                    },
                                    {
                                        text: 'Accounting Settlement',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date',
                                                dataIndex: 'A4183FFILE',
                                                width: 80
                                            },
                                            {
                                                text: 'Period',
                                                dataIndex: 'A4183FCONT',
                                                width: 80
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Account Number',
                                        dataIndex: 'ACCOUNT',
                                        width: 240,
                                    },
                                    {
                                        text: 'Local Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency',
                                                dataIndex: 'A4183CUR',
                                                width: 70,
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;background-color:#c0f0af;font-weight:bold;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Debit',
                                                dataIndex: 'A4183ACTIV',
                                                width: 80,
                                                summaryType: 'sum',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                    return Ext.util.Format.number(value || 0, '0,000.00');
                                                },
                                                summaryRenderer: function (value) {
                                                    // Forzamos a que si es nulo, sea 0 para que el formateador no falle
                                                    return Ext.util.Format.number(value || 0, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Credit',
                                                dataIndex: 'A4183PASIV',
                                                width: 80,
                                                renderer: function (value, metaData, record) {
                                                    const val = value != null ? value : record.get('A4183PASIV');
                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                    return Ext.util.Format.number(val || 0, '0,000.00');
                                                },
                                                summaryType: 'sum',
                                                summaryRenderer: function (value) {
                                                    return Ext.util.Format.number(value || 0, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Concept',
                                        width: 300,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code',
                                                dataIndex: 'A4183ORIG',
                                                width: 60
                                            },
                                            {
                                                text: 'Description',
                                                dataIndex: 'A4183TITU',
                                                width: 240,
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:left;";
                                                    const val = value || record.get('A4183TITU') || '';
                                                    if (val && val.length > 80) {
                                                        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(val) + '"';
                                                        return val.substring(0, 80) + '...';
                                                    }
                                                    return val;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Client',
                                        dataIndex: 'A4183CLIEN',
                                        width: 70
                                    },
                                    {
                                        text: 'Provider',
                                        dataIndex: 'A4183PROV',
                                        width: 70
                                    },
                                    {
                                        text: 'Praxis ID',
                                        dataIndex: 'A4183IDCON',
                                        width: 280,
                                        renderer: function (value, metaData, record) {
                                            metaData.style = "text-align:left;";
                                            const val = value || record.get('A4183IDCON') || '';
                                            if (val && val.length > 80) {
                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(val) + '"';
                                                return val.substring(0, 80) + '...';
                                            }
                                            return val;
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Settlement Detail',
                    itemId: 'settlement',
                    id: prototype.idEAD + '-tabSettlementDetail',
                    layout: 'fit',
                    border: false,
                    flex: 1,
                    collapsible: true,
                    collapsed: false,
                    listeners: {
                        expand: 'onSectionExpand'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idEAD + '-gridSettlementDetail',
                            border: false,
                            style: 'background: white',
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true
                            },
                            columnLines: true,
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
                                    { text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100 },
                                    { text: 'Processor', dataIndex: 'PROCESSOR_DESCRIPTION', width: 100 },
                                    { 
                                        text: 'Status', 
                                        dataIndex: 'STATUS_DESCRIPTION',
                                        width: 100,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                            return value;
                                        }
                                    },
                                    { text: 'Document<br>Type', dataIndex: 'TRANSTYPE', width: 90 },
                                    { text: 'Ref. Number', dataIndex: 'AREFNBR', width: 150 },
                                    {
                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#c0f0af";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Transaction<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sale<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Diff.<br>Amount', dataIndex: 'DIFFERENCE', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Commision',
                                        width: 140,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'REG', dataIndex: 'DISCAMOUN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'VAT', dataIndex: 'DISCAMOUNI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Neto', dataIndex: 'NETOPAY', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#c0f0af";
                                            return value;
                                        }
                                    },
                                    { text: 'Ticket', dataIndex: 'TICKET', width: 120 },
                                    { text: 'PNR', dataIndex: 'SPNR', width: 90 },
                                    {
                                        text: 'Credit Card',
                                        width: 180,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            { text: 'Number', dataIndex: 'SCARDN', width: 120},
                                            { text: 'Auth', dataIndex: 'SAUTHOC', width: 60},
                                        ]
                                    },
                                    {
                                        text: 'Accounting',
                                        width: 320,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            { text: 'Status', dataIndex: 'ACCOUNTING_DESCRIPTION', width: 80},
                                            { text: 'Date', dataIndex: 'FCONTL', width: 80},
                                            { 
                                                text: 'ID', 
                                                dataIndex: 'IDCONL', 
                                                width: 160,
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:left;";
                                                    const val = value || record.get('IDCONL') || '';
                                                    if (val && val.length > 40) {
                                                        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(val) + '"';
                                                        return val.substring(0, 40) + '...';
                                                    }
                                                    return val;
                                                }
                                            }
                                        ]
                                    },
                                    
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Settlement Desglose',
                    itemId: 'settlementDesglose',
                    id: prototype.idEAD + '-tabSettlementDesglose',
                    layout: 'fit',
                    border: false,
                    flex: 1,
                    collapsible: true,
                    collapsed: false,
                    listeners: {
                        expand: 'onSectionExpand'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idEAD + '-gridSettlementDesglose',
                            border: false,
                            style: 'background: white',
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true
                            },
                            columnLines: true,
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
                                        text: 'Src', dataIndex: 'FUENTE', width: 45,
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
                                                text: 'Number', dataIndex: 'SCARDN', width: 130
                                            },
                                            {
                                                text: 'Auth', dataIndex: 'SAUTHOC', width: 55
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'SVFOPS', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Commision',
                                        width: 280,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'MSI', dataIndex: 'ACCEAMOU', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'IVA', dataIndex: 'IVACOM12', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'REG', dataIndex: 'DISCAMOUNC', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'VAT', dataIndex: 'DISCAMOUNI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Neto', dataIndex: 'IMPORI', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    { text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80 },
                                    { text: 'PNR', dataIndex: 'SPNR', width: 70 },
                                    {
                                        text: 'Ticket', 
                                        dataIndex: 'TICKET',
                                        width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    { text: 'Seq', dataIndex: 'SEQ', width: 45 },
                                    { text: 'Corrl', width: 45, dataIndex: 'CORRL' },
                                    { text: 'Void', width: 40, dataIndex: 'FVOID' },
                                    { text: 'Iata', dataIndex: 'SAGENT', width: 80 },
                                    { text: 'Current<br>Balance', dataIndex: 'EXISTS_BALANCE', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value === 1 ) {
                                                metaData.tdAttr = 'data-qtip="Selected"';
                                                return '<img src="resources/img/botones/back.png"/>';
                                            }
                                            return null;
                                        }
                                    },
                                    { 
                                        text: 'Flex Id',
                                        dataIndex: 'IDCON',
                                        width: 160,
                                        renderer: function (value, metaData, record) {
                                            metaData.style = "text-align:left;";
                                            const val = value || record.get('IDCON') || '';
                                            if (val && val.length > 40) {
                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(val) + '"';
                                                return val.substring(0, 40) + '...';
                                            }
                                            return val;
                                        }
                                    },
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Complement Detail',
                    itemId: 'complement',
                    id: prototype.idEAD + '-tabComplementDetail',
                    layout: 'fit',
                    border: false,
                    flex: 1,
                    collapsible: true,
                    collapsed: false,
                    listeners: {
                        expand: 'onSectionExpand'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idEAD + '-gridComplementDetail',
                            border: false,
                            style: 'background: white',
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true
                            },
                            columnLines: true,
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
                                    { text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80 },
                                    { text: 'Plusgrade<br>ID', dataIndex: 'PLUSGRAID', width: 120 },
                                    { text: 'Ref. Number', dataIndex: 'AREFNBR', width: 150 },
                                    { text: 'EMD Number', dataIndex: 'EMDNUMBER', width: 140 },
                                    { text: 'PNR', dataIndex: 'PNR', width: 90 },
                                    { text: 'Currency', dataIndex: 'CUROFFER', width: 80 },
                                    {
                                        text: 'Total<br>Amount',
                                        dataIndex: 'SVFOP',
                                        width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            return Ext.util.Format.number(value || 0, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Total<br>Amount Off', dataIndex: 'AMOUNTOFF', width: 80,
                                        tooltip: 'Monto Total de linea agrupada',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Amount<br>EMD', dataIndex: 'TOTALEMD', width: 80,
                                        tooltip: 'Monto del EMD',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Sales',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'SVFOPS', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                            {
                                                text: 'Difference', dataIndex: 'DIFF_AMOUNT', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value != 0) {
                                                        metaData.style = "text-align:right;background-color:#f57373";
                                                    } else {
                                                        metaData.style = "text-align:right;";
                                                    }
                        
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 70
                                            },
                                            {
                                                text: 'Date', dataIndex: 'SDATES', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    { text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40 },
                                ]
                            }
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
                    text: 'Close',
                    id: prototype.idEAD + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]
});

