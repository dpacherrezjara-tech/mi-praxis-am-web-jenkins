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
    width: 500,
    height: 420,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 50,
                    border: false,
                    bodyPadding: '8 10',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Waiver Code:',
                            width: 90
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-de-txtCodwa',
                            width: 140,
                            maxLength: 10,
                            enforceMaxLength: true,
                            emptyText: 'Enter code...'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-de-save',
                            text: 'Save',
                            iconCls: 'prx-icon-save',
                            margin: '0 0 0 8',
                            disabled: true,
                            listeners: { click: 'onSaveClick' }
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    flex: 1,
                    id: prototype.id + '-de-gridTickets',
                    border: false,
                    columnLines: true,
                    viewConfig: {
                        emptyText: 'No tickets found.',
                        deferEmptyText: false,
                        enableTextSelection: true
                    },
                    selModel: {
                        selType: 'rowmodel',
                        mode: 'SINGLE'
                    },
                    listeners: {
                        selectionchange: 'onGridSelectionChange'
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
                                text: 'Waiver Code',
                                width: 110,
                                dataIndex: 'A1672CODWA',
                                align: 'left'
                            },
                            {
                                text: 'Status',
                                width: 65,
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
                        fields: ['A1672CCUST', 'A1672CIA', 'A1672FORMA', 'A1672SERIE', 'TICKET', 'A1672CODWA'],
                        data: []
                    })
                }
            ]
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
