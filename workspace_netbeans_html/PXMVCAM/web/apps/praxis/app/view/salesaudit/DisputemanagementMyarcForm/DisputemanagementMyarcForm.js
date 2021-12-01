
prototype.idDisputemanageMyarcDisputemanageMyarc = 'DisputemanagementMyarcForm';
prototype.url = CONTEXTPATH + '/DisputemanagementMyarcForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DisputemanagementMyarcForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.DisputemanagementMyarcForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DisputemanagementMyarcFormController',
    ],

    controller: 'DisputemanagementMyarcFormController',

    id: prototype.idDisputemanageMyarcDisputemanageMyarc + '-Contenedor',

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
            id: prototype.idDisputemanageMyarc + '-contenedor-form',
            width: prototype.widthContenedor,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idDisputemanageMyarc + '-contenedor-options',
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
                                    id: prototype.idDisputemanageMyarc + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idDisputemanageMyarc + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idDisputemanageMyarc + '-lbl-currentPage',
                                        prototype.idDisputemanageMyarc + '-lbl-pageCount',
                                        prototype.idDisputemanageMyarc + '-lbl-total'
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
                                    id: prototype.idDisputemanageMyarc + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDisputemanageMyarc + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDisputemanageMyarc + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idDisputemanageMyarc + '-btn-clear',
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
                    id: prototype.idDisputemanageMyarc + '-contenedor-filters',
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
                            id: prototype.idDisputemanageMyarc + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idDisputemanageMyarc + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.idDisputemanageMyarc + '-search-type',
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
                                                select: 'onCmbSearchSelect'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idDisputemanageMyarc + '-txtFilterDateFrom', hidden: true,
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idDisputemanageMyarc + '-txtFilterDateTo', hidden: true,
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-iata', hidden: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-ComboOrigin', hidden: true,
                                            fieldLabel: 'Origin',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbOriginAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-ComboArea', hidden: true,
                                            fieldLabel: 'Area',
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
                                                afterrender: 'onCmbAreaAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-nmemo', hidden: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        }                                        


                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idDisputemanageMyarc + '-box-filter-02', hidden: true,
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-ComboSource',
                                            fieldLabel: 'Source',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSourceAfterRender',
                                                select: 'onCmbSourceSelect'
                                            }
                                        }, {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-ComboChannel', hidden: true,
                                            fieldLabel: 'Channel',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 120
                                            },
                                            listeners: {
                                                afterrender: 'onCmbChannelAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-Currency',
                                            fieldLabel: 'Currency',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-TourCode',
                                            fieldLabel: 'Tour Code',
                                            maxLength: 15,
                                            enforceMaxLength: 15,
                                            labelWidth: 60,
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDisputemanageMyarc + '-Audit',
                                            fieldLabel: 'Audit',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            // readOnly: true,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idDisputemanageMyarc + '-cmbError',
                                            fieldLabel: 'Reasons',
                                            queryMode: 'local',
                                            displayField: 'A2548DESC1',
                                            valueField: 'A2548CODR1',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
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
                            id: prototype.idDisputemanageMyarc + '-gridData',
                            // flex: 1,
                            width: prototype.widthContenedor,
                            height: prototype.heightContenedor,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Memo <br> number', dataIndex: 'A2548NMEMO', align: 'center', width: 90},
                                    {text: 'Country', dataIndex: 'A2548PAIS', align: 'center', width: 60},
                                    {text: 'IATA', dataIndex: 'A2548IATA', align: 'center', width: 70},
                                    {text: 'Agency', dataIndex: 'AGENCY', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Currency', dataIndex: 'A2548MDA', width: 70, align: 'center'},
                                    {
                                        text: 'Fare', dataIndex: 'A2548NETO', width: 80, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {text: 'Source', dataIndex: 'A2548FTE', width: 55, align: 'center'},
                                    {text: 'Dispute <br> Date', dataIndex: 'A2548FDISP', align: 'center', width: 100},
                                    {text: 'System <br> Date', dataIndex: 'A2548FREGI', align: 'center', width: 70},
                                    {text: 'Audit', dataIndex: 'A2548REGIS', width: 90, align: 'right'},
                                    {text: 'Origin', dataIndex: 'A2548BASE', align: 'center', width: 80},
                                    {text: 'Area', dataIndex: 'A2548AREADES', align: 'center', width: 100},
                                    {
                                        text: 'Status', dataIndex: 'A2548FLAG', flex: 1, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var backgroundColor =
                                                    data.A2548FLAG === 'A' ? "#99FFCC" :
                                                    (data.A2548FLAG === 'U') ? "#0099FF" :
                                                    (data.A2548FLAG === 'X') ? "#FF0000" :
                                                    (data.A2548FLAG === 'C') ? "#D329E8" :
                                                    (data.A2548FLAG === 'P') ? "#14C92F" :
                                                    (data.A2548FLAG === 'I') ? "#14C92F" :
                                                    (data.A2548FLAG === 'F') ? "#14C92F" :
                                                    (data.A2548FLAG === 'Z') ? "#F8D169" :
                                                    (data.A2548FLAG === 'R') ? "#F2A60D" :
                                                    (data.A2548FLAG === 'J') ? "#69D3F8" :
                                                    (data.A2548FLAG === 'D') ? "#FF9966" :
                                                    (data.A2548FLAG === 'E') ? "#E8400C" :
                                                    (data.A2548FLAG === 'W') ? "#A50C88" :
                                                    (data.A2548FLAG === 'B') ? "#CC9966" :
                                                    (data.A2548FLAG === 'Y') ? "#CCFF00" :
                                                    (data.A2548FLAG === 'N') ? "#FF0000" :
                                                    (data.A2548FLAG === 'O') ? "#B03A2E" :
                                                    (data.A2548FLAG === 'Q') ? "#DC7633" :
                                                    (data.A2548FLAG === 'L') ? "#B280CC" : "#FFFFFF";
                                            var fontWeight = (data.A2548FLAG === 'X' ? 'bold' : 'bold');
                                            metaData.style = "text-align:center;background-color:" + backgroundColor + ";font-weight:" + fontWeight + ";";
                                            var dat = "";
                                            if (data.A2548FLAG === "A")
                                                dat = "Approved";
                                            if (data.A2548FLAG === "U")
                                                dat = "Cleared Up";
                                            if (data.A2548FLAG === "X")
                                                dat = "Canceled";
                                            if (data.A2548FLAG === "C")
                                                dat = "Condoned";
                                            if (data.A2548FLAG === "I")
                                                dat = "Billed GDS";
                                            if (data.A2548FLAG === "P")
                                                dat = "Billed";
                                            if (data.A2548FLAG === "F")
                                                dat = "Accredited";
                                            if (data.A2548FLAG === "Z")
                                                dat = "Authorized";
                                            if (data.A2548FLAG === "N")
                                                dat = "Rejected";
                                            if (data.A2548FLAG === "R")
                                                dat = "Reaudited";
                                            if (data.A2548FLAG === "J")
                                                dat = "Justified";
                                            if (data.A2548FLAG === "D")
                                                dat = "Disputed";
                                            if (data.A2548FLAG === "E")
                                                dat = "Rejecte Disputed";
                                            if (data.A2548FLAG === "W")
                                                dat = "Approve Disputed";
                                            if (data.A2548FLAG === "B" && data.A2548TRNCU === 'ADMA')
                                                dat = "Adm na BSPlink/MM";
                                            if (data.A2548FLAG === "B" && data.A2548TRNCU !== 'ADMA')
                                                dat = "Acm na BSPlink/MM";
                                            if (data.A2548FLAG === "O")
                                                dat = "IATA Disabled";
                                            if (data.A2548FLAG === "Q")
                                                dat = "Unregistered Client";
                                            if (data.A2548FLAG === "L" && data.A2548TRNCU === 'ADMB')
                                                dat = "Adm BSPlink/MM";
                                            if (data.A2548FLAG === "L" && data.A2548TRNCU !== 'ADMB')
                                                dat = "Acm BSPlink/MM";
                                            if (data.A2548FLAG === "Y")
                                                dat = "Pending";
                                            return dat;
                                        }
                                    },
                                    {text: 'Days', dataIndex: 'A2548DIAS', width: 50, align: 'center'},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 40,
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
                                    /*{
                                     text: 'ADM<br>Tracing', dataIndex: '', width: 60, renderer: 'onRendererColumnOnLote'
                                     listeners: {
                                     click: 'searchDocumt'
                                     },
                                     renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                     var data = record.data;
                                     var src = ( data.A2548NMEMO!=='') ? 'resources/img/icon/16x16/search_docum.png' : '';
                                     return '<a href="#salesaudit-dispute-gestion-bsplink"><img src="'+src+'"></a>';
                                     }
                                     }*/



                                ]
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
                                    id: prototype.idDisputemanageMyarc + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idDisputemanageMyarc + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idDisputemanageMyarc + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    text: 'Total ADMs',
                                    width: 80
                                },
                                {
                                    id: prototype.idDisputemanageMyarc + '-lblRowsTotalADM',
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



