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
            {
                text: '#',
                width: 50,
                renderer: function(value, meta, record, rowIndex) {
                    // Destacar los 3 primeros
                    var color = '#6b7280';
                    
                    return '<div style="color:' + color + ';font-weight:' + weight + ';font-size:13px;">' +
                           badge + (rowIndex + 1) + '</div>';
                }
            },
            {
                text: 'User',
                dataIndex: 'USUARIO',
                width: 120,
                renderer: function(value, metaData, record, rowIndex) {
                    var isFast = record.get('TIEMPO_SEG') && !isNaN(parseFloat(record.get('TIEMPO_SEG'))) 
                                 && parseFloat(record.get('TIEMPO_SEG')) <= 180;
                    var icon = isFast ? ' ⚡' : '';
                    
                    return '<div style="font-weight:700;font-size:13px;color:#111827;alight:left">' +
                           value + icon + '</div>';
                }
            },
            {
                text: 'Date',
                dataIndex: 'FECHA',
                width: 100,
                renderer: function(value) {
                    if (!value) return '';
                    const date = Ext.Date.parse(value, 'Ymd');
                    return '<div style="color:#6b7280;font-size:11px;font-weight:500;">' +
                           '<span style="color:#374151;">📅</span> ' +
                           Ext.Date.format(date, 'd/m/Y') + '</div>';
                }
            },
            {
                text: 'Time',
                dataIndex: 'HORA',
                width: 90,
                renderer: function(value) {
                    if (!value) return '';
                    return '<div style="color:#4b5563;font-size:12px;font-weight:600;">' +
                           '🕐 ' + value + '</div>';
                }
            },
            {
                text: 'Performance',
                dataIndex: 'TIEMPO_SEG',
                width: 150,
                align: 'center',
                renderer: function(value, metaData) {
                    if (!value) return '';
            
                    // Si es texto (ej: "PRIMER REGISTRO")
                    if (isNaN(parseFloat(value))) {
                        metaData.style = 'padding:8px 4px;';
                        return '<div style="display:inline-block;background:#f3f4f6;color:#6b7280;' +
                               'font-weight:600;padding:6px 12px;border-radius:8px;font-size:11px;' +
                               'border:1px dashed #9ca3af;">📝 ' + value + '</div>';
                    }
            
                    // Si es un número
                    const num = parseFloat(value);
                    var color, bg, icon, label;
                    
                    if (num <= 180) {
                        color = '#065f46';
                        bg = '#d1fae5';
                        icon = '⚡';
                        label = 'RÁPIDO';
                    } else if (num <= 300) {
                        color = '#92400e';
                        bg = '#fef3c7';
                        icon = '⏱️';
                        label = 'NORMAL';
                    } else {
                        color = '#991b1b';
                        bg = '#fee2e2';
                        icon = '🐌';
                        label = 'LENTO';
                    }
                    
                    metaData.style = 'padding:8px 4px;';
                    
                    return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">' +
                           '<div style="display:inline-flex;align-items:center;gap:6px;background:' + bg + ';' +
                           'color:' + color + ';font-weight:700;border-radius:8px;padding:6px 14px;' +
                           'font-size:14px;box-shadow:0 1px 3px rgba(0,0,0,0.1);min-width:100px;' +
                           'justify-content:center;">' +
                           '<span>' + icon + '</span>' +
                           '<span>' + num + ' seg</span></div>' +
                           '<span style="font-size:9px;font-weight:700;color:' + color + ';' +
                           'text-transform:uppercase;letter-spacing:0.5px;">' + label + '</span></div>';
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

    listeners: {
        afterrender: function (grid) {
            grid.updateLayout();
        }
    }
});