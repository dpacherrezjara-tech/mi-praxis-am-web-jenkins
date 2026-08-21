/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.AccountingEmailMaintenanceForm.DataEntryAccountingEmailcatalogReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAccountingEmailcatalogReport',

    controller: 'DataEntryAccountingEmailcatalogReportController',

    requires: [
        'Ext.Praxis.controller.sales.AccountingEmailMaintenanceForm.DataEntryAccountingEmailcatalogReportController'
    ],
    id: prototype.ididDataEntryEmailcatalogReportForm + '-win',

    title: '',
    header: true,
    height: 400,
    width: 800,
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
            id: prototype.ididDataEntryEmailcatalogReportForm + '-form',
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
                            id: prototype.ididDataEntryEmailcatalogReportForm + '-CmbModule',
                            fieldLabel: 'Module',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbAfterRender'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.ididDataEntryEmailcatalogReportForm + '-CmbType',
                            fieldLabel: 'Type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbAfterRender'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.ididDataEntryEmailcatalogReportForm + '-CmbStatus',
                            fieldLabel: 'Status',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 50,
                            labelAlign: 'right',
                            width: 200,
                            queryMode: 'local'
                        }

                    ]
                },
                {
                    xtype: 'textfield',
                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406LABL',
                    fieldLabel: 'Label',
                    labelWidth: 100,
                    width: 770,
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406PROP',
                    fieldLabel: 'Properties',
                    labelWidth: 100,
                    width: 770,
                    flex: 1
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textareafield',
                            id: prototype.ididDataEntryEmailcatalogReportForm + '-txtmailAirline',
                            grow: true,
                            name: 'mailagency',
                            allowBlank: false,
                            regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/,
                            regexText: 'This field must contain single or multiple valid email addresses separated by semicolon (;)',
                            blankText: 'Please enter email address(s)',
                            width: 770,
                            //value: 'jgil@aeromexico.com;mmoraleso@aeromexico.com;ialvarado@aeromexico.com;pvazquez@aeromexico.com',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            fieldLabel: 'E-mail',
                            anchor: '100%'
                        }

                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;"> This field must contain single or multiple valid email addresses separated by semicolon (;)</b>',
                    labelWidth: 700,
                    labelSeparator: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields </b>',
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
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406REGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406FREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406HREGI',
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
                                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406REVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406FREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406HREVI',
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
                    id: prototype.ididDataEntryEmailcatalogReportForm + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.ididDataEntryEmailcatalogReportForm + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.ididDataEntryEmailcatalogReportForm + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.ididDataEntryEmailcatalogReportForm + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});