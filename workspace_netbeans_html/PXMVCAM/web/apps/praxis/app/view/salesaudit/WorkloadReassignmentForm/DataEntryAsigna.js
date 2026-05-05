Ext.define('Ext.Praxis.view.salesaudit.WorkloadReassignmentForm.DataEntryAsigna', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAsigna',

    controller: 'DataEntryAsignaController',

    requires: [
        'Ext.Praxis.controller.salesaudit.WorkloadReassignment.DataEntryAsignaController'
    ],

    id: prototype.id + '-DataEntryAsigna',

    title: '',
    height: 320,
    width: 550,
    layout: 'fit',
    modal: true,

    // ✅ FIX #1: Conectar afterrender al controller (en ExtJS 6.2 los
    //    lifecycle hooks del Window NO se disparan automáticamente en el
    //    ViewController si no se declaran aquí como listeners)
    listeners: {
        afterrender: 'afterRender'
    },

    items: [
        {
            xtype: 'form',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtNewAuditor',
                            fieldLabel: 'Auditor',
                            displayField: 'A4886USER',
                            valueField: 'A4886USER',
                            editable: false,
                            forceSelection: true,
                            width: 165,
                            labelWidth: 60
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTrans',
                            fieldLabel: 'Transaccion',
                            displayField: 'name',
                            valueField: 'code',
                            width: 165,
                            labelWidth: 65,
                            store: [
                                {code: '', name: 'ALL'},
                                {code: 'SALE', name: 'SALE'},
                                {code: 'EXCH', name: 'EXCH'},
                                {code: 'RFND', name: 'RFND'}
                            ],
                            value: ''
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'component',
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
                            displayField: 'name',
                            valueField: 'code',
                            width: 165,
                            labelWidth: 60,
                            store: [
                                {code: 'ALL', name: 'ALL'},
                                {code: 'MACH', name: 'Match'},
                                {code: 'ADM', name: 'ADM'},
                                {code: 'ACM', name: 'ACM'},
                                {code: 'ERROR', name: 'Error'}
                            ],
                            value: 'ALL',
                            listeners: {
                                change: 'OnChangeTipoPendiente'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFcmi',
                            fieldLabel: 'FCMI',
                            maxLength: 1,
                            enforceMaxLength: 1,
                            labelWidth: 35,
                            width: 110
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'numberfield',
                            id: prototype.id + '-txtcantid',
                            fieldLabel: 'Cantidad',
                            minValue: 1,
                            width: 100,
                            labelWidth: 50
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'prx-icon-add',
                            listeners: {
                                click: 'onClickAdd'
                            }
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: prototype.id + 'gridCarga',
                    width: 450,
                    height: 150,

                    store: {
                        fields: ['A1672UASIG', 'PROCE', 'PENDING'],
                        data: []
                    },

                    columns: [
                        {text: 'Auditor', dataIndex: 'A1672UASIG', width: 150},
                        {text: 'Asignado', dataIndex: 'PROCE', width: 100},
                        {
                            text: 'Pending',
                            dataIndex: 'PENDING',
                            renderer: function (value) {
                                return value || '';
                            }
                        },
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
            ]
        }
    ],

    dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Save',
                    iconCls: 'prx-icon-save',
                    listeners: {click: 'onSaveClick'}
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {click: 'onCloseClick'}
                }
            ]
        }]
});