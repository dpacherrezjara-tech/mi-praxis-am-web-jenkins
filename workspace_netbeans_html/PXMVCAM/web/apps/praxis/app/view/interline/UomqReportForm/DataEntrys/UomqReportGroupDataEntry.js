prototype.idDE = prototype.id + '-UomqReportGroupDataEntry';

Ext.define('Ext.Praxis.view.interline.UomqReportForm.DataEntrys.UomqReportGroupDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.UomqReportGroupDataEntry',
    requires: [
        'Ext.Praxis.controller.interline.UomqReport.UomqReportGroupDataEntryController'
    ],
    controller: 'UomqReportGroupDataEntryController',
    title: 'Group - Form',
    header: true,
    width: 1000,
    minHeight: 200,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                        editable: false
                    }
                }
            },
            items: [
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'ID',
                                    name: 'IDFILE',
                                    labelWidth: 20,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'Proc. Date',
                                    name: 'PRDA',
                                    labelWidth: 80,
                                    width: 160
                                },
                                {
                                    fieldLabel: 'Qty. Groups',
                                    name: 'QGRUPOS',
                                    labelWidth: 80,
                                    width: 140
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Status',
                                    name: 'STSPRO',
                                    labelWidth: 70,
                                    width: 170,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['P', 'Processing'],
                                            ['L', 'Processed'],
                                            ['E', 'Error']
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true,
                                    border: false,
                                    value: '',
                                    listeners: {
                                        change: function (combo, record, eOpts) {
                                            var valor = combo.getValue();
                                            combo.inputWrap.setStyle({
                                                border: 'none',
                                                boxShadow: 'none',
                                                background: 'transparent'
                                            });
                                            // Reset estilo base primero
                                            combo.setFieldStyle('');

                                            // Aplica color dinámicamente según valor
                                            if (valor === 'P') {
                                                combo.setFieldStyle('background:#27F55E;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === 'L') {
                                                combo.setFieldStyle('background:#DE8849;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === 'E') {
                                                combo.setFieldStyle('background:#4980DE;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else {
                                                combo.setFieldStyle('background:#D991CE;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Details</span>',
                    defaults: {},
                    style: {
                        backgroundColor: '#9ebbd3ff' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            margin: '2 2 2 2',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: prototype.idDE + '-tabMain',
                                    width: '100%',
                                    height: 'auto',
                                    border: false,
                                    margin: '0 1 0 1',
                                    bodyStyle: 'background: transparent',
                                    defaults: {
                                        height: 'auto',
                                        autoScroll: false,
                                        layout: 'fit',
                                        defaults: {
                                            width: '100%',
                                            minHeight: 100,
                                            maxHeight: 300,
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            height: 'auto'
                                        }
                                    },
                                    items: [
                                        {
                                            title: 'Groups',
                                            itemId: '1',
                                            id: prototype.idDE + '-tabGroups',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    border: false,
                                                    id: prototype.idDE + '-gridGroups',
                                                    emptyText: 'No documents available',
                                                    tbar: {
                                                        xtype: 'panel',
                                                        id: prototype.idDE + '-boxGroup',
                                                        layout: {
                                                            type: 'hbox',
                                                            pack: 'end'
                                                        },
                                                        width: '100%',
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '2 5 2 5',
                                                                labelStyle: 'text-align:left;font-weight: bolder;',
                                                                fieldStyle: 'text-align:center;',
                                                                id: prototype.idDE + '-txtGroup',
                                                                editable: true,
                                                                fieldLabel: 'Group',
                                                                labelWidth: 70,
                                                                width: 200,
                                                                maxLength: 6,
                                                                maskRe: /[0-9]/
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                id: prototype.idDE + '-searchGroup',
                                                                iconCls: 'prx-icon-search',
                                                                tooltip: 'Search',
                                                                listeners: {
                                                                    click: 'onSearchGroup'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                iconCls: 'prx-icon-excel',
                                                                tooltip: 'Export to Excel',
                                                                listeners: {
                                                                    click: 'exportGroups'
                                                                }
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
                                                                text: 'RN',
                                                                locked: true,
                                                                xtype: 'rownumberer',
                                                                width: 60
                                                            },
                                                            {text: 'Group', dataIndex: 'GRUPO', flex: 1},
                                                            {text: 'Status', dataIndex: 'GRSTS', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    const opts = {
                                                                        'Y': () => {
                                                                            metaData.style = "background-color:#83EB94;color:#4C4E57;font-weight:bold";
                                                                            return 'Found';
                                                                        },
                                                                        'N': () => {
                                                                            metaData.style = "background-color:#F54927;color:#ffffff;font-weight:bold";
                                                                            return 'Not Found';
                                                                        }
                                                                    };
                                                                    const key = (value || '').trim();
                                                                    return opts[key] ? opts[key]() : 'Error';
                                                                }
                                                            },
                                                            {text: 'Coupons', dataIndex: 'QTKTS', width: 100},
                                                            {text: 'Under', dataIndex: 'QUNDER', width: 100},
                                                            {text: 'Over', dataIndex: 'QOVER', width: 100},
                                                            {text: 'Match', dataIndex: 'QMATCH', width: 100}
                                                        ]
                                                    },
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        displayInfo: true
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Coupons',
                                            itemId: '2',
                                            id: prototype.idDE + '-tabDetail',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    border: false,
                                                    id: prototype.idDE + '-gridDetail',
                                                    emptyText: 'No documents available',
                                                    tbar: {
                                                        xtype: 'panel',
                                                        id: prototype.idDE + '-boxCoupon',
                                                        layout: {
                                                            type: 'hbox',
                                                            pack: 'end'
                                                        },
                                                        width: '100%',
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '2 5 2 5',
                                                                labelStyle: 'text-align:left;font-weight: bolder;',
                                                                fieldStyle: 'text-align:center;',
                                                                id: prototype.idDE + '-txtTicket',
                                                                editable: true,
                                                                fieldLabel: 'Ticket',
                                                                labelWidth: 70,
                                                                width: 200,
                                                                maxLength: 6,
                                                                maskRe: /[0-9]/
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                id: prototype.idDE + '-searchTicket',
                                                                iconCls: 'prx-icon-search',
                                                                tooltip: 'Search',
                                                                listeners: {
                                                                    click: 'onSearchTicket'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                iconCls: 'prx-icon-excel',
                                                                tooltip: 'Export to Excel',
                                                                listeners: {
                                                                    click: 'exportCoupons'
                                                                }
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
                                                                text: 'RN',
                                                                locked: true,
                                                                xtype: 'rownumberer',
                                                                width: 60
                                                            },
                                                            {text: 'Group', dataIndex: 'GRUPO', width: 100},
                                                            {text: 'Ticket', dataIndex: 'TICKET', width: 160},
                                                            {text: 'Coupon', dataIndex: 'CUPON', width: 60},
                                                            {text: 'Class', dataIndex: 'CLASE', width: 60},
                                                            {text: 'Route', dataIndex: 'RUTA', width: 250},
                                                            {text: 'Debit', dataIndex: 'REDEBI', width: 100},
                                                            {text: 'Tax', dataIndex: 'TAX', width: 100},
                                                            {text: 'Net', dataIndex: 'NETO', width: 100},
                                                            {text: 'Comm.', dataIndex: 'COMISI', width: 100},
                                                            {text: 'Flag', dataIndex: 'FLAG', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    const opts = {
                                                                        'U': () => {
                                                                            metaData.style = "background-color:#C291E3;color:#4C4E57;font-weight:bold";
                                                                            return 'Under';
                                                                        },
                                                                        'O': () => {
                                                                            metaData.style = "background-color:#F54927;color:#ffffff;font-weight:bold";
                                                                            return 'Over';
                                                                        },
                                                                        'M': () => {
                                                                            metaData.style = "background-color:#F0E537;color:#4C4E57;font-weight:bold";
                                                                            return 'Match';
                                                                        }
                                                                    };
                                                                    const key = (value || '').trim();
                                                                    return opts[key] ? opts[key]() : 'Error';
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        displayInfo: true
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
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
                scale: 'medium',
                margin: '5 5 5 5'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});