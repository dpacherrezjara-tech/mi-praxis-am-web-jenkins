Ext.define('Ext.Praxis.view.payments.LoadDeliveryForm.LoadDeliveryEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-deliveryEntry',
    controller: prototype.id + '-deliveryEntryController',
    requires: [
        'Ext.Praxis.controller.payments.LoadDelivery.LoadDeliveryEntryController'
    ],
    title: 'Delivery Raw',
    header: true,
    width: 800,
    height: 550,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            egion: 'center',
            bodyStyle: 'background: white;',
            id: prototype.id + '-regionCenterGrid01',
            margin: '10 ,0 ,10 ,0',
            width: 750,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: white;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'textareafield',
                    height: 450,
                    border: false,
                    id: prototype.id + '-txaDelivery',
                    padding: '0 0 0 0',
                    autoScroll   :    true,
                    width: 870,
                    fieldLabel: '',
                    readOnly: true,
                    labelPad: 0,
                    labelSeparator: ' ',
                    fieldStyle: 'color: #0B333C; font-size: 10px; font-family : Courier New; background: white;',
                    labelWidth: 0
                            //fontFamily="keyDown="txtPagFilterValue_keyDownHandler(event)"
                }
            ]
        }
    ]
});


