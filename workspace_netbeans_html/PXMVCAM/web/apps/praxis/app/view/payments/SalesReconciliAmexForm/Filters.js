Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0 ',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
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
                            xtype: 'label',
                            html: '<strong style="color:#000;">Search By:</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '8px 20px 0px 5px',
                            hidden: false
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateSel',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            fieldStyle: 'text-align: left;',
                            width: 110,
                            hidden: false
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
                            anchor: '100%'
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
                            id: prototype.id + '-cmbDateFromDay',
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
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroupType',
                            width: 620,
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Summary</b>', inputValue: 'SU', name: 'rbgType', checked: true},
                                {boxLabel: '<b style="color:#148D28;">Settlement</b>', inputValue: 'SE', name: 'rbgType'},
                                {boxLabel: '<b style="color:#148D28;">Adjustment Queue</b>', inputValue: 'AD', name: 'rbgType'},
                                {boxLabel: '<b style="color:#148D28;">Transact. Queue Error</b>', inputValue: 'ER', name: 'rbgType'},
                            ],
                            listeners: {
                                change: 'rbChangeType'
                            }
                        },
                        {
                             xtype: 'checkboxfield',
                             id: prototype.id + '-chkWarnings',
                             margin: '0 0 0 15',
                             width: 50,
                             boxLabel: 'Warnings',
                             inputValue: '0',
                            checked: false,
                            hidden: true,
                             listeners:{
                                 change: 'btnSearch_click'
                             }
                         },
                         {
                            xtype: 'combo',
                            id: prototype.id + '-cmbErrorCode',
                            fieldLabel: 'Error Code',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'CODE',
                            displayField: 'NAME',
                            fieldStyle: 'text-align: left;',
                            labelWidth: 100,
                            width: 150,
                            hidden: false,
                            listeners:{
                                 change: 'btnSearch_click'
                             }
                        }
//                    xtype: 'textfield',
//                    fieldLabel: 'Merchant Number:',
//                    id: prototype.id + '-txtMerchant',
//                    allowBlank: true,
//                    maskRe: /[0-9]/,
//                    enforceMaxLength: true,
//                    maxLength: 20,
//                    labelWidth: 150,
//                    width: 300,
//                    enableKeyEvents: true,
//                    listeners: {
//                        keypress: 'eventKey'
//                    }
//                },                
                    ]
                },
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    id: prototype.id + '-frmFilterSettlement',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    hidden: true,
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
                            fieldLabel: 'Status Sett vs Sales ',
                            id: prototype.id + '-cmbSTVAL',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 150,
                            width: 300,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                change: 'cmbSTVAL_keyDownHandler',
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
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
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtPNR_keyDownHandler'
                            }
                        },
                    ]
                },
            ]
        },
    ]
});
