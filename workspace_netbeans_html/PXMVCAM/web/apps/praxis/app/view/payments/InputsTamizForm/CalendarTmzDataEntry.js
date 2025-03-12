Ext.define('Ext.Praxis.view.payments.InputsTamizForm.CalendarTmzDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CalendarTmzDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.InputsTamiz.CalendarTmzDataEntryController'
    ],
    controller: 'CalendarTmzDataEntryController',
    title: 'Calendar TMZ - Data Entry Form',
    config: {
        searchParams: null
    },
    header: true,
    height: 180,
    width: 540,
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
            id: prototype.id + '-form-calendar-de01',
            defaults: {
                style: 'margin: 3px;',
                border: true
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panel-calendar-de01',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 510,
                    height: 100,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid-calendar-de01',
                            width: 510,
                            height: 100,
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                            },
                            columnLines: true,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true,
                                },
                                items: [
                                    {text: 'Processor', dataIndex: 'procesador', flex: 1,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#CBCDA0;text-align:center;font-weight: bold;';
                                            return value;
                                        }
                                    },
                                    {text: 'File Type', dataIndex: 'tfile', flex:1},
                                    {text: 'Date', dataIndex: 'fecha', width: 80},
                                    {text: 'Total', dataIndex: 'totalrows', width: 60},
                                    {text: 'Status', dataIndex: 'status', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                const opcion = {
                                                    '0':()=>{
                                                        metaData.tdAttr = 'data-qtip="OK"';
                                                        return '<img src="resources/img/icon/16x16/check.png"/>'
                                                    },
                                                    '1':()=>{
                                                        metaData.tdAttr = 'data-qtip="NOT FOUND"';
                                                        return '<img src="resources/img/icon/delete.png"/>'
                                                    }
                                                }
                                                return opcion[value]();
                                        }
                                    },
                                ]
                            }

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
            border: false,
            //margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
//                {
//                    text: 'Save',
//                    id: prototype.id + '-btn-save',
//                    iconCls: 'prx-icon-save',
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
//                {
//                    text: 'Update',
//                    id: prototype.id + '-btn-update',
//                    iconCls: 'prx-icon-update',
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
//                {
//                    text: 'Delete',
//                    id: prototype.id + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
