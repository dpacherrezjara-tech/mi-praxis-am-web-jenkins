Ext.define('Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.AnalyticsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-AnalyticsGrid',
    id: '-AnalyticsGrid',
//    requires: [
//        'Ext.Praxis.controller.payments.EmdsControl.EmdsControlGridController'
//    ],
//    controller: 'EmdsControlGridController',
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
                text: 'Seq', dataIndex: 'SEQ', width: 50
            },
            {
                text: 'Corrl', dataIndex: 'CORRL', width: 50
            },
            {
                text: 'Rolling', dataIndex: 'SEQROLL', width: 70, hidden: true
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
                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100
            },
            {
                text: 'Sale<br>Date', dataIndex: 'SDATE', width: 100
            },
            {
                text: 'Ref. Number', dataIndex: 'AREFNBR', width: 160,
                listeners: {
                    click: 'onClickInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    return value;
                }
            },
            {
                text: 'Currency', dataIndex: 'MONEDA', width: 80
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
                text: 'Difference<br>Amount', dataIndex: 'SALDO', width: 120,
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
            { text: 'Doc. Type', dataIndex: 'TIPOD', width: 80 },
            { text: 'Document', dataIndex: 'TDOC', width: 80 },
            { text: 'Fuente', dataIndex: 'FUENTE_DESC', width: 80 },
            { text: 'Status<br>Robot', dataIndex: 'STBOT_DESC', width: 80 },
           
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
                    click: 'downloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
