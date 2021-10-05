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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttkt',
                            fieldLabel: 'TKT',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtcpn',
                            fieldLabel: 'CPN',
                            labelWidth: 30,
                            width: 80,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttrnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 30,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttdoc',
                            fieldLabel: 'TDOC',
                            labelWidth: 30,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtIssdate',
                            fieldLabel: 'Iss. date',
                            labelWidth: 55,
                            width: 150,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtiata',
                            fieldLabel: 'IATA',
                            labelWidth: 35,
                            width: 120,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtcurre',
                            fieldLabel: 'Cur.',
                            labelWidth: 35,
                            width: 120,
                            value: '0000',
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtrefe',
                            fieldLabel: 'Reference',
                            labelWidth: 65,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 400
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 35,
                            width: 245,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtStatusBPO',
                            fieldLabel: 'BPO',
                            labelWidth: 35,
                            width: 245,
                            value: '0000',
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
                            collapsible: true,
                            collapseDirection: "left",
                            //collapsed: true,
                            //collapsible: true,
                            //collapseDirection: Ext.Component.DIRECTION_LEFT,
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
                                    {text: 'Card </br> Type', dataIndex: 'A4077TYCAR', width: 60},
                                    {text: 'Credit Card Number', dataIndex: 'A4077NTARJ', width: 150},
                                    {text: 'Amount', dataIndex: 'A4077TOTAL', width: 90, align: 'right', editor: 'numberfield', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}

                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 250,
                            flex: 1
                        }, {
                            xtype: 'grid',
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes',
                            title: 'TAXES COMPANY',
                            //collapsible: true,
                            //collapseDirection: "right",
                            //collapsed: true,
                            columnLines: true,
                            //autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    //{text: '<span style="font-size: 10px;">Orig<br/>Date</span>', dataIndex: 'A2837FEMIO', flex: 1},
                                    {text: 'Cur', dataIndex: 'A4078MONED', flex: 1},
                                    {text: 'Tax</br>Code', dataIndex: 'A4078CDTAX', flex: 1},
                                    {text: 'Ato', dataIndex: 'A4078CDATO', flex: 1},
                                    {text: 'Amount', dataIndex: 'A4078TXDIF', flex: 1, align: 'right',renderer: 'onColumnAirlineRenderer', summaryType: 'sum',summaryRenderer: 'OnAirlineSummary'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 250,
                            flex: 1
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFare',
                            fieldLabel: 'Fare',
                            labelWidth: 80,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotalFareEqv',
                            fieldLabel: 'Fare Eqv.',
                            labelWidth: 60,
                            readOnly: true,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: 'onSearchkey',
                                blur: 'onTotaFare'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important'

                    },
                    items: [

                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotalTaxAm',
                            fieldLabel: 'Total Tax', readOnly: true,
                            labelWidth: 80,
                            value: '00'
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
                            fieldLabel: 'Total RFND',
                            labelStyle: 'font-weight: bold;',
                            //hideLabel: true,
                            labelWidth: 80,
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 10},
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtCommission',
                            fieldLabel: 'Commission:',
                            readOnly: true,
                            labelWidth: 80,
                            value: '0.00'
                        }, {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtRate',
                            fieldLabel: 'Rate:',
                            readOnly: true,
                            labelWidth: 40,
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtCommission2',
                            fieldLabel: 'Tax on:',
                            readOnly: true,
                            labelWidth: 80,
                            value: '0.00'
                        }, {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtRate2',
                            fieldLabel: 'Rate:',
                            readOnly: true,
                            labelWidth: 40,
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

