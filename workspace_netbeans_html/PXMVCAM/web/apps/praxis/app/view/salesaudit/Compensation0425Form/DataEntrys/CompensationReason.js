
prototype.idDE3 = prototype.id + '-CompensationReason';

Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.CompensationReason', {
    extend: 'Ext.window.Window',
    alias: 'widget.CompensationReason',
    requires: [
        'Ext.Praxis.controller.salesaudit.Compensation0425Form.CompensationReasonController'
    ],
    controller: 'CompensationReasonController',
    title: 'Reason of ompensation 0425',
    header: true,
     id: prototype.idDE3 + '-CompensationReason',
    width: 600,
    height: 400,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            layout: 'fit',
            width: '100%',
            height: '100%',
            items: [
                {
                    xtype: 'grid',
                    margin: '5 0 5 0',
                    minHeight: 100,
                    viewConfig: {
                        stripeRows: false,
                        enableTextSelection: true,
                        markDirty: true
                    },
                    columnLines: true,
                    id: prototype.idDE3 + '-gridListReason',
                    scrollable: true,
                    flex: 1,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE3 + '-txtFilterDescrip',
                                    fieldLabel: 'Description',
                                    labelWidth: 60,
                                    labelAlign: 'left',
                                    emptyText: 'Type to filter...',
                                    width: 300,
                                    listeners: {
                                        change: {
                                            fn: 'onFilterDescripChange',
                                            buffer: 300
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'RN', dataIndex: 'RN' , xtype: 'rownumberer' , width: 40},
                            {text: 'Code', dataIndex: 'A2560CODRZ', width: 50},
                            {text: 'Description<br>Action', dataIndex: 'A2560COMES',  width: 430, cellWrap: true},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items:[
                                    {
                                        iconCls: 'prx-icon-check',
                                        handler: 'OnChkRFNDHandler'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ]
});