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
                text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 110
            },
//            {
//                text: 'Number<br>Installments', dataIndex: 'NBRINSTA', width: 110
//            },
            {
                text: 'Local<br>Currency', dataIndex: 'MDABOL', width: 80
            },
            {
                text: 'Liquidation<br>Currency', dataIndex: 'MDALIQ', width: 110
            },
            {
                text: 'Liquidation', dataIndex: 'MONTOLIQ', width: 110,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Cod Reason', dataIndex: 'RFIC', width: 110
            },
            {
                text: 'Subcod Reason', dataIndex: 'RFIS', width: 110
            },
            {
                text: 'Val FOP Loc', dataIndex: 'TARIFBOL', width: 110,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Bank', dataIndex: 'BANCO', flex:1
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
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        