prototype.idTree = prototype.id + '-SummaryTree';
Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.' + prototype.id + '-summaryTree',
    requires: [
        'Ext.Praxis.controller.payments.AccountingTransaction.SummaryTreeController',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Grids.DetailGrid'
    ],
    controller: 'ATSummaryTreeController',
    title: 'Summary Info',
    titleAlign: 'center',
    height: '98%',
    width: '98%',
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
                dataIndex: 'FECHA',
                width: 150,
                enableTextSelection: false,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "text-align:left;font-weight:bold;color:#0000FF;";
                            break;
                        case 'detail':
                            metaData.style = "text-align:left;font-weight:bold;color:#008000;";
                            break;
                    }
                    return value;
                }
            },
            {
                text: '...',
                id: prototype.idTree + '-colFechaH',
                width: 350,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    const {type} = record.data;
                    switch (type) {
                        case 'header':
                            metaData.style = "font-weight:bold;color:#0000FF;";
                            break;
                        case 'detail':
                            metaData.style = "font-weight:bold;color:#008000;";
                            break;
                    }
                    return value;
                }
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Copy',
                align: 'center',
                items: [
                    {
                        tooltip: 'copy ID',
                        handler: 'copyID',
                        getClass: function (value, metadata, record) {
                            if (record.data.type === 'header')
                                return '';
                            return 'prx-icon-image-log';
                        },
                        isDisabled: function (view, rowIndex, colIndex, item, record) {
                            if (record.data.type === 'header')
                                return true;
                            return false;
                        }
                    }
                ]
            },
            {
                text: '...',
                id: prototype.idTree + '-colFechaN',
                width: 350,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    const {type} = record.data;
                    switch (type) {
                        case 'header':
                            metaData.style = "font-weight:bold;color:#0000FF;";
                            break;
                        case 'detail':
                            metaData.style = "font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer;";
                            break;
                    }
                    return value;
                },
                listeners: {
                    click: 'onClickTotal'
                }
            },
            {text: 'Processor', dataIndex: 'PROC_DESC', align: 'center', flex: 1},
            {text: 'Currency', dataIndex: 'SCURRENCY', align: 'center', width: 80},
            {text: 'Match', dataIndex: 'ACCOUNTED', align: 'center', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right;background-color:#8DB39D";
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#6FCA96";
                            break;
                    }
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Qty<br>Match', dataIndex: 'QTY_ACCOUNTED', align: 'center', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right;background-color:#8DB39D;text-decoration:underline;cursor:pointer;color:#057ECB";
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#6FCA96;text-decoration:underline;cursor:pointer;color:#057ECB";
                            break;
                    }
                    return value;
                },
                listeners: {
                    click: 'onClickAccounted'
                }
            },
            {text: 'Pending', dataIndex: 'PENDING', align: 'center', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right;background-color:#C0C392";
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#D3DA66";
                            break;
                    }
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Qty<br>Pending', dataIndex: 'QTY_PENDING', align: 'center', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right;background-color:#C0C392;text-decoration:underline;cursor:pointer;color:#057ECB";
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#D3DA66;text-decoration:underline;cursor:pointer;color:#057ECB";
                            break;
                    }
                    return value;
                },
                listeners: {
                    click: 'onClickPending'
                }
            },
            {text: 'Total', dataIndex: 'TOTAL', align: 'center', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right;background-color:#84AFCA";
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#6BA9CF";
                            break;
                    }
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Qty<br>Trns.', dataIndex: 'QTY_TOTAL', align: 'center', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right;background-color:#84AFCA;text-decoration:underline;cursor:pointer;color:#057ECB";
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#6BA9CF;text-decoration:underline;cursor:pointer;color:#057ECB";
                            break;
                    }
                    return value;
                },
                listeners: {
                    click: 'onClickTotal'
                }
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
                    click: 'downloadExcelTree'
                }
            },
            {
                text: '<strong style="color:white;">Back<strong>',
                cls: 'x-btn-sent',
                width: 100,
                scale: 'small',
                overCls: 'x-btn-sent-over',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
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
});
