prototype.idDE = prototype.id + 'DataEntryOdvCitys';

Ext.define('Ext.Praxis.view.sales.OdvCitysForm.DataEntrys.DataEntryOdvCitys', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryOdvCitys',

    requires: [
        'Ext.Praxis.controller.sales.OdvCitys.DataEntryOdvCitysController'
    ],

    controller: 'DataEntryOdvCitysController',
    title: 'Edit',
    header: true,
    width: 1000,
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
            bodyPadding: 15,
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                margin: '10 0',
                style: {
                    backgroundColor: '#fafafa',
                    borderColor: '#d0d0d0'
                },
                defaults: {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        flex: 1,
                        margin: '4',
                        labelWidth: 100,
                        labelAlign: 'right',
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align:center; background-color: #EEF3F9;',
                        editable: false,
//                        readOnly: true
                    }
                }
            },
            items: [
                





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
                    hidden:true,
                    listeners: {
                        click: 'onUpdateClick'
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
