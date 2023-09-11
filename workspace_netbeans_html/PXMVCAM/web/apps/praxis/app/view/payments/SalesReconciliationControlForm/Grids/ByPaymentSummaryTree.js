prototype.idTree = prototype.id + '-byPaymentSummaryTree';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentSummaryTree', {
    extend: 'Ext.tree.Panel', // Extendemos la clase Ext.tree.Panel
    alias: 'widget.' + prototype.id + '-byPaymentSummaryTree', // Alias para usar en el xtype
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentSummaryTreeController'
    ],
    controller: 'ByPaymentSummaryTreeController',
    title: 'By Payment Summary',
    titleAlign: 'center',
    height: '98%',
    width: 1370,
    anchor: '100%',
    reserveScrollbar: false,
    scrollable: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    columnLines: true,
    rowLines: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columns: {
        defaults: {
            menuDisabled: true,
            sortable: true,
            align: 'center'
        },
        items: [
            {
                xtype: 'treecolumn',
                text: '',
                id: prototype.idTree + '-colFechaP',
                dataIndex: 'month',
                width: 230,
                enableTextSelection: false,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    switch (record.data.type) {
                        case 'month':
                            metaData.style = "text-align:left;font-weight:bold;color:#0000FF;";
                            break;
                        case 'processor':
                            metaData.style = "text-align:left;font-weight:bold;color:#008000;";
                            value = record.data.proc;
                            break;
                        case 'trncu':
                            metaData.style = "text-align:left;font-weight:bold;color:#8B5199;";
                            value = record.data.trncu;
                            break;
                    }
                    return value;
                }
            },
            {
                text: 'Total General', width: 300,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#8EDFB3;text-decoration:underline;cursor:pointer;";
                        switch (record.data.type) {
                            case 'month':
                                metaData.style += "font-weight:bolder;color:#0000FF;";
                                break;
                            case 'processor':
                                metaData.style += "font-weight:bold;color:#316D0A;";
                                break;
                            case 'trncu':
                                metaData.style += "font-weight:bold;color:#8B5199;";
                                break;
                        }
                        return value;
                    }
                },
                columns: [
                    {
                        text: 'Total', dataIndex: 'total', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    },
                    {
                        text: 'Match', dataIndex: 'total_MATCH', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'total_PENDING', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    }
                ]
            },
            {
                text: 'Transaction No Complement', width: 200,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#94DAF0;text-decoration:underline;cursor:pointer;";
                        switch (record.data.type) {
                            case 'month':
                                metaData.style += "font-weight:bolder;color:#0000FF;";
                                break;
                            case 'processor':
                                metaData.style += "font-weight:bold;color:#316D0A;";
                                break;
                            case 'trncu':
                                metaData.style += "font-weight:bold;color:#8B5199;";
                                break;
                        }
                        return value;
                    }
                },
                columns: [
                    {
                        text: 'Match', dataIndex: 'total_NC_MATCH', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'total_NC_PENDING', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    }
                ]
            },
            {
                text: 'Complements', width: 600,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    defaults: {
                        menuDisabled: true,
                        sortable: true,
                        align: 'center',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#E5F094;text-decoration:underline;cursor:pointer;";
                            switch (record.data.type) {
                                case 'month':
                                    metaData.style += "font-weight:bolder;color:#0000FF;";
                                    break;
                                case 'processor':
                                    metaData.style += "font-weight:bold;color:#316D0A;";
                                    break;
                                case 'trncu':
                                    metaData.style += "font-weight:bold;color:#8B5199;";
                                    break;
                            }
                            return value;
                        }
                    }
                },
                columns: [
                    {
                        text: 'Plusgrade', width: 200,
                        columns: [
                            {
                                text: 'Match', dataIndex: 'compl_PG_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }

                            },
                            {
                                text: 'Pending', dataIndex: 'compl_PG_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    },
                    {
                        text: 'Ligas', width: 200,
                        columns: [
                            {
                                text: 'Match', dataIndex: 'compl_LIG_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            },
                            {
                                text: 'Pending', dataIndex: 'compl_LIG_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    },
                    {
                        text: 'Tablets', width: 200,
                        columns: [
                            {
                                text: 'Match', dataIndex: 'compl_TAB_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            },
                            {
                                text: 'Pending', dataIndex: 'compl_TAB_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    },
    lbar: {
        border: false,
        items: [
            {
                xtype: 'button',
                icon: 'resources/img/botones/expanded.png',
                tooltip: 'Expand the tree',
                id: prototype.idTree + '-btnExpandTree',
                listeners: {
                    click: function (button) {
                        button.up().up().expandAll();
                    }
                }
            },
            {
                xtype: 'button',
                icon: 'resources/img/botones/collaped.png',
                tooltip: 'Collapse the tree',
                id: prototype.idTree + '-btnCollapseTree',
                listeners: {
                    click: function (button) {
                        button.up().up().collapseAll();
                    }
                }
            }
        ]
    }
    //store: 'MyTreeStore', // Aquí debes usar el nombre de tu tienda (store)

    // Otras configuraciones y propiedades del TreePanel
});