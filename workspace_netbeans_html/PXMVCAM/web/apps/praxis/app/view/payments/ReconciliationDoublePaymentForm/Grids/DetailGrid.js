Ext.define('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReconciliationDoublePayment.DetailGridController'
    ],
    controller: 'DetailGridController',
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
            {
                text: 'Status', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return 'Concil.';
                }
            },
            {
                text: 'Src', dataIndex: 'fuente', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'S': 'ASR',
                        'B': 'BSP',
                        'M': 'Manual',
                        'A': 'ARC'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
            },
            {
                text: 'Credit Card',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {
                        text: 'Cod', dataIndex: 'scarcod', width: 45
                    },
                    {
                        text: 'Number', dataIndex: 'scardn', width: 130
                    },
                    {
                        text: 'Auth', dataIndex: 'sauthoc', width: 55
                    }
                ]
            },
            {
                text: 'Curr', dataIndex: 'scurrency', width: 50
            },
            {
                text: 'Amount', dataIndex: 'svfops', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Amount<br>Transaction', dataIndex: 'svfops_TOTAL', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
            },
            {
                text: 'PNR', dataIndex: 'spnr', width: 70
            },
            {
                text: 'Ticket', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                    const obj = record.data;
                    const ticket = obj.ccia + obj.forma + obj.serie;
                    return ticket;
                }
            },
            {
                text: 'Corrl', width: 45, dataIndex: 'corrl'
            },

            {
                text: 'Void', width: 40, dataIndex: 'fvoid'
            },
            {
                text: 'Agent', dataIndex: 'sagent', width: 80
            },
            {
                text: 'Adjustment',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Code', dataIndex: 'cerror', width: 45,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const {trncu} = record.data;
                            metaData.style = "text-align:center";
                            return trncu === 'ADJU' ? value : '';
                        }
                    },
                    {
                        text: 'Description', dataIndex: 'desc_CODADJU', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Commission',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:right;";
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                columns: [
                    {
                        text: 'Base Comm.', dataIndex: 'discamounc', width: 120
                    },
                    {
                        text: 'VAT', dataIndex: 'discamouni', width: 120
                    }
                ]
            },
            {
                text: 'MSI',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:right;";
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                columns: [
                    {
                        text: 'Serv. Fee', dataIndex: 'acceamou', width: 120
                    },
                    {
                        text: 'VAT<br>Serv. Fee', dataIndex: 'ivacom12', width: 120
                    }
                ]
            },
            {
                text: 'Accounting',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {
                        text: 'Date', dataIndex: 'liq_FCON', width: 80
                    },
                    {
                        text: 'ID', dataIndex: 'liq_IDCON', width: 350
                    },
                    {
                        text: 'Status', dataIndex: 'liq_STCON', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                            return value === '1' ? 'Accounted' : 'Pending';
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
                scale: 'small',
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


