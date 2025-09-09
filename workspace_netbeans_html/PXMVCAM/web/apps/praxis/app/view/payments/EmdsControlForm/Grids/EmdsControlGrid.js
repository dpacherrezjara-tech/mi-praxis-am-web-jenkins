Ext.define('Ext.Praxis.view.payments.EmdsControlForm.Grids.EmdsControlGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-EmdsControlGrid',
    requires: [
        'Ext.Praxis.controller.payments.EmdsControl.EmdsControlGridController'
    ],
    controller: 'EmdsControlGridController',
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
                text: 'Ticket', dataIndex: 'TICKET', width: 110,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    let ticket = record.get('CCIA') + record.get('FORMA') + record.get('SERIE') ;
                    if (ticket.trim() === '') {
                        metaData.style = "background-color:#FCF6DC;";
                    } else {
                        metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    }
                    return ticket ;
                },
                listeners: {
                    click: 'onClickInfo'
                }
            },
            {
                text: 'Seq', dataIndex: 'SEQ', width: 50
            },
            {
                text: 'Corrl', dataIndex: 'CORRL', width: 50
            },
            {
                text: 'Rolling', dataIndex: 'SEQROLL', width: 70
            },
            {
                text: 'Transaction', dataIndex: 'TRNCU', width: 85
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
                        text: 'Code', dataIndex: 'SCARDCOD', width: 60
                    },
                    {
                        text: 'Number', dataIndex: 'SCARDN2', width: 120
                    },
                    {
                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 80
                    },
                ]
            },

            {
                text: 'Processing Date', dataIndex: 'SDATE', width: 120
            },
            {
                text: 'Ref. Number', dataIndex: 'AREFNBR', width: 160,
                listeners: {
                    click: 'onClickInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-decoration:underline;cursor:pointer;color:#057ECB";
                    return value;
                }
            },
            {
                text: 'Trans. Amount', dataIndex: 'TGROSAMOUN', width: 120,
                renderer: function (value, metaData, record) {
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Sale Amount', dataIndex: 'VFOPVTA', width: 120,
                renderer: function (value, metaData, record) {
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Balance Amount', dataIndex: 'SALDO', width: 120,
                renderer: function (value, metaData, record) {
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'PNR Liquidation', dataIndex: 'LPNR', width: 120
            },
            {
                text: 'PNR Sale', dataIndex: 'SPNR', width: 100
            },
//            {
//                text: 'Error<br>Code', dataIndex: 'CERROR', flex: 1
//            },
            {
                text: 'Status<br>Robot', dataIndex: 'STBOT', width: 80
            },
            {
                text: 'Status', dataIndex: 'STVAL', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    const opts = {
//                                                'A': 'Match OC/Camepa',
                        'C': 'Match Complement',
                        'D': 'Match Balance',
                        'E': 'Duplicate Payment',
                        'M': 'Match Multi-Payment',
                        '0': 'Stand By',
                        '1': 'Match',
                        '2': 'Sales Without Settl.',
                        '3': 'Settl. Without Sales',
                        '4': 'Match Partial',
                        '5': 'Match Manual',
//                                                '6': 'Match Forced',
//                                                '7': 'Match Compensation',
                        '8': 'Match Transactional',
                        '9': 'Match Void'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Doc. Type', dataIndex: 'TIPOD', width: 80
            },
            {
                text: 'Fuente', dataIndex: 'FUENTE', width: 80
            },
            {
                text: 'Document', dataIndex: 'TDOC', width: 80
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
            },
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        