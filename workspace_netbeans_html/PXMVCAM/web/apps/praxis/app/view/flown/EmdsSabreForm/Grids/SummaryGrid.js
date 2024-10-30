Ext.define('Ext.Praxis.view.flown.EmdsSabreForm.Grids.SummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SummaryGrid',
    requires: [
        'Ext.Praxis.controller.flown.EmdsSabre.SummaryGridController'
    ],
    controller: 'SummaryGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1000,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Processing<br>Date', dataIndex: 'FPROC', flex: 1},
            {text: 'Total<br>EMDs', dataIndex: 'TOTEMD', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold";
                    return value;
                }
            },
            {text: 'Curr.', dataIndex: 'RMDA', width: 60},
            {text: 'Fare Rev.', dataIndex: 'TARIF', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Used',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#91fc63;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'USED', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#91fc63;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                            return value;
                        },
                        listeners:{
                            click: 'loadUsed'
                        }
                    },
                    {text: 'Fare', dataIndex: 'UTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#91fc63";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'No Used',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#F0D094;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'PENDIENTE', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                            return value;
                        },
                        listeners:{
                            click: 'loadNotUsed'
                        }
                    },
                    {text: 'Fare', dataIndex: 'PTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Status<br>Changed', dataIndex: 'CSTS', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                            return value;
                        },
                        listeners:{
                            click: 'loadStatusChanged'
                        }
                    },
                    {text: 'Fare<br>St. Chg', dataIndex: 'CSTTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            }
            //</editor-fold>
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
                hidden:true,
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    }
});


