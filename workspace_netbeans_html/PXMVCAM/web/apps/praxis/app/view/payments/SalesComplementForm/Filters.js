Ext.define('Ext.Praxis.view.payments.SalesComplementForm.Filters', {
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
            id: prototype.id + '-panelFilters',
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
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code', displayField: 'name',
                            value: "SDATE",
                            labelWidth: 100,
                            width: 120,
                            anchor: '100%',
                            margin: '0 0 0 86',
                            listeners: {
                                change: 'cmbfiltro_clickHandler'
                            }
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
                            listeners:{
                                change:'onChangeFechaBtn'
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
                            listeners:{
                                change:'onChangeFechaBtn'
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
                            listeners:{
                                change:'onChangeFechaBtn'
                            }
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
                            anchor: '100%',
                            listeners:{
                                change:'onChangeFechaBtn'
                            }
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
                            anchor: '100%',
                            listeners:{
                                change:'onChangeFechaBtn'
                            }
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
                            listeners:{
                                change:'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByFAMEX',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            fieldLabel: 'Complements vs AMEX',
                            labelWidth: 150,
                            labelAlign: 'right',
                            hidden: false,
                            width: 250,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindBySTVAL',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            fieldLabel: 'Complements vs Sales',
                            labelWidth: 150,
                            labelAlign: 'right',
                            hidden: false,
                            width: 250,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroupTypeX',
                            width: 360,
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Plusgrade</b>', id: prototype.id + '-radiogroupTypeXPlusgrade', inputValue: 'P', name: 'rbgTypeX', checked: true},
                                {boxLabel: '<b style="color:#148D28;">Ligas de Pago</b>', id: prototype.id + '-radiogroupTypeXLigas', inputValue: 'L', name: 'rbgTypeX'},
                                {boxLabel: '<b style="color:#148D28;">Tablet</b>', id: prototype.id + '-radiogroupTypeXTablet', inputValue: 'T', name: 'rbgTypeX'},
                            ],
                            listeners: {
                                change: 'rbChangeType'
                            }
                        },
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
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ticket:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 13,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtField_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
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
                                keypress: 'txtField_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByCountry',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            //editable: false,
                            fieldLabel: 'Country',
                            labelWidth: 50,
                            labelAlign: 'right',
                            width: 230,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblOPERATNBR',
                            text: 'Op. Nbr.:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtOPERATNBR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 10,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtField_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByCreditCard',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            fieldLabel: 'Card Type:',
                            labelWidth: 60,
                            labelAlign: 'right',
                            width: 200,
                            typeAhead: true,
                            valueField: 'a4451key3', 
                            displayField: 'a4451desc1',
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {xtype: 'tbspacer', width: 15},
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
                                keypress: 'filterPNRSettlement'
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
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
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
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByPlusgrade',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            fieldLabel: 'Sales Merchant',
                            labelWidth: 100,
                            labelAlign: 'right',
                            width: 230,
                            typeAhead: true,
                            valueField: 'a4451key3', 
                            displayField: 'a4451desc2',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hidden:true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByLigas',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            fieldLabel: 'Sales Merchant',
                            labelWidth: 100,
                            labelAlign: 'right',
                            width: 230,
                            typeAhead: true,
                            valueField: 'a4451key3', 
                            displayField: 'a4451desc2',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hidden:true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByTablet',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            fieldLabel: 'Sales Merchant',
                            labelWidth: 100,
                            labelAlign: 'right',
                            //hidden: false,
                            width: 230,
                            typeAhead: true,
                            valueField: 'a4451key3', displayField: 'a4451desc2',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hidden:true
                        },
                    ]
                },
            ]
        },
    ]
});
