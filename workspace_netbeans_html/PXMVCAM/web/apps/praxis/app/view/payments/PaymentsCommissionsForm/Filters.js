Ext.define('Ext.Praxis.view.payments.PaymentsCommissionsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'form',
            border: false,
            id: prototype.id + '-formFilters',
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                fieldStyle: 'text-align: center;',
                padding: '5 5 5 5',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Type',
                            name: 'IN_TIPO',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['COM', 'Base Comm.'],
                                    ['MSI', 'MSI Comm.'],
                                    ['BIN', 'Bank Comm.']
                                ]
                            }),
                            labelWidth: 50,
                            width: 180,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '',
                            listeners: {
                                change: 'onChangeType'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbProctype',
                            name: 'IN_PROCTYPE',
                            labelWidth: 70,
                            width: 250,
                            valueField: 'a4451key3',
                            displayField: 'a4451desc1',
                            fieldLabel: 'Processor',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            caseSensitive: false,
                            autoSelect: true,
                            labelAlign: 'right',
                            typeAhead: true,
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: ''
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPaises',
                            name: 'IN_PAIS',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            fieldLabel: 'Country',
                            labelWidth: 65,
                            labelAlign: 'right',
                            width: 230,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Type Card',
                            name: 'IN_TTARJ',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['C', 'Credit'],
                                    ['D', 'Debit']
                                ]
                            }),
                            labelWidth: 80,
                            width: 180,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBanks',
                            hidden: true,
                            name: 'IN_CODEBANK',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            fieldLabel: 'Bank',
                            labelWidth: 65,
                            labelAlign: 'right',
                            width: 230,
                            typeAhead: true,
                            valueField: 'a4559CODE',
                            displayField: 'a4559DESC',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: '',
                            editable: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Card Code',
                            hidden: true,
                            id: prototype.id + '-cmbCards',
                            name: 'IN_CODECARD',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['1', 'Visa'],
                                    ['2', 'MasterCard'],
                                    ['3', 'American Express']
                                ]
                            }),
                            labelWidth: 80,
                            width: 200,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtBin',
                            hidden: true,
                            fieldLabel: 'BIN',
                            labelWidth: 40,
                            width: 100,
                            name: 'IN_BIN',
                            maxLength: 6, // Límite máximo de caracteres
                            maskRe: /[0-9]/, // Expresión regular para permitir solo números
                            enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                            listeners: {
                                specialkey: 'onEnterKeyPress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
