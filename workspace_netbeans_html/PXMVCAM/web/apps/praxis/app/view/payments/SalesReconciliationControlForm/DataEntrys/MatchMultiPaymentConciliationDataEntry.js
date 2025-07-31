Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MatchMultiPaymentConciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MatchMultiPaymentConciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.MatchMultiPaymentConciliationDataEntryController'
    ],
    title: 'Multi-payment Conciliation',
    header: true,
    width: 1600,
    height: 700,
    resizable: true,
    layout: 'fit',
    modal: true,
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
                        flex: 1,
                        style: 'background: white',
                        columns: [
                            { text: 'Amount', dataIndex: 'paydate', flex: 1 },
                            { text: 'RefNumber', dataIndex: 'paydate', flex: 1 },
                            { text: 'Currency', dataIndex: 'paydate', flex: 1 }
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
                        style: 'background: white',
                        columns: [
                            { text: 'Ticket', dataIndex: 'paydate', flex: 1 },
                            { text: 'Amount', dataIndex: 'paydate', flex: 1 },
                            { text: 'Currency', dataIndex: 'paydate', flex: 1 }
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



//    items: [
//        {
//            xtype: 'container',
//            layout: {
//                type: 'hbox',
//                align: 'stretch'
//            },
//            padding: 10,
//            style: 'background: white',
//            items: [
//                {
//                    xtype: 'grid',
//                    title: 'Liquidation',
//                    flex: 1,
//                    margin: '0 10 0 0',
////                    bodyStyle: 'background: white',
//                    style: 'background: white',
//                    columns: [
//                        {text: 'Amount', dataIndex: 'paydate', flex: 1},
//                        {text: 'RefNumber', dataIndex: 'paydate', flex: 1},
//                        {text: 'Currency', dataIndex: 'paydate', flex: 1}
//                    ]
//                },
//                {
//                    xtype: 'displayfield',
//                    fieldLabel: 'Total Liquidation',
//                    labelWidth: 120,
//                    itemId: 'liquidationTotal',
//                    width: 250,
//                    value: '0.00'
//                },
//                {
//                    xtype: 'grid',
//                    title: 'Tickets',
//                    flex: 1,
//                    margin: '0 0 0 10',
////                    bodyStyle: 'background: transparent',
//                    style: 'background: white',
//                    columns: [
//                        {text: 'Ticket', dataIndex: 'paydate', flex: 1},
//                        {text: 'Amount', dataIndex: 'paydate', flex: 1},
//                        {text: 'Currency', dataIndex: 'paydate', flex: 1}
//                    ],
//                    
//                },
//                {
//                    xtype: 'displayfield',
//                    fieldLabel: 'Total Ticket',
//                    labelWidth: 120,
//                    itemId: 'liquidationTotal2',
//                    width: 250,
//                    value: '0.00'
//                },
//            ]
//        }
//       
//    ],

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
