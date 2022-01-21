valor = '0';
Ext.define('Ext.Praxis.view.payments.SalesComplementAmexForm.Info', {
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
                width: 1700,
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
                        //Panel Principal - Plusgrade
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1700,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1700,
                                    //height: 600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Plusgrade ID', dataIndex: 'PLUSGRAID', width: 90
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHID', width: 90
                                            },
                                            {
                                                text: 'Country', dataIndex: 'COUNTRY', width: 70
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'PRDA', width: 90
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Plusgrade',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                                    },
                                                    {
                                                        text: 'VS Sale', dataIndex: 'descSTCON', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Country', dataIndex: 'SCOUNTRY', width: 70
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    }
                                                ]
                                            },
                                            /*{
                                             text: 'Sale',
                                             id: prototype.id + '-adgTitFecha',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {
                                             text: 'Date', dataIndex: 'SDATE', width: 100
                                             }
                                             ]
                                             },*/
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Bin', dataIndex: 'SCARDBIN', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Currency',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Partner', dataIndex: 'CURRPARTN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#8ac6eb";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'EMDNUMBER', width: 100,
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;";
                                                            return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Accounting',
                                                id: prototype.id + '-plusAccounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 100
                                                    },
                                                    {
                                                        text: 'ID', dataIndex: 'IDCON', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Add Pax',
                                                id: prototype.id + '-plusAddPax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'EMD Number', dataIndex: 'ADDPAXEMD', width: 280
                                                    },
                                                    {
                                                        text: 'Ticket Number', dataIndex: 'ADDPAXTKT', width: 280
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Panel Ligas de Pago
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataLiga',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1600,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainLiga',
                                    width: 1520,
                                    //height: 600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Number',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Operation', dataIndex: 'OPERATNBR', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHID', width: 90
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'PRDA', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'descFAMEX', width: 90
                                            },
                                            {
                                                text: 'Sale',
                                                id: prototype.id + '-adgTitFechaTablet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 90
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'STIME', width: 90
                                                    }
                                                ]
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
                                                        text: 'Name', dataIndex: 'NAMECARD', width: 90
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 100
                                                    },
                                                    {
                                                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Issuing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Bank', dataIndex: 'BANCOEMI', width: 140
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Tickets',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '1', dataIndex: 'TICKET1', width: 100
                                                    },
                                                    {
                                                        text: '2', dataIndex: 'TICKET2', width: 100
                                                    },
                                                    {
                                                        text: '3', dataIndex: 'TICKET3', width: 100
                                                    },
                                                    {
                                                        text: '4', dataIndex: 'TICKET4', width: 100
                                                    },
                                                    {
                                                        text: '5', dataIndex: 'TICKET5', width: 100
                                                    },
                                                    {
                                                        text: '6', dataIndex: 'TICKET6', width: 100
                                                    },
                                                    {
                                                        text: '7', dataIndex: 'TICKET7', width: 100
                                                    },
                                                    {
                                                        text: '8', dataIndex: 'TICKET8', width: 100
                                                    },
                                                    {
                                                        text: '9', dataIndex: 'TICKET9', width: 100
                                                    },
                                                    {
                                                        text: '10', dataIndex: 'TICKET10', width: 100
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Panel Tablet
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataTablet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1600,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainTablet',
                                    width: 1520,
                                    //height: 600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Number',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Operation', dataIndex: 'OPERATNBR', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHID', width: 90
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'PRDA', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'descFAMEX', width: 90
                                            },
                                            {
                                                text: 'Sale',
                                                id: prototype.id + '-adgTitFechaLiga',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 90
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'STIME', width: 90
                                                    }
                                                ]
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
                                                        text: 'Name', dataIndex: 'NAMECARD', width: 90
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 100
                                                    },
                                                    {
                                                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Issuing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Bank', dataIndex: 'BANCOEMI', width: 140
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Tickets',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '1', dataIndex: 'TICKET1', width: 100
                                                    },
                                                    {
                                                        text: '2', dataIndex: 'TICKET2', width: 100
                                                    },
                                                    {
                                                        text: '3', dataIndex: 'TICKET3', width: 100
                                                    },
                                                    {
                                                        text: '4', dataIndex: 'TICKET4', width: 100
                                                    },
                                                    {
                                                        text: '5', dataIndex: 'TICKET5', width: 100
                                                    },
                                                    {
                                                        text: '6', dataIndex: 'TICKET6', width: 100
                                                    },
                                                    {
                                                        text: '7', dataIndex: 'TICKET7', width: 100
                                                    },
                                                    {
                                                        text: '8', dataIndex: 'TICKET8', width: 100
                                                    },
                                                    {
                                                        text: '9', dataIndex: 'TICKET9', width: 100
                                                    },
                                                    {
                                                        text: '10', dataIndex: 'TICKET10', width: 100
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Pie
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
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



