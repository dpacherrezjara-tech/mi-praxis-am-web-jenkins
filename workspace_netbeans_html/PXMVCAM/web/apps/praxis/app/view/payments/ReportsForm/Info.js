valor = '0';
Ext.define('Ext.Praxis.view.payments.ReportsForm.Info', {
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
                align: 'left'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 500,
                            width: 1040,
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    height: 600,
                                    width: 1000,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false
                                        },
                                        items:
                                                [
                                                    {text: 'Start Date', dataIndex: 'A4803FPRO', width: 100},
                                                    {text: 'End Date', dataIndex: 'A4803FCUL', width: 100},
                                                    {text: 'Report Code', dataIndex: 'A4803CODRE', width: 100},
                                                    {text: 'Process Type', dataIndex: 'A4803TYPE', width: 100},
                                                    {text: 'Email', dataIndex: 'A4803EMAIL', width: 200},
                                                     {text: 'Total', dataIndex: 'A4803TOTAL', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                    //{text: 'Total', dataIndex: 'A4803TOTAL', width: 100},
                                                    {text: 'Status', dataIndex: 'A4803FLAGDESC', width: 100,renderer: 'onRendererColumnStatus' },
                                                    {text: 'Auditor', dataIndex: 'A4803REGIS', width: 100},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        text: 'Edit',
                                                        width: 50,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-1400209639_24',
                                                                tooltip: 'Download',
                                                                handler: 'DownloadFiles_python'
                                                            }
                                                        ]
                                                    }


                                                ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1040,
                            margin: '10 0 0 0 ',
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1040,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
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


