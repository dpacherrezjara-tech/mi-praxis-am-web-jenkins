Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.ByMerchant', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridByMerchant',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1134,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridByMerchant',
            width: 1134,
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
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 70, },
                    {text: 'Bank Code', dataIndex: 'CODEBANK', width: 70},
                    {text: 'DATEF', dataIndex: 'DATEF', width: 80},
                    {text: 'TIPOTAR', dataIndex: 'TIPOTAR', width: 80},
                    {text: 'Card Code', dataIndex: 'SCARCOD', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;";
                            metaData.tdAttr = 'data-qtip="' + data.strADescCard + '"';
                            return value;
                        }
                    },
                    {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                    {text: 'SAUTHOC', dataIndex: 'SAUTHOC', width: 80},
                    {text: 'Doc Type', dataIndex: 'TDOC', width: 80},
                    {text: 'Status', dataIndex: 'STVAL', width: 80},
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80},
                    {text: 'Amount', dataIndex: 'SVFOP', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Qty', dataIndex: 'QTYDOC', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return value;
                        }
                    },
                    {text: 'Agent', dataIndex: 'SAGENT', width: 80},
                    {text: 'Source', dataIndex: 'FTE', width: 80},
                ]
            }
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelDataSummary8',
            width: 1134,
            align: 'left',
            margin: '0 0 0 0 ',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                xtype: 'label',
                align: 'center',
                html: '' + '&nbsp',
                height: 25,
                padding: '5 5 5 0',
                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
            },
            items: [
                {width: 920, id: prototype.id + '-totSVFOP', align: 'center'},
                {width: 50, id: prototype.id + '-totQTYDOC', align: 'center'},
                {width: 160},
            ]
        }
    ]
});