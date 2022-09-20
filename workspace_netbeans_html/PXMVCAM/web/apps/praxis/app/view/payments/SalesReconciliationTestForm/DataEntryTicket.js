Ext.define('Ext.Praxis.view.payments.SalesReconciliationTestForm.DataEntryTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTicketSalesReconciliationTestForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationTest.DataEntryTicketSalesReconciliationTestController'
    ],
    controller: 'DataEntryTicketSalesReconciliationTestController',
    title: 'Ticket - Data Entry Form',
    header: true,
    height: 750,
    width: 1021,
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
            id: prototype.id+'-2-box1',
            defaults: {
                style: 'margin: 2px 5px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Ticket Number',
                            style: 'font-weight:bold;color:#121E31;',
                            margin: '0 0 0 10',
                            padding: '4 0',
                            width: 109,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CCIA(3)+FORMA(4)+SERIE(6)+CUPON (1)'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-2-txtTicket',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 14,
                            readOnly: true,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Sequence',
                            style: 'font-weight:bold;color:#121E31;',
                            margin: '0 0 0 10',
                            padding: '4 0',
                            width: 90
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-2-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
//                            maxLength: 1,
                            width: 35
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Document Type',
                            style: 'font-weight:bold;color:#121E31;',
                            margin: '0 0 0 10',
                            padding: '4 0',
                            width: 120
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id+'-2-cmbTDOC',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [null, "&nbsp;"],
                                    ["S", "Sales"],
                                    ["R", "Refund"]
                                ]
                            }),
                            fieldStyle: 'color:#074066;',
                            queryMode: 'local',
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 90,
                            disabled: true,
                            value: null,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                select: function (comp, record, index) {
                                    if (comp.rawValue === "&nbsp;") {
                                        comp.setValue(null);
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 2},
                        {
                            xtype: 'label',
                            text: 'Source',
                            style: 'font-weight:bold;color:#121E31;',
                            margin: '0 0 0 10',
                            padding: '4 0',
                            width: 70
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id+'-2-cmbFTE',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [null, "&nbsp;"],
                                    ["B", "BSP"],
                                    ["A", "ARC"],
                                    ["S", "ASR"]
                                ]
                            }),
                            fieldStyle: 'color:#074066;',
                            queryMode: 'local',
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 90,
                            disabled: true,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                select: function (comp, record, index) {
                                    if (comp.rawValue === "&nbsp;") {
                                        comp.setValue(null);
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#121E31;',
                            margin: '0 0 0 10',
                            padding: '4 0',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id+'-2-cmbSTVAL',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [null, "&nbsp;"],
                                    ["1", "Match"],
                                    ["2", "Sales without Settlement"],
                                    ["3", "Settlement without Sales"],
                                    ["4", "Match with Differences"],
                                    ["5", "Match Manual"]
                                ]
                            }),
                            fieldStyle: 'color:#074066;',
                            queryMode: 'local',
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 150,
                            disabled: true,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            triggerAction: 'all',
                            listeners: {
                                select: function (comp, record, index) {
                                    if (comp.rawValue === "&nbsp;") {
                                        comp.setValue(null);
                                    }
                                }
                            }
                        }
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="Sales Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 159px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Sales Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 100,
                                    
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSCARCOD',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 50
                                },
                                {
                                    xtype: 'label',
                                    text: 'Transaction Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 60',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtTRNCU',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 50
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 55',
                                    padding: '4 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSCOUNTRY',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Agent',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSAGENT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Agent Name',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSAGNAME',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 120
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Merchant Nbr',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtMERCHN',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 55',
                                    padding: '4 0',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'PNR - PNR Provider'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSPNR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Contracting Card',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSTCNTR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Card Nbr',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSCARDN',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 16,
                                    maskRe: /[0-9, */]/,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Authoriz. Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 55',
                                    padding: '4 0',
                                    width: 100,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Authorization Code'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSAUTHOC',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Expiration Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSDATEXP',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                } 
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 100,
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSVFOP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    readOnly: true,
                                    width: 40
                                },
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 15',
                                    padding: '4 0',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSPAYDATE',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Processing Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtSPRODATE',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Liquidation Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 123px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Liquidation Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 100,
                                    
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtACARCOD',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 50
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtADATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 55',
                                    padding: '4 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtACOUNTRY',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Agent',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAAGENT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Agent Name',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAAGNAME',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 120
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Merchant Nbr',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtMERCHN1',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 55',
                                    padding: '4 0',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'PNR - PNR Provider'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAPNR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Contracting Card',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtATCNTR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Card Nbr',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtACARDN',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 16,
                                    maskRe: /[0-9, */]/,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Authoriz. Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 55',
                                    padding: '4 0',
                                    width: 100,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Authorization Code'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAAUTHOC',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Expiration Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtADATEXP',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                } 
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 100,
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
                                    padding: '4 0',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAVFOP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtACURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    readOnly: true,
                                    width: 40
                                },
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 15',
                                    padding: '4 0',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAPAYDATE',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Processing Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    padding: '4 0',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtAPRODATE',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Pepa Grilla">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 114px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Conciliation</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataInfoScan',
                            layout: 'vbox',
                            border: false,
                            width: 956,
                            height: 230,
                            hidden: false,
                            autoScroll: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 12 20',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataInfoScan',
                                    width: 952,
                                    height: 180,
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
                                            {text: 'Status', dataIndex: 'STMANUAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = 'Sales';
                                                    if (record.data.FDUPLIB > 0) {
                                                        value = 'Blocked'
                                                    }
                                                    if (record.data.FDESGLOSE === '1') {
                                                        value = 'Concil.'
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    if (record.data.TDOC === 'A') {
                                                        metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 115,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'A1531CAPL', width: 65,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Adjust.', dataIndex: 'SADJUST', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'A1531VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'A720PNR', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 112,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                editor: {xtype: 'textfield', editable: false},
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Del.',
                                                dataIndex: '',
                                                xtype: 'widgetcolumn',
                                                align: 'center',
                                                width: 40,
                                                widget: {
                                                    xtype: 'button',
                                                    icon: 'resources/img/icon/delete.png',
                                                    tooltip: 'remove',
                                                    listeners: {
                                                        click: function (button, e, eOpts) {
                                                            var record = button.getWidgetRecord();
                                                            if (record.data.FDESGLOSE !== '1') {
                                                                meDE.removeTKT(record);
                                                            }

                                                        }
                                                    }
                                                }

                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 30,
                                                text: 'Fill',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Fill TKT & PNR',
                                                        handler: 'onTktPnr'
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Adj.',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-add',
                                                        tooltip: 'Create adjustment',
                                                        handler: 'onAdjust'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', height: 2},
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    id: prototype.id + '-panelADJ',
                                    border: false,
                                    hidden: true,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Adjustment Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbADJTYPE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 180,
                                            labelWidth: 10,
                                            hidden: false,
                                            hiddenLabel: false
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', height: 2},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAdjustment',
                                    width: 952,
                                    height: 60,
                                    hidden: true,
                                    columnLines: true,
                                    plugins: [
                                        {
                                            ptype: 'cellediting',
                                            clicksToEdit: 1
                                        }
                                    ],
                                    hideHeaders: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Status', dataIndex: 'STMANUAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = 'Adjustment';
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = 'Adjustment';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 115,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'A1531CAPL', width: 65,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Adjust.', dataIndex: 'SADJUST', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {header: 'Amount', dataIndex: 'A1531VFOP', width: 70, xtype: 'gridcolumn',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#F0FA8F";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                listeners: {
                                                    click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
                                                        meDE.gridAdjustmentRowIndex = rowNum;
                                                    },
                                                },
                                                editor: {
                                                    xtype: 'textfield',
                                                    editable: true,
                                                    allowBlank: false,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.-]/,
                                                    selectOnFocus: true,
                                                    listeners: {
                                                        specialkey: 'eventKeyAdjustment',
                                                    }
                                                },
                                            },
                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'A720PNR', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 112,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                },
                                                editor: {xtype: 'textfield', editable: false},
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: '', dataIndex: '', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '';
                                                }
                                            },
                                            {text: '', dataIndex: '', width: 30,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '';
                                                }
                                            },
                                            {text: '', dataIndex: '', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-2-ControlData',
                    title: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
                    width: 760,
                    border: true,
                    defaults: {
                        style: 'margin: 10 0 10 50',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtUSCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtFECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtHOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtUSUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtFEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-2-txtHOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 0 0',
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
                    id: prototype.id+'-2-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'button',
                    id: prototype.id+'-2-imgPrev',
                    icon: 'resources/img/botones/prev.png',
                    tooltip: 'View Previous Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onPrevClick'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id+'-2-imgNext',
                    icon: 'resources/img/botones/next2.png',
                    tooltip: 'View Next Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onNextClick'
                    }
                }
            ]
        }
    ]
});