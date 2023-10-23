Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryPayment', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPaymentForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryPaymentController'
    ],
    controller: 'DataEntryPaymentController',
    title: 'View Payments',
    header: true,
    height: 400,
    width: 1600,
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
                            xtype: 'grid',
                            id: prototype.id+'-1-gridDataMemo',
                            height: 487,
                            columnLines: true,
                            plugins: [
                                { 
                                    ptype: 'cellediting',
                                    clicksToEdit: 1
                                }
                            ],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Ticket Number', dataIndex: 'TICKET', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Processing <br/> Date', dataIndex: 'PRDA', width: 100, align: 'right', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Payment Date', dataIndex: 'PAYDATE', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Processor', dataIndex: 'DESCMER', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Transaction', dataIndex: 'TRNCU', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'STVAL', width: 70, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Sales <br/> Mechant ID', dataIndex: 'SMERCHID', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Sales <br/> Mechant <br/> Description', dataIndex: 'SMERCHDESCR', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Complement', dataIndex: 'COMPLEMENT', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Credit Card', dataIndex: 'SCARDN', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'MSI', dataIndex: 'INSTANBR', width: 50, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Invoice <br/> Reference <br/> Number', dataIndex: 'INVOIRN', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'FOP Amount', dataIndex: 'SVFOPS', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Transaction <br/> Amount', dataIndex: 'TGROSAMOUN', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Transaction <br/> with <br/> Adjustment', dataIndex: 'DESCADJU', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
//                                    {
//                                        text: 'Edit', xtype: 'actioncolumn', width: 'flex', align: 'center',
//                                        items: [
//                                            {
//                                                iconCls: 'prx-icon-edit',
//                                                tooltip: 'Edit',
//                                                handler: 'gridDataMemo_clickHandler'
//                                            }
//                                        ]
//                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});