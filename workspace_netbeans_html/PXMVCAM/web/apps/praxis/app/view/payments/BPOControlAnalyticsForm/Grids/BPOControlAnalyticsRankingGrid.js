Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRankingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BPOControlAnalyticsRankingGrid',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRankingController'
    ],
    controller: 'GridBPOControlAnalyticsRankingController',

    width: 1645,
    height: 250,
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
            { text: 'Rank', dataIndex: 'RK', width: 50, 
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var medal = '';
                    if (value === 1) medal = '🥇';
                    else if (value === 2) medal = '🥈';
                    else if (value === 3) medal = '🥉';
                    
                    return '<div style="text-align:center;font-size:14px;">' +
                           medal + ' <span style="font-weight:700;">' + value + '</span></div>';
                }
             },
                    { text: 'User', dataIndex: 'USUARIO', width: 120 ,
                        renderer: function(value, metaData, record) {
                            var alert = (record.get('pctCriticas') > 15 || record.get('promMin') > 6) ? ' ⚠️' : '';
                            return '<span style="font-weight:600;font-size:13px;">' + value + alert + '</span>';
                        }
                    },
                    { text: 'Start Date', dataIndex: 'FECHA_INICIO', width: 100,
                        renderer: function (value) {
                            if (!value) return '';
                            const date = Ext.Date.parse(value, 'Y-m-d'); // ej. 20251107
                            return `<span style="color:#6b7280;font-size:12px;">${Ext.Date.format(date, 'd/m/Y')}</span>`;
                        }
                     },
                    { text: 'End Date', dataIndex: 'FECHA_FIN', width: 100 ,
                        renderer: function (value) {
                            if (!value) return '';
                            const date = Ext.Date.parse(value, 'Y-m-d'); // ej. 20251107
                            return `<span style="color:#6b7280;font-size:12px;">${Ext.Date.format(date, 'd/m/Y')}</span>`;
                        }
                    },
                    { text: 'Requests', dataIndex: 'SOL', width: 80,
                        renderer: function(value) {
                            return '<span style="font-weight:600;">' + value + '</span>';
                        }
                    }, // Solicitud
                    { text: 'Avg. Time (min)', dataIndex: 'PROM_MIN', width: 120 ,
                        renderer: function(value) {
                            var color = value <= 3 ? '#10b981' : value <= 6 ? '#f59e0b' : '#ef4444';
                            var weight = value > 6 ? '700' : '500';
                            var icon = value > 6 ? ' ⚠️' : '';
                            return '<span style="color:' + color + ';font-weight:' + weight + ';">' +
                                value + icon + '</span>';
                        }
                    },
                    { text: '% Fast', dataIndex: 'PCT_RAP', width: 100,
                        renderer: function(value, metaData, record) {
                            var color;
                            var weight;
                            
                            if (value >= 40) {
                                color = '#10b981';  // Verde - Excelente
                                weight = '700';
                            } else if (value >= 20) {
                                color = '#f59e0b';  // Naranja - Aceptable
                                weight = '500';
                            } else {
                                color = '#ef4444';  // Rojo - Necesita mejorar
                                weight = '500';
                            }
                            
                            return '<span style="color:' + color + ';font-weight:' + weight + ';">' +
                                   Ext.util.Format.number(value, '0.00') + '%</span>';
                        }
                     }, // % rapido
                    { text: '% Critical', dataIndex: 'PCT_CRI', width: 100,
                        renderer: function(value, metaData, record) {
                            var color;
                            var weight;
                            
                            if (value <= 5) {
                                color = '#10b981';  // Verde - Excelente
                                weight = '500';
                            } else if (value <= 15) {
                                color = '#f59e0b';  // Naranja - Advertencia
                                weight = '500';
                            } else {
                                color = '#ef4444';  // Rojo - Crítico
                                weight = '700';
                            }
                            
                            return '<span style="color:' + color + ';font-weight:' + weight + ';">' +
                                   Ext.util.Format.number(value, '0.00') + '%</span>';
                        }
                     },  // % critico
                    { text: 'Speed Volume', dataIndex: 'SC_VOL', width: 120,
                        renderer: function(value) {
                            // Score con color según rango (máx 40 pts)
                            var color = value >= 35 ? '#10b981' : value >= 25 ? '#3b82f6' : '#f59e0b';
                            return '<span style="color:' + color + ';font-weight:600;">' + value + '</span>';
                        }
                     }, //score volumen
                    { text: 'Speed Score', dataIndex: 'SC_VEL', width: 120,
                        renderer: function(value) {
                            // Score con color según rango (máx 30 pts)
                            var color = value >= 25 ? '#10b981' : value >= 15 ? '#3b82f6' : '#f59e0b';
                            return '<span style="color:' + color + ';font-weight:600;">' + value + '</span>';
                        }
                     }, //score de velocidad
                    { text: 'Counter Score', dataIndex: 'SC_CON', width: 120,
                        renderer: function(value) {
                            // Score con color según rango (máx 20 pts)
                            var color = value >= 15 ? '#10b981' : value >= 10 ? '#3b82f6' : '#f59e0b';
                            return '<span style="color:' + color + ';font-weight:600;">' + value + '</span>';
                        }
                     }, // score contador
                    { text: 'Penalty', dataIndex: 'PENALIZ', width: 120,
                        renderer: function(value) {
                            // Mostrar en rojo si es negativo
                            if (value < 0) {
                                return '<span style="color:#ef4444;font-weight:700;">' + value + '</span>';
                            }
                            return '<span style="color:#9ca3af;">0</span>';
                        }
                     },  // penalizacion -retraso
                    { text: 'Bonus', dataIndex: 'BONUS', width: 110,
                        renderer: function(value) {
                            // Mostrar en verde si es positivo
                            if (value > 0) {
                                return '<span style="color:#10b981;font-weight:700;">+' + value + '</span>';
                            }
                            return '<span style="color:#9ca3af;">0</span>';
                        }
                     }, //  bonus 
                    { text: 'Total', dataIndex: 'TOTAL', width: 120,
                        renderer: function(value, metaData, record) {
                            // Score total con color según categoría
                            var categoria = record.get('CATEGORIA');
                            var colors = {
                                'ELITE': '#8b5cf6',
                                'EXCELENTE': '#10b981',
                                'MUY BUENO': '#3b82f6',
                                'BUENO': '#06b6d4',
                                'ACEPTABLE': '#f59e0b',
                                'NECESITA MEJORAR': '#ef4444'
                            };
                            var color = colors[categoria] || '#6b7280';
                            
                            return '<span style="font-size:14px;font-weight:700;color:' + color + ';">' +
                                Ext.util.Format.number(value, '0') + '</span>';
                        }
                     }, // total
                    { text: 'Category', dataIndex: 'CATEGORIA', width: 150,
                        renderer: function(value, metaData, record) {
                            var colors = {
                                'ELITE': '#8b5cf6',
                                'EXCELENTE': '#10b981',
                                'MUY BUENO': '#3b82f6',
                                'BUENO': '#06b6d4',
                                'ACEPTABLE': '#f59e0b',
                                'NECESITA MEJORAR': '#ef4444'
                            };
                            var color = colors[value] || '#6b7280';
        
                            // 👇 Aquí renderizas el badge completo
                            // metaData.tdStyle = 'padding: 4px 2px; vertical-align: top;';
                            metaData.style = 'display:flex; align-items:center; justify-content:center; padding: 6px;';

                            return '<span style="display:inline-block;padding:4px 12px;border-radius:12px;' +
                                'background-color:' + color + ';color:white;font-weight:600;font-size:11px;">' +
                                value + '</span>';
                        }
                    },
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
