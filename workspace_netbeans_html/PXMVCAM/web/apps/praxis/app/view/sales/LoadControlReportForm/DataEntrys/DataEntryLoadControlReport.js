prototype.idDE = prototype.id + 'DataEntryLoadControlReport';

Ext.define('Ext.Praxis.view.sales.LoadControlReportForm.DataEntrys.DataEntryLoadControlReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadControlReport',
    id: prototype.id + '-DataEntryLoadControlReport',
    requires: [
        'Ext.Praxis.controller.sales.LoadControlReport.DataEntryLoadControlReportController'
    ],
    controller: 'DataEntryLoadControlReportController',

    title: 'Comment',
    header: true,
    height: 200,
    width: 230,
    modal: true,
    resizable: false,
    layout: 'fit',
    defaults: {
        border: false,
        style: 'border: none; background: transparent; box-shadow: none;'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-informationForm',
            reference: 'informationForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
//            bodyPadding: 5,

            items: [
                {
                    xtype: 'textareafield',
                    id: prototype.idDE + '-txt-reason',
                    name: 'reason',
                    allowBlank: true,
                    readOnly: false,
                    height: '110%',
                    width: '100%',
                    grow: true,
                    growMax: 300,
                    maxLength: 300,
                    enforceMaxLength: true,
                    fieldStyle: 'border: none; background: transparent; box-shadow: none; overflow-x: hidden;',
                    emptyText: 'Enter comment',
                    listeners: {
                        afterrender: function (field) {
                            field.setValue('');
                            field.inputEl.dom.wrap = 'soft';
                        }
                    }
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
                scale: 'medium',
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
