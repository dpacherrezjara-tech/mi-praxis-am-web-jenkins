
Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.InfoEstadoCuenta', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id3 + '-infoEstadoCuenta',
    // layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id3 + '-boxConsultas',
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
                    id: prototype.id3 + '-boxMainData',
                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">                        
                        {
                            xtype: 'grid',
                            id: prototype.id3 + '-gridData',
                            width: prototype.widthGrid,
                            height: 450,
                            columnLines: true,
                            //store: storeInfo,
                            store: [
                                Ext.create('Ext.data.Store', {
                                    storeId: prototype.id3 + 'storeInfo',
                                    page: {
                                        start: 0,
                                        limit: 20
                                    }
                                })
                            ],
                            viewConfig: {
                                deferEmptyText: false,
                                emptyText: 'No data Available'
                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Date<br>of Transaction', dataIndex: 'A4417FEMI', width: 85
                                    },
                                    {
                                        text: 'File', dataIndex: 'A4417ARCHI', width: 70
                                    },
                                    {
                                        text: 'Transaction<br>ID(BT)', dataIndex: 'A4417TRXID', width: 90
                                    },
                                    {
                                        text: 'Credit ID (TR)', dataIndex: 'A4417CREID', width: 90
                                    },
                                    {
                                        text: 'Transaction', dataIndex: 'A4417TRANS', width: 80
                                    },
                                    {
                                        text: 'Service<br>Credit', dataIndex: 'A4417SRVCC', width: 70
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A4417BTCUR', width: 65,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A4417TYPEI', width: 60
                                    },
                                    {
                                        text: 'Document<br>number', dataIndex: 'A4417DNUBR', width: 100
                                    },
                                    {
                                        text: 'Value', dataIndex: 'A4417VALOR', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value < 0)
                                                metaData.style = "text-align:right;color:red";
                                            else
                                                metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },                                    
                                    {
                                        text: 'Total<br>transaction', dataIndex: 'A4417TOTTR', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value < 0)
                                                metaData.style = "text-align:right;color:red";
                                            else
                                                metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Balance', dataIndex: 'A4417SALDO', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value < 0)
                                                metaData.style = "text-align:right;color:red";
                                            else
                                                metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            padding: '2px',  
                            width: 770,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'textfield', width: 268, id: prototype.id3 + '-A4417SALDO', readOnly: true,
                                    fieldLabel: 'Balance:', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:15px;', value: '0.00'
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }        
    ]
});