
Ext.define('Ext.Praxis.view.salesaudit.WorkloadReassignmentForm.DataEntryAsigna', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAsigna',

    controller: 'DataEntryAsignaController',

    requires: [
        'Ext.Praxis.controller.salesaudit.WorkloadReassignment.DataEntryAsignaController'
    ],
    id: prototype.id + '-DataEntryAsigna',

    title: '',
    header: true,
    height: 320,
    width: 400,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.id + '-form1',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtNewAuditor',
                            fieldLabel: 'Auditor',
                            queryMode: 'local',
                            displayField: 'A4886USER',
                            valueField: 'A4886USER',
                            editable: false,
                            forceSelection: true,
                            labelWidth: 60,
                            width: 165,
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'component',
                            id: prototype.id + '-txtlblPendientes',
                            itemId: 'lblPendientes',
                            html: '<b>Pendientes:</b> 0'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtPending',
                            fieldLabel: 'Pendientes',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 165,
                            labelWidth: 60,
                            labelAlign: 'right',
                            store: [
                                { code: 'ALL', name: 'Todos' },
                                { code: 'MACH', name: 'Match' },
                                { code: 'ADM', name: 'ADM' },
                                { code: 'ACM', name: 'ACM' },
                                { code: 'ERROR', name: 'Error' }
                            ],
                            value: 'ALL',
                            listeners: {
                                change: 'OnChangeTipoPendiente'
                            }
                        },
                        { xtype: 'tbspacer', width: 20 },

                        {
                            xtype: 'numberfield',
                            id: prototype.id + '-txtcantid',
                            fieldLabel: 'Cantidad',
                            minValue: 1,
                            width: 100,
                            labelWidth: 50,
                            allowDecimals: false,
                            allowExponential: false,
                            allowBlank: false,
                            hideTrigger: true,
                            validator: function (value) {
                                return value >= 1 ? true : 'Debe ser mayor o igual a 1';
                            }
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'button',
                            text: 'Add',
                            id: prototype.id + '-btn-addCa',
                            iconCls: 'prx-icon-add',
                            listeners: {
                                click: 'onClickAdd'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + 'gridCarga',
                            width: 330,
                            height: 150,
                            border: true,
                            columnLines: true,

                            store: {
                                fields: ['A1672UASIG', 'PROCE'],
                                data: []
                            },

                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    { text: 'Auditor', dataIndex: 'A1672UASIG', width: 150 },
                                    { text: 'Asignado', dataIndex: 'PROCE', width: 100 },
                                    { text: 'Pending', dataIndex: '', width: 80 },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnAsignaRemove'
                                            }
                                        ]
                                    }
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
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});