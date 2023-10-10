prototype.idUse = prototype.id + '-CouponsUsagesDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CouponsUsagesDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CouponsUsagesDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.CouponsUsagesDataEntryController'
    ],
    controller: 'CouponsUsagesDataEntryController',
    title: 'Coupon Usages - Form',
    header: true,
    width: 600,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: false,
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idUse + '-gridUsages',
                    minHeight: 80,
                    height: 'auto',
                    width: 550,
                    border: false,
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'Ticket', dataIndex: 'ticket', width: 150},
                            {text: 'Itinerary', dataIndex: 'itin', flex: 1},
                            {
                                text: 'Usages',
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        metaData.style = "text-align:center;background-color:#9BCE8D;font-weight:bold;";
                                        return value;
                                    }
                                },
                                columns: [
                                    {text: 'C1', dataIndex: 'c1', width: 30},
                                    {text: 'C2', dataIndex: 'c2', width: 30},
                                    {text: 'C3', dataIndex: 'c3', width: 30},
                                    {text: 'C4', dataIndex: 'c4', width: 30}
                                ]
                            }
                        ]
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});