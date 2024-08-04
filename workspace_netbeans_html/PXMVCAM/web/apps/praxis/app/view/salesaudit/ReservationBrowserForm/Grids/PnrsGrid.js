Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.PnrsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-PnrsGrid',
    requires: [
        'Ext.Praxis.controller.salesaudit.ReservationBrowser.PnrsGridController'
    ],
    controller: 'PnrsGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1000,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        emptyText: 'No records found',
        deferEmptyText: false
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
                text: 'RN',
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
            {text: 'PNR', dataIndex: 'PNR', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                    metaData.style += "font-weight:bolder;color:#057ECB;";
                    return value;
                },
                listeners: {
                    click: 'onClickPNR'
                }
            },
            {text: 'PNR<br>Sabre', dataIndex: 'PNRAA', width: 100},
            {text: 'Source', dataIndex: 'FUENTE', width: 80},
            {text: 'Queue', dataIndex: 'JOBQUEUE', width: 100},
            {text: 'Ticket<br>Ref.', dataIndex: 'REFTKT', width: 130},
            {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 60},
            {text: 'Status', dataIndex: 'STSEARCH', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = {
                        'P': 'Pending',
                        'F': 'Found',
                        'N': 'Not found'
                    };
                    return sts[value.trim()];
                }
            },
            {text: 'Search<br>Nbr', dataIndex: 'NBRSEARCH', width: 70},
            {text: 'Origin', dataIndex: 'TXTORIGIN', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = {
                        'SW': 'Sabre WS',
                        'CC': 'Command Center'
                    };
                    return sts[value.trim()] || '';
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
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


