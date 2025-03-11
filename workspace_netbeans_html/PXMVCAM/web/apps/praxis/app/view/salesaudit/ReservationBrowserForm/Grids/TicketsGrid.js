Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.TicketsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-TicketsGrid',
    requires: [
        'Ext.Praxis.controller.salesaudit.ReservationBrowser.TicketsGridController'
    ],
    controller: 'TicketsGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
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
            {
                text: 'RN',
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
            {text: 'Src', dataIndex: 'FUENTE', width: 50},
            {text: 'Queue', dataIndex: 'JOBQUEUE', width: 100},
            {text: 'Transaction', dataIndex: 'TRNCU', width: 90},
            {text: 'Ticket', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const {CCIA, FORMA, SERIE} = record.data;
                    return CCIA + FORMA + SERIE;
                }
            },
            {text: 'PNR', dataIndex: 'PNR', width: 80},
            {text: 'PNR<br>Sabre', dataIndex: 'PNRAA', width: 80},
            {text: 'Pax<br>Name', dataIndex: 'PAX', width: 250,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                    return value;
                }
            },
            {text: 'Pax<br>Number', dataIndex: 'CODPAX', width: 80},
            {text: 'DOCS', dataIndex: 'DOCS', width: 500,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                    return value;
                }
            },
            {text: 'DOCA', dataIndex: 'DOCA', width: 500,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                    return value;
                }
            },
            {text: 'OSIS', dataIndex: 'OSIS', width: 700,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                    return value;
                }
            },
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
                hidden: true,
                id: prototype.id + '-backButton-1',
                scale: 'small',
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back',
                listeners: {
                    click: 'onClickBackButton'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


