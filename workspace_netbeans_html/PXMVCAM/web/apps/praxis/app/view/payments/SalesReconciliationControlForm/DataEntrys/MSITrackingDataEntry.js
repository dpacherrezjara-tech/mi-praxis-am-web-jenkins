prototype.idMSI = prototype.id + '-MSITrackingDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MSITrackingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TransacErrorBPODataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.MSITrackingDataEntryController'
    ],
    controller: 'MSITrackingDataEntryController',
    title: 'MSI Tracking - Form',
    header: true,
    height: 400,
    width: 1550,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'grid',
            border: false,
            id: prototype.idMSI + '-gridMSITracking',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            autoScroll: true,
            minHeight: 300,
            height: 'auto',
            maxHeight: 400,
            width: '100%',
            selModel: {
                type: 'checkboxmodel',
                checkboxSelect: false,
                checkOnly: true, // Solo permitir selección a través de casillas de verificación
                listeners: {
                    selectionchange: function (sm, seleccionados) {
                        if (seleccionados.length > 3) {
                            // Desseleccionar los registros adicionales si se supera el límite de 3
                            sm.deselect(seleccionados.slice(3));
                        }
                    },
                    beforedeselect: function (selModel, record, index) {
                        if (record.data.main) {
                            return false;
                        }
                    },
                    beforeselect: function (selModel, record, index) {
                        const match = ['1', '5', '6', '7'];
                        if (match.some(x => record.data.stval === x)) {
                            return false;
                        }
                    }
                }
            },
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'Ref. Number', dataIndex: 'arefnbr', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return value;
                        }
                    },
                    {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                    {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                    {text: 'PNR', dataIndex: 'spnr', width: 80},
                    {text: 'Doc. Type', dataIndex: 'transtype', width: 80},
                    {text: 'Error Description', dataIndex: 'des_CERROR', width: 250},
                    {text: 'Adju. Description', dataIndex: 'desc_CODADJU', width: 200},
                    {
                        text: 'Status', dataIndex: 'stval', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            const opts = {
                                '0': 'Stand By',
                                '1': 'Match',
                                '2': 'Sales Without Settl.',
                                '3': 'Settl. Without Sales',
                                '4': 'Match Diff.',
                                '5': 'Manual Match',
                                '6': 'Forced Match',
                                '7': 'Compensation Match',
                                '8': 'Pending RFND'
                            };
                            return opts[value] || '';
                        }
                    },
                    {
                        text: 'Installment', width: 120,
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true,
                            renderer: function (value, metaData, record, rowIndex, colIndex) {
                                metaData.style = "text-align:center;background-color:#F0D094;";
                                return value;
                            }
                        },
                        columns: [
                            {text: 'Plan', dataIndex: 'nbrinsta', width: 60},
                            {text: 'Number', dataIndex: 'instanbr', width: 60}
                        ]
                    },
                    {text: 'Currency', dataIndex: 'scurrency', width: 60},
                    {
                        text: 'Transac.<br>Amount', dataIndex: 'tgrosamoun', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Sales<br>Amount', dataIndex: 'svfops', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Card Number', dataIndex: 'scardn', width: 180
                    },
                    {
                        text: 'Auth Code', dataIndex: 'sauthoc', width: 100
                    },
                    {
                        text: 'Match Reference', dataIndex: 'observa', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;color:red;";
                            return value;
                        }
                    }
                ]
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.idMSI + '-btn-update-msi',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateMSI'
                    }
                },
                {
                    text: 'Update Reverse MSI',
                    id: prototype.idMSI + '-btn-update-rmsi',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateReverseMSI'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idMSI + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});