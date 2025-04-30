Ext.define('Ext.Praxis.view.payments.AccountStatementSummForm.FiltersByTicket', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersByTicket',
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
                    xtype: 'combobox',
                    fieldLabel: 'Search By',
                    id: prototype.id + '-cmbReport',
                    fieldStyle: 'text-align: center;font-weight: bold;color:blue;font-size:14px;',
                    labelStyle: 'font-weight: bold;',
                    store: Ext.create('Ext.data.SimpleStore', {
                        fields: ['code', 'name'],
                        data: [
                            ['1', 'Summary'],
                            ['2', 'Client'],
                            ['3', 'AR Aging']
                        ]
                    }),
                    margin: '0 3 0 10',
                    labelWidth: 70,
                    width: 200,
                    displayField: 'name',
                    valueField: 'code',
                    queryMode: 'local',
                    editable: false,
                    value: '1',
                    listeners:{
                        change:'onChangeByTicketReport'
                    }
                },
                //<editor-fold defaultstate="collapsed" desc="Summary">
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
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date Type',
                                    name: 'IN_TDATE',
                                    id: prototype.id + '-cmbDate',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Sale Date'],
                                            ['2', 'Processing Date'],
                                            ['3', 'File Date']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATE',
                                    format: 'Ymd',
                                    editable: false,
                                    width: 100,
                                    value: new Date()
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
                                            ['MAN', 'MAN']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 120,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Sub-Source',
                                    name: 'IN_SFUEN',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['CCT', 'CCT'],
                                            ['FRA', 'FRA'],
                                            ['CTO', 'CTO'],
                                            ['ATO', 'ATO']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 150,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaises',
                                    name: 'IN_PAIS',
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
                                    xtype: 'textfield',
                                    name: 'IN_IDCON',
                                    fieldStyle: 'text-align:left',
                                    fieldLabel: 'Accounting ID',
                                    labelStyle: 'font-weight:bold;text-align:right;',
                                    labelWidth: 100,
                                    width: 390,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_IATA',
                                    fieldStyle: 'text-align:left',
                                    fieldLabel: 'Iata',
                                    labelStyle: 'text-align:right;',
                                    labelWidth: 60,
                                    width: 160,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTcard',
                                    name: 'IN_TCARD',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Card Group',
                                    labelWidth: 80,
                                    labelAlign: 'right',
                                    width: 230,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    listeners:{
                                        change : 'onChangeTcardCombo'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCardCod',
                                    name: 'IN_CARDCOD',
                                    hidden:true,
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Card Code',
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
                                    xtype: 'textfield',
                                    name: 'IN_TICKET',
                                    fieldStyle: 'text-align:center',
                                    fieldLabel: 'Ticket',
                                    labelStyle: 'font-weight:bold;text-align:right;',
                                    labelWidth: 60,
                                    width: 180,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CLIENTE',
                                    fieldStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    labelStyle: 'font-weight:bold;text-align:right;',
                                    labelWidth: 60,
                                    width: 160,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_SCARDN1',
                                    fieldStyle: 'font-weight:bold;',
                                    fieldLabel: 'Card Number',
                                    labelStyle: 'text-align:center;',
                                    labelWidth: 80,
                                    width: 160,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype:'label',
                                    text:'******',
                                    margin:'0 5 0 5',
                                    width:40
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_SCARDN2',
                                    fieldStyle: 'font-weight:bold;',
                                    width: 65,
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Client">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters2',
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 5px',
                    hidden:true,
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
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date Type',
                                    name: 'IN_TDATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Sale Date'],
                                            ['2', 'Processing Date'],
                                            ['3', 'File Date']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_DATEF',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_DATET',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date()
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CLIENTE',
                                    fieldStyle: 'text-align:center',
                                    fieldLabel: 'Client',
                                    labelStyle: 'font-weight:bold;text-align:right;',
                                    labelWidth: 50,
                                    width: 150,
                                    value:'',
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Age">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters3',
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 5px',
                    hidden:true,
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
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date Type',
                                    name: 'IN_TDATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Sale Date']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_DATE',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CLIENTE',
                                    fieldStyle: 'text-align:center',
                                    fieldLabel: 'Client',
                                    labelStyle: 'font-weight:bold;text-align:right;',
                                    labelWidth: 50,
                                    width: 150,
                                    value:'',
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>

            ]
        }
    ]
});
