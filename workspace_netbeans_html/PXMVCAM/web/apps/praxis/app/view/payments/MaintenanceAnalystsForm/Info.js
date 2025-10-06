Ext.define('Ext.Praxis.view.payments.MaintenanceAnalystsForm.Info', {
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
                            height: 560,
                            width: 1040,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    height: 520,
                                    width: 950,
                                    columnLines: true,
                                    features: [{ftype: 'grouping', startCollapsed: true}],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items:
                                                [
                                                    {text: 'Processor type', dataIndex: 'A4836PROCE', width: 160},
                                                    {text: 'Auditor', dataIndex: 'A4836USER', width: 150},
                                                    {text: 'Start </br>date', dataIndex: 'A4836FALTA', width: 75},
                                                    {text: 'End </br>date', dataIndex: 'A4836FBAJA', width: 75},
                                                    {text: 'Description', dataIndex: 'A4836DESCR', width: 200},
                                                    {text: 'Status', dataIndex: 'A4836FLAGDES', width: 60, sortable: false, align: 'right'},
                                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnStatus'},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 50,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Detail',
                                                                handler: 'viewDataEntry_clickHandler',
                                                                isActionDisabled: 'OnEditActionDisabled'
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
                                            text: 'Total ADMs',
                                            width: 80
                                        },
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


