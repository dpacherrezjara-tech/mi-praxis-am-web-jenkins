Ext.define('Ext.Praxis.view.payments.WorkloadReassignmentForm.Info', {
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
                width: 1200,
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
                            width: 1040,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    columnLines: true,
                                    autoScroll: true,
                                    width: 700,
                                    height: 480,
                                    columns: {
                                        items: [
                                            {
                                                text: 'Processing Date',
                                                dataIndex: 'PRDA1',
                                                width: 150,
                                                renderer: 'OnColumnAuditorRenderer'
                                            },
                                            {
                                                text: 'Procesador',
                                                dataIndex: 'DESCRI',
                                                width: 120,
                                                align: 'left'
                                            },
                                            {
                                                text: 'Pending',
                                                dataIndex: 'PEDIEN',
                                                width: 80,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: 'OnPendingColumnSummary'
                                            },
                                            {
                                                text: 'Stand By',
                                                dataIndex: 'STABY',
                                                width: 80,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: 'OnPendingColumnSummary'
                                            },
                                            //STABY 
                                            {
                                                text: 'Processed',
                                                dataIndex: 'PROCE',
                                                width: 150,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: 'OnProcessedColumnSummary'
                                            },
                                            {
                                                text: 'Total',
                                                dataIndex: 'TOTAL',
                                                width: 100,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: 'OnProcessedColumnSummary'
                                            }

                                        ],
                                        defaults: {
                                            sortable: true,
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    },
                                    viewConfig: {
                                        // trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDETALLE',
                                    columnLines: true,
                                    autoScroll: true,
                                    hidden: true,
                                    width: 900,
                                    height: 480,

                                    // 🔴 CLAVE: habilita summaries
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
                                                dataIndex: 'AUASI',
                                                flex: 1,
                                                summaryRenderer: function () {
                                                    return '<b>TOTAL</b>';
                                                }
                                            },
                                            {
                                                text: 'Processing Date',
                                                dataIndex: 'PRDA1',
                                                width: 150
                                            },
                                            {
                                                text: 'Procesador',
                                                dataIndex: 'DESCRI',
                                                width: 120,
                                                align: 'left'
                                            },
                                            {
                                                text: 'Pending',
                                                dataIndex: 'PEDIEN',
                                                width: 80,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value) {
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stand By',
                                                dataIndex: 'STABY',
                                                width: 80,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value) {
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Processed',
                                                dataIndex: 'PROCE',
                                                width: 100,
                                                align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value) {
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total',
                                                width: 100,
                                                align: 'right',

                                                // 🔹 Total por FILA
                                                renderer: function (value, meta, record) {
                                                    var total =
                                                            (record.get('PEDIEN') || 0) +
                                                            (record.get('STABY') || 0) +
                                                            (record.get('PROCE') || 0);

                                                    return Ext.util.Format.number(total, '0,000');
                                                },

                                                // 🔹 Total GENERAL (footer)
                                                summaryRenderer: function (value, summaryData) {
                                                    var total =
                                                            (summaryData.PEDIEN || 0) +
                                                            (summaryData.STABY || 0) +
                                                            (summaryData.PROCE || 0);

                                                    return Ext.util.Format.number(total, '0,000');
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pagginator-legend',
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
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
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
}
);


