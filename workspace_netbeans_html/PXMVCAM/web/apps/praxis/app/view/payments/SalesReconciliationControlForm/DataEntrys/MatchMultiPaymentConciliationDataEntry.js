prototype.idMP = prototype.id + '-MatchMultiPaymentConciliationDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MatchMultiPaymentConciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MatchMultiPaymentConciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.MatchMultiPaymentConciliationDataEntryController'
    ],
    title: 'Multi-payment Conciliation',
    header: true,
    width: 1800,
    height: 700,
    resizable: true,
    layout: 'fit',
    modal: true,
    controller: 'MatchMultiPaymentConciliationDataEntryController',
    border: false,
    scrollable: true,
    bodyStyle: 'background-color: white !important;',

    tbar: {
        xtype: 'panel',
        border: false,
        style: 'background: white',
        layout: {
            type: 'hbox',
            align: 'middle',
            pack: 'start',
        },
        padding: 10,
        items: [
            {
                xtype: 'datefield',
                margin: '0 20 0 0',
                fieldLabel: 'From',
                name: 'IN_FROM',
                format: 'Ymd',
                editable: false,
                labelWidth: 30,
                width: 110,
                value: new Date()
            },
            {
                xtype: 'datefield',
                margin: '0 20 0 0',
                fieldLabel: 'To',
                name: 'IN_TO',
                format: 'Ymd',
                editable: false,
                labelWidth: 20,
                width: 110,
                value: new Date()
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Card Number',
                labelWidth: 80,
                width: 140,
                name: 'creditcard',
                itemId: 'creditcard1',
                maxLength: 6,
                maskRe: /[0-9]/,
                enforceMaxLength: true,
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'label',
                text: '*****(*)',
                itemId: 'maskLabel'
            },
            {
                xtype: 'textfield',
                name: 'creditcard2',
                itemId: 'creditcard2',
                width: 40,
                maxLength: 4,
                maskRe: /[0-9]/,
                enforceMaxLength: true,
                margin: '0 20 0 0',
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'textfield',
                margin: '0 20 0 0',
                fieldLabel: 'Auth',
                width: 100,
                labelWidth: 30,
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Ticket',
                labelWidth: 40,
                width: 140,
                margin: '0 20 0 0',
                name: 'IN_TICKET',
                maxLength: 13, // Límite máximo de caracteres
                maskRe: /[0-9]/, // Expresión regular para permitir solo números
                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'PNR',
                labelWidth: 30,
                margin: '0 20 0 0',
                width: 110,
                name: 'IN_SPNR',
                maxLength: 8, // Límite máximo de caracteres
                maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'button',
                iconCls: 'prx-icon-search',
                margin: '0 20 0 0',
                width: 25,
                height: 25,
                tooltip: 'Search in Grid',
                listeners: {
                    click: 'onSearchTransaction'
                }
            }
        ]
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            padding: 10,
            style: 'background: white',

            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    margin: '0 10 0 0',
                    items: [
                        {
                            xtype: 'grid',
                            title: 'Liquidation',
                            id: prototype.idMP + '-grid-liquidation',
                            flex: 1,
                            style: 'background: white',
                            columns: [
//                                {text: 'Amount', dataIndex: 'svfops', flex: 1},
                                {text: 'Ref. Number', dataIndex: 'arefnbr', width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Ticket', dataIndex: 'ticket', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'PNR', dataIndex: 'spnr', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Card<br>Number', dataIndex: 'scardn', width: 120,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Status', dataIndex: 'stval', width: 180,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        const opts = {
                                            'A': 'Match OC/Camepa',
                                            'C': 'Match Complement',
                                            'D': 'Match Balance',
                                            'E': 'Duplicate Payment',
                                            'M': 'Match Multi-Payment',
                                            '0': 'Stand By',
                                            '1': 'Match',
                                            '2': 'Sales Without Settl.',
                                            '3': 'Settl. Without Sales',
                                            '4': 'Match Partial',
                                            '5': 'Match Manual',
                                            '8': 'Match Transactional',
                                            '9': 'Match Void'
                                        };

                                        const result = opts[value] || value;
                                        metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                        return result;
                                    }},
                                {text: 'Currency', dataIndex: 'scurrency', width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Doc. Type', dataIndex: 'transtype', width: 90,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Trans.<br>Amount', dataIndex: 'tgrosamoun', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Sale<br>Amount', dataIndex: 'svfops', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Diff.<br>Amount', dataIndex: 'difference', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Exist', dataIndex: 'exist', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {
//                                    sortable: false,
                                    xtype: 'actioncolumn',
                                    width: 60,
                                    text: 'Clear',
                                    locked: true,
                                    align: 'center',
                                    items: [
                                        {
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Open Detail',
                                            handler: 'onClickDelete',
                                            getClass: function (v, meta, record) {
                                                // Esto oculta visualmente el ícono si es 'yes'
                                                return record.get('exist') === 'yes' ? 'x-hide-display' : 'prx-icon-clear';
                                            }
                                        }
                                    ]
                                },
                            ],
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Total Liquidation',
                                    labelWidth: 100,
                                    itemId: 'liquidationTotal',
                                    width: 200,
                                    value: '0.00',
                                    margin: '10 0 0 0',
                                    style: 'text-align: right'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    margin: '0 0 0 10',
                    items: [
                        {
                            xtype: 'grid',
                            title: 'Tickets',
                            flex: 1,
                            id: prototype.idMP + '-grid-ticket',
                            style: 'background: white',
                            columns: [
//                                {text: 'Amount', dataIndex: 'svfops', flex: 1},
                                {text: 'Ref. Number', dataIndex: 'arefnbr', width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Ticket', dataIndex: 'ticket', width: 110,
                                    renderer: function (value, metaData, record) {
                                        const ccia = record.get('ccia') || '';
                                        const form = record.get('forma') || '';
                                        const serie = record.get('serie') || '';

                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }

                                        return `${ccia}${form}${serie}`;
                                    }},
                                {text: 'PNR', dataIndex: 'spnr', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Card<br>Number', dataIndex: 'scardn', width: 120,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Auth<br>Code', dataIndex: 'sauthoc', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Status', dataIndex: 'stval', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        const opts = {
                                            'A': 'Match OC/Camepa',
                                            'C': 'Match Complement',
                                            'D': 'Match Balance',
                                            'E': 'Duplicate Payment',
                                            'M': 'Match Multi-Payment',
                                            '0': 'Stand By',
                                            '1': 'Match',
                                            '2': 'Sales Without Settl.',
                                            '3': 'Settl. Without Sales',
                                            '4': 'Match Partial',
                                            '5': 'Match Manual',
                                            '8': 'Match Transactional',
                                            '9': 'Match Void'
                                        };

                                        const result = opts[value] || value;
                                        metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                        return result;
                                    }},
                                {text: 'Currency', dataIndex: 'scurrency', width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Doc. Type', dataIndex: 'transtype', width: 90,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Trans.<br>Amount', dataIndex: 'tgrosamoun', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Sale<br>Amount', dataIndex: 'svfops', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Diff.<br>Amount', dataIndex: 'difference', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Exist', dataIndex: 'exist', width: 110, },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Total Tickets',
                                    labelWidth: 100,
                                    itemId: 'liquidationTotal2',
                                    width: 200,
                                    value: '0.00',
                                    margin: '10 0 0 0',
                                    style: 'text-align: right'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {pack: 'center'},
            margin: '10 0 10 0',
            defaults: {scale: 'medium'},
            items: [
                {
                    text: 'Save',
                    id: prototype.idMatch2 + '-saveTicketBtn',
                    hidden: true,
                    iconCls: 'prx-icon-save',
                    listeners: {click: 'onSaveTicket'}
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {click: 'onCancelClick'}
                }
            ]
        }
    ]
});
