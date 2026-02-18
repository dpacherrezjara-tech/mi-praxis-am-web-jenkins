Ext.define('Ext.Praxis.view.interline.UomqReportForm.Grids.UomqReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-UomqReportGrid',
    requires: [
        'Ext.Praxis.controller.interline.UomqReport.UomqReportGridController'
    ],
    controller: 'UomqReportGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 800,
    store: [],
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
            {
                text: 'RN',
                locked: true,
                xtype: 'rownumberer',
                width: 60
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 60,
                text: 'Detail',
                locked: false,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-search',
                        tooltip: 'Open',
                        handler: 'loadGroup'
                    }
                ]
            },
            {text: 'ID', dataIndex: 'IDFILE', width:100},
            {text: 'Client', dataIndex: 'CCUST', width:100},
            {text: 'Proccesing<br>Date', dataIndex: 'PRDA', width:100},
            {text: 'Input', dataIndex: 'TIPO', width:100},
            {text: 'Qty<br>Groups', dataIndex: 'QGRUPOS', width:100},
            {text: 'Status', dataIndex: 'STSPRO', flex:1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'P': () => {
                            metaData.style = "background-color:#E6E3E3;color:#4C4E57;font-weight:bold";
                            return 'Processing';
                        },
                        'L': () => {
                            metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                            return 'Processed';
                        },
                        'E': () => {
                            metaData.style = "background-color:#FFF091;color:#ce3232;font-weight:bold";
                            return 'Error';
                        }
                    };
                    const key = (value || '').trim();
                    return opts[key] ? opts[key]() : 'Error';
                }
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
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


