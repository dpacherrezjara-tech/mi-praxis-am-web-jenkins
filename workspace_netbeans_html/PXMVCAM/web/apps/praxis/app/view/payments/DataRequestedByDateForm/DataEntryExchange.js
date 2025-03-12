Ext.define('Ext.Praxis.view.payments.DataRequestedByDateForm.DataEntryExchange', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryExchangeDataRequestedByDateForm',
    requires: [
        'Ext.Praxis.controller.payments.DataRequestedByDate.DataEntryExchangeDataRequestedByDateController'
    ],
    controller: 'DataEntryExchangeDataRequestedByDateController',
    title:'.:Exchange:.',
    header:true,
    height: 340,
    width: 1900,
    resizable:true,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formTax',
            defaults: {
                border: false
            },
            items: [
                
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridExchange',
                            width: 1850,
                            height: 300,
                            margin: '10 0 0 19',
                            columnLines: true,
                            clicksToEdit: 1,
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: [
                                {
                                    text: '',
                                    id: prototype.id + '-adgTitFechaExch',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'Date', dataIndex: 'DATE', width: 85
                                        }
                                    ]
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
                                            text: 'Date', dataIndex: 'SALEDATE', width: 85,
                                        }
                                    ]
                                },
                                {
                                    text: 'IATA', dataIndex: 'AGENTE', align: 'center', width: 90,
                                },
                                {
                                    text: 'PNR', dataIndex: 'PNR', width: 65, align: 'center',
                                    listeners: {
                                        click: 'onViewPNR'
                                    },
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;";
                                        value = '<b>' + value + '<b>';
                                        return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                    }
                                },
                                {
                                    text: 'Merchant', dataIndex: 'MERCHN', width: 80, align: 'center'
                                },
                                {
                                    text: 'Credit Card',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'Code', dataIndex: 'SCARCOD', width: 55,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;background:" + data.COLOR;
                                                return value;
                                            }
                                        },
                                        {
                                            text: 'Number', dataIndex: 'CARDNBR', width: 145,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;background:" + data.COLOR;
                                                return value;
                                            }
                                        },
                                        {
                                            text: 'Auth', dataIndex: 'AUTHNBR', width: 60,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;background:" + data.COLOR;
                                                return value;
                                            }
                                        },
                                        {
                                            text: 'Curr', dataIndex: 'MFOP', width: 60,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;background:" + data.COLOR;
                                                return value;
                                            }
                                        },
                                        {
                                            text: 'Auth<br>Amount', dataIndex: 'AUTAMOUNT', width: 80,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:right;background:" + data.COLOR;
                                                value = Ext.util.Format.number(value, '0,000.00');
                                                return value;
                                            }
                                        },
                                    ]
                                },
                                {
                                    text: 'Ticket', dataIndex: 'TICKETX', width: 120, align: 'center',
                                    listeners: {
                                        click: 'viewTicket'
                                    },
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        value = '<b>' + value + '</b>';
                                        return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                    }
                                },
                                {
                                    text: 'Indicator',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'Cpns Sales', dataIndex: 'INDCPNX', width: 80
                                        },
                                    ]
                                },
                                {
                                    text: 'Used Praxis',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'First', dataIndex: 'STUSO', width: 70,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "background-color:#d5f4d5;";
                                                return value;
                                            }
                                        },
                                        {
                                            text: 'Last', dataIndex: 'STUSOSX', width: 70,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "background-color:#d5f4d5;";
                                                return value;
                                            }
                                        },
                                    ]
                                },
                                {
                                    text: 'Used Sabre',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'First',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: false,
                                                align: 'center'
                                            },
                                            columns: [
                                                {
                                                    text: 'Status', dataIndex: 'INDCPNSX', width: 80,
                                                    listeners: {
                                                        click: 'onDetByStatus'
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                        value = '<b>' + value + '</b>';
                                                        return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    }
                                                },
                                                {
                                                    text: 'Date', dataIndex: 'DATSABF', width: 80,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                        return value;
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            text: 'Date',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: false,
                                                align: 'center'
                                            },
                                            columns: [
                                                {
                                                    text: 'Application', dataIndex: 'DATAPLICA', width: 80
                                                },
                                            ]
                                        },
                                        {
                                            text: 'Last',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: false,
                                                align: 'center'
                                            },
                                            columns: [
                                                {
                                                    text: 'Status', dataIndex: 'INDCPNSLX', width: 80,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Date', dataIndex: 'DATSABL', width: 80,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                        return value;
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    text: 'Flag',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'Exchange', dataIndex: 'FSELECX', width: 70,
                                        }
                                    ]
                                },
                                {
                                    text: 'Accounting',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'ID', dataIndex: 'IDCON', width: 80
                                        },
                                        {
                                            text: 'Date', dataIndex: 'FCONT', width: 80
                                        }
                                    ]
                                },
                                {
                                    text: 'Rule',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center'
                                    },
                                    columns: [
                                        {
                                            text: 'Policy', dataIndex: 'strDescCRULE', width: 80
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel-2',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
  }
);