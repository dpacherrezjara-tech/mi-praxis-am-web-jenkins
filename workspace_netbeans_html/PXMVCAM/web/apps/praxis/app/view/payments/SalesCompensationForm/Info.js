Ext.define('Ext.Praxis.view.payments.SalesCompensationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
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
                width: 1720,
                height: 600,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 580,
                            width: 1720,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    height: 553,
                                    width: 1708,
                                    hidden: false,
                                    columnLines: true,
                                    features: {
                                        dock: 'bottom',
                                        ftype: 'summary',
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'BSUMDATE', width: 100},
                                                ]
                                            },
                                            {text: 'Ticket', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-compensation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Associated<br>Ticket', dataIndex: 'A1721FRCA', width: 120,
                                                listeners: {
                                                    click: 'viewTicketAS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-compensation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 125},
                                                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 60},
                                                ]
                                            },
                                            {text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'TRANSDATE', width: 100},
                                                    {text: 'Cur.', dataIndex: 'PCURRENCY', width: 60},
                                                    {text: 'Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'PAYDATE', width: 100},
                                                    {text: 'Merchant', dataIndex: 'MERCHID', width: 100},
                                                ]
                                            },
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Counter', dataIndex: 'A720FRESV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Orig', dataIndex: 'A720RUTA0', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Dest', dataIndex: 'A720RUTA1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Number', dataIndex: 'A720NVLO1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#AFDBF3;";
                                                                    return  value;
                                                                }
                                                            },
                                                            {text: 'Date', dataIndex: 'A720FVLO1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#AFDBF3;";
                                                                    return  value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'descSTVAL', width: 100},
                                            {text: 'Reason', dataIndex: 'desCERROR', width: 100},
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 7, height: 5},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: 1115,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 1164,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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


