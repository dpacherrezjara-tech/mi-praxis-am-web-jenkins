prototype.id01 = 'DataEntryMaintenanceAnalystsForm';
Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryMaintenanceAnalysts', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMaintenanceAnalysts',

    controller: 'DataEntryMaintenanceAnalystsController',

    requires: [
        'Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryMaintenanceAnalystsController',
    ],
    id: prototype.id01 + '-win',

    title: '',
    header: true,
    height: 550,
    width: 1100,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },
    listeners: {
        afterrender: 'afterRender'
    },


    items: [
        {
            xtype: 'form',
            id: prototype.id01 + '-form',
            defaults: {
                style: 'margin: 3px; padding: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtuser',
                            name: 'A4886USER',
                            fieldLabel: 'Auditor',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 10,
                            labelWidth: 70,
                            width: 180
                            // flex: 1
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtusernew',
                            fieldLabel: 'New user',
                            name: 'A4886USERNEW',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 10,
                            labelWidth: 50,
                            // flex: 1,
                            hidden: true
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtnombre',
                            fieldLabel: 'Nombre',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            name: 'A4886DESCR',
                            enforceMaxLength: true,
                            maxLength: 70,
                            labelWidth: 70,
                            // flex: 1
                            width: 420
                        },
                        { xtype: 'tbspacer', width: 10 },
                        // {
                        //     xtype: 'combo',
                        //     id: prototype.id01 + '-cmbSource',
                        //     fieldLabel: 'Source',
                        //     afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                        //     queryMode: 'local',
                        //     displayField: 'name',
                        //     valueField: 'code',
                        //     editable: false,
                        //     forceSelection: true,
                        //     allowBlank: false,
                        //     labelWidth: 70,
                        //     width: 130,
                        //     listeners: {
                        //         change: 'onSourceChange'
                        //     }
                        // },
                        // { xtype: 'tbspacer', width: 10 },
                        // {
                        //     xtype: 'combo',
                        //     id: prototype.id01 + '-cmbChannel',
                        //     fieldLabel: 'Channel',
                        //     labelWidth: 50,
                        //     queryMode: 'local',
                        //     displayField: 'name',
                        //     valueField: 'code',
                        //     editable: false,
                        //     forceSelection: true,
                        //     allowBlank: false,
                        //     width: 140,
                        //     value: ''
                        // },
                        // { xtype: 'tbspacer', width: 10 },
                        // {
                        //     xtype: 'combo',
                        //     id: prototype.id01 + '-cmbTrans',
                        //     fieldLabel: 'Transaction',
                        //     labelWidth: 65,
                        //     queryMode: 'local',
                        //     displayField: 'name',
                        //     valueField: 'code',
                        //     editable: false,
                        //     forceSelection: true,
                        //     allowBlank: false,
                        //     width: 150,
                        //     value: ''
                        // },
                    ]
                },
                // {
                //     xtype: 'panel',
                //     layout: 'hbox',
                //     items: [
                //         {
                //             xtype: 'textfield',
                //             id: prototype.id01 + '-cmbFcmi',
                //             labelWidth: 50,
                //             name: 'A4420FCMI',
                //             fieldLabel: 'Fcmi',
                //             enforceMaxLength: true,
                //             maxLength: 10,
                //             labelWidth: 30,
                //             width: 150
                //             // flex: 1
                //         },
                //         { xtype: 'tbspacer', width: 10 },
                //         {
                //             xtype: 'textfield',
                //             id: prototype.id01 + '-cmbQueq',
                //             name: 'A4420QUEQ',
                //             fieldLabel: 'Queq',
                //             // afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                //             enforceMaxLength: true,
                //             maxLength: 10,
                //             labelWidth: 60,
                //             width: 450,
                //             // flex: 2
                //         },
                //         { xtype: 'tbspacer', width: 10 },
                //         {
                //             xtype: 'textfield',
                //             id: prototype.id01 + '-cmbIata',
                //             name: 'A4420IATA',
                //             fieldLabel: 'Iata',
                //             // afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                //             enforceMaxLength: true,
                //             maxLength: 11,
                //             labelWidth: 50,
                //             // flex: 1
                //             width: 450
                //         },
                //     ]
                // },



                {
                    xtype: 'fieldset',
                    title: 'Rules',
                    border: true,
                    margin: '5 0 5 0',
                    items: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    text: 'Add',
                                    id: prototype.id01 + '-btnAddDetail',
                                    iconCls: 'fa fa-plus',
                                    listeners: {
                                        click: 'onAddDetailClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridDetails',
                            height: 265,
                            width: '100%',
                            columnLines: true,
                            store: Ext.create('Ext.data.Store', {
                                fields: [
                                    'A4420COD',
                                    'A4420FUENT',
                                    'A4420CANAL',
                                    'A4420QUEQ',
                                    'A4420TRAS',
                                    'A4420IATA',
                                    'A4420FCMI',
                                    '__isNew'
                                ],
                                data: []
                            }),
                            columns: [
                                {
                                    text: 'Code',
                                    dataIndex: 'A4420COD',
                                    width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Channel',
                                    dataIndex: 'A4420CANAL',
                                    width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Fcmi',
                                    dataIndex: 'A4420FCMI',
                                    width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Source',
                                    dataIndex: 'A4420FUENT',
                                    width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'IATA',
                                    dataIndex: 'A4420IATA',
                                    width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Queue',
                                    dataIndex: 'A4420QUEQ',
                                    flex: 1,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Transaction',
                                    dataIndex: 'A4420TRAS',
                                    width: 100,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('__isNew')) {
                                            metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
                                        }
                                        return value;
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 50,
                                    align: 'center',
                                    items: [{
                                        tooltip: 'Delete',
                                        getClass: function (v, metaData, record) {
                                            if (record.get('__isNew')) {
                                                metaData.style = 'background-color: #d4edda; color:green; font-size:16px; font-weight: bold;';
                                            } else {
                                                metaData.style = 'color:red; font-size:16px;';
                                            }
                                            return 'fa fa-trash';
                                        },
                                        handler: 'onDeleteRuleAuditorClick'
                                    }]
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: false,
                    id: prototype.id01 + '-panelControlData',
                    hidden: true,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Control data',
                            width: 500,
                            border: true,
                            defaults: {
                                border: false,
                                margin: 3
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-txtA3406REGIS',
                                            name: 'A4886REGI',
                                            fieldLabel: 'User Created',
                                            labelWidth: 90,
                                            readOnly: true,
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-txtA3406FREGI',
                                            name: 'A4886FREGI',
                                            fieldLabel: 'Date',
                                            labelWidth: 40,
                                            width: 120,
                                            readOnly: true,
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-txtA3406HREGI',
                                            name: 'A4886HREGI',
                                            fieldLabel: 'Time',
                                            labelWidth: 40,
                                            width: 120,
                                            readOnly: true,
                                            labelAlign: 'right'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-txtA3406REVIS',
                                            fieldLabel: 'User Modified',
                                            labelWidth: 90,
                                            readOnly: true,
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-txtA3406FREVI',
                                            fieldLabel: 'Date',
                                            labelWidth: 40,
                                            width: 120,
                                            readOnly: true,
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-txtA3406HREVI',
                                            fieldLabel: 'Time',
                                            labelWidth: 40,
                                            width: 120,
                                            readOnly: true,
                                            labelAlign: 'right'
                                        }
                                    ]
                                }
                            ]
                        }
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id01 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Disable',
                    id: prototype.id01 + '-btn-disable',
                    iconCls: 'fa fa-ban',
                    listeners: {
                        click: 'onDisableAuditorClick'
                    }
                },
                {
                    text: 'Vacation',
                    id: prototype.id01 + '-btn-vacation',
                    iconCls: 'fa fa-plane',
                    listeners: {
                        click: 'onVacationClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id01 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});