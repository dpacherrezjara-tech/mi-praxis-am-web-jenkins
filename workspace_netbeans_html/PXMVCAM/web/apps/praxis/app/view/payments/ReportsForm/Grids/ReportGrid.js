Ext.define('Ext.Praxis.view.payments.ReportsForm.Grids.ReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ReportGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReportsForm.GridReportController'
    ],
    controller: 'GridReportController',
    maxHeight: prototype.height,
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

            {text: 'Start Date', dataIndex: 'DATE', width: 100},
            {text: 'End Date', dataIndex: 'ENDDATE', width: 100},
            {text: 'Report Code', dataIndex: 'RCODE', width: 100},
            {text: 'Procces Type', dataIndex: 'PROTYPE', width: 100},
            {text: 'Country', dataIndex: 'COUNTRY', width: 100},
            {text: 'Email', dataIndex: 'MAIL', width: 100},
            {text: 'Total', dataIndex: 'TOTAL', width: 100},
            {text: 'Status', dataIndex: 'STATUS', width: 100},
        ]
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


