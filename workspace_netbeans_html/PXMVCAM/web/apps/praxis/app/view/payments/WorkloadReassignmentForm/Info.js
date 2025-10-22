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
                                    features: [{ftype: 'grouping', startCollapsed: true}],
                                    width: 700,
                                    height: 480,
                                    columns: {
                                        items: [
                                            {
                                                text: 'Processing Date',
                                                dataIndex: 'PRDA1',
                                                width: 200,
                                                renderer: 'OnColumnAuditorRenderer'
                                            },
                                            {
                                                text: 'Auditor',
                                                dataIndex: 'AUASI',
                                                width: 80,
                                                align: 'left'
                                            },
                                            {
                                                text: 'Procesador',
                                                dataIndex: 'PROCTYPESQ1',
                                                width: 100,
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
                                                text: 'Processed',
                                                dataIndex: 'PROCE',
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
                                    width: 1000,
                                    height: 480,
                                    selModel: {
                                        selType: 'checkboxmodel',
                                        listeners: {
                                            beforeselect: function (grid, record, index, eOpts, metaData) {
                                                if (!record.get('CHK')) {
                                                    return false;
                                                } else {
                                                    return true;
                                                }


                                            }
                                        }

                                    },
                                    columns: {
                                        items: [
                                            {
                                                text: 'Auditor',
                                                dataIndex: 'AUASI1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Processing Date',
                                                dataIndex: 'PRDA1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Sales Date',
                                                dataIndex: 'SDATE1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Card Number',
                                                dataIndex: 'SCARDN1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Autho',
                                                dataIndex: 'SAUTHOC1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Ticket',
                                                dataIndex: 'TICKET1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Country',
                                                dataIndex: 'SCOUNTRY1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Status',
                                                dataIndex: 'STVAL1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Procesador',
                                                dataIndex: 'PROCTYPE1',
                                                flex: 1
                                            },
                                            {
                                                text: 'Merchant ID',
                                                dataIndex: 'PMERCHID1',
                                                flex: 1
                                            }
                                        ],
                                        defaults: {
                                            sortable: true,
                                            menuDisabled: true,
                                            align: 'center'
                                        }
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
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            id: prototype.id + '-lblRowsTotalADM',
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


