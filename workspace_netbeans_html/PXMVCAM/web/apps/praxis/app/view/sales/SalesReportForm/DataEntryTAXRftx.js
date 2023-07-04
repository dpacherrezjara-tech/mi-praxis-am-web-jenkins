/*
 * @Dvicente
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXRftx', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTAXRftx',
    controller: 'DataEntryTAXRftxController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryTAXRftxController'
    ],
    id: prototype.idRftxTAX + '-winDataEntryTAXRftx',
    title: 'Taxes',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 400,
    width: 520,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idRftxTAX + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idRftxTAX + '-det-gridDataTktTAX',
                    columnLines: true,
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add TAX',
                                    id: prototype.idRftxTAX + '-gridTAXADD',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddTAXClick'
                                }, '-']
                        }],
                    autoScroll: true,
                    columns: {
                        items: [//maxLength: 3,enforceMaxLength: 3,
                            {text: 'Code', width: 50, dataIndex: 'a4375CTAX', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 3, enforceMaxLength: 3,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Curr', width: 40, dataIndex: 'a4375MTAX'},
                            {text: 'Tax Fee<br>Amount', dataIndex: 'a4375VTAX', width: 120, align: 'right', editor: 'numberfield',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},

                            {text: 'Airport<br>PFC', width: 60, dataIndex: 'a4375APFC', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 3, enforceMaxLength: 3,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Country<br>Code', width: 60, dataIndex: 'a4375PSTAX'/*, editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }*/},
                            {text: 'Tax<br>Type', width: 50, dataIndex: 'a4375TIPO'/*, editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }*/},

                            {text: 'Tax<br>Ext/Ctrl', width: 55, dataIndex: 'a4375TCTR'/*, editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 1, enforceMaxLength: 1,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }*/},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        handler: 'OnTAXRemove'
                                    }
                                ]
                            }
                        ],
                        defaults: {
                            sortable: false,
                            menuDisabled: true,
                            align: 'center'
                        }
                    },
                    height: 350,
                     width: 500
                }

            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idRftxTAX + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRftxTAX + '-gridTAXSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveTAXClick'
                    }
                }
            ]
        }
    ]

});

