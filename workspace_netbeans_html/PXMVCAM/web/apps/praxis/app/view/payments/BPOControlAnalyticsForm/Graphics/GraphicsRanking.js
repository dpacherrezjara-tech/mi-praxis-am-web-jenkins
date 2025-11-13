Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Graphics.GraphicsRanking', {
    extend: 'Ext.panel.Panel',
    xtype: 'volumeprogressionpanel',
    
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Area',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.Praxis.controller.payments.BPOControlAnalytics.GraphicsRankingController'
    ],
    
    controller: 'graphicsrankingcontroller',

    layout: 'fit',
    width: 1635,
    height: 550,
    hidden: true,
    margin:'20px',
    bodyStyle: {
        background: '#f9fafb',
        padding: '2px'
    },

    items: [{
        xtype: 'tabpanel',
        tabPosition: 'top',
        activeTab: 0,
        cls: 'modern-tab-panel',
        tabBar: {
            style: {
                background: '#ffffff',
                borderBottom: '2px solid #e5e7eb',
                padding: '4px'
            }
        },
        defaults: {
            layout: 'fit',
            bodyPadding: 10,
            style: {
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }
        },

        items: [
            // TAB 1: Gráfico de Líneas
            {
                title: '<span style="font-weight:600;">📊 Progresión</span>',
                iconCls: 'fa fa-line-chart',
                xtype: 'panel',
                layout: 'fit',

                tbar: {
                    style: 'background: linear-gradient(to right, #3b82f6, #2563eb); border: none; height: 35px;',
                    items: [
                    //     {
                    //     text: 'Actualizar',
                    //     iconCls: 'fa fa-refresh',
                    //     scale: 'small',
                    //     style: 'color: white; font-weight: 500;',
                    //     handler: 'onRefreshChart'
                    // }, 
                    '->', {
                        xtype: 'tbtext',
                        style: 'color: white; font-size: 12px;',
                        html: '<i class="fa fa-line-chart"></i> Volumen por Agente'
                    }]
                },

                bbar: {
                    style: 'background: #f9fafb; border-top: 1px solid #e5e7eb; height: 30px;',
                    items: [{
                        xtype: 'component',
                        reference: 'statsBarLine',
                        style: {
                            fontSize: '12px',
                            color: '#6b7280',
                            padding: '4px 10px'
                        },
                        html: '<i class="fa fa-spinner fa-spin"></i> Cargando...'
                    }]
                },

                items: [{
                    xtype: 'cartesian',
                    reference: 'lineChart',
                    flex: 1,
                    insetPadding: {
                        top: 30,
                        right: 30,
                        bottom: 60,
                        left: 60
                    },

                    store: {
                        fields: ['USUARIO', 'SOL', 'PROM_MIN', 'TOTAL', 'CATEGORIA'],
                        data: []
                    },

                    interactions: ['itemhighlight'],
                    animation: {
                        easing: 'easeInOut',
                        duration: 500
                    },

                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        title: {
                            text: 'Solicitudes',
                            fontSize: 11,
                            fontWeight: '600'
                        },
                        fields: ['SOL'],
                        minimum: 0,
                        adjustMinimumByMajorUnit: true,
                        adjustMaximumByMajorUnit: true,
                        grid: {
                            odd: { fill: '#f9fafb', opacity: 0.4 }
                        },
                        label: {
                            color: '#6b7280',
                            fontSize: 10
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#6b7280',
                            fontSize: 9,
                            rotate: { degrees: -45 }
                        }
                    }],

                    series: [{
                        type: 'line',
                        xField: 'USUARIO',
                        yField: 'SOL',
                        style: {
                            stroke: '#3b82f6',
                            lineWidth: 3
                        },
                        marker: {
                            type: 'circle',
                            radius: 5,
                            fill: '#3b82f6',
                            stroke: '#ffffff',
                            strokeWidth: 2
                        },
                        highlight: { 
                            radius: 7,
                            fillStyle: '#2563eb'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#3b82f6; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Solicitudes: <strong>${record.get('SOL')}</strong><br/>
                                        Promedio: <strong>${record.get('PROM_MIN')}</strong> min
                                    </div>
                                `);
                            }
                        }
                    }]
                }]
            },
            
            // TAB 2: Gráfico de Barras
            {
                title: '<span style="font-weight:600;">📊 Comparación</span>',
                iconCls: 'fa fa-bar-chart',
                xtype: 'panel',
                layout: 'fit',

                tbar: {
                    style: 'background: linear-gradient(to right, #10b981, #059669); border: none; height: 35px;',
                    items: ['->', {
                        xtype: 'tbtext',
                        style: 'color: white; font-size: 12px;',
                        html: '<i class="fa fa-bar-chart"></i> Ranking de Solicitudes'
                    }]
                },

                bbar: {
                    style: 'background: #f9fafb; border-top: 1px solid #e5e7eb; height: 30px;',
                    items: [{
                        xtype: 'component',
                        reference: 'statsBarBar',
                        style: {
                            fontSize: '12px',
                            color: '#6b7280',
                            padding: '4px 10px'
                        },
                        html: '<i class="fa fa-spinner fa-spin"></i> Cargando...'
                    }]
                },

                items: [{
                    xtype: 'cartesian',
                    reference: 'barChart',
                    flex: 1,
                    insetPadding: {
                        top: 30,
                        right: 30,
                        bottom: 60,
                        left: 60
                    },

                    store: {
                        fields: ['USUARIO', 'SOL', 'PROM_MIN', 'TOTAL', 'CATEGORIA'],
                        data: []
                    },

                    interactions: ['itemhighlight'],
                    animation: {
                        easing: 'easeInOut',
                        duration: 500
                    },

                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        title: {
                            text: 'Solicitudes',
                            fontSize: 11,
                            fontWeight: '600'
                        },
                        fields: ['SOL'],
                        minimum: 0,
                        adjustMinimumByMajorUnit: true,
                        adjustMaximumByMajorUnit: true,
                        grid: {
                            odd: { fill: '#f9fafb', opacity: 0.4 }
                        },
                        label: {
                            color: '#6b7280',
                            fontSize: 10
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#6b7280',
                            fontSize: 9,
                            rotate: { degrees: -45 }
                        }
                    }],

                    series: [{
                        type: 'bar',
                        xField: 'USUARIO',
                        yField: 'SOL',
                        style: {
                            fill: '#10b981',
                            opacity: 0.85
                        },
                        highlight: {
                            fillStyle: '#059669',
                            opacity: 1
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#10b981; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Solicitudes: <strong>${record.get('SOL')}</strong><br/>
                                        Promedio: <strong>${record.get('PROM_MIN')}</strong> min
                                    </div>
                                `);
                            }
                        }
                    }]
                }]
            },

            // TAB 3: Gráfico de Área
            {
                title: '<span style="font-weight:600;">📈 Eficiencia</span>',
                iconCls: 'fa fa-area-chart',
                xtype: 'panel',
                layout: 'fit',

                tbar: {
                    style: 'background: linear-gradient(to right, #8b5cf6, #7c3aed); border: none; height: 35px;',
                    items: ['->', {
                        xtype: 'tbtext',
                        style: 'color: white; font-size: 12px;',
                        html: '<i class="fa fa-area-chart"></i> Tiempo Promedio'
                    }]
                },

                bbar: {
                    style: 'background: #f9fafb; border-top: 1px solid #e5e7eb; height: 30px;',
                    items: [{
                        xtype: 'component',
                        reference: 'statsBarArea',
                        style: {
                            fontSize: '12px',
                            color: '#6b7280',
                            padding: '4px 10px'
                        },
                        html: '<i class="fa fa-spinner fa-spin"></i> Cargando...'
                    }]
                },

                items: [{
                    xtype: 'cartesian',
                    reference: 'areaChart',
                    flex: 1,
                    insetPadding: {
                        top: 30,
                        right: 30,
                        bottom: 60,
                        left: 60
                    },

                    store: {
                        fields: ['USUARIO', 'SOL', 'PROM_MIN', 'TOTAL', 'CATEGORIA'],
                        data: []
                    },

                    interactions: ['itemhighlight'],
                    animation: {
                        easing: 'easeInOut',
                        duration: 500
                    },

                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        title: {
                            text: 'Minutos',
                            fontSize: 11,
                            fontWeight: '600'
                        },
                        fields: ['PROM_MIN'],
                        minimum: 0,
                        adjustMinimumByMajorUnit: true,
                        adjustMaximumByMajorUnit: true,
                        grid: {
                            odd: { fill: '#f9fafb', opacity: 0.4 }
                        },
                        label: {
                            color: '#6b7280',
                            fontSize: 10
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#6b7280',
                            fontSize: 9,
                            rotate: { degrees: -45 }
                        }
                    }],

                    series: [{
                        type: 'area',
                        xField: 'USUARIO',
                        yField: 'PROM_MIN',
                        style: {
                            fill: '#8b5cf6',
                            fillOpacity: 0.4,
                            stroke: '#7c3aed',
                            strokeWidth: 2
                        },
                        marker: {
                            radius: 4,
                            fill: '#7c3aed',
                            stroke: '#ffffff',
                            strokeWidth: 2
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#8b5cf6; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Promedio: <strong>${record.get('PROM_MIN')}</strong> min<br/>
                                        Solicitudes: <strong>${record.get('SOL')}</strong>
                                    </div>
                                `);
                            }
                        }
                    }]
                }]
            },

            // TAB 4: Gráfico Dual - OPTIMIZADO
            {
                title: '<span style="font-weight:600;">🎯 Análisis Dual</span>',
                iconCls: 'fa fa-line-chart',
                xtype: 'panel',
                layout: 'fit',

                tbar: {
                    style: 'background: linear-gradient(to right, #0ea5e9, #0284c7); border: none; height: 35px;',
                    items: [{
                        text: 'Exportar',
                        iconCls: 'fa fa-download',
                        scale: 'small',
                        style: 'color: white; font-weight: 500;',
                        handler: function() {
                            var chart = this.up('panel').down('cartesian');
                            if (chart) {
                                chart.download({
                                    filename: 'analisis_dual_' + Ext.Date.format(new Date(), 'Y-m-d_His'),
                                    format: 'png'
                                });
                            }
                        }
                    }, '->', {
                        xtype: 'tbtext',
                        style: 'color: white; font-size: 12px;',
                        html: '<i class="fa fa-bar-chart"></i> Volumen + Eficiencia'
                    }]
                },

                bbar: {
                    style: 'background: #f9fafb; border-top: 1px solid #e5e7eb; height: 30px;',
                    items: [{
                        xtype: 'component',
                        reference: 'statsBarDual',
                        style: {
                            fontSize: '12px',
                            color: '#6b7280',
                            padding: '4px 10px'
                        },
                        html: '<i class="fa fa-spinner fa-spin"></i> Cargando...'
                    }]
                },

                items: [{
                    xtype: 'cartesian',
                    reference: 'dualChart',
                    flex: 1,
                    insetPadding: {
                        top: 20,
                        right: 70,
                        bottom: 60,
                        left: 130
                    },

                    store: {
                        fields: ['USUARIO', 'SOL', 'PROM_MIN', 'TOTAL', 'CATEGORIA', 'EFICIENCIA_PCT'],
                        data: []
                    },

                    legend: {
                        docked: 'left',
                        style: {
                            padding: '10px',
                            background: '#f9fafb',
                            borderRight: '1px solid #e5e7eb'
                        },
                        width: 100
                    },

                    interactions: ['itemhighlight'],
                    animation: {
                        easing: 'easeInOut',
                        duration: 500
                    },

                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        title: {
                            text: 'Solicitudes',
                            fontSize: 11,
                            fontWeight: '600',
                            fill: '#3b82f6'
                        },
                        fields: ['SOL'],
                        minimum: 0,
                        adjustMinimumByMajorUnit: true,
                        adjustMaximumByMajorUnit: true,
                        grid: {
                            odd: { fill: '#f9fafb', opacity: 0.3 }
                        },
                        label: {
                            color: '#3b82f6',
                            fontSize: 10,
                            fontWeight: '600'
                        }
                    }, {
                        type: 'numeric',
                        position: 'right',
                        title: {
                            text: 'Eficiencia %',
                            fontSize: 11,
                            fontWeight: '600',
                            fill: '#10b981'
                        },
                        fields: ['EFICIENCIA_PCT'],
                        minimum: 0,
                        maximum: 100,
                        majorTickSteps: 10,
                        label: {
                            color: '#10b981',
                            fontSize: 10,
                            fontWeight: '600'
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#6b7280',
                            fontSize: 9,
                            rotate: { degrees: -45 }
                        }
                    }],

                    series: [{
                        type: 'bar',
                        title: 'Volumen',
                        xField: 'USUARIO',
                        yField: 'SOL',
                        style: {
                            fill: '#60a5fa',
                            opacity: 0.7
                        },
                        highlight: {
                            fillStyle: '#3b82f6',
                            opacity: 1
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#3b82f6; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Solicitudes: <strong>${record.get('SOL')}</strong><br/>
                                        Eficiencia: <strong>${record.get('EFICIENCIA_PCT')}%</strong><br/>
                                        Promedio: <strong>${record.get('PROM_MIN')}</strong> min
                                    </div>
                                `);
                            }
                        }
                    }, {
                        type: 'line',
                        title: 'Eficiencia',
                        xField: 'USUARIO',
                        yField: 'EFICIENCIA_PCT',
                        axis: 'right',
                        style: {
                            stroke: '#10b981',
                            lineWidth: 3
                        },
                        marker: {
                            type: 'circle',
                            radius: 5,
                            fill: '#10b981',
                            stroke: '#ffffff',
                            strokeWidth: 2
                        },
                        highlight: { 
                            radius: 7,
                            fillStyle: '#059669'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#10b981; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Eficiencia: <strong>${record.get('EFICIENCIA_PCT')}%</strong><br/>
                                        Score: <strong>${record.get('TOTAL')}</strong><br/>
                                        Categoría: <strong>${record.get('CATEGORIA')}</strong>
                                    </div>
                                `);
                            }
                        }
                    }]
                }]
            }
        ]
    }]
});