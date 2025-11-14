Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GraphicsRankingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.graphicsrankingcontroller',
    
    /**
     * Método que se ejecuta cuando se renderiza el gráfico
     */
    onLoadChartData: function() {
        let me = this;
        me.loadDataFromGrid();
    },
    
    /**
     * Método principal para cargar datos desde el grid de ranking
     * Carga los datos en los 3 gráficos (líneas, barras, dual)
     */
    loadDataFromGrid: function() {
        let me = this;
        let view = me.getView();
        
        // Referencias a los 3 gráficos
        let lineChart = me.lookup('lineChart');
        let barChart = me.lookup('barChart');
        let dualChart = me.lookup('dualChart');
        
        // Referencias a las barras de estadísticas
        let statsBarLine = me.lookup('statsBarLine');
        let statsBarBar = me.lookup('statsBarBar');
        let statsBarDual = me.lookup('statsBarDual');
        
        
        if (!lineChart || !barChart || !dualChart) {
            console.error('No se encontraron todos los gráficos');
            return;
        }
        
        // Ocultar el panel completo hasta que haya datos
        if (view) {
            view.setVisible(false);
        }
        
        // Buscar el grid de ranking
        let rankingGrid = Ext.getCmp(prototype.id + 'BPOControlAnalyticsRankingGrid');
        
        if (!rankingGrid) {
            console.warn('Grid de ranking no encontrado aún. Esperando...');
            me.updateStatsBar(statsBarLine, 'Waiting for data...');
            me.updateStatsBar(statsBarBar, 'Waiting for data...');
            me.updateStatsBar(statsBarDual, 'Waiting for data...');
            return;
        }
        
        let gridStore = rankingGrid.getStore();
        
        if (!gridStore || gridStore.getCount() === 0) {
            console.warn('El grid no tiene datos cargados');
            me.updateStatsBar(statsBarLine, 'No data to display');
            me.updateStatsBar(statsBarBar, 'No data to display');
            me.updateStatsBar(statsBarDual, 'No data to display');
            return;
        }
        
        // Transformar los datos del grid al formato de los gráficos
        let chartData = [];
        let maxSolicitudes = 0;
        let maxPromMin = 0;
        
        // Primera pasada: obtener máximos
        gridStore.each(function(record) {
            let solicitudes = record.get('SOL') || 0;
            let promMin = record.get('PROM_MIN') || 0;
            
            if (solicitudes > maxSolicitudes) {
                maxSolicitudes = solicitudes;
            }
            if (promMin > maxPromMin) {
                maxPromMin = promMin;
            }
        });
        
        // Segunda pasada: crear datos con eficiencia calculada
        gridStore.each(function(record) {
            let solicitudes = record.get('SOL') || 0;
            let promMin = record.get('PROM_MIN') || 0;
            
            // Calcular eficiencia
            let eficienciaVolumen = maxSolicitudes > 0 ? (solicitudes / maxSolicitudes) * 100 : 0;
            
            // Para velocidad: menor tiempo = mayor eficiencia (invertir)
            let eficienciaVelocidad = maxPromMin > 0 ? ((maxPromMin - promMin) / maxPromMin) * 100 : 0;
            
            // Promedio ponderado: 60% volumen + 40% velocidad
            let eficienciaPct = Math.round((eficienciaVolumen * 0.6) + (eficienciaVelocidad * 0.4));
            
            chartData.push({
                USUARIO: record.get('AUASI') || record.get('USUARIO') || '',
                SOL: solicitudes,
                PROM_MIN: promMin,
                TOTAL: record.get('TOTAL') || 0,
                CATEGORIA: record.get('CATEGORIA') || '',
                EFICIENCIA_PCT: eficienciaPct
            });
        });
        
        // Validar que haya datos
        if (chartData.length === 0) {
            console.warn('No hay datos para mostrar en los gráficos');
            me.updateStatsBar(statsBarLine, 'No data to display', 'exclamation-triangle');
            me.updateStatsBar(statsBarBar, 'No data to display', 'exclamation-triangle');
            me.updateStatsBar(statsBarDual, 'No data to display', 'exclamation-triangle');
            return;
        }
        
        // Cargar datos en los 3 gráficos
        lineChart.getStore().loadData(chartData);
        barChart.getStore().loadData(chartData);
        dualChart.getStore().loadData(chartData);
        
        // Calcular estadísticas
        let totalSol = chartData.reduce(function(sum, r) { return sum + r.SOL; }, 0);
        let avgSol = (totalSol / chartData.length).toFixed(1);
        let totalPromMin = chartData.reduce(function(sum, r) { return sum + r.PROM_MIN; }, 0);
        let avgPromMin = (totalPromMin / chartData.length).toFixed(2);
        let avgEficiencia = (chartData.reduce(function(sum, r) { return sum + r.EFICIENCIA_PCT; }, 0) / chartData.length).toFixed(1);
        
        // Encontrar el mejor y peor
        let maxSol = Math.max.apply(null, chartData.map(function(r) { return r.SOL; }));
        let minPromMin = Math.min.apply(null, chartData.map(function(r) { return r.PROM_MIN; }));
        let maxEficiencia = Math.max.apply(null, chartData.map(function(r) { return r.EFICIENCIA_PCT; }));
        
        let bestAgent = chartData.find(function(r) { return r.SOL === maxSol; });
        let fastestAgent = chartData.find(function(r) { return r.PROM_MIN === minPromMin; });
        let mostEfficient = chartData.find(function(r) { return r.EFICIENCIA_PCT === maxEficiencia; });
        
        // Actualizar barras de estadísticas
        me.updateStatsBar(
            statsBarLine,
            '<strong>Total Requests:</strong> ' + totalSol + ' | ' +
            '<strong>Average:</strong> ' + avgSol + ' | ' +
            '<strong>Agents:</strong> ' + chartData.length + ' | ' +
            '<strong>Highest Volume:</strong> ' + (bestAgent ? bestAgent.USUARIO : 'N/A'),
            'chart-line',
            '#3b82f6'
        );
        
        me.updateStatsBar(
            statsBarBar,
            '<strong>Grand Total:</strong> ' + totalSol + ' requests | ' +
            '<strong>Average per Agent:</strong> ' + avgSol + ' | ' +
            '<strong>Leader:</strong> ' + (bestAgent ? bestAgent.USUARIO + ' (' + bestAgent.SOL + ')' : 'N/A'),
            'chart-bar',
            '#10b981'
        );
        
        me.updateStatsBar(
            statsBarDual,
            '<strong>Total Volume:</strong> ' + totalSol + ' requests | ' +
            '<strong>Volume Leader:</strong> ' + (bestAgent ? bestAgent.USUARIO + ' (' + bestAgent.SOL + ')' : 'N/A') + ' | ' +
            '<strong>Most Efficient:</strong> ' + (mostEfficient ? mostEfficient.USUARIO + ' (' + mostEfficient.EFICIENCIA_PCT + '%)' : 'N/A') + ' | ' +
            '<strong>Average Efficiency:</strong> ' + avgEficiencia + '%',
            'line-chart',
            '#0ea5e9'
        );
        
        // Mostrar el panel con los gráficos
        if (view) {
            view.setVisible(true);
        }
        
        console.log('✅ Datos cargados en los 3 gráficos:', chartData.length + ' registros');
        console.log('✅ Eficiencia calculada para cada agente');
        console.log('✅ Gráficos visibles');
    },
    
    /**
     * Helper para actualizar las barras de estadísticas
     */
    updateStatsBar: function(statsBar, message, icon, color) {
        if (!statsBar) return;
        
        icon = icon || 'info-circle';
        color = color || '#555';
        
        statsBar.setHtml(
            '<i class="fa fa-' + icon + '" style="color:' + color + ';"></i> ' + message
        );
    },
    
    /**
     * Handler para el botón "Actualizar"
     */
    onRefreshChart: function() {
        let me = this;
        
        Ext.Msg.wait('Actualizando datos desde el grid...', 'Cargando');
        
        Ext.defer(function() {
            me.loadDataFromGrid();
            
            Ext.Msg.hide();
            Ext.toast({
                html: 'Datos actualizados correctamente en todos los gráficos',
                title: 'Éxito',
                align: 'tr',
                iconCls: 'fa fa-check-circle'
            });
        }, 500);
    },
    
    /**
     * Handler para exportar gráficos (se puede llamar desde cualquier botón)
     */
    onDownloadChart: function() {
        let lineChart = this.lookup('lineChart');
        
        if (lineChart) {
            lineChart.download({
                filename: 'progresion_volumen_' + Ext.Date.format(new Date(), 'Y-m-d_His'),
                format: 'png'
            });
            
            Ext.toast({
                html: 'Descargando gráfico...',
                title: 'Exportar',
                align: 'tr',
                iconCls: 'fa fa-download'
            });
        } else {
            Ext.Msg.alert('Error', 'No se pudo encontrar el gráfico para exportar');
        }
    }
});