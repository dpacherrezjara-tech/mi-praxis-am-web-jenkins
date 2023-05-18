valor = '0';
Ext.define('Ext.Praxis.view.payments.DataRequestedByDateForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1850,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1850,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1860,
                                    height: 543,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '',
                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    { text: 'Date', dataIndex: 'DATE', width: 70}
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
                                                        text: 'Date', dataIndex: 'SALEDATE', width: 70,
                                                    }
                                                ]
                                            },
                                            /*{
                                             text: 'Sending Date',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {text: 'Bank to AM', dataIndex: 'SENTDATE', width: 90}
                                             ]
                                             },*/
                                            {
                                                text: 'IATA', dataIndex: 'AGENTE', width: 70,
                                            },
                                            /*{
                                             text: 'Sending Date',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {text: 'to IATA', dataIndex: 'IATADATE', width: 90}
                                             ]
                                             },
                                             {
                                             text: 'Link',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {text: 'Date', dataIndex: 'LINKDATE', width: 75},
                                             {text: 'Time', dataIndex: 'LINKHORA', width: 75}
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
                                             text: 'Sending', dataIndex: 'DATES', width: 80
                                             },
                                             {
                                             text: 'Notification', dataIndex: 'DATEN', width: 80,
                                             }
                                             ]
                                             },*/
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 65,
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
                                                text: 'Merchant', dataIndex: 'MERCHN', width: 80
                                            },
                                            {
                                                text: 'Status', dataIndex: 'descSTVAL', width: 130
                                            },
                                            {
                                                text: 'Chargeback <br> Number', dataIndex: 'FOLIO', width: 120
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
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background:" + data.COLOR;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'CARDNBR', width: 125,
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
                                                        text: 'Curr', dataIndex: 'MFOP', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background:" + data.COLOR;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Chargeback<br>Amount', dataIndex: 'AUTAMOUNT', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:right;background:" + data.COLOR;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Ticket<br>Amount', dataIndex: 'VFOP', width: 80,
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
                                                text: 'Ticket', dataIndex: 'TICKET', width: 110,
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
                                                        text: 'Cpns Sales', dataIndex: 'INDCPN', width: 80
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
                                                        text: 'First', dataIndex: 'STUSO', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Last', dataIndex: 'STUSOS', width: 60,
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
                                                                text: 'Status', dataIndex: 'INDCPNS', width: 80,
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
                                                                text: 'Status', dataIndex: 'INDCPNSL', width: 80,
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
                                                            listeners: {
                                                            click: 'onViewExchange'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            value = '<b>' + value + '<b>';
                                                            return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                        
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
                                                    },
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
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridStatusSabre',
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataStatusSabre',
                                    width: 1800,
                                    height: 530,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Reception',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'A3676FRECE', width: 80,
                                                        /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                         metaData.style = "color:#057ECB;";
                                                         value = '<b>' + value + '</b>';
                                                         return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                         }*/
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'TICKET', width: 100,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Coupon', dataIndex: 'A3676CUPON', width: 60,
                                            },
                                            {
                                                text: 'Seq', dataIndex: 'A3676SEQ', width: 50,
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Concili. Cpn', dataIndex: 'A3676STCON', width: 90,
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Robot',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'A3676STROB', width: 55,
                                                    },
                                                    {
                                                        text: 'Coupon', dataIndex: 'A3676CPNRB', width: 60,
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'A3676CURRB', width: 55,
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'A3676MONRB', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Remark', dataIndex: 'A3676REFRB', width: 300,
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'A3676CUR', width: 55,
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A3676MONTO', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status Coupon',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Start', dataIndex: 'A3676STINI', width: 100,
                                                    },
                                                    {
                                                        text: 'End', dataIndex: 'A3676STFIN', width: 100,
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Description', dataIndex: 'A3676DESCR', width: 90,
                                            },
                                            {
                                                text: 'Result', dataIndex: 'A3676RESUL', width: 120,
                                            },
                                            {
                                                text: 'Remark', dataIndex: 'A3676REFER', width: 320,
                                            },
                                                    /*{
                                                     text: 'Link',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {text: 'Date', dataIndex: 'LINKDATE', width: 75},
                                                     {text: 'Time', dataIndex: 'LINKHORA', width: 75}
                                                     ]
                                                     }, */
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDifference',
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1770,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDifference',
                                    width: 1765,
                                    height: 535,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '',
                                                id: prototype.id + '-adgTitFechaDiff',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 85,
                                                        /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                         metaData.style = "color:#057ECB;";
                                                         value = '<b>' + value + '</b>';
                                                         return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                         }*/
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
                                                        text: 'Date', dataIndex: 'SALEDATE', width: 70,
                                                    }
                                                ]
                                            },
                                            /*{
                                             text: 'Sending Date',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {text: 'Bank to AM', dataIndex: 'SENTDATE', width: 90}
                                             ]
                                             },*/
                                            {
                                                text: 'IATA', dataIndex: 'AGENTE', width: 90,
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 65,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '<b>';
                                                    return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            /*{
                                             text: 'Sending Date',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {text: 'to IATA', dataIndex: 'IATADATE', width: 90}
                                             ]
                                             },
                                             {
                                             text: 'Link',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {text: 'Date', dataIndex: 'LINKDATE', width: 75},
                                             {text: 'Time', dataIndex: 'LINKHORA', width: 75}
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
                                             text: 'Sending', dataIndex: 'DATES', width: 80
                                             },
                                             {
                                             text: 'Notification', dataIndex: 'DATEN', width: 80,
                                             }
                                             ]
                                             },*/
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHN', width: 80
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
                                                        text: 'Number', dataIndex: 'CARDNBR', width: 115,
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
                                                text: 'Ticket', dataIndex: 'TICKET', width: 120,
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
                                                        text: 'Cpns Sales', dataIndex: 'INDCPN', width: 80
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
                                                        text: 'Last', dataIndex: 'STUSOS', width: 70,
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
                                                                text: 'Status', dataIndex: 'INDCPNS', width: 80,
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
                                                                text: 'Status', dataIndex: 'INDCPNSL', width: 80,
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
                                                    },
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
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


