prototype.idCN = prototype.id + '-ConsistencyDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ConsistencyDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ConsistencyDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.ConsistencyController'
    ],
    controller: 'ConsistencyController',
    title: 'Consistency Analysis',
    header: true,
    width: 1380,
    height: 700,
    maxHeight: 700,
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
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'form',
                id: prototype.idCN + '-filtersForm',
                layout: {
                    type: 'hbox',
                    pack: 'start'
                },
                border: false,
                bodyStyle: 'background: transparent',
                padding: '5 5 5 5',
                defaults: {
                    margin: '2 5 2 5',
                    labelStyle: 'text-align:right;font-weight: bolder;',
                    fieldStyle: 'text-align:center;',
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'IN_CCUST',
                        value: '139'
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Type Date',
                        name: 'IN_TYPE_DATE',
                        id: prototype.idCN + '-filterTypeDate',
                        labelWidth: 80,
                        width: 200,
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['PD', 'Processing Date'],
                                ['RD', 'Range Date']
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: 'PD',
                        listeners: {
                            change: 'onFilterTypeDateChange'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date From',
                        name: 'IN_DATE_FROM',
                        id: prototype.idCN + '-filterDateFrom',
                        format: 'Ymd',
                        labelWidth: 80,
                        width: 160,
                        value: new Date(),
                        editable: false,
                        listeners: {
                            change: 'onChangeDate'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date To',
                        name: 'IN_DATE_TO',
                        id: prototype.idCN + '-filterDateTo',
                        format: 'Ymd',
                        labelWidth: 60,
                        width: 140,
                        value: new Date(),
                        editable: false,
                        listeners: {
                            change: 'onChangeDate'
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Type',
                        name: 'IN_TYPE_INSUME',
                        id: prototype.idCN + '-filterType',
                        labelWidth: 50,
                        width: 150,
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['ALL', 'All'],
                                ['SETTLEMENT', 'Settlements'],
                                ['COMPLEMENT', 'Complements']
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: 'ALL',
                        listeners: {
                            change: 'onFilterTypeInsumChange'
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Processor',
                        name: 'IN_PROCESSOR',
                        id: prototype.idCN + '-filterProcessor',
                        labelWidth: 80,
                        width: 200,
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['CODE', 'DESCRIPTION'],
                            data: [
                                ['ALL', 'All'],
                            ]
                        }),
                        displayField: 'DESCRIPTION',
                        valueField: 'CODE',
                        queryMode: 'local',
                        editable: false,
                        value: 'ALL'
                    },
                    {
                        xtype: 'button',
                        tooltip: 'Search',
                        iconCls: 'prx-icon-search',
                        listeners: {
                            click: 'onClickSearch'
                        }
                    },
                    {
                        xtype: 'button',
                        tooltip: 'Clear',
                        iconCls: 'prx-icon-clear',
                        listeners: {
                            click: 'onClickClear'
                        }
                    }
                ]
            }
        ]
    },

    items: [
        {
            xtype: 'tabpanel',
            id: prototype.idCN + '-tabMain',
            border: false,
            flex: 1,
            items: [
                {
                    title: 'Settlements',
                    itemId: 'settlements',
                    id: prototype.idCN + '-tabSettlements',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idCN + '-gridSettlements',
                            border: false,
                            style: 'background: white',
                            tbar: [
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-excel',
                                    scale: 'small',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onDownloadSettlements'
                                    }
                                }
                            ],
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true
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
                                        dataIndex: 'RN',
                                        xtype: 'rownumberer',
                                        width: 40
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        text: 'Detail',
                                        locked: true,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Open Settlements Detail',
                                                handler: 'onClickDetailSettlements'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Processing<br>Date',
                                        dataIndex: 'PRDA',
                                        width: 100
                                    },
                                    {
                                        text: 'Document<br>Type',
                                        dataIndex: 'TDOC',
                                        width: 100,
                                        hidden: true
                                    },
                                    {
                                        text: 'Ref. Number',
                                        dataIndex: 'AREFNBR',
                                        width: 150,
                                        renderer: function (value, metaData) {
                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                            return value || '';
                                        }
                                    },
                                    {
                                        text: 'Amount',
                                        dataIndex: 'AMOUNT',
                                        width: 120,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                            return Ext.util.Format.number(value || 0, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Sale<br>Amount',
                                        dataIndex: 'SALE_AMOUNT',
                                        width: 120,
                                        renderer: function (value, metaData) {
                                            return Ext.util.Format.number(value || 0, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Processor',
                                        dataIndex: 'PROCESSOR',
                                        width: 150
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'STATUS_DESCRIPTION',
                                        width: 100,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;font-weight:bold;background-color:#90EE90;color:#000;";
                                            return value || '';
                                        }
                                    },
                                    {
                                        text: 'Error<br>Code',
                                        dataIndex: 'CERROR',
                                        width: 80
                                    },
                                    {
                                        text: 'Error<br>Description',
                                        dataIndex: 'DERROR',
                                        flex: 1,
                                        minWidth: 200,
                                        renderer: function (value, metaData) {
                                            if (value && value.length > 50) {
                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                                return value.substring(0, 50) + '...';
                                            }
                                            return value || '';
                                        }
                                    }

                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'Complements',
                    itemId: 'complements',
                    id: prototype.idCN + '-tabComplements',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idCN + '-gridComplements',
                            border: false,
                            style: 'background: white',
                            tbar: [
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-excel',
                                    scale: 'small',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onDownloadComplements'
                                    }
                                }
                            ],
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true
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
                                        dataIndex: 'RN',
                                        xtype: 'rownumberer',
                                        width: 40
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        text: 'Detail',
                                        locked: true,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Open Complements Detail',
                                                handler: 'onClickDetailComplements'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Processing<br>Date',
                                        dataIndex: 'PRDA',
                                        width: 100
                                    },
                                    {
                                        text: 'Plusgrade ID',
                                        dataIndex: 'PLUSGRADEID',
                                        width: 100
                                    },
                                    {
                                        text: 'Ref. Number',
                                        dataIndex: 'AREFNBR',
                                        width: 150,
                                        renderer: function (value, metaData) {
                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                            return value || '';
                                        }
                                    },
                                    {
                                        text: 'Amount',
                                        dataIndex: 'AMOUNT',
                                        width: 120,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                            return Ext.util.Format.number(value || 0, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Sale<br>Amount',
                                        dataIndex: 'SALE_AMOUNT',
                                        width: 120,
                                        renderer: function (value, metaData) {
                                            return Ext.util.Format.number(value || 0, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Complement',
                                        dataIndex: 'COMPLEMENT',
                                        width: 150
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'STATUS_DESCRIPTION',
                                        width: 100,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;font-weight:bold;background-color:#90EE90;color:#000;";
                                            return value || '';
                                        }
                                    },
                                    {
                                        text: 'Error<br>Code',
                                        dataIndex: 'CERROR',
                                        width: 80
                                    },
                                    {
                                        text: 'Error<br>Description',
                                        dataIndex: 'DERROR',
                                        flex: 1,
                                        minWidth: 200,
                                        renderer: function (value, metaData) {
                                            if (value && value.length > 50) {
                                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                                return value.substring(0, 50) + '...';
                                            }
                                            return value || '';
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
});
