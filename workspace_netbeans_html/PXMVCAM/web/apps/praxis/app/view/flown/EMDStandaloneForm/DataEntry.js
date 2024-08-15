Ext.define('Ext.Praxis.view.flown.EMDStandaloneForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryEMDStandaloneForm',
    requires: [
        'Ext.Praxis.controller.flown.EMDStandalone.DataEntryEMDStandaloneController'
    ],
    controller: 'DataEntryEMDStandaloneController',
    title: 'EMDStandalone - Data Entry Form',
    header: true,
    height: 680,
    width: 750,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            margin: '10 2 2 8',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Used Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 200,
                                    height: 20,
                                    margin: '4 2 4 3'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    margin: '4 2 4 3',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50,
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSTATUS',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    width: 120,
                                    hiddenLabel: false,
                                    value: '',
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '10 10 10 10',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Ticket',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTICKET',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            maskRe: /[0-9]/,
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Cupon',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 50

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCUPON',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 50,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Sequence',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSEQ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 50,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Rolling',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSEQROL',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 60,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Used Date',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDFLIGHT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'RFIC',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 50,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtRFIC',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 50,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Reason Code',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtRECODE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 50,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Free Descrip',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFDESCRIP',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            width: 120,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'VCR Date',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDVCR',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            margin: '10 2 2 8',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Sales Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 134,
                                    height: 20,
                                    margin: '4 2 4 3'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '10 10 10 10',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCOUNTRY',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Agent',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtAGENT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Sale Date',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFVTA',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Orig',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtORIG',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Dest',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDEST',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Fare Basis',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFBASE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'RBD',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtRBD',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Pax',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtPAX',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Pax Type',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtPTYPE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Oper.',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtOPER',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Carrier',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCARRIER',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Accounting Date',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFCONTS',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            text: 'Valuation Date',
//                                            hidden: false,
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 100
//
//                                        },
//                                        {xtype: 'tbspacer', width: 7},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtFECVAL',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            fieldStyle: 'text-align:center;',
//                                            width: 100,
//                                        },
//                                        {xtype: 'tbspacer', width: 20},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Currency',
//                                            hidden: false,
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 100
//
//                                        },
//                                        {xtype: 'tbspacer', width: 7},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtCURRENCY',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            fieldStyle: 'text-align:center;',
//                                            width: 100,
//                                        },
//                                        {xtype: 'tbspacer', width: 20},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Total Value',
//                                            hidden: false,
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 100
//
//                                        },
//                                        {xtype: 'tbspacer', width: 7},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtTOTAL',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            fieldStyle: 'text-align:center;',
//                                            width: 100,
//                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            text: 'YQ Value 16%',
//                                            hidden: false,
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 100
//
//                                        },
//                                        {xtype: 'tbspacer', width: 7},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtTN16',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            fieldStyle: 'text-align:center;',
//                                            width: 100,
//                                        },
//                                        {xtype: 'tbspacer', width: 20},
//                                        {
//                                            xtype: 'label',
//                                            text: 'YQ Value 0%',
//                                            hidden: false,
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 100
//
//                                        },
//                                        {xtype: 'tbspacer', width: 7},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtTN00',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            fieldStyle: 'text-align:center;',
//                                            width: 100,
//                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            margin: '10 2 2 8',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Value Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 134,
                                    height: 20,
                                    margin: '4 2 4 3'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 2 4 3',
                                    width: 65

                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFECVAL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    margin: '4 2 4 3',
                                    width: 100,
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '10 10 10 10',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 70

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCURRENCY',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 40,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Total Value',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 70

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTOTAL',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'YQ Value 16%',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTN16',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 50,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'YQ Value 0%',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTN00',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 50,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 137},
                                        {
                                            xtype: 'label',
                                            text: 'Aver. Fare',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 70

                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtVCPMX',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 3'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '10 10 10 10',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '10 2 2 8',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Date',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFCONT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Id',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtIDCON',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 270,
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {xtype: 'tbspacer', height: 10},
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '0 2 4 8'

                },

                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 30',

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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
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
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    hidden: true,
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);