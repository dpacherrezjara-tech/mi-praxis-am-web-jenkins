Ext.define('Ext.Praxis.view.payments.SalesComplementForm.PnrDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.PnrDataEntryForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesComplement.PnrDataEntryController'
    ],
    controller: 'PnrDataEntryController',
    title: 'Search PNR Form',
    header: true,
    height: 640,
    width: 1320,
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
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-1-boxSearchFilter',
                                            bodyStyle: 'background: #E3EAF9;"',
                                            layout: 'hbox',
                                            border: true,
                                            width: '100%',
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    html: '<strong style="font-weight:bold;">Search By: </strong>',
                                                    padding: '11 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-1-cbxSearchBy',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["3", "PNR"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 100,
                                                    value: "3",
//                                                    emptyText: 'Select',
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    typeAhead: true,
                                                    padding: '9 0 0 0',
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        change: 'cbxSearchBy_changeHandler'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-1-Box_Option03',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: 'hbox',
                                                    padding: '9 0 0 0',
                                                    border: false,
                                                    hidden: false,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'PNR:',
                                                            padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-1-txtPNR',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            readOnly:true,
                                                            maxLength: 6,
                                                            width: 80,
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', flex: 2},
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    padding: '4 0',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-1-btnExcel',
                                                                    iconCls: 'prx-icon-excel',
                                                                    tooltip: 'Export to Excel',
                                                                    listeners: {
                                                                        click: 'imgExcel_click'
                                                                    }
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 4}
                                            ]
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', height: 5},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-1-boxMainData',
                                    border: false,
                                    flex: 3,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        width: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridData">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-1-gridDataPNR',
                                            height: 487,
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
                                                    {
                                                        text: 'Nbr', dataIndex: 'ROWKEY', width: 35, hidden: true
                                                    },
                                                    {
                                                        text: 'Passenger Name', dataIndex: 'A720PAX', width: 280,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        },
                                                        editor: {xtype: 'textfield', editable: false}
                                                    },
                                                    {
                                                        text: 'Ticket Number', dataIndex: 'TICKET', width: 150, editor: {xtype: 'textfield', editable: false}
                                                    },
                                                    {
                                                        text: 'CC Number', dataIndex: 'A1531NREF', width: 120, editor: {xtype: 'textfield', editable: false}
                                                    },
                                                    {
                                                        text: 'Approved Code', dataIndex: 'IN_IATA', width: 120, editor: {xtype: 'textfield', editable: false}
                                                    },
                                                    {
                                                        text: 'Issue<br/>Orig.', dataIndex: 'A720CIUVTA', width: 60
                                                    },
                                                    {
                                                        text: 'Issue Date', dataIndex: 'A720FECVTA', width: 80
                                                    },
                                                    {
                                                        text: 'IATA', dataIndex: 'A720AGENTE', width: 80, editor: {xtype: 'textfield', editable: false}
                                                    },
                                                    {
                                                        text: 'Fare', dataIndex: 'A720TARIFA', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'A1531VFOP', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Cur', dataIndex: 'A720MONEDA', width: 40
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'A720PNR', width: 80, editor: {xtype: 'textfield', editable: false}
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Edit',
                                                        width: 39,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'onClickSearchTicketDE'
                                                                //handler: 'gridData_act1_clickHandler'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                id: prototype.id + '-1-pagginPNR',
                                                displayInfo: true,
                                                displayMsg: 'Mostrando {0} - {1} de {2}',
                                                emptyMsg: 'No hay registros para mostrar'
                                            }

                                        },
                                                // </editor-fold>
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.id + '-btnPnrDe-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);

