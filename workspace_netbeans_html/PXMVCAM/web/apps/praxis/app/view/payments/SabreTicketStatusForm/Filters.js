Ext.define('Ext.Praxis.view.payments.SabreTicketStatusForm.Filters', {
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
                type: 'hbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters',
                    bodyStyle: 'background: transparent',
                    // padding: '2px 5px 1px 5px',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background: transparent',
                        // padding: '2px 5px 1px 5px',
                        layout: 'hbox',
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            // padding: '5px 1px 5px 1px',
                            anchor: '100%',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }
                    },
                    items: [
                        // ── ROW 1 ────────────────────────────────────────────
                        
                        {
                            id: prototype.id + '-rowFilters1',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5px 15px 5px 1px',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [

                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['FECVT', 'Sale Date'],
                                            ['PRDA', 'Processing Date'],
                                            ['FEUP', 'Update Date'],
                                            ['TKT', 'Ticket']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'FECVT',
                                    listeners: {
                                        change: 'onChangeDateFilter'
                                    }
                                },

                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTicket',
                                    fieldLabel: 'Ticket',
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_TICKET',
                                    hidden: true,           // oculto por defecto (default = FECVT)
                                    maxLength: 13,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },

                                {
                                    xtype: 'container',
                                    id: prototype.id + '-dateFiltersContainer',
                                    hidden: false,          // visible por defecto
                                    layout: 'hbox',
                                    defaults: {
                                        fieldStyle: 'text-align: center;',
                                        // padding: '5px 1px 5px 1px',
                                        labelAlign: 'right'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'IN_DATEFROM',
                                            fieldLabel: 'From',
                                            format: 'Ymd',
                                            editable: false,
                                            labelWidth: 50,
                                            width: 150,
                                            value: new Date(anioActual, mesActual, 1),
                                            validator: 'validaFecha',
                                            listeners: {
                                                change: 'onChangeDateBTBtn'
                                            },
                                            id: prototype.id + '-datefieldFromBT'
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'IN_DATETO',
                                            fieldLabel: 'To',
                                            format: 'Ymd',
                                            altFormats: 'm',
                                            editable: false,
                                            labelWidth: 30,
                                            width: 130,
                                            value: fechaActual,
                                            validator: 'validaFecha',
                                            listeners: {
                                                change: 'onChangeDateBTBtn'
                                            },
                                            id: prototype.id + '-datefieldToBT'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbPaisesfBT',
                                            name: 'IN_SCOUNTRY',
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
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: ''
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbMonedaBT',
                                            name: 'IN_SCURRENCY',
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            fieldLabel: 'Currency',
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            width: 140,
                                            typeAhead: true,
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: ''
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Document',
                                            name: 'IN_TRNCU',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ['', 'All'],
                                                    ['SALE', 'Sale'],
                                                    ['RFND', 'Refund']
                                                ]
                                            }),
                                            labelWidth: 70,
                                            width: 160,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            editable: false,
                                            value: ''
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Source',
                                            name: 'IN_FUENT',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ['', 'All'],
                                                    ['ASR', 'ASR'],
                                                    ['BSP', 'BSP'],
                                                    ['ARC', 'ARC'],
                                                    ['MAN', 'Manual']
                                                ]
                                            }),
                                            labelWidth: 60,
                                            width: 130,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            editable: false,
                                            value: ''
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Channel',
                                            name: 'IN_SFUEN',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ['', 'All'],
                                                    ['CCT', 'CCT'],
                                                    ['FRA', 'FRA'],
                                                    ['ATO', 'ATO'],
                                                    ['CTO', 'CTO'],
                                                    ['WEB', 'WEB'],
                                                    ['GSA', 'GSA']
                                                ]
                                            }),
                                            labelWidth: 60,
                                            width: 130,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            editable: false,
                                            value: ''
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Doc. Type',
                                            name: 'IN_TIPOD',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ['', 'All'],
                                                    ['TKT', 'TKT'],
                                                    ['EMD', 'EMD'],
                                                    ['VOU', 'VOU'],
                                                    ['EXB', 'EXB'],
                                                    ['MD50', 'MD50'],
                                                    ['CCR', 'CCR']
                                                ]
                                            }),
                                            labelWidth: 70,
                                            width: 140,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            editable: false,
                                            value: ''
                                        },
                                        {
                                            xtype: 'checkbox',
                                            fieldLabel: 'Void',
                                            labelWidth: 40,
                                            width: 55,
                                            name: 'IN_FVOID',
                                            inputValue: 'V',
                                            uncheckedValue: '',
                                            listeners: {
                                                change: function (checkbox, newValue) { }
                                            }
                                        },
                                        // {
                                        //     xtype: 'textfield',
                                        //     fieldLabel: 'IATA',
                                        //     labelWidth: 50,
                                        //     width: 140,
                                        //     name: 'IN_SAGENT',
                                        //     maxLength: 8,
                                        //     maskRe: /[0-9]/,
                                        //     enforceMaxLength: true,
                                        //     listeners: {
                                        //         specialkey: 'onEnterKeyPress'
                                        //     }
                                        // }
                                    ]
                                }
                            ]
                        },

                        // ── ROW 2 ────────────────────────────────────────────
                        {
                            xtype: 'panel',
                            id: prototype.id + '-rowFilters2',
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
                                    xtype: 'textfield',
                                    padding: '0px 0px 0px 203px',
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_SPNR',
                                    maxLength: 8,
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 80,
                                    width: 150,
                                    name: 'creditcard',
                                    maxLength: 6,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'creditcard',
                                    width: 50,
                                    maxLength: 4,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Auth',
                                    labelWidth: 40,
                                    width: 100,
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6,
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    id: prototype.id + '-cmbStvalBTD',
                                    name: 'IN_STVAL',
                                    labelWidth: 55,
                                    width: 250,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Card Type',
                                    id: prototype.id + '-cmbCardTypeBT',
                                    name: 'IN_TCARD',
                                    labelWidth: 65,
                                    width: 190,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    listeners: {
                                        change: 'onChangeCreditCardBT'
                                    },
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCreditCardBT',
                                    fieldLabel: 'Card Code',
                                    name: 'IN_CCARD',
                                    labelWidth: 65,
                                    width: 210,
                                    hidden: true,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 150,
                                    name: 'IN_AMOUNT',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9\.\-]/,
                                    regex: /^[-]?\d+(\.\d{1,2})?$/,
                                    regexText: 'Invalid Amount',
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_ESTATUS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['OK', 'OK'],
                                            ['RFND', 'RFND'],
                                            ['USED', 'USED'],
                                            ['EXCH', 'EXCH'],
                                            ['VOID', 'VOID'],
                                            ['CKIN', 'CKIN']

                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                // {
                                //     xtype: 'textfield',
                                //     fieldLabel: 'Pax Name',
                                //     labelWidth: 60,
                                //     width: 250,
                                //     name: 'IN_PAX',
                                //     maskRe: /[A-Za-z%]/,
                                //     maxLength: 100,
                                //     enforceMaxLength: true,
                                //     listeners: {
                                //         specialkey: 'onEnterKeyPress'
                                //     }
                                // }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});