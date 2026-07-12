Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    //    padding: '2px 0px 1px 0px',
    padding: '3px',
    layout: 'vbox',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            width: '100%',
            margin: '0 0 0 0 ',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                margin: '4 4 4 4',
                bodyStyle: 'background: transparent'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters',
                    width: '100%',
                    bodyStyle: 'background: transparent',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },

                    defaults: {
                        xtype: 'panel',
                        margin: '2px',
                        border: false,
                        width: '100%',
                        layout: 'hbox',
                        padding: 5,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            hiddenLabel: false,
                            labelAlign: 'left',
                            margin: '5 10 0 5'
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
                                    name: 'IN_TYPE_DATE',
                                    fieldLabel: 'Date',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['FECR', 'Creation Date'],
                                            ['SDATE', 'Issue Date'],
                                            ['PDATE', 'Processing Date'],
                                            ['NDATE', 'Notices Date'],
                                            ['TICKET', 'Ticket']
                                        ]
                                    }),
                                    labelWidth: 30,
                                    width: 150,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'FECR'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_DATEF',
                                    format: 'Ymd',
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(new Date().getFullYear(), 0, 1)
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_DATET',
                                    format: 'Ymd',
                                    labelWidth: 20,
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
                                            ['EXCH', 'EXCH']
                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 170,
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
                                    labelWidth: 50,
                                    width: 250,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: true,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
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
                                    labelWidth: 30,
                                    width: 130,
                                    enforceMaxLength: true,
                                    maxLength: 9,
                                    maskRe: /^[0-9]$/,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    name: 'pagination',
                                    boxLabel: 'Enable Pagination',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    checked: true,
                                    labelWidth: 100,
                                    width: 200
                                }

                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_SPNR',
                                    fieldLabel: 'PNR',
                                    labelWidth: 30,
                                    width: 150,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_TICKET',
                                    fieldLabel: 'Ticket',
                                    labelWidth: 40,
                                    width: 140,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /^[0-9]$/,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    labelWidth: 40,
                                    width: 160,
                                    name: 'IN_STATUS',
                                    //                                    margin: '0 10 0 0',
                                    //                                    labelStyle: 'font-weight:bold;',
                                    //                                    fieldStyle: 'text-align:center;font-weight:bold;',
                                    // id: prototype.id + '-cmbTktType',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['Y', 'PENDING'],
                                            ['C', 'UNREGISTERED CLIENT'],
                                            ['S', 'UNREGISTERED SALE'],
                                            ['A', 'APPROVED'],
                                            ['F', 'WITH ACM']
                                            
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    //                                    editable: false,
                                    value: ''
                                },
                            ]
                        }
                    ]
                }

            ]
        }
    ]
});
