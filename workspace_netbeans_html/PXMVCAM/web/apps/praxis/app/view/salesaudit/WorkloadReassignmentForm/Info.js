Ext.define('Ext.Praxis.view.salesaudit.WorkloadReassignmentForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 900,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 480,
                            width: 900,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [

                                // ── GRID PRINCIPAL ──────────────────────────────
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    columnLines: true,
                                    autoScroll: true,
                                    width: 900,
                                    height: 480,
                                    features: [{ ftype: 'grouping', startCollapsed: true }],
                                    columns: {
                                        items: [
                                            {
                                                text: 'Processing Date',
                                                dataIndex: 'A1672FPROC',
                                                width: 150,
                                                renderer: 'OnColumnAuditorRenderer'
                                            },
                                            {
                                                text: 'Source',
                                                dataIndex: 'A1672FUENT',
                                                width: 80
                                            },
                                            {
                                                text: 'Pending',
                                                align: 'center',
                                                columns: [
                                                    { text: 'Match', dataIndex: 'PEDINMACH', width: 100, align: 'center' },
                                                    { text: 'ADM', dataIndex: 'PEDINADM', width: 100, align: 'center' },
                                                    { text: 'ACM', dataIndex: 'PEDINACM', width: 100, align: 'center' },
                                                    { text: 'Error', dataIndex: 'PEDINERROR', width: 100, align: 'cente' }
                                                ]
                                            },
                                            {
                                                text: 'Processing',
                                                dataIndex: 'PROCE',
                                                flex: 1,
                                                align: 'center',
                                                summaryType: 'sum'
                                            },
                                            {
                                                text: 'Total',
                                                width: 100,
                                                align: 'center',
                                                renderer: 'OnColumnTotalRenderer'
                                            }
                                        ],
                                        defaults: {
                                            sortable: true,
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    },
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                },

                                // ── GRID DETALLE ─────────────────────────────────
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDETALLE',
                                    hidden: true,
                                    columnLines: true,
                                    autoScroll: true,
                                    width: 850,
                                    height: 480,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            sortable: true,
                                            menuDisabled: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Auditor',
                                                dataIndex: 'A1672UASIG',
                                                width: 120,
                                                summaryRenderer: function () {
                                                    return '<b>TOTAL</b>';
                                                }
                                            },
                                            {
                                                text: 'Processing Date',
                                                dataIndex: 'A1672FPROC',
                                                width: 130
                                            },
                                            {
                                                text: 'Source',
                                                dataIndex: 'A1672FUENT',
                                                width: 80
                                            },
                                            {
                                                text: 'Pending',
                                                align: 'center',
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        dataIndex: 'PEDINMACH',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'ADM',
                                                        dataIndex: 'PEDINADM',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'ACM',
                                                        dataIndex: 'PEDINACM',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Error',
                                                        dataIndex: 'PEDINERROR',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Processing',
                                                dataIndex: 'PROCE',
                                                width: 95,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value) {
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total',
                                                dataIndex: 'TOTAL',
                                                width: 100,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: function (value) {
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value) {
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    viewConfig: {
                                        trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                }
                            ]
                        },

                        // ── LEYENDA PAGE / TOTAL
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pagginator-legend',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 900,
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
                                        { text: 'Page', width: 50 },
                                        { id: prototype.id + '-lbl-currentPage', text: '1', width: 50 },
                                        { text: 'Of', width: 50 },
                                        { id: prototype.id + '-lbl-pageCount', text: '0', width: 50 },
                                        { xtype: 'tbspacer', width: 100 },
                                        { text: 'Total found', width: 80 },
                                        { id: prototype.id + '-lbl-total', text: '0', width: 50 }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
});