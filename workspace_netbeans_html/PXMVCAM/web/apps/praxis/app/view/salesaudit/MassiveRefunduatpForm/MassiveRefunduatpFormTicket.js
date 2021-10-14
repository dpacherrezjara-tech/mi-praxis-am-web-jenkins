/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.MassiveRefunduatpFormTicket',
    controller: 'MassiveRefunduatpFormTicketController',
    requires: [
        'Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicketController'
    ],
    id: prototype.idMassiveRefunduatpFormTicket + '-win',
    title: 'TICKET DETAIL',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 600,
    width: 950,
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
            id: prototype.idMassiveRefunduatpFormTicket + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtfolio',
                            fieldLabel: 'Folio',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttkt',
                            fieldLabel: 'TKT',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttrnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 30,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtType',
                            fieldLabel: 'Type',
                            labelWidth: 35,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtBase',
                            fieldLabel: 'Base',
                            labelWidth: 35,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtRefe',
                            fieldLabel: 'Refe',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 348
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 35,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtBPO',
                            fieldLabel: 'BPO',
                            labelWidth: 30,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtAudit',
                            fieldLabel: 'Audit',
                            labelWidth: 35,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        }



                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtIssdate',
                            fieldLabel: 'Iss. date',
                            labelWidth: 55,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtSystemDate',
                            fieldLabel: 'Sys. Date',
                            labelWidth: 60,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttidoc',
                            fieldLabel: 'Tdoc',
                            labelWidth: 35,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        }



                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT',
                            title: 'FORM OF PAYMENT',
                            columnLines: true,
                            autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Type', dataIndex: 'A4077CFOP', width: 70},
                                    {text: 'Card Type', dataIndex: 'A4077TYCAR', width: 45},
                                    {text: 'Credit Card<br> Number', dataIndex: 'A4077NTARJ', width: 250},
                                    {text: 'Cur', dataIndex: 'A4077CUR', width: 50},
                                    {text: 'Amount', dataIndex: 'A4077TOTAL', width: 90, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes',
                            title: 'TAXES',
                            columnLines: true,
                            autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Cur', dataIndex: 'A4078MONED', width: 45},
                                    {text: 'Tax</br>Code', dataIndex: 'A4078CDTAX', width: 80},
                                    {text: 'Ato', dataIndex: 'A4078CDATO', width: 60},
                                     {text: 'Amount', dataIndex: 'A4078TXDIF', width: 90, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 330
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFaremda',
                            readOnly: true,
                            value: '',
                            width: 30
                        }, {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFare',
                            fieldLabel: 'Fare',
                            labelWidth: 33,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtEquivamda',
                            readOnly: true,
                            value: '',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv',
                            fieldLabel: 'Equivalent',
                            labelWidth: 65,
                            readOnly: true,
                            value: '0.00'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax',
                            fieldLabel: 'Total Tax',
                            readOnly: true,
                            labelWidth: 65,
                            value: '0.00'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotal',
                            fieldLabel: 'Total',
                            labelWidth: 65,
                            readOnly: true,
                            value: '0.00'
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtCommi1',
                            fieldLabel: 'Commission',
                            labelWidth: 65,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTcambi1',
                            fieldLabel: 'Rate',
                            labelWidth: 40,
                            readOnly: true,
                            value: '0.00'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtToca1',
                            fieldLabel: 'Toca.',
                            labelWidth: 65,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTcambi2',
                            fieldLabel: 'Rate',
                            labelWidth: 40,
                            readOnly: true,
                            value: '0.00'
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idMassiveRefunduatpFormTicket + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});



