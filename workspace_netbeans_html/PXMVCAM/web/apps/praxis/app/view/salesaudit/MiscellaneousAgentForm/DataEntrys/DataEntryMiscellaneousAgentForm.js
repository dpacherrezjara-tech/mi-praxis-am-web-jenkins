prototype.idDE = prototype.id + 'DataEntryMiscellaneousAgentForm';

Ext.define('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.DataEntrys.DataEntryMiscellaneousAgentForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMiscellaneousAgentForm',
    id: prototype.id + '-DataEntryMiscellaneousAgentForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.MiscellaneousAgentForm.DataEntryMiscellaneousAgentController'
    ],
    controller: 'DataEntryMiscellaneousAgentController',

    title: 'Edit',
    header: true,
    width: 700,
    modal: true,
    resizable: false,
    layout: 'fit',

    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-informationForm',
            reference: 'informationForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 10,
            defaults: {
                xtype: 'container',
                layout: 'hbox',
                margin: '4 0',
                defaults: {
                    xtype: 'textfield',
                    flex: 1,
                    labelAlign: 'right',
                    labelStyle: 'font-weight:bold;',
                    fieldStyle: 'text-align:left; background-color: #EEF3F9;'
                }
            },
            items: [
                {
                    items: [
                        {
                            xtype: 'container',
//                            title: 'Keys and Status',
                            layout: 'hbox',
                            border: true,
                            defaults: {
                                xtype: 'textfield',
                                labelAlign: 'right',
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align:left; background-color: #EEF3F9;',
                            },
                            items: [
                                {
                                    xtype: 'component',
                                    width: 50 
                                },
                                {
                                    id: prototype.idDE + '-key1',
                                    fieldLabel: 'Key 1',
                                    name: 'A4593KEY1',
                                    maxLength: 2,
                                    enforceMaxLength: true,
                                    labelWidth: 50,
                                    width: 90,
                                    margin: '0 2 0 0'
//                                    flex: 1
                                },
                                {
                                    id: prototype.idDE + '-key2',
                                    fieldLabel: 'Key 2',
                                    name: 'A4593KEY2',
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    labelWidth: 50,
                                    width: 150,
                                    margin: '0 2 0 10'
                                },
                                {
                                    id: prototype.idDE + '-key3',
                                    fieldLabel: 'Key 3',
                                    name: 'A4593KEY3',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    labelWidth: 50,
                                    width: 180,
                                    margin: '0 2 0 0'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.idDE + '-Status',
                                    fieldLabel: 'Status',
                                    name: 'A4593STS',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['value', 'label'],
                                        data: [
                                            {value: '1', label: 'Activo'},
                                            {value: '0', label: 'Inactivo'}
                                        ]
                                    }),
                                    valueField: 'value',
                                    displayField: 'label',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    margin: '0 2 0 0'
                                }
                            ]
                        },
                    ]
                },
                {
                    items: [
                        {id: prototype.idDE + '-Description1', fieldLabel: 'Description 1', name: 'A4593DESC1', maxLength: 30, enforceMaxLength: true},
                        {id: prototype.idDE + '-Description2', fieldLabel: 'Description 2', name: 'A4593DESC2', maxLength: 30, enforceMaxLength: true},
                    ]
                },
                {
                    items: [

                        {
                            id: prototype.idDE + '-Comment',
                            fieldLabel: 'Comment',
                            name: 'A4593COMEN',
                            maxLength: 60,
                            enforceMaxLength: true,
                        }
                    ]
                },
                {
                    items: [
                        {id: prototype.idDE + '-UserCreated', fieldLabel: 'User Created', name: 'A4593USCR', readOnly: true},
                        {id: prototype.idDE + '-DateCreated', fieldLabel: 'DateTime Created', name: 'A4593TSCR', readOnly: true,labelWidth:150}
                    ]
                },
                {
                    items: [
                        {id: prototype.idDE + '-UserUpdated', fieldLabel: 'User Updated', name: 'A4593USUP', readOnly: true, },
                        {id: prototype.idDE + '-DateUpdated', fieldLabel: 'DateTime Updated', name: 'A4593TSUP', readOnly: true,labelWidth:150}
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
            margin: '7 0 7 0',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Create',
                    id: prototype.idDE + '-btn-create',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onCreateClick'
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
