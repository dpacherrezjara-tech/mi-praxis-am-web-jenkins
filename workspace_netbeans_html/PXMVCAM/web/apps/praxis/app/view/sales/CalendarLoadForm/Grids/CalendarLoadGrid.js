Ext.define('Ext.Praxis.view.sales.CalendarLoadForm.Grids.CalendarLoadGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-CalendarLoadGrid',
    requires: [
        'Ext.Praxis.controller.sales.CalendarLoadForm.CalendarLoadGridController'
    ],
    controller: 'CalendarLoadGridController',
    minHeight: 200,
    height: 'auto',
    width: 1000,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    store: {
        fields: [
            'A1837ANIO',
            'A1837MES',
            'A1837TCOMI',
            'A1837FEJEC',
            'A1837FFINP',
            'A1837FINIP',
            'A1837FREGI',
            'A1837HREGI',
            'A1837CCUST',
            'A1837PERIO',
            'A1837REGIS',
            'A1837STAT'
        ],
        data: [],
    },
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            { text: 'Year', dataIndex: 'A1837ANIO', width: 60 },
            {
                text: 'Month',
                dataIndex: 'A1837MES',
                flex: 1,
                renderer: function (value) {
                    const months = {
                        '01': 'January',
                        '02': 'February',
                        '03': 'March',
                        '04': 'April',
                        '05': 'May',
                        '06': 'June',
                        '07': 'July',
                        '08': 'August',
                        '09': 'September',
                        '10': 'October',
                        '11': 'November',
                        '12': 'December'
                    };

                    return months[value] || value;
                }
            },

            { text: 'Type', dataIndex: 'A1837TCOMI', width: 100 },
            { text: 'Execution Date', dataIndex: 'A1837FEJEC', width: 150 },
            { text: 'Period Start Date', dataIndex: 'A1837FFINP', width: 150 },
            { text: 'Period End Date', dataIndex: 'A1837FINIP', width: 150 },
            { text: 'Record Date', dataIndex: 'A1837FREGI', width: 150 },
            { text: 'Record Time', dataIndex: 'A1837HREGI', width: 150 }

            // { text: 'Ccust', dataIndex: 'A1837CCUST', width: 50 },
            // { text: 'Periodo', dataIndex: 'A1837PERIO', width: 50 },
            // { text: 'Registro', dataIndex: 'A1837REGIS', width: 50 },
            // { text: 'Estado', dataIndex: 'A1837STAT', width: 50 }

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
                    click: 'downloadExcelCalendarLoad'
                }
            },
        ]
    },
    // bbar: {
    //     xtype: 'pagingtoolbar',
    //     displayInfo: true
    // }
});



