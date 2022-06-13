Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataGridMsiTracking', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataGridMsiTrackingForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliAmex.DataGridMsiTrackingController'
    ],
    controller: 'DataGridMsiTrackingController',
    title: 'MSI Tracking - Grid Data',
    header: true,
    height: 160,
    width: 1370,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                width: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMsiTracking',
                                    height: 150,
                                    columnLines: true,
                                    plugins: [
                                        {
                                            ptype: 'cellediting',
                                            clicksToEdit: 1
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            /*{
                                             text: 'Passenger Name', dataIndex: 'A720PAX', width: 280,
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:left;";
                                             return value;
                                             },
                                             editor: {xtype: 'textfield', editable: false}
                                             },*/
                                            {
                                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100,
                                            },
                                            {
                                                text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 100,
                                            },
                                            {
                                                text: 'Business<br>Date', dataIndex: 'BSUMDATE', width: 100,
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
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 80
                                            },
                                            {
                                                text: 'Document<br>Type', dataIndex: 'descTDOC', width: 80
                                            },
                                            {
                                                text: 'Status<br>Settlement vs Sales', dataIndex: 'descSTVAL', width: 160
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'PCURRENCY', width: 80,
                                            },
                                            {
                                                text: 'Transact<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'SCARDN', width: 120
                                            },
                                            {
                                                text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                            },
                                            {
                                                text: 'Submission<br>Merchant ID', dataIndex: 'SMERCHID', width: 100,
                                            },
                                        ]
                                    }
                                },
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}
);