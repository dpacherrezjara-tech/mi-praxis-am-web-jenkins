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
                text: 'Process<br>Date', dataIndex: 'A4791PRDA', width: 90
            },
            {
                text: 'Ticket', dataIndex: 'A4791TKT', width: 90
            },
            {
                text: 'PNR', dataIndex: 'A4791PNR', width: 90
            },
            {
                text: 'Order ID', dataIndex: 'A4791ORDER', width: 180
            },
            {
                text: 'Transaction',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Id', dataIndex: 'A4791TRANS', width: 180
                    },
                ]
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
                        text: 'Number', dataIndex: 'A4791CARDN', width: 120
                    },
                    {
                        text: 'Auth.', dataIndex: 'A4791AUTH', width: 80
                    },
                    {
                        text: 'Issue.', dataIndex: 'A4791ISSBK', width: 80
                    },
                    {
                        text: 'Method<br>Type', dataIndex: 'METHOD_TYPE', width: 80
                    },
                    {
                        text: 'Card Brand', dataIndex: 'A4791CARDB', width: 80
                    },
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
                        text: 'Country', dataIndex: 'A4791MERPS', width: 80
                    },
                ]
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
                text: 'Date Create', dataIndex: 'A4791FECPG', width: 180
            },
            {
                text: 'Status', dataIndex: 'A4791STATU', width:90
            },
            {
                text: 'Currency', dataIndex: 'A4791CURRE', width: 100
            },
            {
                text: 'Concilitiaon<br>Status', dataIndex: 'A4791STVAL', width: 100
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



        