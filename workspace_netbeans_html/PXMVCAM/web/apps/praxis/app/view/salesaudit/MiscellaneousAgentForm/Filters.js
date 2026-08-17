Ext.define('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.Filters', {
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
                                    name: 'IN_A4593CCUST',
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Key1',
                                    labelWidth: 50,
                                    width: 90,
                                    name: 'IN_A4593KEY1',
                                    maxLength: 2, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Key2',
                                    labelWidth: 50,
                                    width: 140,
                                    name: 'IN_A4593KEY2',
                                    maxLength: 10, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Key3',
                                    labelWidth: 50,
                                    width: 170,
                                    name: 'IN_A4593KEY3',
                                    maxLength: 15, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                 {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    labelWidth: 80,
                                    width: 290,
                                    name: 'IN_A4593DESC1',
                                    maxLength: 30, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                 {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description 2',
                                    labelWidth: 90,
                                    width: 290,
                                    name: 'IN_A4593DESC2',
                                    maxLength: 30, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                 {
                                    xtype: 'textfield',
                                    fieldLabel: 'Comment',
                                    labelWidth: 70,
                                    width: 470,
                                    name: 'IN_A4593COMEN',
                                    maxLength: 60, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                  {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_A4593STS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['0', 'Inactivo'],
                                            ['1', 'Activo']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 150,
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
