Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainChangePayment', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridMainChangePayment',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1500,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridMainChangePayment',
            width: 1475,
            height: 600,
            columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                items: [
                    {
                        text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Business<br>Date', dataIndex: 'BSUMDATE', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Installment',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Plan', dataIndex: 'NBRINSTA', width: 70,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                    return value;
                                }
                            },
                            {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'PNR', dataIndex: 'SPNR', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Document<br>Type', dataIndex: 'descTDOC', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Status<br>Settlement vs Sales', dataIndex: 'descSTVAL', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Credit Card', dataIndex: 'SCARDN', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Curr.', dataIndex: 'PCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Transact<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:right;background-color:" + data.COLOR;
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:right;background-color:" + data.COLOR;
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Submission<br>Merchant ID', dataIndex: 'SMERCHID', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 100,
                        text: 'MSI Tracking',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-update',
                                tooltip: 'Msi Tracking',
                                handler: 'onMsiTracking'
                            }
                        ]
                    }
                ]
            }
        }
    ]
});