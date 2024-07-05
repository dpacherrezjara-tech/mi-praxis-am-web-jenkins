Ext.define('Ext.Praxis.view.invoice.ArithmeticValidationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
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
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 10',
                    layout: 'vbox',
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
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                labelStyle: 'font-weight: bold',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Search By',
                                    name: 'IN_FECHA',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["P", "Processing Date"]
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 180,
                                    readOnly:true,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'P'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true,
                                    labelWidth: 60,
                                    width: 160,
                                    value: new Date(),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type',
                                    name: 'IN_TIPO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["F", "Factura"],
                                            ["NC", "Nota de Credito"]
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
                                    fieldLabel: 'Transaction',
                                    name: 'IN_TRNCU',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["SALE", "SALE"],
                                            ["EXCH", "EXCH"],
                                            ["RFND", "RFND"]
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket',
                                    labelWidth: 70,
                                    width: 200,
                                    name: 'IN_TICKET',
                                    maxLength: 13, // Límite máximo de caracteres
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Trans. Type',
                                    name: 'IN_TRNCO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["RFND", "RFND"],
                                            ["SALE", "SALE"],
                                            ["SALE1", "SALE1"],
                                            ["SALE2", "SALE2"],
                                            ["EXCA", "EXCA"],
                                            ["EXCA1", "EXCA1"],
                                            ["EXCA2", "EXCA2"],
                                            ["EXCE", "EXCE"]
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
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
