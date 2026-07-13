//prototype.idEntry = prototype.idEntry + '-DataEntryReport';
Ext.define('Ext.Praxis.view.payments.ReportsForm.DataEntrys.DataEntryReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryReport',
    requires: [
        'Ext.Praxis.controller.payments.ReportsForm.DataEntryReportController'
    ],
    controller: 'DataEntryReportController',
    title: 'Generate Report',
    id: prototype.idEntry + '-win',
    header: true,
    width: 1050,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: white',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Summary">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.idEntry + '-panelFilters',
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 1px',
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
                                    xtype: 'radiogroup',
                                    id: prototype.idEntry + '-viewOption',
                                    //fieldLabel: 'Opciones',
                                    columns: 3, // Puedes ajustar el número de columnas según tus necesidades
                                    vertical: false, // Esto alinea los botones verticalmente,
                                    defaults: {
                                        margin: '0 5 0 5' // Margen entre los botones
                                    },
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">Settlement</b>', name: 'opcion', inputValue: 'S', width: 90},
                                        {boxLabel: '<b style="color:#148D28;">By Payment</b>', name: 'opcion', inputValue: 'P', checked: true, width: 100},
                                        {boxLabel: '<b style="color:#148D28;">By Ticket</b>', name: 'opcion', inputValue: 'T', width: 80}
                                    ],
                                    listeners: {
                                        change: 'onChangeModule'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            hidden: true,
                            id: prototype.idEntry + '-Settlement1',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    id: prototype.idEntry + '-cmbSettlsearch',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['PAYDATE', 'Payment Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATEFROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateSTBtn'
                                    },
                                    id: prototype.idEntry + '-datefieldFromST'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATETO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateSTBtn'
                                    },
                                    id: prototype.idEntry + '-datefieldToST'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbProctypeSettl',
                                    name: 'IN_PROCTYPESQ',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key2',
                                    displayField: 'a4451desc1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbPaisesSettl',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: true,
                            id: prototype.idEntry + '-Settlement2',
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
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbMonedabST',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    id: prototype.idEntry + '-cmbDocTypeST',
                                    name: 'IN_TRANSTYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund'],
                                            ['CHBK', 'Chargeback'],
                                            ['ADJU', 'Adjustment']
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
                                    xtype: 'textfield',
                                    id: prototype.idEntry + '-txtcreditcardST',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 100,
                                    width: 170,
                                    name: 'creditcard',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'creditcard',
                                    id: prototype.idEntry + '-txtcreditcard2ST',
                                    width: 50,
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
                                    id: prototype.idEntry + '-txtAuthST',
                                    labelWidth: 40,
                                    width: 100,
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    id: prototype.idEntry + '-cmbStatusST',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
//                                    ['A', 'Match OC/Camepa'],
                                            ['C', 'Match Complement'],
//                                    ['D', 'Match Balance'],
                                            ['E', 'Duplicate Payment'],
                                            ['M', 'Match Multi-Payment'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['2', 'Sales Without Settl.'],
                                            ['4', 'Match Partial'],
                                            ['5', 'Match Manual'],
//                                    ['6', 'Match Forced'],
//                                    ['7', 'Match  for Compensation'],
                                            ['8', 'Match Transactional'],
                                            ['8', 'Match Void'],
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: true,
                            id: prototype.idEntry + '-Settlement3',
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
                                    fieldLabel: 'PNR',
                                    id: prototype.idEntry + '-txtPNRST',
                                    labelWidth: 40,
                                    width: 120,
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
                                    fieldLabel: 'Merchant',
                                    id: prototype.idEntry + '-txtSMerchantST',
                                    labelWidth: 70,
                                    width: 170,
                                    name: 'IN_PMERCHID',
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            id: prototype.idEntry + '-ByPayment1',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    id: prototype.idEntry + '-cmbsearchPayment',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['PAYDATE', 'Payment Date'],
                                            ['FEUP', 'Update Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATEFROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBPBtn'
                                    },
                                    id: prototype.idEntry + '-datefieldFromBP'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATETO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBPBtn'
                                    },
                                    id: prototype.idEntry + '-datefieldToBP'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbProctypef',
                                    name: 'IN_PROCTYPESQ',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key2',
                                    displayField: 'a4451desc1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    listeners: {
                                        select: 'onProcessorSelect'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbPaisesfBP',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'MSI',
                                    id: prototype.idEntry + '-checkboxMSI',
                                    labelWidth: 40,
                                    width: 70,
                                    name: 'IN_NBRINSTA',
                                    inputValue: '0',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            id: prototype.idEntry + '-ByPayment2',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TRANSTYPE',
                                    id: prototype.idEntry + '-cmbDocType',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund'],
                                            ['CHBK', 'All Chargeback'],
                                            ['NCHBK', 'Chargeback'],
                                            ['RCHBK', 'Rev. Chargeback'],
                                            ['ADJU', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    id: prototype.idEntry + '-cmbStatus',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
//                                            ['A', 'Match OC/Camepa'],
                                            ['C', 'Match Complement'],
//                                            ['D', 'Match Balance'],
                                            ['E', 'Duplicate Payment'],
                                            ['M', 'Match Multi-Payment'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['3', 'Settl. Without Sales'],
                                            ['4', 'Match Partial'],
                                            ['5', 'Match Manual'],
//                                            ['6', 'Match Forced'],
//                                            ['7', 'Match Compensation'],
                                            ['8', 'Match Transactional'],
//                                            ['8', 'Match Void'],
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    id: prototype.idEntry + '-txtcreditcard',
                                    labelWidth: 80,
                                    width: 150,
                                    name: 'creditcard',
                                    itemId: 'creditcard1',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)',
                                    itemId: 'maskLabel'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'creditcard2',
                                    id: prototype.idEntry + '-txtcreditcard2',
                                    itemId: 'creditcard2',
                                    width: 50,
                                    maxLength: 4, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
//                                    listeners: {
                                    specialkey: 'onEnterKeyPress'
//                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Auth',
                                    labelWidth: 40,
                                    width: 100,
                                    id: prototype.idEntry + '-txtAuth',
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 120,
                                    id: prototype.idEntry + '-txtPNR',
                                    name: 'IN_SPNR',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            id: prototype.idEntry + '-ByPayment3',
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
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                     id: prototype.idEntry + '-txtAmount',
                                    width: 160,
                                    name: 'IN_AMOUNT',
                                    maxLength: 15,
                                    value: '0',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbMonedafBP',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket',
                                    id: prototype.idEntry + '-txtTicket',
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_TICKET',
                                    maxLength: 13, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.idEntry + '-cmbCerrorb',
                                    fieldLabel: 'Error Code',
                                    name: 'IN_CERROR',
                                    labelWidth: 80,
                                    width: 290,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Adj. Code',
                                    id: prototype.idEntry + '-cmbCodadjub',
                                    name: 'IN_CODADJU',
                                    labelWidth: 70,
                                    width: 230,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            id: prototype.idEntry + '-ByPayment4',
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
                                    xtype: 'checkbox',
                                    fieldLabel: 'Void',
                                    id: prototype.idEntry + '-checkboxVoid',
                                    labelWidth: 40,
                                    width: 70,
                                    name: 'IN_FVOID',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'S. Merchant',
                                    id: prototype.idEntry + '-txtSMerchant',
                                    labelWidth: 70,
                                    width: 185,
                                    name: 'IN_SMERCHID',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ref. Number',
                                    id: prototype.idEntry + '-txtRefNumber',
                                    labelWidth: 80,
                                    width: 250,
                                    name: 'IN_AREFNBR',
                                    maxLength: 23, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.idEntry + '-cmbAutoComment',
                                    fieldLabel: 'Auto. Comment',
                                    name: 'IN_CODEAUTOCOMMENT',
                                    labelWidth: 100,
                                    width: 320,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: true,
                            id: prototype.idEntry + '-ByTicket1',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    name: 'IN_DATE',
                                    id: prototype.idEntry + '-cmbsearchByTicket',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['FECVT', 'Sale Date'],
                                            ['PRDA', 'Processing Date'],
                                            ['FEUP', 'Update Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'FECVT'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATEFROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBTBtn'
                                    },
                                    id: prototype.idEntry + '-datefieldFromBT'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATETO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBTBtn'
                                    },
                                    id: prototype.idEntry + '-datefieldToBT'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbPaisesfBT',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idEntry + '-cmbMonedaBT',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Document',
                                    id: prototype.idEntry + '-cmbDocument',
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
                                }                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: true,
                            id: prototype.idEntry + '-ByTicket2',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Source',
                                    name: 'IN_FUENT',
                                    id: prototype.idEntry + '-cmbSource',
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
                                    id: prototype.idEntry + '-cmbChannel',
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
                                    id: prototype.idEntry + '-cmbDocTypeBYTKT',
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
                                    id: prototype.idEntry + '-checkboxVoidTKT',
                                    labelWidth: 40,
                                    width: 55,
                                    name: 'IN_FVOID',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'IATA',
                                    id: prototype.idEntry + '-TXTIATA',
                                    labelWidth: 50,
                                    width: 140,
                                    name: 'IN_SAGENT',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket',
                                    id: prototype.idEntry + '-txtTicketTKT',
                                    labelWidth: 60,
                                    width: 160,
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
                                    id: prototype.idEntry + '-txtPNRTKT',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_SPNR',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: true,
                            id: prototype.idEntry + '-ByTicket3',
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
                                    fieldLabel: 'Card Number',
                                    id: prototype.idEntry + '-txtcreditcardTKT',
                                    labelWidth: 80,
                                    width: 150,
                                    name: 'creditcard',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'creditcard',
                                    id: prototype.idEntry + '-txtcreditcard2TKT',
                                    width: 50,
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
                                    id: prototype.idEntry + '-txtAuthTKT',
                                    labelWidth: 40,
                                    width: 100,
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    id: prototype.idEntry + '-cmbStatusTKT',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
//                                            ['A', 'Match OC/Camepa'],
                                            ['C', 'Match Complement'],
//                                            ['D', 'Match Balance'],
                                            ['E', 'Duplicate Payment'],
                                            ['M', 'Match Multi-Payment'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['2', 'Sales Without Settl.'],
                                            ['4', 'Match Partial'],
                                            ['5', 'Match Manual'],
//                                            ['6', 'Match Forced'],
//                                            ['7', 'Match ComForcedpensation'],
                                            ['8', 'Match Transactional'],
                                            ['8', 'Match Void'],
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Card Type',
                                    id: prototype.idEntry + '-cmbCardTypeTKT',
                                    name: 'IN_TCARD',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['2', 'Master Card'],
                                            ['1', 'Visa'],
                                            ['3', 'American Express'],
                                            ['5', 'Dinners Club'],
                                            ['6', 'UATP'],
                                            ['4', 'Boomers']
                                        ]
                                    }),
                                    labelWidth: 65,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    listeners: {
                                        change: 'onChangeCreditCardBT'
                                    },
                                    value: ''
                                }                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: true,
                            id: prototype.idEntry + '-ByTicket4',
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
                                    xtype: 'combobox',
                                    id: prototype.idEntry + '-cmbCreditCardBT',
                                    fieldLabel: 'Card Code',
                                    name: 'IN_CCARD',
                                    labelWidth: 65,
                                    width: 210,
                                    hidden: true,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 150,
                                    id: prototype.idEntry + '-txtAmountTKT',
                                    name: 'IN_AMOUNT',
                                    maxLength: 15,
                                    value: '0', 
                                    enforceMaxLength: true,
                                    maskRe: /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Pax Name',
                                    id: prototype.idEntry + '-txtPaxName',
                                    labelWidth: 60,
                                    width: 250,
                                    name: 'IN_PAX',
                                    maskRe: /[A-Za-z%]/, // Expresión regular para permitir solo letras
                                    maxLength: 100,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                //fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                               // labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEntry + '-Email',
                                    fieldLabel: 'Enviar a:', labelStyle: 'font-weight: bold;',
                                    labelWidth: 60,
                                    // fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                    readOnly: false,
                                    emptyText: 'Ingresar email separados por ; si es más de un correo',
                                    width: 500
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Generate',
                    id: prototype.idEntry + '-saveTicketBtn',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveTicket'
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});