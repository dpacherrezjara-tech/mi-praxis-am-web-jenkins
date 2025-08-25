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
//    height: 300,
    width: 540,
    maxWidth: 540,
    autoHeight: true,        // ajuste automático
    shrinkWrap: true,        // para forzar ajuste al contenido
    resizable: true,
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
//            maxWidth: 540,
            defaults: {
                style: 'margin: 3px;',
                border: true
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panel-calendar-de01',
                    bodyStyle: 'background: transparent;"',
                    layout: 'fit',
                    width: 520,
                    height: 120,
                    defaults: {
                        anchor: '100%'
                    },resizable: {
                        split: true,
                        edges: 'east'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid-calendar-de01',
                            width: 510,
                            
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
                                    {text: 'Processor', dataIndex: 'PROCESADOR', flex: 1,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#CBCDA0;text-align:center;font-weight: bold;';
                                            return value;
                                        }
                                    },
                                    {text: 'File Type', dataIndex: 'TFILE', flex:1},
                                    {text: 'Date', dataIndex: 'FECHA', width: 80},
                                    {text: 'Total', dataIndex: 'TOTALROWS', width: 60},
                                    {text: 'Status', dataIndex: 'STATUS', width: 50,
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
                },
                //<editor-fold defaultstate="collapsed" desc="Error Control">
                {
//                    xtype: 'fieldset',
                    xtype: 'panel',
                    title: 'Error Control',
                    titleCollapse: true,
                    id: prototype.id + '-panel-error-control-de01',
                    bodyStyle: 'background: transparent;"',
//                    layout: 'hbox',
                    width: 520,
                    height: 120,
                    flex: 1,
                    defaults: {
                        shadow: true,
                        anchor: '100%'
                    },
                    resizable: {
                        split: true,
                        edges: 'east'
                    },
                    collapsible: {
                        direction: 'top',
                        dynamic: true
                    },
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid-error-control-de01',
                            width: 510,
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
                                    {text: 'Code<br>Error', dataIndex: 'A4701CDERR', width: 80 },
                                    {text: 'Message', dataIndex: 'A4701MSN', flex:1}
                                ]
                            }

                        }
                    ]
                },
                //</editor-fold>
                
                //<editor-fold defaultstate="collapsed" desc="Comment of BPO">
                {
//                    xtype: 'fieldset',
                    xtype: 'form',
                    title: 'BPO Comment',
                    titleCollapse: true,
                    id: prototype.id + '-panel-comment-de01',
                    bodyStyle: 'background: transparent;"',
//                    layout: 'hbox',
                    width: 520,
                    flex: 1,
                    defaults: {
                        shadow: true,
                        anchor: '100%'
                    },
//                    resizable: {
//                        split: true,
//                        edges: 'east'
//                    },
                     collapsible: {
                        direction: 'top',
                        dynamic: true
                    },

                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'OPTION',
                            hidden: true,
                            value: 'C'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PRDA',
                            name: 'PRDA',
                            hidden: true,
                            editable: false,
                            labelWidth: 30,
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PROCTYPESQ',
                            name: 'PROCTYPESQ',
                            hidden: true,
                            editable: false,
                            labelWidth: 30,
                            width: 110
                        },
                        {
                            xtype: 'textareafield',
                            margin: '5px',
                            name: 'NOTE',
                            maxLength: 200,
                            editable: true,
                            width: '100%',
                            enforceMaxLength: true,
                        },
                        
                    ],
                    rbar: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-save-comment',
                            ui: 'default',
                            iconCls: 'prx-icon-save-blue-16',
                            handler: 'onClickUpdateProcessor',
                            tooltip: 'Save BPO Comment',
                            listeners: {
                                click: 'onSaveCommentClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-delete-comment',
                            ui: 'default',
                            iconCls: 'prx-icon-image-trash',
                            handler: 'onClickUpdateProcessor',
                            tooltip: 'Delete BPO Comment',
                            hidden:true,
                            listeners: {
                                click: 'onDeleteCommentClick'
                            }
                        }
                    ]
                },
                //</editor-fold>
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
//                    id: prototype.id + '-btn-save-comment',
//                    iconCls: 'prx-icon-save-blue-24',
//                    tooltip: 'Save BPO Comment',
//                    listeners: {
//                        click: 'onSaveCommentClick'
//                    }
//                },
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
