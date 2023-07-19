/*
 * @Dvicente
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPRftx', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryFOPRftx',
    controller: 'DataEntryFOPRftxController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFOPRftxController'
    ],
    id: prototype.idRftxFOP + '-winDataEntryFOPRftx',
    title: 'Form of Payment',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 310,
    width: 620,
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
            id: prototype.idRftxFOP + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idRftxFOP + '-det-gridDataTktFOP',
                    columnLines: true,
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add Fop',
                                    id: prototype.idRftxFOP + '-gridFopADD',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddFopClick'
                                }, '-']
                        }],
                    autoScroll: true,
                    columns: {
                        items: [//maxLength: 3,enforceMaxLength: 3,
                            {text: 'Code', width: 50, dataIndex: 'a4374CFOP', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Card<br>Type', width: 45, dataIndex: 'a4374TTARJ', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Ref Number', width: 150, dataIndex: 'a4374NREF', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 19, enforceMaxLength: 19
                                    }
                                }},
                            {text: 'Curr', width: 40, dataIndex: 'a4374MFOP'},
                            {text: 'Amount', dataIndex: 'a4374VFOP', width: 120, align: 'right', editor: 'numberfield',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {text: 'Expired<br>Card Date', width: 80, dataIndex: 'a4374FEXP', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 8, enforceMaxLength: 8,
                                        format: 'Y/m/d', maskRe: /[0-9]/
                                    }
                                }},
                            {text: 'Approval<br>Card', width: 70, dataIndex: 'a4374CAPL', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 6, enforceMaxLength: 6,
                                        maskRe: /[0-9]/
                                    }
                                }},
                            /*{text: 'Curr Net<br>Rem', width: 70, dataIndex: 'A1731MNETR', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 3, enforceMaxLength: 3,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},*/
                            /*{text: 'Net Rem<br>Amount', dataIndex: 'A1731VNETR', width: 120, align: 'right',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer', editor: 'numberfield'},*/
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        handler: 'OnFopRemove'
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
                    height: 300,
                    flex: 1
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
                    id: prototype.idRftxFOP + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRftxFOP + '-gridFopSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveFopClick'
                    }
                }
            ]
        }
    ]

});

