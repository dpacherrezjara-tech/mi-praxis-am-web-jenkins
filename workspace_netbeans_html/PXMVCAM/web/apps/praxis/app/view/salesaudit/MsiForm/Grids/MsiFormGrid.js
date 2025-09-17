Ext.define('Ext.Praxis.view.salesaudit.MsiForm.Grids.MsiFormGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MsiFormGrid',
    requires: [
        'Ext.Praxis.controller.salesaudit.Msi.MsiFormGridController'
    ],
    controller: 'MsiFormGridController',
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
            {
                text: 'Processor', dataIndex: 'PROCESADOR', width: 110
            },
            {
                text: 'Procesing Date', dataIndex: 'FPROC', width: 110
            },
            {
                text: 'Sale Date', dataIndex: 'FVTA', width: 110
            },
            {
                text: 'Ticket', dataIndex: 'TKT', width: 110
            },
            {
                text: 'Channel', dataIndex: 'CANAL', width: 110
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
//                    {
//                        text: 'Code', dataIndex: 'SCARDCOD', width: 60
//                    },
                    {
                        text: 'Number', dataIndex: 'TARJETA', width: 120
                    },
                    {
                        text: 'Auth.', dataIndex: 'AUTH', width: 80
                    },
                ]
            },
            {
                text: 'INSTANBR', dataIndex: 'INSTANBR', width: 110
            },
            {
                text: 'NBRINSTA', dataIndex: 'NBRINSTA', width: 110
            },
            {
                text: 'MDABOL', dataIndex: 'MDABOL', width: 110
            },
            {
                text: 'MDALIQ', dataIndex: 'MDALIQ', width: 110
            },
            {
                text: 'Liquidation', dataIndex: 'MONTOLIQ', width: 110
            },
            {
                text: 'RFIC', dataIndex: 'RFIC', width: 110
            },
            {
                text: 'RFIS', dataIndex: 'RFIS', width: 110
            },
            {
                text: 'TARIFBOL', dataIndex: 'TARIFBOL', width: 110
            },
            {
                text: 'BANK', dataIndex: 'BANCO', width: 110
            },
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
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        