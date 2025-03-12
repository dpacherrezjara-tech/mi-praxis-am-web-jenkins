Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryRFTX', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRFTXProMasterTicketForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryRFTXProMasterTicketController'
    ],
    controller: 'DataEntryRFTXProMasterTicketController',
    title: 'Refund Tax',
    header: true,
    width: 1000,
    height: 480,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [                        
                        {
                            region: 'center',
                            id: prototype.id+'-2-boxMainData',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'right'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: true,
                                align: 'right'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="boxPagination">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-2-boxPagination',
                                    width: 110,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-first',
                                                    iconCls: 'prx-icon-pagination-first',
                                                    tooltip: 'First Page',
                                                    listeners: {
                                                        click: 'pagFirst'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-previous',
                                                    iconCls: 'prx-icon-pagination-previous',
                                                    tooltip: 'Previous Page',
                                                    listeners: {
                                                        click: 'pagPrevious'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-next',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Next Page',
                                                    listeners: {
                                                        click: 'pagNext'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-last',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Last Page',
                                                    listeners: {
                                                        click: 'pagLast'
                                                    }
                                                },
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id+'-2-paggin',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-2-gridData',
                                    width: '100%', //99
                                    height: 400,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Refund tax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    { text: 'A4373CIA', dataIndex: 'A4373CIA', width: 150, hidden: true },
                                                    { text: 'A4373FORMA', dataIndex: 'A4373FORMA', width: 150, hidden: true },
                                                    { text: 'A4373SERIE', dataIndex: 'A4373SERIE', width: 150, hidden: true },                                                    
                                                    { text: 'A4373SEQ', dataIndex: 'A4373SEQ', width: 150, hidden: true },                                                    
                                                    { text: 'TICKET', dataIndex: 'TICKET', width: 150 },
                                                    { text: 'CPNS.', dataIndex: 'CPNS', width: 70 },
                                                    { text: 'DOC.TYPE', dataIndex: 'A4373TDOC', width: 100 },
                                                    { text: 'CONJUNCTION', dataIndex: 'CONJUNCTION', width: 140 },
                                                    { text: 'DATE', dataIndex: 'A4373FECVT', width: 70 },
                                                    { text: 'IATA', dataIndex: 'A4373AGENT', width: 70 },
                                                    { text: 'CUR', dataIndex: 'A4373MDTX', width: 70 },
                                                    { text: 'AMOUNT', dataIndex: 'A4373TTAX', width: 70 },
                                                    { text: 'SALE DATE', dataIndex: 'A4373FTURB', width: 90 },
                                                    { text: 'ACCOUNT DATE', dataIndex: 'A1530FECCO', width: 110 },                                                    
                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Edit',
                                                        width: 39,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'gridData_act1_clickHandler'
                                                            }
                                                        ]
                                                    }
                                                    
                                                    
                                                ]
                                            }//,
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="boxPaginacion">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-2-boxPaginacion',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    width: '99%',
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            height: '100%',
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
                                                    id: prototype.id+'-2-lblPagActual',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id+'-2-lblPagTotal',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id+'-2-lblRowsTotal',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }//,
                    ]
                }
            ]
        }
    ],
    dockedItems: [
    ]
});



