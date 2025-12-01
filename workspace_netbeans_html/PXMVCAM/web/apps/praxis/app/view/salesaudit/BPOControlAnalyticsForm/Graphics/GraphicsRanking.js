Ext.define('Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Graphics.GraphicsRanking', {
    extend: 'Ext.panel.Panel',
    xtype: 'volumeprogressionpanel',
    
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Area',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.Praxis.controller.salesaudit.BPOControlAnalytics.GraphicsRankingController'
    ],
    
    controller: 'graphicsrankingcontroller',

    layout: 'fit',
    width: 1657,
    height: 550,
    hidden: true,
    margin:'2px',
    bodyStyle: {
        background: '#f9fafb',
        // padding: '2px'
    },

    items: [{
        xtype: 'tabpanel',
        tabPosition: 'top',
        activeTab: 0,
        cls: 'modern-tab-panel',
        tabBar: {
            style: {
                background:'transparent'
                // background: '#ffffff',
                // borderBottom: '2px solid #e5e7eb',
                // padding: '4px'
            }
        },
        defaults: {
            layout: 'fit',
            // bodyPadding: 10,
            style: {
                // background: '#ffffff',
                background: 'transparent',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }
        },

        items: [
            // TAB 1: Gráfico de Líneas
            {
                title: '<span style="font-weight:600;">📊 Progression</span>',
                iconCls: 'fa fa-line-chart',
                xtype: 'panel',
                layout: 'fit',

                tbar: {
                    style: 'background: linear-gradient(to right, #3b82f6, #2563eb); border: none; height: 35px;',
                    items: [
                        '->', // empuja al final
                        {
                            xtype: 'tbtext',
                            style: 'color: white; font-size: 12px; line-height: 35px;', 
                            html: '<i class="fa fa-line-chart"></i> Volume per Auditor'
                        }
                    ]
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
                        top: 60,    
                        right: 80,
                        bottom: 20,  
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
                            text: 'Request',
                            fontSize: 12,
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
                            color: '#3b82f6',
                            fontSize: 11
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#0F172A',
                            fontSize: 12,
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
                                        Requests: <strong>${record.get('SOL')}</strong><br/>
                                        Average: <strong>${record.get('PROM_MIN')}</strong> min
                                    </div>
                                `);
                            }
                        }
                    }]
                }]
            },
            
            // TAB 2: Gráfico de Barras
            {
                title: '<span style="font-weight:600;">📊 Comparison</span>',
                iconCls: 'fa fa-bar-chart',
                xtype: 'panel',
                layout: 'fit',

                tbar: {
                    style: 'background: linear-gradient(to right, #10b981, #059669); border: none; height: 35px;',
                    items: [
                        '->', // empuja al final
                        {
                            xtype: 'tbtext',
                            style: 'color: white; font-size: 12px; line-height: 35px;', 
                            html: '<i class="fa fa-line-chart"></i> Request Ranking'
                        }
                    ]
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
                        top: 50,    
                        right: 30,
                        bottom: 20,  
                        left: 40
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
                            text: 'Request',
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
                            color: '#059669',
                            fontSize: 11
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#0F172A',
                            fontSize: 12,
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
                                        Request: <strong>${record.get('SOL')}</strong><br/>
                                        Average: <strong>${record.get('PROM_MIN')}</strong> min
                                    </div>
                                `);
                            }
                        }
                    }]
                }]
            },
            // TAB 4: Gráfico Dual - OPTIMIZADO
            {
                title: '<span style="font-weight:600;">🎯 Comparison and Dual Analysis</span>',
                iconCls: 'fa fa-line-chart',
                xtype: 'panel',
                layout: 'fit',
                tbar: {
                    style: 'background: linear-gradient(to right, #1E3A8A, #172554); border: none; height: 35px;',
                    items: [
                        '->', // empuja al final
                        {
                            xtype: 'tbtext',
                            style: 'color: white; font-size: 12px; line-height: 35px;', 
                            html: '<i class="fa fa-line-chart"></i> Volume + Efficiency'
                        }
                    ]
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
                        html: '<i class="fa fa-spinner fa-spin"></i> Loading...'
                    }]
                },
            
                items: [{
                    xtype: 'cartesian',
                    reference: 'dualChart',
                    flex: 1,
                    insetPadding: {
                        top: 60,
                        right: 60,
                        bottom: 20,
                        left: 60
                    },
            
                    store: {
                        fields: ['USUARIO', 'SOL', 'PROM_MIN', 'TOTAL', 'CATEGORIA', 'EFICIENCIA_PCT'],
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
                            text: 'Requests',
                            fontSize: 12,
                            // fontWeight: '600',
                            // fill: '#1E3A8A'   // azul marino
                        },
                        fields: ['SOL'],
                        minimum: 0,
                        adjustMinimumByMajorUnit: true,
                        adjustMaximumByMajorUnit: true,
                        grid: {
                            odd: { fill: '#f1f5f9', opacity: 0.25 }
                        },
                        label: {
                            color: '#1E3A8A',   // azul marino
                            fontSize: 11,
                            // fontWeight: '600'
                        }
                    }, {
                        type: 'numeric',
                        position: 'right',
                        title: {
                            text: 'Efficiency %',
                            fontSize: 11,
                            // fill: '#EAB308'  // dorado
                        },
                        fields: ['EFICIENCIA_PCT'],
                        minimum: 0,
                        maximum: 100,
                        majorTickSteps: 10,
                        label: {
                            color: '#B45309',  // dorado
                            fontSize: 11,
                            // fontWeight: '600'
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['USUARIO'],
                        label: {
                            color: '#0F172A',
                            fontSize: 11,
                            rotate: { degrees: -45 }
                        }
                    }],
            
                    series: [{
                        type: 'line',
                        title: 'Efficiency',
                        xField: 'USUARIO',
                        yField: 'EFICIENCIA_PCT',
                        axis: 'right',
                        style: {
                            stroke: '#EAB308',   // dorado suave
                            lineWidth: 3
                        },
                        marker: {
                            type: 'circle',
                            radius: 5,
                            fill: '#EAB308',
                            stroke: '#ffffff',
                            strokeWidth: 2
                        },
                        highlight: { 
                            radius: 7,
                            fillStyle: '#CA8A04'   // dorado más oscuro
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#CA8A04; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Efficiency: <strong>${record.get('EFICIENCIA_PCT')}%</strong><br/>
                                        Score: <strong>${record.get('TOTAL')}</strong><br/>
                                        Category: <strong>${record.get('CATEGORIA')}</strong>
                                    </div>
                                `);
                            }
                        }
                    }, {
                        type: 'bar',
                        title: 'Volume',
                        xField: 'USUARIO',
                        yField: 'SOL',
                        style: {
                            fill: '#1E3A8A',   // azul marino
                            opacity: 0.75
                        },
                        highlight: {
                            fillStyle: '#172554',   // azul marino más oscuro
                            opacity: 1
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(`
                                    <div style="padding:8px; background:#1E3A8A; color:white; 
                                                border-radius:6px; font-size:11px;">
                                        <strong>${record.get('USUARIO')}</strong><br/>
                                        Requests: <strong>${record.get('SOL')}</strong><br/>
                                        Efficiency: <strong>${record.get('EFICIENCIA_PCT')}%</strong><br/>
                                        Average: <strong>${record.get('PROM_MIN')}</strong> min
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