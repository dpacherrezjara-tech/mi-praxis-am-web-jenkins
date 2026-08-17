Ext.define('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.DataEntrys.PolicyLoadDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.PolicyLoadDataEntry',
    requires: [
        'Ext.Praxis.controller.sales.OracleManualPolicyTransfer.PolicyLoadDataEntryController'
    ],
    controller: 'PolicyLoadDataEntryController',
    title: 'Load Manual Policy Transfer',
    header: true,
    width: 560,
    minHeight: 250,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-loadForm',
            layout: 'vbox',
            border: false,
            bodyStyle: 'background-color: #FFFFFF; padding: 10px 5px;',
            defaults: {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    pack: 'start'
                },
                bodyStyle: 'background: transparent',
                border: false,
                width: '100%',
                margin: '5 5 5 10',
                defaults: {
                    fieldStyle: 'text-align: center;',
                    padding: '5 1 5 1',
                    anchor: '100%',
                    hiddenLabel: false,
                    labelAlign: 'right',
                    labelWidth: 100,
                    hidden: false
                }
            },
            width: '100%',
            items: [
                {
                    items: [
                        {
                            xtype: 'combobox',
                            id: prototype.idDE + '-cmbModule',
                            labelStyle: 'font-weight:bold;',
                            fieldLabel: 'Module',
                            name: 'IN_MODULE',
                            width: 320,
                            displayField: 'NAME',
                            valueField: 'CODE',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: false,
                            value: ''
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'zipFiles',
                            id: prototype.idDE + '-zipFiles',
                            labelStyle: 'font-weight:bold;',
                            fieldLabel: 'ZIP File(s)',
                            msgTarget: 'side',
                            allowBlank: false,
                            width: '96%',
                            buttonText: 'Select Files...',
                            accept: '.zip',
                            listeners: {
                                afterrender: function (cmp) {
                                    // Ext.form.field.File no expone "multiple" como config;
                                    // se habilita a mano sobre el <input type=file> real.
                                    const dom = cmp.fileInputEl.dom;
                                    dom.setAttribute('multiple', 'multiple');
                                    dom.multiple = true;
                                },
                                change: function (cmp) {
                                    // El browser solo muestra el nombre del primer archivo por
                                    // seguridad; mostramos la cuenta real para confirmar la seleccion.
                                    const files = cmp.fileInputEl.dom.files;
                                    if (files && files.length > 1) {
                                        cmp.inputEl.dom.value = files.length + ' files selected';
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    margin: '16 10 8 10',
                    items: [
                        {
                            xtype: 'progressbar',
                            id: prototype.idDE + '-progressBar',
                            width: '98%',
                            height: 30,
                            text: ''
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
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 5 5 5'
            },
            items: [
                {
                    text: 'Process',
                    id: prototype.idDE + '-btn-process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
