Ext.define('Ext.Praxis.view.payments.DataRequestedByDateForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbFecFiltro',
                    fieldStyle: 'text-align:left;',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'Reception Date',
                    labelWidth: 100,
                    width: 110,
                    anchor: '100%',
                    margin: '0 0 0 86'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%',
                    margin: '0 0 0 20'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ticket:',
                    id: prototype.id+'-txtTICKET',
                    margin: '0 0 0 9',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength:13,
                    labelWidth: 70,
                    width: 190,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarTKT_keyDownHandler'
                    }
                },
                {
                    xtype: 'radiogroup',
                    margin: '0 0 0 40',
                    id: prototype.id + '-radiogroupType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Chargeback</strong>', name: 'rbgType', inputValue: 'cb', width: 100, checked: true},
                        {xtype: 'tbspacer', width: 30},
                        {boxLabel: '<strong style="color:#148D28" >Status Interact Sabre</strong>', name: 'rbgType', inputValue: 'ss', width: 150},
                        {xtype: 'tbspacer', width: 30},
                        {boxLabel: '<strong style="color:#148D28" >Status Diference</strong>', name: 'rbgType', inputValue: 'sd', width: 130}
                    ],
                    listeners: {
                        change: 'cmbTranType_changeHandler'
                    }
                }
                /*{
                    xtype: 'combo',
                    id: prototype.id + '-cmbCardType',
                    fieldStyle: 'text-align:left;',
                    fieldLabel: 'Card Type',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    selectOnFocus: true,
                    hidden: false,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    emptyText: 'All',
                    labelWidth: 100,
                    width: 320,
                    listConfig: {minWidth: 250},
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
                    fieldStyle: 'text-align:left;',
                    fieldLabel: 'Status',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 65,
                    width: 200,
                    anchor: '100%'
                }*/
            ]
        },
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
                {xtype: 'tbspacer', width: 550},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 40,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'BuscarFiltro'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Credit Card:',
                            padding: '8px 1px 2px 1px',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'BuscarFiltro'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '******',
                            padding: '8px 1px 2px 1px',
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'BuscarFiltro'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Auth:',
                            padding: '8px 1px 2px 1px',
                            width: 40,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAuth',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'BuscarFiltro'
                            }
                        },
            ]
        },
        /*
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Authorization:',
                    id: prototype.id + '-txtAUTHNBR',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 165,
                    width: 350,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'txtFilterValue_keyDownHandler'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank Code',
                    id: prototype.id + '-cmbBankCode',
                    fieldStyle: 'text-align: left;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    selectOnFocus: true,
                    hidden: false,
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    labelWidth: 92,
                    width: 300,
                    anchor: '100%',
                    margin: '0 0 0 60'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'CC Type',
                    id: prototype.id + '-cmbTCARD',
                    fieldStyle: 'text-align: left;',
                    labelAlign: 'center',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 74,
                    width: 192,
                    anchor: '100%',
                    margin: '0 0 0 58'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ticket:',
                    id: prototype.id + '-txtTicket',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 13,
                    labelWidth: 80,
                    width: 240,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarTKT_keyDownHandler'
                    }
                },
                {
                    xtype: 'radiogroup',
                    margin: '0 0 0 40',
                    id: prototype.id + '-rbgType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Clarifications   </strong>', name: 'rb', inputValue: 'ACLARACIONES', width: 100, checked: true},
                        {xtype: 'tbspacer', width: 30},
                        {boxLabel: '<strong style="color:#148D28" >Bank Notice </strong>', name: 'rb', inputValue: 'AVISOS', width: 100}
                    ],
                    listeners: {
                        change: 'cmbTranType_changeHandler'
                    }
                }
            ]
        }
*/
    ]
});
