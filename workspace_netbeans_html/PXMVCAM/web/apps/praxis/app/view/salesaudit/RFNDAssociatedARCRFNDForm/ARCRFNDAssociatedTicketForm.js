/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDAssociatedARCRFNDForm.ARCRFNDAssociatedTicketForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailTicket',
    controller: 'ARCRFNDAssociatedTicketFormController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDAssociatedARCRFNDForm.ARCRFNDAssociatedTicketFormController'
    ],
    id: prototype.idARCDetailTicket + '-win',
    title: 'TICKET DETAIL',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 880,
    width: 1180,
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
            id: prototype.idARCDetailTicket + '-form',
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
                            id: prototype.idARCDetailTicket + '-txtfolio',
                            fieldLabel: 'Folio',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txttkt',
                            fieldLabel: 'TKT',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtcpn',
                            fieldLabel: 'CPNs',
                            labelWidth: 30,
                            width: 80,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txttrnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 30,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtIssdate',
                            fieldLabel: 'Iss. date',
                            labelWidth: 55,
                            width: 150,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txttidoc',
                            fieldLabel: 'Type',
                            labelWidth: 35,
                            width: 120,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idARCDetailTicket + '-CmbConto',
                            fieldLabel: 'CJT',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 160,
                            labelWidth: 30,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 100
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idARCDetailTicket + '-CmbTRFND',
                            fieldLabel: 'T.RFND',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 140,
                            labelWidth: 40,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 100
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
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtpax',
                            fieldLabel: 'Pax. name',
                            labelWidth: 80,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtReqReason',
                            fieldLabel: 'Req. Reason',
                            labelWidth: 75,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 350
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtRemarks',
                            fieldLabel: 'Remarks',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 350
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtpnr',
                            fieldLabel: 'PNR',
                            labelWidth: 25,
                            width: 100,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'button', hidden: true,
                            id: prototype.idARCDetailTicket + '-txtImageView',
                            iconCls: 'prx-icon-image-view',
                            tooltip: 'View files',
                            listeners: {
                                click: 'onImageViewClick'
                            }
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
                            id: prototype.idARCDetailTicket + '-txtEndorse',
                            fieldLabel: 'Endorsements',
                            labelWidth: 80,
                            width: 655,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtiata',
                            fieldLabel: 'IATA Req.',
                            labelWidth: 60,
                            width: 165,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtiataIss',
                            fieldLabel: 'IATA Iss.',
                            labelWidth: 60,
                            width: 165,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtrefundable',
                            fieldLabel: 'Refund',
                            labelWidth: 45,
                            width: 120,
                            value: 'xxxxxx',
                            readOnly: true,
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
                            id: prototype.idARCDetailTicket + '-txtFareCal',
                            fieldLabel: 'FareCalculation',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtFlag',
                            fieldLabel: 'Status',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtStatus',
                            fieldLabel: 'Audit',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
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
                            id: prototype.idARCDetailTicket + '-txtRfndFee',
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
                            id: prototype.idARCDetailTicket + '-txtAplicable',
                            fieldLabel: 'Applicable',
                            labelWidth: 60,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 220
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtRazon',
                            fieldLabel: 'Reason',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 250
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
                            id: prototype.idARCDetailTicket + '-gridCPN',
                            title: 'Itinerary',
                            //collapsible: true,
                            // collapseDirection: "right",
                            //collapsed: true,
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Nbr', dataIndex: 'A4366CPN', width: 50},
                                    {text: 'Cx', dataIndex: 'A4366STOP', width: 30},
                                    {text: 'Al', dataIndex: 'A4366MARKE', width: 50},
                                    {text: 'FIt', dataIndex: 'A4366NFLGH', width: 50},
                                    {text: 'Cl', dataIndex: 'A4366CLAS', width: 50},
                                    {text: 'Dep', dataIndex: 'A4366FORIG', width: 90},
                                    {text: 'Frm', dataIndex: 'A4366ORIGE', width: 50},
                                    {text: 'To', dataIndex: 'A4366DESTI', width: 50},
                                    {text: 'Time', dataIndex: 'A4366HORIG', width: 60},
                                    {text: 'Bk St', dataIndex: 'A4366BOOKI', width: 40},
                                    {text: 'Fb', dataIndex: 'A4366FBASI', width: 100},
                                    {text: 'Stat', dataIndex: 'A4366CURS1', width: 60},
                                    {text: 'FF', dataIndex: 'A4366MDA', width: 60},
                                    {text: 'Bags', dataIndex: 'A4366BAGAL', width: 60},
                                    {text: 'Net', dataIndex: 'A4366MONTO', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 120,
                            width: 930
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtCorreo',
                            fieldLabel: 'E-mail',
                            //fieldLabel: '<span class="red-label">*</span>' + l10n('E-mail'),
                            name: 'emailAddress',
                            regex: /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+\/=?\^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
                            allowBlank: false,
                            value: 'xxxxxx',
                            readOnly: true,
                            maxLength: 50, enforceMaxLength: 50,
                            labelWidth: 35
                        }
                        /*{
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtCorreo',
                            fieldLabel: 'E-mail',
                            labelWidth: 35,
                            maxLength: 50, enforceMaxLength: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
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
                            id: prototype.idARCDetailTicket + '-gridListTaxesXML',
                            title: 'TAXES XML', //hidden: true,
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
                                    {text: 'Tax</br>Code', dataIndex: 'A4364CDTAX', width: 60},
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A4364APFC'},
                                    {text: 'Amount',
                                        columns: [
                                            {text: 'XML', dataIndex: 'A4364TXAGE', width: 100, align: 'right',
                                                renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                                summaryRenderer: 'OnAirlineSummary'
                                            }
                                        ]


                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 245
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idARCDetailTicket + '-gridListTaxes',
                            title: 'TAXES AUDITOR', hidden: true,
                            //collapsible: true,
                            //collapseDirection: "right",
                            //collapsed: true,
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
                                    {text: 'Cur', dataIndex: 'A4364MONED', width: 60},
                                    {text: 'Tax</br>Code', dataIndex: 'A4364CDTAX', width: 80},
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A4364APFC'},
                                    {text: 'Amount',
                                        columns: [
                                            {text: 'AUDITOR', dataIndex: 'A4364TXMIA', width: 100, align: 'right',
                                                renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                                summaryRenderer: 'OnAirlineSummary'
                                            }
                                        ]


                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 350
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idARCDetailTicket + '-gridTaxes', hidden: true,
                            //collapsible: true,
                            //collapseDirection: Ext.Component.DIRECTION_LEFT,
                            //columnLines: true,
                            title: 'TAXES AUDITOR',
                            autoScroll: true,
                            selModel: 'cellmodel',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Taxes',
                                            id: prototype.idARCDetailTicket + '-gridTaxesADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'OnAddTaxRenderer'
                                        }, '-']
                                }],
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
                                    //{text: 'Cur', dataIndex: 'A4364MONED', flex: 1},
                                    {text: 'Tax', dataIndex: 'A4364CDTAX', align: 'center', width: 60, editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 3, enforceMaxLength: 3,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A4364APFC', editor: {
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

                                    {text: 'Amount',
                                        columns: [

                                            {text: 'AUDITOR', dataIndex: 'A4364TXMIA', flex: 1, align: 'right', editor: 'numberfield',
                                                hideTrigger: true, keyNavEnabled: false, mouseWheelEnabled: false,
                                                renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary', //summaryType: 'sum',
                                                summaryType: function (records) {
                                                    // do your logic and return a value.
                                                    var total = 0;
                                                    var lenn = records.length;
                                                    for (var j = 0; j < lenn; ++j) {
                                                        total = total + parseFloat(records[j].get('A4364TXMIA'));
                                                    }
                                                    return total.toFixed(2);
                                                    //console.log(records);
                                                }
                                            }
                                        ]


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
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 270
                        }, {
                            xtype: 'grid',
                            id: prototype.idARCDetailTicket + '-gridPAYMENT',
                            title: 'FORM OF PAYMENT', hidden: true,
                            //collapsible: true,
                            //collapseDirection: Ext.Component.DIRECTION_LEFT,
                            //columnLines: true,
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
                                            id: prototype.idARCDetailTicket + '-gridFopADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onAddFopClick'
                                        }, '-']
                                }],
                            autoScroll: true,
                            columns: {
                                items: [//maxLength: 3,enforceMaxLength: 3,
                                    {text: 'Type', dataIndex: 'A4365TYPE', width: 80},
                                    {text: 'Code', width: 50, dataIndex: 'A4365CFOP', editor: {
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
                                    {text: 'Card<br>Type', width: 45, dataIndex: 'A4365TYCAR', editor: {
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
                                    {text: 'Ref Number', width: 150, dataIndex: 'A4365NTARJ', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 19, enforceMaxLength: 19
                                            }
                                        }},
                                    {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A4365FEXP', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 8, enforceMaxLength: 8,
                                                format: 'Y/m/d', maskRe: /[0-9]/
                                            }
                                        }},
                                    {text: 'Approval<br>Card', width: 70, dataIndex: 'A4365CAPL', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 6, enforceMaxLength: 6,
                                                maskRe: /[0-9]/
                                            }
                                        }
                                    },
                                    {text: 'Net', dataIndex: 'A4365TOTAL', width: 120, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                if (records[j].get('A4365TYPE') === 'AE') {
                                                    total = total + parseFloat(records[j].get('A4365TOTAL'));
                                                }

                                            }
                                            return total.toFixed(2);
                                            //console.log(records);
                                        }
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
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 650
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idARCDetailTicket + '-gridPAYMENTQUERY',
                            title: 'FORM OF PAYMENT', hidden: true,
                            //collapsible: true,
                            //collapseDirection: "left",
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
                                    {text: 'Type', dataIndex: 'A4365TYPE', width: 80},
                                    {text: 'Code', width: 50, dataIndex: 'A4365CFOP'},
                                    {text: 'Code', dataIndex: 'A4365TYCAR', width: 45},
                                    {text: 'Credit Card Number', dataIndex: 'A4365NTARJ', width: 150},
                                    {text: 'Net', dataIndex: 'A4365TOTAL', width: 120, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                if (records[j].get('A4365TYPE') === 'AE') {
                                                    total = total + parseFloat(records[j].get('A4365TOTAL'));
                                                }

                                            }
                                            return total.toFixed(2);
                                            //console.log(records);
                                        }
                                    },
                                    {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A4365FEXP'}
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 570
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
                            id: prototype.idARCDetailTicket + '-gridDataStatus',
                            title: 'USES COUPONS',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Update CPN',
                                            id: prototype.idARCDetailTicket + '-txtUpdateUsos',
                                            iconCls: 'prx-icon-update',
                                            handler: 'OnUpdateUsosCPN'
                                        }, '-']
                                }],
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {
                                        text: 'Ticket',
                                        dataIndex: 'A4367TICKT',
                                        width: 100
                                    },
                                    {
                                        text: 'CPN',
                                        dataIndex: 'A4367CPN',
                                        width: 40
                                    },
                                    /*{
                                     text: 'Code',
                                     dataIndex: 'A3660CODE',
                                     width: 75
                                     },*/
                                    {
                                        text: 'Previous <br> status',
                                        dataIndex: 'A4367STINI',
                                        width: 80
                                    },
                                    {
                                        text: 'Current <br> status',
                                        dataIndex: 'A4367STFIN',
                                        width: 80
                                    },
                                    {
                                        text: 'Date',
                                        dataIndex: 'A4367FCAMB',
                                        width: 70
                                    },
                                    {
                                        text: 'Hour',
                                        dataIndex: 'A4367HCAMB',
                                        width: 70
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            width: 460,
                            listeners: {
                                afterrender: 'OnLoadGridAfterrender'
                            }
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'grid',
                            id: prototype.idARCDetailTicket + '-gridRazonesTkt',
                            columnLines: true,
                            title: 'LIST OF REASONS',
                            autoScroll: true,
                            selModel: 'cellmodel',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Reasons',
                                            id: prototype.idARCDetailTicket + '-txtRazonesadd',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onWinFormRazonesClick'
                                        }, '-']
                                }],
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: {
                                items: [
                                    {text: 'Code', dataIndex: 'A4362CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A4362ERROR', flex: 1, editor: 'textfield'},
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
                            width: 440
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
                            fieldLabel: 'PRAXIS Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'XML Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'AM Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'combo',
                            id: prototype.idARCDetailTicket + '-ComboStatus',
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
                            id: prototype.idARCDetailTicket + '-txtFare',
                            fieldLabel: 'Fare',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtFareXml',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: '0.00',
                            readOnly: true
                        },
                        {
                            xtype: 'numberfield',
                            id: prototype.idARCDetailTicket + '-txtTotalFareAm',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            // allowNegative: true,
                            // maskRe: /[0-9.-]/,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: 'onSearchkey',
                                blur: 'onTotaFare'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtmda',
                            fieldLabel: '',
                            width: 80,
                            value: '',
                            readOnly: true,
                            listeners: {
                                change: 'onchange'
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
                            id: prototype.idARCDetailTicket + '-txtFareEq',
                            fieldLabel: 'Eq. Fare',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtFareEqXml',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: '0',
                            readOnly: true
                        },
                        {
                            xtype: 'numberfield',
                            id: prototype.idARCDetailTicket + '-txtTotalEqFareAm',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            //maskRe: /[0-9.-]/,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: 'onSearchkey',
                                blur: 'onTotaFare'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtEqmda',
                            fieldLabel: '',
                            width: 80,
                            value: '',
                            readOnly: true,
                            listeners: {
                                change: 'onchange'
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
                            id: prototype.idARCDetailTicket + '-txtTotalTax',
                            fieldLabel: 'Total Tax',
                            readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtTotalTaxXml',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtTotalTaxAm',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {xtype: 'tbspacer', width: 70},
                        {
                            xtype: 'checkboxfield', hidden: true,
                            id: prototype.idARCDetailTicket + '-checkApplyBPO',
                            labelWidth: 170,
                            labelSeparator: '',
                            fieldLabel: 'Apply change status / BPO',
                            labelStyle: 'font-weight: bold; color:red;'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'checkboxfield', hidden: true,
                            id: prototype.idARCDetailTicket + '-checkApplyrobot',
                            labelWidth: 115,
                            labelSeparator: '',
                            fieldLabel: 'Apply robot sabre',
                            labelStyle: 'font-weight: bold; color:red;'
                        }
                        //Combochangestatus




                    ]
                },
                {
                    xtype: 'panel', hidden: true,
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
                            id: prototype.idARCDetailTicket + '-txtCommission',
                            fieldLabel: 'Commission:',
                            readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtCommissionXml',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtCommissionAm',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        }/*,
                         {
                         xtype: 'displayfield',
                         fieldLabel: 'Total RFND',
                         labelStyle: 'font-weight: bold;'
                         },*/
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
                            xtype: 'displayfield',
                            fieldLabel: 'Penalty:'
                        },
                        {xtype: 'tbspacer', width: 120},
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtPenaltyXML',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'numberfield',
                            id: prototype.idARCDetailTicket + '-txtPenalty',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            //maskRe: /[0-9.-]/,
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
                            id: prototype.idARCDetailTicket + '-txtTotal',
                            fieldLabel: 'Total',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtTotalXml',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idARCDetailTicket + '-txtTotalram',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Coupon',
                            labelWidth: 50
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idARCDetailTicket + '-txtCpn1',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '1'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon2',
                            id: prototype.idARCDetailTicket + '-txtCpn2',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '2'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon3',
                            id: prototype.idARCDetailTicket + '-txtCpn3',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '3'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon1',
                            id: prototype.idARCDetailTicket + '-txtCpn4',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '4'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idARCDetailTicket + '-txtCpn5',
                            name: 'Cupon5', hidden: true,
                            labelWidth: 3,
                            fieldLabel: '5'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon6',
                            id: prototype.idARCDetailTicket + '-txtCpn6',
                            hidden: true,
                            labelWidth: 3,
                            fieldLabel: '6'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon7',
                            id: prototype.idARCDetailTicket + '-txtCpn7',
                            hidden: true,
                            labelWidth: 3,
                            fieldLabel: '7'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon8',
                            id: prototype.idARCDetailTicket + '-txtCpn8',
                            hidden: true,
                            labelWidth: 3,
                            fieldLabel: '8'
                        },
                        {xtype: 'tbspacer', width: 5},
                        /*{
                         xtype: 'displayfield',
                         id: prototype.idARCDetailTicket + '-txtusoCpn',
                         fieldLabel: 'All coupons are used',
                         labelStyle: 'font-weight: bold; color:red;',
                         labelWidth: 150,
                         labelSeparator: '',
                         hidden: true
                         },*/
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idARCDetailTicket + '-txtShowcoupons',
                            labelWidth: 100,
                            labelSeparator: '',
                            fieldLabel: 'Show all coupons',
                            listeners: {
                                change: 'onChkChangeCPN'
                                        // checkchange:'onChkChangeCPN',
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
                    id: prototype.idARCDetailTicket + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onClickSave'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.idARCDetailTicket + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

