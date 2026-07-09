
Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.WaiverRecordForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-recordForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.Waiver.WaiverRecordController',
        'Ext.Praxis.view.widgets.StoreProcGrid'
    ],
    controller: 'WaiverRecordController',
    title: 'Waiver',
    header: false,
    height: 780,
    width: 980,
    resizable: true,
    layout: 'border',
    modal: true,
    border: false,
    listeners: {
        afterrender: 'afterRender'
    },
    items: [
        // ── Header bar ──────────────────────────────────────────────────────
        {
            xtype: 'panel',
            region: 'north',
            height: 52,
            border: false,
            bodyStyle: 'background:#1f2d3d; padding:0 18px;',
            layout: { type: 'hbox', align: 'middle' },
            items: [
                {
                    xtype: 'component',
                    html: '<span style="color:#fff;font-size:15px;font-weight:600;letter-spacing:.3px;">Waiver Detail</span>'
                        + '<span id="' + prototype.id + '-rec-headerSub" style="color:#9fb3c8;font-size:12px;margin-left:12px;"></span>'
                },
                { xtype: 'component', flex: 1 },
                {
                    xtype: 'button',
                    text: 'Download Original File',
                    id: prototype.id + '-rec-btnDownload',
                    iconCls: 'prx-icon-download',
                    listeners: { click: 'onDownloadOriginalFile' }
                }
            ]
        },
        // ── Body ─────────────────────────────────────────────────────────────
        {
            xtype: 'form',
            region: 'center',
            autoScroll: true,
            border: false,
            bodyStyle: 'background:#eef1f5; padding:12px;',
            fieldDefaults: {
                labelAlign: 'right',
                msgTarget: 'none'
            },
            defaults: {
                border: true,
                style: 'margin: 0 0 10px 0;',
                bodyStyle: 'background:#fff; padding:10px 12px;'
            },
            items: [
                // ── Case Information ───────────────────────────────────────
                {
                    xtype: 'fieldset',
                    title: 'Case Information',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '3 0'
                    },
                    items: [
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtNcaso', fieldLabel: 'Case No', labelWidth: 90, width: 210 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtEstad', fieldLabel: 'Status', labelWidth: 55, width: 230 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtNpax', fieldLabel: 'Pax', labelWidth: 35, width: 90 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtPcaso', fieldLabel: 'Name', labelWidth: 90, width: 850 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtTcaso', fieldLabel: 'Case Type', labelWidth: 90, width: 850 }
                            ]
                        }
                    ]
                },
                // ── Dates ─────────────────────────────────────────────────
                {
                    xtype: 'fieldset',
                    title: 'Dates',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '3 0'
                    },
                    items: [
                        {
                            items: [
                                { xtype: 'datefield', id: prototype.id + '-rec-dtFcrre', fieldLabel: 'Close Date', format: 'Ymd', labelWidth: 90, width: 210 },
                                { xtype: 'tbspacer', width: 12 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtHcrre', fieldLabel: 'Time', labelWidth: 40, width: 100 },
                                { xtype: 'tbspacer', width: 30 },
                                { xtype: 'datefield', id: prototype.id + '-rec-dtFveto', fieldLabel: 'Expiry Date', format: 'Ymd', labelWidth: 90, width: 210 },
                                { xtype: 'tbspacer', width: 12 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtHveto', fieldLabel: 'Time', labelWidth: 40, width: 100 }
                            ]
                        }
                    ]
                },
                // ── Reservation & Ticket ───────────────────────────────────
                {
                    xtype: 'fieldset',
                    title: 'Reservation & Ticket',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '3 0'
                    },
                    items: [
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtPnr', fieldLabel: 'PNR', labelWidth: 90, width: 190 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtIatae', fieldLabel: 'IATA', labelWidth: 45, width: 160 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtSeq', fieldLabel: 'Seq', labelWidth: 35, width: 130 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtCodit', fieldLabel: 'Reservation', labelWidth: 75, width: 210 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtTkts', fieldLabel: 'Tickets', labelWidth: 90, width: 850 }
                            ]
                        }
                    ]
                },
                // ── Financial ───────────────────────────────────────────────
                {
                    xtype: 'fieldset',
                    title: 'Financial',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '3 0'
                    },
                    items: [
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtAgene', fieldLabel: 'Agency', labelWidth: 90, width: 850 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtCcpto', fieldLabel: 'Concept', labelWidth: 90, width: 400 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtScpto', fieldLabel: 'Sub Concept', labelWidth: 90, width: 400 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtCurrw', fieldLabel: 'Currency', labelWidth: 90, width: 150 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtAmouw', fieldLabel: 'Amount', labelWidth: 60, width: 180, fieldStyle: 'text-align:right; font-weight:600;' }
                            ]
                        }
                    ]
                },
                // ── Flight Information ─────────────────────────────────────
                {
                    xtype: 'fieldset',
                    title: 'Flight Information',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '3 0'
                    },
                    items: [
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtEjecb', fieldLabel: 'Executive', labelWidth: 90, width: 850 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtNvlo', fieldLabel: 'Flight No', labelWidth: 90, width: 260 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtFvlo', fieldLabel: 'Date', labelWidth: 45, width: 320 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtHvlo', fieldLabel: 'Time', labelWidth: 45, width: 260 }
                            ]
                        }
                    ]
                },
                // ── Itinerary & Description ────────────────────────────────
                {
                    xtype: 'fieldset',
                    title: 'Itinerary & Description',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '3 0'
                    },
                    items: [
                        {
                            items: [
                                { xtype: 'textfield', id: prototype.id + '-rec-txtItin', fieldLabel: 'Itinerary', labelWidth: 90, width: 850 }
                            ]
                        },
                        {
                            items: [
                                { xtype: 'textarea', id: prototype.id + '-rec-txtDescr', fieldLabel: 'Description', labelWidth: 90, width: 850, height: 55 }
                            ]
                        }
                    ]
                },
                // ── Ticket Waivers (detalle, SQP06127 — no paginado) ───────
                {
                    xtype: 'fieldset',
                    title: 'Ticket Waivers',
                    layout: 'fit',
                    height: 250,
                    bodyStyle: 'background:#fff; padding:4px;',
                    items: [
                        {
                            xtype: 'storeprocgrid',
                            id: prototype.id + '-rec-detailGrid',
                            library: 'PXSAUDIT',
                            storeProcedure: 'SQP06127',
                            memoryPaging: true,
                            autoSearch: false,
                            showExcelButton: false,
                            showEmptyMsg: true,
                            border: false,
                            height: 210,
                            storeParams: {
                                IN_CCUST: '',
                                IN_SEQ: ''
                            },
                            gridColumns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    resizable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Ticket Number', dataIndex: 'A1672CIA', width: 180,
                                        renderer: function (value, meta, record) {
                                            var cia = (record.get('A1672CIA') || '').trim();
                                            var forma = (record.get('A1672FORMA') || '').trim();
                                            var serie = (record.get('A1672SERIE') || '').trim();
                                            return cia + forma + serie;
                                        }
                                    },
                                    { text: 'Issue Date', dataIndex: 'A1672FVENT', width: 110 },
                                    {
                                        text: 'Waiver Code', dataIndex: 'A1672CODWA', flex: 1,
                                        renderer: function (value) {
                                            var v = (value || '').trim();
                                            if (!v) {
                                                return '<span style="color:#aaa;">—</span>';
                                            }
                                            return '<span style="background:#e6f4ea;color:#1e7e34;border-radius:10px;padding:2px 10px;font-weight:600;">' + v + '</span>';
                                        }
                                    }
                                ]
                            }
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
            border: true,
            margin: '0',
            style: 'background:#1f2d3d; border-top:2px solid #33455a;',
            layout: { pack: 'center' },
            defaults: { scale: 'medium' },
            items: [
                {
                    text: 'Close',
                    id: prototype.id + '-rec-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: { click: 'onCancelClick' }
                }
            ]
        }
    ]
});
