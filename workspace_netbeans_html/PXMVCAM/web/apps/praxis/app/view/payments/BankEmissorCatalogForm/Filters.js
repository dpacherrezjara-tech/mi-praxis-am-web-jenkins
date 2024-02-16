Ext.define('Ext.Praxis.view.payments.BankEmissorCatalogForm.Filters', {
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Bank Name',
                                    labelWidth: 100,
                                    width: 400,
                                    name: 'IN_NOMBRE',
                                    maxLength: 100, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Region',
                                    name: 'IN_REGION',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["SA", "Sudamerica"],
                                            ["NA", "Norteamerica"],
                                            ["EU", "Europa"],
                                            ["AS", "Asia"],
                                            ["AF", "Africa"],
                                            ["OC", "Oceania"]
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 160,
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
