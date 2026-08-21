Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.InfoTransaction', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id2 + '-infoTransaction',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id2 + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id2 + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        //width: prototype.widthGrid,
                        width: '100%',
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id2 + '-gridData',
                            //width: prototype.widthGrid,
                            width: 900,
                            height: 400,
                            columnLines: true,
                            margin: 3,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'File', dataIndex: 'XFILE', width: 70,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Transacction', dataIndex: 'XTRANSACTION', width: 85
                                    },
                                    {
                                        text: 'Type', dataIndex: 'XTYPEI', width:54
                                    },
//                                    {
//                                        text: 'Credit<br>Code', dataIndex: 'XSRVCC', width: 60
//                                    },                                    
                                    {
                                        text: 'Transaction ID', dataIndex: 'XCREDID', width: 95
                                    },
                                    {
                                        text: 'Date', dataIndex: 'XDATE', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'XTICKET', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
//                                    {
//                                        text: 'Credit<br>ID', dataIndex: 'XIDISR', width: 90,
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center;";
//                                            return value;
//                                        }
//                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'XCURR', width: 60,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },

                                    {
                                        text: 'Value', dataIndex: 'XVALUE', width: 90,
                                        renderer: function (value, metaData) {
                                            if (value < 0)
                                                metaData.style = "text-align:right;color:red";
                                            else
                                                metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Balance <br>Remaining', dataIndex: 'XBALANCE', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                            ;
                                        }
                                    },
                                    {
                                        text: 'Exchange<br>rate', dataIndex: 'XTCAMBIO', width: 75,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0.000000');
                                            ;
                                        }
                                    },
                                    {
                                        text: 'Amount<br>Revenue', dataIndex: 'XVREVENUE', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                            ;
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">                        
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});