Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Filters', {
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
                                // {
                                //     xtype: 'combobox',
                                //     fieldLabel: 'Date',
                                //     name: 'IN_TFECHA',
                                //     id: prototype.id + '-cmbDate',
                                //     store: Ext.create('Ext.data.SimpleStore', {
                                //         fields: ['code', 'name'],
                                //         data: [
                                //             ['P', 'Processing Date'],
                                //             ['P', 'Processing Date'],
                                //             ['X', 'Execute Date'],
                                //             ['A', 'Accounting Date']
                                //         ]
                                //     }),
                                //     labelWidth: 50,
                                //     width: 200,
                                //     displayField: 'name',
                                //     valueField: 'code',
                                //     queryMode: 'local',
                                //     editable: false,
                                //     value: 'P'
                                // },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-dateAccountingFrom',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
//                                    altFormats: 'm/Y',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    name: 'IN_DATE_FROM',
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-dateAccountingTo',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
//                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    lastDay: true,
                                    labelWidth: 30,
                                    width: 130,
                                    name: 'IN_DATE_TO',
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbAccountingModule',
                                    name: 'IN_MODULE',
                                    fieldLabel: 'Module Processor',
                                    labelWidth: 120,
                                    width: 250,
                                    displayField: 'DESCRIPTION',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                
                                // {
                                //     xtype: 'combobox',
                                //     id: prototype.id + '-cmbTypeProcess',
                                //     name: 'IN_TYPEPROCESS',
                                //     fieldLabel: 'Type Process',
                                //     labelWidth: 90,
                                //     width: 200,
                                //     displayField: 'name',
                                //     valueField: 'code',
                                //     queryMode: 'local',
                                //     editable: false,
                                //     value: '',
                                //     store: Ext.create('Ext.data.Store', {
                                //         data: [
                                //             {code: '', name: 'All'},
                                //             {code: 'AUTO', name: 'Automatic'},
                                //             {code: 'MANUAL', name: 'Manual'}
                                //         ]
                                //     })
                                // },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbStatus',
                                    name: 'IN_STATUS',
                                    fieldLabel: 'Status',
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '',
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            {code: '', name: 'All'},
                                            {code: 'PENDING', name: 'Pending'},
                                            {code: 'PROCESSING', name: 'Processing'},
                                            {code: 'COMPLETED', name: 'Completed'},
                                            {code: 'ERROR', name: 'Error'}
                                        ]
                                    })
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
