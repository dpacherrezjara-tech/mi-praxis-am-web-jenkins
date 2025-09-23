/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
prototype.idAmdsControl = 'AmdsControlForm';
prototype.widthContenedor = 1395;
prototype.heightContenedor = 605;
prototype.url = CONTEXTPATH + '/AmdsControlForm';


Ext.define('Ext.Praxis.view.payments.AmdsControlForm.AmdsControlForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AmdsControlForm',

    requires: [
        'Ext.Praxis.controller.payments.AmdsControlForm.AmdsControlFormController'
    ],

    controller: 'AmdsControlFormController',

    id: prototype.idAmdsControl + '-Contenedor',

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

    /*listeners: {
     beforeShow: 'OnBeforeShow'
     },
     */
    items: [
        {
            xtype: 'panel',
            id: prototype.idAmdsControl + '-contenedor-form',
            width: prototype.widthContenedor,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idAmdsControl + '-contenedor-options',
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
                                    id: prototype.idAmdsControl + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idAmdsControl + '-lbl-currentPage',
                                        prototype.idAmdsControl + '-lbl-pageCount',
                                        prototype.idAmdsControl + '-lbl-total'
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
                                    id: prototype.idAmdsControl + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAmdsControl + '-Save_refresh',
                                    icon: 'resources/img/icon/16x16/Save_refresh-16.png',
                                    tooltip: 'Verifica y cambia a Pending los estados Agency Disabled, Unregistered Client y Unregistered E-mail',
                                    listeners: {
                                        click: 'img_clickHandler_save'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAmdsControl + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Esta acción actualiza el estado a Aprobado, permitiendo su ejecución en el proceso de ADMs.',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAmdsControl + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAmdsControl + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idAmdsControl + '-btn-clear',
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
                    id: prototype.idAmdsControl + '-contenedor-filters',
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
                            id: prototype.idAmdsControl + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idAmdsControl + '-box-filter-01',
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
                                            id: prototype.idAmdsControl + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
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
                                            id: prototype.idAmdsControl + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idAmdsControl + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-txtCia',
                                            hideLabel: true,
                                            width: 35,
                                            maskRe: /[0-9]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            value: '139',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-txtFrmaSerie',
                                            hideLabel: true,
                                            width: 80,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-txtSeq',
                                            hideLabel: true,
                                            width: 30,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-txtNumber',
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
                                            id: prototype.idAmdsControl + '-txtIATA',
                                            fieldLabel: 'Agency',
                                            width: 140,
                                            labelWidth: 50,
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
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-country',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            hidden: true,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAmdsControl + '-CmbStatus',
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
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idAmdsControl + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    hidden: true,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAmdsControl + '-ComboSource',
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
                                                select: 'onCmbSourceSelect',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idAmdsControl + '-ComboChannel', hidden: true,
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
                                                afterrender: 'onCmbChannelAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-txtPNR',
                                            fieldLabel: 'PNR',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 6,
                                            enforceMaxLength: 6,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idAmdsControl + '-txtEPR',
                                            fieldLabel: 'EPR',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 6,
                                            enforceMaxLength: 6,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey'
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
                    id: prototype.idAmdsControl + '-campo_cantidad',
                    layout: 'hbox',
                    border: false,
                    hidden: true,
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {xtype: 'tbspacer', width: 130},
                        {
                            xtype: 'panel',
                            width: 160,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Currency: ',
                                            style: 'font-weight:bold;',
                                            width: 76
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.idAmdsControl + '-lblCurrency1',
                                            text: '',
                                            style: 'font-weight:bold;',
                                            width: 63
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
                            id: prototype.idAmdsControl + '-gridData',
                            width: 1390,
                            height: 480,
                            columnLines: true,
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {

                                        if (Ext.String.trim(record.get('A4497FLAG')) !== 'M' || Ext.String.trim(record.get('A4497FLAG')) !== 'A' || Ext.String.trim(record.get('A2548FLAG')) !== 'X') {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                }

                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'A4497TKT', width: 100},
                                    {text: 'Memo<br>Number', dataIndex: 'A4497NMEMO', width: 80},
                                    {text: 'System<br>Date', dataIndex: 'A4497FREGI', width: 70},
                                    {text: 'Sale<br>Date', dataIndex: 'A4497FVTA', width: 70},
                                    {text: 'Settlement<br>Date', dataIndex: 'A4497PRDA', width: 70},
                                    {text: 'Country', dataIndex: 'A4497PAIS', width: 60},
                                    {text: 'Cur.', dataIndex: 'A4497MDA', width: 40},
                                    {text: 'Amount', dataIndex: 'A4497NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Agency', dataIndex: 'A4497IATA', width: 70},
                                    {text: 'Agency Name', dataIndex: 'AGENCY', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Source', dataIndex: 'A4497FTE', width: 60},
                                    {text: 'Channel', dataIndex: 'A4497CANAL', width: 60},
                                    {text: 'Transaction', dataIndex: 'A4497TRNCU', width: 80},
                                    {text: 'Status', dataIndex: 'A4497FLAG', width: 130, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'PNR', dataIndex: 'A4497PNR', width: 90},
                                    {text: 'EPR', dataIndex: 'A4497EPR', width: 90}

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
                    id: prototype.idAmdsControl + '-pagginator-legend',
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
                                    id: prototype.idAmdsControl + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idAmdsControl + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idAmdsControl + '-lbl-total',
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

