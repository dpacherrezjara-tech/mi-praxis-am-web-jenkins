Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Filters', {
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
                            xtype: 'combobox',
                            fieldLabel: 'Date',
                            id: prototype.id + '-cmbDate',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['P', 'Payment Date'],
                                    ['S', 'Sale Date']
                                ]
                            }),
                            labelWidth: 100,
                            width: 230,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'P'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'From',
                            format: 'Ym',
                            altFormats: 'm/Y',
                            editable: false, // Deshabilita la edición del campo
                            showToday: false, // Oculta el botón "Hoy"
                            labelWidth: 50,
                            width: 150,
                            id: prototype.id + '-dateFrom',
                            value: new Date(new Date().getFullYear(), 0, 1),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To',
                            format: 'Ym',
                            altFormats: 'm',
                            editable: false, // Deshabilita la edición del campo
                            showToday: false, // Oculta el botón "Hoy"
                            labelWidth: 30,
                            width: 130,
                            id: prototype.id + '-dateTo',
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbProcessor',
                            fieldLabel: 'Processor',
                            labelWidth: 70,
                            width: 200,
                            displayField: 'a4451desc1',
                            valueField: 'a4451key2',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbTDOC',
                            fieldLabel: 'Document',
                            labelWidth: 70,
                            width: 150,
                            displayField: 'name',
                            valueField: 'code',
                            store: Ext.create('Ext.data.Store', {
                                data: [
                                    {code: '', name: 'All'},
                                    {code: 'SALE', name: 'SALE'},
                                    {code: 'RFND', name: 'RFND'},
                                    {code: 'CHBK', name: 'CHBK'},
                                    {code: 'ADJU', name: 'ADJU'}
                                ]
                            }),
                            queryMode: 'local',
                            value: '',
                            listeners: {
                                change: 'onClickSearchBtn'
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters2',
                    bodyStyle: 'background: transparent',
                    padding: '2 3 1 3',
                    layout: 'hbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '3 0 3 0',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbMDA',
                            fieldLabel: 'Currency',
                            labelWidth: 50,
                            width: 130,
                            displayField: 'name',
                            valueField: 'code',
                            store: Ext.create('Ext.data.Store', {
                                data: [
                                    {code: '', name: 'All'},
                                    {code: 'MXN', name: 'MXN'},
                                    {code: 'USD', name: 'USD'},
                                    {code: 'CAD', name: 'CAD'},
                                    {code: 'ARS', name: 'ARS'},
                                    {code: 'CLP', name: 'CLP'},
                                    {code: 'JPY', name: 'JPY'}
                                ]
                            }),
                            queryMode: 'local',
                            value: '',
                            listeners: {
                                change: 'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 6,
                            fieldLabel: 'PNR',
                            labelWidth: 70,
                            width: 170,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNR'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIDAC',
                            fieldStyle: 'text-align:center',
//                            enforceMaxLength: true,
//                            maskRe: /[a-zA-Z]/,
//                            maxLength: 6,
                            fieldLabel: 'ID Accounting',
                            labelWidth: 100,
                            width: 390,
                            enableKeyEvents: true
                        }
                    ]
                }
            ]
        }
    ]
});
