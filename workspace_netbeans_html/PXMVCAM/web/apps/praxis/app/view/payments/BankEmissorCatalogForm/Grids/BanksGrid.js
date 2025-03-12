Ext.define('Ext.Praxis.view.payments.BankEmissorCatalogForm.Grids.BanksGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BanksGrid',
    requires: [
        'Ext.Praxis.controller.payments.BankEmissorCatalog.BanksGridController'
    ],
    controller: 'BanksGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 700,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
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
            {text: 'Bank Code', dataIndex: 'a4559CODE', width: 100},
            {text: 'Bank Name', dataIndex: 'a4559DESC',flex:1},
            {text: 'Country', dataIndex: 'a4559PAIS', width: 80},
            {text: 'Region', dataIndex: 'a4559REGI', width: 80},
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
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


