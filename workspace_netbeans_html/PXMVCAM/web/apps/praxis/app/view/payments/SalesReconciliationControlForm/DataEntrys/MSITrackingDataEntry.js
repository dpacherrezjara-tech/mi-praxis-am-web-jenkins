prototype.idMSI = prototype.id + '-MSITrackingDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MSITrackingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MSITrackingDataEntry',
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
    tbar: {
        xtype: 'panel',
        border: false,
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items: [
            {
                xtype: 'checkbox',
                id: prototype.idMSI + '-changeView',
                fieldLabel: 'Manual Conciliation',
                labelStyle: 'font-weight:bold;text-align:right;',
                labelWidth: 200,
                width: 270,
                scale: 'small',
                listeners: {
                    change: 'onChangeView'
                }
            }
        ]
    },
    items: [
        //<editor-fold defaultstate="collapsed" desc="MSI Tracking">
        {
            xtype: 'grid',
            border: false,
            id: prototype.idMSI + '-gridMSITracking',
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
            store: [],
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
                        const match = ['6'];
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
                        text: 'Ref. Number', dataIndex: 'arefnbr', width: 150, hidden: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return value;
                        }
                    },
                    {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                    {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                    {text: 'PNR', dataIndex: 'spnr', width: 70},
                    {text: 'Doc.<br>Type', dataIndex: 'transtype', width: 60},
                    {text: 'Error Description', dataIndex: 'des_CERROR', width: 180,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            const info = record.data;
                            if (info.des_CERROR) {
                                metaData.tdAttr = 'data-qtip="' + info.des_CERROR + '"';
                            }
                            return value;
                        }
                    },
                    {text: 'Adju. Description', dataIndex: 'desc_CODADJU', width: 180,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            const info = record.data;
                            if (info.desc_CODADJU) {
                                metaData.tdAttr = 'data-qtip="' + info.desc_CODADJU + '"';
                            }
                            return value;
                        }},
                    {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 110},
                    {
                        text: 'Status', dataIndex: 'stval', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            const opts = {
                                '0': 'Stand By',
                                '1': 'Match',
                                '2': 'Sales Without Settl.',
                                '3': 'Settl. Without Sales',
                                '4': 'Match Diff.',
                                '5': 'Match Manual',
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
                    {text: 'Curr', dataIndex: 'scurrency', width: 60},
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
                        text: 'Card Number', dataIndex: 'scardn', width: 130
                    },
                    {
                        text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 75
                    },
                    {
                        text: 'Match Reference', dataIndex: 'observa', width: 150, hidden: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;color:red;";
                            return value;
                        }
                    }
                ]
            }
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Grid Manual">
        {
            xtype: 'grid',
            border: false,
            hidden: true,
            id: prototype.idMSI + '-gridVoidTracking',
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
            store: [],
            selModel: {
                type: 'checkboxmodel',
                checkboxSelect: false,
                checkOnly: true, // Solo permitir selección a través de casillas de verificación
                listeners: {
                    beforedeselect: 'multiTransacBeforeDeselect',
                    beforeselect: 'multiTransacBeforeSelect',
                    selectionchange: 'multiTransacChangeSelect'
                }
            },
            tbar: {
                xtype: 'panel',
                border: false,
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                width: '100%',
                items: [
                    //<editor-fold defaultstate="collapsed" desc="Filtros">
                    {
                        xtype: 'form',
                        id: prototype.idMSI + '-filtersManual',
                        border: false,
                        layout: {
                            type: 'hbox',
                            pack: 'end'
                        },
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            padding: '5 1 5 1',
                            anchor: '100%',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        },
                        items: [
                            {
                                xtype: 'datefield',
                                name: 'IN_FROM',
                                fieldLabel: 'From',
                                format: 'Ymd',
                                editable: false, // Deshabilita la edición del campo
                                labelWidth: 50,
                                width: 150,
                                value: new Date(anioActual, mesActual, 1)
                            },
                            {
                                xtype: 'datefield',
                                name: 'IN_TO',
                                fieldLabel: 'To',
                                format: 'Ymd',
                                altFormats: 'm',
                                editable: false, // Deshabilita la edición del campo
                                labelWidth: 30,
                                width: 130,
                                value: fechaActual
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Card Number',
                                labelWidth: 80,
                                width: 150,
                                name: 'creditcard',
                                readOnly: true
                            },
                            {
                                xtype: 'label',
                                text: '*****(*)'
                            },
                            {
                                xtype: 'textfield',
                                name: 'creditcard2',
                                width: 50,
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Auth',
                                labelWidth: 40,
                                width: 100,
                                name: 'IN_SAUTHOC',
                                maxLength: 6, // Límite máximo de caracteres
                                maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                listeners: {
                                    specialkey: 'onEnterKeyPress'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Ticket',
                                labelWidth: 60,
                                width: 160,
                                name: 'IN_TICKET',
                                maxLength: 13, // Límite máximo de caracteres
                                maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                listeners: {
                                    specialkey: 'onEnterKeyPress'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'PNR',
                                labelWidth: 40,
                                width: 120,
                                name: 'IN_SPNR',
                                maxLength: 8, // Límite máximo de caracteres
                                maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                listeners: {
                                    specialkey: 'onEnterKeyPress'
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'prx-icon-add',
                                margin: '2 2 2 2',
                                width: 25,
                                height: 25,
                                tooltip: 'Add',
                                listeners: {
                                    click: 'onAddTransaction'
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'prx-icon-search',
                                margin: '2 2 2 2',
                                width: 25,
                                height: 25,
                                tooltip: 'Search in Grid',
                                listeners: {
                                    click: 'onSearchTransaction'
                                }
                            },
                            {
                                xtype: 'button',
                                margin: '2 2 2 2',
                                width: 25,
                                height: 25,
                                iconCls: 'prx-icon-reload',
                                tooltip: 'Reload Grid',
                                listeners: {
                                    click: 'reloadGrid'
                                }
                            }
                        ]
                    },
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="Filtros en Grilla">
                    {
                        xtype: 'panel',
                        border: false,
                        layout: {
                            type: 'hbox',
                            pack: 'end'
                        },
                        width: '100%',
                        items: [
                            {
                                xtype: 'combo',
                                width: 250,
                                fieldLabel: 'Status',
                                labelWidth: 55,
                                store: Ext.create('Ext.data.SimpleStore', {
                                    fields: ['code', 'name'],
                                    data: [
                                        ['', 'All'],
                                        ['0', 'Stand By'],
                                        ['1', 'Match'],
                                        ['3', 'Settl. Without Sales'],
                                        ['4', 'Match Diff.'],
                                        ['5', 'Match Manual'],
                                        ['6', 'Forced Match'],
                                        ['7', 'Compensation Match'],
                                        ['8', 'Pending RFND']
                                    ]
                                }),
                                displayField: 'name',
                                valueField: 'code',
                                queryMode: 'local',
                                editable: false,
                                listeners: {
                                    select: 'onSelectStatus'
                                },
                                value: ''
                            }
                        ]
                    }
                    //</editor-fold>
                ]

            },
            bbar: {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    pack: 'start'
                },
                border: false,
                width: '100%',
                items: [
                    {
                        xtype: 'textfield',
                        id: prototype.idMSI + '-bpo-comment',
                        fieldLabel: 'BPO Comment',
                        labelStyle: 'font-weight:bold;',
                        labelWidth: 100,
                        width: 500,
                        maxLength: 100, // Límite máximo de caracteres
                        enforceMaxLength: true,
                        fieldStyle: 'text-align: left;',
                        padding: '5 1 5 1',
                        margin: '2 10 2 2',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        border: false,
                        layout: {
                            type: 'hbox',
                            pack: 'end'
                        },
                        defaults: {
                            fieldStyle: 'text-align: right;',
                            padding: '5 1 5 1',
                            margin: '2 10 2 2',
                            anchor: '100%',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false,
                            labelStyle: 'font-weight:bold;'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                id: prototype.idMSI + '-totalDiff',
                                fieldLabel: 'Adjustment',
                                value: '0.00',
                                readOnly: true,
                                width: 200,
                                labelWidth: 100
                            }
                        ]
                    }
                ]
            },
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'Ref. Number', dataIndex: 'arefnbr', width: 150, hidden: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return value;
                        }
                    },
                    {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                    {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                    {text: 'PNR', dataIndex: 'spnr', width: 70},
                    {text: 'Doc.<br>Type', dataIndex: 'transtype', width: 60},
                    {text: 'Error Description', dataIndex: 'des_CERROR', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            const info = record.data;
                            if (info.des_CERROR) {
                                metaData.tdAttr = 'data-qtip="' + info.des_CERROR + '"';
                            }
                            return value;
                        }},
                    {text: 'Adju. Description', dataIndex: 'desc_CODADJU', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            const info = record.data;
                            if (info.desc_CODADJU) {
                                metaData.tdAttr = 'data-qtip="' + info.desc_CODADJU + '"';
                            }
                            return value;
                        }},
                    {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 140},
                    {
                        text: 'Status', dataIndex: 'stval', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            const opts = {
                                '0': 'Stand By',
                                '1': 'Match',
                                '2': 'Sales Without Settl.',
                                '3': 'Settl. Without Sales',
                                '4': 'Match Diff.',
                                '5': 'Match Manual',
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
                    {text: 'Curr', dataIndex: 'scurrency', width: 60},
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
                        text: 'Card Number', dataIndex: 'scardn', width: 130
                    },
                    {
                        text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 75
                    }
                ]
            }
        }
        //</editor-fold>
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
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
                    text: 'Update Manual',
                    hidden: true,
                    id: prototype.idMSI + '-btn-update-man',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateManual'
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