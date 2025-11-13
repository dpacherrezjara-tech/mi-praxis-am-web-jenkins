prototype.idRanking = prototype.id + '-DataEntryLogRanking';

Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.DataEntrys.DataEntryLogRanking', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLogRanking',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.DataEntryLogRankingController'
    ],
    title: 'Detail',
    header: true,
    width: 1200,
    height: 500,
    resizable: true,
    layout: 'fit',
    modal: true,
    controller: 'DataEntryLogRankingController',
    
    scrollable: true,
    bodyStyle: 'background-color: white !important;',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
    },

    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcelLog'
                }
            },
        ]
    },

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            padding: 8,
            style: 'background: white',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    padding: 8,
                    flex: 1,
                    style: 'background: white',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idRanking + '-grid-Detail',
                            style: 'background: white',
//                            maxHeight: 550,
                            flex: 1,
                            columnLines: true,
                            viewConfig: {
                                enableTextSelection: true
                            },
                            columns: [
                                {text: 'Corrl.', dataIndex: 'CORRLANC', align: 'center', width: 60},
                                {text: 'Rfic', dataIndex: 'RFICODE',align: 'center', width: 50},
                                {text: 'Rfics', dataIndex: 'RFICSUBCO',align: 'center', width: 60},
                                {text: 'Carrier<br>Code', dataIndex: 'CARRIERCO',align: 'center', width: 60},
                                {text: 'Vendor', dataIndex: 'VENDOR',align: 'center', width: 60},
                                {text: 'Type', dataIndex: 'EMDTYPE',align: 'center', width: 60},
                                {text: 'Currency', dataIndex: 'BASEMDA',align: 'center', width: 80},
                                {text: 'Fare', dataIndex: 'BASEPRINCE',align: 'center', width: 100,
                                    renderer: function (value, metaData, record) {
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                },
                                {
                                    text: 'Iva',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'Code', dataIndex: 'TAXCODE',align: 'center', width: 60},
                                        {text: 'Amount', dataIndex: 'TAXAMOUNT',align: 'center', width: 100,
                                            renderer: function (value, metaData, record) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: 'Include', dataIndex: 'TAXINCLUDE_CHECK',align: 'center', width: 60, xtype: 'checkcolumn', readOnly: true}
                                    ]
                                },
                                {text: 'Fare + Iva', dataIndex: 'TOTATTLPRI',align: 'center', width: 130,
                                    renderer: function (value, metaData, record) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                    }
                                },
                                {
                                    text: 'Flight',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'Airline', dataIndex: 'AIRLINCODE',align: 'center', width: 60},
                                        {text: 'From', dataIndex: 'BOARDPOINT',align: 'center', width: 60},
                                        {text: 'To', dataIndex: 'OFFPOINT',align: 'center', width: 60},
                                        {text: 'Number', dataIndex: 'FLIGHTNUM',align: 'center', width: 60},
                                        {text: 'Group', dataIndex: 'GROUPCODE',align: 'center', width: 60},
                                        {text: 'Class', dataIndex: 'CLASSOFSER',align: 'center', width: 60},
                                        {text: 'Date', dataIndex: 'DEPARTDATE',align: 'center', width: 80}
                                    ]
                                }, 
                                {text: 'Issuance', dataIndex: 'BASE_DESCRIPTION',align: 'center', width: 130,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#C8F4B4;font-weight:bold";
                                        return value;
                                    }
                                },
				{
                                    text: 'Passenger',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'Type', dataIndex: 'PASSTYPE',align: 'center', width: 60},
                                        {text: 'Number', dataIndex: 'NAMENUMBER',align: 'center', width: 60},
                                        {text: 'Name', dataIndex: 'PASSENGERN',align: 'center', width: 200}
                                    ]
                                },
                                {text: 'Status', dataIndex: 'ESTATUS',align: 'center', width: 60,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#C8F4B4;font-weight:bold";
                                        return value;
                                    }
                                },
                                {
                                    text: 'Created',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'User', dataIndex: 'REGIS', width: 80},
                                        {text: 'Date', dataIndex: 'FREGI', width: 80},
                                        {text: 'Time', dataIndex: 'HREGI', width: 80}
                                    ]
                                },
                                {
                                    text: 'Updated',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'User', dataIndex: 'REVIS', width: 80},
                                        {text: 'Date', dataIndex: 'FREVI', width: 80},
                                        {text: 'Time', dataIndex: 'HREVI', width: 80}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]


        }
    ],
});