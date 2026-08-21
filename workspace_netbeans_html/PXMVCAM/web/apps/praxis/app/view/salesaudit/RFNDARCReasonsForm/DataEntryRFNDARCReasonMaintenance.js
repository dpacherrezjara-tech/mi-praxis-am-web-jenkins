/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDARCReasonsForm.DataEntryRFNDARCReasonMaintenance',{
	extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRFNDARCReasonMaintenance',

    controller: 'DataEntryRFNDARCReasonMaintenanceController',

    requires:[
        'Ext.Praxis.controller.salesaudit.RFNDARCReasonsForm.DataEntryRFNDARCReasonMaintenanceController',
    ],
    id: prototype.idDataEntryRFNDARCRea + '-win',

    title:'Maintenance RFND REASONS',
    header:true,
    height:460,
    width:550,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },
    
    items:[
        {
           xtype: 'form',
            id: prototype.idDataEntryRFNDARCRea + '-form',
            defaults:{
                style: 'margin: 5px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryRFNDARCRea + '-txtReason',
                            fieldLabel: 'Cod.Reason',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 150,
                            readOnly: true,
                            width: 250
                        },
                        {
                            xtype:'combo',
                            id: prototype.idDataEntryRFNDARCRea + '-ComboBy',
                            fieldLabel: 'Family',
                            labelAlign:'right',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 55,
                            width: 200,
                            editable: false,
                            listConfig:{
                                minWidth: 200
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',hidden:true,
                            id: prototype.idDataEntryRFNDARCRea + '-txtCRelation',
                            fieldLabel: 'Comment Relation',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.idDataEntryRFNDARCRea + '-txtCEs',
                            fieldLabel: 'Comment Spanish',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.idDataEntryRFNDARCRea + '-txtCEng',
                            fieldLabel: 'Comment English',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.idDataEntryRFNDARCRea + '-txtCPor',
                            fieldLabel: 'Comment Portuguese',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.idDataEntryRFNDARCRea + '-txtCFre',
                            fieldLabel: 'Comment French',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields</b>',
                    labelWidth: 200,
                    labelSeparator: ''
                },
                {
                    xtype: 'fieldset',
                    title: 'Control data',
                    border: true,
                    defaults: {
                        border: false,
                        margin: 3
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryRFNDARCRea + '-txtREGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryRFNDARCRea + '-txtFREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryRFNDARCRea + '-txtHREGI',
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
                            items:[
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryRFNDARCRea + '-txtREVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryRFNDARCRea + '-txtFREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryRFNDARCRea + '-txtHREVI',
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
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults:{
                scale: 'medium'
            },
            layout:{
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items:[
                {
                    text: 'Save',
                    id: prototype.idDataEntryRFNDARCRea+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDataEntryRFNDARCRea+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDataEntryRFNDARCRea+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDataEntryRFNDARCRea+'-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});


