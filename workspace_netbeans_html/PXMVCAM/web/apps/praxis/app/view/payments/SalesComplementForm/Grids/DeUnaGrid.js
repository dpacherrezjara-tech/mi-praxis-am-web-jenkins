Ext.define('Ext.Praxis.view.payments.SalesComplementForm.Grids.DeUnaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DeUnaGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesComplement.DeUnaController'
    ],
    controller: 'DeUnaController',
    minHeight: 200,
    height: 'auto',
    width: 1700,
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
                dataIndex: 'RN',
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {
                text: 'Order ID', dataIndex: 'A4791ORDER', width: 170
            },
            {
                text: 'Processing<br>Date', dataIndex: 'A4791PRDA', width: 80
            },
            {
                text: 'Ticket', dataIndex: 'A4791TKT', width: 100
            },
            {
                text: 'PNR', dataIndex: 'A4791PNR', width: 80
            },
            {
                text: 'Transaction<br>Id', dataIndex: 'A4791TRANS', width: 150
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Number', dataIndex: 'SCARDN', width: 120,
                    },
                    {
                        text: 'Auth.', dataIndex: 'A4791AUTH', width: 80
                    },
                    {
                        text: 'Issue.', dataIndex: 'A4791ISSBK', width: 70
                    },
                    {
                        text: 'Method<br>Type', dataIndex: 'A4791MTYPE', width: 70
                    },
                    {
                        text: 'Card Brand', dataIndex: 'A4791CARDB', width: 80
                    },
                ]
            },
            {
                text: 'Currency', dataIndex: 'A4791CURRE', width: 80,
                renderer: function (metaData) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                }
            },
            {
                text: 'Total', dataIndex: 'A4791TOTAL', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Sub Total', dataIndex: 'A4791SUBTO', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Ship Amount<br> Total', dataIndex: 'A4791SHIPT', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Discount<br>Amount<br>Total', dataIndex: 'A4791DISCO', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Tax Amount<br>Total', dataIndex: 'A4791TAX', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },

            {
                text: 'Total Amount<br>With Taxes', dataIndex: 'A4791TOTWT', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Total Order<br> Amount', dataIndex: 'A4791TORDE', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Status<br>Complement', dataIndex: 'A4791STATU', width: 100
            },
            {
                text: 'DEUNA<br>Processor', dataIndex: 'A4791PROCE', width: 100
            },
            {
                text: 'Reconciliation',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    backgroundColor: '#B2DAFA'
                },
                columns: [
                    { text: 'Status', dataIndex: 'STVAL_DESCRIPTION', width: 80 },
                    { text: 'Proceesor', dataIndex: 'PROSQ_DESCRIPTION', width: 100 },
                    { text: 'Proccessing<br>Date', dataIndex: 'A4791PRDAL', width: 90 },
                    { text: 'Ref. Number', dataIndex: 'A4791AREFN', width: 150 },
                ]
            },
            {
                text: 'Merchand',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Id', dataIndex: 'A4791MERID', width: 150
                    },
                    {
                        text: 'Country', dataIndex: 'A4791MERPS', width: 70
                    },
                ]
            },
            {
                text: 'Interest Rater', dataIndex: 'A4791RATE', width: 100
            },
            {
                text: 'MSI', dataIndex: 'A4791MSI', width: 100
            },
            {
                text: 'Installments', dataIndex: 'A4791INSTA', width: 100
            },
            {
                text: 'Installments<br>Amount', dataIndex: 'A4791INSTM', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Date Create', dataIndex: 'A4791FECPG', width: 140
            },
            {
                text: 'Updated',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    { text: 'User', dataIndex: 'A4791REVIS', width: 80 },
                    { text: 'Date', dataIndex: 'A4791FREVI', width: 80 }
                ]
            },
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
                    click: 'downloadExcelMit'
                }
            },
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        