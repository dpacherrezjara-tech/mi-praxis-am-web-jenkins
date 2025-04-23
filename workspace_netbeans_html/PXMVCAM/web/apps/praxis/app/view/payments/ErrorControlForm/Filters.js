Ext.define('Ext.Praxis.view.payments.ErrorControlForm.Filters', {
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
                        }
                    ]
                },
                {
                    xtype: 'form',
                    border: false,
                    hidden: true,
                    id: prototype.id + '-panelFilters2',
                    bodyStyle: 'background: transparent',
                    layout: {
                        type: 'hbox'
                    },
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'DATE_FROM',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            labelWidth: 50,
                            width: 150,
                            value: new Date()
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To',
                            name: 'DATE_TO',
                            format: 'Ymd',
                            labelWidth: 30,
                            width: 130,
                            value: new Date()
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbProcessor',
                            name: 'TBL_PROC',
                            fieldLabel: 'Processor',
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
                            xtype: 'combobox',
                            id: prototype.id + '-cmbError',
                            name: 'CERROR',
                            fieldLabel: 'Error Code',
                            labelWidth: 70,
                            width: 350,
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
                            emptyText: '(All)',
                            listeners: {
                                change: 'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status Error',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['0', 'Pending'],
                                    ['1', 'Audited'],
                                    ['2', 'Pending System']
                                ]
                            }),
                            name: 'STS_ERROR',
                            labelWidth: 100,
                            width: 230,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status Rev.',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
                                    ['A', 'Automatic'],
                                    ['F', 'Forced Match']
                                ]
                            }),
                            name: 'TIPO_CORRECCION',
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
