
prototype.idRfndarcUser = 'RfndarcUserMaintenanceForm';
prototype.idDataEntryARCUserMain = 'DataEntryARCUserMaintenance';
prototype.url = CONTEXTPATH + '/RfndarcUserMaintenanceForm';
prototype.widthWindow = 1000;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.RfndarcUserMaintenanceForm.RfndarcUserMaintenanceForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RfndarcUserMaintenanceForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RfndarcUserMaintenanceForm.RfndarcUserMaintenanceFormController',
        'Ext.Praxis.view.salesaudit.RfndarcUserMaintenanceForm.DataEntryARCUserMaintenance'
    ],

    controller: 'RfndarcUserMaintenanceFormController',

    id: prototype.idRfndarcUser + '-Contenedor',

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
            id: prototype.idRfndarcUser + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRfndarcUser + '-contenedor-options',
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
                                    xtype: 'checkbox',
                                    id: prototype.idRfndarcUser + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idRfndarcUser + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idRfndarcUser + '-lbl-currentPage',
                                        prototype.idRfndarcUser + '-lbl-pageCount',
                                        prototype.idRfndarcUser + '-lbl-total'
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
                                    id: prototype.idRfndarcUser + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRfndarcUser + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRfndarcUser + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRfndarcUser + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRfndarcUser + '-btn-clear',
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
                    id: prototype.idRfndarcUser + '-contenedor-filters',
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
                            id: prototype.idRfndarcUser + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRfndarcUser + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.idRfndarcUser + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 275,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRfndarcUser + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRfndarcUser + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRfndarcUser + '-cmbCountry',
                                            fieldLabel: 'Country',
                                            labelWidth: 50,
                                            width: 110
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idRfndarcUser + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    hidden: false,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRfndarcUser + '-txtUser',
                                            fieldLabel: 'Auditor',
                                            queryMode: 'local',
                                            displayField: 'A4359USER',
                                            valueField: 'A4359USER',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRfndarcUser + '-CmbStatus',
                                            fieldLabel: 'Status',
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
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
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
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idRfndarcUser + '-gridCalendarBSP',
                            columnLines: true,
                            autoScroll: true,
                            features: [{ftype: 'grouping', startCollapsed: true}],
                            width: 800,
                            height: 480,
                            columns: {
                                items: [
                                    {text: 'Auditor', dataIndex: 'A4359USER', flex: 1},
                                    {text: 'Country', dataIndex: 'A4359PAIS', flex: 1},
                                    {text: 'System date', dataIndex: 'A4359FREGI', flex: 1},
                                    {text: 'Date efective', dataIndex: 'A4359FALTA', flex: 1},
                                    {text: 'Date discontinuity', dataIndex: 'A4359FBAJA', flex: 1},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Detail',
                                                handler: 'onEditActionColumnClick',
                                                isActionDisabled: 'OnEditActionDisabled'
                                            }
                                        ]
                                    },
                                    {
                                        text: '',
                                        dataIndex: 'A3406FLAG',
                                        width: 30,
                                        renderer: 'OnColumnStatusRenderer'
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
                    id: prototype.idRfndarcUser + '-pagginator-legend',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    hidden: false,
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
                                    id: prototype.idRfndarcUser + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idRfndarcUser + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idRfndarcUser + '-lbl-total',
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

