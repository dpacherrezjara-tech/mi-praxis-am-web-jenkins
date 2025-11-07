
// ============================================
// CONTROLADOR
// ============================================

Ext.define('Ext.Praxis.view.payments.BPOControlAnalytics.GraphicsRankingController', {
    extend: 'Ext.app.ViewController',
    // alias: 'controller.volumeprogression',
    alias: 'controller.GraphicsRankingController',
    
    /**
     * Actualiza los datos del gráfico
     */
    onRefreshChart: function() {
        var chart = this.lookup('volumeChart');
        var store = chart.getStore();
        
        // Simular actualización de datos
        Ext.Msg.wait('Actualizando datos...', 'Cargando');
        
        Ext.defer(function() {
            store.loadData([
                { orden: 1, auasi: 'MAGALIT', total: 145, prom_min: 3.8, eficiencia: 68.2 },
                { orden: 2, auasi: 'KARENCT', total: 125, prom_min: 4.9, eficiencia: 39.0 },
                { orden: 3, auasi: 'LRAMOST', total: 110, prom_min: 5.8, eficiencia: 56.0 },
                { orden: 4, auasi: 'JTARDILLOT', total: 105, prom_min: 5.9, eficiencia: 55.0 },
                { orden: 5, auasi: 'ROCIOST', total: 102, prom_min: 5.8, eficiencia: 38.0 },
                { orden: 6, auasi: 'ABRINGAST', total: 63, prom_min: 7.8, eficiencia: 48.5 }
            ]);
            
            Ext.Msg.hide();
            Ext.toast({
                html: 'Datos actualizados correctamente',
                title: 'Éxito',
                align: 'tr',
                iconCls: 'fa fa-check-circle'
            });
        }, 1500);
    },
    
    /**
     * Descarga el gráfico como imagen PNG
     */
    onDownloadChart: function() {
        var chart = this.lookup('volumeChart');
        
        if (chart) {
            chart.download({
                filename: 'progresion_volumen_' + Ext.Date.format(new Date(), 'Y-m-d_His'),
                format: 'png'
            });
            
            Ext.toast({
                html: 'Descargando gráfico...',
                title: 'Exportar',
                align: 'tr',
                iconCls: 'fa fa-download'
            });
        }
    }
});

// ============================================
// EJEMPLO DE USO EN UNA VENTANA
// ============================================

// Ext.define('MyApp.view.VolumeWindow', {
//     extend: 'Ext.window.Window',
//     xtype: 'volumewindow',
    
//     title: 'Dashboard - Progresión de Volumen',
//     iconCls: 'fa fa-bar-chart',
    
//     width: 800,
//     height: 500,
    
//     layout: 'fit',
//     modal: true,
    
//     items: [{
//         xtype: 'volumeprogressionpanel',
//         controller: 'volumeprogression'
//     }],
    
//     buttons: [{
//         text: 'Cerrar',
//         iconCls: 'fa fa-times',
//         handler: function(btn) {
//             btn.up('window').close();
//         }
//     }]
// });

// ============================================
// INICIALIZACIÓN Y APERTURA
// ============================================

/**
 * Para abrir la ventana con el gráfico:
 * 
 * Ext.create('MyApp.view.VolumeWindow').show();
 */

// ============================================
// VARIANTE: PANEL PARA DASHBOARD
// ============================================

// Ext.define('MyApp.view.dashboard.VolumeProgressionCard', {
//     extend: 'Ext.panel.Panel',
//     xtype: 'volumecard',
    
//     title: '<i class="fa fa-line-chart"></i> Progresión de Volumen',
    
//     width: 500,
//     height: 350,
    
//     layout: 'fit',
    
//     bodyPadding: 5,
    
//     tools: [{
//         type: 'refresh',
//         tooltip: 'Actualizar datos',
//         callback: function(panel) {
//             panel.down('cartesian').getStore().reload();
//         }
//     }, {
//         type: 'maximize',
//         tooltip: 'Maximizar',
//         callback: function(panel) {
//             Ext.create('MyApp.view.VolumeWindow').show();
//         }
//     }],
    
//     items: [{
//         xtype: 'cartesian',
        
//         store: {
//             fields: ['auasi', 'total', 'prom_min'],
//             data: [
//                 { auasi: 'MAGALIT', total: 141, prom_min: 4.00 },
//                 { auasi: 'KARENCT', total: 121, prom_min: 5.00 },
//                 { auasi: 'LRAMOST', total: 107, prom_min: 6.00 },
//                 { auasi: 'JTARDILLOT', total: 101, prom_min: 6.00 },
//                 { auasi: 'ROCIOST', total: 98, prom_min: 6.00 },
//                 { auasi: 'ABRINGAST', total: 59, prom_min: 8.00 }
//             ]
//         },
        
//         theme: 'blue',
        
//         interactions: ['itemhighlight'],
        
//         axes: [{
//             type: 'numeric',
//             position: 'left',
//             fields: ['total'],
//             grid: true,
//             minimum: 0
//         }, {
//             type: 'category',
//             position: 'bottom',
//             fields: ['auasi'],
//             label: {
//                 rotate: {
//                     degrees: -45
//                 }
//             }
//         }],
        
//         series: [{
//             type: 'line',
//             xField: 'auasi',
//             yField: 'total',
//             style: {
//                 stroke: '#3b82f6',
//                 lineWidth: 3
//             },
//             marker: {
//                 radius: 5,
//                 fill: '#3b82f6'
//             },
//             tooltip: {
//                 trackMouse: true,
//                 renderer: function(tooltip, record) {
//                     tooltip.setHtml(
//                         '<b>' + record.get('auasi') + '</b><br/>' +
//                         'Total: ' + record.get('total') + '<br/>' +
//                         'Promedio: ' + record.get('prom_min') + ' min'
//                     );
//                 }
//             }
//         }]
//     }]
// });

// ============================================
// EJEMPLO DE INTEGRACIÓN EN DASHBOARD
// ============================================

/**
 * Uso en un dashboard principal:
 * 
 * {
 *     xtype: 'panel',
 *     title: 'Dashboard de Productividad',
 *     layout: {
 *         type: 'hbox',
 *         align: 'stretch'
 *     },
 *     items: [{
 *         xtype: 'volumecard',
 *         flex: 1,
 *         margin: '0 10 0 0'
 *     }, {
 *         xtype: 'otrocard',
 *         flex: 1
 *     }]
 * }
 */