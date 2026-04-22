Ext.define('Ext.Praxis.view.invoice.BillableCodeCatalogForm.Filters', {
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
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type',
                                    name: 'IN_TIPO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["CTA", "Cuenta Contable"],
                                            ["FBAS", "Farebasis"],
                                            ["IATA", "IATA"],
                                            ["RFIS", "RFIS"],
                                            ["FDES", "Fare Designator"]
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '',
                                    listeners:{
                                        change:'onChangeFilter'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Key',
                                    id: prototype.id + '-txtKey',
                                    labelWidth: 40,
                                    width: 180,
                                    name: 'IN_CLAVE',
                                    maxLength: 10, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Account',
                                    labelWidth: 70,
                                    hidden: true,
                                    id: prototype.id + '-txtCuenta1',
                                    width: 150,
                                    maskRe: /^[0-9]$/,
                                    name: 'IN_CUENTA',
                                    maxLength: 4, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Sub-Account',
                                    id: prototype.id + '-txtCuenta2',
                                    hidden: true,
                                    labelWidth: 80,
                                    width: 160,
                                    name: 'IN_SUBCUEN',
                                    maxLength: 5, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    maskRe: /^[0-9]$/,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    labelWidth: 80,
                                    width: 300,
                                    name: 'IN_DESCRIP',
                                    maxLength: 60, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Billing Code',
                                    name: 'IN_CFACT',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["0", "0-Facturable"],
                                            ["1", "1-No Facturable"],
                                            ["2", "2-Facturable Glob."],
                                            ["3", "3-Facturable Auto."],
                                            ["4", "4-Masivo"],
                                            ["5", "5-Bulk"],
                                            ["6", "6-PreCompra"]
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
