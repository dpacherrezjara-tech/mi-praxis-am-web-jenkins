prototype.idDE = prototype.id + '-DataEntryTransacErrorBPO';

Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataEntryTransacErrorBPO', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTransacErrorBPOController',
    requires: [
        'Ext.Praxis.controller.payments.ReconciliationPayment.DataEntryTransacErrorBPOController',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.MSITrackingDataEntry'
    ],
    controller: 'DataEntryTransacErrorBPOController',
    title: 'Transaction Error - Form',
    header: true,
    width: 1075,
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
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 1075,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Descripcion TRNX">
                        {
                            xtype: 'form',
                            id: prototype.idDE + '-informationForm',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '4 2 4 8',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'General Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 234,
                                            height: 20
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            flex: 1,
                                            id: prototype.idDE + '-specialPanel',
                                            border: false,
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 'auto',
                                                    id: prototype.idDE + '-specialTitle',
                                                    margin: '0 8 0 0',
                                                    style: 'color:red;font-weight:bold;font-size:16px;'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Processing Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            //id:prototype.idDE+ '-de-txtPRDA',
                                            name: 'prda',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Processor',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            //id:prototype.idDE+ '-de-txtPROCTYPE',
                                            name: 'desc_PROC',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'P. Merchant ID',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            //id:prototype.idDE+ '-de-txtPMERCHID',
                                            name: 'pmerchid',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            id: prototype.idDE + '-txtFromDateSMERCHID',
                                            text: 'Sales Merchant ID',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            //id:prototype.idDE+ '-de-txtSMERCHID',
                                            name: 'smerchidf',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'ID Submission',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtIDITEMS',
                                            fieldStyle: 'text-align:center',
                                            name: 'iditems',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'ID Transaction',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtIDITEMT',
                                            name: 'iditemt',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Inst. Plan',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtNBRINSTA',
                                            name: 'nbrinsta',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Invoice Ref.Nbr',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtINVOIRN',
                                            name: 'invoirn',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Zone',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtZone',
                                            name: 'zone',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtCountry',
                                            fieldStyle: 'text-align:center',
                                            name: 'scountry',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Inst. Number',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtINSTANBR',
                                            fieldStyle: 'text-align:center',
                                            name: 'instanbr',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Flag Compl.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtFCOMPL',
                                            name: 'fcompl',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
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
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Accounting Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 234,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtSTCONL',
                                            name: 'stconl',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 105,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
                                                        '1': 'Accounted',
                                                        '2': 'Debug'
                                                    };
                                                    field.setRawValue(opts[newValue] || 'Pending');
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Date',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtFCONTL',
                                            name: 'fcontl',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'ID',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtIDCONL',
                                            name: 'idconl',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            readOnly: true,
                                            width: 355
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Error Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 280,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'History',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtCERRORHST',
                                            name: 'cerrorhst',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Adjustsment',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtCERROIN',
                                            name: 'codadju',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Description',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtDES_CERROIN',
                                            name: 'desc_ADJU',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {xtype: 'tbspacer', width: 160}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            text: 'Flag Selection',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtFSELEC',
                                            name: 'fselec',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
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
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            id: prototype.idDE + '-txtFromDateCERROR',
                                            text: 'Sett. vs Sales',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtCERROR',
                                            name: 'cerror',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Description',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtDES_CERROR',
                                            name: 'desc_ERROR',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {xtype: 'tbspacer', width: 160}
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Sales Information',
                                    id: prototype.idDE + '-txtFromDateTITULO',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 234,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Sales Date',
                                            id: prototype.idDE + '-txtFromDateBSUMDATE',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtSDATE',
                                            name: 'sdate',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Payment Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtPAYDATE',
                                            name: 'paydate',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Diff. Days',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtPASSED_DAYS',
                                            name: 'passed_DAYS',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Card Account Nbr.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtSCARDN',
                                            name: 'scardn',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 105
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Transact. Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtTRANSDATE',
                                            name: 'transdate',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'TICKET',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtTICKET',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            name: 'ticket',
                                            fieldStyle: 'text-align:center;',
                                            editable: false,
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 13
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'PNR',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtSPNR',
                                            name: 'spnr',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: false,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Approval Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtSAUTHOC',
                                            name: 'sauthoc',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Conciliate',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 280,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            text: 'Status',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-txtSTVAL',
                                            name: 'stval',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
                                                        '0': 'Stand By',
                                                        '1': 'Match',
                                                        '2': 'Sales Without Sett.',
                                                        '3': 'Settl. Without Sales',
                                                        '4': 'Match Diff.',
                                                        '5': 'Match Manual',
//                                                        '6': 'Forced Match',
//                                                        '7': 'Compensation Match',
                                                        '8': 'Pending RFND'
                                                    };
                                                    field.setRawValue(opts[newValue] || '');
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtPCURRENCY',
                                            fieldStyle: 'text-align:center',
                                            name: 'scurrency',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Tkts',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtQTYTKT',
                                            name: 'qtytkt',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Transact. Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtTGROSAMPAY',
                                            name: 'tgrosamoun',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Rule',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtdescFREGLA',
                                            name: 'fregla',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
//                                                        '1': 'Ticket',
//                                                        '2': 'PNR',
//                                                        '3': 'C.Card',
//                                                        '4': 'Desg. Manual',
//                                                        '5': 'Desg. Transac.'
                                                        '0': 'TKT+PNR+IATA+FE+I+T+A',
                                                        '1': 'TKT+IATA+FE+I+T+A',
                                                        '2': 'TKT+PNR+FE+I+T+A',
                                                        '3': 'TKT+FE+I+T+A',
                                                        '4': 'PNR+IATA+FE+I+T+A',
                                                        '5': 'IATA+FE+I+T+A',
                                                        '6': 'PNR+FE+I+T+A',
                                                        '7': 'FE+I+T+A',
                                                        '8': 'TKT+PNR+FE+I+T',
                                                        '9': 'TKT+PNR+FE+ID+T+A',
                                                        'A': 'PNR+FE+I+T',
                                                        'B': 'PNR+FE+ID+T+A',
                                                        'C': 'TKT+FE+I+T',
                                                        'D': 'FE+I+T',
                                                    };
                                                    field.setRawValue(opts[newValue] || '');
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Doc. Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtTRANSTYPE',
                                            name: 'transtype',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Void',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtFVOID',
                                            name: 'fvoid',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            id: prototype.idDE + '-txtFromDateSVFOPS',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            text: 'Sales Amount',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtSVFOPS',
                                            name: 'svfops',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'ADM',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtFADM',
                                            name: 'fadm',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Reverse Policy',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtFREVERSA',
                                            name: 'freversa',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Reverse ADM',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtFREVADM',
                                            name: 'frevadm',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            text: 'Diff. Amount',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDE + '-de-txtDIFF_AMOUNT',
                                            name: 'difference',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Scanner Inputs">
                        {
                            xtype: 'panel',
                            width: '98%',
                            border: false,
                            id: prototype.idDE + '-scannerPanel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    id: prototype.idDE + '-scannerInputs',
                                    title: 'Scanner',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: '98%',
                                    style: {
                                        backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                                    },
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.idDE + '-scannerForm',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            width: '100%',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                xtype: 'panel',
                                                width: '100%',
                                                bodyStyle: 'background: transparent',
                                                border: false,
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'center'
                                                },
                                                defaults: {

                                                    xtype: 'textfield',
                                                    margin: '2 5 2 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:center;'
                                                }
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Ticket',
                                                            name: 'IN_TICKET',
                                                            labelWidth: 60,
                                                            width: 155,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 13,
                                                            enforceMaxLength: true,
                                                            validator: function (value) {
                                                                if (value.length < 13 && value.length !== 0) {
                                                                    return 'Invalid Ticket Number';
                                                                }
                                                                return true;
                                                            }
                                                        },
                                                        {
                                                            fieldLabel: 'PNR',
                                                            name: 'IN_SPNR',
                                                            labelWidth: 40,
                                                            width: 120,
                                                            maxLength: 6,
                                                            enforceMaxLength: true,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            validator: function (value) {
                                                                if (value.length < 6 && value.length !== 0) {
                                                                    return 'Invalid PNR';
                                                                }
                                                                return true;
                                                            },
                                                            listeners: {
                                                                change: function (field, newValue, oldValue) {
                                                                    field.setValue(newValue.toUpperCase());
                                                                }
                                                            }
                                                        },
                                                        {
                                                            fieldLabel: 'Agent',
                                                            name: 'IN_SAGENT',
                                                            labelWidth: 50,
                                                            width: 130,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 10,
                                                            enforceMaxLength: true
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Sale Date',
                                                            name: 'IN_SDATE',
                                                            labelWidth: 65,
                                                            width: 145,
                                                            format: 'Ymd',
                                                            editable: false,
                                                            value: new Date()
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            iconCls: 'prx-icon-add',
                                                            tooltip: 'Add',
                                                            listeners: {
                                                                click: 'onAddCreditCardClick'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            id: prototype.idDE + '-chkForceBlock',
                                                            //tooltip: 'Force add Blocked',
                                                            inputValue: true,
                                                            listeners: {
                                                                change: function (checkbox, newValue, oldValue, eOpts) {
                                                                    if (!newValue) {
                                                                        return;
                                                                    }
                                                                    // Mostrar una ventana de confirmación al hacer clic
                                                                    Ext.Msg.confirm('Confirm', '¿Do you want to force scan?', function (buttonId) {
                                                                        if (buttonId === 'yes') {
                                                                            // Continuar con el cambio
                                                                            checkbox.setValue(newValue);
                                                                        } else {
                                                                            // Cancelar el cambio
                                                                            checkbox.setValue(oldValue);
                                                                        }
                                                                    });
                                                                },
                                                                render: function (checkbox) {
                                                                    checkbox.getEl().set({
                                                                        'data-qtip': 'Force add Blocked'
                                                                    });
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            iconCls: 'prx-icon-clear',
                                                            tooltip: 'Clean',
                                                            listeners: {
                                                                click: 'onClearScannerInputs'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            iconCls: 'prx-icon-search',
                                                            tooltip: 'Find Exact',
                                                            listeners: {
                                                                click: 'onFilterBPOGrid'
                                                            }

                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'C. Card',
                                                            labelWidth: 55,
                                                            name: 'creditcard',
                                                            width: 125,
                                                            maxLength: 6,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '*****(*)'
                                                        },
                                                        {
                                                            width: 50,
                                                            name: 'creditcard',
                                                            maxLength: 4,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            fieldLabel: 'Auth',
                                                            name: 'IN_SAUTHOC',
                                                            labelWidth: 45,
                                                            width: 115,
                                                            maxLength: 6,
                                                            enforceMaxLength: true,
                                                            maskRe: /[a-zA-Z0-9]/
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 110,
                                                            text: 'Add Duplicated',
                                                            iconCls: 'prx-icon-add',
                                                            tooltip: 'Duplicated',
                                                            listeners: {
                                                                click: 'onAddDuplicated'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 110,
                                                            text: 'MSI Tracking',
                                                            iconCls: 'prx-icon-update',
                                                            tooltip: 'Open MSI Tracking',
                                                            listeners: {
                                                                click: 'onClickMSITracking'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            iconCls: 'prx-icon-bpo-comment',
                                                            tooltip: 'Open BPO Comment',
                                                            listeners: {
                                                                click: 'onOpenComments'
                                                            }

                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Stand By Comment">
                                {
                                    xtype: 'fieldset',
                                    id: prototype.idDE + '-bpoComments',
                                    title: 'Stand By Comment',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    border: true,
                                    width: '98%',
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
                                            width: 450
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.idDE + '-addStandBy',
                                            width: 25,
                                            iconCls: 'prx-icon-image-update',
                                            tooltip: 'Update Stand By',
                                            hidden: true,
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
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Adju Comment">
                                {
                                    xtype: 'fieldset',
                                    id: prototype.idDE + '-bpoComments2',
                                    title: 'Adjustment Comment',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    border: true,
                                    width: '98%',
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
                                            id: prototype.idDE + '-adjucoment',
                                            fieldLabel: 'BPO Comment',
                                            labelWidth: 100,
                                            width: 450,
                                            editable: false
                                        },
                                    ]
                                }
                                //</editor-fold>
                            ]
                        },

                        //</editor-fold>
                        {
                            xtype: 'tabpanel',
                            id: prototype.idDE + '-tabMain',
                            minHeight: 120,
                            maxHeight: 210,
                            width: 1060,
                            height: 'auto',
                            border: false,
                            margin: '5 1 5 1',
                            autoScroll: true,
                            bodyStyle: 'background: transparent',
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="BPO Tab">
                                {
                                    title: 'Added BPO',
                                    itemId: 'A',
                                    id: prototype.idDE + '-tabBPO',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridBPO',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            height: 'auto',
                                            maxHeight: 150,
                                            width: '100%',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Pending';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'scardcod', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 70
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'scurrency', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'svfops', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Amount', dataIndex: 'tgrosamoun', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'spnr', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Corrl', width: 50, dataIndex: 'corrl'
                                                    },
                                                    {
                                                        text: 'Void', width: 45, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 75
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Del.',
                                                        //id: prototype.id + '-gridColumnDelete',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Delete',
                                                                handler: 'onDeleteRecordBPO'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Adj.',
                                                        //id: prototype.id + '-gridColumnAdj',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-add',
                                                                tooltip: 'Create adjustment',
                                                                handler: 'onAddAdjustment'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    bbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        }, // Distribución horizontal
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 2 3 5',
                                            labelStyle: 'text-align:right;font-weight: bolder;',
                                            fieldStyle: 'text-align:right;',
                                            editable: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idDE + '-totTickets',
                                                fieldLabel: 'Total Tickets',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 150,
                                                value: '0',
                                                //reset:false
                                            },
                                            {
                                                id: prototype.idDE + '-totAmount',
                                                fieldLabel: 'Sum Amount',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 180,
                                                value: '0.00',
                                                //reset:false
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-reload',
                                                tooltip: 'Reload Grid',
                                                listeners: {
                                                    click: 'reloadGridBPO'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-delete',
                                                tooltip: 'Clean Grid',
                                                listeners: {
                                                    click: 'cleanGridBPO'
                                                }
                                            }
                                        ]
                                    }

                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Blocked Tab">
                                {
                                    //id: prototype.id + '-tabFormat',
                                    title: 'Blocked',
                                    itemId: 'B',
                                    id: prototype.idDE + '-tabBlocked',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridBlocked',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            height: 'auto',
                                            maxHeight: 150,
                                            width: '100%',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Blocked';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'scardcod', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 70
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'scurrency', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'svfops', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Amount', dataIndex: 'tgrosamoun', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'spnr', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Qty<br>Uses', width: 50, dataIndex: 'duplicates'
                                                    },
                                                    {
                                                        text: 'Void', width: 45, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 75
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    bbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '98%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        }, // Distribución horizontal
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 2 3 5',
                                            labelStyle: 'text-align:right;font-weight: bolder;',
                                            fieldStyle: 'text-align:right;',
                                            editable: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idDE + '-totBTickets',
                                                fieldLabel: 'Total Tickets',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 150,
                                                value: '0'
                                            },
                                            {
                                                id: prototype.idDE + '-totBAmount',
                                                fieldLabel: 'Sum Amount',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 180,
                                                value: '0.00'
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-reload',
                                                tooltip: 'Reload Grid',
                                                listeners: {
                                                    click: 'reloadGridBPO'
                                                }
                                            }
                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Match Tab">
                                {
                                    title: 'Match',
                                    itemId: 'M',
                                    id: prototype.idDE + '-tabDesglose',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridDesglose',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            height: 'auto',
                                            maxHeight: 150,
                                            width: '100%',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Concil.';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const opts = {
                                                                'S': 'ASR',
                                                                'B': 'BSP',
                                                                'M': 'Manual',
                                                                'A': 'ARC'
                                                            };
                                                            return opts[value] || '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'scarcod', width: 45
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 55
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'scurrency', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'svfops', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'spnr', width: 70
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Corrl', width: 45, dataIndex: 'corrl'
                                                    },
                                                    {
                                                        text: 'Void', width: 40, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 80
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'panel',
                                                border: false,
                                                width: '98%',
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                }, // Distribución horizontal
                                                defaults: {
                                                    xtype: 'textfield',
                                                    margin: '3 5 3 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:right;',
                                                    editable: false
                                                },
                                                items: [
                                                    {
                                                        id: prototype.idDE + '-totDTickets',
                                                        fieldLabel: 'Total Tickets',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 150,
                                                        value: '0'
                                                    },
                                                    {
                                                        id: prototype.idDE + '-totDAmount',
                                                        fieldLabel: 'Sum Amount',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 180,
                                                        value: '0.00'
                                                    }
                                                ]
                                            }
                                        }
                                        ,
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            hidden: true,
                                            id: prototype.idDE + '-gridDesgloseCHBK',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            height: 'auto',
                                            maxHeight: 150,
                                            width: '100%',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const {stval} = record.data;
                                                            const opts = {
                                                                '5': 'Chargeback',
                                                                '6': 'Reverse Chbk'
                                                            };
                                                            return opts[stval] || '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'codebank', width: 45
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'cardnbr', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'authnbr', width: 55
                                                            },
                                                            {
                                                                text: 'Curr', dataIndex: 'mfop', width: 50
                                                            },
                                                            {
                                                                text: 'Auth<br>Amount', dataIndex: 'autamount', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'vfop', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', width: 70, dataIndex: 'tpdoc'
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const {ccia, forma, serie} = record.data;
                                                            const ticket = ccia + forma + serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'PNR', width: 60, dataIndex: 'pnr'
                                                    },
                                                    {
                                                        text: 'Sale<br>Date', width: 80, dataIndex: 'sentdate'
                                                    },
                                                    {
                                                        text: 'Usages', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const {usopxcp1, usopxcp2, usopxcp3, usopxcp4} = record.data;
                                                            const usages = usopxcp1 + usopxcp2 + usopxcp3 + usopxcp4;
                                                            return usages;
                                                        }
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'panel',
                                                border: false,
                                                width: '98%',
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                }, // Distribución horizontal
                                                defaults: {
                                                    xtype: 'textfield',
                                                    margin: '3 5 3 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:right;',
                                                    editable: false
                                                },
                                                items: [
                                                    {
                                                        id: prototype.idDE + '-totDCTickets',
                                                        fieldLabel: 'Total Tickets',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 150,
                                                        value: '0'
                                                    },
                                                    {
                                                        id: prototype.idDE + '-totDCAmount',
                                                        fieldLabel: 'Sum Amount',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 180,
                                                        value: '0.00'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                        ,
                        //<editor-fold defaultstate="collapsed" desc="Adjustment BPO">
                        {
                            xtype: 'panel',
                            id: prototype.idDE + '-panelAdjustments',
                            width: '98%',
                            border: false,
                            hidden: true,
                            margin: '0 5 0 5',
                            items: [
                                {
                                    xtype: 'grid',
                                    border: true,
                                    id: prototype.idDE + '-gridAdjustments',
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    margin: '0 5 0 5',
                                    columnLines: true,
                                    autoScroll: true,
                                    height: 50,
                                    width: '100%',
                                    hideHeaders: true,
                                    style: {
                                        background: '#E6EFD2' // Cambia el fondo del grid
                                    },
                                    //bodyStyle: 'background: transparent',
                                    tbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            align: 'left'
                                        },
                                        margin: '2 5 2 5',
                                        bodyStyle: 'background: transparent',
                                        defaults: {
                                            margin: '0 5 0 5'
                                        },
                                        items: [
                                            {
                                                xtype: 'combo',
                                                id: prototype.idDE + '-codAdjustment',
                                                name: 'adjucode',
                                                valueField: 'a4451key3',
                                                displayField: 'a4451desc1',
                                                value: '',
                                                queryMode: 'local',
                                                emptyText: 'Select',
                                                editable: false,
                                                width: 220,
                                                labelWidth: 80,
                                                fieldLabel: 'Adju. Type'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'adjucomment',
                                                id: prototype.idDE + '-observAdjustment',
                                                width: 450,
                                                labelWidth: 80,
                                                fieldLabel: 'Observation'
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-image-trash',
                                                tooltip: 'Delete Adjustment',
                                                listeners: {
                                                    click: 'onDeleteAdjustment'
                                                }
                                            }
                                        ]
                                    },
                                    plugins: {
                                        // Agrega el plugin de edición para habilitar la edición en la columna
                                        ptype: 'cellediting',
                                        clicksToEdit: 2 // 1 clic para editar
                                    },
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: false
                                        },
                                        items: [
                                            {text: 'Status', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = 'Adjustment';
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc.<br>Type', dataIndex: 'trncu', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
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
                                                    {text: 'Type', dataIndex: 'scardcod', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'scardn', width: 115,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'sauthoc', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Curr', dataIndex: 'scurrency', width: 45,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {header: 'Amount', dataIndex: 'svfops', width: 100,
                                                editor: {
                                                    xtype: 'numberfield',
                                                    allowBlank: false,
                                                    hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                                    mouseWheelEnabled: false, // Desactiva la rueda del mouse para cambiar el valor
                                                    maskRe: /[0-9]/
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#F0FA8F";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'sdate', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'spnr', width: 62,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', width: 112,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                    const obj = record.data;
                                                    const ticket = obj.ccia + obj.forma + obj.serie;
                                                    return ticket;
                                                }
                                            },
                                            {
                                                text: 'Corrl', dataIndex: 'corrl', width: 50
                                            },
                                            {
                                                text: 'FVoid', dataIndex: 'fvoid', width: 50
                                            },
                                            {text: 'Agent', dataIndex: 'sagent', width: 62,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '8 2 4 100'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 100',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-txtUSCR',
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-txtFECR',
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-txtHOCR',
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 100',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-txtUSUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-txtFEUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-txtHOUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
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
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Reverse Match',
                    hidden: true,
                    id: prototype.idDE + '-reverseTrnx',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onReverseTransaction'
                    }
                },
                {
                    text: 'Show MSI Tracking',
                    hidden: true,
                    id: prototype.idDE + '-MatchMSITracking',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onClickMSITracking'
                    }
                },
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