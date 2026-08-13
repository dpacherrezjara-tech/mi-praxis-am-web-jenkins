Ext.define('Ext.Praxis.view.invoice.BillableCodeCatalogForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.invoice.BillableCodeCatalog.MainGridController'
    ],
    controller: 'MainGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
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
            //{text: 'Nbr', dataIndex: 'rn', width: 40, hidden: true},
            {text: 'Type', dataIndex: 'TIPO', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        'CTA': 'Cuenta Contable',
                        'FBAS': 'Farebasis',
                        'IATA': 'IATA',
                        'RFIS': 'RFIS',
                        'UATP': 'UATP',
                        'FDES': 'Fare Designator'
                    };
                    return opts[value.trim()];
                }
            },
            {text: 'Key', dataIndex: 'CLAVE', width:150},
            {text: 'Description', dataIndex: 'DESCRIP', flex: 1},
            {text: 'Billable Code', dataIndex: 'CFACT', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        '0': '0-Facturable',
                        '1': '1-No Facturable',
                        '2': '2-Facturable Glob.',
                        '3': '3-Facturable Auto.',
                        '4': '4-Masivo',
                        '5': '5-Bulk',
                        '6': '6-PreCompra'
                    };
                    return opts[value.trim()];
                }
            },
            {text: 'Valid',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'From', dataIndex: 'FDESDE', width: 80},
                    {text: 'To', dataIndex: 'FFIN', width: 80}
                ]
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


