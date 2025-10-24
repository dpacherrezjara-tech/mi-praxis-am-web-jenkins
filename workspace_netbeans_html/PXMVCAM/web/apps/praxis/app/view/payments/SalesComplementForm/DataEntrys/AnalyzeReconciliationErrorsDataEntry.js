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
    maxHeight: 700,
    resizable: true,
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
                    labelStyle: 'text-align:right;font-weight: bolder;'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'IN_CCUST',
                        value: '139'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date From',
                        name: 'IN_DATE_FROM',
                        format: 'Ymd',
                        labelWidth: 80,
                        width: 150,
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
                        format: 'Ymd',
                        labelWidth: 70,
                        width: 150,
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
                        width: 150,
                        maxLength: 8,
                        maskRe: /[0-9]/,
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
                        value: '',
                        listeners: {
                            change: 'onFilterChange'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Search',
                        iconCls: 'prx-icon-search',
                        width: 100,
                        listeners: {
                            click: 'onClickSearch'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Clear',
                        iconCls: 'prx-icon-clear',
                        width: 100,
                        listeners: {
                            click: 'onClickClear'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Export Excel',
                        iconCls: 'prx-icon-excel',
                        width: 120,
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
                        text: 'Plusgrade ID',
                        dataIndex: 'PLUSGRAID',
                        width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Processing Date',
                        dataIndex: 'PRDA',
                        width: 120
                    },
                    {
                        text: 'Merchant ID',
                        dataIndex: 'MERCHID',
                        width: 120
                    },
                    {
                        text: 'Country',
                        dataIndex: 'COUNTRY',
                        width: 100
                    },
                    {
                        text: 'Sale Date',
                        dataIndex: 'SDATE',
                        width: 120
                    },
                    {
                        text: 'PNR',
                        dataIndex: 'PNR',
                        width: 100
                    },
                    {
                        text: 'EMD Number',
                        dataIndex: 'EMDNUMBER',
                        width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Amount',
                        dataIndex: 'SVFOP',
                        width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Status',
                        dataIndex: 'STATUS',
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value === 'R') {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#90EE90;color:#000;";
                                return 'Resolved';
                            } else if (value === 'P') {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#FFB6C1;color:#000;";
                                return 'Pending';
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Error Code',
                        dataIndex: 'ERROR_CODE',
                        width: 100
                    },
                    {
                        text: 'Error Description',
                        dataIndex: 'ERROR_DESCRIPTION',
                        width: 200,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value && value.length > 30) {
                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                return value.substring(0, 30) + '...';
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Resolution Date',
                        dataIndex: 'RESOLUTION_DATE',
                        width: 130
                    },
                    {
                        text: 'User Resolved',
                        dataIndex: 'USER_RESOLVED',
                        width: 120
                    },
                    {
                        text: 'Days Pending',
                        dataIndex: 'DAYS_PENDING',
                        width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value > 7) {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#FFA07A;color:#000;";
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Created Date',
                        dataIndex: 'CREATED_DATE',
                        width: 130
                    },
                    {
                        text: 'Updated Date',
                        dataIndex: 'UPDATED_DATE',
                        width: 130
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                id: prototype.idAnalyze + '-pagingToolbar',
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: "No data to display",
                pageSize: 50,
                store: Ext.create('Ext.data.Store', {
                    fields: [
                        'PLUSGRAID', 'PRDA', 'MERCHID', 'COUNTRY', 'SDATE', 'PNR', 'EMDNUMBER',
                        'SVFOP', 'STATUS', 'ERROR_CODE', 'ERROR_DESCRIPTION', 'RESOLUTION_DATE',
                        'USER_RESOLVED', 'DAYS_PENDING', 'CREATED_DATE', 'UPDATED_DATE'
                    ]
                })
            }
        }
    ]
});
