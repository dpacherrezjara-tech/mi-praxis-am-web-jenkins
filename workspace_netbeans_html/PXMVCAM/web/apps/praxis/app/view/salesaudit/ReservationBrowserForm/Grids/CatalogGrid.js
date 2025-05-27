
Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.CatalogGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-CatalogGrid',
    requires: [
        'Ext.Praxis.controller.salesaudit.ReservationBrowser.CatalogGridController'
    ],
    controller: 'CatalogGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1150,
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
            {text: 'Key1', dataIndex: 'A4593KEY1', width: 100},
            {text: 'Key2', dataIndex: 'A4593KEY2', width: 100},
            {text: 'User', dataIndex: 'A4593KEY3', width: 100},
            {text: 'Password', dataIndex: 'A4593DESC1' },
            {text: 'Description', dataIndex: 'A4593DESC2', width: 300},
            {text: 'Comment', dataIndex: 'A4593COMEN', width: 300},
            {text: 'Status', dataIndex: 'A4593STS', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = {
                        '1': 'Active',
                        '0': 'Inactive',
                        '2': 'Blocked'
                    };
                    return sts[value.trim()];
                }
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
                        handler: 'onEditClick'
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
        }
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


