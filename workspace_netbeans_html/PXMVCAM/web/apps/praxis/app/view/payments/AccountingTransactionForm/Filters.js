Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    requires: [
        'Ext.Praxis.view.widgets.MonthField'
    ],
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
            margin: '0 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters',
                    bodyStyle: 'background: transparent',
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
                                    value: '139',
                                    hidden: true
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    name: 'IN_TFECHA',
                                    id: prototype.id + '-cmbDate',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['P', 'Processing Date'],
                                            ['S', 'Sale Date'],
//                                            ['X', 'Execute Date'],
//                                            ['A', 'Accounting Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'P'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
//                                    altFormats: 'm/Y',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    id: prototype.id + '-dateFrom',
                                    name: 'FECHA_FROM',
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
//                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    lastDay: true,
                                    labelWidth: 30,
                                    width: 130,
                                    id: prototype.id + '-dateTo',
                                    name: 'FECHA_TO',
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbProcessor',
                                    name: 'IN_PROCESADOR',
                                    fieldLabel: 'Processor',
                                    labelWidth: 70,
                                    width: 250,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTDOC',
                                    fieldLabel: 'Document',
                                    labelWidth: 70,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    editable: false,
                                    name: 'IN_TDOC',
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            {code: '', name: 'All'},
                                            {code: 'SALE', name: 'Sale'},
                                            {code: 'RFND', name: 'Refund'},
                                            {code: 'CHBK', name: 'Chargeback'},
                                            {code: 'ADJU', name: 'Adjustment'}
                                        ]
                                    }),
                                    queryMode: 'local',
                                    value: '',
                                    listeners: {
                                        change: 'onClickSearchBtn'
                                    }
                                },
//                                {
//                                    xtype: 'combobox',
//                                    id: prototype.id + '-cmbMDA',
//                                    fieldLabel: 'Currency',
//                                    labelWidth: 80,
//                                    width: 160,
//                                    displayField: 'name',
//                                    valueField: 'code',
//                                    name: 'IN_MDA',
//                                    store: Ext.create('Ext.data.Store', {
//                                        data: [
//                                            {code: '', name: 'All'},
//                                            {code: 'MXN', name: 'MXN'},
//                                            {code: 'USD', name: 'USD'},
//                                            {code: 'CAD', name: 'CAD'},
//                                            {code: 'ARS', name: 'ARS'},
//                                            {code: 'CLP', name: 'CLP'},
//                                            {code: 'JPY', name: 'JPY'}
//                                        ]
//                                    }),
//                                    queryMode: 'local',
//                                    value: ''
//                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMoneda',
                                    name: 'IN_MDA',
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
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPNR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z0-9]/,
                                    maxLength: 6,
                                    fieldLabel: 'PNR',
                                    name: 'IN_PNR',
                                    labelWidth: 50,
                                    width: 120,
                                    enableKeyEvents: true,
                                    listeners:{
                                        specialkey: 'onEnterKeyPress',
                                        change: function(field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTICKET',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 13,
                                    fieldLabel: 'TICKET',
                                    name: 'IN_TICKET',
                                    labelWidth: 60,
                                    width: 160,
                                    enableKeyEvents: true,
                                    listeners:{
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIDAC',
                                    name: 'IN_PRAXISID',
                                    fieldStyle: 'text-align:center',
                                    fieldLabel: 'PRAXIS ID',
                                    labelStyle:'font-weight:bold;text-align:right;',
                                    labelWidth: 100,
                                    width: 390,
                                    enableKeyEvents: true,
                                    listeners:{
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                 {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIDFLEX',
                                    fieldStyle: 'text-align:center',
                                    labelStyle:'font-weight:bold;text-align:right;',
                                    name: 'IN_FLEXID',
                                    fieldLabel: 'FLEX ID',
                                    labelWidth: 100,
                                    width: 390,
                                    enableKeyEvents: true,
                                    listeners:{
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAREFNBR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 23,
                                    fieldLabel: 'AREFNBR',
                                    name: 'IN_AREFNBR',
                                    labelWidth: 80,
                                    width: 240,
                                    enableKeyEvents: true,
                                    listeners:{
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
