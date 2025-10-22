Ext.define('Ext.Praxis.view.payments.PaymentAnalyticsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Search By',
            margin: '10 10 10 15',
            labelStyle: 'text-align: left;font-weight:bold',
            id: prototype.id + '-cmbFiltersAnalytics',
            store: Ext.create('Ext.data.SimpleStore', {
                fields: ['code', 'name'],
                data: [
                    ['S', 'Settlement'],
                    ['A', 'Accounting']
                ]
            }),
            labelWidth: 75,
            width: 180,
            displayField: 'name',
            valueField: 'code',
            queryMode: 'local',
            editable: false,
            value: 'S',
            listeners: {
                change: 'onChangeFiltersAnalytics'
            }
        },
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="filters Settlement">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFiltersAnalytics-S',
                    bodyStyle: 'background: transparent',
                    hidden: false,
                    padding: '2px 5px 1px 5px',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background: transparent',
                        padding: '2px 5px 1px 5px',
                        layout: 'hbox',
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            padding: '5px 1px 5px 1px',
                            anchor: '100%',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CCUST',
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_DATE_FROM',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateFrom'
                                    },
                                    id: prototype.id + '-dateFieldFromSettlement'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_DATE_TO',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateFrom'
                                    },
                                    id: prototype.id + '-dateFieldToSettlement'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProcessorSettlement',
                                    name: 'IN_PROCESSOR',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    fieldLabel: 'Processor',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 250,
                                    typeAhead: true,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
//                                    listeners: {
//                                        select: 'onProcessorSelect'
//                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurrencySettlement',
                                    name: 'IN_CURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="filters Accounting">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFiltersAnalytics-A',
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 5px',
                    hidden: true,
                    layout: 'vbox',
                    defaults: {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background: transparent',
                        padding: '2px 5px 1px 5px',
                        layout: 'hbox',
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            padding: '5px 1px 5px 1px',
                            anchor: '100%',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CCUST',
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_DATE_FROM',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateFrom'
                                    },
                                    id: prototype.id + '-dateFieldFromAccounting'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_DATE_TO',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateFrom'
                                    },
                                    id: prototype.id + '-dateFieldToAccounting'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProcessorAccounting',
                                    name: 'IN_PROCESSOR',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    fieldLabel: 'Processor',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 250,
                                    typeAhead: true,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurrencyAccounting',
                                    name: 'IN_CURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTypeAmountAccounting',
                                    name: 'IN_TYPE_AMOUNT',
                                    fieldLabel: 'Amount Type',
                                    labelWidth: 100,
                                    labelAlign: 'right',
                                    width: 220,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['FP', 'FP'],
                                            ['NET', 'NET']
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'FP'
                                },
                            ]
                        }
                    ]
                },
                //</editor-fold>
            ]
        }
    ]
});
