//prototype.idDE2 = prototype.id + 'MiscellaneousAgentGrid';

Ext.define('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.Grids.MiscellaneousAgentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MiscellaneousAgent',
//    itemId: prototype.idDE2 + '-MiscellaneousAgentGrid',
    requires: [
        'Ext.Praxis.controller.salesaudit.MiscellaneousAgentForm.MiscellaneousAgentGridController'
    ],
    controller: 'MiscellaneousAgentGridController',
    minHeight: 200,
    height: 'auto',
    width: 1700,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,

    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
//            id: prototype.idDE2 + '-MiscellaneousAgentGrid',

            {
                text: 'Key 1', dataIndex: 'A4593KEY1', width: 50
            }, {
                text: 'Key 2', dataIndex: 'A4593KEY2', width: 120
            },
            {
                text: 'Key 3', dataIndex: 'A4593KEY3', width: 100
            },
            {
                text: 'Description 1', dataIndex: 'A4593DESC1', width: 250
            },
            {
                text: 'Description 2', dataIndex: 'A4593DESC2', width: 250
            },
            {
                text: 'Status', dataIndex: 'A4593STS', width: 100,
                renderer: function (value) {
                    return value === '1' ? 'Activo' : 'Inactivo';
                }
            },
            {
                text: 'Comment', dataIndex: 'A4593COMEN', flex: 1
            },
            {
                text: 'Created',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'User', dataIndex: 'A4593USCR', width: 100
                    },
                    {
                        text: 'Date Time', dataIndex: 'A4593TSCR', width: 120
                    },
                ]
            },
            {
                text: 'Update',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'User', dataIndex: 'A4593USUP', width: 100
                    },
                    {
                        text: 'Date Time', dataIndex: 'A4593TSUP', width: 120
                    },
                ]
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
                        handler: 'detailDataEntryMiscellaneousAgent'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Del',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-trash',
                        tooltip: 'Delete',
                        handler: 'onDeleteClick'
                    }
                ]
            }


        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcelSetrlBalancesCntl'
                }
            },
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        