
prototype.idAccoEmailMain = 'AccountingEmailMaintenanceForm';
prototype.idDataEntryEmailcatalogReportForm = 'DataEntryEmailcatalogReportwin';
prototype.url = CONTEXTPATH + '/AccountingEmailMaintenanceForm';
prototype.widthWindow = 1200;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.sales.AccountingEmailMaintenanceForm.AccountingEmailMaintenanceForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AccountingEmailMaintenanceForm',

    requires: [
        'Ext.Praxis.controller.sales.AccountingEmailMaintenanceForm.AccountingEmailMaintenanceFormController',
        'Ext.Praxis.view.sales.AccountingEmailMaintenanceForm.DataEntryAccountingEmailcatalogReport'
    ],

    controller: 'AccountingEmailMaintenanceFormController',

    id: prototype.idAccoEmailMain + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults: {
        border: false
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.idAccoEmailMain + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idAccoEmailMain + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items: [
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idAccoEmailMain + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idAccoEmailMain + '-lbl-currentPage',
                                        prototype.idAccoEmailMain + '-lbl-pageCount',
                                        prototype.idAccoEmailMain + '-lbl-total'
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idAccoEmailMain + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccoEmailMain + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccoEmailMain + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccoEmailMain + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAccoEmailMain + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idAccoEmailMain + '-contenedor-filters',
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding: '5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.idAccoEmailMain + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idAccoEmailMain + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAccoEmailMain + '-CmbModule',
                                            fieldLabel: 'Module',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 180,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 180
                                            },
                                            listeners: {
                                                afterrender: 'onCmbAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAccoEmailMain + '-CmbType',
                                            fieldLabel: 'Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccoEmailMain + '-txtEmail',
                                            width: 250,
                                            labelWidth: 40,
                                            enableKeyEvents: true,
                                            fieldLabel: 'Email',
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAccoEmailMain + '-txtLabl',
                                            width: 200,
                                            labelWidth: 40,
                                            enableKeyEvents: true,
                                            fieldLabel: 'Label',
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAccoEmailMain + '-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbAfterRender'
                                            }
                                        }
                                    ]
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
                    border: true,
                    bodyStyle: 'background-color: #E3EAF9;',
                    autoScroll: true,
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idAccoEmailMain + '-grid',
                            columnLines: true,
                            width: 1155,
                            height: 520,
                            columns: {
                                items: [
                                    {text: 'Module', dataIndex: 'A4306MODUL', align: 'center', width: 75},
                                    {text: 'Type', dataIndex: 'A4306TYPE', align: 'center', width: 75},
                                    {text: 'Email', dataIndex: 'A4306CORER', width: 370, align: 'left', renderer: 'onRendererColumn'},
                                    {text: 'Status', dataIndex: 'A4306FLAG', width: 120, renderer: 'onRendererColumnStatus'},
                                    {text: 'Label', dataIndex: 'A4306LABL', align: 'center', width: 200},
                                    {text: 'Property', dataIndex: 'A4306PROP', align: 'center', width: 200},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detail',
                                                handler: 'onEditActionColumnClick'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idAccoEmailMain + '-pagginator-legend',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.idAccoEmailMain + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idAccoEmailMain + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idAccoEmailMain + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

