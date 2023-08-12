
prototype.id0425downloadForm = '0425downloadForm';
prototype.url = CONTEXTPATH + '/0425downloadForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.0425downloadForm.0425downloadForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.0425downloadForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.0425downloadForm.download0425FormController',
    ],

    controller: 'download0425FormController',

    id: prototype.id0425downloadForm + '-Contenedor',

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
            id: prototype.id0425downloadForm + '-contenedor-form',
            width: prototype.widthContenedor,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id0425downloadForm + '-contenedor-options',
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
                                    id: prototype.id0425downloadForm + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.id0425downloadForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.id0425downloadForm + '-lbl-currentPage',
                                        prototype.id0425downloadForm + '-lbl-pageCount',
                                        prototype.id0425downloadForm + '-lbl-total'
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
                                    id: prototype.id0425downloadForm + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id0425downloadForm + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id0425downloadForm + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id0425downloadForm + '-Save_refresh',
                                    icon: 'resources/img/icon/16x16/Save_refresh-16.png',
                                    tooltip: 'Change massive from approved states to ASR source',
                                    listeners: {
                                        click: 'img_clickHandler_save'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id0425downloadForm + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Change massive states',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id0425downloadForm + '-btn-clear',
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
                    id: prototype.id0425downloadForm + '-contenedor-filters',
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
                            id: prototype.id0425downloadForm + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id0425downloadForm + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id0425downloadForm + '-txtIATA',
                                            width: 100,
                                            fieldLabel: 'Iata',
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id0425downloadForm + '-txtFilterDateFrom',
                                            fieldLabel: 'Date From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id0425downloadForm + '-txtFilterDateTo',
                                            fieldLabel: 'Date To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'button',
                                            text: 'Processing Data',
                                            id: prototype.id0425downloadForm + '-btn-processingdata',
                                            iconCls: 'prx-icon-processing',
                                            tooltip: 'Processing Data',
                                            listeners: {
                                                click: 'Processing_clickHandler'
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
                            id: prototype.id0425downloadForm + '-gridData',
                            width: 1390,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'A2558TIKET', width: 100},
                                    {text: 'Source', dataIndex: 'A2558FUENT', width: 60},
                                    {text: 'Channel', dataIndex: 'A2558SFUEN', width: 60},
                                    {text: 'Transaction', dataIndex: 'A2558TRNCU', width: 80},
                                    {text: 'IATA', dataIndex: 'A2558AGTIA', width: 70},
                                    {text: 'Agency', dataIndex: 'A2558AGENT', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Itinerary', dataIndex: 'ITINERARIO', width: 40, renderer: 'onRendererColumnAttr'},
                                    {text: 'Farebasis 1', dataIndex: 'A2558FBRI1', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Farebasis 2', dataIndex: 'A2558FBRI2', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Farebasis 3', dataIndex: 'A2558FBRI3', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Farebasis 4', dataIndex: 'A2558FBRI4', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Class 1', dataIndex: 'A2558CLAS1', width: 40},
                                    {text: 'FOP', dataIndex: 'A2558CFOP', width: 40},
                                    {text: 'Card Type', dataIndex: 'A2558TTARJ', width: 40},
                                    {text: 'Card number', dataIndex: 'A2558NREF', width: 40},
                                    {text: 'Pax', dataIndex: 'A2558PAX', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Pax Type', dataIndex: 'A2558TPAX', width: 50, renderer: 'onRendererColumnAttr'},
                                    {text: 'Sale<br>Date', dataIndex: 'A2558FVTA', width: 90},
                                    {text: 'Cur.', dataIndex: 'A2558MDA', width: 40},
                                    {text: 'Rate', dataIndex: 'A2558TRIFA', width: 40},
                                    {text: 'Tot. Commi.', dataIndex: 'A2558TTCOM', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Total Tax', dataIndex: 'A2558TTAX', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Sale <br> Country', dataIndex: 'A2558PVTA', width: 40},
                                    {text: 'FCMI', dataIndex: 'A2558ARPI', width: 40},
                                    {text: 'PNR', dataIndex: 'A2558PNR', width: 40}
                                    //

                                ], listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id0425downloadForm + '-pagginator-legend',
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
                                    id: prototype.id0425downloadForm + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id0425downloadForm + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id0425downloadForm + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    text: 'Total ADMs',
                                    width: 80
                                },
                                {
                                    id: prototype.id0425downloadForm + '-lblRowsTotalADM',
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

