/**
 * Panel de Progresión de Volumen para ExtJS 6.5
 * Gráfico de líneas que muestra la tendencia de solicitudes por agente
 */

Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Graphics.GraphicsRanking', {
    extend: 'Ext.panel.Panel',
    xtype: 'volumeprogressionpanel',
    
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.interactions.ItemHighlight',
		'Ext.Praxis.controller.payments.BPOControlAnalytics.GraphicsRankingController'
    ],
    controller: 'GraphicsRankingController',
    
    title: 'Progresión de Volumen',
    iconCls: 'fa fa-line-chart',
    layout: 'fit',
    
    bodyPadding: 10,
    
    items: [{
        xtype: 'cartesian',
        reference: 'volumeChart',
		id: prototype.id + '-grapichs',
        
        // Store con los datos
        store: {
            fields: [
                'auasi',
                'total',
                'orden',
                'prom_min',
                'eficiencia'
            ],
            data: [
                { orden: 1, auasi: 'MAGALIT', total: 141, prom_min: 4.00, eficiencia: 67.4 },
                { orden: 2, auasi: 'KARENCT', total: 121, prom_min: 5.00, eficiencia: 38.0 },
                { orden: 3, auasi: 'LRAMOST', total: 107, prom_min: 6.00, eficiencia: 55.1 },
                { orden: 4, auasi: 'JTARDILLOT', total: 101, prom_min: 6.00, eficiencia: 54.5 },
                { orden: 5, auasi: 'ROCIOST', total: 98, prom_min: 6.00, eficiencia: 36.7 },
                { orden: 6, auasi: 'ABRINGAST', total: 59, prom_min: 8.00, eficiencia: 47.5 }
            ]
        },
        
        // Colores y tema
        colors: [
            '#3b82f6', // Azul para línea principal
            '#8b5cf6'  // Púrpura para área
        ],
        
        // Interacciones
        interactions: [{
            type: 'itemhighlight'
        }, {
            type: 'panzoom',
            zoomOnPanGesture: false
        }],
        
        // Sprites (efectos visuales)
        sprites: [{
            type: 'text',
            text: 'Solicitudes Procesadas',
            fontSize: 14,
            x: 70,
            y: 20,
            fill: '#666'
        }],
        
        // Ejes
        axes: [{
            type: 'numeric',
            position: 'left',
            title: {
                text: 'Total de Solicitudes',
                fontSize: 14
            },
            fields: ['total'],
            minimum: 0,
            grid: {
                odd: {
                    fill: '#f5f5f5'
                }
            },
            label: {
                color: '#333',
                fontSize: 12
            }
        }, {
            type: 'category',
            position: 'bottom',
            title: {
                text: 'Agente',
                fontSize: 14
            },
            fields: ['auasi'],
            label: {
                color: '#333',
                fontSize: 11,
                rotate: {
                    degrees: -45
                }
            }
        }],
        
        // Series de datos
        series: [{
            type: 'line',
            xField: 'auasi',
            yField: 'total',
            style: {
                stroke: '#3b82f6',
                lineWidth: 3
            },
            marker: {
                type: 'circle',
                radius: 6,
                fill: '#3b82f6',
                stroke: '#ffffff',
                strokeWidth: 2
            },
            highlight: {
                size: 8,
                radius: 8
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(
                        '<div style="padding: 8px;">' +
                        '<strong>' + record.get('auasi') + '</strong><br/>' +
                        'Total: <strong>' + record.get('total') + '</strong> solicitudes<br/>' +
                        'Promedio: <strong>' + record.get('prom_min') + '</strong> min<br/>' +
                        'Eficiencia: <strong>' + record.get('eficiencia') + '%</strong>' +
                        '</div>'
                    );
                }
            }
        }]
    }],
    
    // Barra de herramientas superior
    tbar: [{
        text: 'Actualizar',
        iconCls: 'fa fa-refresh',
        handler: 'onRefreshChart'
    }, {
        text: 'Exportar PNG',
        iconCls: 'fa fa-download',
        handler: 'onDownloadChart'
    }, '->', {
        xtype: 'tbtext',
        html: '<i class="fa fa-info-circle"></i> Haga clic en los puntos para más detalles'
    }],
    
    // Barra inferior con estadísticas
    bbar: [{
        xtype: 'component',
        reference: 'statsBar',
        style: {
            padding: '5px',
            fontSize: '12px',
            color: '#666'
        },
        html: '<strong>Total General:</strong> 627 solicitudes | ' +
              '<strong>Promedio:</strong> 5.83 min | ' +
              '<strong>Mayor Volumen:</strong> MAGALIT (141)'
    }]
});
