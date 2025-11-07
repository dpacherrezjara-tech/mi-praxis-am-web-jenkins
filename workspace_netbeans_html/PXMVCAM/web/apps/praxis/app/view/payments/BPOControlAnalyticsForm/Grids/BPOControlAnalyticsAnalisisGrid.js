Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BPOControlAnalyticsAnalisisGrid',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsAnalisisController'
    ],
    controller: 'GridBPOControlAnalyticsAnalisisController',

    width: 1045,
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
            {
                text: 'User',
                dataIndex: 'AUASI',
                width: 140,
                renderer: function(value, metaData, record) {
                    return '<span style="font-weight:600;font-size:13px;">' + value + '</span>';
                }
            },
            {
                text: 'Date Authorization',
                dataIndex: 'FEAUT',
                width: 130,
                renderer: function(value) {
                    if (!value) return '';
                    const date = Ext.Date.parse(value, 'Ymd');
                    return `<span style="color:#4b5563;font-size:12px;">${Ext.Date.format(date, 'd/m/Y')}</span>`;
                }
            },
            {
                text: 'Total',
                dataIndex: 'TOTAL_SOL',
                width: 100,
                renderer: function(value) {
                    return `<span style="font-size:14px;font-weight:700;color:#3b82f6">${value}</span>`;
                }
            },
            {
                text: 'Fast',
                dataIndex: 'RAPIDAS',
                width: 100,
                renderer: function(value) {
                    return `
                        <span style="
                            background-color:#d1fae5;
                            color:#065f46;
                            font-weight:600;
                            border-radius:6px;
                            padding:2px 6px;
                            display:inline-block;
                            min-width:40px;
                            text-align:center;
                        ">${value}</span>
                    `;
                }
            },
            {
                text: 'Normal',
                dataIndex: 'NORMALES',
                width: 100,
                renderer: function(value) {
                    return `
                        <span style="
                            background-color:#dbeafe;
                            color:#1e40af;
                            font-weight:600;
                            border-radius:6px;
                            padding:2px 6px;
                            display:inline-block;
                            min-width:40px;
                            text-align:center;
                        ">${value}</span>
                    `;
                }
            },
            {
                text: 'Critical',
                dataIndex: 'CRITICAS',
                width: 100,
                renderer: function(value) {
                    return `
                        <span style="
                            background-color:#fee2e2;
                            color:#7f1d1d;
                            font-weight:600;
                            border-radius:6px;
                            padding:2px 6px;
                            display:inline-block;
                            min-width:40px;
                            text-align:center;
                        ">${value}</span>
                    `;
                }
            },
            {
                text: 'Avg Time',
                dataIndex: 'PROM_MIN',
                width: 120,
                renderer: function(value) {
                    if (value == null) return '';
                    let color = '#065f46', bg = '#d1fae5'; // rápido
                    if (value > 6) { color = '#7f1d1d'; bg = '#fee2e2'; } // lento
                    else if (value > 3) { color = '#78350f'; bg = '#fef3c7'; } // medio

                    return `
                        <span style="
                            background-color:${bg};
                            color:${color};
                            font-weight:700;
                            border-radius:6px;
                            padding:2px 6px;
                            display:inline-block;
                            min-width:55px;
                            text-align:center;
                        ">${Ext.util.Format.number(value, '0.00')} min</span>
                    `;
                }
            },
            {
                text: 'Min Time',
                dataIndex: 'MIN_SEG',
                width: 110,
                renderer: function(value) {
                    if (value == null) return '';
            
                    // Convertir segundos a horas, minutos y segundos
                    const h = Math.floor(value / 3600);
                    const m = Math.floor((value % 3600) / 60);
                    const s = value % 60;
            
                    // Mostrar HH:MM:SS si hay horas, si no MM:SS
                    const timeStr = h > 0 
                        ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}` 
                        : `${m}:${s.toString().padStart(2,'0')}`;
            
                    return `<span style="font-weight:600;color:#374151;">${timeStr}</span>`;
                }
            },
            {
                text: 'Max Time',
                dataIndex: 'MAX_SEG',
                width: 130,
                renderer: function(value) {
                    if (value == null) return '';
                    const h = Math.floor(value / 3600);
                    const m = Math.floor((value % 3600) / 60);
                    const s = value % 60;
                    const timeStr = (h > 0 ? h + 'h ' : '') + (m > 0 ? m + 'm ' : '') + (s > 0 ? s + 's' : '');
                    return `<span style="font-weight:600;color:#111827;">${timeStr}</span>`;
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
