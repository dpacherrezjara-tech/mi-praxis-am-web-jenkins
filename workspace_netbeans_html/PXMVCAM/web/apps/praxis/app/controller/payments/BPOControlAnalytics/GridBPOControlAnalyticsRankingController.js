Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRankingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsRankingController',

    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        
        this.getData(view);
        
    },

    getData: async function (view) {
        console.log('view', view);
        view.setLoading(true);

        view.searchParams.IN_USER =  view.searchParams.IN_USER === 'All' ? '' : view.searchParams.IN_USER;

        let store = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);
        console.log('stores', store);

        let data = store?.lstRs?.[0] || [];

        console.log('data', data);

        if (data.length === 0) {
            global.Msg({ msg: 'Data not found' });
            view.setLoading(false);
            return;
        }

        const gridStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(data[0] || {}),
            data: data
        });

        view.setStore(gridStore);
        view.setLoading(false);

        // ✅ AHORA SÍ: CREAR EL GRÁFICO DESPUÉS DE TENER LOS DATOS
        console.log('Datos cargados, creando gráfico...');
        
        Ext.defer(function() {
            // Buscar el mainPanel donde están los componentes
            const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
            
            if (!mainPanel) {
                console.error('mainPanel no encontrado');
                return;
            }
            
            // Verificar si el gráfico ya existe (para evitar duplicados)
            const existingChart = Ext.getCmp(prototype.id + '-graphics-ranking');
            if (existingChart) {
                console.log('El gráfico ya existe, actualizando datos...');
                const controller = existingChart.getController();
                if (controller && controller.loadDataFromGrid) {
                    controller.loadDataFromGrid();
                }
                return;
            }
            
            // Crear el panel del gráfico
            const chartPanel = Ext.create('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Graphics.GraphicsRanking', {
                id: prototype.id + '-graphics-ranking',
                flex: 1,
                height: '90%',
                layout: 'fit',
                margin: '10 0 0 0'
            });
            
            // Agregar el gráfico al mainPanel
            mainPanel.add(chartPanel);
            
            console.log('Gráfico creado y agregado');
            
            // Cargar los datos en el gráfico después de un pequeño delay
            Ext.defer(function() {
                const controller = chartPanel.getController();
                if (controller && controller.loadDataFromGrid) {
                    controller.loadDataFromGrid();
                }
            }, 300);
            
        }, 200);
    },



    downloadExcel: function () {
        const me = this;
        const notifier = new AWN();
        notifier.confirm('Download Excel', () => me.onDownloadExcel(), null);
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('', '', view.searchParams);

        const data = (res?.length > 0)
            ? res.map(x => ({ ID: x.A2439ID }))
            : [{ ID: "" }];

        await global.writeExcelFromJson(data, 'TaxLoadLog Information');
        view.setLoading(false);
    },

    renderRanking: function(value) {
        var medal = '';
        if (value === 1) medal = '🥇';
        else if (value === 2) medal = '🥈';
        else if (value === 3) medal = '🥉';
        
        return '<div style="text-align:center;font-size:20px;">' +
               medal + ' <span style="font-weight:700;">' + value + '</span></div>';
    },

    onCellClick: function(view, cell, cellIndex, record, tr, rowIndex, e) {
        // Obtén el nombre de la columna clickeada
        const column = view.getHeaderAtIndex(cellIndex);
        console.log('colum', column)
        
        // Verifica si es la columna 'SOL' (Requests)
            this.ondetalleRanking(record);
    },

    ondetalleRanking: function(record){
        console.log('on detalle')

        const me = this;
//        console.log('balance---', me.ticketData);
        const obj = me.view;
        console.log('view', me.view);

        const rowData = record.getData();
        console.log('Datos de la fila:', rowData);

        const dataEntry = Ext.create('Ext.Praxis.view.payments.BPOControlAnalyticsForm.DataEntrys.DataEntryLogRanking', {
            id: prototype.id + '-DataEntryLogRanking',
            searchParams: obj,
            rowData: rowData
        });

        dataEntry.show();
    }
    
    


});
