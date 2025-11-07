Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRendimientoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BPOControlAnalyticsRendimientoGrid',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRendimientoController'
    ],
    controller: 'GridBPOControlAnalyticsRendimientoController',
    width: 530,
    height: 630,
    columnLines: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        scrollable: true
    },

    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            // { text: '#', dataIndex: '#', width: 50 },
            // { text: 'Date', dataIndex: 'FECHA', width: 120 },
            // { text: 'Time', dataIndex: 'HORA', width: 120 },
            // { text: 'Time (s)', dataIndex: 'TIEMPO_SEG', width: 180 }, // tiempo por segundo
            // { text: 'User', dataIndex: 'USUARIO', width: 10 }
            {
                text: '#',
                width: 45,
                renderer: function(value, meta, record, rowIndex) {
                    return `<span style="color:#4b5563;font-weight:600;">${rowIndex + 1}</span>`;
                }
            },
            {
                text: 'User',
                dataIndex: 'USUARIO',
                width: 120,
                renderer: function(value, metaData, record) {
                    return '<span style="font-weight:600;font-size:13px;">' + value + '</span>';
                }
            },
            {
                text: 'Date',
                dataIndex: 'FECHA',
                width: 100,
                renderer: function(value) {
                    if (!value) return '';
                    const date = Ext.Date.parse(value, 'Ymd');
                    return `<span style="color:#374151;font-size:12px;">${Ext.Date.format(date, 'd/m/Y')}</span>`;
                }
            },
            {
                text: 'Time',
                dataIndex: 'HORA',
                width: 100,
            },
            {
                text: 'Performance',
                dataIndex: 'TIEMPO_SEG',
                width: 150,
                align: 'center',
                renderer: function(value) {
                    if (value == null) return '';
                    
                    let color = '#10b981'

                    return `
                        <div style="
                            color:${color};
                            font-weight:600;
                            padding:4px 10px;
                            display:inline-block;
                            min-width:70px;
                            text-align:center;
                        ">${value}</div>
                    `;
                }
            }
           
        ]
    },

    tbar: {
        layout: { pack: 'end' },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                tooltip: 'Export to Excel',
                listeners: { click: 'downloadExcel' }
            }
        ]
    },

    // bbar: {
    //     xtype: 'pagingtoolbar',
    //     displayInfo: true
    // },

    listeners: {
        afterrender: function (grid) {
            grid.updateLayout();
        }
    }
});
