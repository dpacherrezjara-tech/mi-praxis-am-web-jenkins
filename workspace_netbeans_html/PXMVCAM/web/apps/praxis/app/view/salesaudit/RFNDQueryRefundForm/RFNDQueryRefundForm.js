
prototype.idRFNDQueryRefundForm = 'RFNDQueryRefundForm';
prototype.idARCDetailTicket = 'ARCRFNDAssociatedTicketForm';
prototype.idRFNDARCFormRazones = 'FNDARCFormRazones',
prototype.url2 = CONTEXTPATH + '/RFNDAssociatedARCRFNDForm';
prototype.url = CONTEXTPATH + '/RFNDQueryRefundForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.RFNDQueryRefundForm.RFNDQueryRefundForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RFNDQueryRefundForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQueryRefundForm.RFNDQueryRefundFormController',
        'Ext.Praxis.view.salesaudit.RFNDAssociatedARCRFNDForm.ARCRFNDAssociatedTicketForm'
    ],

    controller: 'RFNDQueryRefundFormController',

    id: prototype.idRFNDQueryRefundForm + '-Contenedor',

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

    items: [{
            xtype: 'panel',
            id: prototype.idRFNDQueryRefundForm + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRFNDQueryRefundForm + '-contenedor-options',
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
                                    id: prototype.idRFNDQueryRefundForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idRFNDQueryRefundForm + '-lbl-currentPage',
                                        prototype.idRFNDQueryRefundForm + '-lbl-pageCount',
                                        prototype.idRFNDQueryRefundForm + '-lbl-total'
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
                                    id: prototype.idRFNDQueryRefundForm + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnFilter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: 'onFilterClick'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnExcel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnClear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'btnClear_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnBack',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
                                    listeners: 'onClearClick'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idRFNDQueryRefundForm + '-contenedor-filters',
                    border: false,
                    defaults: {
                        bodyStyle: 'background-color: #E3EAF9;',
                        border: true,
                        style: 'margin: 2px',
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            defaults: {
                                style: 'margin: 1px',
                                bodyStyle: 'background: transparent',
                                padding: '5px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Select by:',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    style: 'color:red;font-size:13px;',
                                    padding: '10 5 5 5',
                                    text: '(*)',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    //fieldLabel: 'Search Type',
                                    id: prototype.idRFNDQueryRefundForm + '-search-type',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: '[SELECTED]',
                                    //labelWidth: 75,
                                    labelClsExtra: 'prx-label-search',
                                    width: 120,
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
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    style: 'margin-left: 2px',
                                    defaults: {
                                        style: 'margin: 2px'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRFNDQueryRefundForm + '-txtFilterDateFrom',
                                            format: 'Y/m/d',
                                            fieldLabel: 'From:',
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRFNDQueryRefundForm + '-txtFilterDateTo',
                                            format: 'Y/m/d',
                                            fieldLabel: 'To:',
                                            labelWidth: 30,
                                            labelAlign: 'right',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            width: 125,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQueryRefundForm + '-txtCia',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            width: 35,
                                            value: '139',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQueryRefundForm + '-txtFrmaSerie',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            width: 80,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQueryRefundForm + '-txtFrmaFolio',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 30,
                                            enforceMaxLength: 30,
                                            width: 90,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQueryRefundForm + '-txtIATA',
                                            width: 140,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
                                            fieldLabel: 'IATA',
                                            labelWidth: 40,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQueryRefundForm + '-CmbStatus',
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
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQueryRefundForm + '-CmbStatusBPO',
                                            fieldLabel: 'BPO',
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
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                         {
                                            xtype: 'combo',
                                             id: prototype.idRFNDQueryRefundForm + '-txtUser',
                                            fieldLabel: 'Auditor',
                                            queryMode: 'local',
                                            displayField: 'A4359USER',
                                            valueField: 'A4359USER',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig:{
                                                minWidth: 200
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
                    border: false,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idRFNDQueryRefundForm + '-gridCabe',
                            columnLines: true,
                            autoScroll: true,
                            height: 250,
                            features: [{
                                    ftype: 'groupingsummary',
                                    groupHeaderTpl: '{name}',
                                    hideGroupedHeader: false,
                                    enableGroupingMenu: false
                                }, {
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Folio', dataIndex: 'A4361FOLIO', width: 150, align: 'center', renderer: 'onRendererColumnOnPreme'},
                                    {text: 'System <br> date', dataIndex: 'A4361FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Auditor', dataIndex: 'A4361REGAS', width: 100},
                                    {text: 'Ticket Qty',
                                        columns: [
                                            {text: 'Request',
                                                columns: [
                                                    {
                                                        text: 'Pend',
                                                        dataIndex: 'CANTPE',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Aut',
                                                        dataIndex: 'CANTOK',
                                                        width: 70,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Reje',
                                                        dataIndex: 'CANTKO',
                                                        width: 70,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALCANT',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }
                                                ]
                                            }
                                        ]


                                    },
                                    {text: 'Ticket Amount',
                                        columns: [
                                            {text: 'Request',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'SUMAOK',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    }
                                                ]
                                            }

                                        ]


                                    },
                                    {
                                        text: 'Days',
                                        dataIndex: 'A4361DIAS',
                                        width: 45
                                    },
                                    //{text: 'Status', dataIndex: 'A4076FLAG', width: 200, renderer: 'onRendererColumnStatuscab'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnCab'}

                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            iid: prototype.idRFNDQueryRefundForm + '-pagginator-legend',
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
                                            id: prototype.idRFNDQueryRefundForm + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.idRFNDQueryRefundForm + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.idRFNDQueryRefundForm + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRFNDQueryRefundForm + '-panelFilter1',
                                    hidden: true,
                                    width: 500, border: false,
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQueryRefundForm + '-de-cmbOptionTKT',
                                            margin: '5 0 5 0',
                                            fieldLabel: 'Search By',
                                            width: 180,
                                            labelWidth: 70,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onChangeComboTkt'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '5 0 5 5',
                                            id: prototype.idRFNDQueryRefundForm + '-de-txtTKT',
                                            //hidden: true,
                                            fieldLabel: '',
                                            width: 110,
                                            labelWidth: 10,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            //padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '5 0 5 5',
                                            id: prototype.idRFNDQueryRefundForm + '-de-txtIata',
                                            hidden: true,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 10,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            //padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', hidden: true, id: prototype.idRFNDQueryRefundForm + '-tbspacer1', width: 600},
                                {xtype: 'tbspacer', id: prototype.idRFNDQueryRefundForm + '-tbspacer2', width: 1100},
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnSearch1',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onClickBtnSearch'
                                    }

                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnFilter1',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: {
                                        click: 'onClickBtnFilter'
                                    }
                                }, /*{
                                 xtype: 'button',
                                 id: prototype.idRFNDQueryRefundForm + '-Save_List',
                                 icon: 'resources/img/icon/16x16/task-save.png',
                                 tooltip: 'Process Change massive states',
                                 listeners: {
                                 click: 'img_clickHandler_save_List'
                                 }
                                 },*/ {
                                    xtype: 'button',
                                    id: prototype.idRFNDQueryRefundForm + '-btnExcel2',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick2'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid', title: 'TICKET DETAIL',
                            id: prototype.idRFNDQueryRefundForm + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            height: 350,

                            columns: {
                                items: [
                                    {text: 'System<br>Date', dataIndex: 'A4363FREGI', width: 70},
                                    {text: 'Issue<br>Date', dataIndex: 'A4363FEVTA', width: 70},
                                    {text: 'Ticket', dataIndex: 'A4363TICKET', width: 120},
                                    {text: 'CPN', dataIndex: 'A4363XCPN', width: 40},
                                    {text: 'Country', dataIndex: 'A4363SPVTA', width: 60},
                                    {text: 'IATA <br> Requested', dataIndex: 'A4361IATA', width: 80},
                                    {text: 'IATA <br> Issued', dataIndex: 'A4363SIATA', width: 65},
                                    //{text: 'Agency', dataIndex: 'AA4363AGENCY', width: 275, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'Transc.', dataIndex: 'A4363STRCU', width: 80},
                                    {text: 'Tdoc', dataIndex: 'A4363STDOC', width: 80},
                                    {text: 'Cur.', dataIndex: 'A4363MDAPG', width: 40},
                                    {text: 'Fare', dataIndex: 'A4363TARID', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Tax', dataIndex: 'A4363TTAXD', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Commi.', dataIndex: 'A4363COMID', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>RFND', dataIndex: 'A4363TOTAD', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>Praxis', dataIndex: 'A4363STOTL', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>XML', dataIndex: 'A4363XTOTL', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Req. Reason', dataIndex: 'A4362ERROR', width: 100, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'Status Audit', dataIndex: 'A4363STATO', width: 200, align: 'left'},
                                    {text: 'Status', dataIndex: 'A4363FLAG', width: 200, renderer: 'onRendererColumnStatus'},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnTime'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detail',
                                                handler: 'onDetailClick'
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
                        },
                        {
                            xtype: 'panel',
                            iid: prototype.idRFNDQueryRefundForm + '-pagginator-legend2',
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
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.idRFNDQueryRefundForm + '-lbl-total2',
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
        }]
});



