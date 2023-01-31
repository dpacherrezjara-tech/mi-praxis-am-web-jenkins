Ext.define('Ext.Praxis.view.payments.AccountingTransactAmexForm.Filters', {
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
                            padding: '8px 5px 0px 5px',
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
                            width: 100,
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
                            labelWidth: 45,
                            width: 120,
                            anchor: '100%',
                            listeners: {
                                change: 'setDataTo'
                            }
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
                            anchor: '100%',
                            listeners: {
                                change: 'setDataTo'
                            }
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
                            anchor: '100%',
                            hidden:true,
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
                            labelWidth: 35,
                            width: 120,
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
                            anchor: '100%',
                            hidden:true,
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Currency:',
                            id: prototype.id + '-cmbSCURRENCY',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            readOnly: false,
                            editable: false,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 70,
                            width: 140,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
//                                change: 'cmbSCURRENCY_keyDownHandler',
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbComplements',
                            fieldLabel: 'Complements',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            fieldStyle: 'text-align: left;',
                            labelWidth: 90,
                            width: 230,
                            hidden: false,
                            listeners: {
                                change: 'cmbSTVAL_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Document:',
                            id: prototype.id + '-cmbTDOC',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            readOnly: false,
                            editable: false,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 80,
                            width: 170,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                change: 'cmbSTVAL_keyDownHandler',
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 30,
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
                                keypress: 'filterPNR'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            text: 'ID Accounting:',
                            padding: '8px 1px 2px 1px',
                            width: 85,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIDAC',
                            fieldStyle: 'text-align:center',
//                            enforceMaxLength: true,
//                            maskRe: /[a-zA-Z]/,
//                            maxLength: 6,
                            width: 290,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNR'
                            }
                        },
                    ]
                }
            ]
        }
    ]
}
);
