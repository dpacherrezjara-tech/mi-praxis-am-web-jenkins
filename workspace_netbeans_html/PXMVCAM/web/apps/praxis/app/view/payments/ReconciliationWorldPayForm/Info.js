Ext.define('Ext.Praxis.view.payments.ReconciliationWorldPayForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
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
                width: 1370,
                height: 700,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1370,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    height: 520,
                                    width: 1370,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Prda', dataIndex: 'PRDA', width: 90,
                                            listeners: {
                                                            click: 'onGridDetCard'
                                                        }
                                            },
                                            {text: 'Currency', dataIndex: 'CURRENCY', width: 80},
                                            {text: 'Total Transaction(312-00)',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Tran.Accepted', dataIndex: 'TOTTRAAMOU', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem.Accep', dataIndex: 'TOTSETAMOU', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans.Pendien', dataIndex: 'TOTPENAMOU', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans.Rejecti', dataIndex: 'TOTREJAMOU', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Tran.Accepted', dataIndex: 'TOTTRAAMOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem.Accep', dataIndex: 'TOTSETAMOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans.Pendien', dataIndex: 'TOTPENAMOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans.Rejecti', dataIndex: 'TOTREJAMOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Tran.Accepted', dataIndex: 'DIF_TOTTRAAMO', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem.Accep', dataIndex: 'DIF_TOTSETAMO', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans.Pendien', dataIndex: 'DIF_TOTPENAMO', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans.Rejecti', dataIndex: 'DIF_TOTREJAMO', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 7, height: 10},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: 1000,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 600,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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


