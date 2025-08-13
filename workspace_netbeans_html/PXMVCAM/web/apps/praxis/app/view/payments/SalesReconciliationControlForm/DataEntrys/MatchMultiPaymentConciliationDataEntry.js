prototype.idMP = prototype.id + '-MatchMultiPaymentConciliationDataEntry';

Ext.define('LiquidationRecord', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'AREFNBR', type: 'string'},
        {name: 'SCARDN', type: 'string'},
        {name: 'SAUTHOC', type: 'string'},
        {name: 'SPNR', type: 'string'},
        {name: 'ticket', type: 'string'},
        {name: 'STVAL', type: 'string'},
        {name: 'TDOC', type: 'string'},
        {name: 'SCURRENCY', type: 'string'},
        {name: 'TGROSAMOUN', type: 'float'},
        {name: 'SVFOPS', type: 'float'},
        {name: 'EXIST', type: 'string'}
    ]
});


Ext.define('TicketRecord', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'AREFNBR', type: 'string'},
        {name: 'SCARDN', type: 'string'},
        {name: 'SAUTHOC', type: 'string'},
        {name: 'SPNR', type: 'string'},
        {name: 'ticket', type: 'string'},
        {name: 'STVAL', type: 'string'},
        {name: 'TDOC', type: 'string'},
        {name: 'SCURRENCY', type: 'string'},
        {name: 'TGROSAMOUN', type: 'float'},
        {name: 'SVFOPS', type: 'float'},
        {name: 'EXIST', type: 'string'}
    ]
});

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MatchMultiPaymentConciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MatchMultiPaymentConciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.MatchMultiPaymentConciliationDataEntryController'
    ],
    title: 'Multi-partial Conciliation',
    header: true,
    width: 1250,
    height: 700,
    resizable: false,
    layout: 'fit',
    modal: true,
    controller: 'MatchMultiPaymentConciliationDataEntryController',
    border: false,
    scrollable: true,
    bodyStyle: 'background-color: white !important;',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
    },

    tbar: {
        xtype: 'form',
        border: false,
        style: 'background: white',
        id: prototype.idMP + '-viewOption',
        layout: {
            type: 'vbox',
            align: 'middle',
            align: 'start'
        },
        padding: 10,

        items: [

            {
                xtype: 'container',
                margin: '0 0 10 0',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'IN_CCUST',
                        hidden: true,
                        value: '139'
                    },
                    {
                        xtype: 'datefield',
                        margin: '0 10 0 0',
                        fieldLabel: 'From',
                        name: 'IN_PRDA_FROM',
                        format: 'Ymd',
                        editable: false,
                        labelWidth: 30,
                        width: 110,
                        listeners: {
                            change: 'onChangeMonthBPBtn'
                        },
                        value: new Date(),
                        id: prototype.id + '-monthfieldFromMatch'
                    },
                    {
                        xtype: 'datefield',
                        margin: '0 10 0 0',
                        fieldLabel: 'To',
                        name: 'IN_PRDA_TO',
                        format: 'Ymd',
                        editable: false,
                        labelWidth: 20,
                        width: 110,
                        listeners: {
                            change: 'onChangeMonthBPBtn'
                        },
                        value: new Date(),
                        id: prototype.id + '-monthfieldToMatch'
                    },
                    {
                        xtype: 'textfield',
                        margin: '0 10 0 0',
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
                        margin: '0 10 0 0',
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
                        margin: '0 10 0 0',
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
                        margin: '0 10 0 0',
                        name: 'IN_TICKET',
                        maxLength: 13,
                        maskRe: /[0-9]/, // Expresión regular para permitir solo números
                        enforceMaxLength: true,
                        listeners: {
                            specialkey: 'onEnterKeyPress'
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'PNR',
                        labelWidth: 30,
                        margin: '0 50 0 0',
                        width: 100,
                        name: 'IN_PNR',
                        maxLength: 8,
                        maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                        enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                        listeners: {
                            specialkey: 'onEnterKeyPress'
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'prx-icon-search',
                        margin: '0 0 0 0',
                        width: 25,
                        height: 25,
                        tooltip: 'Search in Grid',
                        listeners: {
                            click: 'onSearchTransaction'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [

                    {
                        xtype: 'textfield',
                        fieldLabel: 'Transac. Amount',
                        labelWidth: 95,
                        margin: '0 10 0 0',
                        width: 220,
                        name: 'IN_AMOUNT',
                        maxLength: 15,
                        enforceMaxLength: true,
                        maskRe: /[0-9.]/,
                        listeners: {
                            specialkey: 'onEnterKeyPress'
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Doc. Type',
                        margin: '0 10 10 10',
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
                ]
            },
        ]
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idMP + '-form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            height: 300,
            defaults: {
                border: false,
                textAlign: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Liquidation',
                    collapsible: true,
                    titleCollapse: false,
                    collapseTool: false,
                    split: true,
                    layout: 'fit',
                    flex: 1,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idMP + '-grid-liquidation',
                            enableTextSelection: true,
                            viewConfig: {
                                enableTextSelection: true
                            },
//                            store: Ext.create('Ext.data.Store', {
//                                model: 'LiquidationRecord',
//                                data: []
//                            }),
//                            defaults: {
//                                align: 'center'
//                            },
                            columnLines: true,
                            height: 300,
                            features: [{ftype: 'summary', dock: 'bottom'}],
                            columns: [
                                {text: 'Ref. Number', dataIndex: 'AREFNBR', width: 150, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Card<br>Number', dataIndex: 'SCARDN', width: 110, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 60, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},

                                {text: 'Ticket', dataIndex: 'ticket', width: 110, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        const cia = record.get('CCIA') || '';
                                        const forma = record.get('FORMA') || '';
                                        const serie = record.get('SERIE') || '';

                                        // Formato del ticket, por ejemplo: "139-FAC-A123"
                                        const ticket = `${cia}${forma}${serie}`;
//                                        console.log('tiiii', ticket)
                                        return ticket;
                                    }},
                                {text: 'Status', dataIndex: 'STVAL', flex: 1, align: 'center',
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
                                {text: 'Currency', dataIndex: 'SCURRENCY', width: 70, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 50, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Trans.<br>Amount', dataIndex: 'TGROSAMOUN', width: 110, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                        console.log(`Render fila ${rowIndex}: TGROSAMOUN =`, value, 'Tipo:', typeof value);
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    },
                                    summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                        console.log('Resumen SVFOPS:', value, 'Tipo:', typeof value);
                                        metaData.style = "text-align:center;font-weight:bold;";
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                },
                                {text: 'Sale<br>Amount', dataIndex: 'SVFOPS', width: 110, align: 'center',
                                    renderer: function (value, metaData, record) {
//                                        console.log('tipo:', typeof value, 'valor:', value);
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'Diff.<br>Amount', dataIndex: 'DIFFERENCE', width: 110, align: 'center',
                                    renderer: function (value, metaData, record) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {text: 'EXIST', dataIndex: 'EXIST', width: 110, hidden: true, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
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
                                                if (record.get('EXIST') === 'YES') {
                                                    metaData.style = "background-color: #e0e0e0;";
                                                }
                                                return record.get('EXIST') === 'YES' ? 'x-hide-display' : 'prx-icon-clear';
                                            },
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'splitter',
//                    width: 10
                    height: 10,
                },
                {
                    xtype: 'panel',
                    title: 'Tickets',
                    collapsible: true,
                    titleCollapse: false,
                    collapseTool: false,
                    split: true,
                    layout: 'fit',
                    flex: 1,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idMP + '-grid-ticket',
                            viewConfig: {
                                enableTextSelection: true
                            },
//                            store: Ext.create('Ext.data.Store', {
//                                model: 'TicketRecord',
//                                data: []
//                            }),
                            defaults: {
                                align: 'center'
                            },
                            columnLines: true,
                            height: 300,
                            features: [{ftype: 'summary', dock: 'bottom'}],
                            columns: [
                                {text: 'Ref. Number', dataIndex: 'AREFNBR', width: 160, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Card<br>Number', dataIndex: 'SCARDN', width: 120, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 80, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},

                                {text: 'Ticket', dataIndex: 'ticket', width: 120, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        const cia = record.get('CCIA') || '';
                                        const forma = record.get('FORMA') || '';
                                        const serie = record.get('SERIE') || '';

                                        // Formato del ticket, por ejemplo: "139-FAC-A123"
                                        const ticket = `${cia}${forma}${serie}`;
//                                        console.log('tiiii', ticket)
                                        return ticket;
                                    }},
                                {text: 'Status', dataIndex: 'STVAL', flex: 1, align: 'center',
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
                                {text: 'Currency', dataIndex: 'SCURRENCY', width: 80, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 80, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
                                {text: 'Trans.<br>Amount', dataIndex: 'TGROSAMOUC', width: 110, align: 'center',
                                    renderer: function (value, metaData, record) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }},
                                {
                                    text: 'Sale<br>Amount',
                                    dataIndex: 'SVFOPS',
                                    width: 120,
                                    align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                        console.log(`Render fila ${rowIndex}: SVFOPS =`, value, 'Tipo:', typeof value);
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return Ext.util.Format.number(value, '0,000.00');
                                    },
                                    summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                        console.log('Resumen SVFOPS:', value, 'Tipo:', typeof value);
                                        metaData.style = "text-align:center;font-weight:bold;";
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                },
                                {text: 'EXIST', dataIndex: 'EXIST', width: 110, hidden: true,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        if (record.get('EXIST') === 'YES') {
                                            metaData.style = "background-color: #e0e0e0;";
                                        }
                                        return value;
                                    }},
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
