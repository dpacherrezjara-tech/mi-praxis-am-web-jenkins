prototype.idDE3 = prototype.id + '-SettlementDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.SettlementDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.SettlementDataEntry',
    requires: [
    ],
    //controller: 'TransacErrorBPODataEntryController',
    title: 'Settlement - Form',
    header: true,
    width: 1075,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE3 + '-mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '5 5 5 5',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 8 5 8',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">General Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Processing Date',
                                    name: 'prda',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'P. Merchant ID',
                                    name: 'pmerchid',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'S. Merchant ID',
                                    name: 'smerchid',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Inst. Plan',
                                    name: 'nbrinsta',
                                    labelWidth: 70,
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Inst. Nbr',
                                    name: 'instanbr',
                                    labelWidth: 70,
                                    width: 120
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});