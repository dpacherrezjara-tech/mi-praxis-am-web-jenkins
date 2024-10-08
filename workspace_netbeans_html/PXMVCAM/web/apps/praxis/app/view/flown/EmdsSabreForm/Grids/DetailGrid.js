Ext.define('Ext.Praxis.view.flown.EmdsSabreForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.flown.EmdsSabre.DetailGridController'
    ],
    controller: 'DetailGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 850,
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
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Processing<br>Date', dataIndex: 'FPROC', flex: 1},
            {text: 'Total<br>EMDs', dataIndex: 'TOTEMD', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold";
                    return value;
                }
            },
            {text: 'Curr.', dataIndex: 'RMDA', width: 60},
            {text: 'Fare Rev.', dataIndex: 'TARIF', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Used',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#91fc63;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'USED', width: 100},
                    {text: 'Fare', dataIndex: 'UTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#91fc63";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'No Used',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#F0D094;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'PENDIENTE', width: 100},
                    {text: 'Fare', dataIndex: 'PTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            }
            //</editor-fold>
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
            },
            {
                xtype: 'button',
                id: prototype.id + '-backButton',
                scale: 'small',
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back to Summary',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


