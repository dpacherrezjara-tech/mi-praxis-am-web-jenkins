Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetMerchant', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetMerchant',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1212,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetMerchant',
            width: 1212,
            columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                items: [
                    {text: 'Status', dataIndex: 'STVAL', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;";
                            metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                            return value;
                        }
                    },
                    {text: 'Bank Settlement',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Date', dataIndex: 'DATEF', width: 100},
                            {text: 'Merchant', dataIndex: 'MERCHN', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;";
                                    metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                    return value;
                                }
                            },
                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50},
                            {text: 'Amount', dataIndex: 'dblAMOUNT', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                        ]
                    },
                    {text: 'Bank Statement',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Date', dataIndex: 'BDATEP', width: 100},
                            {text: 'Merchant', dataIndex: 'MERCHNR', width: 120},
                            {text: 'Curr.', dataIndex: 'ACURRENCY', width: 50},
                            {text: 'Amount', dataIndex: 'dblAMOUNTR', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            }

                        ]
                    },
                    {
                        text: 'Quantity',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Trans', dataIndex: 'lngQTEF', width: 80},
                            {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 80},
                        ]
                    },
                    {text: 'Transaction', dataIndex: 'strDescTTRAN', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;";
                            metaData.tdAttr = 'data-qtip="' + data.strDescTTRAN + '"';
                            return value;
                        }
                    },
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 40,
                        text: 'Edit',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-edit',
                                tooltip: 'Edit',
                                handler: 'onEditClick'
                            }
                        ]
                    }

                ]
            }
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelDataSummary4',
            width: 1210,
            align: 'left',
            margin: '0 0 0 0 ',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                xtype: 'label',
                align: 'center',
                html: '' + '&nbsp',
                height: 25,
                padding: '5 5 5 0',
                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
            },
            items: [
                {width: 520, id: prototype.id + '-lblTotAMOUNT', align: 'center'},
                {width: 370, id: prototype.id + '-lblTotAMOUNTR', align: 'center'},
                {width: 80, id: prototype.id + '-lblTotM_QTEF', align: 'center'},
                {width: 80, id: prototype.id + '-lblTotM_QTYDOC', align: 'center'},
                {width: 160},
            ]
        }
    ]
});
