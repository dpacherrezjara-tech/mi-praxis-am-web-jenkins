Ext.define('Ext.Praxis.view.payments.PaymentsCommissionsForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.PaymentsCommissions.MainGridController'
    ],
    controller: 'MainGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1000,
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
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                locked: true,
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
                text: 'Type',
                dataIndex: 'codigo',
                width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;font-weight:bolder;";
                    if (value.trim() === 'COM') {
                        value = 'Commission';
                    }
                    return value;
                }
            },
            {
                text: 'Card<br>Type', dataIndex: 'tipotarj', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'D': 'Debit',
                        'C': 'Credit'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Installments', dataIndex: 'cuotas', width: 100
            },
            {text: 'Processor', dataIndex: 'desc_PROCTYPE', flex: 1},
            {
                text: 'Country', dataIndex: 'country', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value.trim() === '' ? 'All' : value;
                }
            },
            {
                text: 'Validity',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Initial<br>Date', dataIndex: 'fecfrom', width: 80},
                    {text: 'Expiry<br>Date', dataIndex: 'fecto', width: 80}
                ]
            },
            {text: '%<br>Commission', dataIndex: 'ratcnac', width: 90,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value + '%';
                }
            },
            {text: 'VAT', dataIndex: 'rateiva', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value + '%';
                }
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
                scale: 'small',
                hidden: true,
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back',
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


