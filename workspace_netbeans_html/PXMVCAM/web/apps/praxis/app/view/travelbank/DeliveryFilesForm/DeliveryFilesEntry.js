Ext.define('Ext.Praxis.view.travelbank.DeliveryFilesForm.DeliveryFilesEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-deliveryEntry',
    controller: prototype.id + '-deliveryEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.DeliveryFiles.DeliveryEntryController'
    ],
    title: 'Delivery Raw',
    header: true,
    width: 800,
    height: 550,
    border: false,
    resizable: false,
    layout: {
        type: 'fit',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            bodyStyle: 'background: white;',
            id: prototype.id + '-regionCenterGrid01',
            padding: '2 2 5 0',
            border: false,
            width: '100%',
            heigth: '100%',
            layout: {
                type: 'fit',
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
                    height: '100%',
                    width: '100%',
                    border: false,
                    id: prototype.id + '-txaDelivery',
                    fieldStyle: 'color: #FCFEFF; font-size: 13px; font-family : Courier New; background: black;',
                    readOnly: true,
                    scrollable: true
                            //fontFamily="keyDown="txtPagFilterValue_keyDownHandler(event)"
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '2 5 5 10', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Download',
                    id: prototype.id + '-btn-download',
                    iconCls: 'prx-icon-download',
                    listeners: {
                        click: 'onDownloadClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]

});