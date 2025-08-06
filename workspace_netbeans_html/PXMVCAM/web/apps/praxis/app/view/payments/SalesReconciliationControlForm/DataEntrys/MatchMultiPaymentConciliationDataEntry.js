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
        xtype: 'form',
        border: false,
        style: 'background: white',
        id: prototype.idMP + '-viewOption',
        layout: {
            type: 'hbox',
            align: 'middle',
            pack: 'start',
        },
        padding: 10,
        items: [
            {
                xtype: 'textfield',
                name: 'IN_CCUST',
                hidden: true,
                value: '139'
            },
            {
                xtype: 'datefield',
                margin: '0 20 0 0',
                fieldLabel: 'From',
                name: 'IN_PRDA_FROM',
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
                name: 'IN_PRDA_TO',
                format: 'Ymd',
                editable: false,
                labelWidth: 20,
                width: 110,
                value: new Date()
            },
            {
                xtype: 'textfield',
                margin: '0 20 0 0',
                fieldLabel: 'Ref. Number',
                labelWidth: 75,
                width: 220,
                name: 'IN_AREFNBR',
                itemId: 'IN_AREFNBR',
                maxLength: 19,
                maskRe: /[0-9]/,
                enforceMaxLength: true,
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Card Number',
                labelWidth: 80,
                width: 135,
                name: 'IN_SCARDN1',
                itemId: 'IN_SCARDN1',
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
                name: 'IN_SCARDN2',
                margin: '0 20 0 0',
                width: 40,
                maxLength: 4, // Límite máximo de caracteres
                maskRe: /[0-9]/, // Expresión regular para permitir solo números
                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Auth',
                labelWidth: 30,
                width: 95,
                name: 'IN_SAUTHOC',
                margin: '0 20 0 0',
                maxLength: 6,
                maskRe: /[a-zA-Z0-9]/,
                enforceMaxLength: true,
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
                width: 100,
                name: 'IN_PNR',
                maxLength: 8, // Límite máximo de caracteres
                maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Transac. Amount',
                labelWidth: 95,
                margin: '0 20 0 0',
                width: 220,
                name: 'IN_AMOUNT',
                maxLength: 15,
                enforceMaxLength: true,
                maskRe: /[0-9.]/, // permite solo números y punto
//                validator: function (value) {
//                    if (!value)
//                        return true;
//                    return /^\d+(\.\d{0,2})?$/.test(value)
//                            ? true
//                            : 'Solo se permiten números con hasta 2 decimales';
//                },
                listeners: {
                    specialkey: 'onEnterKeyPress'
                }
            },
            {
                xtype: 'combobox',
                fieldLabel: 'Doc. Type',
                margin: '30 10 10 10',
//                id: prototype.id + '-cmbFiltersBP',  IN_TDOC
                store: Ext.create('Ext.data.SimpleStore', {
                    fields: ['code', 'name'],
                    data: [
                        ['S', 'SALE'],
                        ['R', 'REFUND']
                    ]
                }),
                labelWidth: 60,
                width: 150,
                displayField: 'name',
                valueField: 'code',
                name: 'IN_TDOC',
                queryMode: 'local',
                editable: false,
                value: 'S',
                listeners: {
                    change: 'onChangeFiltersBP'
                }
            },
            {
                xtype: 'button',
                iconCls: 'prx-icon-search',
                margin: '0 40 0 0',
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
                                {text: 'Ref. Number', dataIndex: 'AREFNBR', width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {


                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Card<br>Number', dataIndex: 'SCARDN', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 60,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'PNR', dataIndex: 'SPNR', width: 80,
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
                                        const cia = record.get('CCIA') || '';
                                        const forma = record.get('FORMA') || '';
                                        const serie = record.get('SERIE') || '';

                                        // Formato del ticket, por ejemplo: "139-FAC-A123"
                                        const ticket = `${cia}${forma}${serie}`;
                                        console.log('tiiii', ticket)
                                        return ticket;
                                    }},
                                {text: 'Status', dataIndex: 'STVAL', width: 120,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        const opts = {
//                                            'A': 'Match OC/Camepa',
                                            'C': 'Match Complement',
//                                            'D': 'Match Balance',
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
                                {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 50,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Trans.<br>Amount', dataIndex: 'TGROSAMOUN', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Sale<br>Amount', dataIndex: 'SVFOPS', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Diff.<br>Amount', dataIndex: 'DIFFERENCE', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Exist', dataIndex: 'exist', width: 110, hidden: true,
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
                                                if (record.get('exist') === 'yes') {
                                                    metaData.style = "background-color: #e0e0e0;";
                                                }
                                                return record.get('exist') === 'yes' ? 'x-hide-display' : 'prx-icon-clear';
                                            },
                                        },
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
                            padding: 10,
                            margin: '10 0 0 0',
                            style: {
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Transaction Amount',
                                    itemId: 'TGROSAMOUN_LIQUIDATION', // importante para que puedas consultarlo con ComponentQuery
                                    width: 250,
                                    value: '0.00',
                                    labelWidth: 130,
                                    margin: '20 0 0 0',
                                    style: 'text-align: right',
//                                    fieldStyle: 'text-align: right; font-weight: bold;'
                                    labelStyle: 'font-weight: bold;'

                                },

                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Sale Amount',
                                    labelWidth: 100,
                                    itemId: 'SVFOPS_LIQUIDATION',
                                    width: 200,
                                    value: '0.00',
                                    margin: '20 0 0 0',
                                    style: 'text-align: right',
//                                    fieldStyle: 'text-align: right; font-weight: bold;'
                                    labelStyle: 'font-weight: bold;'
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
                                {text: 'Ref. Number', dataIndex: 'AREFNBR', width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {


                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Card<br>Number', dataIndex: 'SCARDN', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 60,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'PNR', dataIndex: 'SPNR', width: 80,
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
                                        const cia = record.get('CCIA') || '';
                                        const forma = record.get('FORMA') || '';
                                        const serie = record.get('SERIE') || '';

                                        // Formato del ticket, por ejemplo: "139-FAC-A123"
                                        const ticket = `${cia}${forma}${serie}`;
                                        console.log('tiiii', ticket)
                                        return ticket;
                                    }},
                                {text: 'Status', dataIndex: 'STVAL', width: 120,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        const opts = {
//                                            'A': 'Match OC/Camepa',
                                            'C': 'Match Complement',
//                                            'D': 'Match Balance',
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
                                {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 50,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Trans.<br>Amount', dataIndex: 'TGROSAMOUC', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Sale<br>Amount', dataIndex: 'SVFOPS', width: 110,
                                    renderer: function (value, metaData, record) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Exist', dataIndex: 'exist', width: 110, hidden: true,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('exist') === 'yes') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                            ],
                        },
                        {
                            xtype: 'container',
                            border: true,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            padding: 10,
                            margin: '10 0 0 0',
                            style: {
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Transaction Amount',
                                    labelWidth: 130,
                                    itemId: 'TGROSAMOUN_TICKET',
                                    width: 250,
                                    value: '0.00',
                                    margin: '20 0 0 0',
                                    style: 'text-align: right',
                                    labelStyle: 'font-weight: bold;'
//                                    fieldStyle: 'text-align: right; font-weight: bold;'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Sale Amount',
                                    labelWidth: 100,
                                    itemId: 'SVFOPS_TICKET',
                                    width: 200,
                                    value: '0.00',
                                    margin: '20 0 0 0',
                                    style: 'text-align: right',
//                                    fieldStyle: 'text-align: right; font-weight: bold;'
                                    labelStyle: 'font-weight: bold;'
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
                    id: prototype.idMP + '-saveTicketBtn',
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
