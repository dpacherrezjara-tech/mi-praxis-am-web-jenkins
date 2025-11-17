Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BPOControlAnalyticsAnalisisGrid',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsAnalisisController'
    ],
    controller: 'GridBPOControlAnalyticsAnalisisController',

    width: 1025,
    height: 598,
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
                width: 120,
                renderer: function(value, metaData, record) {
                    // Indicador visual si tiene métricas críticas
                    var total = record.get('TOTAL_SOL') || 0;
                    var criticas = record.get('CRITICAS') || 0;
                    var pctCriticas = total > 0 ? (criticas / total * 100) : 0;
                    var alert = pctCriticas > 15 ? ' <span style="color:#ef4444;">⚠️</span>' : '';

                    metaData.tdStyle = 'text-align:center; vertical-align:middle;';

                    return '<div style="display:flex; align-items:center;justify-content:center">' +
                           '<span style="font-weight:700;font-size:13px;color:#111827;">' + value + '</span>'
                           //  +  alert + 
                           '</div>';
                }
            },
            {
                text: 'Date Authorization',
                dataIndex: 'FEAUT',
                width: 130,
                renderer: function(value,metaData) {
                    if (!value) return '';
                    const date = Ext.Date.parse(value, 'Ymd');

                    metaData.tdStyle = 'vertical-align:middle;';
                    return '<div style="color:#6b7280;font-size:13px;font-weight:500;">' +
                           '<span style="color:#374151;">📅</span> ' + 
                           Ext.Date.format(date, 'd/m/Y') + '</div>';
                }
            },
            {
                text: 'Total',
                dataIndex: 'TOTAL_SOL',
                width: 90,
                renderer: function(value,metaData) {

                    metaData.tdStyle = 'vertical-align:middle;';
                    return '<div style="font-size:16px;font-weight:700;color:#3b82f6;">' + 
                           value + '</div>';
                }
            },
            {
                text: 'Fast',
                dataIndex: 'RAPIDAS',
                width: 100,
                renderer: function(value, metaData, record) {
                    var total = record.get('TOTAL_SOL') || 1;
                    var pct = (value / total * 100).toFixed(0);
                    
                    // metaData.style = 'padding:8px 4px;';
                    metaData.tdStyle = 'vertical-align:middle;';
                    
                    return '<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">' +
                           '<span style="background:#d1fae5;color:#065f46;font-weight:700;' +
                           'border-radius:8px;padding:4px 10px;font-size:13px;min-width:45px;' +
                           'display:inline-block;text-align:center;box-shadow:0 1px 2px rgba(0,0,0,0.05);">' +
                           value + '</span>' +
                           '<span style="font-size:10px;color:#059669;font-weight:600;">' + 
                           pct + '%</span></div>';
                }
            },
            {
                text: 'Normal',
                dataIndex: 'NORMALES',
                width: 100,
                renderer: function(value, metaData, record) {
                    var total = record.get('TOTAL_SOL') || 1;
                    var pct = (value / total * 100).toFixed(0);
                    
                    // metaData.style = 'padding:8px 4px;';
                    metaData.tdStyle = 'vertical-align:middle;';
                    
                    return '<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">' +
                           '<span style="background:#dbeafe;color:#1e40af;font-weight:700;' +
                           'border-radius:8px;padding:4px 10px;font-size:13px;min-width:45px;' +
                           'display:inline-block;text-align:center;box-shadow:0 1px 2px rgba(0,0,0,0.05);">' +
                           value + '</span>' +
                           '<span style="font-size:10px;color:#2563eb;font-weight:600;">' + 
                           pct + '%</span></div>';
                }
            },
            {
                text: 'Critical',
                dataIndex: 'CRITICAS',
                width: 100,
                renderer: function(value, metaData, record) {
                    var total = record.get('TOTAL_SOL') || 1;
                    var pct = (value / total * 100).toFixed(0);
                    
                    // metaData.style = 'padding:8px 4px;';
                    metaData.tdStyle = 'vertical-align:middle;';
                    
                    var alert = pct > 15 ? ' ⚠️' : '';
                    
                    return '<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">' +
                           '<span style="background:#fee2e2;color:#991b1b;font-weight:700;' +
                           'border-radius:8px;padding:4px 10px;font-size:13px;min-width:45px;' +
                           'display:inline-block;text-align:center;box-shadow:0 1px 2px rgba(0,0,0,0.05);">' +
                           value + '</span>' +
                           '<span style="font-size:10px;color:#dc2626;font-weight:600;">' + 
                           pct + '%</span></div>';
                }
            },
            {
                text: 'Avg Time',
                dataIndex: 'PROM_MIN',
                width: 130,
                renderer: function(value) {
                    if (value == null) return '';
                    
                    let color, bg, icon = '';
                    
                    if (value <= 3) {
                        color = '#065f46'; 
                        bg = '#d1fae5';
                        icon = '⚡';
                    } else if (value <= 6) {
                        color = '#92400e'; 
                        bg = '#fef3c7';
                        icon = '⏱️';
                    } else {
                        color = '#991b1b'; 
                        bg = '#fee2e2';
                        icon = '🐌';
                    }

                    return '<div style="display:inline-flex;align-items:center;gap:4px;' +
                           'background:' + bg + ';color:' + color + ';font-weight:700;' +
                           'border-radius:8px;padding:6px 12px;font-size:13px;' +
                           'box-shadow:0 1px 3px rgba(0,0,0,0.1);">' +
                           '<span>' + '</span>' +
                           '<span>' + Ext.util.Format.number(value, '0.00') + ' min</span></div>';
                }
            },
            {
                text: 'Min Time',
                dataIndex: 'MIN_SEG',
                width: 110,
                renderer: function(value, metaData) {
                    if (value == null) return '';
            
                    const h = Math.floor(value / 3600);
                    const m = Math.floor((value % 3600) / 60);
                    const s = value % 60;
                    
                    const timeStr = (h > 0 ? h + 'h ' : '') + 
                                  (m > 0 ? m + 'm ' : '') + 
                                  (s > 0 ? s + 's' : '');
                    
                    var color = value > 600 ? '#dc2626' : '#374151';
                    var icon = value > 600 ? '⚠️ ' : '🏆';
                    metaData.tdStyle = 'vertical-align:middle;text-align:center;';
            
                    return '<div style="display:flex;justify-content:center;align-items:center;font-weight:600;color:' 
                    // + color 
                    + ';font-size:12px;">' 
                    // + icon 
                     + timeStr + '</div>';
                }
            },
            {
                text: 'Max Time',
                dataIndex: 'MAX_SEG',
                width: 130,
                renderer: function(value, metaData) {
                    if (value == null) return '';
                    
                    const h = Math.floor(value / 3600);
                    const m = Math.floor((value % 3600) / 60);
                    const s = value % 60;
                    
                    const timeStr = (h > 0 ? h + 'h ' : '') + 
                                  (m > 0 ? m + 'm ' : '') + 
                                  (s > 0 ? s + 's' : '');
                    
                    var color = value > 600 ? '#dc2626' : '#374151';
                    var icon = value > 600 ? '⚠️ ' : '🏆';
                    metaData.tdStyle = 'vertical-align:middle;text-align:center;';
                    
                    return '<div style="display:flex;justify-content:center;align-items:center;font-weight:600;color:' 
                    // + color 
                    + ';font-size:12px;">' 
                    // + icon 
                     + timeStr + '</div>';
                }
            }
        ]
    },

    tbar: {
        layout: { pack: 'end' },
        style: {
            backgroundColor: '#ffffff !important',   
            borderBottom: '1px solid #e5e7eb' 
        },
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