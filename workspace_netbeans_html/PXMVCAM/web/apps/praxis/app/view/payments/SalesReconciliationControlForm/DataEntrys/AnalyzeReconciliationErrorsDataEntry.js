prototype.idDE = prototype.id + '-AnalyzeReconciliationErrorsDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AnalyzeReconciliationErrorsDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.AnalyzeReconciliationErrorsDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.AnalyzeReconciliationErrorsController'
    ],
    controller: 'AnalyzeReconciliationErrorsControlController',
    title: 'Analyze Reconciliation Errors',
    header: true,
    width: 1300,
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
                id: prototype.idDE + '-filtersForm',
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
                        id: prototype.idDE + '-filterTypeDate',
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
                        id: prototype.idDE + '-filterDateFrom',
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
                        id: prototype.idDE + '-filterDateTo',
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
                        xtype: 'textfield',
                        fieldLabel: 'Ref. Number',
                        name: 'IN_AREFNBR',
                        labelWidth: 90,
                        width: 240,
                        maxLength: 23,
                        maskRe: /[0-9]/,
                        enforceMaxLength: true,
                        listeners: {
                            specialkey: 'onEnterKeyPress'
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Processor',
                        name: 'IN_PROCTYPESQ',
                        id: prototype.idDE + '-filterProcessor',
                        labelWidth: 70,
                        width: 220,
                        valueField: 'A4451KEY2',
                        displayField: 'A4451DESC1',
                        queryMode: 'local',
                        editable: false,
                        allowBlank: true,
                        caseSensitive: false,
                        autoSelect: true,
                        labelAlign: 'right',
                        typeAhead: true,
                        enableKeyEvents: true,
                        triggerAction: 'all',
                        value: '',
                        listeners: {
                            change: 'onFilterChange'
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
                        width: 150,
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
            id: prototype.idDE + '-grid',
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
                        text: 'Ref. Number',
                        dataIndex: 'AREFNBR',
                        width: 150,
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
                        text: 'Processor',
                        dataIndex: 'PROSQ_DESCRIPTION',
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                            return value;
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
                                        return value.substring(0, 60) + '...';
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
                id: prototype.idDE + '-pagingToolbar',
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: "No data to display",
                
            }
        }
    ]
});