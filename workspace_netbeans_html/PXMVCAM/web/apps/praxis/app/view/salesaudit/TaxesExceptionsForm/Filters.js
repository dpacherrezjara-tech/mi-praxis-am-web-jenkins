Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.Filters', {
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
            defaults: {
                margin: '4 4 4 4'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters',
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        hiddenLabel: false,
                        labelAlign: 'right'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'IN_CCUST',
                            value: '139',
                            hidden: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'From',
                            name: 'IN_DATEF',
                            format: 'Ymd',
                            labelWidth: 50,
                            width: 150,
                            value: new Date()
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To',
                            name: 'IN_DATET',
                            format: 'Ymd',
                            labelWidth: 30,
                            width: 130,
                            value: new Date()
                        },
                        {
                            xtype: 'combobox',
                            name: 'IN_TRNCU',
                            fieldLabel: 'Transaction',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['SALE', 'SALE'],
                                    ['EXCH', 'EXCH'],
                                    ['RFND', 'RFND']
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
                            xtype: 'combobox',
                            id: prototype.id + '-cmbPaises',
                            name: 'IN_PAIS',
                            fieldLabel: 'Country',
                            labelWidth: 70,
                            width: 250,
                            displayField: 'NAME',
                            valueField: 'CODE',
                            queryMode: 'local',
                            editable: true,
                            allowBlank: true,
                            caseSensitive: false,
                            autoSelect: true,
                            labelAlign: 'right',
                            typeAhead: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: '', // Valor inicial (vacío)
                            emptyText: '(All)'
                        },
                        {
                            xtype: 'textfield',
                            name: 'IN_CIATA',
                            fieldLabel: 'IATA',
                            labelWidth: 60,
                            width: 160,
                            enforceMaxLength: true,
                            maxLength: 9,
                            maskRe: /^[0-9]$/
                        },
                        {
                            xtype: 'textfield',
                            name: 'IN_PAX',
                            fieldLabel: 'Pax Name',
                            labelWidth: 90,
                            width: 300,
                            enforceMaxLength: true,
                            maxLength: 50
                        },
                        {
                            xtype: 'textfield',
                            name: 'IN_SPNR',
                            fieldLabel: 'PNR',
                            labelWidth: 60,
                            width: 160,
                            enforceMaxLength: true,
                            maxLength: 6
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Type Load',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['I', 'Form'],
                                    ['M', 'Massive']
                                ]
                            }),
                            name: 'IN_TIPOC',
                            labelWidth: 100,
                            width: 230,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        }
                    ]
                }

            ]
        }
    ]
});
