/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.Waiver.DataEntryWaiverController'
    ],
    title: 'Waiver Tickets',
    header: true,
    width: 420,
    height: 350,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-de-gridTickets',
            border: false,
            columnLines: true,
            viewConfig: {
                emptyText: 'No tickets found.',
                deferEmptyText: false
            },
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    resizable: false,
                    align: 'center'
                },
                items: [
                    {
                        text: 'Ticket',
                        flex: 1,
                        dataIndex: 'TICKET',
                        align: 'left'
                    },
                    {
                        text: 'Waiver',
                        width: 90,
                        dataIndex: 'A1672CODWA',
                        renderer: function (value) {
                            if (value && value.trim() !== '') {
                                return '<span style="color:green;font-weight:bold;">Yes</span>';
                            }
                            return '<span style="color:#aaa;">No</span>';
                        }
                    }
                ]
            },
            store: Ext.create('Ext.data.Store', {
                fields: ['A1672CCUST', 'TICKET', 'A1672CODWA'],
                data: []
            })
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                { xtype: 'tbfill' },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-de-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
