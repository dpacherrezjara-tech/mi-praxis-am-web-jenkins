prototype.idCHBK = prototype.id + '-CHBKTrackingDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ChargebackTrackingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ChargebackTrackingDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ChargebackTrackingDataEntryController'
    ],
    controller: 'ChargebackTrackingDataEntryController',
    title: 'Chargeback Tracking - Form',
    header: true,
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
            xtype: 'panel',
            width: '100%',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            tbar: {
                layout: {
                    pack: 'end'
                },
                defaults: {
                    scale: 'small'
                }, items: [
//                    {
//                        xtype: 'checkbox',
//                        id: prototype.idCHBK + '-chkChangeView',
//                        fieldLabel: 'Manual Conciliation',
//                        labelStyle: 'font-weight:bold;text-align:right;',
//                        labelWidth: 200,
//                        width: 270,
//                        listeners: {
//                            change: 'onChangeView'
//                        }
//                    }
                    {
                        xtype: 'radiogroup',
                        id: prototype.idCHBK + '-rbOpcion',
                        hidden: true,
                        items: [
                            {
                                boxLabel: 'Rev. CHBK<br>Concil.',
                                name: 'rb',
                                inputValue: '1',
                                checked: true,
                                width: 100
                            },
                            {
                                boxLabel: 'SALE<br>Concil.',
                                name: 'rb',
                                inputValue: '2',
                                width: 100
                            },
                            {
                                boxLabel: 'Manual<br>Concil.',
                                name: 'rb',
                                inputValue: '3',
                                width: 100
                            }
                        ],
                        listeners: {
                            change: 'onRadioGroupChange'
                        }
                    }
                ]
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Total Conciliation">
                {
                    xtype: 'grid',
                    border: false,
                    id: prototype.idCHBK + '-gridCHBKTracking',
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false,
                        listeners: {
                            refresh: function (dataview) {
                                Ext.each(dataview.panel.columns, function (column) {
                                    if (column.autoSizeColumn === true)
                                        column.autoSize();
                                });
                            }
                        }
                    },
                    columnLines: true,
                    autoScroll: true,
                    minHeight: 180,
                    height: 'auto',
                    maxHeight: 400,
                    width: '100%',
                    selModel: {
                        type: 'checkboxmodel',
                        checkboxSelect: false,
                        checkOnly: true, // Solo permitir selección a través de casillas de verificación
                        listeners: {
                            selectionchange: function (sm, seleccionados) {
                                if (seleccionados.length > 2) {
                                    // Desseleccionar los registros adicionales si se supera el límite de 3
                                    sm.deselect(seleccionados.slice(2));
                                }
                            },
                            beforedeselect: function (selModel, record, index) {
                                if (record.data.main) {
                                    return false;
                                }
                            },
                            beforeselect: function (selModel, record, index) {
                                if (record.data.stval === '6') {
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
                            {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                            {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                            {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 90},
                            {text: 'Doc.<br>Type', dataIndex: 'transtype', width: 60},
                            {
                                text: 'Transaction Information',
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;background-color:#F0D094";
                                        return value;
                                    }
                                },
                                columns: [
                                    {
                                        text: 'Card Number', dataIndex: 'scardn', width: 130
                                    },
                                    {
                                        text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 70
                                    },
                                    {text: 'Curr', dataIndex: 'scurrency', width: 60},
                                    {
                                        text: 'Transac.<br>Amount', dataIndex: 'tgrosamoun', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#F0D094;font-weight:bolder;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sales<br>Amount', dataIndex: 'svfops', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#F0D094;font-weight:bolder;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Installment',
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
                                    {text: 'PNR', dataIndex: 'spnr', width: 70},
                                    {
                                        text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 40
                                    }
                                ]
                            },
                            {text: 'Error Description', dataIndex: 'des_CERROR', width: 180, autoSizeColumn: true},
                            {text: 'Adju. Description', dataIndex: 'desc_CODADJU', width: 180, autoSizeColumn: true},
                            {
                                text: 'Status', dataIndex: 'stval', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                    const opts = {
//                                        'A': 'Match OC/Camepa',
                                        'C': 'Match Complement',
//                                        'D': 'Match Balance',
                                        'E': 'Duplicate Payment',
                                        'M': 'Match Multi-Payment',
                                        '0': 'Stand By',
                                        '1': 'Match',
                                        '2': 'Sales Without Settl.',
                                        '3': 'Settl. Without Sales',
                                        '4': 'Match Partial',
                                        '5': 'Match Manual',
//                                        '6': 'Match Forced',
//                                        '7': 'Match Compensation',
                                        '8': 'Match Transactional',
                                        '9': 'Match Void'
                                    };
                                    return opts[value] || '';
                                }
                            }
                        ]
                    }
                },
                //</editor-fold>
                {
                    xtype: 'grid',
                    border: false,
                    id: prototype.idCHBK + '-gridSaleTracking',
                    hidden: true,
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false,
                        listeners: {
                            refresh: function (dataview) {
                                Ext.each(dataview.panel.columns, function (column) {
                                    if (column.autoSizeColumn === true)
                                        column.autoSize();
                                });
                            }
                        }
                    },
                    listeners: {
                        storechange: 'storeChangeSale'
                    },
                    columnLines: true,
                    autoScroll: true,
                    minHeight: 180,
                    height: 'auto',
                    maxHeight: 400,
                    width: '100%',
                    selModel: {
                        type: 'checkboxmodel',
                        checkboxSelect: false,
                        checkOnly: true, // Solo permitir selección a través de casillas de verificación
                        listeners: {
                            selectionchange: function (sm, seleccionados) {
                                if (seleccionados.length > 2) {
                                    // Desseleccionar los registros adicionales si se supera el límite de 3
                                    sm.deselect(seleccionados.slice(2));
                                }
                            },
                            beforedeselect: function (selModel, record, index) {
                                if (record.data.STMAIN === '1') {
                                    return false;
                                }
                            },
                            beforeselect: function (selModel, record, index) {
                                if (record.data.stval === '6') {
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
                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80},
                            {text: 'Payment<br>Merchant ID', dataIndex: 'PMERCHID', width: 90},
                            {text: 'Doc.<br>Type', dataIndex: 'TRANSTYPE', width: 60},
                            {
                                text: 'Transaction Information',
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;background-color:#F0D094";
                                        return value;
                                    }
                                },
                                columns: [
                                    {
                                        text: 'Card Number', dataIndex: 'SCARDN', width: 130
                                    },
                                    {
                                        text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 70
                                    },
                                    {text: 'Curr', dataIndex: 'SCURRENCY', width: 60},
                                    {
                                        text: 'Transac.<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#F0D094;font-weight:bolder;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#F0D094;font-weight:bolder;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Installment',
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
                                            {text: 'Plan', dataIndex: 'NBRINSTA', width: 60},
                                            {text: 'Number', dataIndex: 'INSTANBR', width: 60}
                                        ]
                                    },
                                    {text: 'PNR', dataIndex: 'SPNR', width: 70},
                                    {
                                        text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40
                                    }
                                ]
                            },
                            {text: 'Error Description', dataIndex: 'DES_CERROR', width: 180, autoSizeColumn: true},
                            {text: 'Adju. Description', dataIndex: 'DESC_CODADJU', width: 180, autoSizeColumn: true},
                            {
                                text: 'Status', dataIndex: 'STVAL', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                    const opts = {
//                                        'A': 'Match OC/Camepa',
                                        'C': 'Match Complement',
//                                        'D': 'Match Balance',
                                        'E': 'Duplicate Payment',
                                        'M': 'Match Multi-Payment',
                                        '0': 'Stand By',
                                        '1': 'Match',
                                        '2': 'Sales Without Settl.',
                                        '3': 'Settl. Without Sales',
                                        '4': 'Match Partial',
                                        '5': 'Match Manual',
//                                        '6': 'Match Forced',
//                                        '7': 'Match Compensation',
                                        '8': 'Match Transactional',
                                        '9': 'Match Void'
                                    };
                                    return opts[value] || '';
                                }
                            }
                        ]
                    }
                },
                //<editor-fold defaultstate="collapsed" desc="Parcial Conciliation">
                {
                    xtype: 'panel',
                    id: prototype.idCHBK + '-panelCHBKBrowser',
                    hidden: true,
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: false,
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Inputs">
                        {
                            xtype: 'form',
                            id: prototype.idCHBK + '-formCHBKBrowser',
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Chargeback Browser</span>',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'left'
                                    },
                                    border: true,
                                    margin: '5 5 5 5',
                                    width: '100%',
                                    style: {
                                        backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        margin: '5 8 5 8',
                                        labelStyle: 'text-align:left;font-weight: bolder;',
                                        fieldStyle: 'text-align:center;',
                                        editable: false
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Processor',
                                            name: 'desc_PROC',
                                            labelWidth: 80,
                                            width: 230
                                        },
                                        {
                                            fieldLabel: 'Card Number',
                                            name: 'scardn',
                                            labelWidth: 100,
                                            width: 240
                                        },
                                        {
                                            fieldLabel: 'Ticket',
                                            name: 'ticket',
                                            labelWidth: 60,
                                            width: 180
                                        },
                                        {
                                            fieldLabel: 'PNR',
                                            name: 'spnr',
                                            labelWidth: 50,
                                            width: 120
                                        },
                                        {
                                            fieldLabel: 'Transac. Amt',
                                            name: 'tgrosamoun',
                                            labelWidth: 100,
                                            fieldStyle: 'text-align:right;background: #C0EDB3;',
                                            width: 200,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            },
                                            value: '0.00'
                                        },
                                        {
                                            fieldLabel: 'From',
                                            name: 'IN_DATEFROM',
                                            labelWidth: 40,
                                            width: 150,
                                            xtype: 'datefield',
                                            format: 'Ymd', // Formato de fecha deseado
                                            submitFormat: 'Ymd', // Formato de fecha para enviar al servidor
                                            allowBlank: false, // No permite fechas vacías
                                            maxLength: 8, // Máximo de 10 caracteres
                                            minLength: 8,
                                            enforceMaxLength: true,
                                            value: new Date()
                                        },
                                        {
                                            fieldLabel: 'To',
                                            name: 'IN_DATETO',
                                            labelWidth: 40,
                                            width: 150,
                                            xtype: 'datefield',
                                            format: 'Ymd', // Formato de fecha deseado
                                            submitFormat: 'Ymd', // Formato de fecha para enviar al servidor
                                            allowBlank: false, // No permite fechas vacías
                                            maxLength: 8, // Máximo de 10 caracteres
                                            minLength: 8,
                                            enforceMaxLength: true,
                                            value: new Date()
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onSearchBrowser'
                                            }

                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Browser">
                        {
                            xtype: 'grid',
                            border: false,
                            margin: '5 5 5 5',
                            id: prototype.idCHBK + '-gridCHBKBrowser',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                listeners: {
                                    refresh: function (dataview) {
                                        Ext.each(dataview.panel.columns, function (column) {
                                            if (column.autoSizeColumn === true)
                                                column.autoSize();
                                        });
                                    }
                                }
                            },
                            columnLines: true,
                            autoScroll: true,
                            emptyText: 'No tickets available',
                            minHeight: 150,
                            height: 'auto',
                            maxHeight: 200,
                            width: '100%',
                            selModel: {
                                type: 'checkboxmodel',
                                mode: 'SINGLE',
                                checkboxSelect: false,
                                checkOnly: true, // Solo permitir selección a través de casillas de verificación
                                listeners: {
                                    beforeselect: function (selModel, record, index) {
                                        if (record.data.stval === '6') {
                                            return false;
                                        }
                                    },
                                    select: 'onSelectBrowser'
                                }
                            },
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                                    {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                                    {text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 145},
                                    {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 90},
                                    {text: 'Doc.<br>Type', dataIndex: 'transtype', width: 60},
                                    {
                                        text: 'Transaction Information',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:center;background-color:#F0D094";
                                                return value;
                                            }
                                        },
                                        columns: [
                                            {
                                                text: 'Card Number', dataIndex: 'scardn', width: 130
                                            },
                                            {
                                                text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 70
                                            },
                                            {text: 'Curr', dataIndex: 'scurrency', width: 60},
                                            {
                                                text: 'Transac.<br>Amount', dataIndex: 'tgrosamoun', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#F0D094;font-weight:bolder;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'svfops', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#F0D094;font-weight:bolder;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Installment',
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
                                            {text: 'Ticket', dataIndex: 'ticket', width: 110},
                                            {text: 'PNR', dataIndex: 'spnr', width: 70},
                                            {
                                                text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 40
                                            }
                                        ]

                                    },
                                    {text: 'Adju. Description', dataIndex: 'desc_CODADJU', flex: 1,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            if (value.trim() !== '') {
                                                metaData.tdAttr = 'data-qtip="' + data.desc_CODADJU + '"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'stval', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                            const opts = {
//                                                'A': 'Match OC/Camepa',
                                                'C': 'Match Complement',
//                                                'D': 'Match Balance',
                                                'E': 'Duplicate Payment',
                                                'M': 'Match Multi-Payment',
                                                '0': 'Stand By',
                                                '1': 'Match',
                                                '2': 'Sales Without Settl.',
                                                '3': 'Settl. Without Sales',
                                                '4': 'Match Partial',
                                                '5': 'Match Manual',
//                                                '6': 'Match Forced',
//                                                '7': 'Match Compensation',
                                                '8': 'Match Transactional',
                                                '9': 'Match Void'
                                            };
                                            return opts[value] || '';
                                        }
                                    }
                                ]
                            }

                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Desglose CHBK">
                        {
                            xtype: 'grid',
                            border: false,
                            title: 'Tickets Information',
                            id: prototype.idCHBK + '-gridDesgloseCHBK',
                            margin: '5 5 5 5',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
                            autoScroll: true,
                            minHeight: 150,
                            height: 'auto',
                            maxHeight: 210,
                            width: '100%',
                            emptyText: 'No cards available',
                            selModel: {
                                type: 'checkboxmodel',
                                mode: 'MULTI',
                                checkboxSelect: false,
                                checkOnly: true,
                                listeners: {
                                    select: 'onSelectDesglose',
                                    deselect: 'onDeselectDesglose',
                                    beforeselect: function (selModel, record, index) {
                                        if (record.data.reversa === 'Y') {
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
                                        text: 'RN',
                                        xtype: 'rownumberer', // Columna de número de fila
                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                    },
                                    {
                                        text: 'Status', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            const {stval} = record.data;
                                            const opts = {
                                                '5': 'Chargeback',
                                                '6': 'Reverse Chbk'
                                            };
                                            return opts[stval] || '';
                                        }
                                    },
                                    {
                                        text: 'Credit Card',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        columns: [
                                            {
                                                text: 'Cod', dataIndex: 'scarcod', width: 45
                                            },
                                            {
                                                text: 'Number', dataIndex: 'cardnbr', width: 150
                                            },
                                            {
                                                text: 'Auth', dataIndex: 'authnbr', width: 65
                                            },
                                            {
                                                text: 'Curr', dataIndex: 'mfop', width: 60
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'vfop', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Auth<br>Amount', dataIndex: 'autamount', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Doc.<br>Type', width: 70, dataIndex: 'tpdoc'
                                    },
                                    {
                                        text: 'Sale<br>Date', width: 80, dataIndex: 'sentdate'
                                    },
                                    {
                                        text: 'Ticket', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                            const {ccia, forma, serie} = record.data;
                                            const ticket = ccia + forma + serie;
                                            return ticket;
                                        }
                                    },
                                    {
                                        text: 'PNR', width: 80, dataIndex: 'pnr'
                                    },
                                    {
                                        text: 'Agent', width: 90, dataIndex: 'agente'
                                    },
                                    {
                                        text: 'Invoice', width: 110, dataIndex: 'folio'
                                    },
                                    {
                                        text: 'Ref. Number', width: 110, dataIndex: 'numrefer'
                                    },
                                    {
                                        text: 'Status<br>Reverse', width: 90, dataIndex: 'reversa',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value === 'Y') {
                                                value = 'Reversed';
                                            } else {
                                                value = 'Pending';
                                            }
                                            return value;
                                        }
                                    }
                                ]
                            },
                            bbar: {
                                xtype: 'panel',
                                border: false,
                                width: '100%',
                                layout: {
                                    type: 'hbox',
                                    pack: 'end'
                                }, // Distribución horizontal
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '3 5 3 5',
                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                    fieldStyle: 'text-align:right;',
                                    editable: false
                                },
                                items: [
                                    {
                                        id: prototype.idCHBK + '-totTickets',
                                        fieldLabel: 'Total Tickets',
                                        submitValue: false,
                                        labelWidth: 100,
                                        width: 150,
                                        value: '0'
                                    },
                                    {
                                        id: prototype.idCHBK + '-totAmount',
                                        fieldLabel: 'Sum Amount',
                                        submitValue: false,
                                        labelWidth: 100,
                                        width: 180,
                                        value: '0.00'
                                    }
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: true,
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
                    id: prototype.idCHBK + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateCHBK'
                    }
                },
                {
                    text: 'Update',
                    hidden: true,
                    id: prototype.idCHBK + '-btn-update-sale',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateSALE'
                    }
                },
                {
                    text: 'Update Manual',
                    hidden: true,
                    id: prototype.idCHBK + '-btn-update-man',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateCHBKMan'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idCHBK + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});