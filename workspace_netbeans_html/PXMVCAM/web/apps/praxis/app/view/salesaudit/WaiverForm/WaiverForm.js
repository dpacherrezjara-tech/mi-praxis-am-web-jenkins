
prototype.id = 'WaiverForm';
prototype.url = CONTEXTPATH + '/Waiver';
prototype.width = 1400;
prototype.height = 600;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.WaiverForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.WaiverForm',
    requires: [
        'Ext.Praxis.view.salesaudit.WaiverForm.Options',
        'Ext.Praxis.view.salesaudit.WaiverForm.Filters',
        'Ext.Praxis.view.salesaudit.WaiverForm.WaiverRecordForm',
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.controller.salesaudit.Waiver.WaiverController',
        'Ext.Praxis.controller.salesaudit.Waiver.WaiverRecordController',
        'Ext.Praxis.controller.salesaudit.Waiver.WaiverGridController'
    ],
    controller: 'WaiverController',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: prototype.width,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.width,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            border: false,
                                            defaults: {
                                                width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-filters'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'storeprocgrid',
                                            id: prototype.id + '-mainGrid',
                                            library: 'PXSAUDIT',
                                            storeProcedure: 'SQP06125',
                                            width: prototype.width,
                                            height: prototype.height,
                                            pageSize: 20,
                                            autoSearch: false,
                                            storeParams: {
                                                IN_CCUST: '139',
                                                IN_FROM: Ext.Date.format(new Date(anioActual, mesActual, 1), 'Ymd'),
                                                IN_TO: Ext.Date.format(new Date(), 'Ymd'),
                                                IN_NCASO: '',
                                                IN_CODIT: '',
                                                IN_PNR: '',
                                                IN_TKT: ''
                                            },
                                            showExcelButton: true,
                                            excelTitle: 'Waivers',
                                            customController: 'Ext.Praxis.controller.salesaudit.Waiver.WaiverGridController',
                                            actionsFirst: true,
                                            rowActions: [
                                                { action: 'viewDetail', icon: 'prx-icon-detail', tooltip: 'Waiver Detail' }
                                            ],
                                            gridColumns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer',
                                                        width: 40
                                                    },
                                                    { text: 'Case', width: 90, dataIndex: 'A2537NCASO' },
                                                    {
                                                        text: 'Case Type', width: 200, dataIndex: 'A2537TCASO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            if (value && value.trim().length > 0) {
                                                                metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', width: 120, dataIndex: 'A2537ESTAD',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', width: 250, dataIndex: 'A2537PCASO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            if (value && value.trim().length > 0) {
                                                                metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'PNR', width: 75, dataIndex: 'A2537PNR' },
                                                    {
                                                        text: 'Ticket',
                                                        width: 220,
                                                        dataIndex: 'A2537TKTS',
                                                        renderer: function (value, metaData) {
                                                            if (!value) return '';
                                                            metaData.style = 'text-align:left';
                                                            var unique = value.trim().split(' ').filter(function (v, i, a) {
                                                                return v !== '' && a.indexOf(v) === i;
                                                            }).join(' ');
                                                            return unique;
                                                        }
                                                    },
                                                    { text: 'IT Code', width: 110, dataIndex: 'A2537CODIT' },
                                                    {
                                                        text: 'Itinerary', width: 250, dataIndex: 'A2537ITIN',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            if (value && value.trim().length > 0) {
                                                                metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Agency', width: 250, dataIndex: 'A2537AGENE',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            if (value && value.trim().length > 0) {
                                                                metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Concept', width: 200, dataIndex: 'A2537CCPTO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Sub Concept', width: 200, dataIndex: 'A2537SCPTO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Curr', width: 50, dataIndex: 'A2537CURRW' },
                                                    {
                                                        text: 'Amount', width: 65, dataIndex: 'A2537AMOUW',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:right';
                                                            return value ? value.trim() : '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', width: 200, dataIndex: 'A2537DESCR',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            if (value && value.trim().length > 0) {
                                                                metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Close<br>Time', width: 75, dataIndex: 'A2537HCRRE' },
                                                    { text: 'Expiry<br>Time', width: 75, dataIndex: 'A2537HVETO' },
                                                    {
                                                        text: 'Flight No', width: 180, dataIndex: 'A2537NVLO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flight Date', width: 200, dataIndex: 'A2537FVLO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flight Time', width: 150, dataIndex: 'A2537HVLO',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'IATA', width: 80, dataIndex: 'A2537IATAE' },
                                                    {
                                                        text: 'Executive', width: 250, dataIndex: 'A2537EJECB',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = 'text-align:left';
                                                            if (value && value.trim().length > 0) {
                                                                metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Pax', width: 50, dataIndex: 'A2537NPAX' }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
