Ext.define('Ext.Praxis.view.payments.ReportsForm.Grids.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ReportGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReportsForm.GridReportController'
    ],
    controller: 'GridReportController',
    maxHeight: prototype.height,
    id: prototype.id + '-gridData',
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [

            {text: 'Start Date', dataIndex: 'A4803FPRO', width: 100},
            {text: 'End Date', dataIndex: 'A4803FCUL', width: 100},
            {text: 'Report Code', dataIndex: 'A4803CODRE', width: 100},
            {text: 'Process Type', dataIndex: 'A4803TYPE', width: 100},
            {text: 'Email', dataIndex: 'A4803EMAIL', width: 100},
            {text: 'Total', dataIndex: 'TOTAL', width: 100},
            {text: 'Status', dataIndex: 'A4803FLAGDESC', width: 100},
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
                        handler: 'viewDataEntry_clickHandler'
                    }
                ]
            }
        ]
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


