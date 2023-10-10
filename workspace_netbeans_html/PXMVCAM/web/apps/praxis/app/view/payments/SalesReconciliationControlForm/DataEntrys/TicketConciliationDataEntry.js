prototype.idDE = prototype.id + '-TransacErrorBPODataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TicketConciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.TicketConciliationDataEntryController'
    ],
    controller: 'TicketConciliationDataEntryController',
    title: 'Ticket Conciliation - Form',
    header: true,
    width: 1080,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            defaults: {
                style: 'margin: 3px;',
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
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Sale Information">
                        {
                            xtype: 'fieldset',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Sales Information</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            style: {
                                backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
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
                                    margin: '5 8 5 8',
                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Ticket',
                                            id: prototype.idDE + '-ticketNumber',
                                            width: 200,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Seq',
                                            name: 'a4496SEQ',
                                            width: 80,
                                            labelWidth: 35
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Uses',
                                            margin: '5 2 5 2',
                                            width: 60,
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Show Uses',
                                            listeners: {
                                                click: 'onSearchUses'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Pax Name',
                                            name: 'a4496PAX',
                                            width: 300,
                                            labelWidth: 75
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.idDE + '-panelVoid',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            bodyStyle: 'background: transparent;"',
                                            border: false,
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 'auto',
                                                    text: 'VOID',
                                                    style: 'color:red;font-weight:bold;font-size:18px;'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Sale Date',
                                            name: 'a4496FECVT',
                                            width: 160,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Agent',
                                            name: 'a4496AGENT',
                                            width: 140,
                                            labelWidth: 60
                                        },
                                        {
                                            fieldLabel: 'Agent Name',
                                            name: 'agent_NAME',
                                            width: 300,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Transaction',
                                            name: 'a4496TRNCU',
                                            width: 150,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Doc. Type',
                                            name: 'a4496TIPOD',
                                            width: 130,
                                            labelWidth: 70
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Source',
                                            name: 'a4496FUENT',
                                            width: 135,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Channel',
                                            name: 'a4496SFUEN',
                                            width: 120,
                                            labelWidth: 60
                                        },
                                        {
                                            fieldLabel: 'Country',
                                            name: 'a4496PAIS',
                                            width: 110,
                                            labelWidth: 60
                                        },
                                        {
                                            fieldLabel: 'EPR Code',
                                            name: 'a4496CODAG',
                                            width: 140,
                                            labelWidth: 70
                                        },
                                        {
                                            fieldLabel: 'PNR',
                                            name: 'a4496PNR',
                                            width: 125,
                                            labelWidth: 45
                                        },
                                        {
                                            fieldLabel: 'RFIC',
                                            name: 'a4496RFIC',
                                            width: 75,
                                            labelWidth: 45
                                        },
                                        {
                                            fieldLabel: 'RFIS',
                                            name: 'a4496RFIS1',
                                            width: 85,
                                            labelWidth: 45
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Payment Information">
                        {
                            xtype: 'fieldset',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">FOP Information</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            style: {
                                backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
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
                                    margin: '5 8 5 8',
                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Card Type',
                                            name: 'a4501TTARJ',
                                            width: 120,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Card Number',
                                            name: 'a4501NREF',
                                            width: 220,
                                            labelWidth: 90
                                        },
                                        {
                                            fieldLabel: 'Auth Number',
                                            name: 'a4501CAPL',
                                            width: 165,
                                            labelWidth: 90
                                        },
                                        {
                                            fieldLabel: 'Total Amount',
                                            name: 'a4501VFOP',
                                            width: 170,
                                            labelWidth: 90,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            }
                                        },
                                        {
                                            fieldLabel: 'Status Concil.',
                                            name: 'a4501STVAL',
                                            width: 230,
                                            labelWidth: 100,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
                                                        '0': 'Stand By',
                                                        '1': 'Match',
                                                        '2': 'Sales Without Sett.',
                                                        '3': 'Settl. Without Sales',
                                                        '4': 'Match Diff.',
                                                        '5': 'Match Manual',
                                                        '6': 'Forced Match',
                                                        '7': 'Compensation Match',
                                                        '8': 'Pending RFND'
                                                    };
                                                    field.setRawValue(opts[newValue] || '');
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Conciliation">
                        {
                            xtype: 'fieldset',
                            hidden: true,
                            id: prototype.idDE + '-liquiInfo',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Liquidation Information</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
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
                                    margin: '5 8 5 8',
                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false
                                }
                            },
                            items: [

                                {
                                    items: [
                                        {
                                            fieldLabel: 'Processing Date',
                                            name: 'prda',
                                            width: 200,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Sale Date',
                                            name: 'sdate',
                                            width: 150,
                                            labelWidth: 70
                                        },
                                        {
                                            fieldLabel: 'Transac. Date',
                                            name: 'transdate',
                                            width: 170,
                                            labelWidth: 90
                                        },
                                        {
                                            fieldLabel: 'Payment Date',
                                            name: 'paydate',
                                            width: 170,
                                            labelWidth: 90
                                        },
                                        {
                                            fieldLabel: 'Doc. Type',
                                            name: 'transtype',
                                            width: 140,
                                            labelWidth: 80
                                        },
                                        {
                                            fieldLabel: 'Void',
                                            name: 'fvoid',
                                            width: 80,
                                            labelWidth: 40
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Processor',
                                            name: 'proc_NAME',
                                            width: 230,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Country',
                                            name: 'scountry',
                                            width: 110,
                                            labelWidth: 60
                                        },
                                        {
                                            fieldLabel: 'Currency',
                                            name: 'scurrency',
                                            width: 120,
                                            labelWidth: 70
                                        },
                                        {
                                            fieldLabel: 'Agent',
                                            name: 'sagent',
                                            width: 130,
                                            labelWidth: 55
                                        },
                                        {
                                            fieldLabel: 'Flag Selec',
                                            name: 'fselec',
                                            width: 150,
                                            labelWidth: 80,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
                                                        'L': 'Load',
                                                        'D': 'Duplicated'
                                                    };
                                                    field.setRawValue(opts[newValue] || '');
                                                }
                                            }
                                        },
                                        {
                                            fieldLabel: 'Flag Compl.',
                                            name: 'fcompl',
                                            width: 160,
                                            labelWidth: 80,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
                                                        '1': 'Plusgrade',
                                                        '2': 'Ligas',
                                                        '3': 'Tablet',
                                                        '4': 'BPO'
                                                    };
                                                    field.setRawValue(opts[newValue] || '');
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'P. Merchant ID',
                                            name: 'pmerchid',
                                            width: 210,
                                            labelWidth: 120
                                        },
                                        {
                                            //fieldLabel: 'Description',
                                            name: 'des_MERCHANT',
                                            width: 180
                                                    //labelWidth: 70
                                        },
                                        {
                                            fieldLabel: 'Sale Merchant ID',
                                            name: 'smerchid',
                                            width: 210,
                                            labelWidth: 120
                                        },
                                        {
                                            //fieldLabel: 'Description',
                                            name: 'des_SMERCHANT',
                                            width: 180
                                                    //labelWidth: 40
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Invoice Ref. Nbr.',
                                            name: 'invoirn',
                                            width: 230,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Ticket',
                                            name: 'ticket',
                                            width: 160,
                                            labelWidth: 55
                                        },
                                        {
                                            fieldLabel: 'PNR',
                                            name: 'spnr',
                                            width: 110,
                                            labelWidth: 40
                                        },
                                        {
                                            fieldLabel: 'Inst. Plan',
                                            name: 'nbrinsta',
                                            width: 100,
                                            labelWidth: 70
                                        },
                                        {
                                            fieldLabel: 'Inst. Number',
                                            name: 'instanbr',
                                            width: 120,
                                            labelWidth: 90
                                        },
                                        {
                                            fieldLabel: 'Qty. TKT',
                                            name: 'qtytkt',
                                            width: 100,
                                            labelWidth: 70
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Card Number',
                                            name: 'scardn',
                                            width: 260,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Auth Number',
                                            name: 'sauthoc',
                                            width: 165,
                                            labelWidth: 90
                                        },
                                        {
                                            fieldLabel: 'Total Amount',
                                            name: 'tgrosamoun',
                                            width: 170,
                                            labelWidth: 90,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            }
                                        },
                                        {
                                            fieldLabel: 'Concil. Amount',
                                            name: 'svfops',
                                            width: 185,
                                            labelWidth: 100,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            }
                                        },
                                        {
                                            fieldLabel: 'Difference',
                                            id: prototype.idDE + '-difference',
                                            width: 165,
                                            labelWidth: 80,
                                            value: '0.00',
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Sett. vs Sales',
                                            name: 'cerror',
                                            width: 170,
                                            labelWidth: 120
                                        },
                                        {
                                            name: 'desc_CERROR',
                                            width: 200
                                        },
                                        {
                                            fieldLabel: 'Adjustment',
                                            name: 'codadju',
                                            width: 150,
                                            labelWidth: 100
                                        },
                                        {
                                            name: 'desc_CODADJU',
                                            width: 200
                                        }
                                    ]
                                }

                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Pending">
                        {
                            xtype: 'panel',
                            hidden: true,
                            border: false,
                            width: '100%',
                            margin: '5 5 5 5',
                            id: prototype.idDE + '-panelPending',
                            bodyStyle: 'background: transparent;"',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    margin: '0 8 0 0',
                                    padding: '5',
                                    style: 'color:#080808;font-weight:bold;font-size:16px;font-style:italic;background:#DF8E46;text-align:center;',
                                    text: 'PENDING CONCILIATION'
                                }
                            ]
                        },
                        //</editor-fold>
                        {
                            xtype: 'panel',
                            hidden: true,
                            border: false,
                            width: '100%',
                            margin: '5 5 5 5',
                            id: prototype.idDE + '-panelOptions',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            defaults: {
                                xtype: 'button',
                                margin: '0 5 0 5'
                            },
                            items: [
                                {

                                    text: 'ADM',
                                    width: 60,
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add ADM',
                                    listeners: {
                                        click: 'onADMClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Stand By',
                                    width: 100,
                                    iconCls: 'prx-icon-bpo-comment',
                                    tooltip: 'Open BPO Comment',
                                    listeners: {
                                        click: 'onOpenComments'
                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            hidden: true,
                            id: prototype.idDE + '-panelStandBy',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Stand By</span>',
                            layout: {
                                type: 'hbox',
                                pack: 'left'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            style: {
                                backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                            },
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;'
                            },
                            items: [
                                {
                                    id: prototype.idDE + '-bpocoment',
                                    fieldLabel: 'BPO Comment',
                                    labelWidth: 100,
                                    maxLength: 100,
                                    enforceMaxLength: true,
                                    width: 600
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDE + '-addStandBy',
                                    width: 25,
                                    iconCls: 'prx-icon-image-update',
                                    tooltip: 'Update Stand By',
                                    listeners: {
                                        click: 'onChangeStandBy'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDE + '-revStandBy',
                                    width: 25,
                                    iconCls: 'prx-icon-update',
                                    hidden: true,
                                    tooltip: 'Reverse Stand By',
                                    listeners: {
                                        click: 'onReverseStandBy'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDE + '-hideStandBy',
                                    width: 25,
                                    iconCls: 'prx-icon-cancel-action',
                                    tooltip: 'Cancel',
                                    hidden: true,
                                    listeners: {
                                        click: 'onCancelStandBy'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            hidden: true,
                            id: prototype.idDE + '-panelADM',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">ADM</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            style: {
                                backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                            },
                            defaults: {
                                xtype: 'panel',
                                border: false,
                                width: '100%',
                                margin: '5 3 5 3',
                                bodyStyle: 'background: transparent',
                                layout: {
                                    type: 'hbox',
                                    pack: 'left'
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '3 5 3 5',
                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;'
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Reason Code',
                                            id: prototype.id + '-cmbCERROR',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ['03', 'ADM/Double Emission']
                                                ]
                                            }),
                                            labelWidth: 90,
                                            width: 210,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            readOnly: true,
                                            value: '03'
                                        },
                                        {
                                            id: prototype.idDE + '-ADM-BPOCOMEN',
                                            fieldLabel: 'BPO Comment',
                                            labelWidth: 100,
                                            maxLength: 100,
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            width: 500
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            id: prototype.idDE + '-ADM-TKT',
                                            fieldLabel: 'Ticket',
                                            labelWidth: 90,
                                            width: 210,
                                            editable: false
                                        },
                                        {
                                            id: prototype.idDE + '-ADM-AMT',
                                            fieldLabel: 'Amount',
                                            labelWidth: 70,
                                            width: 160,
                                            editable: false
                                        },
                                        {
                                            id: prototype.idDE + '-ADM-MDA',
                                            width: 50,
                                            editable: false
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.idDE + '-sendADM',
                                            width: 25,
                                            iconCls: 'prx-icon-new',
                                            tooltip: 'Send ADM',
                                            listeners: {
                                                click: 'onSendADM'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.idDE + '-hideADM',
                                            width: 25,
                                            iconCls: 'prx-icon-cancel-action',
                                            tooltip: 'Cancel',
                                            listeners: {
                                                click: 'onCancelADM'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.idDE + '-reverseADM',
                                            width: 25,
                                            hidden: true,
                                            iconCls: 'prx-icon-reload',
                                            tooltip: 'Reverse ADM',
                                            listeners: {
                                                click: 'onReverseADM'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //<editor-fold defaultstate="collapsed" desc="Control Data">
                        {
                            xtype: 'fieldset',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Control Data</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                width: '100%',
                                border: false,
                                bodyStyle: 'background: transparent',
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '5 8 5 8',
                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            fieldLabel: 'User Update',
                                            name: 'a4501USUP',
                                            width: 220,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Date Update',
                                            name: 'a4501FEUP',
                                            width: 200,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Hour Update',
                                            name: 'a4501HOUP',
                                            width: 180,
                                            labelWidth: 120
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>

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
            border: true,
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