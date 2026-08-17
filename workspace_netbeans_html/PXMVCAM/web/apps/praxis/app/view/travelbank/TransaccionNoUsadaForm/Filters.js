Ext.define('Ext.Praxis.view.travelbank.TransaccionNoUsadaForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true,
                        enableKeyEvents: true,
                        enforceMaxLength: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                padding: '5px 1px 5px 1px',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                xtype: 'textfield',
                                hidden: false,
                                selectOnFocus: true,
                                enableKeyEvents: true,
                                enforceMaxLength: true
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    id: prototype.id + '-periodo',
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    labelStyle: 'font-weight: bold;',
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
//                                    labelStyle: 'text-align:center',
                                    fieldLabel: 'Period',
//                                    value: new Date().getFullYear()
                                    value: '2022',
                                    width: 110,
                                    listeners: {
                                        specialkey: function (f, e) {
                                            if (e.getKey() === e.ENTER) {
                                                // MonthlyAtlBalance.getSearchStore();
                                            }
                                        }
                                    }
                                },
//                                {
//                                    xtype: 'label',
//                                    html: '<strong>Periodo</strong>',
//                                    align: 'center',
//                                    fieldStyle: 'text-align: center;',
//                                    padding: '8px 7px 8px 0px'
//                                },
//                                {xtype: 'tbspacer', width: 3},
//                                {
//                                    xtype: 'label',
//                                    text: '*',
//                                    labelSeparator: ':',
//                                    style: 'font-weight:bold;color:red;',
//                                    width: 20,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 3},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-cboFileType',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            ["", "(Select)"],
//                                            ["1", "Transmision date"],
//                                            ["2", "Transaction date"],
//                                            ["3", "Account date"]
//                                        ]
//                                    }),
//                                    queryMode: 'local',
//                                    hiddenLabel: false,
//                                    forceSelection: true,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    width: 130,
//                                    typeAhead: true,
//                                    valueField: 'code', displayField: 'name',
//                                    listConfig: {maxHeight: 111},
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                    listeners: {
//                                        afterrender: function (combo, eOpts) {
//                                            combo.setValue("");
//                                        },
//                                        keyup: function (combo, e) {
//                                            var key = String.fromCharCode(e.getKey());
//                                            var filter = /^[a-zA-Z]+$/;
//                                            var test_bool = filter.test(key);
//                                            if (test_bool) {
//                                                combo.doQuery(key);
//                                            }
//                                        }
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 10},
//                                {
//                                    xtype: 'label',
//                                    html: '<strong>Date:</strong>',
//                                    align: 'center',
//                                    fieldStyle: 'text-align: center;',
//                                    padding: '8px 7px 8px 0px'
//                                },
//                                {
//                                    xtype: 'datefield',
//                                    id: prototype.id + '-txtDateFrom',
//                                    fieldStyle: 'text-align:center',
//                                    format: 'Y/m/d',
//                                    formatText: '',
//                                    invalidText: 'Format valid YYYY/MM/DD',
//                                    minValue: new Date(1990, 00, 01),
//                                    value: new Date(2022, 10, 01),
//                                    maskRe: /[0-9/]/,
//                                    editable: true,
//                                    enforceMaxLength: true,
//                                    maxLength: 10,
//                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
//                                    width: 90
//                                },
//                                {xtype: 'tbspacer', width: 10},
//                                {
//                                    xtype: 'label',
//                                    html: '<strong>To:</strong>',
//                                    align: 'center',
//                                    fieldStyle: 'text-align: center;',
//                                    padding: '8px 7px 8px 0px'
//                                },
//                                {
//                                    xtype: 'datefield',
//                                    id: prototype.id + '-txtDateTo',
//                                    fieldStyle: 'text-align:center',
//                                    format: 'Y/m/d',
//                                    formatText: '', value: new Date(),
//                                    invalidText: 'Format valid YYYY/MM/DD',
//                                    minValue: new Date(1990, 00, 01),
//                                    maskRe: /[0-9/]/,
//                                    editable: true,
//                                    enforceMaxLength: true,
//                                    maxLength: 10,
//                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
//                                    width: 90
//                                },
//                                {xtype: 'tbspacer', width: 10},
//                                {
//                                    id: prototype.id + '-txtAccountNumber',
//                                    fieldLabel: 'Account Nbr:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                                    maxLength: 20, value: '8139204153239670',
//                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
//                                    maskRe: /[0-9]/,
//                                    width: 250,
//                                    emptyText: ''
//                                },
                                {
                                    id: prototype.id + '-txtAccountNumberCurr',
                                    fieldLabel: 'Currency', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    maxLength: 3, value: 'USD',
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                    width: 150,
                                    emptyText: ''
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});