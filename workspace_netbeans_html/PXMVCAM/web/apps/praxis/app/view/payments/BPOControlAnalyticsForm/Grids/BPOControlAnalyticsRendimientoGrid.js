Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRendimientoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BPOControlAnalyticsRendimientoGrid',

    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRendimientoController'
    ],
    controller: 'GridBPOControlAnalyticsRendimientoController',

    width: 600,
    height: 630,
    columnLines: true,

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        scrollable: true
    },

    // ⭐ Necesario para que el grid acepte setStore(data)
    store: {
        fields: ['USUARIO', 'FECHA', 'HORA', 'TIEMPO_SEG', '#'],
        data: []
    },

    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },

        items: [

            // ==========================
            //   COLUMNA #
            // ==========================
            {
                text: '#',
                width: 50,
                renderer: function (value, metaData, record, rowIndex) {
                    metaData.tdStyle = 'vertical-align:middle;';
                    return `
                        <div style="color:#6b7280;
                                   justify-content:center;
                                   font-weight:700;
                                   font-size:12px;">
                           ${rowIndex + 1}
                        </div>`;
                }
            },

            // ==========================
            //   USER
            // ==========================
            {
                text: 'User',
                dataIndex: 'USUARIO',
                width: 120,
                renderer: function (value, metaData, record, rowIndex) {
                    const raw = record.get('TIEMPO_SEG') || '';
                    const num = parseFloat(raw);
                    const isFast = !isNaN(num) && num <= 180;

                    metaData.tdStyle = 'vertical-align:middle;';

                    return `
                        <div style="font-weight:700;
                                    font-size:13px;
                                    color:#111827;
                                    display:flex;
                                    align-items:center;justify-content:center;
                                    text-align:left;">
                            ${value || ''}
                        </div>`;
                }
            },

            // ==========================
            //   DATE
            // ==========================
            {
                text: 'Date',
                dataIndex: 'FECHA',
                width: 120,
                renderer: function (value, metaData, record, rowIndex) {
                    if (!value) return '';

                    const date = Ext.Date.parse(value, 'Ymd');
                    if (!date) return value;

                    metaData.tdStyle = 'vertical-align:middle;';


                    return `
                        <div style="color:#6b7280;
                                    font-size:12px;
                                    font-weight:500;">
                            <span style="color:#374151;">📅</span>
                            ${Ext.Date.format(date, 'd/m/Y')}
                        </div>`;
                }
            },

            // ==========================
            //   TIME
            // ==========================
            {
                text: 'Time',
                dataIndex: 'HORA',
                width: 90,
                renderer: function (value, metaData, record, rowIndex) {
                    if (!value) return '';
                    metaData.tdStyle = 'vertical-align:middle;';
                    return `
                        <div style="color:#4b5563;
                                    font-size:12px;
                                    font-weight:600;">
                            🕐 ${value}
                        </div>`;
                }
            },

            // ==========================
            //   PERFORMANCE
            // ==========================
            {
                text: 'Performance',
                dataIndex: 'TIEMPO_SEG',
                width: 205,
                renderer: function (value, metaData, record, rowIndex) {
                    if (!value) return '';
                    // 📝
                    // Caso 1: Texto (PRIMER REGISTRO, etc.)
                    if (isNaN(parseFloat(value))) {
                        metaData.style = 'padding:8px 8px;margin:0px 0px 7px 0px';
                        return `
                            <div style="display:inline-block;
                                        background:#f3f4f6;
                                        color:#6b7280;
                                        font-weight:600;
                                        padding:6px 12px;
                                        border-radius:8px;
                                        font-size:11px;
                                        border:1px dashed #9ca3af;">
                                 ${value}
                            </div>`;
                    }

                    // Caso 2: Número (42 seg, 250 seg, etc.)
                    const num = parseFloat(value);

                    if (num == null) return '';
            
                    const h = Math.floor(num / 3600);
                    const m = Math.floor((num % 3600) / 60);
                    const s = num % 60;
                    
                    const timeStr = (h > 0 ? h + 'h ' : '') + 
                                  (m > 0 ? m + 'm ' : '') + 
                                  (s > 0 ? s + 's' : '');

                    let color, bg, icon, label;

                    if (num <= 180) {
                        color = '#065f46'; bg = '#d1fae5'; icon = '⚡'; label = 'FAST';
                    } else if (num <= 300) {
                        color = '#92400e'; bg = '#fef3c7'; icon = '⏱️'; label = 'NORMAL';
                    } else {
                        color = '#991b1b'; bg = '#fee2e2'; icon = '🐌'; label = 'LOW';
                    }

                    metaData.style = 'padding:8px 4px;';

                    return `
                        <div style="display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                    gap:4px;">
                            
                            <div style="display:flex;
                                        align-items:center;
                                        gap:6px;
                                        background:${bg};
                                        color:${color};
                                        font-weight:700;
                                        border-radius:8px;
                                        padding:6px 14px;
                                        font-size:14px;
                                        box-shadow:0 1px 3px rgba(0,0,0,0.1);
                                        min-width:100px;
                                        justify-content:center;">
                               
                                <span>${timeStr} seg</span>
                            </div>

                            <span style="font-size:9px;
                                         font-weight:700;
                                         color:${color};
                                         text-transform:uppercase;
                                         letter-spacing:0.5px;">
                                ${label}
                            </span>
                        </div>`;
                }
            }

        ]
    },

    // Botón Excel
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
