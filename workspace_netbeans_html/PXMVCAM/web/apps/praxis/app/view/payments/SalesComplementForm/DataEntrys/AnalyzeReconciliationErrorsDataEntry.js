prototype.idAnalyze = prototype.id + '-AnalyzeReconciliationErrorsDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesComplementForm.DataEntrys.AnalyzeReconciliationErrorsDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.AnalyzeReconciliationErrorsDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesComplement.AnalyzeReconciliationErrorsController'
    ],
    controller: 'AnalyzeReconciliationErrorsController',
    title: 'Analyze Reconciliation Errors',
    header: true,
    width: 1200,
    height: 600,
    maxHeight: 600,
    resizable: false,
    scrollable: true,
    layout: 'fit',
    modal: true,
    border: false,
    bodyStyle: 'background-color: white !important;',

    tbar: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'form',
                id: prototype.idAnalyze + '-filtersForm',
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
                        fieldLabel: 'Search By Date',
                        name: 'IN_TYPE_DATE',
                        id: prototype.idAnalyze + '-filterTypeDate',
                        labelWidth: 100,
                        width: 200,
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['', 'All'],
                                ['PRDA', 'Processing'],
                                ['SDATE', 'Sale'],
                                ['FEAN', 'Analyze'],
                                ['FEUP', 'Solved'],
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: '',
                        listeners: {
                            change: 'onFilterTypeDateChange'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date From',
                        name: 'IN_DATE_FROM',
                        id: prototype.idAnalyze + '-filterDateFrom',
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
                        id: prototype.idAnalyze + '-filterDateTo',
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
                        xtype: 'textfield',
                        fieldLabel: 'Plusgrade ID',
                        name: 'IN_PLUSGRAID',
                        labelWidth: 100,
                        width: 180,
                        maxLength: 8,
                        maskRe: /[0-9]/,
                        enforceMaxLength: true,
                        listeners: {
                            specialkey: 'onEnterKeyPress'
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'PNR',
                        name: 'IN_PNR',
                        labelWidth: 40,
                        width: 100,
                        maxLength: 6,
                        maskRe: /[A-Za-z0-9]/,
                        enforceMaxLength: true,
                        listeners: {
                            specialkey: 'onEnterKeyPress'
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Status',
                        name: 'IN_STATUS',
                        labelWidth: 60,
                        width: 180,
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['', 'All'],
                                ['R', 'Resolved'],
                                ['P', 'Pending']
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: 'P',
                        listeners: {
                            change: 'onFilterChange'
                        }
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
                    },
                    {
                        xtype: 'button',
                        tooltip: 'Export to Excel',
                        iconCls: 'prx-icon-excel',
                        listeners: {
                            click: 'onClickExportExcel'
                        }
                    }
                ]
            }
        ]
    },

    items: [
        {
            xtype: 'grid',
            id: prototype.idAnalyze + '-grid',
            border: false,
            style: 'background: white',
            flex: 1,
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
                        text: 'Plusgrade ID',
                        dataIndex: 'TRANSACTID',
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Processing<br>Date',
                        dataIndex: 'PRDA',
                        width: 100
                    },
                    {
                        text: 'PNR',
                        dataIndex: 'PNR',
                        width: 80
                    },
                    {
                        text: 'Amount',
                        dataIndex: 'AMOUNT',
                        width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Status',
                        dataIndex: 'STATUS_DESCRIPTION',
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value === 'Solved') {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#90EE90;color:#000;";
                            } else if (value === 'Pending') {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#FFB6C1;color:#000;";
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Error',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Code',
                                dataIndex: 'ACERROR',
                                width: 60
                            },
                            {
                                text: 'Description',
                                dataIndex: 'ERROR_DESCRIPTION',
                                width: 260,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value && value.length > 30) {
                                        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                        return value.substring(0, 30) + '...';
                                    }
                                    return value;
                                }
                            },
                        ]
                    },
                    {
                        text: 'Created<br>Date',
                        dataIndex: 'FEAN',
                        width: 80
                    },
                    {
                        text: 'Solved<br>By',
                        dataIndex: 'SOLVED_BY',
                        width: 80
                    },
                    {
                        text: 'Solved<br>Date',
                        dataIndex: 'FEUP',
                        width: 80
                    },
                    {
                        text: 'User<br>Solved',
                        dataIndex: 'USUP',
                        width: 80
                    },
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                id: prototype.idAnalyze + '-pagingToolbar',
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: "No data to display",
                
            }
        }
    ]
});
