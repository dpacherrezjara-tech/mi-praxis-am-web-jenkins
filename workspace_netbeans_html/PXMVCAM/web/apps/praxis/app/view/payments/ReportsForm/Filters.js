
Ext.define('Ext.Praxis.view.payments.ReportsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
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
                //<editor-fold defaultstate="collapsed" desc="Summary">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters',
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 1px',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    id: prototype.id + '-cmbsearch',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'System Date'],
                                            ['2', 'Report code']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1',
                                    listeners: {
                                        change: 'onCmbSearchChange'
                                    }
                                },

                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    id: prototype.id + '-txtFrom',
                                    name: 'IN_PRDAF',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 40,
                                    width: 130,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    id: prototype.id + '-txtTo',
                                    name: 'IN_PRDAT',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 120,
                                    value: new Date()
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCodReport',
                                    hideLabel: true,
                                    width: 100,
                                    maxLength: 15,
                                    enforceMaxLength: 15,
                                    hidden: true,
                                    listeners: {
                                        specialkey: 'onSearchkey'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-CmbTypeRfnd',
                                    fieldLabel: 'Type of RFND',
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'code',
                                    width: 200,
                                    labelWidth: 100,
                                    labelAlign: 'right',
                                    emptyText: '',
                                    listConfig: {
                                        minWidth: 150
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUser',
                                    maxLength: 10,
                                    enforceMaxLength: 10,
                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                    readOnly: true,
                                    fieldLabel: 'Auditor',
                                    width: 150,
                                    labelWidth: 50,
                                    labelAlign: 'right',
                                    listeners: {
                                        specialkey: 'onSearchkey',
                                        change: 'onchange'
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

