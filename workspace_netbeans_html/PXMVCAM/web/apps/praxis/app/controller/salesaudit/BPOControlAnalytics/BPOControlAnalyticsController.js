Ext.define('Ext.Praxis.controller.salesaudit.BPOControlAnalytics.BPOControlAnalyticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BPOControlAnalyticsController',

    OnBeforeShow: function () {},
    init: function (view) {},

    afterRender: async function (obj, e) {
        // console.log('after render');
        await this.onAuditorFilter();
    },

    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
    
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        
        let params = filtro1.getForm().getValues();
        if (params.IN_USER === 'ALL')
            params.IN_USER = '';
    
        let grid = '';
        let idName = '';
    
        if (params.IN_TYPE === 'AU') {
            grid = 'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid';
            idName = 'BPOControlAnalyticsAnalisisGrid';
        } else if (params.IN_TYPE === 'RP') {
            grid = 'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRankingGrid';
            idName = 'BPOControlAnalyticsRankingGrid';

            
        } else if (params.IN_TYPE === 'RU') {
            grid = 'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRendimientoGrid';
            idName = 'BPOControlAnalyticsRendimientoGrid';
        } else {
            grid = 'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid';
            idName = 'BPOControlAnalyticsAnalisisGrid';
        }
    
        let orderedParams = {
            IN_OPTION: params.IN_OPTION,
            IN_CCUST: params.IN_CCUST,
            IN_DATEFROM: params.IN_DATEFROM,
            IN_DATETO: params.IN_DATETO,
            IN_USER: params.IN_USER,
            //IN_PROCESADOR: params.IN_PROCESADOR,
            IN_FLADM:params.IN_FLADM,
            IN_TRNCU:params.IN_TRNCU,
            IN_TYPE: params.IN_TYPE
        };
    
        // console.log('params', orderedParams);
    
        // Crear el grid
        const newGrid = Ext.create(grid, {
            id: prototype.id + idName,
            searchParams: orderedParams
        });
    
        mainPanel.add(newGrid);

        if (params.IN_TYPE === 'RP') {
            const chartPanel = Ext.create('Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Graphics.GraphicsRanking', {
                id: prototype.id + '-graphics-ranking',
                flex: 1,
                // width: '100%',
                height: '90%',
                layout: 'fit',
            });
    
            mainPanel.add(chartPanel);
        };


    },

    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },

    onClickClearBtn: function (obj) {
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },

    /*
    loadFilters: async function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
    
        const res = await global.callStoreGet('PRAXISMP', 'SQP05276', { IN_STATUS: '1' });
        const res2 = await global.callStoreGet('PXSAUDIT', 'SQP02745', { IN_CCUST: '139', IN_OPTION: '4' });
        
        //const filter = await global.callStoreGet('PXSAUDIT', 'SQP06038', { IN_CCUST: '139', IN_OPTION: '4' });
    
        // console.log('res2', res2);
    
        const cmbProcessor = Ext.getCmp(prototype.id + '-cmbProctypef');
        const cmbUser = Ext.getCmp(prototype.id + '-txtUser');
    
        // --- Procesadores ---
        let procesor = res.lstRs?.[2] || [];
        procesor.unshift({ A4451KEY2: '', A4451DESC1: 'All' });
    
        const procesorStore = Ext.create('Ext.data.Store', {
            fields: ['A4451KEY2', 'A4451DESC1'],
            data: procesor
        });
    
        cmbProcessor.setStore(procesorStore);
        cmbProcessor.setValue(''); // Selecciona "All" (ya que su key es vacía)
    
    
        // --- Usuarios ---
        let usuarios = res2.lstRs?.[0] || [];
        usuarios.unshift({ A4836USER: 'All' }); // Añadimos opción All
    
        const userStore = Ext.create('Ext.data.Store', {
            fields: ['A4836USER'],
            data: usuarios
        });
    
        cmbUser.setStore(userStore);
    
        //  Aquí forzamos la selección por defecto en “All”
        cmbUser.setValue('All');
    
        filters.setLoading(false);
    },
    */
    
    onAuditorFilter: async function () {

        let params = {
            IN_CCUST: '139',
            IN_OPTION: '1',
            IN_VAR1: '',
            IN_VAR2: ''
        };

        let cmbUser = Ext.getCmp(prototype.id + '-cmbUser');
        const res = await global.callStoreGet('PXSAUDIT', 'SQP05872', params);
        // console.log('res', res)

        if (res.lstRs) {
            let data = res.lstRs.at(0);
            // console.log('filter user', data);

            // Normalizar por si viene "id"
            let cleanData = data.map(item => ({
                A4886USER: item.A4886USER
            }));
            cleanData.unshift({
                A4886USER: 'All'
            });

            console.log('cleanData', cleanData)

            let store = cmbUser.getStore();
            store.removeAll();
            store.loadData(cleanData);
            cmbUser.setValue('All');
        }
    },


    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }
    }

});


