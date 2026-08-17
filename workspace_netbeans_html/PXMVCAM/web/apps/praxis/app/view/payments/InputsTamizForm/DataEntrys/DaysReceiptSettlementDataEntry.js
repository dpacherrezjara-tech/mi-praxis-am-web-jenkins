prototype.idDRS = prototype.id + '-DaysReceiptSettlementDataEntry';

Ext.define('Ext.Praxis.view.payments.InputsTamizForm.DataEntrys.DaysReceiptSettlementDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DaysReceiptSettlementDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.InputsTamiz.DaysReceiptSettlementController'
    ],
    title: 'Settings Days Receipt Of Settlement',
    header: true,
    width: 1000,
    height: 400,
    resizable: true,
    layout: 'fit',
    modal: true,
    controller: 'DaysReceiptSettlementController',
    border: false,
    bodyStyle: 'background-color: white !important;',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },

//    tbar: {
//        layout: {
//            pack: 'end'
//        },
//        defaults: {
//            scale: 'medium'
//        },
//        items: [
//            {
//                xtype: 'button',
//                iconCls: 'prx-icon-excel',
//                scale: 'small',
//                tooltip: 'Export to Excel',
//                listeners: {
//                    click: 'downloadExcelLog'
//                }
//            },
//        ]
//    },

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            padding: 8,
            flex: 1,
            style: 'background: white',
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idDRS + '-gridDaysReceiptSettlement',
                    style: 'background: white',
                    flex: 1,
                    viewConfig: {
                        enableTextSelection: true
                    },
                    columns: [
                        {
                            text: 'RN',
                            dataIndex: 'RN',
                            width: 40,
                            xtype: 'rownumberer',
                            align: 'center'
                        },
                        {text: 'A4451KEY2', dataIndex: 'A4451KEY2', align: 'center', hidden : true},
                        {text: 'Processor', dataIndex: 'A4451DESC1', align: 'center', flex: 1},
                        {text: 'Sunday', headerCheckbox: true, dataIndex: 'SUNDAY', width: 100, xtype: 'checkcolumn'},
                        {text: 'Monday', headerCheckbox: true, dataIndex: 'MONDAY', width: 100, xtype: 'checkcolumn'},
                        {text: 'Tuesday', headerCheckbox: true, dataIndex: 'TUESDAY', width: 100, xtype: 'checkcolumn'},
                        {text: 'Wednesday', headerCheckbox: true, dataIndex: 'WEDNESDAY', width: 100, xtype: 'checkcolumn'},
                        {text: 'Thursday', headerCheckbox: true, dataIndex: 'THURSDAY', width: 100, xtype: 'checkcolumn'},
                        {text: 'Friday', headerCheckbox: true, dataIndex: 'FRIDAY', width: 100, xtype: 'checkcolumn'},
                        {text: 'Saturday', headerCheckbox: true, dataIndex: 'SATURDAY', width: 100, xtype: 'checkcolumn'},
                        {
                            sortable: false,
                            xtype: 'widgetcolumn',
//                            xtype: 'actioncolumn',
                            text: 'Update',
                            width: 60,
                            align: 'center',
                            widget: {
                                xtype: 'button',
                                iconCls: 'prx-icon-save-blue-16',
                                ui: 'default',
                                cls: 'x-btn-default-small',
                                handler: 'onClickUpdateProcessor',
                                tooltip: 'Settings Days Receipt of Processor',
                                width: 30
                            }
//                            items: [
//                                {
//                                    text: 'Save',
//                                    iconCls: 'prx-icon-save-blue-16',
//                                    tooltip: 'Save Days of Processor',
//                                    handler: 'onClickUpdateDaysForPorcessor'
//                                }
//                            ]
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
            layout: {pack: 'center'},
            margin: '10 0 10 0',
            defaults: {scale: 'medium'},
            items: [
                {
                    text: 'Save',
                    id: prototype.idMP + '-saveDataBtn',
                    iconCls: 'prx-icon-save-blue-24',
                    listeners: {click: 'onSaveAllData'}
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {click: 'onCancelClick'}
                }
            ]
        }
    ]

});