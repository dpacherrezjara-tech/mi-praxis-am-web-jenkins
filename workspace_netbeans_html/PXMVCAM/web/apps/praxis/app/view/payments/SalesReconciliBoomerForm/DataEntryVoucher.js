Ext.define('Ext.Praxis.view.payments.SalesReconciliBoomerForm.DataEntryVoucher', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryVoucherSalesReconciliBoomerForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliBoomer.DataEntryVoucherController'
    ],
    controller: 'DataEntryVoucherController',
    title: 'Voucher Data Entry Form',
    header: true,
//    height: 575,
    width: 700,
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
            defaults: {
                style: 'margin: 3px;',
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 700,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 700
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Voucher',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 80
                                },                                
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtVoucher',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 120,
                                    readOnly: false,
                                    padding: '3 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 80
                                },                                
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtVoucherAmount',
                                    fieldStyle: 'text-align:right',
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 120,
                                    readOnly: false,
                                    padding: '3 0',
                                    width: 120
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '3 0 20 0',
//            layout: {
//                pack: 'center'
//            },
            fieldStyle: 'text-align:left',
            defaults: {
                scale: 'medium'
            },
            items: [
                {xtype: 'tbspacer', width: 250},
                {
                    text: 'Update',
                    id: prototype.id + '-de-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-de-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
            ]
        }
    ]
}
);