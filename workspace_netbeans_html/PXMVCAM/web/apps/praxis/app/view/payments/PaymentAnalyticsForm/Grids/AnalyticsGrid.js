Ext.define('Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.AnalyticsGrid', {
    extend: 'Ext.grid.Panel', //  Ext.tree.Panel
    alias: 'widget.' + prototype.id + '-AnalyticsGrid',
    id: prototype.id + '-AnalyticsGrid',
    requires: [
        'Ext.Praxis.controller.payments.PaymentAnalytics.PaymentAnalyticsGridController'
    ],
    controller: 'PaymentAnalyticsGridController',
    title: 'Payment Summary Analytics',
    titleAlign: 'center',
    minHeight: 200,
    height: 600,
    width: 1700,
    reserveScrollbar: false,
    scrollable: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
//    store: {
//        fields: [], 
//        data: []
//    },
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
//
//            {
//                text: 'Processor', dataIndex: 'PROCESSOR', width: 120,locked: true
//            },
//            {
//                text: 'Status', dataIndex: 'STVAL', width: 150,locked: true, 
//                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                    let data = record.data.STATUS;
//                    return data;
//                }
//            },
//            {
//                text: 'Ammount',
//                id: prototype.id + '-AnalyticsGridAmount',
//                defaults: {
//                    menuDisabled: true,
//                    sortable: false,
//                    align: 'center'
//                },
//                columns: [
//                ]
//            }
            
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
    }
});
