Ext.define('Ext.Praxis.view.payments.EmdsControlForm.Grids.EmdsControlGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-EmdsControlGrid',
    id: '-EmdsControlGrid',
    requires: [
        'Ext.Praxis.controller.payments.EmdsControl.EmdsControlGridController'
    ],
    controller: 'EmdsControlGridController',    
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
            { text: 'Verify', headerCheckbox: true, dataIndex: 'CHECK', width: 60, xtype: 'checkcolumn',
                listeners: {
                    beforecheckchange: function (checkCol, rowIndex, checked, record) {
                        // Si originalmente estaba en 1, no permitir cambios, porque ya fue validado anteriormente
                        if (record.get('CHECK_ORIGIN') === 1) {
                            return false;
                        }
                    },
                     // Controla el check del header
                    beforeheadercheckchange: function (checkCol, checked, eOpts) {
                        const grid = checkCol.up('grid');
                        const store = grid.getStore();

                        store.each(function (rec) {
                            // Solo aplicar cambios a los que inicialmente eran 0, porque no fueron validados por el analista
                            if (rec.get('CHECK_ORIGIN') === 0) {
                                rec.set('CHECK', checked ? 1 : 0);
                            }
                        });

                        return false; // evita que el header cambie todo automáticamente
                    }
                }
            },
            { text: 'lastedCheck', dataIndex: 'CHECK_ORIGIN', readOnly: true, width: 80, xtype: 'checkcolumn', hidden: true },
            {
                text: 'Ticket', dataIndex: 'TICKET', width: 110, 
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    let ticket = record.get('CCIA') + record.get('FORMA') + record.get('SERIE') ;
                    if (ticket === '') {
                        // Caso: sin ticket
                        metaData.style = "background-color:#FCF6DC;";
                    } else if (record.get('CHECK_ORIGIN') === 1) {
                        // Caso: ya estaba marcado originalmente
                        metaData.style = "background-color:#C8F4B4;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer;";
                    } else {
                        // Caso: ticket válido y editable
                        metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer;";
                    }
                    return ticket ;
                },
                listeners: {
                    click: 'onClickInfo'
                }
            },
            {
                text: 'Seq', dataIndex: 'SEQ', width: 50
            },
            {
                text: 'Corrl', dataIndex: 'CORRL', width: 50
            },
            {
                text: 'Rolling', dataIndex: 'SEQROLL', width: 70, hidden: true
            },
            {
                text: 'Transaction', dataIndex: 'TRNCU', width: 85
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
                        text: 'Code', dataIndex: 'SCARDCOD', width: 60
                    },
                    {
                        text: 'Number', dataIndex: 'SCARDN2', width: 120
                    },
                    {
                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 80
                    },
                ]
            },
            {
                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100
            },
            {
                text: 'Sale<br>Date', dataIndex: 'SDATE', width: 100
            },
            {
                text: 'Ref. Number', dataIndex: 'AREFNBR', width: 160,
                listeners: {
                    click: 'onClickInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    return value;
                }
            },
            {
                text: 'Currency', dataIndex: 'MONEDA', width: 80
            },
            {
                text: 'Trans. Amount', dataIndex: 'TGROSAMOUN', width: 120,
                renderer: function (value, metaData, record) {
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Sale Amount', dataIndex: 'VFOPVTA', width: 120,
                renderer: function (value, metaData, record) {
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Difference<br>Amount', dataIndex: 'SALDO', width: 120,
                renderer: function (value, metaData, record) {
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'PNR Liquidation', dataIndex: 'LPNR', width: 120
            },
            {
                text: 'PNR Sale', dataIndex: 'SPNR', width: 100
            },
            { text: 'Doc. Type', dataIndex: 'TIPOD', width: 80 },
            { text: 'Document', dataIndex: 'TDOC', width: 80 },
            { text: 'Fuente', dataIndex: 'FUENTE_DESC', width: 80 },
            { text: 'Status<br>Robot', dataIndex: 'STBOT_DESC', width: 80 },
            {
                text: 'Sabre',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    renderer: function (value, metaData) {
                        metaData.style = "background-color:#C2FFBD;";
                        return value;
                    }
                },
                columns: [
                    { text: 'PNR', dataIndex: 'SAPNR', width: 80 },
                    { text: 'Amount', dataIndex: 'TOTALRB', width: 100,
                        renderer: function (value, metaData, record) {
                            metaData.style = "background-color:#C2FFBD;";
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    { text: 'Quantity<br>Tkts', dataIndex: 'QTYRB', width: 80 },
                    { text: 'Difference', dataIndex: 'DIFFRB', width: 100,
                        renderer: function (value, metaData, record) {
                            metaData.style = "background-color:#C2FFBD;";
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'Update',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    { text: 'User', dataIndex: 'USUP', width: 100 },
                    { text: 'Date', dataIndex: 'FEUP', width: 80 },
                    { text: 'Hour', dataIndex: 'HOUP', width: 80 }
                ]
            }
        ]
    },
    tbar: {
//        layout: {
//            pack: 'end'
//        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-save-blue-24',
                bodyStyle: 'background-color: white !important;',
                scale: 'small',
                tooltip: 'Save Validate Changes',
                listeners: {
                    click: 'saveValidate'
                }
            },
            '->',
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        