Ext.define('Ext.Praxis.view.payments.SettlBalancesCtrlForm.Grids.SettlBalancesCtrlGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlBalancesCtrl',
    requires: [
        'Ext.Praxis.controller.payments.SettlBalancesCtrl.SettlBalancesGridController'
    ],
    controller: 'SettlBalancesGridController',
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
                text: 'Ticket', dataIndex: 'TICKET', width: 110
            }, {
                text: 'Seq', dataIndex: 'SEQ', width: 60
            },
            {
                text: 'Corrl', dataIndex: 'CORRL', width: 60
            },
            {
                text: 'Rolling', dataIndex: 'SEQROLL', width: 80
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
                        text: 'Code', dataIndex: 'SCARDCOD', width: 80
                    },
                    {
                        text: 'Number', dataIndex: 'SCARDN', width: 120
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
                text: 'Ref. Number', dataIndex: 'AREFNBR', width: 160
            },
            {
                text: 'Processor', dataIndex: 'DESC_PRO', flex:1
            }, 
            {
                text: 'Settl. Amount', dataIndex: 'TGROSAMOUN', width: 100
            },
            {
                text: 'Moneda', dataIndex: 'MONEDA', width: 85
            },
            {
                text: 'Error Code', dataIndex: 'CERROR', width: 85
            },
            {
                text: 'Balance Amount', dataIndex: 'SALDO', width: 120
            },
            {
                text: 'Status', dataIndex: 'DESC_STVAL', width: 140
            },
            {
                text: 'Diff. Type', dataIndex: 'DESC_AJUSTE', width: 85
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Detail',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
//                        tooltip: 'copy SPNR',
                        handler: 'detailSettlBalancesCtrl'
                    }
                ]
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



        