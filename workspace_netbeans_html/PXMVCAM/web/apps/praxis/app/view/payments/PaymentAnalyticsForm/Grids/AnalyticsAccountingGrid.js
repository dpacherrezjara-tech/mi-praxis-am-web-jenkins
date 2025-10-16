Ext.define('Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.AnalyticsAccountingGrid', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.' + prototype.id + '-AnalyticsAccountingGrid',
    id: prototype.id + '-AnalyticsAccountingGrid',
    requires: [
        'Ext.Praxis.controller.payments.PaymentAnalytics.AnalyticsAccountingGridController'
    ],
    controller: 'AnalyticsAccountingGridController',
    title: 'Summary Accounting Analytics',
    titleAlign: 'center',
    minHeight: 200,
    height: 600,
    width: 1700,
    reserveScrollbar: false,
    scrollable: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    columnLines: true,
    rowLines: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
//    store: {
//        fields: [], 
//        data: []
//    },
    columns: {
        defaults: {
            menuDisabled: true,
            sortable: true,
            align: 'center'
        },
        items: [
            // Las columnas se configuran dinámicamente desde el controlador
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
    lbar: {
        border: false,
        items: [
            {
                xtype: 'button',
                icon: 'resources/img/botones/expanded.png',
                tooltip: 'Expand the tree',
                listeners: {
                    click: function (button) {
                        button.up().up().expandAll();
                    }
                }
            },
            {
                xtype: 'button',
                icon: 'resources/img/botones/collaped.png',
                tooltip: 'Collapse the tree',
                listeners: {
                    click: function (button) {
                        button.up().up().collapseAll();
                    }
                }
            }
        ]
    }
});
