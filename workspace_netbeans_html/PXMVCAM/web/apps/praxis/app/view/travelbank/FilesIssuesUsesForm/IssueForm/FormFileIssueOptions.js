Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssueOptions', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id02 + '-formFileIssueOptions',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end',
        padding: 2
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.id02+'-boxPaginacion',
            hidden: false,
            width: 100,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    cls: 'x-toolbar-pag',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btn-pag-first',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page',
                            listeners: {
                                click: 'pagFirst'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page',
                            listeners: {
                                click: 'pagPrevious'
                            }

                        },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page',
                            listeners: {
                                click: 'pagNext'
                            }

                        },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page',
                            listeners: {
                                click: 'pagLast'
                            }
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id02 + '-paggin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                    ]
                }
            ]
        },
        {xtype: 'tbspacer', width: 20},
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'btnFilter_click'
                            }
                        },
                        {
                            xtype: 'button', hidden:true, /* por ahora NO */
                            id: prototype.id02 + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'btnExcel_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'btnClear_click'
                            }
                        },
                        {
                            xtype: 'button', disabled:true,
                            id: prototype.id02 + '-btnAdd',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New',
                            listeners: {
                                click: 'btnAdd_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'btnBack_click'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});