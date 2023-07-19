/*
 * @Dvicente
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryRftx', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idRftx + '-dataEntryRftx',
    controller: prototype.idRftx + '-dataEntryRftxController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryRftxController',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRftx',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXRftx',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPRftx',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPVoid',
        'Ext.Praxis.view.widgets.facsimil'
    ],
    title: 'Transaction Information',
    header: true,
    width: 810,
    height: 900,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idRftx + '-DataEntryRftx-center',
            border: false,
            width: 810,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.idRftx + '-det-tabMain',
                    width: 805,
                    heigth: 860,
                    anchor: '100%',
                    margin: '1 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: #E5ECEF',
                    listeners: {
                        tabchange: 'onChangeTab'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #E5ECEF',
                            id: prototype.idRftx + '-det-tabSale',
                            title: 'Refund Tax Information',
                            layout: {
                                type: 'vbox'
                            },
                            margin: '5 5 5 5',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRftx + '-contenedor-form',
                                    width: 780,
                                    height: 357,
                                    items: [
                                        {
                                            xtype: 'facsimil',
                                            id: prototype.idRftx + '-widget-facsimil'
                                        },
                                    ]
                                },

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    layout: 'hbox',
                                    margin: '1 1 1 1',
                                    border: false,
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Panel 1">
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'hbox',
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="Panel Info Label 1">
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 0 1 0',
                                                            border: false,
                                                            defaults: {
                                                                xtype: 'label',
                                                                padding: '5px 3px 5px 3px',
                                                                margin: '1 1 1 1',
                                                                style: 'font-weight:bold;font-size:11px;',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Ticket:'
                                                                },
                                                                {
                                                                    text: 'Transaction:'
                                                                },
                                                                {
                                                                    text: 'Conjuction:'
                                                                },
                                                                {
                                                                    text: 'Transaction Nº:'
                                                                },
                                                                {
                                                                    text: 'Iata Code:'
                                                                },
                                                                {
                                                                    text: 'Tax'
                                                                },
                                                                {
                                                                    text: 'Exchange Rate:'
                                                                },
                                                                {
                                                                    text: 'Local Cur:'
                                                                }
                                                            ]
                                                        },
                                                        //</editor-fold>
                                                        //<editor-fold defaultstate="collapsed" desc="Panel Info Text 1">
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '1',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblCia',
                                                                            fieldLabel: '',
                                                                            width: 30,
                                                                            readOnly: true,
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            maskRe: /[0-9]/,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            listeners: {
                                                                                blur: 'onBlurValueCia'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblDocumento',
                                                                            fieldLabel: '',
                                                                            readOnly: true,
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            maskRe: /[0-9]/,
                                                                            maxLength: 10,
                                                                            enforceMaxLength: 10,
                                                                            listeners: {
                                                                                blur: 'onBlurValueTicket'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idRftx + '-det-lblTransaction',
                                                                    xtype: 'textfield',
                                                                    margin: '1',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly: true,
                                                                    width: 110
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '1',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblConjuction',
                                                                            width: 30,
                                                                            readOnly: true,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblBoleto',
                                                                            fieldLabel: '',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            labelAlign: 'left',
                                                                            html: '<strong>/</strong>',
                                                                            width: 10,
                                                                            padding: '5px 0px 5px 0x'

                                                                        },
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblTotBoleto',
                                                                            fieldLabel: '',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idRftx + '-det-lblTransactionNbr',
                                                                    xtype: 'textfield',
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly: true,
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idRftx + '-det-lblIata',
                                                                    xtype: 'textfield',
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    maskRe: /[0-9]/,
                                                                    maxLength: 8,
                                                                    enforceMaxLength: 8,
                                                                    width: 110,
                                                                    readOnly: true,
                                                                    listeners: {
                                                                        blur: 'onBlurValueIata'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '1',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        readOnly: true,
                                                                        fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblMdtx',
                                                                            width: 30,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRftx + '-det-lblCurr',
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:right;',
                                                                            width: 70
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idRftx + '-det-lblExchangeRate',
                                                                    xtype: 'textfield',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:right;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly: true,
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idRftx + '-det-lblLocalCur',
                                                                    xtype: 'textfield',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly: true,
                                                                    width: 60
                                                                }
                                                            ]
                                                        }
                                                        //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                        ,
                                        //<editor-fold defaultstate="collapsed" desc="Panel 2">
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'vbox',
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                // <editor-fold defaultstate="collapsed" desc="Panel Info Label 2">

                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    border: false,
                                                                    items: [//                                                                                
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'vbox',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            margin: '1 1 1 1',
                                                                            border: false,
                                                                            defaults: {
                                                                                labelStyle: 'font-weight:bold;font-size:11px;'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    id: prototype.idRftx + '-det-lblDigito',
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'D:',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    labelWidth: 45,
                                                                                    readOnly: true,
                                                                                    width: 90
                                                                                },
                                                                                {
                                                                                    id: prototype.idRftx + '-det-lblDocType',
                                                                                    xtype: 'textfield',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Doc. T.:',
                                                                                    labelWidth: 45,
                                                                                    readOnly: true,
                                                                                    width: 90,
                                                                                    listeners: {
                                                                                        change: 'onUpperValue',
                                                                                        blur: 'onBlurTDoc'
                                                                                    }
                                                                                },
                                                                                {xtype: 'label', padding: '14px 3px 10px 3px'},
                                                                                {
                                                                                    id: prototype.idRftx + '-det-lblSeq',
                                                                                    xtype: 'textfield',
                                                                                    margin: '2',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Seq:',
                                                                                    labelWidth: 45,
                                                                                    readOnly: true,
                                                                                    width: 90
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>

                                                                // <editor-fold defaultstate="collapsed" desc="Panel Info Label 2.1">
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    border: false,
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 0 1 0',
                                                                            border: false,
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                padding: '5px 3px 5px 3px',
                                                                                margin: '1 1 1 1',
                                                                                style: 'font-weight:bold;font-size:11px;',
                                                                                width: 80
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Group:'
                                                                                },
                                                                                {
                                                                                    text: 'Issue Date:'
                                                                                },
                                                                                {
                                                                                    text: 'Issue City:'
                                                                                },
                                                                                {
                                                                                    text: 'Unauthorized:'
                                                                                },
                                                                                {
                                                                                    text: 'Reference:'
                                                                                },
                                                                                {
                                                                                    text: 'Observation:'
                                                                                },
                                                                                {
                                                                                    text: 'Coupons:'
                                                                                },
                                                                                {
                                                                                    text: ''
                                                                                }

                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'vbox',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            margin: '1 1 1 1',
                                                                            border: false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'hbox',
                                                                                    margin: '1',
                                                                                    border: false,
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    defaults: {
                                                                                        xtype: 'textfield',
                                                                                        margin: '0 0 0 0',
                                                                                        fieldStyle: 'text-align:left;',
                                                                                        labelSeparator: ''
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblGroup',
                                                                                            width: 65,
                                                                                            readOnly: true,
                                                                                            fieldLabel: ''
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblSource',
                                                                                            fieldLabel: '',
                                                                                            readOnly: true,
                                                                                            width: 50
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblFileId',
                                                                                            fieldLabel: 'File ID:',
                                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                            width: 115,
                                                                                            readOnly: true,
                                                                                            labelWidth: 45
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'hbox',
                                                                                    margin: '1',
                                                                                    border: false,
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    defaults: {
                                                                                        xtype: 'textfield',
                                                                                        margin: '1',
                                                                                        fieldStyle: 'text-align:left;',
                                                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                        labelSeparator: ''
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblIssueDate',
                                                                                            readOnly: true,
                                                                                            width: 65,
                                                                                            listeners: {
                                                                                                blur: 'onBlurValueFecha'
                                                                                            }
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblSaleDate',
                                                                                            fieldLabel: 'Sale Date:',
                                                                                            readOnly: true,
                                                                                            width: 130,
                                                                                            labelWidth:60
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblSaleSeq',
                                                                                            fieldLabel: 'Sale Seq:',
                                                                                            readOnly: true,
                                                                                            width: 86,
                                                                                            labelWidth:55
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'hbox',
                                                                                    margin: '1',
                                                                                    border: false,
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    defaults: {
                                                                                        xtype: 'textfield',
                                                                                        margin: '0 0 0 0',
                                                                                        fieldStyle: 'text-align:left;',
                                                                                        labelSeparator: ''
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblIssueCity',
                                                                                            width: 37,
                                                                                            readOnly: true,
                                                                                            fieldLabel: ''
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblIssueCtry',
                                                                                            fieldLabel: '',
                                                                                            readOnly: true,
                                                                                            width: 25
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 15},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblSaleCity',
                                                                                            fieldLabel: 'Sale City:',
                                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                            width: 97,
                                                                                            readOnly: true,
                                                                                            labelWidth: 55
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblSaleCtry',
                                                                                            fieldLabel: '',
                                                                                            readOnly: true,
                                                                                            width: 25
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    id: prototype.idRftx + '-det-lblAuthorityNumber',
                                                                                    xtype: 'textfield',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: '',
                                                                                    readOnly: true,
                                                                                    maskRe: /[0-9]/,
                                                                                    width: 240
                                                                                }
                                                                                ,
                                                                                {
                                                                                    id: prototype.idRftx + '-det-lblReference',
                                                                                    xtype: 'textfield',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: '',
                                                                                    readOnly: true,
                                                                                    width: 260
                                                                                },
                                                                                {
                                                                                    id: prototype.idRftx + '-det-lblObservation',
                                                                                    xtype: 'textfield',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: '',
                                                                                    readOnly: true,
                                                                                    width: 260
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'hbox',
                                                                                    margin: '1',
                                                                                    padding: '1',
                                                                                    border: false,
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    defaults: {
                                                                                        xtype: 'textfield',
                                                                                        fieldStyle: 'text-align:left;',
                                                                                        labelSeparator: '',
                                                                                        width: 18
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'label',
                                                                                            id: prototype.idRftx + '-det-lblTicket1',
                                                                                            style: {
                                                                                                marginTop: '4px',
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: '10px',
                                                                                                textAlign: 'center'
                                                                                            },
                                                                                            width: 70
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup01-1',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup02-1',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup03-1',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup04-1',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            xtype: 'label',
                                                                                            id: prototype.idRftx + '-det-lblTicket2',
                                                                                            style: {
                                                                                                marginTop: '4px',
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: '10px',
                                                                                                textAlign: 'center'
                                                                                            },
                                                                                            width: 70,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup01-2',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup02-2',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup03-2',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup04-2',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3}
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'hbox',
                                                                                    margin: '1',
                                                                                    padding: '1',
                                                                                    border: false,
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    defaults: {
                                                                                        xtype: 'textfield',
                                                                                        fieldStyle: 'text-align:left;',
                                                                                        labelSeparator: '',
                                                                                        width: 18
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'label',
                                                                                            id: prototype.idRftx + '-det-lblTicket3',
                                                                                            style: {
                                                                                                marginTop: '4px',
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: '10px',
                                                                                                textAlign: 'center'
                                                                                            },
                                                                                            width: 70,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup01-3',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup02-3',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup03-3',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup04-3',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            xtype: 'label',
                                                                                            id: prototype.idRftx + '-det-lblTicket4',
                                                                                            style: {
                                                                                                marginTop: '4px',
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: '10px',
                                                                                                textAlign: 'center'
                                                                                            },
                                                                                            width: 70,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup01-4',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup02-4',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup03-4',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3},
                                                                                        {
                                                                                            id: prototype.idRftx + '-det-lblCup04-4',
                                                                                            margin: '1',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 3}
                                                                                    ]
                                                                                }

                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                        // </editor-fold>
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                                //</editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    margin: '1 1 1 1',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="FOP">
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b style="font-size:12px">Form of Payment<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 0',
                                                    width: 335,
                                                    height: 160,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    //border: true,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            id: prototype.idRftx + '-panel-Fop',
                                                            margin: '1 1 1 1',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold;',
                                                                        width: 35,
                                                                        margin: '1',
                                                                        padding: '1px 2px 0px 2px'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Code'
                                                                        },
                                                                        {
                                                                            text: 'Type'
                                                                        },
                                                                        {
                                                                            text: 'Ref. Number',
                                                                            width: 100
                                                                        },
                                                                        {
                                                                            text: 'Curr'
                                                                        },
                                                                        {
                                                                            text: 'Amount',
                                                                            width: 75
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        readOnly: true,
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFOPCode1',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblCardType1',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblRefNumber1',
                                                                            width: 105,
                                                                            maxLength: 19,
                                                                            enforceMaxLength: 19,
                                                                            maskRe: /[xX0-9*]/,
                                                                            fieldStyle: 'text-align:left;font-style: italic;font-size: 10.3px;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFOPCur1',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFOP1',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFEXP1',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblCAPL1',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblCORRLFOP1',
                                                                            hidden: true
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        readOnly: true,
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFOPCode2',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblCardType2',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblRefNumber2',
                                                                            width: 105,
                                                                            maxLength: 19,
                                                                            enforceMaxLength: 19,
                                                                            maskRe: /[xX0-9*]/,
                                                                            fieldStyle: 'text-align:left;font-style: italic;font-size: 10.3px;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFOPCur2',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFOP2',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblFEXP2',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblCAPL2',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRftx + '-det-lblCORRLFOP2',
                                                                            hidden: true
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 50
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'tbspacer',
                                                                            width: 130
                                                                        },
                                                                        {
                                                                            text: 'Other:'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idRftx + '-det-lblFopOtherCur',
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idRftx + '-det-lblFOPOther',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.idRftx + '-det-btnSearch',
                                                                            style: 'background:#E5ECEF',
                                                                            iconCls: 'prx-icon-search',
                                                                            border: false,
                                                                            tooltip: 'Search FOP',
                                                                            width: 30,
                                                                            listeners: {
                                                                                click: 'onClickSearchFOP'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            width: 130
                                                                        },
                                                                        {
                                                                            text: 'Total:',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idRftx + '-det-lblFOPCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idRftx + '-det-lblFOP',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.idRftx + '-det-lblUnbalance',
                                                                    text: 'Ticket is Unbalance',
                                                                    hidden: true,
                                                                    width: 220,
                                                                    style: {
                                                                        background: '#FFA07A'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            text: '<strong style="color:white;">FOP VOID<strong>',
                                                            //ui: 'round',
                                                            id: prototype.idRftx + '-det-btnFopVOID',
                                                            scale: 'medium',
                                                            margin: '9 0 0 6', //TBRL
                                                            maxWidth: 85,
                                                            height: 30,
                                                            hidden: true,
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over',
                                                            listeners: {
                                                                click: 'onFopVoid'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.idRftx + '-lblErrorDesc',
                                                            flex: 1,
                                                            height: 20,
                                                            margin: '9 0 0 6',
                                                            padding: '5',
                                                            style: {
                                                                background: '#DF8E46',
                                                                color: '#080808',
                                                                fontStyle: 'italic',
                                                                fontSize: '10px',
                                                                fontWeight: 'bold'
                                                            },
                                                            hidden: true
                                                                    //text:'VR0032 - CUPON MAL COBRADO'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //<editor-fold defaultstate="collapsed" desc="TAXES">
                                        // PANEL 3_2 Tax / Fee
                                        {
                                            xtype: 'fieldset',
                                            title: '<b  style="font-size:12px">Tax / Fee<b/>',
                                            bodyStyle: 'background: #E5ECEF',
                                            margin: '1 5 0 5',
                                            width: 215,
                                            height: 200,
                                            defaults: {
                                                border: false
                                            },
                                            //border: true,                                                    
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'vbox',
                                                    id: prototype.idRftx + '-panel-Tax',
                                                    margin: '1 1 1 1',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold;',
                                                                width: 35,
                                                                margin: '1',
                                                                padding: '1px 2px 0px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Code',
                                                                    width: 45
                                                                },
                                                                {
                                                                    text: 'Curr'
                                                                },
                                                                {
                                                                    text: 'Amount',
                                                                    width: 75
                                                                },
                                                                {
                                                                    text: 'PFC'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                readOnly: true,
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCode1',
                                                                    width: 40,
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z0-9]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue',
                                                                        blur: 'onTipoRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCur1',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        //change: 'onUpperValue'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAX1',
                                                                    width: 70,
                                                                    maxLength: 13,
                                                                    enforceMaxLength: 13,
                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                    fieldStyle: 'text-align:right;',
                                                                    listeners: {
                                                                        blur: 'onAmountRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblPFC1',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                readOnly: true,
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCode2',
                                                                    width: 40,
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z0-9]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue',
                                                                        blur: 'onTipoRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCur2',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        //change: 'onUpperValue'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAX2',
                                                                    width: 70,
                                                                    maxLength: 13,
                                                                    enforceMaxLength: 13,
                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                    fieldStyle: 'text-align:right;',
                                                                    listeners: {
                                                                        blur: 'onAmountRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblPFC2',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                readOnly: true,
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCode3',
                                                                    width: 40,
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z0-9]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue',
                                                                        blur: 'onTipoRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCur3',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        //change: 'onUpperValue'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAX3',
                                                                    width: 70,
                                                                    maxLength: 13,
                                                                    enforceMaxLength: 13,
                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                    fieldStyle: 'text-align:right;',
                                                                    listeners: {
                                                                        blur: 'onAmountRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblPFC3',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                readOnly: true,
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCode4',
                                                                    width: 40,
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z0-9]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue',
                                                                        blur: 'onTipoRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAXCur4',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        //change: 'onUpperValue'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblTAX4',
                                                                    width: 70,
                                                                    maxLength: 13,
                                                                    enforceMaxLength: 13,
                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                    fieldStyle: 'text-align:right;',
                                                                    listeners: {
                                                                        blur: 'onAmountRenderer'
                                                                    }
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idRftx + '-det-lblPFC4',
                                                                    maxLength: 3,
                                                                    enforceMaxLength: 3,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    fieldStyle: 'text-align:left;',
                                                                    listeners: {
                                                                        change: 'onUpperValue'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Other:',
                                                                    width: 45
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    id: prototype.idRftx + '-det-lblTAXOtherCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    id: prototype.idRftx + '-det-lblTAXOther',
                                                                    width: 70,
                                                                    fieldStyle: 'text-align:right;'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.idRftx + '-det-btnSearch2',
                                                                    style: 'background:#E5ECEF',
                                                                    iconCls: 'prx-icon-search',
                                                                    border: false,
                                                                    tooltip: 'Search TAX',
                                                                    width: 30,
                                                                    listeners: {
                                                                        click: 'onClickSearchTAX'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Total:',
                                                                    width: 45
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    id: prototype.idRftx + '-det-lblTAXCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    id: prototype.idRftx + '-det-lblTAX',
                                                                    width: 70,
                                                                    fieldStyle: 'text-align:right;'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    ui: 'footer',
                                    margin: '1 1 1 1',
                                    defaults: {
                                        scale: 'medium'
                                    },
                                    style: 'aling:center padding: 5px;',
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            text: '<strong style="color:white;">Farecalc<strong>',
                                            id: prototype.idRftx + '-det-btnFareCalc',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            listeners: {
                                                click: 'onFareCalc'
                                            }
                                        },
                                        {
                                            text: '<strong style="color:white;">Delivery<strong>',
                                            id: prototype.idRftx + '-det-btnDeliveryTKT',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            listeners: {
                                                click: 'onDelivery'
                                            }
                                        },
                                        //{xtype: 'tbspacer', width: 150},
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            style: {
                                                paddingTop: '5px',
                                                paddingBottom: '5px',
                                                marginRight: '7px',
                                                marginLeft: '3px'
                                            },
                                            border: true,
                                            layout: {
                                                type: 'hbox',
                                                align: 'rigth',
                                                pack: 'end'
                                            },
                                            flex: 1,
                                            defaults: {
                                                xtype: 'displayfield',
                                                margin: '0 0 0 0',
                                                labelWidth: 55,
                                                labelPad: 10,
                                                labelAlign: 'right',
                                                labelSeparator: ':',
                                                labelStyle: 'font-weight:bold;',
                                                border: true
                                            },
                                            items: [
                                                {
                                                    id: prototype.idRftx + '-usr-userCreated',
                                                    value: '',
                                                    margin: 1,
                                                    width: 150,
                                                    fieldLabel: 'Crt by',
                                                    fieldStyle: 'color:#37A25C;font-weight:bold;text-align: center;'
                                                },
                                                {
                                                    id: prototype.idRftx + '-usr-dateCreated',
                                                    value: '',
                                                    margin: 1,
                                                    width: 140,
                                                    fieldLabel: 'Crt Date',
                                                    fieldStyle: 'color:#37A25C;font-weight:bold;'
                                                },
                                                {
                                                    id: prototype.idRftx + '-usr-userUpdated',
                                                    value: '',
                                                    margin: 1,
                                                    width: 150,
                                                    fieldLabel: 'Upd by',
                                                    fieldStyle: 'color:#2664C4;font-weight:bold;text-align: center;'
                                                },
                                                {
                                                    id: prototype.idRftx + '-usr-dateUpdated',
                                                    value: '',
                                                    margin: 1,
                                                    fieldLabel: 'Upd Date',
                                                    fieldStyle: 'color:#2664C4;font-weight:bold;',
                                                    width: 140,
                                                    labelWidth: 63
                                                },
                                                {xtype: 'tbspacer', width: 10}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    ]
});

