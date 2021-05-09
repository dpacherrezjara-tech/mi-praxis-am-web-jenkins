/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailTicket',
    controller: 'DetailTicketController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.DetailTicketController'
    ],
    id: prototype.id2 + '-win',
    title: 'TICKET DETAIL',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 818,
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
            id: prototype.id2 + '-form',
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
                            id: prototype.id2 + '-txtfolio',
                            fieldLabel: 'Folio',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txttkt',
                            fieldLabel: 'TKT',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtcpn',
                            fieldLabel: 'CPNs',
                            labelWidth: 30,
                            width: 80,
                            value: 'xxxxxx',
                            readOnly: true
                        },

                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txttrnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 30,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtIssdate',
                            fieldLabel: 'Iss. date',
                            labelWidth: 55,
                            width: 150,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtpnr',
                            fieldLabel: 'PNR',
                            labelWidth: 35,
                            width: 120,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txttidoc',
                            fieldLabel: 'TYPE',
                            labelWidth: 35,
                            width: 120,
                            value: '0000',
                            readOnly: true
                        },
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
                            id: prototype.id2 + '-txtpax',
                            fieldLabel: 'Pax. name',
                            labelWidth: 65,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 650
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtrefundable',
                            fieldLabel: 'Refundable',
                            labelWidth: 80,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
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
                            id: prototype.id2 + '-txtEndorse',
                            fieldLabel: 'Endorsements',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtiata',
                            fieldLabel: 'IATA',
                            labelWidth: 30,
                            width: 120,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            text: 'History',
                            id: prototype.id2 + '-txtHistory',
                            iconCls: 'prx-icon-104-ticket',
                            listeners: {
                                click: 'OnListHistoryRenderer'
                            }

                            //iconCls: 'prx-icon-104-ticket'
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
                            id: prototype.id2 + '-txtFareCal',
                            fieldLabel: 'FareCalculation',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtCOUNTRY',
                            fieldLabel: 'Country',
                            labelWidth: 50,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtmda',
                            fieldLabel: 'Cur.',
                            labelWidth: 30,
                            width: 80,
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
                            id: prototype.id2 + '-txtRfndFee',
                            fieldLabel: 'Fee',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {xtype: 'textfield', id: prototype.id2 + '-txtpreme', hidden: true},
                        {xtype: 'textfield', id: prototype.id2 + '-txtCrrl', hidden: true}
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
                            id: prototype.id2 + '-gridCPN',
                            title: 'COUPON',
                            collapsible: true,
                            collapseDirection: "right",
                            collapsed: true,
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Nbr', dataIndex: 'A3654CPN', width: 50},
                                    {text: 'Cx', dataIndex: 'A3654STOP', width: 30},
                                    {text: 'Al', dataIndex: 'A3654MARKE', width: 50},
                                    {text: 'FIt', dataIndex: 'A3654NFLGH', width: 50},
                                    {text: 'Cl', dataIndex: 'A3654CLAS', width: 50},
                                    {text: 'Dep', dataIndex: 'A3654FORIG', width: 90},
                                    {text: 'Frm', dataIndex: 'A3654ORIGE', width: 50},
                                    {text: 'To', dataIndex: 'A3654DESTI', width: 50},
                                    {text: 'Time', dataIndex: 'A3654HORIG', width: 60},
                                    {text: 'Bk St', dataIndex: 'A3654BOOKI', width: 40},
                                    {text: 'Fb', dataIndex: 'A3654FBASI', width: 100},
                                    {text: 'Stat', dataIndex: 'A3654CURS1', width: 60},
                                    {text: 'FF', dataIndex: 'A2548MDA', width: 60},
                                    {text: 'Bags', dataIndex: 'A3654BAGAL', width: 60},
                                    {text: 'Net', dataIndex: 'A3654MONTO', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            width: 700
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id2 + '-gridPAYMENT',
                            title: 'FORM OF PAYMENT',
                            collapsible: true,
                            collapseDirection: Ext.Component.DIRECTION_LEFT,
                            columnLines: true,
                            selModel: 'cellmodel',

                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            plugins: {
                                cellediting: {
                                    clicksToEdit: 1
                                }
                            },
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Fop',
                                            id: prototype.id2 + '-gridFopADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onAddFopClick'
                                        }, '-']
                                }],
                            autoScroll: true,
                            columns: {
                                items: [//maxLength: 3,enforceMaxLength: 3,
                                    {text: 'Code', width: 50, dataIndex: 'A3653CFOP', editor: {
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
                                    {text: 'Card<br>Type', width: 45, dataIndex: 'A3653TYCAR', editor: {
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
                                    {text: 'Ref Number', width: 150, dataIndex: 'A3653NTARJ', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 19, enforceMaxLength: 19
                                            }
                                        }},
                                    {text: 'Net', dataIndex: 'A3653TOTAL', width: 120, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                if(String(Ext.String.trim(records[j].get('A3653FLAG')))==='A'){
                                                    total = total + parseFloat(records[j].get('A3653TOTAL'));
                                                }                                                
                                            }
                                            return total.toFixed(2);
                                            //console.log(records);
                                        }
                                    },
                                    /*{text: 'Amount', dataIndex: 'A3653TOTAL', width: 120, align: 'right', editor: 'numberfield',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},*/
                                    {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A3653FEXP', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 8, enforceMaxLength: 8,
                                                format: 'Y/m/d', maskRe: /[0-9]/
                                            }
                                        }},
                                    {text: 'Approval<br>Card', width: 70, dataIndex: 'A3653CAPL', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 6, enforceMaxLength: 6,
                                                maskRe: /[0-9]/
                                            }
                                        }
                                    },
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnTime'
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: 'Delete',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnFopRemove'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: 'Inactive',
                                        width: 60,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-off',
                                                handler: 'OnInactive'
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
                            height: 150,
                            flex: 1
                        }
                        /*{
                         xtype: 'grid',
                         id: prototype.id2 + '-gridPAYMENT',
                         title: 'FORM OF PAYMENT',
                         collapsible: true,
                         collapseDirection: "left",
                         collapsed: true,
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
                         {text: 'Type', dataIndex: 'A3653CFOP', width: 70},
                         {text: 'Card Type', dataIndex: 'A3653TYCAR', width: 45},
                         {text: 'Credit Card Number', dataIndex: 'A3653NTARJ', width: 150,
                         editor: {
                         completeOnEnter: false,
                         field: {
                         xtype: 'textfield',
                         maxLength: 19, enforceMaxLength: 19
                         }
                         }},
                         {text: 'Amount', dataIndex: 'A3653TOTAL', width: 90, align: 'right', editor: 'numberfield',
                         summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                         {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A3653FEXP', editor: {
                         completeOnEnter: false,
                         field: {
                         xtype: 'textfield',
                         maxLength: 8, enforceMaxLength: 8,
                         format: 'Y/m/d', maskRe: /[0-9]/
                         }
                         }}
                         ],
                         defaults: {
                         sortable: false,
                         menuDisabled: true,
                         align: 'center'
                         }
                         },
                         height: 150,
                         flex: 1
                         }*/
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
                            id: prototype.id2 + '-gridListTaxes',
                            title: 'TAXES COMPANY',
                            collapsible: true,
                            collapseDirection: "right",
                            collapsed: true,
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
                                    {text: 'Cur', dataIndex: 'A3652MONED', flex: 1},
                                    {text: 'Tax</br>Code', dataIndex: 'A3652CDTAX', flex: 1},
                                    {text: 'Amount', dataIndex: 'A3652TXDIF', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            width: 700
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id2 + '-gridTaxes', //hidden: true,
                            collapsible: true,
                            collapseDirection: Ext.Component.DIRECTION_LEFT,
                            columnLines: true,
                            title: 'TAXES AM',
                            autoScroll: true,
                            selModel: 'cellmodel',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Taxes',
                                            id: prototype.id2 + '-gridTaxesADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'OnAddTaxRenderer'
                                        }, '-']
                                }],
                            /*bbar: [
                             {
                             text: 'Add Tax',
                             listeners: {
                             click: 'OnAddTaxRenderer'
                             }
                             }
                             ],*/
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Cur', dataIndex: 'A3652MONED', flex: 1},
                                    {text: 'Tax', dataIndex: 'A3652CDTAX', align: 'center', flex: 1, editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 3, enforceMaxLength: 3,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A3652APFC', editor: {
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
                                    {text: 'Net', dataIndex: 'A3652TXDIF', flex: 1, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary', //summaryType: 'sum',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                total = total + parseFloat(records[j].get('A3652TXDIF'));
                                            }
                                            return total.toFixed(2);
                                            //console.log(records);
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnTaxRFNDRemove'
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
                            height: 150,
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
                            xtype: 'grid',
                            id: prototype.id2 + '-gridRazonesTkt', //hidden: true,
                            columnLines: true,
                            title: 'LIST OF REASONS FOR REJECTIONS',
                            autoScroll: true, hidden: true,
                            selModel: 'cellmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: {
                                items: [
                                    {text: 'Sender', dataIndex: 'A3649TYPE', align: 'center', width: 90},
                                    {text: 'Code', dataIndex: 'A3649CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A3649ERROR', flex: 1, editor: 'textfield'},
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnRazonRFNDRemove'
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
                            height: 150,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        labelWidth: 120,
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important'

                    },
                    items: [
                        {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'XML calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'AM Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'button',
                            text: 'Add Reasons',
                            id: prototype.id2 + '-txtadd',
                            iconCls: 'prx-icon-add',
                            hidden: true,
                            listeners: {
                                click: 'onWinFormRazonesClick'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id2 + '-ComboStatus',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'left',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
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
                            id: prototype.id2 + '-txtFare',
                            fieldLabel: 'Fare',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtTotalFareAm',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: '0.00',
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
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtTotalTax',
                            fieldLabel: 'Total Tax',
                            readOnly: true,
                            labelWidth: 70,
                            value: '0.00'
                        }, {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtTotalTaxAm',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '00'
                        },
                        {xtype: 'tbspacer', width: 70},

                        {
                            xtype: 'checkboxfield',
                            id: prototype.id2 + '-checkApplyBPO',
                            labelWidth: 170,
                            labelSeparator: '',
                            fieldLabel: 'Apply change status / BPO',
                            labelStyle: 'font-weight: bold; color:red;'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id2 + '-checkApplyrobot',
                            labelWidth: 115,
                            labelSeparator: '',
                            fieldLabel: 'Apply robot sabre',
                            labelStyle: 'font-weight: bold; color:red;'
                        }
                        //Combochangestatus




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
                            id: prototype.id2 + '-txtCommission',
                            fieldLabel: 'Commission:',
                            readOnly: true,
                            labelWidth: 70,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Total RFND',
                            labelStyle: 'font-weight: bold;'
                        },
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
                            id: prototype.id2 + '-txtTotal',
                            fieldLabel: 'Total',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtTotalram',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0.00'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Coupon',
                            labelWidth: 50
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id2 + '-txtCpn1',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '1'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon2',
                            id: prototype.id2 + '-txtCpn2',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '2'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon3',
                            id: prototype.id2 + '-txtCpn3',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '3'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon1',
                            id: prototype.id2 + '-txtCpn4',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '4'
                        },
                        {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'displayfield',
                            id: prototype.id2 + '-txtusoCpn',
                            fieldLabel: 'All coupons are used',
                            labelStyle: 'font-weight: bold; color:red;',
                            labelWidth: 200,
                            labelSeparator: '',
                            hidden: true
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id2 + '-txtShowcoupons',
                            labelWidth: 100,
                            labelSeparator: '',
                            fieldLabel: 'Show all coupons',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
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
                    text: 'Save',
                    id: prototype.id2 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onClickSave'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id2 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

