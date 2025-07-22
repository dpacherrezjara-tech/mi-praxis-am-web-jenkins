Ext.define('Ext.Praxis.view.payments.SalesComplementForm.Grids.MitGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MitGrid',
    requires:[
      'Ext.Praxis.controller.payments.SalesComplement.MitGridController'  
    ],
    controller:'MitGridController',
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
//            {
//                text: 'MIT ID', dataIndex: 'RN', width: 85
//            },
            {
                text: 'Processor', dataIndex: 'A4775PROCE', width: 85
            },
            {
                text: 'Processing',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Date', dataIndex: 'A4775PRDA', width: 90
                    }
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
                        text: 'ID', dataIndex: 'A4775MERID', width: 80
                    },
                    {
                        text: 'PG', dataIndex: 'A4775MERPG', width: 80
                    },
                    
                ]
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
                        text: 'Date', dataIndex: 'A4775FECTR', width: 80
                    },
                    {
                        text: 'Time', dataIndex: 'A4775HORTR', width: 80
                    },
                ]
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Number', dataIndex: 'A4775NUMTJ', width: 120
                    },
                    {
                        text: 'Auth.', dataIndex: 'A4775NUMAT', width: 80
                    },
                     {
                        text: 'Type', dataIndex: 'A4775PRICD', width: 120
                    },
                    {
                        text: 'Payment Type', dataIndex: 'A4775PLANP', width: 120
                    },
                    {
                        text: 'Issuer', dataIndex: 'A4775EMISO', width: 85
                    },  
                        ]
                    },
                    {
                        text: 'PNR', dataIndex: 'A4775PNR', width: 90
                    },
                    {
                        text: 'Currency', dataIndex: 'A4775MONED', width: 85
                    },
                    {
                        text: 'Amount', dataIndex: 'A4775IMPOR', width: 85,
                        renderer: function (value, metaData, record) {
//                            metaData.style = "text-align:center;background-color:#bde1ff;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                    },
                    {
                        text: 'Type Transaction', dataIndex: 'A4775TRXTP', width: 150
                    },
                    {
                        text: 'MIT ID', dataIndex: 'A4775SQNR', width: 85
                    },
                    {
                        text: 'Status', dataIndex: 'A4775STATU', width: 85
                    },
                    {
                        text: 'Status Transaction', dataIndex: 'A4775STVAL', width: 150
                    },
//                    {
//                        text: 'Accounting',
//                        defaults: {
//                            menuDisabled: true,
//                            sortable: false,
//                            align: 'center'
//                        },
//                        columns: [
//                            {
//                                text: 'User', dataIndex: 'A4775REGIS', width: 120
//                            },
//                            {
//                                text: 'Fecha', dataIndex: 'A4775FREGI', width: 80
//                            },
//                             {
//                                text: 'Hora', dataIndex: 'A4775HREGI', width: 120
//                            },
//                        ]
//                    }


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



        