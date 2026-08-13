/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.payments.WorkloadReassignmentForm.DataEntryAsigna', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAsigna',

    controller: 'DataEntryAsignaController',

    requires: [
        'Ext.Praxis.controller.payments.WorkloadReassignment.DataEntryAsignaController'
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
                            displayField: 'A4836USER',
                            valueField: 'A4836USER',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
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
                            xtype: 'numberfield',
                            id: prototype.id + '-txtcantid',
                            fieldLabel: 'Cantidad',
                            minValue: 1,
                            width: 200,
                            labelWidth: 50,
                            allowDecimals: false,
                            allowExponential: false,
                            allowBlank: false,
                            hideTrigger: true,
                            validator: function (value) {
                                return value >= 1 ? true : 'Debe ser mayor o igual a 1';
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
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
                            bodyStyle: 'background: transparent;"',
                            width: 330,
                            height: 150,
                            border: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Auditor', dataIndex: 'AUASI', width: 150},
                                    {text: 'Asignado', dataIndex: 'PROCE', width: 80},
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
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