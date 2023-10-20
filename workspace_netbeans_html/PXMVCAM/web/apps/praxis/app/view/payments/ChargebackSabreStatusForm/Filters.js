Ext.define('Ext.Praxis.view.payments.ChargebackSabreStatusForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'fit',
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
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters',
                    bodyStyle: 'background: transparent',
                    //padding: '2px 5px 1px 5px',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
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
                                padding: '5px 1px 5px 1px',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    id: prototype.id + '-cmbDate',
                                    name: 'IN_TFECHA',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PR', 'Processing Date'],
                                            ['CR', 'Creation Date'],
                                            ['SD', 'Send Date']
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 230,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PR'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    id: prototype.id + '-dateFrom',
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBtn'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    id: prototype.id + '-dateTo',
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBtn'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: prototype.width,
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5px 1px 5px 1px',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTICKET',
                                    name: 'IN_TICKET',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 13,
                                    fieldLabel: 'Ticket',
                                    labelWidth: 70,
                                    width: 180,
                                    enableKeyEvents: true,
                                    validator: function (value) {
                                        if (value.length < 13 && value.length !== 0) {
                                            return 'La longitud mínima es de 13 caracteres.';
                                        }
                                        return true;
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPNR',
                                    name: 'IN_PNR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z0-9]/,
                                    maxLength: 6,
                                    fieldLabel: 'PNR',
                                    labelWidth: 50,
                                    width: 150,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'filterPNR'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCC1',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    fieldLabel: 'Card Number',
                                    labelWidth: 90,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    width: 170,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)',
                                    padding: '8px 1px 2px 1px',
                                    width: 55
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCC2',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 4,
                                    width: 50,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAUTHOC',
                                    name: 'IN_AUTHOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    fieldLabel: 'Auth',
                                    labelWidth: 50,
                                    width: 120,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_STATSBRE',
                                    hidden: true
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Alerts',
                                            width: 185,
                                            iconCls: 'prx-icon-image-log',
                                            margin: '0 5 0 5',
                                            id: prototype.id + '-btnAlerts',
                                            enableToggle: true,
                                            hidden: true,
                                            toggleHandler: 'toggleAlertRfnd'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
