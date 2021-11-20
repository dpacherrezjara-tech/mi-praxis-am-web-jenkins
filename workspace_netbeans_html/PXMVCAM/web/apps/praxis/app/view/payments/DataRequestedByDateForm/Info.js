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
                width: 1690,
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
                            width: 1610,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1610,
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
                                                text: '',
                                                id: prototype.id + '-adgTitFecha',
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
                                                text: 'Sending Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Bank to AM', dataIndex: 'SENTDATE', width: 90}
                                                ]
                                            },
                                            {
                                                text: 'IATA', dataIndex: 'AGENTE', width: 90,
                                            },
                                            {
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
                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'TICKET', width: 120
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 90,
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
                                                text: 'Uses', dataIndex: 'STUSOS', width: 90,
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
                                                        text: 'Cpns Sabre', dataIndex: 'INDCPNS', width: 80
                                                    },                                                    
                                                ]
                                            },
                                            {
                                                text: 'GDS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Last', dataIndex: 'INDCPNSUL', width: 80
                                                    },                                                    
                                                ]
                                            },
                                            {
                                                text: 'Uses',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Last', dataIndex: 'STUSOS', width: 80
                                                    },                                                    
                                                ]
                                            },
                                            {
                                                text: 'Case',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rules', dataIndex: 'CRULE', width: 80
                                                    },                                                    
                                                ]
                                            },
                                            {
                                                text: 'Selection',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flag', dataIndex: 'FSELEC', width: 80
                                                    },   
                                                    {
                                                        text: 'Date', dataIndex: 'FECSELEC', width: 80
                                                    }, 
                                                ]
                                            },
                                            {
                                                text: 'Expiration',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'FVCTO', width: 80
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


