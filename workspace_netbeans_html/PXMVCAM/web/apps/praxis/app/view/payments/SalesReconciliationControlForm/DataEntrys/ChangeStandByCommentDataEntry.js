Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ChangeStandByCommentDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ChangeStandByCommentDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ChangeStandByCommentDataEntryController'
    ],
    controller: 'ChangeStandByCommentDataEntryController',
    title: 'Change Stand By Comment',
    header: true,
    width: 400,
    height: 150,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    listeners: {
        afterrender: 'onAfterRender'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-changeStandByCommentForm',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'center'
            },
            border: false,
            items: [
                {
                    xtype: 'combo',
                    id: prototype.idDE + '-cmbCommentCode',
                    name: 'codeComment',
                    fieldLabel: 'Comment Stand By',
                    labelWidth: 120,
                    width: 370,
                    queryMode: 'local',
                    editable: false,
                    allowBlank: false,
                    forceSelection: true,
                    valueField: 'CODE',
                    displayField: 'DESCRIPTION',
                    emptyText: 'Select a comment...',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['CODE', 'DESCRIPTION'],
                        data: []
                    })
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    iconCls: 'prx-icon-update',
                    tooltip: 'Update Comment',
                    listeners: {
                        click: 'onExecuteClick'
                    }
                },
                {
                    text: 'Cancelar',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});

